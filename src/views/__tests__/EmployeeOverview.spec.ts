import { mount, VueWrapper } from '@vue/test-utils';
import PrimeVue from 'primevue/config';
import Card from 'primevue/card';
import Divider from 'primevue/divider';
import { createPinia } from 'pinia';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import {
  devStatusList,
  nonDisplayedStatusList,
  planningStatusList,
  testingStatusList,
} from '../../assets/__mockdata__/mockDataComposer';
import EmployeeOverview from '../EmployeeOverview.vue';

const pinia = createPinia();
describe('EmployeeOverview with a simple manual constructed map should render correctly', () => {
  // when
  const wrapper = mount(EmployeeOverview, {
    global: {
      plugins: [PrimeVue, pinia],
      components: {
        Card,
        Divider,
      },

      stubs: {
        teleport: false,
      },
    },
  });

  const openBoxes = wrapper.findAll('.first-bar');
  const inProgressBoxes = wrapper.findAll('.second-bar');
  const closedBoxes = wrapper.findAll('.third-bar');
  // TODO Test dosent test the right thing
  test('Component should include the Name John Doe', () => {
    expect(wrapper.text()).toContain('JOHN DOE');
  });

  test('all Boxes exists exactly one time', () => {
    expect(openBoxes[0].exists()).toBe(true);
    expect(inProgressBoxes[0].exists()).toBe(true);
    expect(closedBoxes[0].exists()).toBe(true);
    expect(openBoxes.length).toBe(18);
    expect(inProgressBoxes.length).toBe(18);
    expect(closedBoxes.length).toBe(18);
  });
});

describe('EmployeeOverview with a simple manual constructed map should render correctly', () => {
  const wrapper = mount(EmployeeOverview, {
    global: {
      plugins: [PrimeVue, pinia],
      components: {
        Card,
        Divider,
      },

      stubs: {
        teleport: false,
      },
    },
  });

  test('it mounts', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.dropdown-container').isVisible()).toBe(true);
    expect(wrapper.isVisible()).toBe(true);
  });
  test('all strings in the filter dropdown are rendered', async () => {
    const menu = wrapper.find('.dropdown-menu');
    expect(menu.attributes('style')).toBe('display: none;');

    // Open the dropdown
    const dropdownButton = wrapper.find('.dropdown-button');

    const spyButton = vi.spyOn(dropdownButton, 'trigger');
    // Get all the options in the dropdown
    await dropdownButton.trigger('click');
    expect(spyButton).toHaveBeenCalledOnce();

    expect(menu.attributes('style')).not.toBe('display: none;');
    const dropdownOptions = wrapper.findAll('.dropdown-menu li');
    // Extract the text of each option
    const optionTexts = dropdownOptions.map((option) => option.text());

    // Define the expected options based on the mock data
    const expectedOptions = [
      ...planningStatusList,
      ...devStatusList,
      ...testingStatusList,
      ...nonDisplayedStatusList,
    ];
    expectedOptions.forEach((status) => {
      expect(optionTexts.includes(status)).toBe(true);
    });
  });
});
describe('Employee View has correct Project Dropdown Menu', () => {
  const wrapper = mount(EmployeeOverview, {
    global: {
      plugins: [PrimeVue, pinia],
      components: {
        Card,
        Divider,
      },

      stubs: {
        teleport: false,
      },
    },
  });

  test('it renders the dropdown container correctly', () => {
    const dropdownContainer = wrapper.findAll('.dropdown-container');

    // Assert the dropdown container exists
    expect(dropdownContainer[2].exists()).toBe(true);

    // Assert the label is rendered correctly
    const label = dropdownContainer[2].find('label');
    expect(label.text()).toBe('Select Projects:');

    // Assert the dropdown button is rendered correctly
    const dropdownButton = dropdownContainer[2].find('.dropdown-button');
    expect(dropdownButton.text()).toBe('6 Selected');

    // Assert the dropdown menu is initially hidden
    const dropdownMenu = dropdownContainer[2].find('.dropdown-menu');
    expect(dropdownMenu.isVisible()).toBe(false);
    expect(dropdownMenu.attributes('style')).toBe('display: none;');
  });

  test('it opens the dropdown menu on button click', async () => {
    const dropdownContainer = wrapper.findAll('.dropdown-container');
    const dropdownButton = dropdownContainer[2].find('.dropdown-button');
    const dropdownMenu = dropdownContainer[2].find('.dropdown-menu');
    expect(dropdownMenu.attributes('style')).toBe('display: none;');
    // Click the dropdown button
    await dropdownButton.trigger('click');

    expect(dropdownMenu.attributes('style')).not.toBe('display: none;');
  });
});

