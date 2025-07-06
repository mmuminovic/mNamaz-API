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

// Serve images statically
router.use('/images', express.static(path.join(config.paths.data, 'namaz/images'), {
  maxAge: '365d',
  etag: true,
  lastModified: true,
}));

export default router;