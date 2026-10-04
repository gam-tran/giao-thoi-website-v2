import React, { useState, useEffect } from 'react';
import { Search, User, ShoppingBag, Menu, X } from 'lucide-react';
import { GiaoThoiEmblem } from './common/Logo';
import { useShop } from '../context/ShopContext';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onNavigate }) => {
  const { cartCount, setIsCartOpen, setIsSearchOpen, setIsAccountOpen } = useShop();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinksLeft = [
    { id: 'home', label: 'TRANG CHỦ' },
    { id: 'products', label: 'SẢN PHẨM' },
    { id: 'collections', label: 'BỘ SƯU TẬP' },
  ];

  const navLinksRight = [
    { id: 'culture', label: 'CÂU CHUYỆN VĂN HÓA' },
    { id: 'about', label: 'VỀ CHÚNG TÔI' },
  ];

  return (
    <header className="sticky top-3 z-50 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-all duration-300">
      <div
        className={`relative flex items-center justify-between px-5 py-3 sm:py-3.5 bg-[#1C1B1A] text-[#F5F2EB] rounded-2xl sm:rounded-full border border-[#2D2A26] transition-shadow duration-300 ${
          isScrolled ? 'shadow-xl shadow-black/25 bg-[#171615]/95 backdrop-blur-md' : 'shadow-md shadow-black/15'
        }`}
      >
        {/* Mobile Left: Menu Toggle */}
        <div className="flex items-center lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 -ml-2 text-[#E2DACB] hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Center Logo */}
        <div
          onClick={() => {
            onNavigate('home');
            setMobileMenuOpen(false);
          }}
          className="flex lg:hidden items-center gap-2 cursor-pointer"
        >
          <GiaoThoiEmblem size={34} />
          <span className="font-editorial text-sm font-bold tracking-[0.15em] text-white">GIAO THỜI</span>
        </div>

        {/* Desktop Left Navigation */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold tracking-[0.14em]">
          {navLinksLeft.map(link => {
            const isActive = currentView === link.id;
            return (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`relative py-1 transition-colors hover:text-white ${
                  isActive ? 'text-white' : 'text-[#BFB5A5]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#9E211D] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Desktop Center Brand Emblem */}
        <div
          onClick={() => onNavigate('home')}
          className="hidden lg:flex items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-105"
          title="Giao Thời - Trang chủ"
        >
          <div className="p-1 rounded-full bg-[#1C1B1A] ring-2 ring-[#2E2B27]">
            <GiaoThoiEmblem size={46} />
          </div>
        </div>

        {/* Desktop Right Navigation */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold tracking-[0.14em]">
          {navLinksRight.map(link => {
            const isActive = currentView === link.id;
            return (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`relative py-1 transition-colors hover:text-white ${
                  isActive ? 'text-white' : 'text-[#BFB5A5]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#9E211D] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Action Icons (Desktop & Mobile) */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Search Button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 text-[#D2C8B8] hover:text-white transition-colors cursor-pointer"
            aria-label="Tìm kiếm sản phẩm"
            title="Tìm kiếm"
          >
            <Search size={19} />
          </button>

          {/* Account Button */}
          <button
            onClick={() => setIsAccountOpen(true)}
            className="p-2 text-[#D2C8B8] hover:text-white transition-colors cursor-pointer"
            aria-label="Tài khoản khách hàng"
            title="Tài khoản"
          >
            <User size={19} />
          </button>

          {/* Cart Button with Numeric Badge */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-[#D2C8B8] hover:text-white transition-colors cursor-pointer"
            aria-label="Giỏ hàng"
            title="Giỏ hàng"
          >
            <ShoppingBag size={20} />
            <span
              className={`absolute top-0.5 right-0.5 min-w-[18px] h-[18px] px-1 flex items-center justify-center text-[10px] font-bold text-white bg-[#9E211D] rounded-full ring-2 ring-[#1C1B1A] transition-transform ${
                cartCount > 0 ? 'scale-100' : 'scale-90'
              }`}
            >
              {cartCount}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 p-5 bg-[#1C1B1A] text-[#F5F2EB] rounded-2xl border border-[#2D2A26] shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-3 font-semibold text-xs tracking-[0.12em]">
            {[...navLinksLeft, ...navLinksRight].map(link => {
              const isActive = currentView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    onNavigate(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-between py-2.5 px-3 rounded-lg text-left transition-colors ${
                    isActive
                      ? 'bg-[#9E211D] text-white'
                      : 'text-[#D2C8B8] hover:bg-[#282624] hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
