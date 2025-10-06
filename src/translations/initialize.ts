import path from "node:path";

const i18n = require("i18n");

i18n.configure({
  locales: ["nl", "en"],
  directory: path.join(__dirname, "./locales"),
  defaultLocale: "en",
});
