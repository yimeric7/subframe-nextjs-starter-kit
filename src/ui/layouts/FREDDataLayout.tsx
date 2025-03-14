'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as SubframeCore from "@subframe/core";

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
    <div className="flex h-full flex-col">
      {/* Top bar with navigation */}
      <div className="flex h-16 items-center justify-between border-b border-neutral-200 px-6">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <SubframeCore.Icon 
              name="FeatherBarChart2" 
              className="text-heading-3 font-heading-3 text-brand-600" 
            />
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
                {category.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <button className="rounded-md border border-neutral-300 px-4 py-2 text-body font-body text-neutral-700 hover:bg-neutral-50">
            Log in
          </button>
          <button className="rounded-md bg-brand-600 px-4 py-2 text-body font-body text-white hover:bg-brand-700">
            Sign up
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
          {children}
        </div>
      </div>
      
      {/* Footer */}
      <footer className="mt-12 border-t border-neutral-200 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <Link href="/" className="flex items-center gap-2">
              <SubframeCore.Icon 
                name="FeatherBarChart2" 
                className="text-heading-3 font-heading-3 text-brand-600" 
              />
              <span className="text-heading-3 font-heading-3 text-default-font">FRED Data Analytics</span>
            </Link>
            <a 
              href="https://x.com/thezenlin" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-neutral-600 hover:text-brand-600 transition-colors"
            >
              <SubframeCore.Icon name="FeatherTwitter" />
              <span>@thezenlin</span>
            </a>
            <p className="text-sm text-neutral-500 mt-4">
              This is just a project for fun, don't take seriously
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
} 