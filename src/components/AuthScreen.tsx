import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Language, UI_TRANSLATIONS } from '../i18n/translations';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Lock, Mail, KeyRound, User, Sparkles, ShieldCheck, ArrowRight, Eye, EyeOff, CheckCircle2, AlertCircle } from 'lucide-react';

interface AuthScreenProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

const AUTH_LABELS = {
  fr: {
    portalTitle: 'Portail Sécurisé Montessori',
    portalSubtitle: 'Assistant Pédagogique & Registre d\'Observation (basé sur les principes du modèle éducatif Montessori)',
    signInTab: 'Se connecter',
    signUpTab: 'Créer un compte',
    googleBtn: 'Continuer avec Google',
    orDivider: 'ou avec vos identifiants',
    emailLabel: 'Adresse e-mail',
    emailPlaceholder: 'ex: educateur@ecole.fr ou client@famille.fr',
    passwordLabel: 'Mot de passe',
    passwordPlaceholder: '••••••••',
    nameLabel: 'Nom complet ou Titre',
    namePlaceholder: 'ex: Marie Montessori ou Famille Dupont',
    submitLogin: 'Accéder à l\'Assistant',
    submitRegister: 'Créer mon compte et accéder',
    submitting: 'Vérification en cours...',
    adminNoticeTitle: 'Identifiants Fournis par la Direction',
    adminNoticeDesc: 'Si l\'administrateur (constefan@gmail.com) vous a déjà créé un compte ou attribué des accès exclusifs, saisissez simplement votre adresse e-mail et mot de passe convenu.',
    featuresTitle: 'Espace Réservé & Protégé :',
    f1: 'Protocole officiel des 20h d\'observation',
    f2: 'Plans de leçons structurés selon les 5 éléments',
    f3: 'Conseiller pédagogique virtuel Maria Montessori (Gemini 3.8 Flash)',
    f4: 'Export certifié PDF avec en-tête et logo de votre école',
    errors: {
      invalidEmail: 'Adresse e-mail invalide.',
      wrongPassword: 'Mot de passe incorrect ou compte inexistant.',
      emailInUse: 'Cette adresse e-mail est déjà utilisée.',
      weakPassword: 'Le mot de passe doit comporter au moins 6 caractères.',
      popupClosed: 'La fenêtre Google s\'est refermée avant validation.',
      generic: 'Erreur d\'authentification. Veuillez vérifier vos identifiants.'
    }
  },
  ro: {
    portalTitle: 'Portal Securizat Montessori',
    portalSubtitle: 'Asistent Pedagogic & Registru de Observație (bazat pe principiile modelului educațional Montessori)',
    signInTab: 'Autentificare',
    signUpTab: 'Creare cont nou',
    googleBtn: 'Continuă cu Google',
    orDivider: 'sau cu datele contului',
    emailLabel: 'Adresă de e-mail',
    emailPlaceholder: 'ex: educator@scoala.ro sau client@familie.ro',
    passwordLabel: 'Parolă',
    passwordPlaceholder: '••••••••',
    nameLabel: 'Nume complet sau Titlu',
    namePlaceholder: 'ex: Maria Montessori sau Părinte / Client',
    submitLogin: 'Intră în Aplicație',
    submitRegister: 'Creează contul și intră',
    submitting: 'Se verifică...',
    adminNoticeTitle: 'Credențiale Create de Administrator',
    adminNoticeDesc: 'Dacă administratorul (constefan@gmail.com) v-a creat deja un cont sau v-a furnizat datele de acces, introduceți emailul și parola convenită.',
    featuresTitle: 'Spațiu Protejat & Exclusiv :',
    f1: 'Protocol oficial 20h de observație',
    f2: 'Planuri de lecție structurate pe 5 elemente',
    f3: 'Consilier virtual inteligent Maria Montessori (Gemini 3.8 Flash)',
    f4: 'Export rapoarte oficiale PDF cu antetul și sigla școlii',
    errors: {
      invalidEmail: 'Adresă de email invalidă.',
      wrongPassword: 'Parolă incorectă sau cont inexistent.',
      emailInUse: 'Această adresă de email este deja utilizată.',
      weakPassword: 'Parola trebuie să aibă minimum 6 caractere.',
      popupClosed: 'Fereastra Google a fost închisă înainte de autentificare.',
      generic: 'Eroare la autentificare. Verificați datele introduse.'
    }
  },
  en: {
    portalTitle: 'Montessori Secure Portal',
    portalSubtitle: 'Pedagogical Assistant & Observation Register (based on the principles of the Montessori educational model)',
    signInTab: 'Sign In',
    signUpTab: 'Create Account',
    googleBtn: 'Continue with Google',
    orDivider: 'or with your credentials',
    emailLabel: 'Email address',
    emailPlaceholder: 'e.g. educator@school.org or client@family.org',
    passwordLabel: 'Password',
    passwordPlaceholder: '••••••••',
    nameLabel: 'Full Name or Title',
    namePlaceholder: 'e.g. Maria Montessori or Guide',
    submitLogin: 'Access the Assistant',
    submitRegister: 'Create Account & Access',
    submitting: 'Authenticating...',
    adminNoticeTitle: 'Pre-Provisioned Credentials',
    adminNoticeDesc: 'If the school director (constefan@gmail.com) created an account for you or shared credentials, enter your email and password above.',
    featuresTitle: 'Protected & Certified Workspace:',
    f1: 'Official 20-hour observation protocol',
    f2: 'Lesson plans structured with the 5 elements',
    f3: 'Virtual pedagogical guide Maria Montessori (Gemini 3.8 Flash)',
    f4: 'Official PDF export with school header and emblem',
    errors: {
      invalidEmail: 'Invalid email address.',
      wrongPassword: 'Wrong password or account not found.',
      emailInUse: 'This email is already in use.',
      weakPassword: 'Password should be at least 6 characters.',
      popupClosed: 'Google sign-in popup was closed.',
      generic: 'Authentication failed. Please verify your credentials.'
    }
  },
  de: {
    portalTitle: 'Montessori Sicherheitsportal',
    portalSubtitle: 'Pädagogischer Assistent & Beobachtungsregister (basierend auf den Prinzipien des Montessori-Bildungsmodells)',
    signInTab: 'Anmelden',
    signUpTab: 'Konto erstellen',
    googleBtn: 'Mit Google fortfahren',
    orDivider: 'oder mit Anmeldedaten',
    emailLabel: 'E-Mail-Adresse',
    emailPlaceholder: 'z.B. paedagoge@schule.de oder kunde@familie.de',
    passwordLabel: 'Passwort',
    passwordPlaceholder: '••••••••',
    nameLabel: 'Vollständiger Name',
    namePlaceholder: 'z.B. Maria Montessori',
    submitLogin: 'Zum Assistenten',
    submitRegister: 'Konto erstellen & Starten',
    submitting: 'Wird überprüft...',
    adminNoticeTitle: 'Vom Administrator erstellte Konten',
    adminNoticeDesc: 'Falls der Schuladministrator (constefan@gmail.com) bereits ein Konto für Sie angelegt hat, melden Sie sich mit den vereinbarten Daten an.',
    featuresTitle: 'Geschützter Bereich:',
    f1: 'Offizielles 20-Stunden Beobachtungsprotokoll',
    f2: 'Unterrichtspläne nach den 5 Elementen strukturiert',
    f3: 'Pädagogischer Berater Maria Montessori (Gemini 3.8 Flash)',
    f4: 'PDF-Export mit Schullogo und offiziellem Briefkopf',
    errors: {
      invalidEmail: 'Ungültige E-Mail-Adresse.',
      wrongPassword: 'Falsches Passwort oder Benutzer nicht gefunden.',
      emailInUse: 'Diese E-Mail wird bereits verwendet.',
      weakPassword: 'Passwort muss mindestens 6 Zeichen lang sein.',
      popupClosed: 'Google-Fenster wurde geschlossen.',
      generic: 'Authentifizierungsfehler. Bitte Eingaben prüfen.'
    }
  }
};

