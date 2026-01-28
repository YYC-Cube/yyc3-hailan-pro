import React from 'react';
import { Heart, ShoppingCart, X } from 'lucide-react';
import { motion } from 'motion/react';
import { FavoriteItem } from '@/app/data/favoritesData';
import { PrivacyBlur } from '@/app/components/PrivacyBlur';
import { Button } from '@/app/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface FavoritesSectionProps {
  favorites: FavoriteItem[];
  onRemove: (id: string) => void;
}

export function FavoritesSection({ favorites, onRemove }: FavoritesSectionProps) {
  const navigate = useNavigate();

  if (favorites.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
          <Heart className="w-10 h-10 text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">暂无收藏</h3>
        <p className="text-slate-600 text-sm mb-6">发现喜欢的商品，点击❤️加入收藏</p>
        <Button onClick={() => navigate('/')}>去逛逛</Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {favorites.map((favorite, index) => (
        <motion.div
          key={favorite.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow group"
        >
          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden bg-slate-100">
            <PrivacyBlur>
              <img
                src={favorite.product.image}
                alt={favorite.product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </PrivacyBlur>
            
            {/* Remove Button */}
            <button
              onClick={() => onRemove(favorite.id)}
              className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors shadow-md"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Badge */}
            {favorite.product.badge && (
              <div className="absolute top-2 left-2 px-3 py-1 bg-pink-500 text-white text-xs font-medium rounded-full">
                {favorite.product.badge}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="p-4">
            <PrivacyBlur>
              <h3 className="font-semibold text-slate-900 mb-1 line-clamp-1">
                {favorite.product.name}
              </h3>
              <p className="text-sm text-slate-600 mb-2">{favorite.product.category}</p>
            </PrivacyBlur>

            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-xl font-bold text-pink-600">¥{favorite.product.price}</span>
              {favorite.product.originalPrice && (
                <span className="text-sm text-slate-400 line-through">
                  ¥{favorite.product.originalPrice}
                </span>
              )}
            </div>

            {/* Note */}
            {favorite.note && (
              <PrivacyBlur>
                <p className="text-xs text-slate-500 mb-3 italic">📝 {favorite.note}</p>
              </PrivacyBlur>
            )}

            {/* Actions */}
            <div className="flex gap-2">
              <Button
                size="sm"
                className="flex-1 bg-gradient-to-r from-sky-500 to-pink-500 hover:from-sky-600 hover:to-pink-600"
                onClick={() => navigate(`/product/${favorite.product.id}`)}
              >
                查看详情
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="px-3"
                onClick={() => {
                  // Add to cart logic
                  navigate(`/product/${favorite.product.id}`);
                }}
              >
                <ShoppingCart className="w-4 h-4" />
              </Button>
            </div>

            {/* Added Date */}
            <p className="text-xs text-slate-400 mt-3 text-center">
              收藏于 {new Date(favorite.addedAt).toLocaleDateString('zh-CN')}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
