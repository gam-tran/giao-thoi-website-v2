import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, Zap, ShieldCheck, Sparkles, MapPin, Layers } from 'lucide-react';
import { Product } from '../types';
import { formatPrice } from '../data/products';
import { useShop } from '../context/ShopContext';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onBuyNow: (product: Product, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onBuyNow,
}) => {
  const { addToCart, products } = useShop();
  const [selectedQty, setSelectedQty] = useState(1);

  if (!product) return null;

  // Retrieve current reactive stock
  const currentProduct = products.find(p => p.id === product.id) || product;
  const isOutOfStock = currentProduct.stock <= 0;

  const handleAddToCart = () => {
    if (!isOutOfStock) {
      addToCart(currentProduct, selectedQty);
    }
  };

  const handleInstantBuy = () => {
    if (!isOutOfStock) {
      onBuyNow(currentProduct, selectedQty);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#FAF8F5] rounded-3xl border border-[#E7DECE] shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 text-[#3A332B] hover:text-[#9E211D] hover:bg-white flex items-center justify-center shadow-md transition-colors cursor-pointer"
          aria-label="Đóng"
        >
          <X size={20} />
        </button>

        {/* Content Container */}
        <div className="overflow-y-auto p-5 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Product Image */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-[#E9E1D2] bg-white shadow-sm">
                <img
                  src={currentProduct.image}
                  alt={currentProduct.name}
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover object-center ${
                    isOutOfStock ? 'grayscale opacity-75' : ''
                  }`}
                />
                {isOutOfStock && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="px-4 py-2 bg-[#1C1B1A] text-white text-sm font-bold uppercase tracking-widest rounded-lg">
                      HẾT HÀNG
                    </span>
                  </div>
                )}
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-2 gap-2 text-[11px] text-[#635A4F] pt-2">
                <div className="flex items-center gap-2 p-2 rounded-lg bg-white border border-[#ECE5D8]">
                  <ShieldCheck size={16} className="text-[#9E211D] shrink-0" />
                  <span>100% Thủ công Việt Nam</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-white border border-[#ECE5D8]">
                  <Sparkles size={16} className="text-[#9E211D] shrink-0" />
                  <span>Bảo hành hoàn thiện 12 tháng</span>
                </div>
              </div>
            </div>

            {/* Right Column: Details & Actions */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold tracking-widest text-[#8A7C6B] uppercase">
                  {currentProduct.category}
                </span>

                <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1C1B1A] mt-1 leading-snug">
                  {currentProduct.name}
                </h1>

                {/* Price & Stock */}
                <div className="mt-4 flex items-center justify-between pb-4 border-b border-[#ECE4D6]">
                  <span className="text-2xl sm:text-3xl font-bold text-[#9E211D] tracking-tight tabular-nums">
                    {formatPrice(currentProduct.price)}
                  </span>

                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${
                      isOutOfStock
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-[#9E211D]/10 text-[#9E211D]'
                    }`}
                  >
                    {isOutOfStock ? 'HẾT HÀNG' : `Còn ${currentProduct.stock} sản phẩm`}
                  </span>
                </div>

                {/* Description */}
                <p className="mt-4 text-sm text-[#4E463C] leading-relaxed">
                  {currentProduct.description}
                </p>

                {/* Detailed Specifications */}
                {currentProduct.details && (
                  <div className="mt-6 space-y-2.5 text-xs text-[#5C5347] bg-[#F5EFE3] p-4 rounded-xl border border-[#E6DDCC]">
                    <div className="flex items-start gap-2">
                      <Layers size={14} className="text-[#9E211D] shrink-0 mt-0.5" />
                      <span><strong>Chất liệu:</strong> {currentProduct.details.material}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin size={14} className="text-[#9E211D] shrink-0 mt-0.5" />
                      <span><strong>Xuất xứ:</strong> {currentProduct.details.origin}</span>
                    </div>
                    {currentProduct.details.dimensions && (
                      <div className="flex items-start gap-2">
                        <span className="w-3.5 h-3.5 rounded-full border border-[#9E211D] inline-flex items-center justify-center text-[9px] text-[#9E211D] shrink-0 mt-0.5">d</span>
                        <span><strong>Kích thước:</strong> {currentProduct.details.dimensions}</span>
                      </div>
                    )}
                    <div className="pt-2 border-t border-[#E8DFC9] text-[#786C5D] font-serif italic text-xs leading-relaxed">
                      💡 <strong>Ý nghĩa văn hóa:</strong> {currentProduct.details.culturalMeaning}
                    </div>
                  </div>
                )}
              </div>

              {/* Purchase Controls */}
              <div className="mt-8 pt-6 border-t border-[#ECE4D6] space-y-4">
                {/* Quantity Stepper */}
                {!isOutOfStock && (
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#63594D]">
                      Số lượng:
                    </span>
                    <div className="flex items-center border border-[#D5CABB] rounded-lg bg-white">
                      <button
                        onClick={() => setSelectedQty(Math.max(1, selectedQty - 1))}
                        className="p-2 hover:bg-[#F2EBE0] text-[#3E372E] transition-colors cursor-pointer"
                        aria-label="Giảm"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-4 text-sm font-semibold tabular-nums">
                        {selectedQty}
                      </span>
                      <button
                        onClick={() => setSelectedQty(Math.min(currentProduct.stock, selectedQty + 1))}
                        disabled={selectedQty >= currentProduct.stock}
                        className="p-2 hover:bg-[#F2EBE0] text-[#3E372E] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                        aria-label="Tăng"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <span className="text-xs text-[#8A7C6B]">
                      (Tối đa {currentProduct.stock} sản phẩm)
                    </span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={isOutOfStock}
                    className="flex-1 py-3.5 px-6 rounded-full border-2 border-[#9E211D] text-[#9E211D] font-semibold text-xs uppercase tracking-wider hover:bg-[#9E211D]/10 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShoppingBag size={17} />
                    <span>Thêm vào giỏ hàng</span>
                  </button>

                  <button
                    onClick={handleInstantBuy}
                    disabled={isOutOfStock}
                    className="flex-1 py-3.5 px-6 rounded-full bg-[#9E211D] text-white font-semibold text-xs uppercase tracking-wider hover:bg-[#851B17] disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-[#9E211D]/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Zap size={17} />
                    <span>Mua ngay</span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
