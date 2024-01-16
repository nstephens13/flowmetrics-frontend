<template>
  <Card class="sla-rule-card">
    <template #title>
      <div class="flex flex-row align-content-center align-items-center justify-content-between">
        <p>Create SLA Rules</p>
        <GeneratePDF></GeneratePDF>
      </div>
      <Divider class="p-divider p-divider-horizontal divider-position mt-0 mb-0" />
    </template>
    <template #content>
      <div class="flex flex-row">
        <div class="flex-column w-3">
          <Accordion :activeIndex="0">
            <AccordionTab header="Add SLA rule">
              <div class="flex flex-column">
                <InputText
                  v-model="newRuleName"
                  class="enter-rule m-1"
                  placeholder="Enter rule name"
                />
                <Dropdown
                  v-model="newOccurredIn"
                  :options="occurredInOptions"
                  class="select-occurred-in m-1"
                  placeholder="Occurred in"
                />
                <MultiSelect
                  v-model="selectedIssueTypes"
                  :options="preparedIssueTypeOptions"
                  class="select-issueType-in m-1"
                  placeholder="Select issue types"
                  optionLabel="label"
                  optionValue="value"
                  multiple
                />
                <Dropdown
                  v-model="newPriority"
                  :options="priorityOptions"
                  class="select-priority-in m-1"
                  placeholder="Priority"
                />
                <div v-if="!isRuleNameValid" class="error-message m-1 text-red-500">{{
                  ruleErrorMessage
                }}</div>
                <div class="flex justify-content-start m-1">
                  <Button
                    class="add-rule"
                    label="add rule"
                    style="background-color: var(--flowMetricsBlue)"
                    @click="addRule"
                  ></Button>
                </div>
              </div>
            </AccordionTab>
            <AccordionTab header="Add SLA category">
              <div class="flex flex-column">
                <MultiSelect
                  v-model="selectedCustomerProject"
                  :options="customerProjectOptions"
                  class="select-customer-in m-1"
                  placeholder="Select Customer Project"
                  optionLabel="name"
                  multiple
                />
                <Dropdown
                  v-model="selectedRule"
                  :options="slaStore.rules"
                  class="select-rule m-1"
                  optionLabel="name"
                  placeholder="Select rule"
                />
                <InputText
                  v-model="categoryName"
                  class="enter-category m-1"
                  placeholder="Enter category name"
                />
                <div v-if="!isSlaCategoryNameValid" class="error-message m-1 text-red-500 ml-3">
                  {{ categoryErrorMessage }}
                </div>
                <div class="flex justify-content-start">
                  <Button
                    class="add-category m-1"
                    label="add category"
                    style="background-color: var(--flowMetricsBlue)"
                    @click="createCategory"
                  ></Button>
                </div>
              </div>
            </AccordionTab>
            <AccordionTab header="Add reaction time">
              <div class="flex flex-column">
                <Dropdown
                  v-model="selectedRuleForReactionTime"
                  :options="slaStore.rules"
                  class="select-rule-for-reaction-time m-1"
                  optionLabel="name"
                  placeholder="Select rule"
                />
                <InputMask
                  id="reactionTime"
                  v-model="newReactionTime"
                  class="enter-reaction-time m-1"
                  placeholder="Enter reaction time"
                  mask="99w 99d 99h"
                />
                <div
                  v-if="!isReactionTimeValid"
                  class="error-message-reaction-time m-1 text-red-500 ml-3"
                >
                  {{ reactionTimeErrorMessage }}
                </div>
                <div class="flex justify-content-start">
                  <Button
                    class="add-reaction-time m-1"
                    label="add reaction time"
                    style="background-color: var(--flowMetricsBlue)"
                    @click="addReactionTime"
                  ></Button>
                </div>
              </div>
            </AccordionTab>
            <AccordionTab header="Add SLA customer">
              <div class="flex flex-column">
                <InputText
                  v-model="newCustomer"
                  class="enter-subscriber m-1"
                  placeholder="Enter customer project"
                />
                <div v-if="!isSubscriberNameValid" class="error-message m-1 text-red-500">
                  {{ SubscriberErrorMessage }}
                </div>
                <div class="flex justify-content-start">
                  <Button
                    class="add-subscriber m-1"
                    label="add customer"
                    style="background-color: var(--flowMetricsBlue)"
                    @click="addSubscriber"
                  ></Button>
                </div>
              </div>
            </AccordionTab>
          </Accordion>
        </div>
        <Divider layout="vertical" />
        <div class="w-9">
          <h3>SLA Categories</h3>
          <DataTable :value="slaCategories">
            <Column field="name" header="Category" />
            <Column field="rule.name" header="Rule" />
            <Column header="Customer project">
              <template #body="slotProps">
                {{ slotProps.data.customerProject?.name }}
              </template>
            </Column>
            <Column field="rule.reactionTimeInDays" header="Reaction time (Days)" />
            <Column field="rule.occurredIn" header="Occurred in" />
            <Column field="rule.priority" header="Priority" />
            <Column field="rule.issueType" header="Issue type">
              <template #body="slotProps">
                <span>
                  {{ slotProps.data.rule?.issueType?.join(', ') }}
                </span>
              </template>
            </Column>
            <Column header="Delete">
              <template #body="rowData">
                <Button
                  class="p-button-danger trash-size m-1"
                  icon="pi pi-trash"
                  @click="slaStore.deleteSlaCategory(rowData.data)"
                ></Button>
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
    </template>
  </Card>
</template>

