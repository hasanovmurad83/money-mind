import { useState } from 'react';
import { Language, User, PostedJob } from '../App';
import { X, DollarSign, Clock, FileText } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface CreateTaskDialogProps {
  language: Language;
  user: User;
  setUser: (user: User) => void;
  isOpen: boolean;
  onClose: () => void;
  onTaskCreated: (task: any) => void;
}

const translations = {
  az: {
    addTask: 'Tapşırıq Əlavə Et',
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
    videoEditing: 'Video Montaj',
    graphicDesign: 'Qrafik Dizayn',
    voiceOver: 'Səsləndirmə',
    contentWriting: 'Məzmun Yazma',
    webResearch: 'Web Araşdırma',
    priceLabel: 'Qiymət ($)',
    durationLabel: 'Müddət (dəqiqə)',
    minPrice: 'Min: 2$',
    suggestedPrice: 'Tövsiyyə:',
    postingFee: 'Dərc haqqı: 1$',
    publish: 'Dərc et',
    cancel: 'Ləğv et',
    insufficientBalance: 'Balansınız çatmır! Minimum 1$ lazımdır.',
    minPriceError: 'Minimum qiymət 2$ olmalıdır',
    taskPosted: 'Tapşırıq uğurla dərc edildi!',
    fillAllFields: 'Bütün sahələri doldurun',
  },
  en: {
    addTask: 'Add Task',
    title: 'Title',
    titlePlaceholder: 'Enter task title',
    description: 'Description',
    descriptionPlaceholder: 'Detailed task description',
    category: 'Category',
    selectCategory: 'Select category',
    dataEntry: 'Data Entry',
    translation: 'Translation',
    socialMedia: 'Social Media',
    survey: 'Survey',
    typing: 'Typing',
    videoEditing: 'Video Editing',
    graphicDesign: 'Graphic Design',
    voiceOver: 'Voice Over',
    contentWriting: 'Content Writing',
    webResearch: 'Web Research',
    priceLabel: 'Price ($)',
    durationLabel: 'Duration (minutes)',
    minPrice: 'Min: $2',
    suggestedPrice: 'Suggested:',
    postingFee: 'Posting fee: $1',
    publish: 'Publish',
    cancel: 'Cancel',
    insufficientBalance: 'Insufficient balance! Minimum $1 required.',
    minPriceError: 'Minimum price must be $2',
    taskPosted: 'Task posted successfully!',
    fillAllFields: 'Please fill all fields',
  },
  ru: {
    addTask: 'Добавить Задачу',
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
    videoEditing: 'Видео Монтаж',
    graphicDesign: 'Графический Дизайн',
    voiceOver: 'Озвучка',
    contentWriting: 'Написание Контента',
    webResearch: 'Веб-Исследование',
    priceLabel: 'Цена ($)',
    durationLabel: 'Длительность (минуты)',
    minPrice: 'Мин: $2',
    suggestedPrice: 'Рекомендуется:',
    postingFee: 'Плата за публикацию: $1',
    publish: 'Опубликовать',
    cancel: 'Отмена',
    insufficientBalance: 'Недостаточно средств! Минимум $1.',
    minPriceError: 'Минимальная цена должна быть $2',
    taskPosted: 'Задача успешно создана!',
    fillAllFields: 'Заполните все поля',
  },
  tr: {
    addTask: 'Görev Ekle',
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
    videoEditing: 'Video Düzenleme',
    graphicDesign: 'Grafik Tasarım',
    voiceOver: 'Seslendirme',
    contentWriting: 'İçerik Yazma',
    webResearch: 'Web Araştırma',
    priceLabel: 'Fiyat ($)',
    durationLabel: 'Süre (dakika)',
    minPrice: 'Min: $2',
    suggestedPrice: 'Önerilen:',
    postingFee: 'Yayın ücreti: $1',
    publish: 'Yayınla',
    cancel: 'İptal',
    insufficientBalance: 'Yetersiz bakiye! En az $1 gerekli.',
    minPriceError: 'Minimum fiyat $2 olmalıdır',
    taskPosted: 'Görev başarıyla oluşturuldu!',
    fillAllFields: 'Tüm alanları doldurun',
  },
  de: {
    addTask: 'Aufgabe Hinzufügen',
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
    videoEditing: 'Videobearbeitung',
    graphicDesign: 'Grafikdesign',
    voiceOver: 'Sprachaufnahme',
    contentWriting: 'Inhaltserstellung',
    webResearch: 'Web-Recherche',
    priceLabel: 'Preis ($)',
    durationLabel: 'Dauer (Minuten)',
    minPrice: 'Min: $2',
    suggestedPrice: 'Empfohlen:',
    postingFee: 'Veröffentlichungsgebühr: $1',
    publish: 'Veröffentlichen',
    cancel: 'Abbrechen',
    insufficientBalance: 'Unzureichendes Guthaben! Mindestens $1 erforderlich.',
    minPriceError: 'Mindestpreis muss $2 sein',
    taskPosted: 'Aufgabe erfolgreich erstellt!',
    fillAllFields: 'Bitte alle Felder ausfüllen',
  },
  fr: {
    addTask: 'Ajouter une Tâche',
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
    videoEditing: 'Montage Vidéo',
    graphicDesign: 'Conception Graphique',
    voiceOver: 'Voix Off',
    contentWriting: 'Rédaction de Contenu',
    webResearch: 'Recherche Web',
    priceLabel: 'Prix ($)',
    durationLabel: 'Durée (minutes)',
    minPrice: 'Min: $2',
    suggestedPrice: 'Suggéré:',
    postingFee: 'Frais de publication: $1',
    publish: 'Publier',
    cancel: 'Annuler',
    insufficientBalance: 'Solde insuffisant! Minimum $1 requis.',
    minPriceError: 'Le prix minimum doit être de $2',
    taskPosted: 'Tâche créée avec succès!',
    fillAllFields: 'Veuillez remplir tous les champs',
  },
  es: {
    addTask: 'Agregar Tarea',
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
    videoEditing: 'Edición de Video',
    graphicDesign: 'Diseño Gráfico',
    voiceOver: 'Voz en Off',
    contentWriting: 'Redacción de Contenido',
    webResearch: 'Investigación Web',
    priceLabel: 'Precio ($)',
    durationLabel: 'Duración (minutos)',
    minPrice: 'Mín: $2',
    suggestedPrice: 'Sugerido:',
    postingFee: 'Tarifa de publicación: $1',
    publish: 'Publicar',
    cancel: 'Cancelar',
    insufficientBalance: '¡Saldo insuficiente! Se requiere un mínimo de $1.',
    minPriceError: 'El precio mínimo debe ser de $2',
    taskPosted: '¡Tarea creada exitosamente!',
    fillAllFields: 'Por favor complete todos los campos',
  },
  ar: {
    addTask: 'إضافة مهمة',
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
    videoEditing: 'تحرير الفيديو',
    graphicDesign: 'تصميم جرافيك',
    voiceOver: 'تعليق صوتي',
    contentWriting: 'كتابة المحتوى',
    webResearch: 'بحث الويب',
    priceLabel: 'السعر ($)',
    durationLabel: 'المدة (دقيقة)',
    minPrice: 'الحد الأدنى: $2',
    suggestedPrice: 'مقترح:',
    postingFee: 'رسوم النشر: $1',
    publish: 'نشر',
    cancel: 'إلغاء',
    insufficientBalance: 'رصيد غير كاف! يلزم حد أدنى $1.',
    minPriceError: 'يجب أن يكون السعر الأدنى $2',
    taskPosted: 'تم إنشاء المهمة بنجاح!',
    fillAllFields: 'يرجى ملء جميع الحقول',
  },
};

