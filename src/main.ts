import vuetify from '@/plugins/vuetify';
// override vuetify styles
import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(router);
app.use(vuetify);

app.mount('#app');
