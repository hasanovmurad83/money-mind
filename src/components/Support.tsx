import { useState, useEffect } from 'react';
import { Language } from '../App';
import { ChevronLeft, AlertCircle, Send, MessageSquare, CheckCircle, Bot, User as UserIcon } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface SupportProps {
  language: Language;
  onNavigate: (page: 'settings') => void;
}

const translations = {
  az: {
    support: 'Kömək',
    back: 'Geri',
    selectProblem: 'Problem növünü seçin',
    payment: 'Ödəniş problemləri',
    account: 'Hesab problemləri',
    tasks: 'Tapşırıq problemləri',
    technical: 'Texniki problemlər',
    other: 'Digər',
    describe: 'Problemi təsvir edin',
    placeholder: 'Problemi ətraflı izah edin...',
    submit: 'Göndər',
    messages: 'Mesajlar',
    noMessages: 'Hələ mesaj yoxdur',
    success: 'Reportınız göndərildi!',
    aiResponse: 'AI Cavab',
    you: 'Siz',
    aiAssistant: 'AI Köməkçi',
  },
  en: {
    support: 'Support',
    back: 'Back',
    selectProblem: 'Select problem type',
    payment: 'Payment issues',
    account: 'Account issues',
    tasks: 'Task issues',
    technical: 'Technical problems',
    other: 'Other',
    describe: 'Describe the problem',
    placeholder: 'Explain the problem in detail...',
    submit: 'Submit',
    messages: 'Messages',
    noMessages: 'No messages yet',
    success: 'Your report has been submitted!',
    aiResponse: 'AI Response',
    you: 'You',
    aiAssistant: 'AI Assistant',
  },
  ru: {
    support: 'Поддержка',
    back: 'Назад',
    selectProblem: 'Выберите тип проблемы',
    payment: 'Проблемы с оплатой',
    account: 'Проблемы с аккаунтом',
    tasks: 'Проблемы с задачами',
    technical: 'Технические проблемы',
    other: 'Другое',
    describe: 'Опишите проблему',
    placeholder: 'Подробно объясните проблему...',
    submit: 'Отправить',
    messages: 'Сообщения',
    noMessages: 'Пока нет сообщений',
    success: 'Ваш отчет отправлен!',
    aiResponse: 'Ответ AI',
    you: 'Вы',
    aiAssistant: 'AI Ассистент',
  },
  tr: {
    support: 'Destek',
    back: 'Geri',
    selectProblem: 'Problem türünü seçin',
    payment: 'Ödeme sorunları',
    account: 'Hesap sorunları',
    tasks: 'Görev sorunları',
    technical: 'Teknik sorunlar',
    other: 'Diğer',
    describe: 'Sorunu açıklayın',
    placeholder: 'Sorunu detaylı açıklayın...',
    submit: 'Gönder',
    messages: 'Mesajlar',
    noMessages: 'Henüz mesaj yok',
    success: 'Raporunuz gönderildi!',
    aiResponse: 'AI Yanıt',
    you: 'Siz',
    aiAssistant: 'AI Asistan',
  },
  de: {
    support: 'Unterstützung',
    back: 'Zurück',
    selectProblem: 'Problemtyp auswählen',
    payment: 'Zahlungsprobleme',
    account: 'Kontoprobleme',
    tasks: 'Aufgabenprobleme',
    technical: 'Technische Probleme',
    other: 'Andere',
    describe: 'Beschreiben Sie das Problem',
    placeholder: 'Erklären Sie das Problem im Detail...',
    submit: 'Senden',
    messages: 'Nachrichten',
    noMessages: 'Noch keine Nachrichten',
    success: 'Ihr Bericht wurde gesendet!',
    aiResponse: 'AI-Antwort',
    you: 'Sie',
    aiAssistant: 'AI-Assistent',
  },
  fr: {
    support: 'Support',
    back: 'Retour',
    selectProblem: 'Sélectionner le type de problème',
    payment: 'Problèmes de paiement',
    account: 'Problèmes de compte',
    tasks: 'Problèmes de tâches',
    technical: 'Problèmes techniques',
    other: 'Autre',
    describe: 'Décrivez le problème',
    placeholder: 'Expliquez le problème en détail...',
    submit: 'Envoyer',
    messages: 'Messages',
    noMessages: 'Pas encore de messages',
    success: 'Votre rapport a été envoyé!',
    aiResponse: 'Réponse IA',
    you: 'Vous',
    aiAssistant: 'Assistant IA',
  },
  es: {
    support: 'Soporte',
    back: 'Atrás',
    selectProblem: 'Seleccionar tipo de problema',
    payment: 'Problemas de pago',
    account: 'Problemas de cuenta',
    tasks: 'Problemas de tareas',
    technical: 'Problemas técnicos',
    other: 'Otro',
    describe: 'Describa el problema',
    placeholder: 'Explique el problema en detalle...',
    submit: 'Enviar',
    messages: 'Mensajes',
    noMessages: 'Aún no hay mensajes',
    success: '¡Su informe ha sido enviado!',
    aiResponse: 'Respuesta IA',
    you: 'Usted',
    aiAssistant: 'Asistente IA',
  },
  ar: {
    support: 'الدعم',
    back: 'رجوع',
    selectProblem: 'حدد نوع المشكلة',
    payment: 'مشاكل الدفع',
    account: 'مشاكل الحساب',
    tasks: 'مشاكل المهام',
    technical: 'مشاكل تقنية',
    other: 'أخرى',
    describe: 'صف المشكلة',
    placeholder: 'اشرح المشكلة بالتفصيل...',
    submit: 'إرسال',
    messages: 'الرسائل',
    noMessages: 'لا توجد رسائل بعد',
    success: 'تم إرسال تقريرك!',
    aiResponse: 'رد AI',
    you: 'أنت',
    aiAssistant: 'مساعد AI',
  },
};

