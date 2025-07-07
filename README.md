# mNamaz API

A comprehensive RESTful API for Islamic prayer (Namaz/Salah) guidance, built with Node.js, Express, and TypeScript. This API provides multilingual support for prayer instructions, ablution (wudu) steps, dhikr, and audio resources.

## Features

- **🌍 Multilingual Support**: 10 languages (English, Bosnian, Turkish, Albanian, German, Spanish, French, Indonesian, Russian, Urdu)
- **📖 Comprehensive Prayer Guide**: Step-by-step instructions for all daily prayers
- **🕌 Multiple Schools**: Support for Hanafi and Shafi schools of thought
- **🎵 Audio Resources**: MP3 files for recitations and dhikr
- **📚 Educational Content**: Lessons covering prayer fundamentals
- **🔐 Production Ready**: Security, rate limiting, error handling, and logging
- **⚡ High Performance**: Caching, compression, and optimized responses

## API Documentation

The API includes comprehensive Swagger/OpenAPI documentation accessible at:

- **Swagger UI**: `http://localhost:3000/api/v1/docs`
- **OpenAPI Spec**: `http://localhost:3000/api/v1/openapi.json`

The documentation includes:

- 📖 Complete endpoint descriptions
- 🔧 Interactive API testing
- 📝 Request/response examples
- 🏗️ Schema definitions
- 🌍 Multi-language parameter examples

## API Endpoints

### Core Endpoints

#### Ablution (Wudu)

- `GET /api/v1/ablution/steps` - Get all ablution steps
- `GET /api/v1/ablution/steps/:stepId` - Get specific ablution step

#### Prayers

- `GET /api/v1/prayers` - Get all prayers
- `GET /api/v1/prayers/:prayerType` - Get specific prayer type
- `GET /api/v1/prayers/:prayerType/rakats/:rakatCount` - Get prayer with specific rakats
- `GET /api/v1/prayers/:prayerType/rakats/:rakatCount/steps` - Get prayer steps

#### Lessons

- `GET /api/v1/lessons` - Get all prayer lessons
- `GET /api/v1/lessons/:lessonId` - Get specific lesson

#### Dhikr (Remembrance)

- `GET /api/v1/dhikr` - Get all dhikr
- `GET /api/v1/dhikr/after-prayer` - Get post-prayer dhikr
- `GET /api/v1/dhikr/:dhikrId` - Get specific dhikr

#### Special Prayers

- `GET /api/v1/special-prayers` - Get all special prayers
- `GET /api/v1/special-prayers/:type` - Get specific special prayer (bajram, dzenaza, istihara, duha)
- `GET /api/v1/special-prayers/:type/steps` - Get special prayer steps

#### Audio Resources

- `GET /api/v1/audio` - Get all audio resources
- `GET /api/v1/audio/:audioId` - Get specific audio resource
- `GET /api/v1/audio/school/:school` - Get audio for specific school (hanafi/shafi)

#### Localization

- `GET /api/v1/locales` - Get supported languages
- `GET /api/v1/locales/:language` - Get all translations for language
- `GET /api/v1/locales/:language/:key` - Get specific translation

#### Media

- `GET /api/v1/media/audio/:filename` - Stream audio files
- `GET /api/v1/media/images/:filename` - Serve image files

#### System

- `GET /api/v1/config` - API configuration

## Query Parameters

- `lang` - Language code (en, bs, tr, al, de, es, fr, id, ru, ur)
- `school` - School of thought (hanafi, shafi)
- `category` - Filter audio by category (prayer, dhikr, azan, iqamah)
- `prefix` - Filter translations by key prefix

## Installation

### Prerequisites

- Node.js 18+
- npm or yarn

### Local Development

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd mnamaz-api
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

4. **Start development server**

   ```bash
   npm run dev
   ```

   The API will be available at `http://localhost:3000/api/v1`

## Environment Variables

```env
# Server Configuration
NODE_ENV=development
PORT=3000
HOST=0.0.0.0

# API Configuration
API_VERSION=v1
API_PREFIX=/api

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=info
LOG_DIR=logs

# Security
CORS_ORIGIN=*
HELMET_ENABLED=true

# i18n Configuration
DEFAULT_LANGUAGE=en
SUPPORTED_LANGUAGES=en,bs,tr,al,de,es,fr,id,ru,ur

# Media Storage
MEDIA_BASE_URL=http://localhost:3000/api/v1/media
ENABLE_CDN=false
CDN_URL=

# Cache Configuration
CACHE_TTL=3600
```

