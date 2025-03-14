'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import classNames from 'classnames';

const categories = [
  { name: 'Popular Indicators', href: '/' },
  { name: 'Monetary Policy', href: '/monetary-policy' },
  { name: 'Economic Growth', href: '/economic-growth' },
  { name: 'Employment', href: '/employment' },
];

export default function Navigation() {
  const pathname = usePathname();
  
  return (
    <nav className="border-b border-neutral-200">
      <div className="flex space-x-8">
        {categories.map((category) => {
          const isActive = 
            (category.href === '/' && pathname === '/') || 
            (category.href !== '/' && pathname.startsWith(category.href));
            
          return (
            <Link
              key={category.name}
              href={category.href}
              className={classNames(
                'py-4 text-body-bold border-b-2 transition-colors',
                {
                  'border-brand-600 text-brand-600': isActive,
                  'border-transparent text-neutral-500 hover:text-neutral-700': !isActive,
                }
              )}
            >
              {category.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
} 