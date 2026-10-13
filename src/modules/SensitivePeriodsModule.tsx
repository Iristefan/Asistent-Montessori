import React, { useState } from 'react';
import { Language, UI_TRANSLATIONS } from '../i18n/translations';
import { SpeechToTextButton } from '../components/SpeechToTextButton';
import {
  Sprout,
  Sparkles,
  BookOpen,
  HelpCircle,
  Eye,
  CheckCircle2,
  Clock,
  Layers,
  Heart,
  Baby,
  Sun,
  Globe,
  Loader2,
  Search,
  Filter,
  ArrowRight,
  ShieldCheck,
  Scale,
  ChevronDown,
} from 'lucide-react';

interface SensitivePeriodsModuleProps {
  lang: Language;
}

interface SensitivePeriodItem {
  id: string;
  name: Record<Language, string>;
  ageRange: string;
  category: 'infant' | 'casa' | 'elementary';
  signs: Record<Language, string>;
  materials: Record<Language, string[]>;
  bookRef: string;
  tip: Record<Language, string>;
}

const SENSITIVE_PERIODS_DATA: SensitivePeriodItem[] = [
  {
    id: 'sp-lang',
    name: {
      ro: 'Limbajul Vorbit & Scris',
      fr: 'Langage Oral & Écrit',
      en: 'Spoken & Written Language',
      de: 'Gesprochene & Geschriebene Sprache',
    },
    ageRange: '0 - 6 ani / ans / yrs / J.',
    category: 'casa',
    signs: {
      ro: 'Fascinație pentru mișcarea buzelor adultului, repetarea sonoră a cuvintelor, dorința de a atinge literele din șmirghel, compunerea de cuvinte cu alfabetul mobil.',
      fr: 'Fascination pour les mouvements de lèvres, répétition de mots entendus, envie de toucher les lettres rugueuses, écriture spontanée avec l’alphabet mobile.',
      en: 'Fascination with adult mouth movements, spontaneous repetition of words, urge to trace Sandpaper Letters, writing before reading via Movable Alphabet.',
      de: 'Faszination für Mundbewegungen, Lautwiederholungen, Drang zum Ertasten der Sandpapierbuchstaben, Schreiben mit dem beweglichen Alphabet.',
    },
    materials: {
      ro: ['Litere din Șmirghel', 'Alfabetul Mobil Mare și Mic', 'Căsuțe de Nomenclatură Clasificată', 'Cărți Ilustrate Tematice'],
      fr: ['Lettres Rugueuses', 'Grand et Petit Alphabet Mobile', 'Paniers d’Objets & Images Classifiées', 'Livrets Phonétiques'],
      en: ['Sandpaper Letters', 'Large & Small Movable Alphabet', 'Classified Nomenclature Cards', 'Phonetic Readers'],
      de: ['Sandpapierbuchstaben', 'Großes & Kleines Bewegliches Alphabet', 'Klassifizierte Bildkarten', 'Phonetische Erstlesebücher'],
    },
    bookRef: 'The Absorbent Mind (Maria Montessori, cap. 11-13)',
    tip: {
      ro: 'Folosiți un vocabular bogat, precis și științific (ex: «petală», «corolă», nu doar «floare»). Nu infantilizați limbajul.',
      fr: 'Employez un vocabulaire riche, exact et scientifique (ex. : « pétale », « sépale » plutôt que simplement « fleur »).',
      en: 'Use rich, precise, biological nomenclature (e.g., "corolla", "stamen" rather than just "flower"). Never baby-talk.',
      de: 'Verwenden Sie präzise, reiche Fachbegriffe (z.B. «Kelchblatt», «Staubblatt» statt nur «Blume»). Vermeiden Sie Babysprache.',
    },
  },
  {
    id: 'sp-order',
    name: {
      ro: 'Ordinea & Structura Mediului',
      fr: 'Ordre & Structure de l’Ambiance',
      en: 'Order & Environmental Structure',
      de: 'Ordnung & Äußere Struktur',
    },
    ageRange: '1.5 - 3 ani / ans / yrs / J.',
    category: 'infant',
    signs: {
      ro: 'Nevoie intensă ca fiecare obiect să revină la locul exact pe raft, neliniște la schimbarea rutinei sau a traseului, căutarea simetriei și a predictibilității.',
      fr: 'Besoin absolu que chaque objet retrouve sa place précise sur l’étagère, agitation lors de ruptures de rythme, recherche de symétrie et de prévisibilité.',
      en: 'Acute need for objects to return to their exact shelf location, visible distress during unexpected routine shifts, seeking ritual consistency.',
      de: 'Dringendes Bedürfnis nach festen Plätzen im Regal, Unruhe bei Störungen der Tagesroutine, Suche nach Vorhersehbarkeit und Symmetrie.',
    },
    materials: {
      ro: ['Rafturi aerisite cu o singură activitate pe tăviță', 'Rutine fixe de spălare și gustare', 'Puncte de reper clare în spațiul clasei'],
      fr: ['Étagères basses ordonnées (un plateau par activité)', 'Rituels constants de collation et vestiaire', 'Repères visuels stables'],
      en: ['Low shelves with one activity per tray', 'Consistent daily cycles for snack and arrival', 'Unchanging spatial landmarks'],
      de: ['Niedrige Regale mit Einzel-Tabletts', 'Feste Rituale bei Garderobe und Zwischenmahlzeit', 'Klare Raumzonen'],
    },
    bookRef: 'The Secret of Childhood (Maria Montessori, cap. 7)',
    tip: {
      ro: 'Ordinea exterioară din mediul pregătit este ancora pe care copilul mic își clădește ordinea mintală interioară.',
      fr: 'L’ordre extérieur de l’ambiance est le socle sur lequel le jeune enfant bâtit sa sécurité intérieure et sa clarté mentale.',
      en: 'External order in the prepared environment directly constructs the toddler’s inner mental classification.',
      de: 'Die äußere Ordnung des Raumes ist das Fundament, auf dem das Kind seine innere seelische Ordnung aufbaut.',
    },
  },
  {
    id: 'sp-movement',
    name: {
      ro: 'Rafinarea Mișcării & Coordonarea',
      fr: 'Raffinement du Mouvement & Équilibre',
      en: 'Refinement of Movement & Coordination',
      de: 'Verfeinerung der Bewegung & Koordination',
    },
    ageRange: '0 - 4.5 ani / ans / yrs / J.',
    category: 'infant',
    signs: {
      ro: 'Dorință puternică de a transporta greutăți (muncă grea), mersul repetat pe linie, turnarea precisă a apei și a boabelor, perfecționarea apucării cu trei degete (pensă).',
      fr: 'Désir de porter des charges lourdes (effort maximum), marche lente sur la ligne, versement minutieux d’eau et graines, prise en pince à trois doigts.',
      en: 'Seeking "maximum effort" by carrying heavy jugs or mats, walking on the line with balance, pincer grasp mastery with fine tweezers.',
      de: 'Drang zu Höchstanstrengung (schwere Krüge tragen), Balancieren auf der Linie, zielgenaues Gießen, Dreifingergriff mit Pinzette.',
    },
    materials: {
      ro: ['Cadre de Îmbrăcat (nasturi, fermoare)', 'Mersul pe Linie cu Clopoțel sau Pahar', 'Turnul Roz & Scara Maronie', 'Tăvițe de Transfer'],
      fr: ['Cadres d’Habillage', 'Marche sur la Ligne avec Clochette', 'Tour Rose & Escalier Marron', 'Plateaux de Pinces et Versés'],
      en: ['Dressing Frames (buttons, bows)', 'Walking on the Line holding bell or water', 'Pink Tower & Brown Stair', 'Transfer Trays'],
      de: ['Verschlussrahmen (Knöpfe, Schleifen)', 'Gehen auf der Linie mit Glocke', 'Rosa Turm & Braune Treppe', 'Schütt- und Umfüllübungen'],
    },
    bookRef: 'The Discovery of the Child (Maria Montessori, cap. 5)',
    tip: {
      ro: 'Mâna este organul inteligenței. Nu restrângeți mișcarea: oferiți-i un scop constructiv în viața practică.',
      fr: 'La main est l’instrument de l’intelligence. Dirigez le mouvement vers un but utile plutôt que de le réprimer.',
      en: 'The hand is the instrument of intelligence. Never stifle movement; direct it toward purposeful classroom work.',
      de: 'Die Hand ist das Werkzeug des Geistes. Unterdrücken Sie Bewegung nicht, sondern lenken Sie sie in sinnvolle Arbeit.',
    },
  },
  {
    id: 'sp-small',
    name: {
      ro: 'Atenția pentru Obiecte Mici & Detalii',
      fr: 'Intérêt pour les Minuscules Objets',
      en: 'Fixation on Small Objects & Details',
      de: 'Aufmerksamkeit für Winzige Objekte',
    },
    ageRange: '1 - 3 ani / ans / yrs / J.',
    category: 'infant',
    signs: {
      ro: 'Oprirea îndelungată pentru a privi o furnică, găsirea celor mai mici firimituri sau scame de pe covor, fascinație pentru găurele și mecanisme fine.',
      fr: 'Arrêt prolongé pour contempler une fourmi ou un insecte minuscule, ramassage minutieux de miettes invisibles, exploration du micro-détail.',
      en: 'Halting walks to examine tiny ants, pinpointing microscopic specks of lint on rugs, fascination with minuscule crevices and beads.',
      de: 'Langes Verweilen bei Ameisen auf dem Weg, Auflesen unscheinbarster Fusseln vom Teppich, Faszination für winzige Details.',
    },
    materials: {
      ro: ['Sortare de semințe diverse', 'Cutiuțe cu închizători minuscule', 'Înșirarea mărgelelor mici pe ață subțire', 'Tăviță cu luptă'],
      fr: ['Tri de graines variées', 'Boîtes à fermoirs délicats', 'Enfilage de perles fines sur cordon', 'Plateaux d’observation à la loupe'],
      en: ['Seed & Grain Sorting Trays', 'Delicate Latch Boxes', 'Fine Bead Threading on Lace', 'Magnifying Glass Trays'],
      de: ['Korn- und Samensortierung', 'Kleine Schatullen mit Häkchen', 'Perlenauffädeln auf dünne Schnur', 'Lupen-Beobachtungsset'],
    },
    bookRef: 'The Secret of Childhood (Maria Montessori, cap. 8)',
    tip: {
      ro: 'Copilul vede detalii minuscule pe care adultul le ignoră. Aveți răbdare și lăsați-l să exploreze fără grabă.',
      fr: 'L’adulte voit l’ensemble, le tout-petit voit le détail. Ralentissez votre rythme de marche pour l’accompagner.',
      en: 'Adults grasp global scenes; toddlers zero in on microscopic nuances. Slow your pace to match their gaze.',
      de: 'Der Erwachsene sieht das Ganze, das Kleinkind das kleinste Detail. Passen Sie Ihr Gehtempo der kindlichen Entdeckung an.',
    },
  },
  {
    id: 'sp-sensorial',
    name: {
      ro: 'Rafinarea Simțurilor (Senzorial)',
      fr: 'Raffinement Sensoriel',
      en: 'Refinement of the Senses (Sensorial)',
      de: 'Verfeinerung der Sinne (Sinneserziehung)',
    },
    ageRange: '2 - 6 ani / ans / yrs / J.',
    category: 'casa',
    signs: {
      ro: 'Explorarea tactilă a texturilor, potrivirea exactă a nuanțelor de culoare, discriminarea sunetelor fine, setea de a atinge și compara lumea fizică.',
      fr: 'Palpation passionnée des textures, classement des nuances chromatiques, écoute des sons feutrés, soif d’explorer la matière.',
      en: 'Passionate touch of rough and smooth surfaces, grading subtle color shades, discriminating soft sound cylinders, tactile hunger.',
      de: 'Erfühlen von Stoffstrukturen, Nuancieren von Farbschattierungen, Unterscheiden feiner Geräusche, Begreifen der Umwelt.',
    },
    materials: {
      ro: ['Cutiile Cromatice (1, 2, 3)', 'Cutiile cu Sunete', 'Tăblițele Tactile cu Șmirghel', 'Cilindrii cu Buton', 'Corpurile Geometrice'],
      fr: ['Boîtes de Couleurs 1, 2 et 3', 'Boîtes à Sons', 'Tablettes Rugueuses', 'Cylindres à Bouton', 'Solides Géométriques'],
      en: ['Color Boxes (1, 2, 3)', 'Sound Cylinders', 'Rough & Smooth Touch Boards', 'Knobbed Cylinders', 'Geometric Solids'],
      de: ['Farbtäfelchen 1, 2, 3', 'Geräuschdosen', 'Rauhe und Glatte Tastbretter', 'Einsatzzylinder', 'Geometrische Körper'],
    },
    bookRef: 'The Montessori Method (Maria Montessori, cap. 12-14)',
    tip: {
      ro: 'Materialele senzoriale sunt «materializări ale abstracției». Izolarea calității (doar culoarea, doar greutatea) este secretul învățării.',
      fr: 'Le matériel sensoriel matérialise l’abstraction. L’isolement d’une seule qualité sensible est le secret de la clarté intellectuelle.',
      en: 'Sensory materials are "materialized abstractions". Isolating a single sensory difficulty unlocks spontaneous classification.',
      de: 'Sinnesmaterialien sind materialisierte Abstraktionen. Die Isolierung einer einzigen Eigenschaft schafft geistige Klarheit.',
    },
  },
  {
    id: 'sp-social',
    name: {
      ro: 'Aspecte Sociale & Grație/Curtoazie',
      fr: 'Comportement Social, Grâce & Courtoisie',
      en: 'Social Aspects, Grace & Courtesy',
      de: 'Soziale Entwicklung, Anmut & Höflichkeit',
    },
    ageRange: '2.5 - 6 ani / ans / yrs / J.',
    category: 'casa',
    signs: {
      ro: 'Observarea atentă a regulilor grupului, dorința de a saluta la intrare, de a ajuta spontan colegii mici, cererea de scuze cu delicatețe.',
      fr: 'Observation attentive des règles de communauté, plaisir de saluer cordialement, aide spontanée envers les plus jeunes, politesse vécue.',
      en: 'Intent observation of community norms, genuine delight in greetings, spontaneous assistance to younger peers, courteous apology.',
      de: 'Aufmerksames Nachahmen sozialer Regeln, Freude am morgendlichen Gruß, spontane Hilfsbereitschaft für Jüngere, Höflichkeit.',
    },
    materials: {
      ro: ['Lecții de Grație și Curtoazie (salut, oferit foarfeca, strănutat)', 'Masa Păcii cu Trandafirul Păcii', 'Servirea Mesei în Comun'],
      fr: ['Présentations de Grâce et Courtoisie', 'Table de Paix avec la Rose de Paix', 'Service autonome du repas'],
      en: ['Grace & Courtesy Roleplay Lessons', 'Peace Table with Peace Rose', 'Communal Table Setting & Serving'],
      de: ['Übungen der Anmut und Höflichkeit', 'Friedenstisch mit der Friedensrose', 'Gemeinsames Tischdecken und Servieren'],
    },
    bookRef: 'The Absorbent Mind (Maria Montessori, cap. 20-22)',
    tip: {
      ro: 'Copilul mic nu învață bunele maniere prin predici, ci prin jocuri de rol scurte și modelare demnă din partea adulților.',
      fr: 'L’enfant n’apprend pas la politesse par des reproches, mais par de petites saynètes concrètes et l’exemplarité des adultes.',
      en: 'Children master courtesy through short, reverent roleplays and adult modeling, never through moralizing lectures.',
      de: 'Kinder lernen Höflichkeit nicht durch Belehrung, sondern durch kurze, freudige Rollenspiele und das Vorbild des Erwachsenen.',
    },
  },
  {
    id: 'sp-moral',
    name: {
      ro: 'Simțul Moral & Dreptatea Socială (Elementary)',
      fr: 'Sens Moral & Justice Sociale (Primaire)',
      en: 'Moral Sense & Social Justice (Elementary)',
      de: 'Moralischer Sinn & Soziale Gerechtigkeit',
    },
    ageRange: '6 - 12 ani / ans / yrs / J.',
    category: 'elementary',
    signs: {
      ro: 'Preocupare intensă pentru reguli corecte («Nu e corect!»), analiza binelui și răului, interes pentru ecologie și cauzalitatea marilor evenimente istorice.',
      fr: 'Préoccupation aiguë pour l’équité (« C’est pas juste ! »), questionnement éthique, passion pour les récits historiques et l’écologie mondiale.',
      en: 'Fierce concern with fairness ("That’s not fair!"), ethical debates on good vs bad, passion for ecological conservation and cosmic origins.',
      de: 'Starke Beschäftigung mit Gerechtigkeit («Das ist unfair!»), Fragen nach Gut und Böse, Engagement für Naturschutz und Geschichte.',
    },
    materials: {
      ro: ['Cele 5 Mari Lecții Cosmice', 'Masa Păcii Avansată (Consiliul Clasei)', 'Expediții în exterior («Going Out»)', 'Ceasul Erelor'],
      fr: ['Les 5 Grandes Leçons Cosmiques', 'Conseil de Classe & Médiation', 'Expéditions d’étude « Going Out »', 'L’Horloge des Ères'],
      en: ['The 5 Great Cosmic Lessons', 'Class Council & Peer Mediation', 'Student-Organized "Going Out" Trips', 'Clock of the Eras'],
      de: ['Die 5 Großen Kosmischen Erzählungen', 'Klassenrat & Schlichtung', 'Going-Out Erkundungsausflüge', 'Uhr der Erdzeitalter'],
    },
    bookRef: 'To Educate the Human Potential (Maria Montessori)',
    tip: {
      ro: 'Copilul de 6-12 ani are nevoie de eroi morali și de o perspectivă cosmică asupra rolului omului în Univers.',
      fr: 'L’enfant de 6-12 ans a soif de héros éthiques et d’une compréhension cosmique de la responsabilité humaine.',
      en: 'The 6-12 child seeks moral heroes and needs to understand human responsibility within the cosmic tapestry.',
      de: 'Das 6-12-jährige Kind verlangt nach moralischen Vorbildern und nach dem Verständnis der menschlichen Verantwortung im Kosmos.',
    },
  },
];

