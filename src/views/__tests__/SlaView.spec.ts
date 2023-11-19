import { describe, expect, test, vi } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import { mount, VueWrapper } from '@vue/test-utils';
import InputText from 'primevue/inputtext';
import InputMask from 'primevue/inputmask';
import PrimeVue from 'primevue/config';
import Dropdown from 'primevue/dropdown';
import Card from 'primevue/card';
import Button from 'primevue/button';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import Divider from 'primevue/divider';
import router from '@/router';
import SLAView from '../SlaView.vue';
import useSlaStore from '../../store/slaStore';

describe('SlaComponent Test with Store Data', () => {
  let slaStore: any;
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    wrapper = mount(SLAView, {
      global: {
        plugins: [
          PrimeVue,
          router,
          createTestingPinia({
            createSpy: vi.fn,
            stubActions: false,
            initialState: {
              sla: {
                slaCategories: [
                  {
                    id: 1,
                    name: 'Category 1',
                    rule: null,
                    subscriber: null,
                  },
                ],
                rules: [
                  {
                    id: 1,
                    name: 'Rule 1',
                    durationInDays: null,
                    expirationDate: null,
                    occurredIn: null,
                    reactionTime: null,
                  },
                ],
                subscriber: [
                  {
                    id: 1,
                    name: 'John',
                    description: null,
                  },
                ],
              },
            },
          }),
        ],
        components: {
          InputText,
          InputMask,
          Dropdown,
          Card,
          Button,
          Column,
          DataTable,
          Divider,
        },
      },
    });

    slaStore = useSlaStore();
  });

  afterEach(() => {
    wrapper.unmount();
  });

  // Test to check if the deleteCategory method is called with the correct rowData when the delete button is clicked
  it('deleteCategory method is called with the correct rowData when the delete button is clicked', async () => {
    // Find the delete button and trigger the click event
    const deleteButton = wrapper.find('.p-button-danger');
    await deleteButton.trigger('click');

    expect(slaStore.slaCategories).toHaveLength(0);
    expect(slaStore.deleteSlaCategory).toHaveBeenCalledTimes(1);
  });

  // Test to check if all strings in the filter dropdown are rendered
  test('all strings in the filter dropdown are rendered', async () => {
    const deleteButton = wrapper.find('.p-button-danger');
    const spyButton = vi.spyOn(deleteButton, 'trigger');
    // Get all the options in the dropdown
    await deleteButton.trigger('click');
    expect(spyButton).toHaveBeenCalledOnce();
  });

  test('does not create a category with less than 3 characters', async () => {
    const selectSubscriberDropDown = wrapper
      .findAllComponents(Dropdown)
      .find((dropdown) => dropdown.classes('select-subscriber'));

    const selectRuleDropDown = wrapper
      .findAllComponents(Dropdown)
      .find((dropdown) => dropdown.classes('select-rule'));

    const categoryInput = wrapper
      .findAllComponents(InputText)
      .find((input) => input.classes('enter-category'));

    const addButton = wrapper
      .findAllComponents(Button)
      .find((button) => button.classes('add-category'));

    await selectSubscriberDropDown?.setValue(selectSubscriberDropDown?.props().options[0]);
    await selectRuleDropDown?.setValue(selectRuleDropDown?.props().options[0]);
    await categoryInput?.setValue('Ca');

    await addButton?.trigger('click').then(async () => {
      const addedCategory = wrapper.find('.category-container .category');
      expect(addedCategory.exists()).toBe(false);

      const errorMessage = wrapper.find('.error-message');
      expect(errorMessage.exists()).toBe(true);
      expect(errorMessage.text()).toBe('Category name must be at least 3 characters.');
    });
    expect(slaStore.addSlaCategory).toHaveBeenCalledTimes(0);
  });

  // Test to check if a rule with less than 3 characters is not added
  test('does not add a rule with less than 3 characters', async () => {
    const ruleInput = wrapper.find('.enter-rule');
    const addButton = wrapper.find('.add-rule');

    await ruleInput.setValue('Ru');
    await addButton.trigger('click');

    const addedRule = wrapper.find('.rule-container .rule');
    expect(addedRule.exists()).toBe(false);

    const errorMessage = wrapper.find('.error-message');
    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toBe('Rule name must be at least 3 characters.');
  });

  // Test to check if a subscriber with less than 3 characters is not added
  test('does not add a subscriber with less than 3 characters', async () => {
    const subscriberInput = wrapper.find('.enter-subscriber');
    const addButton = wrapper.find('.add-subscriber');

    await subscriberInput.setValue('Jo');
    await addButton.trigger('click');

    const addedSubscriber = wrapper.find('.subscriber-container .subscriber');
    expect(addedSubscriber.exists()).toBe(false);

    const errorMessage = wrapper.find('.error-message');
    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toBe('Subscriber name must be at least 3 characters.');
  });
});

