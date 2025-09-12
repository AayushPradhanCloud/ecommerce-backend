import { Product, ApiResponse, PaginatedResponse } from '../types';
import { apiClient } from './client';

export const productsApi = {
  getAll: (params?: {
    page?: number;
    limit?: number;
    category?: string;
  }): Promise<ApiResponse<PaginatedResponse<Product>>> =>
    apiClient.get('/products', { params }),
  
  getBySlug: (slug: string): Promise<ApiResponse<Product>> =>
    apiClient.get(`/products/${slug}`),
  
  getByCategory: (categoryId: number): Promise<ApiResponse<Product[]>> =>
    apiClient.get(`/products/category/${categoryId}`),
  
  search: (query: string): Promise<ApiResponse<Product[]>> =>
    apiClient.get('/products/search', { params: { q: query } }),
  
  create: (product: Omit<Product, 'id'>): Promise<ApiResponse<Product>> =>
    apiClient.post('/products', product),
  
  update: (id: number, product: Partial<Product>): Promise<ApiResponse<Product>> =>
    apiClient.put(`/products/${id}`, product),
  
  delete: (id: number): Promise<ApiResponse<void>> =>
    apiClient.delete(`/products/${id}`),
};