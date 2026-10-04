import React from 'react';
import { CultureStorySection } from '../components/CultureStorySection';
import { CloudOrnament } from '../components/common/DecorativeElements';

interface CulturePageProps {
  onNavigate: (view: string) => void;
}

export const CulturePage: React.FC<CulturePageProps> = ({ onNavigate }) => {
  return (
    <div className="py-6 sm:py-10 relative overflow-hidden">
      <CloudOrnament className="absolute top-10 left-10 w-96 text-[#9E211D]" opacity={0.08} />
      
      {/* Editorial Hero Banner */}
      <div className="max-w-4xl mx-auto px-4 text-center mb-10">
        <span className="text-xs font-semibold tracking-[0.2em] text-[#9E211D] uppercase block mb-2">
          DI SẢN TRĂM NĂM
        </span>
        <h1 className="font-editorial text-3xl sm:text-5xl font-bold tracking-[0.06em] text-[#1C1B1A] leading-tight mb-4">
          GÌN GIỮ TINH HOA VIỆT NAM
        </h1>
        <p className="font-serif italic text-base sm:text-lg text-[#6E6252] leading-relaxed max-w-2xl mx-auto">
          Mỗi tác phẩm thủ công tại Giao Thời không chỉ là một vật phẩm thưởng lãm, mà là chiếc cầu nối vô hình giữa tâm hồn người Việt xưa và nếp sống đương đại.
        </p>
      </div>

      <CultureStorySection
        isStandalonePage={true}
        onExploreProducts={() => onNavigate('products')}
      />
    </div>
  );
};
