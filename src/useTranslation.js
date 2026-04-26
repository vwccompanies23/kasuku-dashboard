import translations from './i18n';
import { useLanguage } from './LanguageContext';

export default function useTranslation() {
  const { lang } = useLanguage();

  const t = (key) => {
    return translations[lang]?.[key] || key;
  };

  return { t };
}