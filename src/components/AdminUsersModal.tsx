import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Language } from '../i18n/translations';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { db, UserProfileData, auth } from '../lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';
import {
  Users,
  UserPlus,
  Shield,
  X,
  Mail,
  KeyRound,
  CheckCircle,
  AlertCircle,
  Copy,
  Sparkles,
  RefreshCw
} from 'lucide-react';

interface AdminUsersModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
}

const ADMIN_LABELS = {
  fr: {
    title: 'Gestion des Accès & Comptes Clients',
    subtitle: 'Espace réservé à l\'administrateur',
    howTitle: 'Comment vos clients et collègues peuvent se connecter :',
    howGoogleTitle: 'Connexion Google :',
    howGoogleDesc: 'Connexion rapide avec un compte Google.',
    howAdminTitle: 'Création par vous (Administrateur) :',
    howAdminDesc: 'Utilisez le formulaire ci-dessous pour créer le compte d\'un client ou éducateur et lui transmettre son e-mail et son mot de passe.',
    createTitle: 'Créer des identifiants pour un nouveau client / éducateur',
    nameLabel: 'Nom du client ou de l\'école',
    namePlaceholder: 'ex: Famille Robert ou École Partenaire',
    roleLabel: 'Rôle attribué',
    roleClient: 'Client (Accès Consultation & Suivi)',
    roleEducator: 'Éducateur Montessori (Accès Pratique)',
    emailLabel: 'Adresse e-mail de connexion *',
    emailPlaceholder: 'client@domaine.fr',
    passwordLabel: 'Mot de passe provisoire *',
    passwordPlaceholder: 'Min. 6 caractères (ex: Client2026!)',
    submitting: 'Création en cours...',
    submitBtn: 'Créer les identifiants client',
    registeredUsers: 'Utilisateurs enregistrés',
    refresh: 'Actualiser',
    loadingUsers: 'Chargement des profils enregistrés...',
    noUsers: 'Aucun profil utilisateur supplémentaire pour le moment.',
    copied: 'Copié !',
    copy: 'Copier',
    close: 'Fermer',
    badgeEducator: '🌱 Éducateur',
    badgeClient: '🎓 Client',
    errMissing: 'Veuillez renseigner l\'e-mail et le mot de passe.',
    errWeak: 'Le mot de passe doit comporter au moins 6 caractères.',
    errEmailInUse: 'Cette adresse e-mail possède déjà un compte.',
    errOpNotAllowed: 'Création par e-mail / mot de passe : Veuillez activer le fournisseur "E-mail/Password" dans la console Firebase Auth.',
    errGeneric: 'Échec de la création du compte.',
    successMsg: (email: string, role: string) =>
      `Compte créé avec succès pour ${email} (Rôle: ${role}). Vous pouvez lui transmettre les identifiants.`
  },
  ro: {
    title: 'Gestionare Acces & Conturi Utilizatori',
    subtitle: 'Spațiu rezervat administratorului',
    howTitle: 'Cum se pot autentifica profesorii, asistenții și clienții:',
    howGoogleTitle: 'Autentificare cu Google:',
    howGoogleDesc: 'Autentificare rapidă cu un cont Google.',
    howAdminTitle: 'Conturi distribuite de Administrator:',
    howAdminDesc: 'Folosiți formularul de mai jos pentru a crea contul unui utilizator și a-i transmite adresa de e-mail și parola de acces.',
    createTitle: 'Creează credențiale pentru un utilizator / educator nou',
    nameLabel: 'Nume utilizator sau școală',
    namePlaceholder: 'ex: Educator Montessori sau Școală Parteneră',
    roleLabel: 'Rol atribuit',
    roleClient: 'Client (Acces Consultare & Urmărire)',
    roleEducator: 'Educator Montessori (Acces Practic)',
    emailLabel: 'Adresă de e-mail pentru autentificare *',
    emailPlaceholder: 'utilizator@domeniu.ro',
    passwordLabel: 'Parolă de acces *',
    passwordPlaceholder: 'Min. 6 caractere (ex: Montessori2026!)',
    submitting: 'Se creează contul...',
    submitBtn: 'Creează credențialele de acces',
    registeredUsers: 'Utilizatori înregistrați',
    refresh: 'Actualizează',
    loadingUsers: 'Se încarcă profilurile înregistrate...',
    noUsers: 'Niciun profil de utilizator suplimentar înregistrat momentan.',
    copied: 'Copiat!',
    copy: 'Copiază',
    close: 'Închide',
    badgeEducator: '🌱 Educator',
    badgeClient: '🎓 Client',
    errMissing: 'Vă rugăm să completați adresa de e-mail și parola.',
    errWeak: 'Parola trebuie să conțină cel puțin 6 caractere.',
    errEmailInUse: 'Această adresă de e-mail are deja un cont asociat.',
    errOpNotAllowed: 'Creare cont cu e-mail / parolă: Activați furnizorul „Email/Password” în consola Firebase Authentication.',
    errGeneric: 'Nu s-a putut crea contul.',
    successMsg: (email: string, role: string) =>
      `Cont creat cu succes pentru ${email} (Rol: ${role}). Îi puteți transmite datele de autentificare.`
  },
  en: {
    title: 'Access & User Accounts Management',
    subtitle: 'Administrator-only area',
    howTitle: 'How teachers, assistants, and clients can sign in:',
    howGoogleTitle: 'Google Sign-In:',
    howGoogleDesc: 'Quick sign-in using a Google account.',
    howAdminTitle: 'Administrator-Provisioned Accounts:',
    howAdminDesc: 'Use the form below to create a user account in advance and send them their login email and password.',
    createTitle: 'Create credentials for a new client / educator',
    nameLabel: 'User or school name',
    namePlaceholder: 'e.g. Montessori Educator or Partner School',
    roleLabel: 'Assigned role',
    roleClient: 'Client (Consultation & Tracking Access)',
    roleEducator: 'Montessori Educator (Practical Access)',
    emailLabel: 'Login email address *',
    emailPlaceholder: 'user@domain.org',
    passwordLabel: 'Temporary password *',
    passwordPlaceholder: 'Min. 6 characters (e.g. Montessori2026!)',
    submitting: 'Creating account...',
    submitBtn: 'Create user credentials',
    registeredUsers: 'Registered users',
    refresh: 'Refresh',
    loadingUsers: 'Loading registered profiles...',
    noUsers: 'No additional user profiles registered yet.',
    copied: 'Copied!',
    copy: 'Copy',
    close: 'Close',
    badgeEducator: '🌱 Educator',
    badgeClient: '🎓 Client',
    errMissing: 'Please enter both email and password.',
    errWeak: 'Password must be at least 6 characters long.',
    errEmailInUse: 'This email address already has an account.',
    errOpNotAllowed: 'Email / password creation: Please enable the "Email/Password" provider in the Firebase Auth console.',
    errGeneric: 'Failed to create account.',
    successMsg: (email: string, role: string) =>
      `Account successfully created for ${email} (Role: ${role}). You can now share the credentials.`
  },
  de: {
    title: 'Zugangs- & Benutzerkontenverwaltung',
    subtitle: 'Bereich nur für Administratoren',
    howTitle: 'Wie sich Pädagogen, Assistenten und Kunden anmelden können:',
    howGoogleTitle: 'Google-Anmeldung:',
    howGoogleDesc: 'Schnelle Anmeldung mit einem Google-Konto.',
    howAdminTitle: 'Vom Administrator erstellte Konten:',
    howAdminDesc: 'Nutzen Sie das untenstehende Formular, um vorab ein Benutzerkonto anzulegen und die Zugangsdaten weiterzugeben.',
    createTitle: 'Zugangsdaten für neuen Kunden / Pädagogen erstellen',
    nameLabel: 'Name des Nutzers oder der Schule',
    namePlaceholder: 'z.B. Montessori-Pädagoge oder Partnerschule',
    roleLabel: 'Zugewiesene Rolle',
    roleClient: 'Kunde (Beratungs- & Verfolgungszugang)',
    roleEducator: 'Montessori-Pädagoge (Praxiszugang)',
    emailLabel: 'Anmelde-E-Mail-Adresse *',
    emailPlaceholder: 'nutzer@domain.de',
    passwordLabel: 'Vorläufiges Passwort *',
    passwordPlaceholder: 'Min. 6 Zeichen (z.B. Montessori2026!)',
    submitting: 'Konto wird erstellt...',
    submitBtn: 'Zugangsdaten erstellen',
    registeredUsers: 'Registrierte Benutzer',
    refresh: 'Aktualisieren',
    loadingUsers: 'Registrierte Profile werden geladen...',
    noUsers: 'Noch keine weiteren Benutzerprofile vorhanden.',
    copied: 'Kopiert!',
    copy: 'Kopieren',
    close: 'Schließen',
    badgeEducator: '🌱 Pädagoge',
    badgeClient: '🎓 Kunde',
    errMissing: 'Bitte geben Sie E-Mail-Adresse und Passwort ein.',
    errWeak: 'Das Passwort muss mindestens 6 Zeichen lang sein.',
    errEmailInUse: 'Für diese E-Mail-Adresse existiert bereits ein Konto.',
    errOpNotAllowed: 'E-Mail-/Passwort-Erstellung: Bitte aktivieren Sie den Anbieter „E-Mail/Passwort“ in der Firebase Auth-Konsole.',
    errGeneric: 'Konto konnte nicht erstellt werden.',
    successMsg: (email: string, role: string) =>
      `Konto erfolgreich für ${email} erstellt (Rolle: ${role}). Sie können die Zugangsdaten nun weitergeben.`
  }
};

