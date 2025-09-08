import { useQuery } from '@tanstack/react-query';
import { Category } from './types';
// Mock categories data
export const mockCategories = [
    {
        id: 1,
        name: 'Men',
        slug: 'men',
        description: 'Clothing for men'
    },
    {
        id: 2,
        name: 'Women',
        slug: 'women',
        description: 'Clothing for women'
    },
    {
        id: 3,
        name: 'Shoes',
        slug: 'shoes',
        description: 'Footwear for all'
    },
    {
        id: 4,
        name: 'Accessories',
        slug: 'accessories',
        description: 'Fashion accessories'
    },
    {
        id: 5,
        name: 'Kids',
        slug: 'kids',
        description: 'Clothing for kids'
    }
];
export const categoryApi = {
    getCategories: async () => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300));
        return mockCategories;
    },
    getCategory: async (id) => {
        await new Promise(resolve => setTimeout(resolve, 200));
        return mockCategories.find(category => category.id === id) || null;
    },
    getCategoryBySlug: async (slug) => {
        await new Promise(resolve => setTimeout(resolve, 200));
        return mockCategories.find(category => category.slug === slug) || null;
    },
};
// React Query hooks
export const useCategories = () => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: () => categoryApi.getCategories(),
    });
};
export const useCategory = (id) => {
    return useQuery({
        queryKey: ['category', id],
        queryFn: () => categoryApi.getCategory(id),
        enabled: !!id,
    });
};
export const useCategoryBySlug = (slug) => {
    return useQuery({
        queryKey: ['category', slug],
        queryFn: () => categoryApi.getCategoryBySlug(slug),
        enabled: !!slug,
    });
};
//# sourceMappingURL=api.js.map