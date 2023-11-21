import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import Divider from 'primevue/divider';
import PrimeVue from 'primevue/config';
import Card from 'primevue/card';
import Dropdown from 'primevue/dropdown';
import Panel from 'primevue/panel';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import MultiSelect from 'primevue/multiselect';
import { createTestingPinia } from '@pinia/testing';
import DataView from 'primevue/dataview';
import Avatar from 'primevue/avatar';
import ProgressBar from 'primevue/progressbar';
import Chip from 'primevue/chip';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import InputMask from 'primevue/inputmask';
import IssueCalculator from '../../views/IssueCalculator.vue';
import ProjectOverview from '../../views/ProjectOverview.vue';
import router from '@/router/index';
import EmployeeOverview from '../../views/EmployeeOverview.vue';
import SlaComponent from '../../views/SlaView.vue';

describe('ProjectDescriptionPanel Divider component', () => {
  const wrapper = mount(ProjectOverview, {
    global: {
      plugins: [PrimeVue, router],
      components: {
        Dropdown,
        Panel,
        Card,
        DataTable,
        Column,
        Divider,
        MultiSelect,
      },
    },
  });

  test('Divider is visible and on the right position', () => {
    const divider = wrapper.findComponent(Divider);

    expect(divider.exists()).toBe(true);
    expect(divider.classes()).toContain('p-divider');
    expect(divider.classes()).toContain('p-divider-horizontal');
    const dividerStyle = window.getComputedStyle(divider.element);
    expect(dividerStyle.getPropertyValue('width')).toBe('100%');
  });
});

describe('EmployeeOverview view', () => {
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

  test('Divider is visible and on the right position', () => {
    const divider = wrapper.findComponent(Divider);

    expect(divider.exists()).toBe(true);
    expect(divider.classes()).toContain('p-divider');
    expect(divider.classes()).toContain('p-divider-horizontal');
    const dividerStyle = window.getComputedStyle(divider.element);
    expect(dividerStyle.getPropertyValue('width')).toBe('100%');
  });
});

describe('Issue Calculator view', () => {
  const wrapper = mount(IssueCalculator, {
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
    },
  });
  test('Divider is visible and on the right position', () => {
    const divider = wrapper.findComponent(Divider);
    expect(divider.exists()).toBe(true);
    expect(divider.classes()).toContain('p-divider');
    expect(divider.classes()).toContain('p-divider-horizontal');
    const dividerStyle = window.getComputedStyle(divider.element);
    expect(dividerStyle.getPropertyValue('width')).toBe('100%');
  });
});

describe('SLA Rules view', () => {
  const pinia = createTestingPinia({ stubActions: false });
  const wrapper = mount(SlaComponent, {
    global: {
      plugins: [PrimeVue, router, pinia],
      components: {
        InputText,
        Dropdown,
        Card,
        Button,
        Column,
        DataTable,
        Divider,
        InputMask,
      },
    },
  });
  test('Divider is visible and on the right position', () => {
    const divider = wrapper.findComponent(Divider);
    expect(divider.exists()).toBe(true);
    expect(divider.classes()).toContain('p-divider');
    expect(divider.classes()).toContain('p-divider-horizontal');
    const dividerStyle = window.getComputedStyle(divider.element);
    expect(dividerStyle.getPropertyValue('width')).toBe('100%');
  });
});
