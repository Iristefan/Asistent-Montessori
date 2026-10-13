import { DictionaryTerm, InstitutionConfig, PraiseScenario, RoutineItem } from '../types';

export const DEFAULT_INSTITUTION: InstitutionConfig = {
  name: "L'École des Préalpes",
  subtitle: "École Montessori Privée Bilingue (Crèche, Maternelle, Primaire, Secondaire)",
  address: "Place de la Gare 14-16, 1618 Châtel-St-Denis",
  phone: "+41 76 429 71 27",
  email: "contact@ecole-des-prealpes.ch",
  contact: "Place de la Gare 14-16, 1618 Châtel-St-Denis | Tel: +41 76 429 71 27 | contact@ecole-des-prealpes.ch",
  logoUrl: "/logo-prealpes.svg",
};

export const DEFAULT_ROUTINES: RoutineItem[] = [
  { id: 'r1', label: 'Vérification des étagères et disposition esthétique du matériel (du simple au complexe)', category: 'dimineata', completed: false },
  { id: 'r2', label: 'Préparation de l’espace collation autonome, eau fraîche et serviettes propres', category: 'dimineata', completed: false },
  { id: 'r3', label: 'Vérification du papier, taille des crayons et éponges propres pour la vie pratique', category: 'dimineata', completed: false },
  { id: 'r4', label: 'Surveillance du grand cycle de travail de 3h (protection de la concentration sans interruption)', category: 'lucru', completed: false },
  { id: 'r5', label: 'Application de la règle des « mains dans le dos » – aide discrète sur demande ou pour la sécurité', category: 'lucru', completed: false },
  { id: 'r6', label: 'Supervision de la transition sereine vers les activités de plein air / récréation', category: 'dupa-amiaza', completed: false },
  { id: 'r7', label: 'Bilan court et synchronisation avec l’éducateur/guide de classe en fin de journée', category: 'dupa-amiaza', completed: false },
  { id: 'r8', label: 'Désinfection et mise à l’écart des matériels incomplets sur le « Plateau de Réparation »', category: 'dupa-amiaza', completed: false }
];

export const MONTESSORI_QUOTES = [
  {
    quote: "La plus grande preuve du succès d'un éducateur est de pouvoir dire : « Les enfants travaillent maintenant comme si je n'existais pas. »",
    source: "Dr. Maria Montessori, L'Esprit Absorbant"
  },
  {
    quote: "Ne dites jamais à un enfant : « Tu es trop petit pour faire ça. » Dites : « Apprenons ensemble comment faire. »",
    source: "Dr. Maria Montessori, Le Secret de l'Enfance"
  },
  {
    quote: "L'enfant qui développe son indépendance par des activités réelles perfectionne sa personnalité tout entière.",
    source: "Dr. Maria Montessori, La Découverte de l'Enfant"
  },
  {
    quote: "La première tâche de l'éducateur est de prendre soin de l'ambiance, et cette tâche a priorité sur tout le reste.",
    source: "Dr. Maria Montessori, De l'Enfant à l'Adulte"
  }
];

