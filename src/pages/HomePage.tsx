import React from 'react';
import { Hero } from '../components/Hero';
import { CategoryFilter } from '../components/CategoryFilter';
import { SectionHeading } from '../components/common/DecorativeElements';
import { ProductGrid } from '../components/ProductGrid';
import { IntroBanner } from '../components/IntroBanner';
import { CollectionSection } from '../components/CollectionSection';
import { CultureStorySection } from '../components/CultureStorySection';
import { BrandValues } from '../components/BrandValues';
import { Newsletter } from '../components/Newsletter';
import { useShop } from '../context/ShopContext';
import { Product } from '../types';
import { ArrowRight } from 'lucide-react';

interface HomePageProps {
  onNavigate: (view: string) => void;
  onSelectProduct: (product: Product) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onSelectProduct }) => {
  const { products, selectedCategory, setSelectedCategory } = useShop();

  // Filter products by selected category
  const filteredProducts = selectedCategory === 'Tất cả'
    ? products
    : products.filter(p => p.category === selectedCategory);

  // Featured display: in reference, 4 items shown on desktop
  const featuredProducts = selectedCategory === 'Tất cả'
    ? products.slice(0, 4)
    : filteredProducts.slice(0, 4);

  return (
    <div className="space-y-4 sm:space-y-6">
      
      {/* 1. HERO SECTION */}
      <Hero onExplore={() => onNavigate('products')} />

      {/* 2. CATEGORY NAVIGATION */}
      <CategoryFilter
        activeCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* 3. SẢN PHẨM NỔI BẬT */}
      <section className="py-6 sm:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="SẢN PHẨM NỔI BẬT" />
        
        <ProductGrid
          products={featuredProducts}
          onSelectProduct={onSelectProduct}
        />

        {/* View all products button (matching visual reference) */}
        <div className="mt-10 text-center">
          <button
            onClick={() => onNavigate('products')}
            className="group inline-flex items-center gap-2.5 px-8 py-3 rounded-full border border-[#9E211D] text-[#9E211D] text-xs sm:text-sm font-semibold tracking-wider hover:bg-[#9E211D] hover:text-white transition-all duration-300 shadow-xs cursor-pointer"
          >
            <span>XEM TẤT CẢ SẢN PHẨM</span>
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </section>

      {/* 4. GIỚI THIỆU GIAO THỜI (Banner matching visual reference) */}
      <IntroBanner onLearnMore={() => onNavigate('about')} />

      {/* 5. BỘ SƯU TẬP */}
      <CollectionSection
        onSelectCollection={cat => {
          setSelectedCategory(cat);
          onNavigate('products');
        }}
      />

      {/* 6. CÂU CHUYỆN VĂN HÓA */}
      <CultureStorySection />

      {/* 7. GIÁ TRỊ THƯƠNG HIỆU */}
      <BrandValues />

      {/* 8. ĐĂNG KÝ NHẬN TIN */}
      <Newsletter />

    </div>
  );
};
