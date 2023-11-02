import { beforeAll, describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import PrimeVue from 'primevue/config';
import Card from 'primevue/card';
import Dropdown from 'primevue/dropdown';
import Panel from 'primevue/panel';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Divider from 'primevue/divider';
import MultiSelect from 'primevue/multiselect';
import { createTestingPinia } from '@pinia/testing';
import InputText from 'primevue/inputtext';
import router from '@/router/index';
import ProjectDescriptionPanel from '../ProjectDescriptionPanel.vue';
import getMockData from '../../assets/__mockdata__/mockDataComposer';
import useProjectsStore from '../../store/projectStore';

// Describe block for the test suite
describe('Project Overview should load all the Components', () => {
  // Mounting the ProjectDescriptionPanel component with necessary configuration

  const wrapper = mount(ProjectDescriptionPanel, {
    global: {
      plugins: [
        PrimeVue,
        router,
        createTestingPinia({
          createSpy: vi.fn,
          stubActions: false,
          initialState: {
            sla: {
              slaCategories: [
                {
                  id: 1,
                  name: 'Category 1',
                  rule: null,
                  subscriber: null,
                },
              ],
            },
            projects: {
              projects: [],
            },
          },
        }),
      ],
      components: {
        Dropdown,
        Panel,
        Card,
        DataTable,
        Column,
        Divider,
        MultiSelect,
        InputText,
      },
    },
  });

  beforeAll(async () => {
    const projectStore = useProjectsStore();

    projectStore.addProject(getMockData(1));
    projectStore.addProject(getMockData(2));
    projectStore.addProject(getMockData(3));
    projectStore.addProject(getMockData(53));
    projectStore.addProject(getMockData(54));
    projectStore.addProject(getMockData(55));
  });

  // Test to check if the component mounts successfully
  test('it mounts', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.getComponent(Dropdown).isVisible()).toBe(true);
    expect(wrapper.getComponent(Card).isVisible()).toBe(true);
    expect(wrapper.getComponent(Panel).isVisible()).toBe(true);
  });

  // Test to check the placeholder text of the dropdown select
  test('Dropdown select should be shown and in English', () => {
    expect(wrapper.getComponent(Dropdown).props('placeholder')).toBe('Select a project');
  });

  // Test to check the number of options in the dropdown selection
  test('Dropdown Selection should contain all projects', () => {
    wrapper
      .getComponent(Dropdown)
      .trigger('click')
      .then(() => {
        const dropdownOptions = wrapper.getComponent(Dropdown).props('options');
        expect(6).toEqual(dropdownOptions.length);
      });
  });

  // Test to check the filter menu dropdown button
  test('filter menu dropdown button', () => {
    const dropdownOptions = wrapper.getComponent(Dropdown).props('options');
    wrapper.getComponent(Dropdown).vm.$emit('change', dropdownOptions[0]);

    wrapper
      .getComponent(Dropdown)
      .setValue(dropdownOptions[5])
      .then(() => {
        const tableButton = wrapper.getComponent(DataTable).find('.p-column-filter-menu-button');
        tableButton.trigger('click').then(() => {
          const multiSelect = wrapper.getComponent(MultiSelect);
          expect(3).toEqual(multiSelect.props('options').length);
        });
      });
  });
});
