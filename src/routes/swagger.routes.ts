import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import { specs } from '../config/swagger';

const router = Router();

// Swagger UI setup
router.use('/docs', swaggerUi.serve);
router.get('/docs', swaggerUi.setup(specs, {
  explorer: true,
  customCss: `
    .swagger-ui .topbar { display: none; }
    .swagger-ui .info { margin: 50px 0; }
    .swagger-ui .info .title { color: #3b4151; }
  `,
  customSiteTitle: 'mNamaz API Documentation',
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true,
    docExpansion: 'tag',
    filter: true,
    showExtensions: true,
    tryItOutEnabled: true
  }
}));

// JSON endpoint for OpenAPI spec
router.get('/openapi.json', (_req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(specs);
});

export default router;