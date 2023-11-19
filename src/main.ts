import vuetify from '@/plugins/vuetify';
import rollbar from './plugins/rollbar';
import i18n from './plugins/i18n';
import '@/styles/main.scss';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(router);
app.use(vuetify);
app.use(rollbar);
app.use(i18n);

app.mount('#app');
