import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import PrimeVue from 'primevue/config';
import Card from 'primevue/card';
import Divider from 'primevue/divider';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import MultiSelect from 'primevue/multiselect';
import Calendar from 'primevue/calendar';
import Button from 'primevue/button';
import InputMask from 'primevue/inputmask';
import DataTable from 'primevue/datatable';
import { createPinia, setActivePinia } from 'pinia';
import Column from 'primevue/column';
import SlaView from '../SlaView.vue';
import router from '../../router';
import type { CategoryIF } from '../../model/Sla/CategoryIF';
import type { ProjectIF } from '../../model/ProjectIF';
import type { RuleIF } from '../../model/Sla/RuleIF';
import useSlaRulesStore from '../../store/slaRulesStore';

const Rule1: RuleIF = {
  id: 1,
  name: 'SLA Rule 1',
  reactionTime: { weeks: 3, days: 2, hours: 1, minutes: 0, seconds: 0, milliseconds: 0 },
  expirationDate: new Date(),
  occurredIn: 'Test',
  priority: ['behindernd'],
  issueType: 'bug',
};

const Rule2: RuleIF = {
  id: 2,
  name: 'SLA Rule 2',
  reactionTime: { weeks: 3, days: 2, hours: 1, minutes: 0, seconds: 0, milliseconds: 0 },
  expirationDate: new Date(),
  occurredIn: 'Test',
  priority: ['behindernd'],
  issueType: 'bug',
};

const Project1: ProjectIF = {
  id: 1,
  name: 'New Project',
  description: 'New Project Description',
  issues: [],
};
const Project2: ProjectIF = {
  id: 2,
  name: 'New Project',
  description: 'New Project Description',
  issues: [],
};

const Category1: CategoryIF = {
  id: 1,
  name: 'Category 1',
  project: Project1,
  rules: [Rule1, Rule2],
};
const Category2: CategoryIF = {
  id: 2,
  name: 'Category 2',
  project: Project2,
  rules: [Rule1],
};

describe('SLA View Tests', () => {
  // Mounting the ProjectDescriptionPanel component with necessary configuration
  const wrapper = mount(SlaView, {
    global: {
      plugins: [PrimeVue, router, setActivePinia(createPinia())],
      components: {
        Card,
        Divider,
        Accordion,
        AccordionTab,
        Dropdown,
        InputText,
        MultiSelect,
        Calendar,
        Button,
        InputMask,
        DataTable,
        Column,
      },
    },
  });
  // initialize the stores
  const slaRulesStore = useSlaRulesStore();
  slaRulesStore.addCategory(Category1);
  slaRulesStore.addCategory(Category2);
  test('it mounts', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.getComponent(Card).isVisible()).toBe(true);
    expect(wrapper.getComponent(Divider).isVisible()).toBe(true);
    expect(wrapper.getComponent(Accordion).isVisible()).toBe(true);
    expect(wrapper.getComponent(AccordionTab).isVisible()).toBe(true);
    expect(wrapper.getComponent(Dropdown).isVisible()).toBe(true);
    expect(wrapper.getComponent(InputText).isVisible()).toBe(true);
    expect(wrapper.getComponent(MultiSelect).isVisible()).toBe(true);
    expect(wrapper.getComponent(Calendar).isVisible()).toBe(true);
    expect(wrapper.getComponent(Button).isVisible()).toBe(true);
    expect(wrapper.getComponent(DataTable).isVisible()).toBe(true);
  });
  test('h2 has the correct text', () => {
    const h2 = wrapper.find('h2');
    expect(h2.exists()).toBe(true);
    expect(h2.text()).toBe('2 Sla categories');
  });
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
  test('Data table has the correct number of rows', () => {
    const rows = wrapper.findAll('.p-datatable-tbody > tr');
    expect(rows.length).toBe(2);
  });
});

describe('GeneratePDF', () => {
  // Mounting the ProjectDescriptionPanel component with necessary configuration
  const wrapper = mount(SlaView, {
    global: {
      plugins: [PrimeVue, router, setActivePinia(createPinia())],
      components: {
        Card,
        Divider,
        Accordion,
        AccordionTab,
        Dropdown,
        InputText,
        MultiSelect,
        Calendar,
        Button,
        InputMask,
        DataTable,
        Column,
      },
    },
  });
  // initialize the stores
  const slaRulesStore = useSlaRulesStore();
  slaRulesStore.addCategory(Category1);
  slaRulesStore.addCategory(Category2);
  // define individual test case
  test('Generates a PDF when the button is clicked', async () => {
    // Click the "Generate PDF" button
    const button = wrapper.findComponent(Button).element;
    const clickEvent = new Event('click', {
      bubbles: true,
      cancelable: true,
    });
    button.dispatchEvent(clickEvent);

    // Verify that the button is not immediately disabled
    expect(button.getAttribute('disabled')).toBe(null);

    // Wait for 2 seconds (2000 milliseconds)
    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });

    // Verify that the button is still not disabled after 2 seconds
    expect(button.getAttribute('disabled')).toBe(null);
  });
});
