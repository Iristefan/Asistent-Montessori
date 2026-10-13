import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '10mb' }));

// Server-side Gemini initialization
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const getMontessoriSystemPrompt = (lang: string = 'fr') => {
  const langInstructions: Record<string, string> = {
    fr: "Tu réponds toujours de manière bienveillante, structurée, claire et rigoureuse en FRANÇAIS, selon la terminologie officielle AMI.",
    en: "You always respond in a gentle, structured, clear, and rigorous manner in ENGLISH, adhering to official AMI and MACTE standards.",
    de: "Du antwortest stets wohlwollend, strukturiert, klar und fachlich präzise auf DEUTSCH, gemäß den offiziellen AMI-Standards.",
    ro: "Răspunde întotdeauna cu blândețe, respect pentru independența copilului, structurat, clar și cald în limba ROMÂNĂ."
  };

  const instruction = langInstructions[lang] || langInstructions.fr;

  return `Ești un expert formator și asistent/ghid Montessori certificat (AMI / MACTE / MMTTC), cu o profundă cunoaștere a filosofiei Dr. Maria Montessori și a standardelor de clasă (copii 0-3 ani, 3-6 ani Casa dei Bambini, și 6-12 ani Primar / Elementary).
Respectă întotdeauna principiile esențiale:
- Mediul pregătit (prepared environment / ambiance préparée) ca al treilea educator
- Mintea absorbantă și perioadele senzitive
- Observația obiectivă, științifică, fără etichetări sau judecăți morale
- Libertate în limite (freedom within limits / liberté dans le cadre)
- Normalizarea prin muncă concentrată spontan aleasă
- Ciclul de lucru neîntrerupt de 3 ore
- Controlul erorii încorporat în materiale
- Grație și curtoazie ca fundament social
- Laudă descriptivă în locul validării externe superficiale
- Masa Păcii și rezolvarea autonomă a conflictelor
${instruction}`;
};

// 1. Chat endpoint for Montessori assistant questions
app.post('/api/chat', async (req, res) => {
  try {
    const { prompt, schoolName, messages, lang = 'fr' } = req.body;

    if (!prompt && (!messages || messages.length === 0)) {
      return res.status(400).json({ error: 'Întrebarea sau istoricul conversației lipsesc.' });
    }

    const contextPrefix = schoolName
      ? `Consultant pedagogic Montessori pentru școala: ${schoolName}.\n\n`
      : '';

    let contentToSend = '';
    if (messages && Array.isArray(messages) && messages.length > 0) {
      const historyStr = messages
        .map((m: { role: string; content: string }) => `${m.role === 'user' ? 'Asistent' : 'Consultant Montessori'}: ${m.content}`)
        .join('\n\n');
      contentToSend = `${contextPrefix}Istoric conversație:\n${historyStr}\n\nAsistent: ${prompt || messages[messages.length - 1].content}\nConsultant Montessori:`;
    } else {
      contentToSend = `${contextPrefix}Întrebarea asistentului/ghidului:\n${prompt}`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: contentToSend,
      config: {
        systemInstruction: getMontessoriSystemPrompt(lang),
      },
    });

    const reply = response.text || 'Nu am putut genera un răspuns în acest moment.';
    res.json({ reply });
  } catch (error: any) {
    console.error('Eroare Gemini Chat:', error);
    res.status(500).json({
      error: error?.message || 'A apărut o eroare la comunicarea cu serviciul Gemini AI.',
    });
  }
});

