import { useState } from 'react';
import { Language } from '../App';
import { Lock, Mail, ArrowRight, CreditCard } from 'lucide-react';

interface LoginProps {
  language: Language;
  onLogin: (email: string) => void;
  onSwitchToSignup: () => void;
}

const translations = {
  az: {
    welcome: 'Xoş gəldiniz',
    subtitle: 'Hesabınıza daxil olun',
    email: 'E-poçt',
    emailPlaceholder: 'email@example.com',
    password: 'Şifrə',
    passwordPlaceholder: 'Şifrənizi daxil edin',
    cardNumber: 'Kart Nömrəsi',
    cardPlaceholder: '1234 5678 9012 3456',
    expiryDate: 'Son İstifadə Tarixi',
    expiryPlaceholder: 'AA/İİ',
    cvc: 'CVC',
    cvcPlaceholder: '123',
    login: 'Daxil ol',
    noAccount: 'Hesabınız yoxdur?',
    signUp: 'Qeydiyyatdan keç',
    invalidCredentials: 'Yanlış e-poçt və ya şifrə',
    invalidCard: 'Kart nömrəsi 16 rəqəm olmalıdır',
  },
  en: {
    welcome: 'Welcome Back',
    subtitle: 'Login to your account',
    email: 'Email',
    emailPlaceholder: 'email@example.com',
    password: 'Password',
    passwordPlaceholder: 'Enter your password',
    cardNumber: 'Card Number',
    cardPlaceholder: '1234 5678 9012 3456',
    expiryDate: 'Expiry Date',
    expiryPlaceholder: 'MM/YY',
    cvc: 'CVC',
    cvcPlaceholder: '123',
    login: 'Login',
    noAccount: 'Don\'t have an account?',
    signUp: 'Sign Up',
    invalidCredentials: 'Invalid email or password',
    invalidCard: 'Card number must be 16 digits',
  },
  ru: {
    welcome: 'Добро пожаловать',
    subtitle: 'Войдите в свой аккаунт',
    email: 'Email',
    emailPlaceholder: 'email@example.com',
    password: 'Пароль',
    passwordPlaceholder: 'Введите пароль',
    cardNumber: 'Номер Карты',
    cardPlaceholder: '1234 5678 9012 3456',
    expiryDate: 'Срок Действия',
    expiryPlaceholder: 'ММ/ГГ',
    cvc: 'CVC',
    cvcPlaceholder: '123',
    login: 'Войти',
    noAccount: 'Нет аккаунта?',
    signUp: 'Регистрация',
    invalidCredentials: 'Неверный email или пароль',
    invalidCard: 'Номер карты должен содержать 16 цифр',
  },
  tr: {
    welcome: 'Hoş Geldiniz',
    subtitle: 'Hesabınıza giriş yapın',
    email: 'E-posta',
    emailPlaceholder: 'email@example.com',
    password: 'Şifre',
    passwordPlaceholder: 'Şifrenizi girin',
    cardNumber: 'Kart Numarası',
    cardPlaceholder: '1234 5678 9012 3456',
    expiryDate: 'Son Kullanma Tarihi',
    expiryPlaceholder: 'AA/YY',
    cvc: 'CVC',
    cvcPlaceholder: '123',
    login: 'Giriş Yap',
    noAccount: 'Hesabınız yok mu?',
    signUp: 'Kayıt Ol',
    invalidCredentials: 'Geçersiz email veya şifre',
    invalidCard: 'Kart numarası 16 hane olmalıdır',
  },
  de: {
    welcome: 'Willkommen zurück',
    subtitle: 'Melden Sie sich bei Ihrem Konto an',
    email: 'E-Mail',
    emailPlaceholder: 'email@example.com',
    password: 'Passwort',
    passwordPlaceholder: 'Geben Sie Ihr Passwort ein',
    cardNumber: 'Kartennummer',
    cardPlaceholder: '1234 5678 9012 3456',
    expiryDate: 'Ablaufdatum',
    expiryPlaceholder: 'MM/JJ',
    cvc: 'CVC',
    cvcPlaceholder: '123',
    login: 'Anmelden',
    noAccount: 'Noch kein Konto?',
    signUp: 'Registrieren',
    invalidCredentials: 'Ungültige E-Mail oder Passwort',
    invalidCard: 'Kartennummer muss 16 Ziffern enthalten',
  },
  fr: {
    welcome: 'Bienvenue',
    subtitle: 'Connectez-vous à votre compte',
    email: 'Email',
    emailPlaceholder: 'email@example.com',
    password: 'Mot de passe',
    passwordPlaceholder: 'Entrez votre mot de passe',
    cardNumber: 'Numéro de Carte',
    cardPlaceholder: '1234 5678 9012 3456',
    expiryDate: 'Date d\'Expiration',
    expiryPlaceholder: 'MM/AA',
    cvc: 'CVC',
    cvcPlaceholder: '123',
    login: 'Se connecter',
    noAccount: 'Pas encore de compte?',
    signUp: 'S\'inscrire',
    invalidCredentials: 'Email ou mot de passe invalide',
    invalidCard: 'Le numéro de carte doit contenir 16 chiffres',
  },
  es: {
    welcome: 'Bienvenido',
    subtitle: 'Inicia sesión en tu cuenta',
    email: 'Email',
    emailPlaceholder: 'email@example.com',
    password: 'Contraseña',
    passwordPlaceholder: 'Ingresa tu contraseña',
    cardNumber: 'Número de Tarjeta',
    cardPlaceholder: '1234 5678 9012 3456',
    expiryDate: 'Fecha de Vencimiento',
    expiryPlaceholder: 'MM/AA',
    cvc: 'CVC',
    cvcPlaceholder: '123',
    login: 'Iniciar Sesión',
    noAccount: '¿No tienes cuenta?',
    signUp: 'Registrarse',
    invalidCredentials: 'Email o contraseña inválidos',
    invalidCard: 'El número de tarjeta debe tener 16 dígitos',
  },
  ar: {
    welcome: 'مرحبا بعودتك',
    subtitle: 'تسجيل الدخول إلى حسابك',
    email: 'البريد الإلكتروني',
    emailPlaceholder: 'email@example.com',
    password: 'كلمة المرور',
    passwordPlaceholder: 'أدخل كلمة المرور',
    cardNumber: 'رقم البطاقة',
    cardPlaceholder: '1234 5678 9012 3456',
    expiryDate: 'تاريخ الانتهاء',
    expiryPlaceholder: 'شهر/سنة',
    cvc: 'CVC',
    cvcPlaceholder: '123',
    login: 'تسجيل الدخول',
    noAccount: 'ليس لديك حساب؟',
    signUp: 'إنشاء حساب',
    invalidCredentials: 'البريد الإلكتروني أو كلمة المرور غير صحيحة',
    invalidCard: 'يجب أن يكون رقم البطاقة 16 رقمًا',
  },
};

