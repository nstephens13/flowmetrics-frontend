import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import PrimeVue from 'primevue/config';
import Card from 'primevue/card';
import { createPinia } from 'pinia';
import EmployeeOverview from '../EmployeeOverview.vue';

const pinia = createPinia();
describe('EmployeeOverview with a simple manual constructed map should render correctly', () => {
  // when
  const wrapper = mount(EmployeeOverview, {
    global: {
      plugins: [PrimeVue, pinia],
      components: {
        Card,
      },
    },
  });

  const openBoxes = wrapper.findAll('.open');
  const inProgressBoxes = wrapper.findAll('.in-progress');
  const closedBoxes = wrapper.findAll('.closed');
  const result = wrapper.text();
  // TODO Test dosent test the right thing
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
