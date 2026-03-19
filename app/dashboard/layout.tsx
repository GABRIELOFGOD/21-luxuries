'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const navigationItems = [
  { name: 'Products', href: '/dashboard', icon: '📦' },
  { name: 'Add Product', href: '/dashboard/add', icon: '➕' },
  { name: 'Categories', href: '/dashboard/category', icon: '🏷️' },
  { name: 'Orders', href: '/dashboard/order', icon: '📋' },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-primary text-background transition-all duration-300 overflow-hidden`}
      >
        <div className="h-20 flex items-center justify-center border-b border-background/20">
          <motion.h1
            className={`text-2xl font-bold ${sidebarOpen ? 'block' : 'hidden'}`}
          >
            21 Luxuries
          </motion.h1>
          {!sidebarOpen && <span className="text-2xl">📦</span>}
        </div>

        <nav className="mt-8">
          {navigationItems.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={item.href}>
                  <div
                    className={`flex items-center space-x-4 px-6 py-4 transition-all duration-300 ${
                      isActive
                        ? 'bg-background/20 border-r-4 border-background'
                        : 'hover:bg-background/10'
                    }`}
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span
                      className={`font-semibold ${
                        sidebarOpen ? 'block' : 'hidden'
                      }`}
                    >
                      {item.name}
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </nav>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-primary hover:bg-gray-100 p-2 rounded-lg transition-colors"
          >
            {sidebarOpen ? '◀️' : '▶️'}
          </button>
          <div className="flex items-center space-x-4">
            <img
              src="/images/brand/21-luxuries logo.jpg"
              alt="Logo"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="text-sm font-semibold text-primary">Admin Panel</p>
              <p className="text-xs text-gray-500">Dashboard</p>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-8"
          >
            {children}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
