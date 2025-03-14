import { NextRequest, NextResponse } from 'next/server';

// Add Edge Runtime configuration for Cloudflare Pages
export const runtime = 'edge';

const FRED_API_KEY = '2b0a6b861eeaa2dee0bb6c5628dd822a';
const FRED_API_BASE_URL = 'https://api.stlouisfed.org/fred';

/**
 * Proxy API route for FRED data to avoid CORS issues and hide API key
 */
export async function GET(request: NextRequest) {
  try {
    // Get query parameters from the request
    const searchParams = request.nextUrl.searchParams;
    const endpoint = searchParams.get('endpoint');
    
    // Remove the endpoint parameter as we'll use it in the URL
    searchParams.delete('endpoint');
    // Add the API key
    searchParams.set('api_key', FRED_API_KEY);
    searchParams.set('file_type', 'json');
    
    // Construct the URL for the FRED API
    const url = `${FRED_API_BASE_URL}/${endpoint}?${searchParams.toString()}`;
    
    // Make the request to the FRED API
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error(`FRED API error: ${response.status} ${response.statusText}`);
      return NextResponse.json(
        { error: `Failed to fetch data from FRED: ${response.statusText}` },
        { status: response.status }
      );
    }
    
    // Get the data from the response
    const data = await response.json();
    
    // Return the data
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in FRED API proxy:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data from FRED' },
      { status: 500 }
    );
  }
} 