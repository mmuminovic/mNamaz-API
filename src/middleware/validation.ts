import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { z } from 'zod';
import { AppError } from './errorHandler';

export const validateRequest = (req: Request, _res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError(
      'Validation failed',
      400,
      'VALIDATION_ERROR'
    );
  }
  next();
};

export const validateZodSchema = (schema: z.ZodSchema) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new AppError(
          'Validation failed',
          400,
          'VALIDATION_ERROR'
        );
      }
      next(error);
    }
  };
};

export const validateLanguage = (req: Request, _res: Response, next: NextFunction) => {
  const lang = req.query.lang || req.headers['accept-language']?.split(',')[0] || 'en';
  const supportedLanguages = ['en', 'bs', 'tr', 'al', 'de', 'es', 'fr', 'id', 'ru', 'ur'];
  
  if (!supportedLanguages.includes(lang as string)) {
    req.language = 'en';
  } else {
    req.language = lang as string;
  }
  
  next();
};