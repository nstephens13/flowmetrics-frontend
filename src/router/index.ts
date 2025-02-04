import { createRouter, createWebHistory } from 'vue-router';

const ProjectOverview = () => import('@/views/ProjectOverview.vue');
const IssueCalculator = () => import('@/views/IssueCalculator.vue');
const SlaComponent = () => import('@/views/SlaView.vue');
const EmployeeOverview = () => import('@/views/EmployeeOverview.vue');

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
