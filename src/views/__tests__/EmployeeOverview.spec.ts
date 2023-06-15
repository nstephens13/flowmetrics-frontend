import { describe, expect, test } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import PrimeVue from 'primevue/config';
import Card from 'primevue/card';
import EmployeeOverview from '../EmployeeOverview.vue';

describe('EmployeeOverview with a simple manual constructed map should render correctly', () => {
  // given
  const employeeMap = new Map();
  employeeMap.set(
    { id: 1, firstName: 'John', lastName: 'Doe' },
    { openIssues: 2, inProgressIssues: 3, closedIssues: 5 },
  );

  // when
  const wrapper: VueWrapper<any> = mount(EmployeeOverview, {
    global: {
      plugins: [PrimeVue],
      components: {
        Card,
      },
    },
  });

  const openBoxes = wrapper.findAll('.open');
  const inProgressBoxes = wrapper.findAll('.in-progress');
  const closedBoxes = wrapper.findAll('.closed');

  // then
  test('Component should include the Name John Doe', () => {
    expect(wrapper.text()).toContain('JOHN DOE');
  });

  test('all Boxes exists exactly one time', () => {
    expect(openBoxes[0].exists()).toBe(true);
    expect(inProgressBoxes[0].exists()).toBe(true);
    expect(closedBoxes[0].exists()).toBe(true);
    expect(openBoxes.length).toBe(13);
    expect(inProgressBoxes.length).toBe(13);
    expect(closedBoxes.length).toBe(13);
  });
});
