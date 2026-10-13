import React, { useState, useRef, useEffect } from 'react';
import { Language, LANGUAGES } from '../i18n/translations';
import { Globe, Check } from 'lucide-react';

interface LanguageSwitcherProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  className?: string;
  variant?: 'header' | 'sidebar' | 'compact' | 'light';
  align?: 'left' | 'right';
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  currentLang,
  onLanguageChange,
  className = '',
  variant = 'header',
  align = 'right',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const isDarkVariant = variant === 'header';

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-150 cursor-pointer shadow-xs focus:outline-hidden focus:ring-2 focus:ring-[#D4A373]/50 ${
          isOpen
            ? 'bg-[#D4A373] text-[#1F3A2B] border-[#D4A373] shadow-md ring-2 ring-[#D4A373]/50'
            : isDarkVariant
            ? 'bg-white/10 hover:bg-white/20 active:bg-[#D4A373] active:text-[#1F3A2B] text-[#D4A373] hover:text-white border border-white/20'
            : 'bg-white hover:bg-[#FAF7F2] active:bg-[#D4A373] active:text-[#1F3A2B] text-stone-700 hover:text-[#8C5E28] border border-stone-200'
        }`}
        title="Schimbă limba / Change language / Changer de langue / Sprache wechseln"
        aria-label="Schimbă limba / Change language"
        aria-expanded={isOpen}
      >
        <Globe className="w-5 h-5 transition-transform duration-200 hover:rotate-12" />
      </button>

      {isOpen && (
        <div
          className={`absolute ${
            align === 'right' ? 'right-0 origin-top-right' : 'left-0 origin-top-left'
          } mt-2 w-48 rounded-xl bg-white shadow-2xl border border-[#D4A373]/30 py-1.5 z-[60] animate-fadeIn`}
        >
          <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-gray-400 tracking-wider border-b border-gray-100 flex items-center justify-between">
            <span>
              {currentLang === 'fr'
                ? 'Choisir la langue'
                : currentLang === 'en'
                ? 'Choose language'
                : currentLang === 'de'
                ? 'Sprache wählen'
                : 'Alege limba'}
            </span>
            <Globe className="w-3.5 h-3.5 text-[#D4A373]" />
          </div>
          {LANGUAGES.map((lang) => {
            const isSelected = lang.code === currentLang;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => {
                  onLanguageChange(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-[#FAF7F2] text-[#1F3A2B] font-bold border-l-2 border-[#D4A373]'
                    : 'text-gray-700 hover:bg-[#FAF7F2] hover:text-[#8C5E28]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base leading-none">{lang.flag}</span>
                  <span className="text-xs">{lang.label}</span>
                </div>
                {isSelected && <Check className="w-4 h-4 text-[#D4A373] stroke-[2.5]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
