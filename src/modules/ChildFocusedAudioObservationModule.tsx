import React, { useState, useEffect, useRef } from 'react';
import { jsPDF } from 'jspdf';
import { InstitutionConfig } from '../types';
import { Language } from '../i18n/translations';
import { useSpeechToText } from '../hooks/useSpeechToText';
import { SpeechToTextButton } from '../components/SpeechToTextButton';
import { AutoResizeTextarea } from '../components/AutoResizeTextarea';
import {
  Mic,
  Square,
  Volume2,
  UserPlus,
  UserCheck,
  FileDown,
  Sparkles,
  Calendar,
  Clock,
  Trash2,
  FileText,
  CheckCircle2,
  Star,
  Plus,
  History,
  FolderOpen,
  Loader2,
  AlertTriangle,
  X,
} from 'lucide-react';

interface ChildFocusedAudioObservationModuleProps {
  institution: InstitutionConfig;
  lang: Language;
}

export type MontessoriAreaKey =
  | 'practicalLife'
  | 'sensorial'
  | 'language'
  | 'math'
  | 'culture'
  | 'socialEmotional';

export interface ChildProfile {
  id: string;
  name: string;
  age: string;
  classroom: string;
  createdAt: number;
}

export interface ChildAudioObservationEntry {
  id: string;
  childId: string;
  childName: string;
  date: string;
  time: string;
  durationSec: number;
  area: MontessoriAreaKey;
  materialUsed: string;
  concentrationLevel: 1 | 2 | 3 | 4 | 5;
  transcriptNotes: string;
  observerReflection: string;
  audioDataUrl?: string;
  createdAt: number;
}

export interface ChildIndividualReport {
  childId: string;
  generatedAt: string;
  summaryText: string;
  areasSummary: string;
  concentrationAnalysis: string;
  nextSteps: string;
}

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

const MODULE_TEXTS: Record<
  Language,
  {
    headerTitle: string;
    headerSubtitle: string;
    childrenRosterTitle: string;
    childrenRosterSubtitle: string;
    addChildBtn: string;
    newChildNamePlaceholder: string;
    newChildAgePlaceholder: string;
    newChildClassPlaceholder: string;
    confirmAddChildBtn: string;
    cancelBtn: string;
    obsCountLabel: string;
    audioCountLabel: string;
    avgFocusLabel: string;
    newObsCardTitle: string;
    newObsCardSubtitle: string;
    selectChildLabel: string;
    autoDetectedBadge: string;
    dateLabel: string;
    timeLabel: string;
    areaLabel: string;
    materialLabel: string;
    materialPlaceholder: string;
    concentrationLabel: string;
    concentrationLevels: Record<number, string>;
    audioRecorderTitle: string;
    audioRecorderHint: string;
    startAudioBtn: string;
    stopAudioBtn: string;
    recordingInProgress: string;
    transcribingAudio: string;
    recordedAudioReady: string;
    clearAudioBtn: string;
    transcriptLabel: string;
    transcriptPlaceholder: string;
    reflectionLabel: string;
    reflectionPlaceholder: string;
    saveEntryBtn: string;
    savedToast: string;
    childHistoryTitle: string;
    childHistorySubtitle: string;
    noEntriesForChild: string;
    audioRecordingBadge: string;
    listenAudioLabel: string;
    deleteEntryTooltip: string;
    individualReportTitle: string;
    individualReportSubtitle: string;
    generateReportBtn: string;
    generatingReport: string;
    exportChildPdfBtn: string;
    reportSec1: string;
    reportSec2: string;
    reportSec3: string;
    reportEmptyPrompt: string;
    deleteChildTooltip: string;
    deleteChildBtn: string;
    deleteChildModalTitle: string;
    deleteChildModalMessage: string;
    deleteChildModalWarning: string;
    confirmDeleteChildBtn: string;
    cancelDeleteBtn: string;
    childDeletedToast: string;
    emptyChildrenRoster: string;
    areas: Record<MontessoriAreaKey, string>;
  }
