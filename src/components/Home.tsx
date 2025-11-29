import { useState, useMemo } from 'react';
import { Language, User } from '../App';
import { DollarSign, TrendingUp, TrendingDown, Lightbulb, Calendar, AlertCircle, ArrowUpRight, ArrowDownRight, Coffee, Car, Film, UtensilsCrossed, ShoppingBag, Star, Crown, Mail, Target, CheckCircle } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HomeProps {
  language: Language;
  user: User;
  setUser: (user: User) => void;
  onNavigate: (page: 'home' | 'profile' | 'wallet' | 'settings' | 'history' | 'subscriptions' | 'postjob' | 'myjobs' | 'extrawork') => void;
}

const translations = {
  az: {
    dashboard: 'Maliyyə İdarəetməsi',
    profile: 'Profil',
    dailyIncome: 'Günlük Qazanc',
    dailyExpenses: 'Günlük Xərc',
    todayIncome: 'Bu gün qazanc',
    todayExpenses: 'Bu gün xərc',
    weeklyOverview: 'Həftəlik İcmal',
    expensesBy: 'Kartın xərclədiyi yerlər',
    incomeBy: 'Qazanclar (Mənbə üzrə)',
    tasksAndRating: 'Tapşırıqlar və Reytinq',
    completedTasks: 'Tamamlanmış',
    rating: 'Reytinq',
    taskProgress: 'Tapşırıq Tərəqqisi',
    financialTips: 'Maliyyə Tövsiyyələri',
    income: 'Qazanc',
    expense: 'Xərc',
    balance: 'Balans',
    cafe: 'Kafe',
    restaurant: 'Restoran',
    entertainment: 'Əyləncə',
    transport: 'Nəqliyyat',
    shopping: 'Alış-veriş',
    other: 'Digər',
    last7Days: 'Son 7 gün',
    tip1: 'Əla! Bu gün qazancınız xərclərdən çoxdur.',
    tip2: 'Daha çox tapşırıq tamamlayaraq gəlirinizi artırın.',
    tip3: 'Balansınızı yüksək saxlayın, minimum $50 tövsiyə olunur.',
    tip4: 'Kafe və restorana xərclərinizi azaldın.',
    tip5: 'Premium abunəliyə keçərək daha yüksək gəlir əldə edin.',
    tip6: 'Nəqliyyat xərclərinizi azaltmaq üçün ictimai nəqliyyat istifadə edin.',
    tip7: 'Həftəlik büdcənizi planlaşdırın və ona sadiq qalın.',
    tip8: 'Qənaət hesabı açaraq gələcək üçün yığım edin.',
    tip9: 'Tez-tez xərc etdiyiniz yerlərdə endirimlər axtarın.',
    tip10: 'Günlük xərc limitinizi təyin edin və onu keçməyin.',
    expenseWarning: 'Xəbərdarlıq: Bu gün xərcləriniz qazancınızdan çoxdur!',
    goodProgress: 'Əla: Bu gün xərcləriniz qazancınızdan azdır!',
    noData: 'Məlumat yoxdur',
    viewProfile: 'Profili Gör',
  },
  en: {
    dashboard: 'Financial Management',
    profile: 'Profile',
    dailyIncome: 'Daily Income',
    dailyExpenses: 'Daily Expenses',
    todayIncome: 'Today income',
    todayExpenses: 'Today expenses',
    weeklyOverview: 'Weekly Overview',
    expensesBy: 'Card Spending by Category',
    incomeBy: 'Income (By Source)',
    tasksAndRating: 'Tasks & Rating',
    completedTasks: 'Completed',
    rating: 'Rating',
    taskProgress: 'Task Progress',
    financialTips: 'Financial Tips',
    income: 'Income',
    expense: 'Expense',
    balance: 'Balance',
    cafe: 'Cafe',
    restaurant: 'Restaurant',
    entertainment: 'Entertainment',
    transport: 'Transport',
    shopping: 'Shopping',
    other: 'Other',
    last7Days: 'Last 7 days',
    tip1: 'Great! Today income exceeds expenses.',
    tip2: 'Increase your income by completing more tasks.',
    tip3: 'Keep your balance high, minimum $50 recommended.',
    tip4: 'Reduce your cafe and restaurant spending.',
    tip5: 'Upgrade to Premium subscription for higher earnings.',
    tip6: 'Use public transport to reduce transport costs.',
    tip7: 'Plan your weekly budget and stick to it.',
    tip8: 'Open a savings account for future savings.',
    tip9: 'Look for discounts at places you frequently spend.',
    tip10: 'Set a daily spending limit and don\'t exceed it.',
    expenseWarning: 'Warning: Today expenses exceed income!',
    goodProgress: 'Great: Today expenses are lower than income!',
    noData: 'No data',
    viewProfile: 'View Profile',
  },
  ru: {
    dashboard: 'Финансовое Управление',
    profile: 'Профиль',
    dailyIncome: 'Дневной Доход',
    dailyExpenses: 'Дневные Расходы',
    todayIncome: 'Доход за сегодня',
    todayExpenses: 'Расходы за сегодня',
    weeklyOverview: 'Недельный Обзор',
    expensesBy: 'Расходы карты по категориям',
    incomeBy: 'Доход (По Источникам)',
    tasksAndRating: 'Задачи и Рейтинг',
    completedTasks: 'Выполнено',
    rating: 'Рейтинг',
    taskProgress: 'Прогресс задач',
    financialTips: 'Финансовые Советы',
    income: 'Доход',
    expense: 'Расход',
    balance: 'Баланс',
    cafe: 'Кафе',
    restaurant: 'Ресторан',
    entertainment: 'Развлечения',
    transport: 'Транспорт',
    shopping: 'Покупки',
    other: 'Другое',
    last7Days: 'Последние 7 дней',
    tip1: 'Отлично! Сегодня доход превышает расходы.',
    tip2: 'Увеличьте доход, выполняя больше задач.',
    tip3: 'Держите баланс высоким, минимум $50 рекомендуется.',
    tip4: 'Сократите расходы на кафе и рестораны.',
    tip5: 'Перейдите на Premium подписку для большего заработка.',
    tip6: 'Используйте общественный транспорт для снижения затрат.',
    tip7: 'Планируйте недельный бюджет и придерживайтесь его.',
    tip8: 'Откройте сберегательный счет для будущих накоплений.',
    tip9: 'Ищите скидки в местах частых покупок.',
    tip10: 'Установите дневной лимит расходов и не превышайте его.',
    expenseWarning: 'Предупреждение: Сегодня расходы превышают доход!',
    goodProgress: 'Отлично: Сегодня расходы меньше дохода!',
    noData: 'Нет данных',
    viewProfile: 'Посмотреть Профиль',
  },
  tr: {
    dashboard: 'Finansal Yönetim',
    profile: 'Profil',
    dailyIncome: 'Günlük Gelir',
    dailyExpenses: 'Günlük Giderler',
    todayIncome: 'Bugün gelir',
    todayExpenses: 'Bugün gider',
    weeklyOverview: 'Haftalık Genel Bakış',
    expensesBy: 'Kart harcamaları kategorilere göre',
    incomeBy: 'Gelirler (Kaynağa Göre)',
    tasksAndRating: 'Görevler ve Değerlendirme',
    completedTasks: 'Tamamlandı',
    rating: 'Değerlendirme',
    taskProgress: 'Görev İlerlemesi',
    financialTips: 'Finansal İpuçları',
    income: 'Gelir',
    expense: 'Gider',
    balance: 'Bakiye',
    cafe: 'Kafe',
    restaurant: 'Restoran',
    entertainment: 'Eğlence',
    transport: 'Ulaşım',
    shopping: 'Alışveriş',
    other: 'Diğer',
    last7Days: 'Son 7 gün',
    tip1: 'Harika! Bugün gelir giderleri aşıyor.',
    tip2: 'Daha fazla görev tamamlayarak gelirinizi artırın.',
    tip3: 'Bakiyenizi yüksek tutun, minimum $50 önerilir.',
    tip4: 'Kafe ve restoran harcamalarınızı azaltın.',
    tip5: 'Daha yüksek kazanç için Premium aboneliğe geçin.',
    tip6: 'Ulaşım maliyetlerini azaltmak için toplu taşıma kullanın.',
    tip7: 'Haftalık bütçenizi planlayın ve ona sadık kalın.',
    tip8: 'Gelecek için tasarruf hesabı açın.',
    tip9: 'Sık harcama yaptığınız yerlerde indirimler arayın.',
    tip10: 'Günlük harcama limitinizi belirleyin ve aşmayın.',
    expenseWarning: 'Uyarı: Bugün giderler geliri aşıyor!',
    goodProgress: 'Harika: Bugün giderler gelirden az!',
    noData: 'Veri yok',
    viewProfile: 'Profili Gör',
  },
  de: {
    dashboard: 'Finanzverwaltung',
    profile: 'Profil',
    dailyIncome: 'Tägliches Einkommen',
    dailyExpenses: 'Tägliche Ausgaben',
    todayIncome: 'Heutiges Einkommen',
    todayExpenses: 'Heutige Ausgaben',
    weeklyOverview: 'Wöchentliche Übersicht',
    expensesBy: 'Kartenausgaben nach Kategorien',
    incomeBy: 'Einkommen (Nach Quelle)',
    tasksAndRating: 'Aufgaben und Bewertung',
    completedTasks: 'Abgeschlossen',
    rating: 'Bewertung',
    taskProgress: 'Aufgabenfortschritt',
    financialTips: 'Finanztipps',
    income: 'Einkommen',
    expense: 'Ausgabe',
    balance: 'Guthaben',
    cafe: 'Café',
    restaurant: 'Restaurant',
    entertainment: 'Unterhaltung',
    transport: 'Transport',
    shopping: 'Einkaufen',
    other: 'Andere',
    last7Days: 'Letzte 7 Tage',
    tip1: 'Großartig! Heute übersteigt Einkommen Ausgaben.',
    tip2: 'Erhöhen Sie Ihr Einkommen durch mehr Aufgaben.',
    tip3: 'Halten Sie Ihr Guthaben hoch, mindestens $50 empfohlen.',
    tip4: 'Reduzieren Sie Café- und Restaurantausgaben.',
    tip5: 'Upgraden Sie auf Premium für höhere Einnahmen.',
    tip6: 'Nutzen Sie öffentliche Verkehrsmittel zur Kostensenkung.',
    tip7: 'Planen Sie Ihr wöchentliches Budget und halten Sie sich daran.',
    tip8: 'Eröffnen Sie ein Sparkonto für zukünftige Ersparnisse.',
    tip9: 'Suchen Sie nach Rabatten an häufig besuchten Orten.',
    tip10: 'Setzen Sie ein tägliches Ausgabenlimit und überschreiten Sie es nicht.',
    expenseWarning: 'Warnung: Heute übersteigen Ausgaben Einkommen!',
    goodProgress: 'Großartig: Heute sind Ausgaben niedriger als Einkommen!',
    noData: 'Keine Daten',
    viewProfile: 'Profil Ansehen',
  },
  fr: {
    dashboard: 'Gestion Financière',
    profile: 'Profil',
    dailyIncome: 'Revenu Quotidien',
    dailyExpenses: 'Dépenses Quotidiennes',
    todayIncome: 'Revenu aujourd\'hui',
    todayExpenses: 'Dépenses aujourd\'hui',
    weeklyOverview: 'Aperçu Hebdomadaire',
    expensesBy: 'Dépenses de carte par catégorie',
    incomeBy: 'Revenus (Par Source)',
    tasksAndRating: 'Tâches et Note',
    completedTasks: 'Terminées',
    rating: 'Note',
    taskProgress: 'Progrès des tâches',
    financialTips: 'Conseils Financiers',
    income: 'Revenu',
    expense: 'Dépense',
    balance: 'Solde',
    cafe: 'Café',
    restaurant: 'Restaurant',
    entertainment: 'Divertissement',
    transport: 'Transport',
    shopping: 'Shopping',
    other: 'Autre',
    last7Days: 'Les 7 derniers jours',
    tip1: 'Excellent! Aujourd\'hui revenu dépasse dépenses.',
    tip2: 'Augmentez vos revenus en complétant plus de tâches.',
    tip3: 'Gardez votre solde élevé, minimum $50 recommandé.',
    tip4: 'Réduisez vos dépenses de café et restaurant.',
    tip5: 'Passez à Premium pour des gains plus élevés.',
    tip6: 'Utilisez les transports en commun pour réduire les coûts.',
    tip7: 'Planifiez votre budget hebdomadaire et respectez-le.',
    tip8: 'Ouvrez un compte d\'épargne pour économiser.',
    tip9: 'Cherchez des réductions dans vos lieux fréquents.',
    tip10: 'Fixez une limite de dépenses quotidiennes.',
    expenseWarning: 'Attention: Aujourd\'hui dépenses dépassent revenu!',
    goodProgress: 'Excellent: Aujourd\'hui dépenses inférieures au revenu!',
    noData: 'Pas de données',
    viewProfile: 'Voir le Profil',
  },
  es: {
    dashboard: 'Gestión Financiera',
    profile: 'Perfil',
    dailyIncome: 'Ingreso Diario',
    dailyExpenses: 'Gastos Diarios',
    todayIncome: 'Ingreso de hoy',
    todayExpenses: 'Gastos de hoy',
    weeklyOverview: 'Resumen Semanal',
    expensesBy: 'Gastos de tarjeta por categoría',
    incomeBy: 'Ingresos (Por Fuente)',
    tasksAndRating: 'Tareas y Calificación',
    completedTasks: 'Completadas',
    rating: 'Calificación',
    taskProgress: 'Progreso de tareas',
    financialTips: 'Consejos Financieros',
    income: 'Ingreso',
    expense: 'Gasto',
    balance: 'Balance',
    cafe: 'Cafetería',
    restaurant: 'Restaurante',
    entertainment: 'Entretenimiento',
    transport: 'Transporte',
    shopping: 'Compras',
    other: 'Otro',
    last7Days: 'Últimos 7 días',
    tip1: '¡Excelente! Hoy ingresos superan gastos.',
    tip2: 'Aumente sus ingresos completando más tareas.',
    tip3: 'Mantenga su saldo alto, mínimo $50 recomendado.',
    tip4: 'Reduzca gastos de cafetería y restaurante.',
    tip5: 'Actualice a Premium para mayores ganancias.',
    tip6: 'Use transporte público para reducir costos.',
    tip7: 'Planifique su presupuesto semanal y cúmplalo.',
    tip8: 'Abra una cuenta de ahorro para el futuro.',
    tip9: 'Busque descuentos en lugares frecuentes.',
    tip10: 'Establezca un límite de gasto diario.',
    expenseWarning: '¡Advertencia: Hoy gastos superan ingresos!',
    goodProgress: '¡Excelente: Hoy gastos son menores que ingresos!',
    noData: 'Sin datos',
    viewProfile: 'Ver Perfil',
  },
  ar: {
    dashboard: 'الإدارة المالية',
    profile: 'الملف الشخصي',
    dailyIncome: 'الدخل اليومي',
    dailyExpenses: 'المصروفات اليومية',
    todayIncome: 'دخل اليوم',
    todayExpenses: 'مصروفات اليوم',
    weeklyOverview: 'نظرة أسبوعية',
    expensesBy: 'إنفاق البطاقة حسب الفئة',
    incomeBy: 'الدخل (حسب المصدر)',
    tasksAndRating: 'المهام والتقييم',
    completedTasks: 'مكتملة',
    rating: 'التقييم',
    taskProgress: 'تقدم المهام',
    financialTips: 'نصائح مالية',
    income: 'دخل',
    expense: 'مصروف',
    balance: 'الرصيد',
    cafe: 'مقهى',
    restaurant: 'مطعم',
    entertainment: 'ترفيه',
    transport: 'نقل',
    shopping: 'تسوق',
    other: 'أخرى',
    last7Days: 'آخر 7 أيام',
    tip1: 'رائع! اليوم الدخل يتجاوز المصروفات.',
    tip2: 'زد دخلك بإكمال المزيد من المهام.',
    tip3: 'حافظ على رصيدك مرتفعاً، الحد الأدنى $50 موصى به.',
    tip4: 'قلل نفقات المقاهي والمطاعم.',
    tip5: 'قم بالترقية إلى Premium لأرباح أعلى.',
    tip6: 'استخدم وسائل النقل العامة لتقليل التكاليف.',
    tip7: 'خطط لميزانيتك الأسبوعية والتزم بها.',
    tip8: 'افتح حساب توفير للمستقبل.',
    tip9: 'ابحث عن خصومات في الأماكن المتكررة.',
    tip10: 'حدد حد إنفاق يومي ولا تتجاوزه.',
    expenseWarning: 'تحذير: مصروفات اليوم تتجاوز الدخل!',
    goodProgress: 'رائع: مصروفات اليوم أقل من الدخل!',
    noData: 'لا توجد بيانات',
    viewProfile: 'عرض الملف الشخصي',
  },
};

