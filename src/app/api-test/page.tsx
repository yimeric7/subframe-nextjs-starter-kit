'use client';

import { useState, useEffect } from 'react';
import { getSeriesObservations, FRED_SERIES } from '../../lib/fredApi';
import * as SubframeCore from '@subframe/core';

export default function ApiTest() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTestData() {
      try {
        setLoading(true);
        const observations = await getSeriesObservations(FRED_SERIES.CPIAUCSL, {
          limit: 5,
          sortOrder: 'desc'
        });
        
        setData(observations);
        setError(null);
      } catch (err) {
        console.error('Error fetching test data:', err);
        setError('Failed to fetch data. See console for details.');
        setData(null);
      } finally {
        setLoading(false);
      }
    }

    fetchTestData();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-heading-1 font-heading-1 mb-4">API Test Page</h1>
      <p className="text-body mb-6">
        This page tests if the FRED API proxy is working correctly.
      </p>

      <div className="p-4 border border-neutral-200 rounded-lg">
        <h2 className="text-heading-3 font-heading-3 mb-2">Test Results</h2>
        
        {loading ? (
          <div className="flex items-center gap-2 text-neutral-500">
            <SubframeCore.Icon name="FeatherLoader" className="animate-spin" />
            <span>Loading data...</span>
          </div>
        ) : error ? (
          <div className="p-4 bg-error-50 text-error-600 rounded-md">
            <div className="flex items-center gap-2 mb-2">
              <SubframeCore.Icon name="FeatherAlertTriangle" />
              <span className="font-semibold">Error</span>
            </div>
            <p>{error}</p>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-4 text-success-600">
              <SubframeCore.Icon name="FeatherCheckCircle" />
              <span className="font-semibold">Success! API is working correctly</span>
            </div>
            
            <div>
              <h3 className="text-heading-4 font-heading-4 mb-2">CPI Data (Sample):</h3>
              <pre className="bg-neutral-50 p-4 rounded-md overflow-auto max-h-96 text-sm">
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6">
        <h2 className="text-heading-3 font-heading-3 mb-2">Debugging Steps</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Check that the API proxy route is correctly defined in <code className="bg-neutral-50 px-1 py-0.5 rounded">src/app/api/fred/route.ts</code></li>
          <li>Verify that the FRED API client (<code className="bg-neutral-50 px-1 py-0.5 rounded">src/lib/fredApi.ts</code>) is using the proxy</li>
          <li>Check the browser console for any CORS or network errors</li>
          <li>If changes were made, try refreshing the page or restarting the development server</li>
        </ul>
      </div>
    </div>
  );
} 