import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ShoppingCart, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Product } from '../types';
import { formatPrice } from '../data/products';

interface SearchModalProps {
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ onSelectProduct }) => {
  const { isSearchOpen, setIsSearchOpen, products, addToCart } = useShop();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  // Search case-insensitive by name or category, ignoring accents if possible
  const normalize = (str: string) =>
    str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

  const filtered = query.trim()
    ? products.filter(p => {
        const qNorm = normalize(query);
        const nameNorm = normalize(p.name);
        const catNorm = normalize(p.category);
        return nameNorm.includes(qNorm) || catNorm.includes(qNorm);
      })
    : [];

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-start justify-center p-4 sm:p-8 animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-[#FAF8F5] rounded-3xl border border-[#E7DECE] shadow-2xl overflow-hidden mt-12 sm:mt-16 flex flex-col">
        
        {/* Search Input Bar */}
        <div className="p-4 sm:p-6 bg-white border-b border-[#E8DFC9] flex items-center gap-3">
          <Search size={22} className="text-[#9E211D] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Tìm kiếm sản phẩm (ví dụ: trâm, sen, quạt, tranh...)"
            className="w-full bg-transparent text-sm sm:text-base text-[#1C1B1A] placeholder:text-[#9E9485] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#9E9485] hover:text-[#1C1B1A] p-1"
            >
              <X size={16} />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[#EFE9DC] text-[#4A4238] hover:bg-[#E5DEC9] transition-colors"
          >
            Đóng
          </button>
        </div>

        {/* Results Body */}
        <div className="p-5 sm:p-6 max-h-[60vh] overflow-y-auto">
          {!query.trim() ? (
            <div className="text-center py-8 text-[#8C8071]">
              <p className="text-xs sm:text-sm font-serif italic">
                Nhập từ khóa tìm kiếm để khám phá các sản phẩm thủ công mỹ nghệ Giao Thời
              </p>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {['Trâm', 'Kiềng sen', 'Quạt trúc chỉ', 'Đèn long phụng', 'Đông Hồ'].map(k => (
                  <button
                    key={k}
                    onClick={() => setQuery(k)}
                    className="px-3 py-1 rounded-full text-xs bg-white border border-[#E4DDD0] hover:border-[#9E211D] hover:text-[#9E211D] transition-colors"
                  >
                    {k}
                  </button>
                ))}
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-10 text-[#8C8071]">
              <p className="font-editorial text-base text-[#3A332B]">
                Không tìm thấy sản phẩm nào cho "{query}"
              </p>
              <p className="text-xs text-[#8C8071] mt-1">
                Hãy thử tìm kiếm với từ khóa khác như "trâm", "quạt", hoặc "trang sức".
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <span className="text-[11px] font-semibold tracking-wider text-[#8A7D6E] uppercase block mb-1">
                Tìm thấy {filtered.length} kết quả:
              </span>

              {filtered.map(product => (
                <div
                  key={product.id}
                  onClick={() => {
                    setIsSearchOpen(false);
                    onSelectProduct(product);
                  }}
                  className="flex items-center justify-between p-3 bg-white rounded-xl border border-[#ECE5D8] hover:border-[#9E211D]/40 hover:shadow-sm transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3.5">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover bg-[#F7F2E8] shrink-0"
                    />
                    <div>
                      <h4 className="font-editorial text-xs sm:text-sm font-semibold text-[#1C1B1A] group-hover:text-[#9E211D] transition-colors">
                        {product.name}
                      </h4>
                      <div className="flex items-center gap-2 text-[11px] text-[#7E7364] mt-0.5">
                        <span>{product.category}</span>
                        <span>·</span>
                        <span className="font-bold text-[#9E211D] tabular-nums">
                          {formatPrice(product.price)}
                        </span>
                        <span>·</span>
                        <span>{product.stock > 0 ? `Còn ${product.stock}` : 'Hết hàng'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {product.stock > 0 && (
                      <button
                        onClick={e => handleQuickAdd(e, product)}
                        className="p-2 rounded-full bg-[#9E211D]/10 text-[#9E211D] hover:bg-[#9E211D] hover:text-white transition-colors"
                        title="Thêm vào giỏ"
                      >
                        <ShoppingCart size={15} />
                      </button>
                    )}
                    <ArrowRight size={15} className="text-[#BFB4A4] group-hover:text-[#1C1B1A] transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