> = {
  ro: {
    headerTitle: 'Observare Individuală Focusată pe Copil (Înregistrări Audio & Dosar Individual)',
    headerSubtitle:
      'Înregistrați vocal observațiile în timp real. Fiecare copil menționat are propriul istoric cronologic și propriul raport individual PDF.',
    childrenRosterTitle: 'Dosarele Individuale ale Copiilor',
    childrenRosterSubtitle:
      'Selectați un copil pentru a-i vedea istoricul și raportul individual sau menționați-i numele în înregistrarea audio:',
    addChildBtn: 'Adaugă Copil Nou',
    newChildNamePlaceholder: 'Numele copilului (ex: Clara Popa)',
    newChildAgePlaceholder: 'Vârsta (ex: 4 ani și 5 luni)',
    newChildClassPlaceholder: 'Grupa (ex: Casa dei Bambini 3-6 ani)',
    confirmAddChildBtn: 'Creează Dosar Copil',
    cancelBtn: 'Anulează',
    obsCountLabel: 'observații',
    audioCountLabel: 'înregistrări audio',
    avgFocusLabel: 'Concentrare medie',
    newObsCardTitle: 'Înregistrare Nouă de Observație (Audio & Text)',
    newObsCardSubtitle:
      'Apăsați pe butonul de înregistrare audio pentru a capta vocea și transcrierea automată. Dacă rostiți numele copilului, acesta este selectat automat.',
    selectChildLabel: 'Copilul Observat / Menționat',
    autoDetectedBadge: 'Detectat automat din voce/text',
    dateLabel: 'Data observării',
    timeLabel: 'Ora',
    areaLabel: 'Aria Curriculară Montessori',
    materialLabel: 'Materialul / Activitatea observată',
    materialPlaceholder: 'ex: Turnul Roz, Literele din șmirghel, Turnatul apei...',
    concentrationLabel: 'Nivel de Concentrare & Implicare',
    concentrationLevels: {
      1: '1 - Explorare inițială / Atenție fluctuantă',
      2: '2 - Implicare scurtă cu ghidare',
      3: '3 - Lucru calm și susținut',
      4: '4 - Concentrare profundă și repetiție',
      5: '5 - Polarizarea atenției / Normalizare deplină',
    },
    audioRecorderTitle: 'Înregistrare Audio Vocală a Observației',
    audioRecorderHint:
      'Înregistrarea audio rămâne salvată în istoricul individual al copilului și este transcrisă automat în nota de observație.',
    startAudioBtn: 'Înregistrează Observație Audio',
    stopAudioBtn: 'Oprește Înregistrarea Audio',
    recordingInProgress: 'Înregistrare audio activă... Vorbiți clar lângă microfon',
    transcribingAudio: 'Se procesează înregistrarea și transcrierea...',
    recordedAudioReady: 'Înregistrare audio atașată acestei observații:',
    clearAudioBtn: 'Șterge înregistrarea audio',
    transcriptLabel: 'Transcriere Audio & Note Factuale de Observație',
    transcriptPlaceholder:
      'Textul dictat în timpul înregistrării audio apare automat aici. Puteți edita sau completa observația...',
    reflectionLabel: 'Reflecție Pedagogică / Intenție pentru Următoarea Prezentare',
    reflectionPlaceholder:
      'Ce perioadă sensibilă se observă? Ce material sau prezentare îi vom propune în continuare?',
    saveEntryBtn: 'Salvează în Istoricul Copilului',
    savedToast: 'Observația a fost salvată în istoricul copilului!',
    childHistoryTitle: 'Istoric Individual de Observații pentru',
    childHistorySubtitle:
      'Toate sesiunile de observare și înregistrările audio salvate cronologic pentru acest copil',
    noEntriesForChild:
      'Nu există încă observații pentru acest copil. Folosiți formularul și butonul de înregistrare audio de mai sus.',
    audioRecordingBadge: 'Înregistrare Audio',
    listenAudioLabel: 'Ascultă înregistrarea audio:',
    deleteEntryTooltip: 'Șterge această observație',
    individualReportTitle: 'Raport Individual de Evaluare & Evoluție —',
    individualReportSubtitle:
      'Sinteză individualizată generată pe baza întregului istoric de observații al copilului',
    generateReportBtn: 'Generează / Actualizează Raportul Individual',
    generatingReport: 'Se generează raportul individual...',
    exportChildPdfBtn: 'Descarcă Raport Individual PDF (A4)',
    reportSec1: '1. Sinteză Generală & Arii Curriculare Explorate',
    reportSec2: '2. Dinamica Concentrării, Autonomia și Normalizarea',
    reportSec3: '3. Recomandări Pedagogice & Pași Următori (Next Steps)',
    reportEmptyPrompt:
      'Apăsați pe „Generează / Actualizează Raportul Individual” sau pe „Descarcă Raport Individual PDF (A4)” pentru a crea raportul complet al copilului.',
    deleteChildTooltip: 'Șterge dosar copil',
    deleteChildBtn: 'Șterge Dosar Copil',
    deleteChildModalTitle: 'Confirmare Ștergere Dosar Copil',
    deleteChildModalMessage: 'Sigur doriți să ștergeți dosarul copilului',
    deleteChildModalWarning:
      'Această acțiune va șterge definitiv profilul, toate înregistrările audio și raportul individual asociat.',
    confirmDeleteChildBtn: 'Da, șterge dosarul',
    cancelDeleteBtn: 'Anulează',
    childDeletedToast: 'Dosarul copilului a fost șters.',
    emptyChildrenRoster:
      'Niciun dosar de copil salvat. Apăsați pe „Adaugă Copil Nou” pentru a crea un dosar.',
    areas: {
      practicalLife: 'Viață Practică',
      sensorial: 'Material Senzorial',
      language: 'Limbaj & Comunicare',
      math: 'Matematică & STEM',
      culture: 'Cultură & Științe (Educație Cosmică)',
      socialEmotional: 'Grație, Curtoazie & Dezvoltare Socială',
    },
  },
  fr: {
    headerTitle: 'Observation Individuelle Centrée sur l’Enfant (Audio & Dossier Individuel)',
    headerSubtitle:
      'Enregistrez vos observations vocales en temps réel. Chaque enfant mentionné dispose de son historique chronologique et de son rapport individuel PDF.',
    childrenRosterTitle: 'Dossiers Individuels des Enfants',
    childrenRosterSubtitle:
      'Sélectionnez un enfant pour consulter son historique et son rapport individuel, ou mentionnez son prénom dans l’enregistrement audio :',
    addChildBtn: 'Ajouter un Enfant',
    newChildNamePlaceholder: 'Nom de l’enfant (ex: Chloé Moreau)',
    newChildAgePlaceholder: 'Âge (ex: 4 ans et 5 mois)',
    newChildClassPlaceholder: 'Ambiance (ex: Maison des Enfants 3-6 ans)',
    confirmAddChildBtn: 'Créer le Dossier',
    cancelBtn: 'Annuler',
    obsCountLabel: 'observations',
    audioCountLabel: 'enregistrements audio',
    avgFocusLabel: 'Concentration moyenne',
    newObsCardTitle: 'Nouvelle Observation Individuelle (Audio & Texte)',
    newObsCardSubtitle:
      'Cliquez sur le bouton d’enregistrement audio pour capturer votre voix et la transcription automatique. Si vous prononcez le prénom de l’enfant, il est sélectionné automatiquement.',
    selectChildLabel: 'Enfant Observé / Mentionné',
    autoDetectedBadge: 'Détecté automatiquement dans la voix/le texte',
    dateLabel: 'Date d’observation',
    timeLabel: 'Heure',
    areaLabel: 'Domaine du Curriculum Montessori',
    materialLabel: 'Matériel / Activité observée',
    materialPlaceholder: 'ex: Tour Rose, Lettres rugueuses, Verser l’eau...',
    concentrationLabel: 'Niveau de Concentration & Engagement',
    concentrationLevels: {
      1: '1 - Exploration initiale / Attention fluctuante',
      2: '2 - Engagement bref avec accompagnement',
      3: '3 - Travail calme et soutenu',
      4: '4 - Concentration profonde et répétition',
      5: '5 - Polarisation de l’attention / Normalisation complète',
    },
    audioRecorderTitle: 'Enregistrement Audio Vocal de l’Observation',
    audioRecorderHint:
      'L’enregistrement audio est conservé dans l’historique individuel de l’enfant et transcrit automatiquement dans la note.',
    startAudioBtn: 'Enregistrer une Observation Audio',
    stopAudioBtn: 'Arrêter l’Enregistrement Audio',
    recordingInProgress: 'Enregistrement audio en cours... Parlez clairement près du microphone',
    transcribingAudio: 'Traitement de l’enregistrement et transcription...',
    recordedAudioReady: 'Enregistrement audio joint à cette observation :',
    clearAudioBtn: 'Supprimer l’enregistrement audio',
    transcriptLabel: 'Transcription Audio & Notes Factuelles d’Observation',
    transcriptPlaceholder:
      'Le texte dicté pendant l’enregistrement audio apparaît automatiquement ici. Vous pouvez le modifier ou le compléter...',
    reflectionLabel: 'Réflexion Pédagogique / Prochaine Présentation Envisagée',
    reflectionPlaceholder:
      'Quelle période sensible se manifeste ? Quel matériel ou présentation proposer ensuite ?',
    saveEntryBtn: 'Enregistrer dans l’Historique de l’Enfant',
    savedToast: 'Observation enregistrée dans le dossier de l’enfant !',
    childHistoryTitle: 'Historique Individuel d’Observations pour',
    childHistorySubtitle:
      'Toutes les séances d’observation et les enregistrements audio classés chronologiquement pour cet enfant',
    noEntriesForChild:
      'Aucune observation enregistrée pour cet enfant. Utilisez le formulaire et le bouton audio ci-dessus.',
    audioRecordingBadge: 'Enregistrement Audio',
    listenAudioLabel: 'Écouter l’enregistrement audio :',
    deleteEntryTooltip: 'Supprimer cette observation',
    individualReportTitle: 'Rapport Individuel d’Évaluation & d’Évolution —',
    individualReportSubtitle:
      'Synthèse individualisée générée à partir de l’ensemble de l’historique d’observations de l’enfant',
    generateReportBtn: 'Générer / Actualiser le Rapport Individuel',
    generatingReport: 'Génération du rapport individuel...',
    exportChildPdfBtn: 'Télécharger le Rapport Individuel PDF (A4)',
    reportSec1: '1. Synthèse Générale & Domaines Explorés',
    reportSec2: '2. Dynamique de Concentration, Autonomie et Normalisation',
    reportSec3: '3. Recommandations Pédagogiques & Prochaines Étapes (Next Steps)',
    reportEmptyPrompt:
      'Cliquez sur « Générer / Actualiser le Rapport Individuel » ou sur « Télécharger le Rapport Individuel PDF (A4) » pour créer le bilan complet de l’enfant.',
    deleteChildTooltip: 'Supprimer le dossier de l’enfant',
    deleteChildBtn: 'Supprimer le Dossier',
    deleteChildModalTitle: 'Confirmation de Suppression du Dossier',
    deleteChildModalMessage: 'Êtes-vous sûr de vouloir supprimer le dossier de',
    deleteChildModalWarning:
      'Cette action supprimera définitivement le profil, tous les enregistrements audio et le rapport individuel associé.',
    confirmDeleteChildBtn: 'Oui, supprimer le dossier',
    cancelDeleteBtn: 'Annuler',
    childDeletedToast: 'Le dossier de l’enfant a été supprimé.',
    emptyChildrenRoster:
      'Aucun dossier enfant disponible. Cliquez sur « Ajouter un Enfant » pour commencer.',
    areas: {
      practicalLife: 'Vie Pratique',
      sensorial: 'Matériel Sensoriel',
      language: 'Langage & Communication',
      math: 'Mathématiques & STEM',
      culture: 'Culture & Sciences (Éducation Cosmique)',
      socialEmotional: 'Grâce, Courtoisie & Vie Sociale',
    },
  },
  en: {
    headerTitle: 'Child-Focused Individual Observation (Audio Recordings & Child Dossier)',
    headerSubtitle:
      'Record voice observations in real time. Each mentioned child has an individual chronological history and a dedicated individual PDF report.',
    childrenRosterTitle: 'Individual Child Dossiers',
    childrenRosterSubtitle:
      'Select a child to view their chronological history and individual report, or mention their name during your audio recording:',
    addChildBtn: 'Add New Child',
    newChildNamePlaceholder: 'Child’s name (e.g. Emma Clarke)',
    newChildAgePlaceholder: 'Age (e.g. 4 years 5 months)',
    newChildClassPlaceholder: 'Classroom (e.g. Children’s House 3-6 yrs)',
    confirmAddChildBtn: 'Create Child Dossier',
    cancelBtn: 'Cancel',
    obsCountLabel: 'observations',
    audioCountLabel: 'audio recordings',
    avgFocusLabel: 'Average focus',
    newObsCardTitle: 'New Individual Observation Entry (Audio & Text)',
    newObsCardSubtitle:
      'Press the audio recording button to capture voice playback and automatic speech-to-text. Mentioning a child’s name automatically selects their profile.',
    selectChildLabel: 'Observed / Mentioned Child',
    autoDetectedBadge: 'Auto-detected from voice/text',
    dateLabel: 'Observation Date',
    timeLabel: 'Time',
    areaLabel: 'Montessori Curriculum Area',
    materialLabel: 'Observed Material / Activity',
    materialPlaceholder: 'e.g. Pink Tower, Sandpaper Letters, Water Pouring...',
    concentrationLabel: 'Concentration & Engagement Level',
    concentrationLevels: {
      1: '1 - Initial exploration / Fluctuating attention',
      2: '2 - Brief engagement with guidance',
      3: '3 - Calm, sustained work',
      4: '4 - Deep concentration and repetition',
      5: '5 - Polarization of attention / Full normalization',
    },
    audioRecorderTitle: 'Voice Audio Recording of Observation',
    audioRecorderHint:
      'The audio recording is saved in the child’s individual history for playback and automatically transcribed into the observation note.',
    startAudioBtn: 'Record Audio Observation',
    stopAudioBtn: 'Stop Audio Recording',
    recordingInProgress: 'Audio recording active... Speak clearly into the microphone',
    transcribingAudio: 'Processing audio recording and transcription...',
    recordedAudioReady: 'Audio recording attached to this observation:',
    clearAudioBtn: 'Remove audio recording',
    transcriptLabel: 'Audio Transcript & Factual Observation Notes',
    transcriptPlaceholder:
      'Speech dictated during the audio recording appears here automatically. You may edit or add details...',
    reflectionLabel: 'Pedagogical Reflection / Next Planned Presentation',
    reflectionPlaceholder:
      'Which sensitive period is active? What material or presentation should be offered next?',
    saveEntryBtn: 'Save to Child’s Individual History',
    savedToast: 'Observation saved to child’s individual history!',
    childHistoryTitle: 'Individual Observation History for',
    childHistorySubtitle:
      'All observation sessions and voice recordings stored chronologically for this child',
    noEntriesForChild:
      'No observations recorded for this child yet. Use the form and audio recording button above.',
    audioRecordingBadge: 'Audio Recording',
    listenAudioLabel: 'Listen to audio recording:',
    deleteEntryTooltip: 'Delete this observation',
    individualReportTitle: 'Individual Child Assessment & Progress Report —',
    individualReportSubtitle:
      'Individualized synthesis generated from the child’s complete observation history',
    generateReportBtn: 'Generate / Refresh Individual Report',
    generatingReport: 'Generating individual report...',
    exportChildPdfBtn: 'Download Individual Report PDF (A4)',
    reportSec1: '1. General Synthesis & Explored Curriculum Areas',
    reportSec2: '2. Concentration Dynamics, Independence & Normalization',
    reportSec3: '3. Pedagogical Recommendations & Next Steps',
    reportEmptyPrompt:
      'Click “Generate / Refresh Individual Report” or “Download Individual Report PDF (A4)” to create the child’s comprehensive report.',
    deleteChildTooltip: 'Delete child dossier',
    deleteChildBtn: 'Delete Child Dossier',
    deleteChildModalTitle: 'Confirm Child Dossier Deletion',
    deleteChildModalMessage: 'Are you sure you want to delete the dossier for',
    deleteChildModalWarning:
      'This action will permanently delete the child profile, all audio recordings, and the associated individual report.',
    confirmDeleteChildBtn: 'Yes, delete dossier',
    cancelDeleteBtn: 'Cancel',
    childDeletedToast: 'Child dossier has been deleted.',
    emptyChildrenRoster:
      'No child dossiers yet. Click “Add New Child” above to create one.',
    areas: {
      practicalLife: 'Practical Life',
      sensorial: 'Sensorial Material',
      language: 'Language & Literacy',
      math: 'Mathematics & STEM',
      culture: 'Culture & Sciences (Cosmic Education)',
      socialEmotional: 'Grace, Courtesy & Social Development',
    },
  },
  de: {
    headerTitle: 'Kindzentrierte Einzelbeobachtung (Audioaufnahmen & Kinderakte)',
    headerSubtitle:
      'Nehmen Sie Beobachtungen per Sprache in Echtzeit auf. Jedes erwähnte Kind erhält einen eigenen chronologischen Verlauf und einen individuellen PDF-Bericht.',
    childrenRosterTitle: 'Individuelle Kinderakten',
    childrenRosterSubtitle:
      'Wählen Sie ein Kind aus, um dessen Verlauf und Einzelbericht anzuzeigen, oder nennen Sie den Namen während der Audioaufnahme:',
    addChildBtn: 'Neues Kind hinzufügen',
    newChildNamePlaceholder: 'Name des Kindes (z.B. Clara Weber)',
    newChildAgePlaceholder: 'Alter (z.B. 4 Jahre und 5 Monate)',
    newChildClassPlaceholder: 'Gruppe (z.B. Kinderhaus 3-6 Jahre)',
    confirmAddChildBtn: 'Kinderakte anlegen',
    cancelBtn: 'Abbrechen',
    obsCountLabel: 'Beobachtungen',
    audioCountLabel: 'Audioaufnahmen',
    avgFocusLabel: 'Mittlere Konzentration',
    newObsCardTitle: 'Neue Einzelbeobachtung (Audio & Text)',
    newObsCardSubtitle:
      'Klicken Sie auf die Audioaufnahme-Schaltfläche für Sprachaufnahme und automatische Transkription. Wird der Name eines Kindes genannt, wird es automatisch ausgewählt.',
    selectChildLabel: 'Beobachtetes / Erwähntes Kind',
    autoDetectedBadge: 'Automatisch aus Sprache/Text erkannt',
    dateLabel: 'Beobachtungsdatum',
    timeLabel: 'Uhrzeit',
    areaLabel: 'Montessori-Curriculumbereich',
    materialLabel: 'Beobachtetes Material / Aktivität',
    materialPlaceholder: 'z.B. Rosa Turm, Sandpapierbuchstaben, Wasser gießen...',
    concentrationLabel: 'Konzentrations- & Engagementgrad',
    concentrationLevels: {
      1: '1 - Erste Erkundung / Wechselnde Aufmerksamkeit',
      2: '2 - Kurze Beschäftigung mit Begleitung',
      3: '3 - Ruhiges, ausdauerndes Arbeiten',
      4: '4 - Tiefe Konzentration und Wiederholung',
      5: '5 - Polarisation der Aufmerksamkeit / Volle Normalisierung',
    },
    audioRecorderTitle: 'Sprach- und Audioaufnahme der Beobachtung',
    audioRecorderHint:
      'Die Audioaufnahme wird im individuellen Verlauf des Kindes gespeichert und automatisch in das Notizfeld transkribiert.',
    startAudioBtn: 'Audio-Beobachtung aufnehmen',
    stopAudioBtn: 'Audioaufnahme beenden',
    recordingInProgress: 'Audioaufnahme läuft... Bitte deutlich sprechen',
    transcribingAudio: 'Audioaufnahme und Transkription werden verarbeitet...',
    recordedAudioReady: 'Audioaufnahme dieser Beobachtung beigefügt:',
    clearAudioBtn: 'Audioaufnahme entfernen',
    transcriptLabel: 'Audio-Transkript & Sachliche Beobachtungsnotizen',
    transcriptPlaceholder:
      'Der während der Audioaufnahme gesprochene Text erscheint automatisch hier. Sie können ihn bearbeiten oder ergänzen...',
    reflectionLabel: 'Pädagogische Reflexion / Nächste geplante Darbietung',
    reflectionPlaceholder:
      'Welche sensible Phase zeigt sich? Welches Material oder welche Darbietung folgt als Nächstes?',
    saveEntryBtn: 'Im Verlauf des Kindes speichern',
    savedToast: 'Beobachtung in der Kinderakte gespeichert!',
    childHistoryTitle: 'Individueller Beobachtungsverlauf für',
    childHistorySubtitle:
      'Alle Beobachtungssitzungen und Sprachaufnahmen chronologisch für dieses Kind gespeichert',
    noEntriesForChild:
      'Noch keine Beobachtungen für dieses Kind vorhanden. Nutzen Sie das Formular und die Audioaufnahme oben.',
    audioRecordingBadge: 'Audioaufnahme',
    listenAudioLabel: 'Audioaufnahme anhören:',
    deleteEntryTooltip: 'Diese Beobachtung löschen',
    individualReportTitle: 'Individueller Entwicklungs- & Beobachtungsbericht —',
    individualReportSubtitle:
      'Individualisierte Synthese basierend auf dem gesamten Beobachtungsverlauf des Kindes',
    generateReportBtn: 'Einzelbericht erstellen / aktualisieren',
    generatingReport: 'Einzelbericht wird erstellt...',
    exportChildPdfBtn: 'Individuellen Bericht als PDF herunterladen (A4)',
    reportSec1: '1. Gesamtsynthese & Erkundete Lernbereiche',
    reportSec2: '2. Konzentrationsdynamik, Selbstständigkeit & Normalisierung',
    reportSec3: '3. Pädagogische Empfehlungen & Nächste Schritte (Next Steps)',
    reportEmptyPrompt:
      'Klicken Sie auf „Einzelbericht erstellen / aktualisieren“ oder „Individuellen Bericht als PDF herunterladen (A4)“, um den Bericht für dieses Kind zu generieren.',
    deleteChildTooltip: 'Kinderakte löschen',
    deleteChildBtn: 'Kinderakte löschen',
    deleteChildModalTitle: 'Kinderakte endgültig löschen?',
    deleteChildModalMessage: 'Möchten Sie die Akte dieses Kindes wirklich löschen:',
    deleteChildModalWarning:
      'Diese Aktion löscht das Profil, alle Audioaufnahmen und den individuellen Bericht endgültig.',
    confirmDeleteChildBtn: 'Ja, Akte löschen',
    cancelDeleteBtn: 'Abbrechen',
    childDeletedToast: 'Kinderakte wurde gelöscht.',
    emptyChildrenRoster:
      'Noch keine Kinderakte angelegt. Klicken Sie oben auf „Neues Kind hinzufügen“.',
    areas: {
      practicalLife: 'Übungen des täglichen Lebens',
      sensorial: 'Sinnesmaterial',
      language: 'Sprache & Kommunikation',
      math: 'Mathematik & MINT',
      culture: 'Kultur & Wissenschaft (Kosmische Erziehung)',
      socialEmotional: 'Anmut, Höflichkeit & Sozialentwicklung',
    },
  },
};

