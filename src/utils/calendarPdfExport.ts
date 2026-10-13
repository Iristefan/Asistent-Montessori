import { jsPDF } from 'jspdf';
import { InstitutionConfig, MontessoriCalendarEvent } from '../types';
import { Language } from '../i18n/translations';
import { sanitizePdfText } from './aiPdfExport';

export interface CalendarExportOptions {
  events: MontessoriCalendarEvent[];
  institution?: InstitutionConfig;
  lang: Language;
  selectedMonth?: number;
  selectedCategory?: string;
}

export function exportCalendarToPdf({
  events,
  institution,
  lang,
  selectedMonth,
}: CalendarExportOptions) {
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
      ? 'Centre Pédagogique Montessori (basé sur les principes du modèle éducatif Montessori)'
      : lang === 'en'
      ? 'Montessori Pedagogical Center (based on the principles of the Montessori educational model)'
      : lang === 'de'
      ? 'Montessori Pädagogisches Zentrum (basierend auf den Prinzipien des Montessori-Bildungsmodells)'
      : 'Centru Pedagogic Montessori (bazat pe principiile modelului educațional Montessori)';

  const defaultInst: InstitutionConfig = institution || {
    name: "L'ECOLE DES PREALPES",
    subtitle: defaultSub,
    contact: 'contact@montessori-prealpes.ch',
  };

  const headersByLang: Record<Language, {
    title: string;
    sub: string;
    emitted: string;
    catFounder: string;
    catPeace: string;
    catCosmic: string;
    catTradition: string;
    activitiesTitle: string;
    materialsTitle: string;
    quoteTitle: string;
    pageLabel: string;
  }> = {
    ro: {
      title: 'CALENDARUL INTERNATIONAL MONTESSORI',
      sub: 'Ghidul Pedagogic al Sarbatorilor Globale, Repere Fondatoare & Educatie Cosmica',
      emitted: 'Document oficial emis bazat pe principiile modelului educational Montessori',
      catFounder: 'ZILE FONDATOARE',
      catPeace: 'EDUCATIE PENTRU PACE',
      catCosmic: 'EDUCATIE COSMICA',
      catTradition: 'RITUALURI SI TRADITII',
      activitiesTitle: 'Activitati de Clasa Recomandate:',
      materialsTitle: 'Materiale Recomandate:',
      quoteTitle: 'Citat Maria Montessori:',
      pageLabel: 'Pagina',
    },
    fr: {
      title: 'CALENDRIER INTERNATIONAL MONTESSORI',
      sub: 'Guide Pedagogique des Fetes Mondiales, Jalons Fondateurs & Education Cosmique',
      emitted: 'Document officiel emis selon les principes du modele educatif Montessori',
      catFounder: 'JALONS FONDATEURS',
      catPeace: 'EDUCATION POUR LA PAIX',
      catCosmic: 'EDUCATION COSMIQUE',
      catTradition: 'RITUELS & TRADITIONS',
      activitiesTitle: 'Activites en Classe Recommandees:',
      materialsTitle: 'Materiel Recommande:',
      quoteTitle: 'Citation de Maria Montessori:',
      pageLabel: 'Page',
    },
    en: {
      title: 'INTERNATIONAL MONTESSORI CALENDAR',
      sub: 'Pedagogical Guide to Global Celebrations, Founding Milestones & Cosmic Education',
      emitted: 'Official publication in accordance with the principles of the Montessori educational model',
      catFounder: 'FOUNDING MILESTONES',
      catPeace: 'PEACE EDUCATION',
      catCosmic: 'COSMIC EDUCATION',
      catTradition: 'RITUALS & TRADITIONS',
      activitiesTitle: 'Recommended Classroom Activities:',
      materialsTitle: 'Recommended Materials:',
      quoteTitle: 'Maria Montessori Quote:',
      pageLabel: 'Page',
    },
    de: {
      title: 'INTERNATIONALER MONTESSORI-KALENDER',
      sub: 'Padagogischer Leitfaden fur Globale Feiertage, Meilensteine & Kosmische Erziehung',
      emitted: 'Offizielles Dokument gemaess den Prinzipien des Montessori-Bildungsmodells',
      catFounder: 'MEILENSTEINE',
      catPeace: 'FRIEDENSERZIEHUNG',
      catCosmic: 'KOSMISCHE ERZIEHUNG',
      catTradition: 'RITUALE & TRADITIONEN',
      activitiesTitle: 'Empfohlene Gruppenaktivitaten:',
      materialsTitle: 'Empfohlenes Material:',
      quoteTitle: 'Montessori-Zitat:',
      pageLabel: 'Seite',
    },
  };

  const tH = headersByLang[lang] || headersByLang.ro;

  function renderPageHeader() {
    // Forest green top bar
    doc.setFillColor(31, 58, 43); // #1F3A2B
    doc.rect(margin, margin, contentWidth, 24, 'F');

    // School Name & Subtitle
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.text(sanitizePdfText(defaultInst.name), margin + 5, margin + 7.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(212, 163, 115); // gold #D4A373
    doc.text(sanitizePdfText(defaultInst.subtitle), margin + 5, margin + 12.5);

    doc.setFontSize(7);
    doc.setTextColor(240, 240, 240);
    const dateStr = new Date().toLocaleDateString();
    doc.text(`${sanitizePdfText(tH.emitted)} | ${dateStr}`, margin + 5, margin + 17.5);

    // Decorative Gold Line
    doc.setFillColor(212, 163, 115);
    doc.rect(margin, margin + 24, contentWidth, 1.5, 'F');

    y = margin + 31;
  }

  function renderPageFooter(pageNumber: number, totalPages: number) {
    const footY = pageHeight - margin + 4;
    doc.setDrawColor(210, 210, 210);
    doc.setLineWidth(0.3);
    doc.line(margin, footY - 3, margin + contentWidth, footY - 3);

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7.5);
    doc.setTextColor(120, 120, 120);
    doc.text(
      sanitizePdfText(`${defaultInst.name} - ${tH.title}`),
      margin,
      footY + 1
    );

    const pageText = `${tH.pageLabel} ${pageNumber} / ${totalPages}`;
    doc.text(pageText, margin + contentWidth - doc.getTextWidth(pageText), footY + 1);
  }

  renderPageHeader();

  // Document Title Section
  doc.setTextColor(31, 58, 43);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text(sanitizePdfText(tH.title), margin, y);
  y += 5.5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(90, 90, 90);
  doc.text(sanitizePdfText(tH.sub), margin, y);
  y += 7;

  // Filter events
  const filteredEvents = selectedMonth
    ? events.filter((e) => e.month === selectedMonth)
    : events;

  // Render Each Event
  filteredEvents.forEach((ev) => {
    // Estimate event box height
    const actLines = doc.splitTextToSize(
      `0-3y: ${ev.classroomActivities[lang]?.toddler || ''} | 3-6y: ${ev.classroomActivities[lang]?.casa || ''} | 6-12y: ${ev.classroomActivities[lang]?.elementary || ''}`,
      contentWidth - 10
    );
    const estimatedHeight = 36 + actLines.length * 3.5;

    // Check page break
    if (y + estimatedHeight > pageHeight - margin - 12) {
      doc.addPage();
      renderPageHeader();
    }

    // Event Card Container
    doc.setFillColor(250, 249, 246); // warm neutral
    doc.setDrawColor(220, 220, 215);
    doc.setLineWidth(0.3);
    doc.roundedRect(margin, y, contentWidth, estimatedHeight, 2, 2, 'FD');

    // Category Stripe on left
    const catColor =
      ev.category === 'founder'
        ? [180, 83, 9] // amber-700
        : ev.category === 'peace'
        ? [46, 90, 68] // emerald-800
        : ev.category === 'cosmic'
        ? [2, 132, 199] // sky-600
        : [147, 51, 234]; // purple-600
    doc.setFillColor(catColor[0], catColor[1], catColor[2]);
    doc.rect(margin, y, 2.5, estimatedHeight, 'F');

    // Date Badge
    doc.setFillColor(31, 58, 43);
    doc.roundedRect(margin + 5, y + 3.5, 26, 6, 1, 1, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(255, 255, 255);
    doc.text(sanitizePdfText(ev.dateDisplay[lang] || ''), margin + 6.5, y + 7.5);

    // Category Label
    const catLabel =
      ev.category === 'founder'
        ? tH.catFounder
        : ev.category === 'peace'
        ? tH.catPeace
        : ev.category === 'cosmic'
        ? tH.catCosmic
        : tH.catTradition;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.setTextColor(catColor[0], catColor[1], catColor[2]);
    doc.text(sanitizePdfText(catLabel), margin + 34, y + 7.5);

    // Event Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(30, 30, 30);
    doc.text(sanitizePdfText(ev.title[lang] || ''), margin + 5, y + 14);

    // Event Subtitle
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 100, 100);
    doc.text(sanitizePdfText(ev.subtitle[lang] || ''), margin + 5, y + 18);

    // Historical Context / Significance
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(50, 50, 50);
    const histLines = doc.splitTextToSize(
      sanitizePdfText(ev.historicalContext[lang] || ''),
      contentWidth - 10
    );
    doc.text(histLines.slice(0, 2), margin + 5, y + 22.5);

    // Classroom Activities Header & Summary
    let textY = y + 29;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.8);
    doc.setTextColor(46, 90, 68);
    doc.text(sanitizePdfText(tH.activitiesTitle), margin + 5, textY);
    textY += 3.5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(60, 60, 60);

    const actText = sanitizePdfText(
      `* 0-3y: ${ev.classroomActivities[lang]?.toddler || ''}\n* 3-6y: ${ev.classroomActivities[lang]?.casa || ''}\n* 6-12y: ${ev.classroomActivities[lang]?.elementary || ''}`
    );
    const wrappedAct = doc.splitTextToSize(actText, contentWidth - 10);
    doc.text(wrappedAct, margin + 5, textY);

    y += estimatedHeight + 4;
  });

  // Stamp total page count
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    renderPageFooter(i, totalPages);
  }

  // Save PDF
  const filename = `Montessori_Calendar_${lang}_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(filename);
}

export function exportBirthdayWalkScriptToPdf({
  childName,
  turningAge,
  birthDate,
  institution,
  lang,
}: {
  childName: string;
  turningAge: number;
  birthDate?: string;
  institution?: InstitutionConfig;
  lang: Language;
}) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  const defaultSub =
    lang === 'fr'
      ? 'Centre Pédagogique Montessori (basé sur les principes du modèle éducatif Montessori)'
      : lang === 'en'
      ? 'Montessori Pedagogical Center (based on the principles of the Montessori educational model)'
      : lang === 'de'
      ? 'Montessori Pädagogisches Zentrum (basierend auf den Prinzipien des Montessori-Bildungsmodells)'
      : 'Centru Pedagogic Montessori (bazat pe principiile modelului educațional Montessori)';

  const defaultInst = institution || {
    name: "L'ECOLE DES PREALPES",
    subtitle: defaultSub,
  };

  // Header
  doc.setFillColor(31, 58, 43);
  doc.rect(margin, margin, contentWidth, 22, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text(sanitizePdfText(defaultInst.name), margin + 5, margin + 8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(212, 163, 115);
  doc.text(
    sanitizePdfText('Ceremonia Soarelui - The Montessori Birthday Walk / Celebration of Life'),
    margin + 5,
    margin + 13.5
  );

  doc.setFillColor(212, 163, 115);
  doc.rect(margin, margin + 22, contentWidth, 1.2, 'F');

  y = margin + 29;

  // Title Box
  doc.setTextColor(31, 58, 43);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  const cleanName = sanitizePdfText(childName || 'Copil');
  doc.text(`Scenariul Ceremoniei Soarelui: ${cleanName}`, margin, y);
  y += 6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(90, 90, 90);
  doc.text(
    sanitizePdfText(
      `Varsta: ${turningAge} ani | Data: ${birthDate || new Date().toISOString().split('T')[0]}`
    ),
    margin,
    y
  );
  y += 8;

  // Materials needed box
  doc.setFillColor(244, 247, 245);
  doc.setDrawColor(46, 90, 68);
  doc.roundedRect(margin, y, contentWidth, 20, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(46, 90, 68);
  doc.text(sanitizePdfText('Materiale pregatite in cerc:'), margin + 4, y + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(50, 50, 50);
  doc.text(
    sanitizePdfText(
      '1. Covorul Soarelui cu cele 12 panglici ale lunilor | 2. Lumânarea centrală aprinsă (Soarele)\n3. Globul pământesc ținut cu două mâini de copil | 4. Fotografii aduse de familie pentru fiecare an'
    ),
    margin + 4,
    y + 10
  );
  y += 25;

  // Script Steps
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(31, 58, 43);
  doc.text(sanitizePdfText('Desfasurarea Ritualului Pas cu Pas:'), margin, y);
  y += 6;

  for (let year = 1; year <= Math.min(turningAge, 12); year++) {
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(210, 210, 205);
    doc.roundedRect(margin, y, contentWidth, 18, 1.5, 1.5, 'FD');

    doc.setFillColor(212, 163, 115);
    doc.circle(margin + 6, y + 9, 4, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(31, 58, 43);
    doc.text(`${year}`, margin + 5, y + 10.2);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(31, 58, 43);
    doc.text(
      sanitizePdfText(`Turul ${year}: Pamantul a parcurs o rotatie completa in jurul Soarelui`),
      margin + 13,
      y + 6
    );

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7.5);
    doc.setTextColor(70, 70, 70);
    const spoken = `Ghidul spune: «Pamantul a calatorit un an intreg prin spatiu in jurul Soarelui, si ${cleanName} a implinit ${year} an${year > 1 ? 'i' : ''}! Sa privim fotografia de la ${year} an${year > 1 ? 'i' : ''}.»`;
    doc.text(sanitizePdfText(spoken), margin + 13, y + 12);

    y += 21;
  }

  // Final Birthday Song
  if (y + 20 < pageHeight - margin) {
    doc.setFillColor(244, 247, 245);
    doc.roundedRect(margin, y, contentWidth, 18, 2, 2, 'FD');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(46, 90, 68);
    doc.text(sanitizePdfText('Cantarea Festiva a Clasei:'), margin + 4, y + 5.5);

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7.5);
    doc.setTextColor(50, 50, 50);
    doc.text(
      sanitizePdfText(
        '«The Earth goes around the Sun, the Earth goes around the Sun,\nThe Earth goes around the Sun, and now you are ' +
          turningAge +
          '!»\n(Copilul sufla usor in lumanare si toata clasa aplauda in liniste).'
      ),
      margin + 4,
      y + 10
    );
  }

  // Footer
  const footY = pageHeight - margin + 4;
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7.5);
  doc.setTextColor(120, 120, 120);
  doc.text(
    sanitizePdfText(`Ceremonia Soarelui - Documentatie pedagogica emisa pentru ${cleanName}`),
    margin,
    footY
  );

  doc.save(`Ceremonia_Soarelui_${cleanName}_${turningAge}ani.pdf`);
}
