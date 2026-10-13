import React, { useState } from 'react';
import { InstitutionConfig } from '../types';
import { Language, UI_TRANSLATIONS } from '../i18n/translations';
import { SchoolLogo } from './SchoolLogo';
import { exportAiResponseToPdf, exportAiConversationToPdf } from '../utils/aiPdfExport';
import {
  Printer,
  FileDown,
  Copy,
  Check,
  X,
  Bot,
  Sparkles,
  HelpCircle,
  FileText
} from 'lucide-react';

export interface AiPrintTarget {
  content: string;
  question?: string;
  timestamp?: string;
  topic?: string;
}

interface PrintAiModalProps {
  isOpen: boolean;
  onClose: () => void;
  institution: InstitutionConfig;
  lang: Language;
  selectedAiMessage?: AiPrintTarget | null;
  allMessages?: Array<{
    role: 'user' | 'assistant';
    content: string;
    timestamp?: string;
  }>;
}

export const PrintAiModal: React.FC<PrintAiModalProps> = ({
  isOpen,
  onClose,
  institution,
  lang,
  selectedAiMessage,
  allMessages = [],
}) => {
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'single' | 'conversation'>(
    selectedAiMessage ? 'single' : 'conversation'
  );

  const t = UI_TRANSLATIONS[lang].ai;

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = () => {
    if (viewMode === 'single' && selectedAiMessage) {
      exportAiResponseToPdf({
        content: selectedAiMessage.content,
        question: selectedAiMessage.question,
        topic: selectedAiMessage.topic,
        timestamp: selectedAiMessage.timestamp,
        lang,
        institution,
      });
    } else if (allMessages.length > 0) {
      exportAiConversationToPdf({
        messages: allMessages,
        lang,
        institution,
      });
    } else if (selectedAiMessage) {
      exportAiResponseToPdf({
        content: selectedAiMessage.content,
        question: selectedAiMessage.question,
        timestamp: selectedAiMessage.timestamp,
        lang,
        institution,
      });
    }
  };

  const handleCopy = () => {
    let textToCopy = '';
    if (viewMode === 'single' && selectedAiMessage) {
      textToCopy = `${selectedAiMessage.question ? `Întrebare: ${selectedAiMessage.question}\n\n` : ''}Răspuns AI:\n${selectedAiMessage.content}`;
    } else {
      textToCopy = allMessages
        .map((m) => `${m.role === 'user' ? 'Asistent' : 'Consilier AI'}: ${m.content}`)
        .join('\n\n---\n\n');
    }

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const hasMultipleMessages = allMessages.length > 1;
  const currentDateFormatted = new Date().toLocaleDateString(
    lang === 'fr' ? 'fr-FR' : lang === 'en' ? 'en-US' : lang === 'de' ? 'de-DE' : 'ro-RO',
    { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden border border-gray-200">
        {/* Modal Toolbar (hidden during window.print) */}
        <div className="no-print p-4 sm:p-5 bg-gradient-to-r from-[#1F3A2B] to-[#2E5A44] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D4A373]/30">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-[#D4A373] shrink-0 border border-white/15">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-white font-serif leading-tight">
                {t.docTitle}
              </h3>
              <p className="text-xs text-white/80">
                {lang === 'fr'
                  ? 'Aperçu avant impression et export PDF haute fidélité'
                  : lang === 'en'
                  ? 'Print preview and high-fidelity PDF export'
                  : lang === 'de'
                  ? 'Druckvorschau und hochpräziser PDF-Export'
                  : 'Previzualizare tipărire și export PDF de înaltă fidelitate'}
              </p>
            </div>
          </div>

          {/* Mode Switcher if both available */}
          {hasMultipleMessages && selectedAiMessage && (
            <div className="flex items-center bg-white/10 p-1 rounded-xl border border-white/20 self-start sm:self-center">
              <button
                type="button"
                onClick={() => setViewMode('single')}
                className={`px-3 py-1 text-xs rounded-lg font-medium transition-colors cursor-pointer ${
                  viewMode === 'single'
                    ? 'bg-white text-[#1F3A2B] font-bold shadow-xs'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {lang === 'fr' ? 'Réponse Sélectionnée' : lang === 'en' ? 'Selected Advice' : lang === 'de' ? 'Ausgewählte Antwort' : 'Răspuns Selectat'}
              </button>
              <button
                type="button"
                onClick={() => setViewMode('conversation')}
                className={`px-3 py-1 text-xs rounded-lg font-medium transition-colors cursor-pointer ${
                  viewMode === 'conversation'
                    ? 'bg-white text-[#1F3A2B] font-bold shadow-xs'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {lang === 'fr' ? 'Toute la Consultation' : lang === 'en' ? 'Full Consultation' : lang === 'de' ? 'Gesamte Beratung' : 'Toată Consultația'}
              </button>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              type="button"
              onClick={handlePrint}
              className="px-3.5 py-2 bg-[#D4A373] hover:bg-[#c29263] text-[#1F3A2B] font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
              title={t.printText}
            >
              <Printer className="w-4 h-4" />
              <span>{t.printText}</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadPdf}
              className="px-3.5 py-2 bg-white/15 hover:bg-white/25 text-white font-bold text-xs rounded-xl border border-white/20 flex items-center gap-1.5 transition-all cursor-pointer"
              title={t.exportPdf}
            >
              <FileDown className="w-4 h-4 text-[#D4A373]" />
              <span>{t.exportPdf}</span>
            </button>

            <button
              type="button"
              onClick={handleCopy}
              className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-xl border border-white/20 transition-all cursor-pointer"
              title={t.copyText}
            >
              {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all cursor-pointer ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Paper Preview */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-gray-100 flex justify-center">
          <div
            id="printable-ai-content"
            className="bg-white w-full max-w-[800px] p-6 sm:p-10 rounded-xl shadow-lg border border-gray-200 text-gray-800 space-y-6"
          >
            {/* Header Banner */}
            <div className="p-5 rounded-2xl bg-[#F4F7F5] border-2 border-[#D4A373] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-white p-1 border border-gray-200 shrink-0 flex items-center justify-center">
                  <SchoolLogo className="w-12 h-12" />
                </div>
                <div>
                  <h1 className="text-base sm:text-lg font-bold text-[#1F3A2B] font-serif uppercase tracking-tight">
                    {institution.name || 'CENTRE MONTESSORI BILINGUE - ÉCOLE ACTIVE'}
                  </h1>
                  <p className="text-xs text-gray-600 font-medium">
                    {institution.subtitle ||
                      (lang === 'fr'
                        ? 'basé sur les principes du modèle éducatif Montessori'
                        : lang === 'en'
                        ? 'based on the principles of the Montessori educational model'
                        : lang === 'de'
                        ? 'basierend auf den Prinzipien des Montessori-Bildungsmodells'
                        : 'bazat pe principiile modelului educațional Montessori')}
                  </p>
                  <p className="text-[11px] text-gray-500 mt-1">
                    {institution.address} {institution.email && `| ${institution.email}`}
                  </p>
                </div>
              </div>

              <div className="text-left sm:text-right shrink-0">
                <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#1F3A2B] text-[#D4A373] border border-[#D4A373]/40">
                  {lang === 'fr'
                    ? 'AVIS PÉDAGOGIQUE OFFICIEL'
                    : lang === 'en'
                    ? 'OFFICIAL PEDAGOGICAL RECORD'
                    : lang === 'de'
                    ? 'OFFIZIELLER PÄDAGOGIK-BERICHT'
                    : 'CONSULTANȚĂ PEDAGOGICĂ OFICIALĂ'}
                </span>
                <p className="text-xs text-gray-600 mt-1.5 font-medium">
                  {currentDateFormatted}
                </p>
              </div>
            </div>

            {/* Title & Metadata ribbon */}
            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-center gap-2 text-[#2E5A44] mb-1">
                <Sparkles className="w-4 h-4 text-[#D4A373]" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  {t.aiRecommendation}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#1F3A2B] font-serif">
                {selectedAiMessage?.topic || t.docTitle}
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                {lang === 'fr'
                  ? 'Basé sur les principes du modèle éducatif Montessori'
                  : lang === 'en'
                  ? 'Based on the principles of the Montessori educational model'
                  : lang === 'de'
                  ? 'Basierend auf den Prinzipien des Montessori-Bildungsmodells'
                  : 'Bazat pe principiile modelului educațional Montessori'}
              </p>
            </div>

            {/* SINGLE ADVICE VIEW */}
            {viewMode === 'single' && selectedAiMessage && (
              <div className="space-y-6">
                {/* Question / Context Box if present */}
                {selectedAiMessage.question && (
                  <div className="p-4 rounded-xl bg-[#F4F7F5] border-l-4 border-[#2E5A44] space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#2E5A44] uppercase tracking-wide">
                      <HelpCircle className="w-3.5 h-3.5 text-[#D4A373]" />
                      <span>
                        {lang === 'fr'
                          ? 'Question / Situation soumise par l’Assistant :'
                          : lang === 'en'
                          ? 'Question / Classroom Challenge submitted by Assistant:'
                          : lang === 'de'
                          ? 'Vom Assistenten gestellte Situation / Frage:'
                          : 'Context / Întrebare adresată de Asistent:'}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700 italic font-medium leading-relaxed">
                      "{selectedAiMessage.question}"
                    </p>
                  </div>
                )}

                {/* AI Advice Content */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-[#1F3A2B] uppercase tracking-wider flex items-center gap-1.5">
                    <Bot className="w-4 h-4 text-[#2E5A44]" />
                    <span>
                      {lang === 'fr'
                        ? 'Recommandation Pédagogique Détaillée :'
                        : lang === 'en'
                        ? 'Detailed Pedagogical Recommendation:'
                        : lang === 'de'
                        ? 'Detaillierte pädagogische Empfehlung:'
                        : 'Recomandare Pedagogică Detaliată :'}
                    </span>
                  </h3>
                  <div className="bg-gray-50/70 p-5 rounded-2xl border border-gray-200 text-xs sm:text-sm leading-relaxed text-gray-800 whitespace-pre-line font-sans">
                    {selectedAiMessage.content}
                  </div>
                </div>
              </div>
            )}

            {/* CONVERSATION VIEW */}
            {viewMode === 'conversation' && (
              <div className="space-y-5">
                <h3 className="text-xs font-bold text-[#1F3A2B] uppercase tracking-wider flex items-center gap-1.5 border-b border-gray-200 pb-2">
                  <FileText className="w-4 h-4 text-[#2E5A44]" />
                  <span>
                    {lang === 'fr'
                      ? 'Historique complet des échanges pédagogiques'
                      : lang === 'en'
                      ? 'Full pedagogical dialogue history'
                      : lang === 'de'
                      ? 'Vollständiger pädagogischer Dialog'
                      : 'Istoricul complet al dialogului pedagogic'}
                  </span>
                </h3>

                <div className="space-y-4">
                  {allMessages.map((msg, idx) => {
                    const isUser = msg.role === 'user';
                    return (
                      <div
                        key={idx}
                        className={`p-4 rounded-xl text-xs sm:text-sm ${
                          isUser
                            ? 'bg-[#F4F7F5] border-l-4 border-[#2E5A44]'
                            : 'bg-white border border-gray-200 shadow-xs'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[11px] font-bold mb-1.5">
                          <span
                            className={
                              isUser ? 'text-[#1F3A2B]' : 'text-[#2E5A44] flex items-center gap-1'
                            }
                          >
                            {!isUser && <Sparkles className="w-3 h-3 text-[#D4A373]" />}
                            {isUser
                              ? (lang === 'fr' ? 'Assistant(e) Montessori' : lang === 'en' ? 'Montessori Assistant' : lang === 'de' ? 'Montessori-Assistent' : 'Asistent Montessori')
                              : (lang === 'fr' ? 'Conseiller IA Montessori' : lang === 'en' ? 'Montessori AI Advisor' : lang === 'de' ? 'Montessori KI-Berater' : 'Consilier AI Montessori')}
                          </span>
                          {msg.timestamp && (
                            <span className="text-gray-400 font-mono text-[10px]">
                              {msg.timestamp}
                            </span>
                          )}
                        </div>
                        <div className="text-gray-800 leading-relaxed whitespace-pre-line">
                          {msg.content}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Validation & Signatures Box */}
            <div className="pt-6 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-8 p-4 bg-[#F4F7F5] rounded-xl border border-gray-200 text-xs">
                <div>
                  <p className="font-bold text-[#1F3A2B] mb-8">
                    {lang === 'fr'
                      ? "Signature de l'Assistant(e) Montessori :"
                      : lang === 'en'
                      ? 'Montessori Assistant Signature:'
                      : lang === 'de'
                      ? 'Unterschrift Montessori-Assistent:'
                      : 'Semnătură Asistent Montessori:'}
                  </p>
                  <div className="border-b border-gray-400 w-full" />
                </div>
                <div>
                  <p className="font-bold text-[#1F3A2B] mb-8">
                    {lang === 'fr'
                      ? 'Validation Guide / Éducateur (basé sur les principes du modèle éducatif Montessori) :'
                      : lang === 'en'
                      ? 'Guide / Educator Validation (based on the principles of the Montessori educational model):'
                      : lang === 'de'
                      ? 'Validierung Leitung (basierend auf den Prinzipien des Montessori-Bildungsmodells):'
                      : 'Validare Ghid / Educator (bazat pe principiile modelului educațional Montessori):'}
                  </p>
                  <div className="border-b border-gray-400 w-full" />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center pt-2">
              <p className="text-[10px] text-gray-500 italic">
                {lang === 'fr'
                  ? 'Document officiel généré par Assistant Montessori - basé sur les principes du modèle éducatif Montessori'
                  : lang === 'en'
                  ? 'Official document generated by Montessori Assistant - based on the principles of the Montessori educational model'
                  : lang === 'de'
                  ? 'Offizielles Dokument generiert durch Montessori Assistent - basierend auf den Prinzipien des Montessori-Bildungsmodells'
                  : 'Document oficial generat de Asistent Montessori - bazat pe principiile modelului educațional Montessori'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
