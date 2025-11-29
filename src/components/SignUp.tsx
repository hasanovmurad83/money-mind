import { useState } from 'react';
import { Language } from '../App';
import { UserPlus, Mail, Lock, User, ArrowRight, AlertCircle } from 'lucide-react';

interface SignUpProps {
  language: Language;
  onSignUp: (name: string, email: string) => void;
  onSwitchToLogin: () => void;
}

const translations = {
  az: {
    createAccount: 'Hesab Yarat',
    subtitle: 'Qeydiyyatdan keçin və işə başlayın',
    name: 'Ad Soyad',
    namePlaceholder: 'Adınızı daxil edin',
    email: 'E-poçt',
    emailPlaceholder: 'email@example.com',
    password: 'Şifrə',
    passwordPlaceholder: 'Minimum 7 simvol',
    signUp: 'Qeydiyyatdan keç',
    haveAccount: 'Artıq hesabınız var?',
    login: 'Daxil ol',
    passwordRequirement: 'Şifrə ən azı 7 simvol olmalıdır (rəqəm və ya hərf)',
    nameRequired: 'Ad tələb olunur',
    emailRequired: 'E-poçt tələb olunur',
    passwordTooShort: 'Şifrə ən azı 7 simvol olmalıdır',
  },
  en: {
    createAccount: 'Create Account',
    subtitle: 'Sign up to get started',
    name: 'Full Name',
    namePlaceholder: 'Enter your name',
    email: 'Email',
    emailPlaceholder: 'email@example.com',
    password: 'Password',
    passwordPlaceholder: 'Minimum 7 characters',
    signUp: 'Sign Up',
    haveAccount: 'Already have an account?',
    login: 'Login',
    passwordRequirement: 'Password must be at least 7 characters (letters or numbers)',
    nameRequired: 'Name is required',
    emailRequired: 'Email is required',
    passwordTooShort: 'Password must be at least 7 characters',
  },
  ru: {
    createAccount: 'Создать Аккаунт',
    subtitle: 'Зарегистрируйтесь для начала',
    name: 'Полное Имя',
    namePlaceholder: 'Введите ваше имя',
    email: 'Email',
    emailPlaceholder: 'email@example.com',
    password: 'Пароль',
    passwordPlaceholder: 'Минимум 7 символов',
    signUp: 'Регистрация',
    haveAccount: 'Уже есть аккаунт?',
    login: 'Войти',
    passwordRequirement: 'Пароль должен содержать минимум 7 символов (буквы или цифры)',
    nameRequired: 'Имя обязательно',
    emailRequired: 'Email обязателен',
    passwordTooShort: 'Пароль должен содержать минимум 7 символов',
  },
  tr: {
    createAccount: 'Hesap Oluştur',
    subtitle: 'Başlamak için kayıt olun',
    name: 'Ad Soyad',
    namePlaceholder: 'Adınızı girin',
    email: 'E-posta',
    emailPlaceholder: 'email@example.com',
    password: 'Şifre',
    passwordPlaceholder: 'En az 7 karakter',
    signUp: 'Kayıt Ol',
    haveAccount: 'Zaten hesabınız var mı?',
    login: 'Giriş Yap',
    passwordRequirement: 'Şifre en az 7 karakter olmalıdır (harf veya rakam)',
    nameRequired: 'Ad gereklidir',
    emailRequired: 'E-posta gereklidir',
    passwordTooShort: 'Şifre en az 7 karakter olmalıdır',
  },
  de: {
    createAccount: 'Konto Erstellen',
    subtitle: 'Registrieren Sie sich, um loszulegen',
    name: 'Vollständiger Name',
    namePlaceholder: 'Geben Sie Ihren Namen ein',
    email: 'E-Mail',
    emailPlaceholder: 'email@example.com',
    password: 'Passwort',
    passwordPlaceholder: 'Mindestens 7 Zeichen',
    signUp: 'Registrieren',
    haveAccount: 'Haben Sie bereits ein Konto?',
    login: 'Anmelden',
    passwordRequirement: 'Passwort muss mindestens 7 Zeichen lang sein (Buchstaben oder Zahlen)',
    nameRequired: 'Name ist erforderlich',
    emailRequired: 'E-Mail ist erforderlich',
    passwordTooShort: 'Passwort muss mindestens 7 Zeichen lang sein',
  },
  fr: {
    createAccount: 'Créer un Compte',
    subtitle: 'Inscrivez-vous pour commencer',
    name: 'Nom Complet',
    namePlaceholder: 'Entrez votre nom',
    email: 'Email',
    emailPlaceholder: 'email@example.com',
    password: 'Mot de passe',
    passwordPlaceholder: 'Minimum 7 caractères',
    signUp: 'S\'inscrire',
    haveAccount: 'Vous avez déjà un compte?',
    login: 'Se connecter',
    passwordRequirement: 'Le mot de passe doit contenir au moins 7 caractères (lettres ou chiffres)',
    nameRequired: 'Le nom est requis',
    emailRequired: 'L\'email est requis',
    passwordTooShort: 'Le mot de passe doit contenir au moins 7 caractères',
  },
  es: {
    createAccount: 'Crear Cuenta',
    subtitle: 'Regístrate para comenzar',
    name: 'Nombre Completo',
    namePlaceholder: 'Ingresa tu nombre',
    email: 'Email',
    emailPlaceholder: 'email@example.com',
    password: 'Contraseña',
    passwordPlaceholder: 'Mínimo 7 caracteres',
    signUp: 'Registrarse',
    haveAccount: '¿Ya tienes cuenta?',
    login: 'Iniciar Sesión',
    passwordRequirement: 'La contraseña debe tener al menos 7 caracteres (letras o números)',
    nameRequired: 'El nombre es requerido',
    emailRequired: 'El email es requerido',
    passwordTooShort: 'La contraseña debe tener al menos 7 caracteres',
  },
  ar: {
    createAccount: 'إنشاء حساب',
    subtitle: 'سجل للبدء',
    name: 'الاسم الكامل',
    namePlaceholder: 'أدخل اسمك',
    email: 'البريد الإلكتروني',
    emailPlaceholder: 'email@example.com',
    password: 'كلمة المرور',
    passwordPlaceholder: 'الحد الأدنى 7 أحرف',
    signUp: 'إنشاء حساب',
    haveAccount: 'هل لديك حساب بالفعل؟',
    login: 'تسجيل الدخول',
    passwordRequirement: 'يجب أن تكون كلمة المرور 7 أحرف على الأقل (أحرف أو أرقام)',
    nameRequired: 'الاسم مطلوب',
    emailRequired: 'البريد الإلكتروني مطلوب',
    passwordTooShort: 'يجب أن تكون كلمة المرور 7 أحرف على الأقل',
  },
};

