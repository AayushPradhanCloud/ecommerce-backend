import { Category, ApiResponse } from '../types';
import { apiClient } from './client';

export const categoriesApi = {
  getAll: (): Promise<ApiResponse<Category[]>> =>
    apiClient.get('/categories'),
  
  getBySlug: (slug: string): Promise<ApiResponse<Category>> =>
    apiClient.get(`/categories/${slug}`),
  
  create: (category: Omit<Category, 'id'>): Promise<ApiResponse<Category>> =>
    apiClient.post('/categories', category),
  
  update: (id: number, category: Partial<Category>): Promise<ApiResponse<Category>> =>
    apiClient.put(`/categories/${id}`, category),
  
  delete: (id: number): Promise<ApiResponse<void>> =>
    apiClient.delete(`/categories/${id}`),
};