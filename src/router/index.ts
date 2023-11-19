import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

// TODO remember hashtag
// https://router.vuejs.org/guide/advanced/scroll-behavior.html
// https://medium.com/@aryan02420/vue-router-restore-scroll-position-with-router-link-and-transition-61396af48ba2
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
  ],
});

export default router;
