import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { reactRouter } from '@react-router/dev/vite';
import { defineConfig, type Plugin } from 'vite';

import { SITE_URLS } from './src/data/urls';
import { SITE_ORIGIN } from './src/data/site';
import { buildRobots, buildSitemap } from './src/lib/sitemap';

/**
 * Writes sitemap.xml and robots.txt into public/ before the bundle is emitted,
 * so Vite copies them into the output as ordinary static assets.
 *
 * Both are derived from src/data/urls.ts, the same module that feeds
 * prerender() in react-router.config.ts, so the sitemap cannot list a URL that
 * was never rendered. Running as a plugin rather than a separate script means
 * the TypeScript manifest is read by the build that is already running,
 * instead of spawning a second Vite instance to transpile it.
 */
function seoFiles(): Plugin {
  return {
    name: 'adorn-seo-files',
    buildStart() {
      if (SITE_URLS.length === 0) {
        this.error('SITE_URLS is empty; refusing to write an empty sitemap.');
      }

      // import.meta.url rather than import.meta.dirname: the latter needs
      // Node 20.11+, and the build host's Node version is not ours to assume.
      const dir = path.resolve(fileURLToPath(new URL('.', import.meta.url)), 'public');
      mkdirSync(dir, { recursive: true });
      writeFileSync(path.join(dir, 'sitemap.xml'), buildSitemap(SITE_URLS, SITE_ORIGIN), 'utf8');
      writeFileSync(path.join(dir, 'robots.txt'), buildRobots(SITE_ORIGIN), 'utf8');
    },
  };
}

/**
 * Chrome DevTools automatically requests /.well-known/appspecific/… in dev.
 * It is not an app route; answering before React Router avoids noisy stack traces.
 */
function ignoreWellKnown(): Plugin {
  return {
    name: 'adorn-ignore-well-known',
    configureServer: {
      order: 'pre',
      handler(server) {
        server.middlewares.use((req, res, next) => {
          const path = req.url?.split('?')[0] ?? '';
          if (path.startsWith('/.well-known/')) {
            res.statusCode = 404;
            res.end();
            return;
          }
          next();
        });
      },
    },
  };
}

export default defineConfig({
  // reactRouter() supplies the React transform, so @vitejs/plugin-react is not
  // used here; adding both would apply the Fast Refresh transform twice.
  plugins: [ignoreWellKnown(), seoFiles(), reactRouter()],

  build: {
    // Media is served from public/ at stable paths, so nothing should be
    // inlined as a data URI.
    assetsInlineLimit: 4096,
  },

  server: {
    host: '0.0.0.0',
  },
});
