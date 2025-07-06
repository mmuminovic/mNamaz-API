import i18next from 'i18next';
import fs from 'fs/promises';
import path from 'path';
import { config } from '../config/env';
import logger from '../config/logger';

class LocalizationService {
  private cache: Map<string, any> = new Map();

  async getTranslation(key: string, language: string): Promise<string> {
    try {
      return i18next.t(key, { lng: language });
    } catch (error) {
      logger.error(`Failed to get translation for key: ${key}, language: ${language}`, error);
      return key;
    }
  }

  async getTranslations(keys: string[], language: string): Promise<Record<string, string>> {
    const translations: Record<string, string> = {};
    
    for (const key of keys) {
      translations[key] = await this.getTranslation(key, language);
    }
    
    return translations;
  }

  async getAllTranslations(language: string): Promise<any> {
    const cacheKey = `all:${language}`;
    const cached = this.cache.get(cacheKey);
    if (cached) return cached;

    try {
      const filePath = path.join(config.paths.locales, language, 'all.json');
      const data = await fs.readFile(filePath, 'utf-8');
      const translations = JSON.parse(data);
      
      this.cache.set(cacheKey, translations);
      return translations;
    } catch (error) {
      logger.error(`Failed to load translations for language: ${language}`, error);
      
      if (language !== config.i18n.defaultLanguage) {
        return this.getAllTranslations(config.i18n.defaultLanguage);
      }
      
      return {};
    }
  }

  async getTranslationsByPrefix(prefix: string, language: string): Promise<Record<string, string>> {
    const allTranslations = await this.getAllTranslations(language);
    const filtered: Record<string, string> = {};
    
    for (const [key, value] of Object.entries(allTranslations)) {
      if (key.startsWith(prefix)) {
        filtered[key] = value as string;
      }
    }
    
    return filtered;
  }

  async getSupportedLanguages(): Promise<string[]> {
    try {
      const localesDir = config.paths.locales;
      const entries = await fs.readdir(localesDir, { withFileTypes: true });
      
      const languages = entries
        .filter(entry => entry.isDirectory())
        .map(entry => entry.name)
        .filter(name => config.i18n.supportedLanguages.includes(name));
      
      return languages;
    } catch (error) {
      logger.error('Failed to get supported languages', error);
      return [config.i18n.defaultLanguage];
    }
  }

  async localizeContent(content: any, language: string): Promise<any> {
    if (!content) return content;

    if (Array.isArray(content)) {
      return Promise.all(content.map(item => this.localizeContent(item, language)));
    }

    if (typeof content === 'object' && content !== null) {
      const localized: any = {};

      for (const [key, value] of Object.entries(content)) {
        if (key === 'localeKey' && typeof value === 'string') {
          localized['text'] = await this.getTranslation(value, language);
          localized[key] = value;
        } else if (key === 'localeDict' && typeof value === 'string') {
          const translations = await this.getTranslationsByPrefix(value, language);
          localized['translations'] = translations;
          localized[key] = value;
        } else {
          localized[key] = await this.localizeContent(value, language);
        }
      }

      return localized;
    }

    return content;
  }

  clearCache(): void {
    this.cache.clear();
  }
}

export default new LocalizationService();