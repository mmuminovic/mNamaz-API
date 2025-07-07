import { Request, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import { AppError } from '../middleware/errorHandler';
import path from 'path';
import fs from 'fs';
import { config } from '../config/env';

/**
 * Serve static media files (images and audio)
 */
export const serveMedia = asyncHandler(async (req: Request, res: Response) => {
  // Extract the file path from the URL (req.path already excludes /media/ prefix)
  const requestedPath = req.path.startsWith('/') ? req.path.substring(1) : req.path;
  
  let filePath: string;
  let contentType: string;
  
  
  if (requestedPath.startsWith('images/')) {
    // Handle images from assets directory
    const imagePath = requestedPath.replace('images/', '');
    filePath = path.join(config.paths.assets, imagePath);
    
    // Determine content type based on extension
    const ext = path.extname(filePath).toLowerCase();
    switch (ext) {
      case '.png':
        contentType = 'image/png';
        break;
      case '.jpg':
      case '.jpeg':
        contentType = 'image/jpeg';
        break;
      case '.gif':
        contentType = 'image/gif';
        break;
      case '.svg':
        contentType = 'image/svg+xml';
        break;
      default:
        contentType = 'application/octet-stream';
    }
  } else if (requestedPath.startsWith('audio/')) {
    // Handle audio files from data directory
    const audioPath = requestedPath.replace('audio/', '');
    filePath = path.join(config.paths.audio, audioPath);
    contentType = 'audio/mpeg';
  } else {
    throw new AppError('Invalid media type', 400, 'INVALID_MEDIA_TYPE');
  }
  
  
  // Security check: ensure the resolved path is within allowed directories
  const allowedPaths = [config.paths.assets, config.paths.audio];
  const isPathAllowed = allowedPaths.some(allowedPath => 
    path.resolve(filePath).startsWith(path.resolve(allowedPath))
  );
  
  if (!isPathAllowed) {
    throw new AppError('Access denied', 403, 'ACCESS_DENIED');
  }
  
  if (!fs.existsSync(filePath)) {
    throw new AppError('Media file not found', 404, 'FILE_NOT_FOUND');
  }
  
  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  
  // Handle range requests for audio files (for streaming)
  if (contentType.startsWith('audio/') && req.headers.range) {
    const range = req.headers.range;
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = (end - start) + 1;
    const file = fs.createReadStream(filePath, { start, end });
    
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=31536000',
    };
    
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    // Serve the complete file
    const head = {
      'Content-Length': fileSize,
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=31536000',
    };
    
    res.writeHead(200, head);
    fs.createReadStream(filePath).pipe(res);
  }
});