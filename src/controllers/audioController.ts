import { Request, Response } from 'express';
import dataService from '../services/dataService';
import { sendSuccess } from '../utils/responseFormatter';
import { asyncHandler } from '../middleware/errorHandler';
import { AppError } from '../middleware/errorHandler';
import path from 'path';
import fs from 'fs';
import { config } from '../config/env';

/**
 * @swagger
 * /audio:
 *   get:
 *     summary: Get all audio resources
 *     description: Retrieve list of available audio files with metadata and URLs
 *     tags: [Audio]
 *     parameters:
 *       - $ref: '#/components/parameters/CategoryParam'
 *       - $ref: '#/components/parameters/SchoolParam'
 *     responses:
 *       200:
 *         description: List of audio resources
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/AudioResource'
 */

export const getAudioList = asyncHandler(async (req: Request, res: Response) => {
  const category = req.query.category as string;
  const school = req.query.school as string;
  
  const audioResources = await dataService.getAudioResources();
  
  let filtered = audioResources;
  
  if (category) {
    filtered = filtered.filter(audio => audio.category === category);
  }
  
  if (school) {
    filtered = filtered.filter(audio => !audio.school || audio.school === school);
  }
  
  const audioData = filtered.map(audio => ({
    id: audio.id,
    filename: audio.filename,
    category: audio.category,
    school: audio.school,
    url: `${config.media.baseUrl}/audio/${audio.path}`,
  }));
  
  sendSuccess(res, audioData);
});

export const getAudioById = asyncHandler(async (req: Request, res: Response) => {
  const { audioId } = req.params;
  
  const audioResources = await dataService.getAudioResources();
  const audio = audioResources.find(a => a.id === audioId);
  
  if (!audio) {
    throw new AppError('Audio resource not found', 404, 'AUDIO_NOT_FOUND');
  }
  
  const audioData = {
    id: audio.id,
    filename: audio.filename,
    category: audio.category,
    school: audio.school,
    url: `${config.media.baseUrl}/audio/${audio.path}`,
  };
  
  sendSuccess(res, audioData);
});

export const getAudioBySchool = asyncHandler(async (req: Request, res: Response) => {
  const { school } = req.params;
  
  if (!['hanafi', 'shafi'].includes(school)) {
    throw new AppError('Invalid school parameter', 400, 'INVALID_SCHOOL');
  }
  
  const audioData = await dataService.getAudioData();
  const schoolAudio = school === 'hanafi' ? audioData.audioDataHanefi : audioData.audioDataShafi;
  
  sendSuccess(res, schoolAudio);
});

export const streamAudio = asyncHandler(async (req: Request, res: Response) => {
  // Extract the file path from the URL after /audio/
  const requestedPath = req.path.replace('/audio/', '');
  const filePath = path.join(config.paths.audio, requestedPath);
  
  if (!fs.existsSync(filePath)) {
    throw new AppError('Audio file not found', 404, 'FILE_NOT_FOUND');
  }
  
  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = req.headers.range;
  
  if (range) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = (end - start) + 1;
    const file = fs.createReadStream(filePath, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'audio/mpeg',
      'Cache-Control': 'public, max-age=31536000',
    };
    
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'audio/mpeg',
      'Cache-Control': 'public, max-age=31536000',
    };
    
    res.writeHead(200, head);
    fs.createReadStream(filePath).pipe(res);
  }
});