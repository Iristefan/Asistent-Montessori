import { jsPDF } from 'jspdf';
import { InstitutionConfig, LessonPlan, ObservationSession } from '../types';
import { Language } from '../i18n/translations';
import { sanitizePdfText } from './aiPdfExport';

interface ExportOptionsBase {
  institution?: InstitutionConfig;
  lang: Language;
}

export interface LessonPlanExportOptions extends ExportOptionsBase {
  plan: LessonPlan;
}

export interface ObservationReportExportOptions extends ExportOptionsBase {
  observation: ObservationSession;
}

export interface WeeklyReportExportOptions extends ExportOptionsBase {
  observations: ObservationSession[];
  lessonPlans: LessonPlan[];
}

/**
 * Generates an official, multi-page Montessori Presentation Plan PDF
 * Includes all 11 fields, automatic page-breaks, running headers, and page numbers.
 */
export function exportLessonPlanToPdf({ plan, institution, lang }: LessonPlanExportOptions): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const marginX = 16;
  const contentWidth = pageWidth - marginX * 2;
  const maxContentY = pageHeight - 20;

  let currentY = 16;

  // Montessori color palette
  const headerColor: [number, number, number] = [31, 58, 43]; // #1F3A2B Forest green
  const sageColor: [number, number, number] = [46, 90, 68]; // #2E5A44 Sage green
  const accentGold: [number, number, number] = [184, 134, 75]; // #B8864B Warm gold
  const lightBg: [number, number, number] = [244, 247, 245]; // #F4F7F5
  const borderLight: [number, number, number] = [220, 226, 222];
  const textColor: [number, number, number] = [35, 45, 40];
  const mutedText: [number, number, number] = [100, 115, 108];

  const instName = institution?.name || "L'ECOLE DES PREALPES";
  const instSub =
    institution?.subtitle ||
    (lang === 'fr'
      ? 'École Montessori Bilingue (Maison des Enfants & Primaire)'
      : lang === 'en'
      ? 'Bilingual Montessori School (Children’s House & Elementary)'
      : lang === 'de'
      ? 'Bilinguale Montessori-Schule (Kinderhaus & Primarstufe)'
      : 'Școală Montessori Bilingvă (Grădiniță & Școală Primară)');
  const instContact =
    institution?.contact ||
    (institution?.address && institution?.email
      ? `${institution.address} | ${institution.email}`
      : 'Place de la Gare 14-16, 1618 Châtel-St-Denis | contact@ecole-des-prealpes.ch');

  const titlesByLang = {
    ro: {
      docTitle: 'PLAN DE PREZENTARE MONTESSORI',
      docSub: 'Planificator de prezentări (Protocol conform metodologiei Dr. Maria Montessori)',
      coreInfoHeading: '1. Informații Generale despre Prezentare',
      materialsHeading: '2. Material Necesar pentru Prezentare',
      aimsHeading: '3. Obiective Pedagogice (Direct & Indirect)',
      procedureHeading: '4. Desfășurarea Lecției (Etape de Prezentare Pas cu Pas)',
      followUpHeading: '5. Propuneri de Lucru Ulterior (Follow-up Work Individual)',
      crossHeading: '6. Propuneri de Follow-up Work Transdisciplinar',
      signatureSection: 'Validare Pedagogică & Înregistrare în Arhivă',
      guideSignature: 'Verificat de Ghidul Clasei:',
      assistantSignature: 'Semnătură Asistent Montessori:',
      dateLabel: 'Data Generării:',
      pageLabel: 'Pagina',
      ofLabel: 'din',
      footerNote: 'Document pedagogic oficial generat de Asistent Montessori',
    },
    fr: {
      docTitle: 'PLAN DE PRÉSENTATION MONTESSORI',
      docSub: 'Planificateur de présentations (Protocole selon la méthodologie Dr. Maria Montessori)',
      coreInfoHeading: '1. Informations Générales sur la Présentation',
      materialsHeading: '2. Matériel Requis pour la Présentation',
      aimsHeading: '3. Objectifs Pédagogiques (Direct & Indirect)',
      procedureHeading: '4. Déroulement de la Leçon (Étapes de Présentation Pas à Pas)',
      followUpHeading: '5. Propositions de Travail de Suivi (Follow-up Work Individuel)',
      crossHeading: '6. Propositions de Travail de Suivi Transdisciplinaire',
      signatureSection: 'Validation Pédagogique & Archivage',
      guideSignature: 'Vérifié par l’Éducateur / Guide :',
      assistantSignature: 'Signature de l’Assistant Montessori :',
      dateLabel: 'Date d’émission :',
      pageLabel: 'Page',
      ofLabel: 'sur',
      footerNote: 'Document pédagogique officiel généré par Assistant Montessori',
    },
    en: {
      docTitle: 'MONTESSORI PRESENTATION PLAN',
      docSub: 'Presentation Plan (Protocol adhering to Dr. Maria Montessori pedagogy)',
      coreInfoHeading: '1. General Presentation Information',
      materialsHeading: '2. Required Presentation Materials',
      aimsHeading: '3. Pedagogical Aims (Direct & Indirect)',
      procedureHeading: '4. Lesson Procedure (Step-by-Step Presentation Stages)',
      followUpHeading: '5. Follow-up Work Proposals (Individual Consolidation)',
      crossHeading: '6. Cross-Curricular Follow-up Proposals',
      signatureSection: 'Pedagogical Validation & Archive Record',
      guideSignature: 'Verified by Class Lead Guide:',
      assistantSignature: 'Montessori Assistant Signature:',
      dateLabel: 'Issue Date:',
      pageLabel: 'Page',
      ofLabel: 'of',
      footerNote: 'Official pedagogical document generated by Montessori Assistant',
    },
    de: {
      docTitle: 'MONTESSORI DARBIETUNGSPLAN',
      docSub: 'Darbietungsplan (Protokoll gemäß der Methodik von Dr. Maria Montessori)',
      coreInfoHeading: '1. Allgemeine Angaben zur Darbietung',
      materialsHeading: '2. Erforderliches Darbietungsmaterial',
      aimsHeading: '3. Pädagogische Ziele (Direkt & Indirekt)',
      procedureHeading: '4. Ablauf der Lektion (Schritt-für-Schritt Darbietungsschritte)',
      followUpHeading: '5. Vorschläge für Folgearbeiten (Individuelle Vertiefung)',
      crossHeading: '6. Fächerübergreifende Folgearbeiten',
      signatureSection: 'Pädagogische Validierung & Archivierung',
      guideSignature: 'Geprüft von der Klassenleitung:',
      assistantSignature: 'Unterschrift Montessori-Assistent:',
      dateLabel: 'Ausstellungsdatum:',
      pageLabel: 'Seite',
      ofLabel: 'von',
      footerNote: 'Offizielles pädagogisches Dokument generiert von Montessori Assistant',
    },
  }[lang] || {
    docTitle: 'PLAN DE PREZENTARE MONTESSORI',
    docSub: 'Planificator de prezentări (Protocol conform metodologiei Dr. Maria Montessori)',
    coreInfoHeading: '1. Informații Generale despre Prezentare',
    materialsHeading: '2. Material Necesar pentru Prezentare',
    aimsHeading: '3. Obiective Pedagogice (Direct & Indirect)',
    procedureHeading: '4. Desfășurarea Lecției (Etape de Prezentare Pas cu Pas)',
    followUpHeading: '5. Propuneri de Lucru Ulterior (Follow-up Work Individual)',
    crossHeading: '6. Propuneri de Follow-up Work Transdisciplinar',
    signatureSection: 'Validare Pedagogică & Înregistrare în Arhivă',
    guideSignature: 'Verificat de Ghidul Clasei:',
    assistantSignature: 'Semnătură Asistent Montessori:',
    dateLabel: 'Data Generării:',
    pageLabel: 'Pagina',
    ofLabel: 'din',
    footerNote: 'Document pedagogic oficial generat de Asistent Montessori',
  };

  const drawPageHeader = (isFirstPage: boolean) => {
    if (isFirstPage) {
      // Large Institutional Banner on Page 1
      doc.setFillColor(...lightBg);
      doc.setDrawColor(...sageColor);
      doc.setLineWidth(0.6);
      doc.roundedRect(marginX, currentY, contentWidth, 22, 2.5, 2.5, 'FD');

      // Decorative left bar
      doc.setFillColor(...sageColor);
      doc.rect(marginX, currentY, 3.5, 22, 'F');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(...headerColor);
      doc.text(sanitizePdfText(instName), marginX + 7, currentY + 6.5);

      doc.setFont('helvetica', 'italic');
      doc.setFontSize(8);
      doc.setTextColor(...sageColor);
      doc.text(sanitizePdfText(instSub), marginX + 7, currentY + 11.5);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(...mutedText);
      doc.text(sanitizePdfText(instContact), marginX + 7, currentY + 16.5);

      currentY += 27;

      // Document Title Header
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(...sageColor);
      doc.text(sanitizePdfText(titlesByLang.docTitle), marginX, currentY);

      currentY += 5;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(...mutedText);
      doc.text(sanitizePdfText(titlesByLang.docSub), marginX, currentY);

      currentY += 3;
      doc.setDrawColor(...sageColor);
      doc.setLineWidth(0.8);
      doc.line(marginX, currentY, marginX + contentWidth, currentY);

      currentY += 6;
    } else {
      // Compact Running Header on Subsequent Pages
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(...sageColor);
      doc.text(sanitizePdfText(`${instName} — ${titlesByLang.docTitle}`), marginX, currentY);

      doc.setFont('helvetica', 'italic');
      doc.setFontSize(7.5);
      doc.setTextColor(...mutedText);
      doc.text(sanitizePdfText(plan.title || ''), marginX + contentWidth, currentY, { align: 'right' });

      currentY += 2.5;
      doc.setDrawColor(...borderLight);
      doc.setLineWidth(0.3);
      doc.line(marginX, currentY, marginX + contentWidth, currentY);

      currentY += 5;
    }
  };

  const checkPageBreak = (neededHeight: number = 10) => {
    if (currentY + neededHeight > maxContentY) {
      doc.addPage();
      currentY = 16;
      drawPageHeader(false);
    }
  };

  // 1. Initial Page Header
  drawPageHeader(true);

  // 2. Core Presentation Info Box (Field 1: Titlu, Field 2: Domeniu, Field 3: Grupa varsta, Field 4: Durata, Field 6: Punct de interes)
  checkPageBreak(38);
  doc.setFillColor(...lightBg);
  doc.setDrawColor(...borderLight);
  doc.setLineWidth(0.3);
  doc.roundedRect(marginX, currentY, contentWidth, 38, 2, 2, 'FD');

  // Title Row
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...sageColor);
  doc.text(sanitizePdfText('TITLU PREZENTARE:'), marginX + 3.5, currentY + 5.5);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...headerColor);
  doc.text(sanitizePdfText(plan.title || '-'), marginX + 42, currentY + 5.5);

  doc.setDrawColor(...borderLight);
  doc.line(marginX + 3, currentY + 7.5, marginX + contentWidth - 3, currentY + 7.5);

  // Field 2: Domeniu de activitate & Field 3: Grupa de varsta
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(...mutedText);
  doc.text(sanitizePdfText('Domeniu Activitate:'), marginX + 3.5, currentY + 12);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...textColor);
  doc.text(sanitizePdfText(plan.subject || 'Curriculum Montessori'), marginX + 33, currentY + 12);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...mutedText);
  doc.text(sanitizePdfText('Grupa de Varsta:'), marginX + 105, currentY + 12);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...textColor);
  doc.text(sanitizePdfText(plan.ageGroup || plan.level || '3-6 ani'), marginX + 132, currentY + 12);

  doc.line(marginX + 3, currentY + 14.5, marginX + contentWidth - 3, currentY + 14.5);

  // Field 4: Timp alocat & Date
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...mutedText);
  doc.text(sanitizePdfText('Timpul Alocat:'), marginX + 3.5, currentY + 19);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...textColor);
  doc.text(sanitizePdfText(plan.duration || '20 minute'), marginX + 33, currentY + 19);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...mutedText);
  doc.text(sanitizePdfText('Data Înregistrării:'), marginX + 105, currentY + 19);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...textColor);
  const planDate = plan.createdAt
    ? new Date(plan.createdAt).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'ro-RO')
    : new Date().toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'ro-RO');
  doc.text(sanitizePdfText(planDate), marginX + 132, currentY + 19);

  doc.line(marginX + 3, currentY + 21.5, marginX + contentWidth - 3, currentY + 21.5);

  // Field 6: Punct de interes
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...accentGold);
  doc.text(sanitizePdfText('Punct de Interes:'), marginX + 3.5, currentY + 26);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(...textColor);
  const poiLines = doc.splitTextToSize(sanitizePdfText(plan.pointOfInterest || '-'), contentWidth - 36);
  doc.text(poiLines, marginX + 33, currentY + 26);

  currentY += 42;

  // 3. Field 5: Material Necesar pentru Prezentare
  checkPageBreak(18);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...sageColor);
  doc.text(sanitizePdfText(titlesByLang.materialsHeading), marginX, currentY);
  currentY += 3.5;

  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(...borderLight);
  doc.setLineWidth(0.3);

  const matText = sanitizePdfText(plan.materials || '-');
  const matLines = doc.splitTextToSize(matText, contentWidth - 6);
  const matBoxHeight = Math.max(12, matLines.length * 4.2 + 5);

  checkPageBreak(matBoxHeight + 4);
  doc.roundedRect(marginX, currentY, contentWidth, matBoxHeight, 1.5, 1.5, 'FD');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...textColor);
  doc.text(matLines, marginX + 3, currentY + 4.5);

  currentY += matBoxHeight + 5;

  // 4. Fields 7 & 8: Obiectiv Direct & Obiectiv Indirect
  checkPageBreak(25);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...sageColor);
  doc.text(sanitizePdfText(titlesByLang.aimsHeading), marginX, currentY);
  currentY += 3.5;

  const colWidth = (contentWidth - 4) / 2;
  const directText = sanitizePdfText(plan.directAim || '-');
  const indirectText = sanitizePdfText(plan.indirectAim || plan.indirectAims || '-');

  const directLines = doc.splitTextToSize(directText, colWidth - 6);
  const indirectLines = doc.splitTextToSize(indirectText, colWidth - 6);
  const aimsBoxHeight = Math.max(16, Math.max(directLines.length, indirectLines.length) * 4.2 + 8);

  checkPageBreak(aimsBoxHeight + 4);

  // Direct Aim Box
  doc.setFillColor(...lightBg);
  doc.setDrawColor(...sageColor);
  doc.setLineWidth(0.4);
  doc.roundedRect(marginX, currentY, colWidth, aimsBoxHeight, 1.5, 1.5, 'FD');
  doc.setFillColor(...sageColor);
  doc.rect(marginX, currentY, 2.5, aimsBoxHeight, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(...sageColor);
  doc.text(sanitizePdfText('OBIECTIV DIRECT (Direct Aim):'), marginX + 5, currentY + 4.5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...textColor);
  doc.text(directLines, marginX + 5, currentY + 8.5);

  // Indirect Aim Box
  const col2X = marginX + colWidth + 4;
  doc.setFillColor(...lightBg);
  doc.setDrawColor(...accentGold);
  doc.roundedRect(col2X, currentY, colWidth, aimsBoxHeight, 1.5, 1.5, 'FD');
  doc.setFillColor(...accentGold);
  doc.rect(col2X, currentY, 2.5, aimsBoxHeight, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(...headerColor);
  doc.text(sanitizePdfText('OBIECTIV INDIRECT (Indirect Aim):'), col2X + 5, currentY + 4.5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...textColor);
  doc.text(indirectLines, col2X + 5, currentY + 8.5);

  currentY += aimsBoxHeight + 6;

  // 5. Field 9: Desfășurarea Lecției (Etape de Prezentare Pas cu Pas)
  checkPageBreak(25);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...sageColor);
  doc.text(sanitizePdfText(titlesByLang.procedureHeading), marginX, currentY);
  currentY += 4;

  const rawProcedure = plan.procedure || '';
  const procedureSteps = rawProcedure
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  if (procedureSteps.length === 0) {
    checkPageBreak(12);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    doc.setTextColor(...mutedText);
    doc.text(sanitizePdfText('Etapele detaliate ale prezentarii nu au fost completate.'), marginX + 4, currentY + 4);
    currentY += 8;
  } else {
    procedureSteps.forEach((step, idx) => {
      // Clean leading bullet or number
      const cleanStep = step.replace(/^[•\-\*\d+\.]\s*/, '').trim();
      const stepLines = doc.splitTextToSize(sanitizePdfText(cleanStep), contentWidth - 10);
      const stepBlockHeight = stepLines.length * 4.2 + 3;

      checkPageBreak(stepBlockHeight + 2);

      // Draw subtle step number pill
      doc.setFillColor(...lightBg);
      doc.setDrawColor(...borderLight);
      doc.roundedRect(marginX, currentY, contentWidth, stepBlockHeight, 1, 1, 'FD');

      doc.setFillColor(...sageColor);
      doc.circle(marginX + 4, currentY + 3.8, 1.8, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(6.5);
      doc.setTextColor(255, 255, 255);
      doc.text(String(idx + 1), marginX + 4, currentY + 4.6, { align: 'center' });

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.8);
      doc.setTextColor(...textColor);
      doc.text(stepLines, marginX + 8, currentY + 4.2);

      currentY += stepBlockHeight + 2;
    });
  }

  currentY += 4;

  // 6. Fields 10 & 11: Follow-up Work & Cross-Curricular Follow-up Work
  checkPageBreak(22);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...sageColor);
  doc.text(sanitizePdfText('5. Propuneri de Lucru Ulterior & Transdisciplinar'), marginX, currentY);
  currentY += 3.5;

  const followUpText = sanitizePdfText(plan.followUpWork || plan.follow1 || '-');
  const crossText = sanitizePdfText(plan.crossCurricular || plan.follow2 || '-');

  const followLines = doc.splitTextToSize(followUpText, colWidth - 6);
  const crossLines = doc.splitTextToSize(crossText, colWidth - 6);
  const followBoxHeight = Math.max(16, Math.max(followLines.length, crossLines.length) * 4.2 + 8);

  checkPageBreak(followBoxHeight + 4);

  // Individual Follow-up Box
  doc.setFillColor(...lightBg);
  doc.setDrawColor(...sageColor);
  doc.setLineWidth(0.4);
  doc.roundedRect(marginX, currentY, colWidth, followBoxHeight, 1.5, 1.5, 'FD');
  doc.setFillColor(...sageColor);
  doc.rect(marginX, currentY, 2.5, followBoxHeight, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(...sageColor);
  doc.text(sanitizePdfText('FOLLOW-UP WORK INDIVIDUAL:'), marginX + 5, currentY + 4.5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...textColor);
  doc.text(followLines, marginX + 5, currentY + 8.5);

  // Cross-curricular Follow-up Box
  doc.setFillColor(...lightBg);
  doc.setDrawColor(...accentGold);
  doc.roundedRect(col2X, currentY, colWidth, followBoxHeight, 1.5, 1.5, 'FD');
  doc.setFillColor(...accentGold);
  doc.rect(col2X, currentY, 2.5, followBoxHeight, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(...headerColor);
  doc.text(sanitizePdfText('CONEXIUNI TRANSDISCIPLINARE:'), col2X + 5, currentY + 4.5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...textColor);
  doc.text(crossLines, col2X + 5, currentY + 8.5);

  currentY += followBoxHeight + 6;

  // 7. Signature & Validation Block
  checkPageBreak(24);
  doc.setDrawColor(...borderLight);
  doc.setLineWidth(0.4);
  doc.line(marginX, currentY, marginX + contentWidth, currentY);
  currentY += 4;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(...mutedText);
  doc.text(sanitizePdfText(titlesByLang.guideSignature), marginX, currentY + 3);
  doc.text(sanitizePdfText(titlesByLang.assistantSignature), marginX + colWidth + 4, currentY + 3);

  doc.setLineDashPattern([1, 1], 0);
  doc.setDrawColor(...mutedText);
  doc.line(marginX, currentY + 12, marginX + colWidth - 10, currentY + 12);
  doc.line(marginX + colWidth + 4, currentY + 12, marginX + contentWidth - 10, currentY + 12);
  doc.setLineDashPattern([], 0);

  // 8. Add page numbers and running footer across all generated pages
  const totalPages = doc.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(...mutedText);

    // Bottom border line
    doc.setDrawColor(...borderLight);
    doc.setLineWidth(0.2);
    doc.line(marginX, pageHeight - 12, marginX + contentWidth, pageHeight - 12);

    // Left footer label
    doc.text(
      sanitizePdfText(`${titlesByLang.footerNote} — ${instName}`),
      marginX,
      pageHeight - 8
    );

    // Right page numbering
    const pageText = `${titlesByLang.pageLabel} ${p} ${titlesByLang.ofLabel} ${totalPages}`;
    doc.text(sanitizePdfText(pageText), marginX + contentWidth, pageHeight - 8, { align: 'right' });
  }

  // Save PDF file with clean sanitized filename
  const cleanTitle = (plan.title || 'Plan_Prezentare')
    .toLowerCase()
    .replace(/[^a-z0-9]/gi, '_')
    .slice(0, 35);
  const filename = `${cleanTitle}_Montessori.pdf`;
  doc.save(filename);
}

