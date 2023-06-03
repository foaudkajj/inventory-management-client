import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { tr } from "./translations/tr";
import { ar } from "./translations/ar";
import { en } from "./translations/en";
import LanguageDetector from 'i18next-browser-languagedetector'

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    debug: true,

    fallbackLng: "tr",
    resources: {
      en: {
        translation: en
      },
      tr: {
        translation: tr
      },
      ar: {
        translation: ar
      },
    },

    // interpolation: {
    //   escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    // },
  });
