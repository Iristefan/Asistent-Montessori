import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import { Language } from '../i18n/translations';
import { useSpeechToText } from '../hooks/useSpeechToText';

interface SpeechToTextButtonProps {
  lang: Language;
  currentValue?: string;
  onTranscript: (newText: string) => void;
  mode?: 'append' | 'replace';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'icon' | 'pill' | 'compact';
  className?: string;
  placeholderTargetName?: string;
}

export const SpeechToTextButton: React.FC<SpeechToTextButtonProps> = ({
  lang,
  currentValue = '',
  onTranscript,
  mode = 'append',
  size = 'md',
  variant = 'icon',
  className = '',
}) => {
  const [activeInterim, setActiveInterim] = useState<string>('');
  const [visibleError, setVisibleError] = useState<string | null>(null);

  const {
    isListening,
    isTranscribing,
    isSupported,
    errorMessage,
    audioLevel,
    durationSeconds,
    startListening,
    stopListening,
  } = useSpeechToText({
    lang,
    continuous: true,
    interimResults: true,
    onResult: (finalSegment, isFinal, fullSessionTranscript) => {
      if (isFinal) {
        setActiveInterim('');
        const cleanNew = (finalSegment || fullSessionTranscript).trim();
        if (!cleanNew) return;

        if (mode === 'append') {
          const trimmedVal = (currentValue || '').trim();
          const combined = trimmedVal ? `${trimmedVal} ${cleanNew}` : cleanNew;
          onTranscript(combined);
        } else {
          onTranscript(cleanNew);
        }
      } else {
        setActiveInterim(finalSegment);
      }
    },
  });

  // Auto-dismiss transient errors after 5 seconds
  useEffect(() => {
    if (errorMessage) {
      setVisibleError(errorMessage);
      const timer = setTimeout(() => {
        setVisibleError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const tooltips = {
    ro: {
      idle: 'Dictează vocal (Speech-to-Text)',
      listening: 'Se ascultă vocea... Apasă pentru a opri și insera textul',
      transcribing: 'Se transcrie audio prin AI...',
      notSupported: 'Microfonul nu este suportat în acest browser.',
      activeLabel: 'Ascultare activă...',
    },
    fr: {
      idle: 'Dictée vocale (Speech-to-Text)',
      listening: 'Écoute en cours... Cliquer pour arrêter et insérer',
      transcribing: 'Transcription audio en cours...',
      notSupported: 'Microphone non pris en charge.',
      activeLabel: 'Dictée active...',
    },
    en: {
      idle: 'Voice dictation (Speech-to-Text)',
      listening: 'Listening... Click to stop and insert text',
      transcribing: 'Transcribing audio with AI...',
      notSupported: 'Microphone not supported.',
      activeLabel: 'Listening active...',
    },
    de: {
      idle: 'Spracheingabe (Speech-to-Text)',
      listening: 'Höre zu... Klicken zum Beenden und Einfügen',
      transcribing: 'Transkribiere Audio...',
      notSupported: 'Mikrofon nicht unterstützt.',
      activeLabel: 'Spracheingabe aktiv...',
    },
  }[lang] || {
    idle: 'Voice dictation',
    listening: 'Listening... Click to insert',
    transcribing: 'Transcribing...',
    notSupported: 'Microphone not supported',
    activeLabel: 'Listening...',
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setVisibleError(null);

    if (isTranscribing) return;
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-7 h-7 text-xs',
    lg: 'px-3 py-1.5 text-xs',
  }[size];

  if (!isSupported) {
    return (
      <span
        title={tooltips.notSupported}
        className="inline-flex items-center text-gray-300 opacity-60 cursor-not-allowed"
      >
        <MicOff className="w-3.5 h-3.5" />
      </span>
    );
  }

  if (variant === 'pill') {
    return (
      <div className="relative inline-flex items-center">
        <button
          type="button"
          onClick={handleClick}
          disabled={isTranscribing}
          title={isTranscribing ? tooltips.transcribing : isListening ? tooltips.listening : tooltips.idle}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer select-none shadow-xs ${
            isTranscribing
              ? 'bg-amber-100 text-amber-900 border border-amber-300'
              : isListening
              ? 'bg-red-500 text-white shadow-md ring-2 ring-red-300'
              : 'bg-[#F4F7F5] hover:bg-[#2E5A44]/10 text-[#2E5A44] border border-[#2E5A44]/20'
          } ${className}`}
        >
          {isTranscribing ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-700" />
              <span>{lang === 'fr' ? 'Transcription...' : lang === 'de' ? 'Transkribieren...' : lang === 'en' ? 'Transcribing...' : 'Transcriu...'}</span>
            </>
          ) : isListening ? (
            <>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <Mic className="w-3.5 h-3.5 animate-bounce" />
              <span>
                {lang === 'fr' ? 'Stop' : lang === 'de' ? 'Stop' : lang === 'en' ? 'Stop' : 'Gata'} ({durationSeconds}s)
              </span>
            </>
          ) : (
            <>
              <Mic className="w-3.5 h-3.5 text-[#D4A373]" />
              <span>{lang === 'fr' ? 'Dicter' : lang === 'de' ? 'Diktieren' : lang === 'en' ? 'Dictate' : 'Dictează'}</span>
            </>
          )}
        </button>

        {isListening && activeInterim && (
          <div className="absolute left-0 bottom-full mb-1 z-30 bg-black/85 text-white text-[11px] px-2.5 py-1 rounded shadow-lg whitespace-nowrap italic max-w-xs truncate">
            🎙️ {activeInterim}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative inline-flex items-center">
      <button
        type="button"
        onClick={handleClick}
        disabled={isTranscribing}
        title={isTranscribing ? tooltips.transcribing : isListening ? tooltips.listening : tooltips.idle}
        aria-label={tooltips.idle}
        className={`inline-flex items-center justify-center rounded-lg transition-all cursor-pointer ${
          isTranscribing
            ? 'bg-amber-100 text-amber-800 border border-amber-300'
            : isListening
            ? 'bg-red-500 hover:bg-red-600 text-white shadow-md ring-2 ring-red-300 ring-offset-1 scale-105 animate-pulse'
            : 'bg-white/90 hover:bg-white text-gray-600 hover:text-[#2E5A44] border border-gray-200 hover:border-[#2E5A44]/40 shadow-xs'
        } ${sizeClasses} ${className}`}
      >
        {isTranscribing ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-700" />
        ) : isListening ? (
          <Mic className="w-3.5 h-3.5 text-white animate-bounce" />
        ) : (
          <Mic className="w-3.5 h-3.5 text-[#2E5A44]" />
        )}
      </button>

      {/* Floating speech bubble while listening */}
      {isListening && (
        <div className="absolute right-0 bottom-full mb-1.5 z-40 bg-gray-900 text-white text-[11px] px-2.5 py-1 rounded-md shadow-xl whitespace-nowrap flex items-center gap-2 border border-white/20">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          <span className="font-semibold text-red-200">
            {lang === 'fr' ? 'Parlez...' : lang === 'de' ? 'Sprechen...' : lang === 'en' ? 'Speak...' : 'Vorbiți...'}
          </span>
          {/* Mini audio level indicator */}
          <div className="flex items-end gap-0.5 h-2.5">
            {[0.2, 0.5, 0.8].map((t, idx) => (
              <span
                key={idx}
                style={{ height: `${(idx + 1) * 33}%` }}
                className={`w-0.5 rounded-full ${
                  (audioLevel / 100) >= t ? 'bg-red-400' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
          <span className="font-mono text-[10px] text-gray-400">
            {durationSeconds}s
          </span>
        </div>
      )}

      {visibleError && (
        <div className="absolute right-0 bottom-full mb-1 z-40 bg-amber-800 text-white text-[10px] px-2 py-1 rounded shadow-lg whitespace-nowrap max-w-xs flex items-center gap-1.5">
          <span>⚠️ {visibleError}</span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setVisibleError(null);
            }}
            className="text-white/80 hover:text-white font-bold ml-1 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};
