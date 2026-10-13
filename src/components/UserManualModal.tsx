import React, { useState } from 'react';
import { Language, UI_TRANSLATIONS } from '../i18n/translations';
import { USER_MANUAL_DATA } from '../data/userManualData';
import { generateUserManualPdf } from '../utils/pdfGenerator';
import {
  Download,
  Printer,
  X,
  BookOpen,
  Smartphone,
  Laptop,
  Share2,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

interface UserManualModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
}

export const UserManualModal: React.FC<UserManualModalProps> = ({
  isOpen,
  onClose,
  currentLang,
}) => {
  const [selectedLang, setSelectedLang] = useState<Language>(currentLang);
  const [activeDeviceFilter, setActiveDeviceFilter] = useState<'all' | 'android' | 'ios' | 'desktop'>('all');

  React.useEffect(() => {
    setSelectedLang(currentLang);
  }, [currentLang, isOpen]);

  const manual = USER_MANUAL_DATA[selectedLang] || USER_MANUAL_DATA.fr;
  const t = UI_TRANSLATIONS[selectedLang] || UI_TRANSLATIONS.fr;

  if (!isOpen) return null;

  const handleDownloadPdf = () => {
    generateUserManualPdf(manual, selectedLang);
  };

  const handlePrint = () => {
    window.print();
  };

  const langNames: Record<Language, { label: string; flag: string }> = {
    ro: { label: 'Română', flag: '🇷🇴' },
    fr: { label: 'Français', flag: '🇫🇷' },
    en: { label: 'English', flag: '🇬🇧' },
    de: { label: 'Deutsch', flag: '🇩🇪' },
  };

  const actionLabels: Record<
    Language,
    {
      downloadBtn: string;
      printBtn: string;
      closeBtn: string;
      selectLang: string;
      installationBadge: string;
      quickGuideTitle: string;
      deviceFilterAll: string;
      android: {
        title: string;
        desc: string;
        btnLabel: string;
      };
      ios: {
        title: string;
        desc: string;
        btnLabel: string;
      };
      desktop: {
        title: string;
        desc: string;
        btnLabel: string;
      };
    }
  > = {
    ro: {
      downloadBtn: 'Descarcă Fișier PDF (.pdf)',
      printBtn: 'Previzualizare și Tipărire (A4)',
      closeBtn: 'Închide',
      selectLang: 'Alege Limba Manualului:',
      installationBadge: 'Ghid de Instalare pe Dispozitive Inclus',
      quickGuideTitle: 'Ghid Rapid de Instalare pe Dispozitive:',
      deviceFilterAll: 'Toate Dispozitivele',
      android: {
        title: 'Android (Google Chrome)',
        desc: 'Meniu ⋮ ➔ «Adaugă pe ecran» sau «Instalează aplicația».',
        btnLabel: 'Instalare pe Android',
      },
      ios: {
        title: 'iOS iPhone / iPad (Apple Safari)',
        desc: 'Partajare ⎋ ➔ «Pe ecranul principal» (Add to Home Screen).',
        btnLabel: 'Instalare pe iPhone / iPad',
      },
      desktop: {
        title: 'PC Desktop (Chrome / Edge)',
        desc: 'Pictograma de instalare ⬇ din dreapta barei de adrese URL.',
        btnLabel: 'Instalare pe PC Desktop',
      },
    },
    fr: {
      downloadBtn: 'Télécharger le Fichier PDF (.pdf)',
      printBtn: 'Aperçu et Imprimer (A4)',
      closeBtn: 'Fermer',
      selectLang: 'Sélectionner la Langue :',
      installationBadge: "Guide d'Installation Inclus",
      quickGuideTitle: "Guide Rapide d'Installation par Appareil :",
      deviceFilterAll: 'Tous les Appareils',
      android: {
        title: 'Android (Google Chrome)',
        desc: "Menu ⋮ ➔ « Ajouter à l'écran d'accueil » ou « Installer l'application »",
        btnLabel: 'Installation sur Android',
      },
      ios: {
        title: 'iOS iPhone / iPad (Apple Safari)',
        desc: "Partage ⎋ ➔ « Sur l'écran d'accueil » (Add to Home Screen)",
        btnLabel: 'Installation sur iPhone / iPad',
      },
      desktop: {
        title: 'PC & Mac Desktop (Chrome / Edge)',
        desc: "Icône d'installation ⬇ à droite de la barre d'adresse URL.",
        btnLabel: 'Installation sur PC Desktop',
      },
    },
    en: {
      downloadBtn: 'Download PDF File (.pdf)',
      printBtn: 'Print / Save as PDF (A4)',
      closeBtn: 'Close',
      selectLang: 'Choose Manual Language:',
      installationBadge: 'Installation Guide Included',
      quickGuideTitle: 'Quick Device Installation Guide:',
      deviceFilterAll: 'All Devices',
      android: {
        title: 'Android (Google Chrome)',
        desc: 'Menu ⋮ ➔ « Add to Home screen » or « Install app »',
        btnLabel: 'Install on Android',
      },
      ios: {
        title: 'iOS iPhone / iPad (Apple Safari)',
        desc: 'Share ⎋ ➔ « Add to Home Screen »',
        btnLabel: 'Install on iPhone / iPad',
      },
      desktop: {
        title: 'PC Desktop (Chrome / Edge)',
        desc: 'Install icon ⬇ on the right side of the address bar.',
        btnLabel: 'Install on PC Desktop',
      },
    },
    de: {
      downloadBtn: 'PDF-Datei Herunterladen (.pdf)',
      printBtn: 'Vorschau & Drucken (A4)',
      closeBtn: 'Schließen',
      selectLang: 'Sprache des Handbuchs:',
      installationBadge: 'Inklusive Installationsanleitung',
      quickGuideTitle: 'Schnell-Installationsanleitung nach Gerät:',
      deviceFilterAll: 'Alle Geräte',
      android: {
        title: 'Android (Google Chrome)',
        desc: 'Menü ⋮ ➔ « Zum Startbildschirm hinzufügen » oder « App installieren »',
        btnLabel: 'Auf Android installieren',
      },
      ios: {
        title: 'iOS iPhone / iPad (Apple Safari)',
        desc: 'Teilen ⎋ ➔ « Zum Home-Bildschirm » (Add to Home Screen)',
        btnLabel: 'Auf iPhone / iPad installieren',
      },
      desktop: {
        title: 'PC Desktop (Chrome / Edge)',
        desc: 'Installationssymbol ⬇ rechts in der URL-Adressleiste.',
        btnLabel: 'Auf PC Desktop installieren',
      },
    },
  };

  const labels = actionLabels[selectedLang] || actionLabels.fr;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/70 backdrop-blur-xs overflow-y-auto">
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col max-h-[92vh] overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Top Bar (Screen Only) */}
        <div className="no-print p-4 sm:p-5 bg-[#1F3A2B] text-white flex flex-wrap items-center justify-between gap-3 border-b border-[#D4A373]/30">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/10 border border-[#D4A373]/40 text-[#D4A373]">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold font-serif tracking-wide text-white">
                {manual.title}
              </h2>
              <p className="text-xs text-[#E7C9A9] font-light">
                {manual.institution} • {manual.version}
              </p>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            title={labels.closeBtn}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar: Language Switcher & Action Buttons (Screen Only) */}
        <div className="no-print p-3 sm:px-6 bg-[#FAF7F2] border-b border-gray-200 flex flex-wrap items-center justify-between gap-3">
          {/* Language Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-700 hidden sm:inline">
              {labels.selectLang}
            </span>
            <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-gray-300 shadow-2xs">
              {(['ro', 'fr', 'en', 'de'] as Language[]).map((lng) => (
                <button
                  key={lng}
                  onClick={() => setSelectedLang(lng)}
                  className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all flex items-center gap-1.5 ${
                    selectedLang === lng
                      ? 'bg-[#2E5A44] text-white shadow-2xs'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span>{langNames[lng].flag}</span>
                  <span>{langNames[lng].label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Download & Print Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadPdf}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#2E5A44] hover:bg-[#1F3A2B] text-white text-xs font-bold shadow-xs hover:shadow-md transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#D4A373]" />
              <span>{labels.downloadBtn}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#D4A373] hover:bg-[#c39161] text-[#1F3A2B] text-xs font-bold shadow-xs hover:shadow-md transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">{labels.printBtn}</span>
            </button>
          </div>
        </div>

        {/* Scrollable Document Content */}
        <div
          id="user-manual-printable-area"
          className="p-5 sm:p-8 overflow-y-auto space-y-6 text-gray-800 leading-relaxed font-sans bg-white print:p-0 print:overflow-visible print:text-black"
        >
          {/* Document Cover Header */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#1F3A2B] to-[#2E5A44] text-white border-2 border-[#D4A373] shadow-md print:bg-white print:text-black print:border-gray-400 print:shadow-none">
            <div className="flex items-center justify-between border-b border-white/20 pb-3 mb-4 print:border-gray-300">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#D4A373] print:text-gray-700">
                {manual.institution}
              </span>
              <span className="text-xs font-mono bg-white/10 px-2.5 py-0.5 rounded-full text-white/90 border border-white/20 print:border-gray-400 print:text-black">
                {manual.version} • {manual.date}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold font-serif uppercase tracking-wide text-white print:text-black mb-2">
              {manual.title}
            </h1>
            <p className="text-sm md:text-base italic text-[#E7C9A9] print:text-gray-700 font-light mb-4">
              {manual.subtitle}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-white/15 text-xs text-white/80 print:text-gray-600 print:border-gray-300">
              <div className="flex items-center gap-1.5 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-[#D4A373]" />
                <span>{manual.author}</span>
              </div>
              <div className="flex items-center gap-1 text-[#D4A373] font-semibold print:text-gray-700">
                <ShieldCheck className="w-4 h-4" />
                <span>{labels.installationBadge}</span>
              </div>
            </div>
          </div>

          {/* Quick Device Installation Cards (Visual Highlight) */}
          <div className="space-y-3 no-print">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1F3A2B] flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-[#D4A373]" />
                {labels.quickGuideTitle}
              </span>
              <div className="flex items-center gap-1 text-[11px]">
                <button
                  type="button"
                  onClick={() => setActiveDeviceFilter('all')}
                  className={`px-2.5 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                    activeDeviceFilter === 'all'
                      ? 'bg-[#2E5A44] text-white shadow-2xs'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {labels.deviceFilterAll}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveDeviceFilter('android')}
                  className={`px-2.5 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                    activeDeviceFilter === 'android'
                      ? 'bg-[#2E5A44] text-white shadow-2xs'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  Android
                </button>
                <button
                  type="button"
                  onClick={() => setActiveDeviceFilter('ios')}
                  className={`px-2.5 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                    activeDeviceFilter === 'ios'
                      ? 'bg-[#2E5A44] text-white shadow-2xs'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  iOS iPhone
                </button>
                <button
                  type="button"
                  onClick={() => setActiveDeviceFilter('desktop')}
                  className={`px-2.5 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                    activeDeviceFilter === 'desktop'
                      ? 'bg-[#2E5A44] text-white shadow-2xs'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  PC Desktop
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              {(activeDeviceFilter === 'all' || activeDeviceFilter === 'android') && (
                <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#2E5A44]/20 flex flex-col justify-between gap-3 shadow-2xs">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-[#2E5A44]/10 text-[#2E5A44] shrink-0">
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#1F3A2B]">
                        {labels.android.title}
                      </h4>
                      <p className="text-[11px] text-gray-600 mt-1 leading-relaxed">
                        {labels.android.desc}
                      </p>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-[#D4A373]/20 flex justify-end">
                    <span className="text-[10px] font-bold text-[#2E5A44] bg-[#2E5A44]/10 px-2 py-0.5 rounded-md">
                      {labels.android.btnLabel}
                    </span>
                  </div>
                </div>
              )}

              {(activeDeviceFilter === 'all' || activeDeviceFilter === 'ios') && (
                <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#2E5A44]/20 flex flex-col justify-between gap-3 shadow-2xs">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-[#2E5A44]/10 text-[#2E5A44] shrink-0">
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#1F3A2B]">
                        {labels.ios.title}
                      </h4>
                      <p className="text-[11px] text-gray-600 mt-1 leading-relaxed">
                        {labels.ios.desc}
                      </p>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-[#D4A373]/20 flex justify-end">
                    <span className="text-[10px] font-bold text-[#2E5A44] bg-[#2E5A44]/10 px-2 py-0.5 rounded-md">
                      {labels.ios.btnLabel}
                    </span>
                  </div>
                </div>
              )}

              {(activeDeviceFilter === 'all' || activeDeviceFilter === 'desktop') && (
                <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#2E5A44]/20 flex flex-col justify-between gap-3 shadow-2xs">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-[#2E5A44]/10 text-[#2E5A44] shrink-0">
                      <Laptop className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#1F3A2B]">
                        {labels.desktop.title}
                      </h4>
                      <p className="text-[11px] text-gray-600 mt-1 leading-relaxed">
                        {labels.desktop.desc}
                      </p>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-[#D4A373]/20 flex justify-end">
                    <span className="text-[10px] font-bold text-[#2E5A44] bg-[#2E5A44]/10 px-2 py-0.5 rounded-md">
                      {labels.desktop.btnLabel}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Introduction Section */}
          <div className="p-4 rounded-xl bg-[#F4F6F4] border-l-4 border-[#2E5A44] text-xs sm:text-sm text-gray-700 leading-relaxed">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#1F3A2B] mb-1.5 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-[#D4A373]" />
              {selectedLang === 'fr'
                ? 'Introduction & Vue Générale'
                : selectedLang === 'de'
                ? 'Einleitung & Übersicht'
                : selectedLang === 'en'
                ? 'Introduction & Overview'
                : 'Introducere & Prezentare Generală'}
            </h3>
            <p>{manual.intro}</p>
          </div>

          {/* Chapters and Subsections */}
          <div className="space-y-6">
            {manual.sections.map((section, idx) => (
              <div
                key={section.id}
                className="p-4 sm:p-5 rounded-xl border border-gray-200 bg-white hover:border-[#2E5A44]/40 transition-colors shadow-2xs print:border-gray-300 print:shadow-none print:break-inside-avoid"
              >
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-100">
                  <div className="w-2.5 h-6 bg-[#2E5A44] rounded-sm shrink-0" />
                  <h3 className="text-sm sm:text-base font-bold text-[#1F3A2B] uppercase tracking-wide">
                    {section.title}
                  </h3>
                </div>

                {section.content && section.content.length > 0 && (
                  <div className="space-y-2 mb-4 text-xs sm:text-sm text-gray-700">
                    {section.content.map((p, pIdx) => (
                      <p key={pIdx}>{p}</p>
                    ))}
                  </div>
                )}

                {section.subsections && section.subsections.length > 0 && (
                  <div className="space-y-3.5 pl-2 sm:pl-3 border-l-2 border-[#D4A373]/30">
                    {section.subsections.map((sub, sIdx) => (
                      <div key={sIdx} className="space-y-2">
                        <h4 className="text-xs sm:text-sm font-semibold text-[#8B6538] flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#2E5A44] shrink-0" />
                          <span>{sub.subtitle}</span>
                        </h4>

                        <ul className="space-y-1.5 pl-5 list-disc text-xs sm:text-[13px] text-gray-700">
                          {sub.items.map((item, iIdx) => (
                            <li key={iIdx} className="leading-snug">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Document Footer (Print & Screen) */}
          <div className="pt-6 border-t border-gray-200 text-center text-xs text-gray-500 space-y-1">
            <p className="font-semibold text-gray-700">
              {manual.institution} • {manual.version}
            </p>
            <p className="text-gray-500 italic">
              {manual.author}
            </p>
          </div>
        </div>

        {/* Modal Bottom Sticky Bar (Screen Only) */}
        <div className="no-print p-3 sm:px-6 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <span className="text-xs text-gray-500">
            {selectedLang === 'fr'
              ? 'Disponible en 4 langues avec téléchargement PDF direct.'
              : selectedLang === 'de'
              ? 'Verfügbar in 4 Sprachen mit direktem PDF-Download.'
              : selectedLang === 'en'
              ? 'Available in 4 languages with direct PDF export.'
              : 'Disponibil în 4 limbi cu descărcare directă în format PDF.'}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg text-xs font-bold transition-colors cursor-pointer"
          >
            {labels.closeBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
