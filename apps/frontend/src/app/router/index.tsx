import { createBrowserRouter } from "react-router-dom";
import HomePage from "../../pages/home";
import ProductsPage from "../../pages/products";
import LoginPage from "../../pages/auth/LoginPage";
import CasdoorCallback from "../../pages/auth/CasdoorCallback";

export const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/products", element: <ProductsPage /> },
  { path: "/login", element: <LoginPage /> },             
  { path: "/auth/callback", element: <CasdoorCallback /> },
]);
