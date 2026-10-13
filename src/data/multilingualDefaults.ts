import { Language, UI_TRANSLATIONS } from '../i18n/translations';
import { LessonPlan, ObservationSession, RoutineItem, QuickDailyNote } from '../types';

export const MULTILINGUAL_ROUTINE_LABELS: Record<Language, Record<string, string>> = {
  ro: {
    r1: 'Verificarea rafturilor și ordonarea estetică a materialelor (de la simplu la complex)',
    r2: 'Pregătirea zonei pentru gustare autonomă, apă și șervețele curate',
    r3: 'Verificarea stocului de hârtie, ascuțirea creioanelor și bureți curați pentru viață practică',
    r4: 'Monitorizarea ciclului de lucru neîntrerupt de 3 ore (protejarea concentrării fără întreruperi)',
    r5: 'Aplicarea regulii „mâinile la spate” – asistență discretă doar la cerere sau când e nevoie de protecție',
    r6: 'Supervizarea tranziției calme către activitățile în aer liber / curte',
    r7: 'Sesiune scurtă de debriefing și sincronizare cu Ghidul Clasei la finalul zilei',
    r8: 'Igienizarea și repoziționarea materialelor defecte pe „Tava de Reparare”',
  },
  fr: {
    r1: 'Vérification des étagères et disposition esthétique du matériel (du simple au complexe)',
    r2: 'Préparation de l’espace collation autonome, eau fraîche et serviettes propres',
    r3: 'Vérification du papier, taille des crayons et éponges propres pour la vie pratique',
    r4: 'Surveillance du grand cycle de travail de 3h (protection de la concentration sans interruption)',
    r5: 'Application de la règle des « mains dans le dos » – aide discrète sur demande ou pour la sécurité',
    r6: 'Supervision de la transition sereine vers les activités de plein air / récréation',
    r7: 'Bilan court et synchronisation avec l’éducateur/guide de classe en fin de journée',
    r8: 'Désinfection et mise à l’écart des matériels incomplets sur le « Plateau de Réparation »',
  },
  en: {
    r1: 'Checking shelves and aesthetic arrangement of materials (simple to complex)',
    r2: 'Preparing autonomous snack area, fresh water, and clean napkins',
    r3: 'Verifying paper stock, sharpening pencils, and clean sponges for practical life',
    r4: 'Protecting the 3-hour uninterrupted work cycle (shielding focus from disruptions)',
    r5: 'Applying the "hands behind back" rule – discrete assistance only upon request or for safety',
    r6: 'Supervising peaceful transition to outdoor / playground activities',
    r7: 'Brief debrief and synchronization with the Lead Guide at the end of the day',
    r8: 'Sanitizing and placing incomplete/damaged materials on the "Repair Tray"',
  },
  de: {
    r1: 'Regalprüfung und ästhetische Ordnung der Materialien (vom Einfachen zum Komplexen)',
    r2: 'Vorbereitung des Bereichs für autonome Zwischenmahlzeiten, frisches Wasser und saubere Servietten',
    r3: 'Prüfung des Papiervorrats, Spitzen der Stifte und saubere Schwämme für Übungen des täglichen Lebens',
    r4: 'Begleitung des 3-stündigen ununterbrochenen Arbeitszyklus (Schutz vor Störungen)',
    r5: 'Anwendung der „Hände auf dem Rücken“-Regel – dezente Assistenz nur auf Anfrage oder zum Schutz',
    r6: 'Begleitung des ruhigen Übergangs zu Aktivitäten im Freien',
    r7: 'Kurze Reflexion und Abstimmung mit der Klassenleitung am Tagesende',
    r8: 'Reinigung und Abstellen unvollständiger Materialien auf dem „Reparatur-Tablett“',
  },
};

export const MULTILINGUAL_QUICK_NOTES: Record<Language, Record<string, string>> = {
  ro: {
    'qn-1': 'Tăvița cu cilindri cu buton necesită ștergere cu ulei de ceară.',
    'qn-2': 'Recompletare flori proaspete pentru Masa Păcii.',
  },
  fr: {
    'qn-1': 'Le plateau des cylindres à bouton nécessite un polissage à la cire végétale.',
    'qn-2': 'Renouveler les fleurs fraîches pour la Table de Paix.',
  },
  en: {
    'qn-1': 'Knobbed cylinder block tray needs gentle waxing and conditioning.',
    'qn-2': 'Replenish fresh flowers for the Peace Table.',
  },
  de: {
    'qn-1': 'Das Zylinderblock-Tablett benötigt eine Pflege mit Wachsöl.',
    'qn-2': 'Frische Blumen für den Friedenstisch nachfüllen.',
  },
};

