import { Request, Response } from 'express';
import dataService from '../services/dataService';
import localizationService from '../services/localizationService';
import { sendSuccess } from '../utils/responseFormatter';
import { asyncHandler } from '../middleware/errorHandler';
import { AppError } from '../middleware/errorHandler';

export const getSpecialPrayers = asyncHandler(async (req: Request, res: Response) => {
  const language = req.language || 'en';
  
  const specialPrayers = [
    { id: 'bajram', name: 'Eid Prayer', type: 'bajram' },
    { id: 'dzenaza', name: 'Funeral Prayer', type: 'dzenaza' },
    { id: 'istihara', name: 'Istikharah Prayer', type: 'istihara' },
    { id: 'duha', name: 'Duha Prayer', type: 'duha' },
  ];
  
  const localizedPrayers = await localizationService.localizeContent(specialPrayers, language);
  
  sendSuccess(res, localizedPrayers, 200, { language });
});

export const getSpecialPrayerByType = asyncHandler(async (req: Request, res: Response) => {
  const { type } = req.params;
  const language = req.language || 'en';
  
  const nonMandatoryData = await dataService.getNonMandatoryPrayers();
  
  if (!nonMandatoryData[type]) {
    throw new AppError('Special prayer type not found', 404, 'SPECIAL_PRAYER_NOT_FOUND');
  }
  
  const prayerData = nonMandatoryData[type];
  const localizedPrayer = await localizationService.localizeContent(prayerData, language);
  
  sendSuccess(res, {
    type,
    data: localizedPrayer,
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
  const localizedSteps = await localizationService.localizeContent(steps, language);
  
  sendSuccess(res, localizedSteps, 200, { language });
});