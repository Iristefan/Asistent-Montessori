import { jsPDF } from 'jspdf';
import { InstitutionConfig, ChildObservationRecord } from '../types';
import { Language } from '../i18n/translations';
import { sanitizePdfText } from './aiPdfExport';

export interface ChildObservationExportOptions {
  record: ChildObservationRecord;
  institution?: InstitutionConfig;
  lang: Language;
}

export function exportChildObservationToPdf({
  record,
  institution,
  lang,
}: ChildObservationExportOptions) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  const defaultSub =
    lang === 'fr'
      ? 'École Montessori Bilingue (Crèche, Maternelle, Primaire)'
      : lang === 'en'
      ? 'Bilingual Montessori School (Infant Community, Children’s House, Elementary)'
      : lang === 'de'
      ? 'Bilinguale Montessori-Schule (Kleinkind, Kinderhaus, Primarstufe)'
      : 'Școală Montessori Bilingvă (Creșă, Grădiniță, Școală Primară)';

  const defaultInst: InstitutionConfig = institution || {
    name: "L'ECOLE DES PREALPES",
    subtitle: defaultSub,
    contact: 'Place de la Gare 14-16, 1618 Châtel-St-Denis | contact@ecole-des-prealpes.ch',
  };

  const labelsByLang: Record<Language, {
    title: string;
    sub: string;
    emitted: string;
    profile: string;
    childName: string;
    childAge: string;
    childLevel: string;
    date: string;
    observer: string;
    domainsTitle: string;
    colArea: string;
    colStatus: string;
    colNotes: string;
    generalTitle: string;
    nextStepsTitle: string;
    signatureGuide: string;
    signatureAssistant: string;
    pageLabel: string;
    vp: string;
    senz: string;
    lang: string;
    math: string;
    cult: string;
    soc: string;
    mastered: string;
    practicing: string;
    presented: string;
    unaddressed: string;
  }> = {
    ro: {
      title: 'FISA DE OBSERVARE INDIVIDUALA A COPILULUI',
      sub: 'Evaluare Formativa & Urmarirea Progresului in Mediul Pregatit',
      emitted: 'Document oficial emis conform standardelor pedagogice Montessori',
      profile: 'Profil Copil & Informatii Evaluare',
      childName: 'Copil (Nume/Initiale):',
      childAge: 'Varsta:',
      childLevel: 'Nivel Clasa:',
      date: 'Data Observatiei:',
      observer: 'Observator (Ghid / Asistent):',
      domainsTitle: '1. Progresul pe Domeniile de Dezvoltare Montessori',
      colArea: 'Aria Curriculara',
      colStatus: 'Stadiu Activitate',
      colNotes: 'Observatii Specifice & Materiale Utilizate',
      generalTitle: '2. Sinteza Generala & Starea de Concentrare / Normalizare',
      nextStepsTitle: '3. Recomandari & Urmatoarele Prezentari (Next Steps)',
      signatureGuide: 'Verificat de Ghidul Clasei:',
      signatureAssistant: 'Semnatura Asistent Montessori:',
      pageLabel: 'Pagina',
      vp: 'Viata Practica',
      senz: 'Senzorial',
      lang: 'Limbaj',
      math: 'Matematica & STEM',
      cult: 'Cultura & Stiinte',
      soc: 'Social-Emotional & Normalizare',
      mastered: 'Stapanit / Normalizat',
      practicing: 'In Exersare',
      presented: 'Prezentat',
      unaddressed: 'Neabordat',
    },
    fr: {
      title: 'FICHE D\'OBSERVATION INDIVIDUELLE DE L\'ENFANT',
      sub: 'Evaluation Formative & Suivi des Progres dans l\'Ambiance Preparee',
      emitted: 'Document officiel emis selon les principes de la pedagogie Montessori',
      profile: 'Profil de l\'Enfant & Donnees d\'Evaluation',
      childName: 'Enfant (Nom/Initiales):',
      childAge: 'Age:',
      childLevel: 'Niveau de Classe:',
      date: 'Date d\'Observation:',
      observer: 'Observateur (Educateur / Assistant):',
      domainsTitle: '1. Progres par Domaines de Developpement Montessori',
      colArea: 'Domaine Curriculaire',
      colStatus: 'Stade d\'Activite',
      colNotes: 'Observations Specifiques & Materiel Manipule',
      generalTitle: '2. Synthese Generale & Etat de Concentration / Normalisation',
      nextStepsTitle: '3. Recommandations & Prochaines Presentations (Next Steps)',
      signatureGuide: 'Verifie par l\'Educateur de Classe:',
      signatureAssistant: 'Signature de l\'Assistant Montessori:',
      pageLabel: 'Page',
      vp: 'Vie Pratique',
      senz: 'Sensoriel',
      lang: 'Langage',
      math: 'Mathematiques & STEM',
      cult: 'Culture & Sciences',
      soc: 'Socio-Emotionnel & Normalisation',
      mastered: 'Maitrise / Normalise',
      practicing: 'En Exercice',
      presented: 'Presente',
      unaddressed: 'Non Aborde',
    },
    en: {
      title: 'INDIVIDUAL CHILD OBSERVATION RECORD',
      sub: 'Formative Assessment & Progress Tracking in the Prepared Environment',
      emitted: 'Official record issued adhering to Montessori pedagogical standards',
      profile: 'Child Profile & Assessment Overview',
      childName: 'Child (Name/Initials):',
      childAge: 'Age:',
      childLevel: 'Classroom Level:',
      date: 'Observation Date:',
      observer: 'Observer (Lead Guide / Assistant):',
      domainsTitle: '1. Progress Across Montessori Development Areas',
      colArea: 'Curricular Area',
      colStatus: 'Activity Stage',
      colNotes: 'Specific Clinical Notes & Materials Handled',
      generalTitle: '2. General Summary & State of Concentration / Normalization',
      nextStepsTitle: '3. Recommendations & Next Presentations (Next Steps)',
      signatureGuide: 'Verified by Lead Guide:',
      signatureAssistant: 'Montessori Assistant Signature:',
      pageLabel: 'Page',
      vp: 'Practical Life',
      senz: 'Sensorial',
      lang: 'Language',
      math: 'Mathematics & STEM',
      cult: 'Culture & Sciences',
      soc: 'Social-Emotional & Normalization',
      mastered: 'Mastered / Normalized',
      practicing: 'Practicing',
      presented: 'Presented',
      unaddressed: 'Unaddressed',
    },
    de: {
      title: 'INDIVIDUELLER BEOBACHTUNGSBOGEN DES KINDES',
      sub: 'Formative Entwicklungsdokumentation in der Vorbereiteten Umgebung',
      emitted: 'Offizielles Dokument gemaess den Grundsaetzen der Montessori-Paedagogik',
      profile: 'Kinderprofil & Erhebungsuebersicht',
      childName: 'Kind (Name/Initialen):',
      childAge: 'Alter:',
      childLevel: 'Altersgruppe:',
      date: 'Beobachtungsdatum:',
      observer: 'Beobachter (Paedagoge / Assistent):',
      domainsTitle: '1. Entwicklung in den Montessori-Lernbereichen',
      colArea: 'Lernbereich',
      colStatus: 'Taetigkeitsstufe',
      colNotes: 'Spezifische Beobachtungen & verwendete Materialien',
      generalTitle: '2. Gesamtsynthese & Konzentrationszustand / Normalisierung',
      nextStepsTitle: '3. Empfehlungen & Naechste Darbietungen (Next Steps)',
      signatureGuide: 'Geprueft von der Gruppenleitung:',
      signatureAssistant: 'Unterschrift Montessori-Assistent:',
      pageLabel: 'Seite',
      vp: 'Uebungen des taeglichen Lebens',
      senz: 'Sinnesmaterial',
      lang: 'Sprache',
      math: 'Mathematik & MINT',
      cult: 'Kosmische Erziehung & Natur',
      soc: 'Sozial-Emotionale Entwicklung',
      mastered: 'Gemeistert / Normalisiert',
      practicing: 'In Uebung',
      presented: 'Dargeboten',
      unaddressed: 'Noch nicht eingefuehrt',
    },
  };

  const L = labelsByLang[lang] || labelsByLang.fr;

  const drawHeader = () => {
    // Institutional Top Box
    doc.setFillColor(31, 58, 43); // #1F3A2B
    doc.roundedRect(margin, y, contentWidth, 22, 2.5, 2.5, 'F');

    // Logo Emblem
    doc.setFillColor(212, 163, 115); // #D4A373
    doc.circle(margin + 11, y + 11, 7.5, 'F');
    doc.setFillColor(31, 58, 43);
    doc.circle(margin + 11, y + 11, 6.5, 'F');
    doc.setFillColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('M', margin + 9.2, y + 14.5);

    // School Name & Subtitle
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text(sanitizePdfText(defaultInst.name.toUpperCase()), margin + 22, y + 7.5);

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7.5);
    doc.setTextColor(231, 201, 169); // #E7C9A9
    doc.text(sanitizePdfText(defaultInst.subtitle), margin + 22, y + 13);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(220, 225, 220);
    doc.text(sanitizePdfText(defaultInst.contact), margin + 22, y + 18);

    y += 28;

    // Document Title Banner
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(31, 58, 43);
    doc.text(L.title, margin, y);
    y += 5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(74, 107, 93); // #4A6B5D
    doc.text(L.sub, margin, y);
    y += 4;

    doc.setDrawColor(46, 90, 68);
    doc.setLineWidth(0.8);
    doc.line(margin, y, margin + contentWidth, y);
    y += 7;
  };

  drawHeader();

  // Child Profile Metadata Card
  doc.setFillColor(244, 247, 245);
  doc.setDrawColor(210, 220, 215);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, y, contentWidth, 22, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(46, 90, 68);

  // Row 1
  doc.text(L.childName, margin + 4, y + 6);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(20, 20, 20);
  doc.text(sanitizePdfText(record.childName || '—'), margin + 35, y + 6);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(46, 90, 68);
  doc.text(L.childAge, margin + 90, y + 6);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(20, 20, 20);
  doc.text(sanitizePdfText(record.childAge || '—'), margin + 110, y + 6);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(46, 90, 68);
  doc.text(L.childLevel, margin + 138, y + 6);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(20, 20, 20);
  doc.text(sanitizePdfText(record.childLevel || '—'), margin + 158, y + 6);

  // Row 2
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(46, 90, 68);
  doc.text(L.date, margin + 4, y + 15);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(20, 20, 20);
  doc.text(sanitizePdfText(record.date || new Date().toISOString().split('T')[0]), margin + 35, y + 15);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(46, 90, 68);
  doc.text(L.observer, margin + 90, y + 15);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(20, 20, 20);
  doc.text(sanitizePdfText(record.observerName || '—'), margin + 135, y + 15);

  y += 28;

  // Section 1: 6 Curricular Domains Table
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(31, 58, 43);
  doc.text(L.domainsTitle, margin, y);
  y += 4;

  // Table Header
  const col1W = 42;
  const col2W = 42;
  const col3W = contentWidth - col1W - col2W;

  doc.setFillColor(46, 90, 68);
  doc.rect(margin, y, contentWidth, 7, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.text(L.colArea, margin + 3, y + 4.8);
  doc.text(L.colStatus, margin + col1W + 3, y + 4.8);
  doc.text(L.colNotes, margin + col1W + col2W + 3, y + 4.8);
  y += 7;

  const getStatusLabel = (st: string) => {
    switch (st) {
      case 'mastered':
        return L.mastered;
      case 'practicing':
        return L.practicing;
      case 'presented':
        return L.presented;
      default:
        return L.unaddressed;
    }
  };

  const domainRows = [
    { name: L.vp, data: record.domains.practicalLife },
    { name: L.senz, data: record.domains.sensorial },
    { name: L.lang, data: record.domains.language },
    { name: L.math, data: record.domains.mathStem },
    { name: L.cult, data: record.domains.cultural },
    { name: L.soc, data: record.domains.socialEmotional },
  ];

  domainRows.forEach((row, idx) => {
    const isEven = idx % 2 === 0;
    const rowH = 13;

    doc.setFillColor(isEven ? 255 : 248, isEven ? 255 : 250, isEven ? 255 : 249);
    doc.rect(margin, y, contentWidth, rowH, 'F');
    doc.setDrawColor(220, 225, 220);
    doc.setLineWidth(0.2);
    doc.line(margin, y + rowH, margin + contentWidth, y + rowH);

    // Area
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(31, 58, 43);
    doc.text(row.name, margin + 3, y + 5);

    // Status Badge
    const stLabel = getStatusLabel(row.data.status);
    doc.setFillColor(row.data.status === 'mastered' ? 230 : row.data.status === 'practicing' ? 240 : 245, 245, 235);
    doc.roundedRect(margin + col1W + 2, y + 2, col2W - 4, 6, 1.5, 1.5, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.8);
    doc.setTextColor(row.data.status === 'mastered' ? 30 : 60, 100, 50);
    doc.text(stLabel, margin + col1W + 4, y + 6);

    // Notes
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(50, 50, 50);
    const notesText = sanitizePdfText(row.data.notes || '—');
    const splitNotes = doc.splitTextToSize(notesText, col3W - 6);
    doc.text(splitNotes.slice(0, 2), margin + col1W + col2W + 3, y + 4.8);

    y += rowH;
  });

  y += 7;

  // Section 2: General Summary & Concentration
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(31, 58, 43);
  doc.text(L.generalTitle, margin, y);
  y += 3;

  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(200, 210, 205);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, y, contentWidth, 18, 1.5, 1.5, 'FD');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(40, 40, 40);
  const genLines = doc.splitTextToSize(sanitizePdfText(record.generalObs || '—'), contentWidth - 8);
  doc.text(genLines.slice(0, 3), margin + 4, y + 5);
  y += 24;

  // Section 3: Next Steps & Recommended Presentations
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(31, 58, 43);
  doc.text(L.nextStepsTitle, margin, y);
  y += 3;

  doc.setFillColor(244, 247, 245);
  doc.setDrawColor(212, 163, 115); // gold left accent
  doc.setLineWidth(0.8);
  doc.roundedRect(margin, y, contentWidth, 18, 1.5, 1.5, 'FD');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(40, 40, 40);
  const nextLines = doc.splitTextToSize(sanitizePdfText(record.nextSteps || '—'), contentWidth - 8);
  doc.text(nextLines.slice(0, 3), margin + 4, y + 5);
  y += 26;

  // Signatures Area
  doc.setDrawColor(180, 190, 185);
  doc.setLineWidth(0.3);
  doc.line(margin + 5, y + 10, margin + 70, y + 10);
  doc.line(margin + 110, y + 10, margin + 175, y + 10);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(100, 100, 100);
  doc.text(L.signatureGuide, margin + 5, y + 14);
  doc.text(L.signatureAssistant, margin + 110, y + 14);

  // Footer
  const footerY = pageHeight - margin + 2;
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7);
  doc.setTextColor(120, 130, 125);
  doc.text(L.emitted, margin, footerY);
  doc.text(`${L.pageLabel} 1 / 1`, pageWidth - margin - 15, footerY);

  const fileName = `Fisa_Individuala_${(record.childName || 'Copil').replace(/[^a-zA-Z0-9]/g, '_')}_${record.date || '2026'}.pdf`;
  doc.save(fileName);
}
