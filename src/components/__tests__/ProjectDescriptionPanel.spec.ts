import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import PrimeVue from 'primevue/config';
import Card from 'primevue/card';
import Dropdown from 'primevue/dropdown';
import Panel from 'primevue/panel';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Divider from 'primevue/divider';
import MultiSelect from 'primevue/multiselect';
import router from '@/router/index';
import ProjectDescriptionPanel from '../ProjectDescriptionPanel.vue';

// Describe block for the test suite
describe('Project Overview should load all the Components', () => {
  // Mounting the ProjectDescriptionPanel component with necessary configuration
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
        MultiSelect,
      },
    },
  });

  // Test to check if the component mounts successfully
  test('it mounts', () => {
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

  test('DataTable should contain "id" column with field ', () => {
    const dataTable = wrapper.getComponent(DataTable);
    const columns = dataTable.findAllComponents(Column);
    const columnExists = columns.some((column) => column.props('field') === 'id');
    expect(columnExists).toBe(true);
  });

  test('DataTable should contain "name" column with field ', () => {
    const dataTable = wrapper.getComponent(DataTable);
    const columns = dataTable.findAllComponents(Column);
    const columnExists = columns.some((column) => column.props('field') === 'name');
    expect(columnExists).toBe(true);
  });
  test('DataTable should contain "assignedTo" column with field ', () => {
    const dataTable = wrapper.getComponent(DataTable);
    const columns = dataTable.findAllComponents(Column);
    const columnExists = columns.some((column) => column.props('field') === 'assignedTo');
    expect(columnExists).toBe(true);
  });

  test('DataTable should contain "createdAt" column with field ', () => {
    const dataTable = wrapper.getComponent(DataTable);
    const columns = dataTable.findAllComponents(Column);
    const columnExists = columns.some((column) => column.props('field') === 'createdAt');
    expect(columnExists).toBe(true);
  });
});