<script lang="ts" setup>
import type { ComputedRef, Ref } from 'vue';
import { computed, ref } from 'vue';
import type { SlaCustomerProject } from '@/model/Sla/SlaCustomerProject';
import type { SlaRule } from '@/model/Sla/SlaRule';
import type { SlaCategory } from '@/model/Sla/SlaCategory';
import GeneratePDF from '@/components/GeneratePDF.vue';
import useSlaStore from '@/store/slaStore';

const slaStore = useSlaStore();

const slaCategories = computed(() => slaStore.slaCategories);

const isSlaCategoryNameValid = ref(true);
const selectedRuleForReactionTime: Ref<SlaRule | null> = ref(null);
const newReactionTime = ref('');
const isReactionTimeValid = ref(true);

const newCustomer = ref('');
const isSubscriberNameValid = ref(true);
const newRuleName = ref('');
const newRuleMaxAssignedEmployees = ref();
const isRuleNameValid = ref(true);
const newOccurredIn = ref(null);
const selectedRule = ref(null);
const categoryName = ref('');
const occurredInOptions = ['Test', 'Pre-production', 'Production'];
const customerProjectOptions: ComputedRef<SlaCustomerProject[]> = computed(() => slaStore.customer);
const selectedCustomerProject: Ref<SlaCustomerProject[]> = ref([]);
const newPriority = ref('');
const priorityOptions = ['schwerwiegend', 'behindernd', 'leicht umgehbar', 'Kosmetik', ''];
const issueTypeOptions = [
  'bug',
  'incident',
  'coverage',
  'enhancement',
  'task',
  'feature',
  'support',
  'documentation',
  'review',
  'refactor',
  '',
];
const selectedIssueTypes: Ref<string[]> = ref([]);

function addSubscriber() {
  if (newCustomer.value.trim().length < 3) {
    isSubscriberNameValid.value = false;
    return;
  }
  isSubscriberNameValid.value = true;
  const subscriber: SlaCustomerProject = {
    id: 0,
    name: newCustomer.value.trim(),
    description: null,
  };
  slaStore.addSubscriber(subscriber);
  newCustomer.value = '';
}

function parseReactionTime(input: string): number | null {
  const parts = input.match(/(\d+)w (\d+)d (\d+)h/);
  if (!parts) {
    return null;
  }

  const weeks = parseInt(parts[1], 10);
  const days = parseInt(parts[2], 10);
  const hours = parseInt(parts[3], 10);

  // Convert to days (you may adjust this conversion based on your specific logic)
  return weeks * 7 + days + hours / 24;
}

// Add a reaction time to a rule
function addReactionTime() {
  if (newReactionTime.value.trim().length < 9) {
    isReactionTimeValid.value = false;
    return;
  }
  if (selectedRuleForReactionTime.value === null || newReactionTime.value === '00w 00d 00h') {
    return;
  }
  const reactionTimeInDays = parseReactionTime(newReactionTime.value.trim());
  const rule: SlaRule = {
    id: selectedRuleForReactionTime.value?.id || null,
    name: selectedRuleForReactionTime.value?.name || null,
    reactionTimeInDays: reactionTimeInDays || null,
    expirationDate: selectedRuleForReactionTime.value?.expirationDate || null,
    occurredIn: selectedRuleForReactionTime.value?.occurredIn || null,
    priority: selectedRuleForReactionTime.value?.priority || null,
    issueType: selectedRuleForReactionTime.value?.issueType || null,
  };
  if (reactionTimeInDays) {
    slaStore.addReactionTime(rule, reactionTimeInDays);
    newReactionTime.value = '';
    selectedRuleForReactionTime.value = null;
    isReactionTimeValid.value = true;
  }
}

function addRule() {
  if (newRuleName.value.trim().length < 3) {
    isRuleNameValid.value = false;
    return;
  }
  isRuleNameValid.value = true;
  const rule: SlaRule = {
    id: null,
    name: newRuleName.value.trim(),
    expirationDate: null,
    reactionTimeInDays: 0,
    occurredIn: newOccurredIn.value,
    priority: newPriority.value,
    issueType: selectedIssueTypes.value,
  };
  slaStore.addRule(rule);
  newRuleName.value = '';
  newRuleMaxAssignedEmployees.value = null;
  newOccurredIn.value = null;
  newPriority.value = '';
  selectedIssueTypes.value = [];
}

function createCategory() {
  if (categoryName.value.trim().length < 3) {
    isSlaCategoryNameValid.value = false;
    return;
  }
  isSlaCategoryNameValid.value = true;

  if (selectedCustomerProject.value && selectedRule.value) {
    selectedCustomerProject.value.forEach((customerProject) => {
      const category: SlaCategory = {
        id: null,
        name: categoryName.value.trim() || null,
        customerProject,
        rule: selectedRule.value,
      };
      slaStore.addSlaCategory(category);
    });
  }
  selectedCustomerProject.value = [];
  selectedRule.value = null;
  categoryName.value = '';
}

const preparedIssueTypeOptions = computed(() =>
  issueTypeOptions.map((option) => ({ label: option, value: option }))
);

const SubscriberErrorMessage = computed(() =>
  !isSubscriberNameValid.value ? 'Subscriber name must be at least 3 characters.' : ''
);

const ruleErrorMessage = computed(() =>
  !isRuleNameValid.value ? 'Rule name must be at least 3 characters.' : ''
);

const categoryErrorMessage = computed(() =>
  !isSlaCategoryNameValid.value ? 'Category name must be at least 3 characters.' : ''
);

const reactionTimeErrorMessage = computed(() =>
  !isReactionTimeValid.value ? 'Reaction time must be in format 01w 23d 00h' : ''
);
</script>

<style scoped>
.p-card {
  box-shadow: none;
}
</style>
