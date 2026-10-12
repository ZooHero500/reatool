import { defineConfig } from 'astro/config';
export default defineConfig({
  site: 'https://reatool.dev',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
});
