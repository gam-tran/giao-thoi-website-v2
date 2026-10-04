import React from 'react';
import { ShoppingCart, Eye } from 'lucide-react';
import { Product } from '../types';
import { formatPrice } from '../data/products';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  const { addToCart } = useShop();
  const isOutOfStock = product.stock <= 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isOutOfStock) {
      addToCart(product, 1);
    }
  };

  return (
    <div
      onClick={() => onSelect(product)}
      className="group relative flex flex-col bg-white rounded-2xl border border-[#E9E2D5] p-3.5 sm:p-4 hover:border-[#D5C7B5] hover:shadow-lg hover:shadow-black/5 transition-all duration-300 cursor-pointer"
    >
      {/* Product Image Frame */}
      <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#F6F2EA] mb-3.5">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105 ${
            isOutOfStock ? 'grayscale opacity-75' : ''
          }`}
        />

        {/* Out of Stock Overlay / Badge */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="px-3 py-1 bg-[#1E1E1E] text-white text-xs font-bold uppercase tracking-wider rounded-md">
              HẾT HÀNG
            </span>
          </div>
        )}

        {/* Quick View Button on Hover */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur-sm text-[#1E1E1E] text-xs font-medium rounded-full shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <Eye size={13} className="text-[#9E211D]" />
            <span>Xem chi tiết</span>
          </span>
        </div>

        {/* Floating Add to Cart Button (Bottom-Right, matching reference) */}
        {!isOutOfStock && (
          <button
            onClick={handleQuickAdd}
            className="absolute bottom-2.5 right-2.5 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#9E211D] text-white flex items-center justify-center shadow-md hover:bg-[#801915] hover:scale-105 active:scale-95 transition-all duration-200 z-10 cursor-pointer"
            aria-label={`Thêm ${product.name} vào giỏ`}
            title="Thêm vào giỏ"
          >
            <ShoppingCart size={17} />
          </button>
        )}
      </div>

      {/* Product Metadata */}
      <div className="flex flex-col flex-grow justify-between">
        <div>
          <span className="text-[11px] font-medium tracking-wider text-[#8A7D6E] uppercase">
            {product.category}
          </span>
          <h3 className="font-editorial text-sm sm:text-base font-semibold text-[#1C1B1A] line-clamp-1 group-hover:text-[#9E211D] transition-colors mt-0.5">
            {product.name}
          </h3>
        </div>

        <div className="mt-2.5 pt-2 border-t border-[#F0EBE1] flex items-center justify-between">
          <span className="text-sm sm:text-base font-bold text-[#9E211D] tracking-tight tabular-nums">
            {formatPrice(product.price)}
          </span>
          <span className={`text-[11px] font-medium ${isOutOfStock ? 'text-rose-600 font-semibold' : 'text-[#7A6F62]'}`}>
            {isOutOfStock ? 'Hết hàng' : `Còn ${product.stock}`}
          </span>
        </div>
      </div>
    </div>
  );
};
