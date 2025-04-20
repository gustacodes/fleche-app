import { defineConfig } from 'vite';
import ViteFonts from 'vite-plugin-fonts';

export default defineConfig({
  plugins: [
    ViteFonts({
      google: {
        families: ['Poppins:wght@400;700']
      }
    })
  ]
});
