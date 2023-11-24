import vuetify from '@/plugins/vuetify';
import rollbar from './plugins/rollbar';
import i18n from './plugins/i18n';
import '@/styles/main.scss';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);

const isProdMode = import.meta.env.PROD;

app.use(router);
app.use(vuetify);
app.use(i18n);

if (isProdMode) {
  // monitor app in prod only
  app.use(rollbar);
}

app.mount('#app');
