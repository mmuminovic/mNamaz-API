import { Router } from "express";
import { getAudioList, getAudioById, streamAudio } from "../controllers/audioController";

const router = Router();

router.get("/", getAudioList);

// Static file serving route for zikr files - must come before generic routes  
router.get("/zikr/:filename", streamAudio);

// Generic audio file route
router.get("/:audioId", getAudioById);

export default router;
