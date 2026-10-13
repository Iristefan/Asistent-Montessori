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
        throw new Error('Veuillez renseigner l\'e-mail et le mot de passe.');
      }
      if (newPassword.length < 6) {
        throw new Error('Le mot de passe doit comporter au moins 6 caractères.');
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

      setCreationSuccess(
        `Compte créé avec succès pour ${newEmail} (Rôle: ${newRole}). Vous pouvez lui transmettre les identifiants.`
      );
      setNewEmail('');
      setNewPassword('');
      setNewName('');
      fetchUsers();
    } catch (err: any) {
      console.error('Error creating client account:', err);
      let msg = err.message || 'Échec de la création du compte.';
      if (err.code === 'auth/email-already-in-use') {
        msg = 'Cette adresse e-mail possède déjà un compte.';
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
                Gestion des Accès & Comptes Clients
              </h3>
              <p className="text-xs text-stone-500">
                Espace réservé à l'administrateur ({userProfile?.email || 'constefan@gmail.com'})
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
              Comment vos clients et collègues peuvent se connecter :
            </p>
            <ol className="list-decimal ml-4 space-y-1 mt-1 text-amber-900">
              <li>
                <strong>Connexion Google</strong> : N'importe quel client ou éducateur peut se connecter instantanément avec son adresse Google sans mot de passe.
              </li>
              <li>
                <strong>Création libre par le client</strong> : Les clients peuvent cliquer sur « Créer un compte » sur la page d'accueil avec leur e-mail.
              </li>
              <li>
                <strong>Création par vous (Administrateur)</strong> : Utilisez le formulaire ci-dessous pour créer à l'avance le compte d'un client et lui envoyer son e-mail et son mot de passe temporaire.
              </li>
            </ol>
          </div>

          {/* Form to create new client account */}
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5">
            <h4 className="font-serif font-bold text-stone-900 text-sm mb-3 flex items-center gap-2">
              <UserPlus className="w-4 h-4 text-amber-800" />
              Créer des identifiants pour un nouveau client / éducateur
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
                  <span>{copiedText ? 'Copié !' : 'Copier'}</span>
                </button>
              </div>
            )}

            <form onSubmit={handleCreateClientAccount} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Nom du client ou de l'école
                </label>
                <input
                  type="text"
                  placeholder="ex: Famille Robert ou École Partenaire"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Rôle attribué
                </label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
                >
                  <option value="client">Client (Accès Consultation & Suivi)</option>
                  <option value="educator">Éducateur Montessori (Accès Pratique)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Adresse e-mail de connexion *
                </label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="client@domaine.fr"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Mot de passe provisoire *
                </label>
                <div className="relative">
                  <KeyRound className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Min. 6 caractères (ex: Client2026!)"
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
                    <span>Création en cours...</span>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4" />
                      <span>Créer les identifiants client</span>
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
                Utilisateurs enregistrés ({usersList.length})
              </h4>
              <button
                type="button"
                onClick={fetchUsers}
                className="text-xs text-stone-500 hover:text-stone-800 flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                <span>Actualiser</span>
              </button>
            </div>

            {loading ? (
              <div className="py-8 text-center text-xs text-stone-400">
                Chargement des profils enregistrés...
              </div>
            ) : usersList.length === 0 ? (
              <div className="py-6 text-center text-xs text-stone-500 bg-stone-50 rounded-xl border border-dashed border-stone-300">
                Aucun profil utilisateur supplémentaire pour le moment.
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
                        {u.role === 'admin' ? '👑 Admin' : u.role === 'educator' ? '🌱 Éducateur' : '🎓 Client'}
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
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
