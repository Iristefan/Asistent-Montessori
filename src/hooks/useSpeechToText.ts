import { useState, useEffect, useRef, useCallback } from 'react';
import { Language } from '../i18n/translations';

// TypeScript interface for Web Speech API SpeechRecognition
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message?: string;
}

interface IWindowWithSpeech extends Window {
  SpeechRecognition?: any;
  webkitSpeechRecognition?: any;
  AudioContext?: any;
  webkitAudioContext?: any;
}

export interface UseSpeechToTextOptions {
  lang: Language;
  continuous?: boolean;
  interimResults?: boolean;
  onResult?: (finalSegment: string, isFinal: boolean, fullSessionTranscript: string) => void;
  onError?: (error: string) => void;
}

export function getLanguageCode(lang: Language): string {
  switch (lang) {
    case 'ro':
      return 'ro-RO';
    case 'fr':
      return 'fr-FR';
    case 'en':
      return 'en-US';
    case 'de':
      return 'de-DE';
    default:
      return 'ro-RO';
  }
}

export function useSpeechToText({
  lang,
  continuous = true,
  interimResults = true,
  onResult,
  onError,
}: UseSpeechToTextOptions) {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isRecordingAudio, setIsRecordingAudio] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [interimTranscript, setInterimTranscript] = useState<string>('');
  const [isSupported, setIsSupported] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isTranscribing, setIsTranscribing] = useState<boolean>(false);
  const [audioLevel, setAudioLevel] = useState<number>(0);
  const [durationSeconds, setDurationSeconds] = useState<number>(0);

  const recognitionRef = useRef<any>(null);
  const shouldRestartRef = useRef<boolean>(false);
  const isListeningRef = useRef<boolean>(false);
  const restartTimeoutRef = useRef<any>(null);
  const accumulatedTranscriptRef = useRef<string>('');
  const interimTranscriptRef = useRef<string>('');
  const webSpeechProducedFinalRef = useRef<boolean>(false);

  // Audio recording & visualizer refs
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const timerIntervalRef = useRef<any>(null);

  // Check browser capabilities on mount
  useEffect(() => {
    const hasMedia = typeof navigator !== 'undefined' && !!navigator.mediaDevices?.getUserMedia;
    const win = typeof window !== 'undefined' ? (window as unknown as IWindowWithSpeech) : null;
    const hasSpeech = !!(win?.SpeechRecognition || win?.webkitSpeechRecognition);
    setIsSupported(hasMedia || hasSpeech);
  }, []);

  // Stop audio visualizer
  const stopAudioVisualizer = useCallback(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      try {
        audioContextRef.current.close();
      } catch {}
      audioContextRef.current = null;
    }
    setAudioLevel(0);
  }, []);

  // Start audio visualizer using Web Audio API AnalyserNode
  const startAudioVisualizer = useCallback((stream: MediaStream) => {
    try {
      const win = window as unknown as IWindowWithSpeech;
      const AudioCtx = win.AudioContext || win.webkitAudioContext;
      if (!AudioCtx) return;

      const audioCtx = new AudioCtx();
      audioContextRef.current = audioCtx;

      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.5;
      analyserRef.current = analyser;

      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const updateLevel = () => {
        if (!isListeningRef.current) return;
        analyser.getByteFrequencyData(dataArray);

        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
        }
        const average = sum / dataArray.length;
        const normalized = Math.min(100, Math.round((average / 128) * 100));
        setAudioLevel(normalized);

        animFrameRef.current = requestAnimationFrame(updateLevel);
      };

      updateLevel();
    } catch (err) {
      console.warn('Audio visualizer init error:', err);
    }
  }, []);

  // Release microphone stream
  const releaseStream = useCallback(() => {
    stopAudioVisualizer();
    if (streamRef.current) {
      try {
        streamRef.current.getTracks().forEach((track) => track.stop());
      } catch {}
      streamRef.current = null;
    }
  }, [stopAudioVisualizer]);

  // Transcribe recorded audio with server-side Gemini
  const transcribeAudioChunks = useCallback(async (): Promise<string | null> => {
    if (audioChunksRef.current.length === 0) return null;

    try {
      setIsTranscribing(true);
      const mimeType = mediaRecorderRef.current?.mimeType || 'audio/webm';
      const blob = new Blob(audioChunksRef.current, { type: mimeType });

      // If tiny blob (< 500 bytes), skip
      if (blob.size < 500) {
        setIsTranscribing(false);
        return null;
      }

      const base64Data = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const res = reader.result as string;
          const base64 = res.split(',')[1];
          resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });

      const response = await fetch('/api/transcribe-audio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          audioBase64: base64Data,
          mimeType,
          lang,
        }),
      });

      if (!response.ok) {
        throw new Error(`Status ${response.status}`);
      }

      const data = await response.json();
      const text = data?.transcript ? data.transcript.trim() : '';

      if (text) {
        const prevText = accumulatedTranscriptRef.current.trim();
        // If webSpeech didn't capture or only captured partial, combine or use Gemini's text
        let merged = text;
        if (prevText && !prevText.includes(text) && !text.includes(prevText)) {
          merged = `${prevText} ${text}`;
        } else if (text.length >= prevText.length) {
          merged = text;
        } else {
          merged = prevText;
        }

        accumulatedTranscriptRef.current = merged;
        setTranscript(merged);

        if (onResult) {
          onResult(text, true, merged);
        }
        return text;
      }
      return null;
    } catch (err: any) {
      console.warn('Audio fallback transcription error:', err);
      return null;
    } finally {
      setIsTranscribing(false);
    }
  }, [lang, onResult]);

  // Create SpeechRecognition instance
  const createRecognition = useCallback(() => {
    const win = typeof window !== 'undefined' ? (window as unknown as IWindowWithSpeech) : null;
    const SpeechClass = win?.SpeechRecognition || win?.webkitSpeechRecognition;
    if (!SpeechClass) return null;

    try {
      const recognition = new SpeechClass();
      recognition.continuous = continuous;
      recognition.interimResults = interimResults;
      recognition.lang = getLanguageCode(lang);
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
        isListeningRef.current = true;
        setErrorMessage(null);
      };

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let currentInterim = '';
        let newFinalSegment = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const item = event.results[i];
          if (item.isFinal) {
            newFinalSegment += item[0].transcript;
          } else {
            currentInterim += item[0].transcript;
          }
        }

        if (newFinalSegment.trim()) {
          webSpeechProducedFinalRef.current = true;
          const cleanFinal = newFinalSegment.trim();
          accumulatedTranscriptRef.current = accumulatedTranscriptRef.current
            ? `${accumulatedTranscriptRef.current} ${cleanFinal}`
            : cleanFinal;
          setTranscript(accumulatedTranscriptRef.current);

          if (onResult) {
            onResult(cleanFinal, true, accumulatedTranscriptRef.current);
          }
        }

        interimTranscriptRef.current = currentInterim;
        setInterimTranscript(currentInterim);
        if (currentInterim && onResult) {
          onResult(currentInterim, false, accumulatedTranscriptRef.current);
        }
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.warn('SpeechRecognition event error:', event.error);

        if (event.error === 'no-speech' || event.error === 'aborted') {
          return;
        }

        // If MediaRecorder is actively recording, do not interrupt the user with an error
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
          shouldRestartRef.current = false;
          return;
        }

        // Only show helpful error if neither engine is working
        if (!mediaRecorderRef.current || mediaRecorderRef.current.state !== 'recording') {
          const isInIframe = typeof window !== 'undefined' && window.self !== window.top;
          const msg = isInIframe
            ? lang === 'ro'
              ? 'Microfonul este restricționat în fereastra integrată (iframe). Deschideți aplicația în filă dedicată sau încărcați o înregistrare audio.'
              : 'Microphone is restricted inside iframe preview. Open in a new tab or upload an audio file.'
            : lang === 'ro'
            ? 'Accesul la microfon a fost refuzat în browser. Verificați setările browserului.'
            : 'Microphone access denied in browser.';
          setErrorMessage(msg);
          if (onError) onError(msg);
        }
      };

      recognition.onend = () => {
        if (isListeningRef.current && shouldRestartRef.current) {
          clearTimeout(restartTimeoutRef.current);
          restartTimeoutRef.current = setTimeout(() => {
            if (isListeningRef.current && shouldRestartRef.current) {
              try {
                recognition.start();
              } catch {
                try {
                  const fresh = createRecognition();
                  recognitionRef.current = fresh;
                  fresh?.start();
                } catch {}
              }
            }
          }, 200);
        }
      };

      return recognition;
    } catch (err) {
      console.warn('Could not instantiate SpeechRecognition:', err);
      return null;
    }
  }, [lang, continuous, interimResults, onResult, onError]);

  // Start listening
  const startListening = useCallback(async () => {
    setErrorMessage(null);
    setInterimTranscript('');
    interimTranscriptRef.current = '';
    webSpeechProducedFinalRef.current = false;
    audioChunksRef.current = [];

    let streamObtained = false;
    let speechRecognitionStarted = false;

    // 1. Attempt getUserMedia for MediaRecorder + Visualizer
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
          },
        });
        streamRef.current = stream;
        streamObtained = true;
        startAudioVisualizer(stream);

        try {
          const supportedMime = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
            ? 'audio/webm;codecs=opus'
            : MediaRecorder.isTypeSupported('audio/webm')
            ? 'audio/webm'
            : MediaRecorder.isTypeSupported('audio/mp4')
            ? 'audio/mp4'
            : MediaRecorder.isTypeSupported('audio/ogg;codecs=opus')
            ? 'audio/ogg;codecs=opus'
            : '';

          const recorder = supportedMime
            ? new MediaRecorder(stream, { mimeType: supportedMime })
            : new MediaRecorder(stream);

          recorder.ondataavailable = (e) => {
            if (e.data && e.data.size > 0) {
              audioChunksRef.current.push(e.data);
            }
          };

          mediaRecorderRef.current = recorder;
          recorder.start(300);
          setIsRecordingAudio(true);
        } catch (recErr) {
          console.warn('MediaRecorder init error:', recErr);
        }
      }
    } catch (err: any) {
      console.warn('getUserMedia not accessible in current context (will try SpeechRecognition):', err);
    }

    // 2. Attempt SpeechRecognition concurrently or as fallback
    const win = typeof window !== 'undefined' ? (window as unknown as IWindowWithSpeech) : null;
    const SpeechClass = win?.SpeechRecognition || win?.webkitSpeechRecognition;

    if (SpeechClass) {
      try {
        if (!recognitionRef.current) {
          recognitionRef.current = createRecognition();
        } else {
          recognitionRef.current.lang = getLanguageCode(lang);
        }
        recognitionRef.current?.start();
        speechRecognitionStarted = true;
      } catch (err: any) {
        console.warn('SpeechRecognition start failed:', err);
      }
    }

    // 3. If either engine started, we are listening!
    if (streamObtained || speechRecognitionStarted) {
      isListeningRef.current = true;
      shouldRestartRef.current = continuous;
      setIsListening(true);
      setDurationSeconds(0);

      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = setInterval(() => {
        setDurationSeconds((sec) => sec + 1);
      }, 1000);
      return;
    }

    // 4. If both failed (typically due to iframe permissions policy on preview host)
    const isInIframe = typeof window !== 'undefined' && window.self !== window.top;
    const msg = isInIframe
      ? lang === 'ro'
        ? 'Microfonul este restricționat de browser în fereastra integrată (iframe). Deschideți aplicația în filă dedicată sau încărcați o înregistrare audio.'
        : lang === 'fr'
        ? 'Le microphone est restreint dans le cadre intégré. Ouvrez l’app dans un onglet dédié ou importez un fichier audio.'
        : 'Microphone is restricted inside the embedded preview. Please open in a dedicated tab or upload an audio file.'
      : lang === 'ro'
      ? 'Accesul la microfon a fost refuzat în browser. Vă rugăm să apăsați pe pictograma din stânga barei de adrese pentru a debloca microfonul.'
      : 'Microphone permission denied. Please allow microphone access in your browser settings.';

    setErrorMessage(msg);
    if (onError) onError(msg);
  }, [lang, continuous, createRecognition, startAudioVisualizer, onError]);

  // Stop listening
  const stopListening = useCallback(async () => {
    isListeningRef.current = false;
    shouldRestartRef.current = false;
    clearTimeout(restartTimeoutRef.current);
    clearInterval(timerIntervalRef.current);

    // Commit any unfinalized interim text from Web Speech
    const uncommittedInterim = interimTranscriptRef.current.trim();
    if (uncommittedInterim) {
      const updated = accumulatedTranscriptRef.current
        ? `${accumulatedTranscriptRef.current} ${uncommittedInterim}`
        : uncommittedInterim;
      accumulatedTranscriptRef.current = updated;
      setTranscript(updated);
      if (onResult) {
        onResult(uncommittedInterim, true, updated);
      }
      interimTranscriptRef.current = '';
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
    }

    // Stop MediaRecorder
    const recorder = mediaRecorderRef.current;
    if (recorder && recorder.state !== 'inactive') {
      setIsTranscribing(true);
      await new Promise<void>((resolve) => {
        recorder.onstop = () => resolve();
        try {
          recorder.stop();
        } catch {
          resolve();
        }
      });
    }

    setIsRecordingAudio(false);
    setIsListening(false);
    setInterimTranscript('');
    releaseStream();

    // Transcribe with Gemini if audio was captured
    if (audioChunksRef.current.length > 0) {
      await transcribeAudioChunks();
    }
  }, [releaseStream, transcribeAudioChunks, onResult]);

  // Toggle listening
  const toggleListening = useCallback(() => {
    if (isListening || isRecordingAudio) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, isRecordingAudio, startListening, stopListening]);

  // Reset transcript
  const resetTranscript = useCallback(() => {
    accumulatedTranscriptRef.current = '';
    interimTranscriptRef.current = '';
    setTranscript('');
    setInterimTranscript('');
    audioChunksRef.current = [];
    setDurationSeconds(0);
    setErrorMessage(null);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isListeningRef.current = false;
      shouldRestartRef.current = false;
      clearTimeout(restartTimeoutRef.current);
      clearInterval(timerIntervalRef.current);
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {}
      }
      releaseStream();
    };
  }, [releaseStream]);

  return {
    isListening: isListening || isRecordingAudio,
    isRecordingAudio,
    isTranscribing,
    transcript,
    interimTranscript,
    isSupported,
    errorMessage,
    audioLevel,
    durationSeconds,
    startListening,
    stopListening,
    toggleListening,
    resetTranscript,
    setTranscript,
  };
}
