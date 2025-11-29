import { useState } from 'react';
import { Language } from '../App';
import { ChevronLeft, Globe, Shield, HelpCircle, LogOut, ChevronRight, Palette, Image } from 'lucide-react';

interface SettingsProps {
  language: Language;
  setLanguage: (language: Language) => void;
  onNavigate: (page: 'home' | 'profile' | 'wallet' | 'settings' | 'history' | 'subscriptions' | 'postjob' | 'support') => void;
  navColor: string;
  setNavColor: (color: string) => void;
  navBackgroundImage: string;
  setNavBackgroundImage: (image: string) => void;
  onLogout: () => void;
}

const translations = {
  az: {
    settings: 'Ayarlar',
    back: 'Geri',
    language: 'Dil',
    privacy: 'Məxfilik',
    help: 'Kömək',
    logout: 'Çıxış',
    azerbaijani: 'Azərbaycan 🇦🇿',
    english: 'English 🇬🇧',
    russian: 'Русский 🇷🇺',
    turkish: 'Türkçe 🇹🇷',
    german: 'Deutsch 🇩🇪',
    french: 'Français 🇫🇷',
    spanish: 'Español 🇪🇸',
    arabic: 'العربية 🇸🇦',
    selectLanguage: 'Dil seçin',
    menuTheme: 'Menyu Rəngi',
    chooseColor: 'Rəng Seçin',
    backgroundImage: 'Arxa Fon Şəkli',
    imageUrl: 'Şəkil URL daxil edin...',
    apply: 'Tətbiq et',
    remove: 'Sil',
    presetColors: 'Hazır Rənglər',
  },
  en: {
    settings: 'Settings',
    back: 'Back',
    language: 'Language',
    privacy: 'Privacy',
    help: 'Help',
    logout: 'Logout',
    azerbaijani: 'Azərbaycan 🇦🇿',
    english: 'English 🇬🇧',
    russian: 'Русский 🇷🇺',
    turkish: 'Türkçe 🇹🇷',
    german: 'Deutsch 🇩🇪',
    french: 'Français 🇫🇷',
    spanish: 'Español 🇪🇸',
    arabic: 'العربية 🇸🇦',
    selectLanguage: 'Select Language',
    menuTheme: 'Menu Color',
    chooseColor: 'Choose Color',
    backgroundImage: 'Background Image',
    imageUrl: 'Enter image URL...',
    apply: 'Apply',
    remove: 'Remove',
    presetColors: 'Preset Colors',
  },
  ru: {
    settings: 'Настройки',
    back: 'Назад',
    language: 'Язык',
    privacy: 'Конфиденциальность',
    help: 'Помощь',
    logout: 'Выход',
    azerbaijani: 'Azərbaycan 🇦🇿',
    english: 'English 🇬🇧',
    russian: 'Русский 🇷🇺',
    turkish: 'Türkçe 🇹🇷',
    german: 'Deutsch 🇩🇪',
    french: 'Français 🇫🇷',
    spanish: 'Español 🇪🇸',
    arabic: 'العربية 🇸🇦',
    selectLanguage: 'Выберите язык',
    menuTheme: 'Цвет Меню',
    chooseColor: 'Выберите Цвет',
    backgroundImage: 'Фоновое Изображение',
    imageUrl: 'Введите URL изображения...',
    apply: 'Применить',
    remove: 'Удалить',
    presetColors: 'Готовые Цвета',
  },
  tr: {
    settings: 'Ayarlar',
    back: 'Geri',
    language: 'Dil',
    privacy: 'Gizlilik',
    help: 'Yardım',
    logout: 'Çıkış',
    azerbaijani: 'Azərbaycan 🇦🇿',
    english: 'English 🇬🇧',
    russian: 'Русский 🇷🇺',
    turkish: 'Türkçe 🇹🇷',
    german: 'Deutsch 🇩🇪',
    french: 'Français 🇫🇷',
    spanish: 'Español 🇪🇸',
    arabic: 'العربية 🇸🇦',
    selectLanguage: 'Dil Seçin',
    menuTheme: 'Menü Rengi',
    chooseColor: 'Renk Seçin',
    backgroundImage: 'Arka Plan Resmi',
    imageUrl: 'Resim URL girin...',
    apply: 'Uygula',
    remove: 'Kaldır',
    presetColors: 'Hazır Renkler',
  },
  de: {
    settings: 'Einstellungen',
    back: 'Zurück',
    language: 'Sprache',
    privacy: 'Datenschutz',
    help: 'Hilfe',
    logout: 'Abmelden',
    azerbaijani: 'Azərbaycan 🇦🇿',
    english: 'English 🇬🇧',
    russian: 'Русский 🇷🇺',
    turkish: 'Türkçe 🇹🇷',
    german: 'Deutsch 🇩🇪',
    french: 'Français 🇫🇷',
    spanish: 'Español 🇪🇸',
    arabic: 'العربية 🇸🇦',
    selectLanguage: 'Sprache Wählen',
    menuTheme: 'Menüfarbe',
    chooseColor: 'Farbe Wählen',
    backgroundImage: 'Hintergrundbild',
    imageUrl: 'Bild-URL eingeben...',
    apply: 'Anwenden',
    remove: 'Entfernen',
    presetColors: 'Vorgefertigte Farben',
  },
  fr: {
    settings: 'Paramètres',
    back: 'Retour',
    language: 'Langue',
    privacy: 'Confidentialité',
    help: 'Aide',
    logout: 'Déconnexion',
    azerbaijani: 'Azərbaycan 🇦🇿',
    english: 'English 🇬🇧',
    russian: 'Русский 🇷🇺',
    turkish: 'Türkçe 🇹🇷',
    german: 'Deutsch 🇩🇪',
    french: 'Français 🇫🇷',
    spanish: 'Español 🇪🇸',
    arabic: 'العربية 🇸🇦',
    selectLanguage: 'Sélectionner la Langue',
    menuTheme: 'Couleur du Menu',
    chooseColor: 'Choisir la Couleur',
    backgroundImage: 'Image de Fond',
    imageUrl: 'Entrer URL de l\'image...',
    apply: 'Appliquer',
    remove: 'Supprimer',
    presetColors: 'Couleurs Prédéfinies',
  },
  es: {
    settings: 'Configuración',
    back: 'Atrás',
    language: 'Idioma',
    privacy: 'Privacidad',
    help: 'Ayuda',
    logout: 'Cerrar Sesión',
    azerbaijani: 'Azərbaycan 🇦🇿',
    english: 'English 🇬🇧',
    russian: 'Русский 🇷🇺',
    turkish: 'Türkçe 🇹🇷',
    german: 'Deutsch 🇩🇪',
    french: 'Français 🇫🇷',
    spanish: 'Español 🇪🇸',
    arabic: 'العربية 🇸🇦',
    selectLanguage: 'Seleccionar Idioma',
    menuTheme: 'Color del Menú',
    chooseColor: 'Elegir Color',
    backgroundImage: 'Imagen de Fondo',
    imageUrl: 'Ingrese URL de imagen...',
    apply: 'Aplicar',
    remove: 'Eliminar',
    presetColors: 'Colores Predeterminados',
  },
  ar: {
    settings: 'الإعدادات',
    back: 'رجوع',
    language: 'اللغة',
    privacy: 'الخصوصية',
    help: 'المساعدة',
    logout: 'تسجيل الخروج',
    azerbaijani: 'Azərbaycan 🇦🇿',
    english: 'English 🇬🇧',
    russian: 'Русский 🇷🇺',
    turkish: 'Türkçe 🇹🇷',
    german: 'Deutsch 🇩🇪',
    french: 'Français 🇫🇷',
    spanish: 'Español 🇪🇸',
    arabic: 'العربية 🇸🇦',
    selectLanguage: 'اختر اللغة',
    menuTheme: 'لون القائمة',
    chooseColor: 'اختر اللون',
    backgroundImage: 'صورة الخلفية',
    imageUrl: 'أدخل عنوان URL للصورة...',
    apply: 'تطبيق',
    remove: 'إزالة',
    presetColors: 'الألوان الجاهزة',
  },
};

