import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import PrimeVue from 'primevue/config';

import Avatar from 'primevue/avatar';
import Chip from 'primevue/chip';
import ProgressBar from 'primevue/progressbar';
import router from '@/router/index';

import EmployeeCard from '../EmployeeCard.vue';

// Describe block for the test suite
describe('Employee Card should load all the Components', () => {
  // Mounting the EmployeeCard component with necessary configuration
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
      // Props data for the EmployeeCard component
      employee: {
        id: 19,
        firstName: 'Erika',
        lastName: 'Mustermann',
      },
      issues: {
        planning: 20,
        development: 5,
        testing: 15,
      },
      categoryNames: {
        firstCategory: 'firstCategory',
        secondCategory: 'SecondCategory',
        thirdCategory: 'ThirdCategory',
      },
    },
  });

  // Test to check if the component mounts successfully
  test('it mounts', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.getComponent(Avatar).isVisible()).toBe(true);
    expect(wrapper.getComponent(ProgressBar).isVisible()).toBe(true);
  });

  // Test to check the label on the Avatar component
  test('Label on Avatar Component', () => {
    expect(wrapper.getComponent(Avatar).props('label')).toBe('EM');
  });

  // Test to check the employee's first and last name
  test('checks for Employee Name', () => {
    const employeeFirstName = wrapper.find('#firstName');
    expect(employeeFirstName.text()).toBe('Erika');

    const employeeLastName = wrapper.find('#lastName');
    expect(employeeLastName.text()).toBe('Mustermann');
  });

  // Test to check the total number of tickets
  test('checks for total tickets', () => {
    const label = wrapper.find('#ticketCount');
    const labelText = label.text();
    const expectedTotalTickets = 40;

    expect(labelText).toContain(expectedTotalTickets);
  });

  // Test to check the progress values for different categories
  test('Progressbars checks', () => {
    const progressBar1 = wrapper.find('.planningProgressbar');
    expect(progressBar1.text()).toBe('20');
    const progressBar2 = wrapper.find('.developmentProgressbar');
    expect(progressBar2.text()).toBe('5');
    const progressBar3 = wrapper.find('.testingProgressbar');
    expect(progressBar3.text()).toBe('15');
  });
});
