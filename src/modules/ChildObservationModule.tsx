import React, { useState, useEffect } from 'react';
import { ChildObservationRecord, InstitutionConfig, AssessmentStatus } from '../types';
import { Language, UI_TRANSLATIONS } from '../i18n/translations';
import { SpeechToTextButton } from '../components/SpeechToTextButton';
import { AutoResizeTextarea } from '../components/AutoResizeTextarea';
import { exportChildObservationToPdf } from '../utils/individualChildPdfExport';
import {
  UserCheck,
  Sparkles,
  Printer,
  FileDown,
  RotateCcw,
  CheckCircle2,
  Clock,
  BookOpen,
  Calendar,
  Layers,
  Baby,
  Sun,
  Globe,
  Heart,
  Plus,
  Trash2,
  Loader2,
  Check,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';

interface ChildObservationModuleProps {
  institution: InstitutionConfig;
  lang: Language;
}

const DEFAULT_SAMPLE_RECORD: Record<Language, ChildObservationRecord> = {
  ro: {
    id: 'sample-child-1',
    childName: 'Matei L.',
    childAge: '4 ani și 2 luni',
    childLevel: 'Casa dei Bambini (3-6 ani)',
    date: new Date().toISOString().split('T')[0],
    observerName: 'Asistent Montessori / Ghid Clasă',
    domains: {
      practicalLife: {
        status: 'mastered',
        notes: 'Spălatul mâinilor, turnarea apei din carafă fără vărsare. Pune scaunul la loc în liniște cu ambele mâini.',
      },
      sensorial: {
        status: 'practicing',
        notes: 'Construiește Turnul Roz cu atenție de la bază la vârf. Lucrează cu Cutiile Cromatice (gradarea culorilor).',
      },
      language: {
        status: 'practicing',
        notes: 'Trece degetele peste literele din șmirghel (m, a, t, s) și pronunță sunetele fonetice asociate cu claritate.',
      },
      mathStem: {
        status: 'presented',
        notes: 'I s-au prezentat Barele Roșii și Albastre (1-10) și Cutia cu Fusuri. Explorează conceptul de cantitate concretă.',
      },
      cultural: {
        status: 'practicing',
        notes: 'Puzzle-ul hărții continentelor (identifică Europa și Africa). Îngrijește planta de pe pervaz cu pulverizatorul.',
      },
      socialEmotional: {
        status: 'mastered',
        notes: 'Maniere excelente de grație și curtoazie. Cere permisiunea când dorește să observe un coleg și păstrează tăcerea.',
      },
    },
    generalObs: 'Copilul arată perioade prelungite de concentrare (până la 35-40 minute) în timpul ciclului de lucru de 3 ore. Stare de normalizare și armonie vizibilă.',
    nextSteps: '1. Introducerea Alfabetului Mobil Mic.\n2. Prezentarea Mărgelelor Aurii (conceptul de unitate și sută).\n3. Exerciții avansate de viață practică (lustruit lemn).',
    createdAt: Date.now(),
  },
  fr: {
    id: 'sample-child-1',
    childName: 'Lucas M.',
    childAge: '4 ans et 2 mois',
    childLevel: 'Maison des Enfants (3-6 ans)',
    date: new Date().toISOString().split('T')[0],
    observerName: 'Éducateur / Assistant Montessori',
    domains: {
      practicalLife: {
        status: 'mastered',
        notes: 'Lavage des mains en autonomie, verser l’eau avec précision. Range sa chaise silencieusement à deux mains.',
      },
      sensorial: {
        status: 'practicing',
        notes: 'Élévation de la Tour Rose du plus grand au plus petit. Travail attentif avec les boîtes de couleurs n°2.',
      },
      language: {
        status: 'practicing',
        notes: 'Tracé tactile des lettres rugueuses (m, a, t, s) et articulation précise des sons phonétiques correspondants.',
      },
      mathStem: {
        status: 'presented',
        notes: 'Présentation des barres rouges et bleues (1-10) et des fuseaux. Découverte de la relation quantité-symbole.',
      },
      cultural: {
        status: 'practicing',
        notes: 'Puzzle de la carte des continents (situe l’Europe et l’Afrique). Soin délicat des plantes de l’ambiance.',
      },
      socialEmotional: {
        status: 'mastered',
        notes: 'Grâce et courtoisie exemplaires. Demande la permission avant d’observer un camarade sans interrompre son travail.',
      },
    },
    generalObs: 'L’enfant manifeste de longues phases de concentration ininterrompue (35 à 40 minutes) au grand cycle du matin. État de normalisation épanoui.',
    nextSteps: '1. Introduction du Petit Alphabet Mobile.\n2. Présentation du Système Décimal avec les Perles Dorées (Unité et Centaine).\n3. Nettoyage du miroir.',
    createdAt: Date.now(),
  },
  en: {
    id: 'sample-child-1',
    childName: 'Liam T.',
    childAge: '4 years 2 months',
    childLevel: 'Children’s House (3-6 yrs)',
    date: new Date().toISOString().split('T')[0],
    observerName: 'Montessori Guide / Assistant',
    domains: {
      practicalLife: {
        status: 'mastered',
        notes: 'Hand washing routine mastered, pours liquids with steady control. Tucks chair beneath table quietly with both hands.',
      },
      sensorial: {
        status: 'practicing',
        notes: 'Constructs Pink Tower with precision from base to summit. Engaged exploration with Color Box 2 gradations.',
      },
      language: {
        status: 'practicing',
        notes: 'Tracing Sandpaper Letters (m, a, t, s) with two fingers while clearly enunciating phonetic sounds.',
      },
      mathStem: {
        status: 'presented',
        notes: 'Presented with Red and Blue Number Rods (1-10) and Spindle Box. Developing quantity-to-symbol correspondence.',
      },
      cultural: {
        status: 'practicing',
        notes: 'Continent puzzle map (identifies Europe and Africa). Waters shelf fern with fine mist spray bottle.',
      },
      socialEmotional: {
        status: 'mastered',
        notes: 'Exceptional grace and courtesy. Politeness observed when asking peers if he may quietly observe their work.',
      },
    },
    generalObs: 'Child demonstrates prolonged deep concentration (35-40 min) during the 3-hour work cycle. Notable normalization and joy in purposeful work.',
    nextSteps: '1. Introduce Small Movable Alphabet.\n2. Present Golden Bead single units and hundred square.\n3. Advanced wood polishing.',
    createdAt: Date.now(),
  },
  de: {
    id: 'sample-child-1',
    childName: 'Lukas B.',
    childAge: '4 Jahre und 2 Monate',
    childLevel: 'Kinderhaus (3-6 J.)',
    date: new Date().toISOString().split('T')[0],
    observerName: 'Montessori-Pädagoge / Assistent',
    domains: {
      practicalLife: {
        status: 'mastered',
        notes: 'Selbstständiges Händewaschen, zielgenaues Wassereingießen. Schiebt den Stuhl leise mit beiden Händen an den Tisch.',
      },
      sensorial: {
        status: 'practicing',
        notes: 'Baut den Rosa Turm konzentriert von der Basis zur Spitze auf. Sorgfältiges Ordnen der Farbtäfelchen Kasten 2.',
      },
      language: {
        status: 'practicing',
        notes: 'Nachspuren der Sandpapierbuchstaben (m, a, t, s) mit deutlicher Aussprache der Einzellaute.',
      },
      mathStem: {
        status: 'presented',
        notes: 'Darbietung der Numerischen Stangen (1-10) und des Spindelkastens. Begreifen konkreter Mengen.',
      },
      cultural: {
        status: 'practicing',
        notes: 'Kontinenten-Puzzle (benennt Europa und Afrika). Pflegt die Grünpflanzen aufmerksam mit dem Sprüher.',
      },
      socialEmotional: {
        status: 'mastered',
        notes: 'Vorbildliche Anmut und Höflichkeit. Fragt leise, bevor er einem Mitschüler beim Arbeiten zuschaut.',
      },
    },
    generalObs: 'Das Kind zeigt ausdauernde Konzentrationsphasen (bis zu 40 Minuten) im 3-stündigen Arbeitszyklus. Tiefe Normalisierung spürbar.',
    nextSteps: '1. Einführung des Kleinen Beweglichen Alphabets.\n2. Darbietung der Goldenen Perlen (Einer und Hunderter).\n3. Fortgeschrittene Holzpolitur.',
    createdAt: Date.now(),
  },
};

const getEmptyChildRecord = (lang: Language): ChildObservationRecord => {
  const childLevel =
    lang === 'ro'
      ? 'Casa dei Bambini (3–6 ani)'
      : lang === 'fr'
      ? 'Maison des Enfants (3–6 ans)'
      : lang === 'de'
      ? 'Kinderhaus (3–6 J.)'
      : "Children’s House (3–6 yrs)";
  return {
    id: 'child-' + Date.now(),
    childName: '',
    childAge: '',
    childLevel,
    date: new Date().toISOString().split('T')[0],
    observerName: '',
    domains: {
      practicalLife: { status: 'introduced' as any, notes: '' },
      sensorial: { status: 'introduced' as any, notes: '' },
      language: { status: 'introduced' as any, notes: '' },
      mathStem: { status: 'introduced' as any, notes: '' },
      cultural: { status: 'introduced' as any, notes: '' },
      socialEmotional: { status: 'introduced' as any, notes: '' },
    },
    generalObs: '',
    nextSteps: '',
    createdAt: Date.now(),
  };
};

export const ChildObservationModule: React.FC<ChildObservationModuleProps> = ({
  institution,
  lang,
}) => {
  const t = UI_TRANSLATIONS[lang];
  const cT = t.childObs;
  const sampleRecord = DEFAULT_SAMPLE_RECORD[lang] || DEFAULT_SAMPLE_RECORD.ro;

  const storageKey = 'montessori_child_observations_v1';

  // Load saved records from localStorage
  const [savedRecords, setSavedRecords] = useState<ChildObservationRecord[]>(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return [DEFAULT_SAMPLE_RECORD[lang] || DEFAULT_SAMPLE_RECORD.ro];
  });

  const [currentRecord, setCurrentRecord] = useState<ChildObservationRecord>(() => {
    return getEmptyChildRecord(lang);
  });

  // AI Assistant states
  const [rawAiNotes, setRawAiNotes] = useState('');
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'form' | 'records'>('form');
  const [saveToast, setSaveToast] = useState(false);

  // Sync sample with language changes if untouched sample
  useEffect(() => {
    const sample = DEFAULT_SAMPLE_RECORD[lang] || DEFAULT_SAMPLE_RECORD.ro;
    if (currentRecord.id === 'sample-child-1' || currentRecord.id.startsWith('sample-')) {
      setCurrentRecord({
        ...sample,
        id: currentRecord.id,
        date: currentRecord.date || new Date().toISOString().split('T')[0],
      });
    }
  }, [lang]);

  // Persist records to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(savedRecords));
    } catch (e) {
      console.error(e);
    }
  }, [savedRecords]);

  const handleDomainChange = (
    domain: keyof ChildObservationRecord['domains'],
    field: 'status' | 'notes',
    value: string
  ) => {
    setCurrentRecord((prev) => ({
      ...prev,
      domains: {
        ...prev.domains,
        [domain]: {
          ...prev.domains[domain],
          [field]: value,
        },
      },
    }));
  };

  const handleResetExample = () => {
    const sample = DEFAULT_SAMPLE_RECORD[lang] || DEFAULT_SAMPLE_RECORD.ro;
    setCurrentRecord({
      ...sample,
      id: 'sample-' + Date.now(),
      date: new Date().toISOString().split('T')[0],
    });
  };

  const handleSaveRecord = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord: ChildObservationRecord = {
      ...currentRecord,
      id: currentRecord.id.startsWith('sample') ? 'child-' + Date.now() : currentRecord.id,
      createdAt: Date.now(),
    };

    setSavedRecords((prev) => {
      const idx = prev.findIndex((r) => r.id === newRecord.id);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = newRecord;
        return updated;
      }
      return [newRecord, ...prev];
    });

    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  const handleDeleteRecord = (id: string) => {
    setSavedRecords((prev) => prev.filter((r) => r.id !== id));
  };

  const handleExportPdf = () => {
    exportChildObservationToPdf({
      record: currentRecord,
      institution,
      lang,
    });
  };

  // AI Auto-Synthesis Handler
  const handleGenerateAiAssessment = async () => {
    if (!rawAiNotes.trim()) return;
    setIsAiGenerating(true);
    setAiError(null);

    try {
      const response = await fetch('/api/analyze-child-observation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rawNotes: rawAiNotes,
          childName: currentRecord.childName,
          childAge: currentRecord.childAge,
          childLevel: currentRecord.childLevel,
          lang,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Erreur lors de l’analyse IA.');
      }

      const a = data.assessment;
      setCurrentRecord((prev) => ({
        ...prev,
        domains: {
          practicalLife: {
            status: a.practicalLife?.status || prev.domains.practicalLife.status,
            notes: a.practicalLife?.notes || prev.domains.practicalLife.notes,
          },
          sensorial: {
            status: a.sensorial?.status || prev.domains.sensorial.status,
            notes: a.sensorial?.notes || prev.domains.sensorial.notes,
          },
          language: {
            status: a.language?.status || prev.domains.language.status,
            notes: a.language?.notes || prev.domains.language.notes,
          },
          mathStem: {
            status: a.mathStem?.status || prev.domains.mathStem.status,
            notes: a.mathStem?.notes || prev.domains.mathStem.notes,
          },
          cultural: {
            status: a.cultural?.status || prev.domains.cultural.status,
            notes: a.cultural?.notes || prev.domains.cultural.notes,
          },
          socialEmotional: {
            status: a.socialEmotional?.status || prev.domains.socialEmotional.status,
            notes: a.socialEmotional?.notes || prev.domains.socialEmotional.notes,
          },
        },
        generalObs: a.generalObs || prev.generalObs,
        nextSteps: a.nextSteps || prev.nextSteps,
      }));
    } catch (err: any) {
      console.error(err);
      setAiError(err?.message || 'Erreur de connexion avec Gemini AI.');
    } finally {
      setIsAiGenerating(false);
    }
  };

  const domainConfig: Array<{
    key: keyof ChildObservationRecord['domains'];
    title: string;
    icon: any;
    color: string;
  }> = [
    { key: 'practicalLife', title: cT.vp, icon: Layers, color: 'text-amber-700 bg-amber-50 border-amber-200' },
    { key: 'sensorial', title: cT.senz, icon: Sparkles, color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
    { key: 'language', title: cT.lang, icon: BookOpen, color: 'text-sky-700 bg-sky-50 border-sky-200' },
    { key: 'mathStem', title: cT.math, icon: Sun, color: 'text-purple-700 bg-purple-50 border-purple-200' },
    { key: 'cultural', title: cT.cult, icon: Globe, color: 'text-teal-700 bg-teal-50 border-teal-200' },
    { key: 'socialEmotional', title: cT.soc, icon: Heart, color: 'text-rose-700 bg-rose-50 border-rose-200' },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2E5A44] text-white flex items-center justify-center shrink-0">
              <UserCheck className="w-6 h-6 text-[#D4A373]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1F3A2B] font-serif">
                {cT.title}
              </h2>
              <p className="text-xs text-gray-500">{cT.subtitle}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleExportPdf}
              className="px-3.5 py-2 bg-[#D4A373] hover:bg-[#c29363] text-[#1F3A2B] font-bold text-xs rounded-xl shadow flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <FileDown className="w-4 h-4" />
              <span>{cT.exportPdfBtn}</span>
            </button>
            <button
              type="button"
              onClick={handleResetExample}
              className="px-3 py-2 bg-[#F4F7F5] hover:bg-[#2E5A44]/15 text-[#2E5A44] border border-[#2E5A44]/20 font-semibold text-xs rounded-xl flex items-center gap-1 transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{cT.resetBtn}</span>
            </button>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
          <button
            type="button"
            onClick={() => setActiveTab('form')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'form'
                ? 'bg-[#2E5A44] text-white shadow-xs'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            ✏️ {cT.profileTitle}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('records')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'records'
                ? 'bg-[#2E5A44] text-white shadow-xs'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            📚 {cT.savedRecordsTitle} ({savedRecords.length})
          </button>
        </div>
      </div>

      {activeTab === 'records' ? (
        /* Saved Records History */
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
          <h3 className="text-base font-bold text-[#1F3A2B] font-serif">
            {cT.savedRecordsTitle}
          </h3>

          {savedRecords.length === 0 ? (
            <div className="text-center py-10 text-gray-400 text-xs">
              {cT.emptyRecords}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedRecords.map((r) => (
                <div
                  key={r.id}
                  className="bg-[#F4F7F5] border border-gray-200 p-4 rounded-xl flex flex-col justify-between space-y-3 hover:border-[#2E5A44]/40 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-[#1F3A2B]">
                        👦 {r.childName}
                      </h4>
                      <p className="text-xs text-gray-600">
                        {r.childAge} • {r.childLevel}
                      </p>
                      <span className="text-[10px] text-gray-400 font-mono">
                        📅 {r.date} • {r.observerName}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          setCurrentRecord(r);
                          setActiveTab('form');
                        }}
                        className="px-2.5 py-1 bg-[#2E5A44] text-white rounded-lg text-xs font-semibold hover:bg-[#1F3A2B] transition-colors"
                      >
                        Éditer
                      </button>
                      <button
                        type="button"
                        onClick={() => exportChildObservationToPdf({ record: r, institution, lang })}
                        className="p-1.5 text-gray-600 hover:text-[#2E5A44] rounded-lg hover:bg-white"
                        title="PDF"
                      >
                        <FileDown className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteRecord(r.id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-white"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-gray-700 italic line-clamp-2 border-t border-gray-200/60 pt-2">
                    {r.generalObs || '—'}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Evaluation Form */
        <form onSubmit={handleSaveRecord} className="space-y-6">
          {/* Gemini AI Synthesis Card */}
          <div className="bg-gradient-to-r from-[#1F3A2B] via-[#2E5A44] to-[#396850] p-5 rounded-2xl text-white shadow-md space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D4A373] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> {cT.aiTitle}
              </span>
            </div>
            <p className="text-xs text-white/80 leading-relaxed">{cT.aiDesc}</p>

            <div className="relative">
              <AutoResizeTextarea
                value={rawAiNotes}
                onChange={(e) => setRawAiNotes(e.target.value)}
                placeholder={cT.aiPlaceholder}
                minRows={3}
                className="w-full bg-white/10 border border-white/30 rounded-xl p-3 pr-10 text-xs text-white placeholder-white/50 focus:outline-none focus:border-[#D4A373] focus:bg-white/15"
              />
              <div className="absolute right-2 top-3">
                <SpeechToTextButton
                  lang={lang}
                  currentValue={rawAiNotes}
                  onTranscript={(txt) => setRawAiNotes(txt)}
                  size="sm"
                />
              </div>
            </div>

            {aiError && (
              <p className="text-xs text-red-200 bg-red-900/40 p-2 rounded-lg">
                ⚠️ {aiError}
              </p>
            )}

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleGenerateAiAssessment}
                disabled={isAiGenerating || !rawAiNotes.trim()}
                className="px-4 py-2 bg-[#D4A373] hover:bg-[#c29363] disabled:opacity-50 text-[#1F3A2B] font-bold text-xs rounded-xl shadow flex items-center gap-2 transition-all cursor-pointer"
              >
                {isAiGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{cT.aiGenerating}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>{cT.aiBtn}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Child Profile Metadata Fields */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-[#1F3A2B] uppercase tracking-wider border-b border-gray-100 pb-2">
              📋 {cT.profileTitle}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              <div className="flex flex-col">
                <div className="h-9 flex items-end mb-1.5">
                  <label className="text-xs font-bold text-gray-700 leading-tight">
                    {cT.childName}
                  </label>
                </div>
                <input
                  type="text"
                  value={currentRecord.childName}
                  onChange={(e) =>
                    setCurrentRecord((p) => ({ ...p, childName: e.target.value }))
                  }
                  placeholder={sampleRecord.childName || 'Ex: Liam T.'}
                  className="w-full h-[38px] box-border bg-gray-50 border border-gray-300 rounded-lg px-3 text-xs focus:ring-1 focus:ring-[#2E5A44] focus:outline-none"
                />
              </div>

              <div className="flex flex-col">
                <div className="h-9 flex items-end mb-1.5">
                  <label className="text-xs font-bold text-gray-700 leading-tight">
                    {cT.childAge}
                  </label>
                </div>
                <input
                  type="text"
                  value={currentRecord.childAge}
                  onChange={(e) =>
                    setCurrentRecord((p) => ({ ...p, childAge: e.target.value }))
                  }
                  placeholder={sampleRecord.childAge || 'Ex: 4 ani 2 luni'}
                  className="w-full h-[38px] box-border bg-gray-50 border border-gray-300 rounded-lg px-3 text-xs focus:ring-1 focus:ring-[#2E5A44] focus:outline-none"
                />
              </div>

              <div className="flex flex-col">
                <div className="h-9 flex items-end mb-1.5">
                  <label className="text-xs font-bold text-gray-700 leading-tight">
                    {cT.childLevel}
                  </label>
                </div>
                <input
                  type="text"
                  value={currentRecord.childLevel}
                  onChange={(e) =>
                    setCurrentRecord((p) => ({ ...p, childLevel: e.target.value }))
                  }
                  placeholder={sampleRecord.childLevel || 'Casa dei Bambini (3–6 ani)'}
                  className="w-full h-[38px] box-border bg-gray-50 border border-gray-300 rounded-lg px-3 text-xs focus:ring-1 focus:ring-[#2E5A44] focus:outline-none"
                />
              </div>

              <div className="flex flex-col">
                <div className="h-9 flex items-end mb-1.5">
                  <label className="text-xs font-bold text-gray-700 leading-tight">
                    {cT.date}
                  </label>
                </div>
                <input
                  type="date"
                  value={currentRecord.date}
                  onChange={(e) =>
                    setCurrentRecord((p) => ({ ...p, date: e.target.value }))
                  }
                  className="w-full h-[38px] box-border bg-gray-50 border border-gray-300 rounded-lg px-3 text-xs focus:ring-1 focus:ring-[#2E5A44] focus:outline-none cursor-pointer"
                />
              </div>

              <div className="flex flex-col">
                <div className="h-9 flex items-end mb-1.5">
                  <label className="text-xs font-bold text-gray-700 leading-tight">
                    {cT.observer}
                  </label>
                </div>
                <input
                  type="text"
                  value={currentRecord.observerName}
                  onChange={(e) =>
                    setCurrentRecord((p) => ({ ...p, observerName: e.target.value }))
                  }
                  placeholder={sampleRecord.observerName || 'Ghid / Asistent Montessori'}
                  className="w-full h-[38px] box-border bg-gray-50 border border-gray-300 rounded-lg px-3 text-xs focus:ring-1 focus:ring-[#2E5A44] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* 6 Curricular Domains */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-[#1F3A2B] uppercase tracking-wider border-b border-gray-100 pb-2">
              🌿 {cT.domainsTitle}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
              {domainConfig.map((dom) => {
                const Icon = dom.icon;
                const dData = currentRecord.domains[dom.key];

                return (
                  <div
                    key={dom.key}
                    className="flex flex-col h-full justify-between p-4 rounded-xl border border-gray-200 bg-[#FAFBF9] space-y-2.5 hover:border-[#2E5A44]/30 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center border text-xs ${dom.color}`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="font-bold text-xs text-[#1F3A2B]">
                          {dom.title}
                        </span>
                      </div>

                      <select
                        value={dData.status}
                        onChange={(e) =>
                          handleDomainChange(dom.key, 'status', e.target.value)
                        }
                        className="bg-white border border-gray-300 rounded-lg px-2 py-1 text-xs font-semibold text-gray-700 focus:outline-none focus:border-[#2E5A44] cursor-pointer"
                      >
                        <option value="mastered">{cT.statusMastered}</option>
                        <option value="practicing">{cT.statusPracticing}</option>
                        <option value="presented">{cT.statusPresented}</option>
                        <option value="unaddressed">{cT.statusUnaddressed}</option>
                      </select>
                    </div>

                    <div className="relative flex-1 flex flex-col">
                      <AutoResizeTextarea
                        value={dData.notes}
                        onChange={(e) =>
                          handleDomainChange(dom.key, 'notes', e.target.value)
                        }
                        placeholder={sampleRecord.domains[dom.key]?.notes || cT.notesPlaceholder}
                        minRows={2}
                        className="flex-1 w-full bg-white border border-gray-200 rounded-lg p-2.5 pr-8 text-xs text-gray-800 focus:outline-none focus:border-[#2E5A44] focus:ring-1 focus:ring-[#2E5A44]"
                      />
                      <div className="absolute right-1.5 top-2.5">
                        <SpeechToTextButton
                          lang={lang}
                          currentValue={dData.notes}
                          onTranscript={(txt) =>
                            handleDomainChange(dom.key, 'notes', txt)
                          }
                          size="sm"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 2: General Observations & Normalization */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-[#1F3A2B] uppercase tracking-wider">
              {cT.generalTitle}
            </h3>
            <div className="relative">
              <AutoResizeTextarea
                value={currentRecord.generalObs}
                onChange={(e) =>
                  setCurrentRecord((p) => ({ ...p, generalObs: e.target.value }))
                }
                placeholder={sampleRecord.generalObs || cT.generalPlaceholder}
                minRows={3}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 pr-10 text-xs text-gray-800 focus:outline-none focus:border-[#2E5A44] focus:bg-white"
              />
              <div className="absolute right-2 top-3">
                <SpeechToTextButton
                  lang={lang}
                  currentValue={currentRecord.generalObs}
                  onTranscript={(txt) =>
                    setCurrentRecord((p) => ({
                      ...p,
                      generalObs: txt,
                    }))
                  }
                  size="sm"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Next Steps */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-[#1F3A2B] uppercase tracking-wider">
              {cT.nextStepsTitle}
            </h3>
            <div className="relative">
              <AutoResizeTextarea
                value={currentRecord.nextSteps}
                onChange={(e) =>
                  setCurrentRecord((p) => ({ ...p, nextSteps: e.target.value }))
                }
                placeholder={sampleRecord.nextSteps || cT.nextStepsPlaceholder}
                minRows={3}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 pr-10 text-xs text-gray-800 focus:outline-none focus:border-[#2E5A44] focus:bg-white"
              />
              <div className="absolute right-2 top-3">
                <SpeechToTextButton
                  lang={lang}
                  currentValue={currentRecord.nextSteps}
                  onTranscript={(txt) =>
                    setCurrentRecord((p) => ({
                      ...p,
                      nextSteps: txt,
                    }))
                  }
                  size="sm"
                />
              </div>
            </div>
          </div>

          {/* Action Submit Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
            <div className="text-xs text-gray-500 font-mono">
              {saveToast && (
                <span className="text-emerald-700 font-bold flex items-center gap-1 animate-fadeIn">
                  <Check className="w-4 h-4" /> Fiche enregistrée avec succès!
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#2E5A44] hover:bg-[#1F3A2B] text-white font-bold text-xs rounded-xl shadow flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4 text-[#D4A373]" />
                <span>{cT.saveBtn}</span>
              </button>

              <button
                type="button"
                onClick={handleExportPdf}
                className="px-4 py-2.5 bg-[#D4A373] hover:bg-[#c29363] text-[#1F3A2B] font-bold text-xs rounded-xl shadow flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <FileDown className="w-4 h-4" />
                <span>PDF</span>
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
