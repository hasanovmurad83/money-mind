import { useState, useEffect } from 'react';
import { Language, User, PendingJob } from '../App';
import { Clock, DollarSign, Star, Globe, ChevronLeft, ChevronRight, X, User as UserIcon, Briefcase, Calendar, Plus, Filter, SlidersHorizontal } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';
import { CreateTaskDialog } from './CreateTaskDialog';

interface ExtraWorkProps {
  language: Language;
  user: User;
  setUser: (user: User) => void;
  onNavigate: (page: 'home' | 'profile' | 'wallet' | 'settings' | 'history' | 'subscriptions' | 'postjob' | 'myjobs' | 'extrawork') => void;
}

const translations = {
  az: {
    extraWork: 'Əlavə İş',
    availableTasks: 'Mövcud Tapşırıqlar',
    apply: 'Müraciət et',
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
    minutes: 'dəqiqə',
    online: 'Onlayn',
    taskCompleted: 'Tapşırıq tamamlandı! +${amount}',
    page: 'Səhifə',
    of: '/​',
    totalTasks: 'Cəmi {count} tapşırıq',
    taskDetails: 'Tapşırıq Haqqında',
    postedBy: 'İşəgötürən',
    category: 'Kateqoriya',
    duration: 'Müddət',
    payment: 'Ödəniş',
    description: 'Təsvir',
    close: 'Bağla',
    applyNow: 'Müraciət et',
    applying: 'Müraciət edilir...',
    waitingApproval: 'Gözləmə siyahısına əlavə edildi',
    noTasksAvailable: 'Mövcud tapşırıq yoxdur',
    addTask: 'Tapşırıq Əlavə Et',
    filters: 'Filtrlər',
    priceRange: 'Qiymət aralığı',
    durationRange: 'Müddət aralığı',
    categories: 'Kateqoriyalar',
    clearFilters: 'Filtrləri təmizlə',
    applyFilters: 'Tətbiq et',
    min: 'Min',
    max: 'Maks',
    showFilters: 'Filtrləri göstər',
    hideFilters: 'Filtrləri gizlət',
  },
  en: {
    extraWork: 'Extra Work',
    availableTasks: 'Available Tasks',
    apply: 'Apply',
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
    minutes: 'minutes',
    online: 'Online',
    taskCompleted: 'Task completed! +${amount}',
    page: 'Page',
    of: 'of',
    totalTasks: 'Total {count} tasks',
    taskDetails: 'Task Details',
    postedBy: 'Posted By',
    category: 'Category',
    duration: 'Duration',
    payment: 'Payment',
    description: 'Description',
    close: 'Close',
    applyNow: 'Apply Now',
    applying: 'Applying...',
    waitingApproval: 'Added to waiting list',
    noTasksAvailable: 'No tasks available',
    addTask: 'Add Task',
    filters: 'Filters',
    priceRange: 'Price Range',
    durationRange: 'Duration Range',
    categories: 'Categories',
    clearFilters: 'Clear Filters',
    applyFilters: 'Apply',
    min: 'Min',
    max: 'Max',
    showFilters: 'Show Filters',
    hideFilters: 'Hide Filters',
  },
  ru: {
    extraWork: 'Дополнительная Работа',
    availableTasks: 'Доступные Задачи',
    apply: 'Подать заявку',
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
    minutes: 'минут',
    online: 'Онлайн',
    taskCompleted: 'Задача выполнена! +${amount}',
    page: 'Страница',
    of: 'из',
    totalTasks: 'Всего {count} задач',
    taskDetails: 'Детали Задачи',
    postedBy: 'Опубликовано',
    category: 'Категория',
    duration: 'Длительность',
    payment: 'Оплата',
    description: 'Описание',
    close: 'Закрыть',
    applyNow: 'Подать заявку',
    applying: 'Подача заявки...',
    waitingApproval: 'Добавлено в список ожидания',
    noTasksAvailable: 'Нет доступных задач',
    addTask: 'Добавить задачу',
    filters: 'Фильтры',
    priceRange: 'Диапазон цен',
    durationRange: 'Диапазон времени',
    categories: 'Категории',
    clearFilters: 'Очистить фильтры',
    applyFilters: 'Применить',
    min: 'Мин',
    max: 'Макс',
    showFilters: 'Показать фильтры',
    hideFilters: 'Скрыть фильтры',
  },
  tr: {
    extraWork: 'Ek İş',
    availableTasks: 'Mevcut Görevler',
    apply: 'Başvur',
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
    minutes: 'dakika',
    online: 'Online',
    taskCompleted: 'Görev tamamlandı! +${amount}',
    page: 'Sayfa',
    of: '/​',
    totalTasks: 'Toplam {count} görev',
    taskDetails: 'Görev Detayları',
    postedBy: 'Yayınlayan',
    category: 'Kategori',
    duration: 'Süre',
    payment: 'Ödeme',
    description: 'Açıklama',
    close: 'Kapat',
    applyNow: 'Başvur',
    applying: 'Başvuruluyor...',
    waitingApproval: 'Bekleme listesine eklendi',
    noTasksAvailable: 'Mevcut görev yok',
    addTask: 'Görev Ekle',
    filters: 'Filtreler',
    priceRange: 'Fiyat Aralığı',
    durationRange: 'Süre Aralığı',
    categories: 'Kategoriler',
    clearFilters: 'Filtreleri Temizle',
    applyFilters: 'Uygula',
    min: 'Min',
    max: 'Maks',
    showFilters: 'Filtreleri Göster',
    hideFilters: 'Filtreleri Gizle',
  },
  de: {
    extraWork: 'Zusätzliche Arbeit',
    availableTasks: 'Verfügbare Aufgaben',
    apply: 'Bewerben',
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
    minutes: 'Minuten',
    online: 'Online',
    taskCompleted: 'Aufgabe abgeschlossen! +${amount}',
    page: 'Seite',
    of: 'von',
    totalTasks: 'Insgesamt {count} Aufgaben',
    taskDetails: 'Aufgabendetails',
    postedBy: 'Veröffentlicht von',
    category: 'Kategorie',
    duration: 'Dauer',
    payment: 'Zahlung',
    description: 'Beschreibung',
    close: 'Schließen',
    applyNow: 'Jetzt bewerben',
    applying: 'Bewerbung läuft...',
    waitingApproval: 'Zur Warteliste hinzugefügt',
    noTasksAvailable: 'Keine Aufgaben verfügbar',
    addTask: 'Aufgabe hinzufügen',
    filters: 'Filter',
    priceRange: 'Preisspanne',
    durationRange: 'Zeitspanne',
    categories: 'Kategorien',
    clearFilters: 'Filter löschen',
    applyFilters: 'Anwenden',
    min: 'Min',
    max: 'Max',
    showFilters: 'Filter anzeigen',
    hideFilters: 'Filter ausblenden',
  },
  fr: {
    extraWork: 'Travail Supplémentaire',
    availableTasks: 'Tâches Disponibles',
    apply: 'Postuler',
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
    minutes: 'minutes',
    online: 'En ligne',
    taskCompleted: 'Tâche terminée! +${amount}',
    page: 'Page',
    of: 'de',
    totalTasks: 'Total {count} tâches',
    taskDetails: 'Détails de la Tâche',
    postedBy: 'Publié par',
    category: 'Catégorie',
    duration: 'Durée',
    payment: 'Paiement',
    description: 'Description',
    close: 'Fermer',
    applyNow: 'Postuler maintenant',
    applying: 'Candidature en cours...',
    waitingApproval: 'Ajouté à la liste d\'attente',
    noTasksAvailable: 'Aucune tâche disponible',
    addTask: 'Ajouter une tâche',
    filters: 'Filtres',
    priceRange: 'Fourchette de prix',
    durationRange: 'Plage de durée',
    categories: 'Catégories',
    clearFilters: 'Effacer les filtres',
    applyFilters: 'Appliquer',
    min: 'Min',
    max: 'Max',
    showFilters: 'Afficher les filtres',
    hideFilters: 'Masquer les filtres',
  },
  es: {
    extraWork: 'Trabajo Extra',
    availableTasks: 'Tareas Disponibles',
    apply: 'Aplicar',
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
    minutes: 'minutos',
    online: 'En línea',
    taskCompleted: '¡Tarea completada! +${amount}',
    page: 'Página',
    of: 'de',
    totalTasks: 'Total {count} tareas',
    taskDetails: 'Detalles de la Tarea',
    postedBy: 'Publicado por',
    category: 'Categoría',
    duration: 'Duración',
    payment: 'Pago',
    description: 'Descripción',
    close: 'Cerrar',
    applyNow: 'Aplicar ahora',
    applying: 'Aplicando...',
    waitingApproval: 'Añadido a la lista de espera',
    noTasksAvailable: 'No hay tareas disponibles',
    addTask: 'Agregar tarea',
    filters: 'Filtros',
    priceRange: 'Rango de precio',
    durationRange: 'Rango de duración',
    categories: 'Categorías',
    clearFilters: 'Limpiar filtros',
    applyFilters: 'Aplicar',
    min: 'Mín',
    max: 'Máx',
    showFilters: 'Mostrar filtros',
    hideFilters: 'Ocultar filtros',
  },
  ar: {
    extraWork: 'عمل إضافي',
    availableTasks: 'المهام المتاحة',
    apply: 'تقدم',
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
    minutes: 'دقيقة',
    online: 'متصل',
    taskCompleted: 'اكتملت المهمة! +${amount}',
    page: 'صفحة',
    of: 'من',
    totalTasks: 'إجمالي {count} مهام',
    taskDetails: 'تفاصيل المهمة',
    postedBy: 'نشرت بواسطة',
    category: 'الفئة',
    duration: 'المدة',
    payment: 'الدفع',
    description: 'الوصف',
    close: 'إغلاق',
    applyNow: 'تقدم الآن',
    applying: 'جاري التقديم...',
    waitingApproval: 'تمت الإضافة إلى قائمة الانتظار',
    noTasksAvailable: 'لا توجد مهام متاحة',
    addTask: 'إضافة مهمة',
    filters: 'المرشحات',
    priceRange: 'نطاق السعر',
    durationRange: 'نطاق المدة',
    categories: 'الفئات',
    clearFilters: 'مسح المرشحات',
    applyFilters: 'تطبيق',
    min: 'دقيقة',
    max: 'الأعلى',
    showFilters: 'إظهار المرشحات',
    hideFilters: 'إخفاء المرشحات',
  },
};

