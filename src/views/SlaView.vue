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
            <AccordionTab header="Add SLA category">
              <div class="category-container flex flex-column">
                <InputText
                  v-model="newCategoryName"
                  class="enter-category m-1"
                  placeholder="Enter category name"
                />
                <Dropdown
                  v-model="selectedProject"
                  :options="projectOptions"
                  class="select-customer-in m-1"
                  placeholder="Select Customer Project"
                  optionLabel="name"
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
            <AccordionTab header="Add SLA rule">
              <div class="rule-container flex flex-column">
                <InputText
                  v-model="newRuleName"
                  class="enter-rule m-1"
                  placeholder="Enter rule name"
                />
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
                <MultiSelect
                  v-model="selectedIssueTypes"
                  :options="preparedIssueTypeOptions"
                  class="select-issueType-in m-1"
                  placeholder="Select issue types"
                  optionLabel="label"
                  optionValue="value"
                  multiple
                />
                <MultiSelect
                  v-model="newPriority"
                  :options="priorityOptions"
                  class="select-priority-in m-1"
                  placeholder="Priority"
                  optionValue="value"
                  multiple
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
            <AccordionTab header="Add reaction time">
              <div class="reaction-time-container flex flex-column">
                <Dropdown
                  v-model="selectedCategoryForReactionTime"
                  :options="categories"
                  class="select-category-for-reaction-time m-1"
                  placeholder="Select category"
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
          <h2 class="mt-0 text-2xl">{{ categories.length }} SLA categories</h2>
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
            <Column field="rules.length" header="Number of Rules" />
            <Column header="Delete">
              <template #body="rowData">
                <Button
                  class="p-button-danger trash-size m-1"
                  icon="pi pi-trash"
                  @click="slaRulesStore.deleteCategory(rowData.data)"
                  rounded
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
                      <span>
                        {{ slotProps.data.rule?.priority?.join(', ') }}
                      </span>
                    </template>
                  </Column>
                  <Column field="issueType" header="Issue type">
                    <template #body="slotProps">
                      <span>
                        {{ slotProps.data.rule?.issueType?.join(', ') }}
                      </span>
                    </template>
                  </Column>
                  <Column field="reactionTime" header="Reaction time">
                    <template #body="slotProps">
                      <span>
                        {{ slotProps.data.rule?.reactionTime?.weeks }}w
                        {{ slotProps.data.rule?.reactionTime?.days }}d
                        {{ slotProps.data.rule?.reactionTime?.hours }}h
                      </span>
                    </template>
                  </Column>
                  <Column field="expirationDate" header="Expiration date">
                    <template #body="slotProps">
                      <span>
                        {{ slotProps.data.rule?.expirationDate }}
                      </span>
                    </template>
                  </Column>
                  <Column header="Delete">
                    <template #body="rowData">
                      <Button
                        class="p-button-danger trash-size m-1"
                        icon="pi pi-trash"
                        @click="slaRulesStore.deleteRule(slotProps.data, rowData.data)"
                        rounded
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
import { type DurationLikeObject } from 'luxon';
import type { ComputedRef, Ref } from 'vue';
import { computed, ref } from 'vue';
import type Column from 'primevue/column';
import GeneratePDF from '@/components/GeneratePDF.vue';
import useSlaRulesStore from '@/store/slaRulesStore';
import useProjectStore from '@/store/projectStore';
import IssueTypes from '@/assets/__mockdata__/IssueProps/issueTypes';
import Priority from '@/assets/__mockdata__/IssueProps/priority';
import type { RuleIF } from '@/model/Sla/RuleIF';
import type { ProjectIF } from '@/model/ProjectIF';
import type { CategoryIF } from '@/model/Sla/CategoryIF';

const slaRulesStore = useSlaRulesStore();
const projectStore = useProjectStore();

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
  issueType: null,
} as RuleIF);
const selectedIssueTypes: Ref<string[]> = ref([]);
const expandedRows = ref([]);

const projectOptions: ComputedRef<ProjectIF[]> = computed(() => projectStore.getProjects);
const categories: ComputedRef<CategoryIF[]> = computed(() => slaRulesStore.categories);
const occurredInOptions = ['Test', 'Pre-production', 'Production'];
const priorityOptions = Object.keys(Priority);
const issueTypeOptions = Object.keys(IssueTypes);
const rules: ComputedRef<RuleIF[]> = computed(
  () => selectedCategoryForReactionTime.value?.rules || []
);

const newOccurredIn: Ref<string> = ref('');
const newPriority: Ref<string[]> = ref([]);
const newRuleName = ref('');
const newReactionTime = ref('');
const newCategoryName = ref('');

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
      issueType: null,
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
    expirationDate: null,
    reactionTime: { weeks: 0, days: 0, hours: 0 },
    occurredIn: newOccurredIn.value,
    priority: newPriority.value,
    issueType: selectedIssueTypes.value,
  };
  slaRulesStore.addRule(selectedCategoryForAddRule.value, rule);
  newRuleName.value = '';
  newOccurredIn.value = '';
  newPriority.value = [];
  selectedIssueTypes.value = [];
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

const preparedIssueTypeOptions = computed(() =>
  issueTypeOptions.map((option) => ({ label: option, value: option }))
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
