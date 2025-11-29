import { useState } from 'react';
import { Language } from '../App';
import { Lock, Mail, ArrowRight, User } from 'lucide-react';

interface LoginProps {
  language: Language;
  onLogin: (name: string, email: string) => void;
  onSwitchToSignup: () => void;
}

const translations = {
  az: {
    welcome: 'Xoş gəldiniz',
    subtitle: 'Hesabınıza daxil olun',
    name: 'Ad Soyad',
    namePlaceholder: 'Adınızı daxil edin',
    email: 'E-poçt',
    emailPlaceholder: 'email@example.com',
    password: 'Şifrə',
    passwordPlaceholder: 'Şifrənizi daxil edin',
    login: 'Daxil ol',
    noAccount: 'Hesabınız yoxdur?',
    signUp: 'Qeydiyyatdan keç',
    invalidCredentials: 'Bütün sahələri doldurun',
  },
  en: {
    welcome: 'Welcome Back',
    subtitle: 'Login to your account',
    name: 'Full Name',
    namePlaceholder: 'Enter your name',
    email: 'Email',
    emailPlaceholder: 'email@example.com',
    password: 'Password',
    passwordPlaceholder: 'Enter your password',
    login: 'Login',
    noAccount: 'Don\'t have an account?',
    signUp: 'Sign Up',
    invalidCredentials: 'Please fill all fields',
  },
  ru: {
    welcome: 'Добро пожаловать',
    subtitle: 'Войдите в свой аккаунт',
    name: 'Полное Имя',
    namePlaceholder: 'Введите ваше имя',
    email: 'Email',
    emailPlaceholder: 'email@example.com',
    password: 'Пароль',
    passwordPlaceholder: 'Введите пароль',
    login: 'Войти',
    noAccount: 'Нет аккаунта?',
    signUp: 'Регистрация',
    invalidCredentials: 'Заполните все поля',
  },
  tr: {
    welcome: 'Hoş Geldiniz',
    subtitle: 'Hesabınıza giriş yapın',
    name: 'Ad Soyad',
    namePlaceholder: 'Adınızı girin',
    email: 'E-posta',
    emailPlaceholder: 'email@example.com',
    password: 'Şifre',
    passwordPlaceholder: 'Şifrenizi girin',
    login: 'Giriş Yap',
    noAccount: 'Hesabınız yok mu?',
    signUp: 'Kayıt Ol',
    invalidCredentials: 'Lütfen tüm alanları doldurun',
  },
  de: {
    welcome: 'Willkommen zurück',
    subtitle: 'Melden Sie sich bei Ihrem Konto an',
    name: 'Vollständiger Name',
    namePlaceholder: 'Geben Sie Ihren Namen ein',
    email: 'E-Mail',
    emailPlaceholder: 'email@example.com',
    password: 'Passwort',
    passwordPlaceholder: 'Geben Sie Ihr Passwort ein',
    login: 'Anmelden',
    noAccount: 'Noch kein Konto?',
    signUp: 'Registrieren',
    invalidCredentials: 'Bitte füllen Sie alle Felder aus',
  },
  fr: {
    welcome: 'Bienvenue',
    subtitle: 'Connectez-vous à votre compte',
    name: 'Nom Complet',
    namePlaceholder: 'Entrez votre nom',
    email: 'Email',
    emailPlaceholder: 'email@example.com',
    password: 'Mot de passe',
    passwordPlaceholder: 'Entrez votre mot de passe',
    login: 'Se connecter',
    noAccount: 'Pas encore de compte?',
    signUp: 'S\'inscrire',
    invalidCredentials: 'Veuillez remplir tous les champs',
  },
  es: {
    welcome: 'Bienvenido',
    subtitle: 'Inicia sesión en tu cuenta',
    name: 'Nombre Completo',
    namePlaceholder: 'Ingresa tu nombre',
    email: 'Email',
    emailPlaceholder: 'email@example.com',
    password: 'Contraseña',
    passwordPlaceholder: 'Ingresa tu contraseña',
    login: 'Iniciar Sesión',
    noAccount: '¿No tienes cuenta?',
    signUp: 'Registrarse',
    invalidCredentials: 'Por favor complete todos los campos',
  },
  ar: {
    welcome: 'مرحبا بعودتك',
    subtitle: 'تسجيل الدخول إلى حسابك',
    name: 'الاسم الكامل',
    namePlaceholder: 'أدخل اسمك',
    email: 'البريد الإلكتروني',
    emailPlaceholder: 'email@example.com',
    password: 'كلمة المرور',
    passwordPlaceholder: 'أدخل كلمة المرور',
    login: 'تسجيل الدخول',
    noAccount: 'ليس لديك حساب؟',
    signUp: 'إنشاء حساب',
    invalidCredentials: 'يرجى ملء جميع الحقول',
  },
};

export function Login({ language, onLogin, onSwitchToSignup }: LoginProps) {
  const t = translations[language];
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Simple validation - in production this would check against a database
    if (name && email && password) {
      onLogin(name, email);
    } else {
      setError(t.invalidCredentials);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-600 via-blue-600 to-pink-600 rounded-3xl mx-auto mb-4 flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform">
            <Lock className="text-white" size={40} />
          </div>
          <h1 className="text-gray-800 mb-2">{t.welcome}</h1>
          <p className="text-gray-600">{t.subtitle}</p>
        </div>

        {/* Login Form */}
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
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-100 border-2 border-red-300 text-red-700 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 text-white rounded-2xl py-4 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              <span>{t.login}</span>
              <ArrowRight size={20} />
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              {t.noAccount}{' '}
              <button
                onClick={onSwitchToSignup}
                className="text-purple-600 hover:underline"
              >
                {t.signUp}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
