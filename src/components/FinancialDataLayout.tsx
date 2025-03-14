import Navigation from './Navigation';
import { IconWithBackground } from '../ui/components/IconWithBackground';

export default function FinancialDataLayout({
  children,
  title,
  description,
}: {
  children: React.ReactNode;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 text-center">
        <div className="flex justify-center mb-4">
          <IconWithBackground
            icon="FeatherBarChart2"
            size="large"
            variant="neutral"
          />
        </div>
        <h1 className="text-heading-1 text-brand-600 mb-2">FRED Data Analytics</h1>
        <p className="text-body text-neutral-500">
          Explore and analyze Federal Reserve Economic Data with powerful visualization tools
        </p>
      </div>
      
      <div className="mb-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <span className="text-neutral-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </span>
          </div>
          <input
            type="search"
            className="block w-full p-3 pl-10 text-body border border-neutral-200 rounded-md bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent"
            placeholder="Search economic indicators..."
          />
        </div>
      </div>
      
      <Navigation />
      
      <div className="mt-8">
        <h2 className="text-heading-2 text-brand-800 mb-1">{title}</h2>
        {description && <p className="text-body text-neutral-500 mb-6">{description}</p>}
        {children}
      </div>
    </div>
  );
} 