import { Router } from 'express';
import { 
  getSupportedLanguages, 
  getTranslations, 
  getTranslationByKey 
} from '../controllers/localizationController';

const router = Router();

router.get('/', getSupportedLanguages);
router.get('/:language', getTranslations);
router.get('/:language/:key', getTranslationByKey);

export default router;