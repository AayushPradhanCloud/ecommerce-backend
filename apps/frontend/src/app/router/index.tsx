import { createBrowserRouter } from "react-router-dom";
import CasdoorCallback from "../../pages/auth/CasdoorCallback";
import LoginPage from "../../pages/auth/LoginPage";
import HomePage from "../../pages/home";
import ProductsPage from "../../pages/products";

export const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/products", element: <ProductsPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/auth/callback", element: <CasdoorCallback /> },
]);
