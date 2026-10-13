import { MontessoriCalendarEvent } from '../types';

export const MONTESSORI_CALENDAR_EVENTS: MontessoriCalendarEvent[] = [
  // 1. IANUARIE - Deschiderea Primei Casa dei Bambini (1907)
  {
    id: 'casa-dei-bambini-1907',
    month: 1,
    day: 6,
    category: 'founder',
    iconName: 'Sparkles',
    dateDisplay: {
      ro: '6 Ianuarie',
      fr: '6 Janvier',
      en: 'January 6',
      de: '6. Januar',
    },
    title: {
      ro: 'Deschiderea Primei «Casa dei Bambini» (1907)',
      fr: 'Ouverture de la Première « Casa dei Bambini » (1907)',
      en: 'Opening of the First « Casa dei Bambini » (1907)',
      de: 'Eröffnung des ersten « Casa dei Bambini » (1907)',
    },
    subtitle: {
      ro: 'Nașterea Pedagogiei Montessori în cartierul San Lorenzo din Roma',
      fr: 'Naissance de la pédagogie Montessori dans le quartier San Lorenzo à Rome',
      en: 'Birth of Montessori Pedagogy in San Lorenzo, Rome',
      de: 'Geburtsstunde der Montessori-Pädagogik in San Lorenzo, Rom',
    },
    historicalContext: {
      ro: 'Pe 6 ianuarie 1907, de sărbătoarea Epifaniei, dr. Maria Montessori a deschis prima școală pentru copiii defavorizați pe Via dei Marsi 58, San Lorenzo. Aici au avut loc primele observații revoluționare despre concentrarea spontană a copilului, dragostea de ordine și autodisciplină.',
      fr: 'Le 6 janvier 1907, jour de l\'Épiphanie, le Dr Maria Montessori inaugurait la première école pour enfants défavorisés au 58 Via dei Marsi à Rome. C\'est là que sont nées les découvertes fondamentales sur la concentration spontanée, l\'amour de l\'ordre et l\'autodiscipline.',
      en: 'On January 6, 1907, the Feast of the Epiphany, Dr. Maria Montessori opened the first school for impoverished children at 58 Via dei Marsi, San Lorenzo, Rome. Here, the world first witnessed spontaneous concentration, profound love of order, and natural self-discipline.',
      de: 'Am 6. Januar 1907 eröffnete Dr. Maria Montessori die erste Schule für benachteiligte Kinder in San Lorenzo, Rom. Hier entdeckte sie die spontane Konzentration, die Liebe zur Ordnung und die natürliche Selbstdisziplin des Kindes.',
    },
    pedagogicalMeaning: {
      ro: 'Celebrăm transformarea copilului și crezul că într-un mediu pregătit cu iubire și respect, orice copil își poate atinge potențialul maxim de normalizare.',
      fr: 'Célébration de la transformation de l\'enfant et de la certitude que dans une ambiance préparée avec respect, chaque enfant révèle son plein potentiel.',
      en: 'We celebrate the transformation of the child and the revelation that in a loving prepared environment, every child achieves normalization.',
      de: 'Feier der Transformation des Kindes und der Erkenntnis, dass eine vorbereitete Umgebung das volle Potenzial jedes Kindes entfaltet.',
    },
    classroomActivities: {
      ro: {
        toddler: 'Curățarea și aranjarea festivă a rafturilor din clasă cu cârpe moi și flori proaspete.',
        casa: 'Povestea primei Casa dei Bambini; privirea fotografiilor istorice; pictarea «casei noastre a copiilor».',
        elementary: 'Cercetare istorică despre cartierul San Lorenzo în 1907; discuție despre condițiile sociale și impactul educației timpurii.',
      },
      fr: {
        toddler: 'Soin et nettoyage festif des étagères avec de petits chiffons et des fleurs fraîches.',
        casa: 'Récit de la première Casa dei Bambini ; observation de photos d\'époque ; dessin de notre ambiance.',
        elementary: 'Recherche documentaire sur San Lorenzo en 1907 ; débat sur l\'impact social de l\'éducation.',
      },
      en: {
        toddler: 'Care of the environment: dusting shelves and arranging fresh flowers in small vases.',
        casa: 'Telling the story of the first Children\'s House; viewing historical photos; drawing "our Casa".',
        elementary: 'Historical study of San Lorenzo in 1907; presentations on the social revolution of child-centered learning.',
      },
      de: {
        toddler: 'Pflege der Umgebung: Staubwischen und kleine Blumensträuße arrangieren.',
        casa: 'Erzählung über das erste Kinderhaus; historische Fotos betrachten; Zeichnen des eigenen Raums.',
        elementary: 'Historische Recherche über San Lorenzo 1907; Präsentationen über den gesellschaftlichen Wandel.',
      },
    },
    recommendedMaterials: {
      ro: ['Fotografii de arhivă San Lorenzo 1907', 'Materiale de Viață Practică (lustruit, aranjat flori)', 'Cărți ilustrate despre Maria Montessori'],
      fr: ['Photographies d\'archives San Lorenzo 1907', 'Matériel de vie pratique (astiquage, fleurs)', 'Livres biographiques illustrés'],
      en: ['Historical photos of San Lorenzo 1907', 'Practical Life materials (polishing, flower arranging)', 'Illustrated Maria Montessori biographies'],
      de: ['Archivfotos von San Lorenzo 1907', 'Übungen des praktischen Lebens', 'Biografische Kinderbücher über Maria Montessori'],
    },
    montessoriQuote: {
      ro: {
        text: '«Am simțit că această inaugurare modestă era zorii unei epoci noi, în care copilul va fi înțeles și iubit în întreaga sa măreție.»',
        source: 'Dr. Maria Montessori, Descoperirea Copilului',
      },
      fr: {
        text: '« J\'avais l\'intuition que cette modeste inauguration marquait l\'aube d\'une ère nouvelle où l\'enfant serait enfin révélé dans sa grandeur. »',
        source: 'Dr. Maria Montessori, La Découverte de l\'Enfant',
      },
      en: {
        text: '« I had a feeling that this modest inauguration was the dawn of a new era, where the child would be recognized in all their true spiritual greatness. »',
        source: 'Dr. Maria Montessori, The Discovery of the Child',
      },
      de: {
        text: '« Ich hatte das Gefühl, dass diese bescheidene Eröffnung den Beginn einer neuen Epoche markierte, in der das Kind in seiner wahren Größe erkannt wird. »',
        source: 'Dr. Maria Montessori, Die Entdeckung des Kindes',
      },
    },
  },

  // 2. IANUARIE - Ziua Internațională a Educației (UNESCO)
  {
    id: 'unesco-education-day',
    month: 1,
    day: 24,
    category: 'peace',
    iconName: 'BookOpen',
    dateDisplay: {
      ro: '24 Ianuarie',
      fr: '24 Janvier',
      en: 'January 24',
      de: '24. Januar',
    },
    title: {
      ro: 'Ziua Internațională a Educației (UNESCO)',
      fr: 'Journée Internationale de l\'Éducation (UNESCO)',
      en: 'International Day of Education (UNESCO)',
      de: 'Internationaler Tag der Bildung (UNESCO)',
    },
    subtitle: {
      ro: 'Educația ca armă a păcii și drept fundamental al fiecărui copil',
      fr: 'L\'éducation comme arme de paix et droit inaliénable de chaque enfant',
      en: 'Education as an Instrument of Peace and a Universal Human Right',
      de: 'Bildung als Werkzeug des Friedens und fundamentales Menschenrecht',
    },
    historicalContext: {
      ro: 'Adoptată de ONU pentru a celebra rolul educației în pace și dezvoltare. Maria Montessori a fost nominalizată de 3 ori la Premiul Nobel pentru Pace, argumentând că doar educarea conștiinței copilului poate elimina războiul.',
      fr: 'Proclamée par l\'ONU pour célébrer le rôle de l\'éducation au service de la paix. Maria Montessori fut nominée trois fois au Prix Nobel de la Paix pour sa vision de l\'éducation pacificatrice.',
      en: 'Proclaimed by the UN to celebrate education for peace and development. Maria Montessori was thrice nominated for the Nobel Peace Prize for demonstrating that world peace begins in the nursery.',
      de: 'Von der UNESCO ausgerufen, um Bildung als Friedensmotor zu würdigen. Maria Montessori wurde dreimal für den Friedensnobelpreis nominiert.',
    },
    pedagogicalMeaning: {
      ro: 'Educația nu este transmiterea de informații uscate, ci o «ajutorare a vieții» (aide à la vie) care clădește independență și gândire critică.',
      fr: 'L\'éducation n\'est pas un enseignement rigide, mais une aide active à la vie et à l\'épanouissement moral de l\'individu.',
      en: 'Education is not mere instruction, but "an aid to life" that nurtures inner freedom and solidarity.',
      de: 'Bildung ist kein bloßes Auswendiglernen, sondern «Hilfe zum Leben» und moralische Reifung.',
    },
    classroomActivities: {
      ro: {
        toddler: 'Exerciții de grație și curtoazie: cum oferim ajutor unui coleg fără să vorbim tare.',
        casa: 'Conversație la covor despre școlile din alte țări; folosirea hărților-puzzle ale globului.',
        elementary: 'Dezbateri despre accesul la educație în lume; scrierea unei scrisori către UNESCO.',
      },
      fr: {
        toddler: 'Grâce et courtoisie : comment apporter de l\'aide à un camarade en silence.',
        casa: 'Cercle de parole sur les écoles à travers le monde ; exploration des cartes du monde à encastrements.',
        elementary: 'Débat sur le droit à l\'éducation dans le monde ; rédaction de lettres de solidarité.',
      },
      en: {
        toddler: 'Grace & Courtesy: offering assistance to a friend with gentle gestures.',
        casa: 'Gathering to explore children in different cultures using the Montessori continent puzzle maps.',
        elementary: 'Researching global literacy; student-led presentations on barriers to education worldwide.',
      },
      de: {
        toddler: 'Anmut und Höflichkeit: einem Mitschüler sanft Hilfe anbieten.',
        casa: 'Gesprächskreis über Schulen weltweit mit den Montessori-Kontinentkarten.',
        elementary: 'Projektarbeit über das weltweite Recht auf Bildung und Chancengleichheit.',
      },
    },
    recommendedMaterials: {
      ro: ['Globul Pământesc cu Continente Colorate', 'Hărțile Puzzle Montessori', 'Masa Păcii'],
      fr: ['Globe des continents en couleur', 'Cartes de géographie à encastrements', 'Table de Paix'],
      en: ['Colored Continents Globe', 'Montessori Continent Puzzle Maps', 'Peace Table & Bell'],
      de: ['Farbiger Kontinent-Globus', 'Montessori Puzzlekarten', 'Friedenstisch'],
    },
    montessoriQuote: {
      ro: {
        text: '«Stabilirea unei păci trainice este opera educației; tot ce pot face politicienii este să ne țină departe de război.»',
        source: 'Dr. Maria Montessori, Educație și Pace',
      },
      fr: {
        text: '« Établir une paix durable est le travail de l\'éducation ; tout ce que les politiques peuvent faire, c\'est d\'éviter la guerre momentanément. »',
        source: 'Dr. Maria Montessori, Éducation et Paix',
      },
      en: {
        text: '« Establishing lasting peace is the work of education; all politics can do is keep us out of war. »',
        source: 'Dr. Maria Montessori, Education and Peace',
      },
      de: {
        text: '« Dauerhafter Friede kann nur durch Erziehung geschaffen werden; Politik kann lediglich Kriege vorübergehend abwenden. »',
        source: 'Dr. Maria Montessori, Erziehung und Frieden',
      },
    },
  },

  // 3. FEBRUARIE - Săptămâna Educației Montessori (Montessori Education Week)
  {
    id: 'montessori-education-week',
    month: 2,
    day: 24,
    category: 'tradition',
    iconName: 'Calendar',
    dateDisplay: {
      ro: 'Ultima Săptămână din Februarie',
      fr: 'Dernière Semaine de Février',
      en: 'Last Week of February',
      de: 'Letzte Februarwoche',
    },
    title: {
      ro: 'Săptămâna Mondială a Educației Montessori',
      fr: 'Semaine Mondiale de l\'Éducation Montessori',
      en: 'Montessori Education Week',
      de: 'Internationale Montessori-Bildungswoche',
    },
    subtitle: {
      ro: 'Sărbătoarea anuală a comunităților Montessori din peste 140 de țări',
      fr: 'Célébration annuelle des communautés Montessori dans plus de 140 pays',
      en: 'Annual global celebration across Montessori schools in over 140 countries',
      de: 'Jährliche weltweite Feierwoche in Montessori-Einrichtungen in über 140 Ländern',
    },
    historicalContext: {
      ro: 'Creată pentru a aduce familiile, ghizii și comunitatea largă împreună, celebrând autonomia copilului și principiile științifice ale dr. Montessori.',
      fr: 'Créée pour rassembler les familles, éducateurs et enfants autour du respect de l\'autonomie et des principes scientifiques montessoriens.',
      en: 'Designated annually to unite families, educators, and communities in honoring child-led learning and authentic Montessori practice.',
      de: 'Jährlich ausgerichtet, um Eltern, Pädagogen und die Gemeinschaft für die Montessori-Prinzipien zu begeistern.',
    },
    pedagogicalMeaning: {
      ro: 'Un prilej special pentru «Ziua Porților Deschise Silențioase», expoziții de albume de lucru și celebrarea independenței copilului.',
      fr: 'Une occasion privilégiée pour des visites silencieuses de classe, des ateliers parents-enfants et la mise en lumière de la concentration.',
      en: 'A premier occasion for silent classroom observations, student presentations of favorite materials, and parent education.',
      de: 'Eine besondere Gelegenheit für stille Hospitationen, Schülerpräsentationen und gelebte Elternarbeit.',
    },
    classroomActivities: {
      ro: {
        toddler: 'Ziua «Eu pot singur»: activități de îmbrăcare, descălțare și preparare a gustării.',
        casa: 'Copiii sunt ghizi pentru părinți: prezintă lucrul favorit cu Turnul Roz sau Scara Maro.',
        elementary: 'Prezentări ale elevilor despre marile invenții ale omenirii și viața Mariei Montessori.',
      },
      fr: {
        toddler: 'Journée « Je fais seul » : s\'habiller, verser de l\'eau et tartiner le goûter en toute fierté.',
        casa: 'Les enfants guident leurs parents et présentent la Tour Rose ou l\'Escalier Marron.',
        elementary: 'Expositions créées par les enfants sur les inventions humaines et les Grands Récits.',
      },
      en: {
        toddler: '"I can do it myself" day: toddlers proudly dressing, pouring, and slicing their snacks.',
        casa: 'Children invite parents to be students: presenting the Pink Tower or Brown Stair.',
        elementary: 'Student-curated museum of learning: displaying charts, timeline models, and Cosmic lessons.',
      },
      de: {
        toddler: '«Ich kann das allein» Tag: selbständiges Anziehen und Vorbereiten der Jause.',
        casa: 'Kinder führen ihre Eltern durch den Raum und demonstrieren den Rosa Turm.',
        elementary: 'Schülerausstellung über die Entwicklungsgeschichte der Menschheit.',
      },
    },
    recommendedMaterials: {
      ro: ['Turnul Roz', 'Scara Maro', 'Cilindrii cu Buton', 'Hărțile Ghizilor pentru Părinți'],
      fr: ['Tour Rose', 'Escalier Marron', 'Cylindres à boutons', 'Livret de visite pour les parents'],
      en: ['Pink Tower', 'Brown Stair', 'Cylinder Blocks', 'Parent Observation Guides'],
      de: ['Rosa Turm', 'Braune Treppe', 'Einsatzzylinder', 'Eltern-Beobachtungsbögen'],
    },
    montessoriQuote: {
      ro: {
        text: '«Cea mai mare dovadă a succesului unui educator este să poată spune: «Copiii lucrează acum ca și cum eu nu aș exista.»»',
        source: 'Dr. Maria Montessori, Mintea Absorbantă',
      },
      fr: {
        text: '« La plus grande marque de succès pour un éducateur est de pouvoir dire : « Les enfants travaillent maintenant comme si je n\'existais pas. » »',
        source: 'Dr. Maria Montessori, L\'Esprit Absorbant',
      },
      en: {
        text: '« The greatest sign of success for a teacher is to be able to say, "The children are now working as if I did not exist." »',
        source: 'Dr. Maria Montessori, The Absorbent Mind',
      },
      de: {
        text: '« Das größte Zeichen des Erfolgs für einen Erzieher ist es, sagen zu können: "Die Kinder arbeiten jetzt, als ob ich nicht existierte." »',
        source: 'Dr. Maria Montessori, Das beharrliche Kind',
      },
    },
  },

  // 4. MARTIE - Ziua Femeilor Pionier & Maria Montessori
  {
    id: 'womens-day-montessori',
    month: 3,
    day: 8,
    category: 'founder',
    iconName: 'Heart',
    dateDisplay: {
      ro: '8 Martie',
      fr: '8 Mars',
      en: 'March 8',
      de: '8. März',
    },
    title: {
      ro: 'Ziua Internațională a Femeilor & Moștenirea Mariei Montessori',
      fr: 'Journée des Droits des Femmes & Héritage de Maria Montessori',
      en: 'International Women\'s Day & Maria Montessori\'s Legacy',
      de: 'Internationaler Frauentag & Das Erbe Maria Montessoris',
    },
    subtitle: {
      ro: 'Una dintre primele femei medic din Italia și o luptătoare neobosită pentru drepturile femeilor',
      fr: 'Première femme médecin d\'Italie et fervente militante pour l\'égalité des droits',
      en: 'One of Italy\'s First Female Physicians and a Champion of Women\'s Equality',
      de: 'Eine der ersten Ärztinnen Italiens und Pionierin für Frauenrechte',
    },
    historicalContext: {
      ro: 'În 1896, Maria Montessori a reprezentat Italia la Congresul Internațional al Femeilor de la Berlin, cerând egalitate salarială pentru muncitoare. A înfruntat prejudecățile vremii pentru a deschide calea femeilor în știință.',
      fr: 'En 1896, elle représenta l\'Italie au Congrès International des Femmes à Berlin, plaidant pour l\'égalité salariale et l\'émancipation des femmes par la science et l\'étude.',
      en: 'In 1896, Dr. Montessori addressed the International Women\'s Congress in Berlin, demanding equal pay for equal work and championing female participation in science.',
      de: '1896 vertrat sie Italien auf dem Internationalen Frauenkongress in Berlin und forderte gleichen Lohn für gleiche Arbeit.',
    },
    pedagogicalMeaning: {
      ro: 'Modele feminine de curaj, gândire liberă și devotament față de drepturile celor vulnerabili.',
      fr: 'Inspirer les enfants par l\'exemple du courage intellectuel et du refus des barrières imposées par la société.',
      en: 'Inspiring all children through the courage of independent thought and breaking societal barriers.',
      de: 'Kinder durch Mut, geistige Unabhängigkeit und wissenschaftliche Leidenschaft inspirieren.',
    },
    classroomActivities: {
      ro: {
        toddler: 'Aranjamente florale dăruite persoanelor dragi din comunitate.',
        casa: 'Povestea biografică a fetiței Maria care iubea matematica; cărți ilustrate din colecția clasei.',
        elementary: 'Biografii de femei cercetător și explorator; linia timpului vieții Mariei Montessori.',
      },
      fr: {
        toddler: 'Création de petits bouquets de fleurs offerts avec grâce aux membres de l\'équipe.',
        casa: 'L\'enfance de Maria qui adorait les mathématiques ; lecture partagée d\'albums biographiques.',
        elementary: 'Lignes du temps des femmes pionnières dans les sciences et les arts.',
      },
      en: {
        toddler: 'Flower arranging: cutting stems and placing cheerful blossoms in vases for the classroom.',
        casa: 'Storytelling about young Maria who studied mathematics against all odds; matching cards.',
        elementary: 'Timeline of pioneering women in medicine, astronomy, and social justice.',
      },
      de: {
        toddler: 'Blumenstecken für die Mitschüler und Pädagogen.',
        casa: 'Biografische Erzählung über die junge Maria, die Mathematik liebte.',
        elementary: 'Zeitleiste berühmter Wissenschaftlerinnen und Pionierinnen.',
      },
    },
    recommendedMaterials: {
      ro: ['Linia Timpului Vieții Mariei Montessori', 'Setul de aranjat flori', 'Cărți de biografii ilustrate'],
      fr: ['Ligne du temps biographique', 'Matériel d\'arrangement floral', 'Livres illustrés de pionnières'],
      en: ['Maria Montessori Biography Timeline', 'Flower Arranging Work', 'Pioneer Women Biography Cards'],
      de: ['Biografische Zeitleiste', 'Blumensteck-Set', 'Biografiekarten'],
    },
    montessoriQuote: {
      ro: {
        text: '«Femeia viitorului nu va fi o copie a bărbatului, ci o ființă deplină care își aduce propria forță spirituală în vindecarea lumii.»',
        source: 'Dr. Maria Montessori, Discurs Berlin 1896',
      },
      fr: {
        text: '« La femme de l\'avenir ne sera pas une réplique de l\'homme, mais un être complet apportant sa propre puissance morale pour guérir le monde. »',
        source: 'Dr. Maria Montessori, 1896',
      },
      en: {
        text: '« Woman must not seek to be a reflection of man, but a full human being contributing her own moral force to the elevation of humanity. »',
        source: 'Dr. Maria Montessori, Berlin 1896',
      },
      de: {
        text: '« Die Frau der Zukunft darf kein Abbild des Mannes sein, sondern eine eigenständige Schöpferin moralischer Erneuerung. »',
        source: 'Dr. Maria Montessori, Berlin 1896',
      },
    },
  },

  // 5. MARTIE - Echinocțiul de Primăvară & Ziua Pământului Montessori
  {
    id: 'spring-equinox-earth',
    month: 3,
    day: 20,
    category: 'cosmic',
    iconName: 'Sun',
    dateDisplay: {
      ro: '20-21 Martie',
      fr: '20-21 Mars',
      en: 'March 20-21',
      de: '20.-21. März',
    },
    title: {
      ro: 'Echinocțiul de Primăvară & Renașterea Naturii',
      fr: 'Équinoxe de Printemps & Renaissance de la Nature',
      en: 'Spring Equinox & Nature\'s Rebirth',
      de: 'Frühlings-Tagundnachtgleiche & Frühlingserwachen',
    },
    subtitle: {
      ro: 'Egalitatea luminii cu întunericul și începutul ciclului vegetal în grădina Montessori',
      fr: 'Équilibre parfait du jour et de la nuit ; début du cycle des cultures au jardin',
      en: 'Equal balance of light and dark; awakening of botanical life in the Montessori garden',
      de: 'Gleichgewicht von Tag und Nacht; Beginn des Pflanzenzyklus im Montessori-Garten',
    },
    historicalContext: {
      ro: 'Moment cosmic fundamental în Educația Cosmică Montessori. Se explică mișcarea de revoluție a Pământului în jurul Soarelui, înclinarea axei terestre și ritmul regenerării naturale.',
      fr: 'Moment clé de l\'Éducation Cosmique. On démontre la révolution terrestre autour du Soleil, l\'inclinaison de l\'axe et le réveil des graines.',
      en: 'Foundational celestial event in Cosmic Education. Children explore planetary tilt, solar orbits, and the awakening of seeds.',
      de: 'Zentraler astronomischer Wendepunkt in der Kosmischen Erziehung zur Veranschaulichung der Erdrotation und der Jahreszeiten.',
    },
    pedagogicalMeaning: {
      ro: 'Cultivă recunoștința copilului pentru armonia universului și responsabilitatea de a ocroti solul viu.',
      fr: 'Développer le respect émerveillé face aux cycles cosmiques et la responsabilité envers le monde végétal.',
      en: 'Instilling profound cosmic gratitude and active stewardship through sowing seeds and caring for the soil.',
      de: 'Förderung von Ehrfurcht vor den Naturgesetzen und aktiver Pflege des Schulgartens.',
    },
    classroomActivities: {
      ro: {
        toddler: 'Plantarea semințelor de fasole sau grâu în ghivece mici de lut; udatul cu stropitoarea mică.',
        casa: 'Cabinetul de Botanică: identificarea formelor de frunze; sortarea semințelor; modelul Soare-Pământ.',
        elementary: 'Marea Lecție despre Soare și Pământ; măsurarea unghiului umbrei la amiază cu gnomonul.',
      },
      fr: {
        toddler: 'Semis de graines de haricots dans de petits pots en terre cuite ; arrosage doux.',
        casa: 'Cabinet de botanique : formes des feuilles ; dissection végétale d\'une fleur printanière.',
        elementary: 'Expérience sur l\'inclinaison terrestre et les saisons ; tracé de l\'ombre au gnomon.',
      },
      en: {
        toddler: 'Planting seeds in clay pots and gently misting them with water sprayers.',
        casa: 'Botany Cabinet: leaf shape insets; seed sorting trays; parts of a flower puzzle.',
        elementary: 'Solar apparatus demonstrations; measuring shadows at solar noon; vernal equinox chart.',
      },
      de: {
        toddler: 'Bohnensamen in Tontöpfe einpflanzen und mit der kleinen Kanne gießen.',
        casa: 'Botanische Kommode: Blattformen zuordnen; Blüten zerlegen und benennen.',
        elementary: 'Experimente zur Erdachse und Jahreszeiten; Sonnenuhr und Schattenmessung.',
      },
    },
    recommendedMaterials: {
      ro: ['Cabinetul de Botanică', 'Puzzle-ul Florii și al Arborelui', 'Aparatul Soare-Pământ / Tellurium', 'Ghivece și semințe organice'],
      fr: ['Cabinet de botanique', 'Puzzles de la fleur et de l\'arbre', 'Planétaire Soleil-Terre', 'Pots et graines biologiques'],
      en: ['Botany Cabinet & Leaf Insets', 'Flower & Tree Anatomy Puzzles', 'Sun-Earth Tellurian Model', 'Seed Sprouting Trays'],
      de: ['Botanische Kommode', 'Pflanzen- und Baumpuzzle', 'Tellurium (Erde-Sonne-Modell)', 'Pflanzschalen'],
    },
    montessoriQuote: {
      ro: {
        text: '«Să lăsăm copilul să trăiască în natură; atunci când își dă seama că viața unei plante depinde de apa pe care i-o dă el, se trezește în el simțul responsabilității cosmice.»',
        source: 'Dr. Maria Montessori, Descoperirea Copilului',
      },
      fr: {
        text: '« Laissons les enfants vivre dans la nature ; quand ils comprennent que la vie d\'une plante dépend de l\'eau qu\'ils lui versent, le sens de la responsabilité s\'éveille. »',
        source: 'Dr. Maria Montessori',
      },
      en: {
        text: '« Let the children be free; encourage them; let them run outside when it is raining; let them remove their shoes when they find a puddle of water. When they realize that the life of a plant depends on their care, their cosmic duty is born. »',
        source: 'Dr. Maria Montessori',
      },
      de: {
        text: '« Lasst die Kinder in der Natur leben; wenn sie begreifen, dass das Leben einer Pflanze von ihrer Fürsorge abhängt, erwacht das kosmische Bewusstsein. »',
        source: 'Dr. Maria Montessori',
      },
    },
  },

  // 6. APRILIE - Ziua Mondială a Pământului (Earth Day)
  {
    id: 'earth-day-montessori',
    month: 4,
    day: 22,
    category: 'cosmic',
    iconName: 'Globe',
    dateDisplay: {
      ro: '22 Aprilie',
      fr: '22 Avril',
      en: 'April 22',
      de: '22. April',
    },
    title: {
      ro: 'Ziua Mondială a Pământului & Marea Rețea a Vieții',
      fr: 'Journée Mondiale de la Terre & La Toile du Vivant',
      en: 'Earth Day & The Cosmic Web of Life',
      de: 'Tag der Erde & Das kosmische Netz des Lebens',
    },
    subtitle: {
      ro: '«Totul este legat de tot în Univers» — Principiul interdependenței cosmice',
      fr: '« Tout est relié dans l\'Univers » — L\'interdépendance de toutes les créatures',
      en: '« Everything is interconnected in the Universe » — Cosmic Interdependence',
      de: '« Alles im Universum ist miteinander verbunden » — Die kosmische Vernetzung',
    },
    historicalContext: {
      ro: 'Celebrată la nivel global din 1970. În viziunea Mariei Montessori, Pământul este o casă comună în care fiecare piatră, bacterie, plantă și animal are o sarcină cosmică (cosmic task) ce susține întregul.',
      fr: 'Célébrée depuis 1970. Pour Montessori, la Terre est notre maison commune où chaque élément remplit un « devoir cosmique » au service de l\'équilibre général.',
      en: 'Celebrated worldwide since 1970. Montessori anticipated modern ecology by teaching that every rock, microbe, plant, and creature performs a "cosmic task" maintaining planetary balance.',
      de: 'Seit 1970 weltweiter Feiertag. Maria Montessori lehrte, dass jeder Teil der Natur eine «kosmische Aufgabe» für das Ganze erfüllt.',
    },
    pedagogicalMeaning: {
      ro: 'Trecerea de la cunoaștere la acțiune ecologică concretă: compostare, îngrijirea albinelor, reducerea risipei și respect profund.',
      fr: 'Passer de l\'émerveillement à l\'action concrète : recyclage, soin des pollinisateurs et sobriété respectueuse.',
      en: 'Moving from awe to practical stewardship: vermicomposting, pollinator gardens, water conservation, and zero waste.',
      de: 'Vom Staunen zum Handeln: Kompostierung, Insektenschutz und achtsamer Ressourcenumgang.',
    },
    classroomActivities: {
      ro: {
        toddler: 'Sortarea deșeurilor reciclabile (hârtie / plastic / organic); spălarea pietrelor de râu.',
        casa: 'Lucrul cu Globul de Hârtie Abrazivă (pământ vs apă); prepararea compostului pentru grădină.',
        elementary: 'Marea Lecție despre Râuri și Eroziune; crearea unei hărți a interdependenței ecologice.',
      },
      fr: {
        toddler: 'Tri des matières (bois, papier, tissu) ; nettoyage sensoriel de galets naturels.',
        casa: 'Globe rugueux (terre et eau) ; alimentation du bac à compost de la classe.',
        elementary: 'Expériences sur le cycle de l\'eau et la filtration naturelle ; arbre de l\'interdépendance.',
      },
      en: {
        toddler: 'Sensory exploration of soil, moss, and river stones; sorting natural vs manufactured items.',
        casa: 'Sandpaper Globe (land and water contrast); caring for classroom worm composting bin.',
        elementary: 'The Great River of Life chart; watershed experiments; creating biodiversity maps.',
      },
      de: {
        toddler: 'Erde, Moos und Flusskiesel ertasten; Wasser sorgsam schöpfen.',
        casa: 'Sandpapierglobus (Land und Wasser); Pflege des Klassenkomposts.',
        elementary: 'Experimente zur Bodenerosion und Grundwasserfiltration; ökologische Netzwerke.',
      },
    },
    recommendedMaterials: {
      ro: ['Globul Pământesc de Hârtie Abrazivă', 'Cutia cu Formele de Relief (Insulă, Lac etc.)', 'Tabloul Marii Povești a Pământului'],
      fr: ['Globe rugueux', 'Plateaux des formes de terre et d\'eau', 'Grand récit de la formation de la Terre'],
      en: ['Sandpaper Globe', 'Land and Water Form Trays', 'Clock of Eras / Earth Formation Charts'],
      de: ['Sandpapier-Globus', 'Land- und Wasserformen-Schalen', 'Uhr der Erdzeitalter'],
    },
    montessoriQuote: {
      ro: {
        text: '«Pământul este ca o mamă generoasă care nu refuză nimic copiilor săi; dar noi trebuie să învățăm să-l iubim cu înțelepciune și venerație.»',
        source: 'Dr. Maria Montessori, Educația Cosmică',
      },
      fr: {
        text: '« La Terre est une mère généreuse qui ne refuse rien à ses enfants, mais nous devons apprendre à l\'aimer avec dévotion et sagesse. »',
        source: 'Dr. Maria Montessori',
      },
      en: {
        text: '« The land is where our roots are. The children must be in contact with nature, to discover its secret forces, and learn to revere the generous Earth. »',
        source: 'Dr. Maria Montessori, From Childhood to Adolescence',
      },
      de: {
        text: '« Die Erde ist der Ursprung unseres Lebens. Die Kinder müssen in engem Kontakt mit ihr stehen, um ihre Kräfte zu begreifen und zu achten. »',
        source: 'Dr. Maria Montessori, Von der Kindheit zur Jugend',
      },
    },
  },

  // 7. MAI - Comemorarea Mariei Montessori (1870-1952)
  {
    id: 'maria-montessori-memorial',
    month: 5,
    day: 6,
    category: 'founder',
    iconName: 'Heart',
    dateDisplay: {
      ro: '6 Mai',
      fr: '6 Mai',
      en: 'May 6',
      de: '6. Mai',
    },
    title: {
      ro: 'Ziua Comemorării Mariei Montessori & Recunoștința Ghizilor',
      fr: 'Commémoration de Maria Montessori & Reconnaissance des Éducateurs',
      en: 'Maria Montessori Memorial Day & Educator Gratitude',
      de: 'Maria Montessori Gedenktag & Tag des Pädagogen-Danks',
    },
    subtitle: {
      ro: 'Comemorarea trecerii în eternitate la Noordwijk aan Zee (Olanda, 1952)',
      fr: 'Souvenir de son départ à Noordwijk aan Zee (Pays-Bas, 1952)',
      en: 'Honoring her passing at Noordwijk aan Zee (Netherlands, 1952) and enduring legacy',
      de: 'Gedenken an ihren Heimgang in Noordwijk aan Zee (Niederlande, 1952)',
    },
    historicalContext: {
      ro: 'Pe 6 mai 1952, la vârsta de 81 de ani, dr. Maria Montessori a plecat dintre noi în grădina prietenilor săi din Olanda, lăsând moștenire o mișcare pedagogică planetară. Pe mormântul său stă gravată celebra rugăciune către copii.',
      fr: 'Le 6 mai 1952, à l\'âge de 81 ans, Maria Montessori s\'éteignait aux Pays-Bas. Son épitaphe porte un vibrant appel aux enfants pour bâtir la paix universelle.',
      en: 'On May 6, 1952, at age 81, Dr. Montessori passed away in Noordwijk aan Zee. Her tombstone bears her immortal plea: "I beg the dear all-powerful children to join me in building peace." ',
      de: 'Am 6. Mai 1952 verstarb Dr. Montessori im Alter von 81 Jahren. Ihre Grabinschrift ruft die Kinder dazu auf, gemeinsam mit den Erwachsenen den Frieden zu bauen.',
    },
    pedagogicalMeaning: {
      ro: 'Moment solemn de reculegere, Jocul Tăcerii prelungit și reafirmarea devotamentului fiecărui adult față de sufletul copilului.',
      fr: 'Moment de recueillement solennel, Jeu du Silence et renouvellement de l\'engagement bienveillant envers l\'enfant.',
      en: 'A reverent day of reflection, extended Silence Game, and renewing our adult pledge to serve the child\'s spirit.',
      de: 'Tag der feierlichen Stille, vertieftes Stille-Spiel und Neuausrichtung auf die Bedürfnisse des Kindes.',
    },
    classroomActivities: {
      ro: {
        toddler: 'Aprinderea unei lumânări la Mesei Păcii și audiția unei melodii liniștitoare.',
        casa: 'Jocul Tăcerii dedicat Mariei Montessori; citirea inscripției de pe mormântul său.',
        elementary: 'Scrierea de jurnale de recunoștință: «Ce a schimbat metoda Montessori în viața mea?».',
      },
      fr: {
        toddler: 'Allumage doux d\'une veilleuse sur la Table de Paix et écoute attentive d\'une cloche.',
        casa: 'Grand Jeu du Silence ; lecture commentée de la phrase gravée sur sa tombe.',
        elementary: 'Cercle de parole philosophique sur l\'héritage vivant de Maria Montessori.',
      },
      en: {
        toddler: 'Lighting a peace candle, listening to the gentle chime of a bell, and practicing walking on the line.',
        casa: 'The solemn Silence Game; reading the English translation of her epitaph with the community.',
        elementary: 'Gratitude circle and essays: "How the Prepared Environment shapes who I am."',
      },
      de: {
        toddler: 'Entzünden einer Kerze am Friedenstisch und Hören des Klangschalen-Tons.',
        casa: 'Vertieftes Stille-Spiel; Vorlesen der berühmten Grabstein-Inschrift.',
        elementary: 'Reflexionsaufsätze und Dankbarkeitskreis der Kinder.',
      },
    },
    recommendedMaterials: {
      ro: ['Lumânarea Păcii & Clopoțelul Zen', 'Linia Elipsei (Mersul pe Linie)', 'Fotografia Mariei Montessori cu rama de lemn'],
      fr: ['Bougie de la Paix & Carillon', 'Ellipse au sol (Marcher sur la ligne)', 'Portrait encadré de Maria Montessori'],
      en: ['Peace Candle & Chime', 'Elliptical Line on Floor', 'Framed Historical Portrait of Maria Montessori'],
      de: ['Friedenskerze & Klangschale', 'Linie auf dem Boden (Gehen auf der Linie)', 'Gerahmtes Porträt'],
    },
    montessoriQuote: {
      ro: {
        text: '«Îi rog pe dragii mei copii atotputernici să se unească cu mine pentru a clădi pacea în om și în lume.»',
        source: 'Inscripția de pe mormântul Mariei Montessori, Noordwijk aan Zee',
      },
      fr: {
        text: '« Je prie les chers enfants, tout-puissants, de s\'unir à moi pour la construction de la paix dans l\'homme et dans le monde. »',
        source: 'Épitaphe de Maria Montessori, Noordwijk aan Zee',
      },
      en: {
        text: '« I beg the dear all-powerful children to join me in building peace in man and in the world. »',
        source: 'Epitaph of Maria Montessori, Noordwijk aan Zee, Netherlands',
      },
      de: {
        text: '« Ich bitte die lieben, allmächtigen Kinder, sich mit mir zusammenzuschließen für den Aufbau des Friedens im Menschen und in der Welt. »',
        source: 'Grabinschrift von Maria Montessori, Noordwijk aan Zee',
      },
    },
  },

  // 8. IUNIE - Ziua Mondială a Mediului (World Environment Day)
  {
    id: 'world-environment-day',
    month: 6,
    day: 5,
    category: 'cosmic',
    iconName: 'Leaf',
    dateDisplay: {
      ro: '5 Iunie',
      fr: '5 Juin',
      en: 'June 5',
      de: '5. Juni',
    },
    title: {
      ro: 'Ziua Mondială a Mediului & Grădina Vie',
      fr: 'Journée Mondiale de l\'Environnement & Le Jardin Vivant',
      en: 'World Environment Day & The Living Garden',
      de: 'Weltumwelttag & Der lebendige Garten',
    },
    subtitle: {
      ro: 'Armonia dintre copil și ecosistemul exterior',
      fr: 'L\'osmose entre l\'enfant et l\'écosystème extérieur',
      en: 'Harmony between the child and outdoor ecosystems',
      de: 'Harmonie zwischen Kind und Außengelände',
    },
    historicalContext: {
      ro: 'ONU celebrează această zi pentru conservarea biodiversității. Maria Montessori a conceput grădina exterioară ca o continuare organică a sălii de clasă, nu doar ca loc de recreere.',
      fr: 'L\'ONU célèbre la préservation de la biodiversité. Chez Montessori, le jardin extérieur est le prolongement direct de la classe préparée.',
      en: 'Global UN observance for ecosystem restoration. Montessori insisted that outdoor garden work is as intellectually vital as indoor didactic materials.',
      de: 'UN-Tag zur Wiederherstellung der Ökosysteme. Für Montessori ist der Garten die natürliche Verlängerung des Gruppenraums.',
    },
    pedagogicalMeaning: {
      ro: 'Dezvoltarea voinței și a forței musculare prin muncă reală în aer liber: greblat, plivit, cules de legume.',
      fr: 'Développement de la volonté et de la motricité globale par des tâches authentiques en plein air.',
      en: 'Physical and moral development through meaningful outdoor labor: weeding, composting, harvesting food.',
      de: 'Körperliche und moralische Reifung durch echte Gartenarbeit: Umgraben, Jäten und Ernten.',
    },
    classroomActivities: {
      ro: {
        toddler: 'Spălarea legumelor proaspăt recoltate cu peria mică de legume.',
        casa: 'Construirea unui «hotel de insecte» pentru grădină; îngrijirea plantelor aromatice.',
        elementary: 'Studiul solului și al bacteriilor fixatoare de azot; crearea unui ierbar botanic.',
      },
      fr: {
        toddler: 'Nettoyage minutieux des carottes ou radis avec une petite brosse en bois.',
        casa: 'Fabrication d\'un hôtel à insectes ; découverte des plantes aromatiques au toucher.',
        elementary: 'Étude des sols vivants et des vers de terre ; création d\'un herbier scientifique.',
      },
      en: {
        toddler: 'Scrubbing freshly pulled carrots and radishes with wooden root-vegetable brushes.',
        casa: 'Building a solitary bee & bug hotel; identifying culinary herbs by scent and taste.',
        elementary: 'Soil chromatography experiments; creating pressed-leaf herbarium albums.',
      },
      de: {
        toddler: 'Gemüse waschen mit Wurzelbürste und kleiner Schüssel.',
        casa: 'Insektenhotel bauen; Kräuterecke mit Tast- und Riechübungen.',
        elementary: 'Bodenuntersuchung, Mikroskopieren von Humus und Herbarium-Erstellung.',
      },
    },
    recommendedMaterials: {
      ro: ['Unelte de grădinărit proporționate pentru copii', 'Peria de spălat legume', 'Presele botanice de plante'],
      fr: ['Outils de jardinage à taille d\'enfant', 'Brosse à légumes en bois', 'Presse à fleurs et feuilles'],
      en: ['Child-sized Garden Rakes & Trowels', 'Wooden Vegetable Brushes', 'Plant Press for Herbaria'],
      de: ['Kindgerechte Gartengeräte', 'Gemüsebürsten', 'Pflanzenpresse'],
    },
    montessoriQuote: {
      ro: {
        text: '«Copilul este cel mai mare observator al naturii; dacă îl lăsăm să vadă cum germinează o sămânță, el asistă la o minune pe care nu o va uita niciodată.»',
        source: 'Dr. Maria Montessori',
      },
      fr: {
        text: '« L\'enfant est le plus pur observateur de la nature ; contempler une graine qui germe est pour lui un miracle inoubliable. »',
        source: 'Dr. Maria Montessori',
      },
      en: {
        text: '« There is no description, no image in any book that is capable of replacing the sight of living trees, and all the life to be found around them, in a real forest. »',
        source: 'Dr. Maria Montessori, From Childhood to Adolescence',
      },
      de: {
        text: '« Kein Buch und kein Bild kann den Anblick lebendiger Bäume und des wirklichen Waldes ersetzen. »',
        source: 'Dr. Maria Montessori',
      },
    },
  },

  // 9. IUNIE - Solstițiul de Vară
  {
    id: 'summer-solstice',
    month: 6,
    day: 21,
    category: 'cosmic',
    iconName: 'Sun',
    dateDisplay: {
      ro: '21 Iunie',
      fr: '21 Juin',
      en: 'June 21',
      de: '21. Juni',
    },
    title: {
      ro: 'Solstițiul de Vară & Triumful Luminii',
      fr: 'Solstice d\'Été & Triomphe de la Lumière',
      en: 'Summer Solstice & Peak of Solar Energy',
      de: 'Sommersonnenwende & Höchststand der Sonne',
    },
    subtitle: {
      ro: 'Cea mai lungă zi a anului în emisfera nordică și studiul energiei solare',
      fr: 'Le jour le plus long de l\'année et l\'exploration de l\'énergie solaire',
      en: 'Longest day of the year; exploring solar geometry and solar energy',
      de: 'Der längste Tag des Jahres; Erforschung von Sonnenkraft und Licht',
    },
    historicalContext: {
      ro: 'Punctul culminant al declinației solare. În tradițiile cosmice Montessori, este momentul evaluării anuale a creșterii copiilor și a sărbătoririi maturizării roadelor.',
      fr: 'Apogée de la course du Soleil. Moment symbolique du bilan annuel des apprentissages et de la maturité des fruits.',
      en: 'The northern hemisphere reaches its maximum tilt towards the Sun. A traditional time for celebrating student progress throughout the academic cycle.',
      de: 'Höchster Sonnenstand des Jahres. Symbolischer Abschluss des Schuljahres und Feier des gemeinsamen Wachstums.',
    },
    pedagogicalMeaning: {
      ro: 'Conștientizarea mișcării planetare și a darului vital pe care Soarele îl oferă tuturor organismelor de pe Terra.',
      fr: 'Prendre conscience du rôle fondamental du Soleil dans toute chaîne alimentaire sur Terre.',
      en: 'Recognizing the Sun as the primary cosmic engine empowering all terrestrial life and food webs.',
      de: 'Erkennen der Sonne als Motor allen irdischen Lebens und der Nahrungsketten.',
    },
    classroomActivities: {
      ro: {
        toddler: 'Experiment cu prisme de cristal la fereastră: proiectarea curcubeului pe covor.',
        casa: 'Urmărirea conturului umbrelor cu cretă colorată pe asfalt la ore diferite (09:00, 12:00, 15:00).',
        elementary: 'Construirea unui cuptor solar din carton și folie; experimente de fotosinteză.',
      },
      fr: {
        toddler: 'Prismes en cristal à la fenêtre pour attraper les arcs-en-ciel au sol.',
        casa: 'Tracé à la craie de l\'ombre d\'un camarade à 9h, 12h et 15h pour voir le déplacement solaire.',
        elementary: 'Fabrication d\'un four solaire miniature ; schémas de la photosynthèse.',
      },
      en: {
        toddler: 'Catching rainbows on floor rugs using glass prisms hung in sunny windows.',
        casa: 'Shadow chalk tracking on pavement at 9 AM, noon, and 3 PM to discover Earth rotation.',
        elementary: 'Constructing solar ovens to melt s\'mores; chlorophyll and photosynthesis experiments.',
      },
      de: {
        toddler: 'Regenbogen fangen mit Glasprismen am sonnigen Fenster.',
        casa: 'Schattenzeichnen mit Kreide zu verschiedenen Uhrzeiten auf dem Hof.',
        elementary: 'Bau eines Solarkochers; Experimente zur Fotosynthese.',
      },
    },
    recommendedMaterials: {
      ro: ['Prisme optice de sticlă', 'Ceasul Solar de hârtie', 'Planșele Marii Lecții despre Energie'],
      fr: ['Prismes optiques en verre', 'Cadran solaire pédagogique', 'Planches didactiques sur l\'énergie'],
      en: ['Optical Glass Prisms', 'Working Sundial Models', 'Cosmic Energy & Photosynthesis Charts'],
      de: ['Glasprismen', 'Sonnenuhr-Modell', 'Tafeln zur Sonnenenergie'],
    },
    montessoriQuote: {
      ro: {
        text: '«Soarele este izvorul tuturor energiilor terestre; el cheamă plantele la viață, iar plantele hrănesc animalele și omul.»',
        source: 'Dr. Maria Montessori, Pentru a Educa Potențialul Uman',
      },
      fr: {
        text: '« Le Soleil est la source de toute énergie terrestre ; il appelle les plantes à la vie, et les plantes nourrissent le monde. »',
        source: 'Dr. Maria Montessori, Éduquer le Potentiel Humain',
      },
      en: {
        text: '« The Sun is the great motor of the world; it calls forth the vegetation, and without it life on Earth would cease instantly. »',
        source: 'Dr. Maria Montessori, To Educate the Human Potential',
      },
      de: {
        text: '« Die Sonne ist die Quelle aller irdischen Kraft; sie weckt die Pflanzen, und diese ernähren die lebendige Welt. »',
        source: 'Dr. Maria Montessori, Kosmische Erziehung',
      },
    },
  },

  // 10. AUGUST - Ziua de Naștere a Mariei Montessori (31 August 1870) - CEA MAI MARE SĂRBĂTOARE
  {
    id: 'maria-montessori-birthday',
    month: 8,
    day: 31,
    category: 'founder',
    iconName: 'Sparkles',
    dateDisplay: {
      ro: '31 August (1870)',
      fr: '31 Août (1870)',
      en: 'August 31 (1870)',
      de: '31. August (1870)',
    },
    title: {
      ro: 'Ziua de Naștere a Dr. Maria Montessori (1870) — Sărbătoarea Mondială',
      fr: 'Anniversaire de Maria Montessori (1870) — Célébration Mondiale',
      en: 'Maria Montessori\'s Birthday (1870) — Global Celebration',
      de: 'Maria Montessoris Geburtstag (1870) — Weltweiter Ehrentag',
    },
    subtitle: {
      ro: 'Cea mai importantă zi din calendarul Montessori: celebrarea viziunii și iubirii pentru copil',
      fr: 'Le jour le plus important du calendrier : hommage à sa vision et à son amour pour l\'enfant',
      en: 'The crown jewel of the Montessori calendar: honoring her life, scientific rigor, and revolutionary vision',
      de: 'Der wichtigste Tag im Montessori-Jahr: Würdigung ihres Lebenswerks für das Kind',
    },
    historicalContext: {
      ro: 'Maria Montessori s-a născut la 31 august 1870 în Chiaravalle (provincia Ancona, Italia). A revoluționat înțelegerea psihologiei infantile, a creat materiale de dezvoltare autodidactice și a militat pentru pace mondială.',
      fr: 'Née le 31 août 1870 à Chiaravalle en Italie, elle révolutionna la compréhension de l\'enfance, inventa le matériel scientifique d\'apprentissage et bâtit une méthode universelle.',
      en: 'Born August 31, 1870, in Chiaravalle, Italy. She broke academic barriers to create scientifically designed developmental materials, proving the child\'s innate hunger for purposeful work.',
      de: 'Geboren am 31. August 1870 in Chiaravalle, Italien. Als Ärztin und Wissenschaftlerin schuf sie die revolutionäre Didaktik der vorbereiteten Umgebung.',
    },
    pedagogicalMeaning: {
      ro: 'Sărbătorirea anuală a comunității: ritualul ceremonial al lumânării, cântarea imnurilor de pace și pregătirea noului an școlar cu suflet curat.',
      fr: 'Cérémonie d\'ouverture de l\'année : allumage de la flamme de la connaissance et rassemblement de la communauté.',
      en: 'The joyful heart of the Montessori school year: lighting the flame of learning and welcoming students to their prepared sanctuary.',
      de: 'Feierlicher Auftakt des Schuljahres: Entzünden des Lichts und Willkommenheißen der Kinder.',
    },
    classroomActivities: {
      ro: {
        toddler: 'Mersul festiv în jurul Soarelui pentru Maria Montessori; tort de fructe proaspete.',
        casa: 'Ceremonia Soarelui pentru Maria Montessori (81 de rotații simbolice sau decenii); povestea cu fotografii.',
        elementary: 'Teatru de păpuși sau dramatizare: scene din viața Mariei Montessori la Roma și în India.',
      },
      fr: {
        toddler: 'Marche festive autour du Soleil pour Maria Montessori ; partage de fruits d\'été.',
        casa: 'Célébration de la vie de Maria Montessori autour du Soleil doré ; écoute de musique italienne.',
        elementary: 'Pièce de théâtre ou frise géante illustrée sur ses voyages en Inde et ses conférences mondiales.',
      },
      en: {
        toddler: 'Mini Birthday Walk around a felt Sun; fresh fruit salad prepared by little hands.',
        casa: 'The Great Celebration of Life for Maria Montessori (walking decades around the sun candle); historical artifacts.',
        elementary: 'Living wax museum / dramatic reenactments: Maria in medical school, San Lorenzo, and exile in India.',
      },
      de: {
        toddler: 'Geburtstags-Gang um die Filz-Sonne für Maria; gemeinsames Obstschneiden.',
        casa: 'Feier des Lebensweges von Maria Montessori mit 8 Jahrzehnt-Schritten um die Kerze.',
        elementary: 'Theaterszenen über ihr Studium, San Lorenzo und ihre Zeit in Indien.',
      },
    },
    recommendedMaterials: {
      ro: ['Covorul Soarelui cu cele 12 Luni', 'Globul Pământesc pentru Ceremonia Soarelui', 'Lumânarea Centrală Festivă', 'Fotografii din viața Mariei Montessori'],
      fr: ['Tapis du Soleil et des 12 mois', 'Globe de la marche anniversaire', 'Bougie dorée centrale', 'Photos d\'archives'],
      en: ['Montessori Sun Mat with 12 Month Ribbons', 'Birthday Walk Globe', 'Central Brass Sun Candle', 'Life of Maria Montessori Photo Cards'],
      de: ['Sonnen-Teppich mit 12 Monaten', 'Geburtstags-Globus', 'Große Festkerze', 'Fotokarten zu ihrem Leben'],
    },
    montessoriQuote: {
      ro: {
        text: '«Copilul este tatăl omului. În el zace secretul viitorului nostru spiritual.»',
        source: 'Dr. Maria Montessori, Secretul Copilăriei',
      },
      fr: {
        text: '« L\'enfant est le père de l\'homme. En lui repose le secret de notre avenir spirituel. »',
        source: 'Dr. Maria Montessori, Le Secret de l\'Enfance',
      },
      en: {
        text: '« The child is both a hope and a promise for mankind. In caring for the child, we touch the most delicate and vital part of humanity. »',
        source: 'Dr. Maria Montessori, The Absorbent Mind',
      },
      de: {
        text: '« Das Kind ist der Vater des Mannes. In ihm liegt das Geheimnis unserer seelischen Zukunft. »',
        source: 'Dr. Maria Montessori, Das Geheimnis der Kindheit',
      },
    },
  },

  // 11. SEPTEMBRIE - Ziua Internațională a Păcii & Sing Peace Around the World (21 Septembrie)
  {
    id: 'international-day-of-peace',
    month: 9,
    day: 21,
    category: 'peace',
    iconName: 'Heart',
    dateDisplay: {
      ro: '21 Septembrie',
      fr: '21 Septembre',
      en: 'September 21',
      de: '21. September',
    },
    title: {
      ro: 'Ziua Internațională a Păcii & Inițiativa «Sing Peace Around the World»',
      fr: 'Journée Internationale de la Paix & « Sing Peace Around the World »',
      en: 'International Day of Peace & « Sing Peace Around the World »',
      de: 'Internationaler Friedenstag & « Sing Peace Around the World »',
    },
    subtitle: {
      ro: 'La ora 10:30, copiii Montessori de pe tot globul cântă la unison «Light a Candle for Peace»',
      fr: 'À 10h30 locale, les écoles Montessori du monde entier chantent à l\'unisson pour la paix',
      en: 'At 10:30 AM local time, Montessori children across the globe sing «Light a Candle for Peace»',
      de: 'Um 10:30 Uhr singen Montessori-Kinder weltweit gemeinsam Friedenslieder',
    },
    historicalContext: {
      ro: 'Instituită de ONU în 1981. Școlile Montessori din toate fusurile orare creează un val neîntrerupt de cântec timp de 24 de ore, transmițând mesajul că pacea se clădește în inima fiecărui copil.',
      fr: 'Journée mondiale de l\'ONU. Les écoles Montessori créent une onde sonore ininterrompue de chant et de silence qui parcourt la Terre fuseau après fuseau.',
      en: 'UN Day established in 1981. Montessori schools worldwide create a rolling 24-hour wave of song, chanting and reflection carrying peace across time zones.',
      de: 'Seit 1981 UN-Gedenktag. Montessori-Schulen erzeugen eine 24-stündige Friedenswelle, die mit der Erdumdrehung von Kontinent zu Kontinent wandert.',
    },
    pedagogicalMeaning: {
      ro: 'Educația pentru pace este inima pedagogiei Montessori. Masa Păcii, Floarea Păcii și rezolvarea autonomă a conflictelor sunt practicate zilnic.',
      fr: 'L\'éducation à la paix est l\'âme de la pédagogie. La Table de Paix permet aux enfants de résoudre leurs différends sans intervention adulte arbitraire.',
      en: 'Peace is not the absence of war, but an active inner condition cultivated daily at the Peace Table through grace and descriptive respect.',
      de: 'Friedenserziehung ist das Herzstück der Montessori-Pädagogik. Am Friedenstisch lösen Kinder Konflikte eigenständig.',
    },
    classroomActivities: {
      ro: {
        toddler: 'Aprinderea lumânării simbolice de pace; trecerea «pietrei păcii» din mână în mână cu zâmbet.',
        casa: 'Cântarea la ora 10:30 a imnului «Light a Candle for Peace»; decorarea porumbeilor de pace din hârtie.',
        elementary: 'Redactarea Cartei Păcii a clasei; dezbaterea medierii conflictelor; steagurile păcii pe glob.',
      },
      fr: {
        toddler: 'Passe de la « pierre de paix » de main en main en silence avec un doux regard.',
        casa: 'Chant choral à 10h30 de « Light a Candle for Peace » ; origami de colombes blanches.',
        elementary: 'Rédaction du Traité de Paix de la classe ; recherche sur les lauréats du Prix Nobel de la Paix.',
      },
      en: {
        toddler: 'Passing the smooth "peace stone" in a silent circle; holding hands gently.',
        casa: 'Gathering at 10:30 AM to sing «Light a Candle for Peace»; folding origami peace cranes.',
        elementary: 'Drafting the classroom Social Contract; studying Nobel Peace laureates and conflict resolution.',
      },
      de: {
        toddler: 'Den «Friedensstein» schweigend im Kreis von Hand zu Hand weitergeben.',
        casa: 'Um 10:30 Uhr das Lied «Light a Candle for Peace» anstimmen; weiße Friedenstauben falten.',
        elementary: 'Gemeinsame Klassen-Friedenscharta verfassen; Streitschlichter-Rollen einüben.',
      },
    },
    recommendedMaterials: {
      ro: ['Masa Păcii & Floarea Păcii', 'Porumbelul Păcii din lemn', 'Versurile cântecului «Light a Candle for Peace»', 'Clopoțelul Tăcerii'],
      fr: ['Table de Paix complète', 'Colombe de la paix en bois', 'Paroles de « Light a Candle for Peace »', 'Cloche de pleine conscience'],
      en: ['Peace Table Kit (Dove, Bell, Rose Vase)', 'Peace Flag of the World', 'Sheet Music & Audio for "Light a Candle for Peace"'],
      de: ['Friedenstisch-Set (Taube, Glocke, Rose)', 'Friedensfahne', 'Notenblatt «Light a Candle for Peace»'],
    },
    montessoriQuote: {
      ro: {
        text: '«Toată lumea vorbește despre pace, dar nimeni nu educă pentru pace. În această lume, oamenii sunt educați pentru competiție, iar competiția este începutul oricărui război. Când vom educa pentru cooperare și solidaritate, abia atunci vom educa pentru pace.»',
        source: 'Dr. Maria Montessori',
      },
      fr: {
        text: '« Tout le monde parle de paix, mais personne n\'éduque pour la paix. On éduque pour la compétition, et la compétition est le début de la guerre. Éduquons pour la coopération ! »',
        source: 'Dr. Maria Montessori',
      },
      en: {
        text: '« Preventing conflict is the work of politics: establishing peace is the work of education. We must turn to the child as our guide and supreme hope. »',
        source: 'Dr. Maria Montessori, Education and Peace',
      },
      de: {
        text: '« Alle sprechen über Frieden, aber niemand erzieht zum Frieden. Wer zur Konkurrenz erzieht, legt den Grundstein für Krieg. Erziehen wir zur Kooperation! »',
        source: 'Dr. Maria Montessori',
      },
    },
  },

  // 12. SEPTEMBRIE - Echinocțiul de Toamnă
  {
    id: 'autumn-equinox',
    month: 9,
    day: 23,
    category: 'cosmic',
    iconName: 'Leaf',
    dateDisplay: {
      ro: '22-23 Septembrie',
      fr: '22-23 Septembre',
      en: 'September 22-23',
      de: '22.-23. September',
    },
    title: {
      ro: 'Echinocțiul de Toamnă & Sărbătoarea Recoltei',
      fr: 'Équinoxe d\'Automne & Fête des Récoltes',
      en: 'Autumn Equinox & Harvest Celebration',
      de: 'Herbst-Tagundnachtgleiche & Erntedank',
    },
    subtitle: {
      ro: 'Studiul semințelor, pregătirea naturii pentru odihnă și recunoștința pentru hrană',
      fr: 'Le voyage des graines, le repos de la terre et la gratitude pour les aliments',
      en: 'Dispersal of seeds, nature\'s preparation for rest, and gratitude for nourishment',
      de: 'Samenverbreitung, Vorbereitung der Natur auf die Ruhe und Dank für die Ernte',
    },
    historicalContext: {
      ro: 'A doua egalitate din an între zi și noapte. Semnalizează începutul retragerii sevei în rădăcini și schimbarea pigmenților clorofilieni în carotenoizi și antociani.',
      fr: 'Deuxième équilibre annuel jour-nuit. Début de la dormance végétale et transformation des pigments foliaires.',
      en: 'The second balance of equal day and night. Triggers deciduous tree dormancy and stunning anthocyanin leaf color changes.',
      de: 'Zweites Gleichgewicht von Tag und Nacht. Die Blätter verfärben sich und die Natur bereitet sich auf den Winter vor.',
    },
    pedagogicalMeaning: {
      ro: 'Copilul învață despre ciclurile regenerării: moartea aparentă a plantei este doar ocrotirea seminței pentru primăvară.',
      fr: 'Comprendre que la chute des feuilles n\'est pas une fin, mais une protection indispensable pour renaître.',
      en: 'Children discover cyclical preservation: winter dormancy protects life so spring can flourish anew.',
      de: 'Erkennen des ewigen Kreislaufs: Der scheinbare Stillstand im Winter bewahrt das Leben für das Frühjahr.',
    },
    classroomActivities: {
      ro: {
        toddler: 'Adunarea și sortarea frunzelor uscate pe culori (galben, roșu, maro, verde).',
        casa: 'Clasificarea semințelor după modul de dispersie (vânt, apă, animale, explozie).',
        elementary: 'Măsurarea temperaturilor zilnice și trasarea graficului solar; degustare de mere de diferite soiuri.',
      },
      fr: {
        toddler: 'Ramassage sensoriel de feuilles mortes ; tri selon les dégradés d\'ocre et de pourpre.',
        casa: 'Classification des graines selon leur mode de dispersion (vent, crochets, eau).',
        elementary: 'Graphiques de température et relevés météo ; dissection d\'épis de maïs et de pommes.',
      },
      en: {
        toddler: 'Collecting autumn leaves in small wicker baskets; sensory color gradient matching.',
        casa: 'Classifying seed dispersal mechanisms (wind helicopters, burrs, animal ingestion, water floaters).',
        elementary: 'Apple tasting & genetic variety study; daily photoperiod graphing and weather station tracking.',
      },
      de: {
        toddler: 'Herbstblätter in Körben sammeln und nach Farbnuancen ordnen.',
        casa: 'Samen nach Verbreitungsart sortieren (Flugsamen, Kletten, Schleuderfrüchte).',
        elementary: 'Wetterdaten erfassen, Tageslänge grafisch darstellen; Apfelsorten vergleichen.',
      },
    },
    recommendedMaterials: {
      ro: ['Tava de sortat semințe', 'Cabinetul de Botanică (Frunze)', 'Plăcile cu forme de relief'],
      fr: ['Plateau de tri de graines', 'Cabinet de botanique', 'Nuancier de couleurs d\'automne'],
      en: ['Seed Dispersal Sorting Tray', 'Botany Leaf Insets', 'Fall Color Matching Tablets (Color Box 3)'],
      de: ['Samen-Sortierbrett', 'Botanische Kommode', 'Farbtäfelchen Kasten 3'],
    },
    montessoriQuote: {
      ro: {
        text: '«Dacă privim o sămânță minusculă, vedem un miracol adormit: în ea este scrisă toată istoria viitorului arbore uriaș.»',
        source: 'Dr. Maria Montessori, Educația Cosmică',
      },
      fr: {
        text: '« Dans la moindre petite graine dort un miracle : toute l\'histoire du futur géant y est inscrite. »',
        source: 'Dr. Maria Montessori',
      },
      en: {
        text: '« How wonderful is the seed! In that minute speck of matter is packed the power to reproduce an enormous tree that will live for centuries. »',
        source: 'Dr. Maria Montessori, To Educate the Human Potential',
      },
      de: {
        text: '« Wie wunderbar ist der Samen! In diesem winzigen Körnchen liegt die Kraft, einen gewaltigen Baum hervorzubringen. »',
        source: 'Dr. Maria Montessori, Kosmische Erziehung',
      },
    },
  },

  // 13. OCTOMBRIE - Ziua Mondială a Animalelor (4 Octombrie)
  {
    id: 'world-animal-day',
    month: 10,
    day: 4,
    category: 'cosmic',
    iconName: 'Sparkles',
    dateDisplay: {
      ro: '4 Octombrie',
      fr: '4 Octobre',
      en: 'October 4',
      de: '4. Oktober',
    },
    title: {
      ro: 'Ziua Mondială a Animalelor & Zoologia Montessori',
      fr: 'Journée Mondiale des Animaux & Zoologie Montessori',
      en: 'World Animal Day & Montessori Zoology',
      de: 'Welttierschutztag & Montessori-Zoologie',
    },
    subtitle: {
      ro: 'Aprecierea animalelor ca tovarăși ai omului și gardieni ai echilibrului biologic',
      fr: 'Respect des animaux comme frères vivants et gardiens des équilibres naturels',
      en: 'Honoring animals as our planetary companions and stewards of biological balance',
      de: 'Achtung vor den Tieren als Mitgeschöpfe und Wächter des Gleichgewichts',
    },
    historicalContext: {
      ro: 'Stabilită în 1925 la Florența, legată de Sfântul Francisc din Assisi, patronul ecologiei. Montessori a integrat studiul zoologiei pornind de la observarea directă și respectul pentru orice formă de viață.',
      fr: 'Inaugurée à Florence en 1925, inspirée par François d\'Assise. Montessori privilégie l\'observation respectueuse des animaux dans leur milieu.',
      en: 'Originating in 1925 in Florence, honoring Saint Francis of Assisi. Montessori zoology emphasizes direct care, anatomical puzzles, and ethical reverence for all creatures.',
      de: '1925 in Florenz begründet zu Ehren Franz von Assisis. Montessori-Zoologie verbindet anatomisches Wissen mit tiefer Achtung vor dem Lebendigen.',
    },
    pedagogicalMeaning: {
      ro: 'Animalele nu sunt obiecte sau jucării, ci ființe cu nevoi, sensibilități și o misiune ecologică proprie.',
      fr: 'L\'animal n\'est pas un objet mais un être sensible doté d\'une tâche écologique irremplaçable.',
      en: 'Animals are not objects or commodities, but sentient beings performing critical ecological roles.',
      de: 'Tiere sind empfindsame Mitgeschöpfe mit eigener Würde und ökologischer Funktion.',
    },
    classroomActivities: {
      ro: {
        toddler: 'Îngrijirea animalului clasei (pește, iepure sau melci de acvariu): hrănirea și schimbarea apei.',
        casa: 'Punctul de interes: Puzzle-urile celor 5 clase de vertebrate (Pește, Amfibian, Reptilă, Pasăre, Mamifer).',
        elementary: 'Studiul celor 5 Mari Funcții Vitale la vertebrate; cercetare despre specii protejate.',
      },
      fr: {
        toddler: 'Soin de l\'animal de la classe (poisson rouge ou escargot) : verser les graines avec précaution.',
        casa: 'Puzzles de zoologie des 5 vertébrés (poisson, grenouille, tortue, oiseau, cheval).',
        elementary: 'Classification phylogénétique ; fiches de recherche sur les espèces menacées.',
      },
      en: {
        toddler: 'Caring for classroom pets (feeding fish, misting terrarium snail) with slow, careful hands.',
        casa: 'Montessori 5 Vertebrate Puzzles (Fish, Amphibian, Reptile, Bird, Mammal) with nomenclature cards.',
        elementary: 'Comparative anatomy (internal skeleton, respiration, reproduction); endangered species research.',
      },
      de: {
        toddler: 'Füttern der Klassentiere (Fische, Achatschnecken) mit maßvoller Dosierung.',
        casa: 'Die 5 Wirbeltier-Puzzles (Fisch, Frosch, Schildkröte, Vogel, Pferd) mit Nomenklaturkarten.',
        elementary: 'Vergleichende Anatomie der Wirbeltierklassen; Referate über Artenschutz.',
      },
    },
    recommendedMaterials: {
      ro: ['Puzzle-urile Zoologice de Lemn (Cal, Pasăre, Broască, Pește, Țestoasă)', 'Cardurile de Nomenclatură Zoologică în 3 Părți', 'Linia Vieții Animale'],
      fr: ['Puzzles de zoologie en bois', 'Cartes de nomenclature en 3 parties', 'Frise de la vie animale'],
      en: ['5 Vertebrate Wooden Puzzles', '3-Part Zoology Nomenclature Cards', 'Animal Kingdom Classification Chart'],
      de: ['5 Wirbeltier-Holzpuzzles', 'Dreiteilige Nomenklaturkarten Zoologie', 'Tierreich-Stammbaum'],
    },
    montessoriQuote: {
      ro: {
        text: '«Iubirea pentru animale este o formă superioară de sensibilitate pe care copilul o dezvoltă spontan dacă i se dă ocazia să le observe și să le îngrijească.»',
        source: 'Dr. Maria Montessori',
      },
      fr: {
        text: '« L\'amour des animaux est une sensibilité spirituelle que l\'enfant développe spontanément quand on lui confie leur soin. »',
        source: 'Dr. Maria Montessori',
      },
      en: {
        text: '« The care of animals develops in children a profound tenderness, a high degree of patience, and a protective love that elevates their entire character. »',
        source: 'Dr. Maria Montessori',
      },
      de: {
        text: '« Die Fürsorge für Tiere weckt im Kinde Zärtlichkeit, Geduld und eine schützende Liebe, die seinen Charakter adelt. »',
        source: 'Dr. Maria Montessori',
      },
    },
  },

  // 14. OCTOMBRIE - Ziua Națiunilor Unite (24 Octombrie)
  {
    id: 'united-nations-day',
    month: 10,
    day: 24,
    category: 'peace',
    iconName: 'Globe',
    dateDisplay: {
      ro: '24 Octombrie',
      fr: '24 Octobre',
      en: 'October 24',
      de: '24. Oktober',
    },
    title: {
      ro: 'Ziua Națiunilor Unite & Cetățenia Planetară',
      fr: 'Journée des Nations Unies & Citoyenneté Mondiale',
      en: 'United Nations Day & Global Citizenship',
      de: 'Tag der Vereinten Nationen & Weltbürgertum',
    },
    subtitle: {
      ro: 'Sărbătoarea diversității culturale și a familiei umane globale',
      fr: 'Célébration de la diversité culturelle et de la famille humaine universelle',
      en: 'Celebrating cultural diversity, international friendship, and the global human family',
      de: 'Feier der kulturellen Vielfalt und der weltweiten Menschheitsfamilie',
    },
    historicalContext: {
      ro: 'Semnarea Cartei ONU în 1945. Maria Montessori a susținut activ eforturile UNESCO, declarând că «viitorul lumii nu depinde de armate, ci de unitatea spirituală a copiilor».',
      fr: 'Entrée en vigueur de la Charte de l\'ONU en 1945. Montessori collabora étroitement avec l\'UNESCO pour promouvoir la solidarité intellectuelle et morale de l\'humanité.',
      en: 'Entry into force of the UN Charter in 1945. Dr. Montessori collaborated closely with UNESCO, proclaiming that "the reconstruction of the world must start from the child."',
      de: 'Inkrafttreten der UN-Charta 1945. Maria Montessori arbeitete eng mit der UNESCO zusammen und betonte die Einigkeit aller Völker.',
    },
    pedagogicalMeaning: {
      ro: 'Copiii descoperă că dincolo de limbă, îmbrăcăminte sau hrană, toți oamenii au aceleași Nevoi Umane Fundamentale.',
      fr: 'Découverte des Besoins Fondamentaux de l\'Homme : sous des formes variées, tous les peuples partagent les mêmes aspirations de cœur et d\'esprit.',
      en: 'Children realize through the Fundamental Needs of Humans charts that all cultures share identical physical and spiritual yearnings.',
      de: 'Erkenntnis durch die Grundbedürfnisse des Menschen: Alle Völker teilen dieselben existentiellen und geistigen Sehnsüchte.',
    },
    classroomActivities: {
      ro: {
        toddler: 'Audiția cântecelor tradiționale din diferite continente; degustarea pâinii din diverse culturi.',
        casa: 'Hărțile-puzzle ale continentelor; potrivirea steagurilor lumii; parada costumelor tradiționale.',
        elementary: 'Tabloul Nevoilor Fundamentale ale Omului; proiecte de cercetare pe națiuni partenere.',
      },
      fr: {
        toddler: 'Écoute de berceuses du monde entier ; découverte de différents pains traditionnels.',
        casa: 'Cartes géographiques des continents ; mise en paire des drapeaux et capitales.',
        elementary: 'Tableau des Besoins Fondamentaux de l\'Homme ; simulation de débats de l\'Assemblée générale de l\'ONU.',
      },
      en: {
        toddler: 'Listening to global lullabies; bread tasting from around the world (pita, baguette, naan, tortilla).',
        casa: 'Pin flags matching to puzzle maps; cultural artifact discovery baskets from 7 continents.',
        elementary: 'Fundamental Needs of Humans charts; Model UN mini-sessions; cultural heritage presentations.',
      },
      de: {
        toddler: 'Wiegenlieder aus aller Welt hören; internationales Brotverkosten (Naan, Fladenbrot, Baguette).',
        casa: 'Flaggen den Kontinentkarten zuordnen; Kulturkörbe der 7 Erdteile erkunden.',
        elementary: 'Tafel der Grundbedürfnisse des Menschen; Mini-UN-Vollversammlung nachstellen.',
      },
    },
    recommendedMaterials: {
      ro: ['Cabinetul de Geografie (Hărțile Continentelor)', 'Steagurile Lumii pe suport de lemn', 'Tabloul Nevoilor Fundamentale ale Omului'],
      fr: ['Cabinet de géographie', 'Drapeaux du monde sur socles en bois', 'Tableau des Besoins Fondamentaux'],
      en: ['Geography Map Cabinet', 'Wooden World Flag Stands', 'Fundamental Needs of Humans Charts'],
      de: ['Geografie-Schrank', 'Weltflaggen auf Holzständern', 'Tafel der menschlichen Grundbedürfnisse'],
    },
    montessoriQuote: {
      ro: {
        text: '«Oamenii sunt ca frunzele aceluiași copac: fiecare este unică, dar toate își trag seva din aceeași rădăcină comună a umanității.»',
        source: 'Dr. Maria Montessori, Pentru a Educa Potențialul Uman',
      },
      fr: {
        text: '« Les êtres humains sont comme les feuilles d\'un même arbre : chacun est unique, mais tous puisent la vie à la même racine commune. »',
        source: 'Dr. Maria Montessori',
      },
      en: {
        text: '« An education capable of saving humanity is no small undertaking; it involves the spiritual development of man, the enhancement of his value as an individual, and the preparation of young people to understand the times in which they live. »',
        source: 'Dr. Maria Montessori, Education and Peace',
      },
      de: {
        text: '« Die Menschen gleichen den Blättern eines Baumes: Jedes ist einzigartig, doch alle entspringen derselben gemeinsamen Wurzel der Menschheit. »',
        source: 'Dr. Maria Montessori',
      },
    },
  },

  // 15. NOIEMBRIE - Ziua Universală a Drepturilor Copilului (20 Noiembrie)
  {
    id: 'world-childrens-day',
    month: 11,
    day: 20,
    category: 'peace',
    iconName: 'Heart',
    dateDisplay: {
      ro: '20 Noiembrie',
      fr: '20 Novembre',
      en: 'November 20',
      de: '20. November',
    },
    title: {
      ro: 'Ziua Universală a Drepturilor Copilului & Carta Copilului',
      fr: 'Journée Mondiale des Droits de l\'Enfant & La Charte de l\'Enfant',
      en: 'World Children\'s Day & The Rights of the Child',
      de: 'Welttag der Kinderrechte & Die Charta des Kindes',
    },
    subtitle: {
      ro: '«Copilul nu este o proprietate a adultului, ci un cetățean deplin al omenirii»',
      fr: '« L\'enfant n\'est pas la propriété de l\'adulte, mais un citoyen à part entière »',
      en: '« The child is not a possession of the adult, but a sovereign citizen of humanity »',
      de: '« Das Kind ist kein Eigentum des Erwachsenen, sondern vollwertiger Bürger der Menschheit »',
    },
    historicalContext: {
      ro: 'Adoptarea Convenției ONU pentru Drepturile Copilului în 1989. Maria Montessori a fost primul medic și pedagog modern care a redactat încă din 1930 o «Cartă a Drepturilor Copilului», cerând recunoașterea nevoilor sale spirituale specifice.',
      fr: 'Adoption de la Convention de l\'ONU en 1989. Dès les années 1930, Montessori fut la pionnière qui réclama une déclaration des droits du travail de l\'enfant.',
      en: 'Adoption of the UN Convention on the Rights of the Child in 1989. Decades earlier, in 1930, Dr. Montessori drafted the pioneering "Charter of the Child\'s Rights".',
      de: '1989 Verabschiedung der UN-Kinderrechtskonvention. Maria Montessori forderte bereits in den 1930er Jahren eine weltweite Charta der Rechte des Kindes.',
    },
    pedagogicalMeaning: {
      ro: 'Recunoașterea dreptului copilului la libertate de alegere, la mișcare neîngrădită, la concentrare netulburată și la respectul deplin al demnității sale.',
      fr: 'Reconnaître le droit de l\'enfant à la liberté de choix, au mouvement autonome, à la concentration non interrompue et au respect inconditionnel.',
      en: 'Affirming the child\'s fundamental rights: self-chosen purposeful work, unhurried time, uninterrupted concentration, and dignified respect.',
      de: 'Anerkennung des Rechts auf freie Wahl der Arbeit, ungestörte Konzentration und uneingeschränkte Achtung der Würde.',
    },
    classroomActivities: {
      ro: {
        toddler: 'Exerciții de independență: alegerea autonomă a lucrului de pe raft fără intervenția adultului.',
        casa: '«Masa Alegerii Libere»: discuție despre dreptul de a spune ce simțim și de a fi ascultați.',
        elementary: 'Analiza articolelor Convenției Drepturilor Copilului; scrierea unei cărți ilustrate pentru cei mici.',
      },
      fr: {
        toddler: 'Autonomie totale : choisir son activité sur le plateau sans interférence adulte.',
        casa: 'Discussion en cercle sur le droit d\'être écouté, respecté et protégé avec douceur.',
        elementary: 'Étude des articles de la Convention de 1989 ; création d\'affiches illustrées pour l\'école.',
      },
      en: {
        toddler: 'Pure autonomous choice: freely taking and returning activities from accessible low shelves.',
        casa: 'Circle conversation: the right to speak, be heard, and work without being interrupted by adults.',
        elementary: 'Deep study of the UN Convention on the Rights of the Child; student-authored illustrated booklets.',
      },
      de: {
        toddler: 'Vollkommen freie Wahl des Materials aus niedrigen, offenen Regalen.',
        casa: 'Gesprächskreis über das Recht, ungestört arbeiten zu dürfen und gehört zu werden.',
        elementary: 'Analyse der UN-Kinderrechtskonvention; Erstellung von Informationsplakaten.',
      },
    },
    recommendedMaterials: {
      ro: ['Carta Drepturilor Copilului (Text Montessori)', 'Rafturile Deschise la Nivelul Copilului', 'Masa Păcii'],
      fr: ['Charte des droits de l\'enfant selon Montessori', 'Ambiance préparée à hauteur d\'enfant', 'Table de Paix'],
      en: ['Montessori Declaration of the Rights of the Child', 'Low Prepared Environment Shelving', 'Peace Table'],
      de: ['Montessoris Erklärung der Rechte des Kindes', 'Niedrige offene Regale', 'Friedenstisch'],
    },
    montessoriQuote: {
      ro: {
        text: '«Dacă există o speranță de salvare pentru omenire, această speranță nu poate veni decât de la copil, căci în el se clădește omul de mâine.»',
        source: 'Dr. Maria Montessori, Mintea Absorbantă',
      },
      fr: {
        text: '« Si le salut et le secours doivent venir, ils ne viendront que de l\'enfant, car l\'enfant est le bâtisseur de l\'homme. »',
        source: 'Dr. Maria Montessori, L\'Esprit Absorbant',
      },
      en: {
        text: '« The child is endowed with an unknown power, which can guide us to a more radiant future. If what is really wanted is a new world, then education must take as its aim the development of these hidden possibilities. »',
        source: 'Dr. Maria Montessori, The Absorbent Mind',
      },
      de: {
        text: '« Wenn Rettung und Hilfe kommen sollen, dann können sie nur vom Kinde ausgehen, denn das Kind ist der Schöpfer des Menschen. »',
        source: 'Dr. Maria Montessori, Das beharrliche Kind',
      },
    },
  },

  // 16. DECEMBRIE - Solstițiul de Iarnă & Spirala Luminii (21 Decembrie)
  {
    id: 'winter-solstice-spiral',
    month: 12,
    day: 21,
    category: 'tradition',
    iconName: 'Sun',
    dateDisplay: {
      ro: '21 Decembrie',
      fr: '21 Décembre',
      en: 'December 21',
      de: '21. Dezember',
    },
    title: {
      ro: 'Solstițiul de Iarnă & Spirala Luminii Interioare',
      fr: 'Solstice d\'Hiver & La Spirale de Lumière',
      en: 'Winter Solstice & The Spiral of Light',
      de: 'Wintersonnenwende & Die Lichtspirale',
    },
    subtitle: {
      ro: 'Cea mai lungă noapte din an și celebrarea luminii din inima fiecărui copil',
      fr: 'La nuit la plus longue de l\'année et la célébration de la flamme intérieure de chaque enfant',
      en: 'Longest night of the year; ceremonial celebration of inner light and quiet contemplation',
      de: 'Die längste Nacht des Jahres; festliche Feier des inneren Lichts und der Stille',
    },
    historicalContext: {
      ro: 'Solstițiul astronomic de iarnă. În tradiția multor școli Montessori de pe glob, se așază pe covor o spirală mare din crenguțe de brad verde. În centru arde o lumânare mare. Fiecare copil pășește în spirală purtând un măr cu o lumânare mică, o aprinde și o lasă pe traseu, transformând întunericul în lumină radiantă.',
      fr: 'Solstice d\'hiver astronomique. Dans la tradition montessorienne, une spirale de branches de sapin est disposée au sol avec une flamme centrale. Chaque enfant avance en silence, allume sa veilleuse et la dépose, illuminant progressivement la pièce.',
      en: 'Astronomical winter solstice. In beloved Montessori traditions worldwide, an evergreen spiral is laid upon the floor with a central candle. Each child walks inward in serene silence, lights a candle set in a polished red apple, and places it along the path until the whole room radiates with warm golden light.',
      de: 'Astronomische Wintersonnenwende. In Montessori-Häusern wird traditionell eine Tannenzweig-Spirale mit einer zentralen Flamme gelegt. Jedes Kind geht schweigend den Weg, entzündet sein Apfellicht und erhellt den Raum.',
    },
    pedagogicalMeaning: {
      ro: 'Simbolizează drumul lăuntric al copilului spre concentrare, liniște și bucuria de a împărtăși lumina cunoașterii cu ceilalți.',
      fr: 'Symbole du chemin intérieur vers la concentration profonde et la joie généreuse d\'éclairer le chemin des autres.',
      en: 'Symbolizes the child\'s inward journey toward deep concentration, inner peace, and lighting the community\'s collective path.',
      de: 'Sinnbild für den inneren Weg zur Konzentration und die Freude, der Gemeinschaft Licht zu schenken.',
    },
    classroomActivities: {
      ro: {
        toddler: 'Mersul delicat pe linia elipsei ținând un clopoțel fără să scoată niciun sunet.',
        casa: 'Ceremonia Spiralei Solstițiului cu mere, ceară naturală de albine și cântece de iarnă.',
        elementary: 'Studiul mișcării de revoluție a Pământului și a nopții polare; modelarea lumânărilor din ceară de albine.',
      },
      fr: {
        toddler: 'Marcher sur la ligne en tenant une cloche d\'argent sans la faire tinter.',
        casa: 'Rituel de la Spirale d\'hiver avec pommes évidées et cire d\'abeille naturelle.',
        elementary: 'Explication astronomique de l\'axe terrestre et de la nuit polaire ; fabrication de bougies trempées.',
      },
      en: {
        toddler: 'Walking softly on the ellipse line holding a silver bell without allowing it to ring.',
        casa: 'Walking the Evergreen Solstice Spiral with beeswax candles set in polished apples; soft singing.',
        elementary: 'Astronomical study of solstice tilt, polar nights, and ancient cultural sun stone monuments (Stonehenge).',
      },
      de: {
        toddler: 'Auf der Linie gehen mit einem kleinen Glöckchen, ohne dass es ertönt.',
        casa: 'Die Winter-Lichtspirale mit Bienenwachskerzen in roten Äpfeln abschreiten.',
        elementary: 'Astronomische Hintergründe der Polarnacht; Kerzenziehen aus Bienenwachs.',
      },
    },
    recommendedMaterials: {
      ro: ['Spirala din ramuri verzi de brad', 'Lumânări din ceară naturală de albine', 'Mere roșii lustruite', 'Linia Elipsei'],
      fr: ['Spirale de sapin naturel', 'Bougies en cire d\'abeille', 'Pommes rouges lustrées', 'Ligne elliptique'],
      en: ['Evergreen Pine Boughs Spiral', 'Pure Beeswax Taper Candles', 'Polished Red Apples', 'Elliptical Floor Line'],
      de: ['Tannenzweig-Spirale', 'Echte Bienenwachskerzen', 'Polierte rote Äpfel', 'Bodenellipse'],
    },
    montessoriQuote: {
      ro: {
        text: '«Tăcerea nu este o lipsă de sunet, ci o stare de plenitudine și armonie în care sufletul copilului își găsește adevărata forță.»',
        source: 'Dr. Maria Montessori, Secretul Copilăriei',
      },
      fr: {
        text: '« Le silence n\'est pas une simple absence de bruit, mais un état de plénitude où l\'âme de l\'enfant découvre sa force véritable. »',
        source: 'Dr. Maria Montessori',
      },
      en: {
        text: '« Real silence is not merely the absence of sound; it is a profound spiritual state of harmony, peace, and collected energy in which the child\'s soul discovers its true dignity. »',
        source: 'Dr. Maria Montessori, The Secret of Childhood',
      },
      de: {
        text: '« Stille ist nicht bloßes Schweigen, sondern ein Zustand seelischer Harmonie, in dem das Kind seine innere Kraft findet. »',
        source: 'Dr. Maria Montessori, Das Geheimnis der Kindheit',
      },
    },
  },
];
