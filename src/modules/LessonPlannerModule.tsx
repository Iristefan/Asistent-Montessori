import React, { useState, useEffect } from 'react';
import { InstitutionConfig, LessonPlan } from '../types';
import { Language, UI_TRANSLATIONS } from '../i18n/translations';
import { MULTILINGUAL_LESSON_FORM_DEFAULTS, getLocalizedLessonPlan } from '../data/multilingualDefaults';
import {
  FileText,
  Sparkles,
  Printer,
  Plus,
  BookOpen,
  Calendar,
  CheckCircle2,
  Trash2,
  Lightbulb,
  Loader2,
  RotateCcw,
  Compass,
  Clock,
  Target,
  ListOrdered,
  ArrowRight,
  Edit3,
  BookmarkCheck,
  Search,
  Download,
  ChevronDown,
  ChevronUp,
  Layers,
  Baby,
  Sun,
  Globe,
  GraduationCap,
} from 'lucide-react';
import { SpeechToTextButton } from '../components/SpeechToTextButton';
import { AutoResizeTextarea } from '../components/AutoResizeTextarea';
import { exportLessonPlanToPdf } from '../utils/reportPdfExport';

interface LessonPlannerModuleProps {
  lessonPlans: LessonPlan[];
  onAddLessonPlan: (plan: LessonPlan) => void;
  onDeleteLessonPlan: (id: string) => void;
  institution: InstitutionConfig;
  onOpenPrint: () => void;
  lang: Language;
}

// Weekly schedule
const MULTILINGUAL_SCHEDULE: Record<
  Language,
  { day: string; subject: string; type: string; focus: string }[]
> = {
  ro: [
    {
      day: 'Luni',
      subject: 'Matematică & Aritmetică',
      type: 'Marea Lecție / Tabla Înmulțirii / Fracții',
      focus: 'Operații concrete spre abstractizare',
    },
    {
      day: 'Marți',
      subject: 'Limbaj & Gramatică',
      type: 'Cutia Gramaticală / Simboluri gramaticale',
      focus: 'Funcția substantivului și dinamismul verbului',
    },
    {
      day: 'Miercuri',
      subject: 'Geometrie Senzorială & Plană',
      type: 'Dulapul Geometric / Clasificarea Unghiurilor',
      focus: 'Etimologie, nomenclatură și construcție',
    },
    {
      day: 'Joi',
      subject: 'Istorie & Educație Cosmică',
      type: 'Panglica Timpului Neagră / Ceasul Erelor',
      focus: 'Recunoștința față de evoluția Pământului',
    },
    {
      day: 'Vineri',
      subject: 'Biologie & Științe Naturale',
      type: 'Botanică / Cabinetul de Frunze / Zoologie',
      focus: 'Observație în natură și clasificare sistematică',
    },
  ],
  fr: [
    {
      day: 'Lundi',
      subject: 'Mathématiques & Arithmétique',
      type: 'Grande Leçon / Table de Pythagore / Fractions',
      focus: 'Des manipulations concrètes vers l’abstraction',
    },
    {
      day: 'Mardi',
      subject: 'Langage & Grammaire',
      type: 'Boîtes Grammaticales / Symboles de phrases',
      focus: 'Rôle du nom et dynamisme du verbe',
    },
    {
      day: 'Mercredi',
      subject: 'Géométrie Sensorielle',
      type: 'Cabinet Géométrique / Angles et Surfaces',
      focus: 'Étymologie, nomenclature et tracé',
    },
    {
      day: 'Jeudi',
      subject: 'Histoire & Éducation Cosmique',
      type: 'Le Grand Ruban Noir / Horloge des Ères',
      focus: 'Reconnaissance envers l’évolution de la Terre',
    },
    {
      day: 'Vendredi',
      subject: 'Biologie & Sciences Naturelles',
      type: 'Botanique / Cabinet des Feuilles / Zoologie',
      focus: 'Observation en nature et taxonomie systématique',
    },
  ],
  en: [
    {
      day: 'Monday',
      subject: 'Mathematics & Arithmetic',
      type: 'Great Lesson / Bead Frame / Fractions',
      focus: 'From sensory exploration to abstraction',
    },
    {
      day: 'Tuesday',
      subject: 'Language & Grammar',
      type: 'Grammar Boxes / Sentence Analysis',
      focus: 'Function of noun and vitality of verb',
    },
    {
      day: 'Wednesday',
      subject: 'Geometry',
      type: 'Geometric Cabinet / Angle & Area work',
      focus: 'Etymology, nomenclature, and spatial intuition',
    },
    {
      day: 'Thursday',
      subject: 'History & Cosmic Education',
      type: 'Long Black Strip / Clock of Eras',
      focus: 'Gratitude for the Earth’s evolutionary epochs',
    },
    {
      day: 'Friday',
      subject: 'Biology & Natural Science',
      type: 'Botany Cabinet / Leaf Morphology / Zoology',
      focus: 'Field observation and systematic taxonomy',
    },
  ],
  de: [
    {
      day: 'Montag',
      subject: 'Mathematik & Arithmetik',
      type: 'Große Erzählung / Perlenrahmen / Brüche',
      focus: 'Vom konkreten Begreifen zur Abstraktion',
    },
    {
      day: 'Dienstag',
      subject: 'Sprache & Grammatik',
      type: 'Wortartenkästen / Satzzerlegung',
      focus: 'Funktion von Nomen und Verb',
    },
    {
      day: 'Mittwoch',
      subject: 'Geometrie',
      type: 'Geometrische Kommode / Winkel & Flächen',
      focus: 'Etymologie, Fachbegriffe und Konstruktion',
    },
    {
      day: 'Donnerstag',
      subject: 'Geschichte & Kosmische Erziehung',
      type: 'Das Schwarze Band / Uhr der Erdzeitalter',
      focus: 'Achtung und Dankbarkeit für die Erdgeschichte',
    },
    {
      day: 'Freitag',
      subject: 'Biologie & Naturwissenschaften',
      type: 'Botanische Kommode / Blattformen / Zoologie',
      focus: 'Naturbeobachtung und systematische Klassifikation',
    },
  ],
};

// Elaborated Curriculum Data across Developmental Planes
interface CurriculumPresentationItem {
  id: string;
  title: string;
  subject: string;
  materials: string;
  directAim: string;
  duration: string;
  pointOfInterest: string;
}

interface CurriculumDomainSection {
  domain: string;
  description: string;
  items: CurriculumPresentationItem[];
}

interface CurriculumPlaneLevel {
  id: string;
  name: string;
  age: string;
  planeTitle: string;
  planeSubtitle: string;
  psychologicalFocus: string;
  domains: CurriculumDomainSection[];
}

