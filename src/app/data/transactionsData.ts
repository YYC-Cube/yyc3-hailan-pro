export interface Transaction {
  id: string;
  date: string;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  status: 'completed' | 'processing' | 'shipped' | 'cancelled';
  trackingNumber?: string;
  paymentMethod: string;
  shippingAddress: string;
}

// Mock transaction data
export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 'ORD-2026-001',
    date: '2026-01-20',
    items: [
      { name: 'LuxeVibe Pro Max', quantity: 1, price: 1299 },
      { name: 'Premium Lubricant', quantity: 2, price: 149 },
    ],
    total: 1597,
    status: 'shipped',
    trackingNumber: 'SF1234567890',
    paymentMethod: 'Credit Card ****1234',
    shippingAddress: '*** 保密地址 ***',
  },
  {
    id: 'ORD-2026-002',
    date: '2026-01-15',
    items: [
      { name: 'Intimate Care Set', quantity: 1, price: 299 },
      { name: 'Silk Sleep Mask', quantity: 1, price: 199 },
    ],
    total: 498,
    status: 'completed',
    paymentMethod: 'Alipay',
    shippingAddress: '*** 保密地址 ***',
  },
  {
    id: 'ORD-2026-003',
    date: '2026-01-10',
    items: [
      { name: 'Wellness Massage Oil', quantity: 1, price: 259 },
    ],
    total: 259,
    status: 'completed',
    paymentMethod: 'WeChat Pay',
    shippingAddress: '*** 保密地址 ***',
  },
  {
    id: 'ORD-2026-004',
    date: '2026-01-05',
    items: [
      { name: 'Couples Pleasure Kit', quantity: 1, price: 899 },
      { name: 'Aromatic Candles Set', quantity: 1, price: 179 },
    ],
    total: 1078,
    status: 'completed',
    paymentMethod: 'Credit Card ****5678',
    shippingAddress: '*** 保密地址 ***',
  },
];

// Helper function to get status color
export function getStatusColor(status: Transaction['status']): string {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-700';
    case 'processing':
      return 'bg-yellow-100 text-yellow-700';
    case 'shipped':
      return 'bg-blue-100 text-blue-700';
    case 'cancelled':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-slate-100 text-slate-700';
  }
}

// Helper function to get status text
export function getStatusText(status: Transaction['status']): string {
  switch (status) {
    case 'completed':
      return '已完成';
    case 'processing':
      return '处理中';
    case 'shipped':
      return '已发货';
    case 'cancelled':
      return '已取消';
    default:
      return status;
  }
}

// Helper function to calculate total spent
export function calculateTotalSpent(transactions: Transaction[]): number {
  return transactions
    .filter(t => t.status === 'completed' || t.status === 'shipped')
    .reduce((sum, t) => sum + t.total, 0);
}
