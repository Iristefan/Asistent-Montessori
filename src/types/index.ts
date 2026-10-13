export type Language = 'ro' | 'fr' | 'en' | 'de';

export interface InstitutionConfig {
  name: string;
  subtitle: string;
  contact: string;
  address?: string;
  phone?: string;
  email?: string;
  logoUrl?: string; // base64 or SVG
}

export type ObservationPhase = string;

export interface ObservationSession {
  id: string;
  date: string;
  startTime: string;
  groupCount: string;
  weather: string;
  phase: ObservationPhase;
  notes: string;
  reflection: string;
  aiFeedback?: string;
  createdAt: number;
}

export interface LessonPlan {
  id: string;
  title: string;
  subject: string;
  level: string;
  albumRef: string;
  directAim: string;
  indirectAims?: string;
  hots1: string; // Analiză / Comparare
  hots2: string; // Evaluare / Creație
  follow1: string; // Practică / Replicare cu materialul
  follow2: string; // Aplicație / Extindere creativă
  materials?: string;
  pointOfInterest?: string;
  createdAt: number;
}

export interface QuickDailyNote {
  id: string;
  date: string;
  text: string;
  category: 'mediu' | 'material' | 'copil' | 'general';
  completed: boolean;
}

export interface RoutineItem {
  id: string;
  label: string;
  category: 'dimineata' | 'lucru' | 'dupa-amiaza';
  completed: boolean;
}

export interface DictionaryTerm {
  id: string;
  termRo: string;
  termOriginal: string;
  category: string;
  definition: string;
  practicalApplication: string;
  quote?: string;
}

export interface PraiseScenario {
  id: string;
  situation: string;
  category: string;
  praiseRo: string;
  explanation: string;
}

export type AssessmentStatus = 'mastered' | 'practicing' | 'presented' | 'unaddressed';

export interface DomainAssessment {
  status: AssessmentStatus;
  notes: string;
}

export interface ChildObservationRecord {
  id: string;
  childName: string;
  childAge: string;
  childLevel: string;
  date: string;
  observerName: string;
  domains: {
    practicalLife: DomainAssessment;
    sensorial: DomainAssessment;
    language: DomainAssessment;
    mathStem: DomainAssessment;
    cultural: DomainAssessment;
    socialEmotional: DomainAssessment;
  };
  generalObs: string;
  nextSteps: string;
  createdAt: number;
}

export type MontessoriEventCategory = 'founder' | 'peace' | 'cosmic' | 'tradition';

export interface MontessoriCalendarEvent {
  id: string;
  month: number; // 1 - 12
  day?: number; // specific day or undefined for movable
  title: Record<Language, string>;
  subtitle: Record<Language, string>;
  category: MontessoriEventCategory;
  dateDisplay: Record<Language, string>;
  historicalContext: Record<Language, string>;
  pedagogicalMeaning: Record<Language, string>;
  classroomActivities: Record<Language, {
    toddler?: string;
    casa?: string;
    elementary?: string;
  }>;
  recommendedMaterials: Record<Language, string[]>;
  montessoriQuote: Record<Language, { text: string; source: string }>;
  iconName?: string;
}
