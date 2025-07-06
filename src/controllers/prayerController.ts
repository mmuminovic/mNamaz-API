import { Request, Response } from 'express';
import dataService from '../services/dataService';
import localizationService from '../services/localizationService';
import { sendSuccess } from '../utils/responseFormatter';
import { asyncHandler } from '../middleware/errorHandler';
import { AppError } from '../middleware/errorHandler';

/**
 * @swagger
 * /prayers:
 *   get:
 *     summary: Get all prayers
 *     description: Retrieve all prayer types with their basic information
 *     tags: [Prayers]
 *     parameters:
 *       - $ref: '#/components/parameters/LanguageParam'
 *       - $ref: '#/components/parameters/SchoolParam'
 *     responses:
 *       200:
 *         description: List of prayers
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */

export const getPrayers = asyncHandler(async (req: Request, res: Response) => {
  const language = req.language || 'en';
  const school = req.query.school as string || 'hanafi';
  
  const contentNamaz = await dataService.getContentNamaz();
  const localizedContent = await localizationService.localizeContent(contentNamaz, language);
  
  sendSuccess(res, {
    prayers: localizedContent,
    school,
  }, 200, { language });
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
 *       - $ref: '#/components/parameters/SchoolParam'
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
export const getPrayerByType = asyncHandler(async (req: Request, res: Response) => {
  const { prayerType } = req.params;
  const language = req.language || 'en';
  const school = req.query.school as string || 'hanafi';
  
  const { namazDataHanefi, namazDataShafi } = await dataService.getNamezDetails();
  const prayerData = school === 'shafi' ? namazDataShafi : namazDataHanefi;
  
  const prayer = prayerData.find((p: any) => p.type === prayerType);
  
  if (!prayer) {
    throw new AppError('Prayer type not found', 404, 'PRAYER_NOT_FOUND');
  }
  
  const localizedPrayer = await localizationService.localizeContent(prayer, language);
  
  sendSuccess(res, localizedPrayer, 200, { language, school });
});

export const getPrayerSteps = asyncHandler(async (req: Request, res: Response) => {
  const { prayerType, rakatCount } = req.params;
  const language = req.language || 'en';
  const school = req.query.school as string || 'hanafi';
  
  const { namazDataHanefi, namazDataShafi } = await dataService.getNamezDetails();
  const components = await dataService.getNamezComponents();
  
  const prayerData = school === 'shafi' ? namazDataShafi : namazDataHanefi;
  const rakats = parseInt(rakatCount);
  
  const prayer = prayerData.find((p: any) => 
    p.type === prayerType && p.rakats === rakats
  );
  
  if (!prayer) {
    throw new AppError('Prayer configuration not found', 404, 'PRAYER_CONFIG_NOT_FOUND');
  }
  
  let steps: any[] = [];
  
  if (rakats === 2) {
    steps = [...components.prviRekat, ...components.drugiRekat];
  } else if (rakats === 3) {
    steps = [...components.prviRekat, ...components.drugiRekat, ...components.treciRekat];
  } else if (rakats === 4) {
    steps = [...components.prviRekat, ...components.drugiRekat, ...components.treciRekat, ...components.cetvrtiRekat];
  }
  
  const localizedSteps = await localizationService.localizeContent(steps, language);
  
  sendSuccess(res, {
    prayer: prayerType,
    rakats,
    school,
    steps: localizedSteps,
  }, 200, { language });
});

export const getPrayerStep = asyncHandler(async (req: Request, res: Response) => {
  const { prayerType, rakatCount, stepId } = req.params;
  const language = req.language || 'en';
  const school = req.query.school as string || 'hanafi';
  
  const { namazDataHanefi, namazDataShafi } = await dataService.getNamezDetails();
  const components = await dataService.getNamezComponents();
  
  const prayerData = school === 'shafi' ? namazDataShafi : namazDataHanefi;
  const rakats = parseInt(rakatCount);
  const stepIndex = parseInt(stepId);
  
  const prayer = prayerData.find((p: any) => 
    p.type === prayerType && p.rakats === rakats
  );
  
  if (!prayer) {
    throw new AppError('Prayer configuration not found', 404, 'PRAYER_CONFIG_NOT_FOUND');
  }
  
  let steps: any[] = [];
  
  if (rakats === 2) {
    steps = [...components.prviRekat, ...components.drugiRekat];
  } else if (rakats === 3) {
    steps = [...components.prviRekat, ...components.drugiRekat, ...components.treciRekat];
  } else if (rakats === 4) {
    steps = [...components.prviRekat, ...components.drugiRekat, ...components.treciRekat, ...components.cetvrtiRekat];
  }
  
  const step = steps[stepIndex];
  
  if (!step) {
    throw new AppError('Prayer step not found', 404, 'STEP_NOT_FOUND');
  }
  
  const localizedStep = await localizationService.localizeContent(step, language);
  
  sendSuccess(res, localizedStep, 200, { language });
});