// Example changes — ensure adapter-static is used and set paths.base
import adapter from '@sveltejs/adapter-static';

const config = {
  kit: {
    adapter: adapter({
      // optional: pages, assets directories you want adapter to output
      // pages: 'build',
      // assets: 'build'
    }),
    paths: {
      base: '/portfolio' // important for GitHub Pages project site
    },
    // If you rely on prerendering, ensure routes are prerendered as needed
    prerender: {
      default: true
    }
  }
};

export default config;
