<template>
  <Card>
    <template #title>
      <h4>SLA Management View</h4>
      <Divider class="p-divider p-divider-horizontal divider-position" />
    </template>
    <template #content>
      <div>
        <h3>Add SLA Subscriber</h3>
        <div class="subscriber-container">
          <InputText
            v-model="newSubscriber"
            placeholder="Enter subscriber name"
            class="enter-subscriber m-1"
          />
          <Button
            class="add-subscriber m-1"
            icon="pi pi-plus"
            @click="addSubscriber"
            style="background-color: var(--flowMetricsBlue)"
          ></Button>
          <div v-if="!isSubscriberNameValid" class="error-message m-1 text-red-500">
            {{ SubscriberErrorMessage }}
          </div>
        </div>
      </div>
      <div>
        <h3>Add SLA Rule</h3>
        <div class="rule-container m-1">
          <InputText v-model="newRuleName" placeholder="Enter rule name" class="enter-rule m-1" />
          <Dropdown
            v-model="newRuleMaxAssignedEmployees"
            :options="maxAssignedEmployeesOptions"
            placeholder="Select max assigned employees"
            class="select-employees m-1"
          />
          <Dropdown
            v-model="newOccurredIn"
            :options="occurredInOptions"
            placeholder="Occurred in"
            class="select-occurred-in m-1"
          />
          <Button
            class="add-rule m-1"
            icon="pi pi-plus"
            @click="addRule"
            style="background-color: var(--flowMetricsBlue)"
          ></Button>
          <div v-if="!isRuleNameValid" class="error-message m-1 text-red-500">{{
            ruleErrorMessage
          }}</div>
        </div>
      </div>
      <div>
        <h3>Add new SLA Category</h3>
        <div class="category-container m-1">
          <Dropdown
            v-model="selectedSubscriber"
            :options="subscriber"
            optionLabel="name"
            placeholder="Select subscriber"
            class="select-subscriber m-1"
          />
          <Dropdown
            v-model="selectedRule"
            :options="rules"
            optionLabel="name"
            placeholder="Select rule"
            class="select-rule m-1"
          />
          <InputText
            v-model="categoryName"
            placeholder="Enter category name"
            class="enter-category m-1"
          />
          <Button
            class="add-category m-1"
            icon="pi pi-plus"
            @click="createCategory"
            style="background-color: var(--flowMetricsBlue)"
          ></Button>
          <div v-if="!isSLACategoryNameValid" class="error-message m-1 text-red-500">
            {{ categoryErrorMessage }}
          </div>
        </div>
      </div>

      <div>
        <h3>SLA Categories</h3>
        <DataTable :value="categories">
          <Column field="name" header="Category" />
          <Column field="subscriber.name" header="Subscriber" />
          <Column field="rule.name" header="Rule" />
          <Column field="rule.durationInDays" header="Duration (Days)" />
          <Column field="rule.expirationDate" header="Due date" />
          <Column field="rule.occurredIn" header="Occurred in" />
          <Column field="rule.maxAssignedEmployees" header="Max assigned employees" />
          <Column header="Delete">
            <template #body="rowData">
              <Button
                icon="pi pi-trash"
                class="p-button-danger trash-size m-1"
                @click="deleteCategory(rowData.data)"
              ></Button>
            </template>
          </Column>
        </DataTable>
      </div>
    </template>
    <template #footer>
      <GeneratePDF></GeneratePDF>
    </template>
  </Card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import useSLAStore from '@/store/SLAStore';
import type { SLASubscriber } from '@/model/SLASubscriber';
import type { SLARule } from '@/model/SLARule';
import type { SLACategory } from '@/model/SLACategory';
import GeneratePDF from '@/components/GeneratePDF.vue';

// Define the 'SLAComponent' component
export default defineComponent({
  name: 'SLAComponent',
  mounted() {
    this.slaStore.initializeCategories();
  },
  components: { GeneratePDF },
  data() {
    return {
      slaStore: useSLAStore(),
      newSubscriber: ref(''),
      isSubscriberNameValid: ref(true),
      newRuleName: ref(''),
      newRuleMaxAssignedEmployees: ref(),
      isRuleNameValid: ref(true),
      newOccurredIn: ref(null),
      selectedSubscriber: ref(null),
      selectedRule: ref(null),
      categoryName: ref(''),
      isSLACategoryNameValid: ref(true),
      maxAssignedEmployeesOptions: [1, 2, 3, 4, 5],
      occurredInOptions: ['Test', 'Pre-production', 'Production'],
    };
  },
  methods: {
    // Add a new subscriber to the store
    addSubscriber() {
      if (this.newSubscriber.trim().length < 3) {
        this.isSubscriberNameValid = false;
        return;
      }
      this.isSubscriberNameValid = true;
      const subscriber: SLASubscriber = {
        id: null,
        name: this.newSubscriber.trim(),
        description: null,
      };
      this.slaStore.addSubscriber(subscriber);
      this.newSubscriber = '';
    },
    // Add a new rule to the store
    addRule() {
      if (this.newRuleName.trim().length < 3) {
        this.isRuleNameValid = false;
        return;
      }
      this.isRuleNameValid = true;
      const rule: SLARule = {
        id: null,
        name: this.newRuleName.trim(),
        durationInDays: null,
        expirationDate: null,
        maxAssignedEmployees: this.newRuleMaxAssignedEmployees,
        occurredIn: this.newOccurredIn,
      };
      this.slaStore.addRule(rule);
      this.newRuleName = '';
      this.newRuleMaxAssignedEmployees = null;
      this.newOccurredIn = null;
    },
    // Create a new category in the store
    createCategory() {
      if (this.categoryName.trim().length < 3) {
        this.isSLACategoryNameValid = false;
        return;
      }
      this.isSLACategoryNameValid = true;
      if (this.selectedSubscriber && this.selectedRule) {
        const category: SLACategory = {
          id: null,
          name: this.categoryName.trim() || null,
          subscriber: this.selectedSubscriber,
          rule: this.selectedRule,
        };
        this.slaStore.addSLACategory(category);
        this.selectedSubscriber = null;
        this.selectedRule = null;
        this.categoryName = '';
      }
    },
    // Delete a category from the store
    deleteCategory(category: SLACategory) {
      this.slaStore.deleteSLACategory(category);
    },
  },
  computed: {
    // Retrieve the subscribers from the store
    subscriber(): SLASubscriber[] {
      return this.slaStore.subscriber;
    },
    // Retrieve the rules from the store
    rules(): any {
      return this.slaStore.rules;
    },
    // Retrieve the SLA categories from the store
    categories(): SLACategory[] {
      return this.slaStore.slaCategories;
    },
    // Error message for invalid subscriber name
    SubscriberErrorMessage(): any {
      return !this.isSubscriberNameValid ? 'Subscriber name must be at least 3 characters.' : '';
    },
    // Error message for invalid rule name
    ruleErrorMessage(): any {
      return !this.isRuleNameValid ? 'Rule name must be at least 3 characters.' : '';
    },
    // Error message for invalid category name
    categoryErrorMessage(): any {
      return !this.isSLACategoryNameValid ? 'Category name must be at least 3 characters.' : '';
    },
  },
});
</script>

<style scoped></style>
