import { sveltePreprocess } from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';

export default {
  kit: {
    adapter: adapter({
		fallback: 'index.html',  // This is typically used for Single Page Applications (SPA)
	  }),
    paths: {
      base: '/navarrete-project',  // GitHub Pages will serve from this path
    },
    prerender: {
      entries: ['*'],  // Ensure everything is prerendered
    },
  },
  preprocess: sveltePreprocess(),
};
