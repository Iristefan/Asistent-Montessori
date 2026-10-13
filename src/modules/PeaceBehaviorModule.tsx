import React, { useState } from 'react';
import { Language, UI_TRANSLATIONS } from '../i18n/translations';
import {
  Heart,
  Sparkles,
  Flower2,
  ArrowRight,
  Scale
} from 'lucide-react';
import { SpeechToTextButton } from '../components/SpeechToTextButton';

interface PeaceBehaviorModuleProps {
  lang: Language;
}

interface LocalPraiseScenario {
  id: string;
  situation: string;
  praise: string;
  explanation: string;
}

const MULTILINGUAL_PRAISE: Record<Language, LocalPraiseScenario[]> = {
  ro: [
    {
      id: 'p1',
      situation: 'Copilul a terminat un desen complex cu forme geometrice',
      praise: '„Am observat câtă atenție ai acordat fiecărui contur și cum ai combinat culorile cu atâta răbdare timp de o jumătate de oră!”',
      explanation: 'Descrie efortul, durata și precizia tehnică, evitând etichetarea exterioară subiectivă precum «Ce desen frumos!».',
    },
    {
      id: 'p2',
      situation: 'Copilul a vărsat apă pe podea și a adus singur mopul și cârpa',
      praise: '„Îți mulțumesc că ai observat apa vărsată și ai adus imediat cârpa pentru a păstra podeaua uscată și sigură pentru toți colegii tăi.”',
      explanation: 'Subliniază acțiunea reparatorie și contribuția la binele comunității, fără a face copilul să se simtă vinovat.',
    },
    {
      id: 'p3',
      situation: 'Copilul a lucrat 40 de minute neîntrerupt la Turnul Roz',
      praise: '„Ai pus fiecare cub de la cel mai mare la cel mai mic și ai verificat cu degetul dacă marginile sunt aliniate perfect. Păreai foarte absorbit de lucrul tău!”',
      explanation: 'Validează experiența interioară a concentrării și satisfacția intrinsecă a autocontrolului erorii.',
    },
    {
      id: 'p4',
      situation: 'Doi copii au rezolvat o dispută la Masa Păcii',
      praise: '„Ați ascultat fiecare cu atenție ce avea colegul de spus și ați găsit o înțelegere corectă pentru amândoi la Masa Păcii.”',
      explanation: 'Întărește comportamentul de ascultare activă și autonomia rezolvării conflictului fără arbitrajul adultului.',
    },
  ],
  fr: [
    {
      id: 'p1',
      situation: 'L’enfant a terminé un dessin géométrique complexe',
      praise: '« J’ai remarqué toute l’attention que tu as portée à chaque contour et la patience avec laquelle tu as nuancé les couleurs pendant trente minutes ! »',
      explanation: 'Décrit l’effort concret et la précision, évitant les jugements subjectifs comme « Quel beau dessin ! ».',
    },
    {
      id: 'p2',
      situation: 'L’enfant a renversé de l’eau et a cherché la serpillière lui-même',
      praise: '« Je te remercie d’avoir remarqué l’eau renversée et d’avoir utilisé l’éponge pour garder le sol sec et sécurisé pour toute la classe. »',
      explanation: 'Valorise l’action réparatrice et la responsabilité communautaire sans culpabiliser l’enfant.',
    },
    {
      id: 'p3',
      situation: 'L’enfant a travaillé 40 minutes d’affilée avec la Tour Rose',
      praise: '« Tu as posé chaque cube du plus grand au plus petit et glissé ton doigt pour vérifier les arêtes. Tu semblais profondément absorbé par ton travail ! »',
      explanation: 'Reconnaît l’état de concentration et le plaisir d’utiliser le contrôle de l’erreur de manière autonome.',
    },
    {
      id: 'p4',
      situation: 'Deux enfants ont réglé un désaccord à la Table de Paix',
      praise: '« Vous vous êtes écoutés avec beaucoup de respect et vous avez trouvé ensemble un accord équitable à la Table de Paix. »',
      explanation: 'Renforce l’écoute active et la résolution autonome sans intervention d’arbitre adulte.',
    },
  ],
  en: [
    {
      id: 'p1',
      situation: 'Child finished an intricate geometric drawing',
      praise: '"I noticed the care you took with each outline and how patiently you blended the colored pencils for thirty uninterrupted minutes!"',
      explanation: 'Highlights focused effort and precision, avoiding empty external labels like "What a pretty drawing!".',
    },
    {
      id: 'p2',
      situation: 'Child spilled water and spontaneously retrieved the mop',
      praise: '"Thank you for noticing the spilled water right away and bringing the cloth so the floor stays dry and safe for everyone."',
      explanation: 'Focuses on restorative action and community care without evoking shame.',
    },
    {
      id: 'p3',
      situation: 'Child concentrated 40 minutes on the Pink Tower',
      praise: '"You carefully graded each cube from largest to smallest and checked the edges with your fingertips. You were completely absorbed in your work!"',
      explanation: 'Validates intrinsic concentration and joy of self-correction.',
    },
    {
      id: 'p4',
      situation: 'Two children resolved a mat dispute at the Peace Table',
      praise: '"You each listened closely while holding the peace rose and found a solution that felt fair to both of you."',
      explanation: 'Reinforces autonomous non-violent dialogue without adult judgment.',
    },
  ],
  de: [
    {
      id: 'p1',
      situation: 'Das Kind hat eine anspruchsvolle geometrische Zeichnung vollendet',
      praise: '«Ich habe bemerkt, mit wie viel Sorgfalt du jeden Strich gezogen und wie geduldig du eine halbe Stunde lang gearbeitet hast!»',
      explanation: 'Beschreibt die Anstrengung und Ausdauer, statt oberflächlich «Schönes Bild!» zu sagen.',
    },
    {
      id: 'p2',
      situation: 'Wasser verschüttet und selbstständig Wischmop geholt',
      praise: '«Danke, dass du das Wasser sofort bemerkt und aufgewischt hast, damit der Boden für alle Kinder sicher bleibt.»',
      explanation: 'Stärkt die Wiedergutmachung und Verantwortung für die Gemeinschaft ohne Schuldgefühle.',
    },
    {
      id: 'p3',
      situation: '40 Minuten ununterbrochen am Rosa Turm gearbeitet',
      praise: '«Du hast jeden Kubus vom größten zum kleinsten aufgebaut und mit den Fingerspitzen geprüft. Du warst ganz in deine Arbeit vertieft!»',
      explanation: 'Würdigt die Konzentration und die Freude an der eigenständigen Fehlerkontrolle.',
    },
    {
      id: 'p4',
      situation: 'Zwei Kinder haben am Friedenstisch eine Einigung erzielt',
      praise: '«Ihr habt einander ruhig zugehört und am Friedenstisch eine gute Lösung für beide gefunden.»',
      explanation: 'Fördert aktives Zuhören und friedliche Selbstregulierung.',
    },
  ],
};

