import React from 'react';
import { GiaoThoiEmblem } from './common/Logo';
import { BRAND_CONFIG, ZALO_URL } from '../config/constants';
import { MapPin, Phone, Mail } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#141312] text-[#E8DFD3] pt-14 pb-8 border-t border-[#262320]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#2A2723]">
          
          {/* Column 1: Brand Identifier */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3.5">
              <GiaoThoiEmblem size={48} />
              <div>
                <span className="font-editorial text-2xl font-bold tracking-[0.16em] text-white block">
                  {BRAND_CONFIG.name}
                </span>
                <span className="font-serif italic text-sm text-[#BF9C78]">
                  {BRAND_CONFIG.slogan}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#9C9184] leading-relaxed max-w-sm pt-2">
              {BRAND_CONFIG.description}
            </p>

            <div className="space-y-2 pt-2 text-xs text-[#9C9184]">
              <div className="flex items-start gap-2.5">
                <MapPin size={15} className="text-[#9E211D] shrink-0 mt-0.5" />
                <span>{BRAND_CONFIG.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={15} className="text-[#9E211D] shrink-0" />
                <span>Hotline: {BRAND_CONFIG.phone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={15} className="text-[#9E211D] shrink-0" />
                <span>Email: {BRAND_CONFIG.email}</span>
              </div>
            </div>
          </div>

          {/* Column 2: VỀ GIAO THỜI */}
          <div>
            <h4 className="font-editorial text-xs font-bold tracking-[0.18em] text-white uppercase mb-4">
              VỀ GIAO THỜI
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A89D8E]">
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white hover:underline transition-colors text-left"
                >
                  Giới thiệu thương hiệu
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('culture')}
                  className="hover:text-white hover:underline transition-colors text-left"
                >
                  Câu chuyện văn hóa
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('collections')}
                  className="hover:text-white hover:underline transition-colors text-left"
                >
                  Bộ sưu tập di sản
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white hover:underline transition-colors text-left"
                >
                  Liên hệ hợp tác
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: HỖ TRỢ KHÁCH HÀNG */}
          <div>
            <h4 className="font-editorial text-xs font-bold tracking-[0.18em] text-white uppercase mb-4">
              HỖ TRỢ KHÁCH HÀNG
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A89D8E]">
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Chính sách mua hàng
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Chính sách đổi trả 7 ngày
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Hướng dẫn thanh toán (COD &amp; Zalo)
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Chính sách giao hàng toàn quốc
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: KẾT NỐI VỚI CHÚNG TÔI */}
          <div>
            <h4 className="font-editorial text-xs font-bold tracking-[0.18em] text-white uppercase mb-4">
              KẾT NỐI VỚI CHÚNG TÔI
            </h4>
            <div className="flex items-center gap-3 mb-4">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#24211D] flex items-center justify-center text-[#D8CFC2] hover:bg-[#9E211D] hover:text-white transition-colors"
                title="Facebook Giao Thời"
              >
                <span className="text-xs font-bold">fb</span>
              </a>
              {/* TikTok */}
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#24211D] flex items-center justify-center text-[#D8CFC2] hover:bg-[#9E211D] hover:text-white transition-colors"
                title="TikTok Giao Thời"
              >
                <span className="text-xs font-bold">tt</span>
              </a>
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#24211D] flex items-center justify-center text-[#D8CFC2] hover:bg-[#9E211D] hover:text-white transition-colors"
                title="Instagram Giao Thời"
              >
                <span className="text-xs font-bold">ig</span>
              </a>
              {/* Zalo */}
              <a
                href={ZALO_URL}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#0068FF] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                title="Zalo Giao Thời"
              >
                <span className="text-[10px] font-bold tracking-tight">Zalo</span>
              </a>
            </div>

            <p className="text-[11px] text-[#8C8172] leading-relaxed">
              Tư vấn trực tiếp 24/7 qua Zalo và kênh hỗ trợ trực tuyến.
            </p>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#827668] gap-4">
          <p>© {BRAND_CONFIG.year} {BRAND_CONFIG.name}. Tất cả quyền được bảo lưu.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#BFB5A7] cursor-pointer">Điều khoản dịch vụ</span>
            <span>·</span>
            <span className="hover:text-[#BFB5A7] cursor-pointer">Bảo mật thông tin</span>
            <span>·</span>
            <span className="text-[#BF9C78] font-serif italic">Tinh hoa từ đất Việt</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
