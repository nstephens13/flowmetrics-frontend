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

describe('Employee Overview should load all the Components', () => {
  const pinia = createTestingPinia({ stubActions: false });

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
    expect(4).toEqual(multiselects[0].props('options').length);
    expect(0).toEqual(multiselects[1].props('options').length);
  });

  test('displays the correct title', () => {
    const title = wrapper.find('.PageTitel');
    expect(title.text()).toBe('Employee Overview');
  });

  test('Select a project and status on the project multiselector', async () => {
    const multiselects = wrapper.findAllComponents(MultiSelect);
    await multiselects[0].setValue([multiselects[0].props('options')[1]]);

    expect('Mocking Bird Project').toEqual(multiselects[0].find('.p-multiselect-label').text());
    expect(2).toEqual(multiselects[1].props('options').length);

    await multiselects[1].setValue([multiselects[1].props('options')[0]]);
    await wrapper.vm.$nextTick();
    const count: number = await wrapper.getComponent(DataView).props('value').length;
    expect(13).toEqual(count);
  });
});
