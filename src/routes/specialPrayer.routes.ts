import { Router } from 'express';
import { 
  getSpecialPrayers, 
  getSpecialPrayerByType, 
  getSpecialPrayerSteps 
} from '../controllers/specialPrayerController';
import { validateLanguage } from '../middleware/validation';

const router = Router();

/**
 * @swagger
 * /special-prayers:
 *   get:
 *     summary: Get all special prayers
 *     description: Retrieve a list of all available special prayers (Eid, funeral, etc.)
 *     tags: [Special Prayers]
 *     parameters:
 *       - $ref: '#/components/parameters/LanguageParam'
 *     responses:
 *       200:
 *         description: List of special prayers
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
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             description: Special prayer ID
 *                           name:
 *                             type: string
 *                             description: Localized prayer name
 *                           type:
 *                             type: string
 *                             description: Prayer type identifier
 *                         example:
 *                           id: "bajram"
 *                           name: "Eid Prayer"
 *                           type: "bajram"
 *       400:
 *         $ref: '#/components/responses/ValidationErrorResponse'
 *       500:
 *         $ref: '#/components/responses/ErrorResponse'
 */
router.get('/', validateLanguage, getSpecialPrayers);

/**
 * @swagger
 * /special-prayers/{type}:
 *   get:
 *     summary: Get specific special prayer by type
 *     description: Retrieve detailed information about a specific special prayer
 *     tags: [Special Prayers]
 *     parameters:
 *       - name: type
 *         in: path
 *         required: true
 *         description: Type of special prayer
 *         schema:
 *           type: string
 *           enum: [bajram, dzenaza, istihara, duha]
 *           example: "bajram"
 *       - $ref: '#/components/parameters/LanguageParam'
 *     responses:
 *       200:
 *         description: Special prayer details
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         type:
 *                           type: string
 *                           description: Prayer type
 *                         data:
 *                           type: object
 *                           description: Prayer content with localized text
 *       400:
 *         $ref: '#/components/responses/ValidationErrorResponse'
 *       404:
 *         $ref: '#/components/responses/NotFoundResponse'
 *       500:
 *         $ref: '#/components/responses/ErrorResponse'
 */
router.get('/:type', validateLanguage, getSpecialPrayerByType);

/**
 * @swagger
 * /special-prayers/{type}/steps:
 *   get:
 *     summary: Get step-by-step instructions for special prayer
 *     description: Retrieve detailed step-by-step instructions for performing a specific special prayer
 *     tags: [Special Prayers]
 *     parameters:
 *       - name: type
 *         in: path
 *         required: true
 *         description: Type of special prayer
 *         schema:
 *           type: string
 *           enum: [bajram, dzenaza, istihara, duha]
 *           example: "bajram"
 *       - $ref: '#/components/parameters/LanguageParam'
 *     responses:
 *       200:
 *         description: Special prayer steps
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
 *                         $ref: '#/components/schemas/PrayerStep'
 *       400:
 *         $ref: '#/components/responses/ValidationErrorResponse'
 *       404:
 *         $ref: '#/components/responses/NotFoundResponse'
 *       500:
 *         $ref: '#/components/responses/ErrorResponse'
 */
router.get('/:type/steps', validateLanguage, getSpecialPrayerSteps);

export default router;