export const SensitivePeriodsModule: React.FC<SensitivePeriodsModuleProps> = ({
  lang,
}) => {
  const t = UI_TRANSLATIONS[lang];
  const sT = t.sensitive;

  const [activeTab, setActiveTab] = useState<'map' | 'guide' | 'ai'>('map');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'infant' | 'casa' | 'elementary'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>('sp-lang');

  // AI Consultant state
  const [consultantInput, setConsultantInput] = useState('');
  const [isConsulting, setIsConsulting] = useState(false);
  const [consultantResult, setConsultantResult] = useState<string | null>(null);
  const [consultantError, setConsultantError] = useState<string | null>(null);

  const samplePrompts: Record<Language, Array<{ label: string; text: string }>> = {
    ro: [
      {
        label: '👟 Copil 3.5 ani aranjează pantofii în ordine strictă',
        text: 'Un băiețel de 3 ani și jumătate devine foarte agitat dacă pantofii de interior nu sunt aliniați perfect la dungă și petrece mult timp sortând tăvițele.',
      },
      {
        label: '🐜 Copil 2 ani fascinat de insecte minuscule',
        text: 'O fetiță de 2 ani se oprește la fiecare pas în curte, adună cele mai mici fire de nisip și privește insectele minuscule timp de 20 de minute fără să vrea să plece.',
      },
      {
        label: '⚖️ Copil 6 ani preocupat de ce e «corect» la Masa Păcii',
        text: 'Un copil din clasa primară dezbate fiecare regulă a jocului, protestează când simte că cineva este nedreptățit și dorește să arbitreze colegii.',
      },
    ],
    fr: [
      {
        label: '👟 Enfant 3.5 ans range les chaussures avec minutie',
        text: 'Un enfant de 3 ans et demi s’agite si les chaussons ne sont pas alignés de manière strictement symétrique et passe beaucoup de temps à ordonner les plateaux.',
      },
      {
        label: '🐜 Enfant 2 ans fasciné par les minuscules insectes',
        text: 'Une petite fille de 2 ans s’arrête à chaque pas lors des sorties, ramasse la moindre brindille et observe les fourmis pendant 25 minutes sans bouger.',
      },
      {
        label: '⚖️ Enfant 6 ans préoccupé par la justice sociale',
        text: 'Un élève de 6 ans conteste vivement dès qu’il perçoit une inégalité de traitement et souhaite organiser un conseil pour établir des règles équitables.',
      },
    ],
    en: [
      {
        label: '👟 3.5-year-old demanding precise shoe alignment',
        text: 'A 3.5-year-old child becomes distressed if indoor slippers are not placed in exact symmetry on the rack and spends elongated periods resetting shelves.',
      },
      {
        label: '🐜 2-year-old captivated by tiny insects',
        text: 'A 2-year-old toddler stops at every flagstone on the playground, picking up microscopic pebbles and intently studying ants for 20 minutes.',
      },
      {
        label: '⚖️ 6-year-old focused on fairness & classroom justice',
        text: 'A 6-year-old elementary student passionately debates every rule, arguing about fairness and wanting peer conferences at the Peace Table.',
      },
    ],
    de: [
      {
        label: '👟 3,5-jähriges Kind verlangt exakte Ordnung der Schuhe',
        text: 'Ein dreieinhalbjähriges Kind protestiert, wenn Hausschuhe nicht exakt in einer Flucht stehen, und ordnet Tabletts im Regal immer wieder akribisch an.',
      },
      {
        label: '🐜 2-jähriges Kind fasziniert von kleinsten Insekten',
        text: 'Ein 2-jähriges Kleinkind bleibt bei jedem Spaziergang stehen, untersucht mikroskopische Körnchen und beobachtet Ameisen zwanzig Minuten lang versunken.',
      },
      {
        label: '⚖️ 6-jähriges Kind debattiert über Gerechtigkeit',
        text: 'Ein 6-jähriges Kind protestiert energisch gegen empfundene Ungerechtigkeiten und möchte feste Vereinbarungen am Friedenstisch treffen.',
      },
    ],
  };

  const filteredPeriods = SENSITIVE_PERIODS_DATA.filter((item) => {
    if (selectedFilter !== 'all' && item.category !== selectedFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const n = (item.name[lang] || '').toLowerCase();
      const s = (item.signs[lang] || '').toLowerCase();
      return n.includes(q) || s.includes(q);
    }
    return true;
  });

  const handleConsultAi = async (textToSend?: string) => {
    const text = textToSend || consultantInput;
    if (!text.trim() || isConsulting) return;

    setIsConsulting(true);
    setConsultantError(null);
    setConsultantResult(null);

    try {
      const response = await fetch('/api/analyze-sensitive-periods', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          observationText: text,
          lang,
        }),
      });

      const data = await response.json();
      if (!response.ok || data.error) {
        throw new Error(data.error || 'Erreur lors de la consultation.');
      }

      setConsultantResult(data.reply);
    } catch (err: any) {
      console.error(err);
      setConsultantError(err?.message || 'Erreur de communication avec l’IA.');
    } finally {
      setIsConsulting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2E5A44] text-white flex items-center justify-center shrink-0">
              <Sprout className="w-6 h-6 text-[#D4A373]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1F3A2B] font-serif">
                {sT.title}
              </h2>
              <p className="text-xs text-gray-500">{sT.subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-3 py-1.5 bg-[#FAF7F2] text-[#8C5E28] rounded-xl border border-[#D4A373]/30">
              Maria Montessori (1870–1952)
            </span>
          </div>
        </div>

        {/* Philosophy Principle Banner */}
        <div className="bg-[#F4F7F5] border-l-4 border-[#2E5A44] p-3.5 rounded-r-xl text-xs text-gray-700 leading-relaxed flex items-start gap-2">
          <BookOpen className="w-4 h-4 text-[#D4A373] shrink-0 mt-0.5" />
          <p>{sT.keyPrinciple}</p>
        </div>

        {/* Tab Nav */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-100">
          <button
            type="button"
            onClick={() => setActiveTab('map')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'map'
                ? 'bg-[#2E5A44] text-white shadow-xs'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            📌 {sT.tabMap}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('guide')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'guide'
                ? 'bg-[#2E5A44] text-white shadow-xs'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            🔍 {sT.tabGuide}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('ai')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'ai'
                ? 'bg-gradient-to-r from-[#2E5A44] to-[#1F3A2B] text-[#D4A373] shadow-xs'
                : 'bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{sT.tabAi}</span>
          </button>
        </div>
      </div>

      {activeTab === 'map' && (
        /* TAB 1: SENSITIVE PERIODS MAP */
        <div className="space-y-4">
          {/* Controls: Search and Filter Pills */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={sT.searchPlaceholder}
                className="w-full pl-9 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:bg-white focus:outline-none focus:border-[#2E5A44]"
              />
            </div>

            <div className="flex items-center gap-1.5 text-xs">
              <button
                type="button"
                onClick={() => setSelectedFilter('all')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  selectedFilter === 'all'
                    ? 'bg-[#2E5A44] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {sT.filterAll}
              </button>
              <button
                type="button"
                onClick={() => setSelectedFilter('infant')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  selectedFilter === 'infant'
                    ? 'bg-amber-800 text-white'
                    : 'bg-amber-50 text-amber-900 border border-amber-200'
                }`}
              >
                {sT.filterInfant}
              </button>
              <button
                type="button"
                onClick={() => setSelectedFilter('casa')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  selectedFilter === 'casa'
                    ? 'bg-emerald-800 text-white'
                    : 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                }`}
              >
                {sT.filterCasa}
              </button>
              <button
                type="button"
                onClick={() => setSelectedFilter('elementary')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  selectedFilter === 'elementary'
                    ? 'bg-sky-800 text-white'
                    : 'bg-sky-50 text-sky-900 border border-sky-200'
                }`}
              >
                {sT.filterElementary}
              </button>
            </div>
          </div>

          {/* Cards List */}
          <div className="space-y-3">
            {filteredPeriods.map((p) => {
              const isExpanded = expandedId === p.id;

              return (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl border border-gray-200/90 shadow-xs hover:border-[#2E5A44]/30 transition-all overflow-hidden"
                >
                  <div
                    onClick={() => setExpandedId(isExpanded ? null : p.id)}
                    className="p-5 flex items-center justify-between cursor-pointer select-none hover:bg-gray-50/50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#F4F7F5] border border-[#2E5A44]/20 flex items-center justify-center shrink-0">
                        <Sprout className="w-5 h-5 text-[#2E5A44]" />
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold text-[#1F3A2B] font-serif">
                            {p.name[lang]}
                          </h3>
                          <span className="text-[11px] font-semibold font-mono bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full">
                            {p.ageRange}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                          {p.signs[lang]}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#2E5A44] font-medium hidden sm:inline">
                        {isExpanded ? sT.hideDetails : sT.explore}
                      </span>
                      <div
                        className={`w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 transition-transform ${
                          isExpanded ? 'rotate-180 bg-[#2E5A44] text-white' : ''
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="p-5 border-t border-gray-100 bg-[#FAFBF9] space-y-4 animate-fadeIn">
                      <div>
                        <h4 className="text-xs font-bold text-[#1F3A2B] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                          <Eye className="w-3.5 h-3.5 text-[#D4A373]" />
                          <span>{sT.manifestations}</span>
                        </h4>
                        <p className="text-xs text-gray-700 leading-relaxed font-sans">
                          {p.signs[lang]}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-xs font-bold text-[#1F3A2B] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5 text-[#2E5A44]" />
                          <span>{sT.materials}</span>
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {p.materials[lang].map((mat, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-white border border-gray-200 px-3 py-1 rounded-lg text-gray-800 shadow-2xs flex items-center gap-1.5"
                            >
                              <CheckCircle2 className="w-3 h-3 text-[#2E5A44]" />
                              <span>{mat}</span>
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="bg-[#F4F7F5] border-l-4 border-[#D4A373] p-3 rounded-r-xl text-xs space-y-1">
                        <span className="font-bold text-[#1F3A2B] block">
                          💡 {sT.pedagogicalTip}:
                        </span>
                        <p className="text-gray-700 leading-relaxed">
                          {p.tip[lang]}
                        </p>
                        <span className="block text-[10px] text-gray-400 font-mono pt-1">
                          📖 {p.bookRef}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'guide' && (
        /* TAB 2: IDENTIFICATION GUIDE */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-[#1F3A2B] font-serif flex items-center gap-2">
              <Eye className="w-5 h-5 text-[#2E5A44]" />
              <span>{sT.howToRecognizeTitle}</span>
            </h3>

            <div className="space-y-3 text-xs text-gray-700 leading-relaxed">
              <div className="p-3.5 rounded-xl bg-[#F4F7F5] border border-gray-200 space-y-1">
                <span className="font-bold text-[#1F3A2B] flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#D4A373]" />
                  <span>{sT.guidePoint1Title}</span>
                </span>
                <p>
                  {sT.guidePoint1Desc}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F4F7F5] border border-gray-200 space-y-1">
                <span className="font-bold text-[#1F3A2B] flex items-center gap-1.5">
                  <Sun className="w-4 h-4 text-[#D4A373]" />
                  <span>{sT.guidePoint2Title}</span>
                </span>
                <p>
                  {sT.guidePoint2Desc}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F4F7F5] border border-gray-200 space-y-1">
                <span className="font-bold text-[#1F3A2B] flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-[#D4A373]" />
                  <span>{sT.guidePoint3Title}</span>
                </span>
                <p>
                  {sT.guidePoint3Desc}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-[#1F3A2B] font-serif flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#2E5A44]" />
              <span>{sT.whatToDoTitle}</span>
            </h3>

            <div className="space-y-3 text-xs text-gray-700 leading-relaxed">
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-1">
                <span className="font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>{sT.actionPoint1Title}</span>
                </span>
                <p>
                  {sT.actionPoint1Desc}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-1">
                <span className="font-bold flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-emerald-700" />
                  <span>{sT.actionPoint2Title}</span>
                </span>
                <p>
                  {sT.actionPoint2Desc}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-1">
                <span className="font-bold flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-emerald-700" />
                  <span>{sT.actionPoint3Title}</span>
                </span>
                <p>
                  {sT.actionPoint3Desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'ai' && (
        /* TAB 3: GEMINI AI CONSULTANT */
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-[#1F3A2B] via-[#2E5A44] to-[#396850] p-6 rounded-2xl text-white shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D4A373] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> {sT.aiTitle}
              </span>
              <span className="text-[11px] text-white/70">
                Grounded in The Absorbent Mind & AMI
              </span>
            </div>
            <p className="text-xs text-white/80 leading-relaxed">{sT.aiDesc}</p>

            {/* Quick Test Prompt Chips */}
            <div className="space-y-1.5">
              <span className="text-[11px] text-white/70 font-semibold block">
                Exemples de situations cliniques à tester :
              </span>
              <div className="flex flex-wrap gap-2">
                {(samplePrompts[lang] || samplePrompts.fr).map((s, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setConsultantInput(s.text);
                      handleConsultAi(s.text);
                    }}
                    className="text-xs bg-white/10 hover:bg-white/20 border border-white/25 px-3 py-1.5 rounded-xl text-white text-left transition-colors cursor-pointer"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Form */}
            <div className="relative pt-2">
              <textarea
                value={consultantInput}
                onChange={(e) => setConsultantInput(e.target.value)}
                placeholder={sT.aiPlaceholder}
                rows={4}
                className="w-full bg-white/10 border border-white/30 rounded-xl p-3.5 pr-10 text-xs text-white placeholder-white/50 focus:outline-none focus:border-[#D4A373] focus:bg-white/15"
              />
              <div className="absolute right-2.5 bottom-3.5">
                <SpeechToTextButton
                  lang={lang}
                  currentValue={consultantInput}
                  onTranscript={(txt) =>
                    setConsultantInput((prev) => (prev ? prev + ' ' + txt : txt))
                  }
                  size="sm"
                />
              </div>
            </div>

            {consultantError && (
              <p className="text-xs text-red-200 bg-red-900/40 p-2.5 rounded-lg">
                ⚠️ {consultantError}
              </p>
            )}

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => handleConsultAi()}
                disabled={isConsulting || !consultantInput.trim()}
                className="px-5 py-2.5 bg-[#D4A373] hover:bg-[#c29363] disabled:opacity-50 text-[#1F3A2B] font-bold text-xs rounded-xl shadow flex items-center gap-2 transition-all cursor-pointer"
              >
                {isConsulting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{sT.aiAnalyzing}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>{sT.aiBtn}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* AI Response Card */}
          {consultantResult && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4 animate-fadeIn">
              <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#2E5A44] flex items-center justify-center">
                  <Sprout className="w-5 h-5 text-[#2E5A44]" />
                </div>
                <h3 className="text-base font-bold text-[#1F3A2B] font-serif">
                  🌿 Recommandation Pédagogique Montessori :
                </h3>
              </div>

              <div className="prose prose-xs max-w-none text-gray-800 leading-relaxed whitespace-pre-line font-sans">
                {consultantResult}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