/**
 * Generates an official, multi-page Montessori Daily Observation Protocol PDF
 */
export function exportObservationReportToPdf({
  observation,
  institution,
  lang,
}: ObservationReportExportOptions): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const marginX = 16;
  const contentWidth = pageWidth - marginX * 2;
  const maxContentY = pageHeight - 20;

  let currentY = 16;

  const headerColor: [number, number, number] = [31, 58, 43];
  const sageColor: [number, number, number] = [46, 90, 68];
  const accentGold: [number, number, number] = [184, 134, 75];
  const lightBg: [number, number, number] = [244, 247, 245];
  const borderLight: [number, number, number] = [220, 226, 222];
  const textColor: [number, number, number] = [35, 45, 40];
  const mutedText: [number, number, number] = [100, 115, 108];

  const instName = institution?.name || "L'ECOLE DES PREALPES";
  const instSub = institution?.subtitle || 'École Montessori Bilingue';
  const instContact = institution?.contact || 'contact@ecole-des-prealpes.ch';

  const checkPageBreak = (neededHeight: number = 10) => {
    if (currentY + neededHeight > maxContentY) {
      doc.addPage();
      currentY = 16;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(...sageColor);
      doc.text(sanitizePdfText(`${instName} — RAPORT DE OBSERVATIE MONTESSORI`), marginX, currentY);
      currentY += 2.5;
      doc.setDrawColor(...borderLight);
      doc.line(marginX, currentY, marginX + contentWidth, currentY);
      currentY += 5;
    }
  };

  // Header Banner
  doc.setFillColor(...lightBg);
  doc.setDrawColor(...sageColor);
  doc.setLineWidth(0.6);
  doc.roundedRect(marginX, currentY, contentWidth, 22, 2.5, 2.5, 'FD');
  doc.setFillColor(...sageColor);
  doc.rect(marginX, currentY, 3.5, 22, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(...headerColor);
  doc.text(sanitizePdfText(instName), marginX + 7, currentY + 6.5);

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(...sageColor);
  doc.text(sanitizePdfText(instSub), marginX + 7, currentY + 11.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...mutedText);
  doc.text(sanitizePdfText(instContact), marginX + 7, currentY + 16.5);

  currentY += 27;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(...sageColor);
  doc.text(sanitizePdfText('RAPORT DE OBSERVAȚIE MONTESSORI'), marginX, currentY);

  currentY += 4.5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...mutedText);
  doc.text(
    sanitizePdfText('Protocolul zilnic de Observație Practică (bazat pe principiile Dr. Maria Montessori)'),
    marginX,
    currentY
  );

  currentY += 3;
  doc.setDrawColor(...sageColor);
  doc.setLineWidth(0.8);
  doc.line(marginX, currentY, marginX + contentWidth, currentY);

  currentY += 6;

  // Metadata Table Box
  checkPageBreak(24);
  doc.setFillColor(...lightBg);
  doc.setDrawColor(...borderLight);
  doc.setLineWidth(0.3);
  doc.roundedRect(marginX, currentY, contentWidth, 24, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(...sageColor);
  doc.text(sanitizePdfText('Data:'), marginX + 4, currentY + 5.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...textColor);
  doc.text(sanitizePdfText(observation.date || '-'), marginX + 22, currentY + 5.5);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...sageColor);
  doc.text(sanitizePdfText('Ora Start:'), marginX + 65, currentY + 5.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...textColor);
  doc.text(sanitizePdfText(observation.startTime || '09:00'), marginX + 85, currentY + 5.5);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...sageColor);
  doc.text(sanitizePdfText('Grupă:'), marginX + 125, currentY + 5.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...textColor);
  doc.text(sanitizePdfText(observation.groupCount || '-'), marginX + 140, currentY + 5.5);

  doc.line(marginX + 3, currentY + 8, marginX + contentWidth - 3, currentY + 8);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...sageColor);
  doc.text(sanitizePdfText('Meteo & Ambianță:'), marginX + 4, currentY + 13.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...textColor);
  doc.text(sanitizePdfText(observation.weather || '-'), marginX + 38, currentY + 13.5);

  doc.line(marginX + 3, currentY + 16, marginX + contentWidth - 3, currentY + 16);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...sageColor);
  doc.text(sanitizePdfText('Etapa Observației:'), marginX + 4, currentY + 20.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...textColor);
  doc.text(sanitizePdfText(observation.phase || '-'), marginX + 38, currentY + 20.5);

  currentY += 29;

  // 1. Note Obiective de Observatie
  checkPageBreak(25);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...sageColor);
  doc.text(
    sanitizePdfText('1. Note Obiective de Observație (la intervale de 5 min / Fapte concrete):'),
    marginX,
    currentY
  );
  currentY += 4;

  const notesText = sanitizePdfText(observation.notes || '-');
  const notesLines = doc.splitTextToSize(notesText, contentWidth - 8);
  const notesHeight = Math.max(16, notesLines.length * 4.2 + 6);

  checkPageBreak(notesHeight + 4);
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(...borderLight);
  doc.roundedRect(marginX, currentY, contentWidth, notesHeight, 1.5, 1.5, 'FD');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.8);
  doc.setTextColor(...textColor);
  doc.text(notesLines, marginX + 4, currentY + 5);

  currentY += notesHeight + 6;

  // 2. Reflectia Personala
  checkPageBreak(25);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...sageColor);
  doc.text(sanitizePdfText('2. Reflecția Personală a Asistentului / Ghidului:'), marginX, currentY);
  currentY += 4;

  const refText = sanitizePdfText(observation.reflection || '-');
  const refLines = doc.splitTextToSize(refText, contentWidth - 8);
  const refHeight = Math.max(16, refLines.length * 4.2 + 6);

  checkPageBreak(refHeight + 4);
  doc.setFillColor(...lightBg);
  doc.setDrawColor(...sageColor);
  doc.roundedRect(marginX, currentY, contentWidth, refHeight, 1.5, 1.5, 'FD');
  doc.setFillColor(...sageColor);
  doc.rect(marginX, currentY, 2.5, refHeight, 'F');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.8);
  doc.setTextColor(...textColor);
  doc.text(refLines, marginX + 5, currentY + 5);

  currentY += refHeight + 6;

  // 3. AI Pedagogical Feedback (if present)
  if (observation.aiFeedback) {
    checkPageBreak(25);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...accentGold);
    doc.text(sanitizePdfText('3. Evaluare Pedagogică & Validare Obiectivitate (Gemini AI):'), marginX, currentY);
    currentY += 4;

    const aiText = sanitizePdfText(observation.aiFeedback);
    const aiLines = doc.splitTextToSize(aiText, contentWidth - 8);
    const aiHeight = Math.max(16, aiLines.length * 4.2 + 6);

    checkPageBreak(aiHeight + 4);
    doc.setFillColor(...lightBg);
    doc.setDrawColor(...accentGold);
    doc.roundedRect(marginX, currentY, contentWidth, aiHeight, 1.5, 1.5, 'FD');
    doc.setFillColor(...accentGold);
    doc.rect(marginX, currentY, 2.5, aiHeight, 'F');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.8);
    doc.setTextColor(...textColor);
    doc.text(aiLines, marginX + 5, currentY + 5);

    currentY += aiHeight + 6;
  }

  // Signatures
  checkPageBreak(24);
  doc.setDrawColor(...borderLight);
  doc.setLineWidth(0.4);
  doc.line(marginX, currentY, marginX + contentWidth, currentY);
  currentY += 4;

  const colWidth = (contentWidth - 4) / 2;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(...mutedText);
  doc.text(sanitizePdfText('Verificat de Ghidul Clasei:'), marginX, currentY + 3);
  doc.text(sanitizePdfText('Semnătură Asistent Montessori:'), marginX + colWidth + 4, currentY + 3);

  doc.setLineDashPattern([1, 1], 0);
  doc.setDrawColor(...mutedText);
  doc.line(marginX, currentY + 12, marginX + colWidth - 10, currentY + 12);
  doc.line(marginX + colWidth + 4, currentY + 12, marginX + contentWidth - 10, currentY + 12);
  doc.setLineDashPattern([], 0);

  // Pagination
  const totalPages = doc.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(...mutedText);
    doc.setDrawColor(...borderLight);
    doc.setLineWidth(0.2);
    doc.line(marginX, pageHeight - 12, marginX + contentWidth, pageHeight - 12);

    doc.text(sanitizePdfText(`Raport Observație Montessori — ${instName}`), marginX, pageHeight - 8);
    doc.text(sanitizePdfText(`Pagina ${p} din ${totalPages}`), marginX + contentWidth, pageHeight - 8, {
      align: 'right',
    });
  }

  const filename = `Observatie_Montessori_${observation.date || 'Raport'}.pdf`;
  doc.save(filename);
}

