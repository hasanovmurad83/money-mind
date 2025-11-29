import { useState, useEffect, useRef } from 'react';
import { Language } from '../App';
import { MessageCircle, X, Send, Bot } from 'lucide-react';

interface ChatbotProps {
  language: Language;
}

const translations = {
  az: {
    askQuestion: 'Sualınızı yazın...',
    send: 'Göndər',
    chatbot: 'AI Kömək Botu',
    welcome: 'Salam! Mən sizin AI köməkçinizəm. Tapşırıqlar, abunəliklər və s. haqqında sual verə bilərsiniz.',
    typing: 'Yazır...',
  },
  en: {
    askQuestion: 'Type your question...',
    send: 'Send',
    chatbot: 'AI Help Bot',
    welcome: 'Hello! I\'m your AI assistant. You can ask about tasks, subscriptions, and more.',
    typing: 'Typing...',
  },
  ru: {
    askQuestion: 'Напишите ваш вопрос...',
    send: 'Отправить',
    chatbot: 'AI Помощник',
    welcome: 'Здравствуйте! Я ваш AI-помощник. Вы можете спросить о задачах, подписках и многом другом.',
    typing: 'Печатает...',
  },
  tr: {
    askQuestion: 'Sorunuzu yazın...',
    send: 'Gönder',
    chatbot: 'AI Yardım Botu',
    welcome: 'Merhaba! Ben AI asistanınızım. Görevler, abonelikler ve daha fazlası hakkında sorabilirsiniz.',
    typing: 'Yazıyor...',
  },
  de: {
    askQuestion: 'Geben Sie Ihre Frage ein...',
    send: 'Senden',
    chatbot: 'AI Hilfe-Bot',
    welcome: 'Hallo! Ich bin Ihr AI-Assistent. Sie können nach Aufgaben, Abonnements und mehr fragen.',
    typing: 'Tippt...',
  },
  fr: {
    askQuestion: 'Tapez votre question...',
    send: 'Envoyer',
    chatbot: 'Bot d\'Aide AI',
    welcome: 'Bonjour! Je suis votre assistant AI. Vous pouvez poser des questions sur les tâches, les abonnements et plus.',
    typing: 'En train d\'écrire...',
  },
  es: {
    askQuestion: 'Escriba su pregunta...',
    send: 'Enviar',
    chatbot: 'Bot de Ayuda AI',
    welcome: '¡Hola! Soy su asistente AI. Puede preguntar sobre tareas, suscripciones y más.',
    typing: 'Escribiendo...',
  },
  ar: {
    askQuestion: 'اكتب سؤالك...',
    send: 'إرسال',
    chatbot: 'مساعد AI',
    welcome: 'مرحبا! أنا مساعدك AI. يمكنك السؤال عن المهام والاشتراكات والمزيد.',
    typing: 'يكتب...',
  },
};

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