export const PeaceBehaviorModule: React.FC<PeaceBehaviorModuleProps> = ({ lang }) => {
  const t = UI_TRANSLATIONS[lang].peace;
  const scenarios = MULTILINGUAL_PRAISE[lang] || MULTILINGUAL_PRAISE.ro;

  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(scenarios[0].id);
  const [customPraiseInput, setCustomPraiseInput] = useState('');
  const [customPraiseResult, setCustomPraiseResult] = useState<string | null>(null);

  const [conflictType, setConflictType] = useState<string>('curatenie');
  const [peaceStep, setPeaceStep] = useState(1);

  const selectedScenario =
    scenarios.find((s) => s.id === selectedScenarioId) || scenarios[0];

  const handleGenerateCustomPraise = () => {
    if (!customPraiseInput.trim()) return;
    const template = {
      ro: `„Am observat cât efort ai depus la ${customPraiseInput}. Ai lucrat cu perseverență și ai găsit singur calea de a finaliza fără să renunți!”`,
      fr: `« J’ai remarqué tous les efforts que tu as consacrés à ${customPraiseInput}. Tu as persévéré et tu as trouvé la solution par toi-même ! »`,
      en: `"I noticed how much focused effort you put into ${customPraiseInput}. You persisted through the challenge and completed it on your own!"`,
      de: `«Ich habe gesehen, wie viel Ausdauer du in ${customPraiseInput} gesteckt hast. Du bist drangeblieben und hast selbst eine Lösung gefunden!»`,
    }[lang];

    setCustomPraiseResult(template);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#2E5A44] text-white flex items-center justify-center shrink-0">
            <Heart className="w-6 h-6 text-[#D4A373]" />
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

        <p className="text-xs md:text-sm text-gray-700 leading-relaxed bg-[#F4F7F5] p-3.5 rounded-xl border border-[#2E5A44]/20">
          {t.intro}
        </p>
      </div>

      {/* 2-column top grid: Descriptive Praise vs Limited Choices */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Descriptive Praise */}
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
            <Sparkles className="w-5 h-5 text-[#D4A373]" />
            <h3 className="text-base font-bold text-[#1F3A2B]">
              {t.praiseTitle}
            </h3>
          </div>

          <p className="text-xs text-gray-600">
            {t.praiseDesc}
          </p>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              {t.chooseScenario}
            </label>
            <select
              value={selectedScenarioId}
              onChange={(e) => setSelectedScenarioId(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-xs text-gray-800 focus:bg-white focus:outline-none focus:border-[#2E5A44]"
            >
              {scenarios.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.situation}
                </option>
              ))}
            </select>
          </div>

          {/* Phrasing Card */}
          <div className="p-4 bg-[#F4F7F5] rounded-xl border-l-4 border-l-[#2E5A44] space-y-2">
            <span className="text-[10px] font-bold text-[#2E5A44] uppercase tracking-wider block">
              {t.phrasingTitle}
            </span>
            <p className="text-xs font-semibold text-gray-900 leading-relaxed italic">
              {selectedScenario.praise}
            </p>
            <div className="text-[11px] text-gray-600 pt-1 border-t border-gray-200/60">
              <b>{t.whyWorks}</b> {selectedScenario.explanation}
            </div>
          </div>

          {/* Custom Praise Generator */}
          <div className="pt-2 border-t border-gray-100 space-y-2">
            <label className="block text-xs font-bold text-gray-700">
              {t.customSituation}
            </label>
            <div className="flex gap-2">
              <div className="flex-1 relative flex items-center">
                <input
                  type="text"
                  value={customPraiseInput}
                  onChange={(e) => setCustomPraiseInput(e.target.value)}
                  placeholder={t.customPlaceholder}
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 pr-9 text-xs focus:bg-white focus:outline-none"
                />
                <div className="absolute right-1.5 top-1/2 -translate-y-1/2">
                  <SpeechToTextButton
                    lang={lang}
                    currentValue={customPraiseInput}
                    onTranscript={(val) => setCustomPraiseInput(val)}
                    size="sm"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={handleGenerateCustomPraise}
                className="px-3.5 py-2 bg-[#2E5A44] hover:bg-[#1F3A2B] text-white text-xs font-semibold rounded-lg shrink-0 cursor-pointer transition-colors"
              >
                {t.generateBtn}
              </button>
            </div>

            {customPraiseResult && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-900 mt-2">
                {customPraiseResult}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Limited Choices Rule */}
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
            <Scale className="w-5 h-5 text-[#2E5A44]" />
            <h3 className="text-base font-bold text-[#1F3A2B]">
              {t.limitedChoicesTitle}
            </h3>
          </div>

          <p className="text-xs text-gray-600">
            {t.limitedChoicesDesc}
          </p>

          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setConflictType('curatenie')}
              className={`p-2 rounded-lg text-xs font-medium border text-center transition-all cursor-pointer ${
                conflictType === 'curatenie'
                  ? 'bg-[#2E5A44] text-white border-[#2E5A44]'
                  : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
              }`}
            >
              {lang === 'fr' ? 'Rangement' : lang === 'en' ? 'Tidying Up' : lang === 'de' ? 'Aufräumen' : 'Curățenie'}
            </button>
            <button
              type="button"
              onClick={() => setConflictType('tranzitie')}
              className={`p-2 rounded-lg text-xs font-medium border text-center transition-all cursor-pointer ${
                conflictType === 'tranzitie'
                  ? 'bg-[#2E5A44] text-white border-[#2E5A44]'
                  : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
              }`}
            >
              {lang === 'fr' ? 'Transition' : lang === 'en' ? 'Transition' : lang === 'de' ? 'Übergänge' : 'Tranziție'}
            </button>
            <button
              type="button"
              onClick={() => setConflictType('alergare')}
              className={`p-2 rounded-lg text-xs font-medium border text-center transition-all cursor-pointer ${
                conflictType === 'alergare'
                  ? 'bg-[#2E5A44] text-white border-[#2E5A44]'
                  : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
              }`}
            >
              {lang === 'fr' ? 'Course' : lang === 'en' ? 'Running' : lang === 'de' ? 'Rennen' : 'Alergare'}
            </button>
          </div>

          {/* Conflict response cards */}
          {conflictType === 'curatenie' && (
            <div className="space-y-3 p-4 bg-[#F4F7F5] rounded-xl border border-gray-200 text-xs">
              <span className="font-bold text-red-700 block">
                {lang === 'fr'
                  ? '❌ Non : « Si tu ne ranges pas tout de suite, pas de récréation ! »'
                  : lang === 'en'
                  ? '❌ Avoid: "If you don’t put those beads away right now, no outdoor play!"'
                  : lang === 'de'
                  ? '❌ Vermeiden: «Wenn du jetzt nicht aufräumst, darfst du nicht raus!»'
                  : '❌ Greșit: „Dacă nu strângi mărgelele acum, nu mai ai voie în curte!”'}
              </span>
              <div className="space-y-1.5 pt-1">
                <span className="font-bold text-[#2E5A44] block">
                  ✔️ {lang === 'fr' ? 'Deux choix respectueux :' : lang === 'en' ? 'Two valid options:' : lang === 'de' ? 'Zwei annehmbare Wahlmöglichkeiten:' : 'Două opțiuni clare:'}
                </span>
                <p className="bg-white p-2 rounded border border-gray-200 text-gray-800">
                  {lang === 'fr'
                    ? '1. « Préfères-tu porter le plateau seul à l’étagère, ou souhaites-tu que je t’aide en tenant un coin ? »'
                    : lang === 'en'
                    ? '1. "Would you like to carry the tray back to the shelf by yourself, or shall we carry it together?"'
                    : lang === 'de'
                    ? '1. «Möchtest du das Tablett allein ins Regal tragen oder tragen wir es gemeinsam?»'
                    : '1. „Dorești să duci tava la raft acum singur, sau vrei să țin eu un colț și tu celălalt?”'}
                </p>
                <p className="bg-white p-2 rounded border border-gray-200 text-gray-800">
                  {lang === 'fr'
                    ? '2. « Préfères-tu ranger d’abord les perles rouges ou les perles bleues dans la boîte ? »'
                    : lang === 'en'
                    ? '2. "Do you want to put the red beads or the blue beads into the box first?"'
                    : lang === 'de'
                    ? '2. «Möchtest du zuerst die roten oder die blauen Perlen einsortieren?»'
                    : '2. „Preferi să așezi mai întâi mărgelele roșii sau pe cele albastre în cutie?”'}
                </p>
              </div>
            </div>
          )}

          {conflictType === 'tranzitie' && (
            <div className="space-y-3 p-4 bg-[#F4F7F5] rounded-xl border border-gray-200 text-xs">
              <span className="font-bold text-red-700 block">
                {lang === 'fr'
                  ? '❌ Non : « Tout le monde arrête son travail immédiatement ! »'
                  : lang === 'en'
                  ? '❌ Avoid: "Everyone stop working right now and come to lunch!"'
                  : lang === 'de'
                  ? '❌ Vermeiden: «Alle lassen sofort die Arbeit liegen!»'
                  : '❌ Greșit: „Toată lumea lasă lucrul și vine la masă!”'}
              </span>
              <div className="space-y-1.5 pt-1">
                <span className="font-bold text-[#2E5A44] block">
                  ✔️ {lang === 'fr' ? 'Deux choix respectueux :' : lang === 'en' ? 'Two valid options:' : 'Două opțiuni clare:'}
                </span>
                <p className="bg-white p-2 rounded border border-gray-200 text-gray-800">
                  {lang === 'fr'
                    ? '1. « Il te reste 5 minutes pour terminer cette ligne. Veux-tu poser le marque-page maintenant ou après ? »'
                    : lang === 'en'
                    ? '1. "You have 5 more minutes to finish this equation. Would you like to place your bookmark now or after this step?"'
                    : '1. „Mai ai 5 minute pentru a încheia acest rând. Vrei să pui semnul de carte acum sau după ultima operație?”'}
                </p>
              </div>
            </div>
          )}

          {conflictType === 'alergare' && (
            <div className="space-y-3 p-4 bg-[#F4F7F5] rounded-xl border border-gray-200 text-xs">
              <span className="font-bold text-red-700 block">
                {lang === 'fr'
                  ? '❌ Non : « Arrête de courir ! Assieds-toi immédiatement ! »'
                  : lang === 'en'
                  ? '❌ Avoid: "Stop running! Sit down immediately!"'
                  : '❌ Greșit: „Nu mai alerga! Stai jos imediat!”'}
              </span>
              <div className="space-y-1.5 pt-1">
                <span className="font-bold text-[#2E5A44] block">
                  ✔️ {lang === 'fr' ? 'Redirection douce du corps :' : lang === 'en' ? 'Gentle bodily redirection:' : 'Redirecționare fizică cu respect:'}
                </span>
                <p className="bg-white p-2 rounded border border-gray-200 text-gray-800">
                  {lang === 'fr'
                    ? '« Nos pieds marchent calmement dans la classe. Souhaites-tu marcher sur la ligne ou m’aider à porter le plateau lourd ? »'
                    : lang === 'en'
                    ? '"Our feet walk calmly inside our classroom. Would you like to walk on the line or help me carry the heavy book crate?"'
                    : '„Picioarele noastre merg cu pași calmi în clasă. Dorești să exersăm mersul pe linie sau să mă ajuți să transportăm cărțile grele?”'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Protocolul Mesei Păcii */}
      <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-gray-100 gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center">
              <Flower2 className="w-6 h-6 text-[#D4A373]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1F3A2B] font-serif">
                {t.peaceTableTitle}
              </h3>
              <p className="text-xs text-gray-500">
                {t.peaceTableDesc}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 text-xs">
            <span className="text-gray-500">{t.stepOf} {peaceStep} / 5</span>
          </div>
        </div>

        {/* Step indicator pills */}
        <div className="grid grid-cols-5 gap-2 text-center text-xs">
          {[
            t.steps.s1,
            t.steps.s2,
            t.steps.s3,
            t.steps.s4,
            t.steps.s5,
          ].map((title, idx) => {
            const stepNum = idx + 1;
            const isCompleted = peaceStep > stepNum;
            const isCurrent = peaceStep === stepNum;
            return (
              <button
                key={title}
                type="button"
                onClick={() => setPeaceStep(stepNum)}
                className={`p-2 rounded-xl border transition-all text-left cursor-pointer ${
                  isCurrent
                    ? 'border-[#2E5A44] bg-[#2E5A44] text-white shadow'
                    : isCompleted
                    ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                    : 'border-gray-200 bg-gray-50 text-gray-500'
                }`}
              >
                <div className="text-[10px] font-bold opacity-80">{t.stepOf} {stepNum}</div>
                <div className="font-semibold text-[11px] truncate">{title}</div>
              </button>
            );
          })}
        </div>

        {/* Step Details Content */}
        <div className="p-6 bg-[#F4F7F5] rounded-2xl border border-gray-200 space-y-4">
          {peaceStep === 1 && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-[#2E5A44]">
                {t.steps.s1}
              </h4>
              <p className="text-xs text-gray-700 leading-relaxed">
                {lang === 'fr'
                  ? 'Lorsque l’assistant observe une tension entre deux enfants, il s’approche doucement à la hauteur de leurs yeux et les invite à la Table de Paix.'
                  : lang === 'en'
                  ? 'When the assistant observes rising tension between children, they approach quietly at eye level and offer the invitation to the Peace Table.'
                  : 'Când asistentul observă o tensiune sau dispută, se apropie calm, la nivelul ochilor copiilor și îi invită la Masa Păcii.'}
              </p>
            </div>
          )}

          {peaceStep === 2 && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-[#2E5A44]">
                {t.steps.s2}
              </h4>
              <p className="text-xs text-gray-700 leading-relaxed">
                {lang === 'fr'
                  ? 'La fleur de paix ou la pierre lisse est remise à l’enfant qui s’exprime. Seul celui qui tient l’objet a la parole.'
                  : lang === 'en'
                  ? 'The peace rose or smooth stone is held by the speaking child. Only the person holding the peace symbol may speak.'
                  : 'Doar cel care ține floarea sau piatra păcii în mână vorbește. Celălalt ascultă cu atenție fără să întrerupă.'}
              </p>
            </div>
          )}

          {peaceStep === 3 && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-[#2E5A44]">
                {t.steps.s3}
              </h4>
              <p className="text-xs text-gray-700 leading-relaxed font-mono bg-white p-3 rounded-lg border border-gray-200">
                {lang === 'fr'
                  ? '« Je me suis senti triste quand tu as pris le cube sans demander. S’il te plaît, demande-moi la prochaine fois. »'
                  : lang === 'en'
                  ? '"I felt upset when you moved my mat without asking. Please ask me first next time."'
                  : '„M-am simțit supărat când ai luat cubul fără să mă întrebi. Te rog pe viitor să mă întrebi.”'}
              </p>
            </div>
          )}

          {peaceStep === 4 && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-[#2E5A44]">
                {t.steps.s4}
              </h4>
              <p className="text-xs text-gray-700 leading-relaxed">
                {lang === 'fr'
                  ? 'L’objet de paix est transmis avec délicatesse au second enfant, qui reformule ce qu’il a entendu sans attaquer.'
                  : lang === 'en'
                  ? 'The peace symbol is passed gently. The second child mirrors back what they heard without defending or attacking.'
                  : 'Simbolul păcii este oferit colegului, care ascultă activ și reformulează cu empatie perspectiva sa.'}
              </p>
            </div>
          )}

          {peaceStep === 5 && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-[#2E5A44]">
                {t.steps.s5}
              </h4>
              <p className="text-xs text-emerald-800 font-semibold bg-white p-3 rounded-lg border border-gray-200">
                ✓ {lang === 'fr'
                  ? 'Les enfants trouvent un accord équitable, se serrent la main ou s’offrent un sourire. La fleur revient au centre de la table.'
                  : lang === 'en'
                  ? 'Children agree on a solution, exchange a warm smile or handshake, and return the peace rose to the center of the table.'
                  : 'Copiii convin asupra soluției comune, se împacă sincer, iar floarea păcii revine pe suportul ei din centrul mesei.'}
              </p>
            </div>
          )}

          {/* Stepper controls */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-200/60">
            <button
              type="button"
              disabled={peaceStep === 1}
              onClick={() => setPeaceStep(peaceStep - 1)}
              className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 disabled:opacity-40 cursor-pointer"
            >
              {t.backBtn}
            </button>
            <button
              type="button"
              disabled={peaceStep === 5}
              onClick={() => setPeaceStep(peaceStep + 1)}
              className="px-4 py-1.5 bg-[#2E5A44] hover:bg-[#1F3A2B] text-white rounded-lg text-xs font-semibold disabled:opacity-40 flex items-center gap-1.5 cursor-pointer"
            >
              {t.nextBtn} <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
