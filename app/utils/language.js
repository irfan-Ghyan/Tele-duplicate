// utils/language.js
import i18n from "@/i18n";
export const switchLanguage = (lng) => {
  i18n.changeLanguage(lng);
  document.dir = lng === 'ar' ? 'rtl' : 'ltr'; // Set the document direction
};
