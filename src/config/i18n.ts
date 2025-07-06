import i18next from "i18next";
import Backend from "i18next-fs-backend";
import middleware from "i18next-http-middleware";
import { config } from "./env";
import path from "path";

export const initI18n = async () => {
  await i18next
    .use(Backend)
    .use(middleware.LanguageDetector)
    .init({
      backend: {
        loadPath: path.join(config.paths.locales, "{{lng}}/{{ns}}.json"),
      },
      fallbackLng: config.i18n.defaultLanguage,
      supportedLngs: config.i18n.supportedLanguages,
      ns: ["all"],
      defaultNS: "all",
      preload: config.i18n.supportedLanguages,
      saveMissing: false,
      detection: {
        order: ["querystring", "header"],
        caches: false,
        lookupQuerystring: "lang",
        lookupHeader: "accept-language",
      },
      interpolation: {
        escapeValue: false,
      },
    });

  return middleware.handle(i18next);
};
