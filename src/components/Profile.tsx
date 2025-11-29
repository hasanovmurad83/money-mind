import { Language, User } from '../App';
import { Star, Award, TrendingUp, Calendar, ChevronLeft, Crown, Zap, Target, CheckCircle, Trophy, Medal, Flame } from 'lucide-react';

interface ProfileProps {
  language: Language;
  user: User;
  onNavigate: (page: 'home' | 'profile' | 'wallet' | 'settings' | 'history' | 'subscriptions' | 'postjob') => void;
}

const translations = {
  az: {
    profile: 'Profil',
    back: 'Geri',
    memberSince: 'Üzv oldu',
    completedTasks: 'Tamamlanmış Tapşırıqlar',
    rating: 'Reytinq',
    subscription: 'Abunəlik',
    premium: 'Premium',
    basic: 'Əsas',
    pro: 'Pro',
    viewHistory: 'Tarixçəyə bax',
    manageSubscription: 'Abunəliyi idarə et',
    achievements: 'Nailiyyətlər',
    topPerformer: 'Ən Yaxşı İcraçı',
    fastWorker: 'Sürətli İşçi',
    reliable: 'Etibarlı',
    earningStreak: 'Ardıcıl Qazanc',
    days: 'gün',
    level: 'Səviyyə',
    nextLevel: 'Növbəti səviyyə',
    statistics: 'Statistika',
    totalEarnings: 'Ümumi Qazanc',
    successRate: 'Uğur Nisbəti',
  },
  en: {
    profile: 'Profile',
    back: 'Back',
    memberSince: 'Member since',
    completedTasks: 'Completed Tasks',
    rating: 'Rating',
    subscription: 'Subscription',
    premium: 'Premium',
    basic: 'Basic',
    pro: 'Pro',
    viewHistory: 'View History',
    manageSubscription: 'Manage Subscription',
    achievements: 'Achievements',
    topPerformer: 'Top Performer',
    fastWorker: 'Fast Worker',
    reliable: 'Reliable',
    earningStreak: 'Earning Streak',
    days: 'days',
    level: 'Level',
    nextLevel: 'Next level',
    statistics: 'Statistics',
    totalEarnings: 'Total Earnings',
    successRate: 'Success Rate',
  },
  ru: {
    profile: 'Профиль',
    back: 'Назад',
    memberSince: 'Участник с',
    completedTasks: 'Завершенные Задачи',
    rating: 'Рейтинг',
    subscription: 'Подписка',
    premium: 'Премиум',
    basic: 'Базовый',
    pro: 'Про',
    viewHistory: 'Посмотреть историю',
    manageSubscription: 'Управление подпиской',
    achievements: 'Достижения',
    topPerformer: 'Лучший исполнитель',
    fastWorker: 'Быстрый работник',
    reliable: 'Надежный',
    earningStreak: 'Серия заработка',
    days: 'дней',
    level: 'Уровень',
    nextLevel: 'Следующий уровень',
    statistics: 'Статистика',
    totalEarnings: 'Общий заработок',
    successRate: 'Процент успеха',
  },
};

const t = translations;