const DEFAULT_CHILDREN: Record<Language, ChildProfile[]> = {
  ro: [
    {
      id: 'child-matei',
      name: 'Matei L.',
      age: '4 ani și 2 luni',
      classroom: 'Casa dei Bambini (3–6 ani)',
      createdAt: 1710000000000,
    },
    {
      id: 'child-sofia',
      name: 'Sofia M.',
      age: '3 ani și 8 luni',
      classroom: 'Casa dei Bambini (3–6 ani)',
      createdAt: 1710000001000,
    },
    {
      id: 'child-luca',
      name: 'Luca D.',
      age: '5 ani și 4 luni',
      classroom: 'Casa dei Bambini (3–6 ani)',
      createdAt: 1710000002000,
    },
  ],
  fr: [
    {
      id: 'child-matei',
      name: 'Matei L.',
      age: '4 ans et 2 mois',
      classroom: 'Maison des Enfants (3–6 ans)',
      createdAt: 1710000000000,
    },
    {
      id: 'child-sofia',
      name: 'Sofia M.',
      age: '3 ans et 8 mois',
      classroom: 'Maison des Enfants (3–6 ans)',
      createdAt: 1710000001000,
    },
    {
      id: 'child-luca',
      name: 'Luca D.',
      age: '5 ans et 4 mois',
      classroom: 'Maison des Enfants (3–6 ans)',
      createdAt: 1710000002000,
    },
  ],
  en: [
    {
      id: 'child-matei',
      name: 'Matei L.',
      age: '4 years 2 months',
      classroom: 'Children’s House (3–6 yrs)',
      createdAt: 1710000000000,
    },
    {
      id: 'child-sofia',
      name: 'Sofia M.',
      age: '3 years 8 months',
      classroom: 'Children’s House (3–6 yrs)',
      createdAt: 1710000001000,
    },
    {
      id: 'child-luca',
      name: 'Luca D.',
      age: '5 years 4 months',
      classroom: 'Children’s House (3–6 yrs)',
      createdAt: 1710000002000,
    },
  ],
  de: [
    {
      id: 'child-matei',
      name: 'Matei L.',
      age: '4 Jahre und 2 Monate',
      classroom: 'Kinderhaus (3–6 Jahre)',
      createdAt: 1710000000000,
    },
    {
      id: 'child-sofia',
      name: 'Sofia M.',
      age: '3 Jahre und 8 Monate',
      classroom: 'Kinderhaus (3–6 Jahre)',
      createdAt: 1710000001000,
    },
    {
      id: 'child-luca',
      name: 'Luca D.',
      age: '5 Jahre und 4 Monate',
      classroom: 'Kinderhaus (3–6 Jahre)',
      createdAt: 1710000002000,
    },
  ],
};

