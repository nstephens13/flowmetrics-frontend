import { mount } from '@vue/test-utils';
import { describe, expect } from 'vitest';
import PrimeVue from 'primevue/config';

import Card from 'primevue/card';
import Chart from 'primevue/chart';
import MultiSelect from 'primevue/multiselect';
import BarDiagram from '../BarDiagram.vue';

import type { ProjectIF } from '@/model/ProjectIF';
import router from '@/router/index';

const project1: ProjectIF = {
  id: 123456,
  name: 'Test Project 1',
  description: 'Description of Test Project 1',
  slaSubscriber: null,
  issues: [
    {
      id: 1,
      name: 'Issue 1',
      description: 'Description of Issue 1',
      assignedTo: null,
      createdBy: null,
      createdAt: new Date(),
      closedAt: null,
      dueTo: null,
      status: 'open',
      assigneeRestingTime: null,
      statusRestingTime: null,
      statusChanges: null,
      assigneeChanges: null,
      assignedSlaRule: null,
      state: 'planning',
    },
    {
      id: 234567,
      name: 'Issue 2',
      description: 'Description of Issue 2',
      assignedTo: null,
      createdBy: null,
      createdAt: new Date(),
      closedAt: null,
      dueTo: null,
      status: 'in work',
      assigneeRestingTime: null,
      statusRestingTime: null,
      statusChanges: null,
      assigneeChanges: null,
      assignedSlaRule: null,
      state: 'development',
    },
    {
      id: 345678,
      name: 'Issue 3',
      description: 'Description of Issue 3',
      assignedTo: null,
      createdBy: null,
      createdAt: new Date(),
      closedAt: null,
      dueTo: null,
      status: 'unit test',
      assigneeRestingTime: null,
      statusRestingTime: null,
      statusChanges: null,
      assigneeChanges: null,
      assignedSlaRule: null,
      state: 'testing',
    },
    {
      id: 456789,
      name: 'Issue 4',
      description: 'Description of Issue 4',
      assignedTo: null,
      createdBy: null,
      createdAt: new Date(),
      closedAt: null,
      dueTo: null,
      status: 'e2e',
      assigneeRestingTime: null,
      statusRestingTime: null,
      statusChanges: null,
      assigneeChanges: null,
      assignedSlaRule: null,
      state: 'testing',
    },
  ],
};

describe('BarDiagram should load all the Components', () => {
  const wrapper = mount(BarDiagram, {
    global: {
      plugins: [PrimeVue, router],
      components: {
        Card,
        MultiSelect,
        Chart,
      },
    },
    propsData: {
      project: project1,
    },
  });

  test('it mounts', () => {
    expect(wrapper.exists()).toBe(true);
    const card = wrapper.findComponent('.visualisation-card');
    const chart = card.findComponent(Chart);
    expect(card.exists()).toBe(true);
    expect(chart.exists()).toBe(true);
  });
  test('it has a chart', () => {
    const card = wrapper.findComponent(Card);
    const chart = card.findComponent(Chart);
    expect(chart.props('type')).toBe('bar');
  });
});
