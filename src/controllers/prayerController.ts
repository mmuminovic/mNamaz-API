import { Request, Response } from "express";
import dataService from "../services/dataService";
import localizationService from "../services/localizationService";
import { sendSuccess } from "../utils/responseFormatter";
import { asyncHandler } from "../middleware/errorHandler";
import { AppError } from "../middleware/errorHandler";
import { getSchoolByLanguage } from "../utils/schoolSelector";
// import { namazDataHanefi, namazDataShafi } from "../../data/namaz/namazDetails";
import { processAssetUrls } from "../utils/urlHelper";

// Helper function to recursively process prayer data and populate text values
async function processLocaleContent(
  content: any,
  language: string
): Promise<any> {
  if (!content) return content;

  if (Array.isArray(content)) {
    return Promise.all(
      content.map((item) => processLocaleContent(item, language))
    );
  }

  if (typeof content === "object" && content !== null) {
    const processed: any = {};

    // Special handling for card objects with arabic/translation structure
    if (content.card === true && content.arabic && content.translation) {
      processed.card = true;

      // Process title - it should be the transliteration
      if (content.title) {
        processed.title = await localizationService.getTranslation(
          content.title,
          language
        );
      }

      // Process arabic array - swap to get actual Arabic text
      if (Array.isArray(content.arabic)) {
        processed.arabic = await Promise.all(
          content.arabic.map(async (item: any) => {
            if (item.localeKey && typeof item.localeKey === 'string') {
              // Remove _wxyz suffix to get the Arabic text key
              const arabicKey = item.localeKey.replace(/_wxyz$/, '');
              const arabicText = await localizationService.getTranslation(arabicKey, language);

              return {
                text: arabicText,
                bold: item.bold,
                borderTop: item.borderTop,
              };
            }
            return item;
          })
        );
      }

      // Process translation array - swap to get transliteration
      if (Array.isArray(content.translation)) {
        processed.transliteration = await Promise.all(
          content.translation.map(async (item: any) => {
            if (item.localeKey && typeof item.localeKey === 'string') {
              // Get the _wxyz version for transliteration
              const transliterationKey = item.localeKey.replace(/_tr$/, '_wxyz');
              const transliterationText = await localizationService.getTranslation(transliterationKey, language);

              return {
                text: transliterationText,
                bold: item.bold,
              };
            }
            return item;
          })
        );
      }

      // Process translation for meaning
      if (Array.isArray(content.translation)) {
        processed.translation = await Promise.all(
          content.translation.map(async (item: any) => {
            if (item.localeKey && typeof item.localeKey === 'string') {
              const translationText = await localizationService.getTranslation(item.localeKey, language);

              return {
                text: translationText,
                bold: item.bold,
              };
            }
            return item;
          })
        );
      }

      // Process audio and other fields
      if (content.audio) {
        processed.audio = content.audio;
      }

      return processed;
    }

    // Regular processing for non-card objects
    // First pass: collect zikr values for placeholder replacement
    const placeholderValues: Record<string, string> = {};

    for (const [key, value] of Object.entries(content)) {
      if (key === "zikr" && typeof value === "string") {
        placeholderValues.zikr = await localizationService.getTranslation(value, language);
      } else if (key === "zikrTr" && typeof value === "string") {
        placeholderValues.zikrTr = await localizationService.getTranslation(value, language);
      }
    }

    // Second pass: process all content with placeholder values
    for (const [key, value] of Object.entries(content)) {
      if (key === "localeKey" && typeof value === "string") {
        let translation = await localizationService.getTranslation(
          value,
          language
        );

        // Replace any placeholders with their values
        for (const [placeholder, placeholderValue] of Object.entries(placeholderValues)) {
          translation = translation.replace(new RegExp(`\\{\\{${placeholder}\\}\\}`, 'g'), placeholderValue);
        }

        // Process any remaining placeholders in the translation
        processed.text = await localizationService.processPlaceholders(translation, language);
      } else if (key === "localeKeys" && Array.isArray(value)) {
        processed.texts = await Promise.all(
          value.map(async (key) => {
            let translation = await localizationService.getTranslation(key, language);

            // Replace any placeholders with their values
            for (const [placeholder, placeholderValue] of Object.entries(placeholderValues)) {
              translation = translation.replace(new RegExp(`\\{\\{${placeholder}\\}\\}`, 'g'), placeholderValue);
            }

            return localizationService.processPlaceholders(translation, language);
          })
        );
      } else if (key === "title" && typeof value === "string") {
        processed.title = await localizationService.getTranslation(
          value,
          language
        );
      } else if (key === "zikr" && typeof value === "string") {
        // Already processed in first pass, just add to output
        processed.zikr = placeholderValues.zikr;
      } else if (key === "zikrTr" && typeof value === "string") {
        // Already processed in first pass, just add to output
        processed.zikrTr = placeholderValues.zikrTr;
      } else {
        processed[key] = await processLocaleContent(value, language);
      }
    }

    return processed;
  }

  return content;
}

