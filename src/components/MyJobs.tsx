import { Language, User } from '../App';
import { ChevronLeft, Clock, DollarSign, Star, Briefcase, Calendar } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface MyJobsProps {
  language: Language;
  user: User;
  onNavigate: (page: 'home' | 'profile' | 'wallet' | 'settings' | 'history' | 'subscriptions' | 'postjob' | 'myjobs') => void;
}

const translations = {
  az: {
    myJobs: 'Mənim Tapşırıqlarım',
    back: 'Geri',
    noJobs: 'Hələ tapşırıq yaratmamısınız',
    createFirst: 'İlk tapşırığınızı yaradın',
    active: 'Aktiv',
    completed: 'Tamamlandı',
    minutes: 'dəqiqə',
    applicants: 'Müraciət',
    views: 'Baxış',
    status: 'Status',
    posted: 'Yerləşdirilib',
    dataEntry: 'Data Daxil Etmə',
    translation: 'Tərcümə',
    socialMedia: 'Sosial Media',
    survey: 'Sorğu',
    typing: 'Mətn Yazma',
  },
  en: {
    myJobs: 'My Posted Jobs',
    back: 'Back',
    noJobs: 'You haven\'t posted any jobs yet',
    createFirst: 'Create your first job',
    active: 'Active',
    completed: 'Completed',
    minutes: 'minutes',
    applicants: 'Applicants',
    views: 'Views',
    status: 'Status',
    posted: 'Posted',
    dataEntry: 'Data Entry',
    translation: 'Translation',
    socialMedia: 'Social Media',
    survey: 'Survey',
    typing: 'Typing',
  },
  ru: {
    myJobs: 'Мои Размещенные Задачи',
    back: 'Назад',
    noJobs: 'Вы еще не разместили задач',
    createFirst: 'Создайте свою первую задачу',
    active: 'Активно',
    completed: 'Завершено',
    minutes: 'минут',
    applicants: 'Заявки',
    views: 'Просмотры',
    status: 'Статус',
    posted: 'Размещено',
    dataEntry: 'Ввод Данных',
    translation: 'Перевод',
    socialMedia: 'Соц. Сети',
    survey: 'Опрос',
    typing: 'Набор Текста',
  },
  tr: {
    myJobs: 'Yayınladığım Görevler',
    back: 'Geri',
    noJobs: 'Henüz görev yayınlamadınız',
    createFirst: 'İlk görevinizi oluşturun',
    active: 'Aktif',
    completed: 'Tamamlandı',
    minutes: 'dakika',
    applicants: 'Başvuru',
    views: 'Görüntüleme',
    status: 'Durum',
    posted: 'Yayınlandı',
    dataEntry: 'Veri Girişi',
    translation: 'Çeviri',
    socialMedia: 'Sosyal Medya',
    survey: 'Anket',
    typing: 'Yazma',
  },
  de: {
    myJobs: 'Meine Veröffentlichten Aufgaben',
    back: 'Zurück',
    noJobs: 'Sie haben noch keine Aufgaben veröffentlicht',
    createFirst: 'Erstellen Sie Ihre erste Aufgabe',
    active: 'Aktiv',
    completed: 'Abgeschlossen',
    minutes: 'Minuten',
    applicants: 'Bewerber',
    views: 'Aufrufe',
    status: 'Status',
    posted: 'Veröffentlicht',
    dataEntry: 'Dateneingabe',
    translation: 'Übersetzung',
    socialMedia: 'Soziale Medien',
    survey: 'Umfrage',
    typing: 'Tippen',
  },
  fr: {
    myJobs: 'Mes Tâches Publiées',
    back: 'Retour',
    noJobs: 'Vous n\'avez pas encore publié de tâches',
    createFirst: 'Créez votre première tâche',
    active: 'Actif',
    completed: 'Terminé',
    minutes: 'minutes',
    applicants: 'Candidats',
    views: 'Vues',
    status: 'Statut',
    posted: 'Publié',
    dataEntry: 'Saisie de Données',
    translation: 'Traduction',
    socialMedia: 'Réseaux Sociaux',
    survey: 'Sondage',
    typing: 'Frappe',
  },
  es: {
    myJobs: 'Mis Tareas Publicadas',
    back: 'Atrás',
    noJobs: 'Aún no has publicado tareas',
    createFirst: 'Crea tu primera tarea',
    active: 'Activo',
    completed: 'Completado',
    minutes: 'minutos',
    applicants: 'Solicitantes',
    views: 'Vistas',
    status: 'Estado',
    posted: 'Publicado',
    dataEntry: 'Entrada de Datos',
    translation: 'Traducción',
    socialMedia: 'Redes Sociales',
    survey: 'Encuesta',
    typing: 'Escritura',
  },
  ar: {
    myJobs: 'مهامي المنشورة',
    back: 'رجوع',
    noJobs: 'لم تنشر أي مهام بعد',
    createFirst: 'قم بإنشاء مهمتك الأولى',
    active: 'نشط',
    completed: 'مكتمل',
    minutes: 'دقيقة',
    applicants: 'المتقدمين',
    views: 'المشاهدات',
    status: 'الحالة',
    posted: 'تم النشر',
    dataEntry: 'إدخال البيانات',
    translation: 'ترجمة',
    socialMedia: 'وسائل التواصل',
    survey: 'استطلاع',
    typing: 'كتابة',
  },
};