const presetColors = [
  { name: 'Purple-Blue-Pink', gradient: 'from-purple-600 via-blue-600 to-pink-600' },
  { name: 'Green-Teal-Cyan', gradient: 'from-green-600 via-teal-600 to-cyan-600' },
  { name: 'Orange-Red-Pink', gradient: 'from-orange-600 via-red-600 to-pink-600' },
  { name: 'Blue-Purple-Indigo', gradient: 'from-blue-600 via-purple-600 to-indigo-600' },
  { name: 'Yellow-Orange-Red', gradient: 'from-yellow-600 via-orange-600 to-red-600' },
  { name: 'Pink-Rose-Red', gradient: 'from-pink-600 via-rose-600 to-red-600' },
  { name: 'Emerald-Green-Teal', gradient: 'from-emerald-600 via-green-600 to-teal-600' },
  { name: 'Indigo-Blue-Cyan', gradient: 'from-indigo-600 via-blue-600 to-cyan-600' },
];

export function Settings({ language, setLanguage, onNavigate, navColor, setNavColor, navBackgroundImage, setNavBackgroundImage, onLogout }: SettingsProps) {
  const t = translations[language];
  const [tempImageUrl, setTempImageUrl] = useState(navBackgroundImage);

  const handleApplyImage = () => {
    setNavBackgroundImage(tempImageUrl);
  };

  const handleRemoveImage = () => {
    setTempImageUrl('');
    setNavBackgroundImage('');
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
          <h1 className="text-gray-800">{t.settings}</h1>
        </div>

        {/* Settings Options */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Language */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  <Globe className="text-white" size={20} />
                </div>
                <span className="text-gray-800">{t.language}</span>
              </div>
            </div>
            <div className="ml-13 space-y-2">
              <button
                onClick={() => setLanguage('az')}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all transform hover:scale-102 ${
                  language === 'az' ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg' : 'hover:bg-gray-100'
                }`}
              >
                {t.azerbaijani}
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all transform hover:scale-102 ${
                  language === 'en' ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg' : 'hover:bg-gray-100'
                }`}
              >
                {t.english}
              </button>
              <button
                onClick={() => setLanguage('ru')}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all transform hover:scale-102 ${
                  language === 'ru' ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg' : 'hover:bg-gray-100'
                }`}
              >
                {t.russian}
              </button>
              <button
                onClick={() => setLanguage('tr')}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all transform hover:scale-102 ${
                  language === 'tr' ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg' : 'hover:bg-gray-100'
                }`}
              >
                {t.turkish}
              </button>
              <button
                onClick={() => setLanguage('de')}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all transform hover:scale-102 ${
                  language === 'de' ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg' : 'hover:bg-gray-100'
                }`}
              >
                {t.german}
              </button>
              <button
                onClick={() => setLanguage('fr')}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all transform hover:scale-102 ${
                  language === 'fr' ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg' : 'hover:bg-gray-100'
                }`}
              >
                {t.french}
              </button>
              <button
                onClick={() => setLanguage('es')}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all transform hover:scale-102 ${
                  language === 'es' ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg' : 'hover:bg-gray-100'
                }`}
              >
                {t.spanish}
              </button>
              <button
                onClick={() => setLanguage('ar')}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all transform hover:scale-102 ${
                  language === 'ar' ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg' : 'hover:bg-gray-100'
                }`}
              >
                {t.arabic}
              </button>
            </div>
          </div>

          {/* Privacy */}
          <button className="w-full p-4 border-b border-gray-200 flex items-center justify-between hover:bg-gradient-to-r hover:from-green-50 hover:to-green-100 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                <Shield className="text-white" size={20} />
              </div>
              <span className="text-gray-800">{t.privacy}</span>
            </div>
            <ChevronRight className="text-gray-400" size={20} />
          </button>

          {/* Help */}
          <button 
            onClick={() => onNavigate('support')}
            className="w-full p-4 border-b border-gray-200 flex items-center justify-between hover:bg-gradient-to-r hover:from-yellow-50 hover:to-yellow-100 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
                <HelpCircle className="text-white" size={20} />
              </div>
              <span className="text-gray-800">{t.help}</span>
            </div>
            <ChevronRight className="text-gray-400" size={20} />
          </button>
        </div>

        {/* Menu Theme Customization */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Menu Color */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
                <Palette className="text-white" size={20} />
              </div>
              <span className="text-gray-800">{t.menuTheme}</span>
            </div>
            <div className="ml-13 space-y-3">
              <p className="text-sm text-gray-600 mb-2">{t.presetColors}</p>
              <div className="grid grid-cols-2 gap-2">
                {presetColors.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => setNavColor(preset.gradient)}
                    className={`p-3 rounded-xl transition-all transform hover:scale-105 ${
                      navColor === preset.gradient ? 'ring-4 ring-purple-400 shadow-lg' : 'ring-2 ring-gray-200'
                    }`}
                  >
                    <div className={`h-8 rounded-lg bg-gradient-to-r ${preset.gradient} mb-2`}></div>
                    <p className="text-xs text-gray-600">{preset.name}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Background Image */}
          <div className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-full flex items-center justify-center shadow-lg">
                <Image className="text-white" size={20} />
              </div>
              <span className="text-gray-800">{t.backgroundImage}</span>
            </div>
            <div className="ml-13 space-y-3">
              <input
                type="text"
                value={tempImageUrl}
                onChange={(e) => setTempImageUrl(e.target.value)}
                placeholder={t.imageUrl}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-sm"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleApplyImage}
                  disabled={!tempImageUrl.trim()}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl py-2 text-sm hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {t.apply}
                </button>
                <button
                  onClick={handleRemoveImage}
                  className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl py-2 text-sm hover:shadow-lg transform hover:scale-105 transition-all"
                >
                  {t.remove}
                </button>
              </div>
              {navBackgroundImage && (
                <div className="mt-2">
                  <p className="text-xs text-gray-500 mb-2">Önizləmə:</p>
                  <div className="h-16 rounded-xl overflow-hidden border-2 border-gray-200">
                    <img src={navBackgroundImage} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Logout */}
        <button 
          onClick={onLogout}
          className="w-full bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-4 shadow-xl flex items-center justify-center gap-3 text-white hover:shadow-2xl transform hover:scale-105 transition-all"
        >
          <LogOut size={20} />
          <span>{t.logout}</span>
        </button>
      </div>
    </div>
  );
}
