import { Routes, Route } from 'react-router-dom'
import { Home } from '@/pages/Home'
import { Categories } from '@/pages/Categories'
import { Login } from '@/pages/Auth/Login'
import { Register } from '@/pages/Auth/Register'
import { AdminDashboard } from '@/pages/Dashboard/Admin'
import { StaffDashboard } from '@/pages/Dashboard/Staff'
import { CustomerDashboard } from '@/pages/Dashboard/Customer'
import { Products } from '@/pages/Products'
import { ProductDetail } from '@/pages/Products/ProductDetail'
import { Cart } from '@/pages/Cart'
import { Checkout } from '@/pages/Checkout'
import { ProtectedRoute } from './ProtectedRoute'
import { UserRole } from '@/entities/user/types'

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/cart" element={<Cart />} />
      
      {/* Protected routes */}
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/staff/*"
        element={
          <ProtectedRoute allowedRoles={[UserRole.STAFF]}>
            <StaffDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/customer/*"
        element={
          <ProtectedRoute allowedRoles={[UserRole.CUSTOMER]}>
            <CustomerDashboard />
          </ProtectedRoute>
        }
      />
      
      {/* 404 page */}
      <Route path="*" element={<div>Page not found</div>} />
    </Routes>
  )
}