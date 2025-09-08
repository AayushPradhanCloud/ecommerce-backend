import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AppProviders } from '@/app/providers/AppProviders';
import { AppRoutes } from '@/app/router/routes';
import { Navbar } from '@/widgets/Navbar';
import { Footer } from '@/widgets/Footer';
function App() {
    return (_jsx(AppProviders, { children: _jsxs("div", { className: "min-h-screen flex flex-col", children: [_jsx(Navbar, {}), _jsx("main", { className: "flex-grow", children: _jsx(AppRoutes, {}) }), _jsx(Footer, {})] }) }));
}
export default App;
//# sourceMappingURL=App.js.map