const categoryImages: { [key: string]: string } = {
  dataEntry: 'https://images.unsplash.com/photo-1608742213632-1dfd28dfb0c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwZW50cnklMjBjb21wdXRlcnxlbnwxfHx8fDE3NjQzMDM4MTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
  translation: 'https://images.unsplash.com/photo-1620969427101-7a2bb6d83273?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFuc2xhdGlvbiUyMGxhbmd1YWdlfGVufDF8fHx8MTc2NDMxNDY4OHww&ixlib=rb-4.1.0&q=80&w=1080',
  socialMedia: 'https://images.unsplash.com/photo-1690883793939-f8cca2f28ee0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMHBob25lfGVufDF8fHx8MTc2NDMyMjgwNnww&ixlib=rb-4.1.0&q=80&w=1080',
  survey: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBzdXJ2ZXl8ZW58MXx8fHwxNzY0MjA5NzI1fDA&ixlib=rb-4.1.0&q=80&w=1080',
  typing: 'https://images.unsplash.com/photo-1665922370438-5e2014ef60bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0eXBpbmclMjBrZXlib2FyZCUyMGxhcHRvcHxlbnwxfHx8fDE3NjQzMjI4MDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
  videoEditing: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMGVkaXRpbmd8ZW58MXx8fHwxNzMyODA5OTA1fDA&ixlib=rb-4.1.0&q=80&w=1080',
  graphicDesign: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFwaGljJTIwZGVzaWdufGVufDF8fHx8MTczMjgwOTk3MXww&ixlib=rb-4.1.0&q=80&w=1080',
  voiceOver: 'https://images.unsplash.com/photo-1589903308904-1010c2294adc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWNyb3Bob25lJTIwcmVjb3JkaW5nfGVufDF8fHx8MTczMjgxMDA0OXww&ixlib=rb-4.1.0&q=80&w=1080',
  contentWriting: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3cml0aW5nJTIwYmxvZ3xlbnwxfHx8fDE3MzI4MTAwOTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  webResearch: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjByZXNlYXJjaHxlbnwxfHx8fDE3MzI4MTAxMjh8MA&ixlib=rb-4.1.0&q=80&w=1080',
};

