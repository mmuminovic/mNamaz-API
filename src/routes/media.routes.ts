import { Router } from "express";
import { serveMedia } from "../controllers/mediaController";

const router = Router();

/**
 * @swagger
 * /media/{mediaPath}:
 *   get:
 *     summary: Serve static media files
 *     description: Serve images and audio files. Supports images from assets directory and audio files from data directory.
 *     tags: [Media]
 *     parameters:
 *       - name: mediaPath
 *         in: path
 *         required: true
 *         description: Path to the media file (e.g., images/namaz/prayer/standing.png or audio/zikr/estagfirullah-3x.mp3)
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Media file served successfully
 *         content:
 *           image/png:
 *             schema:
 *               type: string
 *               format: binary
 *           image/jpeg:
 *             schema:
 *               type: string
 *               format: binary
 *           audio/mpeg:
 *             schema:
 *               type: string
 *               format: binary
 *       206:
 *         description: Partial content (for audio streaming)
 *       404:
 *         description: Media file not found
 *       403:
 *         description: Access denied
 */

// Simple middleware approach to handle all media paths
router.use('/', serveMedia);

export default router;