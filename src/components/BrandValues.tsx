import React from 'react';
import { Leaf, Award, Landmark, Compass } from 'lucide-react';

export const BrandValues: React.FC = () => {
  const values = [
    {
      icon: Leaf,
      title: 'CHẤT LIỆU TỰ NHIÊN',
      description: 'Tre trúc, tơ tằm, sừng tự nhiên, đồng thau nguyên chất thân thiện và bền vững.',
    },
    {
      icon: Award,
      title: 'THỦ CÔNG TINH XẢO',
      description: 'Chế tác tỉ mỉ qua hàng chục giờ bởi những bàn tay nghệ nhân làng nghề kỳ cựu.',
    },
    {
      icon: Landmark,
      title: 'ĐẬM BẢN SẮC VĂN HÓA',
      description: 'Mỗi chi tiết khắc họa câu chuyện lịch sử, mỹ cảm truyền thống qua nghìn năm dựng nước.',
    },
    {
      icon: Compass,
      title: 'THIẾT KẾ HIỆN ĐẠI',
      description: 'Hòa quyện tinh hoa cổ truyền với công năng và ngôn ngữ mỹ thuật của đời sống hôm nay.',
    },
  ];

  return (
    <section className="py-12 border-y border-[#E9E1D2] bg-[#F7F3EB]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <div key={i} className="flex flex-col items-center text-center px-2">
                <div className="w-13 h-13 rounded-2xl bg-white border border-[#E2D8C6] flex items-center justify-center text-[#9E211D] mb-4 shadow-sm">
                  <Icon size={24} strokeWidth={1.75} />
                </div>
                <h4 className="font-editorial text-sm font-bold tracking-[0.12em] text-[#1C1B1A] mb-2 uppercase">
                  {v.title}
                </h4>
                <p className="text-xs sm:text-sm text-[#665D52] leading-relaxed max-w-xs font-sans">
                  {v.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
