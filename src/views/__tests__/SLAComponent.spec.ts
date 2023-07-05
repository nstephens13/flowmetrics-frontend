import { describe, expect, test, vi, afterEach } from 'vitest';
import { createPinia } from 'pinia';
import { mount } from '@vue/test-utils';
import PrimeVue from 'primevue/config';
import Card from 'primevue/card';
import Dropdown from 'primevue/dropdown';
import Divider from 'primevue/divider';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import router from '../../router';
import SLAComponent from '../SLAComponent.vue';

/* Basic test to ensure, that SLA Component is successfully rendered without any errors */
describe('SLAComponent', () => {
  test('Should render component', () => {
    const pinia = createPinia();
    const wrapper = mount(SLAComponent, {
      global: {
        plugins: [PrimeVue, router, pinia],
        components: {
          InputText,
          Dropdown,
          Card,
          Button,
          Column,
          DataTable,
          Divider,
        },
      },
    });
    expect(wrapper.exists()).toBe(true);
  });
});

describe('SLA Component should delete and add categories, and create new rules and subscribers', () => {
  let pinia = createPinia();
  let wrapper = mount(SLAComponent, {
    global: {
      plugins: [PrimeVue, router, pinia],
      components: {
        InputText,
        Dropdown,
        Card,
        Button,
        Column,
        DataTable,
        Divider,
      },
    },
  });
  afterEach(() => {
    pinia = createPinia();
    wrapper = mount(SLAComponent, {
      global: {
        plugins: [PrimeVue, router, pinia],
        components: {
          InputText,
          Dropdown,
          Card,
          Button,
          Column,
          DataTable,
          Divider,
        },
      },
    });
  });

  test('it mounts', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.isVisible()).toBe(true);
    expect(wrapper.find('.subscriber-container').isVisible()).toBe(true);
    expect(wrapper.find('.rule-container').isVisible()).toBe(true);
    expect(wrapper.find('.category-container').isVisible()).toBe(true);
    expect(wrapper.getComponent(DataTable).isVisible()).toBe(true);
  });
  test('all strings in the filter dropdown are rendered', async () => {
    const dropdownButton = wrapper.find('.p-button-danger');
    const spyButton = vi.spyOn(dropdownButton, 'trigger');
    // Get all the options in the dropdown
    await dropdownButton.trigger('click');
    expect(spyButton).toHaveBeenCalledOnce();
  });
  test('deleteCategory method is called with the correct rowData when the delete button is clicked', async () => {
    // Spy on the deleteCategory method
    const deleteCategorySpy = vi.spyOn(wrapper.vm, 'deleteCategory');

    // Find the delete button and trigger the click event
    const deleteButton = wrapper.find('.p-button-danger');
    await deleteButton.trigger('click');

    // Assert that deleteCategory was called with the correct rowData
    expect(deleteCategorySpy).toHaveBeenCalledWith({
      id: 1,
      name: 'savedConfig_1',
      rule: {
        durationInDays: null,
        expirationDate: new Date('2023-07-17'),
        id: 2,
        maxAssignedEmployees: 4,
        name: 'Pre-Config 2',
      },
      subscriber: {
        description: 'Description 2',
        id: 2,
        name: 'Customer 2',
      },
    });

    // Restore the original deleteCategory method
    deleteCategorySpy.mockRestore();
  });

  test('should add a new subscriber when addSubscriber is called', async () => {
    const addSubscriberButton = wrapper.find('.add-subscriber');
    const inputSubscriber = wrapper.find('.enter-subscriber');

    await inputSubscriber.setValue('New Subscriber');
    await addSubscriberButton.trigger('click');

    expect(wrapper.vm.newSubscriber).toBe('');
    expect(wrapper.vm.subscriber).toEqual([
      { id: 1, name: 'Customer 1', description: 'Description 1' },
      { id: 2, name: 'Customer 2', description: 'Description 2' },
      { id: 3, name: 'Customer 3', description: 'Description 3' },
      { id: 4, name: 'New Subscriber', description: null },
    ]);
  });

  test('should add a new rule when addRule is called', async () => {
    const addRuleButton = wrapper.find('.add-rule');
    const inputRuleName = wrapper.find('.enter-rule'); // Update this line
    const selectEmployeesDropdown = wrapper.getComponent(Dropdown);

    await inputRuleName.setValue('New Rule');
    await selectEmployeesDropdown.vm.$emit('update:modelValue', 3);
    await addRuleButton.trigger('click');

    expect(wrapper.vm.newRuleName).toBe('');
    expect(wrapper.vm.newRuleMaxAssignedEmployees).toBe(null);

    expect(wrapper.vm.rules).toEqual([
      {
        id: 1,
        name: 'Pre-Config 1',
        durationInDays: 3,
        expirationDate: null,
        occurredIn: null,
      },
      {
        id: 2,
        name: 'Pre-Config 2',
        durationInDays: null,
        expirationDate: new Date('2023-07-17'),
        maxAssignedEmployees: 4,
        occurredIn: null,
      },
      {
        id: 3,
        name: 'Pre-Config 3',
        durationInDays: 7,
        expirationDate: new Date('2023-12-19'),
        maxAssignedEmployees: 7,
        occurredIn: null,
      },
      {
        id: 4,
        name: 'New Rule',
        durationInDays: null,
        expirationDate: null,
        maxAssignedEmployees: 3,
        occurredIn: null,
      },
    ]);
  });
  test('should add a new category when createCategory is called with valid inputs', async () => {
    const dropdowns = wrapper.findAllComponents(Dropdown);
    const selectSubscriber = dropdowns[2];
    const selectRule = dropdowns[3];
    const createCategoryButton = wrapper.find('.add-category');
    const inputCategoryName = wrapper.find('.enter-category');
    // Set the selected subscriber and rule
    await selectSubscriber.setValue({ id: 7, name: 'Subscriber 7' });
    await selectRule.setValue({ id: 7, name: 'Rule 7' });

    // Set the category name
    await inputCategoryName.setValue('New Category');

    // Trigger the createCategory method
    await createCategoryButton.trigger('click');

    // Assert the changes in the component's data and store
    expect(wrapper.vm.selectedSubscriber).toBe(null);
    expect(wrapper.vm.selectedRule).toBe(null);
    expect(wrapper.vm.categoryName).toBe('');

    expect(wrapper.vm.categories).toEqual([
      {
        id: 1,
        name: 'savedConfig_1',
        rule: {
          durationInDays: null,
          expirationDate: new Date('2023-07-17'),
          id: 2,
          maxAssignedEmployees: 4,
          name: 'Pre-Config 2',
          occurredIn: null,
        },
        subscriber: {
          description: 'Description 2',
          id: 2,
          name: 'Customer 2',
        },
      },
      {
        id: 2,
        name: 'savedConfig_2',
        rule: {
          durationInDays: 7,
          expirationDate: new Date('2023-12-19'),
          id: 3,
          maxAssignedEmployees: 7,
          name: 'Pre-Config 3',
          occurredIn: null,
        },
        subscriber: {
          description: 'Description 3',
          id: 3,
          name: 'Customer 3',
        },
      },
      {
        id: 3,
        name: 'savedConfig_3',
        rule: {
          durationInDays: 3,
          expirationDate: null,
          id: 1,
          name: 'Pre-Config 1',
          occurredIn: null,
        },
        subscriber: {
          description: 'Description 1',
          id: 1,
          name: 'Customer 1',
        },
      },
      {
        id: 4,
        name: 'savedConfig_4',
        rule: {
          durationInDays: null,
          expirationDate: new Date('2023-07-17'),
          id: 2,
          maxAssignedEmployees: 4,
          name: 'Pre-Config 2',
          occurredIn: null,
        },
        subscriber: {
          description: 'Description 2',
          id: 2,
          name: 'Customer 2',
        },
      },
      {
        id: 5,
        name: 'savedConfig_5',
        rule: {
          durationInDays: 7,
          expirationDate: new Date('2023-12-19'),
          id: 3,
          maxAssignedEmployees: 7,
          name: 'Pre-Config 3',
          occurredIn: null,
        },
        subscriber: {
          description: 'Description 3',
          id: 3,
          name: 'Customer 3',
        },
      },
      {
        id: 6,
        name: 'New Category',
        rule: {
          id: 7,
          name: 'Rule 7',
        },
        subscriber: {
          id: 7,
          name: 'Subscriber 7',
        },
      },
    ]);
  });
});
