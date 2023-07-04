import {
  describe, expect, it, beforeEach, afterEach,
} from 'vitest';
import { createApp } from 'vue';
import { mount, VueWrapper } from '@vue/test-utils';
import InputText from 'primevue/inputtext';
import PrimeVue from 'primevue/config';
import Dropdown from 'primevue/dropdown';
import Card from 'primevue/card';
import Button from 'primevue/button';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import SLAComponent from '@/views/SLAComponent.vue';
import router from '../../router';

describe('SLAComponent', () => {
  let wrapper: VueWrapper<any>;

  beforeEach(async () => {
    const app = createApp(SLAComponent);
    const wrapper = mount(app, {
      global: {
        plugins: [PrimeVue, router],
        components: {
          InputText,
          Dropdown,
          Card,
          Button,
          Column,
          DataTable,
        },
      },
    });
    await wrapper.vm.$nextTick();
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('adds a subscriber', async () => {
    const subscriberInput = wrapper.find('.enter-subscriber');
    const addButton = wrapper.find('.add-subscriber');

    await subscriberInput.setValue('John');
    await addButton.trigger('click');

    const addedSubscriber = wrapper.find('.subscriber-container .subscriber');
    expect(addedSubscriber.text()).toBe('John');
  });

  it('does not add a subscriber with less than 3 characters', async () => {
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

  it('adds a rule', async () => {
    const ruleInput = wrapper.find('.enter-rule');
    const addButton = wrapper.find('.add-rule');

    await ruleInput.setValue('Rule 1');
    await addButton.trigger('click');

    const addedRule = wrapper.find('.rule-container .rule');
    expect(addedRule.text()).toBe('Rule 1');
  });

  it('does not add a rule with less than 3 characters', async () => {
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

  it('creates a category', async () => {
    // Mock the options for the subscriber and rule dropdowns
    wrapper.setData({
      subscriber: [
        { name: 'Subscriber 1' },
        { name: 'Subscriber 2' },
      ],
      rules: [
        { name: 'Rule 1' },
        { name: 'Rule 2' },
      ],
    });

    const subscriberDropdown = wrapper.find('.select-subscriber');
    const ruleDropdown = wrapper.find('.select-rule');
    const categoryInput = wrapper.find('.enter-category');
    const addButton = wrapper.find('.add-category');

    await subscriberDropdown.setValue('Subscriber 1');
    await ruleDropdown.setValue('Rule 1');
    await categoryInput.setValue('Category 1');
    await addButton.trigger('click');

    const addedCategory = wrapper.find('.category-container .category');
    expect(addedCategory.text()).toBe('Category 1');
  });

  it('does not create a category with less than 3 characters', async () => {
    const subscriberDropdown = wrapper.find('.select-subscriber');
    const ruleDropdown = wrapper.find('.select-rule');
    const categoryInput = wrapper.find('.enter-category');
    const addButton = wrapper.find('.add-category');

    await subscriberDropdown.setValue('Subscriber 1');
    await ruleDropdown.setValue('Rule 1');
    await categoryInput.setValue('Ca');
    await addButton.trigger('click');

    const addedCategory = wrapper.find('.category-container .category');
    expect(addedCategory.exists()).toBe(false);

    const errorMessage = wrapper.find('.category-container .error-message');
    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toBe('Category name must be at least 3 characters.');
  });

  it('deletes a category', async () => {
    // Mock the categories data
    wrapper.setData({
      categories: [
        { name: 'Category 1', id: 1 },
        { name: 'Category 2', id: 2 },
      ],
    });

    const deleteButton = wrapper.find('.category-container .delete-button');

    await deleteButton.trigger('click');

    const deletedCategory = wrapper.find('.category-container .category');
    expect(deletedCategory.exists()).toBe(false);
  });
});
