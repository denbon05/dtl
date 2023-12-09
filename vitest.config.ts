import { fileURLToPath } from 'node:url';
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config';
import viteConfig from './vite.config';

export default defineConfig((configEnv) =>
  mergeConfig(viteConfig(configEnv), {
    test: {
      environment: 'jsdom',
      include: ['__tests__/unit/components/*.[jt]s'],
      exclude: [...configDefaults.exclude, '__tests__/e2e/*'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      watch: false,
      server: {
        deps: {
          inline: ['vuetify'],
        },
      },
    },
  })
);
