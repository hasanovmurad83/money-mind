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
import { Home as HomeIcon, User, Wallet as WalletIcon, Settings as SettingsIcon, Briefcase } from 'lucide-react';
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
  merchant?: string;
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

export interface Achievement {
  id: string;
  type: 'task' | 'transfer' | 'deposit' | 'withdraw' | 'card' | 'subscription';
  unlocked: boolean;
  unlockedDate?: string;
  progress: number;
  target: number;
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
  achievements?: Achievement[];
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
    achievements: [
      { id: 'first_task', type: 'task', unlocked: true, unlockedDate: '2024-11-20', progress: 1, target: 1 },
      { id: '5_tasks', type: 'task', unlocked: true, unlockedDate: '2024-11-21', progress: 5, target: 5 },
      { id: '10_tasks', type: 'task', unlocked: true, unlockedDate: '2024-11-22', progress: 10, target: 10 },
      { id: '50_tasks', type: 'task', unlocked: true, unlockedDate: '2024-11-25', progress: 50, target: 50 },
      { id: '100_tasks', type: 'task', unlocked: true, unlockedDate: '2024-11-27', progress: 100, target: 100 },
      { id: '200_tasks', type: 'task', unlocked: false, unlockedDate: undefined, progress: 124, target: 200 },
      { id: 'first_transfer', type: 'transfer', unlocked: true, unlockedDate: '2024-11-23', progress: 1, target: 1 },
      { id: 'first_deposit', type: 'deposit', unlocked: true, unlockedDate: '2024-11-24', progress: 1, target: 1 },
      { id: 'first_withdraw', type: 'withdraw', unlocked: true, unlockedDate: '2024-11-26', progress: 1, target: 1 },
      { id: 'first_card', type: 'card', unlocked: true, unlockedDate: '2024-11-20', progress: 1, target: 1 },
      { id: '3_cards', type: 'card', unlocked: false, unlockedDate: undefined, progress: 2, target: 3 },
      { id: 'premium_sub', type: 'subscription', unlocked: true, unlockedDate: '2024-11-22', progress: 1, target: 1 },
    ],
    transactions: [
      { id: 1, type: 'received', description: 'Data daxil etmə tapşırığı', amount: 25, date: '2024-11-28', source: 'Data Entry Task' },
      { id: 2, type: 'payment', description: 'Starbucks Kafe', amount: -12, date: '2024-11-28', category: 'Kafe', merchant: 'Starbucks' },
      { id: 3, type: 'received', description: 'Tərcümə tapşırığı', amount: 35, date: '2024-11-27', source: 'Translation Task' },
      { id: 4, type: 'payment', description: 'GoKart əyləncə mərkəzi', amount: -45, date: '2024-11-27', category: 'Əyləncə', merchant: 'GoKart' },
      { id: 5, type: 'received', description: 'Sosial media tapşırığı', amount: 15, date: '2024-11-27', source: 'Social Media Task' },
      { id: 6, type: 'payment', description: 'McDonalds', amount: -8, date: '2024-11-26', category: 'Restoran', merchant: 'McDonalds' },
      { id: 7, type: 'withdraw', description: 'Bank çıxarışı', amount: -50, date: '2024-11-26' },
      { id: 8, type: 'received', description: 'Sorğu tapşırığı', amount: 20, date: '2024-11-26', source: 'Survey Task' },
      { id: 9, type: 'payment', description: 'Taksi', amount: -15, date: '2024-11-25', category: 'Nəqliyyat', merchant: 'Bolt Taxi' },
      { id: 10, type: 'received', description: 'Mətn yazma tapşırığı', amount: 30, date: '2024-11-25', source: 'Typing Task' },
      { id: 11, type: 'payment', description: 'CinemaPlus', amount: -18, date: '2024-11-25', category: 'Əyləncə', merchant: 'CinemaPlus' },
      { id: 12, type: 'deposit', description: 'Vəsait əlavə edildi', amount: 100, date: '2024-11-24' },
      { id: 13, type: 'payment', description: 'Bolt taksi', amount: -10, date: '2024-11-24', category: 'Nəqliyyat', merchant: 'Bolt Taxi' },
      { id: 14, type: 'received', description: 'Video editing tapşırığı', amount: 40, date: '2024-11-23', source: 'Video Task' },
      { id: 15, type: 'payment', description: 'KFC', amount: -14, date: '2024-11-23', category: 'Restoran', merchant: 'KFC' },
      { id: 16, type: 'payment', description: 'Starbucks Kafe', amount: -23, date: '2024-11-22', category: 'Kafe', merchant: 'Starbucks' },
      { id: 17, type: 'payment', description: 'KFC', amount: -20, date: '2024-11-21', category: 'Restoran', merchant: 'KFC' },
      { id: 18, type: 'payment', description: 'Costa Coffee', amount: -8, date: '2024-11-20', category: 'Kafe', merchant: 'Costa Coffee' },
      { id: 19, type: 'payment', description: 'Park Bulvar Restoran', amount: -35, date: '2024-11-19', category: 'Restoran', merchant: 'Park Bulvar' },
      { id: 20, type: 'payment', description: 'Uber taksi', amount: -12, date: '2024-11-18', category: 'Nəqliyyat', merchant: 'Uber' },
    ]
  });

  const handleLogin = (name: string, email: string) => {
    setUser({ ...user, name, email });
    setIsAuthenticated(true);
  };

  const handleSignUp = (name: string, email: string, cardNumber: string) => {
    const newCard: Card = {
      id: 1,
      cardNumber: cardNumber,
      cardHolder: name,
      balance: 100,
      type: cardNumber.startsWith('4') ? 'visa' : cardNumber.startsWith('5') ? 'mastercard' : 'amex'
    };
    setUser({ ...user, name, email, balance: 100, completedTasks: 0, rating: 0, subscription: 'basic', transactions: [], cards: [newCard] });
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
              <HomeIcon size={24} className={currentPage === 'home' ? 'animate-pulse' : ''} />
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
              <Briefcase size={24} className={currentPage === 'extrawork' ? 'animate-pulse' : ''} />
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
              <WalletIcon size={24} className={currentPage === 'wallet' ? 'animate-pulse' : ''} />
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
              <User size={24} className={currentPage === 'profile' ? 'animate-pulse' : ''} />
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
              <SettingsIcon size={24} className={currentPage === 'settings' ? 'animate-spin' : ''} />
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