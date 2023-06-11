import {
  describe, expect, test,
} from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import PrimeVue from 'primevue/config';
import Card from 'primevue/card';
import EmployeeOverview from '../EmployeeOverview.vue';
import type { EmployeeIF } from '../../model/EmployeeIF';
import calculateWorkload from '../../services/workloadCalculator';
import { getMockData } from '../../assets/__mockdata__/mockDataComposer';

function getBoxHeightStyle(count: number) {
  const minHeight = 20; // Minimum height for the box
  const maxHeight = 180; // Maximum height for the box
  const height = Math.min(minHeight + count * 20, maxHeight);
  return height;
}

describe('EmployeeOverview with a simple manual constructed map should render correctly', () => {
  // given
  const employeeMap = new Map();
  employeeMap.set(
    { id: 1, firstName: 'John', lastName: 'Doe' },
    { openIssues: 2, inProgressIssues: 3, closedIssues: 5 },
  );

  // when
  const wrapper: VueWrapper<never> = mount(EmployeeOverview, {
    global: {
      plugins: [PrimeVue],
      components: {
        Card,
      },
    },
    props: {},
    computed: {
      employeeMap(): Map<EmployeeIF, { openIssues: number; inProgressIssues: number; closedIssues: number }> {
        return employeeMap;
      },
      getUserNameBackgroundStyle: EmployeeOverview.computed?.getUserNameBackgroundStyle,
      getBoxHeightStyle: EmployeeOverview.computed?.getBoxHeightStyle,
    },

  });
  const openBoxes = wrapper.findAll('.open');
  const inProgressBoxes = wrapper.findAll('.in-progress');
  const closedBoxes = wrapper.findAll('.closed');

  // then
  test('Component should include the Name John Doe', () => {
    expect(wrapper.text()).toContain('John Doe');
  });

  test('all Boxes exists exactly one time', () => {
    expect(openBoxes[0].exists()).toBe(true);
    expect(inProgressBoxes[0].exists()).toBe(true);
    expect(closedBoxes[0].exists()).toBe(true);
    expect(openBoxes.length).toBe(1);
    expect(inProgressBoxes.length).toBe(1);
    expect(closedBoxes.length).toBe(1);
  });

  test('all Boxes have a correctly calculated height', () => {
    expect(openBoxes[0].attributes('style')).toContain('height: 60px'); // Adjust this value based on your computed style logic
    expect(inProgressBoxes[0].attributes('style')).toContain('height: 80px'); // Adjust this value based on your computed style logic
    expect(closedBoxes[0].attributes('style')).toContain('height: 120px'); // Adjust this value based on your computed style logic
  });
});

describe('EmployeeOverview with mockDataSet 55 should render correctly', () => {
  // given
  const project = getMockData(55);
  const openIssuesList = [0, 1, 0, 0]; // expected values for open issues from json file
  const inProgressIssuesList = [1, 0, 1, 0]; // expected values for in-progress issues from json file
  const closedIssuesList = [0, 1, 2, 1]; // expected values for closed issues from json file

  // when
  const wrapper: VueWrapper<never> = mount(EmployeeOverview, {
    global: {
      plugins: [PrimeVue],
      components: {
        Card,
      },
    },
    props: {},
    computed: {
      employeeMap(): Map<EmployeeIF, { openIssues: number; inProgressIssues: number; closedIssues: number }> {
        const employeeMap = calculateWorkload(project);
        return employeeMap;
      },
      getUserNameBackgroundStyle: EmployeeOverview.computed?.getUserNameBackgroundStyle,
      getBoxHeightStyle: EmployeeOverview.computed?.getBoxHeightStyle,
    },
  });

  const openBoxes = wrapper.findAll('.open');
  const inProgressBoxes = wrapper.findAll('.in-progress');
  const closedBoxes = wrapper.findAll('.closed');

  // then
  test('Component should render all Employee Names', () => {
    expect(wrapper.text()).toContain('John Doe');
    expect(wrapper.text()).toContain('Jane Smith');
    expect(wrapper.text()).toContain('Mike Johnson');
    expect(wrapper.text()).toContain('Max Mustermann');
  });

  // Assert that the boxes are rendered with the correct styles and values

  test('all Boxes exists exactly four times', () => {
    expect(openBoxes.length).toBe(4);
    expect(inProgressBoxes.length).toBe(4);
    expect(closedBoxes.length).toBe(4);
  });

  test('all Boxes have a correctly calculated height', () => {
    openBoxes.forEach((box, index) => {
      expect(box.attributes('style')).toContain(`height: ${getBoxHeightStyle(openIssuesList[index])}px`);
    });
    inProgressBoxes.forEach((box, index) => {
      expect(box.attributes('style')).toContain(`height: ${getBoxHeightStyle(inProgressIssuesList[index])}px`);
    });
    closedBoxes.forEach((box, index) => {
      expect(box.attributes('style')).toContain(`height: ${getBoxHeightStyle(closedIssuesList[index])}px`);
    });
  });
});
