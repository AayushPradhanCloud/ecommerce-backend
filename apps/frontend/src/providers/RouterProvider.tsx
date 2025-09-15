]import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppLayout } from '../components/AppLayout';
// import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { ProductDetailPage } from '../pages/ProductDetailPage';
import { CategoriesPage } from '../pages/CategoriesPage';
import { DashboardPage } from '../pages/DashboardPage';
import { ProtectedRoute } from '../components/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      // {
      //   index: true,
      //   element: <HomePage />,
      // },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'products',
        element: <ProductsPage />,
      },
      {
        path: 'products/:slug',
        element: <ProductDetailPage />,
      },
      {
        path: 'categories',
        element: <CategoriesPage />,
      },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};