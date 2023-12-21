import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import PrimeVue from 'primevue/config';
import Card from 'primevue/card';
import Dropdown from 'primevue/dropdown';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Divider from 'primevue/divider';
import MultiSelect from 'primevue/multiselect';
import { createTestingPinia } from '@pinia/testing';
import router from '@/router/index';
import ProjectDescriptionPanel from '../ProjectDescriptionPanel.vue';
import KeyFactsCard from '../KeyFactsCard.vue';

// Describe block for the test suite
describe('Project Overview should load all the Components', () => {
  const pinia = createTestingPinia({
    stubActions: false,
    initialState: {
      projects: {
        projects: [
          {
            id: 0,
            name: 'Project 1',
            description: 'Demo',
            issues: [
              {
                id: 923,
                name: 'Test',
                description: 'Demo',
                assignedTo: null,
                createdBy: null,
                createdAt: null,
                closedAt: null,
                dueTo: null,
                status: 'open',
                assigneeRestingTime: null,
                statusRestingTime: null,
                statusChanges: null,
                assigneeChanges: null,
                assignedSlaRule: null,
              },
            ],
            slaSubscriber: null,
          },
        ],
      },
    },
  });
  // Mounting the ProjectDescriptionPanel component with necessary configuration
  const wrapper = mount(ProjectDescriptionPanel, {
    global: {
      plugins: [PrimeVue, router, pinia],
      components: {
        Dropdown,
        Card,
        DataTable,
        Column,
        Divider,
        MultiSelect,
        KeyFactsCard,
      },
    },
  });

  // Test to check if the component mounts successfully
  test('it mounts', () => {
    expect(wrapper.getComponent(Dropdown).isVisible()).toBe(true);
    expect(wrapper.getComponent(Card).isVisible()).toBe(true);
    expect(wrapper.getComponent(KeyFactsCard).isVisible()).toBe(true);
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
        expect(1).toEqual(dropdownOptions.length);
      });
  });

  // Test to check the filter menu dropdown button
  test('filter menu dropdown button', () => {
    const dropdown = wrapper.getComponent(Dropdown);
    const dropdownOptions = dropdown.props('options');

    wrapper
      .getComponent(Dropdown)
      .setValue(dropdownOptions[0])
      .then(() => {
        const tableButton = wrapper.getComponent(DataTable).find('.p-column-filter-menu-button');
        tableButton.trigger('click').then(() => {
          const multiSelect = wrapper.getComponent(MultiSelect);
          expect(1).toEqual(multiSelect.props('options').length);
        });
      });
  });

  test('Status changes are shown in Mocking Bird Project', async () => {
    const projectDropdown = wrapper.getComponent(Dropdown);
  test('DataTable should contain "id" column with field ', () => {
    const dataTable = wrapper.getComponent(DataTable);
    const columns = dataTable.findAllComponents(Column);
    const columnExists = columns.some((column) => column.props('field') === 'id');
    expect(columnExists).toBe(true);
  });

    const dropdownOptions = projectDropdown.props('options');
    const project = dropdownOptions[0];

    await projectDropdown.setValue(project).then(async () => {
      const statusChangesColumnCells = wrapper.findAll('.p-datatable-tbody tr td:last-child');
      const statusChangesColumnData = (statusChangesColumnCells.at(0) as any)?.text();
      const expectedData = /\b\d+\b/g; // is a regular expression that matches one or more digits (\d+) surrounded by word boundaries (\b). The g flag indicates a global search, so it will find all matches in the string.
      const extractedNumbers = statusChangesColumnData.match(expectedData);
      expect(extractedNumbers).toHaveLength(1);
      extractedNumbers.forEach((number: string) => {
        expect(Number.isInteger(Number(number))).toBe(true);
      });
    });
    expect(1).toEqual(dropdownOptions.length);
    expect('Project 1').toEqual(project.name);
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

      test('Status changes are shown in Mocking Bird Project', async () => {
          const projectDropdown = wrapper.getComponent(Dropdown);

          const dropdownOptions = projectDropdown.props('options');
          const project = dropdownOptions[0];

          await projectDropdown.setValue(project).then(async () => {
              const statusChangesColumnCells = wrapper.findAll('.p-datatable-tbody tr td:last-child');
              const statusChangesColumnData = (statusChangesColumnCells.at(0) as any)?.text();
              const expectedData = /\b\d+\b/g; // is a regular expression that matches one or more digits (\d+) surrounded by word boundaries (\b). The g flag indicates a global search, so it will find all matches in the string.
              const extractedNumbers = statusChangesColumnData.match(expectedData);
              expect(extractedNumbers).toHaveLength(1);
              extractedNumbers.forEach((number: string) => {
                  expect(Number.isInteger(Number(number))).toBe(true);
              });
          });
          expect(1).toEqual(dropdownOptions.length);
          expect('Project 1').toEqual(project.name);
      });
});
