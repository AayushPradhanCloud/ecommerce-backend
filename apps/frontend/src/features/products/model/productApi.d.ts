import { Product, ProductFilters } from '@/entities/product/types';
export declare const useProducts: (filters?: ProductFilters) => import("@tanstack/react-query").UseQueryResult<Product[], Error>;
export declare const useProduct: (id: number) => import("@tanstack/react-query").UseQueryResult<Product | null, Error>;
export declare const useFeaturedProducts: () => import("@tanstack/react-query").UseQueryResult<Product[], Error>;
//# sourceMappingURL=productApi.d.ts.map