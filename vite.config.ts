import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import fs from 'fs';

// Helper to run Netlify functions locally during development
const netlifyFunctionDev = () => ({
  name: 'netlify-function-dev',
  configureServer(server: any) {
    server.middlewares.use(async (req: any, res: any, next: any) => {
      if (req.url.startsWith('/api/')) {
        const functionName = req.url.split('/')[2]?.split('?')[0];
        const functionPath = path.resolve(__dirname, `./netlify/functions/${functionName}.ts`);

        if (fs.existsSync(functionPath)) {
          try {
            // In a real environment we'd use netlify-cli, here we simulate the basic handler
            const { handler } = await server.ssrLoadModule(functionPath);
            
            // Collect body for POST
            let body = '';
            if (req.method === 'POST') {
              for await (const chunk of req) {
                body += chunk;
              }
            }

            const event = {
              httpMethod: req.method,
              queryStringParameters: Object.fromEntries(new URL(req.url, `http://${req.headers.host}`).searchParams),
              body: body || null,
              headers: req.headers
            };

            const response = await handler(event, {});

            res.statusCode = response.statusCode;
            Object.entries(response.headers || {}).forEach(([k, v]) => res.setHeader(k, v as string));
            res.end(response.body);
            return;
          } catch (err: any) {
            console.error(`Error in local Netlify function [${functionName}]:`, err);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: err.message }));
            return;
          }
        }
      }
      next();
    });
  }
});

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss(), netlifyFunctionDev()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
