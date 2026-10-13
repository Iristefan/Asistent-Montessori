import React, { useState } from 'react';
import { InstitutionConfig } from '../types';
import { Language, UI_TRANSLATIONS } from '../i18n/translations';
import { MapPin, Phone, Mail, Settings2 } from 'lucide-react';
import { SchoolLogo } from './SchoolLogo';

interface HeaderBannerProps {
  config: InstitutionConfig;
  lang: Language;
  onOpenSettings?: () => void;
}

export const HeaderBanner: React.FC<HeaderBannerProps> = ({
  config,
  lang,
  onOpenSettings,
}) => {
  const [imgError, setImgError] = useState(false);
  const t = UI_TRANSLATIONS[lang];

  // Parse contact details to guarantee address on row 1, phone & email on row 2
  const parseContactInfo = () => {
    let address = config.address || '';
    let phone = config.phone || '';
    let email = config.email || '';

    if (!address && config.contact) {
      if (config.contact.includes('|')) {
        const parts = config.contact.split('|').map((s) => s.trim());
        address = parts[0] || '';
        parts.slice(1).forEach((part) => {
          if (part.toLowerCase().includes('tel') || part.includes('+') || /[0-9]{5,}/.test(part)) {
            phone = part.replace(/^tel\s*:\s*/i, '').trim();
          } else if (part.includes('@')) {
            email = part.trim();
          } else if (!phone) {
            phone = part;
          } else if (!email) {
            email = part;
          }
        });
      } else if (config.contact.includes('\n')) {
        const lines = config.contact.split('\n').map((s) => s.trim()).filter(Boolean);
        address = lines[0] || '';
        phone = lines[1] || '';
        email = lines[2] || '';
      } else {
        address = config.contact;
      }
    }

    return { address, phone, email };
  };

  const { address, phone, email } = parseContactInfo();

  return (
    <div className="relative mb-6 overflow-hidden rounded-2xl shadow-lg border border-[#2E5A44]/20 bg-gradient-to-r from-[#1F3A2B] via-[#2E5A44] to-[#396850] text-white">
      {/* Decorative background leaf watermark */}
      <div className="absolute right-0 top-0 bottom-0 w-96 opacity-5 pointer-events-none flex items-center justify-end pr-10">
        <svg viewBox="0 0 100 100" className="w-80 h-80 fill-white">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M50 10 C65 30 75 55 50 90 C25 55 35 30 50 10 Z" />
        </svg>
      </div>

      {/* Edit Header / Settings Button in top right */}
      {onOpenSettings && (
        <button
          type="button"
          onClick={onOpenSettings}
          title={t.headerSettings}
          className="absolute top-3 right-3 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/20 hover:bg-black/40 text-white/90 hover:text-white text-xs border border-white/10 backdrop-blur-sm transition-all"
        >
          <Settings2 className="w-3.5 h-3.5 text-[#D4A373]" />
          <span className="hidden sm:inline font-medium">{t.headerSettings}</span>
        </button>
      )}

      <div className="relative p-5 md:p-7 flex flex-col md:flex-row items-center gap-5">
        {/* Emblem or uploaded Logo */}
        <div className="relative shrink-0">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/95 p-1.5 shadow-md border-2 border-[#D4A373] flex items-center justify-center overflow-hidden">
            {config.logoUrl && !imgError ? (
              <img
                src={config.logoUrl}
                alt={config.name || "L'École des Préalpes"}
                onError={() => setImgError(true)}
                className="w-full h-full object-contain"
              />
            ) : (
              <SchoolLogo className="w-full h-full" />
            )}
          </div>
        </div>

        {/* Text Details */}
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-1">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide uppercase text-white drop-shadow-sm font-serif">
              {config.name}
            </h1>
          </div>
          <p className="text-[#E7C9A9] text-sm md:text-base italic font-light mb-2">
            {config.subtitle}
          </p>

          {/* Contact Details: Address on row 1, Phone & Email on row 2 below */}
          <div className="space-y-1 text-xs md:text-sm font-sans tracking-tight">
            {address && (
              <div className="flex items-center justify-center md:justify-start gap-1.5 text-white/90">
                <MapPin className="w-3.5 h-3.5 text-[#D4A373] shrink-0" />
                <span>{address}</span>
              </div>
            )}
            {(phone || email) && (
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-3.5 gap-y-1 text-white/80">
                {phone && (
                  <a
                    href={`tel:${phone.replace(/\s+/g, '')}`}
                    className="flex items-center gap-1.5 hover:text-[#D4A373] transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#D4A373] shrink-0" />
                    <span>{phone.startsWith('+') ? phone : `Tel: ${phone}`}</span>
                  </a>
                )}
                {phone && email && (
                  <span className="text-white/40 hidden sm:inline">•</span>
                )}
                {email && (
                  <a
                    href={`mailto:${email}`}
                    className="flex items-center gap-1.5 hover:text-[#D4A373] transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#D4A373] shrink-0" />
                    <span>{email}</span>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
