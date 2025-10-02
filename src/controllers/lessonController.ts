import { Request, Response } from 'express';
import dataService from '../services/dataService';
import localizationService from '../services/localizationService';
import { sendSuccess } from '../utils/responseFormatter';
import { asyncHandler } from '../middleware/errorHandler';
import { AppError } from '../middleware/errorHandler';
import { processAssetUrls } from '../utils/urlHelper';

// Helper function to process lesson content and populate text values
async function processLessonContent(lesson: any, language: string): Promise<any> {
  const processedLesson: any = {
    id: lesson.id,
    image: lesson.image,
  };

  // Process title if it has localeKey
  if (lesson.titleLocaleKey) {
    processedLesson.title = await localizationService.getTranslation(lesson.titleLocaleKey, language);
  } else if (lesson.title) {
    // If title is a localeKey, translate it
    processedLesson.title = await localizationService.getTranslation(lesson.title, language);
  }

  // Process sentences array
  if (lesson.sentences && Array.isArray(lesson.sentences)) {
    processedLesson.sentences = await Promise.all(lesson.sentences.map(async (sentence: any) => {
      const processedSentence: any = {
        type: sentence.type
      };

      // Get translated text for localeKey
      if (sentence.localeKey) {
        processedSentence.text = await localizationService.getTranslation(sentence.localeKey, language);
      } else {
        processedSentence.text = sentence.text || '';
      }

      // Preserve audio property if present
      if (sentence.audio) {
        processedSentence.audio = sentence.audio;
      }

      return processedSentence;
    }));
  }

  // Copy any other properties that might exist
  Object.keys(lesson).forEach(key => {
    if (!['id', 'image', 'title', 'titleLocaleKey', 'sentences'].includes(key)) {
      processedLesson[key] = lesson[key];
    }
  });

  return processedLesson;
}

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
 *                       text: "What is Prayer?"
 *                     - type: "text"
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
  
  // Process each lesson to populate text values directly
  const processedLessons = await Promise.all(lessons.map(lesson => processLessonContent(lesson, language)));
  
  // Process asset URLs
  const lessonsWithUrls = processAssetUrls(processedLessons);
  
  sendSuccess(res, lessonsWithUrls, 200, { language });
});

export const getLesson = asyncHandler(async (req: Request, res: Response) => {
  const { lessonId } = req.params;
  const language = req.language || 'en';
  
  const lessons = await dataService.getLessons();
  const lesson = lessons.find(l => l.id === parseInt(lessonId));
  
  if (!lesson) {
    throw new AppError('Lesson not found', 404, 'LESSON_NOT_FOUND');
  }
  
  // Process the lesson to populate text values directly
  const processedLesson = await processLessonContent(lesson, language);
  
  // Process asset URLs
  const lessonWithUrls = processAssetUrls(processedLesson);
  
  sendSuccess(res, lessonWithUrls, 200, { language });
});