<template>
  <Card class="sla-rule-card">
    <template #title>
      <div class="flex flex-row align-content-center align-items-center justify-content-between">
        <p>Create sla rules</p>
        <div class="flex gap-2">
          <Dropdown
            v-model="selectedProjectPDF"
            :options="projectOptions"
            placeholder="Select customer project"
            optionLabel="name"
          />
          <Button
            label="Generate PDF"
            @click="GeneratePdf(selectedProjectPDF)"
            style="background-color: var(--flowMetricsBlue)"
          ></Button>
        </div>
      </div>
      <Divider class="p-divider p-divider-horizontal divider-position mt-0 mb-0" />
    </template>
    <template #content>
      <div class="flex flex-row">
        <div class="flex-column w-3">
          <Accordion :activeIndex="0">
            <AccordionTab header="Add sla rule">
              <div class="rule-container flex flex-column">
                <Dropdown
                  v-model="selectedCategoryForAddRule"
                  :options="categories"
                  class="select-category-in m-1"
                  placeholder="Select category"
                  optionLabel="name"
                />
                <Dropdown
                  v-model="newOccurredIn"
                  :options="occurredInOptions"
                  class="select-occurred-in m-1"
                  placeholder="Occurred in"
                />
                <InputText
                  v-model="newRuleName"
                  class="enter-rule m-1"
                  placeholder="Enter rule name"
                />
                <Dropdown
                  v-model="selectedIssueTypes"
                  :options="preparedIssueTypeOptions"
                  class="select-issueType-in m-1"
                  placeholder="Select issue type"
                  optionLabel="label"
                  optionValue="value"
                />
                <MultiSelect
                  v-model="newPriority"
                  :options="preparedPriorityOptions"
                  class="select-priority-in m-1"
                  placeholder="Priority"
                  optionLabel="label"
                  optionValue="value"
                  multiple
                  :maxSelectedLabels="2"
                />
                <Calendar
                  v-model="newExpirationDate"
                  dateFormat="dd/mm/yy"
                  class="select-expiration-date m-1"
                  placeholder="Expiration Date"
                />
                <div v-if="!isRuleNameValid" class="error-message m-1 text-red-500">{{
                  ruleErrorMessage
                }}</div>
                <div class="flex justify-content-start m-1">
                  <Button
                    class="add-rule"
                    label="Add rule"
                    style="background-color: var(--flowMetricsBlue)"
                    @click="addRule"
                  ></Button>
                </div>
              </div>
            </AccordionTab>
            <AccordionTab header="Add sla category">
              <div class="category-container flex flex-column">
                <Dropdown
                  v-model="selectedProject"
                  :options="projectOptions"
                  class="select-customer-in m-1"
                  placeholder="Select customer project"
                  optionLabel="name"
                />
                <InputText
                  v-model="newCategoryName"
                  class="enter-category m-1"
                  placeholder="Enter category name"
                />
                <div v-if="!isSlaCategoryNameValid" class="error-message m-1 text-red-500 ml-3">
                  {{ categoryErrorMessage }}
                </div>
                <div class="flex justify-content-start">
                  <Button
                    class="add-category m-1"
                    label="Add category"
                    style="background-color: var(--flowMetricsBlue)"
                    @click="createCategory"
                  ></Button>
                </div>
              </div>
            </AccordionTab>
            <AccordionTab header="Add reaction time">
              <div class="reaction-time-container flex flex-column">
                <Dropdown
                  v-model="selectedCategoryForReactionTime"
                  :options="categories"
                  class="select-category-for-reaction-time m-1"
                  placeholder="Select category"
                  optionLabel="name"
                />
                <Dropdown
                  v-model="selectedRule"
                  :options="rules"
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
                    label="Add reaction time"
                    style="background-color: var(--flowMetricsBlue)"
                    @click="addReactionTime"
                  ></Button>
                </div>
              </div>
            </AccordionTab>
          </Accordion>
        </div>
        <Divider class="vertical-divider" layout="vertical" />
        <div class="w-9">
          <h2 class="mt-0 text-2xl">{{ categories.length }} Sla categories</h2>
          <DataTable
            v-model:expandedRows="expandedRows"
            :value="categories"
            dataKey="id"
            class="category-table"
          >
            <Column expander style="width: 5rem" />
            <Column field="id" header="Id" />
            <Column field="name" header="Category name" />
            <Column field="project.name" header="Project" />
            <Column field="rules.length" header="Number of rules" />
            <Column>
              <template #body="rowData">
                <Button
                  class="p-button-danger trash-size m-1"
                  icon="pi pi-trash"
                  @click="slaRulesStore.deleteCategory(rowData.data)"
                  rounded
                  outlined
                ></Button>
              </template>
            </Column>
            <template #expansion="slotProps">
              <div class="p-3">
                <DataTable :value="slotProps.data.rules">
                  <Column field="id" header="Id" />
                  <Column field="name" header="Rule name" />
                  <Column field="occurredIn" header="Occurred in" />
                  <Column field="priority" header="Priority">
                    <template #body="slotProps">
                      <div v-if="slotProps.data.priority.length === 5">
                        <span> All priorities selected </span>
                      </div>
                      <div v-else>
                        <span>{{ slotProps.data.priority.join(', ') }}</span>
                      </div>
                    </template>
                  </Column>
                  <Column field="issueType" header="Issue type" />
                  <Column field="reactionTime" header="Reaction time">
                    <template #body="slotProps">
                      <span>
                        {{ printRestingTime(slotProps.data.reactionTime) }}
                      </span>
                    </template>
                  </Column>
                  <Column field="expirationDate" header="Expiration date">
                    <template #body="slotProps">
                      <span>
                        {{
                          DateTime.fromJSDate(slotProps.data.expirationDate).toLocaleString(
                            DateTime.DATETIME_FULL
                          )
                        }}
                      </span>
                    </template>
                  </Column>
                  <Column>
                    <template #body="rowData">
                      <Button
                        class="p-button-danger trash-size m-1"
                        icon="pi pi-trash"
                        @click="slaRulesStore.deleteRule(slotProps.data, rowData.data)"
                        rounded
                        outlined
                      ></Button>
                    </template>
                  </Column>
                </DataTable>
              </div>
            </template>
          </DataTable>
        </div>
      </div>
    </template>
  </Card>
