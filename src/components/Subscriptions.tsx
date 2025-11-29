import { useState } from 'react';
import { Language, User } from '../App';
import { ChevronLeft, Check, Crown, Zap, Star, Clock } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface SubscriptionsProps {
  language: Language;
  user: User;
  setUser: (user: User) => void;
  onNavigate: (page: 'home' | 'profile' | 'wallet' | 'settings' | 'history' | 'subscriptions' | 'postjob' | 'extrawork') => void;
}

const translations = {
  az: {
    subscriptions: 'Abunəliklər',
    back: 'Geri',
    currentPlan: 'Cari Plan',
    choosePlan: 'Plan seçin',
    billingCycle: 'Ödəniş dövrü',
    weekly: 'Həftəlik',
    monthly: 'Aylıq',
    yearly: 'İllik',
    basic: 'Əsas',
    premium: 'Premium',
    pro: 'Pro',
    subscribe: 'Abunə ol',
    current: 'Cari',
    savePercent: '{percent}% qənaət',
    feature1: '5 tapşırıq/həftə',
    feature2: 'Əsas dəstək',
    feature3: '8% komissiya',
    premiumFeature1: '50 tapşırıq/həftə',
    premiumFeature2: 'Prioritet dəstək',
    premiumFeature3: '5% komissiya',
    premiumFeature4: 'Analitika',
    premiumFeature5: '⏱️ Maks 20 dəqiqə/tapşırıq',
    proFeature1: 'Limitsiz tapşırıqlar',
    proFeature2: 'VIP 24/7 dəstək',
    proFeature3: '2% komissiya',
    proFeature4: 'Peşəkar analitika',
    proFeature5: 'Premium nişan',
    proFeature6: '⏱️ Maks 30 dəqiqə/tapşırıq',
    insufficientBalance: 'Balans kifayət etmir. Pulqabınıza vəsait əlavə edin.',
    subscriptionSuccess: 'Abunəlik uğurla aktivləşdirildi!',
    subscriptionFailed: 'Abunəlik alınarkən xəta baş verdi',
  },
  en: {
    subscriptions: 'Subscriptions',
    back: 'Back',
    currentPlan: 'Current Plan',
    choosePlan: 'Choose a Plan',
    billingCycle: 'Billing Cycle',
    weekly: 'Weekly',
    monthly: 'Monthly',
    yearly: 'Yearly',
    basic: 'Basic',
    premium: 'Premium',
    pro: 'Pro',
    subscribe: 'Subscribe',
    current: 'Current',
    savePercent: 'Save {percent}%',
    feature1: '5 tasks/week',
    feature2: 'Basic support',
    feature3: '8% commission',
    premiumFeature1: '50 tasks/week',
    premiumFeature2: 'Priority support',
    premiumFeature3: '5% commission',
    premiumFeature4: 'Analytics dashboard',
    premiumFeature5: '⏱️ Max 20 min/task',
    proFeature1: 'Unlimited tasks',
    proFeature2: 'VIP 24/7 support',
    proFeature3: '2% commission',
    proFeature4: 'Advanced analytics',
    proFeature5: 'Premium badge',
    proFeature6: '⏱️ Max 30 min/task',
    insufficientBalance: 'Insufficient balance. Please add funds to your wallet.',
    subscriptionSuccess: 'Subscription activated successfully!',
    subscriptionFailed: 'Failed to subscribe',
  },
  ru: {
    subscriptions: 'Подписки',
    back: 'Назад',
    currentPlan: 'Текущий План',
    choosePlan: 'Выберите план',
    billingCycle: 'Цикл оплаты',
    weekly: 'Еженедельно',
    monthly: 'Ежемесячно',
    yearly: 'Ежегодно',
    basic: 'Базовый',
    premium: 'Премиум',
    pro: 'Про',
    subscribe: 'Подписаться',
    current: 'Текущий',
    savePercent: 'Сэкономьте {percent}%',
    feature1: '5 задач/неделя',
    feature2: 'Базовая поддержка',
    feature3: '8% комиссия',
    premiumFeature1: '50 задач/неделя',
    premiumFeature2: 'Приоритетная поддержка',
    premiumFeature3: '5% комиссия',
    premiumFeature4: 'Аналитика',
    premiumFeature5: '⏱️ Макс 20 мин/задача',
    proFeature1: 'Неограниченные задачи',
    proFeature2: 'VIP 24/7 поддержка',
    proFeature3: '2% комиссия',
    proFeature4: 'Продвинутая аналитика',
    proFeature5: 'Премиум значок',
    proFeature6: '⏱️ Макс 30 мин/задача',
    insufficientBalance: 'Недостаточно средств. Пополните кошелек.',
    subscriptionSuccess: 'Подписка успешно активирована!',
    subscriptionFailed: 'Не удалось подписаться',
  },
  tr: {
    subscriptions: 'Abonelikler',
    back: 'Geri',
    currentPlan: 'Mevcut Plan',
    choosePlan: 'Plan Seçin',
    billingCycle: 'Fatura Döngüsü',
    weekly: 'Haftalık',
    monthly: 'Aylık',
    yearly: 'Yıllık',
    basic: 'Temel',
    premium: 'Premium',
    pro: 'Pro',
    subscribe: 'Abone Ol',
    current: 'Mevcut',
    savePercent: '%{percent} tasarruf',
    feature1: '5 görev/hafta',
    feature2: 'Temel destek',
    feature3: '8% komisyon',
    premiumFeature1: '50 görev/hafta',
    premiumFeature2: 'Öncelikli destek',
    premiumFeature3: '5% komisyon',
    premiumFeature4: 'Analitik',
    premiumFeature5: '⏱️ Maks 20 dk/görev',
    proFeature1: 'Sınırsız görev',
    proFeature2: 'VIP 24/7 destek',
    proFeature3: '2% komisyon',
    proFeature4: 'Gelişmiş analitik',
    proFeature5: 'Premium rozet',
    proFeature6: '⏱️ Maks 30 dk/görev',
    insufficientBalance: 'Yetersiz bakiye. Lütfen cüzdanınıza fon ekleyin.',
    subscriptionSuccess: 'Abonelik başarıyla etkinleştirildi!',
    subscriptionFailed: 'Abone olunamadı',
  },
  de: {
    subscriptions: 'Abonnements',
    back: 'Zurück',
    currentPlan: 'Aktueller Plan',
    choosePlan: 'Plan Wählen',
    billingCycle: 'Abrechnungszyklus',
    weekly: 'Wöchentlich',
    monthly: 'Monatlich',
    yearly: 'Jährlich',
    basic: 'Basis',
    premium: 'Premium',
    pro: 'Pro',
    subscribe: 'Abonnieren',
    current: 'Aktuell',
    savePercent: '{percent}% sparen',
    feature1: '5 Aufgaben/Woche',
    feature2: 'Basis-Support',
    feature3: '8% Provision',
    premiumFeature1: '50 Aufgaben/Woche',
    premiumFeature2: 'Prioritäts-Support',
    premiumFeature3: '5% Provision',
    premiumFeature4: 'Analytik',
    premiumFeature5: '⏱️ Max 20 Min/Aufgabe',
    proFeature1: 'Unbegrenzte Aufgaben',
    proFeature2: 'VIP 24/7 Support',
    proFeature3: '2% Provision',
    proFeature4: 'Erweiterte Analytik',
    proFeature5: 'Premium-Abzeichen',
    proFeature6: '⏱️ Max 30 Min/Aufgabe',
    insufficientBalance: 'Unzureichendes Guthaben. Bitte fügen Sie Geld zur Geldbörse hinzu.',
    subscriptionSuccess: 'Abonnement erfolgreich aktiviert!',
    subscriptionFailed: 'Abonnement fehlgeschlagen',
  },
  fr: {
    subscriptions: 'Abonnements',
    back: 'Retour',
    currentPlan: 'Plan Actuel',
    choosePlan: 'Choisir un Plan',
    billingCycle: 'Cycle de Facturation',
    weekly: 'Hebdomadaire',
    monthly: 'Mensuel',
    yearly: 'Annuel',
    basic: 'Basique',
    premium: 'Premium',
    pro: 'Pro',
    subscribe: 'S\'abonner',
    current: 'Actuel',
    savePercent: 'Économisez {percent}%',
    feature1: '5 tâches/semaine',
    feature2: 'Support de base',
    feature3: '8% commission',
    premiumFeature1: '50 tâches/semaine',
    premiumFeature2: 'Support prioritaire',
    premiumFeature3: '5% commission',
    premiumFeature4: 'Analytique',
    premiumFeature5: '⏱️ Max 20 min/tâche',
    proFeature1: 'Tâches illimitées',
    proFeature2: 'Support VIP 24/7',
    proFeature3: '2% commission',
    proFeature4: 'Analytique avancée',
    proFeature5: 'Badge premium',
    proFeature6: '⏱️ Max 30 min/tâche',
    insufficientBalance: 'Solde insuffisant. Veuillez ajouter des fonds à votre portefeuille.',
    subscriptionSuccess: 'Abonnement activé avec succès!',
    subscriptionFailed: 'Échec de l\'abonnement',
  },
  es: {
    subscriptions: 'Suscripciones',
    back: 'Atrás',
    currentPlan: 'Plan Actual',
    choosePlan: 'Elegir Plan',
    billingCycle: 'Ciclo de Facturación',
    weekly: 'Semanal',
    monthly: 'Mensual',
    yearly: 'Anual',
    basic: 'Básico',
    premium: 'Premium',
    pro: 'Pro',
    subscribe: 'Suscribirse',
    current: 'Actual',
    savePercent: 'Ahorra {percent}%',
    feature1: '5 tareas/semana',
    feature2: 'Soporte básico',
    feature3: '8% comisión',
    premiumFeature1: '50 tareas/semana',
    premiumFeature2: 'Soporte prioritario',
    premiumFeature3: '5% comisión',
    premiumFeature4: 'Análisis',
    premiumFeature5: '⏱️ Máx 20 min/tarea',
    proFeature1: 'Tareas ilimitadas',
    proFeature2: 'Soporte VIP 24/7',
    proFeature3: '2% comisión',
    proFeature4: 'Análisis avanzado',
    proFeature5: 'Insignia premium',
    proFeature6: '⏱️ Máx 30 min/tarea',
    insufficientBalance: 'Saldo insuficiente. Agregue fondos a su billetera.',
    subscriptionSuccess: '¡Suscripción activada con éxito!',
    subscriptionFailed: 'Error al suscribirse',
  },
  ar: {
    subscriptions: 'الاشتراكات',
    back: 'رجوع',
    currentPlan: 'الخطة الحالية',
    choosePlan: 'اختر خطة',
    billingCycle: 'دورة الفوترة',
    weekly: 'أسبوعي',
    monthly: 'شهري',
    yearly: 'سنوي',
    basic: 'أساسي',
    premium: 'بريميوم',
    pro: 'احترافي',
    subscribe: 'اشترك',
    current: 'الحالي',
    savePercent: 'وفر {percent}%',
    feature1: '5 مهام/أسبوع',
    feature2: 'دعم أساسي',
    feature3: '8% عمولة',
    premiumFeature1: '50 مهمة/أسبوع',
    premiumFeature2: 'دعم ذو أولوية',
    premiumFeature3: '5% عمولة',
    premiumFeature4: 'لوحة التحليلات',
    premiumFeature5: '⏱️ حد أقصى 20 دقيقة/مهمة',
    proFeature1: 'مهام غير محدودة',
    proFeature2: 'دعم VIP 24/7',
    proFeature3: '2% عمولة',
    proFeature4: 'تحليلات متقدمة',
    proFeature5: 'شارة بريميوم',
    proFeature6: '⏱️ حد أقصى 30 دقيقة/مهمة',
    insufficientBalance: 'رصيد غير كاف. يرجى إضافة أموال إلى محفظتك.',
    subscriptionSuccess: 'تم تفعيل الاشتراك بنجاح!',
    subscriptionFailed: 'فشل الاشتراك',
  },
};

