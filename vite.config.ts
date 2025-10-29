import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
  base: '/portfolio/', // ensures built asset urls are prefixed correctly
  plugins: [sveltekit()]
});
