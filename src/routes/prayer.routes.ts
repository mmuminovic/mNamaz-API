import { Router } from "express";
import {
  getPrayers,
  getPrayerByRekatNumber,
  getPrayerSteps,
  getPrayerStep,
} from "../controllers/prayerController";
import { validateLanguage } from "../middleware/validation";

const router = Router();

router.get("/", validateLanguage, getPrayers);
router.get("/:rekatNumber", validateLanguage, getPrayerByRekatNumber);
router.get("/:rekatNumber/steps", validateLanguage, getPrayerSteps);
router.get("/:rekatNumber/steps/:stepId", validateLanguage, getPrayerStep);

export default router;