export const AdminUsersModal: React.FC<AdminUsersModalProps> = ({ isOpen, onClose, currentLang }) => {
  const { userProfile, isAdmin } = useAuth();
  const [usersList, setUsersList] = useState<UserProfileData[]>([]);
  const [loading, setLoading] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState<'client' | 'educator'>('client');
  const [creationSuccess, setCreationSuccess] = useState<string | null>(null);
  const [creationError, setCreationError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  const l = ADMIN_LABELS[currentLang] || ADMIN_LABELS.fr;

  const fetchUsers = async () => {
    if (!isAdmin) return;
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, 'users'));
      const list: UserProfileData[] = [];
      snap.forEach((d) => {
        list.push(d.data() as UserProfileData);
      });
      setUsersList(list);
    } catch (err) {
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchUsers();
    }
  }, [isOpen, isAdmin]);

  if (!isOpen) return null;

  const handleCreateClientAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreationError(null);
    setCreationSuccess(null);
    setIsSubmitting(true);

    try {
      if (!newEmail || !newPassword) {
        throw new Error(l.errMissing);
      }
      if (newPassword.length < 6) {
        throw new Error(l.errWeak);
      }

      // We use a secondary temporary app to create user without logging out current admin
      const tempApp = initializeApp(firebaseConfig, 'SecondaryAuthApp_' + Date.now());
      const secondaryAuth = getAuth(tempApp);

      const userCredential = await createUserWithEmailAndPassword(
        secondaryAuth,
        newEmail.trim(),
        newPassword
      );

      const newUid = userCredential.user.uid;
      const newProfile: UserProfileData = {
        uid: newUid,
        email: newEmail.trim(),
        displayName: newName.trim() || newEmail.split('@')[0],
        role: newRole,
        createdAt: new Date().toISOString(),
        status: 'active'
      };

      await setDoc(doc(db, 'users', newUid), newProfile);

      setCreationSuccess(l.successMsg(newEmail, newRole));
      setNewEmail('');
      setNewPassword('');
      setNewName('');
      fetchUsers();
    } catch (err: any) {
      console.error('Error creating client account:', err);
      const code = err?.code || '';
      let msg = l.errGeneric;
      if (code.includes('email-already-in-use')) {
        msg = l.errEmailInUse;
      } else if (code.includes('weak-password')) {
        msg = l.errWeak;
      } else if (code.includes('operation-not-allowed')) {
        msg = l.errOpNotAllowed;
      } else if (err?.message && (err.message === l.errMissing || err.message === l.errWeak)) {
        msg = err.message;
      }
      setCreationError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyCredentials = () => {
    if (!creationSuccess) return;
    navigator.clipboard.writeText(creationSuccess);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh] animate-fadeIn">
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 bg-stone-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-800 text-amber-50 flex items-center justify-center shadow-xs">
              <Shield className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-stone-900 text-lg leading-tight">
                {l.title}
              </h3>
              <p className="text-xs text-stone-500">
                {l.subtitle} ({userProfile?.email || 'office@stecstudio.ai'})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-600 rounded-lg hover:bg-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Quick Explanation */}
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 text-xs text-amber-900 leading-relaxed">
            <p className="font-semibold mb-1 flex items-center gap-1.5 text-amber-950">
              <Sparkles className="w-4 h-4 text-amber-700" />
              {l.howTitle}
            </p>
            <ol className="list-decimal ml-4 space-y-1 mt-1 text-amber-900">
              <li>
                <strong>{l.howGoogleTitle}</strong> {l.howGoogleDesc}
              </li>
              <li>
                <strong>{l.howAdminTitle}</strong> {l.howAdminDesc}
              </li>
            </ol>
          </div>

          {/* Form to create new client account */}
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5">
            <h4 className="font-serif font-bold text-stone-900 text-sm mb-3 flex items-center gap-2">
              <UserPlus className="w-4 h-4 text-amber-800" />
              {l.createTitle}
            </h4>

            {creationError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                <span>{creationError}</span>
              </div>
            )}

            {creationSuccess && (
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>{creationSuccess}</span>
                </div>
                <button
                  type="button"
                  onClick={copyCredentials}
                  className="px-2.5 py-1 bg-white border border-emerald-300 rounded-lg text-emerald-800 hover:bg-emerald-100 flex items-center gap-1 text-[11px] font-medium"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copiedText ? l.copied : l.copy}</span>
                </button>
              </div>
            )}

            <form onSubmit={handleCreateClientAccount} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {l.nameLabel}
                </label>
                <input
                  type="text"
                  placeholder={l.namePlaceholder}
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {l.roleLabel}
                </label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
                >
                  <option value="client">{l.roleClient}</option>
                  <option value="educator">{l.roleEducator}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {l.emailLabel}
                </label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder={l.emailPlaceholder}
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {l.passwordLabel}
                </label>
                <div className="relative">
                  <KeyRound className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder={l.passwordPlaceholder}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 font-mono"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>{l.submitting}</span>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4" />
                      <span>{l.submitBtn}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* List of currently registered users */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-serif font-bold text-stone-900 text-sm flex items-center gap-2">
                <Users className="w-4 h-4 text-stone-700" />
                {l.registeredUsers} ({usersList.length})
              </h4>
              <button
                type="button"
                onClick={fetchUsers}
                className="text-xs text-stone-500 hover:text-stone-800 flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                <span>{l.refresh}</span>
              </button>
            </div>

            {loading ? (
              <div className="py-8 text-center text-xs text-stone-400">
                {l.loadingUsers}
              </div>
            ) : usersList.length === 0 ? (
              <div className="py-6 text-center text-xs text-stone-500 bg-stone-50 rounded-xl border border-dashed border-stone-300">
                {l.noUsers}
              </div>
            ) : (
              <div className="border border-stone-200 rounded-2xl overflow-hidden divide-y divide-stone-100 bg-white">
                {usersList.map((u) => (
                  <div key={u.uid} className="p-3.5 flex items-center justify-between text-xs hover:bg-stone-50/50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-900 font-bold flex items-center justify-center text-xs">
                        {u.displayName ? u.displayName.charAt(0).toUpperCase() : u.email.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-stone-900">{u.displayName || u.email}</p>
                        <p className="text-stone-500 font-mono text-[11px]">{u.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium ${
                          u.role === 'admin'
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : u.role === 'educator'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : 'bg-stone-100 text-stone-700 border border-stone-200'
                        }`}
                      >
                        {u.role === 'admin' ? '👑 Admin' : u.role === 'educator' ? l.badgeEducator : l.badgeClient}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {u.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-stone-200 bg-stone-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 cursor-pointer"
          >
            {l.close}
          </button>
        </div>
      </div>
    </div>
  );
};