</template>

<script lang="ts" setup>
import { DateTime, Duration, type DurationLikeObject } from 'luxon';
import type { ComputedRef, Ref } from 'vue';
import { computed, ref } from 'vue';
import type Column from 'primevue/column';
import Button from 'primevue/button';
import useSlaRulesStore from '@/store/slaRulesStore';
import useProjectStore from '@/store/projectStore';
import IssueTypes from '@/assets/__mockdata__/IssueProps/issueTypes';
import Priority from '@/assets/__mockdata__/IssueProps/priority';
import type { RuleIF } from '@/model/Sla/RuleIF';
import type { ProjectIF } from '@/model/ProjectIF';
import type { CategoryIF } from '@/model/Sla/CategoryIF';
import GeneratePdf from '@/services/pdf/generatePdf';

const slaRulesStore = useSlaRulesStore();
const projectStore = useProjectStore();

const selectedProjectPDF: Ref<ProjectIF> = ref({
  id: 0,
  name: '',
  description: '',
  issues: [],
} as ProjectIF);

const selectedProject: Ref<ProjectIF> = ref({
  id: 0,
  name: '',
  description: '',
  issues: [],
} as ProjectIF);
const selectedCategoryForAddRule: Ref<CategoryIF> = ref({
  id: 0,
  name: '',
  project: {
    id: 0,
    name: '',
    description: '',
    issues: [],
  },
  rules: [],
} as CategoryIF);
const selectedCategoryForReactionTime: Ref<CategoryIF> = ref({
  id: 0,
  name: '',
  project: {
    id: 0,
    name: '',
    description: '',
    issues: [],
  },
  rules: [],
} as CategoryIF);
const selectedRule: Ref<RuleIF> = ref({
  id: 0,
  name: '',
  expirationDate: null,
  reactionTime: 0,
  occurredIn: null,
  priority: null,
  issueType: '',
} as RuleIF);
const selectedIssueTypes: Ref<string> = ref('');
const expandedRows = ref([]);

const projectOptions: ComputedRef<ProjectIF[]> = computed(() => projectStore.getProjects);
const categories: ComputedRef<CategoryIF[]> = computed(() => slaRulesStore.categories);
const occurredInOptions = ['Test', 'Pre-production', 'Production'];
const priorityOptions = Object.values(Priority);
const issueTypeOptions = Object.values(IssueTypes);
const rules: ComputedRef<RuleIF[]> = computed(
  () => selectedCategoryForReactionTime.value?.rules || []
);