// 2. Lesson plan generator (5 Elements)
app.post('/api/lesson-plan', async (req, res) => {
  try {
    const { topic, level, subject, lang = 'fr' } = req.body;

    if (!topic) {
      return res.status(400).json({ error: 'Titlul sau tema lecției este obligatorie.' });
    }

    const langDirective = lang === 'fr' 
      ? 'Rédige toutes les valeurs de champs du JSON en FRANÇAIS.'
      : lang === 'en'
      ? 'Write all JSON field values in ENGLISH.'
      : lang === 'de'
      ? 'Verfasse alle JSON-Feldwerte auf DEUTSCH.'
      : 'Redactează toate valorile din JSON în limba ROMÂNĂ.';

    const promptText = `Generează o fișă de lecție Montessori structurată riguros pe modelul celor 5 elemente de planificare.
Nivel educațional: ${level || 'Casa dei Bambini (3-6 ani) sau Primar (6-12 ani)'}
Domeniu: ${subject || 'Curriculum Montessori'}
Tema/Titlu: ${topic}
${langDirective}

Trebuie să returnezi un obiect JSON cu următoarele proprietăți:
- album_ref: referința de album Montessori specifică
- scop_direct: scopul direct și clar al prezentării (Direct Aim)
- scop_indirect: scopuri indirecte (Indirect Aims)
- hots_1: întrebare de gândire de nivel superior pentru analiză/comparare
- hots_2: întrebare de gândire de nivel superior pentru evaluare/creație/transfer
- follow_1: activitate de urmare 1 - muncă de replicare/practică directă cu materialul
- follow_2: activitate de urmare 2 - aplicație creativă, cercetare sau extindere practică
- materiale_necesare: lista materialelor Montessori necesare pentru prezentare
- punct_de_interes: punctul de interes senzorial sau mecanic pentru copil`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: promptText,
      config: {
        systemInstruction: `Ești un formator experimentat în metodologia de planificare Montessori și standardele AMI. Răspunzi strict în format JSON valid. ${langDirective}`,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            album_ref: { type: Type.STRING },
            scop_direct: { type: Type.STRING },
            scop_indirect: { type: Type.STRING },
            hots_1: { type: Type.STRING },
            hots_2: { type: Type.STRING },
            follow_1: { type: Type.STRING },
            follow_2: { type: Type.STRING },
            materiale_necesare: { type: Type.STRING },
            punct_de_interes: { type: Type.STRING },
          },
          required: ['album_ref', 'scop_direct', 'hots_1', 'hots_2', 'follow_1', 'follow_2'],
        },
      },
    });

    const jsonText = response.text?.trim() || '{}';
    const plan = JSON.parse(jsonText);
    res.json({ success: true, plan });
  } catch (error: any) {
    console.error('Eroare Gemini Lesson Plan:', error);
    res.status(500).json({
      error: error?.message || 'A apărut o eroare la generarea planului de lecție.',
    });
  }
});

// 3. Observation Feedback endpoint
app.post('/api/analyze-observation', async (req, res) => {
  try {
    const { phase, notes, reflection, groupInfo, lang = 'fr' } = req.body;

    if (!notes && !reflection) {
      return res.status(400).json({ error: 'Nu există date de observație pentru analiză.' });
    }

    const langTarget = lang === 'fr'
      ? 'Rédige l’analyse en FRANÇAIS.'
      : lang === 'en'
      ? 'Write the analysis in ENGLISH.'
      : lang === 'de'
      ? 'Verfasse die Analyse auf DEUTSCH.'
      : 'Răspunde în limba ROMÂNĂ.';

    const promptText = `Analizează următoarele note de observație din perspectiva standardelor MMTTC / AMI pentru cele 20 de ore de practică:
Etapa observației: ${phase || 'General'}
Grup: ${groupInfo || 'Nespecificat'}
Note obiective înregistrate de asistent:
${notes || 'Lipsă'}

Reflecție personală a asistentului:
${reflection || 'Lipsă'}

${langTarget}
Oferă un feedback structurat cu:
1. Validarea obiectivității (date factuale vs judecăți)
2. Indicatori de normalizare / tendințe umane
3. Recomandări practice pentru asistent/ghid`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: promptText,
      config: {
        systemInstruction: getMontessoriSystemPrompt(lang),
      },
    });

    res.json({ feedback: response.text });
  } catch (error: any) {
    console.error('Eroare Gemini Observation Feedback:', error);
    res.status(500).json({
      error: error?.message || 'Eroare la analiza observației.',
    });
  }
});