export function MyJobs({ language, user, onNavigate }: MyJobsProps) {
  const t = translations[language];

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
          <h1 className="text-gray-800">{t.myJobs}</h1>
        </div>

        {/* Stats Summary */}
        <div className="bg-gradient-to-br from-white to-purple-50 rounded-3xl p-6 shadow-xl border border-purple-100">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-purple-600">{user.postedJobs?.length || 0}</div>
              <div className="text-sm text-gray-600">{t.myJobs}</div>
            </div>
            <div className="text-center">
              <div className="text-blue-600">
                {user.postedJobs?.filter(j => j.status === 'active').length || 0}
              </div>
              <div className="text-sm text-gray-600">{t.active}</div>
            </div>
          </div>
        </div>

        {/* Jobs List */}
        <div className="bg-white rounded-3xl p-6 shadow-xl">
          {!user.postedJobs || user.postedJobs.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Briefcase size={40} className="text-purple-600" />
              </div>
              <h3 className="text-gray-800 mb-2">{t.noJobs}</h3>
              <p className="text-gray-600 text-sm mb-6">{t.createFirst}</p>
              <button
                onClick={() => onNavigate('postjob')}
                className="bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 text-white px-8 py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all"
              >
                {t.createFirst}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {user.postedJobs.map((job) => (
                <div
                  key={job.id}
                  className="border-2 border-gray-200 rounded-2xl overflow-hidden hover:border-purple-400 hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative h-40">
                    <ImageWithFallback
                      src={job.image}
                      alt={job.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className={`text-xs ${job.status === 'active' ? 'text-green-600' : 'text-gray-600'}`}>
                        {job.status === 'active' ? t.active : t.completed}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                      <h3 className="text-white">{t[job.category as keyof typeof t]}</h3>
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="text-gray-800 mb-2">{job.title}</h4>
                    <p className="text-sm text-gray-600 mb-3">{job.description}</p>
                    
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center gap-1 text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        <Clock size={16} />
                        <span>{job.duration} {t.minutes}</span>
                      </div>
                      <div className="text-purple-600">${job.price}</div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-3 border-t border-gray-200">
                      <div className="text-center">
                        <div className="text-sm text-blue-600">{job.applicants || 0}</div>
                        <div className="text-xs text-gray-500">{t.applicants}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-purple-600">{job.views || 0}</div>
                        <div className="text-xs text-gray-500">{t.views}</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Calendar size={14} className="text-gray-400" />
                          <div className="text-xs text-gray-500">{job.postedDate || 'Today'}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
