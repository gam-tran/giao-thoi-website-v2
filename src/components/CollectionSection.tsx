import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SectionHeading } from './common/DecorativeElements';

interface CollectionItem {
  id: string;
  title: string;
  categoryFilter: string;
  image: string;
  tagline: string;
  description: string;
}

interface CollectionSectionProps {
  onSelectCollection: (categoryFilter: string) => void;
  isStandalonePage?: boolean;
}

export const COLLECTIONS: CollectionItem[] = [
  {
    id: 'anh-sang-di-san',
    title: 'ÁNH SÁNG DI SẢN',
    categoryFilter: 'Đồ trang trí',
    image: '/images/hero_truc_chi_lamps_1791086158760.jpg',
    tagline: 'Đèn Trúc Chỉ & Nghệ Thuật Ánh Sáng Xứ Huế',
    description: 'Tôn vinh nghệ thuật Trúc Chỉ với sự kết hợp diệu kỳ giữa xơ tre tự nhiên và ánh sáng ấm áp, mang đến nét an yên sâu lắng cho không gian sống hiện đại.',
  },
  {
    id: 'sac-hoa-truyen-thong',
    title: 'SẮC HOA TRUYỀN THỐNG',
    categoryFilter: 'Phụ kiện',
    image: '/images/product_quat_truc_chi_1791086192529.jpg',
    tagline: 'Quạt Trúc Chỉ & Họa Tiết Hoa Sen',
    description: 'Lấy cảm hứng từ đóa sen thuần khiết và những đường nét châm kim mềm mại, mở ra vẻ đẹp thanh tao, dịu dàng của tâm hồn người Việt.',
  },
  {
    id: 'hon-viet-trang-suc',
    title: 'HỒN VIỆT TRONG TRANG SỨC',
    categoryFilter: 'Trang sức',
    image: '/images/regenerated_image_1791086817817.png',
    tagline: 'Kiềng Sen & Trâm Cài Bạc Đồng Truyền Thống',
    description: 'Hồi sinh những món trang sức cung đình và dân gian thời xưa bằng tay nghề chạm bạc, đúc đồng bậc thầy của các nghệ nhân Thăng Long.',
  },
  {
    id: 'net-xua-dong-ho',
    title: 'NÉT XƯA ĐÔNG HỒ',
    categoryFilter: 'Đồ trang trí',
    image: '/images/product_tranh_dong_ho_1791086205278.jpg',
    tagline: 'Tranh Dân Gian Mộc Bản Trên Giấy Điệp',
    description: 'Màu dân tộc sáng bừng trên giấy điệp, chuyển tải lời chúc phúc lộc, vinh quy và ước vọng thái bình nghìn năm của cha ông.',
  },
];

export const CollectionSection: React.FC<CollectionSectionProps> = ({
  onSelectCollection,
  isStandalonePage = false,
}) => {
  // On homepage display 3 cards matching UI reference, or all 4 if standalone page
  const displayCollections = isStandalonePage ? COLLECTIONS : COLLECTIONS.slice(0, 3);

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading
        title="BỘ SƯU TẬP"
        subtitle={isStandalonePage ? 'Những chủ đề thẩm mỹ hội tụ tinh hoa làng nghề và mỹ cảm Việt' : undefined}
      />

      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${isStandalonePage ? '4' : '3'} gap-6 mt-8`}>
        {displayCollections.map(col => (
          <div
            key={col.id}
            onClick={() => onSelectCollection(col.categoryFilter)}
            className="group relative h-80 sm:h-96 rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 border border-[#2D2A26]"
          >
            {/* Background Image with subtle zoom on hover */}
            <img
              src={col.image}
              alt={col.title}
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
            />

            {/* Gradient Overlay for high contrast readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20 group-hover:from-black/90 transition-colors" />

            {/* Content at Bottom */}
            <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
              <span className="text-[11px] font-medium tracking-widest text-[#E6DAC8] uppercase mb-1">
                {col.tagline}
              </span>
              <h3 className="font-editorial text-xl sm:text-2xl font-bold tracking-[0.1em] mb-2 leading-tight">
                {col.title}
              </h3>
              
              {isStandalonePage && (
                <p className="text-xs text-[#D8CFBF] line-clamp-2 mb-4 leading-relaxed font-sans">
                  {col.description}
                </p>
              )}

              <div className="pt-2">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/60 bg-white/10 backdrop-blur-sm text-xs font-semibold tracking-wider text-white hover:bg-white hover:text-[#1C1B1A] transition-all duration-200"
                >
                  <span>XEM BỘ SƯU TẬP</span>
                  <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
