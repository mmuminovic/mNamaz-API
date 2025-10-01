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

  private async replacePlaceholders(text: string, language: string): Promise<string> {
    const allTranslations = await this.getAllTranslations(language);

    // Replace {{key}} placeholders with their values
    // This supports nested replacements (e.g., {{zikr}} -> allahu_ekber_wxyz -> ALLAHU AKBAR)
    let result = text;
    let maxIterations = 3; // Prevent infinite loops
    let iteration = 0;

    while (iteration < maxIterations && result.includes('{{')) {
      const previousResult = result;

      result = result.replace(/\{\{(\w+)\}\}/g, (match, key) => {
        const value = allTranslations[key];
        if (value !== undefined) {
          return String(value);
        }
        return match;
      });

      // If no changes were made, break to avoid infinite loop
      if (result === previousResult) {
        break;
      }

      iteration++;
    }

    return result;
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
          const translation = await this.getTranslation(value, language);
          localized['text'] = await this.replacePlaceholders(translation, language);
          localized[key] = value;
        } else if (key === 'localeDict' && typeof value === 'string') {
          const translations = await this.getTranslationsByPrefix(value, language);
          localized['translations'] = translations;
          localized[key] = value;
        } else if (typeof value === 'string' && value.includes('{{')) {
          // Handle string values with placeholders
          localized[key] = await this.replacePlaceholders(value, language);
        } else {
          localized[key] = await this.localizeContent(value, language);
        }
      }

      return localized;
    }

    if (typeof content === 'string' && content.includes('{{')) {
      return this.replacePlaceholders(content, language);
    }

    return content;
  }

  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Processes a text string and replaces all {{placeholder}} with their translation values
   * Supports nested replacements (e.g., {{zikr}} -> allahu_ekber_wxyz -> ALLAHU AKBAR)
   */
  async processPlaceholders(text: string, language: string): Promise<string> {
    return this.replacePlaceholders(text, language);
  }
}

export default new LocalizationService();