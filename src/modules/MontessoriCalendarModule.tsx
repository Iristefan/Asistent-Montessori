import React, { useState, useMemo } from 'react';
import { InstitutionConfig, MontessoriCalendarEvent, MontessoriEventCategory } from '../types';
import { Language, UI_TRANSLATIONS } from '../i18n/translations';
import { MONTESSORI_CALENDAR_EVENTS } from '../data/montessoriCalendarData';
import { exportCalendarToPdf, exportBirthdayWalkScriptToPdf } from '../utils/calendarPdfExport';
import { SpeechToTextButton } from '../components/SpeechToTextButton';
import {
  Calendar as CalendarIcon,
  Sun,
  Heart,
  Globe,
  Sparkles,
  FileDown,
  Printer,
  Search,
  Filter,
  Layers,
  Quote,
  CheckCircle2,
  Clock,
  BookOpen,
  ChevronRight,
  ChevronDown,
  RotateCcw,
  Baby
} from 'lucide-react';

interface MontessoriCalendarModuleProps {
  institution: InstitutionConfig;
  lang: Language;
  onOpenPrint?: () => void;
}

export const MontessoriCalendarModule: React.FC<MontessoriCalendarModuleProps> = ({
  institution,
  lang,
}) => {
  const t = UI_TRANSLATIONS[lang];
  const cT = t.calendar;

  // Current system date & month detection for automatic adaptation based on current date
  const now = new Date();
  const currentSystemMonth = now.getMonth() + 1; // 1-12
  const formattedToday = useMemo(() => {
    const localeMap: Record<Language, string> = {
      ro: 'ro-RO',
      fr: 'fr-FR',
      en: 'en-US',
      de: 'de-DE',
    };
    return now.toLocaleDateString(localeMap[lang] || 'ro-RO', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }, [lang]);

  // State: adapt selected month by default to the present date's month
  const [selectedMonth, setSelectedMonth] = useState<number | null>(() => new Date().getMonth() + 1);
  const [selectedCategory, setSelectedCategory] = useState<MontessoriEventCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);

  // Birthday Walk Modal / Panel State
  const [isBirthdayPanelOpen, setIsBirthdayPanelOpen] = useState(false);
  const [birthdayChildName, setBirthdayChildName] = useState('Luca');
  const [birthdayTurningAge, setBirthdayTurningAge] = useState(4);
  const [birthdayDate, setBirthdayDate] = useState(new Date().toISOString().split('T')[0]);
  const [activeWalkStep, setActiveWalkStep] = useState(1);

  // Dynamic Birthday Walk Narration
  const birthdayWalkTexts = useMemo(() => {
    const name = birthdayChildName.trim() || (
      lang === 'fr' ? 'l’enfant' : lang === 'en' ? 'the child' : lang === 'de' ? 'das Kind' : 'copilul'
    );

    if (lang === 'fr') {
      const yr = activeWalkStep === 1 ? 'an' : 'ans';
      return {
        stepHeader: `Parcours Cosmique : Étape ${activeWalkStep} sur ${birthdayTurningAge}`,
        orbitTitle: `Révolution orbitale n° ${activeWalkStep} : La Terre a voyagé un an autour du Soleil`,
        narration: `« L'enfant tient le globe terrestre à deux mains et marche lentement autour du tapis du Soleil. L'éducateur dit d'une voix douce : “La Terre a fait un tour complet autour du Soleil, 12 mois se sont écoulés, et ${name} a fêté ses ${activeWalkStep} ${yr} ! Regardez la photo de ses ${activeWalkStep} ${yr} : qu'avait-il déjà appris à faire ?” »`,
      };
    }

    if (lang === 'en') {
      const yr = activeWalkStep === 1 ? 'year' : 'years';
      return {
        stepHeader: `Cosmic Journey: Step ${activeWalkStep} of ${birthdayTurningAge}`,
        orbitTitle: `Orbital revolution #${activeWalkStep}: Earth traveled one year around the Sun`,
        narration: `"The child holds the globe with both hands and walks slowly around the Sun rug. The guide says with a warm voice: 'The Earth has orbited the Sun once, 12 months have passed, and ${name} turned ${activeWalkStep} ${yr} old! Look at the photograph at ${activeWalkStep} ${yr} old: what had they already learned to do?'"`,
      };
    }

    if (lang === 'de') {
      const yr = activeWalkStep === 1 ? 'Jahr' : 'Jahre';
      return {
        stepHeader: `Kosmischer Pfad: Schritt ${activeWalkStep} von ${birthdayTurningAge}`,
        orbitTitle: `Umlaufbahn Nr. ${activeWalkStep}: Die Erde ist ein Jahr um die Sonne gewandert`,
        narration: `«Das Kind hält den Globus mit beiden Händen und geht langsam um den Sonnenteppich. Die Lehrkraft sagt mit ruhiger Stimme: „Die Erde hat die Sonne einmal umkreist, 12 Monate sind vergangen, und ${name} ist nun ${activeWalkStep} ${yr} alt! Seht das Foto vom ${activeWalkStep}. Lebensjahr: was konnte das Kind damals schon?“»`,
      };
    }

    // Default: ro
    const yr = activeWalkStep === 1 ? 'an' : 'ani';
    return {
      stepHeader: `Traseul Cosmic: Pasul ${activeWalkStep} din ${birthdayTurningAge}`,
      orbitTitle: `Rotația orbitală nr. ${activeWalkStep}: Pământul a călătorit un an în jurul Soarelui`,
      narration: `«Copilul ține globul pământesc cu ambele mâini și merge încet în jurul covorului Soarelui. Ghidul spune cu voce caldă: “Pământul s-a învârtit o dată în jurul Soarelui, au trecut 12 luni, iar ${name} a împlinit ${activeWalkStep} ${yr}! Priviți fotografia de la ${activeWalkStep} ${yr}: ce învățase să facă deja?”»`,
    };
  }, [activeWalkStep, birthdayTurningAge, birthdayChildName, lang]);

  // Category Configuration
  const categories: Array<{ id: MontessoriEventCategory | 'all'; label: string; icon: any; color: string }> = [
    { id: 'all', label: cT.allCategories, icon: Layers, color: 'bg-gray-100 text-gray-800 border-gray-300' },
    { id: 'founder', label: cT.founderCat, icon: Sparkles, color: 'bg-amber-50 text-amber-900 border-amber-300' },
    { id: 'peace', label: cT.peaceCat, icon: Heart, color: 'bg-emerald-50 text-emerald-900 border-emerald-300' },
    { id: 'cosmic', label: cT.cosmicCat, icon: Globe, color: 'bg-sky-50 text-sky-900 border-sky-300' },
    { id: 'tradition', label: cT.traditionCat, icon: Sun, color: 'bg-purple-50 text-purple-900 border-purple-300' },
  ];

  // Filter events
  const filteredEvents = useMemo(() => {
    return MONTESSORI_CALENDAR_EVENTS.filter((ev) => {
      // Month Filter
      if (selectedMonth !== null && ev.month !== selectedMonth) {
        return false;
      }
      // Category Filter
      if (selectedCategory !== 'all' && ev.category !== selectedCategory) {
        return false;
      }
      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const title = (ev.title[lang] || '').toLowerCase();
        const subtitle = (ev.subtitle[lang] || '').toLowerCase();
        const context = (ev.historicalContext[lang] || '').toLowerCase();
        const quote = (ev.montessoriQuote[lang]?.text || '').toLowerCase();
        const materials = (ev.recommendedMaterials[lang] || []).join(' ').toLowerCase();

        return (
          title.includes(query) ||
          subtitle.includes(query) ||
          context.includes(query) ||
          quote.includes(query) ||
          materials.includes(query)
        );
      }
      return true;
    });
  }, [selectedMonth, selectedCategory, searchQuery, lang]);

  const handlePrintCurrentView = () => {
    window.print();
  };

  const handleExportPdf = () => {
    exportCalendarToPdf({
      events: filteredEvents,
      institution,
      lang,
      selectedMonth: selectedMonth || undefined,
      selectedCategory: selectedCategory !== 'all' ? selectedCategory : undefined,
    });
  };

  const handleExportBirthdayScript = () => {
    exportBirthdayWalkScriptToPdf({
      childName: birthdayChildName,
      turningAge: birthdayTurningAge,
      birthDate: birthdayDate,
      institution,
      lang,
    });
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-[#1F3A2B] via-[#2E5A44] to-[#396850] p-6 sm:p-8 rounded-3xl text-white shadow-md space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/90 border border-white/20 text-xs font-semibold backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#D4A373]" />
              <span>{cT.taglineBadge}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold tracking-tight">
              {cT.title}
            </h2>
            <p className="text-xs sm:text-sm text-white/80 max-w-2xl font-serif italic">
              {cT.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => setIsBirthdayPanelOpen(!isBirthdayPanelOpen)}
              className="px-4 py-2 bg-gradient-to-r from-[#D4A373] to-[#c29363] hover:from-[#c29363] hover:to-[#b08353] text-[#1F3A2B] font-bold text-xs rounded-xl shadow flex items-center gap-2 transition-all cursor-pointer"
            >
              <Sun className="w-4 h-4 text-[#1F3A2B] animate-spin-slow" />
              <span>{cT.birthdayWalkShort}</span>
            </button>

            <button
              type="button"
              onClick={handleExportPdf}
              className="px-4 py-2 bg-white/15 hover:bg-white/25 text-white border border-white/30 font-semibold text-xs rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-xs"
              title={cT.exportPdfTooltip}
            >
              <FileDown className="w-4 h-4 text-[#D4A373]" />
              <span>{cT.exportPdf}</span>
            </button>

            <button
              type="button"
              onClick={handlePrintCurrentView}
              className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
              title={cT.printCalendarTooltip}
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>

        <p className="text-xs text-white/75 leading-relaxed pt-1 border-t border-white/15">
          {cT.description}
        </p>
      </div>

      {/* 2. Interactive Birthday Walk Generator Panel */}
      {isBirthdayPanelOpen && (
        <div className="bg-white rounded-3xl p-6 border-2 border-[#D4A373]/40 shadow-xl space-y-5 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-gray-100 gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0 border border-amber-200">
                <Sun className="w-6 h-6 text-amber-700" />
              </div>
              <div>
                <h3 className="text-base font-serif font-bold text-[#1F3A2B]">
                  {cT.birthdayWalkTitle}
                </h3>
                <p className="text-xs text-gray-500">
                  {cT.birthdayWalkSubtitle}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleExportBirthdayScript}
                className="px-3 py-1.5 bg-[#2E5A44] hover:bg-[#1F3A2B] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <FileDown className="w-3.5 h-3.5 text-[#D4A373]" />
                <span>{cT.exportScriptPdf}</span>
              </button>
              <button
                type="button"
                onClick={() => setIsBirthdayPanelOpen(false)}
                className="text-xs text-gray-400 hover:text-gray-700 px-2 py-1 cursor-pointer"
              >
                {cT.closePanel}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                {cT.childNameLabel}
              </label>
              <input
                type="text"
                value={birthdayChildName}
                onChange={(e) => setBirthdayChildName(e.target.value)}
                placeholder="Ex: Luca"
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-[#2E5A44] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                {cT.turningAgeLabel}
              </label>
              <select
                value={birthdayTurningAge}
                onChange={(e) => setBirthdayTurningAge(Number(e.target.value))}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-[#2E5A44] focus:outline-none cursor-pointer"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((age) => (
                  <option key={age} value={age}>
                    {age} {age === 1 ? cT.yearSingular : cT.yearPlural}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                {cT.birthDateLabel}
              </label>
              <input
                type="date"
                value={birthdayDate}
                onChange={(e) => setBirthdayDate(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-[#2E5A44] focus:outline-none cursor-pointer"
              />
            </div>
          </div>

          {/* Interactive Steps of the Birthday Walk */}
          <div className="bg-[#F4F7F5] rounded-2xl p-4 sm:p-5 border border-[#2E5A44]/20 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1F3A2B] flex items-center gap-2">
                <Sun className="w-4 h-4 text-[#D4A373]" />
                <span>{birthdayWalkTexts.stepHeader}</span>
              </span>
              <div className="flex gap-1.5">
                {Array.from({ length: birthdayTurningAge }, (_, i) => i + 1).map((step) => (
                  <button
                    key={step}
                    type="button"
                    onClick={() => setActiveWalkStep(step)}
                    className={`w-7 h-7 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                      activeWalkStep === step
                        ? 'bg-[#2E5A44] text-white shadow'
                        : 'bg-white text-gray-600 border border-gray-300 hover:border-[#2E5A44]'
                    }`}
                  >
                    {step}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#D4A373]">
                <Globe className="w-4 h-4 text-[#2E5A44]" />
                <span>
                  {birthdayWalkTexts.orbitTitle}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-800 leading-relaxed font-serif italic">
                {birthdayWalkTexts.narration}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 3. Filter & Search Controls */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-4">
        {/* Search Bar with Speech-to-Text */}
        <div className="flex flex-col sm:flex-row gap-3 items-center">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={cT.searchPlaceholder}
              className="w-full pl-10 pr-12 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs text-gray-800 focus:bg-white focus:border-[#2E5A44] focus:outline-none focus:ring-1 focus:ring-[#2E5A44]"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <SpeechToTextButton
                lang={lang}
                currentValue={searchQuery}
                onTranscript={(txt) => setSearchQuery(txt)}
                size="sm"
              />
            </div>
          </div>

          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="px-3 py-2 text-xs text-gray-500 hover:text-gray-800 bg-gray-100 rounded-lg flex items-center gap-1 cursor-pointer shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{cT.resetSearch}</span>
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 pt-1 border-t border-gray-100">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#2E5A44] text-white border-[#2E5A44] shadow-xs'
                    : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#D4A373]' : 'text-gray-500'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Month Selector Buttons */}
        <div className="pt-2 border-t border-gray-100">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                <CalendarIcon className="w-3.5 h-3.5 text-[#2E5A44]" />
                <span>{cT.filterByMonth}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-amber-50 text-amber-900 border border-amber-200">
                <Clock className="w-3 h-3 text-amber-600" />
                <span>{cT.todayIs}: <strong className="font-bold">{formattedToday}</strong></span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              {selectedMonth !== null && (
                <button
                  type="button"
                  onClick={() => setSelectedMonth(null)}
                  className="text-[11px] text-[#2E5A44] font-semibold hover:underline cursor-pointer"
                >
                  {cT.showAllMonths}
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-1.5 text-xs">
            {cT.monthNames.map((monthName, idx) => {
              const monthNum = idx + 1;
              const isSelected = selectedMonth === monthNum;
              const isCurrent = monthNum === currentSystemMonth;

              return (
                <button
                  key={monthNum}
                  type="button"
                  onClick={() => setSelectedMonth(isSelected ? null : monthNum)}
                  className={`py-2 px-1 rounded-xl text-center transition-all cursor-pointer relative flex flex-col items-center justify-center min-h-[46px] ${
                    isSelected && isCurrent
                      ? 'bg-[#2E5A44] text-white font-bold shadow-xs ring-2 ring-amber-400 ring-offset-1'
                      : isSelected
                      ? 'bg-[#2E5A44] text-white font-bold shadow-xs'
                      : isCurrent
                      ? 'bg-amber-50 text-amber-950 border-2 border-amber-400 font-bold shadow-2xs hover:bg-amber-100'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200/80'
                  }`}
                  title={isCurrent ? `${monthName} (${cT.todayIs}: ${formattedToday})` : monthName}
                >
                  <span className="truncate block font-semibold text-xs leading-none">{monthName.slice(0, 3)}</span>
                  {isCurrent && (
                    <span
                      className={`text-[8px] uppercase tracking-wider font-extrabold px-1 rounded-xs mt-1 leading-tight ${
                        isSelected ? 'bg-amber-400 text-amber-950' : 'bg-amber-200 text-amber-900'
                      }`}
                    >
                      {cT.currentMonthBadge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. Events Listing */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">
            {filteredEvents.length} {cT.eventsFoundSuffix}
          </span>
          <span className="text-xs text-gray-400">
            {cT.clickToExpandHint}
          </span>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl text-center border border-gray-200 space-y-3">
            <CalendarIcon className="w-10 h-10 text-gray-300 mx-auto" />
            <p className="text-sm font-bold text-gray-700">{cT.noEventsFound}</p>
            <button
              type="button"
              onClick={() => {
                setSelectedMonth(null);
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-[#2E5A44] text-white text-xs font-semibold rounded-xl cursor-pointer"
            >
              {cT.showAllHolidays}
            </button>
          </div>
        ) : (
          filteredEvents.map((ev) => {
            const isExpanded = expandedEventId === ev.id;
            const categoryBadge =
              ev.category === 'founder'
                ? { label: cT.founderCat, bg: 'bg-amber-100 text-amber-900 border-amber-200', icon: Sparkles }
                : ev.category === 'peace'
                ? { label: cT.peaceCat, bg: 'bg-emerald-100 text-emerald-900 border-emerald-200', icon: Heart }
                : ev.category === 'cosmic'
                ? { label: cT.cosmicCat, bg: 'bg-sky-100 text-sky-900 border-sky-200', icon: Globe }
                : { label: cT.traditionCat, bg: 'bg-purple-100 text-purple-900 border-purple-200', icon: Sun };

            const BadgeIcon = categoryBadge.icon;

            return (
              <div
                key={ev.id}
                className="bg-white rounded-2xl border border-gray-200/90 shadow-sm hover:shadow-md transition-all overflow-hidden"
              >
                {/* Event Main Banner */}
                <div
                  onClick={() => setExpandedEventId(isExpanded ? null : ev.id)}
                  className="p-5 sm:p-6 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none hover:bg-gray-50/60 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    {/* Date Badge */}
                    <div className="w-14 h-14 rounded-2xl bg-[#F4F7F5] border border-[#2E5A44]/20 text-[#1F3A2B] flex flex-col items-center justify-center shrink-0 shadow-xs">
                      <span className="text-[10px] uppercase font-bold text-[#D4A373] tracking-wider">
                        {cT.monthNames[ev.month - 1].slice(0, 3)}
                      </span>
                      <span className="text-lg font-bold leading-tight font-serif">
                        {ev.day || '—'}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border flex items-center gap-1 ${categoryBadge.bg}`}
                        >
                          <BadgeIcon className="w-3 h-3" />
                          <span>{categoryBadge.label}</span>
                        </span>
                        <span className="text-xs text-gray-500 font-mono">
                          {ev.dateDisplay[lang]}
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-serif font-bold text-gray-900">
                        {ev.title[lang]}
                      </h3>
                      <p className="text-xs text-gray-600 font-serif italic">
                        {ev.subtitle[lang]}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <span className="text-xs text-[#2E5A44] font-semibold hidden md:inline">
                      {isExpanded ? cT.hideDetails : cT.viewActivities}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 transition-transform ${
                        isExpanded ? 'rotate-180 bg-[#2E5A44] text-white' : ''
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Expanded Pedagogical Details & Classroom Activities */}
                {isExpanded && (
                  <div className="border-t border-gray-100 bg-[#FDFBF7]/50 p-5 sm:p-6 space-y-5 animate-fadeIn">
                    {/* Historical Context */}
                    <div className="space-y-1.5">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#1F3A2B] flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-[#D4A373]" />
                        <span>{cT.historicalContextTitle}</span>
                      </h4>
                      <p className="text-xs text-gray-700 leading-relaxed font-sans">
                        {ev.historicalContext[lang]}
                      </p>
                    </div>

                    {/* Pedagogical Meaning */}
                    <div className="bg-white p-3.5 rounded-xl border border-gray-200/80 text-xs text-gray-700 space-y-1">
                      <span className="font-bold text-[#2E5A44] block">
                        🌱 {cT.pedagogicalMeaningTitle}:
                      </span>
                      <p className="leading-relaxed">
                        {ev.pedagogicalMeaning[lang]}
                      </p>
                    </div>

                    {/* Age Differentiated Classroom Activities */}
                    <div className="space-y-2.5">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#1F3A2B] flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#D4A373]" />
                        <span>{cT.classroomGuide}</span>
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                        {/* 0-3 Toddler */}
                        <div className="bg-white p-3.5 rounded-xl border border-amber-200/80 shadow-xs space-y-1.5">
                          <span className="font-bold text-amber-900 flex items-center gap-1 text-[11px] uppercase tracking-wider">
                            <Baby className="w-3.5 h-3.5 text-amber-700" />
                            <span>{cT.toddlerLevel}</span>
                          </span>
                          <p className="text-gray-600 leading-relaxed">
                            {ev.classroomActivities[lang]?.toddler || (lang === 'fr' ? 'Activités sensorielles adaptées.' : lang === 'en' ? 'Sensory activities adapted.' : lang === 'de' ? 'Angepasste Sinnesübungen.' : 'Activități senzoriale adaptate.')}
                          </p>
                        </div>

                        {/* 3-6 Casa */}
                        <div className="bg-white p-3.5 rounded-xl border border-emerald-200/80 shadow-xs space-y-1.5">
                          <span className="font-bold text-emerald-900 flex items-center gap-1 text-[11px] uppercase tracking-wider">
                            <Sun className="w-3.5 h-3.5 text-emerald-700" />
                            <span>{cT.casaLevel}</span>
                          </span>
                          <p className="text-gray-600 leading-relaxed">
                            {ev.classroomActivities[lang]?.casa || (lang === 'fr' ? 'Présentations individuelles et sur tapis.' : lang === 'en' ? 'Individual and rug presentations.' : lang === 'de' ? 'Individuelle und Teppich-Präsentationen.' : 'Prezentări individuale și la covor.')}
                          </p>
                        </div>

                        {/* 6-12 Elementary */}
                        <div className="bg-white p-3.5 rounded-xl border border-sky-200/80 shadow-xs space-y-1.5">
                          <span className="font-bold text-sky-900 flex items-center gap-1 text-[11px] uppercase tracking-wider">
                            <Globe className="w-3.5 h-3.5 text-sky-700" />
                            <span>{cT.elementaryLevel}</span>
                          </span>
                          <p className="text-gray-600 leading-relaxed">
                            {ev.classroomActivities[lang]?.elementary || (lang === 'fr' ? 'Grande Leçon et projets de recherche.' : lang === 'en' ? 'Great Lesson and research projects.' : lang === 'de' ? 'Große Erzählung und Forschungsprojekte.' : 'Marea Lecție și proiecte de cercetare.')}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Recommended Materials */}
                    {ev.recommendedMaterials[lang] && (
                      <div className="space-y-1.5">
                        <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                          {cT.recommendedMaterials}:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {ev.recommendedMaterials[lang].map((mat, idx) => (
                            <span
                              key={idx}
                              className="text-[11px] bg-white border border-gray-200 px-2.5 py-1 rounded-lg text-gray-700 shadow-xs flex items-center gap-1"
                            >
                              <CheckCircle2 className="w-3 h-3 text-[#2E5A44]" />
                              <span>{mat}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Maria Montessori Quote Box */}
                    {ev.montessoriQuote[lang] && (
                      <div className="bg-[#F4F7F5] border-l-4 border-[#2E5A44] p-3.5 rounded-r-xl text-xs space-y-1">
                        <p className="font-serif italic text-gray-800 leading-relaxed">
                          {ev.montessoriQuote[lang].text}
                        </p>
                        <span className="block text-[10px] font-bold text-[#1F3A2B] uppercase tracking-wider">
                          — {ev.montessoriQuote[lang].source}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
