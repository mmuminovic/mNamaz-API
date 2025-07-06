import { Request, Response } from 'express';
import dataService from '../services/dataService';
import localizationService from '../services/localizationService';
import { sendSuccess } from '../utils/responseFormatter';
import { asyncHandler } from '../middleware/errorHandler';
import { AppError } from '../middleware/errorHandler';

export const getDhikrList = asyncHandler(async (req: Request, res: Response) => {
  const language = req.language || 'en';
  const dhikrData = await dataService.getZikrData();
  
  const localizedDhikr = await localizationService.localizeContent(dhikrData, language);
  
  sendSuccess(res, localizedDhikr, 200, { language });
});

export const getDhikrAfterPrayer = asyncHandler(async (req: Request, res: Response) => {
  const language = req.language || 'en';
  const dhikrData = await dataService.getZikrData();
  
  const afterPrayerDhikr = dhikrData.filter((d: any) => d.afterPrayer === true);
  const localizedDhikr = await localizationService.localizeContent(afterPrayerDhikr, language);
  
  sendSuccess(res, localizedDhikr, 200, { language });
});

export const getDhikrById = asyncHandler(async (req: Request, res: Response) => {
  const { dhikrId } = req.params;
  const language = req.language || 'en';
  
  const dhikrData = await dataService.getZikrData();
  const dhikr = dhikrData.find((d: any) => d.id === dhikrId);
  
  if (!dhikr) {
    throw new AppError('Dhikr not found', 404, 'DHIKR_NOT_FOUND');
  }
  
  const localizedDhikr = await localizationService.localizeContent(dhikr, language);
  
  sendSuccess(res, localizedDhikr, 200, { language });
});