const CURRICULUM_DATA: Record<Language, CurriculumPlaneLevel[]> = {
  ro: [
    {
      id: '0-3',
      name: 'Nido & Toddler',
      age: '0 – 3 Ani',
      planeTitle: 'Planul I: Mintea Absorbantă Inconștientă',
      planeSubtitle: 'Însușirea deprinderilor fundamentale, dezvoltarea coordonării și limbajului',
      psychologicalFocus:
        'Copilul explorează mediul senzorial și își construiește autonomia psihomotorie, vorbirea activă și încrederea în sine.',
      domains: [
        {
          domain: 'Viață Practică (Autonomie & Îngrijire)',
          description: 'Activități motrice reale care dau copilului sentimentul competenței și ordinii.',
          items: [
            {
              id: 'c-0-1',
              title: 'Spălatul Mâinilor cu Lighean și Căniță',
              subject: 'Viață Practică',
              materials: 'Măsuță la înălțimea copilului, lighean smălțuit, căniță mică cu apă, săpunieră, prosopel.',
              directAim: 'Autonomia igienică și coordonarea mișcării bimanuale.',
              duration: '15 minute',
              pointOfInterest: 'Sunetul apei care curge și clăbucii de săpun formați pe palme.',
            },
            {
              id: 'c-0-2',
              title: 'Pregătirea Gustării: Felierea Bananei',
              subject: 'Viață Practică',
              materials: 'Tocător mic de lemn, feliator de banană / cuțit neascuțit, castronel ceramic.',
              directAim: 'Prehensiune fină, coordonare ochi-mână și independență alimentară.',
              duration: '15 minute',
              pointOfInterest: 'Separarea rondelelor de banană și plasarea lor în castronel.',
            },
            {
              id: 'c-0-3',
              title: 'Măturatul Firimiturilor cu Măturică și Făraș Mic',
              subject: 'Viață Practică',
              materials: 'Măturică din păr natural, făraș mic de metal, cerc trasat pe podea.',
              directAim: 'Coordonarea corpului și restaurarea ordinii în mediul pregătit.',
              duration: '10 minute',
              pointOfInterest: 'Colectarea tuturor firimiturilor în interiorul cercului.',
            },
          ],
        },
        {
          domain: 'Limbaj & Comunicare Receptivă',
          description: 'Îmbogățirea vocabularului concret prin obiecte reale și imagini fidele realității.',
          items: [
            {
              id: 'c-0-4',
              title: 'Coșul cu Fructe Reale și Nomenclatură Verbală',
              subject: 'Limbaj',
              materials: 'Coș de răchită cu măr, pară, banană, portocală reale.',
              directAim: 'Denumirea exactă a obiectelor și asocierea cuvânt-obiect palpabil.',
              duration: '10 minute',
              pointOfInterest: 'Aroma și textura diferită a fiecărui fruct atins.',
            },
            {
              id: 'c-0-5',
              title: 'Carduri de Nomenclatură în 3 Părți: Animale Domestice',
              subject: 'Limbaj',
              materials: 'Set de carduri laminate cu fotografii reale (cal, vacă, oaie, câine).',
              directAim: 'Recunoașterea vizuală și pronunția clară a fonemelor.',
              duration: '12 minute',
              pointOfInterest: 'Potrivirea miniaturii din lemn pe imaginea corespunzătoare.',
            },
          ],
        },
        {
          domain: 'Senzorial-Motor & Coordonare Fină',
          description: 'Rafinarea prehensiunii și înțelegerea cauzalității fizice.',
          items: [
            {
              id: 'c-0-6',
              title: 'Cutia de Permanență a Obiectului cu Sertar',
              subject: 'Senzorial-Motor',
              materials: 'Cutie din lemn cu orificiu superior, sertar glisant și bilă de lemn.',
              directAim: 'Înțelegerea faptului că obiectele continuă să existe când nu sunt văzute.',
              duration: '10 minute',
              pointOfInterest: 'Tragerea sertarului pentru a redescoperi bila căzută.',
            },
            {
              id: 'c-0-7',
              title: 'Puzzle din Lemn cu Buton Unic (Cerc, Pătrat, Triunghi)',
              subject: 'Senzorial-Motor',
              materials: 'Placă din lemn cu trei inserții geometrice de bază cu buton mare.',
              directAim: 'Pensa tridigitală și discriminarea formelor primare.',
              duration: '12 minute',
              pointOfInterest: 'Potrivirea perfectă a cercului în locașul său fără efort.',
            },
          ],
        },
      ],
    },
    {
      id: '3-6',
      name: 'Casa dei Bambini',
      age: '3 – 6 Ani',
      planeTitle: 'Planul I: Mintea Absorbantă Conștientă',
      planeSubtitle: 'Rafinarea simțurilor, scrisul, cititul, numerația concretă și normalizarea',
      psychologicalFocus:
        'Copilul devine creatorul activ al propriei inteligențe, clasifică impresiile senzoriale și atinge starea de normalizare.',
      domains: [
        {
          domain: 'Viață Practică (Grație, Curtoazie & Îngrijire)',
          description: 'Baza independenței și concentrării în comunitatea copiilor.',
          items: [
            {
              id: 'c-3-1',
              title: 'Spălatul Mesei în Etape Complete',
              subject: 'Viață Practică',
              materials: 'Lighean, cană, săpun, perie de rădăcini, burete, lavetă, șorț impermeabil.',
              directAim: 'Secvențialitate logică, perseverență și îngrijirea mediului.',
              duration: '20 minute',
              pointOfInterest: 'Spuma densă albă formată prin mișcările circulare cu peria.',
            },
            {
              id: 'c-3-2',
              title: 'Ramele de Îmbrăcat: Nasturi Mari și Fermoar',
              subject: 'Viață Practică',
              materials: 'Cadru din lemn cu două bucăți de pânză prinse cu nasturi mari / fermoar.',
              directAim: 'Autonomie la îmbrăcare și coordonare manuală fină.',
              duration: '15 minute',
              pointOfInterest: 'Trecerea nasturelui prin butonieră până se aude un clic ușor.',
            },
            {
              id: 'c-3-3',
              title: 'Grație și Curtoazie: Cum Oferim o Foarfecă',
              subject: 'Viață Practică',
              materials: 'Foarfecă cu vârf bont.',
              directAim: 'Maniere sigure, respect pentru celălalt și autocontrol corporal.',
              duration: '10 minute',
              pointOfInterest: 'Ținerea lamelor închise în pumn pentru a oferi inelele colegului.',
            },
          ],
        },
        {
          domain: 'Aria Senzorială (Abstractizarea Calităților)',
          description: 'Materiale de dezvoltare cu control al erorii integrat pentru rafinarea simțurilor.',
          items: [
            {
              id: 'c-3-4',
              title: 'Turnul Roz: Discriminare Tridimensională a Mărimii',
              subject: 'Senzorial',
              materials: '10 cuburi din lemn masiv roz, cu latura de la 1 cm la 10 cm, covoraș.',
              directAim: 'Discriminare vizuală a volumului și pregătire indirectă pentru conceptul de cub.',
              duration: '15 minute',
              pointOfInterest: 'Așezarea celui mai mic cub de 1 cm pe vârful turnului fără să cadă.',
            },
            {
              id: 'c-3-5',
              title: 'Scara Maronie: Discriminare Bidimensională a Grosimii',
              subject: 'Senzorial',
              materials: '10 prisme dreptunghiulare maronii de aceeași lungime (20 cm).',
              directAim: 'Discriminare vizuală a conceptului de gros / subțire.',
              duration: '15 minute',
              pointOfInterest: 'Alunecarea degetelor peste treptele regulate formate de prisme.',
            },
            {
              id: 'c-3-6',
              title: 'Cilindrii cu Buton (Blocul 1: Înălțime și Diametru)',
              subject: 'Senzorial',
              materials: 'Bloc din lemn de fag cu 10 cilindri cu buton superior.',
              directAim: 'Pregătirea prizei tridigitale pentru creion și controlul vizual al erorii.',
              duration: '15 minute',
              pointOfInterest: 'Potrivirea perfectă la nivelul suprafeței blocului.',
            },
            {
              id: 'c-3-7',
              title: 'Cutia de Culori nr. 3: Gradarea Nuanțelor',
              subject: 'Senzorial',
              materials: 'Cutie din lemn cu 63 de tăblițe colorate (9 nuanțe din 7 culori).',
              directAim: 'Rafinarea percepției cromatice și educația estetică.',
              duration: '20 minute',
              pointOfInterest: 'Construirea degradeului fin de la cea mai deschisă la cea mai închisă.',
            },
          ],
        },
        {
          domain: 'Limbaj & Comunicare Scrisă',
          description: 'Trecerea naturală de la conștientizarea fonologică la scris și lectură.',
          items: [
            {
              id: 'c-3-8',
              title: 'Literele din Șmirghel: Sunet și Traseu Motric',
              subject: 'Limbaj',
              materials: 'Plăcuțe de lemn roz și albastre cu litere din glaspapir, tavă cu nisip.',
              directAim: 'Asocierea sunet-simbol și memoria kinestezică a formei literei.',
              duration: '15 minute',
              pointOfInterest: 'Urmărirea texturii aspre cu degetul arătător și mijlociu.',
            },
            {
              id: 'c-3-9',
              title: 'Alfabetul Mobil Mare: Compunerea Fonetică a Cuvintelor',
              subject: 'Limbaj',
              materials: 'Cutie compartimentată cu litere mobile de lemn (consoane roz, vocale albastre).',
              directAim: 'Exprimarea gândurilor în scris fără efortul mecanic al creionului.',
              duration: '20 minute',
              pointOfInterest: 'Găsirea rapidă a fiecărei litere pe baza sunetului auzit.',
            },
            {
              id: 'c-3-10',
              title: 'Cutia Gramaticală I: Articolul și Substantivul',
              subject: 'Limbaj',
              materials: 'Carduri de cuvinte, obiecte miniatură, simboluri triunghiulare din lemn.',
              directAim: 'Conștientizarea funcției numelui ca etichetă a lucrurilor.',
              duration: '20 minute',
              pointOfInterest: 'Așezarea piramidei negre mari deasupra fiecărui substantiv.',
            },
          ],
        },
        {
          domain: 'Matematică (De la Cantitate Concretă la Număr)',
          description: 'Sistemul zecimal palpabil și cele 4 operații de bază.',
          items: [
            {
              id: 'c-3-11',
              title: 'Barele Numerice Roșii și Albastre (1–10)',
              subject: 'Matematică',
              materials: '10 bare de lemn cu lungimi de la 10 cm la 100 cm, alternând roșu și albastru.',
              directAim: 'Înțelegerea cantității ca entitate compactă și numărarea de la 1 la 10.',
              duration: '20 minute',
              pointOfInterest: 'Compararea lungimii barei 10 cu treptele celorlalte bare.',
            },
            {
              id: 'c-3-12',
              title: 'Cutia cu Fusuri: Conceptul de Zero și Cantități Discrete',
              subject: 'Matematică',
              materials: 'Două cutii compartimentate de la 0 la 9, 45 de fusuri de lemn, panglici.',
              directAim: 'Asocierea cifrei cu numărul de obiecte separate și noțiunea de zero.',
              duration: '15 minute',
              pointOfInterest: 'Constatarea că în compartimentul 0 mâna rămâne complet goală.',
            },
            {
              id: 'c-3-13',
              title: 'Sistemul Zecimal cu Mărgelele Aurii (Unitate, Zece, Sută, Mie)',
              subject: 'Matematică',
              materials: 'O mărgea aurie, o bară de 10, un pătrat de 100, un cub de 1000 din sârmă.',
              directAim: 'Percepția volumetrică și gravitațională a ierarhiei zecimale.',
              duration: '25 minute',
              pointOfInterest: 'Greutatea impresionantă a cubului de 1000 în comparație cu o singură mărgea.',
            },
            {
              id: 'c-3-14',
              title: 'Jocul Timbrelor: Adunarea Statică și Dinamică',
              subject: 'Matematică',
              materials: 'Cutie cu jetoane colorate de lemn (1 verde, 10 albastru, 100 roșu, 1000 verde).',
              directAim: 'Trecerea spre semi-abstracțiune în calculul zecimal.',
              duration: '25 minute',
              pointOfInterest: 'Schimbul a 10 timbre de 1 pe un timbru de 10 («banca»).',
            },
          ],
        },
        {
          domain: 'Științe & Educație Cosmică Timpurie',
          description: 'Descoperirea lumii vii și a globului pământesc.',
          items: [
            {
              id: 'c-3-15',
              title: 'Globul Pământesc Nisipat: Pământ și Apă',
              subject: 'Științe & Geografie',
              materials: 'Glob terestru montat pe ax înclinat, cu uscatul abraziv și apa netedă.',
              directAim: 'Discriminare tactilă între continente și oceane.',
              duration: '15 minute',
              pointOfInterest: 'Simțirea diferenței de textură între uscat și apă cu ochii închiși.',
            },
            {
              id: 'c-3-16',
              title: 'Cabinetul de Botanică: Formele Frunzelor',
              subject: 'Biologie',
              materials: 'Dulap din lemn cu tăvițe și inserții de frunze (ovată, cordată, lanceolat).',
              directAim: 'Observarea riguroasă a naturii și îmbogățirea terminologiei botanice.',
              duration: '20 minute',
              pointOfInterest: 'Găsirea în curtea școlii a unei frunze reale care se potrivește în inserție.',
            },
          ],
        },
      ],
    },
    {
      id: '6-9',
      name: 'Școala Primară I',
      age: '6 – 9 Ani',
      planeTitle: 'Planul II: Mintea Rațională & Imaginația Cosmică',
      planeSubtitle: 'Educația Cosmică, cele 5 Mari Lecții, rațiunea morală și grupurile colaborative',
      psychologicalFocus:
        'Copilul vrea să știe «DE CE?», părăsește mediul închis către societate («Going Out») și este fascinat de originea universului.',
      domains: [
        {
          domain: 'Educația Cosmică & Cele 5 Mari Lecții',
          description: 'Marile povești fondatoare care oferă perspectiva de ansamblu asupra cosmosului.',
          items: [
            {
              id: 'c-6-1',
              title: 'Marea Lecție I: Formarea Universului și a Pământului',
              subject: 'Educație Cosmică',
              materials: 'Grafice cosmice, experimente cu stările materiei, vulcan simulat, lumânare.',
              directAim: 'Trezirea recunoștinței pentru legile universale și a curiozității științifice.',
              duration: '35 minute',
              pointOfInterest: 'Lichidul mai dens care se așază la fundul eprubetei.',
            },
            {
              id: 'c-6-2',
              title: 'Marea Lecție II: Venirea Vieții pe Pământ (Linia Timpului Vieții)',
              subject: 'Educație Cosmică',
              materials: 'Sulul ilustrat al erelor geologice, fosile reale de amoniți și trilobiți.',
              directAim: 'Înțelegerea evoluției biologice și a interdependenței organismelor.',
              duration: '35 minute',
              pointOfInterest: 'Explozia cambriană și marea varietate de nevertebrate marine.',
            },
            {
              id: 'c-6-3',
              title: 'Panglica Neagră a Timpului: Istoria Pământului înainte de Om',
              subject: 'Educație Cosmică',
              materials: 'Panglică neagră din satin lungă de 30 m, cu o fâșie albă de 2 cm la capăt.',
              directAim: 'Perceperea imensității timpului geologic și a modestiei prezenței umane.',
              duration: '30 minute',
              pointOfInterest: 'Derularea întregii curți a școlii și descoperirea fâșiei albe finale.',
            },
          ],
        },
        {
          domain: 'Matematică & Geometrie Abstractă',
          description: 'Manipularea ierarhiilor mari de numere și geometrie demonstrativă.',
          items: [
            {
              id: 'c-6-4',
              title: 'Cadrul Mare cu Mărgele: Înmulțirea cu Numere Mari',
              subject: 'Matematică',
              materials: 'Cadru vertical din lemn cu 7 rânduri de sârmă și mărgele ierarhice colorate.',
              directAim: 'Înțelegerea valorii poziționale a cifrelor în produsul parțial.',
              duration: '30 minute',
              pointOfInterest: 'Urmărirea trecerilor peste ordin cu degetul pe cadrul de lemn.',
            },
            {
              id: 'c-6-5',
              title: 'Tabla de Șah pentru Înmulțire (Checkerboard)',
              subject: 'Matematică',
              materials: 'Covoraș de șah cu pătrate colorate (unități verzi, zeci albastre, sute roșii).',
              directAim: 'Efectuarea operațiilor cu mai mulți multiplicatori prin logică algebrică.',
              duration: '30 minute',
              pointOfInterest: 'Calculul pe diagonală a produselor cu aceeași valoare ierarhică.',
            },
            {
              id: 'c-6-6',
              title: 'Fracțiile de Metal: Echivalența Fracțiilor Simple',
              subject: 'Matematică',
              materials: 'Suport metalic cu 10 discuri fracționate de la 1/1 la 1/10.',
              directAim: 'Demonstrația vizuală că 1/2 = 2/4 = 3/6 = 5/10.',
              duration: '25 minute',
              pointOfInterest: 'Potrivirea perfectă a două jumătăți de sfert într-o treime.',
            },
            {
              id: 'c-6-7',
              title: 'Dulapul Geometric: Teorema lui Pitagora Senzorială',
              subject: 'Geometrie',
              materials: 'Inserții metalice demonstrative cu pătrate pe catete și ipotenuză.',
              directAim: 'Demonstrarea concretă a egalității a² + b² = c² fără formule abstracte.',
              duration: '25 minute',
              pointOfInterest: 'Completarea pătratului mare cu piesele triunghiulare din cele două mici.',
            },
          ],
        },
        {
          domain: 'Limbaj & Analiza Textului',
          description: 'Sintaxă dinamică, etimologie și compuneri structurate.',
          items: [
            {
              id: 'c-6-8',
              title: 'Simbolurile Gramaticale Mari: Analiza Funcțională a Textului',
              subject: 'Limbaj',
              materials: 'Simboluri tridimensionale și carduri cu propoziții din opere literare.',
              directAim: 'Identificarea rolului dinamic al fiecărei părți de vorbire într-un enunț.',
              duration: '25 minute',
              pointOfInterest: 'Bila roșie (verbul ca soare) în jurul căreia gravitează substantivul.',
            },
            {
              id: 'c-6-9',
              title: 'Graficele de Analiză a Propoziției: Subiect, Predicat și Complemente',
              subject: 'Limbaj',
              materials: 'Cercuri roșii și negre cu săgeți de întrebare din plastic dur.',
              directAim: 'Înțelegerea arhitecturii logice a gândirii exprimate în propoziție.',
              duration: '25 minute',
              pointOfInterest: 'Tragerea săgeții «Ce face?» din cercul predicatului spre subiect.',
            },
          ],
        },
      ],
    },
    {
      id: '9-12',
      name: 'Școala Primară II',
      age: '9 – 12 Ani',
      planeTitle: 'Planul II Aprofundat: Gândire Abstractă & Proiecte Autonome',
      planeSubtitle: 'Expediții «Going Out», algebră abstractă, cercetare interdisciplinară și conștiință etică',
      psychologicalFocus:
        'Elevul lucrează în echipe autonome, are un simț ascuțit al justiției sociale și realizează proiecte de cercetare de lungă durată.',
      domains: [
        {
          domain: 'Matematică Avansată & Algebră Teoretică',
          description: 'Trecerea la notația simbolică și algoritmi matematici riguroși.',
          items: [
            {
              id: 'c-9-1',
              title: 'Rădăcina Pătrată cu Tăblița cu Cuie (Pegboard)',
              subject: 'Matematică',
              materials: 'Tăbliță de lemn cu orificii, cuie colorate de lemn și mărgele ierarhice.',
              directAim: 'Construcția geometrică a pătratului unui număr și extragerea rădăcinii.',
              duration: '35 minute',
              pointOfInterest: 'Păstrarea simetriei pătratului la fiecare adăugare de ordin zecimal.',
            },
            {
              id: 'c-9-2',
              title: 'Cubul Binomial și Trinomial ca Formule Algebrice (a+b+c)³',
              subject: 'Matematică / Algebră',
              materials: 'Cutie din lemn cu 27 de blocuri prismatice colorate.',
              directAim: 'Traducerea reprezentării senzoriale în calcul algebric abstract.',
              duration: '30 minute',
              pointOfInterest: 'Identificarea formulei a³ + 3a²b + 3ab² + b³ prin descompunerea blocurilor.',
            },
            {
              id: 'c-9-3',
              title: 'Calculul Ariilor și Volumelor Poligoanelor Regulate',
              subject: 'Geometrie',
              materials: 'Prisme de lemn descompuse, riglă gradată și compas de precizie.',
              directAim: 'Deducerea independentă a formulelor de calcul pentru poligoane și cercuri.',
              duration: '30 minute',
              pointOfInterest: 'Transformarea cercului descompus în sectoare într-un paralelogram echivalent.',
            },
          ],
        },
        {
          domain: 'Limbaj Avansat, Retorică & Debate',
          description: 'Argumentare logică, redactare academică și analiză critică a surselor.',
          items: [
            {
              id: 'c-9-4',
              title: 'Analiza Sintactică a Frazei Complexe: Propozițiile Subordonate',
              subject: 'Limbaj',
              materials: 'Diagrame logice arboricole și texte istorice / filosofice.',
              directAim: 'Stăpânirea logicii argumentative și a sintaxei nuanțate.',
              duration: '30 minute',
              pointOfInterest: 'Identificarea raporturilor de cauzalitate și concesie în text.',
            },
            {
              id: 'c-9-5',
              title: 'Dezbaterea Pedagogică și Masa Rotundă pe Teme Etice',
              subject: 'Limbaj & Etică',
              materials: 'Ghid de dezbatere parlamentară, cronometru, fișe de argumentare pro/contra.',
              directAim: 'Dezvoltarea elocvenței, a ascultării active și a respectului pentru opinii adverse.',
              duration: '40 minute',
              pointOfInterest: 'Sinteza argumentelor într-un discurs final echilibrat.',
            },
          ],
        },
        {
          domain: 'Științe Integrate & Expediții «Going Out»',
          description: 'Cercetare autonomă în societate și conexiuni globale.',
          items: [
            {
              id: 'c-9-6',
              title: 'Clasificarea Celor 5 Regnuri ale Naturii (Arborele Filogenetic)',
              subject: 'Biologie & Științe',
              materials: 'Planșă de mari dimensiuni cu arborele filogenetic și mostre biologice.',
              directAim: 'Înțelegerea evoluției biologice și a unității vieții pe Pământ.',
              duration: '35 minute',
              pointOfInterest: 'Găsirea strămoșului comun al organismelor aparent diferite.',
            },
            {
              id: 'c-9-7',
              title: 'Expediția «Going Out»: Planificarea Vizitei la Muzeul de Istorie Naturală',
              subject: 'Educație Cosmică & Social',
              materials: 'Traseu de transport public, buget detaliat, scrisoare oficială de solicitare.',
              directAim: 'Inițiativă civică autonomă și contact direct cu comunitatea extinsă.',
              duration: '45 minute',
              pointOfInterest: 'Efectuarea apelului telefonic de rezervare de către copil.',
            },
          ],
        },
      ],
    },
  ],
  fr: [],
  en: [],
  de: [],
};

