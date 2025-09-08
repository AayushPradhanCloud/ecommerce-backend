import { jsx as _jsx } from "react/jsx-runtime";
import { QueryClient, QueryClientProvider as Provider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';
export const QueryClientProvider = ({ children }) => {
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000,
            },
        },
    }));
    return _jsx(Provider, { client: queryClient, children: children });
};
//# sourceMappingURL=QueryClientProvider.js.map