const newOccurredIn: Ref<string> = ref('');
const newPriority: Ref<string[]> = ref([]);
const newRuleName = ref('');
const newReactionTime = ref('');
const newCategoryName = ref('');
const newExpirationDate = ref();

const isReactionTimeValid = ref(true);
const isSlaCategoryNameValid = ref(true);
const isRuleNameValid = ref(true);

function parseReactionTime(input: string): DurationLikeObject {
  const parts = input.match(/(\d+)w (\d+)d (\d+)h/);
  if (!parts) {
    return { weeks: 0, days: 0, hours: 0 };
  }

  const weeks = parseInt(parts[1], 10);
  const days = parseInt(parts[2], 10);
  const hours = parseInt(parts[3], 10);

  // Convert to days (you may adjust this conversion based on your specific logic)
  return { weeks, days, hours } as DurationLikeObject;
}

// Add a reaction time to a rule
function addReactionTime() {
  if (newReactionTime.value.trim().length < 9) {
    isReactionTimeValid.value = false;
    return;
  }
  if (newReactionTime.value === '00w 00d 00h') {
    return;
  }
  const reactionTime = parseReactionTime(newReactionTime.value.trim());
  if (reactionTime) {
    slaRulesStore.addReactionTime(
      selectedCategoryForReactionTime.value,
      selectedRule.value,
      reactionTime
    );
    newReactionTime.value = '';
    selectedRule.value = {
      id: 0,
      name: '',
      expirationDate: null,
      reactionTime: 0,
      occurredIn: null,
      priority: null,
      issueType: '',
    } as RuleIF;
    selectedCategoryForReactionTime.value = {
      id: 0,
      name: '',
      project: {
        id: 0,
        name: '',
        description: '',
        issues: [],
      },
      rules: [],
    } as CategoryIF;
    isReactionTimeValid.value = true;
  }
}

function addRule() {
  if (newRuleName.value.trim().length < 3) {
    isRuleNameValid.value = false;
    return;
  }
  isRuleNameValid.value = true;
  const rule: RuleIF = {
    id: selectedCategoryForAddRule.value.rules.length + 1,
    name: newRuleName.value.trim(),
    expirationDate: newExpirationDate.value as Date,
    reactionTime: { weeks: 0, days: 0, hours: 0 },
    occurredIn: newOccurredIn.value,
    priority: newPriority.value,
    issueType: selectedIssueTypes.value,
  };
  slaRulesStore.addRule(selectedCategoryForAddRule.value, rule);
  newRuleName.value = '';
  newOccurredIn.value = '';
  newPriority.value = [];
  selectedIssueTypes.value = '';
  newExpirationDate.value = null;
  selectedCategoryForAddRule.value = {
    id: 0,
    name: '',
    project: {
      id: 0,
      name: '',
      description: '',
      issues: [],
    },
    rules: [],
  } as CategoryIF;
}

function createCategory() {
  if (newCategoryName.value.trim().length < 3) {
    isSlaCategoryNameValid.value = false;
    return;
  }
  isSlaCategoryNameValid.value = true;

  if (selectedProject.value.id !== 0) {
    const category: CategoryIF = {
      id: slaRulesStore.categories.length + 1,
      name: newCategoryName.value.trim() || null,
      project: selectedProject.value,
      rules: [],
    };
    slaRulesStore.addCategory(category);
  }
  selectedProject.value = {
    id: 0,
    name: '',
    description: '',
    issues: [],
  } as ProjectIF;
  newCategoryName.value = '';
}

function printRestingTime(restingTime: any): string {
  if (restingTime == null) {
    return '0d 0h 0m';
  }
  return Duration.fromObject(restingTime).toFormat("d' days 'h' hours ").toString();
}

const preparedIssueTypeOptions = computed(() =>
  issueTypeOptions.map((option) => ({ label: option, value: option }))
);
const preparedPriorityOptions = computed(() =>
  priorityOptions.map((option) => ({ label: option, value: option }))
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
.sla-rule-card {
  margin: 15px 15px 0 15px;
}
</style>
