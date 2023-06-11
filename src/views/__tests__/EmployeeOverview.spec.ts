import { describe, it, expect } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import Card from 'primevue/card';
import EmployeeOverview from '../EmployeeOverview.vue';
import type { EmployeeIF } from '../../model/EmployeeIF';

const app = createApp({});
app.use(PrimeVue);
app.component('Card', Card);

describe('EmployeeOverview', () => {
  it('renders the employee details and boxes', () => {
    const employeeMap = new Map();
    employeeMap.set(
      { id: 1, firstName: 'John', lastName: 'Doe' },
      { openIssues: 2, inProgressIssues: 3, closedIssues: 5 },
    );

    const wrapper: VueWrapper<never> = mount(EmployeeOverview, {
      global: {
        plugins: [PrimeVue],
        components: {
          Card,
        },
      },
      props: {},
      computed: {
        employeeMap(): Map<EmployeeIF, { openIssues: number; inProgressIssues: number; closedIssues: number }> {
          const employeeMap = new Map();
          employeeMap.set(
            { id: 1, firstName: 'John', lastName: 'Doe' },
            { openIssues: 2, inProgressIssues: 3, closedIssues: 5 },
          );
          return employeeMap;
        },
        getUserNameBackgroundStyle: EmployeeOverview.computed?.getUserNameBackgroundStyle,
        getBoxHeightStyle: EmployeeOverview.computed?.getBoxHeightStyle,
      },

    });

    // Assert that the component renders the employee details
    expect(wrapper.text()).toContain('John Doe');

    // Assert that the boxes are rendered with the correct styles
    const openBox = wrapper.find('.open');
    const inProgressBox = wrapper.find('.in-progress');
    const closedBox = wrapper.find('.closed');

    expect(openBox.exists()).toBe(true);
    expect(inProgressBox.exists()).toBe(true);
    expect(closedBox.exists()).toBe(true);

    expect(openBox.attributes('style')).toContain('height: 60px'); // Adjust this value based on your computed style logic
    expect(inProgressBox.attributes('style')).toContain('height: 80px'); // Adjust this value based on your computed style logic
    expect(closedBox.attributes('style')).toContain('height: 120px'); // Adjust this value based on your computed style logic
  });
});
