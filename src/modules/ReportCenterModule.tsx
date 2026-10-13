import React, { useState } from 'react';
import { InstitutionConfig, LessonPlan, ObservationSession } from '../types';
import { Language, UI_TRANSLATIONS } from '../i18n/translations';
import {
  Printer,
  Download,
  Upload,
  CheckCircle2,
  Calendar,
  Eye,
  BookOpen,
  Mic,
  Sparkles
} from 'lucide-react';

interface ReportCenterModuleProps {
  institution: InstitutionConfig;
  observations: ObservationSession[];
  lessonPlans: LessonPlan[];
  onOpenPrint: () => void;
  onOpenManual?: () => void;
  onOpenVoiceStudio?: () => void;
  onImportData: (data: { observations: ObservationSession[]; lessonPlans: LessonPlan[] }) => void;
  lang: Language;
}

export const ReportCenterModule: React.FC<ReportCenterModuleProps> = ({
  institution,
  observations,
  lessonPlans,
  onOpenPrint,
  onOpenManual,
  onOpenVoiceStudio,
  onImportData,
  lang,
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const t = UI_TRANSLATIONS[lang].reports;

  const handleExportJson = () => {
    const data = {
      institution,
      observations,
      lessonPlans,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Assistant_Montessori_Backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (parsed.observations || parsed.lessonPlans) {
            onImportData({
              observations: parsed.observations || [],
              lessonPlans: parsed.lessonPlans || [],
            });
            alert('Backup restored successfully!');
          }
        } catch (err) {
          alert('Invalid JSON file.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#2E5A44] text-white flex items-center justify-center shrink-0">
            <Printer className="w-6 h-6 text-[#D4A373]" />
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

        <p className="text-xs text-gray-700 bg-[#F4F7F5] p-3.5 rounded-xl border border-[#2E5A44]/20 leading-relaxed">
          {t.intro}
        </p>
      </div>

      {/* 3 Report Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Observation Report */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#F4F7F5] text-[#2E5A44] flex items-center justify-center">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#1F3A2B] font-serif">
              {t.obsReportTitle}
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              {t.obsReportDesc}
            </p>
            <div className="text-[11px] text-gray-500 font-mono">
              Total: {observations.length}
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenPrint}
            className="w-full py-2.5 bg-[#2E5A44] hover:bg-[#1F3A2B] text-white font-bold text-xs rounded-xl shadow flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4 text-[#D4A373]" /> {t.openPrintPdf}
          </button>
        </div>

        {/* Card 2: Lesson Plan */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#F4F7F5] text-[#2E5A44] flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#1F3A2B] font-serif">
              {t.lessonReportTitle}
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              {t.lessonReportDesc}
            </p>
            <div className="text-[11px] text-gray-500 font-mono">
              Total: {lessonPlans.length}
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenPrint}
            className="w-full py-2.5 bg-[#2E5A44] hover:bg-[#1F3A2B] text-white font-bold text-xs rounded-xl shadow flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4 text-[#D4A373]" /> {t.openPrintPdf}
          </button>
        </div>

        {/* Card 3: Weekly Synthetic Report */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#F4F7F5] text-[#2E5A44] flex items-center justify-center">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#1F3A2B] font-serif">
              {t.weeklyReportTitle}
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              {t.weeklyReportDesc}
            </p>
            <div className="text-[11px] text-gray-500 font-mono">
              {new Date().toLocaleDateString(lang === 'fr' ? 'fr-FR' : lang === 'en' ? 'en-US' : lang === 'de' ? 'de-DE' : 'ro-RO')}
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenPrint}
            className="w-full py-2.5 bg-[#D4A373] hover:bg-[#c29363] text-[#1F3A2B] font-bold text-xs rounded-xl shadow flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" /> {t.openPrintPdf}
          </button>
        </div>
      </div>

      {/* Voice Dictation & Speech-to-Text Studio Card */}
      {onOpenVoiceStudio && (
        <div className="bg-gradient-to-r from-[#2E5A44] via-[#1F3A2B] to-[#2E5A44] p-5 sm:p-6 rounded-2xl text-white shadow-md border-2 border-[#D4A373] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 border border-[#D4A373] flex items-center justify-center text-[#D4A373] shrink-0">
              <Mic className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold font-serif uppercase tracking-wide text-white">
                  {lang === 'fr'
                    ? 'Dictée Vocale & Transcription PDF (Speech-to-Text)'
                    : lang === 'de'
                    ? 'Spracheingabe & PDF-Transkription (Speech-to-Text)'
                    : lang === 'en'
                    ? 'Voice Dictation & PDF Transcript (Speech-to-Text)'
                    : 'Dictare Vocală & Transcriere PDF (Speech-to-Text)'}
                </h3>
              </div>
              <p className="text-xs text-[#E7C9A9] mt-1 leading-relaxed">
                {lang === 'fr'
                  ? 'Parlez directement à l’application : transcription en temps réel de vos observations, édition immédiate et génération de PDF / impression A4.'
                  : lang === 'de'
                  ? 'Sprechen Sie frei in Ihr Mikrofon: automatische Echtzeit-Transkription, Bearbeitung und direkter PDF-Druck.'
                  : lang === 'en'
                  ? 'Speak directly into the app: real-time live transcription, effortless editing, and direct PDF export / A4 printing.'
                  : 'Vorbiți direct la aplicație: transcriere automată în timp real, editare instantanee și generare directă de PDF sau printare A4.'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenVoiceStudio}
            className="shrink-0 px-5 py-2.5 bg-[#D4A373] hover:bg-[#c39161] text-[#1F3A2B] font-bold text-xs rounded-xl shadow-md flex items-center gap-2 transition-all cursor-pointer"
          >
            <Mic className="w-4 h-4" />
            <span>
              {lang === 'fr'
                ? 'Ouvrir Studio Dictée Vocale'
                : lang === 'de'
                ? 'Spracheingabe-Studio Öffnen'
                : lang === 'en'
                ? 'Open Voice Dictation Studio'
                : 'Deschide Studio Dictare Vocală'}
            </span>
          </button>
        </div>
      )}

      {/* Official User Manual & Installation Guide Card */}
      {onOpenManual && (
        <div className="bg-gradient-to-r from-[#1F3A2B] to-[#2E5A44] p-5 sm:p-6 rounded-2xl text-white shadow-md border-2 border-[#D4A373] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 border border-[#D4A373] flex items-center justify-center text-[#D4A373] shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold font-serif uppercase tracking-wide text-white">
                {lang === 'fr'
                  ? "Manuel d'Utilisation & Guide d'Installation"
                  : lang === 'de'
                  ? 'Benutzerhandbuch & Installationsanleitung'
                  : lang === 'en'
                  ? 'User Manual & Installation Guide'
                  : 'Manual de Utilizare & Ghid de Instalare'}
              </h3>
              <p className="text-xs text-[#E7C9A9] mt-1 leading-relaxed">
                {lang === 'fr'
                  ? 'Documentation pédagogique complète (basée sur les principes du modèle éducatif Montessori) et étapes d’installation PWA sur Android, iOS et Desktop.'
                  : lang === 'de'
                  ? 'Vollständige pädagogische Dokumentation (basierend auf den Prinzipien des Montessori-Bildungsmodells) und Installationsschritte auf allen Geräten.'
                  : lang === 'en'
                  ? 'Complete pedagogical documentation (based on the principles of the Montessori educational model) and device installation steps for Android, iOS, and PC.'
                  : 'Documentație pedagogică completă (bazat pe principiile modelului educațional Montessori) și pași de instalare pe telefoane Android, iPhone/iPad și Desktop.'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenManual}
            className="shrink-0 px-5 py-2.5 bg-[#D4A373] hover:bg-[#c39161] text-[#1F3A2B] font-bold text-xs rounded-xl shadow-md flex items-center gap-2 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>
              {lang === 'fr'
                ? 'Ouvrir / Télécharger PDF'
                : lang === 'de'
                ? 'Öffnen / PDF Herunterladen'
                : lang === 'en'
                ? 'Open / Download PDF'
                : 'Deschide / Descarcă PDF'}
            </span>
          </button>
        </div>
      )}

      {/* Data Backup & Restore Panel */}
      <div className="bg-[#F4F7F5] p-6 rounded-2xl border border-gray-200 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-[#1F3A2B]">
              {t.backupTitle}
            </h3>
            <p className="text-xs text-gray-600">
              {t.backupDesc}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleExportJson}
              className="px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 rounded-xl text-xs font-semibold text-gray-800 flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#2E5A44]" /> {t.exportBackupJson}
            </button>

            <label className="px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 rounded-xl text-xs font-semibold text-gray-800 flex items-center gap-1.5 shadow-xs cursor-pointer">
              <Upload className="w-3.5 h-3.5 text-[#D4A373]" /> {t.restoreBackup}
              <input
                type="file"
                accept=".json"
                onChange={handleImportJson}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {downloadSuccess && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            {t.backupSuccess}
          </div>
        )}
      </div>
    </div>
  );
};
