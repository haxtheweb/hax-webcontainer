import { resolve } from 'path'
import { defineConfig } from 'vite';

const customHeadersPlugin = () => ({
  name: 'custom-headers',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      // Check the path for the specific route
      if (req.url !== '/magicscript.html') {
        res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
        res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
      }
      console.log(req.url);
      // Continue to the next middleware
      next();
    });
  },
});

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        nested: resolve(__dirname, 'loading.html'),
        nested2: resolve(__dirname, 'docplayer.html'),
        nested3: resolve(__dirname, 'magicscript.html'),
      },
    },
  },
  plugins: [customHeadersPlugin()],
});