import React, { useState, useEffect } from 'react';
import { InstitutionConfig, LessonPlan } from '../types';
import { Language, UI_TRANSLATIONS } from '../i18n/translations';
import { MULTILINGUAL_LESSON_FORM_DEFAULTS, getLocalizedLessonPlan } from '../data/multilingualDefaults';
import {
  FileText,
  Sparkles,
  Printer,
  Plus,
  BookOpen,
  Calendar,
  CheckCircle2,
  Trash2,
  Lightbulb,
  Loader2,
  RotateCcw,
  Compass,
  Layers,
} from 'lucide-react';
import { SpeechToTextButton } from '../components/SpeechToTextButton';

interface LessonPlannerModuleProps {
  lessonPlans: LessonPlan[];
  onAddLessonPlan: (plan: LessonPlan) => void;
  onDeleteLessonPlan: (id: string) => void;
  institution: InstitutionConfig;
  onOpenPrint: () => void;
  lang: Language;
}

const MULTILINGUAL_SAMPLE_TOPICS: Record<Language, { topic: string; subject: string; level: string }[]> = {
  ro: [
    { topic: 'Memorarea Adunării: Familiile de Numere', subject: 'Matematică', level: 'Casa dei Bambini (5-6 ani) / Primar' },
    { topic: 'Introducere în Simbolurile Gramaticale: Substantivul', subject: 'Limbaj', level: 'Casa dei Bambini (4.5-6 ani)' },
    { topic: 'Dulapul Geometric: Prezentarea Triunghiurilor după Laturi și Unghiuri', subject: 'Geometrie', level: 'Primar (6-9 ani)' },
    { topic: 'Panglica Neagră a Timpului: Istoria Pământului înainte de Om', subject: 'Educație Cosmică', level: 'Primar (6-12 ani)' },
    { topic: 'Cabinetul de Botanică: Clasificarea Frunzelor după Formă', subject: 'Biologie / Științe', level: 'Casa dei Bambini / Primar' },
    { topic: 'Spălatul Mâinilor și Îngrijirea Mediului', subject: 'Viață Practică', level: 'Casa dei Bambini (3-4 ani)' },
  ],
  fr: [
    { topic: 'Mémorisation de l’Addition : Les Familles de Nombres', subject: 'Mathématiques', level: 'Maison des Enfants (5-6 ans) / Primaire' },
    { topic: 'Introduction aux Symboles Grammaticaux : Le Nom', subject: 'Langage', level: 'Maison des Enfants (4.5-6 ans)' },
    { topic: 'Cabinet Géométrique : Les Triangles selon Côtés et Angles', subject: 'Géométrie', level: 'Primaire (6-9 ans)' },
    { topic: 'Le Grand Ruban Noir : Histoire de la Terre avant l’Homme', subject: 'Éducation Cosmique', level: 'Primaire (6-12 ans)' },
    { topic: 'Cabinet de Botanique : Les Formes de Feuilles', subject: 'Botanique & Sciences', level: 'Maison des Enfants / Primaire' },
    { topic: 'Lavage des Mains et Soin de l’Ambiance', subject: 'Vie Pratique', level: 'Maison des Enfants (3-4 ans)' },
  ],
  en: [
    { topic: 'Addition Fact Memorization: Number Families', subject: 'Mathematics', level: 'Children’s House (5-6 yrs) / Elementary' },
    { topic: 'Grammar Symbols Introduction: The Noun', subject: 'Language', level: 'Children’s House (4.5-6 yrs)' },
    { topic: 'Geometric Cabinet: Classification of Triangles', subject: 'Geometry', level: 'Elementary (6-9 yrs)' },
    { topic: 'The Long Black Strip: Earth’s History Before Humans', subject: 'Cosmic Education', level: 'Elementary (6-12 yrs)' },
    { topic: 'Botany Cabinet: Leaf Shape Nomenclature', subject: 'Biology & Science', level: 'Children’s House / Elementary' },
    { topic: 'Hand Washing & Care of the Environment', subject: 'Practical Life', level: 'Children’s House (3-4 yrs)' },
  ],
  de: [
    { topic: 'Memorieren der Addition: Die Zahlenfamilien', subject: 'Mathematik', level: 'Kinderhaus (5-6 J.) / Primarstufe' },
    { topic: 'Einführung in die Wortartensymbole: Das Nomen', subject: 'Sprache', level: 'Kinderhaus (4.5-6 J.)' },
    { topic: 'Geometrische Kommode: Einteilung der Dreiecke', subject: 'Geometrie', level: 'Primarstufe (6-9 J.)' },
    { topic: 'Das Schwarze Band: Die Geschichte der Erde vor dem Menschen', subject: 'Kosmische Erziehung', level: 'Primarstufe (6-12 J.)' },
    { topic: 'Botanische Kommode: Bestimmung der Blattformen', subject: 'Biologie & Naturkunde', level: 'Kinderhaus / Primarstufe' },
    { topic: 'Händewaschen und Pflege der Umgebung', subject: 'Übungen des täglichen Lebens', level: 'Kinderhaus (3-4 J.)' },
  ],
};

