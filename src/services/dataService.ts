import fs from 'fs/promises';
import path from 'path';
import { config } from '../config/env';
import logger from '../config/logger';
import { 
  AbdestStep, 
  Lesson, 
  Dhikr,
  AudioResource 
} from '../types/namaz.types';

class DataService {
  private cache: Map<string, any> = new Map();
  private readonly cacheTTL = config.cache.ttl * 1000;

  async loadJsonFile<T>(filePath: string): Promise<T> {
    const cacheKey = `json:${filePath}`;
    const cached = this.getFromCache(cacheKey);
    if (cached) return cached;

    try {
      const data = await fs.readFile(filePath, 'utf-8');
      const parsed = JSON.parse(data);
      this.setCache(cacheKey, parsed);
      return parsed;
    } catch (error) {
      logger.error(`Failed to load JSON file: ${filePath}`, error);
      throw error;
    }
  }

  async loadModule<T>(filePath: string): Promise<T> {
    const cacheKey = `module:${filePath}`;
    const cached = this.getFromCache(cacheKey);
    if (cached) return cached;

    try {
      // Read file as text and parse it manually to handle require() statements
      const fileContent = await fs.readFile(filePath, 'utf-8');
      const data = this.parseDataFile(fileContent);
      
      this.setCache(cacheKey, data);
      return data as T;
    } catch (error) {
      logger.error(`Failed to load module: ${filePath}`, { 
        error: error instanceof Error ? error.message : error,
        stack: error instanceof Error ? error.stack : undefined
      });
      
      throw new Error(`Failed to load data from ${filePath}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private parseDataFile(content: string): any {
    try {
      // Remove require() statements and replace with image filenames
      let cleanContent = content.replace(/require\(['"].*?([^/\\]+\.(png|jpg|jpeg|gif))['"]?\)/g, '"$1"');
      
      // Remove export statement to make it valid JSON-like
      cleanContent = cleanContent.replace(/^export\s+(const|let|var)\s+\w+\s*:\s*[^=]*=\s*/, '');
      cleanContent = cleanContent.replace(/;?\s*$/, '');
      
      // Parse as JavaScript object
      const data = eval(`(${cleanContent})`);
      return data;
    } catch (error) {
      logger.error('Failed to parse data file', error);
      return [];
    }
  }

  private sanitizeModuleData(data: any): any {
    if (typeof data === 'string' && data.includes('require(')) {
      // Handle string data with require statements
      return data;
    }
    
    if (Array.isArray(data)) {
      return data.map(item => this.sanitizeModuleData(item));
    }
    
    if (typeof data === 'object' && data !== null) {
      const sanitized: any = {};
      for (const [key, value] of Object.entries(data)) {
        if (key === 'image' && typeof value === 'string' && value.includes('require(')) {
          // Extract filename from require statement or use placeholder
          const match = value.match(/require\(['"].*?([^/\\]+\.(png|jpg|jpeg|gif))['"]?\)/);
          sanitized[key] = match ? match[1] : 'placeholder.png';
        } else {
          sanitized[key] = this.sanitizeModuleData(value);
        }
      }
      return sanitized;
    }
    
    return data;
  }

  async getAbdestSteps(): Promise<AbdestStep[]> {
    const filePath = path.join(config.paths.data, 'namaz/abdest.ts');
    const data = await this.loadModule<AbdestStep[]>(filePath);
    return Array.isArray(data) ? data : [];
  }

  async getNamezComponents(): Promise<any> {
    const filePath = path.join(config.paths.data, 'namaz/namazComponents.ts');
    const module = await this.loadModule<any>(filePath);
    return module.namazComponents || module.default || module;
  }

  async getNamezDetails(): Promise<{ namazDataHanefi: any[], namazDataShafi: any[] }> {
    const filePath = path.join(config.paths.data, 'namaz/namazDetails.ts');
    const module = await this.loadModule<any>(filePath);
    return {
      namazDataHanefi: module.namazDataHanefi || [],
      namazDataShafi: module.namazDataShafi || []
    };
  }

  async getLessons(): Promise<Lesson[]> {
    const filePath = path.join(config.paths.data, 'namaz/namazIntro.ts');
    const module = await this.loadModule<{ namazIntro: Lesson[] }>(filePath);
    return module.namazIntro;
  }

  async getNonMandatoryPrayers(): Promise<any> {
    const filePath = path.join(config.paths.data, 'namaz/nonMandatoryNamaz.ts');
    const module = await this.loadModule<any>(filePath);
    return module.nonMandatoryPrayers || module.default || module;
  }

  async getZikrData(): Promise<Dhikr[]> {
    const filePath = path.join(config.paths.data, 'namaz/zikrAtTheEnd.ts');
    const module = await this.loadModule<any>(filePath);
    return module.zikrAtTheEnd || module.default || [];
  }

  async getAudioData(): Promise<any> {
    const filePath = path.join(config.paths.data, 'namaz/audioData.ts');
    const module = await this.loadModule<any>(filePath);
    return module.audioData || module.default || module;
  }

  async getPrayerTimes(): Promise<any> {
    const filePath = path.join(config.paths.data, 'namaz/prayerTimes.json');
    return this.loadJsonFile<any>(filePath);
  }

  async getCities(): Promise<any> {
    const filePath = path.join(config.paths.data, 'namaz/cities.json');
    return this.loadJsonFile<any>(filePath);
  }

  async getContentNamaz(): Promise<any> {
    const filePath = path.join(config.paths.data, 'namaz/contentNamaz.json');
    return this.loadJsonFile<any>(filePath);
  }

  async getSalahData(): Promise<any> {
    const filePath = path.join(config.paths.data, 'namaz/salah.json');
    return this.loadJsonFile<any>(filePath);
  }

  async getAudioResources(): Promise<AudioResource[]> {
    const audioDir = config.paths.audio;
    const resources: AudioResource[] = [];

    try {
      const files = await this.getAudioFiles(audioDir);
      
      for (const file of files) {
        const category = file.includes('zikr/') ? 'dhikr' : 
                        file.includes('azan') ? 'azan' :
                        file.includes('iqamah') ? 'iqamah' : 'prayer';
        
        resources.push({
          id: path.basename(file, '.mp3'),
          filename: path.basename(file),
          path: file,
          category,
        });
      }

      return resources;
    } catch (error) {
      logger.error('Failed to get audio resources', error);
      return [];
    }
  }

  private async getAudioFiles(dir: string, fileList: string[] = []): Promise<string[]> {
    const files = await fs.readdir(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = await fs.stat(filePath);

      if (stat.isDirectory()) {
        await this.getAudioFiles(filePath, fileList);
      } else if (file.endsWith('.mp3')) {
        fileList.push(filePath.replace(config.paths.audio + '/', ''));
      }
    }

    return fileList;
  }

  private getFromCache(key: string): any {
    const cached = this.cache.get(key);
    if (!cached) return null;

    if (Date.now() - cached.timestamp > this.cacheTTL) {
      this.cache.delete(key);
      return null;
    }

    return cached.data;
  }

  private setCache(key: string, data: any): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  clearCache(): void {
    this.cache.clear();
  }
}

export default new DataService();