export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  discount: number;
  stock: number;
  reviews: number;
  status: 'জনপ্রিয়' | 'স্বাভাবিক';
  badge: 'নতুন' | 'জনপ্রিয়' | '';
  woodType: 'সেগুন' | 'মেহগনি' | 'গামারি' | 'ওক' | '-';
}

export interface StockHistoryItem {
  id: string;
  productId: string;
  productName: string;
  category: string;
  type: 'add' | 'remove';
  quantity: number;
  note: string;
  timestamp: string;
}

export interface ActivityItem {
  id: string;
  action: string;
  details: string;
  timestamp: string;
}

export const LOW_STOCK_DEFAULT = 5;

export const CATEGORIES = [
  'সোফা সেট',
  'বিছানা',
  'ডাইনিং টেবিল',
  'আলমারি',
  'ওয়ার্ডরোব',
  'ড্রেসিং টেবিল',
  'চেয়ার',
  'অফিস ফার্নিচার',
  'দরজা',
  'অন্যান্য',
] as const;

const PRODUCTS_KEY = 'ma_furniture_products';
const STOCK_HISTORY_KEY = 'ma_furniture_stock_history';
const ACTIVITY_KEY = 'ma_furniture_activity_history';
const LOW_STOCK_KEY = 'ma_furniture_low_stock_threshold';

