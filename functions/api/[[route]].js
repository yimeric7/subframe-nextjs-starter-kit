// Handler for API routes in Cloudflare Pages Functions

export const onRequest = async (context) => {
  // Pass all API requests to the Edge Runtime
  // The Edge function configuration will handle the request
  
  try {
    // Get the route from the URL
    const url = new URL(context.request.url);
    const pathname = url.pathname;
    
    // Pass it to the appropriate handler
    if (pathname.startsWith('/api/fred')) {
      // This will be handled by our Next.js API route
      return context.next();
    }
    
    // Default response for other API routes
    return new Response(JSON.stringify({ error: 'API route not found' }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    // Error handling
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}; 