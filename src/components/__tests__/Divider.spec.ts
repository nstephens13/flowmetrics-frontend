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
import Chart from 'primevue/chart';
import InputNumber from 'primevue/inputnumber';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import IssueCalculator from '../../views/IssueCalculator.vue';
import ProjectOverview from '../../views/ProjectOverview.vue';
import router from '@/router/index';
import EmployeeOverview from '../../views/EmployeeOverview.vue';
import SlaComponent from '../../views/SlaView.vue';
import BarDiagram from '../BarDiagram.vue';
import KeyFactsCard from '../KeyFactsCard.vue';
import AssigneeCard from '../AssigneeCard.vue';
import IssuesCard from '../IssuesCard.vue';
import StateRestingTimeCard from '../StateRestingTimeCard.vue';

describe('ProjectDescriptionPanel Divider component', () => {
  const pinia = createTestingPinia({ stubActions: true });
  const wrapper = mount(ProjectOverview, {
    global: {
      plugins: [PrimeVue, router, pinia],
      components: {
        Dropdown,
        Card,
        DataTable,
        Column,
        Divider,
        Chip,
        BarDiagram,
        KeyFactsCard,
        AssigneeCard,
        IssuesCard,
        StateRestingTimeCard,
        MultiSelect,
        ProgressBar,
        Chart,
        InputNumber,
        Button,
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
        MultiSelect,
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

describe('Sla Rules view', () => {
  const pinia = createTestingPinia({ stubActions: true });
  const wrapper = mount(SlaComponent, {
    global: {
      plugins: [PrimeVue, router, pinia],
      components: {
        InputText,
        Dropdown,
        MultiSelect,
        Card,
        Button,
        Column,
        DataTable,
        Divider,
        InputMask,
        Accordion,
        AccordionTab,
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