export const DICTIONARY_TERMS: DictionaryTerm[] = [
  {
    id: 't1',
    termRo: 'L’Esprit Absorbant',
    termOriginal: 'Absorbent Mind',
    category: 'Principes Fondamentaux',
    definition: 'La capacité unique de l’enfant de 0 à 6 ans d’absorber naturellement la culture, la langue et les coutumes de son environnement sans effort conscient, tel une éponge.',
    practicalApplication: 'L’adulte prépare une ambiance riche en langage précis, en beauté et en ordre, sachant que tout ce qui entoure l’enfant s’incarne dans sa personnalité.',
    quote: 'L’enfant absorbe le monde qui l’entoure pour en faire sa propre chair mentale.'
  },
  {
    id: 't2',
    termRo: 'La Normalisation',
    termOriginal: 'Normalization',
    category: 'Développement de l’Enfant',
    definition: 'Le processus par lequel l’enfant atteint un état spontané d’harmonie, de joie intérieure, d’autodiscipline et d’empathie sociale par le travail concentré librement choisi.',
    practicalApplication: 'Lorsqu’un enfant est profondément absorbé par un matériel, l’assistant veille à ce que personne ne vienne interrompre ce cycle précieux, s’abstenant même d’éloges superflus.',
    quote: 'La normalisation est le résultat le plus éclatant de tout notre travail éducatif.'
  },
  {
    id: 't3',
    termRo: 'Le Contrôle de l’Erreur',
    termOriginal: 'Control of Error',
    category: 'Ambiance & Matériel',
    definition: 'Le mécanisme d’autocorrection intégré mécaniquement, visuellement ou logiquement dans le matériel Montessori, permettant à l’enfant de constater lui-même l’erreur sans jugement de l’adulte.',
    practicalApplication: 'Dans la Tour Rose ou les cylindres, le cube restant ou la pièce décalée indique l’erreur. L’adulte garde les mains dans le dos et offre à l’enfant la satisfaction de résoudre le problème seul.',
    quote: 'Le contrôle de l’erreur donne à l’enfant le pouvoir sur son propre apprentissage.'
  },
  {
    id: 't4',
    termRo: 'Le Grand Cycle de Travail de 3 Heures',
    termOriginal: 'Three-Hour Work Cycle',
    category: 'Principes Fondamentaux',
    definition: 'Bloc de temps ininterrompu de 3 heures en matinée où l’enfant choisit ses activités, traverse une période initiale de recherche, puis une concentration profonde après une «fausse fatigue» passagère.',
    practicalApplication: 'Aucune interruption collective forcée ni récréation imposée durant cette période ; chaque enfant chemine à son rythme propre.',
    quote: 'C’est seulement par un travail long et ininterrompu que l’esprit de l’enfant trouve sa véritable nourriture.'
  },
  {
    id: 't5',
    termRo: 'L’Isolement de la Difficulté',
    termOriginal: 'Isolation of Difficulty',
    category: 'Ambiance & Matériel',
    definition: 'Principe fondamental de conception selon lequel une seule dimension ou propriété (taille, couleur, son, poids) varie à la fois, toutes les autres restant parfaitement constantes.',
    practicalApplication: 'Dans l’Escalier Marron, toutes les pièces partagent la même teinte et longueur (20 cm) ; seule l’épaisseur varie pour concentrer l’attention de l’enfant sans distraction visuelle.',
    quote: 'Pour aider l’esprit à distinguer, il faut lui présenter une seule difficulté à la fois.'
  },
  {
    id: 't6',
    termRo: 'L’Ambiance Préparée',
    termOriginal: 'Prepared Environment',
    category: 'Ambiance & Matériel',
    definition: 'Un espace à l’échelle de l’enfant, ordonné, lumineux, harmonieux et accessible, où chaque objet possède une place attitrée et une utilité réelle (verre, céramique, bois).',
    practicalApplication: 'Le matériel est disposé sur des étagères basses de gauche à droite, du plus simple au plus complexe. Aucun jouet artificiel ou décoration superflue.',
    quote: 'L’ambiance doit être conçue pour permettre à l’enfant de devenir le maître de ses actions.'
  },
  {
    id: 't7',
    termRo: 'La Leçon en Trois Temps',
    termOriginal: 'Three Period Lesson (Séguin)',
    category: 'Principes Fondamentaux',
    definition: 'Méthode concise pour transmettre un nouveau vocabulaire ou concept : 1. Nommer (« C’est... »), 2. Reconnaître (« Montre-moi... »), 3. Vérifier (« Qu’est-ce que c’est ? »).',
    practicalApplication: 'Utilisée pour les formes géométriques, les chiffres rugueux ou les couleurs. Si l’enfant hésite au temps 3, l’adulte ne corrige pas négativement mais reprend au temps 2 ultérieurement.',
    quote: 'Peu de paroles, des gestes nets et une attention bienveillante.'
  },
  {
    id: 't8',
    termRo: 'Grâce et Courtoisie',
    termOriginal: 'Grace and Courtesy',
    category: 'Vie Sociale & Paix',
    definition: 'Présentations concrètes des usages sociaux quotidiens : interrompre poliment, transporter une chaise sans bruit, saluer, ouvrir une porte ou demander pardon.',
    practicalApplication: 'Pas de sermons moraux au moment du conflit ; on présente calmement une saynète lors d’un moment neutre en classe.',
    quote: 'La politesse n’est pas une contrainte, mais la clé de l’harmonie communautaire.'
  },
  {
    id: 't9',
    termRo: 'La Table de Paix',
    termOriginal: 'Peace Table',
    category: 'Vie Sociale & Paix',
    definition: 'Espace serein où les enfants se rendent volontairement pour résoudre leurs différends avec un symbole de paix (fleur, galet, sablier) conférant le droit de parole exclusif.',
    practicalApplication: 'Les enfants s’expriment avec le dialogue bienveillant : « Je me suis senti... quand tu as... Je te demande dorénavant de... ». L’assistant demeure témoin discret.',
    quote: 'La paix n’est pas l’absence de guerre, mais une vertu qui naît de la force de l’âme.'
  },
  {
    id: 't10',
    termRo: 'Les Périodes Sensibles',
    termOriginal: 'Sensitive Periods',
    category: 'Développement de l’Enfant',
    definition: 'Fenêtres temporelles irremplaçables où l’enfant est irrésistiblement attiré par certains apprentissages précis (l’ordre, le mouvement, le langage, les petits objets, le raffinement sensoriel).',
    practicalApplication: 'À 2-3 ans, le besoin aigu d’ordre extérieur aide à construire l’ordre intérieur. Déplacer un matériel peut susciter une vive émotion.',
    quote: 'Les périodes sensibles sont des phares intérieurs qui éclairent le développement de l’enfant.'
  },
  {
    id: 't11',
    termRo: 'La Fausse Fatigue',
    termOriginal: 'False Fatigue',
    category: 'Principes Fondamentaux',
    definition: 'Phénomène survenant souvent vers 10h (environ 1h30 après le début du cycle), où la classe semble agitée. Si l’adulte n’interrompt pas, cette agitation cède la place à la concentration la plus profonde.',
    practicalApplication: 'L’équipe reste sereine sans rassembler les enfants au cercle ; on laisse la vague passer naturellement.',
    quote: 'Ne confondez jamais l’agitation de la recherche avec le désordre.'
  },
  {
    id: 't12',
    termRo: 'La Liberté dans les Limites',
    termOriginal: 'Freedom within Limits',
    category: 'Principes Fondamentaux',
    definition: 'L’enfant est libre de choisir son activité, sa durée et son lieu de travail, pourvu qu’il respecte le matériel et le travail concentré de ses pairs.',
    practicalApplication: '« Tu es libre de choisir tout matériel déjà présenté. Nous ne sommes pas libres de détruire le matériel ou de perturber un camarade. »',
    quote: 'La liberté sans limites est le chaos ; les limites sans liberté sont la tyrannie.'
  }
];

