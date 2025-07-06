import { Request, Response } from 'express';
import dataService from '../services/dataService';
import localizationService from '../services/localizationService';
import { sendSuccess } from '../utils/responseFormatter';
import { asyncHandler } from '../middleware/errorHandler';
import { AppError } from '../middleware/errorHandler';

/**
 * @swagger
 * /ablution/steps:
 *   get:
 *     summary: Get all ablution steps
 *     description: Retrieve all 9 steps of ablution (wudu) with localized content
 *     tags: [Ablution]
 *     parameters:
 *       - $ref: '#/components/parameters/LanguageParam'
 *     responses:
 *       200:
 *         description: List of ablution steps
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
 *                         $ref: '#/components/schemas/AbdestStep'
 *       400:
 *         $ref: '#/components/responses/ErrorResponse'
 */

export const getAblutionSteps = asyncHandler(async (req: Request, res: Response) => {
  const language = req.language || 'en';
  const steps = await dataService.getAbdestSteps();
  
  const localizedSteps = await localizationService.localizeContent(steps, language);
  
  sendSuccess(res, localizedSteps, 200, { language });
});

/**
 * @swagger
 * /ablution/steps/{stepId}:
 *   get:
 *     summary: Get specific ablution step
 *     description: Retrieve a specific step of ablution by ID (0-8)
 *     tags: [Ablution]
 *     parameters:
 *       - name: stepId
 *         in: path
 *         required: true
 *         description: Step ID (0-8)
 *         schema:
 *           type: integer
 *           minimum: 0
 *           maximum: 8
 *       - $ref: '#/components/parameters/LanguageParam'
 *     responses:
 *       200:
 *         description: Ablution step details
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/AbdestStep'
 *       404:
 *         $ref: '#/components/responses/NotFoundResponse'
 */
export const getAblutionStep = asyncHandler(async (req: Request, res: Response) => {
  const { stepId } = req.params;
  const language = req.language || 'en';
  
  const steps = await dataService.getAbdestSteps();
  const step = steps.find(s => s.id === parseInt(stepId));
  
  if (!step) {
    throw new AppError('Ablution step not found', 404, 'STEP_NOT_FOUND');
  }
  
  const localizedStep = await localizationService.localizeContent(step, language);
  
  sendSuccess(res, localizedStep, 200, { language });
});