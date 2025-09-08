export type Role = 'admin' | 'staff' | 'customer';

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
  price: string;
  stock: number;
  categoryId: number;
}

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: string;
  createdAt?: string;
}

export interface Order {
  id: number;
  userId: number;
  totalPrice: string;
  status: 'cart' | 'pending' | 'completed';
  createdAt?: string;
  items?: OrderItem[];
}

export interface User {
  id: number;
  email: string;
  role: Role;
  name?: string;
}