export const PRAISE_SCENARIOS: PraiseScenario[] = [
  {
    id: 'p1',
    situation: 'L’enfant a terminé un dessin géométrique complexe',
    category: 'Créativité & Effort',
    praiseRo: '« J’ai remarqué toute l’attention que tu as portée à chaque contour et la patience avec laquelle tu as nuancé les couleurs pendant trente minutes ! »',
    explanation: 'Décrit l’effort concret, la durée et la précision technique, en évitant les jugements subjectifs comme « Quel beau dessin ! ».'
  },
  {
    id: 'p2',
    situation: 'L’enfant a renversé de l’eau et a cherché la serpillière lui-même',
    category: 'Vie Pratique & Responsabilité',
    praiseRo: '« Je te remercie d’avoir remarqué l’eau renversée et d’avoir utilisé l’éponge pour garder le sol sec et sécurisé pour toute la classe. »',
    explanation: 'Valorise l’action réparatrice et la responsabilité communautaire sans culpabiliser l’enfant pour l’incident.'
  },
  {
    id: 'p3',
    situation: 'L’enfant a travaillé quarante minutes sans interruption avec la Tour Rose',
    category: 'Concentration & Volonté',
    praiseRo: '« Tu as posé chaque cube du plus grand au plus petit et vérifié du bout du doigt l’alignement parfait des arêtes. Tu semblais totalement absorbé par ton travail ! »',
    explanation: 'Valide l’expérience intérieure de concentration et la satisfaction intrinsèque du contrôle de l’erreur.'
  },
  {
    id: 'p4',
    situation: 'Deux enfants ont résolu un différend pour un tapis à la Table de Paix',
    category: 'Paix & Résolution de Conflits',
    praiseRo: '« Vous avez écouté attentivement ce que chacun avait sur le cœur et vous avez trouvé un accord équitable ensemble à la Table de Paix. »',
    explanation: 'Renforce l’écoute active et l’autonomie de résolution sans arbitrage autoritaire de l’adulte.'
  },
  {
    id: 'p5',
    situation: 'L’enfant a calculé une addition avec les barrettes de perles de couleur',
    category: 'Mathématiques & Rigueur',
    praiseRo: '« Tu as dénombré avec précision chaque perle et inscrit les chiffres exactement dans les colonnes du cahier. As-tu ressenti la progression de la somme ? »',
    explanation: 'Relie l’expérience sensorielle à la notation abstraite et pose une question réflexive.'
  }
];

