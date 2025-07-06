import { Router } from 'express';
import { getAblutionSteps, getAblutionStep } from '../controllers/ablutionController';
import { validateLanguage } from '../middleware/validation';

const router = Router();

router.get('/steps', validateLanguage, getAblutionSteps);
router.get('/steps/:stepId', validateLanguage, getAblutionStep);

export default router;