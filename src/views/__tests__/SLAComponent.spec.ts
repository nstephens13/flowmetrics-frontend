import { describe, expect, test, vi } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import { mount } from '@vue/test-utils';
import InputText from 'primevue/inputtext';
import PrimeVue from 'primevue/config';
import Dropdown from 'primevue/dropdown';
import Card from 'primevue/card';
import Button from 'primevue/button';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import Divider from 'primevue/divider';
import SLAComponent from '@/views/SLAComponent.vue';
import router from '@/router';

/* Basic test to ensure, that SLA Component is successfully rendered without any errors */
describe('SLAComponent', () => {
  const pinia = createTestingPinia({ stubActions: false });
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

  test('Should render component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  test('renders the component', () => {
    expect(wrapper.exists()).toBe(true);
  });

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
      id: 4,
      name: 'John',
    });
  });

  test('adds a rule', async () => {
    const ruleInput = wrapper.find('.enter-rule');
    const addButton = wrapper.find('.add-rule');

    await ruleInput.setValue('Rule 1');
    await addButton.trigger('click');

    const selectRuleDropDown = wrapper
      .findAllComponents(Dropdown)
      .find((dropdown) => dropdown.classes('select-rule'));

    expect(selectRuleDropDown?.props('options')).toContainEqual({
      durationInDays: null,
      expirationDate: null,
      id: 4,
      maxAssignedEmployees: undefined,
      name: 'Rule 1',
    });
  });

  test('does not add a subscriber with less than 3 characters', async () => {
    const subscriberInput = wrapper.find('.enter-subscriber');
    const addButton = wrapper.find('.add-subscriber');

    await subscriberInput.setValue('Jo');
    await addButton.trigger('click');

    const addedSubscriber = wrapper.find('.subscriber-container .subscriber');
    expect(addedSubscriber.exists()).toBe(false);

    const errorMessage = wrapper.find('.subscriber-container .error-message');
    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toBe('Subscriber name must be at least 3 characters.');
  });

  test('does not add a rule with less than 3 characters', async () => {
    const ruleInput = wrapper.find('.enter-rule');
    const addButton = wrapper.find('.add-rule');

    await ruleInput.setValue('Ru');
    await addButton.trigger('click');

    const addedRule = wrapper.find('.rule-container .rule');
    expect(addedRule.exists()).toBe(false);

    const errorMessage = wrapper.find('.rule-container .error-message');
    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toBe('Rule name must be at least 3 characters.');
  });

  test('creates a category', async () => {
    // Mock the options for the subscriber and rule dropdowns
    wrapper.setData({
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

    selectSubscriberDropDown?.setValue('Subscriber 1');
    selectRuleDropDown?.setValue('Rule 1');
    categoryInput?.setValue('Category 1');
    addButton?.trigger('click').finally(() => {
      const dataTableElementSize = wrapper.getComponent(DataTable).findAll('tr').length;
      expect(7).toEqual(dataTableElementSize);
      const datatableElements = wrapper.getComponent(DataTable).findAll('tr');
      expect('Category 1').toEqual(
        datatableElements[datatableElements.length - 1].findAll('td')[0].text()
      );
    });
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

    await selectSubscriberDropDown?.setValue('Subscriber 1');
    await selectRuleDropDown?.setValue('Rule 1');
    await categoryInput?.setValue('Ca');
    await addButton?.trigger('click');

    const addedCategory = wrapper.find('.category-container .category');
    expect(addedCategory.exists()).toBe(false);

    const errorMessage = wrapper.find('.category-container .error-message');
    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toBe('Category name must be at least 3 characters.');
  });

  test('deletes a category', async () => {
    // Mock the categories data
    wrapper.setData({
      categories: [
        { name: 'Category 1', id: 1 },
        { name: 'Category 2', id: 2 },
      ],
    });

    const deleteButton = wrapper.findAll('.p-button-danger')[0];
    await deleteButton.trigger('click');
    const deletedCategory = wrapper.find('.category-container .category');
    expect(deletedCategory.exists()).toBe(false);
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
});
