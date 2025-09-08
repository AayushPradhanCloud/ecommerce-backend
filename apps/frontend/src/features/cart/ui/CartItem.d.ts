interface CartItemProps {
    item: {
        product: {
            id: number;
            name: string;
            price: number;
            image?: string;
        };
        quantity: number;
    };
}
export declare const CartItem: ({ item }: CartItemProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=CartItem.d.ts.map