import { config } from '../config/env';

/**
 * Helper function to convert relative asset paths to full URLs
 */
export function createAssetUrl(relativePath: string): string {
  if (!relativePath || typeof relativePath !== 'string') {
    return '';
  }

  // If it's already a full URL, return as-is
  if (relativePath.startsWith('http://') || relativePath.startsWith('https://')) {
    return relativePath;
  }

  // Remove leading dots and slashes
  const cleanPath = relativePath.replace(/^\.+\/+/, '');

  // Determine the API path based on environment
  const apiPath = config.env === 'production'
    ? `/${config.api.version}`
    : `${config.api.prefix}/${config.api.version}`;

  // Create full URL based on the asset type - all through unified /media endpoint
  if (cleanPath.includes('audio/')) {
    // Extract filename from path like "data/namaz/audio/allahu-ekber.mp3" or "./audio/allahu-ekber.mp3"
    const audioFileName = cleanPath.split('audio/').pop() || cleanPath;
    return `${config.baseUrl}${apiPath}/media/audio/${audioFileName}`;
  } else if (cleanPath.includes('assets/namaz/prayer/')) {
    // Extract the path after "assets/" to preserve the namaz/prayer structure
    const imagePath = cleanPath.split('assets/').pop() || cleanPath;
    return `${config.baseUrl}${apiPath}/media/images/${imagePath}`;
  } else if (cleanPath.includes('assets/namaz/')) {
    // Extract the path after "assets/" to preserve the namaz structure
    const imagePath = cleanPath.split('assets/').pop() || cleanPath;
    return `${config.baseUrl}${apiPath}/media/images/${imagePath}`;
  } else if (cleanPath.includes('assets/')) {
    // Extract the path after "assets/"
    const imagePath = cleanPath.split('assets/').pop() || cleanPath;
    return `${config.baseUrl}${apiPath}/media/images/${imagePath}`;
  } else if (cleanPath.endsWith('.mp3')) {
    // For audio files without path (like dhikr audio files) - use unified media endpoint
    return `${config.baseUrl}${apiPath}/media/audio/zikr/${cleanPath}`;
  } else if (cleanPath.endsWith('.png') || cleanPath.endsWith('.jpg') || cleanPath.endsWith('.jpeg') || cleanPath.endsWith('.gif')) {
    // For image files without path - use unified media endpoint
    return `${config.baseUrl}${apiPath}/media/images/${cleanPath}`;
  } else {
    // Default to treating as media
    return `${config.baseUrl}${apiPath}/media/${cleanPath}`;
  }
}

/**
 * Recursively process an object to convert all asset paths to full URLs
 */
export function processAssetUrls(obj: any): any {
  if (!obj) return obj;

  if (Array.isArray(obj)) {
    return obj.map(item => processAssetUrls(item));
  }

  if (typeof obj === 'object' && obj !== null) {
    const processed: any = {};

    // Special handling for card objects with arabic/translation/transliteration structure
    if (obj.card === true) {
      processed.card = true;

      // Preserve title as-is (it's already processed text)
      if (obj.title) {
        processed.title = obj.title;
      }

      // Preserve arabic array structure (text, bold, borderTop properties)
      if (Array.isArray(obj.arabic)) {
        processed.arabic = obj.arabic.map((item: any) => {
          if (typeof item === 'object' && item.text !== undefined) {
            return {
              text: item.text,
              bold: item.bold,
              ...(item.borderTop !== undefined && { borderTop: item.borderTop })
            };
          }
          return item;
        });
      }

      // Preserve transliteration array structure (text, bold properties)
      if (Array.isArray(obj.transliteration)) {
        processed.transliteration = obj.transliteration.map((item: any) => {
          if (typeof item === 'object' && item.text !== undefined) {
            return {
              text: item.text,
              bold: item.bold
            };
          }
          return item;
        });
      }

      // Preserve translation array structure (text, bold properties)
      if (Array.isArray(obj.translation)) {
        processed.translation = obj.translation.map((item: any) => {
          if (typeof item === 'object' && item.text !== undefined) {
            return {
              text: item.text,
              bold: item.bold
            };
          }
          return item;
        });
      }

      // Process audio field if present
      if (obj.audio) {
        processed.audio = typeof obj.audio === 'string' ? createAssetUrl(obj.audio) : obj.audio;
      }

      return processed;
    }

    // Regular processing for non-card objects
    for (const [key, value] of Object.entries(obj)) {
      // Check for common asset path properties
      if ((key === 'image' || key === 'images' || key === 'audio') && typeof value === 'string') {
        processed[key] = createAssetUrl(value);
      } else if (key === 'images' && Array.isArray(value)) {
        processed[key] = value.map(img => typeof img === 'string' ? createAssetUrl(img) : img);
      } else if (key === 'audio' && Array.isArray(value)) {
        processed[key] = value.map(audio => {
          if (typeof audio === 'object' && audio.audio) {
            return {
              ...audio,
              audio: createAssetUrl(audio.audio)
            };
          }
          return typeof audio === 'string' ? createAssetUrl(audio) : audio;
        });
      } else {
        processed[key] = processAssetUrls(value);
      }
    }

    return processed;
  }

  return obj;
}