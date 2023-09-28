import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      watch_anywhere: "Watch anywhere. Cancel anytime.",
      unlimited_movies: "Unlimited movies, TV shows, and more",
    },
  },
  kz: {
    translation: {
      watch_anywhere:
        "Кез келген жерде көріңіз. Кез келген уақытта тоқтатуңыз.",
      unlimited_movies: "Шектеусіз кино, телеберулер және тағы басқалар",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
