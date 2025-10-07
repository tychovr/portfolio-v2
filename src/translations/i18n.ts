import { initReactI18next } from "react-i18next";
import nl_NL from "./locales/nl_NL.json";
import en_EN from "./locales/en_EN.json";
import i18n from "i18next";

// i18n.configure({
//   locales: ["nl", "en"],
//   directory: path.join(__dirname, "./locales"),
//   defaultLocale: "en",
// });

i18n.use(initReactI18next).init({
  lng: "en", // or "nl"
  fallbackLng: "en",
  debug: false,
  resources: {
    en: { translation: en_EN },
    nl: { translation: nl_NL },
  },
  defaultNS: "translation",
  interpolation: { escapeValue: false },
});

export default i18n;
