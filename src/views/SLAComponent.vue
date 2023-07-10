<template>
  <Card class="background-card">
    <template #title>
      SLA Management View
      <Divider></Divider>
    </template>
    <template #content>
      <div>
        <h3>Add SLA Subscriber</h3>
        <div class="subscriber-container">
          <InputText
            v-model="newSubscriber"
            placeholder="Enter subscriber name"
            class="enter-subscriber"
          />
          <Button class="add-subscriber" @click="addSubscriber" label="+"></Button>
          <div v-if="!isSubscriberNameValid" class="error-message">
            {{ SubscriberErrorMessage }}
          </div>
        </div>
      </div>
      <div>
        <h3>Add SLA Rule</h3>
        <div class="rule-container">
          <InputText v-model="newRuleName" placeholder="Enter rule name" class="enter-rule" />
          <Dropdown
            v-model="newRuleMaxAssignedEmployees"
            :options="maxAssignedEmployeesOptions"
            placeholder="Select max assigned employees"
            class="select-employees"
          />
          <Dropdown
            v-model="newOccurredIn"
            :options="occurredInOptions"
            placeholder="Occurred in"
            class="select-occurred-in"
          />
          <Button class="add-rule" @click="addRule" label="+"></Button>
          <div v-if="!isRuleNameValid" class="error-message">{{ ruleErrorMessage }}</div>
        </div>
      </div>
      <div>
        <h3>Add new SLA Category</h3>
        <div class="category-container">
          <Dropdown
            v-model="selectedSubscriber"
            :options="subscriber"
            optionLabel="name"
            placeholder="Select subscriber"
            class="select-subscriber"
          />
          <Dropdown
            v-model="selectedRule"
            :options="rules"
            optionLabel="name"
            placeholder="Select rule"
            class="select-rule"
          />
          <InputText
            v-model="categoryName"
            placeholder="Enter category name"
            class="enter-category"
          />
          <Button class="add-category" @click="createCategory" label="+"></Button>
          <div v-if="!isSLACategoryNameValid" class="error-message">
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
                class="p-button-danger trash-size"
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
import useSLAStore from '@/store/store';
import type { SLASubscriber } from '@/model/SLASubscriber';
import type { SLARule } from '@/model/SLARule';
import type { SLACategory } from '@/model/SLACategory';
import GeneratePDF from '@/components/GeneratePDF.vue';

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
    deleteCategory(category: SLACategory) {
      this.slaStore.deleteSLACategory(category);
    },
  },
  computed: {
    subscriber(): SLASubscriber[] {
      return this.slaStore.subscriber;
    },
    rules(): any {
      return this.slaStore.rules;
    },
    categories(): SLACategory[] {
      return this.slaStore.slaCategories;
    },
    SubscriberErrorMessage(): any {
      return !this.isSubscriberNameValid ? 'Subscriber name must be at least 3 characters.' : '';
    },
    ruleErrorMessage(): any {
      return !this.isRuleNameValid ? 'Rule name must be at least 3 characters.' : '';
    },
    categoryErrorMessage(): any {
      return !this.isSLACategoryNameValid ? 'Category name must be at least 3 characters.' : '';
    },
  },
});
</script>

<style scoped>
/* View background */
.background-card {
  height: auto;
  width: auto;
}
/* Add Subscriber Container */
.subscriber-container {
  display: flex;
  align-items: center;
  margin-bottom: 40px;
}
.enter-subscriber {
  margin-right: 10px;
}
.add-subscriber {
  background-color: mediumseagreen;
  color: white;
  border: none;
  justify-content: center;
  height: 30px;
  width: 30px;
  padding: 0;
  font-size: 12px;
}
/* Add SLA Rule Container */
.rule-container {
  display: flex;
  align-items: center;
  margin-bottom: 40px;
}
.enter-rule {
  margin-right: 10px;
}
.select-employees {
  margin-right: 10px;
}
.select-occurred-in {
  margin-right: 10px;
}
.add-rule {
  background-color: mediumseagreen;
  color: white;
  border: none;
  justify-content: center;
  height: 30px;
  width: 30px;
  padding: 0;
  font-size: 12px;
}
/* Add new SLA Category Container */
.category-container {
  display: flex;
  align-items: center;
  margin-bottom: 40px;
}
.select-subscriber {
  margin-right: 10px;
}
.select-rule {
  margin-right: 10px;
}
.enter-category {
  margin-right: 10px;
}
.add-category {
  background-color: mediumseagreen;
  color: white;
  border: none;
  justify-content: center;
  height: 30px;
  width: 30px;
  padding: 0;
  font-size: 12px;
}
/* Delete Button */
.p-button-danger {
  background-color: red;
  color: white;
  border: none;
  height: 30px;
  width: 30px;
}
.trash-size {
  color: white;
  font-size: 5px;
}
.error-message {
  display: block;
  color: red;
  font-size: 16px;
  margin-top: 4px;
  font-family: inherit;
  margin-left: 10px;
}
</style>
