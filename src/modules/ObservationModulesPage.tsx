import React, { useState, useEffect } from 'react';
import { InstitutionConfig, ObservationSession } from '../types';
import { Language } from '../i18n/translations';
import { ObservationModule } from './ObservationModule';
import { ChildObservationModule } from './ChildObservationModule';
import { ChildFocusedAudioObservationModule } from './ChildFocusedAudioObservationModule';
import { SpeechToTextButton } from '../components/SpeechToTextButton';
import { AutoResizeTextarea } from '../components/AutoResizeTextarea';
import { jsPDF } from 'jspdf';
import {
  ClipboardList,
  Users,
  Eye,
  GraduationCap,
  CheckCircle2,
  FileDown,
  Plus,
  Trash2,
  Calendar,
  Clock,
  Sparkles,
  BookOpen,
  HeartHandshake,
  ShieldCheck,
  Mic,
} from 'lucide-react';

interface ObservationModulesPageProps {
  lang: Language;
  institution: InstitutionConfig;
  observations: ObservationSession[];
  onAddObservation: (obs: ObservationSession) => void;
  onDeleteObservation: (id: string) => void;
  onUpdateObservation: (obs: ObservationSession) => void;
  onOpenPrint: () => void;
}

type ProtocolTab = 'visitor' | 'assistant' | 'teacher' | 'child_focus';

interface VisitorObservationEntry {
  id: string;
  visitorName: string;
  visitorRole: string;
  date: string;
  timeSlot: string;
  classroomLevel: string;
  environmentNotes: string;
  independenceNotes: string;
  concentrationNotes: string;
  socialGraceNotes: string;
  questionsForGuide: string;
  checkedCriteria: string[];
  createdAt: number;
}

const PROTOCOL_TEXTS: Record<
  Language,
  {
    pageTitle: string;
    pageSubtitle: string;
    tabs: {
      visitor: {
        title: string;
        badge: string;
        shortDesc: string;
      };
      assistant: {
        title: string;
        badge: string;
        shortDesc: string;
      };
      teacher: {
        title: string;
        badge: string;
        shortDesc: string;
      };
      child_focus: {
        title: string;
        badge: string;
        shortDesc: string;
      };
    };
    visitorProtocol: {
      bannerTitle: string;
      bannerSubtitle: string;
      etiquetteTitle: string;
      etiquetteRules: { title: string; desc: string }[];
      checklistTitle: string;
      checklistSubtitle: string;
      checklistItems: { id: string; text: string }[];
      formTitle: string;
      visitorNameLabel: string;
      visitorNamePlaceholder: string;
      visitorRoleLabel: string;
      roles: { parent: string; prospectiveParent: string; guestEducator: string; observer: string };
      dateLabel: string;
      timeSlotLabel: string;
      classroomLabel: string;
      classrooms: { nido: string; casa: string; elementary: string };
      dim1Title: string;
      dim1Hint: string;
      dim2Title: string;
      dim2Hint: string;
      dim3Title: string;
      dim3Hint: string;
      dim4Title: string;
      dim4Hint: string;
      questionsTitle: string;
      questionsHint: string;
      saveBtn: string;
      exportPdfBtn: string;
      savedSessionsTitle: string;
      noSavedSessions: string;
      deleteTooltip: string;
      loadBtn: string;
    };
    assistantBanner: {
      title: string;
      subtitle: string;
      pillars: { title: string; desc: string }[];
    };
    teacherBanner: {
      title: string;
      subtitle: string;
      pillars: { title: string; desc: string }[];
    };
  }
