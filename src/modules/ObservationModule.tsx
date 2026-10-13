import React, { useState, useEffect } from 'react';
import { InstitutionConfig, ObservationPhase, ObservationSession } from '../types';
import { Language, UI_TRANSLATIONS } from '../i18n/translations';
import { MULTILINGUAL_OBS_DEFAULTS, getLocalizedObservation } from '../data/multilingualDefaults';
import {
  Eye,
  Plus,
  Sparkles,
  Printer,
  Calendar,
  Clock,
  Users,
  Sun,
  Trash2,
  CheckCircle2,
  BookOpen,
  Info,
  Loader2,
  RotateCcw,
  FileDown
} from 'lucide-react';
import { SpeechToTextButton } from '../components/SpeechToTextButton';
import { exportAiResponseToPdf } from '../utils/aiPdfExport';

interface ObservationModuleProps {
  observations: ObservationSession[];
  onAddObservation: (obs: ObservationSession) => void;
  onDeleteObservation: (id: string) => void;
  onUpdateObservation: (obs: ObservationSession) => void;
  institution: InstitutionConfig;
  onOpenPrint: () => void;
  lang: Language;
}

export const ObservationModule: React.FC<ObservationModuleProps> = ({
  observations,
  onAddObservation,
  onDeleteObservation,
  onUpdateObservation,
  institution,
  onOpenPrint,
  lang,
}) => {
  const t = UI_TRANSLATIONS[lang].obs;

  const getPhaseIndexFromStr = (phaseStr: string): number => {
    if (phaseStr.includes('1-5') || phaseStr.includes('1–5')) return 0;
    if (phaseStr.includes('6-10') || phaseStr.includes('6–10')) return 1;
    if (phaseStr.includes('11-15') || phaseStr.includes('11–15')) return 2;
    if (phaseStr.includes('16-20') || phaseStr.includes('16–20')) return 3;
    return 1;
  };

  const PHASES: ObservationPhase[] = [
    t.phases.p1 as ObservationPhase,
    t.phases.p2 as ObservationPhase,
    t.phases.p3 as ObservationPhase,
    t.phases.p4 as ObservationPhase,
  ];

  const currentDefaults = MULTILINGUAL_OBS_DEFAULTS[lang] || MULTILINGUAL_OBS_DEFAULTS.ro;

  const [selectedPhaseIndex, setSelectedPhaseIndex] = useState<number>(() =>
    getPhaseIndexFromStr(currentDefaults.phase)
  );
  const selectedPhase = PHASES[selectedPhaseIndex] || PHASES[1];

  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [startTime, setStartTime] = useState('09:00');
  const [groupCount, setGroupCount] = useState(currentDefaults.groupCount);
  const [weather, setWeather] = useState(currentDefaults.weather);
  const [notes, setNotes] = useState(currentDefaults.notes);
  const [reflection, setReflection] = useState(currentDefaults.reflection);

  // Sync form defaults when language switches
  useEffect(() => {
    const defaults = MULTILINGUAL_OBS_DEFAULTS[lang] || MULTILINGUAL_OBS_DEFAULTS.ro;
    const allDefaultNotes = Object.values(MULTILINGUAL_OBS_DEFAULTS).map((d) =>
      d.notes.replace(/\r\n/g, '\n').trim()
    );
    const currentNotesNormalized = notes.replace(/\r\n/g, '\n').trim();

    if (!currentNotesNormalized || allDefaultNotes.includes(currentNotesNormalized)) {
      setNotes(defaults.notes);
      setReflection(defaults.reflection);
      setGroupCount(defaults.groupCount);
      setWeather(defaults.weather);
      setSelectedPhaseIndex(getPhaseIndexFromStr(defaults.phase));
    }
  }, [lang]);

  const handleResetToExample = () => {
    const defaults = MULTILINGUAL_OBS_DEFAULTS[lang] || MULTILINGUAL_OBS_DEFAULTS.ro;
    setNotes(defaults.notes);
    setReflection(defaults.reflection);
    setGroupCount(defaults.groupCount);
    setWeather(defaults.weather);
    setSelectedPhaseIndex(getPhaseIndexFromStr(defaults.phase));
  };

  const [analyzingId, setAnalyzingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'form' | 'history'>('form');

  const localizedObservations = observations.map((obs) => getLocalizedObservation(obs, lang));

  const totalHours = Math.min(20, localizedObservations.length * 1.5);
  const progressPercent = Math.min(100, Math.round((totalHours / 20) * 100));

  const handleSaveObservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notes.trim()) return;

    const newObs: ObservationSession = {
      id: 'obs-' + Date.now(),
      date,
      startTime,
      groupCount,
      weather,
      phase: selectedPhase,
      notes,
      reflection,
      createdAt: Date.now(),
    };

    onAddObservation(newObs);
    setActiveTab('history');
  };

  const handleAnalyzeWithAI = async (obs: ObservationSession) => {
    setAnalyzingId(obs.id);
    try {
      const response = await fetch('/api/analyze-observation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phase: obs.phase,
          notes: obs.notes,
          reflection: obs.reflection,
          groupInfo: obs.groupCount,
          lang,
        }),
      });

      const data = await response.json();
      if (data.feedback) {
        onUpdateObservation({
          ...obs,
          aiFeedback: data.feedback,
        });
      }
    } catch (err) {
      console.error('Eroare analiză AI:', err);
    } finally {
      setAnalyzingId(null);
    }
  };

  const getPhaseGuidance = (index: number) => {
    const guidanceList = [t.guidance.p1, t.guidance.p2, t.guidance.p3, t.guidance.p4];
    return guidanceList[index] || t.guidance.p2;
  };

  const currentGuidance = getPhaseGuidance(selectedPhaseIndex);

  return (
    <div className="space-y-6">
      {/* Header Info & Progress Bar */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2E5A44] text-white flex items-center justify-center shrink-0">
              <Eye className="w-6 h-6 text-[#D4A373]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1F3A2B] font-serif">
                {t.title}
              </h2>
              <p className="text-xs text-gray-500">
                {t.subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-right">
              <span className="text-xs font-bold text-[#2E5A44]">
                {t.protocolProgress}: {totalHours.toFixed(1)} / 20 ({progressPercent}%)
              </span>
              <p className="text-[11px] text-gray-400">
                {observations.length} {t.sessionsCount}
              </p>
            </div>
            <button
              type="button"
              onClick={onOpenPrint}
              className="px-3 py-1.5 bg-[#D4A373] hover:bg-[#c29363] text-[#1F3A2B] font-bold text-xs rounded-lg flex items-center gap-1 shadow-sm transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" /> PDF
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-[#2E5A44] via-[#4A6B5D] to-[#D4A373] h-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* 4 Phases Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 pt-1 text-xs">
          {PHASES.map((p, idx) => {
            const shortTitle = p.split(':')[0];
            const isCurrent = selectedPhaseIndex === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedPhaseIndex(idx)}
                className={`p-3 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                  isCurrent
                    ? 'border-[#2E5A44] bg-[#F4F7F5] font-semibold text-[#2E5A44] shadow-xs ring-1 ring-[#2E5A44]/30'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300 bg-white hover:bg-gray-50'
                }`}
              >
                <div className="text-[10px] uppercase font-bold text-[#D4A373] mb-1">
                  {lang === 'fr' ? 'Phase' : lang === 'de' ? 'Phase' : lang === 'en' ? 'Phase' : 'Faza'} {idx + 1}
                </div>
                <div className="truncate font-medium">{shortTitle}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Nav: Adăugare Observație vs Istoric */}
      <div className="flex items-center border-b border-gray-200 gap-2">
        <button
          type="button"
          onClick={() => setActiveTab('form')}
          className={`px-6 py-3 text-xs font-bold border-b-2 -mb-px flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'form'
              ? 'border-[#2E5A44] text-[#2E5A44] bg-white rounded-t-xl shadow-xs'
              : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'
          }`}
        >
          <Plus className="w-4 h-4" /> {t.tabNew}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('history')}
          className={`px-6 py-3 text-xs font-bold border-b-2 -mb-px flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'history'
              ? 'border-[#2E5A44] text-[#2E5A44] bg-white rounded-t-xl shadow-xs'
              : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'
          }`}
        >
          <BookOpen className="w-4 h-4" /> {t.tabHistory} ({localizedObservations.length})
        </button>
      </div>

      {/* TAB 1: FORM */}
      {activeTab === 'form' && (
        <form onSubmit={handleSaveObservation} className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-5">
            {/* Guidance banner for current phase */}
            <div className="bg-[#F4F7F5] border-l-4 border-[#2E5A44] p-3.5 rounded-lg flex items-start gap-2.5">
              <Info className="w-5 h-5 text-[#2E5A44] shrink-0 mt-0.5" />
              <div className="text-xs text-gray-700">
                <span className="font-bold text-[#1F3A2B] block mb-0.5">
                  {t.methodFocus} {selectedPhase.split(':')[0]}:
                </span>
                {currentGuidance}
              </div>
            </div>

            {/* Metadata Fields */}
            <div className="grid grid-cols-12 gap-3.5">
              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                <div className="h-6 flex items-center mb-1">
                  <label className="text-xs font-bold text-gray-700 flex items-center gap-1 whitespace-nowrap">
                    <Calendar className="w-3.5 h-3.5 text-[#2E5A44]" /> {t.date}
                  </label>
                </div>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full h-[38px] bg-gray-50 border border-gray-300 rounded-lg px-3 text-xs focus:ring-1 focus:ring-[#2E5A44] focus:outline-none cursor-pointer box-border"
                />
              </div>

              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                <div className="h-6 flex items-center mb-1">
                  <label className="text-xs font-bold text-gray-700 flex items-center gap-1 whitespace-nowrap">
                    <Clock className="w-3.5 h-3.5 text-[#2E5A44]" /> {t.startTime}
                  </label>
                </div>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full h-[38px] bg-gray-50 border border-gray-300 rounded-lg px-3 text-xs focus:ring-1 focus:ring-[#2E5A44] focus:outline-none cursor-pointer box-border"
                />
              </div>

              <div className="col-span-12 sm:col-span-6 lg:col-span-4">
                <div className="h-6 flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-gray-700 flex items-center gap-1 truncate">
                    <Users className="w-3.5 h-3.5 text-[#2E5A44] shrink-0" /> {t.group}
                  </label>
                  <SpeechToTextButton
                    lang={lang}
                    currentValue={groupCount}
                    onTranscript={(val) => setGroupCount(val)}
                    size="sm"
                  />
                </div>
                <input
                  type="text"
                  value={groupCount}
                  onChange={(e) => setGroupCount(e.target.value)}
                  placeholder={t.groupPlaceholder}
                  className="w-full h-[38px] bg-gray-50 border border-gray-300 rounded-lg px-3 text-xs focus:ring-1 focus:ring-[#2E5A44] focus:outline-none box-border"
                />
              </div>

              <div className="col-span-12 sm:col-span-12 lg:col-span-4">
                <div className="h-6 flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-gray-700 flex items-center gap-1 truncate">
                    <Sun className="w-3.5 h-3.5 text-[#2E5A44] shrink-0" /> {t.weather}
                  </label>
                  <SpeechToTextButton
                    lang={lang}
                    currentValue={weather}
                    onTranscript={(val) => setWeather(val)}
                    size="sm"
                  />
                </div>
                <input
                  type="text"
                  value={weather}
                  onChange={(e) => setWeather(e.target.value)}
                  placeholder={t.weatherPlaceholder}
                  className="w-full h-[38px] bg-gray-50 border border-gray-300 rounded-lg px-3 text-xs focus:ring-1 focus:ring-[#2E5A44] focus:outline-none box-border"
                />
              </div>
            </div>

            {/* Objective Notes Area */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <label className="text-xs font-bold text-[#1F3A2B] uppercase tracking-wider">
                    {t.notesTitle}
                  </label>
                  <SpeechToTextButton
                    lang={lang}
                    currentValue={notes}
                    onTranscript={(val) => setNotes(val)}
                    variant="pill"
                  />
                </div>
                <span className="text-[11px] text-gray-500 italic shrink-0 self-start sm:self-center">
                  {t.notesHint}
                </span>
              </div>
              <textarea
                rows={7}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={t.notesPlaceholder}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-xs leading-relaxed focus:bg-white focus:border-[#2E5A44] focus:outline-none font-mono"
              />
            </div>

            {/* Personal Reflection Area */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <label className="text-xs font-bold text-[#1F3A2B] uppercase tracking-wider">
                    {t.reflectionTitle}
                  </label>
                  <SpeechToTextButton
                    lang={lang}
                    currentValue={reflection}
                    onTranscript={(val) => setReflection(val)}
                    variant="pill"
                  />
                </div>
                <span className="text-[11px] text-gray-500 italic shrink-0 self-start sm:self-center">
                  {t.reflectionHint}
                </span>
              </div>
              <textarea
                rows={4}
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                placeholder={t.reflectionPlaceholder}
                className="w-full bg-[#F4F7F5] border border-gray-300 rounded-lg p-3 text-xs leading-relaxed focus:bg-white focus:border-[#2E5A44] focus:outline-none"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <button
                type="button"
                onClick={handleResetToExample}
                className="text-xs font-semibold text-[#2E5A44] hover:text-[#1F3A2B] bg-[#F4F7F5] hover:bg-[#2E5A44]/15 px-3 py-2 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer border border-[#2E5A44]/20"
                title={t.reloadExample}
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#D4A373]" />
                <span>{t.reloadExample}</span>
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#2E5A44] hover:bg-[#1F3A2B] text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-2 transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4 text-[#D4A373]" /> {t.saveSession}
              </button>
            </div>
          </div>
        </form>
      )}

      {/* TAB 2: HISTORY */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          {localizedObservations.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl text-center border border-gray-200 space-y-3">
              <Eye className="w-10 h-10 text-gray-300 mx-auto" />
              <h3 className="text-sm font-bold text-gray-700">{t.emptyHistory}</h3>
              <button
                type="button"
                onClick={() => setActiveTab('form')}
                className="px-4 py-2 bg-[#2E5A44] text-white rounded-lg text-xs font-semibold cursor-pointer"
              >
                {t.addFirst}
              </button>
            </div>
          ) : (
            localizedObservations.map((obs) => {
              const isAnalyzing = analyzingId === obs.id;
              return (
                <div
                  key={obs.id}
                  className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 md:p-6 space-y-4"
                >
                  {/* Card Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-gray-100 gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#2E5A44] bg-[#F4F7F5] px-2.5 py-0.5 rounded-full border border-[#2E5A44]/20">
                          {obs.phase.split(':')[0]}
                        </span>
                        <span className="text-xs text-gray-500 font-mono">
                          {obs.date} — {obs.startTime}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-[#1F3A2B] mt-1">{obs.phase}</h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleAnalyzeWithAI(obs)}
                        disabled={isAnalyzing}
                        className="px-3 py-1.5 bg-[#F4F7F5] hover:bg-[#2E5A44]/10 text-[#2E5A44] text-xs font-semibold rounded-lg flex items-center gap-1.5 border border-[#2E5A44]/20 transition-colors disabled:opacity-50 cursor-pointer"
                      >
                        {isAnalyzing ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" /> {t.aiAnalyzing}
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-3.5 h-3.5 text-[#D4A373]" /> {t.aiAnalyzeBtn}
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={onOpenPrint}
                        className="p-1.5 text-gray-500 hover:text-[#2E5A44] rounded-lg hover:bg-gray-100 cursor-pointer"
                        title={t.printTooltip}
                      >
                        <Printer className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => onDeleteObservation(obs.id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-100 cursor-pointer"
                        title={t.deleteTooltip}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Metadata Chips */}
                  <div className="flex flex-wrap gap-2 text-[11px] text-gray-600">
                    <span className="bg-gray-50 px-2.5 py-1 rounded-md border border-gray-200">
                      👥 {obs.groupCount}
                    </span>
                    <span className="bg-gray-50 px-2.5 py-1 rounded-md border border-gray-200">
                      🌤️ {obs.weather}
                    </span>
                  </div>

                  {/* Notes Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200">
                      <h4 className="font-bold text-[#1F3A2B] mb-1.5 uppercase text-[10px] tracking-wider">
                        {t.notesTitle.split('(')[0]}:
                      </h4>
                      <p className="whitespace-pre-line leading-relaxed text-gray-800 font-mono text-[11px]">
                        {obs.notes}
                      </p>
                    </div>

                    <div className="bg-[#F4F7F5] p-3.5 rounded-xl border-l-4 border-l-[#D4A373] border-t border-r border-b border-gray-200">
                      <h4 className="font-bold text-[#1F3A2B] mb-1.5 uppercase text-[10px] tracking-wider">
                        {t.reflectionTitle.split('(')[0]}:
                      </h4>
                      <p className="whitespace-pre-line leading-relaxed text-gray-700 italic">
                        {obs.reflection || '—'}
                      </p>
                    </div>
                  </div>

                  {/* AI Feedback Box if generated */}
                  {obs.aiFeedback && (
                    <div className="bg-gradient-to-r from-[#F4F7F5] to-white p-4 rounded-xl border border-[#2E5A44]/30 space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#2E5A44]">
                          <Sparkles className="w-4 h-4 text-[#D4A373]" />
                          {t.aiFeedbackTitle}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => exportAiResponseToPdf({
                              content: obs.aiFeedback!,
                              topic: `Evaluare AI - ${obs.phase}`,
                              question: `Observație (${obs.phase}): ${obs.notes.slice(0, 180)}...`,
                              dateStr: obs.date,
                              lang,
                              institution,
                            })}
                            className="px-2.5 py-1 bg-white hover:bg-emerald-50 text-[#1F3A2B] text-[11px] font-semibold rounded-lg border border-emerald-200 flex items-center gap-1 transition-colors cursor-pointer shadow-2xs"
                            title="Exportă Evaluarea AI în PDF"
                          >
                            <FileDown className="w-3.5 h-3.5 text-[#2E5A44]" />
                            <span>PDF</span>
                          </button>
                          <button
                            type="button"
                            onClick={onOpenPrint}
                            className="px-2.5 py-1 bg-white hover:bg-gray-100 text-gray-700 text-[11px] font-semibold rounded-lg border border-gray-200 flex items-center gap-1 transition-colors cursor-pointer shadow-2xs"
                            title="Tipărește Raportul Complet"
                          >
                            <Printer className="w-3.5 h-3.5 text-gray-600" />
                            <span className="hidden sm:inline">Print</span>
                          </button>
                        </div>
                      </div>
                      <div className="text-xs text-gray-800 leading-relaxed whitespace-pre-line bg-white/80 p-3 rounded-lg border border-gray-200">
                        {obs.aiFeedback}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};
