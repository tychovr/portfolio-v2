import "i18next";
import nl from "../translations/locales/nl_NL.json";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "translation";
    resources: {
      translation: typeof nl;
    };
  }
}
