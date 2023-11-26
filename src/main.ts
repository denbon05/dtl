import vuetify from '@/plugins/vuetify';
import rollbar from './plugins/rollbar';
import i18n from './plugins/i18n';
import '@/styles/main.scss';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);

const isMonitoringEnabled = Boolean(import.meta.env.VITE_MONITORING_ENABLED);

app.use(router);
app.use(vuetify);
app.use(i18n);

if (isMonitoringEnabled) {
  // monitor app in prod only
  app.use(rollbar);
}

app.mount('#app');