const MULTILINGUAL_SCHEDULE: Record<Language, { day: string; subject: string; type: string; focus: string }[]> = {
  ro: [
    { day: 'Luni', subject: 'Matematică & Aritmetică', type: 'Marea Lecție / Tabla Înmulțirii / Fracții', focus: 'Operații concrete spre abstractizare' },
    { day: 'Marți', subject: 'Limbaj & Gramatică', type: 'Cutia Gramaticală / Simboluri gramaticale', focus: 'Funcția substantivului și a verbului' },
    { day: 'Miercuri', subject: 'Geometrie Senzorială & Plană', type: 'Dulapul Geometric / Clasificarea Unghiurilor', focus: 'Etimologie, nomenclatură și construcție' },
    { day: 'Joi', subject: 'Istorie & Educație Cosmică', type: 'Panglica Timpului Neagră / Ceasul Erelor', focus: 'Recunoștința față de evoluția Pământului' },
    { day: 'Vineri', subject: 'Biologie & Științe Naturale', type: 'Botanică / Cabinetul de Frunze / Zoologie', focus: 'Observație în aer liber și clasificare sistematică' }
  ],
  fr: [
    { day: 'Lundi', subject: 'Mathématiques & Arithmétique', type: 'Grande Leçon / Table de Pythagore / Fractions', focus: 'Des manipulations concrètes vers l’abstraction' },
    { day: 'Mardi', subject: 'Langage & Grammaire', type: 'Boîtes Grammaticales / Symboles de phrases', focus: 'Rôle du nom et dynamisme du verbe' },
    { day: 'Mercredi', subject: 'Géométrie Sensorielle', type: 'Cabinet Géométrique / Angles et Surfaces', focus: 'Étymologie, nomenclature et tracé' },
    { day: 'Jeudi', subject: 'Histoire & Éducation Cosmique', type: 'Le Grand Ruban Noir / Horloge des Ères', focus: 'Reconnaissance envers l’évolution de la Terre' },
    { day: 'Vendredi', subject: 'Biologie & Sciences Naturelles', type: 'Botanique / Cabinet des Feuilles / Zoologie', focus: 'Observation en nature et taxonomie systématique' }
  ],
  en: [
    { day: 'Monday', subject: 'Mathematics & Arithmetic', type: 'Great Lesson / Bead Frame / Fractions', focus: 'From sensory exploration to abstraction' },
    { day: 'Tuesday', subject: 'Language & Grammar', type: 'Grammar Boxes / Sentence Analysis', focus: 'Function of noun and vitality of verb' },
    { day: 'Wednesday', subject: 'Geometry', type: 'Geometric Cabinet / Angle & Area work', focus: 'Etymology, nomenclature, and spatial intuition' },
    { day: 'Thursday', subject: 'History & Cosmic Education', type: 'Long Black Strip / Clock of Eras', focus: 'Gratitude for the Earth’s evolutionary epochs' },
    { day: 'Friday', subject: 'Biology & Natural Science', type: 'Botany Cabinet / Leaf Morphology / Zoology', focus: 'Field observation and systematic taxonomy' }
  ],
  de: [
    { day: 'Montag', subject: 'Mathematik & Arithmetik', type: 'Große Erzählung / Perlenrahmen / Brüche', focus: 'Vom konkreten Begreifen zur Abstraktion' },
    { day: 'Dienstag', subject: 'Sprache & Grammatik', type: 'Wortartenkästen / Satzzerlegung', focus: 'Funktion von Nomen und Verb' },
    { day: 'Mittwoch', subject: 'Geometrie', type: 'Geometrische Kommode / Winkel & Flächen', focus: 'Etymologie, Fachbegriffe und Konstruktion' },
    { day: 'Donnerstag', subject: 'Geschichte & Kosmische Erziehung', type: 'Das Schwarze Band / Uhr der Erdzeitalter', focus: 'Achtung und Dankbarkeit für die Erdgeschichte' },
    { day: 'Freitag', subject: 'Biologie & Naturwissenschaften', type: 'Botanische Kommode / Blattformen / Zoologie', focus: 'Naturbeobachtung und systematische Klassifikation' }
  ]
};

