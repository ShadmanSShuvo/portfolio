import adapter from '@sveltejs/adapter-static';

const config = {
  kit: {
    adapter: adapter({
      // put the built static site here so GH Actions can upload it
      pages: 'build',
      assets: 'build',
      // fallback helps client-side routing on hosts that don't support SPA fallback.
      // Use 'index.html' for SPA fallback or null if you want strict pre-rendering.
      fallback: 'index.html'
    }),
    paths: {
      base: '/portfolio' // required for GitHub Pages project site
    },
    prerender: {
      default: true
    }
  }
};

export default config;