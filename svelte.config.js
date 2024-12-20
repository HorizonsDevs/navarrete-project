import { sveltePreprocess } from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';

export default {
  kit: {
    adapter: adapter({
      fallback: 'index.html',  // Still useful for SPA functionality
    }),
    paths: {
      base: '',  // Removed the base path specific to GitHub Pages
    },
    prerender: {
      entries: ['*'],  // Retain prerendering unless you explicitly don't want it
    },
  },
  preprocess: sveltePreprocess(),
};
