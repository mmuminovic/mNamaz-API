import { Router } from 'express';
import { getDhikrList, getDhikrAfterPrayer, getDhikrById } from '../controllers/dhikrController';
import { validateLanguage } from '../middleware/validation';

const router = Router();

router.get('/', validateLanguage, getDhikrList);
router.get('/after-prayer', validateLanguage, getDhikrAfterPrayer);
router.get('/:dhikrId', validateLanguage, getDhikrById);

export default router;