export function SignUp({ language, onSignUp, onSwitchToLogin }: SignUpProps) {
  const t = translations[language];
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!name.trim()) {
      setError(t.nameRequired);
      return;
    }
    if (!email.trim()) {
      setError(t.emailRequired);
      return;
    }
    if (password.length < 7) {
      setError(t.passwordTooShort);
      return;
    }

    onSignUp(name, email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-600 via-blue-600 to-pink-600 rounded-3xl mx-auto mb-4 flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform">
            <UserPlus className="text-white" size={40} />
          </div>
          <h1 className="text-gray-800 mb-2">{t.createAccount}</h1>
          <p className="text-gray-600">{t.subtitle}</p>
        </div>

        {/* Sign Up Form */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="text-sm text-gray-700 mb-2 block flex items-center gap-2">
                <User size={16} />
                {t.name}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.namePlaceholder}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-gray-700 mb-2 block flex items-center gap-2">
                <Mail size={16} />
                {t.email}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.emailPlaceholder}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-700 mb-2 block flex items-center gap-2">
                <Lock size={16} />
                {t.password}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t.passwordPlaceholder}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                required
                minLength={7}
              />
              <div className="mt-2 flex items-start gap-2 text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
                <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                <span>{t.passwordRequirement}</span>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-100 border-2 border-red-300 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            {/* Sign Up Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 text-white rounded-2xl py-4 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              <span>{t.signUp}</span>
              <ArrowRight size={20} />
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              {t.haveAccount}{' '}
              <button
                onClick={onSwitchToLogin}
                className="text-purple-600 hover:underline"
              >
                {t.login}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