const PLANE_METADATA: Record<Language, Record<string, { name: string; age: string; planeTitle: string; planeSubtitle: string; psychologicalFocus: string }>> = {
  ro: {
    '0-3': {
      name: 'Nido & Toddler',
      age: '0 – 3 Ani',
      planeTitle: 'Planul I: Mintea Absorbantă Inconștientă',
      planeSubtitle: 'Însușirea deprinderilor fundamentale, dezvoltarea coordonării și limbajului',
      psychologicalFocus: 'Copilul explorează mediul senzorial și își construiește autonomia psihomotorie, vorbirea activă și încrederea în sine.',
    },
    '3-6': {
      name: 'Casa dei Bambini',
      age: '3 – 6 Ani',
      planeTitle: 'Planul I: Mintea Absorbantă Conștientă',
      planeSubtitle: 'Rafinament senzorial, scriere, citire, aritmetică și normalizare prin lucru autonom',
      psychologicalFocus: 'Copilul își perfecționează funcțiile deja formate, își dezvoltă voința, concentrarea profundă și ordinea interioară.',
    },
    '6-9': {
      name: 'Școala Primară I',
      age: '6 – 9 Ani',
      planeTitle: 'Planul II: Mintea Rațională & Educația Cosmică',
      planeSubtitle: 'Marile Lecții, emergența conștiinței morale, imaginația și explorarea lumii',
      psychologicalFocus: 'Copilul caută răspunsul la «De ce?» și «Cum?», manifestă un interes viu pentru societate, reguli morale și prietenie.',
    },
    '9-12': {
      name: 'Școala Primară II',
      age: '9 – 12 Ani',
      planeTitle: 'Planul II Aprofundat: Gândire Abstractă & Proiecte Autonome',
      planeSubtitle: 'Expediții «Going Out», algebră abstractă, cercetare interdisciplinară și conștiință etică',
      psychologicalFocus: 'Elevul lucrează în echipe autonome, are un simț ascuțit al justiției sociale și realizează proiecte de cercetare de lungă durată.',
    },
  },
  fr: {
    '0-3': {
      name: 'Nido & Communauté Enfantine',
      age: '0 – 3 Ans',
      planeTitle: "Plan I : L'Esprit Absorbant Inconscient",
      planeSubtitle: 'Acquisition des compétences fondamentales, développement de la coordination et du langage',
      psychologicalFocus: "L'enfant explore son environnement sensoriel et construit son autonomie motrice, son langage actif et sa confiance en soi.",
    },
    '3-6': {
      name: 'Maison des Enfants (Casa dei Bambini)',
      age: '3 – 6 Ans',
      planeTitle: "Plan I : L'Esprit Absorbant Conscient",
      planeSubtitle: 'Raffinement sensoriel, écriture, lecture, arithmétique et normalisation par le travail autonome',
      psychologicalFocus: "L'enfant affine ses perceptions sensorielles, développe une concentration prolongée et construit sa volonté par le libre choix.",
    },
    '6-9': {
      name: 'École Élémentaire I',
      age: '6 – 9 Ans',
      planeTitle: 'Plan II : Esprit Raisonnant & Éducation Cosmique',
      planeSubtitle: 'Grandes Leçons, émergence de la conscience morale, imagination et exploration du cosmos',
      psychologicalFocus: "L'enfant cherche à comprendre le « pourquoi » et le « comment », explore le vaste monde et développe un sens aigu de la justice et de l'amitié.",
    },
    '9-12': {
      name: 'École Élémentaire II',
      age: '9 – 12 Ans',
      planeTitle: 'Plan II Approfondi : Pensée Abstraite & Projets Autonomes',
      planeSubtitle: 'Expéditions « Going Out », algèbre abstraite, recherche interdisciplinaire et conscience éthique',
      psychologicalFocus: "L'élève mène des projets de recherche en équipe autonome, s'intéresse à la justice sociale et structure sa pensée logique complexe.",
    },
  },
  en: {
    '0-3': {
      name: 'Nido & Toddler Community',
      age: '0 – 3 Years',
      planeTitle: 'Plane I: The Unconscious Absorbent Mind',
      planeSubtitle: 'Acquiring foundational skills, motor coordination, and spoken language development',
      psychologicalFocus: 'The child explores sensory stimuli, building psychomotor autonomy, expressive language, and self-confidence.',
    },
    '3-6': {
      name: "Children's House (Casa dei Bambini)",
      age: '3 – 6 Years',
      planeTitle: 'Plane I: The Conscious Absorbent Mind',
      planeSubtitle: 'Sensory refinement, writing, reading, early arithmetic, and normalization through purposeful work',
      psychologicalFocus: 'The child refines sensory discrimination, develops sustained concentration, and strengthens will through free choice.',
    },
    '6-9': {
      name: 'Lower Elementary',
      age: '6 – 9 Years',
      planeTitle: 'Plane II: The Reasoning Mind & Cosmic Education',
      planeSubtitle: 'The Great Lessons, emergence of moral conscience, imagination, and scientific exploration',
      psychologicalFocus: 'The child asks "why" and "how", hungers for the wider universe, and develops a keen sense of justice and peer collaboration.',
    },
    '9-12': {
      name: 'Upper Elementary',
      age: '9 – 12 Years',
      planeTitle: 'Plane II Advanced: Abstract Reasoning & Independent Projects',
      planeSubtitle: 'Going Out expeditions, advanced algebra, interdisciplinary research, and social ethics',
      psychologicalFocus: 'The student works in self-directed peer groups, develops ethical reasoning, and conducts long-term investigative projects.',
    },
  },
  de: {
    '0-3': {
      name: 'Nido & Kleinkindgemeinschaft',
      age: '0 – 3 Jahre',
      planeTitle: 'Stufe I: Der unbewusst absorbierende Geist',
      planeSubtitle: 'Aneignung grundlegender Fertigkeiten, Entwicklung von Koordination und aktiver Sprache',
      psychologicalFocus: 'Das Kind erkundet seine Sinneswelt, entwickelt psychomotorische Selbstständigkeit, Sprache und Selbstvertrauen.',
    },
    '3-6': {
      name: 'Kinderhaus (Casa dei Bambini)',
      age: '3 – 6 Jahre',
      planeTitle: 'Stufe I: Der bewusst absorbierende Geist',
      planeSubtitle: 'Sinnesschulung, Schreiben, Lesen, frühe Mathematik und Normalisierung durch konzentrierte Arbeit',
      psychologicalFocus: 'Das Kind verfeinert sensorische Wahrnehmungen, entwickelt Ausdauer bei freier Wahl und baut seinen eigenen Willen auf.',
    },
    '6-9': {
      name: 'Primarstufe I',
      age: '6 – 9 Jahre',
      planeTitle: 'Stufe II: Der forschende Geist & Kosmische Erziehung',
      planeSubtitle: 'Große Erzählungen, Erwachen des moralischen Bewusstseins, Vorstellungskraft und Welterkundung',
      psychologicalFocus: 'Das Kind fragt nach dem „Warum“ und „Wie“, will die Welt jenseits des Klassenraums erforschen und sucht Gerechtigkeit und Gemeinschaft.',
    },
    '9-12': {
      name: 'Primarstufe II',
      age: '9 – 12 Jahre',
      planeTitle: 'Stufe II Vertiefung: Abstraktes Denken & Eigenständige Projekte',
      planeSubtitle: 'Going-Out-Expeditionen, Algebra, fächerübergreifende Forschung und ethisches Bewusstsein',
      psychologicalFocus: 'Der Schüler forscht in selbstständigen Teams, zeigt Verantwortungsbewusstsein und führt langfristige Projekte durch.',
    },
  },
};

