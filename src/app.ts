import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { config } from "./config/env";
import { initI18n } from "./config/i18n";
import logger from "./config/logger";
import routes from "./routes";
import { globalErrorHandler, notFoundHandler } from "./middleware/errorHandler";
import { validateLanguage } from "./middleware/validation";

const app = express();

if (config.env === "production") {
  app.set("trust proxy", 1);
}

if (config.security.helmetEnabled) {
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'"],
          imgSrc: ["'self'", "data:", "https:"],
          connectSrc: ["'self'"],
          fontSrc: ["'self'"],
          objectSrc: ["'none'"],
          mediaSrc: ["'self'"],
          frameSrc: ["'none'"],
        },
      },
      crossOriginResourcePolicy: false,
    })
  );
}

app.use(
  cors({
    origin: config.cors.origin === "*" ? true : config.cors.origin.split(","),
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use(compression());

const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  message: {
    success: false,
    error: {
      code: "RATE_LIMIT_EXCEEDED",
      message: "Too many requests from this IP, please try again later.",
    },
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

if (config.env !== "test") {
  app.use(
    morgan("combined", {
      stream: {
        write: (message) => logger.info(message.trim()),
      },
    })
  );
}

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(validateLanguage);

export const initApp = async () => {
  const i18nMiddleware = await initI18n();
  app.use(i18nMiddleware);

  // In production, the API is hosted directly on api.mnamaz.com without /api prefix
  const apiPath =
    config.env === "production"
      ? `/${config.api.version}`
      : `${config.api.prefix}/${config.api.version}`;

  app.use(apiPath, routes);

  app.use(notFoundHandler);
  app.use(globalErrorHandler);

  return app;
};

export default app;
