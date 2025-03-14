// This file is required for Cloudflare Pages to properly enable node.js compatibility mode
// This is needed for the Next.js API routes to work correctly

export default {
  async fetch(request, env, ctx) {
    // This is a pass-through function that will be called by Cloudflare Workers
    // It's required for the nodejs_compat flag to be recognized
    return new Response("Cloudflare Workers configuration file for Next.js", {
      headers: { "content-type": "text/plain" },
    });
  }
}; 