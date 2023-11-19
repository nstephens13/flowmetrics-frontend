<template>
  <Card>
    <template #title>
      <h4>SLA Management View</h4>
      <Divider class="p-divider p-divider-horizontal divider-position" />
    </template>
    <template #content>
      <div>
        <div class="m-2 mb-4">
          <h3>Add SLA Subscriber</h3>
        </div>
        <div class="flex subscriber-container">
          <div class="p-float-label">
            <InputText id="subscriberName" v-model="newSubscriber" class="enter-subscriber m-1" />
            <label for="subscriberName">Subscriber name</label>
          </div>
          <Button
            class="add-subscriber m-1"
            icon="pi pi-plus"
            style="background-color: var(--flowMetricsBlue)"
            @click="addSubscriber"
          ></Button>
        </div>
        <div v-if="!isSubscriberNameValid" class="error-message m-1 text-red-500 ml-3">
          {{ SubscriberErrorMessage }}
        </div>
      </div>
      <div>
        <div class="m-2 mb-4">
          <h3>Add SLA Rule</h3>
        </div>
        <div class="flex rule-container m-1">
          <div class="p-float-label">
            <InputText id="ruleName" v-model="newRuleName" class="enter-rule m-1" />
            <label for="ruleName">Rule name</label>
          </div>
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
        </div>
        <div v-if="!isRuleNameValid" class="error-message m-1 text-red-500 ml-3">{{
          ruleErrorMessage
        }}</div>
      </div>
      <div>
        <div class="m-2 mb-4">
          <h3>Add new SLA Category</h3>
        </div>
        <div class="flex category-container m-1">
          <div class="p-float-label">
            <InputText id="categoryName" v-model="categoryName" class="enter-category m-1" />
            <label for="categoryName">Category name</label>
          </div>
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
          <Button
            class="add-category m-1"
            icon="pi pi-plus"
            style="background-color: var(--flowMetricsBlue)"
            @click="createCategory"
          ></Button>
        </div>
        <div v-if="!isSLACategoryNameValid" class="error-message m-1 text-red-500 ml-3">
          {{ categoryErrorMessage }}
        </div>
      </div>
      <div>
        <div class="m-2 mb-4">
          <h3>Add Reaction Time</h3>
        </div>
        <h3></h3>
        <div class="flex category-container m-1">
          <Dropdown
            v-model="selectedRuleForReactionTime"
            :options="rules"
            class="select-rule-for-reaction-time m-1"
            optionLabel="name"
            placeholder="Select rule"
          />
          <div class="p-float-label">
            <InputMask
              id="reactionTime"
              v-model="newReactionTime"
              class="enter-reaction-time m-1"
              mask="99w 99d 99h"
            />
            <label for="reactionTime">Reaction time</label>
          </div>
          <Button
            class="add-reaction-time m-1"
            icon="pi pi-plus"
            style="background-color: var(--flowMetricsBlue)"
            @click="addReactionTime"
          ></Button>
        </div>
        <div v-if="!isReactionTimeValid" class="error-message m-1 text-red-500 ml-3">
          {{ reactionTimeErrorMessage }}
        </div>
      </div>
      <div class="mt-4">
        <h3>SLA Categories</h3>
        <DataTable :value="categories">
          <Column field="name" header="Category" />
          <Column field="subscriber.name" header="Subscriber" />
          <Column field="rule.name" header="Rule" />
          <Column field="rule.durationInDays" header="Duration (Days)" />
          <Column field="rule.expirationDate" header="Due date" />
          <Column field="rule.occurredIn" header="Occurred in" />
          <Column field="rule.reactionTime" header="Reaction time" />
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
import useSLAStore from '@/store/slaStore';
import type { SLASubscriber } from '@/model/SLASubscriber';
import type { SLARule } from '@/model/SLARule';
import type { SLACategory } from '@/model/SLACategory';
import GeneratePDF from '@/components/GeneratePDF.vue';

// Define the 'SLAComponent' component
export default defineComponent({
  name: 'SlaView',
  components: { GeneratePDF },
  data() {
    return {
      slaStore: useSLAStore(),
      newSubscriber: ref(''),
      isSubscriberNameValid: ref(true),
      newRuleName: ref(''),
      isRuleNameValid: ref(true),
      newOccurredIn: ref(null),
      selectedSubscriber: ref(null),
      selectedRule: ref(null),
      selectedRuleForReactionTime: ref<SLARule | null>(null),
      categoryName: ref(''),
      newReactionTime: ref(''),
      isSLACategoryNameValid: ref(true),
      isReactionTimeValid: ref(true),
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
        occurredIn: this.newOccurredIn,
        reactionTime: null,
      };
      this.slaStore.addRule(rule);
      this.newRuleName = '';
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
    // Add a reaction time to a rule
    addReactionTime() {
      if (this.newReactionTime.trim().length < 9) {
        this.isReactionTimeValid = false;
        return;
      }
      if (this.selectedRuleForReactionTime === null || this.newReactionTime === '00w 00d 00h') {
        return;
      }
      const rule: SLARule = {
        id: this.selectedRuleForReactionTime?.id || null,
        name: this.selectedRuleForReactionTime?.name || null,
        durationInDays: this.selectedRuleForReactionTime?.durationInDays || null,
        expirationDate: this.selectedRuleForReactionTime?.expirationDate || null,
        occurredIn: this.selectedRuleForReactionTime?.occurredIn || null,
        reactionTime: this.newReactionTime,
      };
      const reactionTime = this.newReactionTime.trim();
      this.slaStore.updateRule(rule, reactionTime);
      this.newReactionTime = '';
      this.selectedRuleForReactionTime = null;
      this.isReactionTimeValid = true;
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
    SubscriberErrorMessage(): string {
      return !this.isSubscriberNameValid ? 'Subscriber name must be at least 3 characters.' : '';
    },
    // Error message for invalid rule name
    ruleErrorMessage(): string {
      return !this.isRuleNameValid ? 'Rule name must be at least 3 characters.' : '';
    },
    // Error message for invalid category name
    categoryErrorMessage(): string {
      return !this.isSLACategoryNameValid ? 'Category name must be at least 3 characters.' : '';
    },
    // Error message for invalid reaction time
    reactionTimeErrorMessage(): string {
      return !this.isReactionTimeValid ? 'Reaction time must be in format 01w 23d 00h' : '';
    },
  },
});
</script>

<style scoped>
.error-message {
  font-size: 16px;
}
</style>
