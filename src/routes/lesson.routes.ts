import { Router } from 'express';
import { getLessons, getLesson } from '../controllers/lessonController';
import { validateLanguage } from '../middleware/validation';

const router = Router();

router.get('/', validateLanguage, getLessons);
router.get('/:lessonId', validateLanguage, getLesson);

export default router;