// i18n.js
// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';

// // Import translation files
// import enTranslation from './locales/en/translation.json';
// import arTranslation from './locales/ar/translation.json';

// // Configure i18n
// i18n
//   .use(initReactI18next)
//   .init({
//     resources: {
//       en: {
//         translation: enTranslation,
//       },
//       ar: {
//         translation: arTranslation,
//       },
//     },
//     lng: 'en', // default language
//     fallbackLng: 'en',
//     interpolation: {
//       escapeValue: false,
//     },
//   });

// export default i18n;


import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './locales/en/translation.json';
import translationAR from './locales/ar/translation.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: translationEN },
      ar: { translation: translationAR },
    },
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already does escaping
    },
  });

export default i18n;
