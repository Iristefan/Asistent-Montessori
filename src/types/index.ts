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
  title: string; // Titlu prezentare
  subject: string; // Domeniu de activitate
  ageGroup: string; // Grupa de vârstă
  level?: string; // Backward compatibility
  duration: string; // Timpul alocat (ex: "15 - 20 minute")
  materials: string; // Material necesar pentru prezentare
  pointOfInterest: string; // Punct de interes
  directAim: string; // Obiectiv direct
  indirectAim: string; // Obiectiv indirect
  procedure: string; // Desfășurare lecție cu bullet points
  followUpWork: string; // Propuneri de follow up work
  crossCurricular: string; // Propuneri de follow up work transdisciplinar
  albumRef?: string; // Deprecated
  indirectAims?: string; // Deprecated
  hots1?: string; // Deprecated
  hots2?: string; // Deprecated
  follow1?: string; // Deprecated
  follow2?: string; // Deprecated
  createdAt: number;
}

export type PresentationPlan = LessonPlan;


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