export const AuthScreen: React.FC<AuthScreenProps> = ({ currentLang, onLanguageChange }) => {
  const { loginWithGoogle, loginWithEmail, registerWithEmail } = useAuth();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const t = UI_TRANSLATIONS[currentLang] || UI_TRANSLATIONS.fr;
  const labels = AUTH_LABELS[currentLang] || AUTH_LABELS.fr;

  const mapAuthError = (err: any) => {
    const code = err?.code || '';
    const msg = err?.message || '';
    if (code.includes('invalid-email')) return labels.errors.invalidEmail;
    if (code.includes('user-not-found') || code.includes('wrong-password') || code.includes('invalid-credential')) {
      return labels.errors.wrongPassword;
    }
    if (code.includes('email-already-in-use')) return labels.errors.emailInUse;
    if (code.includes('weak-password')) return labels.errors.weakPassword;
    if (code.includes('popup-closed-by-user')) return labels.errors.popupClosed;
    if (code.includes('operation-not-allowed')) {
      return 'Connexion par e-mail / mot de passe : Veuillez activer le fournisseur "E-mail/Password" dans la console Firebase Auth.';
    }
    return msg || labels.errors.generic;
  };

  const handleGoogleLogin = async () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    setIsLoading(true);
    try {
      await loginWithGoogle();
    } catch (err: any) {
      console.error('Google login error:', err);
      setErrorMsg(mapAuthError(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!email || !password) {
      setErrorMsg(labels.errors.invalidEmail);
      return;
    }

    if (password.length < 6) {
      setErrorMsg(labels.errors.weakPassword);
      return;
    }

    setIsLoading(true);
    try {
      if (mode === 'login') {
        await loginWithEmail(email.trim(), password);
      } else {
        await registerWithEmail(email.trim(), password, name);
      }
    } catch (err: any) {
      console.error('Email auth error:', err);
      setErrorMsg(mapAuthError(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col justify-between selection:bg-amber-100 selection:text-amber-900 font-sans">
      {/* Top Bar with Language Selector */}
      <header className="w-full bg-white/80 backdrop-blur-md border-b border-stone-200 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-800 text-amber-50 flex items-center justify-center shadow-sm">
            <Lock className="w-5 h-5 text-amber-200" />
          </div>
          <div>
            <h1 className="text-base font-serif font-bold text-stone-900 leading-tight">
              {t.appName}
            </h1>
            <p className="text-xs text-stone-500 font-sans">
              Portail de Sécurité & Authentification
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 mr-8 sm:mr-16 md:mr-24">
          <LanguageSwitcher
            currentLang={currentLang}
            onLanguageChange={onLanguageChange}
            variant="light"
            align="right"
          />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Pedagogical Credentials & Overview */}
          <div className="md:col-span-5 flex flex-col gap-6 text-stone-800 order-2 md:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium w-fit">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Accès Sécurisé par Google Firebase</span>
            </div>

            <div>
              <h2 className="text-2xl lg:text-3xl font-serif font-bold text-stone-900 leading-snug">
                {labels.portalTitle}
              </h2>
              <p className="text-sm text-stone-600 mt-2 font-serif italic">
                « Aide-moi à faire seul. » — Maria Montessori
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm space-y-3 text-xs text-stone-700">
              <p className="font-semibold text-stone-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600" />
                {labels.featuresTitle}
              </p>
              <ul className="space-y-2 text-stone-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{labels.f1}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{labels.f2}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{labels.f3}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{labels.f4}</span>
                </li>
              </ul>
            </div>

            <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-4 text-xs text-amber-900 leading-relaxed">
              <span className="font-bold flex items-center gap-1.5 mb-1 text-amber-950">
                <KeyRound className="w-3.5 h-3.5 text-amber-700" />
                {labels.adminNoticeTitle}
              </span>
              {labels.adminNoticeDesc}
            </div>
          </div>

          {/* Right Column: Authentication Card */}
          <div className="md:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xl shadow-stone-200/50 order-1 md:order-2">
            {/* Tab switch between Sign In and Sign Up */}
            <div className="flex p-1 bg-stone-100 rounded-xl mb-6">
              <button
                type="button"
                onClick={() => { setMode('login'); setErrorMsg(null); }}
                className={`flex-1 py-2.5 text-xs font-semibold rounded-lg transition-all ${
                  mode === 'login'
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                {labels.signInTab}
              </button>
              <button
                type="button"
                onClick={() => { setMode('register'); setErrorMsg(null); }}
                className={`flex-1 py-2.5 text-xs font-semibold rounded-lg transition-all ${
                  mode === 'register'
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                {labels.signUpTab}
              </button>
            </div>

            {/* Error & Success Messages */}
            {errorMsg && (
              <div className="mb-5 p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-start gap-2.5 animate-fadeIn">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span className="flex-1">{errorMsg}</span>
              </div>
            )}
            {successMsg && (
              <div className="mb-5 p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="flex-1">{successMsg}</span>
              </div>
            )}

            {/* Google Authentication Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-800 font-medium text-sm flex items-center justify-center gap-3 transition-colors shadow-xs hover:border-stone-400 disabled:opacity-50 cursor-pointer"
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>{labels.googleBtn}</span>
            </button>

            {/* Separator */}
            <div className="relative my-6 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-stone-200" />
              </div>
              <span className="relative bg-white px-3 text-xs text-stone-400 font-sans">
                {labels.orDivider}
              </span>
            </div>

            {/* Email / Password Form */}
            <form onSubmit={handleEmailAuth} className="space-y-4">
              {mode === 'register' && (
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    {labels.nameLabel}
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={labels.namePlaceholder}
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 text-sm text-stone-900 bg-stone-50/50"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  {labels.emailLabel}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={labels.emailPlaceholder}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 text-sm text-stone-900 bg-stone-50/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  {labels.passwordLabel}
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={labels.passwordPlaceholder}
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 text-sm text-stone-900 bg-stone-50/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-1"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3 px-4 rounded-xl bg-amber-800 hover:bg-amber-900 text-amber-50 font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-amber-900/10 cursor-pointer disabled:opacity-60"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-amber-200 border-t-transparent rounded-full animate-spin" />
                    <span>{labels.submitting}</span>
                  </span>
                ) : (
                  <>
                    <span>{mode === 'login' ? labels.submitLogin : labels.submitRegister}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 text-center text-xs text-stone-500 border-t border-stone-200 bg-stone-100">
        Assistant Montessori •{' '}
        {currentLang === 'fr'
          ? 'basé sur les principes du modèle éducatif Montessori • Accès sécurisé'
          : currentLang === 'en'
          ? 'based on the principles of the Montessori educational model • Secure Access'
          : currentLang === 'de'
          ? 'basierend auf den Prinzipien des Montessori-Bildungsmodells • Sicherer Zugang'
          : 'bazat pe principiile modelului educațional Montessori • Acces securizat'}
      </footer>
    </div>
  );
};
