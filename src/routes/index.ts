import { Router } from "express";
import ablutionRoutes from "./ablution.routes";
import prayerRoutes from "./prayer.routes";
import lessonRoutes from "./lesson.routes";
import dhikrRoutes from "./dhikr.routes";
import specialPrayerRoutes from "./specialPrayer.routes";
import audioRoutes from "./audio.routes";
import mediaRoutes from "./media.routes";
import localizationRoutes from "./localization.routes";
import swaggerRoutes from "./swagger.routes";

const router = Router();

// API Documentation
router.use("/", swaggerRoutes);

// API Routes
router.use("/ablution", ablutionRoutes);
router.use("/prayers", prayerRoutes);
router.use("/lessons", lessonRoutes);
router.use("/dhikr", dhikrRoutes);
router.use("/special-prayers", specialPrayerRoutes);
router.use("/audio", audioRoutes);
router.use("/media", mediaRoutes);
router.use("/locales", localizationRoutes);

/**
 * @swagger
 * /config:
 *   get:
 *     summary: Get API configuration
 *     description: Retrieve API configuration including supported languages and schools
 *     tags: [System]
 *     responses:
 *       200:
 *         description: API configuration
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 supportedLanguages:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: List of supported language codes
 *                 schools:
 *                   type: array
 *                   items:
 *                     type: string
 *                     enum: [hanafi, shafi]
 *                   description: Supported schools of thought
 *                 apiVersion:
 *                   type: string
 *                   description: Current API version
 */
router.get("/config", (_req, res) => {
  res.json({
    supportedLanguages: [
      "en",
      "bs",
      "tr",
      "al",
      "de",
      "es",
      "fr",
      "id",
      "ru",
      "ur",
    ],
    schools: ["hanafi", "shafi"],
    apiVersion: "v1",
  });
});

export default router;
