import { Request, Response } from 'express';
import dataService from '../services/dataService';
import localizationService from '../services/localizationService';
import { sendSuccess } from '../utils/responseFormatter';
import { asyncHandler } from '../middleware/errorHandler';
import { AppError } from '../middleware/errorHandler';
import { processAssetUrls } from '../utils/urlHelper';

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
      nameLocaleKey: 'bajram_namaz_title',
      type: 'bajram' 
    },
    { 
      id: 'dzenaza', 
      nameLocaleKey: 'dzenaza_namaz_title',
      type: 'dzenaza' 
    },
    { 
      id: 'istihara', 
      nameLocaleKey: 'istihara_namaz_title',
      type: 'istihara' 
    },
    { 
      id: 'duha', 
      nameLocaleKey: 'duha_namaz_title',
      type: 'duha' 
    },
  ];
  
  // Process each special prayer to populate text values directly
  const processedPrayers = await processSpecialPrayerContent(specialPrayers, language);
  
  // Process asset URLs
  const prayersWithUrls = processAssetUrls(processedPrayers);
  
  sendSuccess(res, prayersWithUrls, 200, { language });
});

export const getSpecialPrayerByType = asyncHandler(async (req: Request, res: Response) => {
  const { type } = req.params;
  const language = req.language || 'en';
  
  // Load actual data from data service
  const nonMandatoryData = await dataService.getNonMandatoryPrayers();
  
  // Check if actual data is available, otherwise throw error
  if (!nonMandatoryData || !nonMandatoryData[type]) {
    throw new AppError('Special prayer type not found', 404, 'SPECIAL_PRAYER_NOT_FOUND');
  }
  
  const prayerData = nonMandatoryData[type];
  const processedPrayer = await processSpecialPrayerContent(prayerData, language);
  
  // Process asset URLs
  const prayerWithUrls = processAssetUrls({
    type,
    data: processedPrayer,
  });
  
  sendSuccess(res, prayerWithUrls, 200, { language });
});

export const getSpecialPrayerSteps = asyncHandler(async (req: Request, res: Response) => {
  const { type } = req.params;
  const language = req.language || 'en';
  
  // Load actual data from data service
  const nonMandatoryData = await dataService.getNonMandatoryPrayers();
  
  // Check if actual data is available, otherwise throw error
  if (!nonMandatoryData || !nonMandatoryData[type] || !nonMandatoryData[type].steps) {
    throw new AppError('Special prayer type not found', 404, 'SPECIAL_PRAYER_NOT_FOUND');
  }
  
  const prayerData = nonMandatoryData[type];
  const steps = prayerData.steps;
  
  // Process the prayer metadata (title, description, etc.)
  const processedPrayerData = await processSpecialPrayerContent(prayerData, language);
  
  // Process the steps to populate text values directly
  const processedSteps = await processSpecialPrayerContent(steps, language);
  
  // Process asset URLs
  const stepsWithUrls = processAssetUrls(processedSteps);
  
  // Combine prayer metadata with steps
  const response = {
    title: processedPrayerData.title,
    description: processedPrayerData.description,
    rekati: processedPrayerData.rekati,
    steps: stepsWithUrls
  };
  
  // Process asset URLs for the entire response
  const responseWithUrls = processAssetUrls(response);
  
  sendSuccess(res, responseWithUrls, 200, { language });
});