export const ELEMENTARY_WEEKLY_SCHEDULE = [
  { day: 'Lundi', subject: 'Mathématiques & Arithmétique', type: 'Grande Leçon / Table de Pythagore / Fractions', focus: 'Des manipulations concrètes vers l’abstraction' },
  { day: 'Mardi', subject: 'Langage & Grammaire', type: 'Boîtes Grammaticales / Symboles de phrases', focus: 'Rôle du nom et dynamisme du verbe' },
  { day: 'Mercredi', subject: 'Géométrie Sensorielle', type: 'Cabinet Géométrique / Angles et Surfaces', focus: 'Étymologie, nomenclature et tracé' },
  { day: 'Jeudi', subject: 'Histoire & Éducation Cosmique', type: 'Le Grand Ruban Noir / Horloge des Ères', focus: 'Reconnaissance envers l’évolution de la Terre' },
  { day: 'Vendredi', subject: 'Biologie & Sciences Naturelles', type: 'Botanique / Cabinet des Feuilles / Zoologie', focus: 'Observation en nature et taxonomie systématique' }
];

export const DEFAULT_LESSON_PLANS = [
  {
    id: 'lp-sample-1',
    title: 'Mémorisation de l’Addition : Les Familles de Nombres',
    subject: 'Mathématiques',
    ageGroup: 'Maison des Enfants (4.5 – 6 ans)',
    level: 'Maison des Enfants (4.5 – 6 ans)',
    duration: '15 – 20 minutes',
    directAim: 'Mémorisation des combinaisons essentielles de l’addition avec sommes entre 2 et 18.',
    indirectAim: 'Développement de l’abstraction, autodiscipline et joie du calcul mental spontané.',
    procedure: '• Invitation : Le guide invite l’enfant au tapis pour explorer les familles de nombres.\n• Préparation : Transport doux du plateau avec le tableau des doigts et les réglettes en bois.\n• Présentation : Le guide pose la réglette bleue (ex: 4) puis la rouge (ex: 6) et montre la somme 10.\n• Contrôle de l’erreur : Vérification sur la grille de contrôle n° 1.\n• Clôture : Notation dans le cahier et rangement autonome sur l’étagère.',
    followUpWork: '• Résolution de 10 opérations avec le tableau des doigts pour l’addition et notation sur cahier.\n• Création d’un livret illustré personnel des « Familles du Nombre 10 » (ex. : 1+9, 2+8, 3+7).',
    crossCurricular: '• Contexte Artistique : Dessin d’un arbre des nombres avec feuilles par paires de 10.\n• Contexte Nature : Cueillette et groupement de feuilles et graines en paquets de dix.',
    materials: 'Tableau des doigts pour l’addition, bandes de bois (rouges et bleues), carnet d’équations, crayons.',
    pointOfInterest: 'Le point de rencontre des deux index sur la grille pour découvrir la somme.',
    createdAt: Date.now() - 86400000 * 2,
  },
  {
    id: 'lp-sample-2',
    title: 'Introduction aux Symboles Grammaticaux : Le Nom',
    subject: 'Langage',
    ageGroup: 'Maison des Enfants (4.5 – 6 ans)',
    level: 'Maison des Enfants (4.5 – 6 ans)',
    duration: '15 – 20 minutes',
    directAim: 'Reconnaissance du nom comme appellation de toutes les choses, êtres et lieux de l’Univers.',
    indirectAim: 'Prise de conscience de la structure linguistique, préparation à la lecture analytique, ordre mental.',
    procedure: '• Invitation : Le guide invite 2 enfants à manipuler le solide grammatical noir.\n• Préparation : Installation de la boîte des solides et des étiquettes sur le tapis.\n• Présentation : Le guide pose la pyramide noire dans la paume de l’enfant en expliquant que le Nom est solide et ancien comme les pyramides.\n• Contrôle de l’erreur : Symbole plan du triangle noir superposé aux étiquettes.\n• Clôture : Étiquetage d’objets dans la classe et rangement soigné.',
    followUpWork: '• Étiquetage de 6 objets de l’ambiance avec bandelettes et pose du triangle noir au-dessus.\n• Création d’une affiche de noms de la nature découpés ou dessinés.',
    crossCurricular: '• Contexte Géographique : Découverte des pyramides d’Égypte sur la carte puzzle de l’Afrique.\n• Contexte Artistique : Dessin et calligraphie de noms d’animaux préférés.',
    materials: 'Pyramide noire en bois, symbole plan en triangle équilatéral noir, boîte d’étiquettes manuscrites.',
    pointOfInterest: 'Le poids et la stabilité rassurante de la pyramide noire dans la paume de la main.',
    createdAt: Date.now() - 86400000 * 5,
  }
];
