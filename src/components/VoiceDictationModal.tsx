import React, { useState, useRef, useEffect } from 'react';
import {
  Mic,
  MicOff,
  Printer,
  Download,
  Copy,
  Check,
  RotateCcw,
  X,
  FileText,
  Volume2,
  Sparkles,
  Info,
  Loader2,
  Activity,
  AlertCircle,
  ExternalLink,
  Upload
} from 'lucide-react';
import { Language } from '../i18n/translations';
import { InstitutionConfig } from '../types';
import { useSpeechToText } from '../hooks/useSpeechToText';
import { exportVoiceNoteToPdf } from '../utils/voicePdfExport';

interface VoiceDictationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  onLanguageChange?: (lang: Language) => void;
  institution?: InstitutionConfig;
  onInsertToActiveField?: (text: string) => void;
}

export const VoiceDictationModal: React.FC<VoiceDictationModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  institution,
  onInsertToActiveField,
}) => {
  const [selectedLang, setSelectedLang] = useState<Language>(currentLang);
  const [transcriptText, setTranscriptText] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [docTitle, setDocTitle] = useState<string>('');
  const [dismissError, setDismissError] = useState<boolean>(false);
  const [isUploadingAudio, setIsUploadingAudio] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    isListening,
    isRecordingAudio,
    isTranscribing,
    transcript,
    interimTranscript,
    isSupported,
    errorMessage,
    audioLevel,
    durationSeconds,
    startListening,
    stopListening,
  } = useSpeechToText({
    lang: selectedLang,
    continuous: true,
    interimResults: true,
    onResult: (finalSegment, isFinal, fullSessionTranscript) => {
      if (isFinal) {
        const textToSet = (fullSessionTranscript || finalSegment).trim();
        if (textToSet) {
          setTranscriptText(textToSet);
        }
      }
    },
  });

  // Keep transcriptText synchronized whenever transcript changes from Web Speech or Gemini AI
  useEffect(() => {
    if (transcript && transcript.trim()) {
      setTranscriptText(transcript.trim());
    }
  }, [transcript]);

  if (!isOpen) return null;

  const t = {
    ro: {
      modalTitle: 'Studio de Dictare Vocală (Speech-to-Text)',
      modalSubtitle: 'Transcrie vorbirea în timp real, editează și exportă sau printează fișa PDF',
      activeLang: 'Limba de dictare :',
      startBtn: 'Începe Dictarea Vocală',
      stopBtn: 'Oprește Înregistrarea & Finalizează',
      listeningBadge: 'Microfon Activ — Vorbiți acum...',
      idleBadge: 'Microfon în așteptare',
      titlePlaceholder: 'Titlu notă (ex: Observație Matematică - Mărgele de Aur)',
      textPlaceholder: 'Ceea ce rostiți la microfon va fi transcris aici...\n\nPuteți vorbi liber în limba selectată. La final, apăsați „Oprește Înregistrarea” pentru a genera textul complet structurat.',
      wordsCount: 'Cuvinte',
      charCount: 'Caractere',
      copyBtn: 'Copiază textul',
      copiedToast: 'Text copiat în clipboard!',
      printBtn: 'Printează A4',
      exportPdfBtn: 'Exportă PDF (.pdf)',
      clearBtn: 'Șterge textul',
      closeBtn: 'Închide',
      insertBtn: 'Inserează în formularul curent',
      notSupportedMsg: 'Recunoașterea vocală necesită acces la microfon. Vă recomandăm Google Chrome, Microsoft Edge sau Safari.',
      quickPhrases: 'Adăugare rapidă semne & termeni Montessori:',
      comma: 'Virgulă',
      period: 'Punct',
      newLine: 'Rând nou',
      duration: 'Durată',
      micLevel: 'Nivel semnal voce',
      transcribingBadge: 'Procesare & Transcriere inteligentă audio...',
      uploadAudioBtn: 'Încarcă Înregistrare Audio',
      openFullTabBtn: 'Deschide în filă dedicată (Full Tab)',
      uploadingAudioMsg: 'Se procesează fișierul audio cu AI...',
    },
    fr: {
      modalTitle: 'Studio de Dictée Vocale (Speech-to-Text)',
      modalSubtitle: 'Transcrivez la voix en temps réel, éditez et imprimez ou exportez en PDF',
      activeLang: 'Langue de dictée :',
      startBtn: 'Démarrer la dictée vocale',
      stopBtn: "Arrêter l'enregistrement & Finaliser",
      listeningBadge: 'Microphone actif — Parlez maintenant...',
      idleBadge: 'Microphone en veille',
      titlePlaceholder: "Titre de la note (ex: Observation Perles Dorées)",
      textPlaceholder: 'Ce que vous énoncez au micro apparaîtra ici...\n\nParlez avec fluidité dans la langue choisie. Cliquez sur « Arrêter l’enregistrement » pour finaliser la transcription.',
      wordsCount: 'Mots',
      charCount: 'Caractères',
      copyBtn: 'Copier le texte',
      copiedToast: 'Texte copié dans le presse-papiers !',
      printBtn: 'Imprimer A4',
      exportPdfBtn: 'Exporter PDF (.pdf)',
      clearBtn: 'Effacer le texte',
      closeBtn: 'Fermer',
      insertBtn: 'Insérer dans le formulaire',
      notSupportedMsg: 'La reconnaissance vocale nécessite l’accès au microphone. Utilisez Google Chrome, Safari ou Edge.',
      quickPhrases: 'Ponctuation rapide & termes Montessori :',
      comma: 'Virgule',
      period: 'Point',
      newLine: 'À la ligne',
      duration: 'Durée',
      micLevel: 'Signal vocal',
      transcribingBadge: 'Traitement & transcription intelligente...',
      uploadAudioBtn: 'Importer un fichier audio',
      openFullTabBtn: 'Ouvrir dans un onglet dédié',
      uploadingAudioMsg: 'Traitement du fichier audio avec l’IA...',
    },
    en: {
      modalTitle: 'Voice Dictation Studio (Speech-to-Text)',
      modalSubtitle: 'Real-time speech transcription, instant editing, PDF printing & exporting',
      activeLang: 'Dictation language:',
      startBtn: 'Start Voice Dictation',
      stopBtn: 'Stop Recording & Finalize',
      listeningBadge: 'Microphone Live — Speak now...',
      idleBadge: 'Microphone idle',
      titlePlaceholder: 'Note title (e.g. Golden Beads Observation)',
      textPlaceholder: 'Whatever you say into the microphone will be transcribed here...\n\nSpeak naturally in the chosen language. Click "Stop Recording" to finalize the transcript.',
      wordsCount: 'Words',
      charCount: 'Characters',
      copyBtn: 'Copy Text',
      copiedToast: 'Copied to clipboard!',
      printBtn: 'Print A4',
      exportPdfBtn: 'Export PDF (.pdf)',
      clearBtn: 'Clear Text',
      closeBtn: 'Close',
      insertBtn: 'Insert into active form',
      notSupportedMsg: 'Speech recognition requires microphone permissions. Please use Chrome, Safari, or Edge.',
      quickPhrases: 'Quick punctuation & Montessori terms:',
      comma: 'Comma',
      period: 'Period',
      newLine: 'New line',
      duration: 'Duration',
      micLevel: 'Voice level',
      transcribingBadge: 'AI Speech Processing & Transcription...',
      uploadAudioBtn: 'Upload Audio File',
      openFullTabBtn: 'Open in Dedicated Tab',
      uploadingAudioMsg: 'Processing audio file with AI...',
    },
    de: {
      modalTitle: 'Spracheingabe-Studio (Speech-to-Text)',
      modalSubtitle: 'Echtzeit-Spracherkennung, Textbearbeitung und direkter PDF-Export / Druck',
      activeLang: 'Sprache für Diktat:',
      startBtn: 'Spracheingabe Starten',
      stopBtn: 'Aufnahme Beenden & Fertigstellen',
      listeningBadge: 'Mikrofon Aktiv — Sprechen Sie...',
      idleBadge: 'Mikrofon bereit',
      titlePlaceholder: 'Titel (z.B. Beobachtung Goldene Perlen)',
      textPlaceholder: 'Ihre gesprochenen Worte werden hier transkribiert...\n\nSprechen Sie frei in der gewählten Sprache. Klicken Sie auf „Aufnahme Beenden“, um das Diktat zu finalisieren.',
      wordsCount: 'Wörter',
      charCount: 'Zeichen',
      copyBtn: 'Text kopieren',
      copiedToast: 'In die Zwischenablage kopiert!',
      printBtn: 'Drucken (A4)',
      exportPdfBtn: 'PDF Exportieren (.pdf)',
      clearBtn: 'Text löschen',
      closeBtn: 'Schließen',
      insertBtn: 'In Formular einfügen',
      notSupportedMsg: 'Spracherkennung erfordert Mikrofonzugriff. Bitte Chrome, Edge oder Safari verwenden.',
      quickPhrases: 'Satzzeichen & Montessori-Begriffe:',
      comma: 'Komma',
      period: 'Punkt',
      newLine: 'Neue Zeile',
      duration: 'Dauer',
      micLevel: 'Pegel',
      transcribingBadge: 'KI-Sprachverarbeitung läuft...',
      uploadAudioBtn: 'Audiodatei hochladen',
      openFullTabBtn: 'In eigenem Tab öffnen',
      uploadingAudioMsg: 'Audiodatei wird mit KI verarbeitet...',
    },
  }[selectedLang];

  const handleAudioFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploadingAudio(true);
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const base64Data = (reader.result as string).split(',')[1];
          const response = await fetch('/api/transcribe-audio', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              audioBase64: base64Data,
              mimeType: file.type || 'audio/webm',
              lang: selectedLang,
            }),
          });
          const data = await response.json();
          if (data.transcript) {
            const clean = data.transcript.trim();
            setTranscriptText((prev) => (prev ? `${prev}\n\n${clean}` : clean));
            setDismissError(true);
          }
        } catch (err) {
          console.error('Audio upload transcription error:', err);
        } finally {
          setIsUploadingAudio(false);
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error('File read error:', err);
      setIsUploadingAudio(false);
    }
  };

  const handleCopy = () => {
    if (!transcriptText.trim()) return;
    navigator.clipboard.writeText(transcriptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportPdf = () => {
    exportVoiceNoteToPdf({
      title: docTitle.trim() || t.modalTitle,
      transcript: transcriptText,
      lang: selectedLang,
      institution,
    });
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const wordCount = transcriptText.trim() ? transcriptText.trim().split(/\s+/).length : 0;
  const charCount = transcriptText.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs overflow-y-auto">
      {/* Hidden file input for uploading audio recordings */}
      <input
        type="file"
        ref={fileInputRef}
        accept="audio/*,.mp3,.m4a,.wav,.webm,.ogg"
        onChange={handleAudioFileUpload}
        className="hidden"
      />

      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col max-h-[92vh] my-auto">
        {/* Header */}
        <div className="bg-[#1F3A2B] text-white p-5 sm:p-6 flex items-start justify-between relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-64 bg-radial from-white/10 to-transparent pointer-events-none" />

          <div className="flex items-center gap-3.5 z-10">
            <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-[#D4A373] shadow-inner">
              <Mic className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold font-serif tracking-wide text-white">
                  {t.modalTitle}
                </h2>
                <span className="text-[10px] uppercase font-bold tracking-wider bg-[#D4A373] text-[#1F3A2B] px-2 py-0.5 rounded-full">
                  Speech-to-Text
                </span>
              </div>
              <p className="text-xs text-white/80 mt-0.5">
                {t.modalSubtitle}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="z-10 text-white/70 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Controls bar: Language switcher + Mic status + Duration */}
        <div className="bg-[#FAF7F2] border-b border-gray-200 px-5 py-3.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-700">{t.activeLang}</span>
            <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-gray-200 shadow-xs">
              {[
                { code: 'ro' as Language, label: 'Română', flag: '🇷🇴' },
                { code: 'fr' as Language, label: 'Français', flag: '🇫🇷' },
                { code: 'en' as Language, label: 'English', flag: '🇬🇧' },
                { code: 'de' as Language, label: 'Deutsch', flag: '🇩🇪' },
              ].map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => setSelectedLang(l.code)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                    selectedLang === l.code
                      ? 'bg-[#2E5A44] text-white shadow-xs'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span>{l.flag}</span>
                  <span>{l.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isListening ? (
              <div className="flex items-center gap-2 px-3 py-1 bg-red-50 border border-red-200 rounded-full text-red-700 text-xs font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
                <span>{t.listeningBadge}</span>
                <span className="font-mono bg-red-100 px-1.5 py-0.5 rounded text-[11px] text-red-800">
                  {formatDuration(durationSeconds)}
                </span>
              </div>
            ) : isTranscribing || isUploadingAudio ? (
              <div className="flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-300 rounded-full text-amber-800 text-xs font-semibold animate-pulse">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-700" />
                <span>{isUploadingAudio ? t.uploadingAudioMsg : t.transcribingBadge}</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-100 border border-gray-200 rounded-full text-gray-600 text-xs font-medium">
                <Volume2 className="w-3.5 h-3.5 text-gray-400" />
                <span>{t.idleBadge}</span>
              </div>
            )}
          </div>
        </div>

        {/* Browser support warning */}
        {!isSupported && (
          <div className="p-3 bg-amber-50 border-b border-amber-200 text-amber-900 text-xs flex items-center gap-2">
            <Info className="w-4 h-4 shrink-0 text-amber-700" />
            <span>{t.notSupportedMsg}</span>
          </div>
        )}

        {/* Error message banner with dismiss button, Open in Dedicated Tab & Upload Audio actions */}
        {errorMessage && !dismissError && (
          <div className="p-3 bg-amber-50 border-b border-amber-300 text-amber-900 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <AlertCircle className="w-4 h-4 shrink-0 text-amber-700" />
              <span className="font-medium">{errorMessage}</span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href={window.location.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#2E5A44] hover:bg-[#1F3A2B] text-white rounded-lg font-bold text-xs shadow-xs cursor-pointer no-underline transition-colors"
                title="Deschide aplicația direct într-o filă nouă a browserului pentru acces 100% neîngrădit la microfon"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#D4A373]" />
                <span>{t.openFullTabBtn}</span>
              </a>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 rounded-lg font-bold text-xs shadow-xs cursor-pointer transition-colors"
                title="Încarcă o înregistrare vocală (.mp3, .m4a, .wav) de pe telefon sau calculator"
              >
                <Upload className="w-3.5 h-3.5 text-amber-800" />
                <span>{t.uploadAudioBtn}</span>
              </button>

              <button
                type="button"
                onClick={() => setDismissError(true)}
                className="p-1.5 text-amber-800 hover:text-black rounded hover:bg-amber-100 cursor-pointer"
                title="Închide mesajul"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Main Body */}
        <div className="p-5 sm:p-6 space-y-4 flex-1 overflow-y-auto">
          {/* Document Title input */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              {selectedLang === 'fr'
                ? 'Titre du rapport dicté (pour PDF et impression) :'
                : selectedLang === 'de'
                ? 'Titel des Berichts :'
                : selectedLang === 'en'
                ? 'Dictation Report Title :'
                : 'Titlul raportului dictat (pentru PDF și printare) :'}
            </label>
            <input
              type="text"
              value={docTitle}
              onChange={(e) => setDocTitle(e.target.value)}
              placeholder={t.titlePlaceholder}
              className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-gray-800 focus:bg-white focus:ring-1 focus:ring-[#2E5A44] focus:outline-none"
            />
          </div>

          {/* Big Recording Action Banner */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#F4F7F5] via-[#FAF7F2] to-[#F4F7F5] border border-[#2E5A44]/20 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
            <div className="flex items-center gap-3.5">
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                  isListening
                    ? 'bg-red-500 text-white shadow-lg ring-4 ring-red-200 animate-pulse'
                    : isTranscribing || isUploadingAudio
                    ? 'bg-amber-500 text-white shadow-lg ring-4 ring-amber-200'
                    : 'bg-[#2E5A44] text-white shadow'
                }`}
              >
                {isTranscribing || isUploadingAudio ? (
                  <Loader2 className="w-7 h-7 animate-spin" />
                ) : isListening ? (
                  <Mic className="w-7 h-7 animate-bounce" />
                ) : (
                  <Mic className="w-7 h-7 text-[#D4A373]" />
                )}
              </div>

              <div>
                <h4 className="text-sm font-bold text-[#1F3A2B] flex items-center gap-2">
                  <span>
                    {isListening
                      ? t.listeningBadge
                      : isUploadingAudio
                      ? t.uploadingAudioMsg
                      : isTranscribing
                      ? t.transcribingBadge
                      : t.startBtn}
                  </span>
                </h4>
                <p className="text-xs text-gray-500">
                  {selectedLang === 'fr'
                    ? 'Cliquez pour dicter vos observations, comptes-rendus ou préparations.'
                    : selectedLang === 'de'
                    ? 'Klicken Sie hier, um Beobachtungen oder Pläne frei einzusprechen.'
                    : selectedLang === 'en'
                    ? 'Click to speak observations, reflections, or lesson details.'
                    : 'Apasă pentru a vorbi liber observații, reflecții sau pregătirea materialelor.'}
                </p>

                {/* Live audio frequency indicator */}
                {isListening && (
                  <div className="mt-2 flex items-center gap-2">
                    <Activity className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                    <span className="text-[11px] text-gray-600 font-medium">{t.micLevel}:</span>
                    <div className="flex items-end gap-1 h-3.5 bg-gray-200/80 px-1 py-0.5 rounded-sm">
                      {[0.2, 0.4, 0.6, 0.8, 1.0].map((threshold, idx) => {
                        const active = (audioLevel / 100) >= (threshold * 0.4);
                        return (
                          <span
                            key={idx}
                            style={{ height: `${(idx + 1) * 20}%` }}
                            className={`w-1 rounded-xs transition-all ${
                              active ? 'bg-red-500 shadow-xs' : 'bg-gray-300'
                            }`}
                          />
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* File upload button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isListening || isTranscribing || isUploadingAudio}
                className="px-3.5 py-2.5 bg-white hover:bg-gray-100 disabled:opacity-40 border border-gray-300 text-gray-700 font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Încarcă o înregistrare vocală (.mp3, .m4a, .wav, .webm)"
              >
                <Upload className="w-4 h-4 text-[#2E5A44]" />
                <span className="hidden sm:inline">{t.uploadAudioBtn}</span>
                <span className="sm:hidden">Fișier</span>
              </button>

              {isTranscribing || isUploadingAudio ? (
                <div className="px-5 py-2.5 bg-amber-500 text-white text-xs font-bold rounded-xl shadow flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{isUploadingAudio ? 'Procesare...' : t.transcribingBadge}</span>
                </div>
              ) : isListening ? (
                <button
                  type="button"
                  onClick={stopListening}
                  className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-2 transition-all cursor-pointer ring-2 ring-red-300 ring-offset-1"
                >
                  <MicOff className="w-4 h-4" />
                  <span>{t.stopBtn}</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setDismissError(false);
                    startListening();
                  }}
                  className="px-5 py-2.5 bg-[#2E5A44] hover:bg-[#1F3A2B] text-white text-xs font-bold rounded-xl shadow flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Mic className="w-4 h-4 text-[#D4A373]" />
                  <span>{t.startBtn}</span>
                </button>
              )}
            </div>
          </div>

          {/* Quick Punctuation & Phrases */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-gray-600">
            <span className="text-[11px] font-bold text-[#2E5A44] flex items-center gap-1 mr-1">
              <Sparkles className="w-3.5 h-3.5 text-[#D4A373]" /> {t.quickPhrases}
            </span>
            <button
              type="button"
              onClick={() => setTranscriptText((prev) => (prev ? `${prev}, ` : ''))}
              className="px-2 py-0.5 rounded-md bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-700 text-[11px] font-semibold cursor-pointer"
            >
              , {t.comma}
            </button>
            <button
              type="button"
              onClick={() => setTranscriptText((prev) => (prev ? `${prev}. ` : ''))}
              className="px-2 py-0.5 rounded-md bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-700 text-[11px] font-semibold cursor-pointer"
            >
              . {t.period}
            </button>
            <button
              type="button"
              onClick={() => setTranscriptText((prev) => (prev ? `${prev}\n\n` : ''))}
              className="px-2 py-0.5 rounded-md bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-700 text-[11px] font-semibold cursor-pointer"
            >
              ↵ {t.newLine}
            </button>
            <button
              type="button"
              onClick={() =>
                setTranscriptText((prev) =>
                  prev ? `${prev} „Normalizare” ` : '„Normalizare” '
                )
              }
              className="px-2 py-0.5 rounded-md bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-[11px] font-medium cursor-pointer"
            >
              Normalisation
            </button>
            <button
              type="button"
              onClick={() =>
                setTranscriptText((prev) =>
                  prev ? `${prev} „Controlul erorii” ` : '„Controlul erorii” '
                )
              }
              className="px-2 py-0.5 rounded-md bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-[11px] font-medium cursor-pointer"
            >
              Contrôle de l'erreur
            </button>
            <button
              type="button"
              onClick={() =>
                setTranscriptText((prev) =>
                  prev ? `${prev} „Perioadă senzitivă” ` : '„Perioadă senzitivă” '
                )
              }
              className="px-2 py-0.5 rounded-md bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-[11px] font-medium cursor-pointer"
            >
              Période sensible
            </button>
          </div>

          {/* Live Textarea */}
          <div className="relative">
            <textarea
              rows={9}
              value={transcriptText}
              onChange={(e) => setTranscriptText(e.target.value)}
              placeholder={t.textPlaceholder}
              className="w-full bg-[#FAF7F2] border border-gray-300 rounded-xl p-4 text-xs sm:text-sm leading-relaxed text-gray-900 focus:bg-white focus:border-[#2E5A44] focus:ring-1 focus:ring-[#2E5A44] focus:outline-none font-sans shadow-inner"
            />

            {/* Live interim display overlay if currently listening */}
            {isListening && interimTranscript && (
              <div className="mt-1 p-2 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping shrink-0" />
                <span className="italic">🎙️ {interimTranscript}</span>
              </div>
            )}
          </div>

          {/* Stats Bar */}
          <div className="flex items-center justify-between text-xs text-gray-500 px-1">
            <div className="flex items-center gap-3">
              <span>
                <strong>{wordCount}</strong> {t.wordsCount}
              </span>
              <span>•</span>
              <span>
                <strong>{charCount}</strong> {t.charCount}
              </span>
            </div>

            {transcriptText && (
              <button
                type="button"
                onClick={() => setTranscriptText('')}
                className="text-gray-400 hover:text-red-600 flex items-center gap-1 text-[11px] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>{t.clearBtn}</span>
              </button>
            )}
          </div>
        </div>

        {/* Footer Actions: Print, PDF Export, Copy, Insert */}
        <div className="bg-gray-50 border-t border-gray-200 px-5 py-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              disabled={!transcriptText.trim()}
              className="px-3.5 py-2 bg-white hover:bg-gray-100 disabled:opacity-40 border border-gray-300 text-gray-700 font-semibold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? t.copiedToast : t.copyBtn}</span>
            </button>

            {onInsertToActiveField && (
              <button
                type="button"
                onClick={() => {
                  if (transcriptText.trim()) {
                    onInsertToActiveField(transcriptText.trim());
                    onClose();
                  }
                }}
                disabled={!transcriptText.trim()}
                className="px-3.5 py-2 bg-[#F4F7F5] hover:bg-[#2E5A44]/15 disabled:opacity-40 border border-[#2E5A44]/30 text-[#2E5A44] font-semibold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <FileText className="w-4 h-4 text-[#D4A373]" />
                <span>{t.insertBtn}</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2.5">
            {/* PRINT BUTTON */}
            <button
              type="button"
              onClick={handlePrint}
              disabled={!transcriptText.trim()}
              className="px-4 py-2 bg-white hover:bg-gray-100 disabled:opacity-40 border border-gray-300 text-gray-800 font-bold text-xs rounded-xl shadow-xs flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4 text-[#2E5A44]" />
              <span>{t.printBtn}</span>
            </button>

            {/* EXPORT PDF BUTTON */}
            <button
              type="button"
              onClick={handleExportPdf}
              disabled={!transcriptText.trim()}
              className="px-4 py-2 bg-[#2E5A44] hover:bg-[#1F3A2B] disabled:opacity-40 text-white font-bold text-xs rounded-xl shadow flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#D4A373]" />
              <span>{t.exportPdfBtn}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