## Audio and Media Files Strategy

### Current Implementation (Local Storage)

- Audio files are stored locally in `/data/namaz/audio/`
- Images are stored locally in `/data/namaz/images/`
- Files are served with proper caching headers
- Supports HTTP range requests for audio streaming

### Recommended Production Setup

#### Option 1: Object Storage (Recommended)

```env
ENABLE_CDN=true
CDN_URL=https://your-cdn-domain.com
```

**Benefits:**

- Scalable and cost-effective
- Global CDN distribution
- Automatic compression and optimization
- Reduced server load

**Recommended Services:**

- AWS S3 + CloudFront
- Google Cloud Storage + CDN
- Azure Blob Storage + CDN
- Cloudflare R2

#### Option 2: Local Storage with CDN

- Keep files local but use CDN for global distribution
- Use services like Cloudflare or AWS CloudFront
- Configure proper cache headers

#### Option 3: Hybrid Approach

- Critical/frequently accessed files on CDN
- Less frequently accessed files served locally
- Implement fallback mechanism

### Implementation for CDN

```typescript
// Example CDN URL generation
const getMediaUrl = (filename: string, type: "audio" | "image") => {
  if (config.media.enableCDN && config.media.cdnUrl) {
    return `${config.media.cdnUrl}/${type}/${filename}`;
  }
  return `${config.media.baseUrl}/${type}/${filename}`;
};
```

## Production Deployment

### Docker Deployment

1. **Create Dockerfile**

   ```dockerfile
   FROM node:18-alpine

   WORKDIR /app

   COPY package*.json ./
   RUN npm ci --only=production

   COPY . .
   RUN npm run build

   EXPOSE 3000

   CMD ["npm", "start"]
   ```

2. **Build and run**
   ```bash
   docker build -t mnamaz-api .
   docker run -p 3000:3000 mnamaz-api
   ```

### PM2 Deployment

1. **Install PM2**

   ```bash
   npm install -g pm2
   ```

2. **Create ecosystem.config.js**

   ```javascript
   module.exports = {
     apps: [
       {
         name: "mnamaz-api",
         script: "dist/server.js",
         instances: "max",
         exec_mode: "cluster",
         env: {
           NODE_ENV: "production",
           PORT: 3000,
         },
       },
     ],
   };
   ```

3. **Deploy**
   ```bash
   npm run build
   pm2 start ecosystem.config.js
   ```

### Heroku Deployment

1. **Create Procfile**

   ```
   web: npm run start:prod
   ```

2. **Deploy**
   ```bash
   git add .
   git commit -m "Initial commit"
   heroku create your-app-name
   git push heroku main
   ```

## API Response Format

All API responses follow this consistent format:

```json
{
  "success": true,
  "data": {
    // Response data
  },
  "meta": {
    "timestamp": "2024-01-01T00:00:00.000Z",
    "language": "en",
    "version": "v1"
  }
}
```

Error responses:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description"
  },
  "meta": {
    "timestamp": "2024-01-01T00:00:00.000Z",
    "version": "v1"
  }
}
```

## Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **Rate Limiting**: Prevent abuse
- **Input Validation**: Request validation
- **Error Handling**: Secure error responses
- **Logging**: Comprehensive logging

## Performance Optimizations

- **Caching**: In-memory caching for frequently accessed data
- **Compression**: Gzip compression for responses
- **HTTP/2**: Support for HTTP/2
- **Static File Serving**: Optimized static file serving
- **Range Requests**: Support for partial content requests

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run typecheck` - Run TypeScript type checking

### Project Structure

```
src/
├── config/          # Configuration files
├── controllers/     # Route controllers
├── middleware/      # Express middleware
├── routes/         # API routes
├── services/       # Business logic
├── types/          # TypeScript types
├── utils/          # Utility functions
├── app.ts          # Express app setup
└── server.ts       # Server entry point
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

For support and questions, please create an issue in the repository.
