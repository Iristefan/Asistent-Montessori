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
  apiKey: process.env.GEMINI_API_KEY || 'AI_STUDIO_FALLBACK',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Fallback proxy to live AI Studio deployment when GEMINI_API_KEY is not configured locally
app.use('/api', async (req, res, next) => {
  if (process.env.GEMINI_API_KEY || req.method !== 'POST') {
    return next();
  }
  // Let /lesson-plan be handled by our local route handler to ensure all 11 fields are populated
  if (req.path === '/lesson-plan') {
    return next();
  }
  try {
    const upstream = await fetch(`https://assistant-montessori.ai.studio/api${req.path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });
    const data = await upstream.text();
    res.status(upstream.status).type('application/json').send(data);
  } catch (err: any) {
    res.status(502).json({ error: err?.message || 'Eroare la conectarea cu serverul AI.' });
  }
});

const getMontessoriSystemPrompt = (lang: string = 'fr') => {
  const langInstructions: Record<string, string> = {
    fr: "Tu réponds toujours de manière bienveillante, structurée, claire et rigoureuse en FRANÇAIS, selon la terminologie officielle Montessori.",
    en: "You always respond in a gentle, structured, clear, and rigorous manner in ENGLISH, adhering to official Montessori standards.",
    de: "Du antwortest stets wohlwollend, strukturiert, klar und fachlich präzise auf DEUTSCH, gemäß den offiziellen Montessori-Standards.",
    ro: "Răspunde întotdeauna cu blândețe, respect pentru independența copilului, structurat, clar și cald în limba ROMÂNĂ."
  };

  const instruction = langInstructions[lang] || langInstructions.fr;

  return `Ești un expert formator și asistent/ghid Montessori certificat (Montessori), cu o profundă cunoaștere a filosofiei Dr. Maria Montessori și a standardelor de clasă (copii 0-3 ani, 3-6 ani Casa dei Bambini, și 6-12 ani Primar / Elementary).
Nu folosi niciodată acronime precum „MMTTC”, „AMI” sau „MMTTC / AMI”; folosește întotdeauna denumirea „Montessori” sau „standardele Montessori”.
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

// 2. Presentation Plan generator (Planificator Prezentări)
app.post('/api/lesson-plan', async (req, res) => {
  try {
    const { topic, level, subject, duration, lang = 'fr' } = req.body;

    if (!topic) {
      return res.status(400).json({ error: 'Titlul sau tema prezentării este obligatorie.' });
    }

    const langDirective = lang === 'fr' 
      ? 'Rédige toutes les valeurs de champs du JSON en FRANÇAIS.'
      : lang === 'en'
      ? 'Write all JSON field values in ENGLISH.'
      : lang === 'de'
      ? 'Verfasse alle JSON-Feldwerte auf DEUTSCH.'
      : 'Redactează toate valorile din JSON în limba ROMÂNĂ.';

    const promptText = `Generează un plan complet și riguros de prezentare Montessori (Planificator de prezentări).
Titlu / Temă: ${topic}
Domeniu de activitate: ${subject || 'Curriculum Montessori'}
Grupa de vârstă: ${level || 'Casa dei Bambini (3–6 ani) sau Primar (6–12 ani)'}
${duration ? `Timp alocat dorit: ${duration}` : ''}
${langDirective}

Trebuie să returnezi un obiect JSON cu următoarele proprietăți exacte:
- titlu: titlul clar și formal al prezentării
- domeniu: domeniul de activitate (ex: Viață Practică, Senzorial, Limbaj, Matematică, Științe & Cultură etc.)
- grupa_varsta: grupa de vârstă potrivită (ex: 3-6 ani Casa dei Bambini, 6-9 ani Primar I etc.)
- timp_alocat: durata recomandată (ex: "15 - 20 minute")
- materiale_necesare: materialele exacte și specifice necesare pentru această prezentare
- punct_de_interes: punctul de interes senzorial, mecanic sau logic care captivează atenția copilului
- obiectiv_direct: obiectivul direct al prezentării (Direct Aim)
- obiectiv_indirect: obiectivele indirecte de dezvoltare pe termen lung (Indirect Aim)
- desfasurare_puncte: desfășurarea pas cu pas a lecției formatată obligatoriu cu bullet points (• Invitație și pregătirea spațiului; • Manipularea demonstrativă lentă și precisă; • Izolarea dificultății; • Controlul erorii; • Încheiere și așezare la loc pe raft)
- follow_up: propuneri concrete de activități ulterioare (follow-up work) individuale pentru consolidare
- follow_up_transdisciplinar: propuneri de follow-up work transdisciplinar (conexiuni interdisciplinare cu arta, natura, limbajul, matematica sau viața practică)`;

    let rawPlan: any = null;

    if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'AI_STUDIO_FALLBACK') {
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: promptText,
          config: {
            systemInstruction: `Ești un formator și pedagog expert în metodologia autentică Montessori (nu folosi acronime precum AMI sau MMTTC). Generezi planuri de prezentare de înaltă ținută pedagogică. Răspunzi strict în format JSON valid conform schemei. ${langDirective}`,
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                titlu: { type: Type.STRING },
                domeniu: { type: Type.STRING },
                grupa_varsta: { type: Type.STRING },
                timp_alocat: { type: Type.STRING },
                materiale_necesare: { type: Type.STRING },
                punct_de_interes: { type: Type.STRING },
                obiectiv_direct: { type: Type.STRING },
                obiectiv_indirect: { type: Type.STRING },
                desfasurare_puncte: { type: Type.STRING },
                follow_up: { type: Type.STRING },
                follow_up_transdisciplinar: { type: Type.STRING },
              },
              required: [
                'titlu',
                'domeniu',
                'grupa_varsta',
                'timp_alocat',
                'materiale_necesare',
                'punct_de_interes',
                'obiectiv_direct',
                'obiectiv_indirect',
                'desfasurare_puncte',
                'follow_up',
                'follow_up_transdisciplinar',
              ],
            },
          },
        });
        const jsonText = response.text?.trim() || '{}';
        rawPlan = JSON.parse(jsonText);
      } catch (geminiErr) {
        console.warn('Local Gemini call failed, falling back to upstream /api/chat:', geminiErr);
      }
    }

    if (!rawPlan) {
      // Fallback: Call upstream Gemini 3.8 Flash chat endpoint
      const upstreamChat = await fetch('https://assistant-montessori.ai.studio/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `IMPORTANT: Răspunde STRICT cu un bloc JSON valid conform cerinței, fără alt text.\n\n${promptText}`,
          lang,
        }),
      });

      if (!upstreamChat.ok) {
        throw new Error(`Eroare de comunicare AI: ${upstreamChat.statusText}`);
      }

      const chatData = await upstreamChat.json();
      const reply = chatData?.reply || '';
      const jsonMatch = reply.match(/```(?:json)?\s*([\s\S]*?)\s*```/) || [null, reply];
      const jsonClean = (jsonMatch[1] || reply).trim();
      rawPlan = JSON.parse(jsonClean);
    }

    const toStringBullets = (val: any): string => {
      if (!val) return '';
      if (Array.isArray(val)) {
        return val
          .map((v: any) => {
            const str = String(v).trim();
            return str.startsWith('•') ? str : `• ${str}`;
          })
          .join('\n');
      }
      return String(val).trim();
    };

    const plan = {
      title: String(rawPlan.titlu || rawPlan.title || topic).trim(),
      subject: String(rawPlan.domeniu || rawPlan.domeniu_activitate || rawPlan.subject || subject || 'Curriculum Montessori').trim(),
      ageGroup: String(rawPlan.grupa_varsta || rawPlan.ageGroup || level || 'Casa dei Bambini (3–6 ani)').trim(),
      duration: String(rawPlan.timp_alocat || rawPlan.duration || '20 minute').trim(),
      materials: toStringBullets(rawPlan.materiale_necesare || rawPlan.materials),
      pointOfInterest: toStringBullets(rawPlan.punct_de_interes || rawPlan.pointOfInterest),
      directAim: toStringBullets(rawPlan.obiectiv_direct || rawPlan.directAim || rawPlan.scop_direct),
      indirectAim: toStringBullets(rawPlan.obiectiv_indirect || rawPlan.indirectAim || rawPlan.scop_indirect),
      procedure: toStringBullets(rawPlan.desfasurare_puncte || rawPlan.desfasurare_lectie || rawPlan.procedure),
      followUpWork: toStringBullets(rawPlan.follow_up || rawPlan.followUpWork || rawPlan.follow_1),
      crossCurricular: toStringBullets(rawPlan.follow_up_transdisciplinar || rawPlan.crossCurricular || rawPlan.follow_2),
    };

    res.json({
      success: true,
      plan: {
        ...rawPlan,
        ...plan,
        titlu: plan.title,
        domeniu: plan.subject,
        domeniu_activitate: plan.subject,
        grupa_varsta: plan.ageGroup,
        timp_alocat: plan.duration,
        materiale_necesare: plan.materials,
        punct_de_interes: plan.pointOfInterest,
        obiectiv_direct: plan.directAim,
        obiectiv_indirect: plan.indirectAim,
        desfasurare_puncte: plan.procedure,
        desfasurare_lectie: plan.procedure,
        follow_up: plan.followUpWork,
        follow_up_transdisciplinar: plan.crossCurricular,
      },
    });
  } catch (error: any) {
    console.error('Eroare Gemini Presentation Plan:', error);
    res.status(500).json({
      error: error?.message || 'A apărut o eroare la generarea planului de prezentare.',
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

    const promptText = `Analizează următoarele note de observație din perspectiva standardelor Montessori pentru cele 20 de ore de practică:
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
      ? 'Write all text values in ENGLISH adhering to official Montessori standards.'
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

    const promptText = `Ești un formator Montessori expert (diplomat Montessori) și consultant pedagogic. Nu menționa acronime precum AMI sau MMTTC, ci doar Montessori.
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
