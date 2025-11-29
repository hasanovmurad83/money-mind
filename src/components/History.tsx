import { Language, User } from '../App';
import { ChevronLeft, Clock, CheckCircle, XCircle, Calendar } from 'lucide-react';

interface HistoryProps {
  language: Language;
  user: User;
  setUser: (user: User) => void;
  onNavigate: (page: 'home' | 'profile' | 'wallet' | 'settings' | 'history' | 'subscriptions' | 'postjob' | 'myjobs' | 'extrawork') => void;
}

const translations = {
  az: {
    history: 'Tapşırıq Tarixçəsi',
    back: 'Geri',
    pending: 'Gözləyir',
    approved: 'Tamamlandı',
    rejected: 'Ləğv edildi',
    noHistory: 'Tarixçə yoxdur',
    appliedOn: 'Müraciət tarixi',
    postedBy: 'İşəgötürən',
  },
  en: {
    history: 'Task History',
    back: 'Back',
    pending: 'Pending',
    approved: 'Completed',
    rejected: 'Cancelled',
    noHistory: 'No history',
    appliedOn: 'Applied on',
    postedBy: 'Posted by',
  },
  ru: {
    history: 'История Задач',
    back: 'Назад',
    pending: 'Ожидание',
    approved: 'Завершено',
    rejected: 'Отменено',
    noHistory: 'Нет истории',
    appliedOn: 'Дата подачи',
    postedBy: 'Опубликовано',
  },
  tr: {
    history: 'Görev Geçmişi',
    back: 'Geri',
    pending: 'Beklemede',
    approved: 'Tamamlandı',
    rejected: 'İptal Edildi',
    noHistory: 'Geçmiş yok',
    appliedOn: 'Başvuru tarihi',
    postedBy: 'Yayınlayan',
  },
  de: {
    history: 'Aufgabenverlauf',
    back: 'Zurück',
    pending: 'Ausstehend',
    approved: 'Abgeschlossen',
    rejected: 'Abgebrochen',
    noHistory: 'Kein Verlauf',
    appliedOn: 'Eingereicht am',
    postedBy: 'Veröffentlicht von',
  },
  fr: {
    history: 'Historique des Tâches',
    back: 'Retour',
    pending: 'En attente',
    approved: 'Terminé',
    rejected: 'Annulé',
    noHistory: 'Pas d\'historique',
    appliedOn: 'Postulé le',
    postedBy: 'Publié par',
  },
  es: {
    history: 'Historial de Tareas',
    back: 'Atrás',
    pending: 'Pendiente',
    approved: 'Completado',
    rejected: 'Cancelado',
    noHistory: 'Sin historial',
    appliedOn: 'Aplicado el',
    postedBy: 'Publicado por',
  },
  ar: {
    history: 'تاريخ المهام',
    back: 'رجوع',
    pending: 'قيد الانتظار',
    approved: 'مكتمل',
    rejected: 'ملغى',
    noHistory: 'لا يوجد تاريخ',
    appliedOn: 'تم التقديم في',
    postedBy: 'نشر بواسطة',
  },
};

export function History({ language, user, setUser, onNavigate }: HistoryProps) {
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
          <h1 className="text-gray-800">{t.history}</h1>
        </div>

        {/* History List */}
        {user.pendingJobs && user.pendingJobs.length > 0 ? (
          <div className="space-y-4">
            {user.pendingJobs.map((job) => (
              <div
                key={job.id}
                className={`rounded-3xl p-6 shadow-xl border-2 transition-all ${
                  job.status === 'pending'
                    ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-300'
                    : job.status === 'approved'
                    ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-300'
                    : 'bg-gradient-to-br from-red-50 to-pink-50 border-red-300'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-gray-800 mb-1">{job.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{job.description}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                      <Calendar size={14} />
                      <span>{t.appliedOn}: {new Date(job.appliedAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-xs text-gray-600">{t.postedBy}: {job.postedBy}</p>
                  </div>
                  <div
                    className={`px-4 py-2 rounded-full text-sm flex items-center gap-2 whitespace-nowrap ${
                      job.status === 'pending'
                        ? 'bg-yellow-200 text-yellow-800'
                        : job.status === 'approved'
                        ? 'bg-green-200 text-green-800'
                        : 'bg-red-200 text-red-800'
                    }`}
                  >
                    {job.status === 'pending' ? (
                      <Clock size={16} className="animate-spin" />
                    ) : job.status === 'approved' ? (
                      <CheckCircle size={16} />
                    ) : (
                      <XCircle size={16} />
                    )}
                    {t[job.status]}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t-2 border-gray-200">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock size={16} />
                    <span>{job.duration} dəqiqə</span>
                  </div>
                  <div
                    className={`text-lg font-bold ${
                      job.status === 'approved'
                        ? 'text-green-600'
                        : job.status === 'rejected'
                        ? 'text-red-600'
                        : 'text-orange-600'
                    }`}
                  >
                    ${job.price.toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-8 shadow-xl text-center">
            <Calendar className="mx-auto mb-4 text-gray-300" size={64} />
            <p className="text-gray-500">{t.noHistory}</p>
          </div>
        )}
      </div>
    </div>
  );
}
