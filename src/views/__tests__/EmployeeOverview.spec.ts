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
    expect(6).toEqual(multiselects[0].props('options').length);
    expect(0).toEqual(multiselects[1].props('options').length);
  });

  test('displays the correct title', () => {
    const title = wrapper.find('.PageTitel');
    expect(title.text()).toBe('Employee Overview');
  });

  test('Select a project and status on the project multiselector', async () => {
    const multiselects = wrapper.findAllComponents(MultiSelect);
    multiselects[0].setValue([multiselects[0].props('options')[2]]).finally(() => {
      expect('Mocking Bird Project').toEqual(multiselects[0].find('.p-multiselect-label').text());
      multiselects[1].setValue([multiselects[1].props('options')[0]]).finally(() => {
        expect(13).toEqual(wrapper.getComponent(DataView).props('value').length);
      });
    });
  });
});
