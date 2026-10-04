import React from 'react';
import { ArrowRight } from 'lucide-react';
import { GiaoThoiEmblem } from './common/Logo';

interface IntroBannerProps {
  onLearnMore: () => void;
}

export const IntroBanner: React.FC<IntroBannerProps> = ({ onLearnMore }) => {
  return (
    <section className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative rounded-3xl overflow-hidden border border-[#E8DEC9] bg-[#F7F2E7]/80 p-6 sm:p-10 lg:p-12 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Brand Story */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-4">
              <GiaoThoiEmblem size={52} />
              <div>
                <h3 className="font-editorial text-2xl sm:text-3xl font-bold tracking-[0.14em] text-[#9E211D]">
                  GIAO THỜI
                </h3>
                <p className="font-serif italic text-base text-[#9E211D] font-medium">
                  Tinh hoa từ đất Việt
                </p>
              </div>
            </div>

            <p className="text-sm sm:text-base text-[#564E44] leading-relaxed max-w-lg mb-6">
              Giao Thời là thương hiệu thủ công mỹ nghệ Việt Nam, được dựng lên với mong muốn gìn giữ và lan tỏa những giá trị văn hóa truyền thống qua các sản phẩm thủ công tinh xảo, mang đậm bản sắc dân tộc nơi truyền thống gặp gỡ hơi thở đương đại.
            </p>

            <div>
              <button
                onClick={onLearnMore}
                className="group inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full border border-[#9E211D] text-[#9E211D] text-xs sm:text-sm font-semibold tracking-wider hover:bg-[#9E211D] hover:text-white transition-all duration-300 cursor-pointer"
              >
                <span>TÌM HIỂU THÊM</span>
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Right Column: Artisan Craft Showcase Image */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-md border border-[#E5DAC6] bg-[#FAF8F5]">
              <img
                src="/images/regenerated_image_1791086841346.png"
                alt="Trâm đồng họa tiết chim Âu Lạc - Giao Thời"
                referrerPolicy="no-referrer"
                className="w-full h-64 sm:h-72 lg:h-80 object-cover object-center transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-3 right-3 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-white text-[11px] font-medium">
                Nghệ nhân chạm khắc thủ công
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
