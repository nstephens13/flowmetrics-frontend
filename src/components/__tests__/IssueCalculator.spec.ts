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

describe('Project Overview should load all the Components', () => {
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

  test('it mounts', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.getComponent(Dropdown).isVisible()).toBe(true);
    expect(wrapper.getComponent(Card).isVisible()).toBe(true);
    expect(wrapper.getComponent(Panel).isVisible()).toBe(true);
    expect(wrapper.getComponent(CircularProgressBar).isVisible()).toBe(true);
  });

  test('Should contain three Circular ProgressBars', () => {
    const circularProgressBars = wrapper.findAllComponents(CircularProgressBar);
    expect(circularProgressBars.length).toEqual(3);
  });

  test('Circular Progressbar Default Max', () => {
    const circularProgressBars = wrapper.findAllComponents(CircularProgressBar);
    // check if on every element of circularProgressBars the max is 100
    circularProgressBars.forEach((element) => {
      expect(element.props('max')).toEqual(100);
    });
  });

  test('Dropdown Selection should contain all projects', () => {
    wrapper
      .getComponent(Dropdown)
      .trigger('click')
      .then(() => {
        const dropdownOptions = wrapper.getComponent(Dropdown).props('options');
        expect(dropdownOptions.length).toEqual(2);
      });
  });
});