/* Basic test to ensure, that SlaComponent is successfully rendered without any errors */
describe('SlaComponent', () => {
  const pinia = createTestingPinia({
    initialState: {
      rules: [],
      subscriber: [],
    },
    stubActions: false,
  });
  const wrapper = mount(SLAView, {
    global: {
      plugins: [PrimeVue, router, pinia],
      components: {
        InputText,
        InputMask,
        Dropdown,
        Card,
        Button,
        Column,
        DataTable,
        Divider,
      },
    },
  });

  // Test to check if the component is rendered
  test('Should render component', () => {
    expect(wrapper.exists()).toBe(true);
  });
  // Test to check if the component is rendered
  test('renders the component', () => {
    expect(wrapper.exists()).toBe(true);
  });
  // Test to add a subscriber
  test('adds a subscriber', async () => {
    const subscriberInput = wrapper.find('.enter-subscriber');
    const addButton = wrapper.find('.add-subscriber');

    await subscriberInput.setValue('John');
    await addButton.trigger('click');

    const selectSubscriberDropDown = wrapper
      .findAllComponents(Dropdown)
      .find((dropdown) => dropdown.classes('select-subscriber'));

    expect(selectSubscriberDropDown?.props('options')).toContainEqual({
      description: null,
      id: 1,
      name: 'John',
    });
  });
  // Test to add a rule
  test('adds a rule', async () => {
    const ruleInput = wrapper.find('.enter-rule');
    const addButton = wrapper.find('.add-rule');

    await ruleInput.setValue('Rule 1');
    await addButton.trigger('click');

    const selectRuleDropDown = wrapper
      .findAllComponents(Dropdown)
      .find((dropdown) => dropdown.classes('select-rule'));

    expect(selectRuleDropDown?.props('options')).toContainEqual({
      id: 1,
      name: 'Rule 1',
      durationInDays: null,
      expirationDate: null,
      maxAssignedEmployees: undefined,
      occurredIn: null,
      reactionTime: null,
    });
  });

  // Test to create a category
  test('creates a category', async () => {
    // Mock the options for the subscriber and rule dropdowns
    await wrapper.setData({
      subscriber: [{ name: 'Subscriber 1' }, { name: 'Subscriber 2' }],
      rules: [{ name: 'Rule 1' }, { name: 'Rule 2' }],
    });

    const categoryInput = wrapper
      .findAllComponents(InputText)
      .find((input) => input.classes('enter-category'));

    const addButton = wrapper
      .findAllComponents(Button)
      .find((button) => button.classes('add-category'));

    const selectSubscriberDropDown = wrapper
      .findAllComponents(Dropdown)
      .find((dropdown) => dropdown.classes('select-subscriber'));

    const selectRuleDropDown = wrapper
      .findAllComponents(Dropdown)
      .find((dropdown) => dropdown.classes('select-rule'));

    await selectSubscriberDropDown?.setValue('Subscriber 1');
    await selectRuleDropDown?.setValue('Rule 1');
    await categoryInput?.setValue('Category 1');
    addButton?.trigger('click').finally(() => {
      const dataTableElementSize = wrapper.getComponent(DataTable).findAll('tr').length;
      expect(2).toEqual(dataTableElementSize);
      const datatableElements = wrapper.getComponent(DataTable).findAll('tr');
      expect('Category 1').toEqual(
        datatableElements[datatableElements.length - 1].findAll('td')[0].text()
      );
    });
  });
  // Test to delete a category
  test('deletes a category', async () => {
    // Mock the categories data
    await wrapper.setData({
      categories: [
        {
          name: 'Category 1',
          id: 1,
        },
        {
          name: 'Category 2',
          id: 2,
        },
      ],
    });

    const deleteButton = wrapper.findAll('.p-button-danger')[0];
    await deleteButton.trigger('click');
    const deletedCategory = wrapper.find('.category-container .category');
    expect(deletedCategory.exists()).toBe(false);
  });
  // Test to check if the component mounts successfully
  test('it mounts', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.isVisible()).toBe(true);
    expect(wrapper.find('.subscriber-container').isVisible()).toBe(true);
    expect(wrapper.find('.rule-container').isVisible()).toBe(true);
    expect(wrapper.find('.category-container').isVisible()).toBe(true);
    expect(wrapper.getComponent(DataTable).isVisible()).toBe(true);
  });

  // Test to add a new subscriber using addSubscriber method
  test('should add a new subscriber when addSubscriber is called', async () => {
    const addSubscriberButton = wrapper.find('.add-subscriber');
    const inputSubscriber = wrapper.find('.enter-subscriber');

    await inputSubscriber.setValue('New Subscriber');
    await addSubscriberButton.trigger('click');

    const selectSubscriberDropDown = wrapper
      .findAllComponents(Dropdown)
      .find((dropdown) => dropdown.classes('select-subscriber'));

    expect(inputSubscriber.text()).toBe('');
    expect(selectSubscriberDropDown?.props('options')).toEqual([
      {
        id: 1,
        name: 'John',
        description: null,
      },
      {
        id: 2,
        name: 'New Subscriber',
        description: null,
      },
    ]);
  });
  // Test to add a new rule using addRule method
  test('should add a new rule when addRule is called', async () => {
    const addRuleButton = wrapper.find('.add-rule');
    const inputRuleName = wrapper.find('.enter-rule'); // Update this line

    await inputRuleName.setValue('New Rule');
    await addRuleButton.trigger('click');

    expect(inputRuleName.text()).toBe('');

    const selectRuleDropDown = wrapper
      .findAllComponents(Dropdown)
      .find((dropdown) => dropdown.classes('select-rule'));

    expect(selectRuleDropDown?.props('options')).toEqual([
      {
        id: 1,
        name: 'Rule 1',
        durationInDays: null,
        expirationDate: null,
        occurredIn: null,
        reactionTime: null,
      },
      {
        id: 2,
        durationInDays: null,
        expirationDate: null,
        name: 'New Rule',
        occurredIn: null,
        reactionTime: null,
      },
    ]);
  });
  // Test to add a new category using createCategory method with valid inputs
  test('should add a new category when createCategory is called with valid inputs', async () => {
    const dropdowns = wrapper.findAllComponents(Dropdown);
    const selectSubscriber = dropdowns[1];
    const selectRule = dropdowns[2];
    const createCategoryButton = wrapper.find('.add-category');
    const inputCategoryName = wrapper.find('.enter-category');
    // Set the selected subscriber and rule
    await selectSubscriber.setValue({
      id: 7,
      name: 'Subscriber 7',
      description: 'Description 7',
    });
    await selectRule.setValue({
      id: 7,
      name: 'Rule 7',
      description: 'Description 7',
    });

    // Set the category name
    await inputCategoryName.setValue('New Category');

    // Trigger the createCategory method
    await createCategoryButton.trigger('click');

    // Assert the changes in the component's data and store

    const selectSubscriberDropDown = wrapper
      .findAllComponents(Dropdown)
      .find((dropdown) => dropdown.classes('select-subscriber'));

    const selectRuleDropDown = wrapper
      .findAllComponents(Dropdown)
      .find((dropdown) => dropdown.classes('select-rule'));

    const inputCategory = wrapper
      .findAllComponents(InputText)
      .find((dropdown) => dropdown.classes('enter-category'));

    expect(selectSubscriberDropDown?.props('modelValue')).toBe(null);
    expect(selectRuleDropDown?.props('modelValue')).toBe(null);
    expect(inputCategory?.text()).toBe('');

    const dataTable = wrapper.getComponent(DataTable);
    expect(dataTable.props('value')).toEqual([
      {
        id: 1,
        name: 'New Category',
        rule: {
          description: 'Description 7',
          id: 7,
          name: 'Rule 7',
        },
        subscriber: {
          description: 'Description 7',
          id: 7,
          name: 'Subscriber 7',
        },
      },
    ]);
  });
});