> = {
  ro: {
    pageTitle: 'Module de observare',
    pageSubtitle:
      'Protocoale diferențiate de observare Montessori pentru Vizitatori / Părinți, Asistenți Montessori și Profesori / Ghizi Montessori',
    tabs: {
      visitor: {
        title: 'Protocol Vizitator / Părinte',
        badge: 'Vizitator & Părinte',
        shortDesc: 'Ghid de etichetă în clasă, grilă de observare ghidată și fișă de reflecție pentru părinți și vizitatori.',
      },
      assistant: {
        title: 'Protocol Asistent Montessori',
        badge: 'Asistent Montessori',
        shortDesc: 'Protocolul zilnic de observație practică pe 4 etape: mediul pregătit, observația la 5 minute, interacțiuni și sinteză.',
      },
      teacher: {
        title: 'Protocol Profesor Montessori',
        badge: 'Profesor / Ghid',
        shortDesc: 'Evaluare formativă științifică pe cele 6 domenii curriculare, urmărirea normalizării și planificarea prezentărilor.',
      },
      child_focus: {
        title: 'Observare Individuală pe Copil (Audio)',
        badge: 'Focus Copil & Audio',
        shortDesc: 'Înregistrări audio vocale, detectare copil menționat, istoric individual pe dosar și raport PDF per copil.',
      },
    },
    visitorProtocol: {
      bannerTitle: 'Protocol de Observare pentru Vizitator / Părinte',
      bannerSubtitle:
        'Observarea într-o clasă Montessori este o fereastră către independența, concentrarea și armonia socială a copilului.',
      etiquetteTitle: 'Regulile de Aur pentru Părinți și Vizitatori în Clasa Montessori',
      etiquetteRules: [
        {
          title: '1. Locul de observare și liniștea',
          desc: 'Așezați-vă pe scaunul desemnat pentru observator. Păstrați liniștea și o postură calmă pentru a nu atrage atenția copiilor din timpul ciclului de lucru.',
        },
        {
          title: '2. Neintervenția și respectarea muncii',
          desc: 'Dacă un copil vă salută, răspundeți cald și scurt, apoi lăsați-l să se întoarcă la activitatea sa. Nu inițiați conversații și nu corectați munca copiilor.',
        },
        {
          title: '3. Privire obiectivă și fără etichetări',
          desc: 'Observați cu curiozitate și blândețe: cum își aleg copiii singuri materialele, cum le transportă cu grijă și cum își corectează singuri erorile.',
        },
        {
          title: '4. Confidențialitate și telefoane oprite',
          desc: 'Pentru a proteja intimitatea și concentrarea copiilor, fotografierea și utilizarea telefonului nu sunt permise în timpul observării.',
        },
      ],
      checklistTitle: 'Repere de Urmărit în Timpul Vizitei (Grilă de Observare)',
      checklistSubtitle: 'Bifați aspectele pe care le-ați remarcat în timpul sesiunii de observare în clasă:',
      checklistItems: [
        { id: 'c1', text: 'Copiii își aleg singuri activitățile de pe rafturi, în funcție de propriul interes interior.' },
        { id: 'c2', text: 'Materialele sunt așezate ordonat, la înălțimea copiilor, în câte un singur exemplar.' },
        { id: 'c3', text: 'Copiii lucrează pe covorașe individuale sau la măsuțe, respectând spațiul de lucru al colegilor.' },
        { id: 'c4', text: 'Se observă momente de concentrare profundă și repetiție spontană a exercițiului.' },
        { id: 'c5', text: 'Copiii mai mari îi ajută cu naturalețe pe cei mai mici (comunitate de vârste mixte).' },
        { id: 'c6', text: 'La finalul activității, copilul strânge materialul și îl readuce la locul său pe raft, pregătit pentru următorul coleg.' },
        { id: 'c7', text: 'Adulții vorbesc cu voce scăzută, intervin rar și prezintă materialele individual sau în grupuri foarte mici.' },
        { id: 'c8', text: 'Materialul conține „controlul erorii” (copilul descoperă și corectează singur eventuala nepotrivire).' },
      ],
      formTitle: 'Fișă de Observare și Reflecție (Vizitator / Părinte)',
      visitorNameLabel: 'Numele Vizitatorului / Părintelui',
      visitorNamePlaceholder: 'ex: Elena Popescu',
      visitorRoleLabel: 'Calitatea Observatorului',
      roles: {
        parent: 'Părinte în cadrul școlii',
        prospectiveParent: 'Părinte în vizită de cunoaștere',
        guestEducator: 'Cadru didactic / Vizitator educațional',
        observer: 'Observator invitat',
      },
      dateLabel: 'Data observării',
      timeSlotLabel: 'Interval orar',
      classroomLabel: 'Comunitatea / Nivelul observat',
      classrooms: {
        nido: 'Comunitatea Infantilă / Toddler (0–3 ani)',
        casa: 'Casa dei Bambini / Grădiniță (3–6 ani)',
        elementary: 'Școala Primară Montessori (6–12 ani)',
      },
      dim1Title: '1. Mediul Pregătit și Atmosfera Clasei',
      dim1Hint: 'Ce ați remarcat privind ordinea, lumina, armonia și accesibilitatea materialelor pentru copii?',
      dim2Title: '2. Independența și Alegerea Liberă („Ajută-mă să fac singur”)',
      dim2Hint: 'Cum ați observat autonomia copiilor (îngrijirea personală, pregătirea gustării, alegerea și strângerea materialului)?',
      dim3Title: '3. Concentrarea, Ritmul Propriu și Bucuria Lucrului',
      dim3Hint: 'Descrieți o activitate sau un moment în care un copil a lucrat cu atenție și satisfacție interioară:',
      dim4Title: '4. Grația, Curtoazia și Armonia Socială',
      dim4Hint: 'Cum comunică copiii între ei și cu adulții? Cum așteaptă rândul sau cum rezolvă pașnic o neînțelegere?',
      questionsTitle: '5. Întrebări și Impresii pentru Discuția cu Profesorul / Ghidul Montessori',
      questionsHint: 'Notați curiozitățile sau aspectele pe care doriți să le aprofundați împreună cu educatorul după observare:',
      saveBtn: 'Salvează Fișa de Observare',
      exportPdfBtn: 'Descarcă Fișa PDF (A4)',
      savedSessionsTitle: 'Fișe de Observare Vizitator / Părinte Salvate',
      noSavedSessions: 'Nicio fișă salvată încă. Completați formularul de mai sus pentru a salva sau exporta PDF.',
      deleteTooltip: 'Șterge fișa',
      loadBtn: 'Încarcă în formular',
    },
    assistantBanner: {
      title: 'Protocol de Observare pentru Asistentul Montessori',
      subtitle:
        'Structurat pentru protejarea ciclului neîntrerupt de 3 ore, observarea obiectivă a ambianței și sprijinirea discretă a profesorului Montessori.',
      pillars: [
        {
          title: 'Privire Panoramică asupra Clasei',
          desc: 'Asistentul observă fluxul general al clasei, protejând prezentările individuale oferite de profesorul Montessori.',
        },
        {
          title: 'Fapte Obiective, Fără Judecăți',
          desc: 'Înregistrarea fidelă a mișcărilor, alegerilor și interacțiunilor la intervale de 5 minute, evitând etichetările subiective.',
        },
        {
          title: 'Pregătirea și Ordinea Mediului',
          desc: 'Urmărirea stării materialelor pe rafturi, a curățeniei și a armoniei din mediul pregătit.',
        },
      ],
    },
    teacherBanner: {
      title: 'Protocol de Observare pentru Profesorul / Ghidul Montessori',
      subtitle:
        'Evaluare formativă individuală pe cele 6 arii curriculare, diagnosticarea perioadelor sensibile și planificarea următoarelor prezentări (Next Steps).',
      pillars: [
        {
          title: 'Progresul pe Cele 6 Arii Curriculare',
          desc: 'Urmărirea stadiului fiecărui material: Prezentat, În Exersare sau Stăpânit / Normalizat.',
        },
        {
          title: 'Curba Muncii și Polarizarea Atenției',
          desc: 'Observarea duratei concentrării profunde, a repetiției și a independenței dobândite de copil.',
        },
        {
          title: 'Planificarea Prezentărilor Viitoare',
          desc: 'Alegerea momentului optim pentru o nouă lecție în 3 timpi sau o provocare superioară.',
        },
      ],
    },
  },

  fr: {
    pageTitle: 'Modules d’observation',
    pageSubtitle:
      'Protocoles d’observation Montessori différenciés pour Visiteurs / Parents, Assistants Montessori et Éducateurs / Guides Montessori',
    tabs: {
      visitor: {
        title: 'Protocole Visiteur / Parent',
        badge: 'Visiteur & Parent',
        shortDesc: 'Charte de l’observateur en classe, grille d’observation guidée et fiche de réflexion pour les parents et visiteurs.',
      },
      assistant: {
        title: 'Protocole Assistant Montessori',
        badge: 'Assistant Montessori',
        shortDesc: 'Protocole quotidien d’observation pratique en 4 phases : environnement préparé, suivi toutes les 5 min, interactions et synthèse.',
      },
      teacher: {
        title: 'Protocole Éducateur Montessori',
        badge: 'Éducateur / Guide',
        shortDesc: 'Évaluation formative scientifique sur les 6 domaines du curriculum, suivi de la normalisation et prochaines présentations.',
      },
      child_focus: {
        title: 'Observation Individuelle de l’Enfant (Audio)',
        badge: 'Focus Enfant & Audio',
        shortDesc: 'Enregistrements vocaux, détection enfant, historique individuel par dossier et rapport individuel PDF.',
      },
    },
    visitorProtocol: {
      bannerTitle: 'Protocole d’Observation pour Visiteur / Parent',
      bannerSubtitle:
        'L’observation dans une classe Montessori est une fenêtre privilégiée sur l’autonomie, la concentration et l’harmonie sociale de l’enfant.',
      etiquetteTitle: 'Les Règles d’Or pour les Parents et Visiteurs dans la Classe Montessori',
      etiquetteRules: [
        {
          title: '1. Posture calme et chaise d’observation',
          desc: 'Installez-vous sur la chaise prévue pour l’observateur. Gardez le silence et une présence discrète afin de ne pas interrompre le cycle de travail.',
        },
        {
          title: '2. Non-intervention et respect du travail',
          desc: 'Si un enfant vient vous saluer, répondez avec douceur et brièveté, puis laissez-le retourner à son activité sans engager de longue conversation.',
        },
        {
          title: '3. Regard bienveillant et objectif',
          desc: 'Observez comment les enfants choisissent librement leur matériel, le manipulent avec soin et corrigent eux-mêmes leurs erreurs.',
        },
        {
          title: '4. Confidentialité et appareils éteints',
          desc: 'Par respect pour l’intimité et la concentration des enfants, les photos et l’usage du téléphone ne sont pas autorisés en classe.',
        },
      ],
      checklistTitle: 'Points d’Attention durant la Visite (Grille d’Observation)',
      checklistSubtitle: 'Cochez les éléments que vous avez pu observer durant votre séance en classe :',
      checklistItems: [
        { id: 'c1', text: 'Les enfants choisissent librement leurs activités sur les étagères selon leur élan intérieur.' },
        { id: 'c2', text: 'Le matériel est ordonné, esthétique, adapté à la taille de l’enfant et présent en exemplaire unique.' },
        { id: 'c3', text: 'Les enfants travaillent sur un tapis ou à une table en respectant l’espace de travail d’autrui.' },
        { id: 'c4', text: 'On observe des moments de concentration profonde et de répétition spontanée du geste.' },
        { id: 'c5', text: 'L’entraide naturelle s’exerce entre les enfants d’âges mélangés.' },
        { id: 'c6', text: 'Une fois l’activité terminée, l’enfant range son matériel sur l’étagère, prêt pour le suivant.' },
        { id: 'c7', text: 'Les adultes parlent à voix basse, interviennent peu et présentent le matériel individuellement.' },
        { id: 'c8', text: 'Le matériel offre un « contrôle de l’erreur » permettant à l’enfant de s’auto-corriger sans jugement.' },
      ],
      formTitle: 'Fiche d’Observation et de Réflexion (Visiteur / Parent)',
      visitorNameLabel: 'Nom du Visiteur / Parent',
      visitorNamePlaceholder: 'ex: Claire Martin',
      visitorRoleLabel: 'Qualité de l’Observateur',
      roles: {
        parent: 'Parent d’élève de l’école',
        prospectiveParent: 'Parent en visite de découverte',
        guestEducator: 'Professionnel de l’éducation / Visiteur',
        observer: 'Observateur invité',
      },
      dateLabel: 'Date d’observation',
      timeSlotLabel: 'Créneau horaire',
      classroomLabel: 'Communauté / Ambiance observée',
      classrooms: {
        nido: 'Communauté Enfantine / Nido (0–3 ans)',
        casa: 'Maison des Enfants / 3–6 ans',
        elementary: 'École Élémentaire Montessori (6–12 ans)',
      },
      dim1Title: '1. L’Environnement Préparé et l’Atmosphère de la Classe',
      dim1Hint: 'Qu’avez-vous remarqué concernant l’ordre, la beauté, le calme et l’accessibilité du matériel ?',
      dim2Title: '2. L’Autonomie et le Libre Choix (« Aide-moi à faire seul »)',
      dim2Hint: 'Comment se manifeste l’indépendance des enfants (soin de soi, préparation de la collation, choix et rangement) ?',
      dim3Title: '3. La Concentration, le Rythme Propre et la Joie du Travail',
      dim3Hint: 'Décrivez une scène ou une activité où un enfant a fait preuve d’une attention soutenue et sereine :',
      dim4Title: '4. La Grâce, la Courtoisie et la Vie Sociale',
      dim4Hint: 'Comment les enfants interagissent-ils entre eux et avec les adultes ? Comment respectent-ils le travail des autres ?',
      questionsTitle: '5. Questions et Impressions pour l’Échange avec l’Éducateur Montessori',
      questionsHint: 'Notez vos questions ou les points que vous souhaitez aborder lors de votre entretien après l’observation :',
      saveBtn: 'Enregistrer la Fiche',
      exportPdfBtn: 'Télécharger en PDF (A4)',
      savedSessionsTitle: 'Fiches d’Observation Visiteur / Parent Enregistrées',
      noSavedSessions: 'Aucune fiche enregistrée. Remplissez le formulaire ci-dessus pour sauvegarder ou exporter en PDF.',
      deleteTooltip: 'Supprimer la fiche',
      loadBtn: 'Charger dans le formulaire',
    },
    assistantBanner: {
      title: 'Protocole d’Observation pour l’Assistant Montessori',
      subtitle:
        'Conçu pour protéger le cycle de travail ininterrompu de 3 heures, observer objectivement l’ambiance et soutenir discrètement l’éducateur.',
      pillars: [
        {
          title: 'Vision Panoramique de l’Ambiance',
          desc: 'L’assistant veille sur l’harmonie globale du groupe afin de préserver les présentations individuelles du guide.',
        },
        {
          title: 'Faits Objectifs sans Jugement',
          desc: 'Relevé factuel des déplacements, choix et interactions toutes les 5 minutes, sans interprétation subjective.',
        },
        {
          title: 'Maintien de l’Environnement Préparé',
          desc: 'Vérification de l’intégrité, de l’ordre et de la propreté du matériel sur les étagères.',
        },
      ],
    },
    teacherBanner: {
      title: 'Protocole d’Observation pour l’Éducateur / Guide Montessori',
      subtitle:
        'Évaluation formative individuelle sur les 6 aires du curriculum, repérage des périodes sensibles et planification des prochaines présentations.',
      pillars: [
        {
          title: 'Suivi des 6 Domaines du Curriculum',
          desc: 'Observation précise du stade d’acquisition : Présenté, En Exercice ou Maîtrisé / Normalisé.',
        },
        {
          title: 'Courbe du Travail & Polarisation de l’Attention',
          desc: 'Analyse de la concentration profonde, de la répétition spontanée et de l’autonomie.',
        },
        {
          title: 'Planification des Présentations (Next Steps)',
          desc: 'Identification du moment opportun pour une nouvelle leçon en trois temps ou une extension.',
        },
      ],
    },
  },

  en: {
    pageTitle: 'Observation Modules',
    pageSubtitle:
      'Differentiated Montessori observation protocols for Visitors / Parents, Montessori Assistants, and Montessori Teachers / Guides',
    tabs: {
      visitor: {
        title: 'Visitor / Parent Protocol',
        badge: 'Visitor & Parent',
        shortDesc: 'Classroom observation etiquette, guided observation checklist, and reflection form for parents and visitors.',
      },
      assistant: {
        title: 'Montessori Assistant Protocol',
        badge: 'Montessori Assistant',
        shortDesc: 'Daily practical observation protocol across 4 stages: prepared environment, 5-minute tracking, interactions, and synthesis.',
      },
      teacher: {
        title: 'Montessori Teacher Protocol',
        badge: 'Teacher / Guide',
        shortDesc: 'Scientific formative assessment across the 6 curriculum areas, normalization tracking, and next presentation planning.',
      },
      child_focus: {
        title: 'Child-Focused Individual Observation (Audio)',
        badge: 'Child Focus & Audio',
        shortDesc: 'Voice audio recordings, child detection, individual history dossiers, and individual PDF reports.',
      },
    },
    visitorProtocol: {
      bannerTitle: 'Observation Protocol for Visitor / Parent',
      bannerSubtitle:
        'Observing a Montessori classroom offers a window into the child’s independence, deep concentration, and social harmony.',
      etiquetteTitle: 'Golden Rules for Parents and Visitors in the Montessori Classroom',
      etiquetteRules: [
        {
          title: '1. Designated chair and quiet presence',
          desc: 'Please remain seated on the designated observation chair. Maintain a calm, quiet presence so children remain immersed in their work.',
        },
        {
          title: '2. Non-intervention and respect for work',
          desc: 'If a child greets you, respond warmly and briefly, then allow them to return to their work without initiating conversation.',
        },
        {
          title: '3. Objective, appreciative observation',
          desc: 'Notice how children freely choose their materials, handle them with care, and discover solutions independently.',
        },
        {
          title: '4. Confidentiality and phones silenced',
          desc: 'To respect every child’s privacy and concentration, photography and mobile phone use are not permitted inside the classroom.',
        },
      ],
      checklistTitle: 'What to Look For During Your Visit (Guided Checklist)',
      checklistSubtitle: 'Check the Montessori elements you noticed during your classroom observation:',
      checklistItems: [
        { id: 'c1', text: 'Children freely choosing their own activities from the shelves according to inner interest.' },
        { id: 'c2', text: 'Materials arranged in order, at child height, with one complete set of each activity.' },
        { id: 'c3', text: 'Children working on floor mats or tables while respecting classmates’ workspaces.' },
        { id: 'c4', text: 'Moments of deep concentration and spontaneous repetition of an exercise.' },
        { id: 'c5', text: 'Older children naturally assisting or modeling for younger classmates (mixed-age community).' },
        { id: 'c6', text: 'Upon finishing, the child returns the material neatly to the shelf ready for the next person.' },
        { id: 'c7', text: 'Adults speaking softly, intervening minimally, and giving individual or small-group lessons.' },
        { id: 'c8', text: 'Built-in “control of error” allowing the child to self-correct independently.' },
      ],
      formTitle: 'Visitor / Parent Observation & Reflection Sheet',
      visitorNameLabel: 'Visitor / Parent Name',
      visitorNamePlaceholder: 'e.g. Sarah Johnson',
      visitorRoleLabel: 'Observer Role',
      roles: {
        parent: 'Current School Parent',
        prospectiveParent: 'Prospective Parent (Discovery Visit)',
        guestEducator: 'Visiting Educator / Professional',
        observer: 'Guest Observer',
      },
      dateLabel: 'Observation Date',
      timeSlotLabel: 'Time Slot',
      classroomLabel: 'Observed Community / Level',
      classrooms: {
        nido: 'Infant / Toddler Community (0–3 years)',
        casa: 'Children’s House / Casa dei Bambini (3–6 years)',
        elementary: 'Montessori Elementary (6–12 years)',
      },
      dim1Title: '1. The Prepared Environment & Classroom Atmosphere',
      dim1Hint: 'What did you notice about the order, beauty, calm atmosphere, and accessibility of materials?',
      dim2Title: '2. Independence & Free Choice (“Help me to do it myself”)',
      dim2Hint: 'How did you see children practicing independence (self-care, snack preparation, choosing and returning work)?',
      dim3Title: '3. Concentration, Natural Rhythm & Joy of Work',
      dim3Hint: 'Describe a moment or activity where a child showed sustained focus and inner satisfaction:',
      dim4Title: '4. Grace, Courtesy & Social Harmony',
      dim4Hint: 'How do children communicate with peers and adults? How do they take turns or resolve disagreements peacefully?',
      questionsTitle: '5. Questions & Impressions for Follow-Up with the Montessori Guide',
      questionsHint: 'Write down any questions or insights you would like to discuss with the teacher after your observation:',
      saveBtn: 'Save Observation Sheet',
      exportPdfBtn: 'Download PDF (A4)',
      savedSessionsTitle: 'Saved Visitor / Parent Observation Sheets',
      noSavedSessions: 'No saved sheets yet. Complete the form above to save or export as PDF.',
      deleteTooltip: 'Delete sheet',
      loadBtn: 'Load into form',
    },
    assistantBanner: {
      title: 'Observation Protocol for the Montessori Assistant',
      subtitle:
        'Designed to protect the uninterrupted 3-hour work cycle, objectively observe the environment, and discreetly support the Montessori Guide.',
      pillars: [
        {
          title: 'Panoramic Classroom Awareness',
          desc: 'The assistant monitors the overall flow of the environment while protecting the guide’s one-on-one presentations.',
        },
        {
          title: 'Objective Facts Without Labeling',
          desc: 'Factual recording of movement, choices, and interactions at 5-minute intervals without subjective judgment.',
        },
        {
          title: 'Prepared Environment Stewardship',
          desc: 'Ensuring materials on the shelves remain complete, orderly, and inviting for the children.',
        },
      ],
    },
    teacherBanner: {
      title: 'Observation Protocol for the Montessori Teacher / Guide',
      subtitle:
        'Individual formative assessment across the 6 curriculum areas, sensitive period identification, and planning next presentations (Next Steps).',
      pillars: [
        {
          title: '6 Curriculum Areas Progression',
          desc: 'Tracking each material’s mastery stage: Presented, Practicing, or Mastered / Normalized.',
        },
        {
          title: 'Curve of Work & Polarization of Attention',
          desc: 'Observing deep concentration duration, spontaneous repetition, and self-regulation.',
        },
        {
          title: 'Planning Future Presentations',
          desc: 'Selecting the optimal moment for a new Three-Period Lesson or advanced extension.',
        },
      ],
    },
  },

  de: {
    pageTitle: 'Beobachtungsmodule',
    pageSubtitle:
      'Differenzierte Montessori-Beobachtungsprotokolle für Besucher / Eltern, Montessori-Assistenten und Montessori-Pädagogen',
    tabs: {
      visitor: {
        title: 'Protokoll Besucher / Eltern',
        badge: 'Besucher & Eltern',
        shortDesc: 'Verhaltensregeln bei der Hospitation, geführte Beobachtungsliste und Reflexionsbogen für Eltern und Gäste.',
      },
      assistant: {
        title: 'Protokoll Montessori-Assistent',
        badge: 'Montessori-Assistent',
        shortDesc: 'Tägliches praktisches Beobachtungsprotokoll in 4 Phasen: vorbereitete Umgebung, 5-Minuten-Intervalle, Interaktionen und Synthese.',
      },
      teacher: {
        title: 'Protokoll Montessori-Pädagoge',
        badge: 'Pädagoge / Leitung',
        shortDesc: 'Wissenschaftliche formative Bewertung über die 6 Curriculumbereiche, Normalisierung und Planung nächster Darbietungen.',
      },
      child_focus: {
        title: 'Kindzentrierte Einzelbeobachtung (Audio)',
        badge: 'Kind-Fokus & Audio',
        shortDesc: 'Sprachaufnahmen, automatische Kinderkennung, individueller Verlauf und Einzelbericht-PDF.',
      },
    },
    visitorProtocol: {
      bannerTitle: 'Beobachtungsprotokoll für Besucher / Eltern',
      bannerSubtitle:
        'Die Beobachtung in einem Montessori-Kinderhaus oder einer Schule eröffnet einen authentischen Einblick in Selbstständigkeit, Konzentration und soziale Harmonie.',
      etiquetteTitle: 'Goldene Regeln für Eltern und Besucher im Montessori-Raum',
      etiquetteRules: [
        {
          title: '1. Beobachtungsstuhl und ruhige Präsenz',
          desc: 'Bitte nehmen Sie auf dem vorgesehenen Beobachtungsstuhl Platz. Verhalten Sie sich ruhig, um die Freiarbeit der Kinder nicht zu unterbrechen.',
        },
        {
          title: '2. Nichteinmischung und Achtung der Arbeit',
          desc: 'Wenn ein Kind Sie begrüßt, antworten Sie freundlich und kurz, damit es ungestört zu seiner Tätigkeit zurückkehren kann.',
        },
        {
          title: '3. Wohlwollender, objektiver Blick',
          desc: 'Beobachten Sie, wie Kinder ihre Arbeit frei wählen, sorgfältig mit dem Material umgehen und Fehler selbstständig korrigieren.',
        },
        {
          title: '4. Vertraulichkeit und ausgeschaltetes Telefon',
          desc: 'Zum Schutz der Privatsphäre und Konzentration der Kinder sind Fotos und Telefonnutzung während der Beobachtung nicht gestattet.',
        },
      ],
      checklistTitle: 'Beobachtungsschwerpunkte während Ihres Besuchs (Checkliste)',
      checklistSubtitle: 'Markieren Sie die Aspekte, die Sie während Ihrer Hospitation wahrgenommen haben:',
      checklistItems: [
        { id: 'c1', text: 'Kinder wählen ihre Aktivitäten selbstständig aus den Regalen nach eigenem Interesse.' },
        { id: 'c2', text: 'Materialien sind geordnet, auf Kinderhöhe zugänglich und jeweils nur einmal vorhanden.' },
        { id: 'c3', text: 'Kinder arbeiten auf Arbeitsteppichen oder an Tischen und achten den Arbeitsbereich anderer.' },
        { id: 'c4', text: 'Phasen tiefer Konzentration und spontaner Wiederholung einer Übung sind sichtbar.' },
        { id: 'c5', text: 'Ältere Kinder helfen jüngeren Kindern auf natürliche Weise (altersgemischte Gruppe).' },
        { id: 'c6', text: 'Nach Beendigung der Arbeit räumt das Kind das Material vollständig zurück ins Regal.' },
        { id: 'c7', text: 'Erwachsene sprechen leise, greifen zurückhaltend ein und geben Einzeldarbietungen.' },
        { id: 'c8', text: 'Die „Fehlerkontrolle“ im Material ermöglicht dem Kind die selbstständige Korrektur.' },
      ],
      formTitle: 'Beobachtungs- und Reflexionsbogen (Besucher / Eltern)',
      visitorNameLabel: 'Name des Besuchers / Elternteils',
      visitorNamePlaceholder: 'z.B. Anna Müller',
      visitorRoleLabel: 'Rolle des Beobachters',
      roles: {
        parent: 'Elternteil der Schule',
        prospectiveParent: 'Interessierte Eltern (Hospitation)',
        guestEducator: 'Pädagogischer Fachbesucher',
        observer: 'Eingeladener Beobachter',
      },
      dateLabel: 'Beobachtungsdatum',
      timeSlotLabel: 'Zeitfenster',
      classroomLabel: 'Beobachtete Altersstufe / Gruppe',
      classrooms: {
        nido: 'Kleinkindgemeinschaft / Nido (0–3 Jahre)',
        casa: 'Kinderhaus / Casa dei Bambini (3–6 Jahre)',
        elementary: 'Montessori-Grundschule (6–12 Jahre)',
      },
      dim1Title: '1. Vorbereitete Umgebung & Raumatmosphäre',
      dim1Hint: 'Was ist Ihnen bezüglich Ordnung, Ästhetik, Ruhe und Zugänglichkeit der Materialien aufgefallen?',
      dim2Title: '2. Selbstständigkeit & Freie Wahl („Hilf mir, es selbst zu tun“)',
      dim2Hint: 'Wie haben Sie die Autonomie der Kinder erlebt (Selbstfürsorge, Materialwahl, Aufräumen)?',
      dim3Title: '3. Konzentration, Eigener Rhythmus & Freude an der Arbeit',
      dim3Hint: 'Beschreiben Sie eine Situation, in der ein Kind mit tiefer Aufmerksamkeit und innerer Zufriedenheit gearbeitet hat:',
      dim4Title: '4. Anmut, Höflichkeit & Soziales Miteinander',
      dim4Hint: 'Wie gehen die Kinder miteinander und mit den Erwachsenen um? Wie lösen sie Konflikte friedlich?',
      questionsTitle: '5. Fragen & Eindrücke für das Nachgespräch mit der Montessori-Leitung',
      questionsHint: 'Notieren Sie Ihre Fragen oder Eindrücke für das anschließende Gespräch mit dem Pädagogen:',
      saveBtn: 'Beobachtungsbogen speichern',
      exportPdfBtn: 'Als PDF herunterladen (A4)',
      savedSessionsTitle: 'Gespeicherte Besucher- / Eltern-Beobachtungsbögen',
      noSavedSessions: 'Noch keine Bögen gespeichert. Füllen Sie das Formular oben aus, um zu speichern oder als PDF zu exportieren.',
      deleteTooltip: 'Bogen löschen',
      loadBtn: 'In Formular laden',
    },
    assistantBanner: {
      title: 'Beobachtungsprotokoll für den Montessori-Assistenten',
      subtitle:
        'Konzipiert zum Schutz des 3-stündigen Arbeitszyklus, zur objektiven Raumbeobachtung und zur diskreten Unterstützung der Gruppenleitung.',
      pillars: [
        {
          title: 'Panoramablick über die Gruppe',
          desc: 'Der Assistent überblickt das Gesamtgeschehen und schützt die ungestörten Einzeldarbietungen des Pädagogen.',
        },
        {
          title: 'Objektive Fakten statt Wertungen',
          desc: 'Sachliche Erfassung von Bewegungen, Materialwahl und Interaktionen im 5-Minuten-Takt.',
        },
        {
          title: 'Pflege der Vorbereiteten Umgebung',
          desc: 'Sicherung der Vollständigkeit, Ordnung und Sauberkeit aller Materialien in den Regalen.',
        },
      ],
    },
    teacherBanner: {
      title: 'Beobachtungsprotokoll für den Montessori-Pädagogen',
      subtitle:
        'Individuelle formative Bewertung über die 6 Curriculumbereiche, Erkennung sensibler Phasen und Planung der nächsten Darbietungen (Next Steps).',
      pillars: [
        {
          title: 'Fortschritt in den 6 Curriculumbereichen',
          desc: 'Dokumentation des Entwicklungsstands: Dargeboten, In Übung oder Beherrscht / Normalisiert.',
        },
        {
          title: 'Arbeitskurve & Polarisation der Aufmerksamkeit',
          desc: 'Beobachtung von Konzentrationsdauer, spontaner Wiederholung und Selbstregulation.',
        },
        {
          title: 'Planung kommender Darbietungen',
          desc: 'Bestimmung des optimalen Zeitpunkts für eine neue Drei-Stufen-Lektion oder weiterführende Arbeit.',
        },
      ],
    },
  },
};