const INITIAL_PRODUCTS: Product[] = [
  { id: 'PRD-001', name: 'বিলাসবহুল সেগুন কাঠের সোফা সেট', category: 'সোফা সেট', price: 45000, originalPrice: 52000, discount: 13, stock: 8, reviews: 24, status: 'জনপ্রিয়', badge: 'নতুন', woodType: 'সেগুন' },
  { id: 'PRD-002', name: 'আধুনিক কিং সাইজ বেড', category: 'বিছানা', price: 35000, originalPrice: 40000, discount: 12, stock: 5, reviews: 18, status: 'জনপ্রিয়', badge: '', woodType: 'সেগুন' },
  { id: 'PRD-003', name: '৬ চেয়ারের ডাইনিং টেবিল সেট', category: 'ডাইনিং টেবিল', price: 28000, originalPrice: 32000, discount: 12, stock: 12, reviews: 32, status: 'স্বাভাবিক', badge: 'নতুন', woodType: 'গামারি' },
  { id: 'PRD-004', name: 'তিন পাল্লার আলমারি', category: 'আলমারি', price: 22000, originalPrice: 25000, discount: 12, stock: 7, reviews: 15, status: 'জনপ্রিয়', badge: '', woodType: 'মেহগনি' },
  { id: 'PRD-005', name: 'ওয়ার্ডরোব ১', category: 'ওয়ার্ডরোব', price: 30000, originalPrice: 34000, discount: 11, stock: 4, reviews: 15, status: 'স্বাভাবিক', badge: 'নতুন', woodType: 'মেহগনি' },
  { id: 'PRD-006', name: 'ড্রেসিং টেবিল ১', category: 'ড্রেসিং টেবিল', price: 18000, originalPrice: 21000, discount: 14, stock: 9, reviews: 10, status: 'স্বাভাবিক', badge: 'নতুন', woodType: 'গামারি' },
  { id: 'PRD-007', name: 'চেয়ার সেট ১', category: 'চেয়ার', price: 8000, originalPrice: 9500, discount: 16, stock: 22, reviews: 22, status: 'জনপ্রিয়', badge: '', woodType: 'সেগুন' },
  { id: 'PRD-008', name: 'অফিস ডেস্ক ১', category: 'অফিস ফার্নিচার', price: 20000, originalPrice: 23000, discount: 13, stock: 6, reviews: 9, status: 'স্বাভাবিক', badge: 'নতুন', woodType: 'মেহগনি' },
  { id: 'PRD-009', name: 'কাঠের দরজা ১', category: 'দরজা', price: 15000, originalPrice: 18000, discount: 15, stock: 3, reviews: 8, status: 'স্বাভাবিক', badge: '', woodType: 'সেগুন' },
  { id: 'PRD-010', name: 'অন্যান্য ফার্নিচার ১', category: 'অন্যান্য', price: 12000, originalPrice: 15000, discount: 20, stock: 11, reviews: 6, status: 'স্বাভাবিক', badge: 'নতুন', woodType: 'গামারি' },
  { id: 'PRD-011', name: 'রয়েল সোফা সেট ২', category: 'সোফা সেট', price: 55000, originalPrice: 62000, discount: 11, stock: 6, reviews: 45, status: 'জনপ্রিয়', badge: '', woodType: 'সেগুন' },
  { id: 'PRD-012', name: 'কুইন সাইজ বেড ২', category: 'বিছানা', price: 38000, originalPrice: 42000, discount: 9, stock: 4, reviews: 32, status: 'স্বাভাবিক', badge: 'নতুন', woodType: 'মেহগনি' },
  { id: 'PRD-013', name: 'গ্লাস টপ ডাইনিং ২', category: 'ডাইনিং টেবিল', price: 32000, originalPrice: 38000, discount: 15, stock: 8, reviews: 18, status: 'জনপ্রিয়', badge: '', woodType: 'গামারি' },
  { id: 'PRD-014', name: '৩ দরজার আলমারি ২', category: 'আলমারি', price: 25000, originalPrice: 29000, discount: 13, stock: 5, reviews: 14, status: 'স্বাভাবিক', badge: '', woodType: 'মেহগনি' },
  { id: 'PRD-015', name: 'স্লাইডিং ওয়ার্ডরোব ২', category: 'ওয়ার্ডরোব', price: 35000, originalPrice: 40000, discount: 12, stock: 3, reviews: 22, status: 'জনপ্রিয়', badge: 'নতুন', woodType: 'মেহগনি' },
  { id: 'PRD-016', name: 'স্মল ড্রেসিং টেবিল ২', category: 'ড্রেসিং টেবিল', price: 15000, originalPrice: 18000, discount: 16, stock: 7, reviews: 8, status: 'স্বাভাবিক', badge: '', woodType: 'গামারি' },
  { id: 'PRD-017', name: 'প্লাস্টিক চেয়ার সেট ২', category: 'চেয়ার', price: 5000, originalPrice: 6000, discount: 17, stock: 30, reviews: 30, status: 'স্বাভাবিক', badge: 'নতুন', woodType: '-' },
  { id: 'PRD-018', name: 'ম্যানেজার ডেস্ক ২', category: 'অফিস ফার্নিচার', price: 25000, originalPrice: 28000, discount: 10, stock: 4, reviews: 12, status: 'জনপ্রিয়', badge: '', woodType: 'মেহগনি' },
  { id: 'PRD-019', name: 'রুমের দরজা ২', category: 'দরজা', price: 12000, originalPrice: 14000, discount: 14, stock: 10, reviews: 15, status: 'স্বাভাবিক', badge: '', woodType: 'সেগুন' },
  { id: 'PRD-020', name: 'শো-পিস ২', category: 'অন্যান্য', price: 8000, originalPrice: 10000, discount: 20, stock: 5, reviews: 5, status: 'স্বাভাবিক', badge: 'নতুন', woodType: '-' },
  { id: 'PRD-021', name: 'এল-শেপ সোফা ৩', category: 'সোফা সেট', price: 65000, originalPrice: 75000, discount: 13, stock: 2, reviews: 50, status: 'জনপ্রিয়', badge: '', woodType: 'সেগুন' },
  { id: 'PRD-022', name: 'সিঙ্গেল বেড ৩', category: 'বিছানা', price: 18000, originalPrice: 21000, discount: 14, stock: 9, reviews: 10, status: 'স্বাভাবিক', badge: '', woodType: 'গামারি' },
  { id: 'PRD-023', name: '৮ চেয়ার ডাইনিং ৩', category: 'ডাইনিং টেবিল', price: 45000, originalPrice: 50000, discount: 10, stock: 3, reviews: 21, status: 'স্বাভাবিক', badge: '', woodType: 'সেগুন' },
];

const hasWindow = () => typeof window !== 'undefined';

