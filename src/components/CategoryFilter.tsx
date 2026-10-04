import React from 'react';
import { Sparkles, Flower2, Fan, Lamp } from 'lucide-react';

interface CategoryFilterProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  const categories = [
    { id: 'Tất cả', label: 'Tất cả', icon: Flower2 },
    { id: 'Trang sức', label: 'Trang sức', icon: Sparkles },
    { id: 'Phụ kiện', label: 'Phụ kiện', icon: Fan },
    { id: 'Đồ trang trí', label: 'Đồ trang trí', icon: Lamp },
  ];

  return (
    <div className="py-4 px-4 max-w-7xl mx-auto">
      <div className="flex items-center justify-center gap-2 sm:gap-4 overflow-x-auto py-2 no-scrollbar">
        {categories.map(cat => {
          const isActive = activeCategory === cat.id;
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2.5 px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 shadow-sm ${
                isActive
                  ? 'bg-[#9E211D] text-white shadow-[#9E211D]/25 ring-2 ring-[#9E211D]/20 scale-[1.02]'
                  : 'bg-white text-[#4A4238] border border-[#E5DDD0] hover:bg-[#F3EFE7] hover:border-[#D5C9B7]'
              }`}
            >
              <Icon
                size={17}
                className={isActive ? 'text-white' : 'text-[#9E211D]'}
              />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
