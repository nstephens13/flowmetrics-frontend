import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import PrimeVue from 'primevue/config';
import Card from 'primevue/card';
import DataView from 'primevue/dataview';
import Divider from 'primevue/divider';
import Avatar from 'primevue/avatar';
import MultiSelect from 'primevue/multiselect';
import ProgressBar from 'primevue/progressbar';
import Chip from 'primevue/chip';
import { createTestingPinia } from '@pinia/testing';
import Tooltip from 'primevue/tooltip';
import router from '@/router/index';
import EmployeeOverview from '@/views/EmployeeOverview.vue';
import EmployeeCard from '../../components/EmployeeCard.vue';

// Describe block for the test suite
describe('Employee Overview should load all the Components', () => {
  // Mounting the EmployeeOverview component with necessary configuration
  const wrapper = mount(EmployeeOverview, {
    global: {
      plugins: [
        PrimeVue,
        router,
        createTestingPinia({
          stubActions: false,
          initialState: {
            projects: [],
            filter: {},
          },
        }),
      ],
      components: {
        Card,
        DataView,
        Divider,
        MultiSelect,
        Avatar,
        ProgressBar,
        Chip,
      },
    },
  });

  // Test to check if the component mounts successfully
  test('it mounts', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.findComponent(Card).isVisible()).toBe(true);
    expect(wrapper.findComponent(DataView).isVisible()).toBe(true);
    expect(wrapper.findComponent(Divider).isVisible()).toBe(true);
    expect(wrapper.findComponent(MultiSelect).isVisible()).toBe(true);
  });

  // Test to check the options in the multiselect component
  test('Multiselect should contain no options', () => {
    const multiselects = wrapper.findAllComponents(MultiSelect);
    expect(0).toEqual(multiselects[0].props('options').length);
    expect(0).toEqual(multiselects[1].props('options').length);
  });

  // Test to check the displayed title
  test('displays the correct title', () => {
    const title = wrapper.find('.grid p');
    expect(title.text()).toBe('Employee Overview');
  });
});

describe('Employee Overview should load all the Components 2', () => {
  // Mounting the EmployeeOverview component with necessary configuration
  const wrapper = mount(EmployeeOverview, {
    global: {
      plugins: [
        PrimeVue,
        router,
        createTestingPinia({
          stubActions: false,
          initialState: {
            projects: {
              projects: [
                {
                  id: 0,
                  name: 'Test-Unassigned-Employee',
                  description: '',
                  issues: [
                    {
                      id: 14898,
                      name: 'Issue 1',
                      description: 'This is the first issue',
                      assignedTo: null,
                      createdBy: {
                        id: 1,
                        firstName: 'John',
                        lastName: 'Doe',
                        emailAddress: 'email@email.com',
                        status: 'active',
                        key: 'jdoe',
                      },
                      createdAt: '2023-06-01T00:00:00.000Z',
                      closedAt: null,
                      dueTo: '2023-06-30T00:00:00.000Z',
                      status: 'Open',
                      assigneeRestingTime: null,
                      statusRestingTime: null,
                      statusChanges: null,
                      assigneeChanges: null,
                    },
                    {
                      id: 14898,
                      name: 'Issue 2',
                      description: 'This is the second issue',
                      assignedTo: null,
                      createdBy: {
                        id: 2,
                        firstName: 'John',
                        lastName: 'Doe',
                        emailAddress: 'email@email.com',
                        status: 'active',
                        key: 'jdoe',
                      },
                      createdAt: '2023-06-01T00:00:00.000Z',
                      closedAt: null,
                      dueTo: '2023-06-30T00:00:00.000Z',
                      status: 'Open',
                      assigneeRestingTime: null,
                      statusRestingTime: null,
                      statusChanges: null,
                      assigneeChanges: null,
                    },
                    {
                      id: 14898,
                      name: 'Issue 3',
                      description: 'This is the third issue',
                      assignedTo: null,
                      createdBy: {
                        id: 3,
                        firstName: 'John',
                        lastName: 'Doe',
                        emailAddress: 'email@email.com',
                        status: 'active',
                        key: 'jdoe',
                      },
                      createdAt: '2023-06-01T00:00:00.000Z',
                      closedAt: null,
                      dueTo: '2023-06-30T00:00:00.000Z',
                      status: 'Open',
                      assigneeRestingTime: null,
                      statusRestingTime: null,
                      statusChanges: null,
                      assigneeChanges: null,
                    },
                  ],
                  slaSubscriber: null,
                },
              ],
            },
            filterConfig: {
              filter: {
                id: 1,
                projectFilter: {
                  projectsWhiteList: [],
                  issueStatusIncludeFilter: 'open',
                },
              },
            },
          },
        }),
      ],
      components: {
        Card,
        DataView,
        Divider,
        MultiSelect,
        Avatar,
        ProgressBar,
        Chip,
        EmployeeCard,
      },
      directives: {
        Tooltip,
      },
    },
  });

  // Test to check if unassigned employee is at the first index
  test('Unassigned employee is displayed at the first index', async () => {
    // Simulate selecting a project and a status
    const projectMultiSelect = wrapper.findComponent(MultiSelect);
    const optionZero = projectMultiSelect.props('options')[0];
    await projectMultiSelect.setValue([optionZero]).then(async () => {
      const statusMultiSelect = wrapper.findAllComponents(MultiSelect)[1];
      const optionOne = statusMultiSelect.props('options')[0];
      await statusMultiSelect.setValue([optionOne]).then(async () => {
        const dataView = wrapper.findComponent(DataView);
        const modelValue = dataView.props('value');
        expect(modelValue[0]).toEqual({
          employee: {
            avatarUrl: 'none',
            emailAddress: '',
            firstName: 'Unassigned',
            id: 0,
            key: 'unassigned',
            lastName: 'Employee',
            status: 'inactive',
          },
          issues: {
            development: 0,
            planning: 3,
            testing: 0,
          },
        });
      });
    });
  });
});
