import { createRouter, createWebHistory } from 'vue-router';
import ProjectOverview from '@/views/ProjectOverview.vue';
import IssueCalculator from '@/views/IssueCalculator.vue';
import SlaComponent from '@/views/SlaView.vue';
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
      path: '/create-sla-rules',
      name: 'create-sla-rules',
      component: SlaComponent,
    },
    {
      path: '/employee-overview',
      name: 'employee-overview',
      component: EmployeeOverview,
    },
  ],
});

export default router;
