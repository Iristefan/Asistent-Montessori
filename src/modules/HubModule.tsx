import React, { useState } from 'react';
import { QuickDailyNote, RoutineItem, InstitutionConfig } from '../types';
import { Language, UI_TRANSLATIONS } from '../i18n/translations';
import { MULTILINGUAL_ROUTINE_LABELS, MULTILINGUAL_QUICK_NOTES } from '../data/multilingualDefaults';
import {
  CheckSquare,
  Sparkles,
  ClipboardList,
  Clock,
  HeartHandshake,
  ShieldCheck,
  Eye,
  Plus,
  Trash2,
  CheckCircle,
  AlertCircle,
  Printer,
  ChevronRight
} from 'lucide-react';
import { SpeechToTextButton } from '../components/SpeechToTextButton';

interface HubModuleProps {
  routines: RoutineItem[];
  onToggleRoutine: (id: string) => void;
  onResetRoutines: () => void;
  quickNotes: QuickDailyNote[];
  onAddNote: (note: Omit<QuickDailyNote, 'id'>) => void;
  onDeleteNote: (id: string) => void;
  onToggleNote: (id: string) => void;
  onNavigate: (moduleName: string) => void;
  onOpenPrint: () => void;
  onOpenManual?: () => void;
  institution: InstitutionConfig;
  lang: Language;
}

const MULTILINGUAL_QUOTES: Record<Language, { quote: string; source: string }[]> = {
  ro: [
    { quote: "Cea mai mare dovadă a succesului unui educator este să poată spune: «Copiii lucrează acum ca și cum eu nu aș exista.»", source: "Dr. Maria Montessori, Mintea Absorbantă" },
    { quote: "Nu spuneți niciodată unui copil: «Ești prea mic pentru asta.» Spuneți: «Haide să învățăm cum se face.»", source: "Dr. Maria Montessori, Secretul Copilăriei" },
    { quote: "Copilul care își sporește independența prin activități practice își perfecționează întreaga personalitate.", source: "Dr. Maria Montessori, Descoperirea Copilului" },
    { quote: "Prima sarcină a educatorului este să aibă grijă de mediu, iar aceasta are prioritate față de orice altceva.", source: "Dr. Maria Montessori, Formarea Omului" }
  ],
  fr: [
    { quote: "La plus grande preuve du succès d'un éducateur est de pouvoir dire : « Les enfants travaillent maintenant comme si je n'existais pas. »", source: "Dr. Maria Montessori, L'Esprit Absorbant" },
    { quote: "Ne dites jamais à un enfant : « Tu es trop petit pour faire ça. » Dites : « Apprenons ensemble comment faire. »", source: "Dr. Maria Montessori, Le Secret de l'Enfance" },
    { quote: "L'enfant qui développe son indépendance par des activités réelles perfectionne sa personnalité tout entière.", source: "Dr. Maria Montessori, La Découverte de l'Enfant" },
    { quote: "La première tâche de l'éducateur est de prendre soin de l'ambiance, et cette tâche a priorité sur tout le reste.", source: "Dr. Maria Montessori, De l'Enfant à l'Adulte" }
  ],
  en: [
    { quote: "The greatest sign of success for a teacher is to be able to say, 'The children are now working as if I did not exist.'", source: "Dr. Maria Montessori, The Absorbent Mind" },
    { quote: "Never tell a child: 'You are too small for this.' Say: 'Let us learn together how this is done.'", source: "Dr. Maria Montessori, The Secret of Childhood" },
    { quote: "The child who increases their independence through practical activity perfects their whole personality.", source: "Dr. Maria Montessori, The Discovery of the Child" },
    { quote: "The first aim of the educator is to care for the environment, and this duty takes precedence over all else.", source: "Dr. Maria Montessori, The Formation of Man" }
  ],
  de: [
    { quote: "Das größte Zeichen des Erfolgs für einen Erzieher ist es, sagen zu können: «Die Kinder arbeiten jetzt, als ob ich nicht existierte.»", source: "Dr. Maria Montessori, Das beharrliche Kind" },
    { quote: "Sagt nie zu einem Kind: «Dafür bist du zu klein.» Sagt: «Lass uns lernen, wie man es macht.»", source: "Dr. Maria Montessori, Das Geheimnis der Kindheit" },
    { quote: "Das Kind, das seine Selbstständigkeit durch praktische Tätigkeiten vertieft, vervollkommnet seine gesamte Persönlichkeit.", source: "Dr. Maria Montessori, Die Entdeckung des Kindes" },
    { quote: "Die erste Aufgabe des Erziehers ist es, die vorbereitete Umgebung zu pflegen, und diese Pflicht steht über allem.", source: "Dr. Maria Montessori, Die Schöpferische Kraft" }
  ]
};

