import fs from "fs/promises";
import path from "path";
import { config } from "../config/env";
import logger from "../config/logger";
import { AbdestStep, Lesson, Dhikr, AudioResource } from "../types/namaz.types";

class DataService {
  private cache: Map<string, any> = new Map();
  private readonly cacheTTL = config.cache.ttl * 1000;

  async loadJsonFile<T>(filePath: string): Promise<T> {
    const cacheKey = `json:${filePath}`;
    const cached = this.getFromCache(cacheKey);
    if (cached) return cached;

    try {
      const data = await fs.readFile(filePath, "utf-8");
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
      const fileContent = await fs.readFile(filePath, "utf-8");
      const data = this.parseDataFile(fileContent);

      this.setCache(cacheKey, data);
      return data as T;
    } catch (error) {
      logger.error(`Failed to load module: ${filePath}`, {
        error: error instanceof Error ? error.message : error,
        stack: error instanceof Error ? error.stack : undefined,
      });

      throw new Error(
        `Failed to load data from ${filePath}: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  }

  private parseDataFile(content: string): any {
    try {
      // Replace require() statements with full path strings
      content = content.replace(
        /require\(['"](.+?\.(png|jpg|jpeg|gif|mp3))['"]?\)/g,
        '"$1"'
      );

      // Extract individual exports
      const namazDataHanefiMatch = content.match(
        /const namazDataHanefi\s*=\s*(\[[\s\S]*?\]);/
      );
      const namazDataShafiMatch = content.match(
        /const namazDataShafi\s*=\s*(\[[\s\S]*?\]);/
      );

      // Parse the extracted data
      if (namazDataHanefiMatch && namazDataShafiMatch) {
        const hanefiData = eval(`(${namazDataHanefiMatch[1]})`);
        const shafiData = eval(`(${namazDataShafiMatch[1]})`);

        return {
          namazDataHanefi: hanefiData,
          namazDataShafi: shafiData,
        };
      }

      // Check for lessons export
      const lessonsMatch = content.match(
        /export\s+const\s+lessons\s*=\s*(\[[\s\S]*?\]);/
      );
      if (lessonsMatch) {
        const lessonsData = eval(`(${lessonsMatch[1]})`);
        return { lessons: lessonsData };
      }

      // Check for nonMandatoryNamaz export with better pattern matching
      const nonMandatoryStart = content.indexOf(
        "export const nonMandatoryNamaz = {"
      );
      if (nonMandatoryStart !== -1) {
        try {
          console.log("Attempting to parse nonMandatoryNamaz...");

          // Extract all const declarations needed
          const bajramMatch = content.match(
            /const bajramNamaz\s*=\s*(\[[\s\S]*?\]);/
          );
          const dzenazaMatch = content.match(
            /export const dzenazaNamaz\s*=\s*(\[[\s\S]*?\]);/
          );
          const istiharaMatch = content.match(
            /const istiharaNamaz\s*=\s*(\[[\s\S]*?\]);/
          );
          const duhaMatch = content.match(
            /const duhaNamaz\s*=\s*(\[[\s\S]*?\]);/
          );

          console.log("Regex matches:", {
            bajram: !!bajramMatch,
            dzenaza: !!dzenazaMatch,
            istihara: !!istiharaMatch,
            duha: !!duhaMatch,
          });

          let braceCount = 0;
          let start = content.indexOf("{", nonMandatoryStart);
          let end = start;

          for (let i = start; i < content.length; i++) {
            if (content[i] === "{") braceCount++;
            if (content[i] === "}") braceCount--;
            if (braceCount === 0) {
              end = i;
              break;
            }
          }

          console.log("Object boundaries:", { start, end });

          if (
            end > start &&
            bajramMatch &&
            dzenazaMatch &&
            istiharaMatch &&
            duhaMatch
          ) {
            const objectContent = content.substring(start, end + 1);
            console.log(
              "Object content preview:",
              objectContent.substring(0, 200) + "..."
            );

            // Create eval context with all needed variables
            const evalCode = `
              const bajramNamaz = ${bajramMatch[1]};
              const dzenazaNamaz = ${dzenazaMatch[1]};
              const istiharaNamaz = ${istiharaMatch[1]};
              const duhaNamaz = ${duhaMatch[1]};
              (${objectContent})
            `;

            console.log("Evaluating code...");
            const nonMandatoryData = eval(evalCode);
            console.log(
              "Successfully parsed nonMandatoryNamaz with keys:",
              Object.keys(nonMandatoryData)
            );
            return { nonMandatoryNamaz: nonMandatoryData };
          } else {
            console.log("Missing required matches or invalid boundaries");
          }
        } catch (error) {
          console.error("Failed to parse nonMandatoryNamaz:", error);
        }
      }

      // Check for abdestData export
      const abdestMatch = content.match(
        /export\s+const\s+abdestData\s*:\s*any\[\]\s*=\s*(\[[\s\S]*?\]);/
      );
      if (abdestMatch) {
        const abdestData = eval(`(${abdestMatch[1]})`);
        return abdestData;
      }

      // Check for zikrAtTheEnd export
      const zikrMatch = content.match(
        /export\s+const\s+zikrAtTheEnd\s*=\s*(\[[\s\S]*?\]);/
      );
      if (zikrMatch) {
        const zikrData = eval(`(${zikrMatch[1]})`);
        return { zikrAtTheEnd: zikrData };
      }

      // If specific format not found, try generic parsing
      const exportMatch = content.match(
        /export\s*(?:const|let|var)?\s*(?:{[^}]+}|\w+)\s*=\s*([\s\S]+)$/
      );
      if (exportMatch) {
        return eval(`(${exportMatch[1]})`);
      }

      return {};
    } catch (error) {
      logger.error("Failed to parse data file", error);
      return {};
    }
  }

  private sanitizeModuleData(data: any): any {
    if (typeof data === "string" && data.includes("require(")) {
      // Handle string data with require statements
      return data;
    }

    if (Array.isArray(data)) {
      return data.map((item) => this.sanitizeModuleData(item));
    }

    if (typeof data === "object" && data !== null) {
      const sanitized: any = {};
      for (const [key, value] of Object.entries(data)) {
        if (
          key === "image" &&
          typeof value === "string" &&
          value.includes("require(")
        ) {
          // Extract filename from require statement or use placeholder
          const match = value.match(
            /require\(['"].*?([^/\\]+\.(png|jpg|jpeg|gif))['"]?\)/
          );
          sanitized[key] = match ? match[1] : "placeholder.png";
        } else {
          sanitized[key] = this.sanitizeModuleData(value);
        }
      }
      return sanitized;
    }

    return data;
  }

  async getAbdestSteps(): Promise<AbdestStep[]> {
    const filePath = path.join(config.paths.data, "namaz/abdest.ts");
    const data = await this.loadModule<AbdestStep[]>(filePath);
    return Array.isArray(data) ? data : [];
  }

  async getNamezComponents(): Promise<any> {
    const filePath = path.join(config.paths.data, "namaz/namazComponents.ts");
    const module = await this.loadModule<any>(filePath);
    return module.namazComponents || module.default || module;
  }

  async getNamezDetails(): Promise<{
    namazDataHanefi: any[];
    namazDataShafi: any[];
  }> {
    const filePath = path.join(config.paths.data, "namaz/namazDetails.ts");

    // Try direct import of the data first
    try {
      const { namazDataHanefi, namazDataShafi } = await import(filePath);

      if (namazDataHanefi && namazDataShafi) {
        return {
          namazDataHanefi: namazDataHanefi,
          namazDataShafi: namazDataShafi,
        };
      }
    } catch (error) {
      logger.error("Could not import namaz details directly, trying loadModule", error);
    }

    // Try to load the actual data from the file
    const module = await this.loadModule<any>(filePath);

    if (module.namazDataHanefi && module.namazDataShafi) {
      return {
        namazDataHanefi: module.namazDataHanefi,
        namazDataShafi: module.namazDataShafi,
      };
    }

    throw new Error("Failed to load namaz details data");
  }

  async getLessons(): Promise<Lesson[]> {
    const filePath = path.join(config.paths.data, "namaz/namazIntro.ts");

    try {
      const module = await this.loadModule<{ lessons: Lesson[] }>(filePath);
      const lessons = module.lessons || [];

      // Add IDs to lessons if they don't have them
      return lessons.map((lesson, index) => ({
        ...lesson,
        id: lesson.id || index + 1,
      }));
    } catch (error) {
      logger.error("Failed to load lessons from file", error);

      // Return empty array as fallback
      return [];
    }
  }

  async getNonMandatoryPrayers(): Promise<any> {
    const filePath = path.join(config.paths.data, "namaz/nonMandatoryNamaz.ts");

    try {
      // Read the file content
      const fileContent = await fs.readFile(filePath, "utf-8");

      // Load namazComponents separately
      const componentsPath = path.join(config.paths.data, "namaz/namazComponents.ts");
      const componentsContent = await fs.readFile(componentsPath, "utf-8");

      // Replace require() calls with actual file paths from both files
      const processContent = (content: string) =>
        content.replace(/const\s+(\w+)\s*=\s*require\(['"]([^'"]+)['"]\);/g, (_match, varName, filePath) => {
          // Extract the actual file path from the require statement
          return `const ${varName} = "${filePath}";`;
        });

      const componentsCode = processContent(componentsContent)
        .replace(/export\s+/g, '');

      const mainCode = processContent(fileContent)
        .replace(/import\s+{([^}]+)}\s+from\s+['"]\.\/namazComponents['"]/g, '')
        .replace(/export\s+/g, '');

      // Extract unique asset declarations from mainCode that aren't in componentsCode
      const mainAssetMatches = mainCode.match(/^const\s+(\w+)\s*=\s*"[^"]+";/gm) || [];
      const componentAssetMatches = componentsCode.match(/const\s+(\w+)\s*=\s*"[^"]+";/g) || [];

      const componentAssetNames = new Set(
        componentAssetMatches.map(line => line.match(/const\s+(\w+)/)?.[1]).filter(Boolean)
      );

      const uniqueMainAssets = mainAssetMatches.filter(line => {
        const varName = line.match(/const\s+(\w+)/)?.[1];
        return varName && !componentAssetNames.has(varName);
      });

      const assetsCode = uniqueMainAssets.join('\n');

      // Extract all const declarations from nonMandatoryNamaz.ts
      const bajramMatch = mainCode.match(/const bajramNamaz\s*=\s*(\[[\s\S]*?\]);/);
      const dzenazaMatch = mainCode.match(/const dzenazaNamaz\s*=\s*(\[[\s\S]*?\]);/);
      const istiharaMatch = mainCode.match(/const istiharaNamaz\s*=\s*(\[[\s\S]*?\]);/);
      const duhaMatch = mainCode.match(/const duhaNamaz\s*=\s*(\[[\s\S]*?\]);/);

      // Extract the nonMandatoryNamaz object
      const objMatch = mainCode.match(/const nonMandatoryNamaz\s*=\s*({[\s\S]*?});/);

      if (!bajramMatch || !dzenazaMatch || !istiharaMatch || !duhaMatch || !objMatch) {
        throw new Error("Could not extract required prayer data from file");
      }

      // Build the evaluation code with all dependencies
      const evalCode = `
        ${componentsCode}
        ${assetsCode}
        const bajramNamaz = ${bajramMatch[1]};
        const dzenazaNamaz = ${dzenazaMatch[1]};
        const istiharaNamaz = ${istiharaMatch[1]};
        const duhaNamaz = ${duhaMatch[1]};
        return ${objMatch[1]};
      `;

      // Use Function constructor instead of eval for better scope control
      const evalFunction = new Function(evalCode);
      const result = evalFunction();

      logger.info("Successfully loaded non-mandatory prayers via file parsing");
      return result;

    } catch (error) {
      logger.error("Failed to load non-mandatory prayers", {
        error: error instanceof Error ? error.message : error,
        stack: error instanceof Error ? error.stack : undefined,
      });
      throw new Error("Failed to load non-mandatory prayers data");
    }
  }

  async getZikrData(): Promise<Dhikr[]> {
    const filePath = path.join(config.paths.data, "namaz/zikrAtTheEnd.ts");
    const module = await this.loadModule<any>(filePath);
    return module.zikrAtTheEnd || module.default || [];
  }

  async getAudioData(): Promise<any> {
    const filePath = path.join(config.paths.data, "namaz/audioData.ts");
    const module = await this.loadModule<any>(filePath);
    return module.audioData || module.default || module;
  }

  async getPrayerTimes(): Promise<any> {
    const filePath = path.join(config.paths.data, "namaz/prayerTimes.json");
    return this.loadJsonFile<any>(filePath);
  }

  async getCities(): Promise<any> {
    const filePath = path.join(config.paths.data, "namaz/cities.json");
    return this.loadJsonFile<any>(filePath);
  }

  async getContentNamaz(): Promise<any> {
    const filePath = path.join(config.paths.data, "namaz/contentNamaz.json");
    return this.loadJsonFile<any>(filePath);
  }

  async getSalahData(): Promise<any> {
    const filePath = path.join(config.paths.data, "namaz/salah.json");
    return this.loadJsonFile<any>(filePath);
  }

  async getAudioMetadata(): Promise<any[]> {
    const filePath = path.join(config.paths.data, "namaz/audioMetadata.ts");

    try {
      const module = await import(filePath);
      return module.audioMetadata || [];
    } catch (error) {
      logger.error("Failed to load audio metadata", error);
      return [];
    }
  }

  async getAudioResources(): Promise<AudioResource[]> {
    const audioDir = config.paths.audio;
    const resources: AudioResource[] = [];

    try {
      const files = await this.getAudioFiles(audioDir);
      const metadata = await this.getAudioMetadata();

      for (const file of files) {
        const id = path.basename(file, ".mp3");
        const meta = metadata.find((m: any) => m.id === id);

        const category = file.includes("zikr/")
          ? "dhikr"
          : file.includes("azan")
            ? "azan"
            : file.includes("iqamah")
              ? "iqamah"
              : "prayer";

        resources.push({
          id,
          filename: path.basename(file),
          path: file,
          category,
          school: meta?.school,
          localeKeys: meta?.localeKeys,
        });
      }

      return resources;
    } catch (error) {
      logger.error("Failed to get audio resources", error);
      return [];
    }
  }

  private async getAudioFiles(
    dir: string,
    fileList: string[] = []
  ): Promise<string[]> {
    const files = await fs.readdir(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = await fs.stat(filePath);

      if (stat.isDirectory()) {
        await this.getAudioFiles(filePath, fileList);
      } else if (file.endsWith(".mp3")) {
        fileList.push(filePath.replace(config.paths.audio + "/", ""));
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
