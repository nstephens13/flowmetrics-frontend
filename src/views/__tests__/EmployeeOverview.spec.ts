import { describe, test, expect } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import PrimeVue from 'primevue/config';
import Card from 'primevue/card';
import { createPinia } from 'pinia';

import EmployeeOverview from '../EmployeeOverview.vue';
import {
  devStatusList,
  nonDisplayedStatusList,
  planningStatusList,
  testingStatusList,
} from '../../assets/__mockdata__/mockDataComposer';

const pinia = createPinia();
describe('EmployeeOverview with a simple manual constructed map should render correctly', () => {
  // when
  const wrapper = mount(EmployeeOverview, {
    global: {
      plugins: [PrimeVue, pinia],
      components: {
        Card,
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
    expect(openBoxes.length).toBe(13);
    expect(inProgressBoxes.length).toBe(13);
    expect(closedBoxes.length).toBe(13);
  });
});

describe('EmployeeOverview with a simple manual constructed map should render correctly', () => {
  const wrapper: VueWrapper = mount(EmployeeOverview, {
    global: {
      plugins: [PrimeVue, pinia],
      components: {
        Card,
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
    // Open the dropdown
    const dropdownButton = wrapper.find('.dropdown-button');
    await dropdownButton.trigger('click');

    // Get all the options in the dropdown
    const dropdownOptions = wrapper.findAll('.dropdown-menu li');

    // Extract the text of each option
    const optionTexts = dropdownOptions.map((option) => option.text());

    // Define the expected options based on the mock data
    const expectedOptions = [...planningStatusList,
      ...devStatusList, ...testingStatusList, ...nonDisplayedStatusList];

    // Assert that the option texts match the expected options
    expect(optionTexts).toEqual(expectedOptions);
  });
});
