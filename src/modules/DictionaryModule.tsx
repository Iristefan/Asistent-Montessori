import React, { useState } from 'react';
import { Language, UI_TRANSLATIONS } from '../i18n/translations';
import { BookOpen, Search, Quote, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

interface DictionaryModuleProps {
  lang: Language;
}

interface MultilingualTerm {
  id: string;
  originalTerm: string;
  category: 'principles' | 'materials' | 'childDev' | 'peace';
  translations: Record<Language, {
    title: string;
    definition: string;
    application: string;
    quote?: string;
  }>;
}

const MULTILINGUAL_DICTIONARY: MultilingualTerm[] = [
  {
    id: 't1',
    originalTerm: 'Absorbent Mind',
    category: 'principles',
    translations: {
      ro: {
        title: 'Mintea Absorbantă',
        definition: 'Capacitatea unică a copilului de la 0 la 6 ani de a absorbi cunoștințele și limba maternă din mediul înconjurător fără efort conștient, întocmai ca un burete.',
        application: 'Adultul oferă un mediu bogat în limbaj corect, frumusețe și ordine, conștient că tot ceea ce există în mediu devine parte din personalitatea copilului.',
        quote: 'Copilul asimilează mediul nu doar prin intelect, ci prin însăși ființa sa vie.'
      },
      fr: {
        title: 'L’Esprit Absorbant',
        definition: 'La capacité unique de l’enfant de 0 à 6 ans d’absorber naturellement la culture, la langue et les coutumes de son environnement sans effort conscient.',
        application: 'L’adulte prépare une ambiance riche en langage précis et en ordre, sachant que tout ce qui entoure l’enfant s’incarne dans sa personnalité.',
        quote: 'L’enfant absorbe le monde qui l’entoure pour en faire sa propre chair mentale.'
      },
      en: {
        title: 'The Absorbent Mind',
        definition: 'The unique, effortless mental capacity of children from birth to age six to absorb culture, language, and knowledge directly from their surroundings.',
        application: 'The assistant models precise speech and careful movement, recognizing that the prepared environment becomes part of the child’s character.',
        quote: 'The child creates his own mental muscles, using for this what he finds in the world about him.'
      },
      de: {
        title: 'Der Absorbierende Geist',
        definition: 'Die einzigartige Fähigkeit des Kindes von 0 bis 6 Jahren, Sprache, Kultur und Umgebungseindrücke mühelos wie ein Schwamm in sich aufzunehmen.',
        application: 'Der Assistent sorgt für sprachliche Klarheit, Schönheit und Ordnung, da jeder Eindruck die innere Persönlichkeit des Kindes formt.',
        quote: 'Das Kind assimiliert die Umwelt nicht nur mit dem Verstand, sondern mit seinem ganzen lebendigen Wesen.'
      }
    }
  },
  {
    id: 't2',
    originalTerm: 'Normalization',
    category: 'childDev',
    translations: {
      ro: {
        title: 'Normalizarea',
        definition: 'Procesul prin care copilul atinge o stare firească de armonie, bucurie, autodisciplină și pace interioară în urma concentrării profunde asupra unei munci libere alese.',
        application: 'Când un copil intră într-o stare de concentrare profundă cu un material, asistentul nu intervine nici măcar pentru a-l lăuda, ci protejează momentul.',
        quote: 'Normalizarea este cel mai important rezultat al întregii noastre munci pedagogice.'
      },
      fr: {
        title: 'La Normalisation',
        definition: 'Le processus par lequel l’enfant atteint un état spontané d’harmonie, de joie intérieure, d’autodiscipline et d’empathie sociale par le travail concentré librement choisi.',
        application: 'Lorsqu’un enfant est profondément absorbé par un matériel, l’assistant veille à ce que personne ne vienne interrompre ce cycle précieux.',
        quote: 'La normalisation est le résultat le plus éclatant de tout notre travail éducatif.'
      },
      en: {
        title: 'Normalization',
        definition: 'The process whereby a child achieves inner harmony, calm self-discipline, joy, and sociability through repeated spontaneous concentration on meaningful work.',
        application: 'When deep concentration occurs, the assistant steps back entirely, resisting the urge to praise or interrupt.',
        quote: 'Normalization is the single most important outcome of our entire work.'
      },
      de: {
        title: 'Die Normalisierung',
        definition: 'Der Prozess, durch den das Kind durch wiederholte, tiefe Konzentration auf frei gewählte Arbeit zu innerer Ruhe, Freude und Selbstdisziplin gelangt.',
        application: 'Sobald ein Kind versunken arbeitet, tritt der Assistent schützend in den Hintergrund und unterbricht das Kind keinesfalls.',
        quote: 'Die Normalisierung ist das kostbarste Ergebnis unserer gesamten Erziehungsarbeit.'
      }
    }
  },
  {
    id: 't3',
    originalTerm: 'Control of Error',
    category: 'materials',
    translations: {
      ro: {
        title: 'Controlul Erorii',
        definition: 'Mecanismul de autocorectare integrat mecanic, vizual sau logic direct în materialele Montessori, eliminând judecata sau corecția adultului.',
        application: 'În Turnul Roz sau Cilindri, piesa rămasă indică eroarea mecanic. Adultul își ține mâinile la spate și permite rezolvarea autonomă.',
        quote: 'Controlul erorii îi conferă copilului putere asupra propriei învățări.'
      },
      fr: {
        title: 'Le Contrôle de l’Erreur',
        definition: 'Le mécanisme d’autocorrection visuel ou mécanique intégré dans le matériel Montessori, rendant inutile le jugement ou la correction de l’adulte.',
        application: 'Dans la Tour Rose ou les emboîtements cylindriques, le cube mal ajusté s’impose de lui-même sans que l’adulte n’ait à intervenir.',
        quote: 'Le contrôle de l’erreur donne à l’enfant la pleine souveraineté sur son apprentissage.'
      },
      en: {
        title: 'Control of Error',
        definition: 'The self-correcting design built into Montessori materials, providing instant mechanical or visual feedback directly to the child.',
        application: 'Hands stay behind the back when a piece does not fit; the material itself guides the child toward autonomous correction.',
        quote: 'The control of error guides the child towards perfection without fear of judgment.'
      },
      de: {
        title: 'Die Fehlerkontrolle',
        definition: 'Der im Montessori-Material eingebaute visuelle oder mechanische Selbstkontrollmechanismus, der die Zensur des Erwachsenen überflüssig macht.',
        application: 'Beim Rosa Turm oder den Einsatzzylindern zeigt die nicht passende Form den Fehler sofort. Der Assistent lässt das Kind eigenständig tüfteln.',
        quote: 'Die Fehlerkontrolle schenkt dem Kind Unabhängigkeit von der Beurteilung anderer.'
      }
    }
  },
  {
    id: 't4',
    originalTerm: 'Three-Hour Work Cycle',
    category: 'principles',
    translations: {
      ro: {
        title: 'Ciclul de Lucru de 3 Ore',
        definition: 'Bloc de timp neîntrerupt de 3 ore în cursul dimineții în care copiii aleg liber activități, traversează oboseala falsă și ating concentrare profundă.',
        application: 'Nu se organizează activități colective forțate sau pauze în acest interval; fiecare copil își respectă ritmul intern.',
        quote: 'Numai printr-o muncă îndelungată spiritul copilului își găsește adevărata hrană.'
      },
      fr: {
        title: 'Le Grand Cycle de 3 Heures',
        definition: 'Plage de travail autonome ininterrompue de trois heures chaque matin permettant à l’enfant de vivre le cycle complet de concentration.',
        application: 'Aucune interruption collective n’est imposée ; la collation est autonome et individuelle.',
        quote: 'C’est dans le travail long et continu que l’âme de l’enfant trouve son véritable aliment.'
      },
      en: {
        title: 'The Three-Hour Work Cycle',
        definition: 'An unbroken three-hour morning work period where children move freely, experience false fatigue, and attain deep concentration.',
        application: 'No whole-group circle interruptions or scheduled recess; individual autonomy is safeguarded.',
        quote: 'Only through long, continuous work does the child discover their deepest powers.'
      },
      de: {
        title: 'Der 3-Stunden-Arbeitszyklus',
        definition: 'Ein ununterbrochener dreistündiger Arbeitsblock am Vormittag für selbstgewählte Arbeit und natürliche Konzentrationsphasen.',
        application: 'Keine erzwungenen gemeinsamen Pausen; die Vesper wird individuell und selbstständig eingenommen.',
        quote: 'Nur in der anhaltenden Arbeit findet der Geist des Kindes seine wahre Nahrung.'
      }
    }
  },
  {
    id: 't5',
    originalTerm: 'Isolation of Difficulty',
    category: 'materials',
    translations: {
      ro: {
        title: 'Izolarea Dificultății',
        definition: 'Principiu conform căruia o singură proprietate (mărime, culoare, textură) variază într-un material, toate celelalte atribute rămânând constante.',
        application: 'În Scara Maro, toate piesele au aceeași culoare (maro) și lungime (20 cm); diferă doar grosimea și înălțimea.',
        quote: 'Pentru a ajuta mintea să discearnă, trebuie să-i prezentăm o singură dificultate la un moment dat.'
      },
      fr: {
        title: 'L’Isolement de la Difficulté',
        definition: 'Principe de conception du matériel où une seule caractéristique sensorielle (dimension, nuance, texture) varie à la fois.',
        application: 'Dans l’Escalier Marron, chaque prisme mesure 20 cm et a la même couleur ; seule l’épaisseur varie progressivement.',
        quote: 'Pour aider l’esprit à discerner, il faut lui présenter une seule difficulté à la fois.'
      },
      en: {
        title: 'Isolation of Difficulty',
        definition: 'Design principle ensuring that only one sensory quality (e.g., dimension, color, sound pitch) varies in any single material.',
        application: 'In the Brown Stairs, color and length are constant; only the cross-sectional thickness increases incrementally.',
        quote: 'To aid the mind in discernment, present one difficulty at a time.'
      },
      de: {
        title: 'Die Isolation der Schwierigkeit',
        definition: 'Materialprinzip, bei dem sich stets nur eine einzige Sinnesqualität ändert (z.B. nur die Dicke oder nur der Farbton).',
        application: 'Bei der Braunen Treppe sind Länge und Farbe identisch; einzig die Querschnittsfläche variiert stufenweise.',
        quote: 'Um dem Geist die Unterscheidung zu erleichtern, isolieren wir stets nur eine Schwierigkeit.'
      }
    }
  },
  {
    id: 't6',
    originalTerm: 'Prepared Environment',
    category: 'materials',
    translations: {
      ro: {
        title: 'Mediul Pregătit',
        definition: 'Un spațiu proporțional corpului copilului, ordonat, luminos, estetic și accesibil, în care fiecare obiect are un loc precis.',
        application: 'Materialele sunt așezate pe rafturi joase, deschise, de la stânga la dreapta și de la simplu la complex.',
        quote: 'Mediul trebuie să permită copilului să devină stăpânul acțiunilor sale.'
      },
      fr: {
        title: 'L’Ambiance Préparée',
        definition: 'Un espace conçu spécialement à l’échelle de l’enfant, ordonné, lumineux et harmonieux, où chaque matériel a une place précise.',
        application: 'Les étagères basses présentent le matériel de gauche à droite, du plus simple au plus complexe, toujours complet et réparé.',
        quote: 'L’ambiance doit être conçue pour que l’enfant puisse agir de manière autonome.'
      },
      en: {
        title: 'The Prepared Environment',
        definition: 'A carefully curated space proportioned to the child, orderly, aesthetic, and accessible, where everything has an exact purposeful place.',
        application: 'Open low shelves display materials from left to right and simple to complex, inviting spontaneous exploration.',
        quote: 'The environment must be prepared so that the child can express their natural activity.'
      },
      de: {
        title: 'Die Vorbereitete Umgebung',
        definition: 'Ein kindgerechter, lichter, ästhetischer und geordneter Raum, in dem jedes Material seinen festen, wohlüberlegten Platz hat.',
        application: 'Niedrige offene Regale präsentieren die Arbeiten von links nach rechts und vom Konkreten zum Abstrakten.',
        quote: 'Die Umgebung muss so vorbereitet sein, dass das Kind Herr seiner Handlungen werden kann.'
      }
    }
  },
  {
    id: 't7',
    originalTerm: 'Grace and Courtesy',
    category: 'peace',
    translations: {
      ro: {
        title: 'Grație și Curtoazie',
        definition: 'Lecții practice explicite prin care copiii exersează convențiile sociale cotidiene: cum să întrerupă respectuos, cum să transporte un scaun sau să salute.',
        application: 'Nu se dau prelegeri moralizatoare în momentul conflictului; se prezintă o mică scenetă calmă într-un moment neutru de lucru.',
        quote: 'Bunele maniere nu sunt reguli impuse, ci cheia integrării armonioase în comunitate.'
      },
      fr: {
        title: 'Grâce et Courtoisie',
        definition: 'Présentations concrètes des usages sociaux : comment saluer, déplacer une chaise sans bruit, demander poliment ou attendre son tour.',
        application: 'L’adulte ne sermonne pas en plein conflit ; il démontre le geste gracieux dans un moment calme et neutre.',
        quote: 'La politesse montessorienne est la clé vivante de la vie en société.'
      },
      en: {
        title: 'Grace and Courtesy',
        definition: 'Explicit practical presentations teaching social skills: how to greet someone, carry a chair silently, apologize, or wait patiently.',
        application: 'Lessons are given during peaceful neutral times, never as punitive lectures during a live conflict.',
        quote: 'Social graces are not artificial manners, but expressions of mutual respect in community.'
      },
      de: {
        title: 'Anmut und Höflichkeit',
        definition: 'Konkrete Übungen des sozialen Zusammenlebens: leises Stuhltragen, rücksichtsvolles Ansprechen, Begrüßen und Entschuldigen.',
        application: 'Wird in ruhigen Momenten als kurze Darbietung geübt, niemals als Standpauke während eines Streits.',
        quote: 'Gute Manieren sind keine Zwänge, sondern der Schlüssel zur friedlichen Gemeinschaft.'
      }
    }
  }
];

export const DictionaryModule: React.FC<DictionaryModuleProps> = ({ lang }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>('t1');

  const t = UI_TRANSLATIONS[lang].dict;

  const categories = [
    { id: 'all', label: t.all },
    { id: 'principles', label: t.principles },
    { id: 'materials', label: t.materials },
    { id: 'childDev', label: t.childDev },
    { id: 'peace', label: t.peace },
  ];

  const filteredTerms = MULTILINGUAL_DICTIONARY.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;
    const trans = item.translations[lang] || item.translations.ro;
    const query = searchTerm.toLowerCase();
    const matchesSearch =
      trans.title.toLowerCase().includes(query) ||
      item.originalTerm.toLowerCase().includes(query) ||
      trans.definition.toLowerCase().includes(query) ||
      trans.application.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#2E5A44] text-white flex items-center justify-center shrink-0">
            <BookOpen className="w-6 h-6 text-[#D4A373]" />
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

        <p className="text-xs text-gray-600 bg-[#F4F7F5] p-3 rounded-xl border border-[#2E5A44]/20 leading-relaxed">
          {t.intro}
        </p>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full bg-gray-50 border border-gray-300 rounded-xl pl-9 pr-3 py-2 text-xs focus:bg-white focus:outline-none focus:border-[#2E5A44]"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#2E5A44] text-white font-bold shadow-xs'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Terms Accordion List */}
      <div className="space-y-3">
        {filteredTerms.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-2xl border border-gray-200 text-gray-500 text-xs">
            {t.noResults} „{searchTerm}”.
          </div>
        ) : (
          filteredTerms.map((term) => {
            const isExpanded = expandedId === term.id;
            const trans = term.translations[lang] || term.translations.ro;
            return (
              <div
                key={term.id}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden transition-all"
              >
                {/* Header Row */}
                <button
                  type="button"
                  onClick={() => toggleExpand(term.id)}
                  className="w-full text-left p-4 md:p-5 flex items-center justify-between gap-4 hover:bg-gray-50/80 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#D4A373]" />
                    <div>
                      <h3 className="text-sm md:text-base font-bold text-[#1F3A2B] font-serif">
                        {trans.title}
                      </h3>
                      <span className="text-xs text-gray-500 font-mono italic">
                        {term.originalTerm}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[10px] uppercase font-bold text-[#2E5A44] bg-[#F4F7F5] px-2.5 py-1 rounded-full border border-[#2E5A44]/20 hidden sm:inline-block">
                      {term.originalTerm}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                </button>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="p-5 md:p-6 bg-[#F4F7F5]/60 border-t border-gray-100 space-y-4 text-xs animate-fadeIn">
                    <div>
                      <h4 className="font-bold text-[#2E5A44] uppercase tracking-wider text-[11px] mb-1">
                        {t.defTitle}
                      </h4>
                      <p className="text-gray-800 leading-relaxed text-xs md:text-sm">
                        {trans.definition}
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-gray-200">
                      <h4 className="font-bold text-[#1F3A2B] uppercase tracking-wider text-[11px] mb-1 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#D4A373]" /> {t.appTitle}
                      </h4>
                      <p className="text-gray-700 leading-relaxed">
                        {trans.application}
                      </p>
                    </div>

                    {trans.quote && (
                      <div className="p-3 bg-[#2E5A44]/10 rounded-xl border-l-4 border-l-[#2E5A44] text-gray-800 italic flex items-start gap-2">
                        <Quote className="w-4 h-4 text-[#2E5A44] shrink-0 mt-0.5" />
                        <span>„{trans.quote}”</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
