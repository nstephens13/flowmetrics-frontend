import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import PrimeVue from 'primevue/config';
// import getMockData from '../assets/__mockdata__/mockDataComposer.ts';

import Card from 'primevue/card';
import Dropdown from 'primevue/dropdown';
import Panel from 'primevue/panel';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Divider from 'primevue/divider';
import router from '../../router';
import ProjectDescriptionPanel from '../ProjectDescriptionPanel.vue';
import type { EmployeeIF } from '@/model/EmployeeIF';

describe('Project Overview should load all the Components', () => {
  const wrapper = mount(ProjectDescriptionPanel, {
    global: {
      plugins: [PrimeVue, router],
      components: {
        Dropdown,
        Panel,
        Card,
        DataTable,
        Column,
        Divider,
      },
      stubs: {
        teleport: false,
      },
    },
  });

  test('it mounts', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.getComponent(Dropdown).isVisible()).toBe(true);
    expect(wrapper.getComponent(Card).isVisible()).toBe(true);
    expect(wrapper.getComponent(Panel).isVisible()).toBe(true);
  });

  test('Dropdown component contains all values from the array', () => {
    const employee: EmployeeIF = {
      id: 5,
      firstName: 'Johannes',
      lastName: 'Hermann',
      assignedIssues: [],
    };

    expect(wrapper.vm.printAssignedTo(employee)).toBe('Johannes Hermann');
    expect(wrapper.vm.printAssignedTo(null)).toBe(" ");
  });
});