export const HubModule: React.FC<HubModuleProps> = ({
  routines,
  onToggleRoutine,
  onResetRoutines,
  quickNotes,
  onAddNote,
  onDeleteNote,
  onToggleNote,
  onNavigate,
  onOpenPrint,
  onOpenManual,
  institution,
  lang,
}) => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [newNoteText, setNewNoteText] = useState('');
  const [newNoteCat, setNewNoteCat] = useState<'mediu' | 'material' | 'copil' | 'general'>('mediu');

  const t = UI_TRANSLATIONS[lang].hub;
  const quotesList = MULTILINGUAL_QUOTES[lang] || MULTILINGUAL_QUOTES.ro;
  const currentQuote = quotesList[quoteIndex % quotesList.length];

  const completedRoutines = routines.filter((r) => r.completed).length;
  const routineProgress = Math.round((completedRoutines / routines.length) * 100);

  const dateLocale = lang === 'fr' ? 'fr-FR' : lang === 'en' ? 'en-US' : lang === 'de' ? 'de-DE' : 'ro-RO';

  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    onAddNote({
      date: new Date().toLocaleDateString(dateLocale),
      text: newNoteText.trim(),
      category: newNoteCat,
      completed: false,
    });
    setNewNoteText('');
  };

  return (
    <div className="space-y-6">
      {/* Welcome & Principle Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Core Assistant Identity */}
        <div className="md:col-span-2 bg-[#F4F7F5] border-l-4 border-[#2E5A44] p-5 rounded-xl shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2E5A44] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#D4A373]" /> {t.roleTitle}
            </span>
            <span className="text-xs text-gray-500 font-mono">
              {new Date().toLocaleDateString(dateLocale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          </div>
          <h2 className="text-lg font-bold text-[#1F3A2B] font-serif">
            {t.roleTitle}
          </h2>
          <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
            {t.coreRole}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="bg-white p-3 rounded-lg border border-gray-200">
              <span className="text-xs font-bold text-[#2E5A44] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#D4A373]" /> {t.cycle3hTitle}
              </span>
              <p className="text-[11px] text-gray-600 mt-1">
                {t.cycle3hDesc}
              </p>
            </div>
            <div className="bg-white p-3 rounded-lg border border-gray-200">
              <span className="text-xs font-bold text-[#2E5A44] flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-[#D4A373]" /> {t.handsBackTitle}
              </span>
              <p className="text-[11px] text-gray-600 mt-1">
                {t.handsBackDesc}
              </p>
            </div>
            <div className="bg-white p-3 rounded-lg border border-gray-200">
              <span className="text-xs font-bold text-[#2E5A44] flex items-center gap-1">
                <HeartHandshake className="w-3.5 h-3.5 text-[#D4A373]" /> {t.graceTitle}
              </span>
              <p className="text-[11px] text-gray-600 mt-1">
                {t.graceDesc}
              </p>
            </div>
          </div>
        </div>

        {/* Quote of the Day & Quick Print Card */}
        <div className="flex flex-col gap-4">
          <div className="bg-gradient-to-br from-[#2E5A44] to-[#1F3A2B] text-white p-5 rounded-xl shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[#D4A373]">
                <span className="text-xs font-semibold uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> {t.thoughtOfDay}
                </span>
                <button
                  type="button"
                  onClick={() => setQuoteIndex(quoteIndex + 1)}
                  className="text-[11px] text-white/80 hover:text-white underline cursor-pointer"
                >
                  {t.anotherQuote}
                </button>
              </div>
              <p className="text-xs md:text-sm italic font-serif leading-relaxed text-[#F4F7F5]">
                „{currentQuote.quote}”
              </p>
              <p className="text-[11px] text-[#D4A373] text-right font-medium">
                — {currentQuote.source}
              </p>
            </div>
          </div>

          <div className="bg-[#F4F7F5] border border-[#2E5A44]/20 p-4 rounded-xl flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-[#1F3A2B]">{t.instReport}</h4>
              <p className="text-[11px] text-gray-600">{t.instReportDesc} {institution.name}</p>
            </div>
            <button
              type="button"
              onClick={onOpenPrint}
              className="px-3 py-1.5 bg-[#2E5A44] hover:bg-[#1F3A2B] text-white text-xs font-semibold rounded-lg flex items-center gap-1 shadow-sm transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-[#D4A373]" /> {t.printBtn}
            </button>
          </div>
        </div>
      </div>

      {/* Main 2-column layout: Checklist & Quick Notes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Routines Checklist */}
        <div className="lg:col-span-7 bg-white p-5 md:p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#F4F7F5] text-[#2E5A44] flex items-center justify-center">
                <ClipboardList className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#1F3A2B]">
                  {t.checklistTitle}
                </h3>
                <p className="text-xs text-gray-500">
                  {completedRoutines} / {routines.length} {t.tasksDone} ({routineProgress}%)
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onResetRoutines}
              className="text-xs text-gray-500 hover:text-gray-700 underline cursor-pointer"
            >
              {UI_TRANSLATIONS[lang].reset}
            </button>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#2E5A44] to-[#D4A373] h-full transition-all duration-300"
              style={{ width: `${routineProgress}%` }}
            />
          </div>

          {/* Checklist Items */}
          <div className="space-y-2.5 pt-1">
            {routines.map((item) => (
              <label
                key={item.id}
                onClick={() => onToggleRoutine(item.id)}
                className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                  item.completed
                    ? 'bg-[#F4F7F5]/80 border-gray-200 text-gray-500 line-through'
                    : 'bg-white border-gray-200 hover:border-[#2E5A44]/40 text-gray-800'
                }`}
              >
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => {}}
                  className="mt-0.5 w-4 h-4 text-[#2E5A44] rounded border-gray-300 focus:ring-[#2E5A44] cursor-pointer"
                />
                <span className="text-xs leading-relaxed flex-1 select-none">
                  {MULTILINGUAL_ROUTINE_LABELS[lang]?.[item.id] || item.label}
                </span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-medium shrink-0 uppercase tracking-wider ${
                    item.category === 'dimineata'
                      ? 'bg-amber-50 text-amber-700 border border-amber-200'
                      : item.category === 'lucru'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-blue-50 text-blue-700 border border-blue-200'
                  }`}
                >
                  {item.category === 'dimineata'
                    ? t.categories.morning
                    : item.category === 'lucru'
                    ? t.categories.work
                    : t.categories.afternoon}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Right Column: Quick Notes for Environment & Broken Materials */}
        <div className="lg:col-span-5 bg-white p-5 md:p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#F4F7F5] text-[#2E5A44] flex items-center justify-center">
                  <CheckSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#1F3A2B]">
                    {t.quickNotesTitle}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {t.quickNotesDesc}
                  </p>
                </div>
              </div>
            </div>

            {/* Note creation form */}
            <form onSubmit={handleCreateNote} className="space-y-2 mb-4">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1 relative flex items-center">
                  <input
                    type="text"
                    placeholder={t.newNotePlaceholder}
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 pr-9 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#2E5A44] focus:bg-white"
                  />
                  <div className="absolute right-1.5 top-1/2 -translate-y-1/2">
                    <SpeechToTextButton
                      lang={lang}
                      currentValue={newNoteText}
                      onTranscript={(val) => setNewNoteText(val)}
                      size="sm"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <select
                    value={newNoteCat}
                    onChange={(e) => setNewNoteCat(e.target.value as any)}
                    className="bg-gray-50 border border-gray-300 rounded-lg px-2.5 py-2 text-xs text-gray-700 focus:outline-none focus:border-[#2E5A44] cursor-pointer"
                  >
                    <option value="mediu">{t.categories.environment}</option>
                    <option value="material">{t.categories.material}</option>
                    <option value="copil">{t.categories.child}</option>
                    <option value="general">{t.categories.general}</option>
                  </select>
                  <button
                    type="submit"
                    className="px-3.5 py-2 bg-[#2E5A44] hover:bg-[#1F3A2B] text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1 shadow-xs cursor-pointer transition-colors"
                  >
                    <Plus className="w-4 h-4 text-[#D4A373]" /> {t.addBtn}
                  </button>
                </div>
              </div>
            </form>

            {/* Notes List */}
            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
              {quickNotes.length === 0 ? (
                <div className="text-center py-8 text-gray-400 text-xs">
                  <AlertCircle className="w-6 h-6 mx-auto mb-1 opacity-50" />
                  {t.emptyNotes}
                </div>
              ) : (
                quickNotes.map((note) => (
                  <div
                    key={note.id}
                    className={`flex items-start justify-between gap-2 p-2.5 rounded-lg border text-xs ${
                      note.completed
                        ? 'bg-gray-50 border-gray-200 text-gray-400 line-through'
                        : 'bg-[#F4F7F5] border-gray-200 text-gray-800'
                    }`}
                  >
                    <div className="flex items-start gap-2 flex-1 min-w-0">
                      <button
                        type="button"
                        onClick={() => onToggleNote(note.id)}
                        className="mt-0.5 text-gray-400 hover:text-[#2E5A44] cursor-pointer"
                      >
                        <CheckCircle
                          className={`w-3.5 h-3.5 ${
                            note.completed ? 'text-emerald-600 fill-emerald-100' : ''
                          }`}
                        />
                      </button>
                      <div className="flex-1 min-w-0">
                        <span className="block leading-relaxed break-words">
                          {MULTILINGUAL_QUICK_NOTES[lang]?.[note.id] || note.text}
                        </span>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] text-gray-400 font-mono">
                            {note.date}
                          </span>
                          <span className="text-[9px] uppercase px-1.5 py-0.2 bg-white rounded border border-gray-200 font-medium text-gray-600">
                            {note.category === 'mediu'
                              ? t.categories.environment
                              : note.category === 'material'
                              ? t.categories.material
                              : note.category === 'copil'
                              ? t.categories.child
                              : t.categories.general}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => onDeleteNote(note.id)}
                      className="text-gray-400 hover:text-red-500 p-1 cursor-pointer shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Quick Access to other modules banner */}
          <div className="mt-4 pt-3 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
            <button
              type="button"
              onClick={() => onNavigate('calendar')}
              className="p-2.5 bg-[#F4F7F5] hover:bg-[#2E5A44]/10 rounded-lg text-left flex items-center justify-between text-[#2E5A44] font-medium transition-colors cursor-pointer"
            >
              <span>📅 {UI_TRANSLATIONS[lang].nav.calendar}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('obs')}
              className="p-2.5 bg-[#F4F7F5] hover:bg-[#2E5A44]/10 rounded-lg text-left flex items-center justify-between text-[#2E5A44] font-medium transition-colors cursor-pointer"
            >
              <span>👁️ {UI_TRANSLATIONS[lang].nav.obs}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('lesson')}
              className="p-2.5 bg-[#F4F7F5] hover:bg-[#2E5A44]/10 rounded-lg text-left flex items-center justify-between text-[#2E5A44] font-medium transition-colors cursor-pointer"
            >
              <span>📝 {UI_TRANSLATIONS[lang].nav.lesson}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
