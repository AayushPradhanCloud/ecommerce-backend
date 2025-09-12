import { useQuery } from "@tanstack/react-query";
import { productApi } from "./api";

export function useProducts() {
    return useQuery({
        queryKey: ["products"],
        queryFn: () => productApi.getAll(),
        staleTime: 1000 * 60,
    });
}

export function useProduct(id: string) {
    return useQuery({
        queryKey: ["product", id],
        queryFn: () => productApi.getById(id),
        enabled: !!id,
        staleTime: 1000 * 60,
    });
}
