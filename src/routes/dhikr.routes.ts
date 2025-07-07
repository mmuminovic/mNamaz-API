import { Router } from 'express';
import { getDhikrList, getDhikrAfterPrayer, getDhikrById } from '../controllers/dhikrController';
import { validateLanguage } from '../middleware/validation';

const router = Router();

/**
 * @swagger
 * /dhikr:
 *   get:
 *     summary: Get all dhikr (remembrances)
 *     description: Retrieve a list of all available dhikr with localized content
 *     tags: [Dhikr]
 *     parameters:
 *       - $ref: '#/components/parameters/LanguageParam'
 *     responses:
 *       200:
 *         description: List of dhikr
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
 *                         $ref: '#/components/schemas/Dhikr'
 *       400:
 *         $ref: '#/components/responses/ValidationErrorResponse'
 *       500:
 *         $ref: '#/components/responses/ErrorResponse'
 */
router.get('/', validateLanguage, getDhikrList);

/**
 * @swagger
 * /dhikr/after-prayer:
 *   get:
 *     summary: Get dhikr for after prayer
 *     description: Retrieve dhikr specifically recommended after completing prayers
 *     tags: [Dhikr]
 *     parameters:
 *       - $ref: '#/components/parameters/LanguageParam'
 *     responses:
 *       200:
 *         description: Post-prayer dhikr
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
 *                         $ref: '#/components/schemas/Dhikr'
 *       400:
 *         $ref: '#/components/responses/ValidationErrorResponse'
 *       500:
 *         $ref: '#/components/responses/ErrorResponse'
 */
router.get('/after-prayer', validateLanguage, getDhikrAfterPrayer);

/**
 * @swagger
 * /dhikr/{dhikrId}:
 *   get:
 *     summary: Get specific dhikr by ID
 *     description: Retrieve a specific dhikr with its complete content including Arabic text, transliteration, translation, and audio
 *     tags: [Dhikr]
 *     parameters:
 *       - name: dhikrId
 *         in: path
 *         required: true
 *         description: Unique identifier for the dhikr
 *         schema:
 *           type: string
 *           example: "tasbih-1"
 *       - $ref: '#/components/parameters/LanguageParam'
 *     responses:
 *       200:
 *         description: Dhikr details
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Dhikr'
 *       400:
 *         $ref: '#/components/responses/ValidationErrorResponse'
 *       404:
 *         $ref: '#/components/responses/NotFoundResponse'
 *       500:
 *         $ref: '#/components/responses/ErrorResponse'
 */
router.get('/:dhikrId', validateLanguage, getDhikrById);

export default router;