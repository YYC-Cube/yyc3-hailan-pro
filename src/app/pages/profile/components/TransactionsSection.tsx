import React from 'react';
import { Package, ChevronRight, Clock, CheckCircle, Truck, XCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { Transaction, getStatusColor, getStatusText } from '@/app/data/transactionsData';
import { PrivacyBlur } from '@/app/components/PrivacyBlur';
import { Button } from '@/app/components/ui/button';

interface TransactionsSectionProps {
  transactions: Transaction[];
}

export function TransactionsSection({ transactions }: TransactionsSectionProps) {
  const [expandedId, setExpandedId] = React.useState<string | null>(null);

  if (transactions.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
          <Package className="w-10 h-10 text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">暂无订单</h3>
        <p className="text-slate-600 text-sm">您还没有购买记录</p>
      </div>
    );
  }

  const getStatusIcon = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5" />;
      case 'processing':
        return <Clock className="w-5 h-5" />;
      case 'shipped':
        return <Truck className="w-5 h-5" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-4">
      {transactions.map((transaction, index) => (
        <motion.div
          key={transaction.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
        >
          {/* Header */}
          <div
            className="p-4 cursor-pointer hover:bg-slate-50 transition-colors"
            onClick={() => setExpandedId(expandedId === transaction.id ? null : transaction.id)}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${getStatusColor(transaction.status)}`}>
                  {getStatusIcon(transaction.status)}
                </div>
                <div>
                  <PrivacyBlur>
                    <p className="font-semibold text-slate-900">{transaction.id}</p>
                  </PrivacyBlur>
                  <p className="text-sm text-slate-600">{transaction.date}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-xl font-bold text-pink-600">¥{transaction.total}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(transaction.status)}`}>
                    {getStatusText(transaction.status)}
                  </span>
                </div>
                <ChevronRight
                  className={`w-5 h-5 text-slate-400 transition-transform ${
                    expandedId === transaction.id ? 'rotate-90' : ''
                  }`}
                />
              </div>
            </div>

            {/* Quick Info */}
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Package className="w-4 h-4" />
              <PrivacyBlur>
                <span>{transaction.items.length} 件商品</span>
              </PrivacyBlur>
            </div>
          </div>

          {/* Expanded Details */}
          {expandedId === transaction.id && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              className="border-t border-slate-200"
            >
              <div className="p-4 bg-slate-50 space-y-4">
                {/* Items List */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-slate-900 text-sm mb-2">商品明细</h4>
                  {transaction.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <PrivacyBlur>
                        <div className="flex-1">
                          <p className="text-sm text-slate-900">{item.name}</p>
                          <p className="text-xs text-slate-500">x{item.quantity}</p>
                        </div>
                      </PrivacyBlur>
                      <p className="text-sm font-medium text-slate-900">¥{item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div className="border-t border-slate-200"></div>

                {/* Payment & Shipping Info */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">支付方式</span>
                    <PrivacyBlur>
                      <span className="text-slate-900">{transaction.paymentMethod}</span>
                    </PrivacyBlur>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">配送地址</span>
                    <PrivacyBlur>
                      <span className="text-slate-900">{transaction.shippingAddress}</span>
                    </PrivacyBlur>
                  </div>
                  {transaction.trackingNumber && (
                    <div className="flex justify-between">
                      <span className="text-slate-600">物流单号</span>
                      <PrivacyBlur>
                        <span className="text-blue-600 font-mono text-xs">
                          {transaction.trackingNumber}
                        </span>
                      </PrivacyBlur>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  {transaction.trackingNumber && (
                    <Button size="sm" variant="outline" className="flex-1">
                      查看物流
                    </Button>
                  )}
                  {transaction.status === 'completed' && (
                    <Button size="sm" variant="outline" className="flex-1">
                      再次购买
                    </Button>
                  )}
                  <Button size="sm" variant="outline" className="flex-1">
                    联系客服
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
