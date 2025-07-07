import { Request, Response } from 'express';
import dataService from '../services/dataService';
import localizationService from '../services/localizationService';
import { sendSuccess } from '../utils/responseFormatter';
import { asyncHandler } from '../middleware/errorHandler';
import { AppError } from '../middleware/errorHandler';
import { processAssetUrls } from '../utils/urlHelper';

// Helper function to process dhikr data and populate text values
async function processDhikrContent(content: any, language: string): Promise<any> {
  if (!content) return content;

  if (Array.isArray(content)) {
    return Promise.all(content.map(item => processDhikrContent(item, language)));
  }

  if (typeof content === 'object' && content !== null) {
    const processed: any = {};

    for (const [key, value] of Object.entries(content)) {
      if (key === 'localeKey' && typeof value === 'string') {
        processed.text = await localizationService.getTranslation(value, language);
      } else {
        processed[key] = await processDhikrContent(value, language);
      }
    }

    return processed;
  }

  return content;
}

export const getDhikrList = asyncHandler(async (req: Request, res: Response) => {
  const language = req.language || 'en';
  const dhikrData = await dataService.getZikrData();
  
  const processedDhikr = await processDhikrContent(dhikrData, language);
  const dhikrWithUrls = processAssetUrls(processedDhikr);
  
  sendSuccess(res, dhikrWithUrls, 200, { language });
});

export const getDhikrAfterPrayer = asyncHandler(async (req: Request, res: Response) => {
  const language = req.language || 'en';
  const dhikrData = await dataService.getZikrData();
  
  const afterPrayerDhikr = dhikrData.filter((d: any) => d.afterPrayer === true);
  const processedDhikr = await processDhikrContent(afterPrayerDhikr, language);
  const dhikrWithUrls = processAssetUrls(processedDhikr);
  
  sendSuccess(res, dhikrWithUrls, 200, { language });
});

export const getDhikrById = asyncHandler(async (req: Request, res: Response) => {
  const { dhikrId } = req.params;
  const language = req.language || 'en';
  
  const dhikrData = await dataService.getZikrData();
  const dhikr = dhikrData.find((d: any) => d.id === dhikrId);
  
  if (!dhikr) {
    throw new AppError('Dhikr not found', 404, 'DHIKR_NOT_FOUND');
  }
  
  const processedDhikr = await processDhikrContent(dhikr, language);
  const dhikrWithUrls = processAssetUrls(processedDhikr);
  
  sendSuccess(res, dhikrWithUrls, 200, { language });
});