import { Request, Response } from "express";
import dataService from "../services/dataService";
import localizationService from "../services/localizationService";
import { sendSuccess } from "../utils/responseFormatter";
import { asyncHandler } from "../middleware/errorHandler";
import { AppError } from "../middleware/errorHandler";
import { getSchoolByLanguage } from "../utils/schoolSelector";
import { getPrayerMapping } from "../data/prayerMappings";
import { namazDataHanefi, namazDataShafi } from "../../data/namaz/namazDetails";
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

    for (const [key, value] of Object.entries(content)) {
      if (key === "localeKey" && typeof value === "string") {
        processed.text = await localizationService.getTranslation(
          value,
          language
        );
      } else if (key === "localeKeys" && Array.isArray(value)) {
        processed.texts = await Promise.all(
          value.map((key) => localizationService.getTranslation(key, language))
        );
      } else if (key === "title" && typeof value === "string") {
        processed.title = await localizationService.getTranslation(
          value,
          language
        );
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
 * /prayers/{prayerType}:
 *   get:
 *     summary: Get specific prayer type
 *     description: Retrieve detailed information for a specific prayer type
 *     tags: [Prayers]
 *     parameters:
 *       - name: prayerType
 *         in: path
 *         required: true
 *         description: Type of prayer (fajr, dhuhr, asr, maghrib, isha)
 *         schema:
 *           type: string
 *           enum: [fajr, dhuhr, asr, maghrib, isha]
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
export const getPrayerByType = asyncHandler(
  async (req: Request, res: Response) => {
    const { prayerType } = req.params;
    const language = req.language || "en";
    const school = getSchoolByLanguage(language);

    // Get prayer mapping to determine rakats
    const prayerConfig = getPrayerMapping(prayerType);
    if (!prayerConfig) {
      throw new AppError("Prayer type not found", 404, "PRAYER_NOT_FOUND");
    }

    // Use directly imported data
    const prayerData = school === "shafi" ? namazDataShafi : namazDataHanefi;
    
    // Find the prayer data by number of rakats
    const prayer = prayerData.find((p: any) => p.num === prayerConfig.rakats);

    if (!prayer) {
      throw new AppError("Prayer configuration not found", 404, "PRAYER_CONFIG_NOT_FOUND");
    }

    // Create the response with the correct structure
    const prayerResponse = {
      type: prayerType,
      rakats: prayerConfig.rakats,
      name: prayerConfig.name,
      localName: prayerConfig.localName,
      steps: prayer.steps || []
    };

    const processedPrayer = await processLocaleContent(prayerResponse, language);
    
    // Convert asset paths to full URLs
    const prayerWithUrls = processAssetUrls(processedPrayer);

    sendSuccess(res, prayerWithUrls, 200, { language, school });
  }
);

export const getPrayerSteps = asyncHandler(
  async (req: Request, res: Response) => {
    const { prayerType, rakatCount } = req.params;
    const language = req.language || "en";
    const school = getSchoolByLanguage(language);

    // Validate prayer type
    const prayerConfig = getPrayerMapping(prayerType);
    if (!prayerConfig) {
      throw new AppError("Invalid prayer type", 400, "INVALID_PRAYER_TYPE");
    }

    // Use directly imported data
    const prayerData = school === "shafi" ? namazDataShafi : namazDataHanefi;
    const rakats = parseInt(rakatCount);

    // Validate rakat count for the prayer type
    if (prayerConfig.rakats !== rakats) {
      throw new AppError(
        `${prayerType} prayer must have ${prayerConfig.rakats} rakats`,
        400,
        "INVALID_RAKAT_COUNT"
      );
    }

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
        prayer: prayerType,
        prayerName: prayerConfig.name,
        rakats,
        school,
        steps: stepsWithUrls,
      },
      200,
      { language }
    );
  }
);

export const getPrayerStep = asyncHandler(
  async (req: Request, res: Response) => {
    const { prayerType, rakatCount, stepId } = req.params;
    const language = req.language || "en";
    const school = getSchoolByLanguage(language);

    // Validate prayer type
    const prayerConfig = getPrayerMapping(prayerType);
    if (!prayerConfig) {
      throw new AppError("Invalid prayer type", 400, "INVALID_PRAYER_TYPE");
    }

    // Use directly imported data
    const prayerData = school === "shafi" ? namazDataShafi : namazDataHanefi;
    const rakats = parseInt(rakatCount);
    const stepIndex = parseInt(stepId);

    // Validate rakat count for the prayer type
    if (prayerConfig.rakats !== rakats) {
      throw new AppError(
        `${prayerType} prayer must have ${prayerConfig.rakats} rakats`,
        400,
        "INVALID_RAKAT_COUNT"
      );
    }

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
        prayer: prayerType,
        prayerName: prayerConfig.name,
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
