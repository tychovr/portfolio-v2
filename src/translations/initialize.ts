import path from "node:path";

const i18n = require("i18n");

i18n.configure({
  locales: ["nl", "en"],
  directory: path.join(__dirname, "./locales"),
  defaultLocale: "en",
});

i18n.init({
  lng: "nl",
  debug: true,
  resources: {
    en: {
      ...require("./locales/en_EN.json"),
    },
    nl: {
      ...require("./locales/nl_NL.json"),
    },
  },
});