function sanitizePdfText(text: string): string {
  if (!text) return '';
  return text
    .replace(/ă/g, 'a')
    .replace(/Ă/g, 'A')
    .replace(/â/g, 'a')
    .replace(/Â/g, 'A')
    .replace(/î/g, 'i')
    .replace(/Î/g, 'I')
    .replace(/ș/g, 's')
    .replace(/Ș/g, 'S')
    .replace(/ş/g, 's')
    .replace(/Ş/g, 'S')
    .replace(/ț/g, 't')
    .replace(/Ț/g, 'T')
    .replace(/ţ/g, 't')
    .replace(/Ţ/g, 'T')
    .replace(/[«»„“”]/g, '"')
    .replace(/[’‘]/g, "'")
    .replace(/–|—/g, '-');
}

export const ObservationModulesPage: React.FC<ObservationModulesPageProps> = ({
  lang,
  institution,
  observations,
  onAddObservation,
  onDeleteObservation,
  onUpdateObservation,
  onOpenPrint,
}) => {
  const [activeTab, setActiveTab] = useState<ProtocolTab>('visitor');
  const t = PROTOCOL_TEXTS[lang] || PROTOCOL_TEXTS.ro;
  const vp = t.visitorProtocol;

  // Visitor / Parent Form State
  const [visitorName, setVisitorName] = useState('');
  const [visitorRole, setVisitorRole] = useState('parent');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [timeSlot, setTimeSlot] = useState('09:00 - 10:30');
  const [classroomLevel, setClassroomLevel] = useState('casa');
  const [environmentNotes, setEnvironmentNotes] = useState('');
  const [independenceNotes, setIndependenceNotes] = useState('');
  const [concentrationNotes, setConcentrationNotes] = useState('');
  const [socialGraceNotes, setSocialGraceNotes] = useState('');
  const [questionsForGuide, setQuestionsForGuide] = useState('');
  const [checkedCriteria, setCheckedCriteria] = useState<string[]>(['c1', 'c2', 'c4']);

  const [savedVisitorEntries, setSavedVisitorEntries] = useState<VisitorObservationEntry[]>(() => {
    try {
      const raw = localStorage.getItem('montessori_visitor_obs_v1');
      if (raw) return JSON.parse(raw);
    } catch {}
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('montessori_visitor_obs_v1', JSON.stringify(savedVisitorEntries));
    } catch {}
  }, [savedVisitorEntries]);

  const toggleCriterion = (id: string) => {
    setCheckedCriteria((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSaveVisitorEntry = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: VisitorObservationEntry = {
      id: 'vis-' + Date.now(),
      visitorName: visitorName.trim() || (lang === 'ro' ? 'Vizitator / Părinte' : lang === 'fr' ? 'Visiteur / Parent' : lang === 'de' ? 'Besucher / Elternteil' : 'Visitor / Parent'),
      visitorRole,
      date,
      timeSlot,
      classroomLevel,
      environmentNotes,
      independenceNotes,
      concentrationNotes,
      socialGraceNotes,
      questionsForGuide,
      checkedCriteria,
      createdAt: Date.now(),
    };
    setSavedVisitorEntries((prev) => [newEntry, ...prev]);
  };

  const handleDeleteVisitorEntry = (id: string) => {
    setSavedVisitorEntries((prev) => prev.filter((item) => item.id !== id));
  };

  const handleLoadVisitorEntry = (entry: VisitorObservationEntry) => {
    setVisitorName(entry.visitorName);
    setVisitorRole(entry.visitorRole);
    setDate(entry.date);
    setTimeSlot(entry.timeSlot);
    setClassroomLevel(entry.classroomLevel);
    setEnvironmentNotes(entry.environmentNotes);
    setIndependenceNotes(entry.independenceNotes);
    setConcentrationNotes(entry.concentrationNotes);
    setSocialGraceNotes(entry.socialGraceNotes);
    setQuestionsForGuide(entry.questionsForGuide);
    setCheckedCriteria(entry.checkedCriteria || []);
  };

  const handleExportVisitorPdf = () => {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const marginX = 16;
    const contentWidth = 178;
    let y = 14;

    const ensureSpace = (needed: number) => {
      if (y + needed > 278) {
        doc.addPage();
        y = 16;
      }
    };

    // Header Box
    doc.setFillColor(31, 58, 43);
    doc.roundedRect(marginX, y, contentWidth, 23, 2, 2, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12.5);
    doc.setTextColor(255, 255, 255);
    doc.text(sanitizePdfText(institution.name), marginX + 5, y + 7.5);

    doc.setFontSize(9.5);
    doc.setTextColor(212, 163, 115);
    doc.text(sanitizePdfText(vp.formTitle.toUpperCase()), marginX + 5, y + 14);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(230, 230, 230);
    doc.text(
      sanitizePdfText(`${vp.dateLabel}: ${date}  |  ${vp.timeSlotLabel}: ${timeSlot}`),
      marginX + 5,
      y + 19.8
    );

    y += 28;

    // Visitor Metadata
    const roleText = (vp.roles as Record<string, string>)[visitorRole] || visitorRole;
    const roomText = (vp.classrooms as Record<string, string>)[classroomLevel] || classroomLevel;

    doc.setFillColor(244, 247, 245);
    doc.setDrawColor(200, 210, 205);
    doc.roundedRect(marginX, y, contentWidth, 15, 2, 2, 'FD');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(31, 58, 43);
    doc.text(
      sanitizePdfText(`${vp.visitorNameLabel}: ${visitorName || '-'}   (${roleText})`),
      marginX + 4,
      y + 6
    );
    doc.setFont('helvetica', 'normal');
    doc.text(
      sanitizePdfText(`${vp.classroomLabel}: ${roomText}`),
      marginX + 4,
      y + 11.8
    );

    y += 20;

    // 1. GOLDEN RULES FOR PARENTS / VISITORS (Regulile de Aur pentru Părinți)
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(31, 58, 43);
    doc.text(sanitizePdfText(vp.etiquetteTitle), marginX, y);
    y += 4.5;

    vp.etiquetteRules.forEach((rule) => {
      const descLines = doc.splitTextToSize(sanitizePdfText(rule.desc), contentWidth - 8);
      const boxHeight = 6 + descLines.length * 3.8 + 2.5;
      ensureSpace(boxHeight + 2);

      doc.setFillColor(250, 247, 242); // #FAF7F2
      doc.setDrawColor(212, 163, 115); // #D4A373
      doc.roundedRect(marginX, y, contentWidth, boxHeight, 1.5, 1.5, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.2);
      doc.setTextColor(31, 58, 43);
      doc.text(sanitizePdfText(rule.title), marginX + 3.5, y + 4.8);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.8);
      doc.setTextColor(65, 65, 65);
      doc.text(descLines, marginX + 3.5, y + 9.2);

      y += boxHeight + 2.2;
    });

    y += 3;

    // 2. Checked items (Checklist)
    ensureSpace(18);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(31, 58, 43);
    doc.text(sanitizePdfText(vp.checklistTitle), marginX, y);
    y += 5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(50, 50, 50);
    vp.checklistItems.forEach((item) => {
      const isChecked = checkedCriteria.includes(item.id);
      const prefix = isChecked ? '[X] ' : '[ ] ';
      const lines = doc.splitTextToSize(sanitizePdfText(prefix + item.text), contentWidth - 4);
      ensureSpace(lines.length * 4 + 2);
      doc.text(lines, marginX + 2, y);
      y += lines.length * 3.8 + 1.2;
    });

    y += 4;

    // 3. 5 Observation & Reflection Dimensions
    const addSection = (title: string, body: string) => {
      const content = body.trim() || '-';
      const lines = doc.splitTextToSize(sanitizePdfText(content), contentWidth - 6);
      const boxH = Math.max(lines.length * 4.2 + 4, 12);
      ensureSpace(boxH + 10);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.8);
      doc.setTextColor(46, 90, 68);
      doc.text(sanitizePdfText(title), marginX, y);
      y += 3.5;

      doc.setFillColor(252, 253, 252);
      doc.setDrawColor(215, 222, 218);
      doc.roundedRect(marginX, y, contentWidth, boxH, 1.5, 1.5, 'FD');

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.2);
      doc.setTextColor(40, 40, 40);
      doc.text(lines, marginX + 3, y + 4.8);
      y += boxH + 4.5;
    };

    addSection(vp.dim1Title, environmentNotes);
    addSection(vp.dim2Title, independenceNotes);
    addSection(vp.dim3Title, concentrationNotes);
    addSection(vp.dim4Title, socialGraceNotes);
    addSection(vp.questionsTitle, questionsForGuide);

    doc.save(`fisa-observare-parinte-vizitator-${date}.pdf`);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Header & 3 Protocol Selector Cards */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-5">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-[#2E5A44] text-white flex items-center justify-center shrink-0">
            <ClipboardList className="w-6 h-6 text-[#D4A373]" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#1F3A2B] font-serif">
              {t.pageTitle}
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              {t.pageSubtitle}
            </p>
          </div>
        </div>

        {/* 4 Protocol Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {/* 1. Visitor / Parent Protocol */}
          <button
            type="button"
            onClick={() => setActiveTab('visitor')}
            className={`text-left p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between gap-2.5 ${
              activeTab === 'visitor'
                ? 'bg-[#2E5A44] text-white border-[#1F3A2B] shadow-md'
                : 'bg-[#F4F7F5]/70 hover:bg-[#F4F7F5] text-gray-800 border-gray-200 hover:border-[#2E5A44]/50'
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                  activeTab === 'visitor'
                    ? 'bg-white/15 text-[#D4A373]'
                    : 'bg-white text-[#2E5A44] border border-gray-200'
                }`}
              >
                <Users className="w-5 h-5" />
              </div>
              <span
                className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                  activeTab === 'visitor'
                    ? 'bg-[#D4A373] text-[#1F3A2B]'
                    : 'bg-amber-50 text-amber-900 border border-amber-200'
                }`}
              >
                {t.tabs.visitor.badge}
              </span>
            </div>
            <div>
              <h3
                className={`text-sm font-bold font-serif ${
                  activeTab === 'visitor' ? 'text-white' : 'text-[#1F3A2B]'
                }`}
              >
                {t.tabs.visitor.title}
              </h3>
              <p
                className={`text-[11px] mt-1 leading-relaxed ${
                  activeTab === 'visitor' ? 'text-white/85' : 'text-gray-600'
                }`}
              >
                {t.tabs.visitor.shortDesc}
              </p>
            </div>
          </button>

          {/* 2. Montessori Assistant Protocol */}
          <button
            type="button"
            onClick={() => setActiveTab('assistant')}
            className={`text-left p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between gap-2.5 ${
              activeTab === 'assistant'
                ? 'bg-[#2E5A44] text-white border-[#1F3A2B] shadow-md'
                : 'bg-[#F4F7F5]/70 hover:bg-[#F4F7F5] text-gray-800 border-gray-200 hover:border-[#2E5A44]/50'
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                  activeTab === 'assistant'
                    ? 'bg-white/15 text-[#D4A373]'
                    : 'bg-white text-[#2E5A44] border border-gray-200'
                }`}
              >
                <Eye className="w-5 h-5" />
              </div>
              <span
                className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                  activeTab === 'assistant'
                    ? 'bg-[#D4A373] text-[#1F3A2B]'
                    : 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                }`}
              >
                {t.tabs.assistant.badge}
              </span>
            </div>
            <div>
              <h3
                className={`text-sm font-bold font-serif ${
                  activeTab === 'assistant' ? 'text-white' : 'text-[#1F3A2B]'
                }`}
              >
                {t.tabs.assistant.title}
              </h3>
              <p
                className={`text-[11px] mt-1 leading-relaxed ${
                  activeTab === 'assistant' ? 'text-white/85' : 'text-gray-600'
                }`}
              >
                {t.tabs.assistant.shortDesc}
              </p>
            </div>
          </button>

          {/* 3. Montessori Teacher / Guide Protocol */}
          <button
            type="button"
            onClick={() => setActiveTab('teacher')}
            className={`text-left p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between gap-2.5 ${
              activeTab === 'teacher'
                ? 'bg-[#2E5A44] text-white border-[#1F3A2B] shadow-md'
                : 'bg-[#F4F7F5]/70 hover:bg-[#F4F7F5] text-gray-800 border-gray-200 hover:border-[#2E5A44]/50'
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                  activeTab === 'teacher'
                    ? 'bg-white/15 text-[#D4A373]'
                    : 'bg-white text-[#2E5A44] border border-gray-200'
                }`}
              >
                <GraduationCap className="w-5 h-5" />
              </div>
              <span
                className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                  activeTab === 'teacher'
                    ? 'bg-[#D4A373] text-[#1F3A2B]'
                    : 'bg-amber-50 text-amber-900 border border-amber-200'
                }`}
              >
                {t.tabs.teacher.badge}
              </span>
            </div>
            <div>
              <h3
                className={`text-sm font-bold font-serif ${
                  activeTab === 'teacher' ? 'text-white' : 'text-[#1F3A2B]'
                }`}
              >
                {t.tabs.teacher.title}
              </h3>
              <p
                className={`text-[11px] mt-1 leading-relaxed ${
                  activeTab === 'teacher' ? 'text-white/85' : 'text-gray-600'
                }`}
              >
                {t.tabs.teacher.shortDesc}
              </p>
            </div>
          </button>

          {/* 4. Child-Focused Individual Observation Protocol (Audio & History) */}
          <button
            type="button"
            onClick={() => setActiveTab('child_focus')}
            className={`text-left p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between gap-2.5 ${
              activeTab === 'child_focus'
                ? 'bg-[#2E5A44] text-white border-[#1F3A2B] shadow-md'
                : 'bg-[#F4F7F5]/70 hover:bg-[#F4F7F5] text-gray-800 border-gray-200 hover:border-[#2E5A44]/50'
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                  activeTab === 'child_focus'
                    ? 'bg-white/15 text-[#D4A373]'
                    : 'bg-white text-[#2E5A44] border border-gray-200'
                }`}
              >
                <Mic className="w-5 h-5" />
              </div>
              <span
                className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                  activeTab === 'child_focus'
                    ? 'bg-[#D4A373] text-[#1F3A2B]'
                    : 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                }`}
              >
                {t.tabs.child_focus.badge}
              </span>
            </div>
            <div>
              <h3
                className={`text-sm font-bold font-serif ${
                  activeTab === 'child_focus' ? 'text-white' : 'text-[#1F3A2B]'
                }`}
              >
                {t.tabs.child_focus.title}
              </h3>
              <p
                className={`text-[11px] mt-1 leading-relaxed ${
                  activeTab === 'child_focus' ? 'text-white/85' : 'text-gray-600'
                }`}
              >
                {t.tabs.child_focus.shortDesc}
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* TAB 1: VISITOR / PARENT OBSERVATION PROTOCOL */}
      {activeTab === 'visitor' && (
        <div className="space-y-6 animate-fadeIn">
          {/* 1. Visitor / Parent Observation & Reflection Form (First after Module de observare) */}
          <form
            onSubmit={handleSaveVisitorEntry}
            className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-5"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
              <h4 className="text-base font-bold text-[#1F3A2B] font-serif">
                {vp.formTitle}
              </h4>
              <button
                type="button"
                onClick={handleExportVisitorPdf}
                className="px-4 py-2 bg-[#2E5A44] hover:bg-[#1F3A2B] text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-2 transition-colors cursor-pointer shrink-0"
              >
                <FileDown className="w-4 h-4 text-[#D4A373]" />
                <span>{vp.exportPdfBtn}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#1F3A2B] mb-1">
                  {vp.visitorNameLabel}
                </label>
                <input
                  type="text"
                  value={visitorName}
                  onChange={(e) => setVisitorName(e.target.value)}
                  placeholder={vp.visitorNamePlaceholder}
                  className="w-full px-3.5 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs text-gray-800 focus:bg-white focus:outline-none focus:border-[#2E5A44]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1F3A2B] mb-1">
                  {vp.visitorRoleLabel}
                </label>
                <select
                  value={visitorRole}
                  onChange={(e) => setVisitorRole(e.target.value)}
                  className="w-full px-3.5 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs text-gray-800 focus:bg-white focus:outline-none focus:border-[#2E5A44]"
                >
                  <option value="parent">{vp.roles.parent}</option>
                  <option value="prospectiveParent">{vp.roles.prospectiveParent}</option>
                  <option value="guestEducator">{vp.roles.guestEducator}</option>
                  <option value="observer">{vp.roles.observer}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1F3A2B] mb-1">
                  {vp.classroomLabel}
                </label>
                <select
                  value={classroomLevel}
                  onChange={(e) => setClassroomLevel(e.target.value)}
                  className="w-full px-3.5 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs text-gray-800 focus:bg-white focus:outline-none focus:border-[#2E5A44]"
                >
                  <option value="nido">{vp.classrooms.nido}</option>
                  <option value="casa">{vp.classrooms.casa}</option>
                  <option value="elementary">{vp.classrooms.elementary}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1F3A2B] mb-1 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#2E5A44]" />
                  <span>{vp.dateLabel}</span>
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3.5 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs text-gray-800 focus:bg-white focus:outline-none focus:border-[#2E5A44]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1F3A2B] mb-1 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#2E5A44]" />
                  <span>{vp.timeSlotLabel}</span>
                </label>
                <input
                  type="text"
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  placeholder="09:00 - 10:30"
                  className="w-full px-3.5 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs text-gray-800 focus:bg-white focus:outline-none focus:border-[#2E5A44]"
                />
              </div>
            </div>

            {/* Golden Rules for Parents & Visitors embedded in the Observation Sheet */}
            <div className="p-4 rounded-2xl bg-[#FAF7F2]/80 border border-[#D4A373]/50 space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-[#2E5A44] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#D4A373]" />
                <span>{vp.etiquetteTitle}</span>
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {vp.etiquetteRules.map((rule, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-white border border-[#D4A373]/30 space-y-1 shadow-2xs"
                  >
                    <p className="text-xs font-bold text-[#1F3A2B]">{rule.title}</p>
                    <p className="text-xs text-gray-600 leading-relaxed">{rule.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 5 Observation Textareas with Voice Dictation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 items-stretch">
              <div className="flex flex-col h-full space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#1F3A2B]">{vp.dim1Title}</label>
                  <SpeechToTextButton
                    lang={lang}
                    currentValue={environmentNotes}
                    onTranscript={setEnvironmentNotes}
                    variant="pill"
                  />
                </div>
                <AutoResizeTextarea
                  minRows={3}
                  value={environmentNotes}
                  onChange={(e) => setEnvironmentNotes(e.target.value)}
                  placeholder={vp.dim1Hint}
                  className="flex-1 w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-xs text-gray-800 focus:bg-white focus:outline-none focus:border-[#2E5A44]"
                />
              </div>

              <div className="flex flex-col h-full space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#1F3A2B]">{vp.dim2Title}</label>
                  <SpeechToTextButton
                    lang={lang}
                    currentValue={independenceNotes}
                    onTranscript={setIndependenceNotes}
                    variant="pill"
                  />
                </div>
                <AutoResizeTextarea
                  minRows={3}
                  value={independenceNotes}
                  onChange={(e) => setIndependenceNotes(e.target.value)}
                  placeholder={vp.dim2Hint}
                  className="flex-1 w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-xs text-gray-800 focus:bg-white focus:outline-none focus:border-[#2E5A44]"
                />
              </div>

              <div className="flex flex-col h-full space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#1F3A2B]">{vp.dim3Title}</label>
                  <SpeechToTextButton
                    lang={lang}
                    currentValue={concentrationNotes}
                    onTranscript={setConcentrationNotes}
                    variant="pill"
                  />
                </div>
                <AutoResizeTextarea
                  minRows={3}
                  value={concentrationNotes}
                  onChange={(e) => setConcentrationNotes(e.target.value)}
                  placeholder={vp.dim3Hint}
                  className="flex-1 w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-xs text-gray-800 focus:bg-white focus:outline-none focus:border-[#2E5A44]"
                />
              </div>

              <div className="flex flex-col h-full space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#1F3A2B]">{vp.dim4Title}</label>
                  <SpeechToTextButton
                    lang={lang}
                    currentValue={socialGraceNotes}
                    onTranscript={setSocialGraceNotes}
                    variant="pill"
                  />
                </div>
                <AutoResizeTextarea
                  minRows={3}
                  value={socialGraceNotes}
                  onChange={(e) => setSocialGraceNotes(e.target.value)}
                  placeholder={vp.dim4Hint}
                  className="flex-1 w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-xs text-gray-800 focus:bg-white focus:outline-none focus:border-[#2E5A44]"
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#1F3A2B]">{vp.questionsTitle}</label>
                  <SpeechToTextButton
                    lang={lang}
                    currentValue={questionsForGuide}
                    onTranscript={setQuestionsForGuide}
                    variant="pill"
                  />
                </div>
                <AutoResizeTextarea
                  minRows={3}
                  value={questionsForGuide}
                  onChange={(e) => setQuestionsForGuide(e.target.value)}
                  placeholder={vp.questionsHint}
                  className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-xs text-gray-800 focus:bg-white focus:outline-none focus:border-[#2E5A44]"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#2E5A44] hover:bg-[#1F3A2B] text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4 text-[#D4A373]" />
                <span>{vp.saveBtn}</span>
              </button>
              <button
                type="button"
                onClick={handleExportVisitorPdf}
                className="px-5 py-2.5 bg-[#FAF7F2] hover:bg-[#F2ECE1] text-[#1F3A2B] border border-[#D4A373] text-xs font-bold rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
              >
                <FileDown className="w-4 h-4 text-[#8C5E28]" />
                <span>{vp.exportPdfBtn}</span>
              </button>
            </div>
          </form>

          {/* 2. Interactive Checklist */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <div>
              <h4 className="text-sm font-bold text-[#1F3A2B] font-serif flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#2E5A44]" />
                <span>{vp.checklistTitle}</span>
              </h4>
              <p className="text-xs text-gray-500 mt-0.5">{vp.checklistSubtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {vp.checklistItems.map((item) => {
                const checked = checkedCriteria.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleCriterion(item.id)}
                    className={`p-3 rounded-xl border text-left text-xs flex items-start gap-2.5 transition-all cursor-pointer ${
                      checked
                        ? 'bg-emerald-50/70 border-emerald-300 text-[#1F3A2B] font-medium'
                        : 'bg-gray-50/60 border-gray-200 text-gray-600 hover:bg-gray-100/70'
                    }`}
                  >
                    <CheckCircle2
                      className={`w-4 h-4 shrink-0 mt-0.5 ${
                        checked ? 'text-emerald-600' : 'text-gray-300'
                      }`}
                    />
                    <span className="leading-relaxed">{item.text}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Saved Visitor Observation Entries */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-3">
            <h4 className="text-sm font-bold text-[#1F3A2B] font-serif">
              {vp.savedSessionsTitle} ({savedVisitorEntries.length})
            </h4>
            {savedVisitorEntries.length === 0 ? (
              <p className="text-xs text-gray-500 italic">{vp.noSavedSessions}</p>
            ) : (
              <div className="divide-y divide-gray-100">
                {savedVisitorEntries.map((entry) => (
                  <div
                    key={entry.id}
                    className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                  >
                    <div>
                      <p className="font-bold text-[#1F3A2B]">
                        {entry.visitorName} • <span className="font-normal text-gray-500">{entry.date} ({entry.timeSlot})</span>
                      </p>
                      <p className="text-gray-600 line-clamp-1 mt-0.5">
                        {entry.concentrationNotes || entry.environmentNotes || entry.questionsForGuide || '—'}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleLoadVisitorEntry(entry)}
                        className="px-3 py-1.5 rounded-lg bg-[#F4F7F5] hover:bg-[#2E5A44] text-[#1F3A2B] hover:text-white font-semibold transition-colors cursor-pointer"
                      >
                        {vp.loadBtn}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteVisitorEntry(entry.id)}
                        title={vp.deleteTooltip}
                        className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: MONTESSORI ASSISTANT OBSERVATION PROTOCOL */}
      {activeTab === 'assistant' && (
        <div className="space-y-6 animate-fadeIn">
          <ObservationModule
            observations={observations}
            onAddObservation={onAddObservation}
            onDeleteObservation={onDeleteObservation}
            onUpdateObservation={onUpdateObservation}
            institution={institution}
            onOpenPrint={onOpenPrint}
            lang={lang}
          />

          <div className="bg-gradient-to-r from-[#1F3A2B] to-[#2E5A44] p-6 rounded-2xl text-white shadow-sm space-y-4">
            <div>
              <h3 className="text-lg font-bold font-serif flex items-center gap-2 text-[#D4A373]">
                <Eye className="w-5 h-5" />
                <span>{t.assistantBanner.title}</span>
              </h3>
              <p className="text-xs text-white/85 mt-1">{t.assistantBanner.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {t.assistantBanner.pillars.map((p, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-white/10 border border-white/15 space-y-1">
                  <p className="text-xs font-bold text-[#D4A373]">{p.title}</p>
                  <p className="text-[11px] text-white/85 leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: MONTESSORI TEACHER / GUIDE OBSERVATION PROTOCOL */}
      {activeTab === 'teacher' && (
        <div className="space-y-6 animate-fadeIn">
          <ChildObservationModule
            institution={institution}
            lang={lang}
          />

          <div className="bg-gradient-to-r from-[#1F3A2B] to-[#2E5A44] p-6 rounded-2xl text-white shadow-sm space-y-4">
            <div>
              <h3 className="text-lg font-bold font-serif flex items-center gap-2 text-[#D4A373]">
                <Sparkles className="w-5 h-5" />
                <span>{t.teacherBanner.title}</span>
              </h3>
              <p className="text-xs text-white/85 mt-1">{t.teacherBanner.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {t.teacherBanner.pillars.map((p, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-white/10 border border-white/15 space-y-1">
                  <p className="text-xs font-bold text-[#D4A373]">{p.title}</p>
                  <p className="text-[11px] text-white/85 leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: CHILD-FOCUSED INDIVIDUAL OBSERVATION PROTOCOL (AUDIO & INDIVIDUAL REPORT) */}
      {activeTab === 'child_focus' && (
        <ChildFocusedAudioObservationModule
          institution={institution}
          lang={lang}
        />
      )}
    </div>
  );
};