export const MULTILINGUAL_OBS_DEFAULTS: Record<Language, {
  groupCount: string;
  weather: string;
  phase: string;
  notes: string;
  reflection: string;
}> = {
  ro: {
    groupCount: '22 copii / 2 adulți',
    weather: 'Însorit, atmosferă calmă și luminoasă',
    phase: 'Orele 6-10: Observarea Copilului (Activitate și alegere la fiecare 5 min)',
    notes: `09:00 - Copiii intră calm, își pun papucii de interior pe suport.\n09:05 - M. (4 ani) alege Turnul Roz, îl transportă cub cu cub pe covoraș și începe construcția de la bază.\n09:15 - A. (3.5 ani) se oprește și privește tăcut activitatea colegului timp de 4 minute, apoi alege tăvița cu spălatul vaselor.\n09:25 - M. dă din greșeală peste cubul mic de sus; se oprește, privește și îl reașază cu grijă fără să ceară ajutor.`,
    reflection: `Am observat cum autocontrolul erorii a funcționat natural la Turnul Roz fără ca adultul să intervină. Mi-am stăpânit impulsul de a ridica eu cubul căzut, iar copilul a găsit singur soluția cu bucurie.`,
  },
  fr: {
    groupCount: '22 enfants / 2 adultes',
    weather: 'Ensoleillé, ambiance calme et sereine',
    phase: 'Heures 6-10 : Observation de l’Enfant (Activité et choix toutes les 5 min)',
    notes: `09:00 - Entrée calme des enfants, changement de chaussures et salutation cordiale.\n09:05 - M. (4 ans) choisit la Tour Rose, transporte les cubes un à un sur le tapis et commence l'élévation par la base.\n09:15 - A. (3.5 ans) observe attentivement la construction sans intervenir, puis choisit le plateau du lavage des mains.\n09:25 - M. heurte par mégarde le petit cube supérieur ; s'arrête, observe et le replace soigneusement sans demander d'aide.`,
    reflection: `Le respect mutuel et le contrôle de l'erreur ont opéré spontanément. La règle des mains dans le dos a permis à l'enfant d'éprouver la plénitude de sa concentration.`,
  },
  en: {
    groupCount: '22 children / 2 adults',
    weather: 'Sunny, calm and luminous atmosphere',
    phase: 'Hours 6-10: Child Observation (Activity and choices every 5 min)',
    notes: `09:00 - Children enter calmly, change shoes and exchange cordial greetings.\n09:05 - M. (4 yrs) chooses the Pink Tower, carries cubes one by one to the rug and begins building from base.\n09:15 - A. (3.5 yrs) quietly observes peer's construction without interrupting, then selects the hand-washing tray.\n09:25 - M. finishes the tower, pauses, and carefully deconstructs cube by cube to return to the shelf.`,
    reflection: `Mutual respect and control of error operated spontaneously. The hands-behind-back rule enabled the child to experience deep concentration and joyful autonomous work.`,
  },
  de: {
    groupCount: '22 Kinder / 2 Erwachsene',
    weather: 'Sonnig, ruhige und helle Atmosphäre',
    phase: 'Stunden 6-10: Beobachtung des Kindes (Aktivität und Wahl alle 5 Min.)',
    notes: `09:00 - Ruhiges Eintreffen der Kinder, Wechsel der Hausschuhe und herzliche Begrüßung.\n09:05 - M. (4 J.) wählt den Rosa Turm, transportiert Würfel für Würfel zum Teppich und beginnt von der Basis.\n09:15 - A. (3.5 J.) beobachtet aufmerksam den Aufbau ohne zu stören, wählt danach das Tischwasch-Set.\n09:25 - M. beendet den Turm, bewundert sein Werk und baut ihn Würfel für Würfel behutsam wieder ins Regal zurück.`,
    reflection: `Gegenseitiger Respekt und die Fehlerkontrolle funktionierten spontan. Die Hände-auf-dem-Rücken-Regel half dem Kind, die Fülle tiefer Konzentration ungestört zu erleben.`,
  },
};

