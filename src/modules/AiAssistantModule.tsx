import React, { useState, useRef, useEffect } from 'react';
import { InstitutionConfig } from '../types';
import { Language, UI_TRANSLATIONS } from '../i18n/translations';
import {
  Bot,
  Send,
  Sparkles,
  RefreshCw,
  HelpCircle,
  Loader2,
  Printer,
  FileDown,
  Copy,
  Check
} from 'lucide-react';
import { SpeechToTextButton } from '../components/SpeechToTextButton';
import { PrintAiModal, AiPrintTarget } from '../components/PrintAiModal';
import { exportAiResponseToPdf, exportAiConversationToPdf } from '../utils/aiPdfExport';

interface AiAssistantModuleProps {
  institution: InstitutionConfig;
  lang: Language;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const MULTILINGUAL_QUESTIONS: Record<Language, { title: string; prompt: string }[]> = {
  ro: [
    {
      title: 'Atenție redusă la Turnul Roz',
      prompt: 'În calitate de formator Montessori, cum sfătuiești un asistent/ghid să intervină când un copil își pierde concentrarea la Turnul Roz după doar 2 minute?'
    },
    {
      title: 'Tranziție de la ciclul de 3h la masă',
      prompt: 'Care sunt pașii și regulile de grație și curtoazie pentru o tranziție lină și calmă de la ciclul de lucru neîntrerupt de 3 ore la masa de prânz?'
    },
    {
      title: 'Lauda când copilul greșește calculul',
      prompt: 'Cum folosim lauda descriptivă și principiul controlului erorii când un copil face o greșeală în calculul cu mărgelele sau la tabla adunării?'
    },
    {
      title: 'Exerciții viață practică (copil 3 ani agitat)',
      prompt: 'Recomandă 3 exerciții specifice de viață practică (Practical Life) pentru dezvoltarea autocontrolului, voinței și izolării dificultății la un copil de 3 ani agitat.'
    },
    {
      title: 'Refuzul de a strânge materialul',
      prompt: 'Cum gestionează un asistent Montessori situația în care un copil refuză categoric să ducă tava la raft după ce a terminat activitatea?'
    },
    {
      title: 'Explicație pentru părinți: Muncă vs Joacă',
      prompt: 'Cum le explicăm părinților, în termeni calzi și convingători, diferența dintre «Munca» liber aleasă în sens Montessori și «Joaca» obișnuită?'
    }
  ],
  fr: [
    {
      title: 'Baisse d’attention avec la Tour Rose',
      prompt: 'En tant que formateur, fondé sur les principes du modèle éducatif Montessori, comment conseillez-vous à un assistant d’intervenir avec délicatesse lorsqu’un enfant perd sa concentration devant la Tour Rose après deux minutes ?'
    },
    {
      title: 'Transition du cycle de 3h vers le repas',
      prompt: 'Quelles sont les présentations de grâce et courtoisie pour organiser une transition fluide, digne et sereine entre le grand cycle de travail du matin et le repas partagé ?'
    },
    {
      title: 'Éloge descriptif et erreur de calcul',
      prompt: 'Comment formuler un éloge descriptif respectueux du contrôle de l’erreur lorsqu’un enfant se trompe dans une opération avec les perles dorées ?'
    },
    {
      title: 'Vie pratique pour un enfant agité de 3 ans',
      prompt: 'Proposez 3 exercices de vie pratique ciblant l’inhibition, l’isolement de la difficulté et la coordination oeil-main pour un enfant de 3 ans agité.'
    },
    {
      title: 'Refus de ranger le plateau',
      prompt: 'Comment appliquer la règle des deux choix et la grâce sociale lorsqu’un enfant refuse de ranger son activité sur l’étagère ?'
    },
    {
      title: 'Expliquer « Travail » vs « Jeu » aux parents',
      prompt: 'Comment expliquer avec pédagogie aux parents pourquoi Maria Montessori parle de « Travail de l’enfant » plutôt que de simple jeu ?'
    }
  ],
  en: [
    {
      title: 'Loss of focus on Pink Tower',
      prompt: 'As a trainer, grounded in the principles of the Montessori educational model, how should an assistant guide a 4-year-old who loses focus after 2 minutes with the Pink Tower?'
    },
    {
      title: '3-hour work cycle to lunch transition',
      prompt: 'What are the grace and courtesy steps for a calm, graceful transition from the uninterrupted 3-hour morning work cycle to lunch?'
    },
    {
      title: 'Descriptive praise with math error',
      prompt: 'How do we use descriptive praise and the control of error when a child makes a calculation mistake on the bead frame?'
    },
    {
      title: 'Practical life for restless 3-year-old',
      prompt: 'Recommend 3 concrete practical life presentations to help a restless 3-year-old develop self-regulation and inner order.'
    },
    {
      title: 'Child refusing to return material',
      prompt: 'How does an assistant handle a child who outright refuses to return their mat and tray to the shelf after finishing work?'
    },
    {
      title: 'Explaining "Work" vs "Play" to parents',
      prompt: 'How can we explain to parents why Dr. Montessori described purposeful children’s activity as "Work" rather than mere play?'
    }
  ],
  de: [
    {
      title: 'Konzentrationsabbruch am Rosa Turm',
      prompt: 'Wie rät ein Montessori-Ausbilder einem Assistenten vorzugehen, wenn ein Kind nach zwei Minuten am Rosa Turm die Aufmerksamkeit verliert?'
    },
    {
      title: 'Übergang vom 3h-Zyklus zum Mittagessen',
      prompt: 'Welche Übungen von Anmut und Höflichkeit unterstützen einen ruhigen, harmonischen Übergang von der Freiarbeit zum gemeinsamen Essen?'
    },
    {
      title: 'Beschreibendes Lob bei Rechenfehlern',
      prompt: 'Wie wenden wir beschreibendes Lob und Fehlerkontrolle an, wenn ein Kind bei den Perlenstäbchen ein falsches Ergebnis ermittelt?'
    },
    {
      title: 'Praktisches Leben für unruhiges 3-jähriges Kind',
      prompt: 'Empfehlen Sie 3 Übungen des täglichen Lebens zur Förderung der Selbstregulation und Bewegungskoordination bei einem unruhigen 3-Jährigen.'
    },
    {
      title: 'Weigerung, das Material aufzuräumen',
      prompt: 'Wie begleitet ein Assistent ein Kind, das sich weigert, das Tablett nach der Arbeit ins Regal zurückzubringen?'
    },
    {
      title: '«Arbeit» vs. «Spiel» Eltern erklären',
      prompt: 'Wie erklären wir Eltern einfühlsam den Unterschied zwischen dem Montessori-Begriff der «Arbeit» und herkömmlichem Spiel?'
    }
  ]
};

export const AiAssistantModule: React.FC<AiAssistantModuleProps> = ({ institution, lang }) => {
  const t = UI_TRANSLATIONS[lang].ai;
  const questions = MULTILINGUAL_QUESTIONS[lang] || MULTILINGUAL_QUESTIONS.ro;

  // Clean initial state with no default draft bubble
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [selectedForPrint, setSelectedForPrint] = useState<AiPrintTarget | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getPrecedingQuestion = (assistantMsgId: string): string | undefined => {
    const index = messages.findIndex((m) => m.id === assistantMsgId);
    if (index > 0) {
      for (let i = index - 1; i >= 0; i--) {
        if (messages[i].role === 'user') {
          return messages[i].content;
        }
      }
    }
    return undefined;
  };

  const handleDownloadSinglePdf = (msg: ChatMessage) => {
    const question = getPrecedingQuestion(msg.id);
    exportAiResponseToPdf({
      content: msg.content,
      question,
      timestamp: msg.timestamp,
      lang,
      institution,
    });
  };

  const handleOpenPrintSingle = (msg: ChatMessage) => {
    const question = getPrecedingQuestion(msg.id);
    setSelectedForPrint({
      content: msg.content,
      question,
      timestamp: msg.timestamp,
    });
    setIsPrintModalOpen(true);
  };

  const handleOpenPrintFull = () => {
    setSelectedForPrint(null);
    setIsPrintModalOpen(true);
  };

  const handleDownloadFullPdf = () => {
    exportAiConversationToPdf({
      messages,
      lang,
      institution,
    });
  };

  const handleCopyMessage = (msg: ChatMessage) => {
    navigator.clipboard.writeText(msg.content);
    setCopiedId(msg.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSend = async (textToSend?: string) => {
    const messageText = textToSend || input;
    if (!messageText.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: 'user-' + Date.now(),
      role: 'user',
      content: messageText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: messageText,
          schoolName: institution.name,
          lang,
          messages: messages.concat(userMessage).map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await response.json();
      if (!response.ok || data.error) {
        throw new Error(data.error || 'Eroare de comunicare.');
      }

      const botMessage: ChatMessage = {
        id: 'bot-' + Date.now(),
        role: 'assistant',
        content: data.reply || 'Am consultat principiile Montessori.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err: any) {
      const errorMessage: ChatMessage = {
        id: 'err-' + Date.now(),
        role: 'assistant',
        content: `⚠️ ${err?.message || 'Eroare de comunicare.'}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([]);
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2E5A44] text-white flex items-center justify-center shrink-0">
              <Bot className="w-6 h-6 text-[#D4A373]" />
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
            <span className="text-xs bg-emerald-50 text-emerald-800 font-semibold px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> {t.activeStatus}
            </span>
            {messages.length > 0 && (
              <>
                <button
                  type="button"
                  onClick={handleOpenPrintFull}
                  className="px-2.5 py-1 text-xs font-semibold bg-[#2E5A44]/10 hover:bg-[#2E5A44]/20 text-[#1F3A2B] rounded-lg border border-[#2E5A44]/20 flex items-center gap-1.5 transition-colors cursor-pointer"
                  title={t.printAll}
                >
                  <Printer className="w-3.5 h-3.5 text-[#2E5A44]" />
                  <span className="hidden sm:inline">{t.printAll}</span>
                </button>
                <button
                  type="button"
                  onClick={handleDownloadFullPdf}
                  className="px-2.5 py-1 text-xs font-semibold bg-[#D4A373]/20 hover:bg-[#D4A373]/35 text-[#8C5E28] rounded-lg border border-[#D4A373]/40 flex items-center gap-1.5 transition-colors cursor-pointer"
                  title={t.exportAllPdf}
                >
                  <FileDown className="w-3.5 h-3.5 text-[#8C5E28]" />
                  <span className="hidden sm:inline">{t.exportAllPdf}</span>
                </button>
                <button
                  type="button"
                  onClick={handleResetChat}
                  className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100 cursor-pointer"
                  title={t.resetChat}
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Quick prompt chips */}
        <div className="pt-2">
          <span className="text-[11px] font-bold text-[#2E5A44] uppercase tracking-wider block mb-2">
            {t.frequentQuestions}
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {questions.map((q) => (
              <button
                key={q.title}
                type="button"
                onClick={() => handleSend(q.prompt)}
                disabled={isLoading}
                className="p-2.5 bg-[#F4F7F5] hover:bg-[#2E5A44]/10 border border-[#2E5A44]/15 rounded-xl text-left transition-colors text-xs text-[#1F3A2B] font-medium flex items-start gap-2 disabled:opacity-50 cursor-pointer"
              >
                <HelpCircle className="w-4 h-4 text-[#D4A373] shrink-0 mt-0.5" />
                <span className="line-clamp-2">{q.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col h-[520px] overflow-hidden">
        {/* Messages scroll area */}
        <div className="flex-1 p-5 md:p-6 overflow-y-auto space-y-4 bg-gray-50/50">
          {messages.map((m) => {
            const isUser = m.role === 'user';
            return (
              <div
                key={m.id}
                className={`flex gap-3 max-w-[85%] ${
                  isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    isUser
                      ? 'bg-[#1F3A2B] text-white'
                      : 'bg-[#2E5A44] text-[#D4A373] border border-[#D4A373]'
                  }`}
                >
                  {isUser ? 'Tu' : <Sparkles className="w-4 h-4" />}
                </div>

                <div
                  className={`p-4 rounded-2xl text-xs md:text-sm leading-relaxed shadow-xs ${
                    isUser
                      ? 'bg-[#2E5A44] text-white rounded-tr-none'
                      : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none'
                  }`}
                >
                  <div className="whitespace-pre-line prose prose-xs max-w-none">
                    {m.content}
                  </div>

                  {isUser ? (
                    <div className="text-[9px] mt-1.5 text-right font-mono text-white/60">
                      {m.timestamp}
                    </div>
                  ) : (
                    <div className="mt-3 pt-2 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleDownloadSinglePdf(m)}
                          className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-[#1F3A2B] text-[11px] font-semibold rounded-lg border border-emerald-200 flex items-center gap-1 transition-colors cursor-pointer"
                          title={t.exportPdf}
                        >
                          <FileDown className="w-3.5 h-3.5 text-[#2E5A44]" />
                          <span>{t.exportPdf}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleOpenPrintSingle(m)}
                          className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-[11px] font-semibold rounded-lg border border-gray-200 flex items-center gap-1 transition-colors cursor-pointer"
                          title={t.printText}
                        >
                          <Printer className="w-3.5 h-3.5 text-gray-600" />
                          <span>{t.printText}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleCopyMessage(m)}
                          className="p-1 hover:bg-gray-100 text-gray-500 hover:text-gray-700 rounded-lg transition-colors cursor-pointer"
                          title={t.copyText}
                        >
                          {copiedId === m.id ? (
                            <span className="flex items-center gap-1 text-[10px] text-emerald-600 font-bold">
                              <Check className="w-3.5 h-3.5" /> {t.copied}
                            </span>
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>

                      <span className="text-[9px] font-mono text-gray-400">
                        {m.timestamp}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 max-w-[85%] mr-auto items-center text-xs text-gray-500 bg-white p-3.5 rounded-2xl border border-gray-200 shadow-xs">
              <Loader2 className="w-4 h-4 text-[#2E5A44] animate-spin" />
              <span>{t.consulting}</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-gray-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <div className="flex-1 relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t.inputPlaceholder}
                disabled={isLoading}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 pr-10 text-xs md:text-sm text-gray-800 placeholder-gray-400 focus:bg-white focus:outline-none focus:border-[#2E5A44]"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                <SpeechToTextButton
                  lang={lang}
                  currentValue={input}
                  onTranscript={(val) => setInput(val)}
                  size="sm"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-5 py-2.5 bg-[#2E5A44] hover:bg-[#1F3A2B] disabled:opacity-40 text-white font-bold text-xs rounded-xl shadow flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
            >
              <Send className="w-4 h-4 text-[#D4A373]" />
              <span className="hidden sm:inline">{t.sendBtn}</span>
            </button>
          </form>
        </div>
      </div>

      <PrintAiModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        institution={institution}
        lang={lang}
        selectedAiMessage={selectedForPrint}
        allMessages={messages}
      />
    </div>
  );
};
