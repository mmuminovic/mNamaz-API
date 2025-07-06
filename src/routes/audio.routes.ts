import { Router } from 'express';
import { 
  getAudioList, 
  getAudioById, 
  getAudioBySchool
} from '../controllers/audioController';

const router = Router();

router.get('/', getAudioList);
router.get('/school/:school', getAudioBySchool);
router.get('/:audioId', getAudioById);

export default router;