export const MULTILINGUAL_LESSON_FORM_DEFAULTS: Record<Language, {
  title: string;
  subject: string;
  level: string;
  albumRef: string;
  directAim: string;
  indirectAims: string;
  hots1: string;
  hots2: string;
  follow1: string;
  follow2: string;
  materials: string;
  pointOfInterest: string;
}> = {
  ro: {
    title: 'Memorarea Adunării: Familiile de Numere',
    subject: 'Matematică',
    level: 'Casa dei Bambini (5-6 ani) / Primar',
    albumRef: 'Album Matematică Montessori, pp. 210-215',
    directAim: 'Înțelegerea procesului de adunare a numerelor mari cu trecere peste ordin.',
    indirectAims: 'Dezvoltarea ordinii mentale, acuratețea notației matematice și concentrarea.',
    hots1: 'Cum ne ajută alinierea pe coloane (unități, zeci, sute) să nu ne rătăcim în calcul?',
    hots2: 'Ce s-ar întâmpla dacă am începe adunarea de la mii în loc de la unități? Este posibil?',
    follow1: 'Rezolvarea a 4 probleme cu numere din 4 cifre folosind foaia cu caroiaj.',
    follow2: 'Compoziția unei povești cu o expediție în care exploratorii adună resurse din diferite orașe.',
    materials: 'Tabla punctelor din lemn, carioci colorate (verde, albastru, roșu), riglă, fișe.',
    pointOfInterest: 'Gruparea a 10 puncte într-un cerculeț și transformarea într-un punct pe coloana următoare.',
  },
  fr: {
    title: 'Mémorisation de l’Addition : Les Familles de Nombres',
    subject: 'Mathématiques',
    level: 'Maison des Enfants (5-6 ans) / Primaire',
    albumRef: 'Album Mathématiques Montessori, pp. 210-215',
    directAim: 'Compréhension du processus d’addition des grands nombres avec retenue.',
    indirectAims: 'Développement de l’ordre mental, rigueur de la notation mathématique et concentration.',
    hots1: 'Comment l’alignement par hiérarchies (unités, dizaines, centaines) évite-t-il les erreurs de calcul ?',
    hots2: 'Que se passerait-il si l’on commençait l’addition par les milliers au lieu des unités ? Est-ce possible ?',
    follow1: 'Résolution de 4 opérations à 4 chiffres sur papier quadrillé spécialisé.',
    follow2: 'Rédaction d’un récit d’expédition où les explorateurs regroupent les provisions des cités.',
    materials: 'Table des points en bois, feutres hiérarchiques (vert, bleu, rouge), règle, fiches.',
    pointOfInterest: 'Le groupement de 10 points dans un cercle et leur transformation en un point sur la colonne suivante.',
  },
  en: {
    title: 'Addition Fact Memorization: Number Families',
    subject: 'Mathematics',
    level: 'Children’s House (5-6 yrs) / Elementary',
    albumRef: 'Montessori Mathematics Album, pp. 210-215',
    directAim: 'Understanding dynamic addition of large numbers with regrouping.',
    indirectAims: 'Development of mental order, mathematical notation accuracy, and concentration.',
    hots1: 'How does columnar alignment (units, tens, hundreds) prevent calculation errors?',
    hots2: 'What would happen if we began adding from the thousands instead of units? Is it possible?',
    follow1: 'Solving 4 four-digit addition problems on grid paper.',
    follow2: 'Writing an expedition story where explorers gather supplies across cities.',
    materials: 'Wooden Dot Game board, hierarchical colored markers (green, blue, red), ruler, slips.',
    pointOfInterest: 'Circling a group of 10 dots and transforming them into a single dot in the next column.',
  },
  de: {
    title: 'Memorieren der Addition: Die Zahlenfamilien',
    subject: 'Mathematik',
    level: 'Kinderhaus (5-6 J.) / Primarstufe',
    albumRef: 'Montessori Mathematik-Album, S. 210-215',
    directAim: 'Verständnis der mehrstelligen Addition mit Zehnerübergang.',
    indirectAims: 'Förderung der inneren Ordnung, mathematische Genauigkeit und Konzentration.',
    hots1: 'Wie hilft die stellenwertgerechte Anordnung (Einer, Zehner, Hunderter), Rechenfehler zu vermeiden?',
    hots2: 'Was würde passieren, wenn wir bei den Tausendern statt bei den Einern beginnen? Ist das möglich?',
    follow1: 'Lösen von 4 vierstelligen Aufgaben auf speziellem Rechenpapier.',
    follow2: 'Schreiben einer Expeditionsgeschichte, bei der Vorräte gesammelt und summiert werden.',
    materials: 'Punktebrett aus Holz, hierarchische Farbstifte (grün, blau, rot), Lineal, Aufgabenblätter.',
    pointOfInterest: 'Das Einkreisen von 10 Punkten und Umwandeln in einen Punkt auf der nächsten Spalte.',
  },
};