const buildCurriculumForLang = (targetLang: Language): CurriculumPlaneLevel[] => {
  const meta = PLANE_METADATA[targetLang] || PLANE_METADATA.ro;
  return CURRICULUM_DATA.ro.map((plane) => {
    const pMeta = meta[plane.id] || {
      name: plane.name,
      age: plane.age,
      planeTitle: plane.planeTitle,
      planeSubtitle: plane.planeSubtitle,
      psychologicalFocus: plane.psychologicalFocus,
    };
    return {
      ...plane,
      name: pMeta.name,
      age: pMeta.age,
      planeTitle: pMeta.planeTitle,
      planeSubtitle: pMeta.planeSubtitle,
      psychologicalFocus: pMeta.psychologicalFocus,
    };
  });
};

CURRICULUM_DATA.fr = buildCurriculumForLang('fr');
CURRICULUM_DATA.en = buildCurriculumForLang('en');
CURRICULUM_DATA.de = buildCurriculumForLang('de');

const CURRICULUM_TAB_UI: Record<
  Language,
  {
    headerTitle: string;
    headerSubtitle: string;
    allLevels: string;
    searchPlaceholder: string;
    psychologyPrefix: string;
    materialsLabel: string;
    directAimLabel: string;
    loadButton: string;
    expandAll: string;
    collapseAll: string;
    presentationsCount: string;
    clickToExpand: string;
    clickToCollapse: string;
  }
> = {
  ro: {
    headerTitle: 'Curriculum pe Niveluri de Dezvoltare Montessori',
    headerSubtitle:
      'Parcurs curricular structurat pe Planurile de Dezvoltare ale Dr. Maria Montessori (de la 0 la 12 ani). Selectați orice prezentare pentru a o încărca instantaneu în Planificator.',
    allLevels: 'Toate Nivelurile',
    searchPlaceholder: 'Caută o prezentare, material sau obiectiv în curriculum...',
    psychologyPrefix: 'Psihologia etapei:',
    materialsLabel: 'Material:',
    directAimLabel: 'Obiectiv Direct:',
    loadButton: 'Încarcă în Planificator',
    expandAll: 'Desfășoară toate nivelurile',
    collapseAll: 'Restrânge toate nivelurile',
    presentationsCount: 'prezentări',
    clickToExpand: 'Click pentru a desfășura nivelul',
    clickToCollapse: 'Click pentru a restrânge nivelul',
  },
  fr: {
    headerTitle: 'Curriculum par Niveaux de Développement Montessori',
    headerSubtitle:
      'Parcours curriculaire structuré selon les Plans de Développement du Dr Maria Montessori (de 0 à 12 ans). Sélectionnez une présentation pour la charger instantanément dans le Planificateur.',
    allLevels: 'Tous les Niveaux',
    searchPlaceholder:
      'Rechercher une présentation, un matériel ou un objectif dans le curriculum...',
    psychologyPrefix: 'Psychologie du plan :',
    materialsLabel: 'Matériel :',
    directAimLabel: 'Objectif Direct :',
    loadButton: 'Charger dans le Planificateur',
    expandAll: 'Déplier tous les niveaux',
    collapseAll: 'Replier tous les niveaux',
    presentationsCount: 'présentations',
    clickToExpand: 'Cliquer pour déplier ce niveau',
    clickToCollapse: 'Cliquer pour replier ce niveau',
  },
  en: {
    headerTitle: 'Montessori Curriculum by Developmental Planes',
    headerSubtitle:
      "Curricular pathway structured according to Dr. Maria Montessori's Planes of Development (ages 0 to 12). Select any presentation to instantly load it into the Planner.",
    allLevels: 'All Levels',
    searchPlaceholder: 'Search for a presentation, material, or aim in the curriculum...',
    psychologyPrefix: 'Psychology of this plane:',
    materialsLabel: 'Material:',
    directAimLabel: 'Direct Aim:',
    loadButton: 'Load into Planner',
    expandAll: 'Expand all levels',
    collapseAll: 'Collapse all levels',
    presentationsCount: 'presentations',
    clickToExpand: 'Click to expand this level',
    clickToCollapse: 'Click to collapse this level',
  },
  de: {
    headerTitle: 'Montessori-Curriculum nach Entwicklungsstufen',
    headerSubtitle:
      'Lehrplanpfad gegliedert nach den Entwicklungsstufen von Dr. Maria Montessori (0 bis 12 Jahre). Wählen Sie eine Darbietung aus, um sie direkt in den Planer zu laden.',
    allLevels: 'Alle Stufen',
    searchPlaceholder: 'Darbietung, Material oder Ziel im Lehrplan suchen...',
    psychologyPrefix: 'Psychologie dieser Stufe:',
    materialsLabel: 'Material:',
    directAimLabel: 'Direktes Ziel:',
    loadButton: 'In den Planer laden',
    expandAll: 'Alle Stufen aufklappen',
    collapseAll: 'Alle Stufen zuklappen',
    presentationsCount: 'Darbietungen',
    clickToExpand: 'Klicken zum Aufklappen dieser Stufe',
    clickToCollapse: 'Klicken zum Zuklappen dieser Stufe',
  },
};

const getPlaneIcon = (planeId: string) => {
  switch (planeId) {
    case '0-3':
      return Baby;
    case '3-6':
      return Sun;
    case '6-9':
      return Globe;
    case '9-12':
      return GraduationCap;
    default:
      return Layers;
  }
};