const employers = [
  'Nigar Əliyeva',
  'Rəşad Məmmədov',
  'Leyla Həsənova',
  'Elvin Qarayev',
  'Səbinə Əhmədova',
  'Cavid İbrahimov',
  'Aynur Mustafayeva',
  'Tural Əsgərov'
];

const initialTasks = [
  // Page 1
  { id: 1, title: 'dataEntry', description: 'Enter 50 product names into Excel spreadsheet', price: 2.50, duration: 15, category: 'dataEntry', image: 'https://images.unsplash.com/photo-1608742213632-1dfd28dfb0c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwZW50cnklMjBjb21wdXRlcnxlbnwxfHx8fDE3NjQ0MDI2NDd8MA&ixlib=rb-4.1.0&q=80&w=1080', postedBy: employers[0] },
  { id: 2, title: 'translation', description: 'Translate 200 words from English to Azerbaijani', price: 4.25, duration: 25, category: 'translation', image: 'https://images.unsplash.com/photo-1620969427101-7a2bb6d83273?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFuc2xhdGlvbiUyMGxhbmd1YWdlfGVufDF8fHx8MTc2NDMxNDY4OHww&ixlib=rb-4.1.0&q=80&w=1080', postedBy: employers[1] },
  { id: 3, title: 'socialMedia', description: 'Like and comment on 20 Instagram posts', price: 1.75, duration: 10, category: 'socialMedia', image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMG1hcmtldGluZ3xlbnwxfHx8fDE3NjQyOTU3MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080', postedBy: employers[2] },
  { id: 4, title: 'survey', description: 'Complete 5-minute online survey about shopping habits', price: 1.50, duration: 5, category: 'survey', image: 'https://images.unsplash.com/photo-1689848836441-83d7069f62d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXJ2ZXklMjBjbGlwYm9hcmR8ZW58MXx8fHwxNzY0NDAyNjQ4fDA&ixlib=rb-4.1.0&q=80&w=1080', postedBy: employers[3] },
  { id: 5, title: 'typing', description: 'Type 500 words from scanned document', price: 3.50, duration: 20, category: 'typing', image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0eXBpbmclMjBrZXlib2FyZHxlbnwxfHx8fDE3NjQ0MDI2NDh8MA&ixlib=rb-4.1.0&q=80&w=1080', postedBy: employers[4] },
  
  // Page 2
  { id: 6, title: 'dataEntry', description: 'Copy 30 email addresses to Google Sheets', price: 2.10, duration: 12, category: 'dataEntry', image: 'https://images.unsplash.com/photo-1608742213632-1dfd28dfb0c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwZW50cnklMjBjb21wdXRlcnxlbnwxfHx8fDE3NjQ0MDI2NDd8MA&ixlib=rb-4.1.0&q=80&w=1080', postedBy: employers[5] },
  { id: 7, title: 'videoEditing', description: 'Edit 2-minute promotional video', price: 7.50, duration: 45, category: 'videoEditing', image: 'https://images.unsplash.com/photo-1574717025058-2f8737d2e2b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMGVkaXRpbmd8ZW58MXx8fHwxNzY0MzkxNjg2fDA&ixlib=rb-4.1.0&q=80&w=1080', postedBy: employers[6] },
  { id: 8, title: 'graphicDesign', description: 'Design simple social media banner', price: 6.00, duration: 30, category: 'graphicDesign', image: 'https://images.unsplash.com/photo-1740059020488-ba2541d7f907?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFwaGljJTIwZGVzaWduJTIwY3JlYXRpdmV8ZW58MXx8fHwxNzY0MzI4ODM1fDA&ixlib=rb-4.1.0&q=80&w=1080', postedBy: employers[7] },
  { id: 9, title: 'translation', description: 'Translate product descriptions (300 words)', price: 5.00, duration: 35, category: 'translation', image: 'https://images.unsplash.com/photo-1620969427101-7a2bb6d83273?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFuc2xhdGlvbiUyMGxhbmd1YWdlfGVufDF8fHx8MTc2NDMxNDY4OHww&ixlib=rb-4.1.0&q=80&w=1080', postedBy: employers[0] },
  { id: 10, title: 'voiceOver', description: 'Record 1-minute voice-over for video', price: 9.00, duration: 20, category: 'voiceOver', image: 'https://images.unsplash.com/photo-1561446289-4112a4f79116?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2b2ljZSUyMHJlY29yZGluZyUyMG1pY3JvcGhvbmV8ZW58MXx8fHwxNzY0MzI5NTAwfDA&ixlib=rb-4.1.0&q=80&w=1080', postedBy: employers[1] },
  
  // Page 3
  { id: 11, title: 'contentWriting', description: 'Write 500-word blog post', price: 7.00, duration: 40, category: 'contentWriting', image: 'https://images.unsplash.com/photo-1758874385949-cec80d549f67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW50JTIwd3JpdGluZyUyMG5vdGVib29rfGVufDF8fHx8MTc2NDQwMjY1Mnww&ixlib=rb-4.1.0&q=80&w=1080', postedBy: employers[2] },
  { id: 12, title: 'webResearch', description: 'Research 10 competitors for market analysis', price: 4.50, duration: 30, category: 'webResearch', image: 'https://images.unsplash.com/photo-1762330465551-5217a6dec84f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjByZXNlYXJjaCUyMGJyb3dzZXJ8ZW58MXx8fHwxNzY0NDAyNjUyfDA&ixlib=rb-4.1.0&q=80&w=1080', postedBy: employers[3] },
  { id: 13, title: 'socialMedia', description: 'Create 5 engaging social media posts', price: 3.25, duration: 18, category: 'socialMedia', image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMG1hcmtldGluZ3xlbnwxfHx8fDE3NjQyOTU3MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080', postedBy: employers[4] },
  { id: 14, title: 'dataEntry', description: 'Update customer database with 100 entries', price: 4.00, duration: 25, category: 'dataEntry', image: 'https://images.unsplash.com/photo-1608742213632-1dfd28dfb0c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwZW50cnklMjBjb21wdXRlcnxlbnwxfHx8fDE3NjQ0MDI2NDd8MA&ixlib=rb-4.1.0&q=80&w=1080', postedBy: employers[5] },
  { id: 15, title: 'survey', description: 'Participate in 10-minute product feedback survey', price: 2.25, duration: 10, category: 'survey', image: 'https://images.unsplash.com/photo-1689848836441-83d7069f62d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXJ2ZXklMjBjbGlwYm9hcmR8ZW58MXx8fHwxNzY0NDAyNjQ4fDA&ixlib=rb-4.1.0&q=80&w=1080', postedBy: employers[6] },
  
  // Page 4
  { id: 16, title: 'typing', description: 'Transcribe 15-minute audio recording', price: 5.50, duration: 35, category: 'typing', image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0eXBpbmclMjBrZXlib2FyZHxlbnwxfHx8fDE3NjQ0MDI2NDh8MA&ixlib=rb-4.1.0&q=80&w=1080', postedBy: employers[7] },
  { id: 17, title: 'graphicDesign', description: 'Design logo for small business', price: 10.00, duration: 50, category: 'graphicDesign', image: 'https://images.unsplash.com/photo-1740059020488-ba2541d7f907?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFwaGljJTIwZGVzaWduJTIwY3JlYXRpdmV8ZW58MXx8fHwxNzY0MzI4ODM1fDA&ixlib=rb-4.1.0&q=80&w=1080', postedBy: employers[0] },
  { id: 18, title: 'contentWriting', description: 'Write product reviews (5 products)', price: 5.00, duration: 28, category: 'contentWriting', image: 'https://images.unsplash.com/photo-1758874385949-cec80d549f67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW50JTIwd3JpdGluZyUyMG5vdGVib29rfGVufDF8fHx8MTc2NDQwMjY1Mnww&ixlib=rb-4.1.0&q=80&w=1080', postedBy: employers[1] },
  { id: 19, title: 'webResearch', description: 'Find contact information for 20 companies', price: 3.75, duration: 22, category: 'webResearch', image: 'https://images.unsplash.com/photo-1762330465551-5217a6dec84f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjByZXNlYXJjaCUyMGJyb3dzZXJ8ZW58MXx8fHwxNzY0NDAyNjUyfDA&ixlib=rb-4.1.0&q=80&w=1080', postedBy: employers[2] },
  { id: 20, title: 'translation', description: 'Translate website content (400 words)', price: 6.50, duration: 38, category: 'translation', image: 'https://images.unsplash.com/photo-1620969427101-7a2bb6d83273?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFuc2xhdGlvbiUyMGxhbmd1YWdlfGVufDF8fHx8MTc2NDMxNDY4OHww&ixlib=rb-4.1.0&q=80&w=1080', postedBy: employers[3] },
];

const TASKS_PER_PAGE = 5;

const allCategories = ['dataEntry', 'translation', 'socialMedia', 'survey', 'typing', 'videoEditing', 'graphicDesign', 'voiceOver', 'contentWriting', 'webResearch'];

export function ExtraWork({ language, user, setUser, onNavigate }: ExtraWorkProps) {
  const t = translations[language];
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTask, setSelectedTask] = useState<typeof initialTasks[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [priceRange, setPriceRange] = useState({ min: 0, max: 15 });
  const [durationRange, setDurationRange] = useState({ min: 0, max: 60 });
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Reytinq hesablanması - abunəliyə görə
  const getRatingForTask = (basePrice: number) => {
    if (user.subscription === 'basic') {
      // Basic: 3.5-4.2 aralığında
      return parseFloat((3.5 + Math.random() * 0.7).toFixed(1));
    } else if (user.subscription === 'premium') {
      // Premium: 4.3-4.7 aralığında
      return parseFloat((4.3 + Math.random() * 0.4).toFixed(1));
    } else if (user.subscription === 'pro') {
      // Pro: 4.8-5.0 aralığında
      return parseFloat((4.8 + Math.random() * 0.2).toFixed(1));
    }
    return 4.0;
  };

  // Tapşırıqları reytinqlə birlikdə hazırla
  const tasksWithRatings = initialTasks.map(task => ({
    ...task,
    rating: getRatingForTask(task.price)
  }));

  // Filtirləmə funksiyası
  const getFilteredTasks = () => {
    let filtered = [...tasksWithRatings];

    // Qiymət filtri
    filtered = filtered.filter(task => 
      task.price >= priceRange.min && task.price <= priceRange.max
    );

    // Müddət filtri
    filtered = filtered.filter(task => 
      task.duration >= durationRange.min && task.duration <= durationRange.max
    );

    // Kateqoriya filtri
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(task => 
        selectedCategories.includes(task.category)
      );
    }

    // Abunəliyə görə sıralama
    if (user.subscription === 'basic') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (user.subscription === 'premium') {
      filtered.sort((a, b) => {
        const aPriority = Math.abs(a.price - 5);
        const bPriority = Math.abs(b.price - 5);
        return aPriority - bPriority;
      });
    } else if (user.subscription === 'pro') {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  };

  const [availableTasks, setAvailableTasks] = useState(getFilteredTasks());

  // Filtrləri tətbiq et
  useEffect(() => {
    setAvailableTasks(getFilteredTasks());
    setCurrentPage(1);
  }, [priceRange, durationRange, selectedCategories, user.subscription]);

  const totalPages = Math.ceil(availableTasks.length / TASKS_PER_PAGE);
  const startIndex = (currentPage - 1) * TASKS_PER_PAGE;
  const currentTasks = availableTasks.slice(startIndex, startIndex + TASKS_PER_PAGE);

  const handleCategoryToggle = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const clearFilters = () => {
    setPriceRange({ min: 0, max: 15 });
    setDurationRange({ min: 0, max: 60 });
    setSelectedCategories([]);
  };

  const handleApplyTask = (task: typeof initialTasks[0]) => {
    const pendingJob: PendingJob = {
      id: task.id,
      title: task.title,
      description: task.description,
      category: task.category,
      price: task.price,
      duration: task.duration,
      postedBy: task.postedBy,
      appliedAt: new Date().toISOString(),
      status: 'pending'
    };

    setAvailableTasks(prev => prev.filter(t => t.id !== task.id));

    setUser({
      ...user,
      pendingJobs: [...(user.pendingJobs || []), pendingJob]
    });

    toast.info(t.waitingApproval);
    setSelectedTask(null);

    setTimeout(() => {
      const isApproved = Math.random() > 0.3;

      setUser(prevUser => {
        if (isApproved) {
          const newTransaction = {
            id: Date.now(),
            type: 'received' as const,
            description: t.taskCompleted.replace('${amount}', task.price.toFixed(2)),
            amount: task.price,
            date: new Date().toISOString().split('T')[0],
            source: task.title + ' Task'
          };

          // Hər 5 təsdiqlənən tapşırıqdan bir reytinq artımı
          const newCompletedTasks = prevUser.completedTasks + 1;
          let newRating = prevUser.rating;
          
          if (newCompletedTasks % 5 === 0) {
            // Hər 5 tapşırıqdan bir ortalama artım (0.1-0.2 arası)
            const ratingIncrease = 0.1 + Math.random() * 0.1;
            newRating = Math.min(5, prevUser.rating + ratingIncrease);
          }

          return {
            ...prevUser,
            balance: prevUser.balance + task.price,
            completedTasks: newCompletedTasks,
            rating: parseFloat(newRating.toFixed(1)),
            pendingJobs: prevUser.pendingJobs?.map(j => 
              j.id === task.id ? { ...j, status: 'approved' as const } : j
            ) || [],
            transactions: [newTransaction, ...prevUser.transactions]
          };
        } else {
          return {
            ...prevUser,
            pendingJobs: prevUser.pendingJobs?.map(j => 
              j.id === task.id ? { ...j, status: 'rejected' as const } : j
            ) || []
          };
        }
      });

      if (isApproved) {
        toast.success(t.taskCompleted.replace('${amount}', task.price.toFixed(2)));
      } else {
        toast.error('Təsdiq edilmədi. Yenidən cəhd edin.');
      }
    }, 10000);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleTaskCreated = (newTask: any) => {
    const taskWithRating = {
      ...newTask,
      rating: getRatingForTask(newTask.price)
    };
    setAvailableTasks(prev => [taskWithRating, ...prev]);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 rounded-3xl p-6 shadow-2xl text-white">
          <div className="flex items-center justify-between mb-2">
            <h1>{t.extraWork}</h1>
            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`backdrop-blur-sm p-3 rounded-full transition-all hover:scale-110 active:scale-95 ${
                  showFilters ? 'bg-white/30' : 'bg-white/20 hover:bg-white/30'
                }`}
                title={showFilters ? t.hideFilters : t.showFilters}
              >
                <SlidersHorizontal size={24} className="text-white" />
              </button>
              <button
                onClick={() => setIsDialogOpen(true)}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all hover:scale-110 active:scale-95"
                title={t.addTask}
              >
                <Plus size={24} className="text-white" />
              </button>
            </div>
          </div>
          <p className="text-sm text-white/90">
            {t.totalTasks.replace('{count}', availableTasks.length.toString())}
          </p>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white rounded-3xl p-6 shadow-xl space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-800 flex items-center gap-2">
                <Filter size={20} className="text-purple-600" />
                {t.filters}
              </h3>
              <button
                onClick={clearFilters}
                className="text-sm text-purple-600 hover:text-purple-700 underline"
              >
                {t.clearFilters}
              </button>
            </div>

            {/* Price Range */}
            <div>
              <label className="text-sm text-gray-600 mb-2 block">{t.priceRange}</label>
              <div className="space-y-3">
                <input
                  type="range"
                  min="0"
                  max="15"
                  step="0.5"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({ ...priceRange, max: parseFloat(e.target.value) })}
                  className="w-full accent-purple-600"
                />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">${priceRange.min}</span>
                  <span className="text-purple-600">${priceRange.max}</span>
                </div>
              </div>
            </div>

            {/* Duration Range */}
            <div>
              <label className="text-sm text-gray-600 mb-2 block">{t.durationRange}</label>
              <div className="space-y-3">
                <input
                  type="range"
                  min="0"
                  max="60"
                  step="5"
                  value={durationRange.max}
                  onChange={(e) => setDurationRange({ ...durationRange, max: parseInt(e.target.value) })}
                  className="w-full accent-purple-600"
                />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">{durationRange.min} {t.minutes}</span>
                  <span className="text-purple-600">{durationRange.max} {t.minutes}</span>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div>
              <label className="text-sm text-gray-600 mb-3 block">{t.categories}</label>
              <div className="grid grid-cols-2 gap-2">
                {allCategories.map(category => (
                  <button
                    key={category}
                    onClick={() => handleCategoryToggle(category)}
                    className={`p-3 rounded-xl border-2 transition-all text-sm ${
                      selectedCategories.includes(category)
                        ? 'border-purple-600 bg-purple-50 text-purple-700'
                        : 'border-gray-200 hover:border-purple-300 text-gray-700'
                    }`}
                  >
                    {t[category as keyof typeof t]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {availableTasks.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 shadow-xl text-center">
            <p className="text-gray-500">{t.noTasksAvailable}</p>
          </div>
        ) : (
          <>
            {/* Pagination Info */}
            {totalPages > 1 && (
              <div className="relative bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl p-1 shadow-2xl">
                <div className="bg-white rounded-[22px] p-4">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={goToPreviousPage}
                      disabled={currentPage === 1}
                      className={`flex items-center gap-2 px-5 py-3 rounded-2xl transition-all duration-300 ${
                        currentPage === 1
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white hover:shadow-2xl transform hover:scale-110'
                      }`}
                    >
                      <ChevronLeft size={24} />
                    </button>
                    
                    <div className="text-center">
                      <p className="text-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                        {currentPage} {t.of} {totalPages}
                      </p>
                      <div className="flex items-center gap-2 mt-3">
                        {Array.from({ length: totalPages }, (_, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              setCurrentPage(i + 1);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className={`h-3 rounded-full transition-all duration-300 ${
                              currentPage === i + 1
                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 w-10 shadow-lg'
                                : 'bg-gray-300 w-3 hover:bg-purple-400 hover:w-6'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <button
                      onClick={goToNextPage}
                      disabled={currentPage === totalPages}
                      className={`flex items-center gap-2 px-5 py-3 rounded-2xl transition-all duration-300 ${
                        currentPage === totalPages
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white hover:shadow-2xl transform hover:scale-110'
                      }`}
                    >
                      <ChevronRight size={24} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Available Tasks */}
            <div className="bg-white rounded-3xl p-6 shadow-xl">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-gray-800">{t.availableTasks}</h2>
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm shadow-lg">
                  {startIndex + 1}-{Math.min(startIndex + TASKS_PER_PAGE, availableTasks.length)}
                </div>
              </div>

              <div className="space-y-4">
                {currentTasks.map((task) => (
                  <button
                    key={task.id}
                    onClick={() => setSelectedTask(task)}
                    className="w-full border-2 border-gray-200 rounded-2xl overflow-hidden hover:border-purple-400 hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="relative h-40">
                      <ImageWithFallback
                        src={task.image}
                        alt={t[task.category as keyof typeof t]}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3 bg-green-500/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 animate-pulse">
                        <Globe size={14} className="text-white" />
                        <span className="text-sm text-white">{t.online}</span>
                      </div>
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                        <Star size={14} className="text-yellow-500 fill-yellow-500" />
                        <span className="text-sm">{task.rating}</span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <h3 className="text-white">{t[task.category as keyof typeof t]}</h3>
                      </div>
                    </div>
                    <div className="p-4 text-left">
                      <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1 text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                            <Clock size={16} />
                            <span>{task.duration} {t.minutes}</span>
                          </div>
                          <div className="text-purple-600 font-bold">${task.price.toFixed(2)}</div>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setCurrentPage(i + 1);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`px-4 py-2 rounded-xl transition-all ${
                      currentPage === i + 1
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                        : 'bg-white text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}

        {/* Task Details Modal */}
        {selectedTask && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="relative h-48">
                <ImageWithFallback
                  src={selectedTask.image}
                  alt={t[selectedTask.category as keyof typeof t]}
                  className="w-full h-full object-cover rounded-t-3xl"
                />
                <button
                  onClick={() => setSelectedTask(null)}
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all"
                >
                  <X size={24} className="text-gray-800" />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <h2 className="text-white">{t[selectedTask.category as keyof typeof t]}</h2>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 border-2 border-purple-200">
                  <div className="flex items-center gap-2 mb-2">
                    <UserIcon className="text-purple-600" size={20} />
                    <p className="text-sm text-gray-600">{t.postedBy}</p>
                  </div>
                  <p className="text-gray-800">{selectedTask.postedBy}</p>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-4 border-2 border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Briefcase className="text-blue-600" size={20} />
                    <p className="text-sm text-gray-600">{t.category}</p>
                  </div>
                  <p className="text-gray-800">{t[selectedTask.category as keyof typeof t]}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 border-2 border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="text-green-600" size={20} />
                      <p className="text-sm text-gray-600">{t.duration}</p>
                    </div>
                    <p className="text-gray-800">{selectedTask.duration} {t.minutes}</p>
                  </div>

                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-4 border-2 border-orange-200">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="text-orange-600" size={20} />
                      <p className="text-sm text-gray-600">{t.payment}</p>
                    </div>
                    <p className="text-orange-600 font-bold">${selectedTask.price.toFixed(2)}</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-2xl p-4 border-2 border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">{t.description}</p>
                  <p className="text-gray-800">{selectedTask.description}</p>
                </div>

                <button
                  onClick={() => handleApplyTask(selectedTask)}
                  className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white rounded-2xl py-4 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all text-lg"
                >
                  {t.applyNow}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Create Task Dialog */}
        <CreateTaskDialog
          language={language}
          user={user}
          setUser={setUser}
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onTaskCreated={handleTaskCreated}
        />
      </div>
    </div>
  );
}