describe('Employee View update the filter when the checkboxes are clicked', () => {
  let wrapper: VueWrapper;
  beforeEach(() => {
    wrapper = mount(EmployeeOverview, {
      global: {
        plugins: [PrimeVue, pinia],
        components: {
          Card,
          Divider,
        },

        stubs: {
          teleport: false,
        },
      },
    });
  });

  test('it renders the dropdown container correctly', () => {
    const dropdownContainer = wrapper.findAll('.dropdown-container');

    // Assert the dropdown container exists
    expect(dropdownContainer[2].exists()).toBe(true);

    // Assert the label is rendered correctly
    const label = dropdownContainer[2].find('label');
    expect(label.text()).toBe('Select Projects:');

    // Assert the dropdown button is rendered correctly
    const dropdownButton = dropdownContainer[2].find('.dropdown-button');
    expect(dropdownButton.text()).toBe('6 Selected');

    // Assert the dropdown menu is initially hidden
    const dropdownMenu = dropdownContainer[2].find('.dropdown-menu');
    expect(dropdownMenu.isVisible()).toBe(false);
    expect(dropdownMenu.attributes('style')).toBe('display: none;');
  });

  test('it opens the dropdown menu on button click', async () => {
    const dropdownContainer = wrapper.findAll('.dropdown-container');
    const dropdownButton = dropdownContainer[2].find('.dropdown-button');
    const dropdownMenu = dropdownContainer[2].find('.dropdown-menu');
    expect(dropdownMenu.attributes('style')).toBe('display: none;');
    // Click the dropdown button
    await dropdownButton.trigger('click');

    // Assert the dropdown menu is visible
    expect(dropdownMenu.attributes('style')).not.toBe('display: none;');
  });

  test('it updates the selected projects when checkbox is changed', async () => {
    const checkboxes = wrapper.findAll('input[type="checkbox"]');
    // Check the checkbox
    const dropdownContainer = wrapper.findAll('.dropdown-container');
    const dropdownMenu = dropdownContainer[2].find('.dropdown-menu');
    expect(dropdownMenu.attributes('style')).toBe('display: none;');
    const dropdownButton = dropdownContainer[2].find('.dropdown-button');
    expect(dropdownButton.text()).toBe('6 Selected');

    expect(wrapper.text()).toContain('JOHN DOE');

    // Click the dropdown button
    await dropdownButton.trigger('click');
    expect(dropdownMenu.attributes('style')).not.toBe('display: none;');
    await checkboxes[7].setValue(false); // Index 7 corresponds to the first project checkbox
    expect(dropdownButton.text()).toBe('5 Selected');
    await checkboxes[7].setValue(true);
    expect(dropdownButton.text()).toBe('6 Selected');
    await checkboxes[7].setValue(false);
    await checkboxes[8].setValue(false);
    await checkboxes[9].setValue(false);
    await checkboxes[10].setValue(false);
    await checkboxes[11].setValue(false);
    await checkboxes[12].setValue(false);
    await dropdownButton.trigger('click');
    expect(dropdownMenu.attributes('style')).toBe('display: none;');
    expect(dropdownButton.text()).toBe('0 Selected');
    expect(wrapper.text()).not.toContain('JOHN DOE');
  });
  // Add more test cases as needed for other functionality
});