/**
 * @swagger
 * /prayers:
 *   get:
 *     summary: Get all prayers
 *     description: Retrieve all prayer types with their basic information
 *     tags: [Prayers]
 *     parameters:
 *       - $ref: '#/components/parameters/LanguageParam'
 *     responses:
 *       200:
 *         description: List of prayers
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */

export const getPrayers = asyncHandler(async (req: Request, res: Response) => {
  const language = req.language || "en";
  const school = getSchoolByLanguage(language);

  const contentNamaz = await dataService.getContentNamaz();

  // Translate prayer names and add type mapping
  const translatedPrayers = await Promise.all(
    contentNamaz.map(async (prayer: any) => {
      const translatedName = await localizationService.getTranslation(
        prayer.name,
        language
      );
      
      // Map local names to prayer types
      const prayerTypeMap: Record<string, string> = {
        'sabah': 'fajr',
        'podne': 'dhuhr',
        'ikindija': 'asr',
        'aksam': 'maghrib',
        'jacija': 'isha'
      };

      return {
        ...prayer,
        type: prayerTypeMap[prayer.name] || prayer.name,
        name: translatedName,
        localName: prayer.name, // Keep original name for reference
      };
    })
  );

  sendSuccess(
    res,
    {
      prayers: translatedPrayers,
      school,
    },
    200,
    { language }
  );
});

/**
 * @swagger
 * /prayers/{rekatNumber}:
 *   get:
 *     summary: Get prayer by rekat number
 *     description: Retrieve detailed information for a prayer with specific number of rekats
 *     tags: [Prayers]
 *     parameters:
 *       - name: rekatNumber
 *         in: path
 *         required: true
 *         description: Number of rekats (2, 3, 4)
 *         schema:
 *           type: integer
 *           enum: [2, 3, 4]
 *       - $ref: '#/components/parameters/LanguageParam'
 *     responses:
 *       200:
 *         description: Prayer details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       404:
 *         $ref: '#/components/responses/NotFoundResponse'
 */
export const getPrayerByRekatNumber = asyncHandler(
  async (req: Request, res: Response) => {
    const { rekatNumber } = req.params;
    const language = req.language || "en";
    const school = getSchoolByLanguage(language);

    const rakats = parseInt(rekatNumber);
    
    // Validate rekat number
    if (![2, 3, 4].includes(rakats)) {
      throw new AppError("Invalid rekat number. Must be 2, 3, or 4", 400, "INVALID_REKAT_NUMBER");
    }

    // Use data service to get prayer data
    const namazDetails = await dataService.getNamezDetails();
    const prayerData = school === "shafi" ? namazDetails.namazDataShafi : namazDetails.namazDataHanefi;
    
    // Find the prayer data by number of rakats
    const prayer = prayerData.find((p: any) => p.num === rakats);

    if (!prayer) {
      throw new AppError("Prayer configuration not found", 404, "PRAYER_CONFIG_NOT_FOUND");
    }

    // Create the response with the correct structure
    const prayerResponse = {
      rakats: rakats,
      steps: prayer.steps || []
    };

    const processedPrayer = await processLocaleContent(prayerResponse, language);
    
    // Convert asset paths to full URLs
    const prayerWithUrls = processAssetUrls(processedPrayer);

    sendSuccess(res, prayerWithUrls, 200, { language, school });
  }
);