// 3b. Individual Child Observation Analysis endpoint
app.post('/api/analyze-child-observation', async (req, res) => {
  try {
    const { rawNotes, childName, childAge, childLevel, lang = 'fr' } = req.body;

    if (!rawNotes || !rawNotes.trim()) {
      return res.status(400).json({ error: 'Notele de observație brute lipsesc.' });
    }

    const langTarget = lang === 'fr'
      ? 'Rédige toutes les valeurs textuelles en FRANÇAIS selon la terminologie officielle Montessori.'
      : lang === 'en'
      ? 'Write all text values in ENGLISH adhering to official AMI and MACTE standards.'
      : lang === 'de'
      ? 'Verfasse alle Textwerte auf DEUTSCH gemäß den Montessori-Standards.'
      : 'Redactează toate valorile textuale în limba ROMÂNĂ.';

    const promptText = `Ești un formator și ghid Montessori experimentat.
Pe baza următoarelor note brute de observație despre un copil:
"${rawNotes}"
Nume/Inițiale copil: ${childName || 'Copil'}
Vârstă: ${childAge || '3-6 ani'}
Nivel clasă: ${childLevel || 'Maternelle / Casa dei Bambini'}

${langTarget}

Generează o structură JSON completă conform evaluării formative pe cele 6 domenii curriculare Montessori:
- practicalLife (Viață Practică): status ('mastered' | 'practicing' | 'presented' | 'unaddressed'), notes (activități/materiale specifice)
- sensorial (Senzorial): status, notes
- language (Limbaj): status, notes
- mathStem (Matematică & STEM): status, notes
- cultural (Cultură & Științe): status, notes
- socialEmotional (Social-Emoțional / Grație & Curtoazie): status, notes
- generalObs: sinteză a concentrării, ciclului de lucru și normalizării
- nextSteps: recomandări concrete pentru următoarele prezentări și pași pedagogici.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: promptText,
      config: {
        systemInstruction: `Ești un specialist Montessori expert în evaluarea formativă. Răspunzi strict în format JSON valid. ${langTarget}`,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            practicalLife: {
              type: Type.OBJECT,
              properties: {
                status: { type: Type.STRING },
                notes: { type: Type.STRING },
              },
              required: ['status', 'notes'],
            },
            sensorial: {
              type: Type.OBJECT,
              properties: {
                status: { type: Type.STRING },
                notes: { type: Type.STRING },
              },
              required: ['status', 'notes'],
            },
            language: {
              type: Type.OBJECT,
              properties: {
                status: { type: Type.STRING },
                notes: { type: Type.STRING },
              },
              required: ['status', 'notes'],
            },
            mathStem: {
              type: Type.OBJECT,
              properties: {
                status: { type: Type.STRING },
                notes: { type: Type.STRING },
              },
              required: ['status', 'notes'],
            },
            cultural: {
              type: Type.OBJECT,
              properties: {
                status: { type: Type.STRING },
                notes: { type: Type.STRING },
              },
              required: ['status', 'notes'],
            },
            socialEmotional: {
              type: Type.OBJECT,
              properties: {
                status: { type: Type.STRING },
                notes: { type: Type.STRING },
              },
              required: ['status', 'notes'],
            },
            generalObs: { type: Type.STRING },
            nextSteps: { type: Type.STRING },
          },
          required: [
            'practicalLife',
            'sensorial',
            'language',
            'mathStem',
            'cultural',
            'socialEmotional',
            'generalObs',
            'nextSteps',
          ],
        },
      },
    });

    const parsed = JSON.parse(response.text?.trim() || '{}');
    res.json({ success: true, assessment: parsed });
  } catch (error: any) {
    console.error('Eroare Gemini Child Observation Analysis:', error);
    res.status(500).json({
      error: error?.message || 'Eroare la analiza fișei individuale a copilului.',
    });
  }
});

// 3c. Sensitive Periods AI Consultant endpoint
app.post('/api/analyze-sensitive-periods', async (req, res) => {
  try {
    const { observationText, childAge, lang = 'fr' } = req.body;

    if (!observationText || !observationText.trim()) {
      return res.status(400).json({ error: 'Descrierea comportamentului lipsește.' });
    }

    const langTarget = lang === 'fr'
      ? 'Rédige la réponse en FRANÇAIS avec une mise en forme Markdown claire et élégante.'
      : lang === 'en'
      ? 'Write the response in ENGLISH with clear and elegant Markdown formatting.'
      : lang === 'de'
      ? 'Verfasse die Antwort auf DEUTSCH mit klarer Markdown-Formatierung.'
      : 'Răspunde în limba ROMÂNĂ cu formatare Markdown clară și profesională.';

    const promptText = `Ești un formator Montessori expert (diplomat AMI) și consultant pedagogic.
Pe baza următoarei observații comportamentale a unui copil (Vârstă: ${childAge || '3-6 ani'}):
"${observationText}"

${langTarget}

Te rog să structurezi răspunsul astfel:
1. **Perioada Sensibilă Principală și Secundară Activă** (Limbaj, Ordine, Mișcare/Coordonare, Obiecte Mici/Detalii, Rafinare Senzorială, Aspecte Sociale/Grație și Curtoazie, sau Simț Moral).
2. **Semnificația și Nevoia de Dezvoltare** (conform principiilor clasice descrise de Dr. Maria Montessori în *The Absorbent Mind* și *The Secret of Childhood*).
3. **Recomandări Practice pentru Ambianță și 3-4 Materiale Specifice** (cu etapele de prezentare recomandate pentru asistent/ghid).
4. **Cum Protejăm Concentrarea** (regula tăcerii și a libertății în cadrul limitelor).`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: promptText,
      config: {
        systemInstruction: getMontessoriSystemPrompt(lang),
      },
    });

    res.json({ reply: response.text });
  } catch (error: any) {
    console.error('Eroare Gemini Sensitive Periods Consultant:', error);
    res.status(500).json({
      error: error?.message || 'Eroare la analiza perioadei sensibile.',
    });
  }
});

// 4. Speech-to-Text Audio Transcription via Gemini Multimodal
app.post('/api/transcribe-audio', async (req, res) => {
  try {
    const { audioBase64, mimeType = 'audio/webm', lang = 'ro' } = req.body;

    if (!audioBase64) {
      return res.status(400).json({ error: 'Fișierul audio lipsește.' });
    }

    const languageNames: Record<string, string> = {
      ro: 'Romanian (Română)',
      fr: 'French (Français)',
      en: 'English',
      de: 'German (Deutsch)',
    };
    const targetLang = languageNames[lang] || 'Romanian';

    const promptText = `You are a professional audio transcriber. Listen carefully to this audio recording and transcribe it accurately into ${targetLang}.
Guidelines:
1. Provide the exact text spoken in the audio.
2. Apply proper punctuation (commas, periods, question marks) and natural capitalization.
3. If Montessori educational terms are spoken (e.g., Turnul Roz, Tour Rose, Mărgele de Aur, Perles Dorées, Normalizare, Masa Păcii, etc.), spell them properly.
4. If the audio is silent or contains only static/clicks with no spoken words, respond with an empty string.
5. Return ONLY the transcribed text. Do NOT add any preamble, explanation, or markdown backticks.`;

    const cleanMimeType = (mimeType || 'audio/webm').split(';')[0].trim();

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: [
        {
          inlineData: {
            mimeType: cleanMimeType,
            data: audioBase64,
          },
        },
        {
          text: promptText,
        },
      ],
    });

    const transcript = response.text ? response.text.trim() : '';
    console.log(`[Audio Transcribed] (${cleanMimeType}, ${lang}) -> "${transcript}"`);
    res.json({ success: true, transcript });
  } catch (error: any) {
    console.error('Eroare Gemini Transcribe Audio:', error);
    res.status(500).json({
      error: error?.message || 'Eroare la transcrierea audio prin AI.',
    });
  }
});

// 5. Download User Manual PDF endpoint
app.get('/api/manual/:lang', (req, res) => {
  const { lang } = req.params;
  const fileNames: Record<string, string> = {
    ro: 'Manual_Utilizare_Assistant_Montessori_RO.pdf',
    fr: 'Guide_Utilisation_Assistant_Montessori_FR.pdf',
    en: 'User_Manual_Assistant_Montessori_EN.pdf',
    de: 'Benutzerhandbuch_Assistant_Montessori_DE.pdf',
  };

  const fileName = fileNames[lang] || fileNames.fr;
  const publicPath = path.join(__dirname, 'public', fileName);

  if (fs.existsSync(publicPath)) {
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    return res.sendFile(publicPath);
  }

  const distPath = path.join(__dirname, 'dist', fileName);
  if (fs.existsSync(distPath)) {
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    return res.sendFile(distPath);
  }

  res.status(404).send('Manual PDF not found');
});

// Mount Vite or serve static assets
async function startServer() {
  // Always serve static assets from public folder first
  app.use(express.static(path.join(__dirname, 'public')));

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Assistant Montessori Server running on http://0.0.0.0:${port}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
