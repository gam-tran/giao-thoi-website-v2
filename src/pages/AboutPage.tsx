import React from 'react';
import { GiaoThoiEmblem } from '../components/common/Logo';
import { BRAND_CONFIG } from '../config/constants';
import { BrandValues } from '../components/BrandValues';
import { SectionHeading } from '../components/common/DecorativeElements';
import { ShieldCheck, Heart, Sparkles, Compass } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const pillars = [
    {
      title: 'THỦ CÔNG',
      description: 'Đề cao giá trị bàn tay con người, từng đường đục đẽo, chạm khắc, dệt vải đều đong đầy tâm sức của những bậc thầy nghệ nhân làng nghề.',
      icon: Heart,
    },
    {
      title: 'BẢN SẮC',
      description: 'Lấy cội nguồn văn hóa Việt nghìn năm làm kim chỉ nam, mỗi tạo tác đều thấm đượm hồn cốt sông núi, thần thoại và mỹ tục dân tộc.',
      icon: ShieldCheck,
    },
    {
      title: 'TINH TẾ',
      description: 'Chuốt tỉ mỉ từ vật liệu thô đến đóng gói sản phẩm. Tinh tế không phô trương mà lắng sâu trong từng điểm chạm giác quan.',
      icon: Sparkles,
    },
    {
      title: 'HIỆN ĐẠI',
      description: 'Đưa di sản vào không gian sống thanh lịch đương đại, hòa nhịp với nhu cầu thẩm mỹ và phong cách sống của người tiêu dùng hôm nay.',
      icon: Compass,
    },
  ];

  return (
    <div className="py-6 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Brand Hero Introduction */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex justify-center mb-2">
          <GiaoThoiEmblem size={64} />
        </div>
        <h1 className="font-editorial text-3xl sm:text-5xl font-bold tracking-[0.14em] text-[#9E211D] uppercase">
          {BRAND_CONFIG.name}
        </h1>
        <p className="font-serif italic text-xl sm:text-2xl text-[#8E201B]">
          “{BRAND_CONFIG.slogan}”
        </p>
        <p className="text-sm sm:text-base text-[#564E44] leading-relaxed pt-2">
          {BRAND_CONFIG.description}
        </p>
      </div>

      {/* Brand Story Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-[#E7DEC8] bg-[#F7F2E7] p-8 sm:p-12 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4 text-sm sm:text-base text-[#4E453A] leading-relaxed">
            <h2 className="font-editorial text-2xl font-bold text-[#1C1B1A] uppercase tracking-wider mb-4">
              SỨ MỆNH KẾT NỐI HAI THỜI ĐẠI
            </h2>
            <p>
              Tên gọi <strong>GIAO THỜI</strong> tượng trưng cho khoảnh khắc giao thoa kỳ diệu giữa quá khứ và hiện tại. Trong dòng chảy hối hả của thế kỷ 21, chúng tôi mong muốn lưu giữ lại những nét duyên thầm của nghệ thuật kim hoàn Định Công, sự huyền ảo của Trúc Chỉ xứ Huế, và nét tươi trong của tranh mộc bản Đông Hồ.
            </p>
            <p>
              Chúng tôi không làm đồ lưu niệm đại trà. Mỗi tác phẩm của Giao Thời là kết quả của sự tuyển chọn gắt gao về nguyên liệu tự nhiên bản địa, quy trình chế tác thủ công chuẩn mực và sự tinh chỉnh mỹ thuật để hòa hợp tự nhiên trong các căn hộ, bàn trà, hay trên trang phục dạ tiệc hiện đại.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden shadow-md border border-[#E2D8C6]">
              <img
                src="/images/hero_truc_chi_lamps_1791086158760.jpg"
                alt="Xưởng thủ công Giao Thời"
                referrerPolicy="no-referrer"
                className="w-full h-72 object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 4 Core Values */}
      <div>
        <SectionHeading
          title="BỐN TRỤ CỘT GIÁ TRỊ"
          subtitle="Những nguyên tắc bất biến định hình nên linh hồn của từng sản phẩm Giao Thời"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl border border-[#E9E2D4] p-6 text-center shadow-xs hover:shadow-md hover:border-[#D0C2AE] transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-[#9E211D]/10 text-[#9E211D] flex items-center justify-center mx-auto mb-4">
                  <Icon size={22} />
                </div>
                <h3 className="font-editorial text-base font-bold tracking-[0.14em] text-[#1C1B1A] mb-2 uppercase">
                  {p.title}
                </h3>
                <p className="text-xs text-[#635A4F] leading-relaxed">
                  {p.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Brand Values summary */}
      <BrandValues />

    </div>
  );
};