export function Profile({ language, user, onNavigate }: ProfileProps) {
  const lang = t[language];
  
  // Calculate user level based on completed tasks
  const userLevel = Math.floor(user.completedTasks / 20) + 1;
  const nextLevelProgress = (user.completedTasks % 20) / 20 * 100;
  
  // Calculate total earnings from transactions
  const totalEarnings = user.transactions
    .filter(tr => tr.type === 'received')
    .reduce((sum, tr) => sum + tr.amount, 0);
  
  // Calculate success rate (approved tasks / total applied tasks)
  const approvedTasks = user.pendingJobs?.filter(j => j.status === 'approved').length || 0;
  const totalAppliedTasks = user.pendingJobs?.length || 1;
  const successRate = ((approvedTasks / totalAppliedTasks) * 100).toFixed(0);

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate('home')}
            className="p-2 hover:bg-white rounded-lg transition-colors"
          >
            <ChevronLeft size={24} className="text-gray-700" />
          </button>
          <h1 className="text-gray-800">{lang.profile}</h1>
        </div>

        {/* Profile Header Card - Daha cəlbedici */}
        <div className="relative bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600 rounded-3xl p-8 shadow-2xl overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-12 -mb-12"></div>
          <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-white/5 rounded-full"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-white to-purple-100 rounded-full flex items-center justify-center text-purple-600 text-3xl shadow-xl border-4 border-white/30">
                {user.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h2 className="text-white mb-1">{user.name}</h2>
                <p className="text-sm text-white/80">{user.email}</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                    {user.subscription === 'premium' ? (
                      <Crown size={14} className="text-yellow-300" />
                    ) : user.subscription === 'pro' ? (
                      <Zap size={14} className="text-blue-300" />
                    ) : (
                      <Star size={14} className="text-white" />
                    )}
                    <span className="text-xs text-white capitalize">{user.subscription}</span>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                    <Calendar size={14} className="text-white/80" />
                    <span className="text-xs text-white">{lang.memberSince} 2023</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Level Progress */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Trophy className="text-yellow-300" size={20} />
                  <span className="text-white">{lang.level} {userLevel}</span>
                </div>
                <span className="text-sm text-white/80">{nextLevelProgress.toFixed(0)}%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3">
                <div 
                  className="h-3 rounded-full bg-gradient-to-r from-yellow-300 to-orange-400 transition-all duration-500"
                  style={{ width: `${nextLevelProgress}%` }}
                ></div>
              </div>
              <p className="text-xs text-white/70 mt-2">{20 - (user.completedTasks % 20)} {lang.completedTasks} {lang.nextLevel}</p>
            </div>
          </div>
        </div>

        {/* Stats Grid - Daha maraqlı dizayn */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-5 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-8 -mt-8"></div>
            <div className="relative z-10">
              <div className="bg-white/20 backdrop-blur-sm w-12 h-12 rounded-xl flex items-center justify-center mb-3">
                <Target className="text-white" size={24} />
              </div>
              <div className="text-3xl text-white mb-1">{user.completedTasks}</div>
              <div className="text-xs text-blue-100">{lang.completedTasks}</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl p-5 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-8 -mt-8"></div>
            <div className="relative z-10">
              <div className="bg-white/20 backdrop-blur-sm w-12 h-12 rounded-xl flex items-center justify-center mb-3">
                <Star className="text-white fill-white" size={24} />
              </div>
              <div className="text-3xl text-white mb-1">{user.rating.toFixed(1)}</div>
              <div className="text-xs text-yellow-100">{lang.rating}</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-5 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-8 -mt-8"></div>
            <div className="relative z-10">
              <div className="bg-white/20 backdrop-blur-sm w-12 h-12 rounded-xl flex items-center justify-center mb-3">
                <TrendingUp className="text-white" size={24} />
              </div>
              <div className="text-3xl text-white mb-1">${totalEarnings.toFixed(0)}</div>
              <div className="text-xs text-green-100">{lang.totalEarnings}</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl p-5 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-8 -mt-8"></div>
            <div className="relative z-10">
              <div className="bg-white/20 backdrop-blur-sm w-12 h-12 rounded-xl flex items-center justify-center mb-3">
                <CheckCircle className="text-white" size={24} />
              </div>
              <div className="text-3xl text-white mb-1">{successRate}%</div>
              <div className="text-xs text-pink-100">{lang.successRate}</div>
            </div>
          </div>
        </div>

        {/* Achievements - Daha canlı */}
        <div className="bg-white rounded-3xl p-6 shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <Award className="text-purple-600" size={24} />
            <h3 className="text-gray-800">{lang.achievements}</h3>
          </div>
          <div className="space-y-3">
            {user.completedTasks >= 100 && (
              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border-2 border-yellow-200 transform hover:scale-105 transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                  <Trophy className="text-white" size={28} />
                </div>
                <div>
                  <div className="text-gray-800">{lang.topPerformer}</div>
                  <div className="text-xs text-gray-600">100+ {lang.completedTasks}</div>
                </div>
              </div>
            )}
            {user.rating >= 4.5 && (
              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-200 transform hover:scale-105 transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                  <Zap className="text-white" size={28} />
                </div>
                <div>
                  <div className="text-gray-800">{lang.fastWorker}</div>
                  <div className="text-xs text-gray-600">{lang.rating} 4.5+</div>
                </div>
              </div>
            )}
            {user.rating === 5 && (
              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200 transform hover:scale-105 transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                  <Medal className="text-white" size={28} />
                </div>
                <div>
                  <div className="text-gray-800">{lang.reliable}</div>
                  <div className="text-xs text-gray-600">5-{lang.rating}</div>
                </div>
              </div>
            )}
            {user.completedTasks >= 50 && user.completedTasks < 100 && (
              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-200 transform hover:scale-105 transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
                  <Flame className="text-white" size={28} />
                </div>
                <div>
                  <div className="text-gray-800">{lang.earningStreak}</div>
                  <div className="text-xs text-gray-600">50+ {lang.days}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons - Daha modern */}
        <div className="space-y-3">
          <button
            onClick={() => onNavigate('history')}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl p-4 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all flex items-center justify-center gap-2"
          >
            <Calendar size={20} />
            {lang.viewHistory}
          </button>
          <button
            onClick={() => onNavigate('subscriptions')}
            className="w-full bg-white text-purple-600 border-2 border-purple-600 rounded-2xl p-4 shadow-xl hover:bg-purple-50 transform hover:scale-105 transition-all flex items-center justify-center gap-2"
          >
            <Crown size={20} />
            {lang.manageSubscription}
          </button>
        </div>
      </div>
    </div>
  );
}
