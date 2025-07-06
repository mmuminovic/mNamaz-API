import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger';
import { ApiResponse } from '../types/namaz.types';

export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;
  code: string;

  constructor(message: string, statusCode: number, code: string, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export const notFoundHandler = (req: Request, res: Response) => {
  const response: ApiResponse<null> = {
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: `Resource not found: ${req.originalUrl}`,
    },
    meta: {
      timestamp: new Date().toISOString(),
      language: req.language || 'en',
      version: 'v1',
    },
  };

  res.status(404).json(response);
};

export const globalErrorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  let error = err;

  if (!(error instanceof AppError)) {
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    error = new AppError(error.message, statusCode, 'INTERNAL_ERROR', false);
  }

  const appError = error as AppError;

  if (appError.statusCode >= 500) {
    logger.error({
      message: appError.message,
      stack: appError.stack,
      url: req.url,
      method: req.method,
      ip: req.ip,
    });
  }

  const response: ApiResponse<null> = {
    success: false,
    error: {
      code: appError.code,
      message: appError.message,
      ...(process.env.NODE_ENV === 'development' && { stack: appError.stack }),
    },
    meta: {
      timestamp: new Date().toISOString(),
      language: req.language || 'en',
      version: 'v1',
    },
  };

  res.status(appError.statusCode).json(response);
};