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
  ageGroup: string;
  level: string;
  duration: string;
  materials: string;
  pointOfInterest: string;
  directAim: string;
  indirectAim: string;
  procedure: string;
  followUpWork: string;
  crossCurricular: string;
  albumRef?: string;
  indirectAims?: string;
  hots1?: string;
  hots2?: string;
  follow1?: string;
  follow2?: string;
}> = {
  ro: {
    title: 'Memorarea Adunării: Familiile de Numere',
    subject: 'Matematică',
    ageGroup: 'Casa dei Bambini (4.5 – 6 ani)',
    level: 'Casa dei Bambini (4.5 – 6 ani)',
    duration: '15 – 20 minute',
    materials: 'Tabla degetelor pentru adunare, benzi de lemn (roșii și albastre), carnet cu ecuații, creioane colorate.',
    pointOfInterest: 'Punctul de întâlnire al celor două degete pe tablă pentru găsirea sumei exacte.',
    directAim: 'Memorarea combinațiilor fundamentale ale adunării cu sume între 2 și 18.',
    indirectAim: 'Dezvoltarea raționamentului abstract, autodisciplina și plăcerea calculului mental spontan.',
    procedure: '• Invitație: Ghidul invită 1-2 copii la covoraș pentru explorarea familiilor de numere.\n• Pregătire: Aducerea tăvii cu tabla adunării și a benzilor de lemn pe covorașul de lucru.\n• Prezentare demonstrativă: Ghidul așază banda albastră (ex: 4) și banda roșie (ex: 6). Arată cum capătul benzii indică suma 10.\n• Controlul erorii: Numărarea pătrățelelor de pe banda superioară sau consultarea tabelei de control.\n• Încheiere: Copilul notează operația pe carnet, iar materialele sunt aranjate în ordine și returnate la raft.',
    followUpWork: '• Rezolvarea a 10 operații cu tabla degetelor pentru adunare și notarea lor pe carnetul cu pătrățele.\n• Crearea propriei cărticele ilustrate cu «Familiile Numărului 10» (ex: 1+9, 2+8, 3+7 etc.).',
    crossCurricular: '• Conexiune cu Arta: Desenarea unui copac al numerelor unde ramurile reprezintă perechile ce formează 10.\n• Conexiune cu Științele Naturale: Numărarea și sortarea frunzelor din grădină în perechi de zece.',
    albumRef: '',
    indirectAims: 'Dezvoltarea raționamentului abstract și calculul mental.',
    hots1: 'Cum ne ajută alinierea pe coloane?',
    hots2: 'Ce s-ar întâmpla dacă începem de la zeci?',
    follow1: 'Rezolvarea a 10 operații pe carnet.',
    follow2: 'Cărticică ilustrată cu Familiile lui 10.',
  },
  fr: {
    title: 'Mémorisation de l’Addition : Les Familles de Nombres',
    subject: 'Mathématiques',
    ageGroup: 'Maison des Enfants (4.5 – 6 ans)',
    level: 'Maison des Enfants (4.5 – 6 ans)',
    duration: '15 – 20 minutes',
    materials: 'Tableau des doigts pour l’addition, bandes de bois (rouges et bleues), carnet d’équations, crayons.',
    pointOfInterest: 'Le point de rencontre des deux index sur la grille pour découvrir la somme exacte.',
    directAim: 'Mémorisation des combinaisons essentielles de l’addition avec sommes entre 2 et 18.',
    indirectAim: 'Développement de l’abstraction, autodiscipline et joie du calcul mental spontané.',
    procedure: '• Invitation : Le guide invite l’enfant au tapis pour explorer les familles de nombres.\n• Préparation : Transport doux du plateau avec le tableau et les réglettes de bois.\n• Présentation : Le guide place la réglette bleue (ex: 4) puis la rouge (ex: 6) et montre le total 10.\n• Contrôle de l’erreur : Vérification sur la grille de contrôle n° 1.\n• Clôture : Notation sur le livret personnel et retour soigneux du matériel sur l’étagère.',
    followUpWork: '• Résolution de 10 opérations avec le tableau des doigts et notation sur cahier quadrillé.\n• Création d’un livret illustré des « Familles du Nombre 10 ».',
    crossCurricular: '• Lien Artistique : Dessin de l’arbre des nombres avec feuilles par paires de dix.\n• Lien Botanique : Comptage et regroupement de feuilles ramassées dans le parc.',
    albumRef: '',
    indirectAims: 'Développement de l’ordre mental et rigueur mathématique.',
    hots1: 'Comment compares-tu l’addition à la multiplication ?',
    hots2: 'Combien de façons trouves-tu pour atteindre 12 ?',
    follow1: 'Résolution de 10 opérations sur cahier.',
    follow2: 'Livret des Familles du Nombre 10.',
  },
  en: {
    title: 'Addition Fact Memorization: Number Families',
    subject: 'Mathematics',
    ageGroup: 'Children’s House (4.5 – 6 yrs)',
    level: 'Children’s House (4.5 – 6 yrs)',
    duration: '15 – 20 minutes',
    materials: 'Addition Finger Chart, wooden strips (red and blue), equation booklet, colored pencils.',
    pointOfInterest: 'The meeting point of the two index fingers on the chart grid discovering the exact sum.',
    directAim: 'Memorization of basic addition facts with sums between 2 and 18.',
    indirectAim: 'Development of abstract mathematical reasoning, self-discipline, and spontaneous mental math.',
    procedure: '• Invitation: The Guide invites the child to roll a mat for an addition exploration.\n• Preparation: Carrying the chart board and strip box with two hands to the work area.\n• Demonstration: The Guide places the blue strip (e.g., 4) and red strip (e.g., 6) pointing out the sum 10.\n• Control of Error: Counting squares on the top ledger or verifying with Control Chart 1.\n• Conclusion: The child records combinations in their booklet, then returns material to shelf.',
    followUpWork: '• Solving 10 equations using the Finger Chart and recording in a grid math notebook.\n• Creating an illustrated booklet of "Number 10 Families".',
    crossCurricular: '• Art Connection: Drawing a number family tree with leaves grouped in pairs of 10.\n• Botany Connection: Classifying and pairing garden seeds into sets of ten.',
    albumRef: '',
    indirectAims: 'Mathematical precision and mental calculation.',
    hots1: 'How does columnar alignment prevent errors?',
    hots2: 'What happens if we begin from tens instead of units?',
    follow1: 'Solving 10 problems on grid paper.',
    follow2: 'Illustrated booklet of Number 10 Families.',
  },
  de: {
    title: 'Memorieren der Addition: Die Zahlenfamilien',
    subject: 'Mathematik',
    ageGroup: 'Kinderhaus (4.5 – 6 J.)',
    level: 'Kinderhaus (4.5 – 6 J.)',
    duration: '15 – 20 Minuten',
    materials: 'Additions-Fingerkartei, Holzstreifen (rot und blau), Gleichungsheft, Farbstifte.',
    pointOfInterest: 'Der Treffpunkt der beiden Zeigefinger auf dem Raster zur Ermittlung der Summe.',
    directAim: 'Memorieren der grundlegenden Additionsaufgaben mit Summen zwischen 2 und 18.',
    indirectAim: 'Entwicklung der Abstraktionsfähigkeit, Selbstdisziplin und Freude am Kopfrechnen.',
    procedure: '• Einladung: Die Lehrkraft lädt 1-2 Kinder an den Arbeitsteppich ein.\n• Vorbereitung: Behutsames Holen des Tabletts mit der Additionskartei und den Streifen.\n• Darbietung: Die Lehrkraft legt den blauen Streifen (z.B. 4) und den roten (z.B. 6) an und zeigt Summe 10.\n• Fehlerkontrolle: Abzählen der Felder auf der oberen Leiste oder Kontrolltafel 1.\n• Abschluss: Kind notiert Aufgaben im Heft, räumt Material ordentlich ins Regal zurück.',
    followUpWork: '• Lösen von 10 Aufgaben mit der Fingerkartei und Eintragung im Rechenheft.\n• Erstellen eines eigenen Mini-Büchleins «Zahlenfamilien der 10».',
    crossCurricular: '• Kunst-Verbindung: Malen eines Zahlenbaums mit Blätterpaaren der 10.\n• Naturkunde: Sammeln und Bündeln von Waldfrüchten in Zehnerpaaren.',
    albumRef: '',
    indirectAims: 'Förderung der inneren Ordnung und mathematischen Genauigkeit.',
    hots1: 'Wie hilft die stellenwertgerechte Anordnung?',
    hots2: 'Was passiert beim Beginn bei den Zehnern?',
    follow1: 'Lösen von 10 Aufgaben im Heft.',
    follow2: 'Mini-Büchlein der Zahlenfamilien.',
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