/**
 * @swagger
 * /prayers/{rekatNumber}/steps:
 *   get:
 *     summary: Get prayer steps by rekat number
 *     description: Retrieve all steps for a prayer with specific number of rekats
 *     tags: [Prayers]
 *     parameters:
 *       - name: rekatNumber
 *         in: path
 *         required: true
 *         description: Number of rekats (2, 3, 4)
 *         schema:
 *           type: integer
 *           enum: [2, 3, 4]
 *       - $ref: '#/components/parameters/LanguageParam'
 *     responses:
 *       200:
 *         description: Prayer steps
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       404:
 *         $ref: '#/components/responses/NotFoundResponse'
 */
export const getPrayerSteps = asyncHandler(
  async (req: Request, res: Response) => {
    const { rekatNumber } = req.params;
    const language = req.language || "en";
    const school = getSchoolByLanguage(language);

    const rakats = parseInt(rekatNumber);
    
    // Validate rekat number
    if (![2, 3, 4].includes(rakats)) {
      throw new AppError("Invalid rekat number. Must be 2, 3, or 4", 400, "INVALID_REKAT_NUMBER");
    }

    // Use data service to get prayer data
    const namazDetails = await dataService.getNamezDetails();
    const prayerData = school === "shafi" ? namazDetails.namazDataShafi : namazDetails.namazDataHanefi;

    const prayer = prayerData.find(
      (p: any) => p.num === rakats
    );

    if (!prayer) {
      throw new AppError(
        "Prayer configuration not found",
        404,
        "PRAYER_CONFIG_NOT_FOUND"
      );
    }

    // Use the actual steps from the prayer data
    const processedSteps = await processLocaleContent(prayer.steps, language);
    
    // Convert asset paths to full URLs
    const stepsWithUrls = processAssetUrls(processedSteps);

    sendSuccess(
      res,
      {
        rakats,
        school,
        steps: stepsWithUrls,
      },
      200,
      { language }
    );
  }
);

/**
 * @swagger
 * /prayers/{rekatNumber}/steps/{stepId}:
 *   get:
 *     summary: Get specific prayer step by rekat number and step ID
 *     description: Retrieve a specific step for a prayer with specific number of rekats
 *     tags: [Prayers]
 *     parameters:
 *       - name: rekatNumber
 *         in: path
 *         required: true
 *         description: Number of rekats (2, 3, 4)
 *         schema:
 *           type: integer
 *           enum: [2, 3, 4]
 *       - name: stepId
 *         in: path
 *         required: true
 *         description: Step index (0-based)
 *         schema:
 *           type: integer
 *           minimum: 0
 *       - $ref: '#/components/parameters/LanguageParam'
 *     responses:
 *       200:
 *         description: Prayer step details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       404:
 *         $ref: '#/components/responses/NotFoundResponse'
 */
export const getPrayerStep = asyncHandler(
  async (req: Request, res: Response) => {
    const { rekatNumber, stepId } = req.params;
    const language = req.language || "en";
    const school = getSchoolByLanguage(language);

    const rakats = parseInt(rekatNumber);
    const stepIndex = parseInt(stepId);

    // Validate rekat number
    if (![2, 3, 4].includes(rakats)) {
      throw new AppError("Invalid rekat number. Must be 2, 3, or 4", 400, "INVALID_REKAT_NUMBER");
    }

    // Use data service to get prayer data
    const namazDetails = await dataService.getNamezDetails();
    const prayerData = school === "shafi" ? namazDetails.namazDataShafi : namazDetails.namazDataHanefi;

    const prayer = prayerData.find(
      (p: any) => p.num === rakats
    );

    if (!prayer) {
      throw new AppError(
        "Prayer configuration not found",
        404,
        "PRAYER_CONFIG_NOT_FOUND"
      );
    }

    // Use the actual steps from the prayer data
    const step = prayer.steps[stepIndex];

    if (!step) {
      throw new AppError("Prayer step not found", 404, "STEP_NOT_FOUND");
    }

    const processedStep = await processLocaleContent(step, language);
    
    // Convert asset paths to full URLs
    const stepWithUrls = processAssetUrls(processedStep);

    sendSuccess(
      res,
      {
        rakats,
        stepIndex,
        totalSteps: prayer.steps.length,
        step: stepWithUrls,
      },
      200,
      { language, school }
    );
  }
);
