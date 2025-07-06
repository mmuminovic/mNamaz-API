import { Router } from 'express';
import { 
  getPrayers, 
  getPrayerByType, 
  getPrayerSteps, 
  getPrayerStep 
} from '../controllers/prayerController';
import { validateLanguage } from '../middleware/validation';

const router = Router();

router.get('/', validateLanguage, getPrayers);
router.get('/:prayerType', validateLanguage, getPrayerByType);
router.get('/:prayerType/rakats/:rakatCount', validateLanguage, getPrayerSteps);
router.get('/:prayerType/rakats/:rakatCount/steps', validateLanguage, getPrayerSteps);
router.get('/:prayerType/rakats/:rakatCount/steps/:stepId', validateLanguage, getPrayerStep);

export default router;