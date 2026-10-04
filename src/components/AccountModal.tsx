import React, { useState } from 'react';
import { X, User, Package, Clock, MapPin, Mail, Phone, CheckCircle2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { formatPrice } from '../data/products';

export const AccountModal: React.FC = () => {
  const { isAccountOpen, setIsAccountOpen, user, updateUser, orders } = useShop();
  const [activeTab, setActiveTab] = useState<'profile' | 'orders'>('profile');

  const [formData, setFormData] = useState({
    name: user?.name || 'Nguyễn Văn An',
    email: user?.email || 'khachhang@giaothoi.vn',
    phone: user?.phone || '0912 345 678',
    address: user?.address || 'Số 18 Phố Tràng Tiền, Hoàn Kiếm, Hà Nội',
  });

  if (!isAccountOpen) return null;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(formData);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#FAF8F5] rounded-3xl border border-[#E7DECE] shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-white border-b border-[#E8DFC9] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#9E211D]/10 text-[#9E211D] flex items-center justify-center">
              <User size={20} />
            </div>
            <div>
              <h2 className="font-editorial text-lg sm:text-xl font-bold tracking-[0.08em] text-[#1C1B1A] uppercase">
                TÀI KHOẢN KHÁCH HÀNG
              </h2>
              <p className="text-xs text-[#7A6E5F]">
                Quản lý thông tin và theo dõi đơn hàng tại Giao Thời
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAccountOpen(false)}
            className="p-1.5 rounded-full text-[#7B7062] hover:text-[#1C1B1A] hover:bg-[#F2ECE0] transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-[#EAE2D2] bg-[#F4EFE6]/60 px-6 pt-2">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 py-3 px-4 border-b-2 font-semibold text-xs uppercase tracking-wider transition-colors ${
              activeTab === 'profile'
                ? 'border-[#9E211D] text-[#9E211D]'
                : 'border-transparent text-[#6D6356] hover:text-[#1C1B1A]'
            }`}
          >
            <User size={15} />
            <span>Thông tin cá nhân</span>
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 py-3 px-4 border-b-2 font-semibold text-xs uppercase tracking-wider transition-colors ${
              activeTab === 'orders'
                ? 'border-[#9E211D] text-[#9E211D]'
                : 'border-transparent text-[#6D6356] hover:text-[#1C1B1A]'
            }`}
          >
            <Package size={15} />
            <span>Lịch sử đơn hàng ({orders.length})</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="overflow-y-auto p-5 sm:p-8">
          {activeTab === 'profile' ? (
            <form onSubmit={handleSaveProfile} className="space-y-4 max-w-lg mx-auto">
              <div>
                <label className="block text-xs font-semibold text-[#5A5145] mb-1 flex items-center gap-1.5">
                  <User size={14} className="text-[#9E211D]" />
                  <span>Họ và tên</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDD3C2] text-xs sm:text-sm bg-white focus:ring-2 focus:ring-[#9E211D] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5A5145] mb-1 flex items-center gap-1.5">
                  <Mail size={14} className="text-[#9E211D]" />
                  <span>Email</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDD3C2] text-xs sm:text-sm bg-white focus:ring-2 focus:ring-[#9E211D] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5A5145] mb-1 flex items-center gap-1.5">
                  <Phone size={14} className="text-[#9E211D]" />
                  <span>Số điện thoại</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDD3C2] text-xs sm:text-sm bg-white focus:ring-2 focus:ring-[#9E211D] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5A5145] mb-1 flex items-center gap-1.5">
                  <MapPin size={14} className="text-[#9E211D]" />
                  <span>Địa chỉ nhận hàng mặc định</span>
                </label>
                <textarea
                  rows={2}
                  value={formData.address}
                  onChange={e => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDD3C2] text-xs sm:text-sm bg-white focus:ring-2 focus:ring-[#9E211D] focus:outline-none"
                  required
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-3 px-6 bg-[#9E211D] text-white text-xs font-semibold uppercase tracking-wider rounded-full hover:bg-[#851B17] transition-colors shadow-md shadow-[#9E211D]/20 cursor-pointer"
                >
                  LƯU THAY ĐỔI
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              {orders.length === 0 ? (
                <div className="text-center py-12 text-[#827668]">
                  <Package size={36} className="mx-auto text-[#C6BBAA] mb-3" />
                  <p className="font-editorial text-base text-[#3D372F]">Bạn chưa có đơn hàng nào</p>
                  <p className="text-xs text-[#827668] mt-1">
                    Các đơn hàng bạn đặt sẽ được lưu trữ và hiển thị tại đây.
                  </p>
                </div>
              ) : (
                orders.map(order => (
                  <div
                    key={order.id}
                    className="p-4 bg-white rounded-2xl border border-[#E8DEC9] space-y-3 shadow-xs"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-[#F0EAE0]">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs sm:text-sm text-[#1C1B1A]">{order.id}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#2F7E43]/10 text-[#2F7E43] font-medium flex items-center gap-1">
                          <CheckCircle2 size={11} />
                          <span>Đã xác nhận</span>
                        </span>
                      </div>
                      <span className="text-[11px] text-[#8C8071] flex items-center gap-1">
                        <Clock size={12} />
                        <span>{new Date(order.createdAt).toLocaleDateString('vi-VN')}</span>
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      {order.items.map(item => (
                        <div key={item.product.id} className="flex justify-between text-xs text-[#4F463B]">
                          <span>{item.quantity} x {item.product.name}</span>
                          <span className="font-medium tabular-nums">{formatPrice(item.product.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-[#F0EAE0] flex justify-between items-center text-xs">
                      <span className="text-[#7A6E5F]">
                        Phương thức: <strong>{order.paymentMethod === 'ZALO' ? 'Zalo Chat' : 'COD'}</strong>
                      </span>
                      <div className="text-sm font-bold text-[#9E211D] tabular-nums">
                        Tổng: {formatPrice(order.totalAmount)}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
