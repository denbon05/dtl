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

const rollbarPlugin: Plugin = {
  install(app) {
    app.config.errorHandler = (err, vm, info) => {
      rollbar.error(err as LogArgument, { vueComponent: vm, info });
      console.error(err);
    };

    app.provide('rollbar', rollbar);
  },
};

export default rollbarPlugin;
