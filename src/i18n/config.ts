import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      "hero_title": "Facebook Videos Downloader",
      "hero_subtitle": "Download your favorite Facebook videos, reels, and stories in high quality for free.",
      "placeholder": "Paste Facebook video URL here...",
      "download": "Download",
      "fetching": "Fetching details...",
      "error_invalid_url": "Please enter a valid Facebook video URL",
      "quality": "Quality",
      "format": "Format",
      "size": "Size",
      "action": "Action",
      "get_download_link": "Get Link",
      "footer_text": "High-speed and secure video downloader.",
      "about": "About",
      "privacy": "Privacy Policy",
      "terms": "Terms of Service",
    },
  },
  bn: {
    translation: {
      "hero_title": "ফেসবুক ভিডিও ডাউনলোডার",
      "hero_subtitle": "আপনার প্রিয় ফেসবুক ভিডিও, রিল এবং স্টোরি বিনামূল্যে উচ্চ মানের ডাউনলোড করুন।",
      "placeholder": "ফেসবুক ভিডিওর লিংক এখানে দিন...",
      "download": "ডাউনলোড",
      "fetching": "তথ্য খোঁজা হচ্ছে...",
      "error_invalid_url": "দয়া করে সঠিক ফেসবুক ভিডিও লিংক দিন",
      "quality": "কোয়ালিটি",
      "format": "ফরম্যাট",
      "size": "সাইজ",
      "action": "অ্যাকশন",
      "get_download_link": "লিংক নিন",
      "footer_text": "দ্রুতগতি সম্পন্ন এবং নিরাপদ ভিডিও ডাউনলোডার।",
      "about": "সম্পর্কে",
      "privacy": "প্রাইভেসী পলিসি",
      "terms": "ব্যবহারের শর্তাবলী",
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
