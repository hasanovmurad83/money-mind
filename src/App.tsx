import { useState } from 'react';
import { Home } from './components/Home';
import { Profile } from './components/Profile';
import { Wallet } from './components/Wallet';
import { Settings } from './components/Settings';
import { History } from './components/History';
import { Subscriptions } from './components/Subscriptions';
import { PostJob } from './components/PostJob';
import { MyJobs } from './components/MyJobs';
import { ExtraWork } from './components/ExtraWork';
import { Login } from './components/Login';
import { SignUp } from './components/SignUp';
import { Support } from './components/Support';
import { Chatbot } from './components/Chatbot';
// import { Home as HomeIcon, User, Wallet as WalletIcon, Settings as SettingsIcon, Briefcase } from 'lucide-react';
import { Toaster } from './components/ui/sonner';

export type Language = 'az' | 'en' | 'ru' | 'tr' | 'de' | 'fr' | 'es' | 'ar';

export interface Card {
  id: number;
  cardNumber: string;
  cardHolder: string;
  balance: number;
  type: 'visa' | 'mastercard' | 'amex';
}

export interface Transaction {
  id: number;
  type: 'deposit' | 'withdraw' | 'payment' | 'received';
  description: string;
  amount: number;
  date: string;
  category?: string;
  source?: string;
}

export interface PostedJob {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  duration: number;
  image: string;
  status: 'active' | 'completed';
  applicants?: number;
  views?: number;
  postedDate?: string;
}

export interface PendingJob {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  duration: number;
  postedBy: string;
  appliedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface User {
  name: string;
  email: string;
  balance: number;
  completedTasks: number;
  rating: number;
  subscription: string;
  postedJobs?: PostedJob[];
  transactions: Transaction[];
  pendingJobs?: PendingJob[];
  cards?: Card[];
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authPage, setAuthPage] = useState<'login' | 'signup'>('login');
  const [currentPage, setCurrentPage] = useState<'home' | 'profile' | 'wallet' | 'settings' | 'history' | 'subscriptions' | 'postjob' | 'myjobs' | 'support' | 'extrawork'>('home');
  const [language, setLanguage] = useState<Language>('az');
  const [navColor, setNavColor] = useState('from-purple-600 via-blue-600 to-pink-600');
  const [navBackgroundImage, setNavBackgroundImage] = useState('');
  const [user, setUser] = useState<User>({
    name: 'Aysel Məmmədova',
    email: 'aysel@example.com',
    balance: 47.50,
    completedTasks: 124,
    rating: 4.8,
    subscription: 'premium',
    postedJobs: [],
    pendingJobs: [],
    cards: [
      { id: 1, cardNumber: '4532123456781234', cardHolder: 'Aysel Məmmədova', balance: 250, type: 'visa' },
      { id: 2, cardNumber: '5412345678901234', cardHolder: 'Aysel Məmmədova', balance: 180, type: 'mastercard' },
    ],
    transactions: [
      { id: 1, type: 'received', description: 'Data daxil etmə tapşırığı', amount: 25, date: '2024-11-28', source: 'Data Entry Task' },
      { id: 2, type: 'payment', description: 'Starbucks Kafe', amount: -12, date: '2024-11-28', category: 'Kafe' },
      { id: 3, type: 'received', description: 'Tərcümə tapşırığı', amount: 35, date: '2024-11-27', source: 'Translation Task' },
      { id: 4, type: 'payment', description: 'GoKart əyləncə mərkəzi', amount: -45, date: '2024-11-27', category: 'Əyləncə' },
      { id: 5, type: 'received', description: 'Sosial media tapşırığı', amount: 15, date: '2024-11-27', source: 'Social Media Task' },
      { id: 6, type: 'payment', description: 'McDonalds', amount: -8, date: '2024-11-26', category: 'Restoran' },
      { id: 7, type: 'withdraw', description: 'Bank çıxarışı', amount: -50, date: '2024-11-26' },
      { id: 8, type: 'received', description: 'Sorğu tapşırığı', amount: 20, date: '2024-11-26', source: 'Survey Task' },
      { id: 9, type: 'payment', description: 'Taksi', amount: -15, date: '2024-11-25', category: 'Nəqliyyat' },
      { id: 10, type: 'received', description: 'Mətn yazma tapşırığı', amount: 30, date: '2024-11-25', source: 'Typing Task' },
      { id: 11, type: 'payment', description: 'CinemaPlus', amount: -18, date: '2024-11-25', category: 'Əyləncə' },
      { id: 12, type: 'deposit', description: 'Vəsait əlavə edildi', amount: 100, date: '2024-11-24' },
      { id: 13, type: 'payment', description: 'Bolt taksi', amount: -10, date: '2024-11-24', category: 'Nəqliyyat' },
      { id: 14, type: 'received', description: 'Video editing tapşırığı', amount: 40, date: '2024-11-23', source: 'Video Task' },
      { id: 15, type: 'payment', description: 'KFC', amount: -14, date: '2024-11-23', category: 'Restoran' },
    ]
  });

