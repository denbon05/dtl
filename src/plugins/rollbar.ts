import Rollbar, { type LogArgument } from 'rollbar';
import type { Plugin } from 'vue';

const rollbar = new Rollbar({
  accessToken: import.meta.env.VITE_ROLLBAR_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: import.meta.env.MODE,
    client: {
      javascript: {
        code_version: import.meta.env.APP_VERSION,
      },
    },
  },
});

const isProdMode = import.meta.env.PROD;

const rollbarPlugin: Plugin = {
  install(app) {
    // monitor app in prod only
    if (isProdMode) {
      app.config.errorHandler = (err, vm, info) => {
        rollbar.error(err as LogArgument, { vueComponent: vm, info });
        console.error(err);
      };

      app.provide('rollbar', rollbar);
    }
  },
};

export default rollbarPlugin;
