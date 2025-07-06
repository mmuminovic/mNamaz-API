import { Request, Response } from 'express';
import dataService from '../services/dataService';
import localizationService from '../services/localizationService';
import { sendSuccess } from '../utils/responseFormatter';
import { asyncHandler } from '../middleware/errorHandler';
import { AppError } from '../middleware/errorHandler';

// Helper function to process special prayer content and populate text values
async function processSpecialPrayerContent(content: any, language: string): Promise<any> {
  if (!content) return content;

  if (Array.isArray(content)) {
    return Promise.all(content.map(item => processSpecialPrayerContent(item, language)));
  }

  if (typeof content === 'object' && content !== null) {
    const processed: any = {};

    for (const [key, value] of Object.entries(content)) {
      if (key === 'localeKey' && typeof value === 'string') {
        processed.text = await localizationService.getTranslation(value, language);
      } else if (key === 'nameLocaleKey' && typeof value === 'string') {
        processed.name = await localizationService.getTranslation(value, language);
      } else if (key === 'descriptionLocaleKey' && typeof value === 'string') {
        processed.description = await localizationService.getTranslation(value, language);
      } else if (key === 'titleLocaleKey' && typeof value === 'string') {
        processed.title = await localizationService.getTranslation(value, language);
      } else {
        processed[key] = await processSpecialPrayerContent(value, language);
      }
    }

    return processed;
  }

  return content;
}

export const getSpecialPrayers = asyncHandler(async (req: Request, res: Response) => {
  const language = req.language || 'en';
  
  const specialPrayers = [
    { 
      id: 'bajram', 
      nameLocaleKey: 'special-prayer-bajram-name',
      name: 'Eid Prayer', 
      type: 'bajram' 
    },
    { 
      id: 'dzenaza', 
      nameLocaleKey: 'special-prayer-dzenaza-name',
      name: 'Funeral Prayer', 
      type: 'dzenaza' 
    },
    { 
      id: 'istihara', 
      nameLocaleKey: 'special-prayer-istihara-name',
      name: 'Istikharah Prayer', 
      type: 'istihara' 
    },
    { 
      id: 'duha', 
      nameLocaleKey: 'special-prayer-duha-name',
      name: 'Duha Prayer', 
      type: 'duha' 
    },
  ];
  
  // Process each special prayer to populate text values directly
  const processedPrayers = await processSpecialPrayerContent(specialPrayers, language);
  
  sendSuccess(res, processedPrayers, 200, { language });
});

export const getSpecialPrayerByType = asyncHandler(async (req: Request, res: Response) => {
  const { type } = req.params;
  const language = req.language || 'en';
  
  const nonMandatoryData = await dataService.getNonMandatoryPrayers();
  
  if (!nonMandatoryData[type]) {
    throw new AppError('Special prayer type not found', 404, 'SPECIAL_PRAYER_NOT_FOUND');
  }
  
  const prayerData = nonMandatoryData[type];
  
  // Process the prayer data to populate text values directly
  const processedPrayer = await processSpecialPrayerContent(prayerData, language);
  
  sendSuccess(res, {
    type,
    data: processedPrayer,
  }, 200, { language });
});

export const getSpecialPrayerSteps = asyncHandler(async (req: Request, res: Response) => {
  const { type } = req.params;
  const language = req.language || 'en';
  
  const nonMandatoryData = await dataService.getNonMandatoryPrayers();
  
  if (!nonMandatoryData[type]) {
    throw new AppError('Special prayer type not found', 404, 'SPECIAL_PRAYER_NOT_FOUND');
  }
  
  const steps = nonMandatoryData[type].steps || nonMandatoryData[type];
  
  // Process the steps to populate text values directly
  const processedSteps = await processSpecialPrayerContent(steps, language);
  
  sendSuccess(res, processedSteps, 200, { language });
});