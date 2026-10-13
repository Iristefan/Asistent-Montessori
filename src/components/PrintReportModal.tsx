import React, { useState } from 'react';
import { InstitutionConfig, LessonPlan, ObservationSession } from '../types';
import { Language, UI_TRANSLATIONS } from '../i18n/translations';
import { getLocalizedObservation, getLocalizedLessonPlan } from '../data/multilingualDefaults';
import { LanguageSwitcher } from './LanguageSwitcher';
import { SchoolLogo } from './SchoolLogo';
import { Printer, X, Download } from 'lucide-react';
import {
  exportLessonPlanToPdf,
  exportObservationReportToPdf,
  exportWeeklyReportToPdf,
} from '../utils/reportPdfExport';

interface PrintReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: InstitutionConfig;
  activeObservations: ObservationSession[];
  activeLessons: LessonPlan[];
  lang: Language;
  onLanguageChange: (lang: Language) => void;
}

export const PrintReportModal: React.FC<PrintReportModalProps> = ({
  isOpen,
  onClose,
  config,
  activeObservations,
  activeLessons,
  lang,
  onLanguageChange,
}) => {
  const [reportType, setReportType] = useState<'observation' | 'lesson' | 'weekly'>('weekly');
  const [selectedObsId, setSelectedObsId] = useState<string>(
    activeObservations[0]?.id || ''
  );
  const [selectedLessonId, setSelectedLessonId] = useState<string>(
    activeLessons[0]?.id || ''
  );

  const localizedObservations = activeObservations.map((o) => getLocalizedObservation(o, lang));
  const localizedLessons = activeLessons.map((l) => getLocalizedLessonPlan(l, lang));

  const t = UI_TRANSLATIONS[lang];
  const tp = t.printModal;

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const selectedObs =
    localizedObservations.find((o) => o.id === selectedObsId) || localizedObservations[0];
  const selectedLesson =
    localizedLessons.find((l) => l.id === selectedLessonId) || localizedLessons[0];

  const handleDownloadPdf = () => {
    if (reportType === 'lesson') {
      if (!selectedLesson) return;
      exportLessonPlanToPdf({ plan: selectedLesson, institution: config, lang });
    } else if (reportType === 'observation') {
      if (!selectedObs) return;
      exportObservationReportToPdf({ observation: selectedObs, institution: config, lang });
    } else {
      exportWeeklyReportToPdf({
        observations: localizedObservations,
        lessonPlans: localizedLessons,
        institution: config,
        lang,
      });
    }
  };

  const REPORT_TITLES = {
    ro: {
      obsTitle: 'RAPORT DE OBSERVAȚIE MONTESSORI',
      obsSub: 'Protocolul zilnic de Observație Practică (bazat pe principiile modelului educațional Montessori)',
      lessonTitle: 'PLAN DE PREZENTARE MONTESSORI',
      lessonSub: 'Planificator de prezentări (bazat pe principiile modelului educațional Montessori)',
      weeklyTitle: 'RAPORT SĂPTĂMÂNAL ASISTENT MONTESSORI',
      school: 'Școală / Clasă:',
      date: 'Data:',
      startTime: 'Ora Start:',
      group: 'Grupă:',
      weather: 'Meteo / Ambianță:',
      phase: 'Etapă Observație:',
      phaseFocus: 'Focusul Etapei Curente:',
      notesHeading: '1. Note Obiective de Observație (la intervale de 5 min / Fapte concrete):',
      reflectionHeading: '2. Reflecția Personală a Asistentului / Ghidului:',
      aiHeading: '3. Evaluare Pedagogică & Validare Obiectivitate (Gemini AI):',
      coreTitle: '1. Titlul Prezentării:',
      subjectDomain: 'Domeniu de activitate:',
      ageGroup: 'Grupa de vârstă:',
      duration: 'Timpul alocat:',
      materials: 'Material necesar pentru prezentare:',
      poi: 'Punct de interes:',
      directAim: 'Obiectiv direct (Direct Aim):',
      indirectAim: 'Obiectiv indirect (Indirect Aim):',
      procedureHeading: 'Desfășurare lecție (Pași de prezentare):',
      followUpHeading: 'Propuneri de activități de urmare (Follow-up work):',
      crossCurricularHeading: 'Propuneri de follow-up transdisciplinar:',
      principlesTitle: '1. Principiile de Bază ale Asistentului Montessori:',
      obsSectionTitle: '2. Situația Observațiilor Înregistrate:',
      lessonSectionTitle: '3. Prezentări Planificate:',
    },
    fr: {
      obsTitle: "RAPPORT D'OBSERVATION MONTESSORI",
      obsSub: 'Protocole quotidien d’Observation Pratique (basé sur les principes du modèle éducatif Montessori)',
      lessonTitle: 'PLAN DE PRÉSENTATION MONTESSORI',
      lessonSub: 'Planificateur de présentations (basé sur les principes du modèle éducatif Montessori)',
      weeklyTitle: 'RAPPORT HEBDOMADAIRE ASSISTANT MONTESSORI',
      school: 'Établissement / Classe:',
      date: 'Date:',
      startTime: 'Heure de Début:',
      group: 'Groupe d’Enfants:',
      weather: 'Météo & Ambiance:',
      phase: 'Phase d’Observation:',
      phaseFocus: 'Focus de la Phase Actuelle:',
      notesHeading: '1. Notes Factuelles d’Observation (Intervalles de 5 min / Faits bruts):',
      reflectionHeading: '2. Réflexion Personnelle de l’Assistant / Éducateur:',
      aiHeading: '3. Évaluation Pédagogique & Validation d’Objectivité (Gemini IA):',
      coreTitle: '1. Titre de la Présentation :',
      subjectDomain: 'Domaine d’activité :',
      ageGroup: 'Groupe d’âge :',
      duration: 'Temps alloué :',
      materials: 'Matériel requis pour la présentation :',
      poi: 'Point d’intérêt :',
      directAim: 'Objectif direct (Direct Aim) :',
      indirectAim: 'Objectif indirect (Indirect Aim) :',
      procedureHeading: 'Déroulement de la leçon (Étapes de présentation) :',
      followUpHeading: 'Propositions de travail de suivi (Follow-up work) :',
      crossCurricularHeading: 'Propositions de travail de suivi transdisciplinaire :',
      principlesTitle: '1. Principes Directeurs de l’Assistant Montessori:',
      obsSectionTitle: '2. Récapitulatif des Observations Enregistrées:',
      lessonSectionTitle: '3. Présentations Planifiées :',
    },
    en: {
      obsTitle: 'MONTESSORI OBSERVATION REPORT',
      obsSub: 'Daily Practical Observation Protocol (based on the principles of the Montessori educational model)',
      lessonTitle: 'MONTESSORI PRESENTATION PLAN',
      lessonSub: 'Presentations Planner (based on the principles of the Montessori educational model)',
      weeklyTitle: 'MONTESSORI ASSISTANT WEEKLY REPORT',
      school: 'School / Class:',
      date: 'Date:',
      startTime: 'Start Time:',
      group: 'Class Group:',
      weather: 'Weather / Atmosphere:',
      phase: 'Observation Phase:',
      phaseFocus: 'Current Phase Focus:',
      notesHeading: '1. Objective Observation Notes (5-min intervals / concrete factual data):',
      reflectionHeading: '2. Personal Reflection of the Assistant / Guide:',
      aiHeading: '3. Pedagogical Evaluation & Objectivity Check (Gemini AI):',
      coreTitle: '1. Presentation Title:',
      subjectDomain: 'Area of Activity / Subject:',
      ageGroup: 'Age Group:',
      duration: 'Allocated Time / Duration:',
      materials: 'Required Presentation Materials:',
      poi: 'Point of Interest:',
      directAim: 'Direct Aim:',
      indirectAim: 'Indirect Aim:',
      procedureHeading: 'Lesson Procedure (Presentation Steps):',
      followUpHeading: 'Follow-up Work Proposals:',
      crossCurricularHeading: 'Cross-Curricular Follow-up Proposals:',
      principlesTitle: '1. Core Principles of the Montessori Assistant:',
      obsSectionTitle: '2. Recorded Observation Sessions Summary:',
      lessonSectionTitle: '3. Planned Presentations:',
    },
    de: {
      obsTitle: 'MONTESSORI BEOBACHTUNGSBERICHT',
      obsSub: 'Tägliches praktisches Beobachtungsprotokoll (basierend auf den Prinzipien des Montessori-Bildungsmodells)',
      lessonTitle: 'MONTESSORI DARBIETUNGSPLAN',
      lessonSub: 'Darbietungsplaner (basierend auf den Prinzipien des Montessori-Bildungsmodells)',
      weeklyTitle: 'MONTESSORI-ASSISTENT WOCHENBERICHT',
      school: 'Schule / Gruppe:',
      date: 'Datum:',
      startTime: 'Startzeit:',
      group: 'Gruppe:',
      weather: 'Wetter / Atmosphäre:',
      phase: 'Beobachtungsphase:',
      phaseFocus: 'Schwerpunkt der aktuellen Phase:',
      notesHeading: '1. Objektive Beobachtungsnotizen (5-Minuten-Intervalle / Sachliche Fakten):',
      reflectionHeading: '2. Persönliche Reflexion des Assistenten / Pädagogen:',
      aiHeading: '3. Pädagogische Auswertung & Objektivitätsprüfung (Gemini KI):',
      coreTitle: '1. Titel der Darbietung:',
      subjectDomain: 'Fachbereich:',
      ageGroup: 'Altersgruppe:',
      duration: 'Zeitaufwand:',
      materials: 'Erforderliche Materialien:',
      poi: 'Punkt des Interesses:',
      directAim: 'Direktes Ziel (Direct Aim):',
      indirectAim: 'Indirektes Ziel (Indirect Aim):',
      procedureHeading: 'Ablauf der Darbietung (Präsentationsschritte):',
      followUpHeading: 'Vorschläge für Folgearbeiten (Follow-up work):',
      crossCurricularHeading: 'Fächerübergreifende Folgearbeiten:',
      principlesTitle: '1. Grundhaltungen des Montessori-Assistenten:',
      obsSectionTitle: '2. Erfasste Beobachtungssitzungen:',
      lessonSectionTitle: '3. Geplante Darbietungen:',
    },
  }[lang];

  return (
    <div className="print-modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto print:static print:inset-auto print:p-0 print:bg-white print:overflow-visible print:block print:z-auto">
      <div className="print-modal-card relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden print:static print:max-h-none print:w-full print:max-w-none print:shadow-none print:border-none print:overflow-visible print:block print:rounded-none">
        {/* Modal Toolbar (hidden during window.print()) */}
        <div className="no-print p-4 bg-[#1F3A2B] text-white flex flex-wrap items-center justify-between gap-3 border-b border-[#2E5A44]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#2E5A44] flex items-center justify-center text-[#D4A373]">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold font-serif text-[#D4A373]">
                {tp.title}
              </h2>
              <p className="text-xs text-white/70">
                {tp.subtitle} — {config.name}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Language Switcher inside modal */}
            <LanguageSwitcher
              currentLang={lang}
              onLanguageChange={onLanguageChange}
              variant="header"
              align="left"
            />

            {/* Report Type Selector */}
            <div className="flex bg-[#2E5A44] p-0.5 rounded-lg text-xs font-medium">
              <button
                type="button"
                onClick={() => setReportType('weekly')}
                className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                  reportType === 'weekly'
                    ? 'bg-[#D4A373] text-[#1F3A2B] font-bold shadow-sm'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {tp.weeklyType}
              </button>
              <button
                type="button"
                onClick={() => setReportType('observation')}
                className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                  reportType === 'observation'
                    ? 'bg-[#D4A373] text-[#1F3A2B] font-bold shadow-sm'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {tp.obsType}
              </button>
              <button
                type="button"
                onClick={() => setReportType('lesson')}
                className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                  reportType === 'lesson'
                    ? 'bg-[#D4A373] text-[#1F3A2B] font-bold shadow-sm'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {tp.lessonType}
              </button>
            </div>

            {/* Direct Download PDF Button (jsPDF multi-page export) */}
            <button
              type="button"
              onClick={handleDownloadPdf}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#2E5A44] hover:bg-[#234534] text-white font-bold text-xs rounded-lg shadow border border-[#D4A373]/50 transition-colors cursor-pointer"
              title="Descarcă fișierul PDF oficial complet cu toate paginile"
            >
              <Download className="w-4 h-4 text-[#D4A373]" />
              <span>
                {lang === 'fr'
                  ? 'Télécharger PDF (.pdf)'
                  : lang === 'en'
                  ? 'Download PDF (.pdf)'
                  : lang === 'de'
                  ? 'PDF Herunterladen (.pdf)'
                  : 'Descarcă Fișier PDF (.pdf)'}
              </span>
            </button>

            {/* Browser Print Button (multi-page print preview) */}
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#D4A373] hover:bg-[#c29363] text-[#1F3A2B] font-bold text-xs rounded-lg shadow transition-colors cursor-pointer"
              title="Previzualizare tipărire browser pe toate paginile"
            >
              <Printer className="w-4 h-4" />
              <span>
                {lang === 'fr'
                  ? 'Imprimer (Toutes pages)'
                  : lang === 'en'
                  ? 'Print (All pages)'
                  : lang === 'de'
                  ? 'Drucken (Alle Seiten)'
                  : 'Tipărește (Toate paginile)'}
              </span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Optional selector for specific Observation / Lesson */}
        <div className="no-print bg-[#F4F7F5] px-6 py-2 border-b border-gray-200 flex flex-wrap items-center justify-between text-xs text-gray-700 gap-2">
          {reportType === 'observation' && (
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[#2E5A44]">{tp.chooseObs}</span>
              <select
                value={selectedObsId}
                onChange={(e) => setSelectedObsId(e.target.value)}
                className="bg-white border border-gray-300 rounded px-2 py-1 text-xs text-gray-800"
              >
                {localizedObservations.map((obs) => (
                  <option key={obs.id} value={obs.id}>
                    {obs.date} - {obs.phase.split(':')[0]}
                  </option>
                ))}
              </select>
            </div>
          )}

          {reportType === 'lesson' && (
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[#2E5A44]">{tp.chooseLesson}</span>
              <select
                value={selectedLessonId}
                onChange={(e) => setSelectedLessonId(e.target.value)}
                className="bg-white border border-gray-300 rounded px-2 py-1 text-xs text-gray-800"
              >
                {localizedLessons.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.title} ({l.subject})
                  </option>
                ))}
              </select>
            </div>
          )}

          {reportType === 'weekly' && (
            <span className="text-gray-500 italic">
              {tp.weeklyTip}
            </span>
          )}

          <span className="text-[11px] text-gray-500 hidden sm:inline">
            📄 Toate paginile și secțiunile sunt exportate integral fără limitare
          </span>
        </div>

        {/* Printable Paper Area */}
        <div className="print-modal-scroll flex-1 overflow-y-auto p-6 md:p-10 bg-gray-100 flex justify-center print:static print:overflow-visible print:p-0 print:bg-white print:block">
          <div
            id="printable-report-content"
            className="w-full max-w-[800px] bg-white p-8 md:p-10 shadow-md border border-gray-300 text-gray-900 font-sans print:shadow-none print:border-none print:p-0 print:m-0 print:max-w-none print:w-full print:block"
          >
            {/* Institutional Header Banner */}
            <div className="flex items-center gap-4 p-4 rounded-xl border border-[#2E5A44] bg-[#F4F7F5] mb-6">
              <div className="w-16 h-16 shrink-0 rounded-full border border-[#D4A373] bg-white p-1 overflow-hidden flex items-center justify-center">
                {config.logoUrl ? (
                  <img
                    src={config.logoUrl}
                    alt={config.name || "L'École des Préalpes"}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <SchoolLogo className="w-full h-full" />
                )}
              </div>
              <div className="flex-1">
                <h1 className="text-lg font-bold uppercase tracking-wider text-[#2E5A44] font-serif">
                  {config.name}
                </h1>
                <p className="text-xs italic text-[#4A6B5D] font-medium">
                  {config.subtitle}
                </p>
                <div className="text-[10px] text-gray-600 mt-1 leading-snug">
                  <div>
                    {config.address || (config.contact.includes('|') ? config.contact.split('|')[0].trim() : config.contact)}
                  </div>
                  <div>
                    {config.phone && config.email ? (
                      `Tel: ${config.phone} • Email: ${config.email}`
                    ) : config.contact.includes('|') ? (
                      config.contact.split('|').slice(1).map((s) => s.trim()).join(' • ')
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            {/* REPORT 1: OBSERVATION REPORT */}
            {reportType === 'observation' && selectedObs && (
              <div>
                <div className="mb-4">
                  <h2 className="text-xl font-bold font-serif text-[#2E5A44]">
                    {REPORT_TITLES.obsTitle}
                  </h2>
                  <p className="text-xs text-[#4A6B5D] font-medium">
                    {REPORT_TITLES.obsSub}
                  </p>
                  <div className="w-full h-0.5 bg-[#2E5A44] mt-2 mb-4" />
                </div>

                {/* Metadata Grid */}
                <div className="grid grid-cols-2 gap-2 p-3 bg-[#F4F7F5] border border-[#4A6B5D]/40 rounded-lg text-xs mb-5">
                  <div>
                    <span className="font-bold text-[#2E5A44]">{REPORT_TITLES.school} </span>
                    <span>{config.name}</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#2E5A44]">{REPORT_TITLES.date} </span>
                    <span>{selectedObs.date}</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#2E5A44]">{REPORT_TITLES.startTime} </span>
                    <span>{selectedObs.startTime}</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#2E5A44]">{REPORT_TITLES.group} </span>
                    <span>{selectedObs.groupCount}</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#2E5A44]">{REPORT_TITLES.weather} </span>
                    <span>{selectedObs.weather}</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#2E5A44]">{REPORT_TITLES.phase} </span>
                    <span>{selectedObs.phase.split(':')[0]}</span>
                  </div>
                </div>

                {/* Phase Focus Description */}
                <div className="mb-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#1F3A2B] mb-1">
                    {REPORT_TITLES.phaseFocus}
                  </h3>
                  <p className="text-xs text-gray-700 bg-white p-2.5 rounded border border-gray-200 italic">
                    {selectedObs.phase}
                  </p>
                </div>

                {/* Objective Notes */}
                <div className="mb-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#1F3A2B] mb-1">
                    {REPORT_TITLES.notesHeading}
                  </h3>
                  <div className="p-3 bg-white rounded border border-gray-300 text-xs text-gray-800 whitespace-pre-line leading-relaxed min-h-[140px]">
                    {selectedObs.notes || '—'}
                  </div>
                </div>

                {/* Personal Reflection */}
                <div className="mb-6">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#1F3A2B] mb-1">
                    {REPORT_TITLES.reflectionHeading}
                  </h3>
                  <div className="p-3 bg-[#F4F7F5] rounded border-l-4 border-l-[#D4A373] border-r border-t border-b border-gray-200 text-xs text-gray-800 whitespace-pre-line leading-relaxed min-h-[90px] italic">
                    {selectedObs.reflection || '—'}
                  </div>
                </div>

                {/* AI Analysis section if present */}
                {selectedObs.aiFeedback && (
                  <div className="mb-6">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#2E5A44] mb-1">
                      {REPORT_TITLES.aiHeading}
                    </h3>
                    <div className="p-3 bg-white rounded border border-[#2E5A44]/30 text-xs text-gray-800 whitespace-pre-line leading-relaxed">
                      {selectedObs.aiFeedback}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* REPORT 2: PRESENTATION PLAN */}
            {reportType === 'lesson' && selectedLesson && (
              <div>
                <div className="mb-4">
                  <h2 className="text-xl font-bold font-serif text-[#2E5A44]">
                    {REPORT_TITLES.lessonTitle}
                  </h2>
                  <p className="text-xs text-[#4A6B5D] font-medium">
                    {REPORT_TITLES.lessonSub}
                  </p>
                  <div className="w-full h-0.5 bg-[#2E5A44] mt-2 mb-4" />
                </div>

                {/* Core Presentation Info Table */}
                <div className="border border-[#2E5A44]/40 rounded-lg overflow-hidden text-xs mb-4 print-avoid-break break-inside-avoid">
                  <div className="grid grid-cols-3 bg-[#F4F7F5] border-b border-gray-200 p-2.5">
                    <span className="font-bold text-[#2E5A44]">{REPORT_TITLES.coreTitle}</span>
                    <span className="col-span-2 font-bold text-gray-900 text-sm">
                      {selectedLesson.title}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 border-b border-gray-200 p-2.5">
                    <span className="font-bold text-[#2E5A44]">{REPORT_TITLES.subjectDomain}</span>
                    <span className="col-span-2 text-gray-800 font-medium">
                      {selectedLesson.subject}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 border-b border-gray-200 p-2.5">
                    <span className="font-bold text-[#2E5A44]">{REPORT_TITLES.ageGroup}</span>
                    <span className="col-span-2 text-gray-800 font-medium">
                      {selectedLesson.ageGroup || selectedLesson.level}
                    </span>
                  </div>
                  {selectedLesson.duration && (
                    <div className="grid grid-cols-3 border-b border-gray-200 p-2.5">
                      <span className="font-bold text-[#2E5A44]">{REPORT_TITLES.duration}</span>
                      <span className="col-span-2 text-gray-800">
                        {selectedLesson.duration}
                      </span>
                    </div>
                  )}
                  {selectedLesson.materials && (
                    <div className="grid grid-cols-3 border-b border-gray-200 p-2.5">
                      <span className="font-bold text-[#2E5A44]">{REPORT_TITLES.materials}</span>
                      <span className="col-span-2 text-gray-800">
                        {selectedLesson.materials}
                      </span>
                    </div>
                  )}
                  {selectedLesson.pointOfInterest && (
                    <div className="grid grid-cols-3 p-2.5 bg-[#F4F7F5]">
                      <span className="font-bold text-[#2E5A44]">{REPORT_TITLES.poi}</span>
                      <span className="col-span-2 text-gray-800 italic">
                        {selectedLesson.pointOfInterest}
                      </span>
                    </div>
                  )}
                </div>

                {/* Direct & Indirect Aims */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4 text-xs print-avoid-break break-inside-avoid">
                  <div className="p-3 bg-[#F4F7F5] border-l-4 border-l-[#2E5A44] border-t border-r border-b border-gray-200 rounded">
                    <span className="font-bold text-[#2E5A44] block mb-1">{REPORT_TITLES.directAim}</span>
                    <p className="text-gray-800 leading-relaxed">{selectedLesson.directAim}</p>
                  </div>
                  <div className="p-3 bg-[#F4F7F5] border-l-4 border-l-[#D4A373] border-t border-r border-b border-gray-200 rounded">
                    <span className="font-bold text-[#1F3A2B] block mb-1">{REPORT_TITLES.indirectAim}</span>
                    <p className="text-gray-800 leading-relaxed">{selectedLesson.indirectAim || selectedLesson.indirectAims || '-'}</p>
                  </div>
                </div>

                {/* Lesson Procedure (Bullet Points) */}
                {selectedLesson.procedure && (
                  <div className="mb-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#1F3A2B] mb-2 print-avoid-break">
                      {REPORT_TITLES.procedureHeading}
                    </h3>
                    <div className="p-3 bg-white border border-gray-200 rounded text-xs space-y-2 leading-relaxed text-gray-800">
                      {selectedLesson.procedure.split('\n').map((line, idx) => {
                        const clean = line.replace(/^[•\-\*\d+\.]\s*/, '').trim();
                        if (!clean) return null;
                        return (
                          <div key={idx} className="flex items-start gap-2 print-avoid-break break-inside-avoid">
                            <span className="text-[#2E5A44] font-bold mt-0.5">•</span>
                            <span className="flex-1">{clean}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Follow-up Work & Cross-Curricular Proposals */}
                <div className="mb-5 print-avoid-break break-inside-avoid">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-[#F4F7F5] border-l-4 border-l-[#2E5A44] border-t border-r border-b border-gray-200 rounded">
                      <p className="font-bold text-[#2E5A44] mb-1">{REPORT_TITLES.followUpHeading}</p>
                      <p className="text-gray-800 leading-relaxed">{selectedLesson.followUpWork || selectedLesson.follow1 || '-'}</p>
                    </div>
                    <div className="p-3 bg-[#F4F7F5] border-l-4 border-l-[#D4A373] border-t border-r border-b border-gray-200 rounded">
                      <p className="font-bold text-[#1F3A2B] mb-1">{REPORT_TITLES.crossCurricularHeading}</p>
                      <p className="text-gray-800 leading-relaxed">{selectedLesson.crossCurricular || selectedLesson.follow2 || '-'}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* REPORT 3: WEEKLY SYNTHETIC REPORT */}
            {reportType === 'weekly' && (
              <div>
                <div className="mb-4">
                  <h2 className="text-xl font-bold font-serif text-[#2E5A44]">
                    {REPORT_TITLES.weeklyTitle}
                  </h2>
                  <p className="text-xs text-[#4A6B5D] font-medium">
                    {REPORT_TITLES.date} {new Date().toLocaleDateString(lang === 'fr' ? 'fr-FR' : lang === 'en' ? 'en-US' : lang === 'de' ? 'de-DE' : 'ro-RO')}
                  </p>
                  <div className="w-full h-0.5 bg-[#2E5A44] mt-2 mb-4" />
                </div>

                {/* Core Principles Summary */}
                <div className="mb-5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#1F3A2B] mb-2">
                    {REPORT_TITLES.principlesTitle}
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 bg-white border border-gray-200 rounded">
                      <p className="font-bold text-[#2E5A44] mb-0.5">• {t.hub.checklistTitle}</p>
                      <p className="text-gray-600 text-[11px]">
                        {t.hub.coreRole.slice(0, 100)}...
                      </p>
                    </div>
                    <div className="p-2.5 bg-white border border-gray-200 rounded">
                      <p className="font-bold text-[#2E5A44] mb-0.5">• {t.hub.handsBackTitle}</p>
                      <p className="text-gray-600 text-[11px]">
                        {t.hub.handsBackDesc}
                      </p>
                    </div>
                    <div className="p-2.5 bg-white border border-gray-200 rounded">
                      <p className="font-bold text-[#2E5A44] mb-0.5">• {t.hub.graceTitle}</p>
                      <p className="text-gray-600 text-[11px]">
                        {t.hub.graceDesc}
                      </p>
                    </div>
                    <div className="p-2.5 bg-white border border-gray-200 rounded">
                      <p className="font-bold text-[#2E5A44] mb-0.5">• {t.hub.cycle3hTitle}</p>
                      <p className="text-gray-600 text-[11px]">
                        {t.hub.cycle3hDesc}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Modules Summary Table */}
                <div className="mb-5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#1F3A2B] mb-2">
                    {REPORT_TITLES.obsSectionTitle} ({localizedObservations.length})
                  </h3>
                  <table className="w-full text-xs border border-gray-300">
                    <thead className="bg-[#2E5A44] text-white">
                      <tr>
                        <th className="p-2 text-left">{REPORT_TITLES.date}</th>
                        <th className="p-2 text-left">{REPORT_TITLES.phase}</th>
                        <th className="p-2 text-left">{REPORT_TITLES.group}</th>
                        <th className="p-2 text-left">Notes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {localizedObservations.slice(0, 4).map((obs) => (
                        <tr key={obs.id} className="hover:bg-gray-50">
                          <td className="p-2 font-medium">{obs.date}</td>
                          <td className="p-2 text-gray-700">{obs.phase.split(':')[0]}</td>
                          <td className="p-2 text-gray-600">{obs.groupCount}</td>
                          <td className="p-2 text-gray-600 break-words">
                            {obs.notes}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Lessons Summary Table */}
                <div className="mb-6">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#1F3A2B] mb-2">
                    {REPORT_TITLES.lessonSectionTitle} ({localizedLessons.length})
                  </h3>
                  <table className="w-full text-xs border border-gray-300">
                    <thead className="bg-[#4A6B5D] text-white">
                      <tr>
                        <th className="p-2 text-left">{REPORT_TITLES.coreTitle}</th>
                        <th className="p-2 text-left">{REPORT_TITLES.subjectDomain}</th>
                        <th className="p-2 text-left">{REPORT_TITLES.directAim}</th>
                        <th className="p-2 text-left">{REPORT_TITLES.followUpHeading}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {localizedLessons.slice(0, 4).map((les) => (
                        <tr key={les.id} className="hover:bg-gray-50">
                          <td className="p-2 font-semibold text-gray-900">{les.title}</td>
                          <td className="p-2 text-gray-700">{les.subject} ({les.ageGroup || les.level})</td>
                          <td className="p-2 text-gray-600 break-words">{les.directAim}</td>
                          <td className="p-2 text-gray-600 break-words">{les.followUpWork || les.follow1}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Document Signature & Institutional Footer */}
            <div className="mt-8 pt-4 border-t border-gray-300 flex items-center justify-between text-[11px] text-gray-500">
              <div>
                <span>{tp.signatureAssistant} ___________________</span>
              </div>
              <div className="text-right">
                <span>{tp.signatureGuide} ___________________</span>
              </div>
            </div>
            <p className="text-[10px] text-center text-gray-400 mt-4">
              {config.name} | {tp.officialIssued}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
