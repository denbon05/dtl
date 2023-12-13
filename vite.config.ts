import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';
import loadVersion from 'vite-plugin-package-version';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';
import { dirname, resolve } from 'node:path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';

  return {
    plugins: [
      loadVersion(),
      vue(),
      vuetify({
        styles: {
          configFile: './src/styles/settings.scss',
        },
      }),
      VueI18nPlugin({
        include: resolve(
          dirname(fileURLToPath(import.meta.url)),
          './src/locales/**'
        ),
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      host: true,
      proxy: {
        '/assets/.*': {
          headers: {
            // cache static assets for a 3 days in prod
            'Cache-Control': `public, max-age=0, s-maxage=${
              isProd ? 259200 : 0
            }`,
          },
        },
      },
    },
  };
});
