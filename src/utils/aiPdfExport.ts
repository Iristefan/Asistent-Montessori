import { jsPDF } from 'jspdf';
import { InstitutionConfig } from '../types';
import { Language } from '../i18n/translations';

export interface AiResponseExportData {
  content: string;
  question?: string;
  topic?: string;
  timestamp?: string;
  dateStr?: string;
  lang: Language;
  institution?: InstitutionConfig;
}

export interface AiConversationExportData {
  messages: Array<{
    id?: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp?: string;
  }>;
  title?: string;
  dateStr?: string;
  lang: Language;
  institution?: InstitutionConfig;
}

/**
 * Sanitize unicode/diacritics for standard jsPDF 8-bit Helvetica font
 */
export function sanitizePdfText(text: string): string {
  if (!text) return '';
  return text
    // Romanian
    .replace(/[șş]/g, 's')
    .replace(/[ȘŞ]/g, 'S')
    .replace(/[țţ]/g, 't')
    .replace(/[ȚŢ]/g, 'T')
    .replace(/[ă]/g, 'a')
    .replace(/[Ă]/g, 'A')
    .replace(/[â]/g, 'a')
    .replace(/[Â]/g, 'A')
    .replace(/[î]/g, 'i')
    .replace(/[Î]/g, 'I')
    // French
    .replace(/[éèêë]/g, 'e')
    .replace(/[ÉÈÊË]/g, 'E')
    .replace(/[àâä]/g, 'a')
    .replace(/[ÀÂÄ]/g, 'A')
    .replace(/[ôö]/g, 'o')
    .replace(/[ÔÖ]/g, 'O')
    .replace(/[ùûü]/g, 'u')
    .replace(/[ÙÛÜ]/g, 'U')
    .replace(/[ç]/g, 'c')
    .replace(/[Ç]/g, 'C')
    .replace(/[œ]/g, 'oe')
    .replace(/[Œ]/g, 'OE')
    // German
    .replace(/[ä]/g, 'a')
    .replace(/[Ä]/g, 'A')
    .replace(/[ö]/g, 'o')
    .replace(/[Ö]/g, 'O')
    .replace(/[ü]/g, 'u')
    .replace(/[Ü]/g, 'U')
    .replace(/[ß]/g, 'ss')
    // Punctuation & Quotes
    .replace(/[«»“”„"]/g, '"')
    .replace(/[‘’`']/g, "'")
    .replace(/[–—]/g, '-')
    .replace(/[•]/g, '*')
    .replace(/…/g, '...');
}

/**
 * Exports a single AI pedagogical recommendation to an official PDF
 */
export function exportAiResponseToPdf(data: AiResponseExportData): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const marginX = 18;
  const contentWidth = pageWidth - marginX * 2;
  const maxContentY = pageHeight - 22;

  let currentY = 20;

  const headerColor: [number, number, number] = [31, 58, 43]; // #1F3A2B Forest green
  const accentColor: [number, number, number] = [184, 134, 75]; // #B8864B Warm gold
  const lightBg: [number, number, number] = [244, 247, 245];
  const textColor: [number, number, number] = [40, 50, 45];
  const quoteBg: [number, number, number] = [248, 250, 249];

  const checkPageBreak = (neededSpace: number = 10) => {
    if (currentY + neededSpace > maxContentY) {
      doc.addPage();
      currentY = 22;
    }
  };

  const now = new Date();
  const dateFormatted =
    data.dateStr ||
    now.toLocaleDateString(
      data.lang === 'fr'
        ? 'fr-FR'
        : data.lang === 'en'
        ? 'en-US'
        : data.lang === 'de'
        ? 'de-DE'
        : 'ro-RO',
      { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    );
  const timeFormatted = data.timestamp || now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // 1. TOP HEADER BANNER
  doc.setFillColor(...lightBg);
  doc.roundedRect(marginX, currentY, contentWidth, 34, 3, 3, 'F');
  doc.setDrawColor(...accentColor);
  doc.setLineWidth(0.6);
  doc.roundedRect(marginX, currentY, contentWidth, 34, 3, 3, 'S');

  // Institution title
  const defaultInstSub =
    data.lang === 'fr'
      ? 'BASÉ SUR LES PRINCIPES DU MODÈLE ÉDUCATIF MONTESSORI'
      : data.lang === 'en'
      ? 'BASED ON THE PRINCIPLES OF THE MONTESSORI EDUCATIONAL MODEL'
      : data.lang === 'de'
      ? 'BASIEREND AUF DEN PRINZIPIEN DES MONTESSORI-BILDUNGSMODELLS'
      : 'BAZAT PE PRINCIPIILE MODELULUI EDUCAȚIONAL MONTESSORI';
  const instName = data.institution?.name || 'CENTRE MONTESSORI BILINGUE - ECOLE ACTIVE';
  const instSub = data.institution?.subtitle || defaultInstSub;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...headerColor);
  doc.text(sanitizePdfText(instName), marginX + 4, currentY + 9);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(105, 105, 105);
  doc.text(sanitizePdfText(instSub), marginX + 4, currentY + 16);

  // Badge on the right
  const badgeLabel =
    data.lang === 'fr'
      ? 'CONSEIL PÉDAGOGIQUE IA MONTESSORI'
      : data.lang === 'en'
      ? 'MONTESSORI AI PEDAGOGICAL GUIDANCE'
      : data.lang === 'de'
      ? 'MONTESSORI KI-PÄDAGOGISCHE BERATUNG'
      : 'CONSULTANȚĂ PEDAGOGICĂ AI MONTESSORI';

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(...accentColor);
  doc.text(sanitizePdfText(badgeLabel), marginX + 4, currentY + 24);

  // Date and Time
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(90, 90, 90);
  doc.text(`${sanitizePdfText(dateFormatted)} | ${timeFormatted}`, marginX + 4, currentY + 30);

  currentY += 40;

  // 2. DOCUMENT TITLE
  const docTitle =
    data.topic ||
    (data.lang === 'fr'
      ? 'Fiche de Recommandation & Guidage Pédagogique'
      : data.lang === 'en'
      ? 'Pedagogical Guidance & Consultation Sheet'
      : data.lang === 'de'
      ? 'Pädagogisches Beratungsprotokoll'
      : 'Fișă de Recomandare & Consultanță Pedagogică');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(...headerColor);
  doc.text(sanitizePdfText(docTitle), marginX, currentY);

  currentY += 6;

  // Metadata ribbon
  const metaText =
    data.lang === 'fr'
      ? 'Cadre de référence: Pédagogie Maria Montessori (basé sur les principes du modèle éducatif Montessori) | Contrôle de l’erreur & Normalisation'
      : data.lang === 'en'
      ? 'Methodological Framework: Maria Montessori Principles (based on the principles of the Montessori educational model) | Control of Error & Normalization'
      : data.lang === 'de'
      ? 'Methodischer Rahmen: Maria Montessori Pädagogik (basierend auf den Prinzipien des Montessori-Bildungsmodells) | Fehlerkontrolle & Normalisation'
      : 'Cadru de referință: Pedagogia Dr. Maria Montessori (bazat pe principiile modelului educațional Montessori) | Controlul Erorii & Normalizare';

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(110, 110, 110);
  doc.text(sanitizePdfText(metaText), marginX, currentY);

  currentY += 5;
  doc.setDrawColor(220, 225, 220);
  doc.setLineWidth(0.4);
  doc.line(marginX, currentY, marginX + contentWidth, currentY);

  currentY += 7;

  // 3. QUESTION / CONTEXT BOX (if available)
  if (data.question && data.question.trim()) {
    const qTitle =
      data.lang === 'fr'
        ? 'SITUATION / QUESTION SOUMISE PAR L’ASSISTANT :'
        : data.lang === 'en'
        ? 'CLASSROOM CHALLENGE / QUESTION SUBMITTED BY ASSISTANT:'
        : data.lang === 'de'
        ? 'SITUATION / VOM ASSISTENTEN GESTELLTE FRAGE:'
        : 'CONTEXT / ÎNTREBARE TRANSMISĂ DE ASISTENT:';

    const cleanQuestion = sanitizePdfText(data.question.trim());
    const qLines = doc.splitTextToSize(cleanQuestion, contentWidth - 8);
    const boxHeight = 12 + qLines.length * 4.8;

    checkPageBreak(boxHeight + 5);

    doc.setFillColor(...quoteBg);
    doc.roundedRect(marginX, currentY, contentWidth, boxHeight, 2, 2, 'F');
    doc.setDrawColor(...accentColor);
    doc.setLineWidth(0.8);
    doc.line(marginX, currentY, marginX, currentY + boxHeight); // left accent border

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...headerColor);
    doc.text(sanitizePdfText(qTitle), marginX + 4, currentY + 6);

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(9);
    doc.setTextColor(...textColor);

    let qY = currentY + 11;
    for (const line of qLines) {
      doc.text(line, marginX + 4, qY);
      qY += 4.8;
    }

    currentY += boxHeight + 8;
  }

  // 4. AI ADVICE / CONTENT HEADING
  const answerHeading =
    data.lang === 'fr'
      ? 'RECOMMANDATION PÉDAGOGIQUE GÉNÉRÉE PAR L’INTELLIGENCE ARTIFICIELLE'
      : data.lang === 'en'
      ? 'PEDAGOGICAL GUIDANCE GENERATED BY ARTIFICIAL INTELLIGENCE'
      : data.lang === 'de'
      ? 'VON DER KI GENERIERTE PÄDAGOGISCHE EMPFEHLUNG'
      : 'RECOMANDARE PEDAGOGICĂ GENERATĂ DE INTELIGENȚA ARTIFICIALĂ';

  checkPageBreak(12);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(...headerColor);
  doc.text(sanitizePdfText(answerHeading), marginX, currentY);

  currentY += 6;

  // AI Content Rendering
  const cleanContent = sanitizePdfText(data.content || '(Niciun conținut)');
  const paragraphs = cleanContent.split(/\n+/).filter(Boolean);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(...textColor);

  for (const rawParagraph of paragraphs) {
    const trimmed = rawParagraph.trim();
    if (!trimmed) continue;

    const isBullet = trimmed.startsWith('*') || trimmed.startsWith('-') || /^[0-9]+[.)]/.test(trimmed);
    const isHeading = trimmed.startsWith('#') || trimmed.endsWith(':');

    if (isHeading) {
      checkPageBreak(9);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(...headerColor);
      const headingText = trimmed.replace(/^#+\s*/, '');
      const lines = doc.splitTextToSize(headingText, contentWidth);
      for (const line of lines) {
        doc.text(line, marginX, currentY);
        currentY += 5;
      }
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(...textColor);
      currentY += 1.5;
      continue;
    }

    const lines = doc.splitTextToSize(
      isBullet ? `  ${trimmed}` : trimmed,
      contentWidth
    );

    for (const line of lines) {
      checkPageBreak(6);
      doc.text(line, marginX, currentY);
      currentY += 5.2;
    }
    currentY += 2.5; // space between paragraphs
  }

  currentY += 8;
  checkPageBreak(34);

  // 5. SIGNATURE & VALIDATION BOX
  doc.setFillColor(...lightBg);
  doc.roundedRect(marginX, currentY, contentWidth, 26, 2, 2, 'F');
  doc.setDrawColor(210, 215, 210);
  doc.setLineWidth(0.3);
  doc.roundedRect(marginX, currentY, contentWidth, 26, 2, 2, 'S');

  const halfWidth = contentWidth / 2;

  // Assistant Signature
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...headerColor);
  const signAssist =
    data.lang === 'fr'
      ? "Signature de l'Assistant(e) Montessori :"
      : data.lang === 'en'
      ? 'Montessori Assistant Signature:'
      : data.lang === 'de'
      ? 'Unterschrift Montessori-Assistent:'
      : 'Semnătură Asistent Montessori:';
  doc.text(sanitizePdfText(signAssist), marginX + 4, currentY + 6);

  doc.setDrawColor(160, 160, 160);
  doc.line(marginX + 4, currentY + 20, marginX + halfWidth - 6, currentY + 20);

  // Guide Validation
  const signGuide =
    data.lang === 'fr'
      ? 'Validation Guide / Éducateur (basé sur les principes du modèle éducatif Montessori) :'
      : data.lang === 'en'
      ? 'Guide / Educator Validation (based on the principles of the Montessori educational model):'
      : data.lang === 'de'
      ? 'Prüfung durch die Klassenleitung:'
      : 'Validare Ghid / Educator (bazat pe principiile modelului educațional Montessori):';
  doc.text(sanitizePdfText(signGuide), marginX + halfWidth + 4, currentY + 6);
  doc.line(marginX + halfWidth + 4, currentY + 20, marginX + contentWidth - 4, currentY + 20);

  currentY += 32;

  // 6. FOOTER NOTE
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7.5);
  doc.setTextColor(130, 130, 130);
  const footerNote =
    data.lang === 'fr'
      ? 'Document officiel généré par Assistant Montessori - Module Conseiller IA & Moteur jsPDF'
      : data.lang === 'en'
      ? 'Official document generated by Montessori Assistant - AI Advisor Module & jsPDF Engine'
      : data.lang === 'de'
      ? 'Offizielles Dokument generiert durch Montessori Assistent - KI-Beratungsmodul'
      : 'Document oficial generat de Asistent Montessori - Modul Consilier AI & jsPDF Engine';
  doc.text(sanitizePdfText(footerNote), marginX, currentY);

  // Save PDF
  const safeDate = new Date().toISOString().slice(0, 10);
  const safeFilename = `montessori-consiliere-ai-${data.lang}-${safeDate}.pdf`;
  doc.save(safeFilename);
}

/**
 * Exports an entire chat consultation thread with AI to PDF
 */
export function exportAiConversationToPdf(data: AiConversationExportData): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const marginX = 18;
  const contentWidth = pageWidth - marginX * 2;
  const maxContentY = pageHeight - 22;

  let currentY = 20;

  const headerColor: [number, number, number] = [31, 58, 43];
  const accentColor: [number, number, number] = [184, 134, 75];
  const lightBg: [number, number, number] = [244, 247, 245];
  const textColor: [number, number, number] = [40, 50, 45];
  const userBubbleBg: [number, number, number] = [238, 243, 240];

  const checkPageBreak = (neededSpace: number = 10) => {
    if (currentY + neededSpace > maxContentY) {
      doc.addPage();
      currentY = 22;
    }
  };

  const now = new Date();
  const dateFormatted =
    data.dateStr ||
    now.toLocaleDateString(
      data.lang === 'fr'
        ? 'fr-FR'
        : data.lang === 'en'
        ? 'en-US'
        : data.lang === 'de'
        ? 'de-DE'
        : 'ro-RO',
      { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    );

  // TOP BANNER
  doc.setFillColor(...lightBg);
  doc.roundedRect(marginX, currentY, contentWidth, 34, 3, 3, 'F');
  doc.setDrawColor(...accentColor);
  doc.setLineWidth(0.6);
  doc.roundedRect(marginX, currentY, contentWidth, 34, 3, 3, 'S');

  const defaultInstSubConv =
    data.lang === 'fr'
      ? 'BASÉ SUR LES PRINCIPES DU MODÈLE ÉDUCATIF MONTESSORI'
      : data.lang === 'en'
      ? 'BASED ON THE PRINCIPLES OF THE MONTESSORI EDUCATIONAL MODEL'
      : data.lang === 'de'
      ? 'BASIEREND AUF DEN PRINZIPIEN DES MONTESSORI-BILDUNGSMODELLS'
      : 'BAZAT PE PRINCIPIILE MODELULUI EDUCAȚIONAL MONTESSORI';
  const instName = data.institution?.name || 'CENTRE MONTESSORI BILINGUE - ECOLE ACTIVE';
  const instSub = data.institution?.subtitle || defaultInstSubConv;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...headerColor);
  doc.text(sanitizePdfText(instName), marginX + 4, currentY + 9);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(105, 105, 105);
  doc.text(sanitizePdfText(instSub), marginX + 4, currentY + 16);

  const badgeLabel =
    data.lang === 'fr'
      ? 'DOSSIER COMPLET DE CONSULTATION IA (DIALOGUE PÉDAGOGIQUE)'
      : data.lang === 'en'
      ? 'FULL AI CONSULTATION RECORD (PEDAGOGICAL DIALOGUE)'
      : data.lang === 'de'
      ? 'VOLLSTÄNDIGES KI-BERATUNGSPROTOKOLL'
      : 'DOSAR COMPLET DE CONSULTANȚĂ AI (DIALOG PEDAGOGIC)';

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(...accentColor);
  doc.text(sanitizePdfText(badgeLabel), marginX + 4, currentY + 24);

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(90, 90, 90);
  doc.text(`${sanitizePdfText(dateFormatted)} | Total mesaje: ${data.messages.length}`, marginX + 4, currentY + 30);

  currentY += 40;

  // Title
  const docTitle =
    data.title ||
    (data.lang === 'fr'
      ? 'Rapport de Consultation Pédagogique Assistée par IA'
      : data.lang === 'en'
      ? 'AI-Assisted Pedagogical Consultation Report'
      : data.lang === 'de'
      ? 'Bericht zur KI-gestützten pädagogischen Beratung'
      : 'Raport de Consultanță Pedagogică Asistată de AI');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(...headerColor);
  doc.text(sanitizePdfText(docTitle), marginX, currentY);

  currentY += 8;

  // Messages Loop
  for (let i = 0; i < data.messages.length; i++) {
    const msg = data.messages[i];
    const isUser = msg.role === 'user';
    const roleLabel = isUser
      ? (data.lang === 'fr' ? 'ASSISTANT MONTESSORI' : data.lang === 'en' ? 'MONTESSORI ASSISTANT' : data.lang === 'de' ? 'MONTESSORI-ASSISTENT' : 'ASISTENT MONTESSORI')
      : (data.lang === 'fr' ? 'CONSEILLER PÉDAGOGIQUE IA (GEMINI)' : data.lang === 'en' ? 'AI PEDAGOGICAL ADVISOR (GEMINI)' : data.lang === 'de' ? 'KI-PÄDAGOGISCHER BERATER (GEMINI)' : 'CONSILIER PEDAGOGIC AI (GEMINI)');

    checkPageBreak(18);

    // Role badge
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    if (isUser) {
      doc.setTextColor(60, 80, 70);
    } else {
      doc.setTextColor(...headerColor);
    }

    const timeLabel = msg.timestamp ? ` [${msg.timestamp}]` : '';
    doc.text(`${roleLabel}${timeLabel}`, marginX, currentY);
    currentY += 5;

    // Content lines
    const cleanContent = sanitizePdfText(msg.content);
    const paragraphs = cleanContent.split(/\n+/).filter(Boolean);

    doc.setFont('helvetica', isUser ? 'italic' : 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...textColor);

    for (const p of paragraphs) {
      const lines = doc.splitTextToSize(p.trim(), contentWidth);
      for (const line of lines) {
        checkPageBreak(6);
        doc.text(line, marginX, currentY);
        currentY += 5;
      }
      currentY += 1.5;
    }

    currentY += 4;
    doc.setDrawColor(230, 235, 230);
    doc.setLineWidth(0.3);
    doc.line(marginX, currentY, marginX + contentWidth, currentY);
    currentY += 6;
  }

  currentY += 6;
  checkPageBreak(32);

  // Signatures
  doc.setFillColor(...lightBg);
  doc.roundedRect(marginX, currentY, contentWidth, 24, 2, 2, 'F');
  doc.setDrawColor(210, 215, 210);
  doc.setLineWidth(0.3);
  doc.roundedRect(marginX, currentY, contentWidth, 24, 2, 2, 'S');

  const halfWidth = contentWidth / 2;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...headerColor);
  doc.text(sanitizePdfText('Semnătură Asistent :'), marginX + 4, currentY + 5);
  doc.text(sanitizePdfText('Validare Ghid / Educator :'), marginX + halfWidth + 4, currentY + 5);

  doc.setDrawColor(160, 160, 160);
  doc.line(marginX + 4, currentY + 18, marginX + halfWidth - 6, currentY + 18);
  doc.line(marginX + halfWidth + 4, currentY + 18, marginX + contentWidth - 4, currentY + 18);

  currentY += 28;

  // Footer
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7.5);
  doc.setTextColor(130, 130, 130);
  doc.text(
    sanitizePdfText('Document generat de Asistent Montessori - Modul AI Consultanță & jsPDF'),
    marginX,
    currentY
  );

  const safeDate = new Date().toISOString().slice(0, 10);
  doc.save(`montessori-consultatie-completa-${data.lang}-${safeDate}.pdf`);
}
