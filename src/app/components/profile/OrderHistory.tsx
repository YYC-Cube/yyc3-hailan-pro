import React from 'react';
import { Package, Truck, CheckCircle, Clock, ChevronRight, Shield } from 'lucide-react';
import { motion } from 'motion/react';

const MOCK_ORDERS = [
  {
    id: "HL-7829-XQ",
    date: "2024-05-20",
    status: "delivered",
    total: 1299.00,
    items: [
      { name: "Aurora Series - Smart Vibe", quantity: 1, price: 899.00 },
      { name: "Silk Touch Lubricant", quantity: 2, price: 200.00 }
    ],
    tracking: "SF1234567890"
  },
  {
    id: "HL-8821-AZ",
    date: "2024-06-12",
    status: "processing",
    total: 2450.00,
    items: [
      { name: "Lumina Pro Massager", quantity: 1, price: 2450.00 }
    ],
    tracking: null
  },
  {
    id: "HL-6620-BB",
    date: "2024-01-10",
    status: "delivered",
    total: 450.00,
    items: [
      { name: "Mystery Box - Level 1", quantity: 1, price: 450.00 }
    ],
    tracking: "SF0987654321"
  }
];

const StatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case 'delivered':
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    case 'processing':
      return <Clock className="w-5 h-5 text-blue-500" />;
    case 'shipped':
      return <Truck className="w-5 h-5 text-orange-500" />;
    default:
      return <Package className="w-5 h-5 text-gray-400" />;
  }
};

export function OrderHistory() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-neutral-900">Order History</h2>
        <div className="flex items-center text-sm text-neutral-500 bg-white px-3 py-1 rounded-full shadow-sm">
          <Shield className="w-4 h-4 mr-2 text-brand-elegant-purple" />
          <span className="hidden sm:inline">Privacy Protected Records</span>
          <span className="sm:hidden">Protected</span>
        </div>
      </div>

      <div className="space-y-4">
        {MOCK_ORDERS.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-neutral-100 overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Header */}
            <div className="p-4 sm:p-6 bg-neutral-50 border-b border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start sm:items-center gap-4">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <StatusIcon status={order.status} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-neutral-900">{order.id}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                      order.status === 'processing' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-500 mt-1">{order.date}</p>
                </div>
              </div>
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                <div className="text-right">
                  <p className="text-sm text-neutral-500">Total</p>
                  <p className="font-semibold text-neutral-900">¥{order.total.toFixed(2)}</p>
                </div>
                <button className="text-neutral-400 hover:text-brand-deep-blue transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Items */}
            <div className="p-4 sm:p-6">
              <div className="space-y-3">
                {order.items.map((item, i) => (
                  <div key={i} className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-neutral-300" />
                      <span className="text-neutral-700">{item.name}</span>
                      <span className="text-neutral-400">x{item.quantity}</span>
                    </div>
                    <span className="text-neutral-900 font-medium">¥{item.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              {order.tracking && (
                <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-neutral-500">
                    <Truck className="w-4 h-4" />
                    <span>SF Express: {order.tracking}</span>
                  </div>
                  <button className="text-sm text-brand-elegant-purple hover:underline">
                    Track Order
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
