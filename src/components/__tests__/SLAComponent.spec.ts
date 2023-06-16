import { describe, expect, test } from 'vitest';
import { createPinia } from 'pinia';
import { mount } from '@vue/test-utils';
import PrimeVue from 'primevue/config';
import Card from 'primevue/card';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import router from '../../router';
import SLAComponent from '../../views/SLAComponent.vue';

const pinia = createPinia();

/* Basic test to ensure, that SLA Component is successfully rendered without any errors */
describe('SLAComponent', () => {
  test('Should render component', () => {
    const wrapper = mount(SLAComponent, {
      global: {
        plugins: [PrimeVue, router, pinia],
        components: {
          InputText,
          Dropdown,
          Card,
          Button,
          Column,
          DataTable,
        },
      },
    });
    expect(wrapper.exists()).toBe(true);
  });
});
