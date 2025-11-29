import { useState } from 'react';
import { Language, User, Card } from '../App';
import { ChevronLeft, DollarSign, ArrowUpRight, ArrowDownRight, Clock, XCircle, CheckCircle, Coffee, Car, Film, UtensilsCrossed, ShoppingBag, CreditCard, Plus, Repeat, Trash2 } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface WalletProps {
  language: Language;
  user: User;
  setUser: (user: User) => void;
  onNavigate: (page: 'home' | 'profile' | 'wallet' | 'settings' | 'history' | 'subscriptions' | 'postjob' | 'extrawork') => void;
}

const translations = {
  az: {
    wallet: 'Pulqabı',
    back: 'Geri',
    balance: 'Balans',
    deposit: 'Depozit',
    withdraw: 'Çıxarış',
    transactions: 'Əməliyyatlar',
    pendingJobs: 'Gözləyən İşlər',
    payment: 'Ödəniş',
    received: 'Qəbul edildi',
    taskCompleted: 'Tapşırıq tamamlandı',
    withdrawalSuccess: 'Çıxarış uğurlu oldu',
    addFunds: 'Vəsait əlavə et',
    withdrawFunds: 'Vəsait çıxart',
    amount: 'Məbləğ',
    confirm: 'Təsdiqlə',
    cancel: 'Ləğv et',
    insufficientBalance: 'Balans kifayət etmir',
    depositSuccess: 'Depozit uğurla əlavə edildi',
    withdrawSuccess: 'Pul uğurla çıxarıldı',
    minWithdraw: 'Minimum çıxarış məbləği: $5',
    noTransactions: 'Əməliyyat yoxdur',
    pending: 'Gözləmədə',
    approved: 'Təsdiqləndi',
    rejected: 'Rədd edildi',
    noPendingJobs: 'Gözləyən iş yoxdur',
    cards: 'Kartlarım',
    addCard: 'Kart əlavə et',
    cardHolder: 'Kart sahibi',
    cardNumber: 'Kart nömrəsi',
    transferBetweenCards: 'Kartlar arası köçürmə',
    from: 'Haradan',
    to: 'Hara',
    transfer: 'Köçür',
    cardAdded: 'Kart uğurla əlavə edildi',
    transferSuccess: 'Köçürmə uğurla tamamlandı',
    noCards: 'Kart yoxdur',
    cardBalance: 'Kart balansı',
    selectCard: 'Kart seçin',
    deleteCard: 'Kartı sil',
    cardDeleted: 'Kart uğurla silindi',
    selectDestinationCard: 'Hədəf kartı seçin',
    withdrawToCard: 'Karta çıxarış',
    cardToBalance: 'Kartdan balansa',
    transferFromCardToBalance: 'Kartdan balansa köçürmə',
    detailedExpenses: 'Ətraflı Xərc Siyahısı',
    noExpenses: 'Xərc yoxdur',
    selectPaymentMethod: 'Ödəniş üsulunu seçin',
    m10: 'M10',
    binance: 'Binance',
    selectSource: 'Mənbə seçin',
  },
  en: {
    wallet: 'Wallet',
    back: 'Back',
    balance: 'Balance',
    deposit: 'Deposit',
    withdraw: 'Withdraw',
    transactions: 'Transactions',
    pendingJobs: 'Pending Jobs',
    payment: 'Payment',
    received: 'Received',
    taskCompleted: 'Task completed',
    withdrawalSuccess: 'Withdrawal successful',
    addFunds: 'Add Funds',
    withdrawFunds: 'Withdraw Funds',
    amount: 'Amount',
    confirm: 'Confirm',
    cancel: 'Cancel',
    insufficientBalance: 'Insufficient balance',
    depositSuccess: 'Deposit added successfully',
    withdrawSuccess: 'Money withdrawn successfully',
    minWithdraw: 'Minimum withdrawal amount: $5',
    noTransactions: 'No transactions',
    pending: 'Pending',
    approved: 'Approved',
    rejected: 'Rejected',
    noPendingJobs: 'No pending jobs',
    cards: 'My Cards',
    addCard: 'Add Card',
    cardHolder: 'Card Holder',
    cardNumber: 'Card Number',
    transferBetweenCards: 'Transfer Between Cards',
    from: 'From',
    to: 'To',
    transfer: 'Transfer',
    cardAdded: 'Card added successfully',
    transferSuccess: 'Transfer completed successfully',
    noCards: 'No cards',
    cardBalance: 'Card Balance',
    selectCard: 'Select Card',
    deleteCard: 'Delete Card',
    cardDeleted: 'Card deleted successfully',
    selectDestinationCard: 'Select destination card',
    withdrawToCard: 'Withdraw to Card',
    cardToBalance: 'Card to Balance',
    transferFromCardToBalance: 'Transfer from Card to Balance',
    detailedExpenses: 'Detailed Expenses',
    noExpenses: 'No expenses',
    selectPaymentMethod: 'Select Payment Method',
    m10: 'M10',
    binance: 'Binance',
    selectSource: 'Select Source',
  },
  ru: {
    wallet: 'Кошелек',
    back: 'Назад',
    balance: 'Баланс',
    deposit: 'Депозит',
    withdraw: 'Вывод',
    transactions: 'Транзакции',
    pendingJobs: 'Ожидающие Работы',
    payment: 'Платеж',
    received: 'Получено',
    taskCompleted: 'Задача завершена',
    withdrawalSuccess: 'Вывод выполнен',
    addFunds: 'Добавить средства',
    withdrawFunds: 'Вывести средства',
    amount: 'Сумма',
    confirm: 'Подтвердить',
    cancel: 'Отмена',
    insufficientBalance: 'Недостаточно средств',
    depositSuccess: 'Депозит успешно добавлен',
    withdrawSuccess: 'Средства успешно выведены',
    minWithdraw: 'Минимальная сумма вывода: $5',
    noTransactions: 'Нет транзакций',
    pending: 'В ожидании',
    approved: 'Одобрено',
    rejected: 'Отклонено',
    noPendingJobs: 'Нет ожидающих работ',
    cards: 'Мои Карты',
    addCard: 'Добавить Карту',
    cardHolder: 'Владелец карты',
    cardNumber: 'Номер карты',
    transferBetweenCards: 'Перевод между картами',
    from: 'Откуда',
    to: 'Куда',
    transfer: 'Перевести',
    cardAdded: 'Карта успешно добавлена',
    transferSuccess: 'Перевод успешно завершен',
    noCards: 'Нет карт',
    cardBalance: 'Баланс карты',
    selectCard: 'Выберите карту',
    deleteCard: 'Удалить карту',
    cardDeleted: 'Карта успешно удалена',
    selectDestinationCard: 'Выберите карту назначения',
    withdrawToCard: 'Вывести на карту',
    cardToBalance: 'Карта на баланс',
    transferFromCardToBalance: 'Перевод с карты на баланс',
    detailedExpenses: 'Подробные расходы',
    noExpenses: 'Нет расходов',
    selectPaymentMethod: 'Выберите способ оплаты',
    m10: 'M10',
    binance: 'Binance',
    selectSource: 'Выберите источник',
  },
  tr: {
    wallet: 'Cüzdan',
    back: 'Geri',
    balance: 'Bakiye',
    deposit: 'Para Yatır',
    withdraw: 'Para Çek',
    transactions: 'İşlemler',
    pendingJobs: 'Bekleyen İşler',
    payment: 'Ödeme',
    received: 'Alındı',
    taskCompleted: 'Görev tamamlandı',
    withdrawalSuccess: 'Para çekme başarılı',
    addFunds: 'Fon Ekle',
    withdrawFunds: 'Fon Çek',
    amount: 'Tutar',
    confirm: 'Onayla',
    cancel: 'İptal',
    insufficientBalance: 'Yetersiz bakiye',
    depositSuccess: 'Depozit başarıyla eklendi',
    withdrawSuccess: 'Para başarıyla çekildi',
    minWithdraw: 'Minimum çekim tutarı: $5',
    noTransactions: 'İşlem yok',
    pending: 'Beklemede',
    approved: 'Onaylandı',
    rejected: 'Reddedildi',
    noPendingJobs: 'Bekleyen iş yok',
    cards: 'Kartlarım',
    addCard: 'Kart Ekle',
    cardHolder: 'Kart Sahibi',
    cardNumber: 'Kart Numarası',
    transferBetweenCards: 'Kartlar Arası Transfer',
    from: 'Nereden',
    to: 'Nereye',
    transfer: 'Transfer',
    cardAdded: 'Kart başarıyla eklendi',
    transferSuccess: 'Transfer başarıyla tamamlandı',
    noCards: 'Kart yok',
    cardBalance: 'Kart Bakiyesi',
    selectCard: 'Kart Seçin',
    deleteCard: 'Kartı Sil',
    cardDeleted: 'Kart başarıyla silindi',
    selectDestinationCard: 'Hedef kartı seçin',
    withdrawToCard: 'Karta Çekme',
    cardToBalance: 'Karttan Bakiyeye',
    transferFromCardToBalance: 'Karttan bakiyeye transfer',
    detailedExpenses: 'Detaylı Harcamalar',
    noExpenses: 'Harcama yok',
    selectPaymentMethod: 'Ödeme yöntemini seçin',
    m10: 'M10',
    binance: 'Binance',
    selectSource: 'Kaynak seçin',
  },
  de: {
    wallet: 'Geldbörse',
    back: 'Zurück',
    balance: 'Guthaben',
    deposit: 'Einzahlung',
    withdraw: 'Abheben',
    transactions: 'Transaktionen',
    pendingJobs: 'Ausstehende Aufträge',
    payment: 'Zahlung',
    received: 'Erhalten',
    taskCompleted: 'Aufgabe abgeschlossen',
    withdrawalSuccess: 'Abhebung erfolgreich',
    addFunds: 'Geld hinzufügen',
    withdrawFunds: 'Geld abheben',
    amount: 'Betrag',
    confirm: 'Bestätigen',
    cancel: 'Abbrechen',
    insufficientBalance: 'Unzureichendes Guthaben',
    depositSuccess: 'Einzahlung erfolgreich hinzugefügt',
    withdrawSuccess: 'Geld erfolgreich abgehoben',
    minWithdraw: 'Mindestabhebungsbetrag: $5',
    noTransactions: 'Keine Transaktionen',
    pending: 'Ausstehend',
    approved: 'Genehmigt',
    rejected: 'Abgelehnt',
    noPendingJobs: 'Keine ausstehenden Aufträge',
    cards: 'Meine Karten',
    addCard: 'Karte hinzufügen',
    cardHolder: 'Karteninhaber',
    cardNumber: 'Kartennummer',
    transferBetweenCards: 'Übertragung zwischen Karten',
    from: 'Von',
    to: 'Nach',
    transfer: 'Übertragen',
    cardAdded: 'Karte erfolgreich hinzugefügt',
    transferSuccess: 'Übertragung erfolgreich abgeschlossen',
    noCards: 'Keine Karten',
    cardBalance: 'Kartenguthaben',
    selectCard: 'Karte auswählen',
    deleteCard: 'Karte löschen',
    cardDeleted: 'Karte erfolgreich gelöscht',
    selectDestinationCard: 'Zielkarte auswählen',
    withdrawToCard: 'Auf Karte abheben',
    cardToBalance: 'Karte zu Guthaben',
    transferFromCardToBalance: 'Überweisung von Karte auf Guthaben',
    detailedExpenses: 'Detaillierte Ausgaben',
    noExpenses: 'Keine Ausgaben',
    selectPaymentMethod: 'Zahlungsmethode wählen',
    m10: 'M10',
    binance: 'Binance',
    selectSource: 'Quelle auswählen',
  },
  fr: {
    wallet: 'Portefeuille',
    back: 'Retour',
    balance: 'Solde',
    deposit: 'Dépôt',
    withdraw: 'Retrait',
    transactions: 'Transactions',
    pendingJobs: 'Travaux en Attente',
    payment: 'Paiement',
    received: 'Reçu',
    taskCompleted: 'Tâche terminée',
    withdrawalSuccess: 'Retrait réussi',
    addFunds: 'Ajouter des fonds',
    withdrawFunds: 'Retirer des fonds',
    amount: 'Montant',
    confirm: 'Confirmer',
    cancel: 'Annuler',
    insufficientBalance: 'Solde insuffisant',
    depositSuccess: 'Dépôt ajouté avec succès',
    withdrawSuccess: 'Argent retiré avec succès',
    minWithdraw: 'Montant minimum de retrait: $5',
    noTransactions: 'Aucune transaction',
    pending: 'En attente',
    approved: 'Approuvé',
    rejected: 'Rejeté',
    noPendingJobs: 'Aucun travail en attente',
    cards: 'Mes Cartes',
    addCard: 'Ajouter une Carte',
    cardHolder: 'Titulaire de la carte',
    cardNumber: 'Numéro de carte',
    transferBetweenCards: 'Transfert entre cartes',
    from: 'De',
    to: 'À',
    transfer: 'Transférer',
    cardAdded: 'Carte ajoutée avec succès',
    transferSuccess: 'Transfert effectué avec succès',
    noCards: 'Aucune carte',
    cardBalance: 'Solde de la carte',
    selectCard: 'Sélectionner une carte',
    deleteCard: 'Supprimer la carte',
    cardDeleted: 'Carte supprimée avec succès',
    selectDestinationCard: 'Sélectionner la carte de destination',
    withdrawToCard: 'Retirer sur carte',
    cardToBalance: 'Carte vers solde',
    transferFromCardToBalance: 'Transfert de la carte vers le solde',
    detailedExpenses: 'Dépenses détaillées',
    noExpenses: 'Aucune dépense',
    selectPaymentMethod: 'Sélectionner le mode de paiement',
    m10: 'M10',
    binance: 'Binance',
    selectSource: 'Sélectionner la source',
  },
  es: {
    wallet: 'Billetera',
    back: 'Atrás',
    balance: 'Saldo',
    deposit: 'Depósito',
    withdraw: 'Retirar',
    transactions: 'Transacciones',
    pendingJobs: 'Trabajos Pendientes',
    payment: 'Pago',
    received: 'Recibido',
    taskCompleted: 'Tarea completada',
    withdrawalSuccess: 'Retiro exitoso',
    addFunds: 'Agregar Fondos',
    withdrawFunds: 'Retirar Fondos',
    amount: 'Cantidad',
    confirm: 'Confirmar',
    cancel: 'Cancelar',
    insufficientBalance: 'Saldo insuficiente',
    depositSuccess: 'Depósito agregado exitosamente',
    withdrawSuccess: 'Dinero retirado exitosamente',
    minWithdraw: 'Cantidad mínima de retiro: $5',
    noTransactions: 'Sin transacciones',
    pending: 'Pendiente',
    approved: 'Aprobado',
    rejected: 'Rechazado',
    noPendingJobs: 'No hay trabajos pendientes',
    cards: 'Mis Tarjetas',
    addCard: 'Agregar Tarjeta',
    cardHolder: 'Titular de la tarjeta',
    cardNumber: 'Número de tarjeta',
    transferBetweenCards: 'Transferir entre tarjetas',
    from: 'Desde',
    to: 'Hasta',
    transfer: 'Transferir',
    cardAdded: 'Tarjeta agregada exitosamente',
    transferSuccess: 'Transferencia completada exitosamente',
    noCards: 'Sin tarjetas',
    cardBalance: 'Saldo de la tarjeta',
    selectCard: 'Seleccionar tarjeta',
    deleteCard: 'Eliminar tarjeta',
    cardDeleted: 'Tarjeta eliminada exitosamente',
    selectDestinationCard: 'Seleccionar tarjeta de destino',
    withdrawToCard: 'Retirar a tarjeta',
    cardToBalance: 'Tarjeta a saldo',
    transferFromCardToBalance: 'Transferir de tarjeta a saldo',
    detailedExpenses: 'Gastos detallados',
    noExpenses: 'Sin gastos',
    selectPaymentMethod: 'Seleccionar método de pago',
    m10: 'M10',
    binance: 'Binance',
    selectSource: 'Seleccionar fuente',
  },
  ar: {
    wallet: 'المحفظة',
    back: 'رجوع',
    balance: 'الرصيد',
    deposit: 'إيداع',
    withdraw: 'سحب',
    transactions: 'المعاملات',
    pendingJobs: 'الأعمال المعلقة',
    payment: 'دفع',
    received: 'مستلم',
    taskCompleted: 'اكتملت المهمة',
    withdrawalSuccess: 'نجح السحب',
    addFunds: 'إضافة أموال',
    withdrawFunds: 'سحب أموال',
    amount: 'المبلغ',
    confirm: 'تأكيد',
    cancel: 'إلغاء',
    insufficientBalance: 'رصيد غير كاف',
    depositSuccess: 'تمت إضافة الإيداع بنجاح',
    withdrawSuccess: 'تم سحب المال بنجاح',
    minWithdraw: 'الحد الأدنى لمبلغ السحب: $5',
    noTransactions: 'لا توجد معاملات',
    pending: 'قيد الانتظار',
    approved: 'موافق عليه',
    rejected: 'مرفوض',
    noPendingJobs: 'لا توجد أعمال معلقة',
    cards: 'بطاقاتي',
    addCard: 'إضافة بطاقة',
    cardHolder: 'حامل البطاقة',
    cardNumber: 'رقم البطاقة',
    transferBetweenCards: 'التحويل بين البطاقات',
    from: 'من',
    to: 'إلى',
    transfer: 'تحويل',
    cardAdded: 'تمت إضافة البطاقة بنجاح',
    transferSuccess: 'اكتمل التحويل بنجاح',
    noCards: 'لا توجد بطاقات',
    cardBalance: 'رصيد البطاقة',
    selectCard: 'اختر البطاقة',
    deleteCard: 'حذف البطاقة',
    cardDeleted: 'تم حذف البطاقة بنجاح',
    selectDestinationCard: 'اختر البطاقة الوجهة',
    withdrawToCard: 'سحب إلى البطاقة',
    cardToBalance: 'بطاقة إلى الرصيد',
    transferFromCardToBalance: 'تحويل من البطاقة إلى الرصيد',
    detailedExpenses: 'النفقات التفصيلية',
    noExpenses: 'لا توجد نفقات',
    selectPaymentMethod: 'اختر طريقة الدفع',
    m10: 'M10',
    binance: 'Binance',
    selectSource: 'اختر المصدر',
  },
};