type BillingCycle = 'weekly' | 'monthly' | 'yearly';

const pricingData = {
  basic: {
    weekly: 0,
    monthly: 0,
    yearly: 0,
  },
  premium: {
    weekly: 2.49,
    monthly: 7.99,
    yearly: 79.99, // ~30% qənaət
  },
  pro: {
    weekly: 4.99,
    monthly: 14.99,
    yearly: 149.99, // ~17% qənaət
  },
};

export function Subscriptions({ language, user, setUser, onNavigate }: SubscriptionsProps) {
  const t = translations[language];
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');

  const handleSubscribe = (plan: string) => {
    // Əgər Basic plan-a dönürsə, pulsuz olduğu üçün balansdan pul çıxmır
    if (plan === 'basic') {
      setUser({ ...user, subscription: plan });
      toast.success(t.subscriptionSuccess);
      return;
    }

    // Abunəlik qiymətini hesabla
    const price = pricingData[plan as 'premium' | 'pro'][billingCycle];

    // Balansda kifayət qədər pul olub-olmadığını yoxla
    if (user.balance < price) {
      toast.error(t.insufficientBalance);
      return;
    }

    // Abunəlik ödənişini et
    const newTransaction = {
      id: Date.now(),
      type: 'payment' as const,
      description: `${plan.charAt(0).toUpperCase() + plan.slice(1)} ${t[billingCycle]} abunəlik`,
      amount: -price,
      date: new Date().toISOString().split('T')[0],
      category: 'Abunəlik',
    };

    setUser({
      ...user,
      subscription: plan,
      balance: user.balance - price,
      transactions: [newTransaction, ...user.transactions],
    });

    toast.success(t.subscriptionSuccess);
  };

  const getPriceDisplay = (plan: 'basic' | 'premium' | 'pro') => {
    const price = pricingData[plan][billingCycle];
    
    if (billingCycle === 'weekly') {
      return { price, period: '/həftə' };
    } else if (billingCycle === 'monthly') {
      return { price, period: '/ay' };
    } else {
      return { price, period: '/il' };
    }
  };

  const getSavingsPercent = (plan: 'premium' | 'pro') => {
    if (billingCycle === 'yearly') {
      const yearlyPrice = pricingData[plan].yearly;
      const monthlyEquivalent = pricingData[plan].monthly * 12;
      return Math.round(((monthlyEquivalent - yearlyPrice) / monthlyEquivalent) * 100);
    }
    return 0;
  };

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
          <h1 className="text-gray-800">{t.subscriptions}</h1>
        </div>

        {/* Current Plan */}
        <div className="bg-gradient-to-br from-purple-600 via-blue-600 to-pink-600 rounded-3xl p-8 shadow-2xl text-white transform hover:scale-105 transition-transform">
          <div className="flex items-center gap-3 mb-3">
            <Crown size={28} className="animate-pulse" />
            <span className="text-sm opacity-90">{t.currentPlan}</span>
          </div>
          <div className="text-4xl capitalize mb-2">{user.subscription}</div>
          <div className="flex items-center gap-2">
            <Star size={16} className="fill-yellow-400 text-yellow-400" />
            <Star size={16} className="fill-yellow-400 text-yellow-400" />
            <Star size={16} className="fill-yellow-400 text-yellow-400" />
            <Star size={16} className="fill-yellow-400 text-yellow-400" />
            <Star size={16} className="fill-yellow-400 text-yellow-400" />
          </div>
        </div>

        {/* Billing Cycle Selector */}
        <div className="bg-white rounded-3xl p-4 shadow-xl">
          <p className="text-sm text-gray-600 mb-3 text-center">{t.billingCycle}</p>
          <div className="grid grid-cols-3 gap-2">
            {(['weekly', 'monthly', 'yearly'] as BillingCycle[]).map((cycle) => (
              <button
                key={cycle}
                onClick={() => setBillingCycle(cycle)}
                className={`py-3 rounded-2xl transition-all ${
                  billingCycle === cycle
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg transform scale-105'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <div className="text-sm">{t[cycle]}</div>
                {cycle === 'yearly' && (
                  <div className="text-xs text-green-300 mt-1">🎉 {t.savePercent.replace('{percent}', '30')}</div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Plans */}
        <div className="space-y-4">
          {/* Basic Plan */}
          <div className={`bg-white rounded-3xl p-6 shadow-xl border-4 transition-all transform hover:scale-102 ${
            user.subscription === 'basic' ? 'border-purple-600 shadow-2xl' : 'border-transparent'
          }`}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-gray-800 mb-2 flex items-center gap-2">
                  {t.basic}
                  {user.subscription === 'basic' && <span className="text-2xl">✨</span>}
                </h3>
                <div className="text-3xl text-gray-800">
                  ${getPriceDisplay('basic').price}<span className="text-sm text-gray-500">{getPriceDisplay('basic').period}</span>
                </div>
              </div>
              {user.subscription === 'basic' && (
                <span className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm shadow-lg">
                  {t.current}
                </span>
              )}
            </div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-3 text-gray-700">
                <div className="bg-green-100 rounded-full p-1">
                  <Check className="text-green-600" size={16} />
                </div>
                <span className="text-sm">{t.feature1}</span>
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <div className="bg-green-100 rounded-full p-1">
                  <Check className="text-green-600" size={16} />
                </div>
                <span className="text-sm">{t.feature2}</span>
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <div className="bg-green-100 rounded-full p-1">
                  <Check className="text-green-600" size={16} />
                </div>
                <span className="text-sm">{t.feature3}</span>
              </li>
            </ul>
            {user.subscription !== 'basic' && (
              <button
                onClick={() => handleSubscribe('basic')}
                className="w-full bg-gradient-to-r from-gray-400 to-gray-500 text-white rounded-2xl py-3 hover:shadow-lg transform hover:scale-105 transition-all"
              >
                {t.subscribe}
              </button>
            )}
          </div>

          {/* Premium Plan */}
          <div className={`bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl p-6 shadow-xl border-4 transition-all transform hover:scale-102 relative overflow-hidden ${
            user.subscription === 'premium' ? 'border-purple-600 shadow-2xl' : 'border-transparent'
          }`}>
            {billingCycle === 'yearly' && (
              <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs animate-bounce">
                {t.savePercent.replace('{percent}', getSavingsPercent('premium').toString())}
              </div>
            )}
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-gray-800">{t.premium}</h3>
                  <Crown className="text-purple-600" size={24} />
                  {user.subscription === 'premium' && <span className="text-2xl">✨</span>}
                </div>
                <div className="text-3xl text-gray-800">
                  ${getPriceDisplay('premium').price}<span className="text-sm text-gray-500">{getPriceDisplay('premium').period}</span>
                </div>
              </div>
              {user.subscription === 'premium' && (
                <span className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm shadow-lg">
                  {t.current}
                </span>
              )}
            </div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-3 text-gray-700">
                <div className="bg-purple-100 rounded-full p-1">
                  <Check className="text-purple-600" size={16} />
                </div>
                <span className="text-sm">{t.premiumFeature1}</span>
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <div className="bg-purple-100 rounded-full p-1">
                  <Check className="text-purple-600" size={16} />
                </div>
                <span className="text-sm">{t.premiumFeature2}</span>
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <div className="bg-purple-100 rounded-full p-1">
                  <Check className="text-purple-600" size={16} />
                </div>
                <span className="text-sm">{t.premiumFeature3}</span>
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <div className="bg-purple-100 rounded-full p-1">
                  <Check className="text-purple-600" size={16} />
                </div>
                <span className="text-sm">{t.premiumFeature4}</span>
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <div className="bg-orange-100 rounded-full p-1 flex-shrink-0">
                  <Clock className="text-orange-600" size={16} />
                </div>
                <span className="text-sm font-medium text-orange-600">{t.premiumFeature5}</span>
              </li>
            </ul>
            {user.subscription !== 'premium' && (
              <button
                onClick={() => handleSubscribe('premium')}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl py-3 hover:shadow-2xl transform hover:scale-105 transition-all"
              >
                {t.subscribe}
              </button>
            )}
          </div>

          {/* Pro Plan */}
          <div className={`bg-gradient-to-br from-purple-600 via-blue-600 to-pink-600 rounded-3xl p-6 shadow-2xl text-white border-4 transition-all transform hover:scale-102 relative overflow-hidden ${
            user.subscription === 'pro' ? 'border-yellow-400 shadow-3xl' : 'border-transparent'
          }`}>
            {billingCycle === 'yearly' && (
              <div className="absolute top-4 right-4 bg-yellow-400 text-purple-900 px-3 py-1 rounded-full text-xs font-bold animate-bounce">
                {t.savePercent.replace('{percent}', getSavingsPercent('pro').toString())}
              </div>
            )}
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3>{t.pro}</h3>
                  <Zap size={24} className="fill-yellow-400 text-yellow-400 animate-pulse" />
                  {user.subscription === 'pro' && <span className="text-2xl">✨</span>}
                </div>
                <div className="text-3xl">
                  ${getPriceDisplay('pro').price}<span className="text-sm opacity-90">{getPriceDisplay('pro').period}</span>
                </div>
              </div>
              {user.subscription === 'pro' && (
                <span className="bg-yellow-400 text-purple-900 px-4 py-2 rounded-full text-sm shadow-lg">
                  {t.current}
                </span>
              )}
            </div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-3">
                <div className="bg-white/20 rounded-full p-1">
                  <Check size={16} />
                </div>
                <span className="text-sm">{t.proFeature1}</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="bg-white/20 rounded-full p-1">
                  <Check size={16} />
                </div>
                <span className="text-sm">{t.proFeature2}</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="bg-white/20 rounded-full p-1">
                  <Check size={16} />
                </div>
                <span className="text-sm">{t.proFeature3}</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="bg-white/20 rounded-full p-1">
                  <Check size={16} />
                </div>
                <span className="text-sm">{t.proFeature4}</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="bg-white/20 rounded-full p-1">
                  <Check size={16} />
                </div>
                <span className="text-sm">{t.proFeature5}</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="bg-yellow-400/20 rounded-full p-1 flex-shrink-0">
                  <Clock className="text-yellow-400" size={16} />
                </div>
                <span className="text-sm font-medium text-yellow-400">{t.proFeature6}</span>
              </li>
            </ul>
            {user.subscription !== 'pro' && (
              <button
                onClick={() => handleSubscribe('pro')}
                className="w-full bg-white text-purple-600 rounded-2xl py-3 hover:bg-gray-50 transform hover:scale-105 transition-all shadow-xl"
              >
                {t.subscribe}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
