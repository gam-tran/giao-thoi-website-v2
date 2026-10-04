import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, OrderCustomerInfo, PaymentMethod, UserAccount } from '../types';
import { INITIAL_PRODUCTS } from '../data/products';

interface ShopContextType {
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  user: UserAccount | null;
  isCartOpen: boolean;
  isSearchOpen: boolean;
  isAccountOpen: boolean;
  searchQuery: string;
  selectedCategory: string;
  toast: string | null;
  addToCart: (product: Product, quantity?: number) => boolean;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  createOrder: (customerInfo: OrderCustomerInfo, paymentMethod: PaymentMethod) => Order;
  setIsCartOpen: (open: boolean) => void;
  setIsSearchOpen: (open: boolean) => void;
  setIsAccountOpen: (open: boolean) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  showToast: (message: string) => void;
  updateUser: (user: UserAccount) => void;
  getProductById: (id: string) => Product | undefined;
  cartTotal: number;
  cartCount: number;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CART: 'giaothoi_cart_v1',
  PRODUCTS_STOCK: 'giaothoi_stock_v1',
  ORDERS: 'giaothoi_orders_v1',
  USER: 'giaothoi_user_v1',
};

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load products with persisted stock
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const savedStock = localStorage.getItem(STORAGE_KEYS.PRODUCTS_STOCK);
      if (savedStock) {
        const stockMap: Record<string, number> = JSON.parse(savedStock);
        return INITIAL_PRODUCTS.map(p => ({
          ...p,
          stock: stockMap[p.id] !== undefined ? stockMap[p.id] : p.stock,
        }));
      }
    } catch {
      // fallback
    }
    return INITIAL_PRODUCTS;
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem(STORAGE_KEYS.CART);
      if (savedCart) {
        const parsed: CartItem[] = JSON.parse(savedCart);
        return parsed.map(item => ({
          ...item,
          product: {
            ...item.product,
            image: item.product.image.replace(/^\/src\/assets\/images\//, '/images/'),
          },
        }));
      }
    } catch {
      // fallback
    }
    return [];
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const savedOrders = localStorage.getItem(STORAGE_KEYS.ORDERS);
      if (savedOrders) {
        const parsed: Order[] = JSON.parse(savedOrders);
        return parsed.map(order => ({
          ...order,
          items: order.items.map(item => ({
            ...item,
            product: {
              ...item.product,
              image: item.product.image.replace(/^\/src\/assets\/images\//, '/images/'),
            },
          })),
        }));
      }
    } catch {
      // fallback
    }
    return [];
  });

  // User
  const [user, setUser] = useState<UserAccount | null>(() => {
    try {
      const savedUser = localStorage.getItem(STORAGE_KEYS.USER);
      if (savedUser) return JSON.parse(savedUser);
    } catch {
      // fallback
    }
    return {
      name: 'Nguyễn Văn An',
      email: 'khachhang@giaothoi.vn',
      phone: '0912 345 678',
      address: 'Số 18 Phố Tràng Tiền, Hoàn Kiếm, Hà Nội',
    };
  });

  // UI state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');
  const [toast, setToast] = useState<string | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  // Sync orders to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  // Sync stock to localStorage
  useEffect(() => {
    const stockMap: Record<string, number> = {};
    products.forEach(p => {
      stockMap[p.id] = p.stock;
    });
    localStorage.setItem(STORAGE_KEYS.PRODUCTS_STOCK, JSON.stringify(stockMap));
  }, [products]);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => {
      setToast(prev => (prev === message ? null : prev));
    }, 3200);
  };

  const getProductById = (id: string) => {
    return products.find(p => p.id === id);
  };

  const addToCart = (product: Product, quantity = 1): boolean => {
    const currentProduct = products.find(p => p.id === product.id);
    if (!currentProduct || currentProduct.stock <= 0) {
      showToast('Sản phẩm đã hết hàng!');
      return false;
    }

    const existingIndex = cart.findIndex(item => item.product.id === product.id);
    const currentInCart = existingIndex >= 0 ? cart[existingIndex].quantity : 0;

    if (currentInCart + quantity > currentProduct.stock) {
      showToast(`Chỉ còn ${currentProduct.stock} sản phẩm trong kho!`);
      return false;
    }

    if (existingIndex >= 0) {
      const updated = [...cart];
      updated[existingIndex].quantity += quantity;
      setCart(updated);
    } else {
      setCart([...cart, { product: currentProduct, quantity }]);
    }

    showToast(`Đã thêm "${product.name}" vào giỏ hàng`);
    return true;
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    const currentProduct = products.find(p => p.id === productId);
    if (!currentProduct) return;

    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    if (quantity > currentProduct.stock) {
      showToast(`Kho chỉ còn ${currentProduct.stock} sản phẩm!`);
      quantity = currentProduct.stock;
    }

    setCart(cart.map(item => (item.product.id === productId ? { ...item, quantity } : item)));
  };

  const clearCart = () => {
    setCart([]);
  };

  const createOrder = (customerInfo: OrderCustomerInfo, paymentMethod: PaymentMethod): Order => {
    const orderId = `GT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const totalAmount = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    const newOrder: Order = {
      id: orderId,
      items: [...cart],
      totalAmount,
      paymentMethod,
      customerInfo,
      createdAt: new Date().toISOString(),
      status: 'CONFIRMED',
    };

    // Decrement stock for ordered products
    setProducts(prevProducts =>
      prevProducts.map(product => {
        const cartItem = cart.find(item => item.product.id === product.id);
        if (cartItem) {
          const newStock = Math.max(0, product.stock - cartItem.quantity);
          return { ...product, stock: newStock };
        }
        return product;
      })
    );

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const updateUser = (updated: UserAccount) => {
    setUser(updated);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updated));
    showToast('Đã lưu thông tin tài khoản');
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        orders,
        user,
        isCartOpen,
        isSearchOpen,
        isAccountOpen,
        searchQuery,
        selectedCategory,
        toast,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        createOrder,
        setIsCartOpen,
        setIsSearchOpen,
        setIsAccountOpen,
        setSearchQuery,
        setSelectedCategory,
        showToast,
        updateUser,
        getProductById,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
