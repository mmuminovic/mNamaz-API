import { Router } from 'express';
import express from 'express';
import path from 'path';
import { config } from '../config/env';

const router = Router();

// Serve audio files statically with proper headers
router.use('/audio', express.static(config.paths.audio, {
  maxAge: '365d',
  etag: true,
  lastModified: true,
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.mp3')) {
      res.set('Content-Type', 'audio/mpeg');
      res.set('Accept-Ranges', 'bytes');
    }
  }
}));

// Serve images statically from assets directory
router.use('/images', express.static(config.paths.assets, {
  maxAge: '365d',
  etag: true,
  lastModified: true,
  setHeaders: (res, filePath) => {
    const ext = path.extname(filePath).toLowerCase();
    if (['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp'].includes(ext)) {
      const contentTypes: Record<string, string> = {
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.webp': 'image/webp'
      };
      res.set('Content-Type', contentTypes[ext] || 'application/octet-stream');
    }
  }
}));

/**
 * @swagger
 * /media/info:
 *   get:
 *     summary: Get media server information
 *     description: Returns information about available media paths
 *     tags: [Media]
 *     responses:
 *       200:
 *         description: Media server information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 baseUrl:
 *                   type: string
 *                 paths:
 *                   type: object
 *                   properties:
 *                     images:
 *                       type: string
 *                     audio:
 *                       type: string
 */
router.get('/info', (_req, res) => {
  res.json({
    baseUrl: config.baseUrl,
    paths: {
      images: `${config.baseUrl}${config.api.prefix}/${config.api.version}/media/images/`,
      audio: `${config.baseUrl}${config.api.prefix}/${config.api.version}/media/audio/`
    },
    directories: {
      assets: config.paths.assets,
      audio: config.paths.audio
    }
  });
});

export default router;