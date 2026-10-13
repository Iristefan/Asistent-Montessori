import { Language } from '../i18n/translations';

export interface ManualSection {
  id: string;
  title: string;
  content: string[];
  subsections?: {
    subtitle: string;
    items: string[];
  }[];
}

export interface UserManualContent {
  title: string;
  subtitle: string;
  version: string;
  date: string;
  institution: string;
  author: string;
  intro: string;
  sections: ManualSection[];
}

export const USER_MANUAL_DATA: Record<Language, UserManualContent> = {
  ro: {
    title: 'MANUAL DE UTILIZARE ȘI GHID DE INSTALARE',
    subtitle: 'Aplicația Pedagogică Assistant Montessori (bazat pe principiile modelului educațional Montessori)',
    version: 'Versiunea 2.4 (Ediție Oficială)',
    date: 'Septembrie 2026',
    institution: "L'École des Préalpes • Châtel-St-Denis",
    author: 'Creat de STEC Studio și integrat cu Google Gemini AI Studio',
    intro: 'Acest manual oferă un ghid complet de operare și instalare pentru aplicația Assistant Montessori. Sistemul a fost conceput special pentru asistenți, ghizi și stagiari Montessori, integrând protocolul de 20 de ore de observație practică (bazat pe principiile modelului educațional Montessori), planificarea lecțiilor pe modelul celor 5 elemente, Masa Păcii, dicționarul doctrinar și asistența pedagogică oferită de Google Gemini AI Studio.',
    sections: [
      {
        id: 'install',
        title: '1. GHID DETALIAT DE INSTALARE ȘI ACCES PE DISPOZITIVE',
        content: [
          'Aplicația este construită pe o arhitectură web modernă (Progressive Web Application), permițând utilizarea atât online, cât și offline, pe telefoane inteligente, tablete, laptopuri și calculatoare desktop, fără a necesita descărcare dintr-un magazin de aplicații (App Store sau Google Play).',
        ],
        subsections: [
          {
            subtitle: 'A. Activarea Link-ului Public în Google AI Studio (Prima Oară)',
            items: [
              'În ecranul principal Google AI Studio, priviți în colțul din dreapta-sus al barei de instrumente.',
              'Apăsați butonul „Share” (Partajează) sau „Publish”.',
              'Selectați tipul de partajare dorit (de exemplu: „Anyone with the link” / Oricine are link-ul).',
              'Odată activat, link-ul de tip https://ais-pre-... devine funcțional public și nu va mai genera eroare 404.',
              'Link-ul poate fi transmis colegilor, cadrelor didactice sau salvat pe dispozitivele personale.'
            ],
          },
          {
            subtitle: 'B. Instalarea pe Telefoane și Tablete Android (Google Chrome)',
            items: [
              'Deschideți browserul Google Chrome pe telefon sau tabletă.',
              'Accesați link-ul aplicației.',
              'Apăsați pe pictograma meniului cu trei puncte verticale din colțul din dreapta-sus.',
              'Selectați opțiunea „Adaugă pe ecranul principal” (sau „Instalează aplicația”).',
              'Confirmați instalarea. Pe ecranul telefonului va apărea pictograma dedicată a școlii.',
              'Lansată de pe ecran, aplicația funcționează independent, în modul ecran complet (fără bara de adrese a browserului).'
            ],
          },
          {
            subtitle: 'C. Instalarea pe iPhone și iPad (Apple Safari)',
            items: [
              'Deschideți browserul Safari pe dispozitivul Apple.',
              'Navigați la link-ul aplicației.',
              'Apăsați pe butonul de Partajare (Share) din bara de navigare de jos (pătratul cu săgeată orientată în sus).',
              'Derulați lista de opțiuni și apăsați pe „Adaugă pe ecranul principal” (Add to Home Screen).',
              'Apăsați „Adăugare” în colțul din dreapta-sus.',
              'Aplicația se va comporta nativ, cu acces instantaneu la toate datele salvate.'
            ],
          },
          {
            subtitle: 'D. Instalarea pe Desktop / Laptop (Windows, Mac, Linux cu Chrome / Edge)',
            items: [
              'Deschideți Google Chrome sau Microsoft Edge.',
              'În partea dreaptă a barei de adrese URL, veți vedea o mică pictogramă de instalare (un ecran cu o săgeată în jos).',
              'Apăsați pe pictogramă și alegeți „Instalează Assistant Montessori”.',
              'Aplicația va fi adăugată în meniul Start / Applications și pe desktop, deschizându-se ca o aplicație de sine stătătoare.'
            ],
          },
          {
            subtitle: 'E. Salvarea Datelor și Confidențialitate (Local Storage)',
            items: [
              'Datele introduse (observații, planuri de lecție, sarcini și note) sunt stocate criptat în memoria browserului local (LocalStorage).',
              'Nicio informație sensibilă despre copii nu este trimisă către servere externe sau baze de date publice.',
              'Recomandăm realizarea periodică a unui export prin butonul de Export JSON din modulul Rapoarte pentru salvare de siguranță.'
            ],
          },
        ],
      },
      {
        id: 'hub',
        title: '2. PANOUL DE CONTROL (HUB) ȘI RUTINELE ZILNICE',
        content: [
          'Panoul de Control reprezintă punctul central al activității de zi cu zi în clasa Montessori. Acesta oferă o privire de ansamblu asupra progresului observațiilor, rutinelor de pregătire a mediului și a notițelor rapide.',
        ],
        subsections: [
          {
            subtitle: 'Funcționalități principale ale Hub-ului:',
            items: [
              'Sumar Progres Observații: Afișează numărul de ore de observație acumulate din totalul de 20 de ore (bazat pe principiile modelului educațional Montessori).',
              'Rutinele de Mediu Pregătit: Listă de verificare interactivă (Verificarea materialelor, aranjarea rafturilor, Masa Păcii, plantele clasei, etc.).',
              'Note Rapide de Zi: Posibilitatea de a nota instantaneu comportamente spontane, izbucniri de concentrare sau mici incidente.',
              'Acces Rapid la Rapoarte și Ghiduri: Butoane directe către generarea de fișe oficiale și descărcarea manualului.'
            ],
          },
        ],
      },
      {
        id: 'observation',
        title: '3. PROTOCOLUL DE 20 DE ORE DE OBSERVAȚIE PRACTICĂ (BAZAT PE PRINCIPIILE MODELULUI EDUCAȚIONAL MONTESSORI)',
        content: [
          'Observația științifică, riguroasă și lipsită de prejudecăți este temelia metodei create de Dr. Maria Montessori. Modulul de Observație ghidează asistentul pas cu pas prin cele 4 etape obligatorii:',
        ],
        subsections: [
          {
            subtitle: 'Cele 4 Etape Structurate:',
            items: [
              'Etapa 1 (Orele 1-5): Mediul Pregătit și Aranjarea Materialelor (starea rafturilor, estetica, atractivitatea și ordinea).',
              'Etapa 2 (Orele 6-10): Interacțiunile Sociale și Masa Păcii (cooperarea spontană, grație și curtoazie, rezolvarea disputelor).',
              'Etapa 3 (Orele 11-15): Ciclul de Lucru de 3 Ore și Munca Concentrată (alegerea liberă, repetiția exercițiului, normalizarea).',
              'Etapa 4 (Orele 16-20): Tranziția și Închiderea Zilei (curățarea mediului, refacerea materialelor, ritmul de plecare).'
            ],
          },
          {
            subtitle: 'Instrumente de lucru în modul:',
            items: [
              'Cronometru Integrat: Monitorizează timpul exact al sesiunii de observație.',
              'Ghidaj Deontologic: Recomandări afișate în timp real despre obiectivitate (înregistrarea faptelor, evitarea etichetărilor).',
              'Feedback Pedagogic AI (Gemini): Analizează notițele înregistrate și validează caracterul lor obiectiv, identificând tendințele umane.',
              'Exemple Ghidate: Buton dedicat pentru preîncărcarea exemplelor specifice limbii curente.'
            ],
          },
        ],
      },
      {
        id: 'lesson',
        title: '4. PLANIFICATORUL DE LECȚII PE MODELUL CELOR 5 ELEMENTE',
        content: [
          'Planificatorul structurează orice prezentare Montessori conform celor 5 componente esențiale:',
        ],
        subsections: [
          {
            subtitle: 'Cele 5 Elemente Fundamentale:',
            items: [
              '1. Referință Album Montessori: Specificarea exactă a albumului și paginii (ex. Album Matematică Casa dei Bambini).',
              '2. Scop Direct & Indirect: Claritatea obiectivului imediat (izolarea dificultății) și a pregătirii cognitive pe termen lung.',
              '3. Întrebări de Gândire de Nivel Superior (HOTS): Formulate pe baza taxonomiei Bloom revizuite (Analiză, Evaluare, Sinteză).',
              '4. Activități de Urmare (Follow-up Works): Exerciții de practică repetată și extensii creative / de cercetare.',
              '5. Punct de Interes & Materiale: Elementul senzorial sau mecanic care atrage atenția copilului și asigură controlul erorii.'
            ],
          },
          {
            subtitle: 'Generatorul Inteligent AI:',
            items: [
              'Introduceți titlul lecției și domeniul (Senzorial, Practic, Limbaj, Matematică, Științe).',
              'Apăsați butonul „Generează Fișă cu Gemini AI”.',
              'Algoritmul elaborează instantaneu întreaga structură pedagogică, completând toate cele 5 secțiuni.'
            ],
          },
        ],
      },
      {
        id: 'peace',
        title: '5. MASA PĂCII ȘI GESTIONAREA COMPORTAMENTULUI',
        content: [
          'Masa Păcii este spațiul fizic și simbolic din clasă destinat rezolvării pașnice, autonome și empatice a oricărui conflict apărut între copii.',
        ],
        subsections: [
          {
            subtitle: 'Protocolul de Mediere în 4 Pași:',
            items: [
              'Pasul 1: Luarea Trandafirului Păcii (cel care ține simbolul vorbește, celălalt ascultă în liniște).',
              'Pasul 2: Exprimarea Sentimentelor folosind formula: „M-am simțit... când tu ai...”.',
              'Pasul 3: Ascultarea Activă și Oglindirea: „Am auzit că te-ai simțit...”.',
              'Pasul 4: Acordul Reciproc și Reconcilierea (strângere de mână, îmbrățișare sau revenirea senină la lucru).'
            ],
          },
          {
            subtitle: 'Instrumente de suport emoțional:',
            items: [
              'Clepsidra cu nisip pentru reglare senzorială.',
              'Clopoțelul mindfulness pentru revenirea atenției.',
              'Piatra calmului pentru descărcarea tensiunii tactile.'
            ],
          },
        ],
      },
      {
        id: 'dict',
        title: '6. DICȚIONARUL DOCTRINAR MONTESSORI',
        content: [
          'Dicționarul conține definițiile autorizate ale conceptelor centrale din pedagogia Mariei Montessori, structurate pe categorii fundamentale:',
        ],
        subsections: [
          {
            subtitle: 'Concepte doctrinare incluse:',
            items: [
              'Mintea Absorbantă (Absorbent Mind) — capacitatea unică a copilului mic de a asimila mediul fără efort.',
              'Perioadele Senzitive — ferestre temporare de oportunitate maximă de învățare (ordine, mișcare, limbaj).',
              'Normalizarea — starea de armonie, concentrare și liniște interioară atinsă prin muncă semnificativă.',
              'Controlul Erorii — mecanismul încorporat în material care îi permite copilului să se autocorecteze.',
              'Grație și Curtoazie — lecțiile zilnice de etichetă socială și respect comunitar.'
            ],
          },
        ],
      },
      {
        id: 'ai',
        title: '7. CONSULTANTUL PEDAGOGIC AI MONTESSORI',
        content: [
          'Modulul de asistență AI pune la dispoziția cadrului didactic un consultant virtual instruit exclusiv, bazat pe principiile modelului educațional Montessori.',
        ],
        subsections: [
          {
            subtitle: 'Exemple de utilizare practică:',
            items: [
              'Consiliere pentru copiii cu dificultăți de atenție sau descărcări motorii.',
              'Recomandări pentru adaptarea mediului pregătit la început de an școlar.',
              'Formularea răspunsurilor pentru părinți privind ritmul de dezvoltare al copilului.',
              'Strategii de re-prezentare a materialelor atunci când copilul le evită.'
            ],
          },
        ],
      },
      {
        id: 'reports',
        title: '8. CENTRUL DE RAPOARTE ȘI EXPORTURI OFICIALE',
        content: [
          'Centrul de Rapoarte centralizează documentația pedagogică a clasei și oferă formate conforme, bazat pe principiile modelului educațional Montessori și dosarele școlii.',
        ],
        subsections: [
          {
            subtitle: 'Tipuri de documente disponibile:',
            items: [
              'Fișă Individuală de Observație Practică: cuprinde datele sesiunii, mediul, notițele factuale și reflecția.',
              'Fișă de Prezentare Lecție: fișa completă pe cele 5 elemente de planificare, pregătită pentru dosarul de album.',
              'Raport Săptămânal de Sinteză: include stadiul orelor efectuate, sinteza activităților și semnăturile coordonatorilor.'
            ],
          },
          {
            subtitle: 'Antetul Oficial:',
            items: [
              'Include denumirea școlii: L\'École des Préalpes (Châtel-St-Denis).',
              'Adresa și datele de contact structurate pe două rânduri clare.',
              'Sigla oficială și elementele grafice de identitate instituțională.'
            ],
          },
        ],
      },
    ],
  },

  fr: {
    title: "GUIDE D'UTILISATION ET MANUEL D'INSTALLATION",
    subtitle: "Application Pédagogique Assistant Montessori (basée sur les principes du modèle éducatif Montessori)",
    version: "Version 2.4 (Édition Officielle)",
    date: "Septembre 2026",
    institution: "L'École des Préalpes • Châtel-St-Denis",
    author: "Créé par STEC Studio et intégré avec Google Gemini AI Studio",
    intro: "Ce manuel offre un guide complet d'utilisation et d'installation pour l'application Assistant Montessori. L'outil est spécialement conçu pour les assistants, éducateurs et stagiaires Montessori, intégrant le protocole officiel de 20 heures d'observation pratique (basé sur les principes du modèle éducatif Montessori), la planification en 5 éléments, la Table de la Paix, le dictionnaire doctrinal et l'assistance pédagogique Gemini AI.",
    sections: [
      {
        id: 'install',
        title: "1. GUIDE D'INSTALLATION ET D'ACCÈS SUR TOUS LES APPAREILS",
        content: [
          "L'application est une application web progressive (PWA) de pointe, accessible sur ordinateurs, tablettes et téléphones intelligents sans avoir besoin de passer par un magasin d'applications propriétaire.",
        ],
        subsections: [
          {
            subtitle: "A. Activation du lien public dans Google AI Studio",
            items: [
              "Dans l'écran Google AI Studio, localisez le bouton « Partager » (Share) en haut à droite.",
              "Sélectionnez le niveau d'accès souhaité (par exemple : « Tout le monde ayant le lien » / Anyone with the link).",
              "Une fois activé, le lien public https://ais-pre-... devient permanent et opérationnel sans erreur 404.",
              "Partagez ce lien avec l'équipe pédagogique ou sauvegardez-le dans vos favoris."
            ],
          },
          {
            subtitle: "B. Installation sur Android (Google Chrome)",
            items: [
              "Ouvrez Google Chrome sur votre appareil Android et accédez au lien de l'application.",
              "Appuyez sur le menu avec trois points verticaux en haut à droite.",
              "Choisissez « Ajouter à l'écran d'accueil » ou « Installer l'application ».",
              "Validez. L'icône de l'école apparaîtra sur votre écran d'accueil.",
              "L'application s'ouvrira en plein écran, offrant une fluidité équivalente à une application native."
            ],
          },
          {
            subtitle: "C. Installation sur iPhone et iPad (Apple Safari)",
            items: [
              "Ouvrez Safari sur votre iPhone ou iPad et entrez l'adresse de l'application.",
              "Appuyez sur le bouton Partager en bas (l'icône d'un carré avec une flèche vers le haut).",
              "Faites défiler vers le bas et sélectionnez « Sur l'écran d'accueil » (Add to Home Screen).",
              "Appuyez sur « Ajouter » en haut à droite.",
              "L'application sera accessible instantanément depuis votre écran d'accueil Apple."
            ],
          },
          {
            subtitle: "D. Installation sur Ordinateur de Bureau / Laptop (Chrome / Edge)",
            items: [
              "Ouvrez le lien dans Google Chrome ou Microsoft Edge sur votre ordinateur.",
              "Cliquez sur la petite icône d'installation située à droite de la barre d'adresse.",
              "Cliquez sur « Installer Assistant Montessori ».",
              "L'application est ajoutée à votre bureau et à votre menu d'applications."
            ],
          },
          {
            subtitle: "E. Sauvegarde des Données et Confidentialité (LocalStorage)",
            items: [
              "Toutes les observations, fiches de leçons et notes sont enregistrées localement dans votre navigateur (LocalStorage).",
              "Aucune donnée confidentielle d'enfant n'est transmise à un serveur public tiers.",
              "Utilisez régulièrement la fonction d'export JSON du Centre de Rapports pour archiver vos données."
            ],
          },
        ],
      },
      {
        id: 'hub',
        title: "2. TABLEAU DE BORD (HUB) ET ROUTINES QUOTIDIENNES",
        content: [
          "Le Hub constitue le cœur opérationnel de la classe Montessori. Il permet de superviser l'état de l'ambiance, les routines et les notes cliniques.",
        ],
        subsections: [
          {
            subtitle: "Éléments clés :",
            items: [
              "Suivi des 20 Heures : Visualisation en temps réel du quota d'observation réalisé.",
              "Routines de l'Ambiance Préparée : Contrôle des étagères, propreté, plantes, Table de la Paix.",
              "Notes Rapides : Enregistrement spontané des étincelles de concentration ou interactions notables.",
              "Accès direct aux exports PDF et fiches officielles."
            ],
          },
        ],
      },
      {
        id: 'observation',
        title: "3. PROTOCOLE DES 20 HEURES D'OBSERVATION PRATIQUE (BASÉ SUR LES PRINCIPES DU MODÈLE ÉDUCATIF MONTESSORI)",
        content: [
          "L'observation scientifique et bienveillante sans jugement est la pierre angulaire de la méthode Montessori.",
        ],
        subsections: [
          {
            subtitle: "Les 4 Phases Pédagogiques :",
            items: [
              "Phase 1 (Heures 1-5) : L'Ambiance Préparée et l'Agencement du Matériel.",
              "Phase 2 (Heures 6-10) : Les Interactions Sociales et la Table de la Paix.",
              "Phase 3 (Heures 11-15) : Le Grand Cycle de Travail de 3 Heures et la Normalisation.",
              "Phase 4 (Heures 16-20) : Les Transitions et la Fermeture de la Journée."
            ],
          },
          {
            subtitle: "Outils intégrés :",
            items: [
              "Chronomètre de session avec enregistrement direct de la durée.",
              "Feedback Pédagogique IA : Validation de l'objectivité, basée sur les principes du modèle éducatif Montessori.",
              "Chargement d'exemples guidés en français."
            ],
          },
        ],
      },
      {
        id: 'lesson',
        title: "4. PLANIFICATEUR DE LEÇONS EN 5 ÉLÉMENTS",
        content: [
          "Ce module structure chaque présentation selon la méthodologie reconnue des 5 éléments.",
        ],
        subsections: [
          {
            subtitle: "Les 5 Éléments Fondamentaux :",
            items: [
              "1. Référence d'Album Montessori (page et volume précis).",
              "2. But Direct (Direct Aim) & Buts Indirects (Indirect Aims).",
              "3. Questions de Pensée Supérieure (HOTS - Taxonomie de Bloom).",
              "4. Travaux de Suivi (Follow-up Works - répétition et extension créative).",
              "5. Point d'Intérêt & Matériel Requis (contrôle de l'erreur intégré)."
            ],
          },
          {
            subtitle: "Générateur Intelligent Gemini AI :",
            items: [
              "Génération instantanée de la fiche complète en français d'un simple clic."
            ],
          },
        ],
      },
      {
        id: 'peace',
        title: "5. TABLE DE LA PAIX ET GESTION BIENVEILLANTE DU COMPORTEMENT",
        content: [
          "La Table de la Paix permet la résolution autonome et sereine des différends entre les enfants.",
        ],
        subsections: [
          {
            subtitle: "Protocole en 4 Étapes :",
            items: [
              "1. Prendre la Rose de la Paix (celui qui tient la rose s'exprime, l'autre écoute).",
              "2. Exprimer ses émotions (« Je me suis senti... lorsque tu as... »).",
              "3. Écoute active et reformulation bienveillante.",
              "4. Accord mutuel et retour au travail dans la sérénité."
            ],
          },
        ],
      },
      {
        id: 'dict',
        title: "6. DICTIONNAIRE DOCTRINAL MONTESSORI",
        content: [
          "Glossaire complet des concepts fondamentaux : Esprit Absorbant, Périodes Sensibles, Normalisation, Liberté dans le cadre, Grâce et Courtoisie, etc.",
        ],
      },
      {
        id: 'ai',
        title: "7. CONSULTANT PÉDAGOGIQUE GEMINI AI",
        content: [
          "Assistant virtuel expert formé selon la littérature spécialisée, basé sur les principes du modèle éducatif Montessori.",
        ],
      },
      {
        id: 'reports',
        title: "8. CENTRE DE RAPPORTS ET EXPORTS OFFICIELS",
        content: [
          "Génération de fiches officielles au format A4 avec en-tête institutionnel complet de L'École des Préalpes (Châtel-St-Denis), prêtes à être imprimées ou enregistrées en PDF.",
        ],
      },
    ],
  },

  en: {
    title: "USER MANUAL AND INSTALLATION GUIDE",
    subtitle: "Assistant Montessori Pedagogical Application (based on the principles of the Montessori educational model)",
    version: "Version 2.4 (Official Edition)",
    date: "September 2026",
    institution: "L'École des Préalpes • Châtel-St-Denis",
    author: "Created by STEC Studio and integrated with Google Gemini AI Studio",
    intro: "This manual provides comprehensive operational and installation instructions for the Assistant Montessori application. Tailored for Montessori assistants, guides, and trainees, it integrates the 20-Hour Observation Protocol (based on the principles of the Montessori educational model), the 5-Element Lesson Planning model, the Peace Table, doctrinal dictionary, and Google Gemini AI pedagogical coaching.",
    sections: [
      {
        id: 'install',
        title: "1. COMPREHENSIVE INSTALLATION & DEVICE ACCESS GUIDE",
        content: [
          "The application operates as an advanced Progressive Web App (PWA), providing native-like performance across Android, iOS, Windows, and macOS devices without requiring app store downloads.",
        ],
        subsections: [
          {
            subtitle: "A. Activating the Public Shared Link in Google AI Studio",
            items: [
              "In the Google AI Studio interface, locate the «Share» or «Publish» button at the top-right header.",
              "Select your desired access permission (e.g., «Anyone with the link»).",
              "Once confirmed, the public https://ais-pre-... URL becomes permanently live and will not produce a 404 error.",
              "Bookmark the link or share it with fellow teachers and administrators."
            ],
          },
          {
            subtitle: "B. Installing on Android Devices (Google Chrome)",
            items: [
              "Open Google Chrome on your Android smartphone or tablet.",
              "Navigate to your shared application URL.",
              "Tap the three-dot menu icon in the upper-right corner.",
              "Select «Add to Home screen» or «Install app».",
              "Confirm installation; the custom school icon will appear on your app grid.",
              "The app will launch in standalone full-screen mode."
            ],
          },
          {
            subtitle: "C. Installing on iPhone & iPad (Apple Safari)",
            items: [
              "Open Safari on your iOS device and access the app link.",
              "Tap the Share button at the bottom navigation bar (square with an upward arrow).",
              "Scroll down and tap «Add to Home Screen».",
              "Tap «Add» in the upper right.",
              "Enjoy instant offline-ready access from your iOS home screen."
            ],
          },
          {
            subtitle: "D. Installing on Desktop Computers (Chrome / Edge)",
            items: [
              "Open the URL in Google Chrome or Microsoft Edge on your computer.",
              "Click the install icon located on the right side of the browser address bar.",
              "Click «Install Assistant Montessori».",
              "The app runs in its own window with dedicated desktop and start menu shortcuts."
            ],
          },
          {
            subtitle: "E. Data Storage & Privacy (LocalStorage)",
            items: [
              "All observations, lessons, and routines are securely saved in your browser's LocalStorage.",
              "No private student information is transmitted to unauthorized third-party databases.",
              "Use the JSON Export feature in the Report Center for scheduled offline backups."
            ],
          },
        ],
      },
      {
        id: 'hub',
        title: "2. CLASSROOM DASHBOARD (HUB) & DAILY ROUTINES",
        content: [
          "The Hub is your daily mission control, offering live observation progress metrics, environment preparation checklists, and rapid note taking.",
        ],
        subsections: [
          {
            subtitle: "Key Highlights:",
            items: [
              "20-Hour Progress Tracker: Visual indicator of completed observation hours (based on the principles of the Montessori educational model).",
              "Prepared Environment Routines: Interactive daily checklist (shelf readiness, botany care, Peace Table).",
              "Quick Notes: Rapid clinical documentation of student concentration and milestones.",
              "Direct access to PDF reports and user guide downloads."
            ],
          },
        ],
      },
      {
        id: 'observation',
        title: "3. 20-HOUR PRACTICAL OBSERVATION PROTOCOL (BASED ON THE PRINCIPLES OF THE MONTESSORI EDUCATIONAL MODEL)",
        content: [
          "Scientific, objective, non-judgmental observation is the core foundation of Montessori education.",
        ],
        subsections: [
          {
            subtitle: "The 4 Structured Phases:",
            items: [
              "Phase 1 (Hours 1-5): The Prepared Environment & Material Arrangement.",
              "Phase 2 (Hours 6-10): Social Interactions & The Peace Table.",
              "Phase 3 (Hours 11-15): The 3-Hour Work Cycle & Deep Concentration.",
              "Phase 4 (Hours 16-20): Transitions & End-of-Day Closure."
            ],
          },
          {
            subtitle: "Integrated Tools:",
            items: [
              "Built-in Session Timer with exact duration recording.",
              "Gemini AI Pedagogical Feedback: Validates factual neutrality, based on the principles of the Montessori educational model.",
              "Preloaded English guided observation examples."
            ],
          },
        ],
      },
      {
        id: 'lesson',
        title: "4. 5-ELEMENT LESSON PLANNER",
        content: [
          "Designs comprehensive Montessori presentations following the structured 5-element framework.",
        ],
        subsections: [
          {
            subtitle: "The 5 Core Elements:",
            items: [
              "1. Montessori Album Reference (volume and page number).",
              "2. Direct Aim & Indirect Aims (isolating the difficulty and long-term cognitive synthesis).",
              "3. Higher Order Thinking Skills (HOTS) questions based on Bloom's revised taxonomy.",
              "4. Follow-up Works (repetitive practice and creative research extension).",
              "5. Point of Interest & Required Materials (built-in mechanical or sensory control of error)."
            ],
          },
          {
            subtitle: "Gemini AI Smart Generator:",
            items: [
              "Generates a complete, structured Montessori lesson plan in seconds."
            ],
          },
        ],
      },
      {
        id: 'peace',
        title: "5. PEACE TABLE & RESTORATIVE BEHAVIOR PROTOCOL",
        content: [
          "The Peace Table is the designated classroom space for autonomous conflict resolution and restorative communication.",
        ],
        subsections: [
          {
            subtitle: "The 4-Step Peace Resolution Protocol:",
            items: [
              "Step 1: Hold the Peace Rose (speaker holds the rose; peer listens silently).",
              "Step 2: Express Feelings using «I felt... when you...».",
              "Step 3: Active Listening and empathetic mirroring.",
              "Step 4: Mutual Agreement & Restoration (peaceful handshake or return to work)."
            ],
          },
        ],
      },
      {
        id: 'dict',
        title: "6. MONTESSORI DOCTRINAL DICTIONARY",
        content: [
          "Authoritative glossary covering key concepts: Absorbent Mind, Sensitive Periods, Normalization, Freedom within Limits, Grace and Courtesy, Control of Error.",
        ],
      },
      {
        id: 'ai',
        title: "7. GEMINI AI PEDAGOGICAL CONSULTANT",
        content: [
          "AI advisory agent specialized in guiding classroom dynamics, based on the principles of the Montessori educational model.",
        ],
      },
      {
        id: 'reports',
        title: "8. OFFICIAL REPORT CENTER & PDF EXPORTS",
        content: [
          "Generates publication-quality A4 reports with L'École des Préalpes institution branding, ready for print or PDF archiving.",
        ],
      },
    ],
  },

  de: {
    title: "BENUTZERHANDBUCH UND INSTALLATIONSANLEITUNG",
    subtitle: "Pädagogische Anwendung Assistant Montessori (basierend auf den Prinzipien des Montessori-Bildungsmodells)",
    version: "Version 2.4 (Offizielle Ausgabe)",
    date: "September 2026",
    institution: "L'École des Préalpes • Châtel-St-Denis",
    author: "Erstellt von STEC Studio und integriert mit Google Gemini AI Studio",
    intro: "Dieses Handbuch bietet eine umfassende Anleitung für die Nutzung und Installation der Anwendung Assistant Montessori. Das System unterstützt Montessori-Assistenten, Pädagogen und Praktikanten mit dem 20-Stunden-Beobachtungsprotokoll (basierend auf den Prinzipien des Montessori-Bildungsmodells), der 5-Elemente-Lektionsplanung, dem Friedenstisch, dem Doktrin-Wörterbuch und pädagogischer KI-Unterstützung.",
    sections: [
      {
        id: 'install',
        title: "1. DETAILLIERTE INSTALLATIONS- UND ZUGRIFFSANLEITUNG",
        content: [
          "Die Anwendung ist als moderne Progressive Web App (PWA) konzipiert und kann ohne App-Store-Download auf Smartphones, Tablets und PCs genutzt werden.",
        ],
        subsections: [
          {
            subtitle: "A. Aktivierung des öffentlichen Links in Google AI Studio",
            items: [
              "Klicken Sie in Google AI Studio oben rechts auf die Schaltfläche «Share» (Teilen) bzw. «Publish».",
              "Wählen Sie die gewünschte Zugriffsebene (z. B. «Anyone with the link» / Jeder mit dem Link).",
              "Nach der Freigabe ist der Link https://ais-pre-... dauerhaft erreichbar und liefert keinen 404-Fehler mehr.",
              "Speichern Sie den Link als Lesezeichen oder leiten Sie ihn an Ihr Team weiter."
            ],
          },
          {
            subtitle: "B. Installation auf Android-Geräten (Google Chrome)",
            items: [
              "Öffnen Sie Google Chrome auf Ihrem Android-Gerät und rufen Sie den Link auf.",
              "Tippen Sie oben rechts auf das Drei-Punkte-Menü.",
              "Wählen Sie «Zum Startbildschirm hinzufügen» oder «App installieren».",
              "Bestätigen Sie den Vorgang. Das Schulsymbol erscheint nun auf Ihrem Startbildschirm.",
              "Die App öffnet sich nahtlos im Vollbildmodus wie eine native App."
            ],
          },
          {
            subtitle: "C. Installation auf iPhone & iPad (Apple Safari)",
            items: [
              "Öffnen Sie Safari auf Ihrem Apple-Gerät und rufen Sie die Adresse auf.",
              "Tippen Sie unten auf das Teilen-Symbol (Viereck mit Pfeil nach oben).",
              "Wählen Sie «Zum Home-Bildschirm» (Add to Home Screen).",
              "Tippen Sie oben rechts auf «Hinzufügen».",
              "Die App steht nun direkt auf Ihrem iOS-Home-Bildschirm bereit."
            ],
          },
          {
            subtitle: "D. Installation auf Desktop-Computern (Chrome / Edge)",
            items: [
              "Öffnen Sie die Seite in Chrome oder Edge.",
              "Klicken Sie rechts in der Adressleiste auf das Installationssymbol (Bildschirm mit Pfeil nach unten).",
              "Klicken Sie auf «Assistant Montessori installieren».",
              "Die App wird als eigenständiges Programm auf Ihrem Rechner eingerichtet."
            ],
          },
          {
            subtitle: "E. Datenspeicherung & Datenschutz (LocalStorage)",
            items: [
              "Alle Daten werden sicher im lokalen Speicher Ihres Browsers (LocalStorage) hinterlegt.",
              "Sensible Schülerdaten werden nicht an externe Server übertragen.",
              "Nutzen Sie regelmäßig die JSON-Exportfunktion für manuelle Datensicherungen."
            ],
          },
        ],
      },
      {
        id: 'hub',
        title: "2. KONTROLLZENTRUM (HUB) & TÄGLICHE ROUTINEN",
        content: [
          "Das Hub bietet einen schnellen Überblick über Beobachtungsstunden, Vorbereitungsroutinen und spontane Notizen.",
        ],
        subsections: [
          {
            subtitle: "Hauptfunktionen:",
            items: [
              "20-Stunden-Fortschrittsanzeige (basierend auf den Prinzipien des Montessori-Bildungsmodells).",
              "Checkliste für die vorbereitete Umgebung (Regalordnung, Friedenstisch, Pflege).",
              "Schnelle Notizen für spontane Konzentrationsphasen.",
              "Direkter Zugriff auf PDF-Berichte und das Benutzerhandbuch."
            ],
          },
        ],
      },
      {
        id: 'observation',
        title: "3. 20-STUNDEN-BEOBACHTUNGSPROTOKOLL (BASIEREND AUF DEN PRINZIPIEN DES MONTESSORI-BILDUNGSMODELLS)",
        content: [
          "Objektive, wissenschaftliche und wertfreie Beobachtung ist das Fundament der Montessori-Pädagogik.",
        ],
        subsections: [
          {
            subtitle: "Die 4 Phasen der Beobachtung:",
            items: [
              "Phase 1 (Stunden 1-5): Die Vorbereitete Umgebung & Materialanordnung.",
              "Phase 2 (Stunden 6-10): Soziale Interaktionen & Friedenstisch.",
              "Phase 3 (Stunden 11-15): Der 3-Stunden-Arbeitszyklus & tiefe Konzentration.",
              "Phase 4 (Stunden 16-20): Übergänge & Tagesabschluss."
            ],
          },
        ],
      },
      {
        id: 'lesson',
        title: "4. 5-ELEMENTE-LEKTIONSPLANER",
        content: [
          "Strukturierte Vorbereitung jeder Montessori-Darbietung nach den 5 Elementen:",
        ],
        subsections: [
          {
            subtitle: "Die 5 Kernelemente:",
            items: [
              "1. Album-Referenz (präzise Quellenangabe).",
              "2. Direktes Ziel & Indirekte Ziele.",
              "3. Höhere Denkfragen (HOTS - nach Bloom).",
              "4. Folgearbeiten (Wiederholungs- und Forschungsarbeiten).",
              "5. Interessenspunkt & Benötigte Materialien (interne Fehlerkontrolle)."
            ],
          },
        ],
      },
      {
        id: 'peace',
        title: "5. FRIEDENSTISCH & KONFLIKTLÖSUNG",
        content: [
          "Der Friedenstisch ermöglicht die autonome und friedliche Schlichtung von Konflikten unter Kindern nach einem 4-Stufen-Protokoll (Friedensrose, Gefühle benennen, Aktives Zuhören, Einigung).",
        ],
      },
      {
        id: 'dict',
        title: "6. MONTESSORI-DOKTRIN-WÖRTERBUCH",
        content: [
          "Definitionen aller Schlüsselbegriffe: Absorbierender Geist, Sensible Phasen, Normalisation, Freiheit in Grenzen, Fehlerkontrolle, etc.",
        ],
      },
      {
        id: 'ai',
        title: "7. PÄDAGOGISCHER GEMINI KI-BERATER",
        content: [
          "Spezialisierter KI-Assistent für Beratung bei didaktischen und verhaltensbezogenen Fragen, basierend auf den Prinzipien des Montessori-Bildungsmodells.",
        ],
      },
      {
        id: 'reports',
        title: "8. BERICHTSZENTRUM & OFFIZIELLE PDF-EXPORTE",
        content: [
          "Druckfertige Berichte im A4-Format mit dem offiziellen Briefkopf von L'École des Préalpes (Châtel-St-Denis).",
        ],
      },
    ],
  },
};
