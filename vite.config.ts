// vite.config.js

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // 💡 AJOUTEZ CETTE SECTION
  esbuild: {
    // Configure esbuild pour traiter les fichiers .js comme du JSX
    // C'est nécessaire si vous utilisez l'extension .js pour vos composants React
    loader: 'tsx',
    include: /src\/.*\.tsx?$/, // Appliquez le loader à tous les .ts et .tsx dans src/
    exclude: [],
  },
  optimizeDeps: {
    // Configurez également optimizeDeps pour le mode développement
    esbuildOptions: {
      loader: {
        '.ts': 'tsx',
      },
    },
  },
});