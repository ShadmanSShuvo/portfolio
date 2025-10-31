import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Use vitePreprocess for SvelteKit v2
  preprocess: vitePreprocess(),

  kit: {
    // adapter-auto is fine for development; change to adapter-static or adapter-node as needed
    adapter: adapter(),

    // default assets/static folder
    files: {
      assets: 'static'
    }
  }
};

export default config;
