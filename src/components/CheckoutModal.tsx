import React, { useState } from 'react';
import { X, CheckCircle, MessageSquare, Truck, ShieldCheck, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PaymentMethod, OrderCustomerInfo, Order } from '../types';
import { formatPrice } from '../data/products';
import { ZALO_URL } from '../config/constants';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderSuccess: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onOrderSuccess,
}) => {
  const { cart, cartTotal, createOrder, user } = useShop();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('COD');
  const [formData, setFormData] = useState<OrderCustomerInfo>({
    fullName: user?.name || '',
    phoneNumber: user?.phone || '',
    email: user?.email || '',
    shippingAddress: user?.address || '',
    notes: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  if (!isOpen || cart.length === 0) return null;

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim()) errors.fullName = 'Vui lòng nhập họ và tên';
    if (!formData.phoneNumber.trim()) errors.phoneNumber = 'Vui lòng nhập số điện thoại';
    if (!formData.shippingAddress.trim()) errors.shippingAddress = 'Vui lòng nhập địa chỉ giao hàng';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const order = createOrder(formData, paymentMethod);

    if (paymentMethod === 'ZALO') {
      // Open Zalo in a new tab as specified
      window.open(ZALO_URL, '_blank', 'noopener,noreferrer');
    }

    onOrderSuccess(order);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#FAF8F5] rounded-3xl border border-[#E7DECE] shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-white border-b border-[#E8DFC9] flex items-center justify-between">
          <div>
            <h2 className="font-editorial text-xl sm:text-2xl font-bold tracking-[0.08em] text-[#1C1B1A] uppercase">
              XÁC NHẬN VÀ THANH TOÁN
            </h2>
            <p className="text-xs text-[#7A6E5F] mt-0.5">
              Giao hàng an toàn và bảo chứng tinh hoa thủ công
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#7B7062] hover:text-[#1C1B1A] hover:bg-[#F2ECE0] transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleCheckoutSubmit} className="overflow-y-auto p-5 sm:p-8 space-y-8">
          
          {/* Section 1: Customer Information */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E9E2D4] space-y-4">
            <h3 className="font-editorial text-sm sm:text-base font-bold text-[#1C1B1A] uppercase tracking-wider flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#9E211D] text-white inline-flex items-center justify-center text-xs">1</span>
              <span>THÔNG TIN GIAO HÀNG</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#5A5145] mb-1">
                  HỌ VÀ TÊN <span className="text-[#9E211D]">*</span>
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Nguyễn Văn A"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDD3C2] text-xs sm:text-sm focus:ring-2 focus:ring-[#9E211D] focus:outline-none bg-[#FAF8F5]"
                />
                {formErrors.fullName && <p className="text-[11px] text-rose-600 mt-1">{formErrors.fullName}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5A5145] mb-1">
                  SỐ ĐIỆN THOẠI <span className="text-[#9E211D]">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={e => setFormData({ ...formData, phoneNumber: e.target.value })}
                  placeholder="0912 345 678"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDD3C2] text-xs sm:text-sm focus:ring-2 focus:ring-[#9E211D] focus:outline-none bg-[#FAF8F5]"
                />
                {formErrors.phoneNumber && <p className="text-[11px] text-rose-600 mt-1">{formErrors.phoneNumber}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#5A5145] mb-1">
                EMAIL
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                placeholder="email@vidu.vn"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDD3C2] text-xs sm:text-sm focus:ring-2 focus:ring-[#9E211D] focus:outline-none bg-[#FAF8F5]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#5A5145] mb-1">
                ĐỊA CHỈ GIAO HÀNG <span className="text-[#9E211D]">*</span>
              </label>
              <textarea
                rows={2}
                value={formData.shippingAddress}
                onChange={e => setFormData({ ...formData, shippingAddress: e.target.value })}
                placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố..."
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDD3C2] text-xs sm:text-sm focus:ring-2 focus:ring-[#9E211D] focus:outline-none bg-[#FAF8F5]"
              />
              {formErrors.shippingAddress && <p className="text-[11px] text-rose-600 mt-1">{formErrors.shippingAddress}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#5A5145] mb-1">
                GHI CHÚ ĐƠN HÀNG (TÙY CHỌN)
              </label>
              <input
                type="text"
                value={formData.notes || ''}
                onChange={e => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Yêu cầu đóng gói quà tặng, khung giờ giao hàng thuận tiện..."
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDD3C2] text-xs sm:text-sm focus:ring-2 focus:ring-[#9E211D] focus:outline-none bg-[#FAF8F5]"
              />
            </div>
          </div>

          {/* Section 2: Order Summary */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E9E2D4] space-y-4">
            <h3 className="font-editorial text-sm sm:text-base font-bold text-[#1C1B1A] uppercase tracking-wider flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#9E211D] text-white inline-flex items-center justify-center text-xs">2</span>
              <span>TÓM TẮT ĐƠN HÀNG</span>
            </h3>

            <div className="divide-y divide-[#F0EAE0]">
              {cart.map(item => (
                <div key={item.product.id} className="py-2.5 flex items-center justify-between text-xs sm:text-sm">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-10 h-10 rounded-md object-cover bg-[#F5EFE4]"
                    />
                    <div>
                      <p className="font-semibold text-[#1C1B1A]">{item.product.name}</p>
                      <span className="text-[11px] text-[#7A6F60]">
                        {formatPrice(item.product.price)} x {item.quantity}
                      </span>
                    </div>
                  </div>
                  <span className="font-bold text-[#1C1B1A] tabular-nums">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-[#EAE2D3] space-y-1.5 text-xs text-[#63594D]">
              <div className="flex justify-between">
                <span>Tạm tính</span>
                <span className="tabular-nums">{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Phí vận chuyển toàn quốc</span>
                <span className="text-[#2F7E43] font-medium">Miễn phí</span>
              </div>
              <div className="pt-2 border-t border-[#EAE2D3] flex justify-between text-base font-bold text-[#1C1B1A]">
                <span>TỔNG CỘNG</span>
                <span className="text-[#9E211D] text-lg tabular-nums">{formatPrice(cartTotal)}</span>
              </div>
            </div>
          </div>

          {/* Section 3: Payment Method (STRICTLY 2 METHODS: COD & ZALO) */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E9E2D4] space-y-4">
            <h3 className="font-editorial text-sm sm:text-base font-bold text-[#1C1B1A] uppercase tracking-wider flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#9E211D] text-white inline-flex items-center justify-center text-xs">3</span>
              <span>PHƯƠNG THỨC THANH TOÁN</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              
              {/* Option 1: COD */}
              <label
                onClick={() => setPaymentMethod('COD')}
                className={`flex items-start gap-3 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                  paymentMethod === 'COD'
                    ? 'border-[#9E211D] bg-[#9E211D]/5'
                    : 'border-[#E5DDD0] bg-white hover:bg-[#FAF8F5]'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'COD'}
                  onChange={() => setPaymentMethod('COD')}
                  className="mt-1 accent-[#9E211D]"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <Truck size={17} className="text-[#9E211D]" />
                    <span className="text-xs sm:text-sm font-bold text-[#1C1B1A]">
                      COD - Thanh toán khi nhận hàng
                    </span>
                  </div>
                  <p className="text-[11px] text-[#6E6356] mt-1 leading-relaxed">
                    Kiểm tra sản phẩm tận tay, thanh toán tiền mặt trực tiếp cho nhân viên giao vận.
                  </p>
                </div>
              </label>

              {/* Option 2: ZALO CHAT */}
              <label
                onClick={() => setPaymentMethod('ZALO')}
                className={`flex items-start gap-3 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                  paymentMethod === 'ZALO'
                    ? 'border-[#0068FF] bg-[#0068FF]/5'
                    : 'border-[#E5DDD0] bg-white hover:bg-[#FAF8F5]'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'ZALO'}
                  onChange={() => setPaymentMethod('ZALO')}
                  className="mt-1 accent-[#0068FF]"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <MessageSquare size={17} className="text-[#0068FF]" />
                    <span className="text-xs sm:text-sm font-bold text-[#1C1B1A]">
                      ZALO CHAT
                    </span>
                  </div>
                  <p className="text-[11px] text-[#6E6356] mt-1 leading-relaxed">
                    Liên hệ Giao Thời qua Zalo để xác nhận đơn hàng và thanh toán.
                  </p>
                </div>
              </label>

            </div>

            {/* Note if Zalo is selected */}
            {paymentMethod === 'ZALO' && (
              <div className="p-4 rounded-xl bg-[#0068FF]/10 border border-[#0068FF]/20 text-xs text-[#0052CC] leading-relaxed flex items-start gap-3">
                <CheckCircle size={18} className="shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Bạn sẽ được chuyển tới Zalo để trao đổi với Giao Thời, xác nhận đơn hàng và hoàn tất thanh toán.</p>
                  <p className="text-[11px] text-[#4A648C] mt-1">Thông tin giỏ hàng sẽ được lưu tự động để tư vấn viên hỗ trợ bạn nhanh nhất.</p>
                </div>
              </div>
            )}
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              className={`w-full py-4 px-8 text-white text-xs sm:text-sm font-bold tracking-wider uppercase rounded-full shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                paymentMethod === 'ZALO'
                  ? 'bg-[#0068FF] hover:bg-[#0055D4] shadow-[#0068FF]/30'
                  : 'bg-[#9E211D] hover:bg-[#851B17] shadow-[#9E211D]/30'
              }`}
            >
              {paymentMethod === 'ZALO' ? (
                <>
                  <span>LIÊN HỆ QUA ZALO</span>
                  <ArrowRight size={16} />
                </>
              ) : (
                <>
                  <ShieldCheck size={18} />
                  <span>ĐẶT HÀNG (COD)</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
