import { Router } from 'express';
import { 
  getSpecialPrayers, 
  getSpecialPrayerByType, 
  getSpecialPrayerSteps 
} from '../controllers/specialPrayerController';
import { validateLanguage } from '../middleware/validation';

const router = Router();

router.get('/', validateLanguage, getSpecialPrayers);
router.get('/:type', validateLanguage, getSpecialPrayerByType);
router.get('/:type/steps', validateLanguage, getSpecialPrayerSteps);

export default router;