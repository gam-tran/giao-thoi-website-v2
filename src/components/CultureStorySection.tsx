import React from 'react';
import { SectionHeading } from './common/DecorativeElements';
import { Feather, Flame, Sparkles, BookOpen } from 'lucide-react';

interface CultureStoryProps {
  isStandalonePage?: boolean;
  onExploreProducts?: () => void;
}

export const CultureStorySection: React.FC<CultureStoryProps> = ({
  isStandalonePage = false,
  onExploreProducts,
}) => {
  const stories = [
    {
      id: 'truc-chi',
      title: 'Trúc Chỉ Xứ Huế: Ánh Sáng Từ Xơ Tre Việt',
      summary: 'Trúc Chỉ không đơn thuần là làm giấy, mà là cuộc đối thoại giữa nước, sợi xơ tre và tâm thức người nghệ nhân. Mỗi tác phẩm là một độc bản không bao giờ lặp lại.',
      icon: Flame,
      image: '/images/hero_truc_chi_lamps_1791086158760.jpg',
      author: 'Nghệ nhân Phan Hải Bằng',
      quote: '“Mỗi sợi xơ tre như một tế bào di sản được hồi sinh dưới áp lực nước và ánh sáng.”',
    },
    {
      id: 'chim-lac',
      title: 'Chim Lạc Âu Lạc: Khát Vọng Tự Do Nghìn Năm',
      summary: 'Hình tượng chim Lạc sải cánh trên trống đồng Đông Sơn đã trở thành biểu tượng tinh thần bất diệt của người Việt. Giao Thời đưa cánh chim ấy vào chiếc trâm cài tóc thanh tao.',
      icon: Feather,
      image: '/images/regenerated_image_1791086848863.png',
      author: 'Di sản Đông Sơn',
      quote: '“Cánh chim cội nguồn nhắc nhở ta về nơi chốn bắt đầu của niềm kiêu hãnh dân tộc.”',
    },
    {
      id: 'sen-dong',
      title: 'Hoa Sen Trong Kim Hoàn Truyền Thống',
      summary: 'Từ những miếng đồng thô ráp, qua đôi bàn tay người thợ gò chạm làng Định Công, từng cánh sen nở rộ mềm mại như lụa, tỏa sáng vẻ đẹp đoan trang thuần hậu.',
      icon: Sparkles,
      image: '/images/regenerated_image_1791086855707.png',
      author: 'Làng nghề Định Công',
      quote: '“Gần bùn mà chẳng hôi tanh mùi bùn - phẩm cách người Việt trong từng nếp chạm.”',
    },
    {
      id: 'dong-ho',
      title: 'Màu Dân Tộc Sáng Bừng Trên Giấy Điệp',
      summary: 'Tranh Đông Hồ lưu giữ hồn quê Việt Nam bằng vỏ sò biển nghiền mịn, than lá tre và tro rơm rạ. Mỗi nét mộc bản là một ước vọng bình an truyền đời.',
      icon: BookOpen,
      image: '/images/product_tranh_dong_ho_1791086205278.jpg',
      author: 'Làng tranh Đông Hồ',
      quote: '“Tranh Đông Hồ gà lợn nét tươi trong / Màu dân tộc sáng bừng trên giấy điệp.”',
    },
  ];

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading
        title="CÂU CHUYỆN VĂN HÓA"
        subtitle="Hành trình tìm về cội nguồn và bảo tồn tinh hoa nghệ thuật thủ công Việt"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
        {stories.map(story => {
          const Icon = story.icon;
          return (
            <div
              key={story.id}
              className="bg-white rounded-2xl border border-[#E8E1D3] overflow-hidden shadow-sm hover:shadow-md hover:border-[#D0C4B0] transition-all duration-300 flex flex-col"
            >
              <div className="h-56 sm:h-64 overflow-hidden relative">
                <img
                  src={story.image}
                  alt={story.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 p-2.5 rounded-full bg-white/90 backdrop-blur-md shadow text-[#9E211D]">
                  <Icon size={18} />
                </div>
              </div>

              <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="font-editorial text-lg sm:text-xl font-bold text-[#1C1B1A] mb-3 leading-snug">
                    {story.title}
                  </h3>
                  <p className="text-sm text-[#5C5349] leading-relaxed mb-4">
                    {story.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F0EBE1]">
                  <p className="font-serif italic text-xs text-[#9E211D] leading-relaxed">
                    {story.quote}
                  </p>
                  <span className="block mt-1 text-[11px] font-medium text-[#8F8374]">
                    — {story.author}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {isStandalonePage && onExploreProducts && (
        <div className="mt-12 text-center">
          <button
            onClick={onExploreProducts}
            className="px-8 py-3.5 bg-[#9E211D] text-white text-xs sm:text-sm font-semibold tracking-wider rounded-full hover:bg-[#851B17] transition-colors shadow-lg shadow-[#9E211D]/20 cursor-pointer"
          >
            KHÁM PHÁ CÁC TÁC PHẨM THỦ CÔNG →
          </button>
        </div>
      )}
    </section>
  );
};
