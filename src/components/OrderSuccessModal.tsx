import React from 'react';
import { CheckCircle2, MessageSquare, ArrowRight, PackageCheck, Copy } from 'lucide-react';
import { Order } from '../types';
import { formatPrice } from '../data/products';
import { ZALO_URL } from '../config/constants';
import { useShop } from '../context/ShopContext';

interface OrderSuccessModalProps {
  order: Order | null;
  onClose: () => void;
  onContinueShopping: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  order,
  onClose,
  onContinueShopping,
}) => {
  const { showToast } = useShop();

  if (!order) return null;

  const copyOrderCode = () => {
    navigator.clipboard.writeText(order.id);
    showToast(`Đã sao chép mã đơn hàng: ${order.id}`);
  };

  const isZalo = order.paymentMethod === 'ZALO';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#FAF8F5] rounded-3xl border border-[#E7DECE] shadow-2xl overflow-hidden my-auto p-6 sm:p-10">
        
        {/* Success Icon & Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-[#9E211D]/10 text-[#9E211D] flex items-center justify-center mx-auto mb-4 ring-8 ring-[#9E211D]/5">
            <CheckCircle2 size={36} />
          </div>

          <h2 className="font-editorial text-2xl sm:text-3xl font-bold tracking-[0.1em] text-[#1C1B1A] uppercase">
            ĐẶT HÀNG THÀNH CÔNG
          </h2>
          <p className="font-serif italic text-base text-[#7B6E5F] mt-1">
            Cảm ơn bạn đã lựa chọn Giao Thời.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-2xl border border-[#E9E2D4] p-5 sm:p-6 space-y-4 shadow-sm text-xs sm:text-sm">
          {/* Order ID & Status */}
          <div className="flex items-center justify-between pb-3 border-b border-[#EFEAE0]">
            <div>
              <span className="text-[11px] text-[#867B6E] uppercase tracking-wider block">Mã đơn hàng</span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="font-mono font-bold text-sm sm:text-base text-[#1C1B1A]">{order.id}</span>
                <button
                  onClick={copyOrderCode}
                  className="text-[#9E211D] hover:text-[#801915] cursor-pointer"
                  title="Sao chép mã"
                >
                  <Copy size={14} />
                </button>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[11px] text-[#867B6E] uppercase tracking-wider block">Phương thức</span>
              <span className="font-bold text-[#9E211D]">
                {isZalo ? 'ZALO CHAT' : 'COD (Tiền mặt)'}
              </span>
            </div>
          </div>

          {/* Purchased Items List */}
          <div>
            <span className="text-[11px] font-semibold text-[#867B6E] uppercase tracking-wider block mb-2">
              Sản phẩm đã chọn ({order.items.reduce((s, i) => s + i.quantity, 0)})
            </span>
            <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
              {order.items.map(item => (
                <div key={item.product.id} className="flex items-center justify-between py-1 text-xs">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-9 h-9 rounded object-cover bg-[#F5EFE4]"
                    />
                    <div>
                      <p className="font-semibold text-[#1C1B1A] line-clamp-1">{item.product.name}</p>
                      <span className="text-[11px] text-[#82776A]">{item.quantity} x {formatPrice(item.product.price)}</span>
                    </div>
                  </div>
                  <span className="font-semibold tabular-nums text-[#1C1B1A]">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery & Total */}
          <div className="pt-3 border-t border-[#EFEAE0] space-y-1.5 text-xs text-[#5D5347]">
            <div>
              <span className="font-semibold">Người nhận:</span> {order.customerInfo.fullName} ({order.customerInfo.phoneNumber})
            </div>
            <div>
              <span className="font-semibold">Địa chỉ:</span> {order.customerInfo.shippingAddress}
            </div>
            {order.customerInfo.notes && (
              <div>
                <span className="font-semibold">Ghi chú:</span> {order.customerInfo.notes}
              </div>
            )}
            <div className="pt-2 border-t border-[#EFEAE0] flex justify-between items-center text-sm sm:text-base font-bold text-[#1C1B1A]">
              <span>TỔNG TIỀN</span>
              <span className="text-[#9E211D] text-lg tabular-nums">{formatPrice(order.totalAmount)}</span>
            </div>
          </div>
        </div>

        {/* Zalo Specific Prompt */}
        {isZalo && (
          <div className="mt-5 p-4 rounded-xl bg-[#0068FF]/10 border border-[#0068FF]/20 text-xs text-[#004DB3] flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <MessageSquare size={20} className="shrink-0 text-[#0068FF]" />
              <span>Vui lòng liên hệ Giao Thời qua Zalo để xác nhận đơn hàng và hướng dẫn thanh toán.</span>
            </div>
            <a
              href={ZALO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-full bg-[#0068FF] text-white text-xs font-bold whitespace-nowrap hover:bg-[#0055D4] transition-colors shrink-0"
            >
              LIÊN HỆ ZALO →
            </a>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={() => {
              onClose();
              onContinueShopping();
            }}
            className="w-full py-3.5 px-6 rounded-full bg-[#9E211D] text-white text-xs font-bold tracking-wider uppercase hover:bg-[#851B17] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-[#9E211D]/20"
          >
            <PackageCheck size={16} />
            <span>TIẾP TỤC MUA SẮM</span>
          </button>
        </div>

      </div>
    </div>
  );
};