export const LessonPlannerModule: React.FC<LessonPlannerModuleProps> = ({
  lessonPlans,
  onAddLessonPlan,
  onDeleteLessonPlan,
  institution,
  onOpenPrint,
  lang,
}) => {
  const [activeTab, setActiveTab] = useState<'create' | 'saved' | 'scope' | 'stem' | 'schedule'>('create');

  const t = UI_TRANSLATIONS[lang].lesson;
  const sampleTopics = MULTILINGUAL_SAMPLE_TOPICS[lang] || MULTILINGUAL_SAMPLE_TOPICS.ro;
  const weeklySchedule = MULTILINGUAL_SCHEDULE[lang] || MULTILINGUAL_SCHEDULE.ro;

  const initialDefaults = MULTILINGUAL_LESSON_FORM_DEFAULTS[lang] || MULTILINGUAL_LESSON_FORM_DEFAULTS.ro;

  // Form State
  const [title, setTitle] = useState(initialDefaults.title);
  const [subject, setSubject] = useState(initialDefaults.subject);
  const [level, setLevel] = useState(initialDefaults.level);
  const [albumRef, setAlbumRef] = useState(initialDefaults.albumRef);
  const [directAim, setDirectAim] = useState(initialDefaults.directAim);
  const [indirectAims, setIndirectAims] = useState(initialDefaults.indirectAims);
  const [hots1, setHots1] = useState(initialDefaults.hots1);
  const [hots2, setHots2] = useState(initialDefaults.hots2);
  const [follow1, setFollow1] = useState(initialDefaults.follow1);
  const [follow2, setFollow2] = useState(initialDefaults.follow2);
  const [materials, setMaterials] = useState(initialDefaults.materials);
  const [pointOfInterest, setPointOfInterest] = useState(initialDefaults.pointOfInterest);

  // Sync default example when language changes
  useEffect(() => {
    const defaults = MULTILINGUAL_LESSON_FORM_DEFAULTS[lang] || MULTILINGUAL_LESSON_FORM_DEFAULTS.ro;
    const allDefaultTitles = Object.values(MULTILINGUAL_LESSON_FORM_DEFAULTS).map((d) => d.title.trim());
    if (!title.trim() || allDefaultTitles.includes(title.trim())) {
      setTitle(defaults.title);
      setSubject(defaults.subject);
      setLevel(defaults.level);
      setAlbumRef(defaults.albumRef);
      setDirectAim(defaults.directAim);
      setIndirectAims(defaults.indirectAims);
      setHots1(defaults.hots1);
      setHots2(defaults.hots2);
      setFollow1(defaults.follow1);
      setFollow2(defaults.follow2);
      setMaterials(defaults.materials);
      setPointOfInterest(defaults.pointOfInterest);
    }
  }, [lang]);

  const handleResetToExampleLesson = () => {
    const defaults = MULTILINGUAL_LESSON_FORM_DEFAULTS[lang] || MULTILINGUAL_LESSON_FORM_DEFAULTS.ro;
    setTitle(defaults.title);
    setSubject(defaults.subject);
    setLevel(defaults.level);
    setAlbumRef(defaults.albumRef);
    setDirectAim(defaults.directAim);
    setIndirectAims(defaults.indirectAims);
    setHots1(defaults.hots1);
    setHots2(defaults.hots2);
    setFollow1(defaults.follow1);
    setFollow2(defaults.follow2);
    setMaterials(defaults.materials);
    setPointOfInterest(defaults.pointOfInterest);
  };

  const localizedPlans = lessonPlans.map((p) => getLocalizedLessonPlan(p, lang));

  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const handleAiAutoFill = async (customTopic?: string) => {
    const topicToUse = customTopic || title;
    if (!topicToUse.trim()) return;

    setIsGeneratingAI(true);
    setAiError(null);

    try {
      const response = await fetch('/api/lesson-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: topicToUse,
          subject,
          level,
          lang,
        }),
      });

      const data = await response.json();
      if (!response.ok || data.error) {
        throw new Error(data.error || 'Nu am putut genera planul.');
      }

      if (data.plan) {
        setTitle(topicToUse);
        setAlbumRef(data.plan.album_ref || albumRef);
        setDirectAim(data.plan.scop_direct || directAim);
        setIndirectAims(data.plan.scop_indirect || indirectAims);
        setHots1(data.plan.hots_1 || hots1);
        setHots2(data.plan.hots_2 || hots2);
        setFollow1(data.plan.follow_1 || follow1);
        setFollow2(data.plan.follow_2 || follow2);
        if (data.plan.materiale_necesare) setMaterials(data.plan.materiale_necesare);
        if (data.plan.punct_de_interes) setPointOfInterest(data.plan.punct_de_interes);
      }
    } catch (err: any) {
      console.error(err);
      setAiError(err?.message || 'Eroare la generarea inteligentă.');
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const handleSaveLessonPlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !directAim.trim()) return;

    const newPlan: LessonPlan = {
      id: 'lp-' + Date.now(),
      title,
      subject,
      level,
      albumRef,
      directAim,
      indirectAims,
      hots1,
      hots2,
      follow1,
      follow2,
      materials,
      pointOfInterest,
      createdAt: Date.now(),
    };

    onAddLessonPlan(newPlan);
    setActiveTab('saved');
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2E5A44] text-white flex items-center justify-center shrink-0">
              <FileText className="w-6 h-6 text-[#D4A373]" />
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
            <span className="text-xs font-semibold text-[#2E5A44] bg-[#F4F7F5] px-3 py-1.5 rounded-lg border border-[#2E5A44]/20">
              {localizedPlans.length} {t.savedCount}
            </span>
            <button
              type="button"
              onClick={onOpenPrint}
              className="px-3 py-1.5 bg-[#D4A373] hover:bg-[#c29363] text-[#1F3A2B] font-bold text-xs rounded-lg flex items-center gap-1 shadow-sm transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" /> PDF
            </button>
          </div>
        </div>

        {/* Philosophy Note Banner */}
        <div className="bg-[#F4F7F5] p-3.5 rounded-xl border border-[#2E5A44]/20 text-xs text-gray-700 leading-relaxed flex items-start gap-2">
          <Lightbulb className="w-4 h-4 text-[#D4A373] shrink-0 mt-0.5" />
          <div>{t.lessonPrinciple}</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center border-b border-gray-200 gap-2">
        <button
          type="button"
          onClick={() => setActiveTab('create')}
          className={`px-5 py-3 text-xs font-bold border-b-2 -mb-px flex items-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'create'
              ? 'border-[#2E5A44] text-[#2E5A44] bg-white rounded-t-xl shadow-xs'
              : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'
          }`}
        >
          <Plus className="w-4 h-4" /> {t.tabCreate}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('saved')}
          className={`px-5 py-3 text-xs font-bold border-b-2 -mb-px flex items-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'saved'
              ? 'border-[#2E5A44] text-[#2E5A44] bg-white rounded-t-xl shadow-xs'
              : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'
          }`}
        >
          <BookOpen className="w-4 h-4" /> {t.tabSaved} ({lessonPlans.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('scope')}
          className={`px-5 py-3 text-xs font-bold border-b-2 -mb-px flex items-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'scope'
              ? 'border-[#2E5A44] text-[#2E5A44] bg-white rounded-t-xl shadow-xs'
              : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'
          }`}
        >
          <Compass className="w-4 h-4" /> {t.tabScope}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('stem')}
          className={`px-5 py-3 text-xs font-bold border-b-2 -mb-px flex items-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'stem'
              ? 'border-[#2E5A44] text-[#2E5A44] bg-white rounded-t-xl shadow-xs'
              : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'
          }`}
        >
          <Layers className="w-4 h-4" /> {t.tabStem}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('schedule')}
          className={`px-5 py-3 text-xs font-bold border-b-2 -mb-px flex items-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'schedule'
              ? 'border-[#2E5A44] text-[#2E5A44] bg-white rounded-t-xl shadow-xs'
              : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'
          }`}
        >
          <Calendar className="w-4 h-4" /> {t.tabSchedule}
        </button>
      </div>

      {/* TAB 1: CREATE LESSON */}
      {activeTab === 'create' && (
        <div className="space-y-6">
          {/* AI Generator Quick-bar */}
          <div className="bg-gradient-to-r from-[#1F3A2B] via-[#2E5A44] to-[#396850] p-5 rounded-2xl text-white shadow-md space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D4A373] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> {t.aiAutofillTitle}
              </span>
              <span className="text-[11px] text-white/70">
                {t.aiAutofillDesc}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 items-center">
              <div className="flex-1 w-full">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={t.aiTopicPlaceholder}
                  className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/50 focus:outline-none focus:border-[#D4A373]"
                />
              </div>
              <button
                type="button"
                onClick={() => handleAiAutoFill()}
                disabled={isGeneratingAI || !title.trim()}
                className="w-full sm:w-auto px-5 py-2.5 bg-[#D4A373] hover:bg-[#c29363] disabled:opacity-50 text-[#1F3A2B] font-bold text-xs rounded-xl shadow flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0"
              >
                {isGeneratingAI ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> {t.aiGenerating}
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" /> {t.aiGenerateBtn}
                  </>
                )}
              </button>
            </div>

            {aiError && (
              <p className="text-xs text-red-200 bg-red-900/40 p-2 rounded-lg">
                ⚠️ {aiError}
              </p>
            )}

            {/* Quick Sample Chips */}
            <div className="pt-1">
              <span className="text-[11px] text-white/70 block mb-1">
                {t.orChooseSample}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {sampleTopics.map((s) => (
                  <button
                    key={s.topic}
                    type="button"
                    onClick={() => {
                      setTitle(s.topic);
                      setSubject(s.subject);
                      setLevel(s.level);
                      handleAiAutoFill(s.topic);
                    }}
                    className="text-[10px] bg-white/10 hover:bg-white/20 border border-white/20 px-2.5 py-1 rounded-full text-white/90 transition-colors cursor-pointer"
                  >
                    {s.topic} ({s.subject})
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Form on 5 Elements */}
          <form onSubmit={handleSaveLessonPlan} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
              <h3 className="text-sm font-bold text-[#1F3A2B] uppercase tracking-wider">
                {t.formTitle}
              </h3>
              <button
                type="button"
                onClick={handleResetToExampleLesson}
                className="text-xs font-semibold text-[#2E5A44] hover:text-[#1F3A2B] bg-[#F4F7F5] hover:bg-[#2E5A44]/15 px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer border border-[#2E5A44]/20"
                title="Reîncarcă exemplul ghidat"
              >
                <RotateCcw className="w-3 h-3 text-[#D4A373]" />
                <span>
                  {lang === 'fr' ? 'Exemple guidé' : lang === 'en' ? 'Guided example' : lang === 'de' ? 'Beispiel laden' : 'Exemplu ghidat'}
                </span>
              </button>
            </div>

            {/* Element 1, Subject & Level */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-gray-700">
                    {t.el1Title}
                  </label>
                  <SpeechToTextButton
                    lang={lang}
                    currentValue={title}
                    onTranscript={(val) => setTitle(val)}
                    size="sm"
                  />
                </div>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs font-semibold text-gray-900 focus:bg-white focus:ring-1 focus:ring-[#2E5A44] focus:outline-none"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-gray-700">{t.subjectLabel}</label>
                  <SpeechToTextButton
                    lang={lang}
                    currentValue={subject}
                    onTranscript={(val) => setSubject(val)}
                    size="sm"
                  />
                </div>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-[#2E5A44] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">{t.levelLabel}</label>
                <input
                  type="text"
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-[#2E5A44] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  {t.el2Title}
                </label>
                <input
                  type="text"
                  value={albumRef}
                  onChange={(e) => setAlbumRef(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs font-mono text-gray-800 focus:ring-1 focus:ring-[#2E5A44] focus:outline-none"
                />
              </div>
            </div>

            {/* Element 3: Direct Aim & Indirect */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-[#1F3A2B]">
                  {t.el3Title}
                </label>
                <SpeechToTextButton
                  lang={lang}
                  currentValue={directAim}
                  onTranscript={(val) => setDirectAim(val)}
                  variant="pill"
                />
              </div>
              <textarea
                rows={2}
                value={directAim}
                onChange={(e) => setDirectAim(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-xs focus:bg-white focus:ring-1 focus:ring-[#2E5A44] focus:outline-none"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-medium text-gray-600">
                  {t.indirectAimsLabel}
                </label>
                <SpeechToTextButton
                  lang={lang}
                  currentValue={indirectAims}
                  onTranscript={(val) => setIndirectAims(val)}
                  size="sm"
                />
              </div>
              <input
                type="text"
                value={indirectAims}
                onChange={(e) => setIndirectAims(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs focus:bg-white focus:ring-1 focus:ring-[#2E5A44] focus:outline-none"
              />
            </div>

            {/* Element 4: HOTS Questions */}
            <div className="bg-[#F4F7F5] p-4 rounded-xl border border-gray-200 space-y-3">
              <span className="text-xs font-bold text-[#2E5A44] uppercase tracking-wider block">
                {t.el4Title}
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-bold text-gray-700">
                      {t.hots1Label}
                    </label>
                    <SpeechToTextButton
                      lang={lang}
                      currentValue={hots1}
                      onTranscript={(val) => setHots1(val)}
                      size="sm"
                    />
                  </div>
                  <textarea
                    rows={2}
                    value={hots1}
                    onChange={(e) => setHots1(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-lg p-2 text-xs focus:ring-1 focus:ring-[#2E5A44] focus:outline-none"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-bold text-gray-700">
                      {t.hots2Label}
                    </label>
                    <SpeechToTextButton
                      lang={lang}
                      currentValue={hots2}
                      onTranscript={(val) => setHots2(val)}
                      size="sm"
                    />
                  </div>
                  <textarea
                    rows={2}
                    value={hots2}
                    onChange={(e) => setHots2(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-lg p-2 text-xs focus:ring-1 focus:ring-[#2E5A44] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Element 5: Follow-up Work Options */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-[#1F3A2B] uppercase tracking-wider block">
                {t.el5Title}
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-[#F4F7F5] border-l-4 border-l-[#2E5A44] rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-bold text-[#2E5A44]">
                      {t.follow1Label}
                    </label>
                    <SpeechToTextButton
                      lang={lang}
                      currentValue={follow1}
                      onTranscript={(val) => setFollow1(val)}
                      size="sm"
                    />
                  </div>
                  <textarea
                    rows={2}
                    value={follow1}
                    onChange={(e) => setFollow1(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-lg p-2 text-xs focus:outline-none"
                  />
                </div>

                <div className="p-3 bg-[#F4F7F5] border-l-4 border-l-[#D4A373] rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-bold text-[#1F3A2B]">
                      {t.follow2Label}
                    </label>
                    <SpeechToTextButton
                      lang={lang}
                      currentValue={follow2}
                      onTranscript={(val) => setFollow2(val)}
                      size="sm"
                    />
                  </div>
                  <textarea
                    rows={2}
                    value={follow2}
                    onChange={(e) => setFollow2(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-lg p-2 text-xs focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Materials & Point of Interest */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-medium text-gray-700">
                    {t.materialsLabel}
                  </label>
                  <SpeechToTextButton
                    lang={lang}
                    currentValue={materials}
                    onTranscript={(val) => setMaterials(val)}
                    size="sm"
                  />
                </div>
                <input
                  type="text"
                  value={materials}
                  onChange={(e) => setMaterials(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-medium text-gray-700">
                    {t.pointOfInterestLabel}
                  </label>
                  <SpeechToTextButton
                    lang={lang}
                    currentValue={pointOfInterest}
                    onTranscript={(val) => setPointOfInterest(val)}
                    size="sm"
                  />
                </div>
                <input
                  type="text"
                  value={pointOfInterest}
                  onChange={(e) => setPointOfInterest(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#2E5A44] hover:bg-[#1F3A2B] text-white font-bold text-xs rounded-xl shadow flex items-center gap-2 transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4 text-[#D4A373]" /> {t.saveLessonBtn}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 2: SAVED LESSONS */}
      {activeTab === 'saved' && (
        <div className="space-y-4">
          {localizedPlans.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl text-center border border-gray-200 space-y-3">
              <BookOpen className="w-10 h-10 text-gray-300 mx-auto" />
              <h3 className="text-sm font-bold text-gray-700">{t.emptySaved}</h3>
              <button
                type="button"
                onClick={() => setActiveTab('create')}
                className="px-4 py-2 bg-[#2E5A44] text-white rounded-lg text-xs font-semibold cursor-pointer"
              >
                {t.createFirst}
              </button>
            </div>
          ) : (
            localizedPlans.map((l) => (
              <div
                key={l.id}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 md:p-6 space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-gray-100 gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#2E5A44] bg-[#F4F7F5] px-2.5 py-0.5 rounded-full border border-[#2E5A44]/20">
                        {l.subject}
                      </span>
                      <span className="text-xs text-gray-500">{l.level}</span>
                    </div>
                    <h3 className="text-base font-bold text-[#1F3A2B] mt-1">{l.title}</h3>
                    <p className="text-xs text-gray-500 font-mono mt-0.5">Ref: {l.albumRef}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={onOpenPrint}
                      className="px-3 py-1.5 bg-[#F4F7F5] hover:bg-[#2E5A44]/10 text-[#2E5A44] text-xs font-semibold rounded-lg flex items-center gap-1 border border-[#2E5A44]/20 transition-colors cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" /> PDF
                    </button>
                    <button
                      type="button"
                      onClick={() => onDeleteLessonPlan(l.id)}
                      className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-100 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Direct Aim */}
                <div className="text-xs">
                  <span className="font-bold text-[#2E5A44]">{t.el3Title}: </span>
                  <span className="text-gray-800">{l.directAim}</span>
                </div>

                {/* HOTS & Follow-up Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
                    <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider block">
                      {t.el4Title}
                    </span>
                    <p className="text-gray-700 italic">
                      <b>{t.hots1Label}:</b> {l.hots1}
                    </p>
                    <p className="text-gray-700 italic">
                      <b>{t.hots2Label}:</b> {l.hots2}
                    </p>
                  </div>

                  <div className="p-3 bg-[#F4F7F5] rounded-xl border border-gray-200 space-y-2">
                    <span className="text-[10px] uppercase font-bold text-[#2E5A44] tracking-wider block">
                      {t.el5Title}
                    </span>
                    <p className="text-gray-800">
                      <b>{t.follow1Label}:</b> {l.follow1}
                    </p>
                    <p className="text-gray-800">
                      <b>{t.follow2Label}:</b> {l.follow2}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB: SCOPE & SEQUENCE */}
      {activeTab === 'scope' && (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-5 animate-fadeIn">
          <div>
            <h3 className="text-base font-bold text-[#1F3A2B] font-serif flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#2E5A44]" />
              <span>
                {lang === 'fr'
                  ? 'Guide de Parcurs Scope & Séquence par Niveaux de Développement'
                  : lang === 'en'
                  ? 'Montessori Scope & Sequence Guide Across Developmental Levels'
                  : lang === 'de'
                  ? 'Montessori Scope & Sequence Entwicklungsstufen-Leitfaden'
                  : 'Ghid de Parcurs Scope & Sequence pe Niveluri de Dezvoltare'}
              </span>
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              {lang === 'fr'
                ? 'Curriculum structuré de la crèche au secondaire (Anchorage Montessori Guide & L\'École des Préalpes)'
                : lang === 'en'
                ? 'Structured curriculum framework from Toddler through Elementary (Anchorage Montessori Guide & Préalpes)'
                : lang === 'de'
                ? 'Strukturiertes Curriculum vom Kleinkind bis zur Sekundarstufe'
                : 'Curriculum structurat de la Toddler la Școala Primară (Anchorage Montessori Guide & Préalpes)'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {/* Toddler */}
            <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-900 font-bold flex items-center justify-center text-xs">
                  👶
                </span>
                <div>
                  <h4 className="font-bold text-amber-950">
                    {lang === 'fr' ? 'Toddler (19 – 36 Mois)' : lang === 'en' ? 'Toddler (19 – 36 Months)' : lang === 'de' ? 'Kleinkind (19 – 36 Monate)' : 'Toddler (19 – 36 Luni)'}
                  </h4>
                  <p className="text-[10px] text-amber-800">Nido & Infant Community</p>
                </div>
              </div>
              <ul className="space-y-1.5 text-gray-700 leading-relaxed list-disc list-inside">
                <li><b>{lang === 'fr' ? 'Vie Pratique :' : 'Viață Practică:'}</b> Spălatul mâinilor, îmbrăcatul autonom, gustare independentă, aranjat scaunul.</li>
                <li><b>{lang === 'fr' ? 'Langage :' : 'Limbaj:'}</b> Nomenclatura obiectelor din mediu, poezii scurte, cântece, vocabular expresiv.</li>
                <li><b>{lang === 'fr' ? 'Sensoriel-Moteur :' : 'Senzorial-Motor:'}</b> Potrivirea formelor simple, puzzle-uri din lemn cu buton, mișcare coordonată.</li>
              </ul>
            </div>

            {/* Casa dei Bambini */}
            <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-900 font-bold flex items-center justify-center text-xs">
                  👧
                </span>
                <div>
                  <h4 className="font-bold text-emerald-950">
                    {lang === 'fr' ? 'Maison des Enfants (3 – 6 Ans)' : lang === 'en' ? 'Children’s House (3 – 6 Yrs)' : lang === 'de' ? 'Kinderhaus (3 – 6 J.)' : 'Casa dei Bambini (3 – 6 Ani)'}
                  </h4>
                  <p className="text-[10px] text-emerald-800">Primary / Maternelle</p>
                </div>
              </div>
              <ul className="space-y-1.5 text-gray-700 leading-relaxed list-disc list-inside">
                <li><b>Practical Life:</b> Turnarea apei, lustruirea, măturatul, grație & curtoazie, grija față de plante.</li>
                <li><b>Sensorial:</b> Turnul Roz, Scara Maronie, Cilindrii cu Buton, Cutiile de Culoare 1-3.</li>
                <li><b>Mathematics:</b> Cifre din șmirghel, Mărgele Aurii, Cutia cu Fusuri, Jocul Timbrelor.</li>
                <li><b>Language:</b> Litere din șmirghel, Alfabet Mobil Mare, Cărticele fonetice de lectură.</li>
                <li><b>Cultural:</b> Puzzle-uri geografice, Cabinetul de Botanică, Cărți de Zoologie.</li>
              </ul>
            </div>

            {/* Elementary */}
            <div className="p-4 rounded-xl border border-sky-200 bg-sky-50/50 space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-sky-100 text-sky-900 font-bold flex items-center justify-center text-xs">
                  🧑
                </span>
                <div>
                  <h4 className="font-bold text-sky-950">
                    {lang === 'fr' ? 'École Élémentaire (6 – 12 Ans)' : lang === 'en' ? 'Elementary (6 – 12 Yrs)' : lang === 'de' ? 'Primarstufe (6 – 12 J.)' : 'Școala Primară (6 – 12 Ani)'}
                  </h4>
                  <p className="text-[10px] text-sky-800">Primaire & Cosmic Education</p>
                </div>
              </div>
              <ul className="space-y-1.5 text-gray-700 leading-relaxed list-disc list-inside">
                <li><b>Educație Cosmică:</b> Cele 5 Mari Lecții (Formarea Universului, Viața, Omul, Scrisul, Numerele).</li>
                <li><b>Matematică & STEM:</b> Marea Înmulțire, Fracții, Geometrie Constructivă, Pătratul Trinomial.</li>
                <li><b>Cercetare Bilingvă:</b> Proiecte autonome de mediu, geologie, istorie și expediții «Going Out».</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB: STEM & MATHEMATICAL COMPETENCIES */}
      {activeTab === 'stem' && (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-5 animate-fadeIn">
          <div>
            <h3 className="text-base font-bold text-[#1F3A2B] font-serif flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#2E5A44]" />
              <span>
                {lang === 'fr'
                  ? 'Compétences Mathématiques et STEM : Du Concret à l’Abstraction'
                  : lang === 'en'
                  ? 'Mathematical & STEM Competencies: From Concrete to Abstract'
                  : lang === 'de'
                  ? 'Mathematische & MINT-Kompetenzen: Vom Konkreten zum Abstrakten'
                  : 'Competențe Matematice și STEM: De la Concret la Abstract'}
              </span>
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Principiul «Gândirii prin Mâini» (Montessori Akademija Mathematical Competence & Science Guide)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Level 1 */}
            <div className="p-4 rounded-xl border border-gray-200 bg-[#F4F7F5] space-y-2">
              <span className="font-bold text-[#1F3A2B] block text-sm">
                1️⃣ Nivelul Concret-Senzorial (Sistemul Zecimal)
              </span>
              <ul className="space-y-1.5 text-gray-700 list-disc list-inside">
                <li><b>Mărgelele Aurii:</b> Unitatea (o mărgea), Zecimea (baston de 10), Suta (pătrat), Mia (cub volumetric de 1000).</li>
                <li><b>Experiență Tactilă:</b> Copilul simte fizic diferența de greutate și mărime între o unitate și o mie.</li>
                <li><b>Lecția în 3 Timpi:</b> Asocierea cantității concrete cu cardurile mari de lemn (1, 10, 100, 1000).</li>
              </ul>
            </div>

            {/* Level 2 */}
            <div className="p-4 rounded-xl border border-gray-200 bg-[#F4F7F5] space-y-2">
              <span className="font-bold text-[#1F3A2B] block text-sm">
                2️⃣ Nivelul de Tranziție (Semi-Abstract)
              </span>
              <ul className="space-y-1.5 text-gray-700 list-disc list-inside">
                <li><b>Jocul Timbrelor (Stamp Game):</b> Înlocuirea volumului concret cu jetoane colorate egale ca dimensiune (1 verde, 10 albastru, 100 roșu, 1000 verde).</li>
                <li><b>Cadrul cu Mărgele (Bead Frame):</b> Trecerea către abacul vertical ierarhic pentru operații cu 4-7 cifre.</li>
                <li><b>Tabla Punctelor:</b> Pregătirea notației pe coloane pe foaia cu caroiaj special.</li>
              </ul>
            </div>

            {/* Level 3 */}
            <div className="p-4 rounded-xl border border-gray-200 bg-[#F4F7F5] space-y-2">
              <span className="font-bold text-[#1F3A2B] block text-sm">
                3️⃣ Geometrie Senzorială și Măsurare (STEM)
              </span>
              <ul className="space-y-1.5 text-gray-700 list-disc list-inside">
                <li><b>Dulapul Geometric:</b> Explorarea tactilă a contururilor și denumirea etimologică exactă.</li>
                <li><b>Pătratul Binomial și Trinomial:</b> Reprezentarea algebrică tridimensională a formulelor (a+b)³ și (a+b+c)³ prin puzzle-uri tridimensionale din lemn.</li>
                <li><b>Triunghiurile Constructive:</b> Descoperirea senzorială a modului în care triunghiurile formează toate celelalte poligoane.</li>
              </ul>
            </div>

            {/* Level 4 */}
            <div className="p-4 rounded-xl border border-gray-200 bg-[#F4F7F5] space-y-2">
              <span className="font-bold text-[#1F3A2B] block text-sm">
                4️⃣ Abstracția și Metoda Științifică
              </span>
              <ul className="space-y-1.5 text-gray-700 list-disc list-inside">
                <li><b>Memorarea Operațiilor:</b> Tăblițele de adunare, scădere, înmulțire și împărțire (tabele cu degete).</li>
                <li><b>Experimente Științifice:</b> Stările materiei, densitatea lichidelor, fotosinteza în cadrul Mării Lecții I.</li>
                <li><b>Gândirea Hipotetico-Deductivă:</b> Copilul formulează întrebări HOTS și verifică ipoteza prin observație autonomă.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SCHEDULE MATRIX */}
      {activeTab === 'schedule' && (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <div>
            <h3 className="text-base font-bold text-[#1F3A2B] font-serif">
              {t.scheduleTitle}
            </h3>
            <p className="text-xs text-gray-500">
              {t.scheduleDesc}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-[#2E5A44] text-white">
                <tr>
                  <th className="p-3">Jour / Day</th>
                  <th className="p-3">Domaine / Subject</th>
                  <th className="p-3">Présentation / Type</th>
                  <th className="p-3">Focus</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {weeklySchedule.map((row, idx) => (
                  <tr key={row.day} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#F4F7F5]'}>
                    <td className="p-3 font-bold text-[#2E5A44]">{row.day}</td>
                    <td className="p-3 font-semibold text-gray-900">{row.subject}</td>
                    <td className="p-3 text-gray-700">{row.type}</td>
                    <td className="p-3 text-gray-600 italic">{row.focus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 leading-relaxed">
            {t.casadeiNote}
          </div>
        </div>
      )}
    </div>
  );
};
