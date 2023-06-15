import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ProjectOverview from '../views/ProjectOverview.vue';
import About from '../views/AboutView.vue';

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
    {
      path: '/sla-management',
      name: 'sla-management',
      component: () => import('../views/SLAComponent.vue'),
    },
    {
      path: '/employee-overview',
      name: 'employee-overview',
      component: () => import('../views/EmployeeOverview.vue'),
    },
  ],
});

export default router;
