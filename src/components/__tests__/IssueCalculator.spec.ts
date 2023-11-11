import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import PrimeVue from 'primevue/config';
import Card from 'primevue/card';
import Dropdown from 'primevue/dropdown';
import Panel from 'primevue/panel';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Divider from 'primevue/divider';
import CircularProgressBar from '../IssueCalculator/CircularProgressBar.vue';
import router from '../../router';
import IssueCalculator from '../IssueCalculator.vue';

// Describe block for the test suite
describe('Project Overview should load all the Components', () => {
  // Mounting the IssueCalculator component with necessary configuration
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

  // Test to check if the component mounts successfully
  test('it mounts', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.getComponent(Dropdown).isVisible()).toBe(true);
    expect(wrapper.getComponent(Card).isVisible()).toBe(true);
    expect(wrapper.getComponent(Panel).isVisible()).toBe(true);
    expect(wrapper.getComponent(CircularProgressBar).isVisible()).toBe(true);
  });

  // Test to check the number of Circular ProgressBars
  test('Should contain three Circular ProgressBars', () => {
    const circularProgressBars = wrapper.findAllComponents(CircularProgressBar);
    expect(circularProgressBars.length).toEqual(3);
  });

  // Test to check the default max value of Circular ProgressBars
  test('Circular Progressbar Default Max', () => {
    const circularProgressBars = wrapper.findAllComponents(CircularProgressBar);
    // check if on every element of circularProgressBars the max is 100
    circularProgressBars.forEach((element) => {
      expect(element.props('max')).toEqual(100);
    });
  });

  // Test to check the dropdown options
  test('Dropdown Selection should contain all projects', () => {
    wrapper
      .getComponent(Dropdown)
      .trigger('click')
      .then(() => {
        const dropdownOptions = wrapper.getComponent(Dropdown).props('options');
        expect(dropdownOptions.length).toEqual(2);
      });
  });

  test('DataTable should contain "Resting time for Assignee" column with field ', () => {
    const dataTable = wrapper.getComponent(DataTable);
    const columns = dataTable.findAllComponents(Column);
    const columnExists = columns.some(
      (column) => column.props('field') === 'Resting time (Assignee)'
    );
    expect(columnExists).toBe(true);
  });
});

test('DataTable should contain "Resting time for Assignee" column with field ', () => {
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
  const dataTable = wrapper.getComponent(DataTable);
  const columns = dataTable.findAllComponents(Column);

  const columnExists = columns.some(
    (column) => column.props('field') === 'Resting time (Assignee)'
  );

  expect(columnExists).toBe(true);
});