// Generate a tiny valid WAV data URL (soft chime tone) so default sample audio entries can be played back out-of-the-box
function createSampleWavDataUrl(): string {
  try {
    const sampleRate = 8000;
    const durationSec = 2;
    const numSamples = sampleRate * durationSec;
    const buffer = new ArrayBuffer(44 + numSamples);
    const view = new DataView(buffer);

    const writeString = (offset: number, str: string) => {
      for (let i = 0; i < str.length; i++) {
        view.setUint8(offset + i, str.charCodeAt(i));
      }
    };

    writeString(0, 'RIFF');
    view.setUint32(4, 36 + numSamples, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate, true);
    view.setUint16(32, 1, true);
    view.setUint16(34, 8, true);
    writeString(36, 'data');
    view.setUint32(40, numSamples, true);

    for (let i = 0; i < numSamples; i++) {
      const t = i / sampleRate;
      const env = Math.exp(-t * 1.8);
      const wave = Math.sin(2 * Math.PI * 440 * t) * 0.35 + Math.sin(2 * Math.PI * 660 * t) * 0.2;
      const sample = Math.max(0, Math.min(255, Math.round(128 + wave * env * 60)));
      view.setUint8(44 + i, sample);
    }

    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return 'data:audio/wav;base64,' + btoa(binary);
  } catch {
    return '';
  }
}

const SAMPLE_AUDIO_URL = createSampleWavDataUrl();

const DEFAULT_OBSERVATIONS: Record<Language, ChildAudioObservationEntry[]> = {
  ro: [
    {
      id: 'obs-matei-1',
      childId: 'child-matei',
      childName: 'Matei L.',
      date: new Date().toISOString().split('T')[0],
      time: '09:15',
      durationSec: 38,
      area: 'sensorial',
      materialUsed: 'Turnul Roz & Scara Maro',
      concentrationLevel: 5,
      transcriptNotes:
        'Matei a ales singur Turnul Roz de pe raft, a derulat covorașul și a construit turnul de 3 ori consecutiv. A verificat singur simetria cuburilor și a combinat apoi exercițiul cu Scara Maro timp de 30 de minute.',
      observerReflection:
        'Perioadă sensibilă intensă pentru ordine și rafinament vizual-dimensional. Pregătit pentru extensii geometrice.',
      audioDataUrl: SAMPLE_AUDIO_URL,
      createdAt: Date.now() - 86400000,
    },
    {
      id: 'obs-matei-2',
      childId: 'child-matei',
      childName: 'Matei L.',
      date: new Date().toISOString().split('T')[0],
      time: '10:20',
      durationSec: 25,
      area: 'language',
      materialUsed: 'Literele din șmirghel (m, a, t, s)',
      concentrationLevel: 4,
      transcriptNotes:
        'Matei a trasat cu două degete literele din șmirghel m, a, t și s, pronunțând clar sunetul fonetic și asociind cuvinte care încep cu fiecare sunet.',
      observerReflection:
        'Vom introduce Alfabetul Mobil Mic săptămâna viitoare pentru compunerea primelor cuvinte fonetice.',
      audioDataUrl: SAMPLE_AUDIO_URL,
      createdAt: Date.now() - 43200000,
    },
    {
      id: 'obs-sofia-1',
      childId: 'child-sofia',
      childName: 'Sofia M.',
      date: new Date().toISOString().split('T')[0],
      time: '09:40',
      durationSec: 32,
      area: 'practicalLife',
      materialUsed: 'Turnatul apei între două carafe de sticlă',
      concentrationLevel: 5,
      transcriptNotes:
        'Sofia a lucrat 25 de minute la tava de turnat apă. Când două picături au căzut pe tavă, a luat singură buretele și a șters cu mișcări lente și calme, fără a cere ajutorul adultului.',
      observerReflection:
        'Autonomie excelentă și coordonare oculo-motorie fină. Vom prezenta transferul cu pipeta.',
      audioDataUrl: SAMPLE_AUDIO_URL,
      createdAt: Date.now() - 60000000,
    },
    {
      id: 'obs-luca-1',
      childId: 'child-luca',
      childName: 'Luca D.',
      date: new Date().toISOString().split('T')[0],
      time: '10:05',
      durationSec: 41,
      area: 'math',
      materialUsed: 'Mărgelele Aurii — Sistemul Zecimal (Unitate, Zece, Sută, Mie)',
      concentrationLevel: 4,
      transcriptNotes:
        'Luca a așezat pe covoraș mărgelele aurii și simbolurile numerice mari, realizând singur asocierea cantitate-simbol pentru numere de 4 cifre.',
      observerReflection:
        'Stăpânește structura zecimală. Următorul pas: adunarea statică cu Mărgelele Aurii.',
      audioDataUrl: SAMPLE_AUDIO_URL,
      createdAt: Date.now() - 30000000,
    },
  ],
  fr: [
    {
      id: 'obs-matei-1',
      childId: 'child-matei',
      childName: 'Matei L.',
      date: new Date().toISOString().split('T')[0],
      time: '09:15',
      durationSec: 38,
      area: 'sensorial',
      materialUsed: 'Tour Rose & Escalier Marron',
      concentrationLevel: 5,
      transcriptNotes:
        'Matei a choisi librement la Tour Rose, a déroulé son tapis et a construit la tour 3 fois de suite avec une grande précision avant d’y associer l’Escalier Marron pendant 30 minutes.',
      observerReflection:
        'Période sensible marquée pour l’ordre et le raffinement visuel. Prêt pour les extensions géométriques.',
      audioDataUrl: SAMPLE_AUDIO_URL,
      createdAt: Date.now() - 86400000,
    },
    {
      id: 'obs-sofia-1',
      childId: 'child-sofia',
      childName: 'Sofia M.',
      date: new Date().toISOString().split('T')[0],
      time: '09:40',
      durationSec: 32,
      area: 'practicalLife',
      materialUsed: 'Verser de l’eau entre deux pichets en verre',
      concentrationLevel: 5,
      transcriptNotes:
        'Sofia a répété l’exercice de verser de l’eau pendant 25 minutes. Lorsqu’une goutte est tombée, elle a utilisé l’éponge spontanément pour essuyer le plateau.',
      observerReflection:
        'Excellente coordination œil-main et autonomie. Prochaine présentation : transfert avec compte-gouttes.',
      audioDataUrl: SAMPLE_AUDIO_URL,
      createdAt: Date.now() - 60000000,
    },
  ],
  en: [
    {
      id: 'obs-matei-1',
      childId: 'child-matei',
      childName: 'Matei L.',
      date: new Date().toISOString().split('T')[0],
      time: '09:15',
      durationSec: 38,
      area: 'sensorial',
      materialUsed: 'Pink Tower & Brown Stair',
      concentrationLevel: 5,
      transcriptNotes:
        'Matei independently selected the Pink Tower, unrolled his mat, and built the tower 3 times consecutively, self-correcting alignment and combining it with the Brown Stair for 30 minutes.',
      observerReflection:
        'Strong sensitive period for order and visual discrimination. Ready for advanced sensorial extensions.',
      audioDataUrl: SAMPLE_AUDIO_URL,
      createdAt: Date.now() - 86400000,
    },
    {
      id: 'obs-sofia-1',
      childId: 'child-sofia',
      childName: 'Sofia M.',
      date: new Date().toISOString().split('T')[0],
      time: '09:40',
      durationSec: 32,
      area: 'practicalLife',
      materialUsed: 'Water pouring between two glass pitchers',
      concentrationLevel: 5,
      transcriptNotes:
        'Sofia worked for 25 minutes pouring water. When two drops spilled onto the tray, she calmly picked up the sponge and wiped it dry without adult prompting.',
      observerReflection:
        'High independence and fine motor control. Next step: dropper transfer activity.',
      audioDataUrl: SAMPLE_AUDIO_URL,
      createdAt: Date.now() - 60000000,
    },
  ],
  de: [
    {
      id: 'obs-matei-1',
      childId: 'child-matei',
      childName: 'Matei L.',
      date: new Date().toISOString().split('T')[0],
      time: '09:15',
      durationSec: 38,
      area: 'sensorial',
      materialUsed: 'Rosa Turm & Braune Treppe',
      concentrationLevel: 5,
      transcriptNotes:
        'Matei wählte selbstständig den Rosa Turm, rollte seinen Teppich aus und baute den Turm dreimal hintereinander konzentriert auf, bevor er ihn 30 Minuten lang mit der Braunen Treppe kombinierte.',
      observerReflection:
        'Ausgeprägte sensible Phase für Ordnung und visuelle Differenzierung.',
      audioDataUrl: SAMPLE_AUDIO_URL,
      createdAt: Date.now() - 86400000,
    },
    {
      id: 'obs-sofia-1',
      childId: 'child-sofia',
      childName: 'Sofia M.',
      date: new Date().toISOString().split('T')[0],
      time: '09:40',
      durationSec: 32,
      area: 'practicalLife',
      materialUsed: 'Wassergießen zwischen zwei Glaskrügen',
      concentrationLevel: 5,
      transcriptNotes:
        'Sofia übte 25 Minuten lang das Wassergießen. Als zwei Tropfen daneben gingen, nahm sie selbstständig den Schwamm und trocknete das Tablett ruhig ab.',
      observerReflection:
        'Hohe Selbstständigkeit und feinmotorische Kontrolle. Nächster Schritt: Pipetten-Übung.',
      audioDataUrl: SAMPLE_AUDIO_URL,
      createdAt: Date.now() - 60000000,
    },
  ],
};