const categoryIcons: { [key: string]: any } = {
  'Kafe': Coffee,
  'Restoran': UtensilsCrossed,
  'Əyləncə': Film,
  'Nəqliyyat': Car,
  'Alış-veriş': ShoppingBag,
};

const COLORS = ['#8b5cf6', '#3b82f6', '#ec4899', '#10b981', '#f59e0b', '#ef4444'];

export function Home({ language, user, setUser, onNavigate }: HomeProps) {
  const t = translations[language];

  // Calculate daily income and expenses
  const { todayIncome, todayExpenses, weeklyData, expensesByPlace, incomeBySource } = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    
    // Today's transactions
    const todayTransactions = user.transactions.filter(tr => tr.date === today);
    const todayIncome = todayTransactions
      .filter(tr => tr.type === 'received' || tr.type === 'deposit')
      .reduce((sum, tr) => sum + tr.amount, 0);
    const todayExpenses = Math.abs(todayTransactions
      .filter(tr => tr.type === 'withdraw' || tr.type === 'payment')
      .reduce((sum, tr) => sum + tr.amount, 0));

    // Last 7 days data for chart
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const dayTransactions = user.transactions.filter(tr => tr.date === dateStr);
      
      const income = dayTransactions
        .filter(tr => tr.type === 'received' || tr.type === 'deposit')
        .reduce((sum, tr) => sum + tr.amount, 0);
      const expenses = Math.abs(dayTransactions
        .filter(tr => tr.type === 'withdraw' || tr.type === 'payment')
        .reduce((sum, tr) => sum + tr.amount, 0));

      last7Days.push({
        date: dateStr.slice(5),
        income,
        expenses
      });
    }

    // Expenses by place/category
    const placeMap: { [key: string]: number } = {};
    user.transactions
      .filter(tr => tr.type === 'payment' && tr.category)
      .forEach(transaction => {
        const place = transaction.category || 'Digər';
        placeMap[place] = (placeMap[place] || 0) + Math.abs(transaction.amount);
      });

    const expensesByPlace = Object.entries(placeMap).map(([name, value]) => ({
      name,
      value
    }));

    // Income by source - only from completed tasks (received), not deposits
    const sourceMap: { [key: string]: number } = {};
    user.transactions
      .filter(tr => tr.type === 'received' && tr.source)
      .forEach(transaction => {
        const source = transaction.source || 'Digər';
        sourceMap[source] = (sourceMap[source] || 0) + transaction.amount;
      });

    const incomeBySource = Object.entries(sourceMap).map(([name, value]) => ({
      name,
      value
    }));

    return { todayIncome, todayExpenses, weeklyData: last7Days, expensesByPlace, incomeBySource };
  }, [user.transactions]);

  // Get all financial tips
  const getAllFinancialTips = () => {
    const tips = [];
    
    if (todayExpenses < todayIncome && todayIncome > 0) {
      tips.push({ icon: '✅', text: t.tip1, type: 'success' });
    }

    if (user.completedTasks < 100) {
      tips.push({ icon: '💼', text: t.tip2, type: 'info' });
    }

    if (user.balance < 50) {
      tips.push({ icon: '💰', text: t.tip3, type: 'warning' });
    }

    const cafeExpenses = expensesByPlace.filter(e => e.name === 'Kafe' || e.name === 'Restoran')
      .reduce((sum, e) => sum + e.value, 0);
    if (cafeExpenses > 30) {
      tips.push({ icon: '☕', text: t.tip4, type: 'warning' });
    }

    if (user.subscription === 'basic') {
      tips.push({ icon: '⭐', text: t.tip5, type: 'info' });
    }

    const transportExpenses = expensesByPlace.find(e => e.name === 'Nəqliyyat');
    if (transportExpenses && transportExpenses.value > 20) {
      tips.push({ icon: '🚌', text: t.tip6, type: 'info' });
    }

    tips.push({ icon: '📊', text: t.tip7, type: 'info' });
    tips.push({ icon: '🏦', text: t.tip8, type: 'success' });
    tips.push({ icon: '🎯', text: t.tip9, type: 'info' });
    tips.push({ icon: '⚖️', text: t.tip10, type: 'warning' });

    return tips;
  };

  const financialTips = getAllFinancialTips();

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Profile Preview Card */}
        <button
          onClick={() => onNavigate('profile')}
          className="w-full bg-gradient-to-br from-purple-600 via-blue-600 to-pink-600 rounded-3xl p-6 shadow-2xl transform hover:scale-105 transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl shadow-xl">
              {user.name.charAt(0)}
            </div>
            <div className="flex-1 text-left">
              <h2 className="text-white mb-1">{user.name}</h2>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-purple-200" />
                <p className="text-sm text-purple-100">{user.email}</p>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                  {user.subscription === 'premium' ? <Crown size={14} className="text-yellow-300" /> : <Star size={14} className="text-white" />}
                  <span className="text-xs text-white capitalize">{user.subscription}</span>
                </div>
                <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                  <Star size={14} className="text-yellow-300" />
                  <span className="text-xs text-white">{user.rating}</span>
                </div>
              </div>
            </div>
            <ArrowUpRight className="text-white/70" size={24} />
          </div>
        </button>

        {/* Header */}
        <div className="bg-gradient-to-br from-white to-purple-50 rounded-3xl p-6 shadow-xl border border-purple-100">
          <h1 className="text-gray-800 mb-2">{t.dashboard}</h1>
          <p className="text-sm text-gray-600">{new Date().toLocaleDateString()}</p>
        </div>

        {/* Daily Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-5 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-8 -mt-8"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <ArrowUpRight className="text-white" size={24} />
                <TrendingUp className="text-white/70" size={20} />
              </div>
              <div className="text-white text-2xl">${todayIncome.toFixed(2)}</div>
              <div className="text-xs text-green-100 mt-1">{t.todayIncome}</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl p-5 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-8 -mt-8"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <ArrowDownRight className="text-white" size={24} />
                <TrendingDown className="text-white/70" size={20} />
              </div>
              <div className="text-white text-2xl">${todayExpenses.toFixed(2)}</div>
              <div className="text-xs text-red-100 mt-1">{t.todayExpenses}</div>
            </div>
          </div>
        </div>

        {/* Progress Alert */}
        {todayExpenses > 0 || todayIncome > 0 ? (
          <div className={`rounded-2xl p-4 border-2 ${
            todayExpenses > todayIncome 
              ? 'bg-red-50 border-red-200' 
              : 'bg-green-50 border-green-200'
          }`}>
            <div className="flex items-center gap-2">
              <AlertCircle 
                className={todayExpenses > todayIncome ? 'text-red-600' : 'text-green-600'} 
                size={20} 
              />
              <p className={`text-sm ${
                todayExpenses > todayIncome ? 'text-red-700' : 'text-green-700'
              }`}>
                {todayExpenses > todayIncome ? t.expenseWarning : t.goodProgress}
              </p>
            </div>
          </div>
        ) : null}

        {/* Weekly Overview Chart */}
        <div className="bg-white rounded-3xl p-6 shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="text-purple-600" size={24} />
            <h2 className="text-gray-800">{t.weeklyOverview}</h2>
          </div>
          <p className="text-xs text-gray-500 mb-4">{t.last7Days}</p>
          
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#9ca3af" />
              <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: '8px 12px'
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Line 
                type="monotone" 
                dataKey="income" 
                stroke="#10b981" 
                strokeWidth={3}
                name={t.income}
                dot={{ fill: '#10b981', r: 5 }}
              />
              <Line 
                type="monotone" 
                dataKey="expenses" 
                stroke="#ef4444" 
                strokeWidth={3}
                name={t.expense}
                dot={{ fill: '#ef4444', r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Expenses by Place */}
        {expensesByPlace.length > 0 && (
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-6 shadow-xl border border-orange-100">
            <div className="flex items-center gap-2 mb-4">
              <Coffee className="text-orange-600" size={24} />
              <h2 className="text-gray-800">{t.expensesBy}</h2>
            </div>
            
            <div className="space-y-3">
              {expensesByPlace.map((item, index) => {
                const Icon = categoryIcons[item.name] || ShoppingBag;
                const percentage = (item.value / expensesByPlace.reduce((sum, e) => sum + e.value, 0) * 100).toFixed(0);
                
                return (
                  <div key={index} className="bg-white rounded-2xl p-4 shadow-md">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center`}
                          style={{ backgroundColor: COLORS[index % COLORS.length] + '20' }}>
                          <Icon size={20} style={{ color: COLORS[index % COLORS.length] }} />
                        </div>
                        <div>
                          <p className="text-sm text-gray-800">{item.name}</p>
                          <p className="text-xs text-gray-500">{percentage}%</p>
                        </div>
                      </div>
                      <div className="text-lg" style={{ color: COLORS[index % COLORS.length] }}>
                        ${item.value.toFixed(2)}
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all duration-500"
                        style={{ 
                          width: `${percentage}%`,
                          backgroundColor: COLORS[index % COLORS.length]
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tasks and Rating Card */}
        <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 rounded-3xl p-6 shadow-xl border-2 border-purple-200">
          <div className="flex items-center gap-2 mb-6">
            <Target className="text-purple-600" size={24} />
            <h2 className="text-gray-800">{t.tasksAndRating}</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {/* Completed Tasks */}
            <div className="bg-white rounded-2xl p-5 shadow-lg border-2 border-purple-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-purple-100 rounded-full -mr-8 -mt-8 opacity-50"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="text-purple-600" size={20} />
                  <p className="text-xs text-gray-600">{t.completedTasks}</p>
                </div>
                <div className="text-3xl text-purple-600">{user.completedTasks}</div>
                <div className="mt-3 bg-purple-100 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((user.completedTasks / 100) * 100, 100)}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">{t.taskProgress}</p>
              </div>
            </div>

            {/* Rating */}
            <div className="bg-white rounded-2xl p-5 shadow-lg border-2 border-orange-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-orange-100 rounded-full -mr-8 -mt-8 opacity-50"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="text-orange-500 fill-orange-500" size={20} />
                  <p className="text-xs text-gray-600">{t.rating}</p>
                </div>
                <div className="text-3xl text-orange-600">{user.rating.toFixed(1)}</div>
                <div className="flex gap-1 mt-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={16}
                      className={star <= Math.round(user.rating) ? 'text-orange-500 fill-orange-500' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-1">/ 5.0</p>
              </div>
            </div>
          </div>

          {/* Subscription Badge */}
          <div className="mt-4 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 rounded-2xl p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Crown size={20} className="text-yellow-300" />
                <div>
                  <p className="text-xs opacity-90">
                    {language === 'az' ? 'Abunəlik' : language === 'en' ? 'Subscription' : language === 'ru' ? 'Подписка' : language === 'tr' ? 'Abonelik' : language === 'de' ? 'Abonnement' : language === 'fr' ? 'Abonnement' : language === 'es' ? 'Suscripción' : 'اشتراك'}
                  </p>
                  <p className="capitalize">{user.subscription}</p>
                </div>
              </div>
              <button
                onClick={() => onNavigate('subscriptions')}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-xl text-sm transition-all hover:scale-105"
              >
                {language === 'az' ? 'Yüksəlt' : language === 'en' ? 'Upgrade' : language === 'ru' ? 'Обновить' : language === 'tr' ? 'Yükselt' : language === 'de' ? 'Upgrade' : language === 'fr' ? 'Améliorer' : language === 'es' ? 'Mejorar' : 'ترقية'}
              </button>
            </div>
          </div>
        </div>

        {/* Financial Tips */}
        <div className="bg-white rounded-3xl p-6 shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="text-purple-600" size={24} />
            <h2 className="text-gray-800">{t.financialTips}</h2>
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            {financialTips.map((tip, index) => (
              <div 
                key={index}
                className={`p-4 rounded-xl border-2 ${
                  tip.type === 'success' ? 'bg-green-50 border-green-200' :
                  tip.type === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                  'bg-blue-50 border-blue-200'
                } transform hover:scale-102 transition-all`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{tip.icon}</span>
                  <p className={`text-sm ${
                    tip.type === 'success' ? 'text-green-700' :
                    tip.type === 'warning' ? 'text-yellow-700' :
                    'text-blue-700'
                  }`}>
                    {tip.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Balance Card */}
        <button
          onClick={() => onNavigate('wallet')}
          className="w-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-6 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-12 -mt-12"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-8 -mb-8"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div className="text-left">
              <p className="text-purple-100 text-sm mb-1">{t.balance}</p>
              <div className="text-white text-3xl">${user.balance.toFixed(2)}</div>
            </div>
            <DollarSign className="text-white/70" size={48} />
          </div>
        </button>
      </div>
    </div>
  );
}
