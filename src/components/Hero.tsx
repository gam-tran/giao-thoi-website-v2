import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CloudOrnament } from './common/DecorativeElements';

interface HeroProps {
  onExplore: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  return (
    <section className="relative overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-16 lg:py-16">
      {/* Subtle traditional Vietnamese cloud ornaments in background */}
      <CloudOrnament className="absolute -top-6 -left-12 w-80 h-auto text-[#9E211D]" opacity={0.12} />
      <CloudOrnament className="absolute top-20 right-4 w-96 h-auto text-[#9E211D]" opacity={0.1} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Brand Statement & CTA */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left z-10">
            {/* Brand Title: GIAO THỜI */}
            <div className="space-y-1">
              <h1 className="font-editorial text-5xl sm:text-6xl lg:text-7xl font-bold tracking-[0.08em] text-[#9E211D] leading-[0.95]">
                GIAO
                <br />
                THỜI
              </h1>
              <p className="font-serif italic text-2xl sm:text-3xl text-[#9E211D] pt-2 tracking-wide font-medium">
                Tinh hoa từ đất Việt
              </p>
            </div>

            {/* Description */}
            <p className="mt-5 text-[#524B42] text-sm sm:text-base leading-relaxed max-w-md font-sans font-normal">
              Giao Thời mang đến các sản phẩm thủ công mỹ nghệ Việt Nam, lưu giữ giá trị văn hóa truyền thống, kết nối nét đẹp dân tộc trong từng sản phẩm.
            </p>

            {/* CTA Button */}
            <div className="mt-8">
              <button
                onClick={onExplore}
                className="group inline-flex items-center gap-3 px-8 py-3.5 bg-[#9E211D] text-white text-xs sm:text-sm font-semibold tracking-[0.14em] rounded-full shadow-lg shadow-[#9E211D]/25 hover:bg-[#851B17] hover:shadow-xl hover:shadow-[#9E211D]/35 transition-all duration-300 cursor-pointer"
              >
                <span>KHÁM PHÁ NGAY</span>
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual Anchor (Truc Chi Lamps) */}
          <div className="lg:col-span-7 relative">
            <div className="relative mx-auto rounded-3xl overflow-hidden shadow-2xl shadow-[#1C1B1A]/10 border border-[#E9E1D4] bg-[#FAF8F5]">
              <img
                src="/images/hero_truc_chi_lamps_1791086158760.jpg"
                alt="Đèn Trúc Chỉ thủ công mỹ nghệ Giao Thời"
                referrerPolicy="no-referrer"
                className="w-full h-auto max-h-[540px] object-cover object-center transform hover:scale-[1.02] transition-transform duration-700 ease-out"
              />
              {/* Subtle ambient light gradient at base */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
              
              {/* Floating subtle caption pill */}
              <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:bottom-6 flex items-center justify-between text-xs text-white/90 backdrop-blur-md bg-black/30 px-4 py-2 rounded-full border border-white/15">
                <span className="font-serif italic tracking-wider">Nghệ thuật Trúc Chỉ xứ Huế &amp; Đồng Mỹ Nghệ</span>
                <span className="text-[11px] font-medium tracking-widest text-[#E8DCC8] uppercase">Di sản Việt</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
