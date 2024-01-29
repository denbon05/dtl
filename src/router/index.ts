import { createRouter, createWebHistory } from 'vue-router';
import { Routes } from '@/types/routes';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    }

    if (to.hash) {
      // top = 100 - take into account double abb bar height
      return { el: to.hash, top: 100, behavior: 'smooth' };
    }

    return { top: 0, behavior: 'smooth' };
  },
  routes: [
    {
      path: '/',
      name: Routes.HOME,
      component: HomeView,
    },
  ],
});

export default router;
