import React, { useState, useEffect } from 'react';
import {
  InstitutionConfig,
  LessonPlan,
  ObservationSession,
  QuickDailyNote,
  RoutineItem
} from './types';
import {
  DEFAULT_INSTITUTION,
  DEFAULT_LESSON_PLANS,
  DEFAULT_ROUTINES
} from './data/montessoriData';
import { Language, UI_TRANSLATIONS } from './i18n/translations';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { HeaderBanner } from './components/HeaderBanner';
import { PrintReportModal } from './components/PrintReportModal';
import { UserManualModal } from './components/UserManualModal';
import { HeaderSettingsModal } from './components/HeaderSettingsModal';
import { AuthScreen } from './components/AuthScreen';
import { AdminUsersModal } from './components/AdminUsersModal';
import { VoiceDictationModal } from './components/VoiceDictationModal';
import { AuthProvider, useAuth } from './context/AuthContext';

import { HubModule } from './modules/HubModule';
import { ObservationModule } from './modules/ObservationModule';
import { LessonPlannerModule } from './modules/LessonPlannerModule';
import { PeaceBehaviorModule } from './modules/PeaceBehaviorModule';
import { AiAssistantModule } from './modules/AiAssistantModule';
import { ReportCenterModule } from './modules/ReportCenterModule';
import { MontessoriCalendarModule } from './modules/MontessoriCalendarModule';
import { ChildObservationModule } from './modules/ChildObservationModule';
import { ObservationModulesPage } from './modules/ObservationModulesPage';

import {
  Home,
  Eye,
  FileText,
  Heart,
  BookOpen,
  Bot,
  Printer,
  Calendar as CalendarIcon,
  Menu,
  X,
  Leaf,
  LogOut,
  Users,
  ShieldCheck,
  User as UserIcon,
  Sparkles,
  Mic,
  UserCheck,
  ClipboardList
} from 'lucide-react';

const INITIAL_OBSERVATION: ObservationSession = {
  id: 'obs-init-1',
  date: new Date().toISOString().split('T')[0],
  startTime: '09:00',
  groupCount: '22 enfants / 2 adultes',
  weather: 'Ensoleillé, ambiance calme et sereine',
  phase: 'Heures 6-10 : Observation de l’Enfant (Activité et choix toutes les 5 min)',
  notes: `09:00 - Entrée calme, changement de chaussures et salutation cordiale.\n09:05 - M. (4 ans) choisit la Tour Rose, transporte les cubes un à un sur le tapis et commence l'élévation par la base.\n09:15 - A. (3.5 ans) observe attentivement la construction sans intervenir, puis choisit le plateau du lavage des mains.\n09:25 - M. termine la tour, admire son travail, puis déconstruit cube par cube pour ranger sur l'étagère.`,
  reflection: `Le respect mutuel et le contrôle de l'erreur ont opéré spontanément. La règle des mains dans le dos a permis à l'enfant d'éprouver la plénitude de sa concentration.`,
  createdAt: Date.now() - 3600000,
};

