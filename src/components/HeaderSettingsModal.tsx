import React, { useState } from 'react';
import { InstitutionConfig } from '../types';
import { Language, UI_TRANSLATIONS } from '../i18n/translations';
import { DEFAULT_INSTITUTION } from '../data/montessoriData';
import { SchoolLogo } from './SchoolLogo';
import { X, Upload, RotateCcw, Check, Building2, MapPin, Phone, Mail, Image as ImageIcon } from 'lucide-react';

interface HeaderSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: InstitutionConfig;
  onSave: (newConfig: InstitutionConfig) => void;
  lang: Language;
}

export const HeaderSettingsModal: React.FC<HeaderSettingsModalProps> = ({
  isOpen,
  onClose,
  config,
  onSave,
  lang,
}) => {
  const t = UI_TRANSLATIONS[lang];

  const [formData, setFormData] = useState<InstitutionConfig>({
    name: config.name || DEFAULT_INSTITUTION.name,
    subtitle: config.subtitle || DEFAULT_INSTITUTION.subtitle,
    address: config.address || DEFAULT_INSTITUTION.address || '',
    phone: config.phone || DEFAULT_INSTITUTION.phone || '',
    email: config.email || DEFAULT_INSTITUTION.email || '',
    contact: config.contact || DEFAULT_INSTITUTION.contact,
    logoUrl: config.logoUrl || '/logo-prealpes.svg',
  });

  const [logoPreview, setLogoPreview] = useState<string>(
    config.logoUrl || '/logo-prealpes.svg'
  );

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setLogoPreview(result);
        setFormData((prev) => ({ ...prev, logoUrl: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetToOfficialLogo = () => {
    setLogoPreview('/logo-prealpes.svg');
    setFormData((prev) => ({ ...prev, logoUrl: '/logo-prealpes.svg' }));
  };

  const handleResetAllDefaults = () => {
    setFormData({
      ...DEFAULT_INSTITUTION,
      logoUrl: '/logo-prealpes.svg',
    });
    setLogoPreview('/logo-prealpes.svg');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const contactParts = [formData.address, formData.phone, formData.email].filter(Boolean);
    const updatedConfig: InstitutionConfig = {
      ...formData,
      contact: contactParts.length > 0 ? contactParts.join(' | ') : formData.contact,
      logoUrl: logoPreview,
    };
    onSave(updatedConfig);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-[#2E5A44]/20 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[#1F3A2B] to-[#2E5A44] text-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <Building2 className="w-5 h-5 text-[#D4A373]" />
            </div>
            <div>
              <h2 className="text-base font-bold font-serif">{t.headerSettings}</h2>
              <p className="text-xs text-[#E7C9A9]">
                {lang === 'fr'
                  ? 'Personnalisation de la sigle et des coordonnées'
                  : lang === 'ro'
                  ? 'Personalizare siglă școală și date de identificare'
                  : lang === 'de'
                  ? 'Anpassung von Schullogo und Kontaktdaten'
                  : 'Customize school logo and institutional details'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Logo Section */}
          <div className="p-4 rounded-xl border border-gray-200 bg-[#F4F7F5] flex flex-col sm:flex-row items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-white border-2 border-[#D4A373] p-1.5 shadow-md flex items-center justify-center overflow-hidden shrink-0">
              {logoPreview && logoPreview !== '/logo-prealpes.svg' ? (
                <img
                  src={logoPreview}
                  alt="Preview"
                  className="w-full h-full object-contain"
                />
              ) : (
                <SchoolLogo className="w-full h-full" />
              )}
            </div>

            <div className="flex-1 space-y-2 text-center sm:text-left">
              <div className="text-xs font-bold text-[#1F3A2B] flex items-center justify-center sm:justify-start gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-[#2E5A44]" />
                <span>
                  {lang === 'ro'
                    ? 'Sigla Școlii (Antet & Rapoarte PDF)'
                    : lang === 'fr'
                    ? 'Logo de l’école (En-tête & Rapports)'
                    : lang === 'de'
                    ? 'Schullogo (Kopfzeile & PDF)'
                    : 'School Logo (Header & PDF Reports)'}
                </span>
              </div>
              <p className="text-[11px] text-gray-500">
                {lang === 'ro'
                  ? 'Format recomandat: SVG oficial, PNG sau JPG de înaltă rezoluție.'
                  : lang === 'fr'
                  ? 'Format recommandé : SVG officiel, PNG ou JPG haute résolution.'
                  : lang === 'de'
                  ? 'Empfohlenes Format: Offizielles SVG, hochauflösendes PNG oder JPG.'
                  : 'Recommended format: Official SVG, high-resolution PNG or JPG.'}
              </p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#2E5A44] hover:bg-[#1F3A2B] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors">
                  <Upload className="w-3.5 h-3.5 text-[#D4A373]" />
                  <span>{t.uploadLogo}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>

                <button
                  type="button"
                  onClick={handleResetToOfficialLogo}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#2E5A44]/30 hover:border-[#2E5A44] text-[#1F3A2B] text-xs font-semibold rounded-lg shadow-sm transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#D4A373]" />
                  <span>
                    {lang === 'ro'
                      ? 'Sigla oficială Préalpes'
                      : lang === 'fr'
                      ? 'Logo officiel Préalpes'
                      : lang === 'de'
                      ? 'Offizielles Préalpes-Logo'
                      : 'Official Préalpes Logo'}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* School Name */}
          <div>
            <label className="block text-xs font-bold text-[#1F3A2B] uppercase tracking-wider mb-1">
              {t.institutionName}
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-xl text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#2E5A44]/30 focus:border-[#2E5A44]"
              required
            />
          </div>

          {/* Subtitle / Accreditation */}
          <div>
            <label className="block text-xs font-bold text-[#1F3A2B] uppercase tracking-wider mb-1">
              {t.accreditationSubtitle}
            </label>
            <input
              type="text"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-xl text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2E5A44]/30 focus:border-[#2E5A44]"
            />
          </div>

          {/* Contact Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-[#1F3A2B] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#D4A373]" />
                <span>
                  {lang === 'ro' ? 'Adresă (Rândul 1)' : lang === 'fr' ? 'Adresse' : lang === 'de' ? 'Adresse' : 'Address'}
                </span>
              </label>
              <input
                type="text"
                value={formData.address || ''}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Place de la Gare 14-16, 1618 Châtel-St-Denis"
                className="w-full px-3.5 py-2 bg-white border border-gray-300 rounded-xl text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2E5A44]/30 focus:border-[#2E5A44]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1F3A2B] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#D4A373]" />
                <span>{lang === 'ro' ? 'Telefon' : lang === 'fr' ? 'Téléphone' : lang === 'de' ? 'Telefon' : 'Phone'}</span>
              </label>
              <input
                type="text"
                value={formData.phone || ''}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+41 76 429 71 27"
                className="w-full px-3.5 py-2 bg-white border border-gray-300 rounded-xl text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2E5A44]/30 focus:border-[#2E5A44]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1F3A2B] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#D4A373]" />
                <span>Email</span>
              </label>
              <input
                type="email"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="contact@ecole-des-prealpes.ch"
                className="w-full px-3.5 py-2 bg-white border border-gray-300 rounded-xl text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2E5A44]/30 focus:border-[#2E5A44]"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-gray-100">
            <button
              type="button"
              onClick={handleResetAllDefaults}
              className="text-xs text-gray-500 hover:text-red-700 flex items-center gap-1 underline transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{t.resetDefault}</span>
            </button>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 sm:flex-none px-4 py-2 border border-gray-300 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                {t.cancel}
              </button>
              <button
                type="submit"
                className="flex-1 sm:flex-none px-5 py-2 bg-[#2E5A44] hover:bg-[#1F3A2B] text-white rounded-xl text-xs font-bold shadow-md flex items-center justify-center gap-1.5 transition-all"
              >
                <Check className="w-4 h-4 text-[#D4A373]" />
                <span>{t.save}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
