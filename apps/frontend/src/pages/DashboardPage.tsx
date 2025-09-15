import React from 'react';
import { useAuthStore } from '../store/authStore';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import { useOrders } from '../hooks/useOrders';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/ui/Button';
import { ShoppingBagIcon, TagIcon, UserIcon } from '@heroicons/react/24/outline';

export const DashboardPage: React.FC = () => {
  const { user } = useAuthStore();
  const { data: productsData } = useProducts({ limit: 4 });
  const { data: categoriesData } = useCategories();
  const { data: ordersData } = useOrders();

  const userRole = user?.role || 'customer';
  const isAdmin = userRole === 'admin';
  const isStaff = userRole === 'staff' || isAdmin;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {isAdmin ? 'Admin Dashboard' : isStaff ? 'Staff Dashboard' : 'My Dashboard'}
            </h1>
            <p className="text-gray-600 mt-2">Welcome back, {user?.email}</p>
          </div>
          <div className="flex items-center space-x-2 bg-blue-100 px-4 py-2 rounded-lg">
            <UserIcon className="h-5 w-5 text-blue-600" />
            <span className="text-blue-600 font-medium capitalize">{userRole}</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center">
              <ShoppingBagIcon className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h3 className="text-lg font-semibold text-blue-800">Total Products</h3>
                <p className="text-2xl font-bold text-blue-600">{productsData?.data.data.length || 0}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center">
              <TagIcon className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <h3 className="text-lg font-semibold text-green-800">Total Categories</h3>
                <p className="text-2xl font-bold text-green-600">{categoriesData?.data.length || 0}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center">
              <ShoppingBagIcon className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <h3 className="text-lg font-semibold text-purple-800">Total Orders</h3>
                <p className="text-2xl font-bold text-purple-600">{ordersData?.data.length || 0}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions for Admin/Staff */}
        {(isAdmin || isStaff) && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="flex space-x-4">
              <Button variant="outline">Manage Products</Button>
              <Button variant="outline">Manage Categories</Button>
              <Button variant="outline">View Orders</Button>
            </div>
          </div>
        )}

        {/* Recent Products */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Recent Products</h2>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {productsData?.data.data.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {(!productsData || productsData.data.data.length === 0) && (
            <div className="text-center py-8 text-gray-500">
              No products available
            </div>
          )}
        </div>

        {/* Recent Orders for Customers */}
        {userRole === 'customer' && ordersData && ordersData.data.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Orders</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              {ordersData.data.slice(0, 3).map((order) => (
                <div key={order.id} className="flex justify-between items-center py-3 border-b border-gray-200">
                  <div>
                    <p className="font-medium">Order #{order.id}</p>
                    <p className="text-sm text-gray-600">${order.totalPrice} • {order.status}</p>
                  </div>
                  <Button variant="outline" size="sm">View Details</Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};