// AI responses database
const getAIResponse = (userInput: string, lang: Language): string => {
  const input = userInput.toLowerCase();
  
  const responses: { [key in Language]: { [key: string]: string } } = {
    az: {
      'salam': 'Salam! Sizə necə kömək edə bilərəm?',
      'tapşırıq': 'Əlavə İş bölməsində müxtəlif onlayn tapşırıqlar tapacaqsınız. Qiymətlər kateqoriyaya görə dəyişir və müraciət etdikdən sonra 10 saniyə ərzində təsdiq olunur. Tapşırıq yaratmaq üçün minimum 2$ və 1$ dərc haqqı lazımdır.',
      'iş': 'Tətbiqdə data daxil etmə, tərcümə, sosial media, sorğu, mətn yazma, video montaj və s. kimi işlər var. Hər iş üçün qiymət və müddət göstərilib.',
      'abunə': 'Üç abunəlik planımız var: Basic (pulsuz), Premium (həftəlik $2.49, aylıq $7.99, illik $79.99) və Pro (həftəlik $4.99, aylıq $14.99, illik $149.99). İllik planlar ən sərfəlidir!',
      'qiymət': 'Tapşırıq qiymətləri kateqoriyaya görə dəyişir: Data daxil etmə və sorğular $2-3, tərcümə və mətn yazma $3-5, video montaj və qrafik dizayn $6-10. Premium və Pro abunəliklərlə daha yüksək gəlir əldə edə bilərsiniz.',
      'ödəniş': 'Pulqabı bölməsində balansınızı görə, depozit əlavə edə və pul çıxara bilərsiniz. Minimum çıxarış məbləği $5-dir.',
      'pul': 'Tapşırıqları tamamlamaqla pul qazana bilərsiniz. Qazancınız dərhal balansınıza əlavə olunur.',
      'tarixçə': 'Tapşırıq Tarixçəsi bölməsində müraciət etdiyiniz işlərin statusunu (gözləyir/tamamlandı/ləğv edildi) görə bilərsiniz.',
      'dil': 'Tətbiq 8 dildə mövcuddur: Azərbaycan, İngilis, Rus, Türk, Alman, Fransız, İspan və Ərəb dilində.',
      'kömək': 'Sizə kömək etməkdən məmnunam! Tapşırıqlar, abunəliklər, ödənişlər və ya digər mövzular haqqında sual verə bilərsiniz.',
      'default': 'Maraqlı sual! Tapşırıqlar, abunəliklər, qiymətlər və ya ödənişlər haqqında daha konkret sual verə bilərsinizmi?'
    },
    en: {
      'hello': 'Hello! How can I help you today?',
      'hi': 'Hi there! What would you like to know?',
      'task': 'In the Extra Work section, you\'ll find various online tasks. Prices start from $1.50 and applications are reviewed within 10 seconds.',
      'work': 'We have data entry, translation, social media, surveys, typing, video editing, and more. Each job shows the price and duration.',
      'subscription': 'We have three plans: Basic (free), Premium (weekly $2.49, monthly $7.99, yearly $79.99), and Pro (weekly $4.99, monthly $14.99, yearly $149.99). Annual plans offer the best value!',
      'price': 'Task prices vary by category: Data entry and surveys $2-3, translation and typing $3-5, video editing and graphic design $6-10. With Premium and Pro subscriptions, you can earn more.',
      'payment': 'In the Wallet section, you can view your balance, add deposits, and withdraw money. Minimum withdrawal is $5.',
      'money': 'You earn money by completing tasks. Your earnings are added to your balance immediately.',
      'history': 'In Task History, you can see the status of your applied jobs (pending/completed/cancelled).',
      'language': 'The app is available in 8 languages: Azerbaijani, English, Russian, Turkish, German, French, Spanish, and Arabic.',
      'help': 'I\'m happy to help! You can ask about tasks, subscriptions, payments, or any other topic.',
      'default': 'Interesting question! Could you be more specific about tasks, subscriptions, prices, or payments?'
    },
    ru: {
      'привет': 'Привет! Чем могу помочь?',
      'задача': 'В разделе "Дополнительная работа" вы найдете различные онлайн-задачи. Цены начинаются от $1.50, заявки рассматриваются в течение 10 секунд.',
      'работа': 'У нас есть ввод данных, переводы, соцсети, опросы, набор текста, видеомонтаж и многое другое. Для каждой работы указана цена и продолжительность.',
      'подписка': 'У нас три плана: Basic (бесплатно), Premium (еженедельно $2.49, ежемесячно $7.99, ежегодно $79.99) и Pro (еженедельно $4.99, ежемесячно $14.99, ежегодно $149.99). Годовые планы самые выгодные!',
      'цена': 'Цены на задачи варьируются от $1.50 до $10. С подписками Premium и Pro вы можете зарабатывать больше.',
      'оплата': 'В разделе "Кошелек" вы можете просмотреть баланс, добавить депозит и вывести деньги. Минимальная сумма вывода $5.',
      'деньги': 'Вы зарабатываете, выполняя задачи. Заработок сразу добавляется на ваш баланс.',
      'история': 'В истории задач вы можете увидеть статус ваших заявок (ожидание/завершено/отменено).',
      'язык': 'Приложение доступно на 8 языках: азербайджанский, английский, русский, турецкий, немецкий, французский, испанский и арабский.',
      'помощь': 'Рад помочь! Вы можете спросить о задачах, подписках, платежах или любой другой теме.',
      'default': 'Интересный вопрос! Можете уточнить о задачах, подписках, ценах или платежах?'
    },
    tr: {
      'merhaba': 'Merhaba! Size nasıl yardımcı olabilirim?',
      'görev': 'Ek İş bölümünde çeşitli online görevler bulacaksınız. Fiyatlar $1.50\'den başlıyor ve başvurular 10 saniye içinde inceleniyor.',
      'iş': 'Veri girişi, çeviri, sosyal medya, anketler, yazma, video düzenleme ve daha fazlası var. Her iş için fiyat ve süre gösterilir.',
      'abonelik': 'Üç planımız var: Basic (ücretsiz), Premium (haftalık $2.49, aylık $7.99, yıllık $79.99) ve Pro (haftalık $4.99, aylık $14.99, yıllık $149.99). Yıllık planlar en avantajlı!',
      'fiyat': 'Görev fiyatları $1.50 ile $10 arasında değişiyor. Premium ve Pro aboneliklerle daha fazla kazanabilirsiniz.',
      'ödeme': 'Cüzdan bölümünde bakiyenizi görüntüleyebilir, para yatırabilir ve çekebilirsiniz. Minimum çekim tutarı $5\'tir.',
      'para': 'Görevleri tamamlayarak para kazanırsınız. Kazancınız hemen bakiyenize eklenir.',
      'geçmiş': 'Görev Geçmişi\'nde başvurduğunuz işlerin durumunu (beklemede/tamamlandı/iptal edildi) görebilirsiniz.',
      'dil': 'Uygulama 8 dilde mevcuttur: Azerice, İngilizce, Rusça, Türkçe, Almanca, Fransızca, İspanyolca ve Arapça.',
      'yardım': 'Yardımcı olmaktan mutluluk duyarım! Görevler, abonelikler, ödemeler veya başka konular hakkında sorabilirsiniz.',
      'default': 'İlginç soru! Görevler, abonelikler, fiyatlar veya ödemeler hakkında daha spesifik olabilir misiniz?'
    },
    de: {
      'hallo': 'Hallo! Wie kann ich Ihnen helfen?',
      'aufgabe': 'Im Bereich "Zusätzliche Arbeit" finden Sie verschiedene Online-Aufgaben. Preise beginnen bei $1.50, Bewerbungen werden innerhalb von 10 Sekunden geprüft.',
      'arbeit': 'Wir haben Dateneingabe, Übersetzung, soziale Medien, Umfragen, Tippen, Videobearbeitung und mehr. Für jede Arbeit sind Preis und Dauer angegeben.',
      'abonnement': 'Wir haben drei Pläne: Basic (kostenlos), Premium (wöchentlich $2.49, monatlich $7.99, jährlich $79.99) und Pro (wöchentlich $4.99, monatlich $14.99, jährlich $149.99). Jahrespläne sind am günstigsten!',
      'preis': 'Aufgabenpreise reichen von $1.50 bis $10. Mit Premium- und Pro-Abonnements können Sie mehr verdienen.',
      'zahlung': 'Im Wallet-Bereich können Sie Ihr Guthaben einsehen, Einzahlungen tätigen und Geld abheben. Mindestauszahlung beträgt $5.',
      'geld': 'Sie verdienen Geld durch das Erledigen von Aufgaben. Ihr Verdienst wird sofort Ihrem Guthaben gutgeschrieben.',
      'verlauf': 'In der Aufgabenhistorie können Sie den Status Ihrer Bewerbungen sehen (ausstehend/abgeschlossen/abgebrochen).',
      'sprache': 'Die App ist in 8 Sprachen verfügbar: Aserbaidschanisch, Englisch, Russisch, Türkisch, Deutsch, Französisch, Spanisch und Arabisch.',
      'hilfe': 'Ich helfe gerne! Sie können nach Aufgaben, Abonnements, Zahlungen oder anderen Themen fragen.',
      'default': 'Interessante Frage! Könnten Sie spezifischer zu Aufgaben, Abonnements, Preisen oder Zahlungen sein?'
    },
    fr: {
      'bonjour': 'Bonjour! Comment puis-je vous aider?',
      'tâche': 'Dans la section Travail Supplémentaire, vous trouverez diverses tâches en ligne. Les prix commencent à $1.50, les candidatures sont examinées en 10 secondes.',
      'travail': 'Nous avons la saisie de données, la traduction, les réseaux sociaux, les sondages, la frappe, le montage vidéo et plus. Chaque travail affiche le prix et la durée.',
      'abonnement': 'Nous avons trois plans: Basic (gratuit), Premium (hebdomadaire $2.49, mensuel $7.99, annuel $79.99) et Pro (hebdomadaire $4.99, mensuel $14.99, annuel $149.99). Les plans annuels sont les plus avantageux!',
      'prix': 'Les prix des tâches varient de $1.50 à $10. Avec les abonnements Premium et Pro, vous pouvez gagner plus.',
      'paiement': 'Dans la section Portefeuille, vous pouvez voir votre solde, ajouter des dépôts et retirer de l\'argent. Le retrait minimum est de $5.',
      'argent': 'Vous gagnez de l\'argent en complétant des tâches. Vos gains sont ajoutés immédiatement à votre solde.',
      'historique': 'Dans l\'historique des tâches, vous pouvez voir le statut de vos candidatures (en attente/terminé/annulé).',
      'langue': 'L\'application est disponible en 8 langues: azerbaïdjanais, anglais, russe, turc, allemand, français, espagnol et arabe.',
      'aide': 'Je suis heureux d\'aider! Vous pouvez poser des questions sur les tâches, les abonnements, les paiements ou tout autre sujet.',
      'default': 'Question intéressante! Pourriez-vous être plus précis sur les tâches, les abonnements, les prix ou les paiements?'
    },
    es: {
      'hola': '¡Hola! ¿Cómo puedo ayudarte?',
      'tarea': 'En la sección de Trabajo Extra, encontrarás varias tareas en línea. Los precios comienzan desde $1.50, las solicitudes se revisan en 10 segundos.',
      'trabajo': 'Tenemos entrada de datos, traducción, redes sociales, encuestas, escritura, edición de video y más. Cada trabajo muestra el precio y la duración.',
      'suscripción': 'Tenemos tres planes: Basic (gratis), Premium (semanal $2.49, mensual $7.99, anual $79.99) y Pro (semanal $4.99, mensual $14.99, anual $149.99). ¡Los planes anuales son los más económicos!',
      'precio': 'Los precios de las tareas van de $1.50 a $10. Con las suscripciones Premium y Pro, puedes ganar más.',
      'pago': 'En la sección de Billetera, puedes ver tu saldo, agregar depósitos y retirar dinero. El retiro mínimo es de $5.',
      'dinero': 'Ganas dinero completando tareas. Tus ganancias se agregan inmediatamente a tu saldo.',
      'historial': 'En el Historial de Tareas, puedes ver el estado de tus solicitudes (pendiente/completado/cancelado).',
      'idioma': 'La aplicación está disponible en 8 idiomas: azerbaiyano, inglés, ruso, turco, alemán, francés, español y árabe.',
      'ayuda': '¡Encantado de ayudar! Puedes preguntar sobre tareas, suscripciones, pagos o cualquier otro tema.',
      'default': '¡Pregunta interesante! ¿Podrías ser más específico sobre tareas, suscripciones, precios o pagos?'
    },
    ar: {
      'مرحبا': 'مرحبا! كيف يمكنني مساعدتك؟',
      'مهمة': 'في قسم العمل الإضافي، ستجد مهام مختلفة عبر الإنترنت. تبدأ الأسعار من $1.50، ويتم مراجعة الطلبات خلال 10 ثوانٍ.',
      'عمل': 'لدينا إدخال البيانات والترجمة ووسائل التواصل الاجتماعي والاستطلاعات والكتابة وتحرير الفيديو والمزيد. كل عمل يعرض السعر والمدة.',
      'اشتراك': 'لدينا ثلاث خطط: Basic (مجاني)، Premium (أسبوعي $2.49، شهري $7.99، سنوي $79.99) و Pro (أسبوعي $4.99، شهري $14.99، سنوي $149.99). الخطط السنوية هي الأفضل قيمة!',
      'سعر': 'تتراوح أسعار المهام من $1.50 إلى $10. مع اشتراكات Premium و Pro، يمكنك كسب المزيد.',
      'دفع': 'في قسم المحفظة، يمكنك عرض رصيدك وإضافة الودائع وسحب الأموال. الحد الأدنى للسحب هو $5.',
      'مال': 'تكسب المال من خلال إكمال المهام. تضاف أرباحك على الفور إلى رصيدك.',
      'تاريخ': 'في تاريخ المهام، يمكنك رؤية حالة طلباتك (قيد الانتظار/مكتمل/ملغى).',
      'لغة': 'التطبيق متوفر بـ 8 لغات: الأذربيجانية والإنجليزية والروسية والتركية والألمانية والفرنسية والإسبانية والعربية.',
      'مساعدة': 'يسعدني المساعدة! يمكنك السؤال عن المهام أو الاشتراكات أو المدفوعات أو أي موضوع آخر.',
      'default': 'سؤال مثير! هل يمكنك أن تكون أكثر تحديدًا بشأن المهام أو الاشتراكات أو الأسعار أو المدفوعات؟'
    }
  };

  const langResponses = responses[lang];
  
  // Check for matching keywords
  for (const [keyword, response] of Object.entries(langResponses)) {
    if (input.includes(keyword)) {
      return response;
    }
  }
  
  return langResponses.default;
};

