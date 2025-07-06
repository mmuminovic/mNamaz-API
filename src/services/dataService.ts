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
import { createMockPrayerData } from '../data/prayerMappings';

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
      // Replace require() statements with placeholder strings
      content = content.replace(/require\(['"].*?([^/\\]+\.(png|jpg|jpeg|gif|mp3))['"]?\)/g, '"$1"');
      
      // Extract individual exports
      const namazDataHanefiMatch = content.match(/const namazDataHanefi\s*=\s*(\[[\s\S]*?\]);/);
      const namazDataShafiMatch = content.match(/const namazDataShafi\s*=\s*(\[[\s\S]*?\]);/);
      
      // Parse the extracted data
      if (namazDataHanefiMatch && namazDataShafiMatch) {
        const hanefiData = eval(`(${namazDataHanefiMatch[1]})`);
        const shafiData = eval(`(${namazDataShafiMatch[1]})`);
        
        return {
          namazDataHanefi: hanefiData,
          namazDataShafi: shafiData
        };
      }
      
      // If specific format not found, try generic parsing
      const exportMatch = content.match(/export\s*(?:const|let|var)?\s*(?:{[^}]+}|\w+)\s*=\s*([\s\S]+)$/);
      if (exportMatch) {
        return eval(`(${exportMatch[1]})`);
      }
      
      return {};
    } catch (error) {
      logger.error('Failed to parse data file', error);
      return {};
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
    
    try {
      // Try to load the actual data from the file
      const module = await this.loadModule<any>(filePath);
      
      if (module.namazDataHanefi && module.namazDataShafi) {
        // If we have the actual data, try to map it to prayer types
        const hanefiWithTypes = this.mapRakatsToPrayerTypes(module.namazDataHanefi);
        const shafiWithTypes = this.mapRakatsToPrayerTypes(module.namazDataShafi);
        
        return {
          namazDataHanefi: hanefiWithTypes,
          namazDataShafi: shafiWithTypes
        };
      }
    } catch (error) {
      logger.warn('Could not load namaz details from file, using direct import', error);
    }
    
    // Try direct import of the data
    try {
      const { namazDataHanefi, namazDataShafi } = await import(filePath);
      
      if (namazDataHanefi && namazDataShafi) {
        const hanefiWithTypes = this.mapRakatsToPrayerTypes(namazDataHanefi);
        const shafiWithTypes = this.mapRakatsToPrayerTypes(namazDataShafi);
        
        return {
          namazDataHanefi: hanefiWithTypes,
          namazDataShafi: shafiWithTypes
        };
      }
    } catch (error) {
      logger.warn('Could not import namaz details, using fallback data', error);
    }
    
    // Fallback to mock data with correct structure
    const mockData = createMockPrayerData();
    
    return {
      namazDataHanefi: mockData,
      namazDataShafi: mockData
    };
  }

  private mapRakatsToPrayerTypes(rakatData: any[]): any[] {
    const mappedData: any[] = [];
    
    rakatData.forEach((entry: any) => {
      if (entry.num === 2) {
        // 2 rakats = Fajr
        mappedData.push({
          type: 'fajr',
          rakats: 2,
          name: 'Fajr',
          localName: 'sabah',
          steps: Array.isArray(entry.steps) ? entry.steps : []
        });
      } else if (entry.num === 3) {
        // 3 rakats = Maghrib
        mappedData.push({
          type: 'maghrib',
          rakats: 3,
          name: 'Maghrib',
          localName: 'aksam',
          steps: Array.isArray(entry.steps) ? entry.steps : []
        });
      } else if (entry.num === 4) {
        // 4 rakats = Dhuhr, Asr, Isha
        ['dhuhr', 'asr', 'isha'].forEach(prayerType => {
          const names = {
            dhuhr: { name: 'Dhuhr', localName: 'podne' },
            asr: { name: 'Asr', localName: 'ikindija' },
            isha: { name: 'Isha', localName: 'jacija' }
          };
          
          mappedData.push({
            type: prayerType,
            rakats: 4,
            name: names[prayerType as keyof typeof names].name,
            localName: names[prayerType as keyof typeof names].localName,
            steps: Array.isArray(entry.steps) ? entry.steps : []
          });
        });
      }
    });
    
    return mappedData;
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