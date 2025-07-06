import { Request, Response } from 'express';
import localizationService from '../services/localizationService';
import { sendSuccess } from '../utils/responseFormatter';
import { asyncHandler } from '../middleware/errorHandler';
import { AppError } from '../middleware/errorHandler';

/**
 * @swagger
 * /locales:
 *   get:
 *     summary: Get supported languages
 *     description: Retrieve list of all supported languages with their codes and names
 *     tags: [Localization]
 *     responses:
 *       200:
 *         description: List of supported languages
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Language'
 */

export const getSupportedLanguages = asyncHandler(async (_req: Request, res: Response) => {
  const languages = await localizationService.getSupportedLanguages();
  
  const languageData = languages.map(lang => ({
    code: lang,
    name: getLanguageName(lang),
    nativeName: getNativeLanguageName(lang),
  }));
  
  sendSuccess(res, languageData);
});

export const getTranslations = asyncHandler(async (req: Request, res: Response) => {
  const { language } = req.params;
  const prefix = req.query.prefix as string;
  
  const supportedLanguages = await localizationService.getSupportedLanguages();
  
  if (!supportedLanguages.includes(language)) {
    throw new AppError('Unsupported language', 400, 'UNSUPPORTED_LANGUAGE');
  }
  
  const translations = prefix
    ? await localizationService.getTranslationsByPrefix(prefix, language)
    : await localizationService.getAllTranslations(language);
  
  sendSuccess(res, translations, 200, { language });
});

export const getTranslationByKey = asyncHandler(async (req: Request, res: Response) => {
  const { language, key } = req.params;
  
  const supportedLanguages = await localizationService.getSupportedLanguages();
  
  if (!supportedLanguages.includes(language)) {
    throw new AppError('Unsupported language', 400, 'UNSUPPORTED_LANGUAGE');
  }
  
  const translation = await localizationService.getTranslation(key, language);
  
  sendSuccess(res, { key, value: translation }, 200, { language });
});

function getLanguageName(code: string): string {
  const names: Record<string, string> = {
    en: 'English',
    bs: 'Bosnian',
    tr: 'Turkish',
    al: 'Albanian',
    de: 'German',
    es: 'Spanish',
    fr: 'French',
    id: 'Indonesian',
    ru: 'Russian',
    ur: 'Urdu',
  };
  return names[code] || code;
}

function getNativeLanguageName(code: string): string {
  const names: Record<string, string> = {
    en: 'English',
    bs: 'Bosanski',
    tr: 'Türkçe',
    al: 'Shqip',
    de: 'Deutsch',
    es: 'Español',
    fr: 'Français',
    id: 'Bahasa Indonesia',
    ru: 'Русский',
    ur: 'اردو',
  };
  return names[code] || code;
}