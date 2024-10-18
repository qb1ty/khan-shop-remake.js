import i18 from "i18next";
import { initReactI18next } from "react-i18next"
import en from "./locales/en.json"
import ru from "./locales/ru.json"
import kk from "./locales/kk.json"


i18
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            ru: { translation: ru },
            kk: { translation: kk }
        },
        lng: JSON.parse(localStorage.getItem('lang')) || "en",
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    })

export default i18