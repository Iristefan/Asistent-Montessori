import fs from 'fs';
import path from 'path';
import { jsPDF } from 'jspdf';
import { USER_MANUAL_DATA, UserManualContent } from '../src/data/userManualData';
import { Language } from '../src/i18n/translations';

function sanitizeForJsPdf(text: string): string {
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

function buildPdfBuffer(manual: UserManualContent, lang: Language): Buffer {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const marginX = 18;
  const contentWidth = pageWidth - marginX * 2;
  const maxContentY = pageHeight - 20;

  let currentY = 22;

  const headerColor: [number, number, number] = [31, 58, 43];
  const accentColor: [number, number, number] = [184, 134, 75];
  const textColor: [number, number, number] = [45, 55, 72];
  const lightGray: [number, number, number] = [240, 243, 240];

  const checkPageBreak = (neededSpace: number = 10) => {
    if (currentY + neededSpace > maxContentY) {
      doc.addPage();
      currentY = 25;
    }
  };

  // COVER HEADER
  doc.setFillColor(...lightGray);
  doc.roundedRect(marginX, currentY, contentWidth, 38, 3, 3, 'F');
  doc.setDrawColor(...accentColor);
  doc.setLineWidth(0.6);
  doc.roundedRect(marginX, currentY, contentWidth, 38, 3, 3, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(...headerColor);
  doc.text(sanitizeForJsPdf(manual.institution), marginX + 6, currentY + 9);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.setTextColor(...headerColor);
  doc.text(sanitizeForJsPdf(manual.title), marginX + 6, currentY + 18);

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9.5);
  doc.setTextColor(...accentColor);
  doc.text(sanitizeForJsPdf(manual.subtitle), marginX + 6, currentY + 25);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(90, 100, 110);
  doc.text(
    `${sanitizeForJsPdf(manual.version)}  |  ${sanitizeForJsPdf(manual.date)}  |  ${sanitizeForJsPdf(manual.author)}`,
    marginX + 6,
    currentY + 32
  );

  currentY += 46;

  // INTRODUCTION
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...headerColor);
  doc.text(
    lang === 'fr' ? 'Introduction' : lang === 'de' ? 'Einleitung' : lang === 'en' ? 'Introduction' : 'Introducere',
    marginX,
    currentY
  );
  currentY += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(...textColor);
  const introLines = doc.splitTextToSize(sanitizeForJsPdf(manual.intro), contentWidth);
  doc.text(introLines, marginX, currentY);
  currentY += introLines.length * 4.8 + 6;

  // SECTIONS
  manual.sections.forEach((section) => {
    checkPageBreak(25);

    doc.setFillColor(...headerColor);
    doc.rect(marginX, currentY, 2.5, 7, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11.5);
    doc.setTextColor(...headerColor);
    doc.text(sanitizeForJsPdf(section.title), marginX + 5, currentY + 5.5);
    currentY += 9;

    if (section.content && section.content.length > 0) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(...textColor);
      section.content.forEach((p) => {
        checkPageBreak(12);
        const lines = doc.splitTextToSize(sanitizeForJsPdf(p), contentWidth);
        doc.text(lines, marginX, currentY);
        currentY += lines.length * 4.4 + 3;
      });
    }

    if (section.subsections && section.subsections.length > 0) {
      section.subsections.forEach((sub) => {
        checkPageBreak(18);

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9.5);
        doc.setTextColor(...accentColor);
        doc.text(sanitizeForJsPdf(sub.subtitle), marginX + 2, currentY);
        currentY += 5;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(...textColor);

        sub.items.forEach((item) => {
          checkPageBreak(10);
          const sanitizedItem = sanitizeForJsPdf(item);
          const bulletLines = doc.splitTextToSize(sanitizedItem, contentWidth - 7);

          doc.circle(marginX + 2, currentY - 1, 0.7, 'F');
          doc.text(bulletLines, marginX + 6, currentY);
          currentY += bulletLines.length * 4 + 1.8;
        });

        currentY += 2;
      });
    }

    currentY += 4;
  });

  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);

    if (i > 1) {
      doc.setDrawColor(210, 220, 215);
      doc.setLineWidth(0.3);
      doc.line(marginX, 14, pageWidth - marginX, 14);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(120, 130, 140);
      doc.text(
        sanitizeForJsPdf("Assistant Montessori • L'École des Préalpes • Manual de Utilizare"),
        marginX,
        11
      );
    }

    doc.setDrawColor(210, 220, 215);
    doc.setLineWidth(0.3);
    doc.line(marginX, pageHeight - 12, pageWidth - marginX, pageHeight - 12);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(120, 130, 140);
    doc.text(sanitizeForJsPdf(manual.author), marginX, pageHeight - 8);

    const pageStr =
      lang === 'fr'
        ? `Page ${i} / ${totalPages}`
        : lang === 'de'
        ? `Seite ${i} / ${totalPages}`
        : lang === 'en'
        ? `Page ${i} of ${totalPages}`
        : `Pagina ${i} din ${totalPages}`;

    doc.text(pageStr, pageWidth - marginX - doc.getTextWidth(pageStr), pageHeight - 8);
  }

  const arrayBuffer = doc.output('arraybuffer');
  return Buffer.from(arrayBuffer);
}

const publicDir = path.resolve(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const fileMap: Record<Language, string> = {
  ro: 'Manual_Utilizare_Assistant_Montessori_RO.pdf',
  fr: 'Guide_Utilisation_Assistant_Montessori_FR.pdf',
  en: 'User_Manual_Assistant_Montessori_EN.pdf',
  de: 'Benutzerhandbuch_Assistant_Montessori_DE.pdf',
};

(['ro', 'fr', 'en', 'de'] as Language[]).forEach((lang) => {
  const manual = USER_MANUAL_DATA[lang];
  const pdfBuffer = buildPdfBuffer(manual, lang);
  const outPath = path.join(publicDir, fileMap[lang]);
  fs.writeFileSync(outPath, pdfBuffer);
  console.log(`Generated: ${outPath} (${pdfBuffer.length} bytes)`);
});
