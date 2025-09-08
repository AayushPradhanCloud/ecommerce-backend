import { Product } from '@/entities/product/types';
export interface CartItem {
    product: Product;
    quantity: number;
}
interface CartState {
    items: CartItem[];
    addItem: (product: Product, quantity?: number) => void;
    removeItem: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
    getTotalPrice: () => number;
    getTotalItems: () => number;
}
export declare const useCartStore: import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<CartState>, "setState" | "persist"> & {
    setState(partial: CartState | Partial<CartState> | ((state: CartState) => CartState | Partial<CartState>), replace?: false | undefined): unknown;
    setState(state: CartState | ((state: CartState) => CartState), replace: true): unknown;
    persist: {
        setOptions: (options: Partial<import("zustand/middleware").PersistOptions<CartState, CartState, unknown>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: CartState) => void) => () => void;
        onFinishHydration: (fn: (state: CartState) => void) => () => void;
        getOptions: () => Partial<import("zustand/middleware").PersistOptions<CartState, CartState, unknown>>;
    };
}>;
export {};
//# sourceMappingURL=cartStore.d.ts.map