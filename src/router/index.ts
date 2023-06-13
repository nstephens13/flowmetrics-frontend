import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ProjectOverview from '../views/ProjectOverview.vue';
import About from '../views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/projectoverview',
      name: 'ProjectOverview',
      component: ProjectOverview,
    },
  ],
});

export default router;