export const MULTILINGUAL_SAMPLE_LESSONS: Record<Language, Record<string, Partial<LessonPlan>>> = {
  ro: {
    'lp-sample-1': {
      title: 'Memorarea Adunării: Familiile de Numere',
      subject: 'Matematică',
      level: 'Casa dei Bambini (5-6 ani) / Primar',
      albumRef: 'Album Matematică Montessori, Capitolul Operații, pp. 171-174',
      directAim: 'Memorarea tuturor combinațiilor de bază ale adunării cu sume între 2 și 18.',
      indirectAims: 'Dezvoltarea raționamentului abstract, autodisciplina și plăcerea calculului mental.',
      hots1: 'Cum poți compara adunarea cu multiplicarea? Ce se întâmplă când adunăm același număr de mai multe ori?',
      hots2: 'Dacă ai la dispoziție doar mărgelele de 3 și 4, câte moduri poți găsi pentru a ajunge la numărul 12?',
      follow1: 'Rezolvarea a 10 operații cu tabla degetelor pentru adunare și notarea lor pe carnetul cu pătrățele.',
      follow2: 'Crearea propriei cărticele ilustrate cu «Familiile Numărului 10» (ex: 1+9, 2+8, 3+7 etc.).',
      materials: 'Tabla degetelor pentru adunare, benzi de lemn (roșii și albastre), carnet cu ecuații, creioane colorate.',
      pointOfInterest: 'Punctul de întâlnire al celor două degete pe tablă pentru găsirea sumei.',
    },
    'lp-sample-2': {
      title: 'Introducere în Simbolurile Gramaticale: Substantivul',
      subject: 'Limbaj',
      level: 'Casa dei Bambini (4.5 - 6 ani)',
      albumRef: 'Album Limbaj Montessori, Partea de Morfologie, pp. 88-92',
      directAim: 'Recunoașterea substantivului ca denumire a tuturor lucrurilor, ființelor și locurilor din Univers.',
      indirectAims: 'Conștientizarea structurii limbii, pregătirea lecturii analitice, ordinea mentală.',
      hots1: 'De ce crezi că Maria Montessori a ales o piramidă neagră solidă (asemănătoare Piramidelor din Egipt) pentru a simboliza substantivul?',
      hots2: 'Poți găsi trei obiecte din clasa noastră care nu au un substantiv care să le numească? Este posibil?',
      follow1: 'Etichetarea a 6 obiecte din mediul pregătit cu fâșii de hârtie și așezarea triunghiului negru deasupra fiecăreia.',
      follow2: 'Realizarea unui poster cu substantive din natură decupate sau desenate.',
      materials: 'Piramida neagră din lemn, simbolul plan de triunghi negru echilateral, cutia cu etichete scrise de mână.',
      pointOfInterest: 'Mărimea și stabilitatea piramidei negre din lemn în palmă.',
    },
  },
  fr: {
    'lp-sample-1': {
      title: 'Mémorisation de l’Addition : Les Familles de Nombres',
      subject: 'Mathématiques',
      level: 'Maison des Enfants (5-6 ans) / Primaire',
      albumRef: 'Album Mathématiques Montessori, Chapitre Opérations, pp. 171-174',
      directAim: 'Mémorisation des combinaisons essentielles de l’addition avec sommes entre 2 et 18.',
      indirectAims: 'Développement de l’abstraction, autodiscipline et joie du calcul mental spontané.',
      hots1: 'Comment compares-tu l’addition à la multiplication ? Que se passe-t-il si l’on additionne plusieurs fois la même quantité ?',
      hots2: 'Avec seulement les barrettes de 3 et 4, combien de façons différentes trouves-tu pour atteindre 12 ?',
      follow1: 'Résolution de 10 opérations avec le tableau des doigts pour l’addition et notation sur cahier.',
      follow2: 'Création d’un livret illustré personnel des « Familles du Nombre 10 » (ex. : 1+9, 2+8, 3+7).',
      materials: 'Tableau des doigts pour l’addition, bandes de bois (rouges et bleues), carnet d’équations, crayons.',
      pointOfInterest: 'Le point de rencontre des deux index sur la grille pour découvrir la somme.',
    },
    'lp-sample-2': {
      title: 'Introduction aux Symboles Grammaticaux : Le Nom',
      subject: 'Langage',
      level: 'Maison des Enfants (4.5 - 6 ans)',
      albumRef: 'Album Langage Montessori, Morphologie, pp. 88-92',
      directAim: 'Reconnaissance du nom comme appellation de toutes les choses, êtres et lieux de l’Univers.',
      indirectAims: 'Prise de conscience de la structure linguistique, préparation à la lecture analytique, ordre mental.',
      hots1: 'Pourquoi penses-tu que Maria Montessori a choisi une pyramide noire solide pour symboliser le nom ?',
      hots2: 'Peux-tu trouver trois objets dans notre ambiance qui n’ont aucun nom pour les désigner ? Est-ce concevable ?',
      follow1: 'Étiquetage de 6 objets de l’ambiance avec bandelettes et pose du triangle noir au-dessus.',
      follow2: 'Création d’une affiche de noms de la nature découpés ou dessinés.',
      materials: 'Pyramide noire en bois, symbole plan en triangle équilatéral noir, boîte d’étiquettes manuscrites.',
      pointOfInterest: 'Le poids et la stabilité rassurante de la pyramide noire dans la paume de la main.',
    },
  },
  en: {
    'lp-sample-1': {
      title: 'Addition Fact Memorization: Number Families',
      subject: 'Mathematics',
      level: 'Children’s House (5-6 yrs) / Elementary',
      albumRef: 'Montessori Mathematics Album, Operations Chapter, pp. 171-174',
      directAim: 'Memorization of basic addition facts with sums between 2 and 18.',
      indirectAims: 'Development of abstract reasoning, self-discipline, and delight in mental math.',
      hots1: 'How does addition compare to multiplication? What happens when we add the same number repeatedly?',
      hots2: 'Using only the 3 and 4 bead bars, how many distinct combinations can you discover to make 12?',
      follow1: 'Solving 10 problems using the Addition Finger Chart and recording results in grid notebook.',
      follow2: 'Creating an illustrated booklet of "Families of 10" (e.g., 1+9, 2+8, 3+7).',
      materials: 'Addition Finger Chart, wooden strips (red and blue), equation booklet, colored pencils.',
      pointOfInterest: 'The meeting point of the two index fingers on the chart to reveal the sum.',
    },
    'lp-sample-2': {
      title: 'Grammar Symbols Introduction: The Noun',
      subject: 'Language',
      level: 'Children’s House (4.5 - 6 yrs)',
      albumRef: 'Montessori Language Album, Morphology Section, pp. 88-92',
      directAim: 'Recognizing the noun as the name of all people, places, and things in the Universe.',
      indirectAims: 'Awareness of sentence architecture, preparation for analytical reading, mental classification.',
      hots1: 'Why do you think Maria Montessori chose a solid black pyramid (like Egyptian pyramids) to symbolize the noun?',
      hots2: 'Can you find three objects in our classroom that do not possess a noun to name them? Is it possible?',
      follow1: 'Labeling 6 items in the environment with slips and placing the black equilateral triangle on top.',
      follow2: 'Designing a poster featuring nouns found in nature through sketches or cutouts.',
      materials: 'Solid wooden black pyramid, plane black triangle symbol, handwritten slips box.',
      pointOfInterest: 'The weight, stillness, and grounding stability of the wooden pyramid in the palm.',
    },
  },
  de: {
    'lp-sample-1': {
      title: 'Memorieren der Addition: Die Zahlenfamilien',
      subject: 'Mathematik',
      level: 'Kinderhaus (5-6 J.) / Primarstufe',
      albumRef: 'Montessori Mathematik-Album, Kapitel Grundrechenarten, S. 171-174',
      directAim: 'Memorieren aller Grundaufgaben der Addition mit Summen von 2 bis 18.',
      indirectAims: 'Entwicklung abstrakten Denkens, Selbstdisziplin und Freude am Kopfrechnen.',
      hots1: 'Wie lässt sich die Addition mit der Multiplikation vergleichen? Was geschieht bei wiederholter Addition?',
      hots2: 'Wenn du nur 3er- und 4er-Perlenstäbchen hast, wie viele Wege findest du zur Zahl 12?',
      follow1: 'Lösen von 10 Aufgaben mit der Additions-Fingertabelle und Eintragen ins Rechenheft.',
      follow2: 'Gestaltung eines eigenen Mini-Buches «Die Familien der Zahl 10» (z.B. 1+9, 2+8, 3+7).',
      materials: 'Additions-Fingertabelle, Holzstreifen (rot und blau), Aufgabensammlung, Buntstifte.',
      pointOfInterest: 'Der Treffpunkt der beiden Zeigefinger auf der Tabelle zur Ermittlung der Summe.',
    },
    'lp-sample-2': {
      title: 'Einführung in die Wortartensymbole: Das Nomen',
      subject: 'Sprache',
      level: 'Kinderhaus (4.5 - 6 J.)',
      albumRef: 'Montessori Sprach-Album, Wortartenlehre, S. 88-92',
      directAim: 'Erkennen des Nomens als Benennung aller Dinge, Lebewesen und Orte im Universum.',
      indirectAims: 'Bewusstsein für Sprachstrukturen, Vorbereitung auf analytisches Lesen, gedankliche Ordnung.',
      hots1: 'Warum wählte Maria Montessori wohl eine feste schwarze Pyramide, um das Nomen zu versinnbildlichen?',
      hots2: 'Findest du drei Gegenstände in unserem Raum, für die es kein Nomen gibt? Ist das denkbar?',
      follow1: 'Beschriften von 6 Gegenständen der Umgebung mit Wortkärtchen und Zuordnen des schwarzen Dreiecks.',
      follow2: 'Erstellen eines Plakates mit Nomen aus der Natur (gezeichnet oder gesammelt).',
      materials: 'Schwarze Holzpyramide, schwarzes gleichseitiges Dreieck, handschriftliche Wortkärtchen.',
      pointOfInterest: 'Das spürbare Gewicht und die ruhige Standfestigkeit der Holzpyramide in den Händen.',
    },
  },
};

