export type ProductCategory = 'Trang sức' | 'Phụ kiện' | 'Đồ trang trí';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  stock: number;
  image: string;
  description: string;
  details?: {
    material: string;
    origin: string;
    dimensions?: string;
    culturalMeaning: string;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type PaymentMethod = 'COD' | 'ZALO';

export interface OrderCustomerInfo {
  fullName: string;
  phoneNumber: string;
  email: string;
  shippingAddress: string;
  notes?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  paymentMethod: PaymentMethod;
  customerInfo: OrderCustomerInfo;
  createdAt: string;
  status: 'PENDING' | 'CONFIRMED' | 'DELIVERED';
}

export interface UserAccount {
  name: string;
  email: string;
  phone: string;
  address: string;
}
