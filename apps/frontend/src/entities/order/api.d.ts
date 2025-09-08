import { Order, OrderStatus } from './types';
export declare const orderApi: {
    getOrders: (userId?: number) => Promise<Order[]>;
    getOrder: (id: number) => Promise<Order | null>;
    createOrder: (order: Omit<Order, "id" | "createdAt">) => Promise<Order>;
    updateOrderStatus: (id: number, status: OrderStatus) => Promise<Order>;
    deleteOrder: (id: number) => Promise<void>;
};
export declare const useOrders: (userId?: number) => import("@tanstack/react-query").UseQueryResult<Order[], Error>;
export declare const useOrder: (id: number) => import("@tanstack/react-query").UseQueryResult<Order | null, Error>;
//# sourceMappingURL=api.d.ts.map