/**
 * Returns a translated lesson plan if it is a default sample plan,
 * otherwise returns the user's custom plan unmodified.
 */
export function getLocalizedLessonPlan(plan: LessonPlan, lang: Language): LessonPlan {
  const sampleData = MULTILINGUAL_SAMPLE_LESSONS[lang]?.[plan.id];
  if (sampleData) {
    return {
      ...plan,
      ...sampleData,
    };
  }
  return plan;
}

/**
 * Returns a translated observation if it is the initial sample observation,
 * otherwise returns the user's observation unmodified.
 */
export function getLocalizedObservation(obs: ObservationSession, lang: Language): ObservationSession {
  const currentPhases = UI_TRANSLATIONS[lang]?.obs?.phases;
  const getLocalizedPhaseStr = (phaseStr: string): string => {
    if (!currentPhases) return phaseStr;
    if (phaseStr.includes('1-5') || phaseStr.includes('1–5')) return currentPhases.p1;
    if (phaseStr.includes('6-10') || phaseStr.includes('6–10')) return currentPhases.p2;
    if (phaseStr.includes('11-15') || phaseStr.includes('11–15')) return currentPhases.p3;
    if (phaseStr.includes('16-20') || phaseStr.includes('16–20')) return currentPhases.p4;
    return phaseStr;
  };

  if (obs.id === 'obs-init-1') {
    const defaults = MULTILINGUAL_OBS_DEFAULTS[lang] || MULTILINGUAL_OBS_DEFAULTS.ro;
    return {
      ...obs,
      groupCount: defaults.groupCount,
      weather: defaults.weather,
      phase: (defaults.phase || getLocalizedPhaseStr(obs.phase)) as any,
      notes: defaults.notes,
      reflection: defaults.reflection,
    };
  }

  return {
    ...obs,
    phase: getLocalizedPhaseStr(obs.phase) as any,
  };
}