interface AIReply {
  id: string;
  text: string;
  timestamp: string;
}

interface Message {
  id: number;
  type: string;
  description: string;
  date: string;
  status: 'pending' | 'resolved';
  aiReplies?: AIReply[];
}

// Proqram məlumatları bazası
const APP_KNOWLEDGE_BASE = {
  subscriptionPlans: {
    basic: { name: 'Basic', price: 0, taskDuration: 'limitsiz', features: ['Limitsiz tapşırıq müddəti', 'Əsas funksiyalar'] },
    premium: { name: 'Premium', price: 9.99, taskDuration: '20 dəqiqə', features: ['20 dəqiqəyə qədər tapşırıqlar', 'Premium dəstək', 'Prioritet sırası'] },
    pro: { name: 'Pro', price: 19.99, taskDuration: '30 dəqiqə', features: ['30 dəqiqəyə qədər tapşırıqlar', 'VIP dəstək', 'Eksklüziv tapşırıqlar'] },
  },
  taskPricing: {
    minimum: 2,
    creationFee: 1,
    categories: {
      'data-entry': { min: 2, max: 10, avg: 5 },
      'translation': { min: 10, max: 50, avg: 25 },
      'social-media': { min: 3, max: 15, avg: 8 },
      'surveys': { min: 2, max: 8, avg: 4 },
      'typing': { min: 3, max: 12, avg: 6 },
    },
  },
  paymentInfo: {
    methods: ['Bank kartı', 'Visa', 'Mastercard', 'American Express'],
    withdrawalTime: '24-48 saat',
    minimumWithdrawal: 10,
    security: '3D Secure',
  },
  taskRules: {
    completionDeadline: 'Tapşırıq müddəti bitənə qədər tamamlanmalıdır',
    qualityStandards: 'Keyfiyyət standartlarına uyğun olmalıdır',
    paymentProcessing: 'Avtomatik ödəniş 24 saat içində',
  },
};

