import { Category } from './types';
export declare const mockCategories: Category[];
export declare const categoryApi: {
    getCategories: () => Promise<Category[]>;
    getCategory: (id: number) => Promise<Category | null>;
    getCategoryBySlug: (slug: string) => Promise<Category | null>;
};
export declare const useCategories: () => import("@tanstack/react-query").UseQueryResult<Category[], Error>;
export declare const useCategory: (id: number) => import("@tanstack/react-query").UseQueryResult<Category | null, Error>;
export declare const useCategoryBySlug: (slug: string) => import("@tanstack/react-query").UseQueryResult<Category | null, Error>;
//# sourceMappingURL=api.d.ts.map