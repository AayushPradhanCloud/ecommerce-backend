import { createBrowserRouter } from "react-router-dom";
import HomePage from "../../pages/home";
import ProductsPage from "../../pages/products";

export const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/products", element: <ProductsPage /> },
]);
