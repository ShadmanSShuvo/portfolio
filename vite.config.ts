import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    fs: {
      // allow serving files from project root (adjust if you want to restrict)
      allow: ['.']
    }
  }
});
