import { Request, Response } from 'express';
import dataService from '../services/dataService';
import localizationService from '../services/localizationService';
import { sendSuccess } from '../utils/responseFormatter';
import { asyncHandler } from '../middleware/errorHandler';
import { AppError } from '../middleware/errorHandler';

/**
 * @swagger
 * /lessons:
 *   get:
 *     summary: Get all prayer lessons
 *     description: Retrieve all educational lessons about prayer fundamentals
 *     tags: [Lessons]
 *     parameters:
 *       - $ref: '#/components/parameters/LanguageParam'
 *     responses:
 *       200:
 *         description: List of lessons
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
 *                         $ref: '#/components/schemas/Lesson'
 *             example:
 *               success: true
 *               data:
 *                 - id: 1
 *                   title: "Introduction to Prayer"
 *                   sentences:
 *                     - type: "title"
 *                       localeKey: "lesson1-title"
 *                       text: "What is Prayer?"
 *                     - type: "text"
 *                       localeKey: "lesson1-content"
 *                       text: "Prayer is the second pillar of Islam..."
 *                   image: "lesson1.jpg"
 *               meta:
 *                 timestamp: "2024-01-01T12:00:00.000Z"
 *                 language: "en"
 *                 version: "v1"
 */

export const getLessons = asyncHandler(async (req: Request, res: Response) => {
  const language = req.language || 'en';
  const lessons = await dataService.getLessons();
  
  const localizedLessons = await localizationService.localizeContent(lessons, language);
  
  sendSuccess(res, localizedLessons, 200, { language });
});

export const getLesson = asyncHandler(async (req: Request, res: Response) => {
  const { lessonId } = req.params;
  const language = req.language || 'en';
  
  const lessons = await dataService.getLessons();
  const lesson = lessons.find(l => l.id === parseInt(lessonId));
  
  if (!lesson) {
    throw new AppError('Lesson not found', 404, 'LESSON_NOT_FOUND');
  }
  
  const localizedLesson = await localizationService.localizeContent(lesson, language);
  
  sendSuccess(res, localizedLesson, 200, { language });
});