import { Language, User } from '../App';
import { Star, Award, TrendingUp, TrendingDown, Calendar, ChevronLeft, Crown, Zap, Target, CheckCircle, Trophy, Medal, Flame, Repeat, CreditCard } from 'lucide-react';

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
    locked: 'Kilidli',
    unlocked: 'Açıldı',
    progress: 'İrəliləyiş',
    first_task: 'İlk Tapşırıq',
    first_task_desc: 'İlk tapşırığınızı tamamladınız',
    '5_tasks': '5 Tapşırıq',
    '5_tasks_desc': '5 tapşırıq tamamladınız',
    '10_tasks': '10 Tapşırıq',
    '10_tasks_desc': '10 tapşırıq tamamladınız',
    '50_tasks': '50 Tapşırıq',
    '50_tasks_desc': '50 tapşırıq tamamladınız',
    '100_tasks': '100 Tapşırıq',
    '100_tasks_desc': '100 tapşırıq tamamladınız',
    '200_tasks': '200 Tapşırıq',
    '200_tasks_desc': '200 tapşırıq tamamlayın',
    first_transfer: 'İlk Köçürmə',
    first_transfer_desc: 'İlk köçürmə əməliyyatınızı etdiniz',
    first_deposit: 'İlk Depozit',
    first_deposit_desc: 'İlk depozitinizi etdiniz',
    first_withdraw: 'İlk Çıxarış',
    first_withdraw_desc: 'İlk çıxarışınızı etdiniz',
    first_card: 'İlk Kart',
    first_card_desc: 'İlk kartınızı əlavə etdiniz',
    '3_cards': '3 Kart',
    '3_cards_desc': '3 kart əlavə edin',
    premium_sub: 'Premium Üzv',
    premium_sub_desc: 'Premium abunəliyə keçdiniz',
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
    locked: 'Locked',
    unlocked: 'Unlocked',
    progress: 'Progress',
    first_task: 'First Task',
    first_task_desc: 'You completed your first task',
    '5_tasks': '5 Tasks',
    '5_tasks_desc': 'You completed 5 tasks',
    '10_tasks': '10 Tasks',
    '10_tasks_desc': 'You completed 10 tasks',
    '50_tasks': '50 Tasks',
    '50_tasks_desc': 'You completed 50 tasks',
    '100_tasks': '100 Tasks',
    '100_tasks_desc': 'You completed 100 tasks',
    '200_tasks': '200 Tasks',
    '200_tasks_desc': 'Complete 200 tasks',
    first_transfer: 'First Transfer',
    first_transfer_desc: 'You made your first transfer',
    first_deposit: 'First Deposit',
    first_deposit_desc: 'You made your first deposit',
    first_withdraw: 'First Withdraw',
    first_withdraw_desc: 'You made your first withdraw',
    first_card: 'First Card',
    first_card_desc: 'You added your first card',
    '3_cards': '3 Cards',
    '3_cards_desc': 'Add 3 cards',
    premium_sub: 'Premium Member',
    premium_sub_desc: 'You upgraded to Premium',
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
    locked: 'Заблокировано',
    unlocked: 'Разблокировано',
    progress: 'Прогресс',
    first_task: 'Первая задача',
    first_task_desc: 'Вы завершили первую задачу',
    '5_tasks': '5 задач',
    '5_tasks_desc': 'Вы завершили 5 задач',
    '10_tasks': '10 задач',
    '10_tasks_desc': 'Вы завершили 10 задач',
    '50_tasks': '50 задач',
    '50_tasks_desc': 'Вы завершили 50 задач',
    '100_tasks': '100 задач',
    '100_tasks_desc': 'Вы завершили 100 задач',
    '200_tasks': '200 задач',
    '200_tasks_desc': 'Завершите 200 задач',
    first_transfer: 'Первый перевод',
    first_transfer_desc: 'Вы сделали первый перевод',
    first_deposit: 'Первый депозит',
    first_deposit_desc: 'Вы сделали первый депозит',
    first_withdraw: 'Первый вывод',
    first_withdraw_desc: 'Вы сделали первый вывод',
    first_card: 'Первая карта',
    first_card_desc: 'Вы добавили первую карту',
    '3_cards': '3 карты',
    '3_cards_desc': 'Добавьте 3 карты',
    premium_sub: 'Премиум участник',
    premium_sub_desc: 'Вы перешли на Премиум',
  },
  tr: {
    profile: 'Profil',
    back: 'Geri',
    memberSince: 'Üye oldu',
    completedTasks: 'Tamamlanan Görevler',
    rating: 'Değerlendirme',
    subscription: 'Abonelik',
    premium: 'Premium',
    basic: 'Temel',
    pro: 'Pro',
    viewHistory: 'Geçmişi Görüntüle',
    manageSubscription: 'Aboneliği Yönet',
    achievements: 'Başarılar',
    topPerformer: 'En İyi Performans',
    fastWorker: 'Hızlı Çalışan',
    reliable: 'Güvenilir',
    earningStreak: 'Kazanç Serisi',
    days: 'gün',
    level: 'Seviye',
    nextLevel: 'Sonraki seviye',
    statistics: 'İstatistikler',
    totalEarnings: 'Toplam Kazanç',
    successRate: 'Başarı Oranı',
    locked: 'Kilitli',
    unlocked: 'Kilidi Açıldı',
    progress: 'İlerleme',
    first_task: 'İlk Görev',
    first_task_desc: 'İlk görevinizi tamamladınız',
    '5_tasks': '5 Görev',
    '5_tasks_desc': '5 görev tamamladınız',
    '10_tasks': '10 Görev',
    '10_tasks_desc': '10 görev tamamladınız',
    '50_tasks': '50 Görev',
    '50_tasks_desc': '50 görev tamamladınız',
    '100_tasks': '100 Görev',
    '100_tasks_desc': '100 görev tamamladınız',
    '200_tasks': '200 Görev',
    '200_tasks_desc': '200 görev tamamlayın',
    first_transfer: 'İlk Transfer',
    first_transfer_desc: 'İlk transferinizi yaptınız',
    first_deposit: 'İlk Yatırma',
    first_deposit_desc: 'İlk yatırmanızı yaptınız',
    first_withdraw: 'İlk Çekim',
    first_withdraw_desc: 'İlk çekiminizi yaptınız',
    first_card: 'İlk Kart',
    first_card_desc: 'İlk kartınızı eklediniz',
    '3_cards': '3 Kart',
    '3_cards_desc': '3 kart ekleyin',
    premium_sub: 'Premium Üye',
    premium_sub_desc: 'Premium\'a yükseldiniz',
  },
  de: {
    profile: 'Profil',
    back: 'Zurück',
    memberSince: 'Mitglied seit',
    completedTasks: 'Abgeschlossene Aufgaben',
    rating: 'Bewertung',
    subscription: 'Abonnement',
    premium: 'Premium',
    basic: 'Basis',
    pro: 'Pro',
    viewHistory: 'Verlauf anzeigen',
    manageSubscription: 'Abonnement verwalten',
    achievements: 'Erfolge',
    topPerformer: 'Top-Performer',
    fastWorker: 'Schneller Arbeiter',
    reliable: 'Zuverlässig',
    earningStreak: 'Verdienstserie',
    days: 'Tage',
    level: 'Level',
    nextLevel: 'Nächstes Level',
    statistics: 'Statistiken',
    totalEarnings: 'Gesamtverdienst',
    successRate: 'Erfolgsquote',
    locked: 'Gesperrt',
    unlocked: 'Freigeschaltet',
    progress: 'Fortschritt',
    first_task: 'Erste Aufgabe',
    first_task_desc: 'Sie haben Ihre erste Aufgabe abgeschlossen',
    '5_tasks': '5 Aufgaben',
    '5_tasks_desc': 'Sie haben 5 Aufgaben abgeschlossen',
    '10_tasks': '10 Aufgaben',
    '10_tasks_desc': 'Sie haben 10 Aufgaben abgeschlossen',
    '50_tasks': '50 Aufgaben',
    '50_tasks_desc': 'Sie haben 50 Aufgaben abgeschlossen',
    '100_tasks': '100 Aufgaben',
    '100_tasks_desc': 'Sie haben 100 Aufgaben abgeschlossen',
    '200_tasks': '200 Aufgaben',
    '200_tasks_desc': 'Schließen Sie 200 Aufgaben ab',
    first_transfer: 'Erste Überweisung',
    first_transfer_desc: 'Sie haben Ihre erste Überweisung getätigt',
    first_deposit: 'Erste Einzahlung',
    first_deposit_desc: 'Sie haben Ihre erste Einzahlung getätigt',
    first_withdraw: 'Erste Abhebung',
    first_withdraw_desc: 'Sie haben Ihre erste Abhebung getätigt',
    first_card: 'Erste Karte',
    first_card_desc: 'Sie haben Ihre erste Karte hinzugefügt',
    '3_cards': '3 Karten',
    '3_cards_desc': 'Fügen Sie 3 Karten hinzu',
    premium_sub: 'Premium-Mitglied',
    premium_sub_desc: 'Sie sind auf Premium aufgestiegen',
  },
  fr: {
    profile: 'Profil',
    back: 'Retour',
    memberSince: 'Membre depuis',
    completedTasks: 'Tâches Terminées',
    rating: 'Évaluation',
    subscription: 'Abonnement',
    premium: 'Premium',
    basic: 'Basique',
    pro: 'Pro',
    viewHistory: 'Voir l\'historique',
    manageSubscription: 'Gérer l\'abonnement',
    achievements: 'Réalisations',
    topPerformer: 'Meilleur Performeur',
    fastWorker: 'Travailleur Rapide',
    reliable: 'Fiable',
    earningStreak: 'Série de Gains',
    days: 'jours',
    level: 'Niveau',
    nextLevel: 'Niveau suivant',
    statistics: 'Statistiques',
    totalEarnings: 'Gains Totaux',
    successRate: 'Taux de Réussite',
    locked: 'Verrouillé',
    unlocked: 'Déverrouillé',
    progress: 'Progrès',
    first_task: 'Première Tâche',
    first_task_desc: 'Vous avez terminé votre première tâche',
    '5_tasks': '5 Tâches',
    '5_tasks_desc': 'Vous avez terminé 5 tâches',
    '10_tasks': '10 Tâches',
    '10_tasks_desc': 'Vous avez terminé 10 tâches',
    '50_tasks': '50 Tâches',
    '50_tasks_desc': 'Vous avez terminé 50 tâches',
    '100_tasks': '100 Tâches',
    '100_tasks_desc': 'Vous avez terminé 100 tâches',
    '200_tasks': '200 Tâches',
    '200_tasks_desc': 'Terminez 200 tâches',
    first_transfer: 'Premier Transfert',
    first_transfer_desc: 'Vous avez effectué votre premier transfert',
    first_deposit: 'Premier Dépôt',
    first_deposit_desc: 'Vous avez effectué votre premier dépôt',
    first_withdraw: 'Premier Retrait',
    first_withdraw_desc: 'Vous avez effectué votre premier retrait',
    first_card: 'Première Carte',
    first_card_desc: 'Vous avez ajouté votre première carte',
    '3_cards': '3 Cartes',
    '3_cards_desc': 'Ajoutez 3 cartes',
    premium_sub: 'Membre Premium',
    premium_sub_desc: 'Vous êtes passé à Premium',
  },
  es: {
    profile: 'Perfil',
    back: 'Atrás',
    memberSince: 'Miembro desde',
    completedTasks: 'Tareas Completadas',
    rating: 'Calificación',
    subscription: 'Suscripción',
    premium: 'Premium',
    basic: 'Básico',
    pro: 'Pro',
    viewHistory: 'Ver historial',
    manageSubscription: 'Administrar suscripción',
    achievements: 'Logros',
    topPerformer: 'Mejor Desempeño',
    fastWorker: 'Trabajador Rápido',
    reliable: 'Confiable',
    earningStreak: 'Racha de Ganancias',
    days: 'días',
    level: 'Nivel',
    nextLevel: 'Siguiente nivel',
    statistics: 'Estadísticas',
    totalEarnings: 'Ganancias Totales',
    successRate: 'Tasa de Éxito',
    locked: 'Bloqueado',
    unlocked: 'Desbloqueado',
    progress: 'Progreso',
    first_task: 'Primera Tarea',
    first_task_desc: 'Completaste tu primera tarea',
    '5_tasks': '5 Tareas',
    '5_tasks_desc': 'Completaste 5 tareas',
    '10_tasks': '10 Tareas',
    '10_tasks_desc': 'Completaste 10 tareas',
    '50_tasks': '50 Tareas',
    '50_tasks_desc': 'Completaste 50 tareas',
    '100_tasks': '100 Tareas',
    '100_tasks_desc': 'Completaste 100 tareas',
    '200_tasks': '200 Tareas',
    '200_tasks_desc': 'Completa 200 tareas',
    first_transfer: 'Primera Transferencia',
    first_transfer_desc: 'Realizaste tu primera transferencia',
    first_deposit: 'Primer Depósito',
    first_deposit_desc: 'Realizaste tu primer depósito',
    first_withdraw: 'Primer Retiro',
    first_withdraw_desc: 'Realizaste tu primer retiro',
    first_card: 'Primera Tarjeta',
    first_card_desc: 'Agregaste tu primera tarjeta',
    '3_cards': '3 Tarjetas',
    '3_cards_desc': 'Agrega 3 tarjetas',
    premium_sub: 'Miembro Premium',
    premium_sub_desc: 'Mejoraste a Premium',
  },
  ar: {
    profile: 'الملف الشخصي',
    back: 'رجوع',
    memberSince: 'عضو منذ',
    completedTasks: 'المهام المكتملة',
    rating: 'التقييم',
    subscription: 'الاشتراك',
    premium: 'بريميوم',
    basic: 'أساسي',
    pro: 'برو',
    viewHistory: 'عرض السجل',
    manageSubscription: 'إدارة الاشتراك',
    achievements: 'الإنجازات',
    topPerformer: 'أفضل أداء',
    fastWorker: 'عامل سريع',
    reliable: 'موثوق',
    earningStreak: 'سلسلة الأرباح',
    days: 'أيام',
    level: 'المستوى',
    nextLevel: 'المستوى التالي',
    statistics: 'الإحصائيات',
    totalEarnings: 'إجمالي الأرباح',
    successRate: 'معدل النجاح',
    locked: 'مقفل',
    unlocked: 'مفتوح',
    progress: 'التقدم',
    first_task: 'المهمة الأولى',
    first_task_desc: 'أكملت مهمتك الأولى',
    '5_tasks': '5 مهام',
    '5_tasks_desc': 'أكملت 5 مهام',
    '10_tasks': '10 مهام',
    '10_tasks_desc': 'أكملت 10 مهام',
    '50_tasks': '50 مهمة',
    '50_tasks_desc': 'أكملت 50 مهمة',
    '100_tasks': '100 مهمة',
    '100_tasks_desc': 'أكملت 100 مهمة',
    '200_tasks': '200 مهمة',
    '200_tasks_desc': 'أكمل 200 مهمة',
    first_transfer: 'التحويل الأول',
    first_transfer_desc: 'قمت بأول تحويل لك',
    first_deposit: 'الإيداع الأول',
    first_deposit_desc: 'قمت بأول إيداع لك',
    first_withdraw: 'السحب الأول',
    first_withdraw_desc: 'قمت بأول سحب لك',
    first_card: 'البطاقة الأولى',
    first_card_desc: 'أضفت بطاقتك الأولى',
    '3_cards': '3 بطاقات',
    '3_cards_desc': 'أضف 3 بطاقات',
    premium_sub: 'عضو بريميوم',
    premium_sub_desc: 'قمت بالترقية إلى بريميوم',
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

        {/* Achievements - Real Nailiyyətlər */}
        <div className="bg-white rounded-3xl p-6 shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <Award className="text-purple-600" size={24} />
            <h3 className="text-gray-800">{lang.achievements}</h3>
          </div>
          <div className="space-y-3">
            {user.achievements && user.achievements.map((achievement) => {
              const getAchievementConfig = (id: string) => {
                const configs: {[key: string]: { icon: any, gradient: string, borderColor: string }} = {
                  'first_task': { icon: Target, gradient: 'from-blue-400 to-blue-600', borderColor: 'border-blue-200' },
                  '5_tasks': { icon: CheckCircle, gradient: 'from-green-400 to-green-600', borderColor: 'border-green-200' },
                  '10_tasks': { icon: Trophy, gradient: 'from-yellow-400 to-yellow-600', borderColor: 'border-yellow-200' },
                  '50_tasks': { icon: Medal, gradient: 'from-orange-400 to-orange-600', borderColor: 'border-orange-200' },
                  '100_tasks': { icon: Crown, gradient: 'from-purple-400 to-purple-600', borderColor: 'border-purple-200' },
                  '200_tasks': { icon: Flame, gradient: 'from-red-400 to-red-600', borderColor: 'border-red-200' },
                  'first_transfer': { icon: Repeat, gradient: 'from-indigo-400 to-indigo-600', borderColor: 'border-indigo-200' },
                  'first_deposit': { icon: TrendingUp, gradient: 'from-emerald-400 to-emerald-600', borderColor: 'border-emerald-200' },
                  'first_withdraw': { icon: TrendingDown, gradient: 'from-rose-400 to-rose-600', borderColor: 'border-rose-200' },
                  'first_card': { icon: CreditCard, gradient: 'from-cyan-400 to-cyan-600', borderColor: 'border-cyan-200' },
                  '3_cards': { icon: CreditCard, gradient: 'from-teal-400 to-teal-600', borderColor: 'border-teal-200' },
                  'premium_sub': { icon: Crown, gradient: 'from-yellow-500 to-amber-600', borderColor: 'border-yellow-300' },
                };
                return configs[id] || { icon: Star, gradient: 'from-gray-400 to-gray-600', borderColor: 'border-gray-200' };
              };
              
              const config = getAchievementConfig(achievement.id);
              const Icon = config.icon;
              const isUnlocked = achievement.unlocked;
              
              return (
                <div 
                  key={achievement.id}
                  className={`flex items-center gap-3 p-4 rounded-2xl border-2 transform hover:scale-105 transition-all ${
                    isUnlocked 
                      ? `bg-gradient-to-r from-${achievement.id.includes('task') ? 'yellow' : achievement.id.includes('transfer') ? 'purple' : achievement.id.includes('deposit') ? 'green' : achievement.id.includes('card') ? 'blue' : 'pink'}-50 to-white ${config.borderColor}`
                      : 'bg-gray-100 border-gray-300 opacity-60'
                  }`}
                >
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg ${
                    isUnlocked 
                      ? `bg-gradient-to-br ${config.gradient}` 
                      : 'bg-gray-400'
                  }`}>
                    <Icon className="text-white" size={28} />
                  </div>
                  <div className="flex-1">
                    <div className={`${isUnlocked ? 'text-gray-800' : 'text-gray-500'}`}>
                      {lang[achievement.id as keyof typeof lang] || achievement.id}
                    </div>
                    <div className="text-xs text-gray-600">
                      {lang[`${achievement.id}_desc` as keyof typeof lang] || ''}
                    </div>
                    {!isUnlocked && achievement.progress < achievement.target && (
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                          <span>{lang.progress}</span>
                          <span>{achievement.progress}/{achievement.target}</span>
                        </div>
                        <div className="w-full bg-gray-300 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all"
                            style={{ width: `${(achievement.progress / achievement.target) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                  {isUnlocked && achievement.unlockedDate && (
                    <div className="text-xs text-gray-400">
                      {achievement.unlockedDate}
                    </div>
                  )}
                </div>
              );
            })}
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