  const handleLogin = (email: string) => {
    setUser({ ...user, email });
    setIsAuthenticated(true);
  };

  const handleSignUp = (name: string, email: string) => {
    setUser({ ...user, name, email, balance: 0, completedTasks: 0, rating: 0, subscription: 'basic', transactions: [], cards: [] });
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAuthPage('login');
    setCurrentPage('home');
  };

  // Show auth pages if not authenticated
  if (!isAuthenticated) {
    if (authPage === 'login') {
      return <Login language={language} onLogin={handleLogin} onSwitchToSignup={() => setAuthPage('signup')} />;
    } else {
      return <SignUp language={language} onSignUp={handleSignUp} onSwitchToLogin={() => setAuthPage('login')} />;
    }
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home language={language} user={user} setUser={setUser} onNavigate={setCurrentPage} />;
      case 'profile':
        return <Profile language={language} user={user} onNavigate={setCurrentPage} />;
      case 'wallet':
        return <Wallet language={language} user={user} setUser={setUser} onNavigate={setCurrentPage} />;
      case 'settings':
        return <Settings language={language} setLanguage={setLanguage} onNavigate={setCurrentPage} navColor={navColor} setNavColor={setNavColor} navBackgroundImage={navBackgroundImage} setNavBackgroundImage={setNavBackgroundImage} onLogout={handleLogout} />;
      case 'history':
        return <History language={language} user={user} setUser={setUser} onNavigate={setCurrentPage} />;
      case 'subscriptions':
        return <Subscriptions language={language} user={user} setUser={setUser} onNavigate={setCurrentPage} />;
      case 'postjob':
        return <PostJob language={language} user={user} setUser={setUser} onNavigate={setCurrentPage} />;
      case 'myjobs':
        return <MyJobs language={language} user={user} onNavigate={setCurrentPage} />;
      case 'extrawork':
        return <ExtraWork language={language} user={user} setUser={setUser} onNavigate={setCurrentPage} />;
      case 'support':
        return <Support language={language} onNavigate={setCurrentPage} />;
      default:
        return <Home language={language} user={user} setUser={setUser} onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      {/* Main Content */}
      <div className="pb-20">
        {renderPage()}
      </div>

      {/* Chatbot */}
      {isAuthenticated && <Chatbot language={language} />}

      {/* Toast Notifications */}
      <Toaster position="top-center" richColors />

      {/* Bottom Navigation */}
      <nav 
        className={`fixed bottom-0 left-0 right-0 bg-gradient-to-r ${navColor} shadow-2xl backdrop-blur-lg`}
        style={navBackgroundImage ? {
          backgroundImage: `url(${navBackgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay'
        } : {}}
      >
        <div className="max-w-md mx-auto px-4">
          <div className="flex items-center justify-around py-2">
            <button
              onClick={() => setCurrentPage('home')}
              className={`relative flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all duration-300 transform ${
                currentPage === 'home' 
                  ? 'text-white bg-white/20 scale-110 -translate-y-1 shadow-lg' 
                  : 'text-white/70 hover:text-white hover:scale-105'
              }`}
            >
              
              <span className="text-xs">
                {language === 'az' ? 'Əsas' : 
                 language === 'en' ? 'Home' : 
                 language === 'ru' ? 'Главная' :
                 language === 'tr' ? 'Ana Sayfa' :
                 language === 'de' ? 'Startseite' :
                 language === 'fr' ? 'Accueil' :
                 language === 'es' ? 'Inicio' : 'الرئيسية'}
              </span>
              {currentPage === 'home' && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full animate-ping" />
              )}
            </button>

            <button
              onClick={() => setCurrentPage('extrawork')}
              className={`relative flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all duration-300 transform ${
                currentPage === 'extrawork' 
                  ? 'text-white bg-white/20 scale-110 -translate-y-1 shadow-lg' 
                  : 'text-white/70 hover:text-white hover:scale-105'
              }`}
            >
              
              <span className="text-xs">
                {language === 'az' ? 'Əlavə İş' : 
                 language === 'en' ? 'Extra Work' : 
                 language === 'ru' ? 'Доп. Работа' :
                 language === 'tr' ? 'Ek İş' :
                 language === 'de' ? 'Extra Arbeit' :
                 language === 'fr' ? 'Travail Extra' :
                 language === 'es' ? 'Trabajo Extra' : 'عمل إضافي'}
              </span>
              {currentPage === 'extrawork' && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full animate-ping" />
              )}
            </button>

            <button
              onClick={() => setCurrentPage('wallet')}
              className={`relative flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all duration-300 transform ${
                currentPage === 'wallet' 
                  ? 'text-white bg-white/20 scale-110 -translate-y-1 shadow-lg' 
                  : 'text-white/70 hover:text-white hover:scale-105'
              }`}
            >
              
              <span className="text-xs">
                {language === 'az' ? 'Pulqabı' : 
                 language === 'en' ? 'Wallet' : 
                 language === 'ru' ? 'Кошелек' :
                 language === 'tr' ? 'Cüzdan' :
                 language === 'de' ? 'Geldbörse' :
                 language === 'fr' ? 'Portefeuille' :
                 language === 'es' ? 'Billetera' : 'محفظة'}
              </span>
              {currentPage === 'wallet' && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full animate-ping" />
              )}
            </button>

            <button
              onClick={() => setCurrentPage('profile')}
              className={`relative flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all duration-300 transform ${
                currentPage === 'profile' 
                  ? 'text-white bg-white/20 scale-110 -translate-y-1 shadow-lg' 
                  : 'text-white/70 hover:text-white hover:scale-105'
              }`}
            >
             
              <span className="text-xs">
                {language === 'az' ? 'Profil' : 
                 language === 'en' ? 'Profile' : 
                 language === 'ru' ? 'Профиль' :
                 language === 'tr' ? 'Profil' :
                 language === 'de' ? 'Profil' :
                 language === 'fr' ? 'Profil' :
                 language === 'es' ? 'Perfil' : 'الملف الشخصي'}
              </span>
              {currentPage === 'profile' && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full animate-ping" />
              )}
            </button>

            <button
              onClick={() => setCurrentPage('settings')}
              className={`relative flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all duration-300 transform ${
                currentPage === 'settings' 
                  ? 'text-white bg-white/20 scale-110 -translate-y-1 shadow-lg' 
                  : 'text-white/70 hover:text-white hover:scale-105'
              }`}
            >
              
              <span className="text-xs">
                {language === 'az' ? 'Ayarlar' : 
                 language === 'en' ? 'Settings' : 
                 language === 'ru' ? 'Настройки' :
                 language === 'tr' ? 'Ayarlar' :
                 language === 'de' ? 'Einstellungen' :
                 language === 'fr' ? 'Paramètres' :
                 language === 'es' ? 'Configuración' : 'الإعدادات'}
              </span>
              {currentPage === 'settings' && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full animate-ping" />
              )}
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}