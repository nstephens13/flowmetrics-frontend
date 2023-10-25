import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import PrimeVue from 'primevue/config';
import Card from 'primevue/card';
import DataView from 'primevue/dataview';
import Divider from 'primevue/divider';
import Avatar from 'primevue/avatar';
import MultiSelect from 'primevue/multiselect';
import ProgressBar from 'primevue/progressbar';
import Chip from 'primevue/chip';
import { createTestingPinia } from '@pinia/testing';
import router from '@/router/index';
import EmployeeOverview from '@/views/EmployeeOverview.vue';

// Describe block for the test suite
describe('Employee Overview should load all the Components', () => {
  // Mounting the EmployeeOverview component with necessary configuration
  const wrapper = mount(EmployeeOverview, {
    global: {
      plugins: [
        PrimeVue,
        router,
        createTestingPinia({
          stubActions: false,
          initialState: {
            projects: [],
            filter: {},
          },
        }),
      ],
      components: {
        Card,
        DataView,
        Divider,
        MultiSelect,
        Avatar,
        ProgressBar,
        Chip,
      },
    },
  });

  // Test to check if the component mounts successfully
  test('it mounts', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.findComponent(Card).isVisible()).toBe(true);
    expect(wrapper.findComponent(DataView).isVisible()).toBe(true);
    expect(wrapper.findComponent(Divider).isVisible()).toBe(true);
    expect(wrapper.findComponent(MultiSelect).isVisible()).toBe(true);
  });

  // Test to check the options in the multiselect component
  test('Multiselect should contain no options', () => {
    const multiselects = wrapper.findAllComponents(MultiSelect);
    expect(0).toEqual(multiselects[0].props('options').length);
    expect(0).toEqual(multiselects[1].props('options').length);
  });

  // Test to check the displayed title
  test('displays the correct title', () => {
    const title = wrapper.find('.PageTitel');
    expect(title.text()).toBe('Employee Overview');
  });
});
