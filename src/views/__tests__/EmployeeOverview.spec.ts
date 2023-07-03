import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import PrimeVue from 'primevue/config';
import { createPinia } from 'pinia';

import Card from 'primevue/card';
import DataView from 'primevue/dataview';
import Divider from 'primevue/divider';
import Avatar from 'primevue/avatar';
import MultiSelect from 'primevue/multiselect';
import ProgressBar from 'primevue/progressbar';
import Chip from 'primevue/chip';
import router from '@/router/index';

import EmployeeOverview from '../EmployeeOverview.vue';

const pinia = createPinia();
describe('Employee Overview should load all the Components', () => {
  const wrapper = mount(EmployeeOverview, {
    global: {
      plugins: [PrimeVue, router, pinia],
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

  test('it mounts', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.findComponent(Card).isVisible()).toBe(true);
    expect(wrapper.findComponent(DataView).isVisible()).toBe(true);
    expect(wrapper.findComponent(Divider).isVisible()).toBe(true);
    expect(wrapper.findComponent(MultiSelect).isVisible()).toBe(true);
  });

  test('Multiselect should contain all options', async () => {
    const multiselects = wrapper.findAllComponents(MultiSelect);
    expect(0).toEqual(multiselects[0].props('options').length);
    expect(6).toEqual(multiselects[1].props('options').length);
  })
});
