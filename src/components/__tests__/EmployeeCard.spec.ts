import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import PrimeVue from 'primevue/config';

import Avatar from 'primevue/avatar';
import Chip from 'primevue/chip';
import ProgressBar from 'primevue/progressbar';
import router from '@/router/index';

import EmployeeCard from '../EmployeeCard.vue';

describe('Employee Card should load all the Components', () => {
  const wrapper = mount(EmployeeCard, {
    global: {
      plugins: [PrimeVue, router],
      components: {
        Avatar,
        Chip,
        ProgressBar,
      },
    },
    propsData: {
      employee: {
        id: 19,
        firstName: 'Erika',
        lastName: 'Mustermann',
      },
      issues: {
        openIssues: 20,
        inProgressIssues: 5,
        closedIssues: 15,
      },
    },
  });

  test('it mounts', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.getComponent(Avatar).isVisible()).toBe(true);
    expect(wrapper.getComponent(Chip).isVisible()).toBe(true);
    expect(wrapper.getComponent(ProgressBar).isVisible()).toBe(true);
  });

  test('Label on Avatar Component', () => {
    expect(wrapper.getComponent(Avatar).props('label')).toBe('EM');
  });

  test('checks for Employee Name', () => {
    const employeeName = wrapper.find('.EmployeeName');
    expect(employeeName.text()).toBe('Erika Mustermann');
  });

  test('Label on Chip component', () => {
    expect(wrapper.getComponent(Chip).props('label')).toBe('Employee ID : 19');
  });

  test('checks for total tickets', () => {
    const label = wrapper.find('label[for="TotalTickets"]');
    const labelText = label.text();
    const expectedTotalTickets = 40;

    expect(labelText).toContain(expectedTotalTickets);
  });

  test('Progressbars checks', () => {
    const progressBar1 = wrapper.find('.openIssuesProgressbar');
    expect(progressBar1.text()).toBe('20');
    const progressBar2 = wrapper.find('.inProgressIssuesProgressbar');
    expect(progressBar2.text()).toBe('5');
    const progressBar3 = wrapper.find('.closedIssuesProgressbar');
    expect(progressBar3.text()).toBe('15');
  });
});
