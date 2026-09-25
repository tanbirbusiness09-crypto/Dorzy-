import React, { createContext, useContext, useEffect, useState } from 'react';
import { en, Translations } from './translations/en';
import { ar } from './translations/ar';

export type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  direction: 'ltr' | 'rtl';
  isRtl: boolean;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('ar'); // Default to Arabic for Saudi platform

  const isRtl = language === 'ar';
  const direction = isRtl ? 'rtl' : 'ltr';
  const t = isRtl ? ar : en;

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
  }, [language, direction]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        direction,
        isRtl,
        setLanguage,
        toggleLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
