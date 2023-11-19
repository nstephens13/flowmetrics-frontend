import { createRouter, createWebHistory } from 'vue-router';
import ProjectOverview from '@/views/ProjectOverview.vue';
import IssueCalculator from '@/views/IssueCalculator.vue';
import SLAComponent from '@/views/SlaView.vue';
import EmployeeOverview from '@/views/EmployeeOverview.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ProjectOverview,
    },
    {
      path: '/project-overview',
      name: 'project-overview',
      component: ProjectOverview,
    },
    {
      path: '/issue-calculator',
      name: 'issue-calculator',
      component: IssueCalculator,
    },
    {
      path: '/sla-management',
      name: 'sla-management',
      component: SLAComponent,
    },
    {
      path: '/employee-overview',
      name: 'employee-overview',
      component: EmployeeOverview,
    },
  ],
});

export default router;
