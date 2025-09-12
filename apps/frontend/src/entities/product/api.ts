
import { api } from "../../shared/lib/axios";
import type { Product } from "./types";

export const productApi = {
    async getAll(): Promise<Product[]> {
        const res = await api.get<Product[]>("/products");
        return res.data;
    },

    async getById(id: string): Promise<Product> {
        const res = await api.get<Product>(`/products/${id}`);
        return res.data;
    },
};
