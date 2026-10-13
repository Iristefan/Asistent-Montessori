import { jsPDF } from 'jspdf';
import { InstitutionConfig } from '../types';
import { Language } from '../i18n/translations';

export interface VoiceNoteExportData {
  title: string;
  category?: string;
  transcript: string;
  dateStr?: string;
  timeStr?: string;
  lang: Language;
  wordCount?: number;
  institution?: InstitutionConfig;
}

function sanitizeText(text: string): string {
  if (!text) return '';
  return text
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
    .replace(/[«»]/g, '"')
    .replace(/[–—]/g, '-')
    .replace(/[•]/g, '*');
}

export function exportVoiceNoteToPdf(data: VoiceNoteExportData): void {
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
  const timeFormatted = data.timeStr || now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

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
  doc.text(sanitizeText(instName), marginX + 4, currentY + 9);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(110, 110, 110);
  doc.text(sanitizeText(instSub), marginX + 4, currentY + 16);

  // Badge on the right
  const badgeLabel =
    data.lang === 'fr'
      ? 'DICTEE VOCALE - TRANSCRIPTION OFFICIELLE'
      : data.lang === 'en'
      ? 'SPEECH-TO-TEXT - OFFICIAL TRANSCRIPT'
      : data.lang === 'de'
      ? 'SPRACHEINGABE - OFFIZIELLES TRANSKRIPT'
      : 'DICTARE VOCALĂ - TRANSCRIERE OFICIALĂ';

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(...accentColor);
  doc.text(sanitizeText(badgeLabel), marginX + 4, currentY + 24);

  // Date and Time
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(90, 90, 90);
  doc.text(`${sanitizeText(dateFormatted)} | ${timeFormatted}`, marginX + 4, currentY + 30);

  currentY += 40;

  // 2. DOCUMENT TITLE
  const docTitle =
    data.title ||
    (data.lang === 'fr'
      ? 'Rapport de Dictée Vocale & Observation'
      : data.lang === 'en'
      ? 'Voice Dictation Report & Pedagogical Notes'
      : data.lang === 'de'
      ? 'Sprachnotiz & Pädagogische Beobachtung'
      : 'Raport Dictare Vocală & Notițe Pedagogice');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.setTextColor(...headerColor);
  doc.text(sanitizeText(docTitle), marginX, currentY);

  currentY += 7;

  // Metadata ribbon (Word count, Language, Mode)
  const words = data.transcript ? data.transcript.trim().split(/\s+/).length : 0;
  const langLabel =
    data.lang === 'fr'
      ? 'Langue: Français (fr-FR)'
      : data.lang === 'en'
      ? 'Language: English (en-US)'
      : data.lang === 'de'
      ? 'Sprache: Deutsch (de-DE)'
      : 'Limba: Română (ro-RO)';

  const metaText = `${langLabel}  |  ${words} ${
    data.lang === 'fr' ? 'mots transcrits' : data.lang === 'en' ? 'words transcribed' : data.lang === 'de' ? 'Wörter' : 'cuvinte transcrise'
  }  |  Format: Speech-to-Text Native`;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(100, 100, 100);
  doc.text(sanitizeText(metaText), marginX, currentY);

  currentY += 6;
  doc.setDrawColor(220, 225, 220);
  doc.setLineWidth(0.4);
  doc.line(marginX, currentY, marginX + contentWidth, currentY);

  currentY += 8;

  // 3. TRANSCRIPT BODY
  const sectionHeading =
    data.lang === 'fr'
      ? '1. TEXTE TRANSCRIT (CONTINU PÉDAGOGIQUE)'
      : data.lang === 'en'
      ? '1. TRANSCRIBED TEXT (PEDAGOGICAL RECORD)'
      : data.lang === 'de'
      ? '1. TRANSKRIBIERTER TEXT (PÄDAGOGISCHES PROTOKOLL)'
      : '1. TEXT TRANSCRIERE (ÎNREGISTRARE PEDAGOGICĂ)';

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(...headerColor);
  doc.text(sanitizeText(sectionHeading), marginX, currentY);

  currentY += 6;

  // Split transcript into paragraphs
  const cleanTranscript = sanitizeText(data.transcript || '(Niciun text înregistrat)');
  const paragraphs = cleanTranscript.split(/\n+/).filter(Boolean);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(...textColor);

  for (const p of paragraphs) {
    const lines = doc.splitTextToSize(p, contentWidth);
    for (const line of lines) {
      checkPageBreak(7);
      doc.text(line, marginX, currentY);
      currentY += 5.5;
    }
    currentY += 2.5; // spacing between paragraphs
  }

  currentY += 10;
  checkPageBreak(35);

  // 4. SIGNATURES & VALIDATION BOX
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
  doc.text(sanitizeText(signAssist), marginX + 4, currentY + 6);

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
  doc.text(sanitizeText(signGuide), marginX + halfWidth + 4, currentY + 6);
  doc.line(marginX + halfWidth + 4, currentY + 20, marginX + contentWidth - 4, currentY + 20);

  currentY += 32;

  // FOOTER NOTE
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7.5);
  doc.setTextColor(130, 130, 130);
  const footerNote =
    data.lang === 'fr'
      ? 'Document officiel généré par Assistant Montessori - Module Speech-to-Text & jsPDF Engine'
      : data.lang === 'en'
      ? 'Official document generated by Montessori Assistant - Speech-to-Text Module & jsPDF Engine'
      : data.lang === 'de'
      ? 'Offizielles Dokument generiert durch Montessori Assistent - Speech-to-Text Modul'
      : 'Document oficial generat de Asistent Montessori - Modul Speech-to-Text & jsPDF Engine';
  doc.text(sanitizeText(footerNote), marginX, currentY);

  // Trigger download
  const safeFilename = `montessori-dictare-${data.lang}-${new Date().toISOString().slice(0, 10)}.pdf`;
  doc.save(safeFilename);
}
