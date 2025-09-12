// User types
export interface User {
  id: number;
  email: string;
  role: 'admin' | 'staff' | 'customer';
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Category types
export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
}

// Product types
export interface Product {
  id: number;
  name: string;
  slug: string;
  description?: string;
  price: string;
  stock: number;
  categoryId: number;
  category?: Category;
  image?: string;
}

// Order types
export interface Order {
  id: number;
  userId: number;
  totalPrice: string;
  status: 'cart' | 'pending' | 'completed';
  createdAt: string;
  user?: User;
  items?: OrderItem[];
}

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: string;
  createdAt: string;
  product?: Product;
}

// API response types
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

// Form types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ProductFormData {
  name: string;
  slug: string;
  description: string;
  price: string;
  stock: number;
  categoryId: number;
}

export interface CategoryFormData {
  name: string;
  slug: string;
  description: string;
}