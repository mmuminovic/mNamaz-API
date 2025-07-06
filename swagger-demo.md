# mNamaz API - Swagger Documentation

## 🚀 Quick Start

1. **Start the server:**
   ```bash
   npm run dev
   # or
   npm start
   ```

2. **Access Swagger UI:**
   Open your browser and go to: `http://localhost:3000/api/v1/docs`

3. **Get OpenAPI Spec:**
   ```bash
   curl http://localhost:3000/api/v1/openapi.json
   ```

## 📖 Swagger Features Implemented

### 🎯 **Comprehensive Documentation**
- **All endpoints documented** with descriptions, parameters, and responses
- **Interactive testing** directly from the browser
- **Schema definitions** for all data models
- **Example requests/responses** for easier understanding

### 🏗️ **API Structure Documentation**

#### **Core Schemas:**
- `ApiResponse` - Standard response format
- `AbdestStep` - Ablution step structure
- `PrayerStep` - Prayer step structure  
- `Lesson` - Educational lesson structure
- `Dhikr` - Remembrance structure
- `AudioResource` - Audio file metadata
- `Language` - Supported language info

#### **Reusable Parameters:**
- `LanguageParam` - Language selection (en, bs, tr, al, etc.)
- `SchoolParam` - School of thought (hanafi, shafi)
- `CategoryParam` - Audio category filter

#### **Standard Responses:**
- `SuccessResponse` - 200 OK responses
- `ErrorResponse` - 4xx/5xx error responses
- `NotFoundResponse` - 404 specific responses
- `ValidationErrorResponse` - 400 validation errors

### 🎨 **Custom Swagger UI**
- **Clean interface** with hidden topbar
- **Persistent authorization** settings
- **Request duration display**
- **Expandable tag sections**
- **Built-in filtering**

### 📊 **Example Endpoints Documented:**

#### **Ablution (Wudu)**
```yaml
GET /api/v1/ablution/steps
GET /api/v1/ablution/steps/{stepId}
```

#### **Prayers**
```yaml
GET /api/v1/prayers
GET /api/v1/prayers/{prayerType}
GET /api/v1/prayers/{prayerType}/rakats/{rakatCount}
```

#### **Audio Resources**
```yaml
GET /api/v1/audio
GET /api/v1/audio/{audioId}
GET /api/v1/audio/school/{school}
```

#### **Localization**
```yaml
GET /api/v1/locales
GET /api/v1/locales/{language}
GET /api/v1/locales/{language}/{key}
```

## 🔧 **Testing API Endpoints**

### **Example Requests:**

1. **Get Ablution Steps (English):**
   ```bash
   curl "http://localhost:3000/api/v1/ablution/steps?lang=en"
   ```

2. **Get Prayer Steps (Bosnian, Hanafi):**
   ```bash
   curl "http://localhost:3000/api/v1/prayers/fajr?lang=bs&school=hanafi"
   ```

3. **Get Audio Resources:**
   ```bash
   curl "http://localhost:3000/api/v1/audio?category=prayer&school=hanafi"
   ```

4. **Get Supported Languages:**
   ```bash
   curl "http://localhost:3000/api/v1/locales"
   ```

### **Example Response Format:**
```json
{
  "success": true,
  "data": {
    // Response data here
  },
  "meta": {
    "timestamp": "2024-01-01T12:00:00.000Z",
    "language": "en",
    "version": "v1"
  }
}
```

## 🌟 **Key Features in Documentation**

### **Multi-language Support**
- All endpoints support `?lang=` parameter
- 10 languages documented: `en`, `bs`, `tr`, `al`, `de`, `es`, `fr`, `id`, `ru`, `ur`
- Language detection via query param or Accept-Language header

### **School-specific Content**
- Hanafi and Shafi school support
- School-specific audio and prayer variations
- Clear documentation of differences

### **Audio Streaming**
- MP3 file streaming capabilities
- Range request support for mobile apps
- CDN-ready URLs in responses

### **Error Handling**
- Consistent error response format
- Detailed error codes and messages
- Proper HTTP status codes

## 🚀 **Production Usage**

### **For Mobile App Developers:**
1. Use the Swagger UI to explore endpoints
2. Test API calls directly in the browser
3. Copy code examples for your app
4. Understand data structures and responses

### **For Backend Integration:**
1. Import OpenAPI spec into your tools
2. Generate client SDKs automatically
3. Use for API testing and validation
4. Documentation stays in sync with code

## 📱 **Mobile App Integration Examples**

### **React Native:**
```javascript
// Get ablution steps
const response = await fetch('http://your-api.com/api/v1/ablution/steps?lang=en');
const { data } = await response.json();
```

### **Flutter:**
```dart
// Get prayer audio
final response = await http.get(
  Uri.parse('http://your-api.com/api/v1/audio?category=prayer')
);
final data = jsonDecode(response.body)['data'];
```

## 🔧 **Customization**

The Swagger configuration is in `src/config/swagger.ts` and can be customized for:
- Different server URLs
- Additional authentication
- Custom UI themes
- Extended documentation

## 🎯 **Next Steps**

1. **Start the server** and explore the Swagger UI
2. **Test endpoints** using the interactive interface
3. **Review schemas** to understand data structures
4. **Use in your mobile app** development

The API is now fully documented and ready for production use!