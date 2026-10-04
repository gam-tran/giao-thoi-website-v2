import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Newsletter: React.FC = () => {
  const { showToast } = useShop();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Vui lòng nhập địa chỉ email hợp lệ');
      return;
    }

    try {
      const existing = JSON.parse(localStorage.getItem('giaothoi_newsletter_emails') || '[]');
      existing.push({ email, date: new Date().toISOString() });
      localStorage.setItem('giaothoi_newsletter_emails', JSON.stringify(existing));
    } catch {
      // ignore
    }

    setIsSubscribed(true);
    showToast('Cảm ơn bạn đã đăng ký nhận tin từ Giao Thời!');
  };

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative rounded-3xl overflow-hidden border border-[#E7DEC8] bg-[#F7F2E7] p-8 sm:p-12 shadow-sm">
        
        {/* Decorative plum blossom branch on left, matching visual reference */}
        <div className="absolute -left-10 -bottom-10 w-48 sm:w-64 opacity-25 pointer-events-none">
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10 190 Q60 140 100 130 T180 80"
              stroke="#9E211D"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M60 140 Q80 110 90 90"
              stroke="#9E211D"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            {/* Blossoms */}
            <circle cx="100" cy="130" r="7" fill="#9E211D" opacity="0.8" />
            <circle cx="100" cy="130" r="3" fill="#FAF8F5" />
            <circle cx="140" cy="105" r="8" fill="#9E211D" opacity="0.8" />
            <circle cx="140" cy="105" r="3" fill="#FAF8F5" />
            <circle cx="180" cy="80" r="9" fill="#9E211D" opacity="0.8" />
            <circle cx="180" cy="80" r="3.5" fill="#FAF8F5" />
            <circle cx="90" cy="90" r="7" fill="#9E211D" opacity="0.8" />
            <circle cx="90" cy="90" r="2.5" fill="#FAF8F5" />
          </svg>
        </div>

        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <h3 className="font-editorial text-2xl sm:text-3xl font-bold tracking-[0.14em] text-[#1C1B1A] uppercase mb-2">
            ĐĂNG KÝ NHẬN TIN
          </h3>
          <p className="text-sm sm:text-base text-[#5E5448] font-sans mb-8">
            Nhận thông tin về sản phẩm mới, bộ sưu tập và những câu chuyện văn hóa từ Giao Thời.
          </p>

          {isSubscribed ? (
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#9E211D]/10 text-[#9E211D] rounded-full font-medium text-sm">
              <Check size={18} />
              <span>Bạn đã đăng ký thành công! Giao Thời sẽ gửi những ấn phẩm mới nhất tới bạn.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Nhập email của bạn..."
                required
                className="w-full px-5 py-3 rounded-full bg-white border border-[#DDD3C2] text-[#252525] text-sm placeholder:text-[#9A8F80] focus:outline-none focus:ring-2 focus:ring-[#9E211D] focus:border-transparent transition-all shadow-inner"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-7 py-3 bg-[#9E211D] text-white text-xs font-semibold tracking-wider uppercase rounded-full hover:bg-[#851B17] transition-colors shrink-0 shadow-md shadow-[#9E211D]/20 inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>ĐĂNG KÝ</span>
                <ArrowRight size={14} />
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};