/**
 * Generates an official Weekly Synthetic Report PDF
 */
export function exportWeeklyReportToPdf({
  observations,
  lessonPlans,
  institution,
  lang,
}: WeeklyReportExportOptions): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const marginX = 16;
  const contentWidth = pageWidth - marginX * 2;
  const maxContentY = pageHeight - 20;

  let currentY = 16;

  const headerColor: [number, number, number] = [31, 58, 43];
  const sageColor: [number, number, number] = [46, 90, 68];
  const accentGold: [number, number, number] = [184, 134, 75];
  const lightBg: [number, number, number] = [244, 247, 245];
  const borderLight: [number, number, number] = [220, 226, 222];
  const textColor: [number, number, number] = [35, 45, 40];
  const mutedText: [number, number, number] = [100, 115, 108];

  const instName = institution?.name || "L'ECOLE DES PREALPES";

  const checkPageBreak = (neededHeight: number = 10) => {
    if (currentY + neededHeight > maxContentY) {
      doc.addPage();
      currentY = 16;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(...sageColor);
      doc.text(sanitizePdfText(`${instName} — RAPORT SAPTAMANAL ASISTENT MONTESSORI`), marginX, currentY);
      currentY += 2.5;
      doc.setDrawColor(...borderLight);
      doc.line(marginX, currentY, marginX + contentWidth, currentY);
      currentY += 5;
    }
  };

  // Header Banner
  doc.setFillColor(...lightBg);
  doc.setDrawColor(...sageColor);
  doc.setLineWidth(0.6);
  doc.roundedRect(marginX, currentY, contentWidth, 22, 2.5, 2.5, 'FD');
  doc.setFillColor(...sageColor);
  doc.rect(marginX, currentY, 3.5, 22, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(...headerColor);
  doc.text(sanitizePdfText(instName), marginX + 7, currentY + 6.5);

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(...sageColor);
  doc.text(sanitizePdfText('Raport Sintetic Săptămânal Asistent Montessori'), marginX + 7, currentY + 11.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...mutedText);
  const nowStr = new Date().toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'ro-RO');
  doc.text(sanitizePdfText(`Data Emiterii: ${nowStr}`), marginX + 7, currentY + 16.5);

  currentY += 27;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(...sageColor);
  doc.text(sanitizePdfText('RAPORT SĂPTĂMÂNAL ASISTENT MONTESSORI'), marginX, currentY);
  currentY += 4;
  doc.setDrawColor(...sageColor);
  doc.setLineWidth(0.8);
  doc.line(marginX, currentY, marginX + contentWidth, currentY);
  currentY += 6;

  // Principles Summary Box
  checkPageBreak(25);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...sageColor);
  doc.text(sanitizePdfText('1. Principiile Fundamentale Asistent Montessori:'), marginX, currentY);
  currentY += 4;

  const principles = [
    '• Pregatirea Mediului: verificare si mentinerea ordinii estetice de la simplu la complex.',
    '• Regula Mainile la Spate: interventie discreta doar cand este solicitat ajutorul sau pentru securitate.',
    '• Protectia Concentrarii: ciclul de lucru de 3 ore neintrerupt ocrotit de distrageri.',
    '• Autonomie si Normalizare: ghidare prin lauda descriptiva si sustinerea rezolvarii pasnice a conflictelor.',
  ];

  principles.forEach((p) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.8);
    doc.setTextColor(...textColor);
    doc.text(sanitizePdfText(p), marginX + 4, currentY);
    currentY += 4.5;
  });

  currentY += 4;

  // Observations Table
  checkPageBreak(25);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...sageColor);
  doc.text(sanitizePdfText(`2. Sinteza Sesiunilor de Observație Înregistrate (${observations.length}):`), marginX, currentY);
  currentY += 4;

  if (observations.length === 0) {
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    doc.setTextColor(...mutedText);
    doc.text(sanitizePdfText('Nu exista sesiuni de observatie inregistrate.'), marginX + 4, currentY);
    currentY += 6;
  } else {
    observations.slice(0, 10).forEach((obs) => {
      checkPageBreak(12);
      doc.setFillColor(...lightBg);
      doc.setDrawColor(...borderLight);
      doc.roundedRect(marginX, currentY, contentWidth, 10, 1, 1, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(...sageColor);
      doc.text(sanitizePdfText(obs.date || '-'), marginX + 3, currentY + 6);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...textColor);
      doc.text(sanitizePdfText(obs.phase?.slice(0, 50) || '-'), marginX + 26, currentY + 6);

      doc.setFont('helvetica', 'italic');
      doc.setTextColor(...mutedText);
      doc.text(sanitizePdfText(obs.groupCount || '-'), marginX + contentWidth - 3, currentY + 6, {
        align: 'right',
      });

      currentY += 12;
    });
  }

  currentY += 4;

  // Lesson Plans Table
  checkPageBreak(25);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...sageColor);
  doc.text(sanitizePdfText(`3. Prezentări Planificate (${lessonPlans.length}):`), marginX, currentY);
  currentY += 4;

  if (lessonPlans.length === 0) {
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    doc.setTextColor(...mutedText);
    doc.text(sanitizePdfText('Nu exista prezentari inregistrate.'), marginX + 4, currentY);
    currentY += 6;
  } else {
    lessonPlans.slice(0, 10).forEach((lp) => {
      checkPageBreak(12);
      doc.setFillColor(...lightBg);
      doc.setDrawColor(...borderLight);
      doc.roundedRect(marginX, currentY, contentWidth, 10, 1, 1, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(...headerColor);
      doc.text(sanitizePdfText(lp.title || '-'), marginX + 3, currentY + 6);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...mutedText);
      doc.text(sanitizePdfText(lp.subject || '-'), marginX + 75, currentY + 6);

      doc.text(sanitizePdfText(lp.ageGroup || lp.level || '-'), marginX + contentWidth - 3, currentY + 6, {
        align: 'right',
      });

      currentY += 12;
    });
  }

  // Pagination
  const totalPages = doc.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(...mutedText);
    doc.setDrawColor(...borderLight);
    doc.setLineWidth(0.2);
    doc.line(marginX, pageHeight - 12, marginX + contentWidth, pageHeight - 12);

    doc.text(sanitizePdfText(`Raport Săptămânal Asistent Montessori — ${instName}`), marginX, pageHeight - 8);
    doc.text(sanitizePdfText(`Pagina ${p} din ${totalPages}`), marginX + contentWidth, pageHeight - 8, {
      align: 'right',
    });
  }

  doc.save(`Raport_Saptamanal_Montessori_${nowStr.replace(/[^0-9]/g, '_')}.pdf`);
}