export function Support({ language, onNavigate }: SupportProps) {
  const t = translations[language];
  const [activeTab, setActiveTab] = useState<'report' | 'messages'>('report');
  const [selectedProblem, setSelectedProblem] = useState('');
  const [description, setDescription] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  // localStorage-dan mesajları yüklə
  useEffect(() => {
    const savedMessages = localStorage.getItem('supportMessages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  // Mesajları localStorage-a yaz
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('supportMessages', JSON.stringify(messages));
    }
  }, [messages]);

  const problemTypes = [
    { id: 'payment', label: t.payment, icon: '💳' },
    { id: 'account', label: t.account, icon: '👤' },
    { id: 'tasks', label: t.tasks, icon: '📋' },
    { id: 'technical', label: t.technical, icon: '⚙️' },
    { id: 'other', label: t.other, icon: '❓' },
  ];

  // Ağıllı AI cavab generatoru - proqram məlumatlarına əsasən
  const generateSmartAIResponse = (problemType: string, description: string, language: Language): string => {
    const lowerDesc = description.toLowerCase();
    
    // Abunəlik sualları
    if (lowerDesc.includes('abunə') || lowerDesc.includes('subscription') || lowerDesc.includes('premium') || lowerDesc.includes('pro') || lowerDesc.includes('basic')) {
      const plans = APP_KNOWLEDGE_BASE.subscriptionPlans;
      const responses = {
        az: `Abunəlik planları: Basic (${plans.basic.price} AZN - ${plans.basic.taskDuration}), Premium (${plans.premium.price} AZN - ${plans.premium.taskDuration} tapşırıqlar), Pro (${plans.pro.price} AZN - ${plans.pro.taskDuration} tapşırıqlar). Abunəlik statusunuzu Settings → Subscriptions bölməsindən dəyişə bilərsiniz.`,
        en: `Subscription plans: Basic ($${plans.basic.price} - ${plans.basic.taskDuration}), Premium ($${plans.premium.price} - ${plans.premium.taskDuration} tasks), Pro ($${plans.pro.price} - ${plans.pro.taskDuration} tasks). You can change your subscription status from Settings → Subscriptions.`,
        ru: `Планы подписки: Basic (${plans.basic.price} - ${plans.basic.taskDuration}), Premium (${plans.premium.price} - ${plans.premium.taskDuration} задач), Pro (${plans.pro.price} - ${plans.pro.taskDuration} задач). Вы можете изменить статус подписки в Settings → Subscriptions.`,
        tr: `Abonelik planları: Basic (${plans.basic.price} TL - ${plans.basic.taskDuration}), Premium (${plans.premium.price} TL - ${plans.premium.taskDuration} görevler), Pro (${plans.pro.price} TL - ${plans.pro.taskDuration} görevler). Abonelik durumunuzu Settings → Subscriptions'dan değiştirebilirsiniz.`,
        de: `Abonnementpläne: Basic (${plans.basic.price} € - ${plans.basic.taskDuration}), Premium (${plans.premium.price} € - ${plans.premium.taskDuration} Aufgaben), Pro (${plans.pro.price} € - ${plans.pro.taskDuration} Aufgaben). Sie können Ihren Abonnementstatus unter Settings → Subscriptions ändern.`,
        fr: `Plans d'abonnement: Basic (${plans.basic.price} € - ${plans.basic.taskDuration}), Premium (${plans.premium.price} € - ${plans.premium.taskDuration} tâches), Pro (${plans.pro.price} € - ${plans.pro.taskDuration} tâches). Vous pouvez modifier votre statut d'abonnement depuis Settings → Subscriptions.`,
        es: `Planes de suscripción: Basic ($${plans.basic.price} - ${plans.basic.taskDuration}), Premium ($${plans.premium.price} - ${plans.premium.taskDuration} tareas), Pro ($${plans.pro.price} - ${plans.pro.taskDuration} tareas). Puede cambiar su estado de suscripción desde Settings → Subscriptions.`,
        ar: `خطط الاشتراك: Basic (${plans.basic.price} - ${plans.basic.taskDuration})، Premium (${plans.premium.price} - ${plans.premium.taskDuration} مهام)، Pro (${plans.pro.price} - ${plans.pro.taskDuration} مهام). يمكنك تغيير حالة الاشتراك من Settings → Subscriptions.`,
      };
      return responses[language] || responses.en;
    }

    // Qiymət sualları
    if (lowerDesc.includes('qiymət') || lowerDesc.includes('price') || lowerDesc.includes('cost') || lowerDesc.includes('fee') || lowerDesc.includes('ödəniş')) {
      const pricing = APP_KNOWLEDGE_BASE.taskPricing;
      const responses = {
        az: `Tapşırıq qiymətləri minimum $${pricing.minimum}-dən başlayır. Tapşırıq yaratmaq üçün $${pricing.creationFee} ödəniş lazımdır. Kateqoriyalara görə: Data Entry ($${pricing.categories['data-entry'].min}-$${pricing.categories['data-entry'].max}), Tərcümə ($${pricing.categories.translation.min}-$${pricing.categories.translation.max}), Sosial Media ($${pricing.categories['social-media'].min}-$${pricing.categories['social-media'].max}).`,
        en: `Task prices start from minimum $${pricing.minimum}. Creating a task requires $${pricing.creationFee} payment. By categories: Data Entry ($${pricing.categories['data-entry'].min}-$${pricing.categories['data-entry'].max}), Translation ($${pricing.categories.translation.min}-$${pricing.categories.translation.max}), Social Media ($${pricing.categories['social-media'].min}-$${pricing.categories['social-media'].max}).`,
        ru: `Цены на задачи начинаются от $${pricing.minimum}. Создание задачи требует оплату $${pricing.creationFee}. По категориям: Ввод данных ($${pricing.categories['data-entry'].min}-$${pricing.categories['data-entry'].max}), Перевод ($${pricing.categories.translation.min}-$${pricing.categories.translation.max}), Соцсети ($${pricing.categories['social-media'].min}-$${pricing.categories['social-media'].max}).`,
        tr: `Görev fiyatları minimum $${pricing.minimum}'den başlar. Görev oluşturmak $${pricing.creationFee} ödeme gerektirir. Kategorilere göre: Veri Girişi ($${pricing.categories['data-entry'].min}-$${pricing.categories['data-entry'].max}), Çeviri ($${pricing.categories.translation.min}-$${pricing.categories.translation.max}), Sosyal Medya ($${pricing.categories['social-media'].min}-$${pricing.categories['social-media'].max}).`,
        de: `Aufgabenpreise beginnen ab $${pricing.minimum}. Das Erstellen einer Aufgabe erfordert eine Zahlung von $${pricing.creationFee}. Nach Kategorien: Dateneingabe ($${pricing.categories['data-entry'].min}-$${pricing.categories['data-entry'].max}), Übersetzung ($${pricing.categories.translation.min}-$${pricing.categories.translation.max}), Social Media ($${pricing.categories['social-media'].min}-$${pricing.categories['social-media'].max}).`,
        fr: `Les prix des tâches commencent à partir de $${pricing.minimum}. La création d'une tâche nécessite un paiement de $${pricing.creationFee}. Par catégories: Saisie de données ($${pricing.categories['data-entry'].min}-$${pricing.categories['data-entry'].max}), Traduction ($${pricing.categories.translation.min}-$${pricing.categories.translation.max}), Réseaux sociaux ($${pricing.categories['social-media'].min}-$${pricing.categories['social-media'].max}).`,
        es: `Los precios de las tareas comienzan desde $${pricing.minimum}. Crear una tarea requiere un pago de $${pricing.creationFee}. Por categorías: Entrada de datos ($${pricing.categories['data-entry'].min}-$${pricing.categories['data-entry'].max}), Traducción ($${pricing.categories.translation.min}-$${pricing.categories.translation.max}), Redes sociales ($${pricing.categories['social-media'].min}-$${pricing.categories['social-media'].max}).`,
        ar: `تبدأ أسعار المهام من $${pricing.minimum} كحد أدنى. يتطلب إنشاء مهمة دفع $${pricing.creationFee}. حسب الفئات: إدخال البيانات ($${pricing.categories['data-entry'].min}-$${pricing.categories['data-entry'].max})، الترجمة ($${pricing.categories.translation.min}-$${pricing.categories.translation.max})، وسائل التواصل ($${pricing.categories['social-media'].min}-$${pricing.categories['social-media'].max}).`,
      };
      return responses[language] || responses.en;
    }

    // Çıxarış/Pul köçürmə sualları
    if (lowerDesc.includes('çıxarış') || lowerDesc.includes('withdrawal') || lowerDesc.includes('transfer') || lowerDesc.includes('köçür')) {
      const payment = APP_KNOWLEDGE_BASE.paymentInfo;
      const responses = {
        az: `Minimum çıxarış məbləği $${payment.minimumWithdrawal}-dır. Pul köçürmə ${payment.withdrawalTime} içində həyata keçirilir. Ödəniş üsulları: ${payment.methods.join(', ')}. Təhlükəsizlik üçün ${payment.security} tələb olunur. Wallet səhifəsindən pul köçürə və kart əlavə edə bilərsiniz.`,
        en: `Minimum withdrawal amount is $${payment.minimumWithdrawal}. Money transfer takes ${payment.withdrawalTime}. Payment methods: ${payment.methods.join(', ')}. ${payment.security} is required for security. You can transfer money and add cards from the Wallet page.`,
        ru: `Минимальная сумма вывода составляет $${payment.minimumWithdrawal}. Перевод денег занимает ${payment.withdrawalTime}. Способы оплаты: ${payment.methods.join(', ')}. Для безопасности требуется ${payment.security}. Вы можете переводить деньги и добавлять карты со страницы Wallet.`,
        tr: `Minimum çekim tutarı $${payment.minimumWithdrawal}'dir. Para transferi ${payment.withdrawalTime} sürer. Ödeme yöntemleri: ${payment.methods.join(', ')}. Güvenlik için ${payment.security} gereklidir. Wallet sayfasından para transfer edebilir ve kart ekleyebilirsiniz.`,
        de: `Der Mindestauszahlungsbetrag beträgt $${payment.minimumWithdrawal}. Geldtransfer dauert ${payment.withdrawalTime}. Zahlungsmethoden: ${payment.methods.join(', ')}. ${payment.security} ist aus Sicherheitsgründen erforderlich. Sie können Geld überweisen und Karten von der Wallet-Seite hinzufügen.`,
        fr: `Le montant minimum de retrait est de $${payment.minimumWithdrawal}. Le transfert d'argent prend ${payment.withdrawalTime}. Méthodes de paiement: ${payment.methods.join(', ')}. ${payment.security} est requis pour la sécurité. Vous pouvez transférer de l'argent et ajouter des cartes depuis la page Wallet.`,
        es: `La cantidad mínima de retiro es $${payment.minimumWithdrawal}. La transferencia de dinero toma ${payment.withdrawalTime}. Métodos de pago: ${payment.methods.join(', ')}. Se requiere ${payment.security} para seguridad. Puede transferir dinero y agregar tarjetas desde la página Wallet.`,
        ar: `الحد الأدنى لمبلغ السحب هو $${payment.minimumWithdrawal}. يستغرق تحويل الأموال ${payment.withdrawalTime}. طرق الدفع: ${payment.methods.join(', ')}. ${payment.security} مطلوب للأمان. يمكنك تحويل الأموال وإضافة البطاقات من صفحة Wallet.`,
      };
      return responses[language] || responses.en;
    }

    // Tapşırıq qaydaları
    if (lowerDesc.includes('tapşırıq') || lowerDesc.includes('task') || lowerDesc.includes('müddət') || lowerDesc.includes('deadline') || lowerDesc.includes('tamamla')) {
      const rules = APP_KNOWLEDGE_BASE.taskRules;
      const responses = {
        az: `Tapşırıq qaydaları: ${rules.completionDeadline}. ${rules.qualityStandards}. ${rules.paymentProcessing}. Tapşırıqları Extra Work səhifəsindən tapa bilərsiniz. Öz tapşırıqlarınızı isə Post Job bölməsindən yarada bilərsiniz.`,
        en: `Task rules: ${rules.completionDeadline}. ${rules.qualityStandards}. ${rules.paymentProcessing}. You can find tasks from the Extra Work page. You can create your own tasks from the Post Job section.`,
        ru: `Правила задач: ${rules.completionDeadline}. ${rules.qualityStandards}. ${rules.paymentProcessing}. Вы можете найти задачи на странице Extra Work. Создавать свои задачи можно в разделе Post Job.`,
        tr: `Görev kuralları: ${rules.completionDeadline}. ${rules.qualityStandards}. ${rules.paymentProcessing}. Görevleri Extra Work sayfasından bulabilirsiniz. Kendi görevlerinizi Post Job bölümünden oluşturabilirsiniz.`,
        de: `Aufgabenregeln: ${rules.completionDeadline}. ${rules.qualityStandards}. ${rules.paymentProcessing}. Sie können Aufgaben auf der Extra Work-Seite finden. Sie können Ihre eigenen Aufgaben im Abschnitt Post Job erstellen.`,
        fr: `Règles des tâches: ${rules.completionDeadline}. ${rules.qualityStandards}. ${rules.paymentProcessing}. Vous pouvez trouver des tâches sur la page Extra Work. Vous pouvez créer vos propres tâches dans la section Post Job.`,
        es: `Reglas de tareas: ${rules.completionDeadline}. ${rules.qualityStandards}. ${rules.paymentProcessing}. Puede encontrar tareas en la página Extra Work. Puede crear sus propias tareas en la sección Post Job.`,
        ar: `قواعد المهام: ${rules.completionDeadline}. ${rules.qualityStandards}. ${rules.paymentProcessing}. يمكنك العثور على المهام من صفحة Extra Work. يمكنك إنشاء مهامك الخاصة من قسم Post Job.`,
      };
      return responses[language] || responses.en;
    }

    // Standart cavablar
    const responses = {
      payment: {
        az: [
          "Ödəniş problemini araşdırırıq. Əksər hallarda 24 saat içində həll olunur. Kartınızın aktiv olduğundan əmin olun.",
          "Ödəniş uğursuz olarsa, balansınızı yoxlayın və yenidən cəhd edin. Dəstək komandası köməyə hazırdır.",
          "Bank kartınızla bağlı problem olarsa, kartı yeniləyin və ya başqa kart əlavə edin. Təhlükəsizlik üçün 3D Secure aktiv olmalıdır."
        ],
        en: [
          "We're investigating the payment issue. Most cases are resolved within 24 hours. Please ensure your card is active.",
          "If payment fails, check your balance and try again. Our support team is ready to help.",
          "For card-related issues, update your card or add a new one. Make sure 3D Secure is enabled for security."
        ],
        ru: [
          "Мы расследуем проблему с платежом. Большинство случаев решается в течение 24 часов. Убедитесь, что ваша карта активна.",
          "Если платеж не прошел, проверьте баланс и попробуйте снова. Наша команда поддержки готова помочь.",
          "При проблемах с картой обновите ее или добавьте новую. Убедитесь, что 3D Secure включен для безопасности."
        ],
        tr: [
          "Ödeme sorununu araştırıyoruz. Çoğu durum 24 saat içinde çözülür. Kartınızın aktif olduğundan emin olun.",
          "Ödeme başarısız olursa bakiyenizi kontrol edin ve tekrar deneyin. Destek ekibimiz yardıma hazır.",
          "Kartla ilgili sorunlar için kartınızı güncelleyin veya yeni kart ekleyin. Güvenlik için 3D Secure aktif olmalıdır."
        ],
        de: [
          "Wir untersuchen das Zahlungsproblem. Die meisten Fälle werden innerhalb von 24 Stunden gelöst. Stellen Sie sicher, dass Ihre Karte aktiv ist.",
          "Wenn die Zahlung fehlschlägt, überprüfen Sie Ihr Guthaben und versuchen Sie es erneut. Unser Support-Team ist bereit zu helfen.",
          "Bei kartenbezogenen Problemen aktualisieren Sie Ihre Karte oder fügen Sie eine neue hinzu. Stellen Sie sicher, dass 3D Secure für die Sicherheit aktiviert ist."
        ],
        fr: [
          "Nous enquêtons sur le problème de paiement. La plupart des cas sont résolus en 24 heures. Assurez-vous que votre carte est active.",
          "Si le paiement échoue, vérifiez votre solde et réessayez. Notre équipe d'assistance est prête à vous aider.",
          "Pour les problèmes liés à la carte, mettez à jour votre carte ou ajoutez-en une nouvelle. Assurez-vous que 3D Secure est activé pour la sécurité."
        ],
        es: [
          "Estamos investigando el problema de pago. La mayoría de los casos se resuelven en 24 horas. Asegúrese de que su tarjeta esté activa.",
          "Si el pago falla, verifique su saldo e intente nuevamente. Nuestro equipo de soporte está listo para ayudar.",
          "Para problemas relacionados con la tarjeta, actualice su tarjeta o agregue una nueva. Asegúrese de que 3D Secure esté habilitado para mayor seguridad."
        ],
        ar: [
          "نحن نحقق في مشكلة الدفع. يتم حل معظم الحالات في غضون 24 ساعة. يرجى التأكد من أن بطاقتك نشطة.",
          "إذا فشل الدفع، تحقق من رصيدك وحاول مرة أخرى. فريق الدعم لدينا جاهز للمساعدة.",
          "لمشاكل البطاقة، قم بتحديث بطاقتك أو إضافة بطاقة جديدة. تأكد من تفعيل 3D Secure للأمان."
        ]
      },
      account: {
        az: [
          "Hesab təhlükəsizliyi üçün şifrənizi dəyişməyi tövsiyə edirik. 2-faktorlu autentifikasiya aktiv edin.",
          "Hesabınıza giriş problemi olarsa, 'Şifrəni unutdum' seçimindən istifadə edin. E-poçtunuzu yoxlayın.",
          "Hesab məlumatlarınız qorunur. Şəxsi məlumatları heç kimlə paylaşmayın və şübhəli fəaliyyət görürsünüzsə dərhal bildirin."
        ],
        en: [
          "For account security, we recommend changing your password. Enable two-factor authentication.",
          "If you have login issues, use the 'Forgot Password' option. Check your email.",
          "Your account information is protected. Don't share personal details with anyone and report suspicious activity immediately."
        ],
        ru: [
          "Для безопасности аккаунта рекомендуем сменить пароль. Включите двухфакторную аутентификацию.",
          "При проблемах со входом используйте опцию 'Забыли пароль'. Проверьте свою электронную почту.",
          "Информация вашего аккаунта защищена. Не делитесь личными данными ни с кем и немедленно сообщайте о подозрительной активности."
        ],
        tr: [
          "Hesap güvenliği için şifrenizi değiştirmenizi öneririz. İki faktörlü kimlik doğrulamayı etkinleştirin.",
          "Giriş sorunları için 'Şifremi Unuttum' seçeneğini kullanın. E-postanızı kontrol edin.",
          "Hesap bilgileriniz korunmaktadır. Kişisel bilgilerinizi kimseyle paylaşmayın ve şüpheli aktivite görürseniz hemen bildirin."
        ],
        de: [
          "Für die Kontosicherheit empfehlen wir, Ihr Passwort zu ändern. Aktivieren Sie die Zwei-Faktor-Authentifizierung.",
          "Bei Anmeldeproblemen verwenden Sie die Option 'Passwort vergessen'. Überprüfen Sie Ihre E-Mail.",
          "Ihre Kontoinformationen sind geschützt. Teilen Sie persönliche Daten mit niemandem und melden Sie verdächtige Aktivitäten sofort."
        ],
        fr: [
          "Pour la sécurité du compte, nous recommandons de changer votre mot de passe. Activez l'authentification à deux facteurs.",
          "En cas de problèmes de connexion, utilisez l'option 'Mot de passe oublié'. Vérifiez votre email.",
          "Les informations de votre compte sont protégées. Ne partagez pas vos données personnelles et signalez immédiatement toute activité suspecte."
        ],
        es: [
          "Para la seguridad de la cuenta, recomendamos cambiar su contraseña. Active la autenticación de dos factores.",
          "Si tiene problemas de inicio de sesión, use la opción 'Olvidé mi contraseña'. Revise su correo electrónico.",
          "La información de su cuenta está protegida. No comparta datos personales con nadie e informe inmediatamente de actividad sospechosa."
        ],
        ar: [
          "لأمان الحساب، نوصي بتغيير كلمة المرور الخاصة بك. قم بتفعيل المصادقة الثنائية.",
          "إذا كانت لديك مشاكل في تسجيل الدخول، استخدم خيار 'نسيت كلمة المرور'. تحقق من بريدك الإلكتروني.",
          "معلومات حسابك محمية. لا تشارك التفاصيل الشخصية مع أي شخص وأبلغ عن أي نشاط مشبوه على الفور."
        ]
      },
      tasks: {
        az: [
          "Tapşırıq problemi üçün təşəkkür edirik. Tapşırıq şərtlərini diqqətlə oxuyun. Müddət bitməmiş tamamlayın.",
          "Tapşırıq qəbul edilməyibsə, keyfiyyət standartlarına uyğun olduğundan əmin olun. Düzgün təlimatları izləyin.",
          "Tapşırıqların ödənişi avtomatik həyata keçirilir. Gecikmə olarsa, 24 saat gözləyin və ya dəstəklə əlaqə saxlayın."
        ],
        en: [
          "Thank you for the task issue. Read task requirements carefully. Complete before the deadline.",
          "If the task isn't accepted, ensure it meets quality standards. Follow the correct instructions.",
          "Task payments are processed automatically. If delayed, wait 24 hours or contact support."
        ],
        ru: [
          "Спасибо за сообщение о проблеме с заданием. Внимательно читайте требования. Завершите до истечения срока.",
          "Если задание не принято, убедитесь, что оно соответствует стандартам качества. Следуйте правильным инструкциям.",
          "Платежи за задания обрабатываются автоматически. При задержке подождите 24 часа или обратитесь в поддержку."
        ],
        tr: [
          "Görev sorunu için teşekkürler. Görev gereksinimlerini dikkatlice okuyun. Son tarihten önce tamamlayın.",
          "Görev kabul edilmediyse, kalite standartlarına uygun olduğundan emin olun. Doğru talimatları izleyin.",
          "Görev ödemeleri otomatik işlenir. Gecikme varsa 24 saat bekleyin veya desteğe başvurun."
        ],
        de: [
          "Vielen Dank für das Aufgabenproblem. Lesen Sie die Aufgabenanforderungen sorgfältig. Abschluss vor der Deadline.",
          "Wenn die Aufgabe nicht akzeptiert wird, stellen Sie sicher, dass sie den Qualitätsstandards entspricht. Folgen Sie den richtigen Anweisungen.",
          "Aufgabenzahlungen werden automatisch verarbeitet. Bei Verzögerung warten Sie 24 Stunden oder kontaktieren Sie den Support."
        ],
        fr: [
          "Merci pour le problème de tâche. Lisez attentivement les exigences. Terminez avant la date limite.",
          "Si la tâche n'est pas acceptée, assurez-vous qu'elle répond aux normes de qualité. Suivez les bonnes instructions.",
          "Les paiements des tâches sont traités automatiquement. En cas de retard, attendez 24 heures ou contactez le support."
        ],
        es: [
          "Gracias por el problema de la tarea. Lea atentamente los requisitos. Complete antes de la fecha límite.",
          "Si la tarea no se acepta, asegúrese de que cumple con los estándares de calidad. Siga las instrucciones correctas.",
          "Los pagos de tareas se procesan automáticamente. Si se retrasa, espere 24 horas o contacte con soporte."
        ],
        ar: [
          "شكراً لك على مشكلة المهمة. اقرأ متطلبات المهمة بعناية. أكمل قبل الموعد النهائي.",
          "إذا لم يتم قبول المهمة، تأكد من أنها تلبي معايير الجودة. اتبع التعليمات الصحيحة.",
          "يتم معالجة مدفوعات المهام تلقائياً. في حالة التأخير، انتظر 24 ساعة أو اتصل بالدعم."
        ]
      },
      technical: {
        az: [
          "Texniki problem üçün üzr istəyirik. Tətbiqi yeniləyin və yenidən cəhd edin. Cache-i təmizləməyi yoxlayın.",
          "Əgər problem davam edərsə, tətbiqi silmədən yenidən quraşdırın. Mobil məlumatları silməyin.",
          "Server yeniləməsi zamanı qısa müddətli problem ola bilər. 1 saat sonra yenidən cəhd edin."
        ],
        en: [
          "Sorry for the technical issue. Update the app and try again. Check clearing cache.",
          "If the problem persists, reinstall the app without deleting. Don't clear mobile data.",
          "Brief issues may occur during server updates. Try again in 1 hour."
        ],
        ru: [
          "Извините за техническую проблему. Обновите приложение и попробуйте снова. Попробуйте очистить кеш.",
          "Если проблема не исчезает, переустановите приложение без удаления. Не очищайте мобильные данные.",
          "Возможны кратковременные проблемы во время обновления сервера. Попробуйте через 1 час."
        ],
        tr: [
          "Teknik sorun için özür dileriz. Uygulamayı güncelleyin ve tekrar deneyin. Önbelleği temizlemeyi kontrol edin.",
          "Sorun devam ederse, uygulamayı silmeden yeniden yükleyin. Mobil verileri silmeyin.",
          "Sunucu güncellemeleri sırasında kısa süreli sorunlar olabilir. 1 saat sonra tekrar deneyin."
        ],
        de: [
          "Entschuldigung für das technische Problem. Aktualisieren Sie die App und versuchen Sie es erneut. Überprüfen Sie das Löschen des Cache.",
          "Wenn das Problem weiterhin besteht, installieren Sie die App neu, ohne sie zu löschen. Löschen Sie keine mobilen Daten.",
          "Während Server-Updates können kurze Probleme auftreten. Versuchen Sie es in 1 Stunde erneut."
        ],
        fr: [
          "Désolé pour le problème technique. Mettez à jour l'application et réessayez. Vérifiez le nettoyage du cache.",
          "Si le problème persiste, réinstallez l'application sans la supprimer. Ne supprimez pas les données mobiles.",
          "Des problèmes brefs peuvent survenir lors des mises à jour du serveur. Réessayez dans 1 heure."
        ],
        es: [
          "Disculpe el problema técnico. Actualice la aplicación e inténtelo de nuevo. Verifique limpiar el caché.",
          "Si el problema persiste, reinstale la aplicación sin eliminar. No borre los datos móviles.",
          "Pueden ocurrir problemas breves durante las actualizaciones del servidor. Inténtelo de nuevo en 1 hora."
        ],
        ar: [
          "عذراً على المشكلة التقنية. قم بتحديث التطبيق وحاول مرة أخرى. تحقق من مسح الذاكرة المؤقتة.",
          "إذا استمرت المشكلة، أعد تثبيت التطبيق دون الحذف. لا تمسح بيانات الهاتف.",
          "قد تحدث مشاكل مؤقتة أثناء تحديثات الخادم. حاول مرة أخرى بعد ساعة واحدة."
        ]
      },
      other: {
        az: [
          "Probleminizi qeyd etdiyimiz üçün təşəkkür edirik. Dəstək komandası 24 saat içində cavab verəcək.",
          "Ətraflı məlumat üçün FAQ bölməsini yoxlayın. Daha çox sual olarsa bizimlə əlaqə saxlayın.",
          "Sizin rəyiniz bizim üçün dəyərlidir. Xidməti təkmilləşdirmək üçün çalışırıq."
        ],
        en: [
          "Thank you for reporting your issue. Support team will respond within 24 hours.",
          "Check FAQ section for detailed information. Contact us if you have more questions.",
          "Your feedback is valuable to us. We're working to improve the service."
        ],
        ru: [
          "Спасибо за сообщение о проблеме. Команда поддержки ответит в течение 24 часов.",
          "Проверьте раздел FAQ для подробной информации. Свяжитесь с нами, если у вас есть еще вопросы.",
          "Ваш отзыв ценен для нас. Мы работаем над улучшением сервиса."
        ],
        tr: [
          "Sorununuzu bildirdiğiniz için teşekkürler. Destek ekibi 24 saat içinde yanıt verecek.",
          "Detaylı bilgi için SSS bölümünü kontrol edin. Daha fazla sorunuz varsa bizimle iletişime geçin.",
          "Geri bildiriminiz bizim için değerlidir. Hizmeti geliştirmek için çalışıyoruz."
        ],
        de: [
          "Vielen Dank für die Meldung Ihres Problems. Das Support-Team wird innerhalb von 24 Stunden antworten.",
          "Überprüfen Sie den FAQ-Bereich für detaillierte Informationen. Kontaktieren Sie uns bei weiteren Fragen.",
          "Ihr Feedback ist uns wichtig. Wir arbeiten an der Verbesserung des Service."
        ],
        fr: [
          "Merci d'avoir signalé votre problème. L'équipe de support répondra dans les 24 heures.",
          "Consultez la section FAQ pour des informations détaillées. Contactez-nous si vous avez d'autres questions.",
          "Votre avis est précieux pour nous. Nous travaillons à améliorer le service."
        ],
        es: [
          "Gracias por reportar su problema. El equipo de soporte responderá en 24 horas.",
          "Consulte la sección de preguntas frecuentes para información detallada. Contáctenos si tiene más preguntas.",
          "Su opinión es valiosa para nosotros. Estamos trabajando para mejorar el servicio."
        ],
        ar: [
          "شكراً لك على الإبلاغ عن مشكلتك. سيرد فريق الدعم في غضون 24 ساعة.",
          "تحقق من قسم الأسئلة الشائعة للحصول على معلومات مفصلة. اتصل بنا إذا كان لديك المزيد من الأسئلة.",
          "رأيك قيم بالنسبة لنا. نحن نعمل على تحسين الخدمة."
        ]
      }
    };

    const typeResponses = responses[problemType as keyof typeof responses] || responses.other;
    const langResponses = typeResponses[language] || typeResponses.en;
    const randomIndex = Math.floor(Math.random() * langResponses.length);
    return langResponses[randomIndex];
  };

  const handleSubmit = () => {
    if (!selectedProblem || !description.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      type: selectedProblem,
      description: description,
      date: new Date().toISOString().split('T')[0],
      status: 'pending',
      aiReplies: [],
    };

    setMessages([newMessage, ...messages]);
    setShowSuccess(true);
    setSelectedProblem('');
    setDescription('');

    // AI cavab generasiya et və mesaja əlavə et
    setTimeout(() => {
      const aiResponse = generateSmartAIResponse(selectedProblem, description, language);
      
      // AI cavabını mesaja əlavə et
      setMessages(prevMessages => 
        prevMessages.map(msg => 
          msg.id === newMessage.id 
            ? { 
                ...msg, 
                aiReplies: [
                  {
                    id: `ai-${Date.now()}`,
                    text: aiResponse,
                    timestamp: new Date().toISOString(),
                  }
                ] 
              }
            : msg
        )
      );

      // Bildiriş göstər
      toast.success(t.aiResponse, {
        description: aiResponse,
        duration: 8000,
      });
    }, 1500);

    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate('settings')}
            className="p-2 hover:bg-white rounded-lg transition-colors"
          >
            <ChevronLeft size={24} className="text-gray-700" />
          </button>
          <h1 className="text-gray-800">{t.support}</h1>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl p-2 shadow-lg flex gap-2">
          <button
            onClick={() => setActiveTab('report')}
            className={`flex-1 py-3 rounded-xl transition-all ${
              activeTab === 'report'
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <AlertCircle size={20} />
              <span>Report</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`flex-1 py-3 rounded-xl transition-all ${
              activeTab === 'messages'
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <MessageSquare size={20} />
              <span>{t.messages}</span>
            </div>
          </button>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="bg-green-100 border-2 border-green-300 text-green-700 px-4 py-3 rounded-xl flex items-center gap-2 animate-pulse">
            <CheckCircle size={20} />
            <span>{t.success}</span>
          </div>
        )}

        {/* Content */}
        {activeTab === 'report' ? (
          <div className="bg-white rounded-3xl p-6 shadow-xl space-y-6">
            {/* Problem Type Selection */}
            <div>
              <h3 className="text-gray-800 mb-4">{t.selectProblem}</h3>
              <div className="space-y-2">
                {problemTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedProblem(type.id)}
                    className={`w-full p-4 rounded-xl border-2 transition-all text-left flex items-center gap-3 ${
                      selectedProblem === type.id
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-2xl">{type.icon}</span>
                    <span className="text-gray-700">{type.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-gray-800 mb-4">{t.describe}</h3>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t.placeholder}
                rows={5}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={!selectedProblem || !description.trim()}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl py-4 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <Send size={20} />
              <span>{t.submit}</span>
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-6 shadow-xl">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <MessageSquare size={48} className="mx-auto mb-4 text-gray-300" />
                <p>{t.noMessages}</p>
              </div>
            ) : (
              <div className="space-y-6">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className="border-2 border-gray-200 rounded-2xl p-4 hover:border-purple-300 transition-all space-y-4"
                  >
                    {/* İstifadəçi mesajı */}
                    <div className="flex items-start gap-3">
                      <div className="bg-purple-100 p-2 rounded-full flex-shrink-0">
                        <UserIcon size={20} className="text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-700">{t.you}</span>
                            <span className="text-2xl">
                              {problemTypes.find((p) => p.id === msg.type)?.icon}
                            </span>
                            <span className="text-sm text-gray-500">
                              {problemTypes.find((p) => p.id === msg.type)?.label}
                            </span>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs flex-shrink-0 ${
                              msg.status === 'resolved'
                                ? 'bg-green-100 text-green-600'
                                : 'bg-yellow-100 text-yellow-600'
                            }`}
                          >
                            {msg.status === 'resolved' ? '✓ Resolved' : 'Pending'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{msg.description}</p>
                        <p className="text-xs text-gray-400">{msg.date}</p>
                      </div>
                    </div>

                    {/* AI cavabları */}
                    {msg.aiReplies && msg.aiReplies.length > 0 && (
                      <div className="ml-6 space-y-3 border-l-2 border-purple-200 pl-4">
                        {msg.aiReplies.map((reply) => (
                          <div key={reply.id} className="flex items-start gap-3">
                            <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-full flex-shrink-0">
                              <Bot size={18} className="text-white" />
                            </div>
                            <div className="flex-1 bg-purple-50 rounded-xl p-3">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-sm text-purple-700">{t.aiAssistant}</span>
                                <span className="text-xs text-gray-400">
                                  {new Date(reply.timestamp).toLocaleTimeString(language, { 
                                    hour: '2-digit', 
                                    minute: '2-digit' 
                                  })}
                                </span>
                              </div>
                              <p className="text-sm text-gray-700 leading-relaxed">{reply.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
