import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
    // If your environment is not supported, or you settled on a specific environment, switch out the adapter.
    // See https://kit.svelte.dev/docs/adapters for more information about adapters.
    adapter: adapter(),
    alias: {
      '@': 'src/lib',
    },
    // Inline the shared layout CSS (~65KB raw, ~11KB brotli) into <head> as a
    // <style> block instead of a render-blocking <link>. Removes the CSS round
    // trip from the critical path, cutting FCP/LCP on the entry page. The HTML
    // is brotli-compressed at the edge, so the real wire cost stays small.
    inlineStyleThreshold: 70000,
    prerender: {
      handleHttpError: 'fail',
      origin: 'https://vicronlopez.es'
    }
  },
};

export default config;
