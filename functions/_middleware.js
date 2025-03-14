// Middleware for Cloudflare Pages Functions to add node compatibility

export const onRequest = async ({ request, next, env }) => {
  // Enable Node.js compatibility for the API routes
  const response = await next();
  
  // Add CORS headers to allow the API to be called from any origin
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  
  return response;
}; 