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
            class="enter-subscriber m-1"
            placeholder="Enter subscriber name"
          />
          <Button
            class="add-subscriber m-1"
            icon="pi pi-plus"
            style="background-color: var(--flowMetricsBlue)"
            @click="addSubscriber"
          ></Button>
          <div v-if="!isSubscriberNameValid" class="error-message m-1 text-red-500">
            {{ SubscriberErrorMessage }}
          </div>
        </div>
      </div>
      <div>
        <h3>Add SLA Rule</h3>
        <div class="rule-container m-1">
          <InputText v-model="newRuleName" class="enter-rule m-1" placeholder="Enter rule name" />
          <Dropdown
            v-model="newOccurredIn"
            :options="occurredInOptions"
            class="select-occurred-in m-1"
            placeholder="Occurred in"
          />
          <Button
            class="add-rule m-1"
            icon="pi pi-plus"
            style="background-color: var(--flowMetricsBlue)"
            @click="addRule"
          ></Button>
          <div v-if="!isRuleNameValid" class="error-message m-1 text-red-500"
            >{{ ruleErrorMessage }}
          </div>
        </div>
      </div>
      <div>
        <h3>Add new SLA Category</h3>
        <div class="category-container m-1">
          <Dropdown
            v-model="selectedSubscriber"
            :options="subscriber"
            class="select-subscriber m-1"
            optionLabel="name"
            placeholder="Select subscriber"
          />
          <Dropdown
            v-model="selectedRule"
            :options="rules"
            class="select-rule m-1"
            optionLabel="name"
            placeholder="Select rule"
          />
          <InputText
            v-model="categoryName"
            class="enter-category m-1"
            placeholder="Enter category name"
          />
          <Button
            class="add-category m-1"
            icon="pi pi-plus"
            style="background-color: var(--flowMetricsBlue)"
            @click="createCategory"
          ></Button>
          <div v-if="!isSlaCategoryNameValid" class="error-message m-1 text-red-500">
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
          <Column header="Delete">
            <template #body="rowData">
              <Button
                class="p-button-danger trash-size m-1"
                icon="pi pi-trash"
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
import useSlaStore from '@/store/slaStore';
import type { SlaSubscriber } from '@/model/SlaSubscriber';
import type { SlaRule } from '@/model/SlaRule';
import type { SlaCategory } from '@/model/SlaCategory';
import GeneratePDF from '@/components/GeneratePDF.vue';

// Define the 'SLAComponent' component
export default defineComponent({
  name: 'SlaComponent',
  components: { GeneratePDF },
  data() {
    return {
      slaStore: useSlaStore(),
      newSubscriber: ref(''),
      isSubscriberNameValid: ref(true),
      newRuleName: ref(''),
      isRuleNameValid: ref(true),
      newOccurredIn: ref(null),
      selectedSubscriber: ref(null),
      selectedRule: ref(null),
      categoryName: ref(''),
      isSlaCategoryNameValid: ref(true),
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
      const subscriber: SlaSubscriber = {
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
      const rule: SlaRule = {
        id: null,
        name: this.newRuleName.trim(),
        reactionTimeInDays: null,
        expirationDate: null,
        occurredIn: this.newOccurredIn,
      };
      this.slaStore.addRule(rule);
      this.newRuleName = '';
      this.newOccurredIn = null;
    },
    // Create a new category in the store
    createCategory() {
      if (this.categoryName.trim().length < 3) {
        this.isSlaCategoryNameValid = false;
        return;
      }
      this.isSlaCategoryNameValid = true;
      if (this.selectedSubscriber && this.selectedRule) {
        const category: SlaCategory = {
          id: null,
          name: this.categoryName.trim() || null,
          subscriber: this.selectedSubscriber,
          rule: this.selectedRule,
        };
        this.slaStore.addSlaCategory(category);
        this.selectedSubscriber = null;
        this.selectedRule = null;
        this.categoryName = '';
      }
    },
    // Delete a category from the store
    deleteCategory(category: SlaCategory) {
      this.slaStore.deleteSlaCategory(category);
    },
  },
  computed: {
    // Retrieve the subscribers from the store
    subscriber(): SlaSubscriber[] {
      return this.slaStore.subscriber;
    },
    // Retrieve the rules from the store
    rules(): any {
      return this.slaStore.rules;
    },
    // Retrieve the SLA categories from the store
    categories(): SlaCategory[] {
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
      return !this.isSlaCategoryNameValid ? 'Category name must be at least 3 characters.' : '';
    },
  },
});
</script>

<style scoped></style>
