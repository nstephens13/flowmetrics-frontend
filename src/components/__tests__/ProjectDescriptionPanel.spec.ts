import { describe, expect, test } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
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
  const wrapper: VueWrapper<typeof ProjectDescriptionPanel> = mount(ProjectDescriptionPanel, {
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

  test('Status changes are shown in Mocking Bird Project', async () => {
    const dropdownOptions = wrapper.getComponent(Dropdown).props('options');
    const mockingBirdProject = dropdownOptions[2];
    wrapper.getComponent(Dropdown).vm.$emit('select', dropdownOptions[2]);

    wrapper
      .getComponent(Dropdown)
      .setValue(mockingBirdProject)
      .then(() => {
        wrapper.trigger('click', mockingBirdProject).then(() => {
          const statusChangesColumnCells = wrapper.findAll('.p-datatable-tbody tr td:last-child');
          const statusChangesColumnData = statusChangesColumnCells.at(0).text();
          const expectedData = /\b\d+\b/g;
          const extractedNumbers = statusChangesColumnData.match(expectedData);
          expect(extractedNumbers).toHaveLength(3);
          extractedNumbers.forEach((number) => {
            expect(Number.isInteger(Number(number))).toBe(true);
          });
        });
        expect(6).toEqual(dropdownOptions.length);
        expect('Mocking Bird Project').toEqual(mockingBirdProject.name);
      });
  });
});
