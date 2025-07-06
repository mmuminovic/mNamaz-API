import dotenv from 'dotenv';
import { z } from 'zod';
import path from 'path';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().transform(Number).default('3000'),
  HOST: z.string().default('0.0.0.0'),
  API_VERSION: z.string().default('v1'),
  API_PREFIX: z.string().default('/api'),
  RATE_LIMIT_WINDOW_MS: z.string().transform(Number).default('900000'),
  RATE_LIMIT_MAX_REQUESTS: z.string().transform(Number).default('100'),
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
  LOG_DIR: z.string().default('logs'),
  CORS_ORIGIN: z.string().default('*'),
  HELMET_ENABLED: z.string().transform((val) => val === 'true').default('true'),
  DEFAULT_LANGUAGE: z.string().default('en'),
  SUPPORTED_LANGUAGES: z.string().default('en,bs,tr,al,de,es,fr,id,ru,ur'),
  MEDIA_BASE_URL: z.string().default('http://localhost:3000/api/v1/media'),
  ENABLE_CDN: z.string().transform((val) => val === 'true').default('false'),
  CDN_URL: z.string().optional(),
  CACHE_TTL: z.string().transform(Number).default('3600'),
});

const env = envSchema.parse(process.env);

export const config = {
  env: env.NODE_ENV,
  port: env.PORT,
  host: env.HOST,
  api: {
    version: env.API_VERSION,
    prefix: env.API_PREFIX,
  },
  rateLimit: {
    windowMs: env.RATE_LIMIT_WINDOW_MS,
    max: env.RATE_LIMIT_MAX_REQUESTS,
  },
  logging: {
    level: env.LOG_LEVEL,
    dir: env.LOG_DIR,
  },
  cors: {
    origin: env.CORS_ORIGIN,
  },
  security: {
    helmetEnabled: env.HELMET_ENABLED,
  },
  i18n: {
    defaultLanguage: env.DEFAULT_LANGUAGE,
    supportedLanguages: env.SUPPORTED_LANGUAGES.split(','),
  },
  media: {
    baseUrl: env.MEDIA_BASE_URL,
    enableCDN: env.ENABLE_CDN,
    cdnUrl: env.CDN_URL,
  },
  cache: {
    ttl: env.CACHE_TTL,
  },
  paths: {
    root: path.resolve(__dirname, '../..'),
    data: path.resolve(__dirname, '../../data'),
    locales: path.resolve(__dirname, '../../locales'),
    audio: path.resolve(__dirname, '../../data/namaz/audio'),
  },
};