const readJson = <T,>(key: string, fallback: T): T => {
  if (!hasWindow()) return fallback;
  const raw = window.localStorage.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
};

const writeJson = (key: string, value: unknown) => {
  if (!hasWindow()) return;
  window.localStorage.setItem(key, JSON.stringify(value));
};

const emitProductsUpdated = () => {
  if (!hasWindow()) return;
  window.dispatchEvent(new CustomEvent('ma_furniture_products_updated'));
};

const emitHistoryUpdated = () => {
  if (!hasWindow()) return;
  window.dispatchEvent(new CustomEvent('ma_furniture_stock_history_updated'));
};

export const initializeAdminData = () => {
  if (!hasWindow()) return;

  if (!window.localStorage.getItem(PRODUCTS_KEY)) {
    writeJson(PRODUCTS_KEY, INITIAL_PRODUCTS);
  }

  if (!window.localStorage.getItem(STOCK_HISTORY_KEY)) {
    writeJson(STOCK_HISTORY_KEY, [] as StockHistoryItem[]);
  }

  if (!window.localStorage.getItem(ACTIVITY_KEY)) {
    const seedActivity: ActivityItem[] = [
      {
        id: crypto.randomUUID(),
        action: 'সিস্টেম',
        details: 'অ্যাডমিন ডেটা প্রাথমিকভাবে লোড হয়েছে',
        timestamp: new Date().toISOString(),
      },
    ];
    writeJson(ACTIVITY_KEY, seedActivity);
  }

  if (!window.localStorage.getItem(LOW_STOCK_KEY)) {
    window.localStorage.setItem(LOW_STOCK_KEY, String(LOW_STOCK_DEFAULT));
  }
};

export const getProducts = (): Product[] => {
  initializeAdminData();
  return readJson<Product[]>(PRODUCTS_KEY, INITIAL_PRODUCTS);
};

export const saveProducts = (products: Product[]) => {
  writeJson(PRODUCTS_KEY, products);
  emitProductsUpdated();
};

export const getStockHistory = (): StockHistoryItem[] => {
  initializeAdminData();
  return readJson<StockHistoryItem[]>(STOCK_HISTORY_KEY, []);
};

export const saveStockHistory = (history: StockHistoryItem[]) => {
  writeJson(STOCK_HISTORY_KEY, history);
  emitHistoryUpdated();
};

export const getActivityHistory = (): ActivityItem[] => {
  initializeAdminData();
  return readJson<ActivityItem[]>(ACTIVITY_KEY, []);
};

export const saveActivityHistory = (history: ActivityItem[]) => {
  writeJson(ACTIVITY_KEY, history);
};

export const addActivity = (action: string, details: string) => {
  const next: ActivityItem = {
    id: hasWindow() && 'crypto' in window ? crypto.randomUUID() : `${Date.now()}`,
    action,
    details,
    timestamp: new Date().toISOString(),
  };
  const history = getActivityHistory();
  saveActivityHistory([next, ...history].slice(0, 200));
};

export const getLowStockThreshold = (): number => {
  initializeAdminData();
  if (!hasWindow()) return LOW_STOCK_DEFAULT;
  const raw = window.localStorage.getItem(LOW_STOCK_KEY);
  const parsed = Number(raw);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : LOW_STOCK_DEFAULT;
};

export const saveLowStockThreshold = (value: number) => {
  if (!hasWindow()) return;
  const safe = Number.isFinite(value) && value > 0 ? Math.floor(value) : LOW_STOCK_DEFAULT;
  window.localStorage.setItem(LOW_STOCK_KEY, String(safe));
  emitProductsUpdated();
};

export const calculateDiscount = (price: number, originalPrice: number) => {
  if (!originalPrice || originalPrice <= 0 || price >= originalPrice) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
};

export const generateProductId = (products: Product[]) => {
  const max = products.reduce((acc, p) => {
    const value = Number(p.id.replace('PRD-', ''));
    return Number.isFinite(value) ? Math.max(acc, value) : acc;
  }, 0);
  return `PRD-${String(max + 1).padStart(3, '0')}`;
};