const categoryIcons: { [key: string]: any } = {
  'Kafe': Coffee,
  'Restoran': UtensilsCrossed,
  'Əyləncə': Film,
  'Nəqliyyat': Car,
  'Alış-veriş': ShoppingBag,
};

const cardTypeColors: { [key: string]: { gradient: string, text: string } } = {
  'visa': { gradient: 'from-blue-500 to-blue-700', text: 'VISA' },
  'mastercard': { gradient: 'from-red-500 to-orange-600', text: 'Mastercard' },
  'amex': { gradient: 'from-green-600 to-teal-700', text: 'AMEX' },
};

export function Wallet({ language, user, setUser, onNavigate }: WalletProps) {
  const t = translations[language];
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showCardToBalanceModal, setShowCardToBalanceModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [newCardNumber, setNewCardNumber] = useState('');
  const [newCardHolder, setNewCardHolder] = useState('');
  const [newCardBalance, setNewCardBalance] = useState('');
  const [newCardType, setNewCardType] = useState<'visa' | 'mastercard' | 'amex'>('visa');
  const [transferFromCard, setTransferFromCard] = useState<number | null>(null);
  const [transferToCard, setTransferToCard] = useState<number | null>(null);
  const [transferAmount, setTransferAmount] = useState('');
  const [selectedCardForWithdraw, setSelectedCardForWithdraw] = useState<number | null>(null);
  const [selectedCardForDeposit, setSelectedCardForDeposit] = useState<number | null>(null);
  const [cardToBalanceAmount, setCardToBalanceAmount] = useState('');
  const [depositSource, setDepositSource] = useState<'m10' | 'binance' | ''>('');

  const handleDeposit = () => {
    const amount = parseFloat(depositAmount);
    
    if (!depositSource) {
      toast.error(t.selectSource);
      return;
    }
    
    if (amount && amount > 0) {
      const sourceText = depositSource === 'm10' ? 'M10' : 'Binance';
      const newTransaction = {
        id: Date.now(),
        type: 'deposit' as const,
        description: `${t.depositSuccess} (${sourceText})`,
        amount: amount,
        date: new Date().toISOString().split('T')[0]
      };
      
      setUser({ 
        ...user, 
        balance: user.balance + amount,
        transactions: [newTransaction, ...user.transactions]
      });
      
      toast.success(`${t.depositSuccess} (${sourceText})`);
      setDepositAmount('');
      setDepositSource('');
      setShowDepositModal(false);
    }
  };

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    
    if (!amount || amount <= 0) {
      toast.error(t.minWithdraw);
      return;
    }
    
    if (amount < 5) {
      toast.error(t.minWithdraw);
      return;
    }
    
    if (amount > user.balance) {
      toast.error(t.insufficientBalance);
      return;
    }

    // If a card is selected, withdraw to that card
    if (selectedCardForWithdraw !== null) {
      const updatedCards = user.cards?.map(card => {
        if (card.id === selectedCardForWithdraw) {
          return { ...card, balance: card.balance + amount };
        }
        return card;
      }) || [];

      const newTransaction = {
        id: Date.now(),
        type: 'withdraw' as const,
        description: t.withdrawToCard,
        amount: -amount,
        date: new Date().toISOString().split('T')[0]
      };

      setUser({ 
        ...user, 
        balance: user.balance - amount,
        cards: updatedCards,
        transactions: [newTransaction, ...user.transactions]
      });

      toast.success(t.withdrawSuccess);
    } else {
      // Regular withdrawal (to external account)
      const newTransaction = {
        id: Date.now(),
        type: 'withdraw' as const,
        description: t.withdrawSuccess,
        amount: -amount,
        date: new Date().toISOString().split('T')[0]
      };
      
      setUser({ 
        ...user, 
        balance: user.balance - amount,
        transactions: [newTransaction, ...user.transactions]
      });
      
      toast.success(t.withdrawSuccess);
    }
    
    setWithdrawAmount('');
    setSelectedCardForWithdraw(null);
    setShowWithdrawModal(false);
  };

  const handleDeleteCard = (cardId: number) => {
    const updatedCards = user.cards?.filter(card => card.id !== cardId) || [];
    setUser({
      ...user,
      cards: updatedCards,
    });
    toast.success(t.cardDeleted);
  };

  const handleAddCard = () => {
    if (!newCardNumber || !newCardHolder || !newCardBalance) {
      toast.error(t.insufficientBalance);
      return;
    }

    if (newCardNumber.length !== 16) {
      toast.error(t.cardNumber);
      return;
    }

    const amount = parseFloat(newCardBalance);
    if (!amount || amount <= 0) {
      return;
    }

    const newCard: Card = {
      id: Date.now(),
      cardNumber: newCardNumber,
      cardHolder: newCardHolder,
      balance: amount,
      type: newCardType,
    };

    setUser({
      ...user,
      cards: [...(user.cards || []), newCard],
    });

    toast.success(t.cardAdded);
    setNewCardNumber('');
    setNewCardHolder('');
    setNewCardBalance('');
    setNewCardType('visa');
    setShowAddCardModal(false);
  };

  const handleTransferBetweenCards = () => {
    if (transferFromCard === null || transferToCard === null) {
      toast.error(t.selectCard);
      return;
    }

    if (transferFromCard === transferToCard) {
      toast.error(t.selectCard);
      return;
    }

    const amount = parseFloat(transferAmount);
    if (!amount || amount <= 0) {
      return;
    }

    const fromCard = user.cards?.find(c => c.id === transferFromCard);
    const toCard = user.cards?.find(c => c.id === transferToCard);

    if (!fromCard || !toCard) {
      return;
    }

    if (fromCard.balance < amount) {
      toast.error(t.insufficientBalance);
      return;
    }

    const updatedCards = user.cards?.map(card => {
      if (card.id === transferFromCard) {
        return { ...card, balance: card.balance - amount };
      }
      if (card.id === transferToCard) {
        return { ...card, balance: card.balance + amount };
      }
      return card;
    }) || [];

    setUser({
      ...user,
      cards: updatedCards,
    });

    toast.success(t.transferSuccess);
    setTransferFromCard(null);
    setTransferToCard(null);
    setTransferAmount('');
    setShowTransferModal(false);
  };

  const handleCardToBalanceTransfer = () => {
    if (selectedCardForDeposit === null) {
      toast.error(t.selectCard);
      return;
    }

    const amount = parseFloat(cardToBalanceAmount);
    if (!amount || amount <= 0) {
      return;
    }

    const selectedCard = user.cards?.find(c => c.id === selectedCardForDeposit);
    if (!selectedCard) {
      return;
    }

    if (selectedCard.balance < amount) {
      toast.error(t.insufficientBalance);
      return;
    }

    const updatedCards = user.cards?.map(card => {
      if (card.id === selectedCardForDeposit) {
        return { ...card, balance: card.balance - amount };
      }
      return card;
    }) || [];

    const newTransaction = {
      id: Date.now(),
      type: 'deposit' as const,
      description: t.cardToBalance,
      amount: amount,
      date: new Date().toISOString().split('T')[0]
    };

    setUser({
      ...user,
      balance: user.balance + amount,
      cards: updatedCards,
      transactions: [newTransaction, ...user.transactions]
    });

    toast.success(t.transferSuccess);
    setSelectedCardForDeposit(null);
    setCardToBalanceAmount('');
    setShowCardToBalanceModal(false);
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
          <h1 className="text-gray-800">{t.wallet}</h1>
        </div>

        {/* Balance Card */}
        <div className="relative bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600 rounded-3xl p-6 shadow-2xl text-white overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-12 -mt-12"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-8 -mb-8"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign size={20} />
              <span className="text-sm opacity-90">{t.balance}</span>
            </div>
            <div className="text-5xl mb-6">${user.balance.toFixed(2)}</div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowDepositModal(true)}
                className="flex-1 bg-white text-purple-600 rounded-2xl py-3 flex items-center justify-center gap-2 hover:bg-gray-50 transition-all transform hover:scale-105 shadow-lg"
              >
                <ArrowDownRight size={20} />
                <span>{t.deposit}</span>
              </button>
              <button 
                onClick={() => setShowWithdrawModal(true)}
                className="flex-1 bg-white/20 backdrop-blur-sm text-white rounded-2xl py-3 flex items-center justify-center gap-2 hover:bg-white/30 transition-all transform hover:scale-105"
              >
                <ArrowUpRight size={20} />
                <span>{t.withdraw}</span>
              </button>
            </div>
          </div>
        </div>

        {/* My Cards Section */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-6 shadow-xl border border-indigo-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <CreditCard className="text-indigo-600" size={24} />
              <h2 className="text-gray-800">{t.cards}</h2>
            </div>
            <button
              onClick={() => setShowAddCardModal(true)}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-2 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all"
            >
              <Plus size={20} />
            </button>
          </div>

          {user.cards && user.cards.length > 0 ? (
            <div className="space-y-3">
              {user.cards.map((card) => {
                const cardStyle = cardTypeColors[card.type];
                const lastFourDigits = card.cardNumber.slice(-4);
                
                return (
                  <div key={card.id} className={`bg-gradient-to-br ${cardStyle.gradient} rounded-2xl p-4 shadow-lg text-white relative`}>
                    <button
                      onClick={() => handleDeleteCard(card.id)}
                      className="absolute top-2 right-2 bg-white/20 hover:bg-white/30 p-2 rounded-xl transition-all transform hover:scale-110"
                    >
                      <Trash2 size={16} />
                    </button>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <CreditCard size={20} />
                        <span className="text-sm opacity-90">{cardStyle.text}</span>
                      </div>
                      <div className="text-xs bg-white/20 px-2 py-1 rounded-lg">****  {lastFourDigits}</div>
                    </div>
                    <div className="text-sm opacity-90 mb-1">{card.cardHolder}</div>
                    <div className="text-2xl">${card.balance.toFixed(2)}</div>
                  </div>
                );
              })}
              
              {/* Transfer Buttons */}
              <div className="space-y-2">
                {user.cards.length >= 2 && (
                  <button
                    onClick={() => setShowTransferModal(true)}
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl py-3 flex items-center justify-center gap-2 hover:shadow-lg transform hover:scale-105 transition-all"
                  >
                    <Repeat size={20} />
                    <span>{t.transferBetweenCards}</span>
                  </button>
                )}
                <button
                  onClick={() => setShowCardToBalanceModal(true)}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl py-3 flex items-center justify-center gap-2 hover:shadow-lg transform hover:scale-105 transition-all"
                >
                  <ArrowDownRight size={20} />
                  <span>{t.cardToBalance}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <CreditCard className="mx-auto mb-2 opacity-30" size={48} />
              <p>{t.noCards}</p>
            </div>
          )}
        </div>

        {/* Detailed Expenses */}
        {user.transactions.filter(tr => tr.type === 'payment' && tr.merchant).length > 0 && (
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-6 shadow-xl border-2 border-pink-200">
            <div className="flex items-center gap-2 mb-4">
              <ShoppingBag className="text-pink-600" size={24} />
              <h2 className="text-gray-800">{t.detailedExpenses}</h2>
            </div>
            
            <div className="space-y-3">
              {user.transactions
                .filter(tr => tr.type === 'payment' && tr.merchant)
                .slice(0, 10)
                .map((transaction) => {
                  const CategoryIcon = transaction.category ? categoryIcons[transaction.category] : ShoppingBag;
                  
                  return (
                    <div key={transaction.id} className="bg-white rounded-2xl p-4 shadow-md border-2 border-transparent hover:border-pink-300 transition-all">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white shadow-lg">
                            <CategoryIcon size={22} />
                          </div>
                          <div>
                            <div className="text-gray-800">{transaction.merchant}</div>
                            <div className="text-xs text-gray-500 mt-1">{transaction.date}</div>
                            {transaction.category && (
                              <div className="text-xs text-pink-600 bg-pink-50 px-2 py-0.5 rounded-full mt-1 inline-block">
                                {transaction.category}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="text-red-600 text-xl">
                          ${Math.abs(transaction.amount).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* Pending Jobs */}
        {user.pendingJobs && user.pendingJobs.length > 0 && (
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl p-6 shadow-xl border-2 border-yellow-200">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="text-orange-600" size={24} />
              <h2 className="text-gray-800">{t.pendingJobs}</h2>
            </div>
            
            <div className="space-y-3">
              {user.pendingJobs.map((job) => (
                <div key={job.id} className={`p-4 rounded-2xl border-2 ${
                  job.status === 'pending' ? 'bg-yellow-100 border-yellow-300' :
                  job.status === 'approved' ? 'bg-green-100 border-green-300' :
                  'bg-red-100 border-red-300'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-sm text-gray-800">{job.title}</p>
                      <p className="text-xs text-gray-600">{job.postedBy}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs flex items-center gap-1 ${
                      job.status === 'pending' ? 'bg-yellow-200 text-yellow-800' :
                      job.status === 'approved' ? 'bg-green-200 text-green-800' :
                      'bg-red-200 text-red-800'
                    }`}>
                      {job.status === 'pending' ? <Clock size={14} /> : 
                       job.status === 'approved' ? <CheckCircle size={14} /> : 
                       <XCircle size={14} />}
                      {t[job.status]}
                    </div>
                  </div>
                  <div className="text-lg text-gray-800">${job.price.toFixed(2)}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Transactions */}
        <div className="bg-white rounded-3xl p-6 shadow-xl">
          <h2 className="text-gray-800 mb-4">{t.transactions}</h2>
          
          {user.transactions && user.transactions.length > 0 ? (
            <div className="space-y-3">
              {user.transactions.map((transaction) => {
                const CategoryIcon = transaction.category ? categoryIcons[transaction.category] : null;
                
                return (
                  <div key={transaction.id} className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all hover:scale-102 ${
                    transaction.amount > 0
                      ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 hover:border-green-300' 
                      : 'bg-gradient-to-r from-red-50 to-pink-50 border-red-200 hover:border-red-300'
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${
                        transaction.amount > 0
                          ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white' 
                          : 'bg-gradient-to-br from-red-500 to-pink-600 text-white'
                      }`}>
                        {CategoryIcon ? <CategoryIcon size={22} /> : 
                         transaction.amount > 0 ? <ArrowDownRight size={22} /> : <ArrowUpRight size={22} />}
                      </div>
                      <div>
                        <div className="text-gray-800">{transaction.description}</div>
                        <div className="text-xs text-gray-500 mt-1">{transaction.date}</div>
                        {transaction.category && (
                          <div className="text-xs text-gray-600 bg-white px-2 py-0.5 rounded-full mt-1 inline-block">
                            {transaction.category}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className={`text-lg ${
                      transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <DollarSign className="mx-auto mb-2 opacity-30" size={48} />
              <p>{t.noTransactions}</p>
            </div>
          )}
        </div>

        {/* Deposit Modal */}
        {showDepositModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl">
              <h3 className="text-gray-800 mb-4 text-xl">{t.addFunds}</h3>
              
              {/* Payment Method Selection */}
              <div className="mb-4">
                <label className="text-sm text-gray-600 mb-2 block">{t.selectPaymentMethod}</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setDepositSource('m10')}
                    className={`p-4 rounded-2xl border-2 transition-all transform hover:scale-105 ${
                      depositSource === 'm10'
                        ? 'border-purple-600 bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg'
                        : 'border-gray-300 bg-white hover:border-purple-400'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        depositSource === 'm10'
                          ? 'bg-gradient-to-br from-purple-600 to-pink-600 text-white'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        <DollarSign size={24} />
                      </div>
                      <span className="text-gray-800">{t.m10}</span>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setDepositSource('binance')}
                    className={`p-4 rounded-2xl border-2 transition-all transform hover:scale-105 ${
                      depositSource === 'binance'
                        ? 'border-yellow-500 bg-gradient-to-br from-yellow-50 to-orange-50 shadow-lg'
                        : 'border-gray-300 bg-white hover:border-yellow-400'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        depositSource === 'binance'
                          ? 'bg-gradient-to-br from-yellow-500 to-orange-600 text-white'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        <CreditCard size={24} />
                      </div>
                      <span className="text-gray-800">{t.binance}</span>
                    </div>
                  </button>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="text-sm text-gray-600 mb-2 block">{t.amount}</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="number"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowDepositModal(false);
                    setDepositSource('');
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 rounded-2xl py-3 hover:bg-gray-300 transition-colors"
                >
                  {t.cancel}
                </button>
                <button
                  onClick={handleDeposit}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl py-3 hover:shadow-lg transition-all transform hover:scale-105"
                >
                  {t.confirm}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Withdraw Modal */}
        {showWithdrawModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl">
              <h3 className="text-gray-800 mb-4 text-xl">{t.withdrawFunds}</h3>
              
              <div className="mb-2">
                <div className="text-sm text-gray-600 mb-2">
                  {t.balance}: ${user.balance.toFixed(2)}
                </div>
                <div className="text-xs text-gray-500 mb-4 bg-yellow-50 p-2 rounded-lg border border-yellow-200">
                  {t.minWithdraw}
                </div>
              </div>

              <div className="mb-4">
                <label className="text-sm text-gray-600 mb-2 block">{t.amount}</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="number"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    placeholder="5.00"
                    min="5"
                    max={user.balance}
                  />
                </div>
              </div>

              {/* Card Selection for Withdrawal */}
              {user.cards && user.cards.length > 0 && (
                <div className="mb-4">
                  <label className="text-sm text-gray-600 mb-2 block">{t.selectDestinationCard}</label>
                  <select
                    value={selectedCardForWithdraw || ''}
                    onChange={(e) => setSelectedCardForWithdraw(e.target.value ? Number(e.target.value) : null)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  >
                    <option value="">{t.selectCard}</option>
                    {user.cards.map((card) => (
                      <option key={card.id} value={card.id}>
                        {cardTypeColors[card.type].text} **** {card.cardNumber.slice(-4)} (${card.balance.toFixed(2)})
                      </option>
                    ))}
                  </select>
                  <div className="text-xs text-gray-500 mt-2 bg-blue-50 p-2 rounded-lg border border-blue-200">
                    {language === 'az' ? 'Kart seçsəniz, pul həmin karta köçürüləcək' : 
                     language === 'en' ? 'If you select a card, money will be transferred to that card' :
                     language === 'ru' ? 'Если выберете карту, деньги будут переведены на эту карту' :
                     language === 'tr' ? 'Bir kart seçerseniz, para o karta aktarılacak' :
                     language === 'de' ? 'Wenn Sie eine Karte auswählen, wird Geld auf diese Karte überwiesen' :
                     language === 'fr' ? 'Si vous sélectionnez une carte, l\'argent sera transféré sur cette carte' :
                     language === 'es' ? 'Si selecciona una tarjeta, el dinero se transferirá a esa tarjeta' :
                     'إذا اخترت بطاقة، سيتم تحويل الأموال إلى تلك البطاقة'}
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowWithdrawModal(false);
                    setSelectedCardForWithdraw(null);
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 rounded-2xl py-3 hover:bg-gray-300 transition-colors"
                >
                  {t.cancel}
                </button>
                <button
                  onClick={handleWithdraw}
                  className="flex-1 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-2xl py-3 hover:shadow-lg transition-all transform hover:scale-105"
                >
                  {t.confirm}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Card Modal */}
        {showAddCardModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl">
              <h3 className="text-gray-800 mb-4 text-xl">{t.addCard}</h3>
              
              <div className="space-y-4 mb-4">
                <div>
                  <label className="text-sm text-gray-600 mb-2 block">{t.cardNumber}</label>
                  <input
                    type="text"
                    value={newCardNumber}
                    onChange={(e) => setNewCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                    placeholder="1234567812345678"
                    maxLength={16}
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-600 mb-2 block">{t.cardHolder}</label>
                  <input
                    type="text"
                    value={newCardHolder}
                    onChange={(e) => setNewCardHolder(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-600 mb-2 block">{t.cardBalance}</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="number"
                      value={newCardBalance}
                      onChange={(e) => setNewCardBalance(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-600 mb-2 block">Card Type</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['visa', 'mastercard', 'amex'] as const).map((type) => (
                      <button
                        key={type}
                        onClick={() => setNewCardType(type)}
                        className={`py-2 px-3 rounded-xl transition-all ${
                          newCardType === type 
                            ? 'bg-indigo-600 text-white shadow-lg' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {cardTypeColors[type].text}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowAddCardModal(false);
                    setNewCardNumber('');
                    setNewCardHolder('');
                    setNewCardBalance('');
                    setNewCardType('visa');
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 rounded-2xl py-3 hover:bg-gray-300 transition-colors"
                >
                  {t.cancel}
                </button>
                <button
                  onClick={handleAddCard}
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl py-3 hover:shadow-lg transition-all transform hover:scale-105"
                >
                  {t.confirm}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Transfer Between Cards Modal */}
        {showTransferModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl">
              <h3 className="text-gray-800 mb-4 text-xl">{t.transferBetweenCards}</h3>
              
              <div className="space-y-4 mb-4">
                <div>
                  <label className="text-sm text-gray-600 mb-2 block">{t.from}</label>
                  <select
                    value={transferFromCard || ''}
                    onChange={(e) => setTransferFromCard(Number(e.target.value))}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  >
                    <option value="">{t.selectCard}</option>
                    {user.cards?.map((card) => (
                      <option key={card.id} value={card.id}>
                        {cardTypeColors[card.type].text} **** {card.cardNumber.slice(-4)} (${card.balance.toFixed(2)})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm text-gray-600 mb-2 block">{t.to}</label>
                  <select
                    value={transferToCard || ''}
                    onChange={(e) => setTransferToCard(Number(e.target.value))}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  >
                    <option value="">{t.selectCard}</option>
                    {user.cards?.map((card) => (
                      <option key={card.id} value={card.id} disabled={card.id === transferFromCard}>
                        {cardTypeColors[card.type].text} **** {card.cardNumber.slice(-4)} (${card.balance.toFixed(2)})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm text-gray-600 mb-2 block">{t.amount}</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="number"
                      value={transferAmount}
                      onChange={(e) => setTransferAmount(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowTransferModal(false);
                    setTransferFromCard(null);
                    setTransferToCard(null);
                    setTransferAmount('');
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 rounded-2xl py-3 hover:bg-gray-300 transition-colors"
                >
                  {t.cancel}
                </button>
                <button
                  onClick={handleTransferBetweenCards}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl py-3 hover:shadow-lg transition-all transform hover:scale-105"
                >
                  {t.transfer}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Card to Balance Modal */}
        {showCardToBalanceModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl">
              <h3 className="text-gray-800 mb-4 text-xl">{t.transferFromCardToBalance}</h3>
              
              <div className="space-y-4 mb-4">
                <div>
                  <label className="text-sm text-gray-600 mb-2 block">{t.selectCard}</label>
                  <select
                    value={selectedCardForDeposit || ''}
                    onChange={(e) => setSelectedCardForDeposit(e.target.value ? Number(e.target.value) : null)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                  >
                    <option value="">{t.selectCard}</option>
                    {user.cards?.map((card) => (
                      <option key={card.id} value={card.id}>
                        {cardTypeColors[card.type].text} **** {card.cardNumber.slice(-4)} (${card.balance.toFixed(2)})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm text-gray-600 mb-2 block">{t.amount}</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="number"
                      value={cardToBalanceAmount}
                      onChange={(e) => setCardToBalanceAmount(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                {selectedCardForDeposit && (
                  <div className="text-xs text-gray-500 bg-green-50 p-3 rounded-lg border border-green-200">
                    {language === 'az' ? 'Kartdan əsas balansa pul köçürülür' : 
                     language === 'en' ? 'Money will be transferred from card to main balance' :
                     language === 'ru' ? 'Деньги будут переведены с карты на основной баланс' :
                     language === 'tr' ? 'Para karttan ana bakiyeye aktarılacak' :
                     language === 'de' ? 'Geld wird von der Karte auf das Hauptguthaben überwiesen' :
                     language === 'fr' ? 'L\'argent sera transféré de la carte vers le solde principal' :
                     language === 'es' ? 'El dinero se transferirá de la tarjeta al saldo principal' :
                     'سيتم تحويل الأموال من البطاقة إلى الرصيد الرئيسي'}
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowCardToBalanceModal(false);
                    setSelectedCardForDeposit(null);
                    setCardToBalanceAmount('');
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 rounded-2xl py-3 hover:bg-gray-300 transition-colors"
                >
                  {t.cancel}
                </button>
                <button
                  onClick={handleCardToBalanceTransfer}
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl py-3 hover:shadow-lg transition-all transform hover:scale-105"
                >
                  {t.transfer}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
