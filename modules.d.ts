// Custom declarations for Cloudflare Workers to ensure TypeScript compatibility

// Declare the Cloudflare Worker environment
declare namespace Cloudflare {
  export interface Env {
    FRED_API_KEY: string;
  }
}

// Ensure compatibility with Node.js modules in the Edge runtime
declare module 'node:*' {
  const value: any;
  export default value;
}

declare namespace NodeJS {
  interface ProcessEnv {
    FRED_API_KEY: string;
  }
} 