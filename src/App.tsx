import React, { useState } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ZaloChat } from './components/ZaloChat';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { AccountModal } from './components/AccountModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { CollectionsPage } from './pages/CollectionsPage';
import { CulturePage } from './pages/CulturePage';
import { AboutPage } from './pages/AboutPage';
import { Product, Order } from './types';
import { CheckCircle2 } from 'lucide-react';

const AppContent: React.FC = () => {
  const { toast, addToCart, setIsCartOpen } = useShop();

  // Navigation
  const [currentView, setCurrentView] = useState<string>('home');

  // Modals
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  const handleNavigate = (view: string) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleBuyNow = (product: Product, quantity: number) => {
    addToCart(product, quantity);
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = (order: Order) => {
    setIsCheckoutOpen(false);
    setCompletedOrder(order);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#252525] relative">
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-[#1C1B1A] text-white rounded-2xl shadow-2xl border border-[#3A352F] animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 size={18} className="text-[#9E211D]" />
          <span className="text-xs sm:text-sm font-medium">{toast}</span>
        </div>
      )}

      {/* Global Header */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentView === 'products' && (
          <ProductsPage
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentView === 'collections' && (
          <CollectionsPage
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'culture' && (
          <CulturePage
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'about' && (
          <AboutPage />
        )}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Global Floating Zalo Chat */}
      <ZaloChat />

      {/* Cart Slide-over Drawer */}
      <CartDrawer
        onCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* Search Modal */}
      <SearchModal
        onSelectProduct={handleSelectProduct}
      />

      {/* Account Modal */}
      <AccountModal />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onBuyNow={handleBuyNow}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Order Success Modal */}
      <OrderSuccessModal
        order={completedOrder}
        onClose={() => setCompletedOrder(null)}
        onContinueShopping={() => {
          setCompletedOrder(null);
          handleNavigate('products');
        }}
      />

    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}