export const ChildFocusedAudioObservationModule: React.FC<
  ChildFocusedAudioObservationModuleProps
> = ({ institution, lang }) => {
  const t = MODULE_TEXTS[lang] || MODULE_TEXTS.ro;

  const [childrenList, setChildrenList] = useState<ChildProfile[]>(() => {
    try {
      const saved = localStorage.getItem('montessori_audio_children_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return DEFAULT_CHILDREN[lang] || DEFAULT_CHILDREN.ro;
  });

  const [entries, setEntries] = useState<ChildAudioObservationEntry[]>(() => {
    try {
      const saved = localStorage.getItem('montessori_audio_obs_entries_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return DEFAULT_OBSERVATIONS[lang] || DEFAULT_OBSERVATIONS.ro;
  });

  const [reportsByChild, setReportsByChild] = useState<Record<string, ChildIndividualReport>>(
    () => {
      try {
        const saved = localStorage.getItem('montessori_audio_child_reports_v1');
        if (saved) return JSON.parse(saved);
      } catch {}
      return {};
    }
  );

  const [selectedChildId, setSelectedChildId] = useState<string>(
    () => childrenList[0]?.id || 'child-matei'
  );
  const [autoDetectedChild, setAutoDetectedChild] = useState<boolean>(false);
  const [childToDelete, setChildToDelete] = useState<ChildProfile | null>(null);
  const [childDeletedToast, setChildDeletedToast] = useState<string | null>(null);

  // Add new child form state
  const [isAddingChild, setIsAddingChild] = useState(false);
  const [newChildName, setNewChildName] = useState('');
  const [newChildAge, setNewChildAge] = useState('');
  const [newChildClass, setNewChildClass] = useState(
    lang === 'fr'
      ? 'Maison des Enfants (3–6 ans)'
      : lang === 'en'
      ? 'Children’s House (3–6 yrs)'
      : lang === 'de'
      ? 'Kinderhaus (3–6 Jahre)'
      : 'Casa dei Bambini (3–6 ani)'
  );

  // New Observation Form state
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState(() => {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  });
  const [area, setArea] = useState<MontessoriAreaKey>('sensorial');
  const [materialUsed, setMaterialUsed] = useState('');
  const [concentrationLevel, setConcentrationLevel] = useState<1 | 2 | 3 | 4 | 5>(4);
  const [transcriptNotes, setTranscriptNotes] = useState('');
  const [observerReflection, setObserverReflection] = useState('');
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string>('');
  const [recordedDurationSec, setRecordedDurationSec] = useState<number>(0);
  const [saveToast, setSaveToast] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);

  // MediaRecorder for capturing playable audio data URL
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    try {
      localStorage.setItem('montessori_audio_children_v1', JSON.stringify(childrenList));
    } catch {}
  }, [childrenList]);

  useEffect(() => {
    try {
      localStorage.setItem('montessori_audio_obs_entries_v1', JSON.stringify(entries));
    } catch {}
  }, [entries]);

  useEffect(() => {
    try {
      localStorage.setItem('montessori_audio_child_reports_v1', JSON.stringify(reportsByChild));
    } catch {}
  }, [reportsByChild]);

  // Auto-detect mentioned child name in transcriptNotes
  const detectMentionedChild = (text: string) => {
    if (!text) return;
    const lower = text.toLowerCase();
    for (const child of childrenList) {
      const firstName = child.name.split(' ')[0].toLowerCase();
      if (firstName.length >= 3 && lower.includes(firstName)) {
        if (selectedChildId !== child.id) {
          setSelectedChildId(child.id);
          setAutoDetectedChild(true);
        }
        return;
      }
    }
  };

  // Base text present in notes before starting the current voice recording
  const baseTranscriptBeforeSessionRef = useRef<string>('');

  // Speech-to-text hook for real-time voice transcription while recording audio
  const {
    isListening,
    isTranscribing,
    audioLevel,
    durationSeconds,
    startListening,
    stopListening,
  } = useSpeechToText({
    lang,
    continuous: true,
    interimResults: true,
    onResult: (finalSegment, isFinal, fullSessionTranscript) => {
      if (isFinal) {
        const cleanSession = (fullSessionTranscript || finalSegment || '').trim();
        if (!cleanSession) return;
        const base = baseTranscriptBeforeSessionRef.current;
        const combined = base ? `${base} ${cleanSession}` : cleanSession;
        setTranscriptNotes(combined);
        detectMentionedChild(combined);
      }
    },
  });

  const handleStartAudioRecording = async () => {
    setAutoDetectedChild(false);
    baseTranscriptBeforeSessionRef.current = transcriptNotes.trim();
    startListening();

    if (typeof navigator !== 'undefined' && navigator.mediaDevices?.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioChunksRef.current = [];
        const recorder = new MediaRecorder(stream);
        mediaRecorderRef.current = recorder;

        recorder.ondataavailable = (e) => {
          if (e.data && e.data.size > 0) {
            audioChunksRef.current.push(e.data);
          }
        };

        recorder.onstop = () => {
          stream.getTracks().forEach((track) => track.stop());
          if (audioChunksRef.current.length > 0) {
            const blob = new Blob(audioChunksRef.current, {
              type: recorder.mimeType || 'audio/webm',
            });
            const reader = new FileReader();
            reader.onloadend = () => {
              if (typeof reader.result === 'string') {
                setRecordedAudioUrl(reader.result);
              }
            };
            reader.readAsDataURL(blob);
          }
        };

        recorder.start(250);
      } catch (err) {
        console.warn('MediaRecorder capture fallback:', err);
      }
    }
  };

  const handleStopAudioRecording = () => {
    setRecordedDurationSec(durationSeconds || 12);
    stopListening();
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      try {
        mediaRecorderRef.current.stop();
      } catch {}
    } else if (!recordedAudioUrl) {
      // Fallback playable audio tone if microphone hardware was unavailable
      setRecordedAudioUrl(SAMPLE_AUDIO_URL);
    }
  };

  const handleAddChild = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChildName.trim()) return;
    const newProfile: ChildProfile = {
      id: 'child-' + Date.now(),
      name: newChildName.trim(),
      age: newChildAge.trim() || (lang === 'ro' ? '4 ani' : lang === 'fr' ? '4 ans' : lang === 'de' ? '4 Jahre' : '4 yrs'),
      classroom: newChildClass.trim() || 'Casa dei Bambini (3–6)',
      createdAt: Date.now(),
    };
    setChildrenList((prev) => [...prev, newProfile]);
    setSelectedChildId(newProfile.id);
    setNewChildName('');
    setNewChildAge('');
    setIsAddingChild(false);
  };

  const selectedChild =
    childrenList.find((c) => c.id === selectedChildId) || childrenList[0];

  const childEntries = entries.filter((e) => e.childId === selectedChild?.id);

  const handleSaveObservationEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedChild) return;

    const newEntry: ChildAudioObservationEntry = {
      id: 'cobs-' + Date.now(),
      childId: selectedChild.id,
      childName: selectedChild.name,
      date,
      time,
      durationSec: recordedDurationSec || (recordedAudioUrl ? 15 : 0),
      area,
      materialUsed:
        materialUsed.trim() || t.areas[area],
      concentrationLevel,
      transcriptNotes:
        transcriptNotes.trim() ||
        (lang === 'ro'
          ? `Observație individuală înregistrată pentru ${selectedChild.name}.`
          : lang === 'fr'
          ? `Observation individuelle enregistrée pour ${selectedChild.name}.`
          : lang === 'de'
          ? `Einzelbeobachtung für ${selectedChild.name} protokolliert.`
          : `Individual observation recorded for ${selectedChild.name}.`),
      observerReflection: observerReflection.trim(),
      audioDataUrl: recordedAudioUrl || undefined,
      createdAt: Date.now(),
    };

    const updatedEntries = [newEntry, ...entries];
    setEntries(updatedEntries);

    // Automatically refresh the child's individual report
    const updatedChildEntries = updatedEntries.filter((item) => item.childId === selectedChild.id);
    const report = buildIndividualReportForChild(selectedChild, updatedChildEntries, lang, t);
    setReportsByChild((prev) => ({ ...prev, [selectedChild.id]: report }));

    setMaterialUsed('');
    setTranscriptNotes('');
    setObserverReflection('');
    setRecordedAudioUrl('');
    setRecordedDurationSec(0);
    setAutoDetectedChild(false);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3500);
  };

  const handleDeleteEntry = (entryId: string) => {
    setEntries((prev) => prev.filter((item) => item.id !== entryId));
  };

  const handleConfirmDeleteChild = () => {
    if (!childToDelete) return;
    const deletedId = childToDelete.id;
    const deletedName = childToDelete.name;

    const remainingChildren = childrenList.filter((c) => c.id !== deletedId);
    setChildrenList(remainingChildren);
    setEntries((prev) => prev.filter((item) => item.childId !== deletedId));
    setReportsByChild((prev) => {
      const next = { ...prev };
      delete next[deletedId];
      return next;
    });

    if (selectedChildId === deletedId) {
      setSelectedChildId(remainingChildren[0]?.id || '');
    }

    setChildToDelete(null);
    setChildDeletedToast(`${t.childDeletedToast} (${deletedName})`);
    setTimeout(() => setChildDeletedToast(null), 3500);
  };

  const buildIndividualReportForChild = (
    child: ChildProfile,
    history: ChildAudioObservationEntry[],
    currentLang: Language,
    texts: typeof t
  ): ChildIndividualReport => {
    const count = history.length;
    const audioCount = history.filter((h) => !!h.audioDataUrl).length;
    const avgFocus =
      count > 0
        ? (history.reduce((acc, item) => acc + item.concentrationLevel, 0) / count).toFixed(1)
        : '—';

    const distinctAreas = Array.from(new Set(history.map((h) => texts.areas[h.area])));
    const materials = Array.from(
      new Set(history.map((h) => h.materialUsed).filter(Boolean))
    );
    const reflections = history
      .map((h) => h.observerReflection)
      .filter(Boolean);

    if (currentLang === 'fr') {
      return {
        childId: child.id,
        generatedAt: new Date().toISOString().split('T')[0],
        summaryText: `${child.name} (${child.age}, ${child.classroom}) compte ${count} séance(s) d’observation enregistrée(s) (dont ${audioCount} avec enregistrement audio vocal).`,
        areasSummary:
          distinctAreas.length > 0
            ? `Domaines explorés : ${distinctAreas.join(', ')}.\nMatériels manipulés : ${materials.join(' • ')}.`
            : 'Aucune activité enregistrée pour le moment.',
        concentrationAnalysis: `Indice moyen de concentration : ${avgFocus} / 5. ${
          Number(avgFocus) >= 4
            ? 'L’enfant manifeste une polarisation soutenue de l’attention, une répétition spontanée de l’exercice et un état de normalisation harmonieux.'
            : 'L’enfant est en phase d’exploration active et construit progressivement sa capacité d’attention soutenue.'
        }`,
        nextSteps:
          reflections.length > 0
            ? reflections.map((r, idx) => `${idx + 1}. ${r}`).join('\n')
            : 'Continuer les présentations individuelles adaptées aux périodes sensibles observées.',
      };
    }

    if (currentLang === 'en') {
      return {
        childId: child.id,
        generatedAt: new Date().toISOString().split('T')[0],
        summaryText: `${child.name} (${child.age}, ${child.classroom}) has ${count} recorded observation session(s) (including ${audioCount} voice audio recording(s)).`,
        areasSummary:
          distinctAreas.length > 0
            ? `Explored curriculum areas: ${distinctAreas.join(', ')}.\nMaterials handled: ${materials.join(' • ')}.`
            : 'No activities recorded yet.',
        concentrationAnalysis: `Average concentration rating: ${avgFocus} / 5. ${
          Number(avgFocus) >= 4
            ? 'The child demonstrates sustained polarization of attention, spontaneous repetition, and a harmonious state of normalization.'
            : 'The child is actively exploring the prepared environment and building sustained focus.'
        }`,
        nextSteps:
          reflections.length > 0
            ? reflections.map((r, idx) => `${idx + 1}. ${r}`).join('\n')
            : 'Continue individual Three-Period Lessons aligned with the child’s active sensitive periods.',
      };
    }

    if (currentLang === 'de') {
      return {
        childId: child.id,
        generatedAt: new Date().toISOString().split('T')[0],
        summaryText: `${child.name} (${child.age}, ${child.classroom}) verfügt über ${count} dokumentierte Beobachtungssitzung(en) (davon ${audioCount} mit Sprachaufnahme).`,
        areasSummary:
          distinctAreas.length > 0
            ? `Erkundete Lernbereiche: ${distinctAreas.join(', ')}.\nVerwendete Materialien: ${materials.join(' • ')}.`
            : 'Noch keine Aktivitäten dokumentiert.',
        concentrationAnalysis: `Durchschnittlicher Konzentrationsgrad: ${avgFocus} / 5. ${
          Number(avgFocus) >= 4
            ? 'Das Kind zeigt eine ausgeprägte Polarisation der Aufmerksamkeit, spontane Wiederholung und fortgeschrittene Normalisierung.'
            : 'Das Kind befindet sich in einer aktiven Erkundungsphase und baut seine Ausdauer schrittweise auf.'
        }`,
        nextSteps:
          reflections.length > 0
            ? reflections.map((r, idx) => `${idx + 1}. ${r}`).join('\n')
            : 'Fortführung individueller Darbietungen entsprechend den beobachteten sensiblen Phasen.',
      };
    }

    return {
      childId: child.id,
      generatedAt: new Date().toISOString().split('T')[0],
      summaryText: `${child.name} (${child.age}, ${child.classroom}) are ${count} sesiuni de observare înregistrate în dosar (dintre care ${audioCount} cu înregistrare audio vocală).`,
      areasSummary:
        distinctAreas.length > 0
          ? `Arii curriculare explorate: ${distinctAreas.join(', ')}.\nMateriale și activități lucrate: ${materials.join(' • ')}.`
          : 'Nu există încă activități înregistrate.',
      concentrationAnalysis: `Nivel mediu de concentrare: ${avgFocus} / 5. ${
        Number(avgFocus) >= 4
          ? 'Copilul manifestă polarizarea atenției, repetiție spontană a exercițiului, autonomie în alegerea materialelor și o stare vizibilă de normalizare.'
          : 'Copilul se află în etapa de explorare activă a mediului pregătit și își consolidează treptat atenția voluntară.'
      }`,
      nextSteps:
        reflections.length > 0
          ? reflections.map((r, idx) => `${idx + 1}. ${r}`).join('\n')
          : 'Continuarea prezentărilor individuale în 3 timpi adaptate perioadelor sensibile active ale copilului.',
    };
  };

  const handleGenerateIndividualReport = async () => {
    if (!selectedChild) return;
    setIsGeneratingReport(true);
    try {
      const baseReport = buildIndividualReportForChild(
        selectedChild,
        childEntries,
        lang,
        t
      );
      setReportsByChild((prev) => ({
        ...prev,
        [selectedChild.id]: baseReport,
      }));
    } finally {
      setIsGeneratingReport(false);
    }
  };

  const currentChildReport =
    selectedChild &&
    (reportsByChild[selectedChild.id] ||
      buildIndividualReportForChild(selectedChild, childEntries, lang, t));

  const handleExportIndividualChildPdf = () => {
    if (!selectedChild) return;
    const report =
      reportsByChild[selectedChild.id] ||
      buildIndividualReportForChild(selectedChild, childEntries, lang, t);

    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const marginX = 15;
    const contentWidth = 180;
    let y = 14;

    const ensureSpace = (needed: number) => {
      if (y + needed > 276) {
        doc.addPage();
        y = 16;
      }
    };

    // Header Banner
    doc.setFillColor(31, 58, 43);
    doc.roundedRect(marginX, y, contentWidth, 24, 2, 2, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12.5);
    doc.setTextColor(255, 255, 255);
    doc.text(sanitizePdfText(institution.name), marginX + 5, y + 8);

    doc.setFontSize(9.5);
    doc.setTextColor(212, 163, 115);
    doc.text(
      sanitizePdfText(`${t.individualReportTitle} ${selectedChild.name}`.toUpperCase()),
      marginX + 5,
      y + 14.5
    );

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(230, 230, 230);
    doc.text(
      sanitizePdfText(
        `${selectedChild.age}  |  ${selectedChild.classroom}  |  ${report.generatedAt}`
      ),
      marginX + 5,
      y + 20.5
    );

    y += 30;

    // Summary Box
    const addReportSection = (heading: string, body: string) => {
      const lines = doc.splitTextToSize(sanitizePdfText(body), contentWidth - 8);
      const boxH = Math.max(lines.length * 4.2 + 8, 14);
      ensureSpace(boxH + 8);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(31, 58, 43);
      doc.text(sanitizePdfText(heading), marginX, y);
      y += 4;

      doc.setFillColor(244, 247, 245);
      doc.setDrawColor(200, 212, 205);
      doc.roundedRect(marginX, y, contentWidth, boxH, 1.5, 1.5, 'FD');

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.3);
      doc.setTextColor(40, 40, 40);
      doc.text(lines, marginX + 4, y + 5.5);

      y += boxH + 5;
    };

    addReportSection(
      t.reportSec1,
      `${report.summaryText}\n${report.areasSummary}`
    );
    addReportSection(t.reportSec2, report.concentrationAnalysis);
    addReportSection(t.reportSec3, report.nextSteps);

    // Chronological History Section
    ensureSpace(20);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(31, 58, 43);
    doc.text(
      sanitizePdfText(`${t.childHistoryTitle} ${selectedChild.name} (${childEntries.length})`),
      marginX,
      y
    );
    y += 5;

    childEntries.forEach((entry, idx) => {
      const notesLines = doc.splitTextToSize(
        sanitizePdfText(entry.transcriptNotes),
        contentWidth - 8
      );
      const reflLines = entry.observerReflection
        ? doc.splitTextToSize(
            sanitizePdfText(`-> ${entry.observerReflection}`),
            contentWidth - 8
          )
        : [];
      const cardH =
        12 + notesLines.length * 4 + (reflLines.length > 0 ? reflLines.length * 3.8 + 2 : 0);
      ensureSpace(cardH + 4);

      doc.setFillColor(250, 247, 242);
      doc.setDrawColor(212, 163, 115);
      doc.roundedRect(marginX, y, contentWidth, cardH, 1.5, 1.5, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.3);
      doc.setTextColor(31, 58, 43);
      const audioTag = entry.audioDataUrl ? ` [${t.audioRecordingBadge}]` : '';
      doc.text(
        sanitizePdfText(
          `${idx + 1}. ${entry.date} (${entry.time}) • ${t.areas[entry.area]} • ${entry.materialUsed} • Focus: ${entry.concentrationLevel}/5${audioTag}`
        ),
        marginX + 3.5,
        y + 5.2
      );

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(50, 50, 50);
      doc.text(notesLines, marginX + 3.5, y + 10);

      if (reflLines.length > 0) {
        doc.setFont('helvetica', 'italic');
        doc.setTextColor(46, 90, 68);
        doc.text(reflLines, marginX + 3.5, y + 10 + notesLines.length * 4 + 1);
      }

      y += cardH + 3;
    });

    const cleanSlug = sanitizePdfText(selectedChild.name)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-');
    doc.save(`raport-individual-${cleanSlug}-${report.generatedAt}.pdf`);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. Children Roster / Dossiers Selector */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
          <div>
            <h3 className="text-lg font-bold text-[#1F3A2B] font-serif flex items-center gap-2">
              <FolderOpen className="w-5 h-5 text-[#2E5A44]" />
              <span>{t.childrenRosterTitle}</span>
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">{t.childrenRosterSubtitle}</p>
          </div>
          <button
            type="button"
            onClick={() => setIsAddingChild((prev) => !prev)}
            className="px-4 py-2 bg-[#2E5A44] hover:bg-[#1F3A2B] text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
          >
            <UserPlus className="w-4 h-4 text-[#D4A373]" />
            <span>{t.addChildBtn}</span>
          </button>
        </div>

        {/* Add New Child Inline Form */}
        {isAddingChild && (
          <form
            onSubmit={handleAddChild}
            className="p-4 rounded-xl bg-[#F4F7F5] border border-[#2E5A44]/30 grid grid-cols-1 sm:grid-cols-4 gap-3 items-end"
          >
            <div>
              <input
                type="text"
                required
                value={newChildName}
                onChange={(e) => setNewChildName(e.target.value)}
                placeholder={t.newChildNamePlaceholder}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs text-gray-800 focus:outline-none focus:border-[#2E5A44]"
              />
            </div>
            <div>
              <input
                type="text"
                value={newChildAge}
                onChange={(e) => setNewChildAge(e.target.value)}
                placeholder={t.newChildAgePlaceholder}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs text-gray-800 focus:outline-none focus:border-[#2E5A44]"
              />
            </div>
            <div>
              <input
                type="text"
                value={newChildClass}
                onChange={(e) => setNewChildClass(e.target.value)}
                placeholder={t.newChildClassPlaceholder}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs text-gray-800 focus:outline-none focus:border-[#2E5A44]"
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                type="submit"
                className="px-3.5 py-2 bg-[#2E5A44] hover:bg-[#1F3A2B] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
              >
                {t.confirmAddChildBtn}
              </button>
              <button
                type="button"
                onClick={() => setIsAddingChild(false)}
                className="px-3 py-2 bg-white hover:bg-gray-100 text-gray-600 text-xs font-semibold rounded-lg border border-gray-200 transition-colors cursor-pointer"
              >
                {t.cancelBtn}
              </button>
            </div>
          </form>
        )}

        {/* Children Cards Grid */}
        {childrenList.length === 0 ? (
          <div className="p-8 text-center bg-[#F4F7F5]/80 rounded-2xl border-2 border-dashed border-[#2E5A44]/30 space-y-3">
            <UserPlus className="w-8 h-8 text-[#2E5A44]/60 mx-auto" />
            <p className="text-xs text-gray-600 font-medium">{t.emptyChildrenRoster}</p>
            <button
              type="button"
              onClick={() => setIsAddingChild(true)}
              className="px-4 py-2 bg-[#2E5A44] hover:bg-[#1F3A2B] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              {t.addChildBtn}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {childrenList.map((child) => {
              const cObs = entries.filter((e) => e.childId === child.id);
              const cAudio = cObs.filter((e) => !!e.audioDataUrl).length;
              const cAvg =
                cObs.length > 0
                  ? (
                      cObs.reduce((sum, item) => sum + item.concentrationLevel, 0) / cObs.length
                    ).toFixed(1)
                  : '—';
              const isSelected = selectedChild?.id === child.id;

              return (
                <div
                  key={child.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    setSelectedChildId(child.id);
                    setAutoDetectedChild(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setSelectedChildId(child.id);
                      setAutoDetectedChild(false);
                    }
                  }}
                  className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between gap-2.5 ${
                    isSelected
                      ? 'bg-[#2E5A44] text-white border-[#1F3A2B] shadow-md'
                      : 'bg-[#F4F7F5]/60 hover:bg-[#F4F7F5] text-gray-800 border-gray-200 hover:border-[#2E5A44]/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center font-serif font-bold text-sm ${
                          isSelected
                            ? 'bg-[#D4A373] text-[#1F3A2B]'
                            : 'bg-[#2E5A44] text-white'
                        }`}
                      >
                        {child.name.charAt(0)}
                      </div>
                      <div>
                        <h4
                          className={`text-sm font-bold font-serif ${
                            isSelected ? 'text-white' : 'text-[#1F3A2B]'
                          }`}
                        >
                          {child.name}
                        </h4>
                        <p
                          className={`text-[11px] ${
                            isSelected ? 'text-white/80' : 'text-gray-500'
                          }`}
                        >
                          {child.age} • {child.classroom}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`flex flex-wrap items-center justify-between gap-2 pt-2 border-t text-[11px] ${
                      isSelected
                        ? 'border-white/15 text-white/90'
                        : 'border-gray-200/80 text-gray-600'
                    }`}
                  >
                    <span className="font-semibold">
                      📋 {cObs.length} {t.obsCountLabel}
                    </span>
                    <span>
                      🎙️ {cAudio} {t.audioCountLabel}
                    </span>
                    <span className="font-bold">
                      ⭐ {cAvg}/5
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 2. Audio Recording & Observation Entry Form */}
      <form
        onSubmit={handleSaveObservationEntry}
        className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-5"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
          <div>
            <h3 className="text-base font-bold text-[#1F3A2B] font-serif flex items-center gap-2">
              <Mic className="w-5 h-5 text-[#2E5A44]" />
              <span>{t.newObsCardTitle}</span>
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">{t.newObsCardSubtitle}</p>
          </div>
          {saveToast && (
            <div className="px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{t.savedToast}</span>
            </div>
          )}
        </div>

        {/* Dedicated Audio Recorder Box */}
        <div className="p-5 rounded-2xl bg-[#FAF7F2] border-2 border-[#D4A373]/60 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-[#1F3A2B] font-serif flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-[#2E5A44]" />
                <span>{t.audioRecorderTitle}</span>
              </h4>
              <p className="text-xs text-gray-600">{t.audioRecorderHint}</p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {!isListening ? (
                <button
                  type="button"
                  onClick={handleStartAudioRecording}
                  disabled={isTranscribing}
                  className="px-5 py-3 bg-[#2E5A44] hover:bg-[#1F3A2B] text-white text-xs font-bold rounded-xl shadow-md border border-[#1F3A2B] flex items-center gap-2.5 transition-all cursor-pointer"
                >
                  <Mic className="w-4 h-4 text-[#D4A373]" />
                  <span>{t.startAudioBtn}</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleStopAudioRecording}
                  className="px-5 py-3 bg-[#D4A373] hover:bg-[#c29363] text-[#1F3A2B] text-xs font-bold rounded-xl shadow-md border-2 border-[#1F3A2B] flex items-center gap-2.5 transition-all cursor-pointer animate-pulse"
                >
                  <Square className="w-4 h-4 fill-[#1F3A2B] text-[#1F3A2B]" />
                  <span>
                    {t.stopAudioBtn} ({durationSeconds}s)
                  </span>
                </button>
              )}
            </div>
          </div>

          {/* Live Recording Status Bar */}
          {isListening && (
            <div className="p-3 rounded-xl bg-[#1F3A2B] text-white flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4A373] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#D4A373]"></span>
                </span>
                <span className="font-semibold text-[#D4A373]">{t.recordingInProgress}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-end gap-1 h-4">
                  {[0.15, 0.3, 0.45, 0.6, 0.75, 0.9].map((threshold, i) => (
                    <span
                      key={i}
                      style={{ height: `${Math.max(25, ((i + 1) / 6) * 100)}%` }}
                      className={`w-1 rounded-full transition-all ${
                        audioLevel / 100 >= threshold ? 'bg-[#D4A373]' : 'bg-white/25'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-mono text-xs text-white/85">{durationSeconds}s</span>
              </div>
            </div>
          )}

          {isTranscribing && (
            <div className="flex items-center gap-2 text-xs text-[#2E5A44] font-semibold">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>{t.transcribingAudio}</span>
            </div>
          )}

          {/* Recorded Audio Preview Player */}
          {recordedAudioUrl && !isListening && (
            <div className="p-3 rounded-xl bg-white border border-[#2E5A44]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#1F3A2B]">
                <Volume2 className="w-4 h-4 text-[#2E5A44]" />
                <span>{t.recordedAudioReady}</span>
              </div>
              <div className="flex items-center gap-3">
                <audio controls src={recordedAudioUrl} className="h-8 max-w-[240px]" />
                <button
                  type="button"
                  onClick={() => setRecordedAudioUrl('')}
                  className="text-xs text-red-600 hover:underline cursor-pointer"
                >
                  {t.clearAudioBtn}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Form Metadata Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-[#1F3A2B]">
                {t.selectChildLabel}
              </label>
              {autoDetectedChild && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  {t.autoDetectedBadge}
                </span>
              )}
            </div>
            <select
              value={selectedChild?.id || ''}
              onChange={(e) => {
                setSelectedChildId(e.target.value);
                setAutoDetectedChild(false);
              }}
              className="w-full px-3.5 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs font-semibold text-gray-800 focus:bg-white focus:outline-none focus:border-[#2E5A44]"
            >
              {childrenList.length === 0 ? (
                <option value="">— {t.emptyChildrenRoster} —</option>
              ) : (
                childrenList.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.age})
                  </option>
                ))
              )}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1F3A2B] mb-1">
              {t.areaLabel}
            </label>
            <select
              value={area}
              onChange={(e) => setArea(e.target.value as MontessoriAreaKey)}
              className="w-full px-3.5 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs text-gray-800 focus:bg-white focus:outline-none focus:border-[#2E5A44]"
            >
              {(Object.keys(t.areas) as MontessoriAreaKey[]).map((key) => (
                <option key={key} value={key}>
                  {t.areas[key]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1F3A2B] mb-1 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#2E5A44]" />
              <span>{t.dateLabel}</span>
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
              <span>{t.timeLabel}</span>
            </label>
            <input
              type="text"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="09:30"
              className="w-full px-3.5 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs text-gray-800 focus:bg-white focus:outline-none focus:border-[#2E5A44]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#1F3A2B] mb-1">
              {t.materialLabel}
            </label>
            <input
              type="text"
              value={materialUsed}
              onChange={(e) => setMaterialUsed(e.target.value)}
              placeholder={t.materialPlaceholder}
              className="w-full px-3.5 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs text-gray-800 focus:bg-white focus:outline-none focus:border-[#2E5A44]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1F3A2B] mb-1">
              {t.concentrationLabel}
            </label>
            <select
              value={concentrationLevel}
              onChange={(e) =>
                setConcentrationLevel(Number(e.target.value) as 1 | 2 | 3 | 4 | 5)
              }
              className="w-full px-3.5 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs text-gray-800 focus:bg-white focus:outline-none focus:border-[#2E5A44]"
            >
              {[1, 2, 3, 4, 5].map((lvl) => (
                <option key={lvl} value={lvl}>
                  {t.concentrationLevels[lvl]}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Transcript & Notes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
          <div className="flex flex-col h-full space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#1F3A2B]">
                {t.transcriptLabel}
              </label>
              <SpeechToTextButton
                lang={lang}
                currentValue={transcriptNotes}
                onTranscript={(val) => {
                  setTranscriptNotes(val);
                  detectMentionedChild(val);
                }}
                variant="pill"
              />
            </div>
            <AutoResizeTextarea
              minRows={4}
              value={transcriptNotes}
              onChange={(e) => {
                setTranscriptNotes(e.target.value);
                detectMentionedChild(e.target.value);
              }}
              placeholder={t.transcriptPlaceholder}
              className="flex-1 w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-xs text-gray-800 focus:bg-white focus:outline-none focus:border-[#2E5A44]"
            />
          </div>

          <div className="flex flex-col h-full space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#1F3A2B]">
                {t.reflectionLabel}
              </label>
              <SpeechToTextButton
                lang={lang}
                currentValue={observerReflection}
                onTranscript={setObserverReflection}
                variant="pill"
              />
            </div>
            <AutoResizeTextarea
              minRows={4}
              value={observerReflection}
              onChange={(e) => setObserverReflection(e.target.value)}
              placeholder={t.reflectionPlaceholder}
              className="flex-1 w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-xs text-gray-800 focus:bg-white focus:outline-none focus:border-[#2E5A44]"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!selectedChild}
            className="px-5 py-2.5 bg-[#2E5A44] hover:bg-[#1F3A2B] disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#D4A373]" />
            <span>
              {t.saveEntryBtn} {selectedChild ? `(${selectedChild.name})` : ''}
            </span>
          </button>
        </div>
      </form>

      {/* 3. Individual Child Report Card (Generated per Child) */}
      {selectedChild && currentChildReport && (
        <div className="bg-white p-6 rounded-2xl border-2 border-[#2E5A44]/30 shadow-sm space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-gray-100 pb-4">
            <div>
              <h3 className="text-base font-bold text-[#1F3A2B] font-serif flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#2E5A44]" />
                <span>
                  {t.individualReportTitle} {selectedChild.name}
                </span>
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                {t.individualReportSubtitle} ({selectedChild.age} • {selectedChild.classroom})
              </p>
            </div>

            <div className="flex flex-col gap-2 shrink-0 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleGenerateIndividualReport}
                disabled={isGeneratingReport}
                className="w-full justify-center px-4 py-2 bg-[#FAF7F2] hover:bg-[#F2ECE1] text-[#1F3A2B] border border-[#D4A373] text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
              >
                <Sparkles className="w-4 h-4 text-[#8C5E28]" />
                <span>
                  {isGeneratingReport ? t.generatingReport : t.generateReportBtn}
                </span>
              </button>

              <button
                type="button"
                onClick={handleExportIndividualChildPdf}
                className="w-full justify-center px-4 py-2 bg-[#2E5A44] hover:bg-[#1F3A2B] text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <FileDown className="w-4 h-4 text-[#D4A373]" />
                <span>{t.exportChildPdfBtn}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-[#F4F7F5] border border-[#2E5A44]/20 space-y-1.5">
              <h4 className="text-xs font-bold text-[#1F3A2B]">{t.reportSec1}</h4>
              <p className="text-xs text-gray-700 whitespace-pre-line leading-relaxed">
                {currentChildReport.summaryText}
                {'\n\n'}
                {currentChildReport.areasSummary}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#F4F7F5] border border-[#2E5A44]/20 space-y-1.5">
              <h4 className="text-xs font-bold text-[#1F3A2B]">{t.reportSec2}</h4>
              <p className="text-xs text-gray-700 whitespace-pre-line leading-relaxed">
                {currentChildReport.concentrationAnalysis}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#D4A373]/50 space-y-1.5">
              <h4 className="text-xs font-bold text-[#1F3A2B]">{t.reportSec3}</h4>
              <p className="text-xs text-gray-700 whitespace-pre-line leading-relaxed">
                {currentChildReport.nextSteps}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 4. Individual Chronological History for the Selected Child */}
      {selectedChild && (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-[#1F3A2B] font-serif flex items-center gap-2">
                <History className="w-5 h-5 text-[#2E5A44]" />
                <span>
                  {t.childHistoryTitle} {selectedChild.name} ({childEntries.length})
                </span>
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">{t.childHistorySubtitle}</p>
            </div>

            <button
              type="button"
              onClick={() => setChildToDelete(selectedChild)}
              className="px-3.5 py-1.5 text-xs text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-200 rounded-xl font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
              title={t.deleteChildTooltip}
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{t.deleteChildBtn}</span>
            </button>
          </div>

          {childEntries.length === 0 ? (
            <p className="text-xs text-gray-500 italic py-4">{t.noEntriesForChild}</p>
          ) : (
            <div className="space-y-3.5">
              {childEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="p-4 rounded-2xl bg-[#F4F7F5]/60 border border-gray-200 space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="px-2.5 py-1 rounded-lg bg-[#2E5A44] text-white font-bold">
                        {t.areas[entry.area]}
                      </span>
                      <span className="font-bold text-[#1F3A2B]">
                        {entry.materialUsed}
                      </span>
                      <span className="text-gray-500">
                        • {entry.date} ({entry.time})
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 font-semibold flex items-center gap-1">
                        <Star className="w-3 h-3 fill-[#D4A373] text-[#D4A373]" />
                        {entry.concentrationLevel}/5
                      </span>
                      {entry.audioDataUrl && (
                        <span className="px-2.5 py-0.5 rounded-full bg-[#FAF7F2] text-[#1F3A2B] border border-[#D4A373] font-bold flex items-center gap-1">
                          <Volume2 className="w-3 h-3 text-[#2E5A44]" />
                          {t.audioRecordingBadge}
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeleteEntry(entry.id)}
                      title={t.deleteEntryTooltip}
                      className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs text-gray-800 leading-relaxed whitespace-pre-line bg-white p-3 rounded-xl border border-gray-200/80">
                    {entry.transcriptNotes}
                  </p>

                  {entry.observerReflection && (
                    <p className="text-xs text-[#2E5A44] italic bg-[#FAF7F2] p-2.5 rounded-xl border border-[#D4A373]/40">
                      💡 {entry.observerReflection}
                    </p>
                  )}

                  {entry.audioDataUrl && (
                    <div className="pt-1 flex flex-wrap items-center gap-3">
                      <span className="text-[11px] font-bold text-[#1F3A2B] flex items-center gap-1">
                        <Volume2 className="w-3.5 h-3.5 text-[#2E5A44]" />
                        {t.listenAudioLabel}
                      </span>
                      <audio controls src={entry.audioDataUrl} className="h-8" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Delete Child Dossier Confirmation Modal */}
      {childToDelete && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="w-11 h-11 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                <Trash2 className="w-6 h-6" />
              </div>
              <button
                type="button"
                onClick={() => setChildToDelete(null)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <h3 className="text-base font-bold text-[#1F3A2B] font-serif">
                {t.deleteChildModalTitle}
              </h3>
              <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                {t.deleteChildModalMessage} <strong className="text-red-700 font-bold">{childToDelete.name}</strong> ({childToDelete.age} • {childToDelete.classroom})?
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-red-50/70 border border-red-200 text-xs text-red-800 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-red-900">
                <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{t.deleteChildModalWarning}</span>
              </div>
              <p className="text-[11px] text-red-700 pl-5">
                • {entries.filter((e) => e.childId === childToDelete.id).length} {t.obsCountLabel}
              </p>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setChildToDelete(null)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                {t.cancelDeleteBtn}
              </button>
              <button
                type="button"
                onClick={handleConfirmDeleteChild}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>{t.confirmDeleteChildBtn}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Child Deleted Toast Notification */}
      {childDeletedToast && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 bg-[#1F3A2B] text-white border border-[#D4A373] rounded-xl shadow-xl text-xs font-bold flex items-center gap-2 animate-in slide-in-from-bottom duration-200">
          <Trash2 className="w-4 h-4 text-[#D4A373]" />
          <span>{childDeletedToast}</span>
        </div>
      )}
    </div>
  );
};
