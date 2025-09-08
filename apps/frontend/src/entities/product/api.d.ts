import { Product, ProductFilters } from './types';
export declare const productApi: {
    getProducts: (filters?: ProductFilters) => Promise<Product[]>;
    getProduct: (id: number) => Promise<Product | null>;
    getFeaturedProducts: () => Promise<Product[]>;
};
export declare const useProducts: (filters?: ProductFilters) => import("@tanstack/react-query").UseQueryResult<Product[], Error>;
export declare const useProduct: (id: number) => import("@tanstack/react-query").UseQueryResult<Product | null, Error>;
export declare const useFeaturedProducts: () => import("@tanstack/react-query").UseQueryResult<Product[], Error>;
//# sourceMappingURL=api.d.ts.map