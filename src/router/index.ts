import { createRouter, createWebHistory } from 'vue-router'
import ProjectOverview from '@/views/ProjectOverview.vue'
import TicketCalculator from '@/views/TicketCalculatorView.vue'
import SLAComponent from '@/views/SLAComponent.vue'
import EmployeeOverview from '@/views/EmployeeOverview.vue'
import EmployeeOverview2 from '@/views/EmployeeOverview2.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ProjectOverview
    },
    {
      path: '/projectoverview',
      name: 'ProjectOverview',
      component: ProjectOverview
    },
    {
      path: '/ticket-calculator',
      name: 'ticket-calculator',
      component: TicketCalculator
    },
    {
      path: '/sla-management',
      name: 'sla-management',
      component: SLAComponent
    },
    {
      path: '/employee-overview',
      name: 'employee-overview',
      component: EmployeeOverview
    },
    {
      path: '/employee-overview-2',
      name: 'employee-overview-2',
      component: EmployeeOverview2
    }
  ]
})

export default router
