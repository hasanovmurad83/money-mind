import { useState } from 'react';
import { Language, User } from '../App';
import { ChevronLeft, DollarSign, Clock, MapPin, FileText, Image as ImageIcon, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

interface PostJobProps {
  language: Language;
  user: User;
  setUser: (user: User) => void;
  onNavigate: (page: 'home' | 'profile' | 'wallet' | 'settings' | 'history' | 'subscriptions' | 'postjob' | 'myjobs') => void;
}

const translations = {
  az: {
    postJob: 'Tapşırıq Yarat',
    back: 'Geri',
    title: 'Başlıq',
    titlePlaceholder: 'Tapşırığın adını daxil edin',
    description: 'Təsvir',
    descriptionPlaceholder: 'Tapşırıq haqqında ətraflı məlumat',
    category: 'Kateqoriya',
    selectCategory: 'Kateqoriya seçin',
    dataEntry: 'Data Daxil Etmə',
    translation: 'Tərcümə',
    socialMedia: 'Sosial Media',
    survey: 'Sorğu',
    typing: 'Mətn Yazma',
    price: 'Qiymət',
    duration: 'Müddət (dəqiqə)',
    location: 'Yer (Online)',
    locationPlaceholder: 'Platforma (məs. Google Sheets)',
    image: 'Şəkil',
    selectImage: 'Şəkil seçin',
    publish: 'Dərc et (1$)',
    success: 'Tapşırıq uğurla yaradıldı!',
    chooseCategory: 'Kateqoriyaya uyğun şəkil seçin',
    maxDuration: 'Maks müddət:',
    basicLimit: 'Basic: limitsiz',
    premiumLimit: 'Premium: 20 dəqiqə',
    proLimit: 'Pro: 30 dəqiqə',
    postingFee: 'Dərc haqqı: 1$',
    insufficientBalance: 'Balansınız çatmır! Minimum 1$ lazımdır.',
    minPrice: 'Minimum qiymət 2$ olmalıdır',
  },
  en: {
    postJob: 'Post a Job',
    back: 'Back',
    title: 'Title',
    titlePlaceholder: 'Enter job title',
    description: 'Description',
    descriptionPlaceholder: 'Detailed job description',
    category: 'Category',
    selectCategory: 'Select category',
    dataEntry: 'Data Entry',
    translation: 'Translation',
    socialMedia: 'Social Media',
    survey: 'Survey',
    typing: 'Typing',
    price: 'Price',
    duration: 'Duration (minutes)',
    location: 'Location (Online)',
    locationPlaceholder: 'Platform (e.g. Google Sheets)',
    image: 'Image',
    selectImage: 'Select Image',
    publish: 'Publish ($1)',
    success: 'Job posted successfully!',
    chooseCategory: 'Choose image for category',
    maxDuration: 'Max duration:',
    basicLimit: 'Basic: unlimited',
    premiumLimit: 'Premium: 20 min',
    proLimit: 'Pro: 30 min',
    postingFee: 'Posting fee: $1',
    insufficientBalance: 'Insufficient balance! Minimum $1 required.',
    minPrice: 'Minimum price must be $2',
  },
  ru: {
    postJob: 'Создать Задачу',
    back: 'Назад',
    title: 'Заголовок',
    titlePlaceholder: 'Введите название задачи',
    description: 'Описание',
    descriptionPlaceholder: 'Подробное описание задачи',
    category: 'Категория',
    selectCategory: 'Выберите категорию',
    dataEntry: 'Ввод Данных',
    translation: 'Перевод',
    socialMedia: 'Соц. Сети',
    survey: 'Опрос',
    typing: 'Набор Текста',
    price: 'Цена',
    duration: 'Длительность (минуты)',
    location: 'Место (Онлайн)',
    locationPlaceholder: 'Платформа (напр. Google Sheets)',
    image: 'Изображение',
    selectImage: 'Выбрать изображение',
    publish: 'Опубликовать ($1)',
    success: 'Задача успешно создана!',
    chooseCategory: 'Выберите изображение для категории',
    maxDuration: 'Макс длительность:',
    basicLimit: 'Basic: безлимит',
    premiumLimit: 'Premium: 20 мин',
    proLimit: 'Pro: 30 мин',
    postingFee: 'Плата за публикацию: $1',
    insufficientBalance: 'Недостаточно средств! Минимум $1.',
    minPrice: 'Минимальная цена должна быть $2',
  },
  tr: {
    postJob: 'Görev Oluştur',
    back: 'Geri',
    title: 'Başlık',
    titlePlaceholder: 'Görev başlığını girin',
    description: 'Açıklama',
    descriptionPlaceholder: 'Detaylı görev açıklaması',
    category: 'Kategori',
    selectCategory: 'Kategori seçin',
    dataEntry: 'Veri Girişi',
    translation: 'Çeviri',
    socialMedia: 'Sosyal Medya',
    survey: 'Anket',
    typing: 'Yazma',
    price: 'Fiyat',
    duration: 'Süre (dakika)',
    location: 'Konum (Online)',
    locationPlaceholder: 'Platform (örn. Google Sheets)',
    image: 'Resim',
    selectImage: 'Resim Seç',
    publish: 'Yayınla ($1)',
    success: 'Görev başarıyla oluşturuldu!',
    chooseCategory: 'Kategori için resim seçin',
    maxDuration: 'Maks süre:',
    basicLimit: 'Basic: limitsiz',
    premiumLimit: 'Premium: 20 dk',
    proLimit: 'Pro: 30 dk',
    postingFee: 'Yayın ücreti: $1',
    insufficientBalance: 'Yetersiz bakiye! En az $1 gerekli.',
    minPrice: 'Minimum fiyat $2 olmalıdır',
  },
  de: {
    postJob: 'Aufgabe Erstellen',
    back: 'Zurück',
    title: 'Titel',
    titlePlaceholder: 'Aufgabentitel eingeben',
    description: 'Beschreibung',
    descriptionPlaceholder: 'Detaillierte Aufgabenbeschreibung',
    category: 'Kategorie',
    selectCategory: 'Kategorie wählen',
    dataEntry: 'Dateneingabe',
    translation: 'Übersetzung',
    socialMedia: 'Soziale Medien',
    survey: 'Umfrage',
    typing: 'Tippen',
    price: 'Preis',
    duration: 'Dauer (Minuten)',
    location: 'Standort (Online)',
    locationPlaceholder: 'Plattform (z.B. Google Sheets)',
    image: 'Bild',
    selectImage: 'Bild Auswählen',
    publish: 'Veröffentlichen ($1)',
    success: 'Aufgabe erfolgreich erstellt!',
    chooseCategory: 'Bild für Kategorie wählen',
    maxDuration: 'Max Dauer:',
    basicLimit: 'Basic: unbegrenzt',
    premiumLimit: 'Premium: 20 Min',
    proLimit: 'Pro: 30 Min',
    postingFee: 'Veröffentlichungsgebühr: $1',
    insufficientBalance: 'Unzureichendes Guthaben! Mindestens $1 erforderlich.',
    minPrice: 'Mindestpreis muss $2 sein',
  },
  fr: {
    postJob: 'Créer une Tâche',
    back: 'Retour',
    title: 'Titre',
    titlePlaceholder: 'Entrer le titre de la tâche',
    description: 'Description',
    descriptionPlaceholder: 'Description détaillée de la tâche',
    category: 'Catégorie',
    selectCategory: 'Sélectionner la catégorie',
    dataEntry: 'Saisie de Données',
    translation: 'Traduction',
    socialMedia: 'Réseaux Sociaux',
    survey: 'Sondage',
    typing: 'Frappe',
    price: 'Prix',
    duration: 'Durée (minutes)',
    location: 'Emplacement (En ligne)',
    locationPlaceholder: 'Plateforme (ex. Google Sheets)',
    image: 'Image',
    selectImage: 'Sélectionner l\'image',
    publish: 'Publier ($1)',
    success: 'Tâche créée avec succès!',
    chooseCategory: 'Choisir l\'image pour la catégorie',
    maxDuration: 'Durée max:',
    basicLimit: 'Basic: illimité',
    premiumLimit: 'Premium: 20 min',
    proLimit: 'Pro: 30 min',
    postingFee: 'Frais de publication: $1',
    insufficientBalance: 'Solde insuffisant! Minimum $1 requis.',
    minPrice: 'Le prix minimum doit être de $2',
  },
  es: {
    postJob: 'Crear Tarea',
    back: 'Atrás',
    title: 'Título',
    titlePlaceholder: 'Ingresar título de tarea',
    description: 'Descripción',
    descriptionPlaceholder: 'Descripción detallada de la tarea',
    category: 'Categoría',
    selectCategory: 'Seleccionar categoría',
    dataEntry: 'Entrada de Datos',
    translation: 'Traducción',
    socialMedia: 'Redes Sociales',
    survey: 'Encuesta',
    typing: 'Escritura',
    price: 'Precio',
    duration: 'Duración (minutos)',
    location: 'Ubicación (En línea)',
    locationPlaceholder: 'Plataforma (ej. Google Sheets)',
    image: 'Imagen',
    selectImage: 'Seleccionar Imagen',
    publish: 'Publicar ($1)',
    success: '¡Tarea creada exitosamente!',
    chooseCategory: 'Elegir imagen para categoría',
    maxDuration: 'Duración máx:',
    basicLimit: 'Basic: ilimitado',
    premiumLimit: 'Premium: 20 min',
    proLimit: 'Pro: 30 min',
    postingFee: 'Tarifa de publicación: $1',
    insufficientBalance: '¡Saldo insuficiente! Se requiere un mínimo de $1.',
    minPrice: 'El precio mínimo debe ser de $2',
  },
  ar: {
    postJob: 'إنشاء مهمة',
    back: 'رجوع',
    title: 'العنوان',
    titlePlaceholder: 'أدخل عنوان المهمة',
    description: 'الوصف',
    descriptionPlaceholder: 'وصف تفصيلي للمهمة',
    category: 'الفئة',
    selectCategory: 'اختر الفئة',
    dataEntry: 'إدخال البيانات',
    translation: 'ترجمة',
    socialMedia: 'وسائل التواصل',
    survey: 'استطلاع',
    typing: 'كتابة',
    price: 'السعر',
    duration: 'المدة (دقيقة)',
    location: 'الموقع (عبر الإنترنت)',
    locationPlaceholder: 'المنصة (مثل Google Sheets)',
    image: 'الصورة',
    selectImage: 'اختر الصورة',
    publish: 'نشر ($1)',
    success: 'تم إنشاء المهمة بنجاح!',
    chooseCategory: 'اختر صورة للفئة',
    maxDuration: 'المدة القصوى:',
    basicLimit: 'Basic: غير محدود',
    premiumLimit: 'Premium: 20 دقيقة',
    proLimit: 'Pro: 30 دقيقة',
    postingFee: 'رسوم النشر: $1',
    insufficientBalance: 'رصيد غير كاف! يلزم حد أدنى $1.',
    minPrice: 'يجب أن يكون السعر الأدنى $2',
  },
};

const categoryImages: { [key: string]: string } = {
  dataEntry: 'https://images.unsplash.com/photo-1608742213632-1dfd28dfb0c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwZW50cnklMjBjb21wdXRlcnxlbnwxfHx8fDE3NjQzMDM4MTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
  translation: 'https://images.unsplash.com/photo-1620969427101-7a2bb6d83273?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFuc2xhdGlvbiUyMGxhbmd1YWdlfGVufDF8fHx8MTc2NDMxNDY4OHww&ixlib=rb-4.1.0&q=80&w=1080',
  socialMedia: 'https://images.unsplash.com/photo-1690883793939-f8cca2f28ee0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMHBob25lfGVufDF8fHx8MTc2NDMyMjgwNnww&ixlib=rb-4.1.0&q=80&w=1080',
  survey: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBzdXJ2ZXl8ZW58MXx8fHwxNzY0MjA5NzI1fDA&ixlib=rb-4.1.0&q=80&w=1080',
  typing: 'https://images.unsplash.com/photo-1665922370438-5e2014ef60bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0eXBpbmclMjBrZXlib2FyZCUyMGxhcHRvcHxlbnwxfHx8fDE3NjQzMjI4MDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
};

export function PostJob({ language, user, onNavigate }: PostJobProps) {
  const t = translations[language];
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    duration: '',
    location: '',
  });
  const [selectedImage, setSelectedImage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const getMaxDuration = () => {
    if (user.subscription === 'premium') return 20;
    if (user.subscription === 'pro') return 30;
    return 999; // unlimited for basic
  };

  const handleCategoryChange = (category: string) => {
    setFormData({ ...formData, category });
    setSelectedImage(categoryImages[category] || '');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check balance
    if (user.balance < 1) {
      toast.error(t.insufficientBalance);
      return;
    }

    // Check minimum price
    if (parseFloat(formData.price) < 2) {
      toast.error(t.minPrice);
      return;
    }

    const maxDuration = getMaxDuration();
    if (parseInt(formData.duration) > maxDuration && user.subscription !== 'basic') {
      toast.error(`Maximum duration for ${user.subscription} plan is ${maxDuration} minutes`);
      return;
    }

    // Create transaction for posting fee
    const newTransaction = {
      id: Date.now(),
      type: 'payment' as const,
      description: t.postingFee,
      amount: -1,
      date: new Date().toISOString().split('T')[0]
    };

    // Deduct $1 posting fee and add transaction
    setUser({
      ...user,
      balance: user.balance - 1,
      transactions: [newTransaction, ...user.transactions]
    });

    toast.success(t.success);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onNavigate('home');
    }, 2000);
  };

  const maxDuration = getMaxDuration();

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
          <h1 className="text-gray-800">{t.postJob}</h1>
        </div>

        {/* Subscription Limit Notice */}
        <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl p-4 border-2 border-purple-300">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="text-purple-600" size={20} />
            <span className="text-sm text-purple-800">{t.maxDuration}</span>
          </div>
          <div className="text-xs text-purple-700 space-y-1">
            <div>{t.basicLimit}</div>
            <div>{t.premiumLimit}</div>
            <div>{t.proLimit}</div>
          </div>
          {user.subscription !== 'basic' && (
            <div className="mt-2 bg-purple-600 text-white px-3 py-1 rounded-full text-xs inline-block">
              {user.subscription === 'premium' ? t.premiumLimit : t.proLimit}
            </div>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 shadow-xl space-y-4">
          {/* Image Preview */}
          {selectedImage && (
            <div className="relative rounded-2xl overflow-hidden h-48 border-2 border-purple-200">
              <ImageWithFallback
                src={selectedImage}
                alt="Selected category"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setSelectedImage('')}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg"
              >
                <X size={20} />
              </button>
            </div>
          )}

          {/* Category */}
          <div>
            <label className="text-sm text-gray-700 mb-2 block flex items-center gap-2">
              <ImageIcon size={16} />
              {t.category}
            </label>
            <select
              value={formData.category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
              required
            >
              <option value="">{t.selectCategory}</option>
              <option value="dataEntry">{t.dataEntry}</option>
              <option value="translation">{t.translation}</option>
              <option value="socialMedia">{t.socialMedia}</option>
              <option value="survey">{t.survey}</option>
              <option value="typing">{t.typing}</option>
            </select>
            {formData.category && (
              <p className="text-xs text-purple-600 mt-2">✨ {t.chooseCategory}</p>
            )}
          </div>

          {/* Title */}
          <div>
            <label className="text-sm text-gray-700 mb-2 block">{t.title}</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder={t.titlePlaceholder}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm text-gray-700 mb-2 block flex items-center gap-2">
              <FileText size={16} />
              {t.description}
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder={t.descriptionPlaceholder}
              rows={4}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent resize-none transition-all"
              required
            />
          </div>

          {/* Price and Duration */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-700 mb-2 block flex items-center gap-2">
                <DollarSign size={16} />
                {t.price}
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="0.00"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                required
                min="0.01"
                max="5.00"
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 mb-2 block flex items-center gap-2">
                <Clock size={16} />
                {t.duration}
              </label>
              <input
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="0"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                required
                min="1"
                max={maxDuration === 999 ? undefined : maxDuration}
              />
              {user.subscription !== 'basic' && (
                <p className="text-xs text-orange-600 mt-1">Max: {maxDuration} dəq</p>
              )}
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="text-sm text-gray-700 mb-2 block flex items-center gap-2">
              <MapPin size={16} />
              {t.location}
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder={t.locationPlaceholder}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 text-white rounded-2xl py-4 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all mt-6"
          >
            {t.publish}
          </button>
        </form>

        {/* Success Message */}
        {showSuccess && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl transform scale-100 animate-bounce">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-gray-800 mb-2">✨ {t.success}</h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