export const LessonPlannerModule: React.FC<LessonPlannerModuleProps> = ({
  lessonPlans,
  onAddLessonPlan,
  onDeleteLessonPlan,
  institution,
  onOpenPrint,
  lang,
}) => {
  const [activeTab, setActiveTab] = useState<'create' | 'saved' | 'curriculum' | 'schedule'>('create');

  const t = UI_TRANSLATIONS[lang].lesson;
  const curUI = CURRICULUM_TAB_UI[lang] || CURRICULUM_TAB_UI.ro;
  const weeklySchedule = MULTILINGUAL_SCHEDULE[lang] || MULTILINGUAL_SCHEDULE.ro;
  const curriculumLevels = CURRICULUM_DATA[lang] || CURRICULUM_DATA.ro;

  const initialDefaults = MULTILINGUAL_LESSON_FORM_DEFAULTS[lang] || MULTILINGUAL_LESSON_FORM_DEFAULTS.ro;

  // Form State (11 Fields requested by user)
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [ageGroup, setAgeGroup] = useState('Casa dei Bambini (3–6 ani)');
  const [duration, setDuration] = useState('20 minute');
  const [materials, setMaterials] = useState('');
  const [pointOfInterest, setPointOfInterest] = useState('');
  const [directAim, setDirectAim] = useState('');
  const [indirectAim, setIndirectAim] = useState('');
  const [procedure, setProcedure] = useState('');
  const [followUpWork, setFollowUpWork] = useState('');
  const [crossCurricular, setCrossCurricular] = useState('');

  // Curriculum Filter & Accordion State
  const [selectedCurriculumPlane, setSelectedCurriculumPlane] = useState<string>('all');
  const [curriculumSearch, setCurriculumSearch] = useState<string>('');
  const [expandedPlanes, setExpandedPlanes] = useState<Record<string, boolean>>({
    '0-3': false,
    '3-6': false,
    '6-9': false,
    '9-12': false,
  });

  const togglePlaneExpanded = (planeId: string) => {
    setExpandedPlanes((prev) => ({
      ...prev,
      [planeId]: !prev[planeId],
    }));
  };

  const handleSelectPlaneTab = (planeId: string) => {
    setSelectedCurriculumPlane(planeId);
    if (planeId === 'all') {
      // By default all levels remain collapsed
      setExpandedPlanes({
        '0-3': false,
        '3-6': false,
        '6-9': false,
        '9-12': false,
      });
    } else {
      // When selecting a specific level tab, unfold that level
      setExpandedPlanes({
        '0-3': planeId === '0-3',
        '3-6': planeId === '3-6',
        '6-9': planeId === '6-9',
        '9-12': planeId === '9-12',
      });
    }
  };

  const handleExpandAllPlanes = () => {
    setExpandedPlanes({
      '0-3': true,
      '3-6': true,
      '6-9': true,
      '9-12': true,
    });
  };

  const handleCollapseAllPlanes = () => {
    setExpandedPlanes({
      '0-3': false,
      '3-6': false,
      '6-9': false,
      '9-12': false,
    });
  };

  // Saved Plans Filter
  const [savedSearchQuery, setSavedSearchQuery] = useState('');

  // AI Generation State
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState(false);

  // Sync default example when user requests
  const handleLoadGuidedExample = () => {
    const defaults = MULTILINGUAL_LESSON_FORM_DEFAULTS[lang] || MULTILINGUAL_LESSON_FORM_DEFAULTS.ro;
    setTitle(defaults.title);
    setSubject(defaults.subject);
    setAgeGroup(defaults.ageGroup || defaults.level || 'Casa dei Bambini (3–6 ani)');
    setDuration(defaults.duration || '20 minute');
    setMaterials(defaults.materials);
    setPointOfInterest(defaults.pointOfInterest);
    setDirectAim(defaults.directAim);
    setIndirectAim(defaults.indirectAim || defaults.indirectAims || '');
    setProcedure(defaults.procedure || '');
    setFollowUpWork(defaults.followUpWork || defaults.follow1 || '');
    setCrossCurricular(defaults.crossCurricular || defaults.follow2 || '');
  };

  const handleClearForm = () => {
    setTitle('');
    setSubject('');
    setAgeGroup('Casa dei Bambini (3–6 ani)');
    setDuration('');
    setMaterials('');
    setPointOfInterest('');
    setDirectAim('');
    setIndirectAim('');
    setProcedure('');
    setFollowUpWork('');
    setCrossCurricular('');
    setAiError(null);
  };

  const handleAiAutoFill = async (customTopic?: string, customSub?: string, customAge?: string) => {
    const topicToUse = (customTopic || title || initialDefaults.title || 'Turnul Roz').trim();
    const subToUse = customSub || subject;
    const ageToUse = customAge || ageGroup;

    setIsGeneratingAI(true);
    setAiError(null);

    try {
      const response = await fetch('/api/lesson-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: topicToUse,
          subject: subToUse,
          level: ageToUse,
          ageGroup: ageToUse,
          lang,
        }),
      });

      const data = await response.json();
      if (!response.ok || data.error) {
        throw new Error(data.error || 'Nu am putut genera planul de prezentare.');
      }

      if (data.plan) {
        const p = data.plan;
        const toBulletText = (val: any): string => {
          if (!val) return '';
          if (Array.isArray(val)) {
            return val
              .map((item) => {
                const s = String(item).trim();
                return s.startsWith('•') ? s : `• ${s}`;
              })
              .join('\n');
          }
          return String(val).trim();
        };

        setTitle(String(p.title || p.titlu || topicToUse).trim());
        setSubject(String(p.subject || p.domeniu || p.domeniu_activitate || 'Curriculum Montessori').trim());
        setAgeGroup(String(p.ageGroup || p.grupa_varsta || ageToUse || 'Casa dei Bambini (3–6 ani)').trim());
        setDuration(String(p.duration || p.timp_alocat || '20 minute').trim());
        setMaterials(toBulletText(p.materials || p.materiale_necesare));
        setPointOfInterest(toBulletText(p.pointOfInterest || p.punct_de_interes));
        setDirectAim(toBulletText(p.directAim || p.obiectiv_direct || p.scop_direct));
        setIndirectAim(toBulletText(p.indirectAim || p.obiectiv_indirect || p.scop_indirect));
        setProcedure(toBulletText(p.procedure || p.desfasurare_puncte || p.desfasurare_lectie));
        setFollowUpWork(toBulletText(p.followUpWork || p.follow_up || p.follow_1));
        setCrossCurricular(toBulletText(p.crossCurricular || p.follow_up_transdisciplinar || p.follow_2));
      }
    } catch (err: any) {
      console.error(err);
      setAiError(err?.message || 'Eroare la generarea automată a planului de prezentare.');
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const handleInsertBullet = () => {
    setProcedure((prev) => {
      if (!prev) return '• ';
      if (prev.endsWith('\n')) return prev + '• ';
      return prev + '\n• ';
    });
  };

  const handleProcedureKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      const target = e.currentTarget;
      const start = target.selectionStart;
      const textBefore = procedure.substring(0, start);
      const lines = textBefore.split('\n');
      const currentLine = lines[lines.length - 1];

      if (currentLine.trim().startsWith('•')) {
        // If the current line is just a bullet with spaces, remove it and break line
        if (currentLine.trim() === '•') {
          e.preventDefault();
          const newText =
            procedure.substring(0, start - currentLine.length) +
            '\n' +
            procedure.substring(start);
          setProcedure(newText);
          return;
        }

        // Auto-insert bullet on next line
        e.preventDefault();
        const textAfter = procedure.substring(start);
        const newText = textBefore + '\n• ' + textAfter;
        setProcedure(newText);
        setTimeout(() => {
          target.selectionStart = target.selectionEnd = start + 3;
        }, 0);
      }
    }
  };

  const handleSaveLessonPlan = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!title.trim() || !directAim.trim()) {
      alert(
        lang === 'fr'
          ? 'Veuillez renseigner au moins le titre et l’objectif direct de la présentation.'
          : lang === 'en'
          ? 'Please enter at least the presentation title and direct aim.'
          : lang === 'de'
          ? 'Bitte geben Sie mindestens den Titel und das direkte Ziel der Darbietung an.'
          : 'Vă rugăm să completați cel puțin titlul și obiectivul direct al prezentării.'
      );
      return;
    }

    const newPlan: LessonPlan = {
      id: 'lp-' + Date.now(),
      title: title.trim(),
      subject: subject.trim() || 'General',
      ageGroup: ageGroup.trim() || 'Casa dei Bambini (3–6 ani)',
      level: ageGroup.trim() || 'Casa dei Bambini (3–6 ani)',
      duration: duration.trim() || '20 minute',
      materials: materials.trim(),
      pointOfInterest: pointOfInterest.trim(),
      directAim: directAim.trim(),
      indirectAim: indirectAim.trim(),
      procedure: procedure.trim(),
      followUpWork: followUpWork.trim(),
      crossCurricular: crossCurricular.trim(),
      // Backward compatibility fields
      follow1: followUpWork.trim(),
      follow2: crossCurricular.trim(),
      indirectAims: indirectAim.trim(),
      createdAt: Date.now(),
    };

    onAddLessonPlan(newPlan);
    setSaveSuccessMsg(true);
    setTimeout(() => setSaveSuccessMsg(false), 3000);
    setActiveTab('saved');
  };

  const handleDirectDownloadPdf = (targetPlan?: LessonPlan) => {
    const planToExport: LessonPlan = targetPlan || {
      id: 'lp-direct-' + Date.now(),
      title: title.trim() || initialDefaults.title || 'Plan de Prezentare',
      subject: subject.trim() || initialDefaults.subject || 'Curriculum Montessori',
      ageGroup: ageGroup.trim() || 'Casa dei Bambini (3–6 ani)',
      duration: duration.trim() || '20 minute',
      materials: materials.trim() || initialDefaults.materials || '',
      pointOfInterest: pointOfInterest.trim() || initialDefaults.pointOfInterest || '',
      directAim: directAim.trim() || initialDefaults.directAim || '',
      indirectAim: indirectAim.trim() || initialDefaults.indirectAim || '',
      procedure: procedure.trim() || initialDefaults.procedure || '',
      followUpWork: followUpWork.trim() || initialDefaults.followUpWork || '',
      crossCurricular: crossCurricular.trim() || initialDefaults.crossCurricular || '',
      createdAt: Date.now(),
    };
    exportLessonPlanToPdf({ plan: planToExport, institution, lang });
  };

  const handleLoadCurriculumItem = (item: CurriculumPresentationItem, levelName: string) => {
    setTitle(item.title);
    setSubject(item.subject);
    setAgeGroup(levelName);
    setDuration(item.duration);
    setMaterials(item.materials);
    setPointOfInterest(item.pointOfInterest);
    setDirectAim(item.directAim);
    setIndirectAim('');
    setProcedure('');
    setFollowUpWork('');
    setCrossCurricular('');
    setActiveTab('create');
  };

  const handleEditSavedPlan = (plan: LessonPlan) => {
    setTitle(plan.title || '');
    setSubject(plan.subject || '');
    setAgeGroup(plan.ageGroup || plan.level || 'Casa dei Bambini (3–6 ani)');
    setDuration(plan.duration || '20 minute');
    setMaterials(plan.materials || '');
    setPointOfInterest(plan.pointOfInterest || '');
    setDirectAim(plan.directAim || '');
    setIndirectAim(plan.indirectAim || plan.indirectAims || '');
    setProcedure(plan.procedure || '');
    setFollowUpWork(plan.followUpWork || plan.follow1 || '');
    setCrossCurricular(plan.crossCurricular || plan.follow2 || '');
    setActiveTab('create');
  };

  const localizedPlans = lessonPlans.map((p) => getLocalizedLessonPlan(p, lang));

  const filteredSavedPlans = localizedPlans.filter((p) => {
    if (!savedSearchQuery.trim()) return true;
    const query = savedSearchQuery.toLowerCase();
    return (
      p.title.toLowerCase().includes(query) ||
      p.subject.toLowerCase().includes(query) ||
      (p.ageGroup && p.ageGroup.toLowerCase().includes(query)) ||
      (p.level && p.level.toLowerCase().includes(query)) ||
      p.directAim.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2E5A44] text-white flex items-center justify-center shrink-0">
              <FileText className="w-6 h-6 text-[#D4A373]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1F3A2B] font-serif">
                {t.title}
              </h2>
              <p className="text-xs text-gray-500">
                {t.subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#2E5A44] bg-[#F4F7F5] px-3 py-1.5 rounded-lg border border-[#2E5A44]/20">
              {localizedPlans.length} {t.savedCount}
            </span>
            <button
              type="button"
              onClick={() => handleDirectDownloadPdf()}
              className="px-3.5 py-1.5 bg-[#2E5A44] hover:bg-[#1F3A2B] text-white font-bold text-xs rounded-lg flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer border border-[#D4A373]/40"
              title="Descarcă direct fișierul PDF oficial complet cu toate paginile"
            >
              <Download className="w-4 h-4 text-[#D4A373]" /> Descarcă PDF
            </button>
            <button
              type="button"
              onClick={onOpenPrint}
              className="px-3.5 py-1.5 bg-[#D4A373] hover:bg-[#c29363] text-[#1F3A2B] font-bold text-xs rounded-lg flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" /> PDF / Print
            </button>
          </div>
        </div>

        {/* Philosophy Note Banner */}
        <div className="bg-[#F4F7F5] p-3.5 rounded-xl border border-[#2E5A44]/20 text-xs text-gray-700 leading-relaxed flex items-start gap-2">
          <Lightbulb className="w-4 h-4 text-[#D4A373] shrink-0 mt-0.5" />
          <div>{t.lessonPrinciple}</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center border-b border-gray-200 gap-2">
        <button
          type="button"
          onClick={() => setActiveTab('create')}
          className={`px-5 py-3 text-xs font-bold border-b-2 -mb-px flex items-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'create'
              ? 'border-[#2E5A44] text-[#2E5A44] bg-white rounded-t-xl shadow-xs'
              : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'
          }`}
        >
          <Plus className="w-4 h-4" /> {t.tabCreate}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('saved')}
          className={`px-5 py-3 text-xs font-bold border-b-2 -mb-px flex items-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'saved'
              ? 'border-[#2E5A44] text-[#2E5A44] bg-white rounded-t-xl shadow-xs'
              : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'
          }`}
        >
          <BookOpen className="w-4 h-4" /> {t.tabSaved} ({lessonPlans.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('curriculum')}
          className={`px-5 py-3 text-xs font-bold border-b-2 -mb-px flex items-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'curriculum'
              ? 'border-[#2E5A44] text-[#2E5A44] bg-white rounded-t-xl shadow-xs'
              : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'
          }`}
        >
          <Compass className="w-4 h-4" /> {t.tabCurriculum || curUI.headerTitle}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('schedule')}
          className={`px-5 py-3 text-xs font-bold border-b-2 -mb-px flex items-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'schedule'
              ? 'border-[#2E5A44] text-[#2E5A44] bg-white rounded-t-xl shadow-xs'
              : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'
          }`}
        >
          <Calendar className="w-4 h-4" /> {t.tabSchedule}
        </button>
      </div>

      {/* TAB 1: CREATE PRESENTATION PLAN */}
      {activeTab === 'create' && (
        <div className="space-y-6">
          {/* AI Generator Quick-bar */}
          <div className="bg-gradient-to-r from-[#1F3A2B] via-[#2E5A44] to-[#396850] p-5 rounded-2xl text-white shadow-md space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D4A373] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> {t.aiAutofillTitle}
              </span>
              <span className="text-[11px] text-white/70">
                {t.aiAutofillDesc}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 items-center">
              <div className="flex-1 w-full relative flex items-center">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={t.aiTopicPlaceholder}
                  className="w-full bg-white/10 border border-white/30 rounded-xl pl-4 pr-11 py-2.5 text-xs text-white placeholder-white/50 focus:outline-none focus:border-[#D4A373]"
                />
                <div className="absolute right-2 flex items-center">
                  <SpeechToTextButton
                    lang={lang}
                    currentValue={title}
                    onTranscript={(val) => setTitle(val)}
                    size="sm"
                    className="text-white hover:text-[#D4A373] bg-white/10 hover:bg-white/20 border-white/20"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleAiAutoFill()}
                disabled={isGeneratingAI}
                className="w-full sm:w-auto px-5 py-2.5 bg-[#D4A373] hover:bg-[#c29363] disabled:opacity-50 text-[#1F3A2B] font-bold text-xs rounded-xl shadow flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0"
              >
                {isGeneratingAI ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> {t.aiGenerating}
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" /> {t.aiGenerateBtn}
                  </>
                )}
              </button>
            </div>

            {aiError && (
              <p className="text-xs text-red-200 bg-red-900/40 p-2 rounded-lg">
                ⚠️ {aiError}
              </p>
            )}
          </div>

          {/* Form for Presentation Plan */}
          <form
            onSubmit={handleSaveLessonPlan}
            className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-5"
          >
            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
              <h3 className="text-sm font-bold text-[#1F3A2B] uppercase tracking-wider flex items-center gap-2">
                <BookmarkCheck className="w-4 h-4 text-[#2E5A44]" />
                <span>{t.formTitle}</span>
              </h3>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleClearForm}
                  className="text-xs font-semibold text-gray-500 hover:text-gray-800 bg-gray-50 hover:bg-gray-100 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                >
                  {lang === 'fr' ? 'Effacer' : lang === 'en' ? 'Clear' : lang === 'de' ? 'Leeren' : 'Golește'}
                </button>
                <button
                  type="button"
                  onClick={handleLoadGuidedExample}
                  className="text-xs font-semibold text-[#2E5A44] hover:text-[#1F3A2B] bg-[#F4F7F5] hover:bg-[#2E5A44]/15 px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer border border-[#2E5A44]/20"
                  title="Încarcă exemplul ghidat"
                >
                  <RotateCcw className="w-3 h-3 text-[#D4A373]" />
                  <span>
                    {lang === 'fr'
                      ? 'Exemple guidé'
                      : lang === 'en'
                      ? 'Guided example'
                      : lang === 'de'
                      ? 'Beispiel laden'
                      : 'Exemplu ghidat'}
                  </span>
                </button>
              </div>
            </div>

            {/* Field 1: Titlu Prezentare */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-gray-800">
                  {t.el1Title}
                </label>
                <SpeechToTextButton
                  lang={lang}
                  currentValue={title}
                  onTranscript={(val) => setTitle(val)}
                  size="sm"
                />
              </div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={initialDefaults.title}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs font-semibold text-gray-900 focus:bg-white focus:ring-1 focus:ring-[#2E5A44] focus:outline-none"
              />
            </div>

            {/* Fields 2, 3, 4: Domeniu de Activitate, Grupa de Vârstă, Timp Alocat */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-gray-700">
                    {t.subjectLabel}
                  </label>
                  <SpeechToTextButton
                    lang={lang}
                    currentValue={subject}
                    onTranscript={(val) => setSubject(val)}
                    size="sm"
                  />
                </div>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder={initialDefaults.subject}
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-[#2E5A44] focus:outline-none"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-gray-700">
                    {t.ageGroupLabel}
                  </label>
                  <SpeechToTextButton
                    lang={lang}
                    currentValue={ageGroup}
                    onTranscript={(val) => setAgeGroup(val)}
                    size="sm"
                  />
                </div>
                <input
                  type="text"
                  value={ageGroup}
                  onChange={(e) => setAgeGroup(e.target.value)}
                  placeholder={initialDefaults.ageGroup || initialDefaults.level}
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-[#2E5A44] focus:outline-none"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-gray-700 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#2E5A44]" />
                    <span>{t.durationLabel}</span>
                  </label>
                  <SpeechToTextButton
                    lang={lang}
                    currentValue={duration}
                    onTranscript={(val) => setDuration(val)}
                    size="sm"
                  />
                </div>
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder={initialDefaults.duration || '20 minute'}
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-[#2E5A44] focus:outline-none"
                />
              </div>
            </div>

            {/* Fields 5 & 6: Material Necesar & Punct de Interes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-gray-700">
                    {t.materialsLabel}
                  </label>
                  <SpeechToTextButton
                    lang={lang}
                    currentValue={materials}
                    onTranscript={(val) => setMaterials(val)}
                    size="sm"
                  />
                </div>
                <AutoResizeTextarea
                  minRows={3}
                  value={materials}
                  onChange={(e) => setMaterials(e.target.value)}
                  placeholder={initialDefaults.materials}
                  className="flex-1 w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-xs focus:bg-white focus:ring-1 focus:ring-[#2E5A44] focus:outline-none transition-all"
                />
              </div>

              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-gray-700 flex items-center gap-1">
                    <Target className="w-3.5 h-3.5 text-[#D4A373]" />
                    <span>{t.pointOfInterestLabel}</span>
                  </label>
                  <SpeechToTextButton
                    lang={lang}
                    currentValue={pointOfInterest}
                    onTranscript={(val) => setPointOfInterest(val)}
                    size="sm"
                  />
                </div>
                <AutoResizeTextarea
                  minRows={3}
                  value={pointOfInterest}
                  onChange={(e) => setPointOfInterest(e.target.value)}
                  placeholder={initialDefaults.pointOfInterest}
                  className="flex-1 w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-xs focus:bg-white focus:ring-1 focus:ring-[#2E5A44] focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Fields 7 & 8: Obiectiv Direct & Obiectiv Indirect */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-[#1F3A2B]">
                    {t.directAimLabel}
                  </label>
                  <SpeechToTextButton
                    lang={lang}
                    currentValue={directAim}
                    onTranscript={(val) => setDirectAim(val)}
                    size="sm"
                  />
                </div>
                <AutoResizeTextarea
                  minRows={3}
                  value={directAim}
                  onChange={(e) => setDirectAim(e.target.value)}
                  placeholder={initialDefaults.directAim}
                  className="flex-1 w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-xs focus:bg-white focus:ring-1 focus:ring-[#2E5A44] focus:outline-none transition-all"
                />
              </div>

              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-gray-700">
                    {t.indirectAimLabel}
                  </label>
                  <SpeechToTextButton
                    lang={lang}
                    currentValue={indirectAim}
                    onTranscript={(val) => setIndirectAim(val)}
                    size="sm"
                  />
                </div>
                <AutoResizeTextarea
                  minRows={3}
                  value={indirectAim}
                  onChange={(e) => setIndirectAim(e.target.value)}
                  placeholder={initialDefaults.indirectAim}
                  className="flex-1 w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-xs focus:bg-white focus:ring-1 focus:ring-[#2E5A44] focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Field 9: Desfășurare Lecție cu Bullet Points */}
            <div className="bg-[#F4F7F5] p-4 rounded-xl border border-gray-200 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <div>
                  <label className="text-xs font-bold text-[#1F3A2B] uppercase tracking-wider flex items-center gap-1.5">
                    <ListOrdered className="w-4 h-4 text-[#2E5A44]" />
                    <span>{t.procedureLabel}</span>
                  </label>
                  <span className="text-[11px] text-gray-500 block">
                    {t.procedureHint}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleInsertBullet}
                    className="px-2.5 py-1 bg-white hover:bg-gray-100 text-[#2E5A44] border border-[#2E5A44]/30 rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-2xs"
                  >
                    + Punct •
                  </button>
                  <SpeechToTextButton
                    lang={lang}
                    currentValue={procedure}
                    onTranscript={(val) => setProcedure(val)}
                    size="sm"
                  />
                </div>
              </div>
              <AutoResizeTextarea
                minRows={6}
                value={procedure}
                onChange={(e) => setProcedure(e.target.value)}
                onKeyDown={handleProcedureKeyDown}
                placeholder={initialDefaults.procedure}
                className="w-full bg-white border border-gray-300 rounded-lg p-3 text-xs font-sans leading-relaxed text-gray-900 focus:ring-1 focus:ring-[#2E5A44] focus:outline-none transition-all"
              />
            </div>

            {/* Fields 10 & 11: Propuneri de Follow-up Work & Follow-up Transdisciplinar */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
              <div className="p-3.5 bg-[#F4F7F5] border-l-4 border-l-[#2E5A44] rounded-xl flex flex-col h-full space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold text-[#2E5A44]">
                    {t.followUpLabel}
                  </label>
                  <SpeechToTextButton
                    lang={lang}
                    currentValue={followUpWork}
                    onTranscript={(val) => setFollowUpWork(val)}
                    size="sm"
                  />
                </div>
                <AutoResizeTextarea
                  minRows={3}
                  value={followUpWork}
                  onChange={(e) => setFollowUpWork(e.target.value)}
                  placeholder={initialDefaults.followUpWork}
                  className="flex-1 w-full bg-white border border-gray-300 rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-[#2E5A44] focus:outline-none transition-all"
                />
              </div>

              <div className="p-3.5 bg-[#F4F7F5] border-l-4 border-l-[#D4A373] rounded-xl flex flex-col h-full space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold text-[#1F3A2B]">
                    {t.crossCurricularLabel}
                  </label>
                  <SpeechToTextButton
                    lang={lang}
                    currentValue={crossCurricular}
                    onTranscript={(val) => setCrossCurricular(val)}
                    size="sm"
                  />
                </div>
                <AutoResizeTextarea
                  minRows={3}
                  value={crossCurricular}
                  onChange={(e) => setCrossCurricular(e.target.value)}
                  placeholder={initialDefaults.crossCurricular}
                  className="flex-1 w-full bg-white border border-gray-300 rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-[#2E5A44] focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Actions: Save & Print */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-gray-100">
              <div className="text-xs text-gray-500">
                {saveSuccessMsg && (
                  <span className="text-[#2E5A44] font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    {lang === 'fr'
                      ? 'Plan enregistré avec succès dans la mémoire !'
                      : lang === 'en'
                      ? 'Plan successfully saved to memory!'
                      : lang === 'de'
                      ? 'Plan erfolgreich im Speicher gesichert!'
                      : 'Plan salvat cu succes în memorie!'}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => handleDirectDownloadPdf()}
                  className="px-4 py-2.5 bg-[#2E5A44] hover:bg-[#1F3A2B] text-white font-bold text-xs rounded-xl shadow flex items-center justify-center gap-2 transition-all cursor-pointer flex-1 sm:flex-initial border border-[#D4A373]/40"
                  title="Descarcă direct fișierul PDF oficial complet cu toate cele 11 secțiuni"
                >
                  <Download className="w-4 h-4 text-[#D4A373]" />
                  <span>
                    {lang === 'fr'
                      ? 'Télécharger PDF'
                      : lang === 'en'
                      ? 'Download PDF'
                      : lang === 'de'
                      ? 'PDF Herunterladen'
                      : 'Descarcă PDF'}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleSaveLessonPlan();
                    onOpenPrint();
                  }}
                  className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-[#1F3A2B] font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer flex-1 sm:flex-initial"
                >
                  <Printer className="w-4 h-4 text-[#2E5A44]" />
                  <span>{t.printLessonBtn}</span>
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#2E5A44] hover:bg-[#1F3A2B] text-white font-bold text-xs rounded-xl shadow flex items-center justify-center gap-2 transition-all cursor-pointer flex-1 sm:flex-initial"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#D4A373]" />
                  <span>{t.saveLessonBtn}</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* TAB 2: SAVED PRESENTATION PLANS */}
      {activeTab === 'saved' && (
        <div className="space-y-4">
          {/* Search bar */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-1 max-w-md">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={savedSearchQuery}
                onChange={(e) => setSavedSearchQuery(e.target.value)}
                placeholder={
                  lang === 'fr'
                    ? 'Rechercher par titre, domaine ou objectif...'
                    : lang === 'en'
                    ? 'Search by title, domain, or aim...'
                    : lang === 'de'
                    ? 'Suchen nach Titel, Bereich oder Ziel...'
                    : 'Caută după titlu, domeniu sau obiectiv...'
                }
                className="w-full text-xs text-gray-800 placeholder-gray-400 focus:outline-none"
              />
            </div>
            <div className="text-xs font-semibold text-gray-500">
              {filteredSavedPlans.length} / {localizedPlans.length}{' '}
              {lang === 'fr' ? 'plans' : lang === 'en' ? 'plans' : lang === 'de' ? 'Pläne' : 'planuri'}
            </div>
          </div>

          {filteredSavedPlans.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl text-center border border-gray-200 space-y-3">
              <BookOpen className="w-10 h-10 text-gray-300 mx-auto" />
              <h3 className="text-sm font-bold text-gray-700">{t.emptySaved}</h3>
              <p className="text-xs text-gray-500">
                {lang === 'fr'
                  ? 'Créez votre première présentation en utilisant le formulaire ou l’assistant IA.'
                  : lang === 'en'
                  ? 'Create your first presentation using the form or AI assistant.'
                  : lang === 'de'
                  ? 'Erstellen Sie Ihre erste Darbietung mit dem Formular oder dem KI-Assistenten.'
                  : 'Creați prima prezentare folosind formularul sau asistentul inteligent AI.'}
              </p>
              <button
                type="button"
                onClick={() => setActiveTab('create')}
                className="px-4 py-2 bg-[#2E5A44] text-white rounded-lg text-xs font-semibold cursor-pointer shadow-sm hover:bg-[#1F3A2B]"
              >
                {t.createFirst}
              </button>
            </div>
          ) : (
            filteredSavedPlans.map((l) => (
              <div
                key={l.id}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 md:p-6 space-y-4 hover:border-[#2E5A44]/40 transition-colors"
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-gray-100 gap-2">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold text-[#2E5A44] bg-[#F4F7F5] px-2.5 py-0.5 rounded-full border border-[#2E5A44]/20">
                        {l.subject}
                      </span>
                      <span className="text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">
                        {l.ageGroup || l.level}
                      </span>
                      {l.duration && (
                        <span className="text-[11px] text-gray-500 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#D4A373]" />
                          {l.duration}
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-[#1F3A2B] mt-1.5">{l.title}</h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleEditSavedPlan(l)}
                      className="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-semibold rounded-lg flex items-center gap-1 border border-gray-200 transition-colors cursor-pointer"
                      title="Încarcă în editor"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-[#2E5A44]" />
                      <span>
                        {lang === 'fr' ? 'Modifier' : lang === 'en' ? 'Edit' : lang === 'de' ? 'Bearbeiten' : 'Editează'}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDirectDownloadPdf(l)}
                      className="px-2.5 py-1.5 bg-[#2E5A44] hover:bg-[#1F3A2B] text-white text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors cursor-pointer shadow-2xs"
                      title="Descarcă direct fișier PDF"
                    >
                      <Download className="w-3.5 h-3.5 text-[#D4A373]" />
                      <span>PDF</span>
                    </button>
                    <button
                      type="button"
                      onClick={onOpenPrint}
                      className="px-2.5 py-1.5 bg-[#F4F7F5] hover:bg-[#2E5A44]/10 text-[#2E5A44] text-xs font-semibold rounded-lg flex items-center gap-1 border border-[#2E5A44]/20 transition-colors cursor-pointer"
                      title="Previzualizare / Tipărire"
                    >
                      <Printer className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDeleteLessonPlan(l.id)}
                      className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                      title="Șterge"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Materials & Point of Interest */}
                {(l.materials || l.pointOfInterest) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs bg-gray-50 p-3 rounded-xl border border-gray-200">
                    {l.materials && (
                      <div>
                        <span className="font-bold text-gray-700 block mb-0.5">
                          {t.materialsLabel}:
                        </span>
                        <p className="text-gray-800">{l.materials}</p>
                      </div>
                    )}
                    {l.pointOfInterest && (
                      <div>
                        <span className="font-bold text-[#1F3A2B] flex items-center gap-1 mb-0.5">
                          <Target className="w-3.5 h-3.5 text-[#D4A373]" />
                          {t.pointOfInterestLabel}:
                        </span>
                        <p className="text-gray-800 italic">{l.pointOfInterest}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Direct & Indirect Aims */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-[#F4F7F5] border-l-4 border-l-[#2E5A44] rounded-lg">
                    <span className="font-bold text-[#2E5A44] block mb-0.5">
                      {t.directAimLabel}:
                    </span>
                    <p className="text-gray-800">{l.directAim}</p>
                  </div>
                  {(l.indirectAim || l.indirectAims) && (
                    <div className="p-3 bg-[#F4F7F5] border-l-4 border-l-[#D4A373] rounded-lg">
                      <span className="font-bold text-[#1F3A2B] block mb-0.5">
                        {t.indirectAimLabel}:
                      </span>
                      <p className="text-gray-800">{l.indirectAim || l.indirectAims}</p>
                    </div>
                  )}
                </div>

                {/* Procedure with Bullet Points */}
                {l.procedure && (
                  <div className="p-3 bg-white rounded-xl border border-gray-200 space-y-1.5 text-xs">
                    <span className="font-bold text-[#1F3A2B] block text-[11px] uppercase tracking-wider">
                      {t.procedureLabel}:
                    </span>
                    <div className="space-y-1 pl-1 text-gray-800 leading-relaxed">
                      {l.procedure.split('\n').map((line, idx) => {
                        const clean = line.replace(/^[•\-\*\d+\.]\s*/, '').trim();
                        if (!clean) return null;
                        return (
                          <div key={idx} className="flex items-start gap-2">
                            <span className="text-[#2E5A44] font-bold mt-0.5">•</span>
                            <span className="flex-1">{clean}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Follow-up Work & Cross-Curricular */}
                {(l.followUpWork || l.follow1 || l.crossCurricular || l.follow2) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                      <span className="text-[10px] uppercase font-bold text-[#2E5A44] tracking-wider block mb-1">
                        {t.followUpLabel}
                      </span>
                      <p className="text-gray-800">{l.followUpWork || l.follow1}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                      <span className="text-[10px] uppercase font-bold text-[#1F3A2B] tracking-wider block mb-1">
                        {t.crossCurricularLabel}
                      </span>
                      <p className="text-gray-800">{l.crossCurricular || l.follow2}</p>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 3: CURRICULUM PAR NIVEAUX DE DÉVELOPPEMENT */}
      {activeTab === 'curriculum' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Header Card */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <div>
              <h3 className="text-lg font-bold text-[#1F3A2B] font-serif flex items-center gap-2">
                <Compass className="w-5 h-5 text-[#2E5A44]" />
                <span>{curUI.headerTitle}</span>
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                {curUI.headerSubtitle}
              </p>
            </div>

            {/* Search and Expand/Collapse Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-gray-100">
              <div className="flex items-center gap-2 flex-1">
                <Search className="w-4 h-4 text-gray-400 shrink-0" />
                <input
                  type="text"
                  value={curriculumSearch}
                  onChange={(e) => setCurriculumSearch(e.target.value)}
                  placeholder={curUI.searchPlaceholder}
                  className="w-full text-xs text-gray-800 placeholder-gray-400 focus:outline-none"
                />
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleExpandAllPlanes}
                  className="px-2.5 py-1 text-[11px] font-semibold text-[#2E5A44] hover:text-[#1F3A2B] bg-[#F4F7F5] hover:bg-[#2E5A44]/10 rounded-lg border border-[#2E5A44]/20 transition-colors cursor-pointer"
                >
                  {curUI.expandAll}
                </button>
                <button
                  type="button"
                  onClick={handleCollapseAllPlanes}
                  className="px-2.5 py-1 text-[11px] font-semibold text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
                >
                  {curUI.collapseAll}
                </button>
              </div>
            </div>
          </div>

          {/* Level Tabs Bar - Styled like Presentation Module Navigation */}
          <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 pb-px">
            <button
              type="button"
              onClick={() => handleSelectPlaneTab('all')}
              className={`px-4 sm:px-5 py-3 text-xs font-bold border-b-2 -mb-px flex items-center gap-2 transition-all cursor-pointer ${
                selectedCurriculumPlane === 'all'
                  ? 'border-[#2E5A44] text-[#2E5A44] bg-white rounded-t-xl shadow-xs'
                  : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'
              }`}
            >
              <Layers
                className={`w-4 h-4 ${
                  selectedCurriculumPlane === 'all' ? 'text-[#2E5A44]' : 'text-[#D4A373]'
                }`}
              />
              <span>{curUI.allLevels}</span>
            </button>

            {curriculumLevels.map((lvl) => {
              const LevelIcon = getPlaneIcon(lvl.id);
              const isSelected = selectedCurriculumPlane === lvl.id;

              return (
                <button
                  key={lvl.id}
                  type="button"
                  onClick={() => handleSelectPlaneTab(lvl.id)}
                  className={`px-4 sm:px-5 py-3 text-xs font-bold border-b-2 -mb-px flex items-center gap-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#2E5A44] text-[#2E5A44] bg-white rounded-t-xl shadow-xs'
                      : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'
                  }`}
                >
                  <LevelIcon
                    className={`w-4 h-4 ${
                      isSelected ? 'text-[#2E5A44]' : 'text-[#D4A373]'
                    }`}
                  />
                  <span>{lvl.name}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                      isSelected
                        ? 'bg-[#2E5A44] text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {lvl.age}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Levels Accordion List - Each Level Expands on Click */}
          <div className="space-y-4">
            {curriculumLevels
              .filter(
                (lvl) => selectedCurriculumPlane === 'all' || selectedCurriculumPlane === lvl.id
              )
              .map((level) => {
                const isExpanded = curriculumSearch.trim()
                  ? true
                  : (expandedPlanes[level.id] ?? false);
                const LevelIcon = getPlaneIcon(level.id);

                // Filter domains and items by search
                const filteredDomains = level.domains
                  .map((dom) => ({
                    ...dom,
                    items: dom.items.filter((item) => {
                      if (!curriculumSearch.trim()) return true;
                      const q = curriculumSearch.toLowerCase();
                      return (
                        item.title.toLowerCase().includes(q) ||
                        item.materials.toLowerCase().includes(q) ||
                        item.directAim.toLowerCase().includes(q) ||
                        item.subject.toLowerCase().includes(q)
                      );
                    }),
                  }))
                  .filter((dom) => dom.items.length > 0);

                if (filteredDomains.length === 0) return null;

                const presentationsCount = filteredDomains.reduce(
                  (acc, d) => acc + d.items.length,
                  0
                );

                return (
                  <div
                    key={level.id}
                    className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden transition-all"
                  >
                    {/* Level Banner / Clickable Header Tab that unfolds on click */}
                    <div
                      onClick={() => togglePlaneExpanded(level.id)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          togglePlaneExpanded(level.id);
                        }
                      }}
                      className="bg-[#1F3A2B] hover:bg-[#183023] text-white p-5 cursor-pointer select-none transition-colors flex flex-col md:flex-row md:items-center justify-between gap-3"
                      title={isExpanded ? curUI.clickToCollapse : curUI.clickToExpand}
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#D4A373] border border-white/10 shrink-0">
                            <LevelIcon className="w-4 h-4" />
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full bg-[#D4A373] text-[#1F3A2B] font-bold text-xs">
                            {level.age}
                          </span>
                          <h4 className="text-base font-bold font-serif">{level.name}</h4>
                          <span className="text-xs text-white/70 font-mono hidden sm:inline">
                            • {level.planeTitle}
                          </span>
                        </div>
                        <p className="text-xs text-white/80 leading-relaxed">
                          {level.planeSubtitle}
                        </p>
                        <div className="text-[11px] text-[#D4A373] italic pt-1">
                          {curUI.psychologyPrefix} {level.psychologicalFocus}
                        </div>
                      </div>

                      {/* Right status badge & Toggle Chevron */}
                      <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-white/10 text-white/90 border border-white/15">
                          {presentationsCount} {curUI.presentationsCount}
                        </span>
                        <div
                          className={`w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center text-[#D4A373] transition-transform duration-200 ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                        >
                          <ChevronDown className="w-5 h-5" />
                        </div>
                      </div>
                    </div>

                    {/* Unfolded Content (Desfășurare la click) */}
                    {isExpanded && (
                      <div className="p-5 md:p-6 space-y-6 animate-fadeIn">
                        {filteredDomains.map((dom) => (
                          <div key={dom.domain} className="space-y-3">
                            <div className="border-b border-gray-100 pb-1.5">
                              <h5 className="text-sm font-bold text-[#2E5A44]">
                                {dom.domain}
                              </h5>
                              <p className="text-[11px] text-gray-500">{dom.description}</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                              {dom.items.map((item) => (
                                <div
                                  key={item.id}
                                  className="p-4 bg-[#F4F7F5] border border-gray-200/80 rounded-xl space-y-2.5 flex flex-col justify-between hover:border-[#2E5A44]/50 transition-all hover:shadow-xs"
                                >
                                  <div className="space-y-1.5">
                                    <div className="flex items-center justify-between gap-2">
                                      <span className="text-[10px] font-bold text-[#2E5A44] bg-white px-2 py-0.5 rounded border border-[#2E5A44]/20">
                                        {item.subject}
                                      </span>
                                      <span className="text-[10px] text-gray-500 font-mono">
                                        {item.duration}
                                      </span>
                                    </div>
                                    <h6 className="text-xs font-bold text-[#1F3A2B] leading-snug">
                                      {item.title}
                                    </h6>
                                    <div className="text-[11px] text-gray-600 line-clamp-2">
                                      <b>{curUI.materialsLabel}</b> {item.materials}
                                    </div>
                                    <div className="text-[11px] text-gray-700 leading-relaxed">
                                      <b>{curUI.directAimLabel}</b> {item.directAim}
                                    </div>
                                  </div>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleLoadCurriculumItem(
                                        item,
                                        `${level.name} (${level.age})`
                                      )
                                    }
                                    className="w-full mt-2 py-2 px-3 bg-white hover:bg-[#2E5A44] text-[#2E5A44] hover:text-white border border-[#2E5A44]/30 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs"
                                  >
                                    <span>{curUI.loadButton}</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* TAB 4: SCHEDULE MATRIX */}
      {activeTab === 'schedule' && (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <div>
            <h3 className="text-base font-bold text-[#1F3A2B] font-serif">
              {t.scheduleTitle}
            </h3>
            <p className="text-xs text-gray-500">
              {t.scheduleDesc}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-[#2E5A44] text-white">
                <tr>
                  <th className="p-3">Zi / Jour</th>
                  <th className="p-3">Domeniu / Subject</th>
                  <th className="p-3">Prezentare Tipică / Exemple</th>
                  <th className="p-3">Focus Pedagogic</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {weeklySchedule.map((row, idx) => (
                  <tr key={row.day} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#F4F7F5]'}>
                    <td className="p-3 font-bold text-[#2E5A44]">{row.day}</td>
                    <td className="p-3 font-semibold text-gray-900">{row.subject}</td>
                    <td className="p-3 text-gray-700">{row.type}</td>
                    <td className="p-3 text-gray-600 italic">{row.focus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 leading-relaxed">
            {t.casadeiNote}
          </div>
        </div>
      )}
    </div>
  );
};
