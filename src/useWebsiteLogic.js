import { useState, useEffect } from 'react';
import { content } from './content';

export const useWebsiteLogic = () => {
  const [lang, setLang] = useState('he');
  const isRtl = lang === 'he';

  useEffect(() => {
    document.body.dir = isRtl ? 'rtl' : 'ltr';
  }, [isRtl]);

  const t = content[lang];

  const toggleLanguage = () => setLang(prev => (prev === 'he' ? 'en' : 'he'));

  return { lang, t, isRtl, toggleLanguage };
};