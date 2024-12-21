import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(HttpBackend) // Load translations
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Bind with React
  .init({
    fallbackLng: 'en', // Default language
    debug: true,
    interpolation: {
      escapeValue: false, // React already handles escaping
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json', // Path to translations
    },
  });

export default i18n;