// Kateqoriyaya görə tövsiyyə olunan qiymətlər
const suggestedPrices: { [key: string]: number } = {
  dataEntry: 2.5,
  survey: 2.0,
  socialMedia: 3.0,
  typing: 3.5,
  translation: 4.5,
  contentWriting: 5.0,
  webResearch: 4.0,
  videoEditing: 8.0,
  graphicDesign: 7.0,
  voiceOver: 9.0,
};

export function CreateTaskDialog({ language, user, setUser, isOpen, onClose, onTaskCreated }: CreateTaskDialogProps) {
  const t = translations[language];
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    duration: '',
  });

  const handleCategoryChange = (category: string) => {
    setFormData({ 
      ...formData, 
      category,
      price: suggestedPrices[category]?.toString() || '2'
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate
    if (!formData.title || !formData.description || !formData.category || !formData.price || !formData.duration) {
      toast.error(t.fillAllFields);
      return;
    }

    // Check balance
    if (user.balance < 1) {
      toast.error(t.insufficientBalance);
      return;
    }

    // Check minimum price
    if (parseFloat(formData.price) < 2) {
      toast.error(t.minPriceError);
      return;
    }

    // Create task
    const newTask = {
      id: Date.now(),
      title: formData.category,
      description: formData.title + ' - ' + formData.description,
      category: formData.category,
      price: parseFloat(formData.price),
      duration: parseInt(formData.duration),
      image: categoryImages[formData.category] || categoryImages.dataEntry,
      rating: 4.8,
      postedBy: user.name,
    };

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

    onTaskCreated(newTask);
    toast.success(t.taskPosted);
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      category: '',
      price: '',
      duration: '',
    });
    
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 p-6 rounded-t-3xl flex items-center justify-between sticky top-0">
          <h2 className="text-white">{t.addTask}</h2>
          <button onClick={onClose} className="text-white hover:scale-110 transition-transform">
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              <FileText size={16} className="inline mr-2" />
              {t.title}
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder={t.titlePlaceholder}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">{t.description}</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder={t.descriptionPlaceholder}
              rows={3}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent resize-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">{t.category}</label>
            <select
              value={formData.category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            >
              <option value="">{t.selectCategory}</option>
              <option value="dataEntry">{t.dataEntry}</option>
              <option value="translation">{t.translation}</option>
              <option value="socialMedia">{t.socialMedia}</option>
              <option value="survey">{t.survey}</option>
              <option value="typing">{t.typing}</option>
              <option value="videoEditing">{t.videoEditing}</option>
              <option value="graphicDesign">{t.graphicDesign}</option>
              <option value="voiceOver">{t.voiceOver}</option>
              <option value="contentWriting">{t.contentWriting}</option>
              <option value="webResearch">{t.webResearch}</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              <DollarSign size={16} className="inline mr-2" />
              {t.priceLabel}
              <span className="text-xs text-gray-500 ml-2">
                ({t.minPrice})
              </span>
            </label>
            <input
              type="number"
              step="0.01"
              min="2"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            />
            {formData.category && (
              <p className="text-xs text-purple-600 mt-1">
                {t.suggestedPrice} ${suggestedPrices[formData.category]}
              </p>
            )}
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              <Clock size={16} className="inline mr-2" />
              {t.durationLabel}
            </label>
            <input
              type="number"
              min="1"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            />
          </div>

          {/* Posting Fee Info */}
          <div className="bg-purple-50 border-2 border-purple-200 rounded-2xl p-4">
            <p className="text-sm text-purple-800">{t.postingFee}</p>
            <p className="text-xs text-purple-600 mt-1">
              {language === 'az' ? 'Cari balans:' : 'Current balance:'} ${user.balance.toFixed(2)}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-2xl text-gray-700 hover:bg-gray-50 transition-colors"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white rounded-2xl hover:shadow-2xl transition-all"
            >
              {t.publish}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
