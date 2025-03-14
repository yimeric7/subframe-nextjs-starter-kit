'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as SubframeCore from "@subframe/core";
import { motion, AnimatePresence } from 'framer-motion';

interface FREDDataLayoutProps {
  children: React.ReactNode;
}

const categories = [
  { name: 'Popular Indicators', href: '/' },
  { name: 'Monetary Policy', href: '/monetary-policy' },
  { name: 'Economic Growth', href: '/economic-growth' },
  { name: 'Employment', href: '/employment' },
];

export default function FREDDataLayout({ children }: FREDDataLayoutProps) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top bar with navigation */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex h-16 items-center justify-between border-b border-neutral-200 px-6">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <motion.div 
              whileHover={{ rotate: [0, -10, 10, -5, 5, 0] }}
              transition={{ duration: 0.5 }}
            >
              <SubframeCore.Icon 
                name="FeatherBarChart2" 
                className="flex justify-center text-heading-3 font-heading-3 text-brand-600" 
              />
            </motion.div>
            <span className="text-heading-3 font-heading-3 text-default-font">FRED Data Analytics</span>
          </Link>
          <nav className="flex items-center gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className={`text-body font-body ${
                  pathname === category.href
                    ? 'text-brand-600'
                    : 'text-neutral-600 hover:text-brand-600'
                }`}
              >
                <motion.div
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {category.name}
                  {pathname === category.href && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="h-0.5 bg-brand-600 mt-0.5"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </motion.div>
              </Link>
            ))}
          </nav>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="flex-grow">
        <div className="mx-auto max-w-7xl px-4 pt-8 pb-16 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      
      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="border-t border-neutral-200 py-8 mt-auto">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <Link href="/" className="flex items-center gap-2">
              <motion.div 
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <SubframeCore.Icon 
                  name="FeatherBarChart2" 
                  className="flex justify-center text-heading-3 font-heading-3 text-brand-600" 
                />
              </motion.div>
              <span className="text-heading-3 font-heading-3 text-default-font">FRED Data Analytics</span>
            </Link>
            <motion.a 
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              href="https://x.com/thezenlin" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-neutral-600 hover:text-brand-600 transition-colors"
            >
              <SubframeCore.Icon name="FeatherTwitter" />
              <span>@thezenlin</span>
            </motion.a>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="text-sm text-neutral-500 mt-4"
            >
              This is just a project for fun, don't take seriously
            </motion.p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
} 