export function Login({ language, onLogin, onSwitchToSignup }: LoginProps) {
  const t = translations[language];
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [error, setError] = useState('');

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + '/' + v.slice(2, 4);
    }
    return v;
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    setExpiryDate(formatted);
  };

  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/gi, '');
    if (value.length <= 3) {
      setCvc(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validate card number (16 digits)
    const cardDigits = cardNumber.replace(/\s+/g, '');
    if (cardDigits.length !== 16) {
      setError(t.invalidCard);
      return;
    }
    
    // Validate expiry date (MM/YY format)
    const expiryDigits = expiryDate.replace(/\//g, '');
    if (expiryDigits.length !== 4) {
      setError(t.invalidCredentials);
      return;
    }
    
    // Validate CVC (3 digits)
    if (cvc.length !== 3) {
      setError(t.invalidCredentials);
      return;
    }
    
    // Simple validation - in production this would check against a database
    if (email && password && cardNumber && expiryDate && cvc) {
      onLogin(email);
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

            {/* Card Number */}
            <div>
              <label className="text-sm text-gray-700 mb-2 block flex items-center gap-2">
                <CreditCard size={16} />
                {t.cardNumber}
              </label>
              <input
                type="text"
                value={cardNumber}
                onChange={handleCardNumberChange}
                placeholder={t.cardPlaceholder}
                maxLength={19}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Expiry Date and CVC */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-700 mb-2 block">
                  {t.expiryDate}
                </label>
                <input
                  type="text"
                  value={expiryDate}
                  onChange={handleExpiryDateChange}
                  placeholder={t.expiryPlaceholder}
                  maxLength={5}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                  required
                />
              </div>
              <div>
                <label className="text-sm text-gray-700 mb-2 block">
                  {t.cvc}
                </label>
                <input
                  type="text"
                  value={cvc}
                  onChange={handleCvcChange}
                  placeholder={t.cvcPlaceholder}
                  maxLength={3}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                  required
                />
              </div>
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
