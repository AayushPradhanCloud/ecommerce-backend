import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { ShoppingBagIcon, TagIcon } from '@heroicons/react/24/outline';
import { authStore } from '../../store/authStore';

const navigation = {
  admin: [
    { name: 'Products', href: '/admin', icon: ShoppingBagIcon },
    { name: 'Categories', href: '/admin/categories', icon: TagIcon },
  ],
  staff: [
    { name: 'Products', href: '/staff', icon: ShoppingBagIcon },
    { name: 'Categories', href: '/staff/categories', icon: TagIcon },
  ],
};

export const DashboardLayout: React.FC = () => {
  const { user } = authStore();
  const location = useLocation();
  const userRole = user?.role || 'customer';
  const userNav = navigation[userRole as keyof typeof navigation] || [];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-md min-h-screen">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900">
              {userRole === 'admin' ? 'Admin' : 'Staff'} Dashboard
            </h1>
          </div>
          <nav className="mt-6">
            {userNav.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-100 text-blue-700 border-r-4 border-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};