export function Chatbot({ language }: ChatbotProps) {
  const t = translations[language];
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: t.welcome,
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse = getAIResponse(inputValue, language);
      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // 1-2 seconds
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-24 right-4 z-50 w-16 h-16 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600 rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 transition-transform animate-bounce"
        >
          <Bot size={32} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 z-50 w-80 bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-purple-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="text-white" size={24} />
              <span className="text-white">{t.chatbot}</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white hover:scale-110 transition-transform">
              <X size={24} />
            </button>
          </div>

          {/* Messages */}
          <div className="h-96 overflow-y-auto p-4 space-y-3 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[75%] px-4 py-3 rounded-2xl shadow-md animate-fadeIn ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white'
                      : 'bg-white text-gray-800 border-2 border-purple-200'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-white/70' : 'text-gray-500'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            
            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 px-4 py-3 rounded-2xl shadow-md border-2 border-purple-200 flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-pink-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-orange-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                  <span className="text-xs text-gray-600">{t.typing}</span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t-2 border-purple-200">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={t.askQuestion}
                className="flex-1 px-4 py-2 border-2 border-purple-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                disabled={isTyping}
              />
              <button
                onClick={handleSend}
                disabled={isTyping || !inputValue.trim()}
                className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white p-3 rounded-2xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
