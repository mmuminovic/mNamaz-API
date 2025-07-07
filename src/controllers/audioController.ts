import { Request, Response } from 'express';
import dataService from '../services/dataService';
import { sendSuccess } from '../utils/responseFormatter';
import { asyncHandler } from '../middleware/errorHandler';
import { AppError } from '../middleware/errorHandler';
import path from 'path';
import fs from 'fs';
import { config } from '../config/env';
import { getSchoolByLanguage } from '../utils/schoolSelector';

/**
 * @swagger
 * /audio:
 *   get:
 *     summary: Get all audio resources
 *     description: Retrieve list of available audio files with metadata and URLs. School is automatically determined based on language.
 *     tags: [Audio]
 *     parameters:
 *       - $ref: '#/components/parameters/CategoryParam'
 *       - $ref: '#/components/parameters/LanguageParam'
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
  const language = req.language || 'en';
  const school = getSchoolByLanguage(language);
  
  const audioResources = await dataService.getAudioResources();
  
  let filtered = audioResources;
  
  if (category) {
    filtered = filtered.filter(audio => audio.category === category);
  }
  
  // Filter by school determined by language
  filtered = filtered.filter(audio => !audio.school || audio.school === school);
  
  const audioData = filtered.map(audio => ({
    id: audio.id,
    filename: audio.filename,
    category: audio.category,
    school: audio.school,
    url: `${config.media.baseUrl}/audio/${audio.path}`,
  }));
  
  sendSuccess(res, audioData, 200, { language, school });
});

/**
 * @swagger
 * /audio/{audioId}:
 *   get:
 *     summary: Get audio resource by ID
 *     description: Retrieve a specific audio resource by its ID
 *     tags: [Audio]
 *     parameters:
 *       - name: audioId
 *         in: path
 *         required: true
 *         description: Audio resource ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Audio resource details
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/AudioResource'
 *       404:
 *         $ref: '#/components/responses/NotFoundResponse'
 */
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

/**
 * @swagger
 * /audio/school/{school}:
 *   get:
 *     summary: Get audio resources by school
 *     description: Retrieve audio resources specific to a school of thought. This endpoint is for explicit school selection.
 *     tags: [Audio]
 *     parameters:
 *       - name: school
 *         in: path
 *         required: true
 *         description: School of thought
 *         schema:
 *           type: string
 *           enum: [hanafi, shafi]
 *     responses:
 *       200:
 *         description: School-specific audio data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       400:
 *         description: Invalid school parameter
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
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