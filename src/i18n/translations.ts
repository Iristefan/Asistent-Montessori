export type Language = 'ro' | 'fr' | 'en' | 'de';

export interface LanguageOption {
  code: Language;
  label: string;
  flag: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'ro', label: 'Română', flag: '🇷🇴' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
];

export const UI_TRANSLATIONS: Record<Language, {
  appName: string;
  appSubtitle: string;
  tagline: string;
  headerSettings: string;
  exportPdf: string;
  userManual: string;
  printOrSavePdf: string;
  close: string;
  save: string;
  cancel: string;
  reset: string;
  institutionName: string;
  accreditationSubtitle: string;
  addressContact: string;
  uploadLogo: string;
  resetDefault: string;
  changeLogo: string;
  modulesTitle: string;
  nav: {
    hub: string;
    obs: string;
    childObs: string;
    sensitive: string;
    lesson: string;
    peace: string;
    dict: string;
    ai: string;
    reports: string;
    calendar: string;
  };
  hub: {
    roleTitle: string;
    coreRole: string;
    cycle3hTitle: string;
    cycle3hDesc: string;
    handsBackTitle: string;
    handsBackDesc: string;
    graceTitle: string;
    graceDesc: string;
    thoughtOfDay: string;
    anotherQuote: string;
    instReport: string;
    instReportDesc: string;
    printBtn: string;
    checklistTitle: string;
    tasksDone: string;
    quickNotesTitle: string;
    quickNotesDesc: string;
    newNotePlaceholder: string;
    addBtn: string;
    emptyNotes: string;
    categories: {
      environment: string;
      material: string;
      child: string;
      general: string;
      morning: string;
      work: string;
      afternoon: string;
    };
  };
  obs: {
    title: string;
    subtitle: string;
    protocolProgress: string;
    sessionsCount: string;
    tabNew: string;
    tabHistory: string;
    methodFocus: string;
    date: string;
    startTime: string;
    group: string;
    weather: string;
    notesTitle: string;
    notesHint: string;
    reflectionTitle: string;
    reflectionHint: string;
    saveSession: string;
    aiAnalyzeBtn: string;
    aiAnalyzing: string;
    aiFeedbackTitle: string;
    emptyHistory: string;
    addFirst: string;
    groupPlaceholder: string;
    weatherPlaceholder: string;
    notesPlaceholder: string;
    reflectionPlaceholder: string;
    reloadExample: string;
    printTooltip: string;
    deleteTooltip: string;
    phases: {
      p1: string;
      p2: string;
      p3: string;
      p4: string;
    };
    guidance: {
      p1: string;
      p2: string;
      p3: string;
      p4: string;
    };
  };
  lesson: {
    title: string;
    subtitle: string;
    lessonPrinciple: string;
    savedCount: string;
    tabCreate: string;
    tabSaved: string;
    tabSchedule: string;
    tabScope: string;
    tabStem: string;
    aiAutofillTitle: string;
    aiAutofillDesc: string;
    aiTopicPlaceholder: string;
    aiGenerateBtn: string;
    aiGenerating: string;
    orChooseSample: string;
    formTitle: string;
    el1Title: string;
    subjectLabel: string;
    levelLabel: string;
    el2Title: string;
    el3Title: string;
    indirectAimsLabel: string;
    el4Title: string;
    hots1Label: string;
    hots2Label: string;
    el5Title: string;
    follow1Label: string;
    follow2Label: string;
    materialsLabel: string;
    pointOfInterestLabel: string;
    saveLessonBtn: string;
    emptySaved: string;
    createFirst: string;
    scheduleTitle: string;
    scheduleDesc: string;
    casadeiNote: string;
  };
  peace: {
    title: string;
    subtitle: string;
    intro: string;
    praiseTitle: string;
    praiseDesc: string;
    chooseScenario: string;
    phrasingTitle: string;
    whyWorks: string;
    customSituation: string;
    customPlaceholder: string;
    generateBtn: string;
    limitedChoicesTitle: string;
    limitedChoicesDesc: string;
    peaceTableTitle: string;
    peaceTableDesc: string;
    stepOf: string;
    steps: {
      s1: string;
      s2: string;
      s3: string;
      s4: string;
      s5: string;
    };
    backBtn: string;
    nextBtn: string;
  };
  dict: {
    title: string;
    subtitle: string;
    intro: string;
    searchPlaceholder: string;
    all: string;
    principles: string;
    materials: string;
    childDev: string;
    peace: string;
    defTitle: string;
    appTitle: string;
    noResults: string;
  };
  ai: {
    title: string;
    subtitle: string;
    activeStatus: string;
    resetChat: string;
    frequentQuestions: string;
    inputPlaceholder: string;
    sendBtn: string;
    consulting: string;
    exportPdf: string;
    printText: string;
    exportAllPdf: string;
    printAll: string;
    copyText: string;
    copied: string;
    docTitle: string;
    aiRecommendation: string;
  };
  reports: {
    title: string;
    subtitle: string;
    intro: string;
    obsReportTitle: string;
    obsReportDesc: string;
    lessonReportTitle: string;
    lessonReportDesc: string;
    weeklyReportTitle: string;
    weeklyReportDesc: string;
    openPrintPdf: string;
    backupTitle: string;
    backupDesc: string;
    exportBackupJson: string;
    restoreBackup: string;
    backupSuccess: string;
  };
  calendar: {
    title: string;
    subtitle: string;
    description: string;
    allCategories: string;
    founderCat: string;
    peaceCat: string;
    cosmicCat: string;
    traditionCat: string;
    searchPlaceholder: string;
    allMonths: string;
    filterByMonth: string;
    monthNames: string[];
    upcomingEvents: string;
    noEventsFound: string;
    classroomGuide: string;
    recommendedMaterials: string;
    quoteTitle: string;
    exportPdf: string;
    printCalendar: string;
    birthdayWalkTitle: string;
    birthdayWalkSubtitle: string;
    birthdayWalkDesc: string;
    childNameLabel: string;
    turningAgeLabel: string;
    birthDateLabel: string;
    startRitualBtn: string;
    toddlerLevel: string;
    casaLevel: string;
    elementaryLevel: string;
    historicalContextTitle: string;
    pedagogicalMeaningTitle: string;
    taglineBadge: string;
    birthdayWalkShort: string;
    exportScriptPdf: string;
    closePanel: string;
    resetSearch: string;
    showAllMonths: string;
    eventsFoundSuffix: string;
    clickToExpandHint: string;
    showAllHolidays: string;
    hideDetails: string;
    viewActivities: string;
    exportPdfTooltip: string;
    printCalendarTooltip: string;
    yearSingular: string;
    yearPlural: string;
    currentMonthBadge: string;
    adaptToCurrentMonth: string;
    currentMonthActive: string;
    todayIs: string;
  };
  childObs: {
    title: string;
    subtitle: string;
    profileTitle: string;
    childName: string;
    childAge: string;
    childLevel: string;
    date: string;
    observer: string;
    aiTitle: string;
    aiDesc: string;
    aiPlaceholder: string;
    aiBtn: string;
    aiGenerating: string;
    domainsTitle: string;
    vp: string;
    senz: string;
    lang: string;
    math: string;
    cult: string;
    soc: string;
    statusMastered: string;
    statusPracticing: string;
    statusPresented: string;
    statusUnaddressed: string;
    notesPlaceholder: string;
    generalTitle: string;
    generalPlaceholder: string;
    nextStepsTitle: string;
    nextStepsPlaceholder: string;
    saveBtn: string;
    resetBtn: string;
    exportPdfBtn: string;
    previewTitle: string;
    savedRecordsTitle: string;
    emptyRecords: string;
  };
  sensitive: {
    title: string;
    subtitle: string;
    keyPrinciple: string;
    tabMap: string;
    tabGuide: string;
    tabAi: string;
    ageRange: string;
    manifestations: string;
    materials: string;
    pedagogicalTip: string;
    howToRecognizeTitle: string;
    whatToDoTitle: string;
    aiTitle: string;
    aiDesc: string;
    aiPlaceholder: string;
    aiBtn: string;
    aiAnalyzing: string;
    hideDetails: string;
    explore: string;
    searchPlaceholder: string;
    filterAll: string;
    filterInfant: string;
    filterCasa: string;
    filterElementary: string;
    guidePoint1Title: string;
    guidePoint1Desc: string;
    guidePoint2Title: string;
    guidePoint2Desc: string;
    guidePoint3Title: string;
    guidePoint3Desc: string;
    actionPoint1Title: string;
    actionPoint1Desc: string;
    actionPoint2Title: string;
    actionPoint2Desc: string;
    actionPoint3Title: string;
    actionPoint3Desc: string;
  };
  printModal: {
    title: string;
    subtitle: string;
    weeklyType: string;
    obsType: string;
    lessonType: string;
    chooseObs: string;
    chooseLesson: string;
    weeklyTip: string;
    printSavePdf: string;
    signatureAssistant: string;
    signatureGuide: string;
    officialIssued: string;
  };
  footer: {
    standard: string;
  };
}> = {
  ro: {
    appName: 'Assistant Montessori',
    appSubtitle: 'bazat pe principiile modelului educațional Montessori',
    tagline: 'Fidel principiilor modelului educațional Montessori și protocolului de 20 de ore de observație practică.',
    headerSettings: 'Setări Antet',
    exportPdf: 'Export PDF',
    userManual: 'Manual de Utilizare (PDF)',
    printOrSavePdf: 'Imprimă / Salvează PDF',
    close: 'Închide',
    save: 'Salvează Modificările',
    cancel: 'Anulează',
    reset: 'Resetează',
    institutionName: 'Nume Instituție / Școală',
    accreditationSubtitle: 'Acreditare / Subtitlu',
    addressContact: 'Adresă & Contact',
    uploadLogo: 'Încarcă fișier siglă (PNG/JPG)',
    resetDefault: "Reinițializează la L'École des Préalpes",
    changeLogo: 'Schimbă Logo',
    modulesTitle: 'Module Aplicație',
    nav: {
      hub: 'Hub General & Rutine',
      ai: 'Asistent Virtual AI',
      obs: 'Modul Observație (20h)',
      childObs: 'Fișă Observare Copil',
      sensitive: 'Perioade Sensibile',
      lesson: 'Planificator 5 Elemente',
      peace: 'Comportament & Masa Păcii',
      dict: 'Dicționar Interactiv',
      calendar: 'Calendar Internațional',
      reports: 'Generator Rapoarte PDF',
    },
    hub: {
      roleTitle: 'Rolul și Misiunea Asistentului Montessori',
      coreRole: 'Rolul tău principal este să ocrotești mediul pregătit și să permiți copilului să se dezvolte prin concentrare autonomă. Respectă ritmul individual, oferă independență și intervino discret doar atunci când este cu adevărat necesar.',
      cycle3hTitle: 'Ciclul de 3 Ore',
      cycle3hDesc: 'Fără întreruperi, fără pauze colective forțate. Lasă copilul să treacă prin «oboseala falsă».',
      handsBackTitle: 'Mâinile la Spate',
      handsBackDesc: 'Lasă copilul să rezolve problema prin controlul erorii înainte de a oferi asistență.',
      graceTitle: 'Grație & Curtoazie',
      graceDesc: 'Vorbește cu voce caldă și joasă. Modelează mișcările lente și manierele pe care le aștepți.',
      thoughtOfDay: 'Gândul Zilei',
      anotherQuote: 'Alt citat',
      instReport: 'Raportul Instituțional',
      instReportDesc: 'Exportă fișa activității pentru',
      printBtn: 'Tipărește',
      checklistTitle: 'Lista de Verificare a Mediului Pregătit',
      tasksDone: 'sarcini îndeplinite astăzi',
      quickNotesTitle: 'Note Rapide & Tăvița de Reparare',
      quickNotesDesc: 'Materiale incomplete sau observații de urgență',
      newNotePlaceholder: 'Ex: Tava de turnat apă necesită un burete nou...',
      addBtn: 'Adaugă',
      emptyNotes: 'Nicio notă înregistrată. Toate materialele sunt în ordine pe rafturi.',
      categories: {
        environment: 'Mediu',
        material: 'Material',
        child: 'Copil',
        general: 'General',
        morning: 'Dimineață',
        work: 'Lucru',
        afternoon: 'După-amiază',
      },
    },
    obs: {
      title: 'Protocolul celor 20 de Ore de Observație Practică',
      subtitle: 'bazat pe principiile modelului educațional Montessori',
      protocolProgress: 'Progres Protocol',
      sessionsCount: 'sesiuni înregistrate',
      tabNew: 'Înregistrează Sesiune Nouă',
      tabHistory: 'Sesiuni Înregistrate',
      methodFocus: 'Focus Metodologic pentru',
      date: 'Data Observației',
      startTime: 'Ora Început',
      group: 'Componență Clasă',
      weather: 'Condiții Meteo & Ambianță',
      notesTitle: '1. Note Obiective de Observație (la intervale de 5 minute / Fapte concrete)',
      notesHint: '* Fără interpretări psihologice sau etichete',
      reflectionTitle: '2. Reflecția Personală a Asistentului / Ghidului',
      reflectionHint: '* Starea interioară, provocări, transformarea adultului',
      saveSession: 'Salvează Sesiunea de Observație',
      aiAnalyzeBtn: 'Validare Obiectivitate AI',
      aiAnalyzing: 'Analizează...',
      aiFeedbackTitle: 'Evaluare Pedagogică & Validare Obiectivitate (Gemini 3.8 Flash)',
      emptyHistory: 'Nu ai înregistrat încă nicio sesiune.',
      addFirst: 'Adaugă Prima Observație',
      groupPlaceholder: 'Ex: 22 copii / 2 adulți',
      weatherPlaceholder: 'Ex: Însorit, calm și luminos...',
      notesPlaceholder: '09:00 - Copiii intră calm...\n09:05 - M. (4 ani) alege Turnul Roz...',
      reflectionPlaceholder: 'Cum te-ai simțit? Ai rezistat tentației de a interveni?',
      reloadExample: 'Reîncarcă exemplul',
      printTooltip: 'Imprimă raportul',
      deleteTooltip: 'Șterge fișa',
      phases: {
        p1: 'Orele 1-5: Auto-Observație (Răspunsul și starea interioară a adultului)',
        p2: 'Orele 6-10: Observarea Copilului (Activitate și alegere la fiecare 5 min)',
        p3: 'Orele 11-15: Observarea Ghidului (Tehnici și interacțiuni)',
        p4: 'Orele 16-20: Observarea Mediului Ambiant (Dinamica generală și atmosferă)',
      },
      guidance: {
        p1: 'Focus pe tine însuți: Notează-ți reacțiile emoționale, impulsul de a interveni și când ai simțit nevoia de a vorbi. Scopul este pregătirea spirituală a adultului.',
        p2: 'Focus pe un singur copil: Înregistrează la fiecare 5 minute exact ce material atinge, cât persistă, mișcarea privirii și alegerea spontană. Folosește limbaj strict factual.',
        p3: 'Focus pe Ghid: Urmărește modul în care ghidul se așază la nivelul copilului, volumul vocii, ritmul mișcărilor în prezentare și modul în care gestionează întreruperile.',
        p4: 'Focus pe ambianța generală: Observă fluxul de energie al clasei de la 08:30 la 11:30. Observă apariția «oboselii false» în jurul orei 10:00 și calmul profund care îi succede.',
      },
    },
    lesson: {
      title: 'Planificatorul de Lecții Montessori (Cele 5 Elemente)',
      subtitle: 'bazat pe principiile modelului educațional Montessori',
      lessonPrinciple: 'Principiul celor 5 elemente: Lecțiile Montessori nu sunt prelegeri, ci chei care deschid ușa explorării. Fiecare plan conține: 1. Titlul, 2. Referința de Album, 3. Scopul Direct, 4. Întrebări HOTS și 5. Activități de Urmare echilibrate.',
      savedCount: 'fișe salvate',
      tabCreate: 'Creare Plan de Lecție',
      tabSaved: 'Fișe Salvate',
      tabSchedule: 'Structură Săptămânală Recomandată',
      tabScope: 'Scope & Sequence pe Vârste',
      tabStem: 'Competențe Matematice & STEM',
      aiAutofillTitle: 'Autocompletare Inteligentă cu Gemini 3.8 Flash',
      aiAutofillDesc: 'Generează instant cele 5 elemente de planificare',
      aiTopicPlaceholder: 'Introdu subiectul sau materialul (ex: Tabla Înmulțirii cu Puncte, Dulapul Botanic)...',
      aiGenerateBtn: 'Generează Structura Lecției',
      aiGenerating: 'Se compune planul...',
      orChooseSample: 'Sau alege o prezentare clasică pentru autocompletare:',
      formTitle: 'Fișă de Planificare a Lecției Montessori (5 Elemente)',
      el1Title: '1. Titlul Lecției / Prezentării',
      subjectLabel: 'Domeniu',
      levelLabel: 'Nivel Educațional',
      el2Title: '2. Referință Album Montessori',
      el3Title: '3. Scopul Direct (Direct Aim)',
      indirectAimsLabel: 'Scopuri Indirecte (Indirect Aims - coordonare, rafinare senzorială, ordine interioară)',
      el4Title: '4. Întrebări de Gândire de Nivel Superior (HOTS - Higher Order Thinking Skills)',
      hots1Label: 'A. Întrebare Analiză / Comparare',
      hots2Label: 'B. Întrebare Evaluare / Creație / Transfer',
      el5Title: '5. Activități de Urmare (Follow-up Work - Două Opțiuni Echilibrate)',
      follow1Label: 'Opțiunea A (Practică & Replicare cu Materialul)',
      follow2Label: 'Opțiunea B (Aplicație Creativă / Extindere)',
      materialsLabel: 'Materiale Necesare pentru Prezentare',
      pointOfInterestLabel: 'Punct de Interes (Point of Interest)',
      saveLessonBtn: 'Salvează Fișa de Lecție',
      emptySaved: 'Nu există încă nicio fișă de lecție salvată.',
      createFirst: 'Creează Prima Lecție',
      scheduleTitle: '🗓️ Structura Săptămânală Recomandată de Prezentări (Primar / Elementary)',
      scheduleDesc: 'Recomandare: 1 prezentare nouă pe zi, acoperind ciclic cele 5 mari domenii ale educației cosmice.',
      casadeiNote: '💡 Pentru Casa dei Bambini (3-6 ani): Frecvența recomandată este de 1-2 prezentări individuale pe săptămână per copil în funcție de perioada senzitivă activă.',
    },
    peace: {
      title: 'Gestionarea Pozitivă a Comportamentului & Educația pentru Pace',
      subtitle: 'Disciplina lăuntrică, lauda descriptivă și Protocolul Mesei Păcii (bazat pe principiile modelului educațional Montessori)',
      intro: 'În pedagogia Montessori, disciplina vine din interior (discipline from within). Nu folosim recompense exterioare sau pedepse rușinoase, ci ghidăm atenția copilului prin respect, opțiuni limitate și modelarea grației.',
      praiseTitle: 'Generator de Laudă Descriptivă',
      praiseDesc: 'În loc de un simplu și gol «Bravo!» sau «Ești cel mai bun!», descrie efortul concret, răbdarea și acțiunea copilului:',
      chooseScenario: 'Alege o situație frecventă din clasă:',
      phrasingTitle: '💬 Cum formulăm răspunsul (Laudă descriptivă):',
      whyWorks: 'De ce funcționează:',
      customSituation: 'Sau introdu propria situație specifică:',
      customPlaceholder: 'Ex: a așezat scaunele în liniște la masă...',
      generateBtn: 'Generează',
      limitedChoicesTitle: 'Regula celor Două Opțiuni (Limited Choices)',
      limitedChoicesDesc: 'Pentru a evita luptele de putere fără a compromite regulile de siguranță, oferă întotdeauna două opțiuni valide, ambele acceptabile pentru adult:',
      peaceTableTitle: 'Protocolul Mesei Păcii (The Peace Table Step-by-Step)',
      peaceTableDesc: 'Ghid de mediere non-violentă între doi copii în comunitatea de copii',
      stepOf: 'Pasul',
      steps: {
        s1: '1. Invitația',
        s2: '2. Obiectul Păcii',
        s3: '3. Exprimarea',
        s4: '4. Ascultarea',
        s5: '5. Reconcilierea',
      },
      backBtn: 'Înapoi',
      nextBtn: 'Pasul Următor',
    },
    dict: {
      title: 'Dicționar Interactiv Montessori',
      subtitle: 'Glosar doctrinal al termenilor fundamentali (bazat pe principiile modelului educațional Montessori)',
      intro: 'Vocabularul pedagogiei Montessori reflectă o viziune științifică profundă asupra dezvoltării umane. Fiecare termen poartă semnificații precise privind practica asistentului în mediul pregătit.',
      searchPlaceholder: 'Caută un concept (ex: Normalizare, Oboseală Falsă)...',
      all: 'Toate',
      principles: 'Principii Fundamentale',
      materials: 'Mediu & Materiale',
      childDev: 'Dezvoltarea Copilului',
      peace: 'Viață Socială & Pace',
      defTitle: 'Definiție Doctrinală:',
      appTitle: 'Aplicație Practică pentru Asistent:',
      noResults: 'Niciun termen nu corespunde căutării.',
    },
    ai: {
      title: 'Asistent Virtual Montessori (Google Gemini 3.8 Flash)',
      subtitle: 'Consultanță pedagogică bazată pe principiile modelului educațional Montessori',
      activeStatus: 'Activ (Gemini 3.8 Flash)',
      resetChat: 'Resetează conversația',
      frequentQuestions: '💡 Întrebări Frecvente Recomandate (Apasă pentru consultare instantă):',
      inputPlaceholder: 'Adresează orice întrebare pedagogică sau situație de la clasă...',
      sendBtn: 'Trimite',
      consulting: 'Se consultă principiile Dr. Maria Montessori...',
      exportPdf: 'Exportă PDF',
      printText: 'Printează',
      exportAllPdf: 'Exportă PDF Consultație',
      printAll: 'Printează Consultația',
      copyText: 'Copiază',
      copied: 'Copiat!',
      docTitle: 'Fișă de Consultanță Pedagogică AI',
      aiRecommendation: 'Ghidaj & Recomandare Pedagogică AI',
    },
    reports: {
      title: 'Centrul de Generare & Export Rapoarte PDF',
      subtitle: 'Documente oficiale conforme, bazat pe principiile modelului educațional Montessori',
      intro: 'Toate rapoartele sunt formatate automat cu antetul instituțional, sigla școlii, datele de contact și tabelele specifice fiecărei etape pedagogice.',
      obsReportTitle: 'Raport de Observație',
      obsReportDesc: 'Exportă fișele de observație din protocolul celor 20 de ore pe etape (Auto-observație, Observarea Copilului, Ghidului sau Mediului).',
      lessonReportTitle: 'Fișă de Lecție (5 Elemente)',
      lessonReportDesc: 'Plan detaliat de prezentare conținând scopul direct, referința de album, întrebările HOTS și cele două opțiuni echilibrate de urmare.',
      weeklyReportTitle: 'Raport Sintetic Săptămânal',
      weeklyReportDesc: 'Centralizator complet al activității clasei, principiile esențiale ale asistentului și sinteza tuturor prezentărilor și observațiilor.',
      openPrintPdf: 'Deschide & Imprimă PDF',
      backupTitle: 'Backup & Salvare Locală a Datelor Clasei',
      backupDesc: 'Descarcă o copie de siguranță a tuturor observațiilor și lecțiilor tale în format JSON sau restaurează un backup anterior.',
      exportBackupJson: 'Exportă Backup JSON',
      restoreBackup: 'Restaurează Backup',
      backupSuccess: 'Fișierul de backup JSON a fost descărcat cu succes!',
    },
    printModal: {
      title: 'Centru Export & Imprimare Rapoarte Oficiale (PDF)',
      subtitle: 'Format standard cu sigla instituției, bazat pe principiile modelului educațional Montessori',
      weeklyType: 'Sintetic Săptămânal',
      obsType: 'Fișă Observație',
      lessonType: 'Fișă Lecție',
      chooseObs: 'Alege Observația:',
      chooseLesson: 'Alege Lecția:',
      weeklyTip: 'Include rezumatul săptămânal, principiile asistentului și sinteza activității curente.',
      printSavePdf: 'Imprimă / Salvează PDF',
      signatureAssistant: 'Semnătură Asistent Montessori:',
      signatureGuide: 'Verificat de Ghidul Clasei:',
      officialIssued: 'Document emis oficial bazat pe principiile modelului educațional Montessori',
    },
    calendar: {
      title: 'Calendarul Internațional Montessori',
      subtitle: 'Sărbători globale, repere fondatoare, educație cosmică și ritualurile clasei',
      description: 'Ghidul pedagogic anual al sărbătorilor și momentelor cosmice recunoscute de comunitatea Montessori internațională, însoțit de activități practice de clasă.',
      allCategories: 'Toate Categoriile',
      founderCat: 'Zile Fondatoare & Istorie',
      peaceCat: 'Educație pentru Pace',
      cosmicCat: 'Educație Cosmică & Natură',
      traditionCat: 'Ritualuri & Tradiții',
      searchPlaceholder: 'Caută sărbătoare, activitate sau citat Montessori...',
      allMonths: 'Toate Lunile',
      filterByMonth: 'Filtrează după Lună:',
      monthNames: ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'],
      upcomingEvents: 'Evenimente Recomandate',
      noEventsFound: 'Nu a fost găsită nicio sărbătoare corespunzătoare criteriilor de căutare.',
      classroomGuide: 'Ghid Pedagogic de Activități în Clasă',
      recommendedMaterials: 'Materiale Recomandate',
      quoteTitle: 'Citat & Viziune Pedagogică',
      exportPdf: 'Exportă Calendar PDF',
      printCalendar: 'Printează Calendarul',
      birthdayWalkTitle: 'Ceremonia Soarelui (The Montessori Birthday Walk)',
      birthdayWalkSubtitle: 'Ritualul aniversar al clasei: turul în jurul Soarelui cu globul pământesc',
      birthdayWalkDesc: 'În pedagogia Montessori, aniversarea unui copil este o sărbătoare cosmică a timpului și a recunoștinței pentru fiecare an de viață parcurs de Pământ în jurul Soarelui.',
      childNameLabel: 'Numele Copilului',
      turningAgeLabel: 'Vârsta Împlinită (ani)',
      birthDateLabel: 'Data Nașterii',
      startRitualBtn: 'Generează Scenariul Ritualului',
      toddlerLevel: '0-3 ani (Nido / Comunitate)',
      casaLevel: '3-6 ani (Casa dei Bambini)',
      elementaryLevel: '6-12 ani (Școala Primară)',
      historicalContextTitle: 'Context Istoric & Semnificație Globală',
      pedagogicalMeaningTitle: 'Sensul Pedagogic & Spiritual',
      taglineBadge: 'Bazat pe principiile modelului educațional Montessori',
      birthdayWalkShort: 'Ceremonia Soarelui',
      exportScriptPdf: 'Exportă Scenariul (PDF)',
      closePanel: '✕ Închide',
      resetSearch: 'Resetează căutarea',
      showAllMonths: 'Arată toate lunile',
      eventsFoundSuffix: 'sărbători și repere găsite',
      clickToExpandHint: 'Click pe oricare pentru a deschide ghidul de activități',
      showAllHolidays: 'Reafișează toate sărbătorile',
      hideDetails: 'Ascunde detalii',
      viewActivities: 'Vezi activități',
      exportPdfTooltip: 'Descarcă întregul calendar în format PDF',
      printCalendarTooltip: 'Tipărește la imprimantă',
      yearSingular: 'an',
      yearPlural: 'ani',
      currentMonthBadge: 'Prezent',
      adaptToCurrentMonth: 'Adaptează la luna prezentă',
      currentMonthActive: 'Luna prezentă activă',
      todayIs: 'Data prezentă',
    },
    childObs: {
      title: 'Fișă de Observare Individuală a Copilului',
      subtitle: 'Evaluare Formativă & Urmărirea Progresului în Mediul Pregătit',
      profileTitle: 'Profil Copil & Date Evaluare',
      childName: 'Nume / Inițiale Copil',
      childAge: 'Vârstă Copil',
      childLevel: 'Nivel Clasă',
      date: 'Data Observației',
      observer: 'Observator (Ghid / Asistent)',
      aiTitle: 'Sinteză Evaluare Individuală cu Gemini AI',
      aiDesc: 'Introduceți note brute de observație, iar Gemini va structura automat evaluarea pe cele 6 arii curriculare Montessori',
      aiPlaceholder: 'Ex: Matei (4 ani) a lucrat concentrat la Turnul Roz timp de 35 min, a turnat apă din carafă fără vărsare, exersat litere din șmirghel...',
      aiBtn: 'Generează Evaluare Structurată cu AI',
      aiGenerating: 'Gemini analizează și structurează fișa...',
      domainsTitle: 'Evaluare pe Domeniile de Dezvoltare Montessori',
      vp: 'Viață Practică',
      senz: 'Senzorial',
      lang: 'Limbaj',
      math: 'Matematică & STEM',
      cult: 'Cultură & Științe',
      soc: 'Social-Emoțional & Normalizare',
      statusMastered: 'Stăpânit / Normalizat (Mastered)',
      statusPracticing: 'În Exersare (Practicing)',
      statusPresented: 'Prezentat (Presented)',
      statusUnaddressed: 'Neabordat',
      notesPlaceholder: 'Observații specifice, persistență, materiale utilizate...',
      generalTitle: '2. Sinteză Generală & Starea de Concentrare / Normalizare',
      generalPlaceholder: 'Descrieți durata concentrării, autocontrolul erorii, calmul interior...',
      nextStepsTitle: '3. Recomandări & Următoarele Prezentări (Next Steps)',
      nextStepsPlaceholder: '1. Următoarea prezentare...\n2. Material recomandat...',
      saveBtn: 'Salvează Fișa Individuală',
      resetBtn: 'Exemplu Ghidat',
      exportPdfBtn: 'Descarcă Fișa PDF cu Logo',
      previewTitle: 'Previzualizare Fișă Individuală',
      savedRecordsTitle: 'Fișe Individuale Înregistrate',
      emptyRecords: 'Nu există încă fișe individuale salvate.',
    },
    sensitive: {
      title: 'Perioade Sensibile & Dezvoltarea Holistică (Classic Montessori)',
      subtitle: 'Conform descoperirilor Dr. Maria Montessori (The Absorbent Mind & The Montessori Method)',
      keyPrinciple: 'Principiul Cheie: Odată ce o perioadă sensibilă a trecut, abilitatea respectivă se poate dobândi ulterior doar cu efort conștient și voință, pierzând ușurința entuziastă a copilăriei mici.',
      tabMap: 'Harta Perioadelor Sensibile (0 - 12 Ani)',
      tabGuide: 'Ghid de Identificare & Evaluare',
      tabAi: 'Consultanță AI Perioade Sensibile',
      ageRange: 'Vârstă',
      manifestations: 'Semne Vizibile & Manifestări',
      materials: 'Materiale Recomandate',
      pedagogicalTip: 'Sfat Pedagogic Asistent',
      howToRecognizeTitle: 'Cum recunoaștem o perioadă sensibilă activă?',
      whatToDoTitle: 'Ce facem când identificăm o perioadă sensibilă?',
      aiTitle: 'Consultanță AI pentru Perioade Sensibile (Gemini)',
      aiDesc: 'Descrieți comportamentul observat la copil pentru a identifica perioada sensibilă și materialele recomandate',
      aiPlaceholder: 'Descrieți comportamentul observat (ex: copil de 3.5 ani așază pantofii în ordine strictă și sortează mărgele mici)...',
      aiBtn: 'Identifică Perioada Sensibilă & Materiale',
      aiAnalyzing: 'Gemini consultă principiile clasice Montessori...',
      hideDetails: 'Ascunde detalii',
      explore: 'Explorează',
      searchPlaceholder: 'Caută o perioadă sensibilă sau un material...',
      filterAll: 'Toate (0-12 ani)',
      filterInfant: '0 - 3 ani (Nido / Toddler)',
      filterCasa: '3 - 6 ani (Casa dei Bambini)',
      filterElementary: '6 - 12 ani (Primar)',
      guidePoint1Title: '1. Concentrare Profundă și Repetiție',
      guidePoint1Desc: 'Copilul repetă aceeași acțiune de 15, 20 sau 30 de ori la rând fără urmă de oboseală, purtat de o bucurie interioară profundă.',
      guidePoint2Title: '2. Împlinire și Normalizare',
      guidePoint2Desc: 'La încheierea acestei munci alese liber, copilul este senin, împăcat și manifestă generozitate și calm față de colegi.',
      guidePoint3Title: '3. Atracție Spontană Irezistibilă',
      guidePoint3Desc: 'Imediat ce intră în ambianță, copilul merge direct spre același material în fiecare zi, ghidat de un impuls interior viu.',
      actionPoint1Title: '1. Regula Tăcerii și Mâinile la Spate',
      actionPoint1Desc: 'Nu întrerupeți copilul concentrat, nici măcar pentru a-l lăuda. Lauda externă poate rupe firul fragil al concentrării autonome.',
      actionPoint2Title: '2. Pregătirea Impecabilă a Materialului',
      actionPoint2Desc: 'Verificați ca materialul solicitat să fie complet, curat, cu controlul erorii funcțional și estetic atrăgător.',
      actionPoint3Title: '3. Distincția între Perioadă Sensibilă și Capriciu',
      actionPoint3Desc: 'O criză provocată de o perioadă sensibilă rănită (de ex. ordinea perturbată) se calmează imediat ce armonia e restabilită; un capriciu caută atenție externă.',
    },
    footer: {
      standard: 'Creat de STEC Studio și integrat cu Google Gemini AI Studio',
    },
  },
  fr: {
    appName: 'Assistant Montessori',
    appSubtitle: 'basé sur les principes du modèle éducatif Montessori',
    tagline: 'Fidèle aux principes du modèle éducatif Montessori et au protocole de 20 heures d’observation pratique.',
    headerSettings: 'Paramètres En-tête',
    exportPdf: 'Exporter en PDF',
    userManual: "Manuel d'Utilisation (PDF)",
    printOrSavePdf: 'Imprimer / Enregistrer en PDF',
    close: 'Fermer',
    save: 'Enregistrer les modifications',
    cancel: 'Annuler',
    reset: 'Réinitialiser',
    institutionName: 'Nom de l’Établissement / École',
    accreditationSubtitle: 'Accréditation / Sous-titre',
    addressContact: 'Adresse & Contact',
    uploadLogo: 'Télécharger un logo (PNG/JPG)',
    resetDefault: "Réinitialiser à L'École des Préalpes",
    changeLogo: 'Changer le Logo',
    modulesTitle: 'Modules de l’Application',
    nav: {
      hub: 'Hub Général & Routines',
      ai: 'Assistant Virtuel IA',
      obs: 'Module Observation (20h)',
      childObs: 'Observation Enfant',
      sensitive: 'Périodes Sensibles',
      lesson: 'Planificateur 5 Éléments',
      peace: 'Comportement & Table de Paix',
      dict: 'Dictionnaire Interactif',
      calendar: 'Calendrier International',
      reports: 'Générateur de Rapports PDF',
    },
    hub: {
      roleTitle: 'Rôle et Mission de l’Assistant Montessori',
      coreRole: 'Votre rôle essentiel est de protéger l’environnement préparé et de permettre à l’enfant de se construire par le travail concentré et spontané. Respectez son rythme, offrez l’indépendance et n’intervenez discrètement qu’en cas de réelle nécessité.',
      cycle3hTitle: 'Cycle de Travail de 3 Heures',
      cycle3hDesc: 'Sans interruption ni récréation collective forcée. Laissez l’enfant traverser la «fausse fatigue» du milieu de matinée.',
      handsBackTitle: 'Les Mains dans le Dos',
      handsBackDesc: 'Laissez l’enfant corriger lui-même ses gestes grâce au contrôle de l’erreur avant toute intervention.',
      graceTitle: 'Grâce et Courtoisie',
      graceDesc: 'Parlez d’une voix douce et posée. Modélisez les mouvements lents et la bienveillance que vous attendez en classe.',
      thoughtOfDay: 'Pensée du Jour',
      anotherQuote: 'Autre citation',
      instReport: 'Rapport Institutionnel',
      instReportDesc: 'Exportez la fiche d’activité pour',
      printBtn: 'Imprimer',
      checklistTitle: 'Liste de Contrôle de l’Ambiance Préparée',
      tasksDone: 'tâches accomplies aujourd’hui',
      quickNotesTitle: 'Notes Rapides & Plateau des Réparations',
      quickNotesDesc: 'Matériel incomplet ou observations urgentes de l’ambiance',
      newNotePlaceholder: 'Ex: Le plateau pour verser de l’eau a besoin d’une éponge propre...',
      addBtn: 'Ajouter',
      emptyNotes: 'Aucune note enregistrée. Tout le matériel est ordonné sur les étagères.',
      categories: {
        environment: 'Ambiance',
        material: 'Matériel',
        child: 'Enfant',
        general: 'Général',
        morning: 'Matin',
        work: 'Travail',
        afternoon: 'Après-midi',
      },
    },
    obs: {
      title: 'Protocole des 20 Heures d’Observation Pratique',
      subtitle: 'basé sur les principes du modèle éducatif Montessori',
      protocolProgress: 'Progression du Protocole',
      sessionsCount: 'sessions enregistrées',
      tabNew: 'Nouvelle Fiche d’Observation',
      tabHistory: 'Sessions Enregistrées',
      methodFocus: 'Focus Méthodologique pour',
      date: 'Date de l’Observation',
      startTime: 'Heure de Début',
      group: 'Composition du Groupe',
      weather: 'Météo & Ambiance Générale',
      notesTitle: '1. Notes Factuelles d’Observation (Intervalles de 5 minutes / Faits bruts)',
      notesHint: '* Sans jugements subjectifs ni étiquettes',
      reflectionTitle: '2. Réflexion Personnelle de l’Assistant / Éducateur',
      reflectionHint: '* État intérieur, pulsion d’intervention, transformation de l’adulte',
      saveSession: 'Enregistrer la Session d’Observation',
      aiAnalyzeBtn: 'Validation d’Objectivité IA',
      aiAnalyzing: 'Analyse en cours...',
      aiFeedbackTitle: 'Évaluation Pédagogique & Objectivité (Gemini 3.8 Flash)',
      emptyHistory: 'Aucune session enregistrée pour le moment.',
      addFirst: 'Ajouter une Première Observation',
      groupPlaceholder: 'Ex : 22 enfants / 2 adultes',
      weatherPlaceholder: 'Ex : Ensoleillé, ambiance calme et sereine...',
      notesPlaceholder: '09:00 - Entrée calme des enfants...\n09:05 - M. (4 ans) choisit la Tour Rose...',
      reflectionPlaceholder: 'Comment vous êtes-vous senti(e) ? Avez-vous résisté à l’envie d’intervenir ?',
      reloadExample: 'Recharger l’exemple',
      printTooltip: 'Imprimer le rapport',
      deleteTooltip: 'Supprimer la fiche',
      phases: {
        p1: 'Heures 1-5: Auto-Observation (État intérieur et réactions de l’adulte)',
        p2: 'Heures 6-10: Observation de l’Enfant (Activité et choix toutes les 5 min)',
        p3: 'Heures 11-15: Observation de l’Éducateur (Gestes, posture et langage)',
        p4: 'Heures 16-20: Observation de l’Ambiance (Dynamique globale et énergie)',
      },
      guidance: {
        p1: 'Focus sur vous-même: Notez vos réactions émotionnelles, l’envie d’intervenir et les moments où vous avez voulu parler. But: préparation spirituelle de l’adulte.',
        p2: 'Focus sur un enfant: Notez toutes les 5 minutes l’objet touché, la persistance, le regard et le choix autonome. Utilisez un langage purement factuel.',
        p3: 'Focus sur l’éducateur: Observez la hauteur des yeux, le volume de voix feutré, la précision des présentations et la gestion des interruptions.',
        p4: 'Focus sur l’ambiance globale: Observez le flux d’énergie de 8h30 à 11h30, l’apparition de la fausse fatigue vers 10h et le calme profond qui lui succède.',
      },
    },
    lesson: {
      title: 'Planificateur de Leçons Montessori (Les 5 Éléments)',
      subtitle: 'basé sur les principes du modèle éducatif Montessori',
      lessonPrinciple: 'Principe des 5 éléments : Les leçons Montessori ne sont pas des cours magistraux, mais des clés offertes à l’enfant. Chaque plan comprend : 1. Titre, 2. Référence d’Album, 3. But Direct, 4. Questions HOTS et 5. Deux activités de suivi équilibrées.',
      savedCount: 'fiches sauvegardées',
      tabCreate: 'Créer un Plan de Leçon',
      tabSaved: 'Fiches Enregistrées',
      tabSchedule: 'Grille Hebdomadaire Recommandée',
      tabScope: 'Scope & Séquence par Âge',
      tabStem: 'Compétences Mathématiques & STEM',
      aiAutofillTitle: 'Génération Intelligente avec Gemini 3.8 Flash',
      aiAutofillDesc: 'Génère instantanément les 5 éléments de planification',
      aiTopicPlaceholder: 'Entrez le sujet ou le matériel (ex: Table de Multiplication à Points, Cabinet Botanique)...',
      aiGenerateBtn: 'Générer la Structure de Leçon',
      aiGenerating: 'Rédaction du plan en cours...',
      orChooseSample: 'Ou choisissez une présentation classique à autocompléter:',
      formTitle: 'Fiche de Planification de Leçon (5 Éléments)',
      el1Title: '1. Titre de la Leçon / Présentation',
      subjectLabel: 'Domaine',
      levelLabel: 'Niveau Éducatif',
      el2Title: '2. Référence Album Montessori',
      el3Title: '3. But Direct (Direct Aim)',
      indirectAimsLabel: 'Buts Indirects (Coordination, raffinement sensoriel, ordre intérieur)',
      el4Title: '4. Questions de Pensée Supérieure (HOTS - Higher Order Thinking Skills)',
      hots1Label: 'A. Question d’Analyse / Comparaison',
      hots2Label: 'B. Question d’Évaluation / Création / Transfert',
      el5Title: '5. Activités de Suivi (Follow-up Work - Deux Options Équilibrées)',
      follow1Label: 'Option A (Pratique & Réplication avec le Matériel)',
      follow2Label: 'Option B (Application Créative / Extension)',
      materialsLabel: 'Matériel Requis pour la Présentation',
      pointOfInterestLabel: 'Point d’Intérêt (Point of Interest)',
      saveLessonBtn: 'Enregistrer la Fiche de Leçon',
      emptySaved: 'Aucune fiche de leçon enregistrée.',
      createFirst: 'Créer une Première Leçon',
      scheduleTitle: '🗓️ Grille Hebdomadaire Recommandée (Primaire / 6-12 ans)',
      scheduleDesc: 'Recommandation : 1 nouvelle présentation par jour couvrant les 5 grands domaines de l’éducation cosmique.',
      casadeiNote: '💡 Pour la Maison des Enfants (3-6 ans): 1 à 2 présentations individuelles par semaine selon la période sensible active.',
    },
    peace: {
      title: 'Discipline Positive & Éducation à la Paix',
      subtitle: 'Discipline intérieure, éloge descriptif et protocole de la Table de Paix (basé sur les principes du modèle éducatif Montessori)',
      intro: 'Dans la pédagogie Montessori, la discipline vient de l’intérieur. Nous n’employons ni récompenses superficielles ni punitions humiliantes, mais guidons l’enfant avec respect, choix limités et grâce sociale.',
      praiseTitle: 'Générateur d’Éloge Descriptif',
      praiseDesc: 'Au lieu d’un simple et creux «Bravo!» ou «Tu es le meilleur!», décrivez l’effort précis, la patience et le geste accompli:',
      chooseScenario: 'Choisissez une situation fréquente en classe:',
      phrasingTitle: '💬 Formulation recommandée (Éloge descriptif):',
      whyWorks: 'Pourquoi cela fonctionne:',
      customSituation: 'Ou entrez votre propre situation vécue:',
      customPlaceholder: 'Ex: l’enfant a rangé les chaises en silence...',
      generateBtn: 'Générer',
      limitedChoicesTitle: 'La Règle des Deux Choix Valides (Limited Choices)',
      limitedChoicesDesc: 'Pour désamorcer les conflits de volonté sans compromettre le cadre de sécurité, offrez toujours deux choix acceptables pour l’adulte:',
      peaceTableTitle: 'Protocole de la Table de Paix (The Peace Table Step-by-Step)',
      peaceTableDesc: 'Médiation non-violente et autonome entre deux enfants',
      stepOf: 'Étape',
      steps: {
        s1: '1. Invitation',
        s2: '2. Objet de Paix',
        s3: '3. Expression',
        s4: '4. Écoute',
        s5: '5. Réconciliation',
      },
      backBtn: 'Retour',
      nextBtn: 'Étape Suivante',
    },
    dict: {
      title: 'Dictionnaire Interactif Montessori',
      subtitle: 'Glossaire doctrinal des concepts fondamentaux (basé sur les principes du modèle éducatif Montessori)',
      intro: 'Le vocabulaire montessorien exprime une compréhension scientifique du développement humain. Chaque notion guide directement la pratique quotidienne de l’assistant.',
      searchPlaceholder: 'Rechercher un concept (ex: Normalisation, Fausse Fatigue)...',
      all: 'Tous',
      principles: 'Principes Fondamentaux',
      materials: 'Ambiance & Matériel',
      childDev: 'Développement de l’Enfant',
      peace: 'Vie Sociale & Paix',
      defTitle: 'Définition Doctrinale:',
      appTitle: 'Application Pratique pour l’Assistant:',
      noResults: 'Aucun terme ne correspond à la recherche.',
    },
    ai: {
      title: 'Assistant Virtuel Montessori (Google Gemini 3.8 Flash)',
      subtitle: 'Conseils pédagogiques fondés sur les principes du modèle éducatif Montessori',
      activeStatus: 'Actif (Gemini 3.8 Flash)',
      resetChat: 'Réinitialiser la conversation',
      frequentQuestions: '💡 Questions Fréquentes Recommandées (Cliquez pour consulter):',
      inputPlaceholder: 'Posez votre question pédagogique ou décrivez un défi en classe...',
      sendBtn: 'Envoyer',
      consulting: 'Consultation des principes Montessori...',
      exportPdf: 'Exporter PDF',
      printText: 'Imprimer',
      exportAllPdf: 'Exporter PDF Consultation',
      printAll: 'Imprimer la Consultation',
      copyText: 'Copier',
      copied: 'Copié !',
      docTitle: 'Fiche de Consultation Pédagogique IA',
      aiRecommendation: 'Guidage & Recommandation Pédagogique IA',
    },
    reports: {
      title: 'Centre de Génération & Export PDF',
      subtitle: 'Documents officiels selon les normes, basés sur les principes du modèle éducatif Montessori',
      intro: 'Tous les rapports sont automatiquement mis en page avec l’en-tête officiel, le logo de l’école et les grilles pédagogiques adaptées.',
      obsReportTitle: 'Rapport d’Observation',
      obsReportDesc: 'Exportez les fiches d’observation des 20 heures selon les 4 phases pratiques.',
      lessonReportTitle: 'Fiche de Leçon (5 Éléments)',
      lessonReportDesc: 'Plan complet avec buts directs, questions de pensée supérieure (HOTS) et travaux de suivi.',
      weeklyReportTitle: 'Rapport Synthétique Hebdomadaire',
      weeklyReportDesc: 'Bilan complet de la semaine avec principes de l’assistant et synthèse des observations et leçons.',
      openPrintPdf: 'Ouvrir & Imprimer PDF',
      backupTitle: 'Sauvegarde & Restauration Locale des Données',
      backupDesc: 'Téléchargez une sauvegarde JSON de vos observations et leçons, ou restaurez un fichier antérieur.',
      exportBackupJson: 'Exporter la Sauvegarde JSON',
      restoreBackup: 'Restaurer la Sauvegarde',
      backupSuccess: 'Le fichier de sauvegarde JSON a été exporté avec succès!',
    },
    printModal: {
      title: 'Centre d’Impression & Exportation Officielle (PDF)',
      subtitle: 'Format conforme avec le logo de l’établissement, basé sur les principes du modèle éducatif Montessori',
      weeklyType: 'Synthétique Hebdomadaire',
      obsType: 'Fiche d’Observation',
      lessonType: 'Fiche de Leçon',
      chooseObs: 'Choisir l’Observation:',
      chooseLesson: 'Choisir la Leçon:',
      weeklyTip: 'Comprend le résumé hebdomadaire, les principes directeurs et la synthèse de la classe.',
      printSavePdf: 'Imprimer / Enregistrer en PDF',
      signatureAssistant: 'Signature de l’Assistant Montessori:',
      signatureGuide: 'Vérifié par l’Éducateur / Guide:',
      officialIssued: 'Document officiel émis selon les principes du modèle éducatif Montessori',
    },
    calendar: {
      title: 'Calendrier International Montessori',
      subtitle: 'Fêtes mondiales, repères fondateurs, éducation cosmique et rituels d’ambiance',
      description: 'Le guide pédagogique des célébrations reconnues par la communauté Montessori mondiale, enrichi de propositions d’activités concrètes par tranche d’âge.',
      allCategories: 'Toutes les Catégories',
      founderCat: 'Jalons Fondateurs & Histoire',
      peaceCat: 'Éducation pour la Paix',
      cosmicCat: 'Éducation Cosmique & Nature',
      traditionCat: 'Rituels & Traditions',
      searchPlaceholder: 'Rechercher une fête, une activité ou une citation...',
      allMonths: 'Tous les Mois',
      filterByMonth: 'Filtrer par mois :',
      monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
      upcomingEvents: 'Événements Clés',
      noEventsFound: 'Aucune célébration ne correspond aux filtres appliqués.',
      classroomGuide: 'Guide Pédagogique d’Ambiance',
      recommendedMaterials: 'Matériel Recommandé',
      quoteTitle: 'Citation & Vision Pédagogique',
      exportPdf: 'Exporter le Calendrier en PDF',
      printCalendar: 'Imprimer le Calendrier',
      birthdayWalkTitle: 'La Marche Anniversaire autour du Soleil',
      birthdayWalkSubtitle: 'Le rituel cosmique d’anniversaire : un tour complet de la Terre par année de vie',
      birthdayWalkDesc: 'Dans la tradition Montessori, l’anniversaire d’un enfant est une célébration cosmique du temps et de la reconnaissance pour chaque orbite terrestre achevée.',
      childNameLabel: 'Prénom de l’Enfant',
      turningAgeLabel: 'Âge Célébré (années)',
      birthDateLabel: 'Date de Naissance',
      startRitualBtn: 'Générer le Déroulé du Rituel',
      toddlerLevel: '0-3 ans (Nido / Communauté Enfantine)',
      casaLevel: '3-6 ans (Maison des Enfants)',
      elementaryLevel: '6-12 ans (École Élémentaire)',
      historicalContextTitle: 'Contexte Historique & Portée Mondiale',
      pedagogicalMeaningTitle: 'Sens Pédagogique & Spirituel',
      taglineBadge: 'Basé sur les principes du modèle éducatif Montessori',
      birthdayWalkShort: 'Cérémonie du Soleil',
      exportScriptPdf: 'Exporter le Déroulé (PDF)',
      closePanel: '✕ Fermer',
      resetSearch: 'Réinitialiser la recherche',
      showAllMonths: 'Afficher tous les mois',
      eventsFoundSuffix: 'célébrations et jalons répertoriés',
      clickToExpandHint: 'Cliquez sur une fiche pour ouvrir le guide d’activités',
      showAllHolidays: 'Afficher toutes les célébrations',
      hideDetails: 'Masquer détails',
      viewActivities: 'Voir activités',
      exportPdfTooltip: 'Télécharger le calendrier complet en PDF',
      printCalendarTooltip: 'Imprimer sur papier',
      yearSingular: 'an',
      yearPlural: 'ans',
      currentMonthBadge: 'Actuel',
      adaptToCurrentMonth: 'Adapter au mois en cours',
      currentMonthActive: 'Mois en cours actif',
      todayIs: 'Date actuelle',
    },
    childObs: {
      title: 'Fiche d’Observation Individuelle de l’Enfant',
      subtitle: 'Évaluation Formative & Suivi des Progrès dans l’Ambiance Préparée',
      profileTitle: 'Profil de l’Enfant & Données d’Évaluation',
      childName: 'Nom / Initiales de l’Enfant',
      childAge: 'Âge de l’Enfant',
      childLevel: 'Niveau de Classe',
      date: 'Date de l’Observation',
      observer: 'Observateur (Éducateur / Assistant)',
      aiTitle: 'Synthèse Évaluation Individuelle avec Gemini IA',
      aiDesc: 'Saisissez vos notes brutes, Gemini structurera automatiquement l’évaluation sur les 6 domaines Montessori',
      aiPlaceholder: 'Ex: Lucas (4 ans) a travaillé 35 min avec concentration sur la Tour Rose, a versé l’eau sans déborder, tracé les lettres rugueuses...',
      aiBtn: 'Générer l’Évaluation Structurée avec l’IA',
      aiGenerating: 'Gemini analyse et structure la fiche...',
      domainsTitle: 'Évaluation par Domaines de Développement Montessori',
      vp: 'Vie Pratique',
      senz: 'Sensoriel',
      lang: 'Langage',
      math: 'Mathématiques & STEM',
      cult: 'Culture & Sciences',
      soc: 'Socio-Émotionnel & Normalisation',
      statusMastered: 'Maîtrisé / Normalisé (Mastered)',
      statusPracticing: 'En Exercice (Practicing)',
      statusPresented: 'Présenté (Presented)',
      statusUnaddressed: 'Non Abordé',
      notesPlaceholder: 'Observations spécifiques, persévérance, matériel utilisé...',
      generalTitle: '2. Synthèse Générale & État de Concentration / Normalisation',
      generalPlaceholder: 'Décrivez la durée de concentration, l’autocorrection, le calme intérieur...',
      nextStepsTitle: '3. Recommandations & Prochaines Présentations (Next Steps)',
      nextStepsPlaceholder: '1. Prochaine présentation...\n2. Matériel recommandé...',
      saveBtn: 'Enregistrer la Fiche Individuelle',
      resetBtn: 'Exemple Guidé',
      exportPdfBtn: 'Télécharger la Fiche PDF avec Logo',
      previewTitle: 'Aperçu de la Fiche Individuelle',
      savedRecordsTitle: 'Fiches Individuelles Enregistrées',
      emptyRecords: 'Aucune fiche individuelle enregistrée pour le moment.',
    },
    sensitive: {
      title: 'Périodes Sensibles & Développement Global (Classic Montessori)',
      subtitle: 'Fondé sur les découvertes de Maria Montessori (L’Esprit Absorbant & La Pédagogie Scientifique)',
      keyPrinciple: 'Principe Clé : Une fois la période sensible passée, l’acquisition de la même compétence exige un effort conscient et de la volonté, sans la facilité spontanée de la petite enfance.',
      tabMap: 'Carte des Périodes Sensibles (0 - 12 Ans)',
      tabGuide: 'Guide d’Identification & Observation',
      tabAi: 'Consultant IA Périodes Sensibles',
      ageRange: 'Âge',
      manifestations: 'Signes Visibles & Manifestations',
      materials: 'Matériel Recommandé',
      pedagogicalTip: 'Conseil Pédagogique Assistant',
      howToRecognizeTitle: 'Comment reconnaître une période sensible active ?',
      whatToDoTitle: 'Que faire face à une période sensible ?',
      aiTitle: 'Consultation IA Périodes Sensibles (Gemini)',
      aiDesc: 'Décrivez le comportement observé chez l’enfant pour identifier la période sensible active et les activités adaptées',
      aiPlaceholder: 'Décrivez le comportement observé (ex: un enfant de 3 ans et demi aligne les chaussures avec minutie et trie de minuscules perles)...',
      aiBtn: 'Identifier la Période Sensible & Matériel',
      aiAnalyzing: 'Gemini consulte les principes classiques Montessori...',
      hideDetails: 'Masquer détails',
      explore: 'Explorer',
      searchPlaceholder: 'Rechercher une période sensible ou un matériel...',
      filterAll: 'Tous (0-12 ans)',
      filterInfant: '0 - 3 ans (Toddler)',
      filterCasa: '3 - 6 ans (Maison des Enfants)',
      filterElementary: '6 - 12 ans (Primaire)',
      guidePoint1Title: '1. Concentration Profonde et Répétition',
      guidePoint1Desc: 'L’enfant répète la même manipulation 15, 20 voire 30 fois d’affilée sans aucune trace de lassitude, transporté par une joie intérieure.',
      guidePoint2Title: '2. Rayonnement et Normalisation',
      guidePoint2Desc: 'À l’issue de ce travail librement choisi, l’enfant montre un état de grande sérénité, de paix et de bienveillance envers ses camarades.',
      guidePoint3Title: '3. Attraction Spontanée Irrésistible',
      guidePoint3Desc: 'Dès son entrée dans l’ambiance, l’enfant se dirige chaque jour vers le même plateau ou le même travail sans intervention de l’adulte.',
      actionPoint1Title: '1. La Règle du Silence et Mains dans le Dos',
      actionPoint1Desc: 'Ne pas interrompre l’enfant, même pour le féliciter. La louange externe peut briser le fil fragile de la concentration spontanée.',
      actionPoint2Title: '2. Préparation Impeccable du Matériel',
      actionPoint2Desc: 'Vérifier que le matériel sollicité est complet, propre, avec contrôle de l’erreur fonctionnel et attrayant.',
      actionPoint3Title: '3. Distinguer Période Sensible et Caprice',
      actionPoint3Desc: 'Une crise liée à une période sensible blessée (ex: l’ordre perturbé) s’apaise dès que l’harmonie est restaurée ; un caprice ordinaire cherche une attention externe.',
    },
    footer: {
      standard: 'Créé par STEC Studio et intégré avec Google Gemini AI Studio',
    },
  },
  en: {
    appName: 'Montessori Assistant',
    appSubtitle: 'based on the principles of the Montessori educational model',
    tagline: 'Grounded in the principles of the Montessori educational model and the 20-hour observation protocol.',
    headerSettings: 'Header Settings',
    exportPdf: 'Export PDF',
    userManual: 'User Manual (PDF)',
    printOrSavePdf: 'Print / Save as PDF',
    close: 'Close',
    save: 'Save Changes',
    cancel: 'Cancel',
    reset: 'Reset',
    institutionName: 'School / Institution Name',
    accreditationSubtitle: 'Accreditation / Subtitle',
    addressContact: 'Address & Contact',
    uploadLogo: 'Upload Logo (PNG/JPG)',
    resetDefault: "Reset to L'École des Préalpes",
    changeLogo: 'Change Logo',
    modulesTitle: 'Application Modules',
    nav: {
      hub: 'Daily Hub & Routines',
      ai: 'AI Pedagogical Assistant',
      obs: 'Observation Module (20h)',
      childObs: 'Child Observation',
      sensitive: 'Sensitive Periods',
      lesson: '5-Element Lesson Planner',
      peace: 'Peace Table & Behavior',
      dict: 'Montessori Glossary',
      calendar: 'International Calendar',
      reports: 'PDF Report Generator',
    },
    hub: {
      roleTitle: 'The Role and Mission of the Montessori Assistant',
      coreRole: 'Your primary mission is to protect the prepared environment and allow the child to construct themselves through concentrated, freely chosen work. Respect their natural rhythm, foster independence, and only intervene discreetly when truly necessary.',
      cycle3hTitle: 'Three-Hour Work Cycle',
      cycle3hDesc: 'Uninterrupted morning work without forced group recess. Allow children to navigate false fatigue naturally.',
      handsBackTitle: 'Hands Behind the Back',
      handsBackDesc: 'Allow the child to discover solutions through built-in control of error before stepping in.',
      graceTitle: 'Grace and Courtesy',
      graceDesc: 'Speak in a soft, calm tone. Model the gentle movements and courteous interactions you expect to see.',
      thoughtOfDay: 'Daily Inspiration',
      anotherQuote: 'Another Quote',
      instReport: 'Institutional Report',
      instReportDesc: 'Export class activity summary for',
      printBtn: 'Print',
      checklistTitle: 'Prepared Environment Daily Checklist',
      tasksDone: 'tasks completed today',
      quickNotesTitle: 'Quick Notes & Repair Tray',
      quickNotesDesc: 'Missing pieces, broken materials or environment observations',
      newNotePlaceholder: 'E.g., Water pouring tray needs a fresh sponge...',
      addBtn: 'Add Note',
      emptyNotes: 'No notes logged. All materials are complete and organized on shelves.',
      categories: {
        environment: 'Environment',
        material: 'Material',
        child: 'Child',
        general: 'General',
        morning: 'Morning',
        work: 'Work Cycle',
        afternoon: 'Afternoon',
      },
    },
    obs: {
      title: '20-Hour Practical Observation Protocol',
      subtitle: 'based on the principles of the Montessori educational model',
      protocolProgress: 'Protocol Progress',
      sessionsCount: 'sessions recorded',
      tabNew: 'Record New Session',
      tabHistory: 'Recorded Sessions',
      methodFocus: 'Methodological Focus for',
      date: 'Observation Date',
      startTime: 'Start Time',
      group: 'Classroom Group',
      weather: 'Weather & Atmosphere',
      notesTitle: '1. Objective Observation Notes (5-minute intervals / concrete factual data)',
      notesHint: '* Avoid psychological labels or value judgments',
      reflectionTitle: '2. Personal Reflection of the Assistant / Guide',
      reflectionHint: '* Inner state, urge to intervene, personal spiritual preparation',
      saveSession: 'Save Observation Session',
      aiAnalyzeBtn: 'AI Objectivity Validation',
      aiAnalyzing: 'Analyzing...',
      aiFeedbackTitle: 'Pedagogical Evaluation & Objectivity Check (Gemini 3.8 Flash)',
      emptyHistory: 'No observation sessions recorded yet.',
      addFirst: 'Add First Observation',
      groupPlaceholder: 'Ex: 22 children / 2 adults',
      weatherPlaceholder: 'Ex: Sunny, calm and luminous atmosphere...',
      notesPlaceholder: '09:00 - Children enter calmly...\n09:05 - M. (4 yrs) chooses the Pink Tower...',
      reflectionPlaceholder: 'How did you feel? Did you resist the impulse to intervene?',
      reloadExample: 'Reload example',
      printTooltip: 'Print report',
      deleteTooltip: 'Delete record',
      phases: {
        p1: 'Hours 1-5: Self-Observation (Adult inner state and reactions)',
        p2: 'Hours 6-10: Child Observation (Activity and choices every 5 min)',
        p3: 'Hours 11-15: Guide Observation (Presentation techniques and tone)',
        p4: 'Hours 16-20: Environment Observation (Overall atmosphere and flow)',
      },
      guidance: {
        p1: 'Focus on yourself: Note your inner impulses, emotional responses, and when you felt like speaking. Goal: the spiritual preparation of the adult.',
        p2: 'Focus on one child: Record every 5 minutes the materials handled, persistence, eye movement, and spontaneous choices using purely factual descriptions.',
        p3: 'Focus on the Guide: Observe eye-level posture, softened vocal tone, deliberate slow presentations, and graceful management of interruptions.',
        p4: 'Focus on the room energy: Track ambient flow from 8:30 to 11:30, noticing false fatigue around 10:00 and the profound concentration that follows.',
      },
    },
    lesson: {
      title: 'Montessori Lesson Planner (The 5 Elements)',
      subtitle: 'based on the principles of the Montessori educational model',
      lessonPrinciple: 'The 5-Element Principle: Montessori presentations are not lectures, but keys to open the world. Every plan includes: 1. Title, 2. Album Reference, 3. Direct Aim, 4. HOTS Questions, and 5. Balanced follow-up work.',
      savedCount: 'plans saved',
      tabCreate: 'Create Lesson Plan',
      tabSaved: 'Saved Plans',
      tabSchedule: 'Recommended Weekly Schedule',
      tabScope: 'Scope & Sequence by Age',
      tabStem: 'Mathematical & STEM Competencies',
      aiAutofillTitle: 'Intelligent Lesson Generation with Gemini 3.8 Flash',
      aiAutofillDesc: 'Instantly drafts the 5 lesson planning elements',
      aiTopicPlaceholder: 'Enter lesson topic or material (e.g., Dot Game Addition, Botanical Cabinet)...',
      aiGenerateBtn: 'Generate Lesson Structure',
      aiGenerating: 'Drafting lesson plan...',
      orChooseSample: 'Or select a classic Montessori presentation to autofill:',
      formTitle: 'Montessori Lesson Plan Form (5 Elements)',
      el1Title: '1. Lesson / Presentation Title',
      subjectLabel: 'Subject Area',
      levelLabel: 'Educational Level',
      el2Title: '2. Montessori Album Reference',
      el3Title: '3. Direct Aim',
      indirectAimsLabel: 'Indirect Aims (Coordination, sensory refinement, inner order)',
      el4Title: '4. Higher Order Thinking Skills Questions (HOTS)',
      hots1Label: 'A. Analysis / Comparison Question',
      hots2Label: 'B. Evaluation / Creation / Transfer Question',
      el5Title: '5. Follow-up Work (Two Balanced Options)',
      follow1Label: 'Option A (Practice & Material Replication)',
      follow2Label: 'Option B (Creative Application / Extension)',
      materialsLabel: 'Materials Required for Presentation',
      pointOfInterestLabel: 'Point of Interest',
      saveLessonBtn: 'Save Lesson Plan',
      emptySaved: 'No lesson plans saved yet.',
      createFirst: 'Create First Lesson',
      scheduleTitle: '🗓️ Recommended Elementary Presentation Schedule (Ages 6-12)',
      scheduleDesc: 'Recommendation: 1 new presentation per day, rotating across the 5 great cosmic areas.',
      casadeiNote: '💡 For Children’s House (Ages 3-6): 1-2 individual presentations per week tailored to sensitive periods.',
    },
    peace: {
      title: 'Positive Discipline & Peace Education',
      subtitle: 'Discipline from within, descriptive praise, and Peace Table protocol (based on the principles of the Montessori educational model)',
      intro: 'In Montessori pedagogy, discipline springs from within. We do not rely on extrinsic rewards or punitive time-outs; we guide the child with genuine respect, limited choices, and modeled grace.',
      praiseTitle: 'Descriptive Praise Generator',
      praiseDesc: 'Instead of an empty "Good job!" or "You are so smart!", describe the specific effort, concentration, and repair action:',
      chooseScenario: 'Select a typical classroom scenario:',
      phrasingTitle: '💬 Recommended Phrasing (Descriptive Praise):',
      whyWorks: 'Why this works:',
      customSituation: 'Or type your own specific scenario:',
      customPlaceholder: 'E.g., child quietly pushed in chairs for lunchtime...',
      generateBtn: 'Generate',
      limitedChoicesTitle: 'The Two Limited Choices Rule',
      limitedChoicesDesc: 'To prevent power struggles while holding clear boundaries, always offer two equally acceptable choices:',
      peaceTableTitle: 'The Peace Table Protocol (Step-by-Step)',
      peaceTableDesc: 'Autonomous non-violent conflict resolution for children',
      stepOf: 'Step',
      steps: {
        s1: '1. Invitation',
        s2: '2. Peace Symbol',
        s3: '3. Express Feelings',
        s4: '4. Active Listening',
        s5: '5. Reconciliation',
      },
      backBtn: 'Back',
      nextBtn: 'Next Step',
    },
    dict: {
      title: 'Interactive Montessori Glossary',
      subtitle: 'Core doctrinal concepts (based on the principles of the Montessori educational model)',
      intro: 'Montessori terminology embodies a scientific vision of human development. Every term directly informs the assistant’s daily posture in the prepared environment.',
      searchPlaceholder: 'Search concept (e.g., Normalization, False Fatigue)...',
      all: 'All',
      principles: 'Core Principles',
      materials: 'Environment & Materials',
      childDev: 'Child Development',
      peace: 'Social Life & Peace',
      defTitle: 'Doctrinal Definition:',
      appTitle: 'Practical Application for the Assistant:',
      noResults: 'No terms match your search query.',
    },
    ai: {
      title: 'Virtual Montessori Assistant (Google Gemini 3.8 Flash)',
      subtitle: 'Pedagogical guidance grounded in the principles of the Montessori educational model',
      activeStatus: 'Active (Gemini 3.8 Flash)',
      resetChat: 'Reset Conversation',
      frequentQuestions: '💡 Recommended Common Questions (Click to ask):',
      inputPlaceholder: 'Ask any pedagogical question or describe a classroom challenge...',
      sendBtn: 'Send',
      consulting: 'Consulting Montessori principles...',
      exportPdf: 'Export PDF',
      printText: 'Print',
      exportAllPdf: 'Export Consultation PDF',
      printAll: 'Print Consultation',
      copyText: 'Copy',
      copied: 'Copied!',
      docTitle: 'AI Pedagogical Consultation Sheet',
      aiRecommendation: 'AI Pedagogical Guidance & Advice',
    },
    reports: {
      title: 'PDF Report Generation & Export Center',
      subtitle: 'Official documentation adhering to the principles of the Montessori educational model',
      intro: 'All reports are automatically formatted with the official institutional header, school logo, contact details, and designated pedagogical grids.',
      obsReportTitle: 'Observation Report',
      obsReportDesc: 'Export observation sheets from the 20-hour protocol across all 4 practical phases.',
      lessonReportTitle: 'Lesson Plan Sheet (5 Elements)',
      lessonReportDesc: 'Complete presentation plan with direct aims, HOTS questions, and balanced follow-up options.',
      weeklyReportTitle: 'Weekly Synthetic Report',
      weeklyReportDesc: 'Comprehensive weekly summary compiling assistant principles and all classroom lessons and observations.',
      openPrintPdf: 'Open & Print PDF',
      backupTitle: 'Local Classroom Data Backup & Restore',
      backupDesc: 'Download a JSON backup of all your observations and lesson plans, or restore a previous archive.',
      exportBackupJson: 'Export JSON Backup',
      restoreBackup: 'Restore Backup',
      backupSuccess: 'JSON backup file successfully generated and downloaded!',
    },
    printModal: {
      title: 'Official Report Export & Print Center (PDF)',
      subtitle: 'Standard layout with school emblem, based on the principles of the Montessori educational model',
      weeklyType: 'Weekly Synthetic',
      obsType: 'Observation Sheet',
      lessonType: 'Lesson Plan',
      chooseObs: 'Select Observation:',
      chooseLesson: 'Select Lesson:',
      weeklyTip: 'Includes weekly summary, assistant principles, and complete classroom activity overview.',
      printSavePdf: 'Print / Save as PDF',
      signatureAssistant: 'Montessori Assistant Signature:',
      signatureGuide: 'Verified by Classroom Guide:',
      officialIssued: 'Official document issued in accordance with the principles of the Montessori educational model',
    },
    calendar: {
      title: 'International Montessori Calendar',
      subtitle: 'Global celebrations, founding milestones, cosmic education, and classroom traditions',
      description: 'The definitive annual calendar of observances honored by the global Montessori community, complete with age-appropriate classroom activity guides.',
      allCategories: 'All Categories',
      founderCat: 'Founding Milestones & History',
      peaceCat: 'Peace Education',
      cosmicCat: 'Cosmic Education & Nature',
      traditionCat: 'Rituals & Traditions',
      searchPlaceholder: 'Search holidays, classroom activities, or quotes...',
      allMonths: 'All Months',
      filterByMonth: 'Filter by Month:',
      monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      upcomingEvents: 'Key Celebrations',
      noEventsFound: 'No celebrations match your current search filters.',
      classroomGuide: 'Classroom Activity & Presentation Guide',
      recommendedMaterials: 'Recommended Didactic Materials',
      quoteTitle: 'Montessori Vision & Quote',
      exportPdf: 'Export Calendar PDF',
      printCalendar: 'Print Calendar',
      birthdayWalkTitle: 'The Montessori Birthday Walk (Celebration of Life)',
      birthdayWalkSubtitle: 'Cosmic celebration ritual: walking the Earth\'s orbit around the Sun',
      birthdayWalkDesc: 'In authentic Montessori tradition, a child\'s birthday is a reverent cosmic celebration of time, astronomy, and gratitude for each annual journey around the Sun.',
      childNameLabel: 'Child\'s Name',
      turningAgeLabel: 'Age Celebrated',
      birthDateLabel: 'Birth Date',
      startRitualBtn: 'Generate Celebration Script',
      toddlerLevel: '0-3 Years (Infant Community)',
      casaLevel: '3-6 Years (Children\'s House)',
      elementaryLevel: '6-12 Years (Elementary)',
      historicalContextTitle: 'Historical Context & Global Impact',
      pedagogicalMeaningTitle: 'Pedagogical & Spiritual Significance',
      taglineBadge: 'Based on the principles of the Montessori educational model',
      birthdayWalkShort: 'Sun Walk Ceremony',
      exportScriptPdf: 'Export Script (PDF)',
      closePanel: '✕ Close',
      resetSearch: 'Reset search',
      showAllMonths: 'Show all months',
      eventsFoundSuffix: 'celebrations and milestones found',
      clickToExpandHint: 'Click any card to open the classroom activity guide',
      showAllHolidays: 'Show all celebrations',
      hideDetails: 'Hide details',
      viewActivities: 'View activities',
      exportPdfTooltip: 'Download the complete calendar in PDF',
      printCalendarTooltip: 'Print to printer',
      yearSingular: 'year',
      yearPlural: 'years',
      currentMonthBadge: 'Current',
      adaptToCurrentMonth: 'Adapt to current month',
      currentMonthActive: 'Current month active',
      todayIs: 'Present date',
    },
    childObs: {
      title: 'Individual Child Observation Record',
      subtitle: 'Formative Assessment & Progress Tracking in the Prepared Environment',
      profileTitle: 'Child Profile & Assessment Information',
      childName: 'Child Name / Initials',
      childAge: 'Child Age',
      childLevel: 'Classroom Level',
      date: 'Observation Date',
      observer: 'Observer (Lead Guide / Assistant)',
      aiTitle: 'Formative Assessment Synthesis with Gemini AI',
      aiDesc: 'Input raw clinical observation notes; Gemini will automatically structure the progress report across all 6 Montessori curricular domains',
      aiPlaceholder: 'E.g., Luke (4 yrs) demonstrated 35 min deep concentration on Pink Tower, poured water without spills, traced sandpaper letters...',
      aiBtn: 'Generate Structured Assessment with AI',
      aiGenerating: 'Gemini is synthesizing child observation...',
      domainsTitle: 'Assessment Across Montessori Development Areas',
      vp: 'Practical Life',
      senz: 'Sensorial',
      lang: 'Language',
      math: 'Mathematics & STEM',
      cult: 'Culture & Sciences',
      soc: 'Social-Emotional & Normalization',
      statusMastered: 'Mastered / Normalized',
      statusPracticing: 'Practicing',
      statusPresented: 'Presented',
      statusUnaddressed: 'Unaddressed',
      notesPlaceholder: 'Specific observations, repetition count, materials handled...',
      generalTitle: '2. General Summary & State of Concentration / Normalization',
      generalPlaceholder: 'Describe duration of focused work, intrinsic control of error, serene disposition...',
      nextStepsTitle: '3. Recommendations & Next Presentations (Next Steps)',
      nextStepsPlaceholder: '1. Next presentation...\n2. Recommended follow-up material...',
      saveBtn: 'Save Child Record',
      resetBtn: 'Guided Example',
      exportPdfBtn: 'Download Child Report PDF with Logo',
      previewTitle: 'Child Observation Preview',
      savedRecordsTitle: 'Saved Child Records',
      emptyRecords: 'No child observation records saved yet.',
    },
    sensitive: {
      title: 'Sensitive Periods & Holistic Development (Classic Montessori)',
      subtitle: 'Based on Dr. Maria Montessori’s discoveries (The Absorbent Mind & The Montessori Method)',
      keyPrinciple: 'Key Principle: Once a sensitive period has passed, acquiring that specific skill requires conscious effort and willpower, lacking the effortless joy of early childhood.',
      tabMap: 'Sensitive Periods Map (0 - 12 Yrs)',
      tabGuide: 'Identification & Classroom Guide',
      tabAi: 'AI Sensitive Periods Consultant',
      ageRange: 'Age',
      manifestations: 'Visible Signs & Manifestations',
      materials: 'Recommended Materials',
      pedagogicalTip: 'Assistant Pedagogical Guidance',
      howToRecognizeTitle: 'How to recognize an active sensitive period?',
      whatToDoTitle: 'What to do when a sensitive period is active?',
      aiTitle: 'AI Sensitive Periods Consultant (Gemini)',
      aiDesc: 'Describe the child’s spontaneous behavior to identify active sensitive windows and developmental materials',
      aiPlaceholder: 'Describe the behavior (e.g., 3.5-year-old meticulously aligning shoes in exact order and sorting tiny beads)...',
      aiBtn: 'Identify Sensitive Period & Materials',
      aiAnalyzing: 'Gemini is consulting Montessori foundational principles...',
      hideDetails: 'Hide details',
      explore: 'Explore',
      searchPlaceholder: 'Search a sensitive period or developmental material...',
      filterAll: 'All (0-12 yrs)',
      filterInfant: '0 - 3 yrs (Nido / Toddler)',
      filterCasa: '3 - 6 yrs (Children’s House)',
      filterElementary: '6 - 12 yrs (Elementary)',
      guidePoint1Title: '1. Deep Concentration and Repetition',
      guidePoint1Desc: 'The child repeats the exact same activity 15, 20, or even 30 times consecutively without fatigue, moved by pure inner delight.',
      guidePoint2Title: '2. Radiance and Normalization',
      guidePoint2Desc: 'Upon completing this freely chosen work, the child emerges not exhausted, but in a profound state of peace, satisfaction, and kindness toward peers.',
      guidePoint3Title: '3. Irresistible Spontaneous Attraction',
      guidePoint3Desc: 'Upon entering the prepared environment, the child heads straight to the same tray or work each morning without adult intervention.',
      actionPoint1Title: '1. The Rule of Silence & Hands Behind the Back',
      actionPoint1Desc: 'Do not interrupt the concentrated child, not even to offer praise. External praise can fracture the delicate thread of spontaneous absorption.',
      actionPoint2Title: '2. Impeccable Preparation of Materials',
      actionPoint2Desc: 'Ensure the requested developmental material is complete, clean, with functional control of error and pristine aesthetic appeal.',
      actionPoint3Title: '3. Distinguishing Sensitive Periods from Tantrums',
      actionPoint3Desc: 'A distress reaction triggered by a thwarted sensitive need (e.g., upset order) subsides the moment harmony is restored; a tantrum seeks external attention.',
    },
    footer: {
      standard: 'Created by STEC Studio and integrated with Google Gemini AI Studio',
    },
  },
  de: {
    appName: 'Montessori Assistent',
    appSubtitle: 'basierend auf den Prinzipien des Montessori-Bildungsmodells',
    tagline: 'Getreu den Prinzipien des Montessori-Bildungsmodells und dem 20-Stunden-Beobachtungsprotokoll.',
    headerSettings: 'Kopfzeile Einstellungen',
    exportPdf: 'PDF Exportieren',
    userManual: 'Benutzerhandbuch (PDF)',
    printOrSavePdf: 'Drucken / Als PDF Speichern',
    close: 'Schließen',
    save: 'Änderungen Speichern',
    cancel: 'Abbrechen',
    reset: 'Zurücksetzen',
    institutionName: 'Name der Schule / Einrichtung',
    accreditationSubtitle: 'Akkreditierung / Untertitel',
    addressContact: 'Adresse & Kontakt',
    uploadLogo: 'Logo Hochladen (PNG/JPG)',
    resetDefault: "Auf L'École des Préalpes zurücksetzen",
    changeLogo: 'Logo Ändern',
    modulesTitle: 'Anwendungsmodule',
    nav: {
      hub: 'Alltag & Routinen',
      ai: 'KI-Pädagogik-Assistent',
      obs: 'Beobachtung (20 Std.)',
      childObs: 'Kind-Beobachtung',
      sensitive: 'Sensible Phasen',
      lesson: '5-Elemente-Planer',
      peace: 'Verhalten & Friedenstisch',
      dict: 'Montessori Glossar',
      calendar: 'Internationaler Kalender',
      reports: 'PDF-Berichte Generator',
    },
    hub: {
      roleTitle: 'Rolle und Auftrag des Montessori-Assistenten',
      coreRole: 'Ihre wichtigste Aufgabe ist es, die vorbereitete Umgebung zu schützen und dem Kind zu ermöglichen, sich durch selbstgewählte, konzentrierte Arbeit aufzubauen. Achten Sie seinen Rhythmus, schenken Sie Selbstständigkeit und greifen Sie nur bei wirklicher Notwendigkeit behutsam ein.',
      cycle3hTitle: 'Der 3-Stunden-Arbeitszyklus',
      cycle3hDesc: 'Ununterbrochene Arbeitszeit ohne erzwungene Gruppenpausen. Geben Sie dem Kind Raum, die «falsche Müdigkeit» natürlich zu überwinden.',
      handsBackTitle: 'Die Hände hinter dem Rücken',
      handsBackDesc: 'Lassen Sie das Kind die Fehlerkontrolle des Materials selbst entdecken, bevor Sie eingreifen.',
      graceTitle: 'Anmut und Höflichkeit',
      graceDesc: 'Sprechen Sie mit leiser, warmer Stimme. Leben Sie die langsamen, achtsamen Bewegungen vor, die Sie sich wünschen.',
      thoughtOfDay: 'Gedanke des Tages',
      anotherQuote: 'Anderes Zitat',
      instReport: 'Schulbericht',
      instReportDesc: 'Aktivitätsbericht exportieren für',
      printBtn: 'Drucken',
      checklistTitle: 'Checkliste für die Vorbereitete Umgebung',
      tasksDone: 'Aufgaben heute erledigt',
      quickNotesTitle: 'Schnelle Notizen & Reparaturtablett',
      quickNotesDesc: 'Fehlendes Material, Reparaturen oder dringende Beobachtungen',
      newNotePlaceholder: 'Z.B.: Das Wassergieß-Tablett benötigt einen neuen Schwamm...',
      addBtn: 'Hinzufügen',
      emptyNotes: 'Keine Notizen vorhanden. Alle Materialien stehen geordnet in den Regalen.',
      categories: {
        environment: 'Umgebung',
        material: 'Material',
        child: 'Kind',
        general: 'Allgemein',
        morning: 'Morgen',
        work: 'Arbeitszeit',
        afternoon: 'Nachmittag',
      },
    },
    obs: {
      title: 'Protokoll der 20 Praktischen Beobachtungsstunden',
      subtitle: 'basierend auf den Prinzipien des Montessori-Bildungsmodells',
      protocolProgress: 'Protokoll-Fortschritt',
      sessionsCount: 'Sitzungen erfasst',
      tabNew: 'Neue Beobachtung erfassen',
      tabHistory: 'Erfasste Sitzungen',
      methodFocus: 'Methodischer Schwerpunkt für',
      date: 'Datum der Beobachtung',
      startTime: 'Startzeit',
      group: 'Klassenzusammensetzung',
      weather: 'Wetter & Raumatmosphäre',
      notesTitle: '1. Objektive Beobachtungsnotizen (5-Minuten-Intervalle / Konkrete Fakten)',
      notesHint: '* Ohne Wertungen oder psychologische Etiketten',
      reflectionTitle: '2. Persönliche Reflexion des Assistenten / Pädagogen',
      reflectionHint: '* Innere Haltung, Eingreifimpulse, persönliche Wandlung',
      saveSession: 'Beobachtungssitzung Speichern',
      aiAnalyzeBtn: 'KI-Objektivitätsprüfung',
      aiAnalyzing: 'Wird analysiert...',
      aiFeedbackTitle: 'Pädagogische Auswertung & Objektivitätsprüfung (Gemini 3.8 Flash)',
      emptyHistory: 'Noch keine Beobachtungssitzungen erfasst.',
      addFirst: 'Erste Beobachtung Hinzufügen',
      groupPlaceholder: 'Z.B.: 22 Kinder / 2 Erwachsene',
      weatherPlaceholder: 'Z.B.: Sonnig, ruhige und helle Atmosphäre...',
      notesPlaceholder: '09:00 - Ruhiges Eintreffen der Kinder...\n09:05 - M. (4 J.) wählt den Rosa Turm...',
      reflectionPlaceholder: 'Wie haben Sie sich gefühlt? Konnten Sie dem Impuls zu intervenieren widerstehen?',
      reloadExample: 'Beispiel laden',
      printTooltip: 'Bericht drucken',
      deleteTooltip: 'Eintrag löschen',
      phases: {
        p1: 'Stunden 1-5: Selbstbeobachtung (Reaktionen und innere Haltung des Erwachsenen)',
        p2: 'Stunden 6-10: Beobachtung des Kindes (Handlungen und Wahl alle 5 Min)',
        p3: 'Stunden 11-15: Beobachtung der Lehrkraft (Darbietung, Haltung und Sprache)',
        p4: 'Stunden 16-20: Beobachtung der Umgebung (Gesamtdynamik und Atmosphäre)',
      },
      guidance: {
        p1: 'Fokus auf sich selbst: Notieren Sie Ihre inneren Impulse, den Drang einzugreifen und wann Sie sprechen wollten. Ziel: die geistige Vorbereitung des Erwachsenen.',
        p2: 'Fokus auf ein Kind: Halten Sie alle 5 Minuten fest, welches Material gewählt wurde, die Ausdauer und Blickbewegungen in rein sachlicher Sprache.',
        p3: 'Fokus auf die Lehrkraft: Beobachten Sie Augenhöhe, Stimmmodulation, langsame Präsentationsschritte und ruhigen Umgang mit Unterbrechungen.',
        p4: 'Fokus auf die Atmosphäre: Verfolgen Sie die Energie von 8:30 bis 11:30 Uhr, beobachten Sie die «falsche Müdigkeit» um 10:00 Uhr und die anschließende tiefe Ruhe.',
      },
    },
    lesson: {
      title: 'Montessori Unterrichtsplaner (Die 5 Elemente)',
      subtitle: 'basierend auf den Prinzipien des Montessori-Bildungsmodells',
      lessonPrinciple: 'Das 5-Elemente-Prinzip: Montessori-Darbietungen sind keine Vorträge, sondern Schlüssel zur Welt. Jeder Plan enthält: 1. Titel, 2. Album-Referenz, 3. Direktes Ziel, 4. HOTS-Fragen und 5. Zwei ausgewogene Folgearbeiten.',
      savedCount: 'Pläne gespeichert',
      tabCreate: 'Unterrichtsplan Erstellen',
      tabSaved: 'Gespeicherte Pläne',
      tabSchedule: 'Empfohlene Wochenstruktur',
      tabScope: 'Scope & Sequence nach Altersstufen',
      tabStem: 'Mathematische & MINT-Kompetenzen',
      aiAutofillTitle: 'Intelligente Planung mit Gemini 3.8 Flash',
      aiAutofillDesc: 'Erstellt blitzschnell die 5 Planungselemente',
      aiTopicPlaceholder: 'Thema oder Material eingeben (z.B. Punktekartei Multiplikation, Botanische Kommode)...',
      aiGenerateBtn: 'Unterrichtsstruktur Generieren',
      aiGenerating: 'Plan wird erstellt...',
      orChooseSample: 'Oder wählen Sie eine klassische Darbietung zur Vorlage:',
      formTitle: 'Montessori-Unterrichtsplan (5 Elemente)',
      el1Title: '1. Titel der Darbietung / Lektion',
      subjectLabel: 'Fachbereich',
      levelLabel: 'Altersstufe',
      el2Title: '2. Montessori-Album Referenz',
      el3Title: '3. Direktes Ziel (Direct Aim)',
      indirectAimsLabel: 'Indirekte Ziele (Koordination, sensorische Verfeinerung, innere Ordnung)',
      el4Title: '4. Fragen Höherer Denkordnung (HOTS - Higher Order Thinking Skills)',
      hots1Label: 'A. Analyse- / Vergleichsfrage',
      hots2Label: 'B. Bewertungs- / Schöpfungs- / Transferfrage',
      el5Title: '5. Folgearbeiten (Follow-up Work - Zwei Ausgewogene Optionen)',
      follow1Label: 'Option A (Praxis & Material-Replikation)',
      follow2Label: 'Option B (Kreative Anwendung / Erweiterung)',
      materialsLabel: 'Benötigte Materialien für die Darbietung',
      pointOfInterestLabel: 'Punkt des Interesses (Point of Interest)',
      saveLessonBtn: 'Unterrichtsplan Speichern',
      emptySaved: 'Noch keine Unterrichtspläne gespeichert.',
      createFirst: 'Ersten Plan Erstellen',
      scheduleTitle: '🗓️ Empfohlene Wochenstruktur (Primarstufe / 6-12 Jahre)',
      scheduleDesc: 'Empfehlung: Täglich 1 neue Schlüsseldarbietung im Kreislauf der 5 großen kosmischen Erzählungen.',
      casadeiNote: '💡 Für das Kinderhaus (3-6 Jahre): 1-2 Einzeldarbietungen pro Woche abgestimmt auf die aktive sensible Phase.',
    },
    peace: {
      title: 'Positive Disziplin & Friedenserziehung',
      subtitle: 'Innere Disziplin, beschreibendes Lob und Friedenstisch-Protokoll (basierend auf den Prinzipien des Montessori-Bildungsmodells)',
      intro: 'In der Montessori-Pädagogik entsteht Disziplin von innen heraus. Wir verzichten auf Belohnungssternchen oder Auszeiten und leiten das Kind durch Respekt, begrenzte Wahlmöglichkeiten und vorgelebte Höflichkeit.',
      praiseTitle: 'Generator für Beschreibendes Lob',
      praiseDesc: 'Statt eines inhaltsleeren «Bravo!» oder «Super gemacht!», beschreiben Sie die konkrete Anstrengung, Geduld und Handlung:',
      chooseScenario: 'Typische Situation aus der Klasse wählen:',
      phrasingTitle: '💬 Empfohlene Formulierung (Beschreibendes Lob):',
      whyWorks: 'Warum es wirkt:',
      customSituation: 'Oder eigene Situation eingeben:',
      customPlaceholder: 'Z.B.: Das Kind hat die Stühle leise an den Tisch gerückt...',
      generateBtn: 'Generieren',
      limitedChoicesTitle: 'Die Regel der Zwei Begrenzten Optionen (Limited Choices)',
      limitedChoicesDesc: 'Um Machtkämpfe zu vermeiden, bieten Sie stets zwei für Erwachsene annehmbare Optionen an:',
      peaceTableTitle: 'Das Friedenstisch-Protokoll (Schritt für Schritt)',
      peaceTableDesc: 'Gewaltfreie und selbstständige Konfliktlösung unter Kindern',
      stepOf: 'Schritt',
      steps: {
        s1: '1. Einladung',
        s2: '2. Friedenssymbol',
        s3: '3. Gefühle äußern',
        s4: '4. Aktives Zuhören',
        s5: '5. Versöhnung',
      },
      backBtn: 'Zurück',
      nextBtn: 'Nächster Schritt',
    },
    dict: {
      title: 'Interaktives Montessori Glossar',
      subtitle: 'Grundbegriffe (basierend auf den Prinzipien des Montessori-Bildungsmodells)',
      intro: 'Die Montessori-Fachsprache spiegelt eine wissenschaftliche Sicht der menschlichen Entwicklung wider. Jeder Begriff prägt das tägliche Handeln des Assistenten.',
      searchPlaceholder: 'Begriff suchen (z.B. Normalisierung, Falsche Müdigkeit)...',
      all: 'Alle',
      principles: 'Grundprinzipien',
      materials: 'Umgebung & Material',
      childDev: 'Entwicklung des Kindes',
      peace: 'Gemeinschaft & Friede',
      defTitle: 'Lehrmäßige Definition:',
      appTitle: 'Praktische Anwendung für den Assistenten:',
      noResults: 'Kein Begriff entspricht der Suche.',
    },
    ai: {
      title: 'Virtueller Montessori-Assistent (Google Gemini 3.8 Flash)',
      subtitle: 'Pädagogische Beratung auf Grundlage des Montessori-Bildungsmodells',
      activeStatus: 'Aktiv (Gemini 3.8 Flash)',
      resetChat: 'Gespräch zurücksetzen',
      frequentQuestions: '💡 Empfohlene Häufige Fragen (Zum Abfragen klicken):',
      inputPlaceholder: 'Stellen Sie Ihre pädagogische Frage oder schildern Sie eine Situation...',
      sendBtn: 'Senden',
      consulting: 'Montessori-Prinzipien werden konsultiert...',
      exportPdf: 'PDF exportieren',
      printText: 'Drucken',
      exportAllPdf: 'Beratung als PDF exportieren',
      printAll: 'Beratung drucken',
      copyText: 'Kopieren',
      copied: 'Kopiert!',
      docTitle: 'KI-Pädagogisches Beratungsprotokoll',
      aiRecommendation: 'KI-Pädagogische Anleitung & Beratung',
    },
    reports: {
      title: 'PDF-Berichts- & Exportzentrum',
      subtitle: 'Offizielle Dokumente, basierend auf den Prinzipien des Montessori-Bildungsmodells',
      intro: 'Alle Berichte werden automatisch mit dem offiziellen Schulkopf, Logo und den spezifischen pädagogischen Tabellen formatiert.',
      obsReportTitle: 'Beobachtungsbericht',
      obsReportDesc: 'Exportieren Sie die 20-Stunden-Beobachtungsbögen über alle 4 praktischen Phasen.',
      lessonReportTitle: 'Unterrichtspläne (5 Elemente)',
      lessonReportDesc: 'Ausführliche Pläne mit direktem Ziel, HOTS-Fragen und ausgewogenen Folgearbeiten.',
      weeklyReportTitle: 'Synthetischer Wochenbericht',
      weeklyReportDesc: 'Vollständige Wochenübersicht mit Assistenten-Prinzipien und allen Aktivitäten der Klasse.',
      openPrintPdf: 'PDF Öffnen & Drucken',
      backupTitle: 'Lokale Datensicherung & Wiederherstellung',
      backupDesc: 'Laden Sie ein JSON-Backup Ihrer Beobachtungen und Pläne herunter oder stellen Sie frühere Daten wieder her.',
      exportBackupJson: 'JSON-Backup Exportieren',
      restoreBackup: 'Backup Wiederherstellen',
      backupSuccess: 'JSON-Sicherungsdatei wurde erfolgreich heruntergeladen!',
    },
    printModal: {
      title: 'Offizielles Druck- & Exportzentrum (PDF)',
      subtitle: 'Standardisiertes Layout mit Schullogo, basierend auf den Prinzipien des Montessori-Bildungsmodells',
      weeklyType: 'Synthetischer Wochenbericht',
      obsType: 'Beobachtungsbogen',
      lessonType: 'Unterrichtsplan',
      chooseObs: 'Beobachtung Wählen:',
      chooseLesson: 'Plan Wählen:',
      weeklyTip: 'Enthält die Wochenübersicht, Leitsätze des Assistenten und Aktivitäten der Gruppe.',
      printSavePdf: 'Drucken / Als PDF Speichern',
      signatureAssistant: 'Unterschrift Montessori-Assistent:',
      signatureGuide: 'Geprüft von der Klassenleitung:',
      officialIssued: 'Offizielles Dokument ausgestellt basierend auf den Prinzipien des Montessori-Bildungsmodells',
    },
    calendar: {
      title: 'Internationaler Montessori-Kalender',
      subtitle: 'Globale Gedenktage, Meilensteine, Kosmische Erziehung und Raum-Rituale',
      description: 'Der pädagogische Jahreskalender der weltweiten Montessori-Gemeinschaft mit konkreten Praxisanleitungen für jede Entwicklungsstufe.',
      allCategories: 'Alle Kategorien',
      founderCat: 'Meilensteine & Geschichte',
      peaceCat: 'Friedenserziehung',
      cosmicCat: 'Kosmische Erziehung & Natur',
      traditionCat: 'Rituale & Traditionen',
      searchPlaceholder: 'Feiertag, Aktivität oder Zitat suchen...',
      allMonths: 'Alle Monate',
      filterByMonth: 'Nach Monat filtern:',
      monthNames: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
      upcomingEvents: 'Zentrale Feiertage',
      noEventsFound: 'Keine Feiertage entsprechen den ausgewählten Kriterien.',
      classroomGuide: 'Pädagogischer Praxisleitfaden',
      recommendedMaterials: 'Empfohlenes Entwicklungsmaterial',
      quoteTitle: 'Montessori-Zitat & Vision',
      exportPdf: 'Kalender als PDF Exportieren',
      printCalendar: 'Kalender Drucken',
      birthdayWalkTitle: 'Die Geburtstags-Sonnenfeier (Celebration of Life)',
      birthdayWalkSubtitle: 'Kosmisches Ritual: Der Gang der Erde um die Sonne',
      birthdayWalkDesc: 'In der Montessori-Tradition ist der Geburtstag ein kosmisches Fest der Zeit, der Astronomie und der Dankbarkeit für jedes vollendete Lebensjahr.',
      childNameLabel: 'Name des Kindes',
      turningAgeLabel: 'Vollendetes Lebensjahr',
      birthDateLabel: 'Geburtsdatum',
      startRitualBtn: 'Ablauf des Rituals Erstellen',
      toddlerLevel: '0-3 Jahre (Kleinkindgemeinschaft)',
      casaLevel: '3-6 Jahre (Kinderhaus)',
      elementaryLevel: '6-12 Jahre (Primarstufe)',
      historicalContextTitle: 'Historischer Kontext & Globale Bedeutung',
      pedagogicalMeaningTitle: 'Pädagogischer & Seelischer Sinn',
      taglineBadge: 'Basierend auf den Prinzipien des Montessori-Bildungsmodells',
      birthdayWalkShort: 'Sonnenzeremonie',
      exportScriptPdf: 'Ablauf exportieren (PDF)',
      closePanel: '✕ Schließen',
      resetSearch: 'Suche zurücksetzen',
      showAllMonths: 'Alle Monate anzeigen',
      eventsFoundSuffix: 'Feiertage und Meilensteine gefunden',
      clickToExpandHint: 'Klicken Sie auf eine Karte für den Aktivitätenleitfaden',
      showAllHolidays: 'Alle Feiertage anzeigen',
      hideDetails: 'Details verbergen',
      viewActivities: 'Aktivitäten ansehen',
      exportPdfTooltip: 'Gesamten Kalender als PDF herunterladen',
      printCalendarTooltip: 'Drucken',
      yearSingular: 'Jahr',
      yearPlural: 'Jahre',
      currentMonthBadge: 'Aktuell',
      adaptToCurrentMonth: 'An aktuellen Monat anpassen',
      currentMonthActive: 'Aktueller Monat aktiv',
      todayIs: 'Heutiges Datum',
    },
    childObs: {
      title: 'Individueller Beobachtungsbogen des Kindes',
      subtitle: 'Formative Bewertung & Entwicklungsdokumentation in der Vorbereiteten Umgebung',
      profileTitle: 'Kinderprofil & Erhebungsdaten',
      childName: 'Name / Initialen des Kindes',
      childAge: 'Alter des Kindes',
      childLevel: 'Entwicklungsstufe / Gruppe',
      date: 'Beobachtungsdatum',
      observer: 'Beobachter (Pädagoge / Assistent)',
      aiTitle: 'Formative KI-Synthese mit Gemini AI',
      aiDesc: 'Geben Sie formlose Beobachtungsnotizen ein; Gemini strukturiert den Bericht automatisch über alle 6 Montessori-Lernbereiche',
      aiPlaceholder: 'Z.B.: Lukas (4 J.) arbeitete 35 Min. vertieft am Rosa Turm, goss Wasser ohne Verschütten, tastete die Sandpapierbuchstaben ab...',
      aiBtn: 'Strukturierte Bewertung mit KI Generieren',
      aiGenerating: 'Gemini strukturiert die Beobachtung...',
      domainsTitle: 'Bewertung nach Montessori-Entwicklungsbereichen',
      vp: 'Übungen des täglichen Lebens',
      senz: 'Sinnesmaterial',
      lang: 'Sprache',
      math: 'Mathematik & MINT',
      cult: 'Kosmische Erziehung & Natur',
      soc: 'Sozial-Emotionale Entwicklung & Normalisierung',
      statusMastered: 'Gemeistert / Normalisiert',
      statusPracticing: 'In Übung (Practicing)',
      statusPresented: 'Dargeboten (Presented)',
      statusUnaddressed: 'Noch nicht eingeführt',
      notesPlaceholder: 'Spezifische Beobachtungen, Ausdauer, verwendete Materialien...',
      generalTitle: '2. Gesamtsynthese & Konzentrationszustand / Normalisierung',
      generalPlaceholder: 'Dauer der vertieften Arbeit, Fehlerkontrolle, innere Ruhe...',
      nextStepsTitle: '3. Empfehlungen & Nächste Darbietungen (Next Steps)',
      nextStepsPlaceholder: '1. Nächste Darbietung...\n2. Empfohlenes Material...',
      saveBtn: 'Beobachtungsbogen Speichern',
      resetBtn: 'Angeleitetes Beispiel',
      exportPdfBtn: 'Bogen als PDF mit Schullogo Herunterladen',
      previewTitle: 'Vorschau des Beobachtungsbogens',
      savedRecordsTitle: 'Gespeicherte Beobachtungsbögen',
      emptyRecords: 'Bisher keine individuellen Bögen erfasst.',
    },
    sensitive: {
      title: 'Sensible Phasen & Ganzheitliche Entwicklung (Klassische Montessori-Pädagogik)',
      subtitle: 'Nach den Entdeckungen von Dr. Maria Montessori (Das beharrliche Kind & Grundlagen)',
      keyPrinciple: 'Schlüsselprinzip: Ist eine sensible Phase ungenutzt verstrichen, muss die Fertigkeit später mit willentlicher Anstrengung erlernt werden, ohne die mühelose Leichtigkeit der frühen Kindheit.',
      tabMap: 'Landkarte der Sensiblen Phasen (0 - 12 Jahre)',
      tabGuide: 'Erkennungs- & Beobachtungsleitfaden',
      tabAi: 'KI-Fachberatung zu Sensiblen Phasen',
      ageRange: 'Altersfenster',
      manifestations: 'Sichtbare Anzeichen & Ausdrucksformen',
      materials: 'Empfohlenes Entwicklungsmaterial',
      pedagogicalTip: 'Pädagogischer Praxistipp für Assistenten',
      howToRecognizeTitle: 'Woran erkennen wir eine aktive sensible Phase?',
      whatToDoTitle: 'Wie begleiten wir eine sensible Phase im Raum?',
      aiTitle: 'KI-Fachberatung Sensible Phasen (Gemini)',
      aiDesc: 'Beschreiben Sie das beobachtete Verhalten des Kindes, um sensible Fenster und passende Materialien zu ermitteln',
      aiPlaceholder: 'Verhalten beschreiben (z.B. 3,5-jähriges Kind ordnet Hausschuhe akribisch in Reihe und sortiert winzige Perlen)...',
      aiBtn: 'Sensible Phase & Material Ermitteln',
      aiAnalyzing: 'Gemini zieht klassische Montessori-Quellen heran...',
      hideDetails: 'Details ausblenden',
      explore: 'Erkunden',
      searchPlaceholder: 'Sensible Phase oder Entwicklungsmaterial suchen...',
      filterAll: 'Alle (0-12 J.)',
      filterInfant: '0 - 3 J. (Kleinkind / Nido)',
      filterCasa: '3 - 6 J. (Kinderhaus)',
      filterElementary: '6 - 12 J. (Primarstufe)',
      guidePoint1Title: '1. Tiefe Konzentration und Wiederholung',
      guidePoint1Desc: 'Das Kind wiederholt denselben Ablauf 15, 20 oder 30 Mal hintereinander ohne Ermüdung, getragen von innerer Freude.',
      guidePoint2Title: '2. Ausstrahlung und Normalisierung',
      guidePoint2Desc: 'Nach Beendigung dieser frei gewählten Arbeit wirkt das Kind heiter, friedvoll und wohlwollend gegenüber seinen Mitschülern.',
      guidePoint3Title: '3. Unwiderstehliche Spontananziehung',
      guidePoint3Desc: 'Beim Betreten des Raumes steuert das Kind jeden Tag eigenständig auf dasselbe Tablett oder Material zu.',
      actionPoint1Title: '1. Regel der Stille und Hände auf den Rücken',
      actionPoint1Desc: 'Unterbrechen Sie das vertiefte Kind nicht, auch nicht durch Lob. Externes Lob kann den zarten Faden spontaner Konzentration zerreißen.',
      actionPoint2Title: '2. Makellose Vorbereitung des Materials',
      actionPoint2Desc: 'Achten Sie darauf, dass das Material vollständig, sauber, mit funktionierender Fehlerkontrolle und ansprechend bereitsteht.',
      actionPoint3Title: '3. Unterscheidung zwischen Sensibler Phase und Trotz',
      actionPoint3Desc: 'Ein Weinen aus verletzter sensibler Phase (z.B. gestörte Ordnung) legt sich sofort bei Wiederherstellung der Harmonie; Trotz sucht externe Beachtung.',
    },
    footer: {
      standard: 'Erstellt von STEC Studio und integriert mit Google Gemini AI Studio',
    },
  },
};
