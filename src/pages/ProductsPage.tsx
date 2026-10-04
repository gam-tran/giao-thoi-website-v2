import React, { useState, useMemo } from 'react';
import { SectionHeading } from '../components/common/DecorativeElements';
import { ProductGrid } from '../components/ProductGrid';
import { CategoryFilter } from '../components/CategoryFilter';
import { useShop } from '../context/ShopContext';
import { Product } from '../types';
import { Search, ArrowUpDown } from 'lucide-react';

interface ProductsPageProps {
  onSelectProduct: (product: Product) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({ onSelectProduct }) => {
  const { products, selectedCategory, setSelectedCategory } = useShop();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default');

  const filteredAndSorted = useMemo(() => {
    let result = [...products];

    // Filter by category
    if (selectedCategory !== 'Tất cả') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Filter by search query
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter(
        p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
      );
    }

    // Sort
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, selectedCategory, searchTerm, sortBy]);

  return (
    <div className="py-6 sm:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <SectionHeading
        title="TẤT CẢ SẢN PHẨM"
        subtitle="12 chế tác thủ công tinh tuyển mang đậm bản sắc văn hóa Việt"
      />

      {/* Category Filter Pills */}
      <CategoryFilter
        activeCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Search & Sort Controls Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-3 px-4 bg-white rounded-2xl border border-[#EBE4D5] shadow-xs">
        {/* Search Field */}
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C8071]" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Tìm theo tên sản phẩm..."
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-full bg-[#FAF8F5] border border-[#DDD3C2] text-[#252525] placeholder:text-[#9A8E7E] focus:outline-none focus:ring-2 focus:ring-[#9E211D]"
          />
        </div>

        {/* Sort Selector */}
        <div className="flex items-center gap-2 self-end sm:self-auto text-xs text-[#5C5245]">
          <ArrowUpDown size={14} className="text-[#9E211D]" />
          <span className="font-semibold uppercase tracking-wider">Sắp xếp:</span>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as any)}
            className="px-3 py-1.5 rounded-lg border border-[#DDD3C2] bg-[#FAF8F5] text-xs font-medium text-[#252525] focus:outline-none focus:ring-1 focus:ring-[#9E211D] cursor-pointer"
          >
            <option value="default">Mặc định</option>
            <option value="price-asc">Giá thấp đến cao</option>
            <option value="price-desc">Giá cao đến thấp</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="pt-2">
        <ProductGrid
          products={filteredAndSorted}
          onSelectProduct={onSelectProduct}
          emptyMessage={`Không tìm thấy sản phẩm nào phù hợp với bộ lọc hiện tại.`}
        />
      </div>
    </div>
  );
};
