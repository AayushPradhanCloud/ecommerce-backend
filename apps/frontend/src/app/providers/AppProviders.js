import { jsx as _jsx } from "react/jsx-runtime";
import { QueryClientProvider } from './QueryClientProvider';
import { RouterProvider } from './RouterProvider';
import { ReactNode } from 'react';
export const AppProviders = ({ children }) => {
    return (_jsx(QueryClientProvider, { children: _jsx(RouterProvider, { children: children }) }));
};
//# sourceMappingURL=AppProviders.js.map