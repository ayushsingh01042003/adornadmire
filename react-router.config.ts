import type { Config } from '@react-router/dev/config';
import { PRERENDER_PATHS } from './src/data/urls';

export default {
  appDirectory: 'src',

  /**
   * No runtime server: the salon site is fully static and deploys to Vercel as
   * static files. React Router still server-renders each path below at build
   * time, which is the entire point — the previous SPA shipped an empty
   * <div id="root"> to Googlebot.
   */
  ssr: false,

  /**
   * Every indexable URL gets real HTML. Sourced from src/data/urls.ts so the
   * sitemap and the prerender list cannot drift apart.
   */
  prerender() {
    return PRERENDER_PATHS;
  },
} satisfies Config;