function MainAppContent() {
  const { currentUser, userProfile, loading, isAdmin, logout } = useAuth();

  // Language State with persistence (Default: French 'fr')
  const [currentLang, setCurrentLang] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get('lang');
      if (urlLang && (urlLang === 'ro' || urlLang === 'fr' || urlLang === 'en' || urlLang === 'de')) {
        localStorage.setItem('montessori_lang_v3', urlLang);
        return urlLang as Language;
      }
    }

    const saved = localStorage.getItem('montessori_lang_v3');
    if (saved && (saved === 'ro' || saved === 'fr' || saved === 'en' || saved === 'de')) {
      return saved as Language;
    }

    // Default for all visitors is French
    return 'fr';
  });

  // Navigation
  const [activeModule, setActiveModule] = useState<string>('ai');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const [isHeaderSettingsOpen, setIsHeaderSettingsOpen] = useState(false);
  const [isAdminUsersModalOpen, setIsAdminUsersModalOpen] = useState(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);

  // Persistent Institution Config
  const [institution, setInstitution] = useState<InstitutionConfig>(() => {
    const saved = localStorage.getItem('montessori_inst_config');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (!parsed.logoUrl || parsed.logoUrl.trim() === '') {
          parsed.logoUrl = DEFAULT_INSTITUTION.logoUrl || '/logo-prealpes.svg';
        }
        return parsed;
      } catch (e) {}
    }
    return DEFAULT_INSTITUTION;
  });

  // Persistent Observations
  const [observations, setObservations] = useState<ObservationSession[]>(() => {
    const saved = localStorage.getItem('montessori_observations_v3');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return [INITIAL_OBSERVATION];
  });

  // Persistent Lesson Plans
  const [lessonPlans, setLessonPlans] = useState<LessonPlan[]>(() => {
    const saved = localStorage.getItem('montessori_lessons_v3');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return DEFAULT_LESSON_PLANS;
  });

  // Persistent Routines
  const [routines, setRoutines] = useState<RoutineItem[]>(() => {
    const saved = localStorage.getItem('montessori_routines_v3');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return DEFAULT_ROUTINES;
  });

  // Persistent Quick Notes
  const [quickNotes, setQuickNotes] = useState<QuickDailyNote[]>(() => {
    const saved = localStorage.getItem('montessori_quick_notes_v3');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return [
      {
        id: 'qn-init-1',
        timestamp: '08:45',
        text: 'Vérification méticuleuse du matériel de vie pratique : carafes remplies, savon doux renouvelé et éponges sèches.',
        category: 'mediu',
        completed: true,
      },
    ];
  });

  // LocalStorage sync effects
  useEffect(() => {
    localStorage.setItem('montessori_lang_v3', currentLang);
    document.documentElement.lang = currentLang;
    const activeAppName = UI_TRANSLATIONS[currentLang]?.appName || 'Assistant Montessori';
    document.title = `${activeAppName} – ${institution.name}`;
  }, [currentLang, institution.name]);

  useEffect(() => {
    localStorage.setItem('montessori_inst_config', JSON.stringify(institution));
  }, [institution]);

  useEffect(() => {
    localStorage.setItem('montessori_observations_v3', JSON.stringify(observations));
  }, [observations]);

  useEffect(() => {
    localStorage.setItem('montessori_lessons_v3', JSON.stringify(lessonPlans));
  }, [lessonPlans]);

  useEffect(() => {
    localStorage.setItem('montessori_routines_v3', JSON.stringify(routines));
  }, [routines]);

  useEffect(() => {
    localStorage.setItem('montessori_quick_notes_v3', JSON.stringify(quickNotes));
  }, [quickNotes]);

  // Routine Handlers
  const handleToggleRoutine = (id: string) => {
    setRoutines((prev) =>
      prev.map((r) => (r.id === id ? { ...r, completed: !r.completed } : r))
    );
  };

  const handleResetRoutines = () => {
    setRoutines((prev) => prev.map((r) => ({ ...r, completed: false })));
  };

  // Quick Notes Handlers
  const handleAddNote = (newNote: Omit<QuickDailyNote, 'id'>) => {
    const noteWithId: QuickDailyNote = {
      ...newNote,
      id: 'qn-' + Date.now(),
    };
    setQuickNotes((prev) => [noteWithId, ...prev]);
  };

  const handleDeleteNote = (id: string) => {
    setQuickNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const handleToggleNote = (id: string) => {
    setQuickNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, completed: !n.completed } : n))
    );
  };

  // Observation Handlers
  const handleAddObservation = (obs: ObservationSession) => {
    setObservations((prev) => [obs, ...prev]);
  };

  const handleDeleteObservation = (id: string) => {
    setObservations((prev) => prev.filter((o) => o.id !== id));
  };

  const handleUpdateObservation = (updatedObs: ObservationSession) => {
    setObservations((prev) =>
      prev.map((o) => (o.id === updatedObs.id ? updatedObs : o))
    );
  };

  // Lesson Plan Handlers
  const handleAddLessonPlan = (plan: LessonPlan) => {
    setLessonPlans((prev) => [plan, ...prev]);
  };

  const handleDeleteLessonPlan = (id: string) => {
    setLessonPlans((prev) => prev.filter((l) => l.id !== id));
  };

  const handleImportData = (data: {
    observations: ObservationSession[];
    lessonPlans: LessonPlan[];
  }) => {
    if (data.observations) setObservations(data.observations);
    if (data.lessonPlans) setLessonPlans(data.lessonPlans);
  };

  const t = UI_TRANSLATIONS[currentLang];

  // Navigation Items with active language labels
  const navItems = [
    { id: 'ai', label: t.nav.ai, icon: Bot, isAi: true },
    { id: 'obs_modules', label: t.nav.obsModules, icon: ClipboardList },
    { id: 'lesson', label: t.nav.lesson, icon: FileText },
    { id: 'peace', label: t.nav.peace, icon: Heart },
    { id: 'calendar', label: t.nav.calendar, icon: CalendarIcon },
    { id: 'reports', label: t.nav.reports, icon: Printer },
  ];

  // Auth Loading Screen
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4F7F5] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-14 h-14 rounded-2xl bg-[#1F3A2B] text-[#D4A373] flex items-center justify-center mb-4 shadow-lg border border-[#2E5A44] animate-pulse">
          <Leaf className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-serif font-bold text-[#1F3A2B] tracking-wide">
          {t.appName}
        </h2>
        <p className="text-xs text-stone-500 mt-2">
          {currentLang === 'ro'
            ? 'Se încarcă sesiunea securizată...'
            : currentLang === 'en'
            ? 'Loading your secure session...'
            : currentLang === 'de'
            ? 'Ihre sichere Sitzung wird geladen...'
            : 'Chargement de votre session sécurisée...'}
        </p>
      </div>
    );
  }

  // Not authenticated: Display Auth Screen
  if (!currentUser) {
    return (
      <AuthScreen
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
      />
    );
  }

  const roleBadge = isAdmin
    ? '👑 Admin'
    : userProfile?.role === 'educator'
    ? currentLang === 'ro'
      ? '🌱 Educator'
      : currentLang === 'en'
      ? '🌱 Educator'
      : currentLang === 'de'
      ? '🌱 Pädagoge'
      : '🌱 Éducateur'
    : currentLang === 'de'
    ? '🎓 Kunde'
    : '🎓 Client';

  return (
    <div className="min-h-screen bg-[#F4F7F5] text-gray-900 font-sans flex flex-col selection:bg-[#D4A373]/30 selection:text-[#1F3A2B]">
      {/* Top Mobile Bar */}
      <header className="no-print lg:hidden bg-[#1F3A2B] text-white p-4 flex items-center justify-between shadow-md sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#2E5A44] border border-[#D4A373] p-1 flex items-center justify-center">
            <Leaf className="w-4 h-4 text-[#D4A373]" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-wide uppercase font-serif text-[#D4A373]">
              {t.appName}
            </h1>
            <p className="text-[10px] text-white/70 truncate max-w-[130px]">
              {userProfile?.displayName || currentUser.email}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile Manual Button */}
          <button
            type="button"
            onClick={() => setIsManualModalOpen(true)}
            className="px-2 py-1 bg-white/10 hover:bg-white/20 text-[#D4A373] hover:text-white rounded-lg flex items-center gap-1 text-[11px] font-bold border border-white/15 cursor-pointer"
            title={t.userManual}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="font-mono text-[9px] uppercase bg-[#2E5A44] text-white px-1 rounded-xs">PDF</span>
          </button>

          {/* Mobile Language Switcher */}
          <LanguageSwitcher
            currentLang={currentLang}
            onLanguageChange={setCurrentLang}
            variant="header"
            align="right"
          />

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1.5 text-white/80 hover:text-white cursor-pointer"
            aria-label="Deschide meniu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Main Body Layout */}
      <div className={`flex-1 flex w-full max-w-7xl mx-auto px-3 sm:px-6 py-4 md:py-6 gap-6 ${isPrintModalOpen || isManualModalOpen ? 'print:hidden' : ''}`}>
        {/* Desktop Sidebar Navigation */}
        <aside className="no-print hidden lg:flex flex-col w-64 shrink-0 space-y-4">
          {/* Logo & Title Card */}
          <div className="bg-gradient-to-br from-[#1F3A2B] to-[#2E5A44] p-4.5 rounded-2xl text-white shadow-md space-y-2 border border-[#2E5A44]/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-white/10 border border-[#D4A373] flex items-center justify-center shrink-0">
                  <Leaf className="w-5 h-5 text-[#D4A373]" />
                </div>
                <div>
                  <h2 className="text-base font-extrabold tracking-wide uppercase font-serif text-white">
                    {t.appName}
                  </h2>
                  <div className="text-[10px] uppercase tracking-widest text-[#D4A373] font-bold">
                    {t.appSubtitle}
                  </div>
                </div>
              </div>
              <LanguageSwitcher
                currentLang={currentLang}
                onLanguageChange={setCurrentLang}
                variant="header"
                align="left"
              />
            </div>
          </div>

          {/* User Account Card */}
          <div className="bg-white rounded-2xl p-3.5 border border-stone-200 shadow-xs space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-900 font-bold flex items-center justify-center text-xs shrink-0 border border-amber-200">
                  {userProfile?.displayName ? userProfile.displayName.charAt(0).toUpperCase() : (currentUser.email?.charAt(0).toUpperCase() || 'U')}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-stone-900 truncate">
                    {userProfile?.displayName || currentUser.displayName || currentUser.email?.split('@')[0]}
                  </p>
                  <p className="text-[10px] text-stone-500 font-mono truncate">
                    {currentUser.email}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-stone-100">
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200">
                {roleBadge}
              </span>
              <button
                type="button"
                onClick={logout}
                className="text-[11px] text-stone-500 hover:text-red-700 flex items-center gap-1 font-medium transition-colors cursor-pointer"
                title={
                  currentLang === 'ro'
                    ? 'Deconectare'
                    : currentLang === 'en'
                    ? 'Sign out'
                    : currentLang === 'de'
                    ? 'Abmelden'
                    : 'Se déconnecter'
                }
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>
                  {currentLang === 'ro'
                    ? 'Deconectare'
                    : currentLang === 'en'
                    ? 'Sign out'
                    : currentLang === 'de'
                    ? 'Abmelden'
                    : 'Déconnexion'}
                </span>
              </button>
            </div>

            {isAdmin && (
              <button
                type="button"
                onClick={() => setIsAdminUsersModalOpen(true)}
                className="w-full mt-1 py-1.5 px-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/80 text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Users className="w-3.5 h-3.5 text-amber-700" />
                <span>
                  {currentLang === 'ro'
                    ? 'Gestionare conturi utilizatori'
                    : currentLang === 'en'
                    ? 'Manage client accounts'
                    : currentLang === 'de'
                    ? 'Kundenkonten verwalten'
                    : 'Gérer les comptes clients'}
                </span>
              </button>
            )}
          </div>

          {/* Nav List */}
          <nav className="bg-white rounded-2xl p-2.5 border border-gray-200 shadow-sm space-y-1">
            <div className="px-3 py-1.5 text-[10px] uppercase font-bold tracking-wider text-gray-400">
              {t.modulesTitle}
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeModule === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveModule(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#2E5A44] text-white shadow-sm font-bold'
                      : 'text-gray-700 hover:bg-[#F4F7F5] hover:text-[#2E5A44]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon
                      className={`w-4 h-4 ${
                        isActive ? 'text-[#D4A373]' : 'text-gray-500'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>
                  {item.isAi && (
                    <span className="text-[9px] uppercase px-1.5 py-0.5 rounded-full bg-[#D4A373] text-[#1F3A2B] font-bold">
                      AI
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop User Manual Button */}
          <div className="pt-2 border-t border-gray-200">
            <button
              type="button"
              onClick={() => setIsManualModalOpen(true)}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#FAF7F2] hover:bg-[#F2ECE1] text-[#1F3A2B] border border-[#D4A373]/50 shadow-2xs hover:shadow-xs transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#D4A373] group-hover:scale-110 transition-transform" />
                <span>{t.userManual}</span>
              </div>
              <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 rounded-xs bg-[#2E5A44] text-white font-bold">
                PDF
              </span>
            </button>
          </div>

          <div className="text-[10px] text-center text-gray-400 font-mono pt-2">
            {institution.name}
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="no-print fixed inset-0 z-50 bg-black/50 backdrop-blur-xs lg:hidden flex justify-end">
            <div className="w-72 bg-white h-full p-5 flex flex-col justify-between shadow-2xl animate-slideLeft">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <span className="font-bold text-sm text-[#2E5A44]">Meniu / Menu</span>
                  <button type="button" onClick={() => setIsMobileMenuOpen(false)} className="cursor-pointer">
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                {/* Mobile User Status */}
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-900 font-bold flex items-center justify-center text-xs">
                      {userProfile?.displayName?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-stone-900 truncate">
                        {userProfile?.displayName || currentUser.email}
                      </p>
                      <span className="text-[10px] text-amber-800 font-medium">
                        {roleBadge}
                      </span>
                    </div>
                  </div>
                  {isAdmin && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsAdminUsersModalOpen(true);
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full py-1.5 px-2 bg-amber-100/70 text-amber-950 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5"
                    >
                      <Users className="w-3.5 h-3.5" />
                      <span>
                        {currentLang === 'ro'
                          ? 'Gestionare conturi utilizatori'
                          : currentLang === 'en'
                          ? 'Manage client accounts'
                          : currentLang === 'de'
                          ? 'Kundenkonten verwalten'
                          : 'Gérer les comptes clients'}
                      </span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={logout}
                    className="w-full py-1.5 px-2 bg-stone-200/80 hover:bg-stone-300 text-stone-700 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5"
                  >
                    <LogOut className="w-3.5 h-3.5 text-stone-500" />
                    <span>
                      {currentLang === 'ro'
                        ? 'Deconectare'
                        : currentLang === 'en'
                        ? 'Sign out'
                        : currentLang === 'de'
                        ? 'Abmelden'
                        : 'Déconnexion'}
                    </span>
                  </button>
                </div>

                {/* Mobile Drawer Language Switcher */}
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-xs font-semibold text-gray-600">Limbă / Language</span>
                  <LanguageSwitcher
                    currentLang={currentLang}
                    onLanguageChange={(l) => {
                      setCurrentLang(l);
                      setIsMobileMenuOpen(false);
                    }}
                    variant="compact"
                    align="right"
                  />
                </div>

                <nav className="space-y-1 pt-2">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeModule === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setActiveModule(item.id);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold cursor-pointer ${
                          isActive
                            ? 'bg-[#2E5A44] text-white font-bold'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </nav>

                {/* Mobile Drawer Manual Button */}
                <div className="pt-3 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => {
                      setIsManualModalOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold bg-[#FAF7F2] text-[#1F3A2B] border border-[#D4A373]/40 cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-[#D4A373]" />
                      <span>{t.userManual}</span>
                    </div>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-xs bg-[#2E5A44] text-white">
                      PDF
                    </span>
                  </button>
                </div>
              </div>

              <div className="text-[10px] text-center text-gray-400 font-mono">
                {institution.name}
              </div>
            </div>
          </div>
        )}

        {/* Main Workspace Area */}
        <main className="flex-1 min-w-0 space-y-6">
          {/* Institutional Header Banner with Logo & School Info */}
          <div className="no-print">
            <HeaderBanner
              config={institution}
              lang={currentLang}
              onOpenSettings={() => setIsHeaderSettingsOpen(true)}
            />
          </div>

          {/* Module Content */}
          <div className="no-print animate-fadeIn">
            {activeModule === 'obs_modules' && (
              <ObservationModulesPage
                lang={currentLang}
                institution={institution}
                observations={observations}
                onAddObservation={handleAddObservation}
                onDeleteObservation={handleDeleteObservation}
                onUpdateObservation={handleUpdateObservation}
                onOpenPrint={() => setIsPrintModalOpen(true)}
              />
            )}

            {activeModule === 'child_obs' && (
              <ChildObservationModule
                institution={institution}
                lang={currentLang}
              />
            )}

            {activeModule === 'calendar' && (
              <MontessoriCalendarModule
                institution={institution}
                lang={currentLang}
                onOpenPrint={() => setIsPrintModalOpen(true)}
              />
            )}

            {activeModule === 'obs' && (
              <ObservationModule
                observations={observations}
                onAddObservation={handleAddObservation}
                onDeleteObservation={handleDeleteObservation}
                onUpdateObservation={handleUpdateObservation}
                institution={institution}
                onOpenPrint={() => setIsPrintModalOpen(true)}
                lang={currentLang}
              />
            )}

            {activeModule === 'lesson' && (
              <LessonPlannerModule
                lessonPlans={lessonPlans}
                onAddLessonPlan={handleAddLessonPlan}
                onDeleteLessonPlan={handleDeleteLessonPlan}
                institution={institution}
                onOpenPrint={() => setIsPrintModalOpen(true)}
                lang={currentLang}
              />
            )}

            {activeModule === 'peace' && <PeaceBehaviorModule lang={currentLang} />}

            {activeModule === 'ai' && (
              <AiAssistantModule institution={institution} lang={currentLang} />
            )}

            {activeModule === 'reports' && (
              <ReportCenterModule
                institution={institution}
                observations={observations}
                lessonPlans={lessonPlans}
                onOpenPrint={() => setIsPrintModalOpen(true)}
                onOpenManual={() => setIsManualModalOpen(true)}
                onOpenVoiceStudio={() => setIsVoiceModalOpen(true)}
                onImportData={handleImportData}
                lang={currentLang}
              />
            )}
          </div>
        </main>
      </div>

      {/* Voice Dictation & PDF Export Studio Modal */}
      <VoiceDictationModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        currentLang={currentLang}
        institution={institution}
      />

      {/* Print / Export Report Modal */}
      <PrintReportModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        config={institution}
        activeObservations={observations}
        activeLessons={lessonPlans}
        lang={currentLang}
        onLanguageChange={setCurrentLang}
      />

      {/* Multilingual User & Installation Manual Modal */}
      <UserManualModal
        isOpen={isManualModalOpen}
        onClose={() => setIsManualModalOpen(false)}
        currentLang={currentLang}
      />

      {/* Header & School Logo Customization Modal */}
      <HeaderSettingsModal
        isOpen={isHeaderSettingsOpen}
        onClose={() => setIsHeaderSettingsOpen(false)}
        config={institution}
        onSave={setInstitution}
        lang={currentLang}
      />

      {/* Admin Client Accounts & Users Manager Modal */}
      <AdminUsersModal
        isOpen={isAdminUsersModalOpen}
        onClose={() => setIsAdminUsersModalOpen(false)}
        currentLang={currentLang}
      />

      {/* Footer */}
      <footer className="no-print mt-auto py-5 bg-white border-t border-gray-200 text-center text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-x-4 gap-y-2 text-center">
          <div className="flex items-center justify-center gap-2 text-[#2E5A44] font-semibold">
            <Leaf className="w-4 h-4 text-[#D4A373]" />
            <span>{t.appName} — {institution.name}</span>
          </div>

          <span className="text-gray-300 hidden sm:inline">•</span>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setIsManualModalOpen(true)}
              className="flex items-center gap-1.5 text-xs text-[#2E5A44] hover:text-[#1F3A2B] font-bold underline underline-offset-2 cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#D4A373]" />
              <span>{t.userManual}</span>
            </button>
            <span className="text-gray-300 hidden sm:inline">•</span>
            <p className="text-xs text-gray-500 font-medium">
              {t.footer.standard}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainAppContent />
    </AuthProvider>
  );
}
