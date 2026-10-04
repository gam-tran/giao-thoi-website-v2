import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { formatPrice } from '../data/products';

interface CartDrawerProps {
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onCheckout }) => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartTotal,
    cartCount,
  } = useShop();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] text-[#252525] shadow-2xl flex flex-col border-l border-[#E6DECE]">
          
          {/* Header */}
          <div className="p-5 sm:p-6 bg-white border-b border-[#E8DEC9] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag size={20} className="text-[#9E211D]" />
              <h2 className="font-editorial text-lg font-bold tracking-[0.1em] text-[#1C1B1A] uppercase">
                GIỎ HÀNG CỦA BẠN
              </h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#9E211D]/10 text-[#9E211D] font-bold">
                {cartCount}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full text-[#7B7062] hover:text-[#1C1B1A] hover:bg-[#F2ECE0] transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#EFE9DC] flex items-center justify-center text-[#9E211D] mb-4">
                  <ShoppingBag size={28} />
                </div>
                <p className="font-editorial text-lg font-semibold text-[#3D372F]">
                  Giỏ hàng của bạn đang trống
                </p>
                <p className="text-xs text-[#7B7062] mt-1 max-w-xs font-sans">
                  Hãy khám phá những tác phẩm thủ công tinh xảo của Giao Thời và thêm vào giỏ.
                </p>
              </div>
            ) : (
              cart.map(item => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-3.5 bg-white rounded-xl border border-[#EBE4D5] shadow-xs"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 rounded-lg object-cover bg-[#F5EFE4] shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-editorial text-xs sm:text-sm font-semibold text-[#1C1B1A] line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-[#A29688] hover:text-rose-600 transition-colors cursor-pointer"
                          title="Xóa sản phẩm"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                      <span className="text-[11px] text-[#867B6E] block">
                        {item.product.category} · Còn {item.product.stock}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#F2ECE1]">
                      {/* Quantity Stepper (max capped at product stock) */}
                      <div className="flex items-center border border-[#DDD3C2] rounded-md bg-[#FAF8F5]">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 hover:bg-[#EFE9DC] text-[#4A4238] transition-colors cursor-pointer"
                          aria-label="Giảm"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="px-3 text-xs font-semibold tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stock}
                          className="p-1 hover:bg-[#EFE9DC] text-[#4A4238] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                          aria-label="Tăng"
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      <span className="text-xs sm:text-sm font-bold text-[#9E211D] tabular-nums">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout CTA */}
          {cart.length > 0 && (
            <div className="p-5 sm:p-6 bg-white border-t border-[#E8DEC9] space-y-4">
              <div className="space-y-1.5 text-xs text-[#6A6052]">
                <div className="flex items-center justify-between">
                  <span>Tạm tính</span>
                  <span className="font-medium tabular-nums">{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Phí vận chuyển</span>
                  <span className="text-[#2F7E43] font-medium">Miễn phí giao hàng</span>
                </div>
                <div className="pt-2 border-t border-[#EFE8DC] flex items-center justify-between text-sm sm:text-base font-bold text-[#1C1B1A]">
                  <span>Tổng thanh toán</span>
                  <span className="text-[#9E211D] tabular-nums">{formatPrice(cartTotal)}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  onCheckout();
                }}
                className="w-full py-3.5 px-6 bg-[#9E211D] text-white text-xs sm:text-sm font-semibold tracking-wider uppercase rounded-full hover:bg-[#851B17] shadow-lg shadow-[#9E211D]/25 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>TIẾN HÀNH ĐẶT HÀNG</span>
                <ArrowRight size={16} />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
