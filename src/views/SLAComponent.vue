<template>
    <Card class="background-card">
        <template #title>SLA Management View</template>
        <template #content>
            <div>
                <h3>Add SLA Subscriber</h3>
                <InputText v-model="newSubscriber" placeholder="Enter subscriber name" />
                <Button @click="addSubscriber" label="Add" />
            </div>

            <div>
                <h3>Add SLA Rule</h3>
                <InputText v-model="newRuleName" placeholder="Enter rule name" />
                <Dropdown v-model="newRuleMaxAssignedEmployees" :options="maxAssignedEmployeesOptions" placeholder="Select max assigned employees" />
                <Button @click="addRule" label="Add" />
            </div>

            <div>
                <h3>Create SLA Category</h3>
                <Dropdown v-model="selectedSubscriber" :options="subscriber" optionLabel="name" placeholder="Select subscriber" />
                <Dropdown v-model="selectedRule" :options="rules" optionLabel="name" placeholder="Select rule" />
                <InputText v-model="categoryName" placeholder="Enter category name" />
                <Button @click="createCategory" label="Create" />
            </div>

            <div>
                <h3>SLA Categories</h3>
                <DataTable :value="categories">
                    <Column field="name" header="Category" />
                    <Column field="subscriber.name" header="Subscriber" />
                    <Column field="rule.name" header="Rule" />
                    <Column field="rule.durationInDays" header="Duration (Days)" />
                    <Column field="rule.expirationDate" header="Expiration Date" />
                    <Column field="rule.maxAssignedEmployees" header="Max Assigned Employees" />
                    <Column header="Delete">
                        <template #body="rowData">
                            <Button icon="pi pi-trash" class="p-button-danger" @click="deleteCategory(rowData.data)"></Button>
                        </template>
                    </Column>
                </DataTable>
            </div>
        </template>
    </Card>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import Card from 'primevue/card';
import useSLAStore from '../store/store';
import type { SLASubscriber } from '@/model/SLASubscriber';
import type { SLARule } from '@/model/SLARule';
import type { SLACategory } from '@/model/SLACategory';

export default defineComponent({
  name: 'SLAComponent',

  components: {
    Card,
  },

  setup() {
    const slaStore = useSLAStore();

    const newSubscriber = ref('');
    const newRuleName = ref('');
    const newRuleMaxAssignedEmployees = ref(null);
    const selectedSubscriber = ref(null);
    const selectedRule = ref(null);
    const categoryName = ref('');

    slaStore.initializeCategories();

    // Get categories, deadlines, and rules from the store
    const subscriber = computed(() => slaStore.subscriber);
    const rules = computed(() => slaStore.rules);
    const categories = computed(() => slaStore.slaCategories);

    // Add a new subscriber to the store
    const addSubscriber = () => {
      const subscriber: SLASubscriber = { id: null, name: newSubscriber.value.trim(), description: null };
      slaStore.addSubscriber(subscriber);
      newSubscriber.value = '';
    };

    // Add a new rule to the store
    const addRule = () => {
      const rule: SLARule = {
        id: null,
        name: newRuleName.value.trim(),
        durationInDays: null,
        expirationDate: null,
        maxAssignedEmployees: newRuleMaxAssignedEmployees.value,
      };
      slaStore.addRule(rule);
      newRuleName.value = '';
      newRuleMaxAssignedEmployees.value = null;
    };

    // Create a new SLA category using selected subscriber and rule
    const createCategory = () => {
      if (selectedSubscriber.value && selectedRule.value) {
        const category: SLACategory = {
          id: null,
          name: categoryName.value.trim() || null,
          subscriber: selectedSubscriber.value,
          rule: selectedRule.value,
        };
        slaStore.addSLACategory(category);
        selectedSubscriber.value = null;
        selectedRule.value = null;
        categoryName.value = '';
      }
    };
    const deleteCategory = (category: SLACategory) => {
      slaStore.deleteSLACategory(category);
    };
    // Template for the delete button in each row

    // Options for the max assigned employees dropdown
    const maxAssignedEmployeesOptions = [1, 2, 3, 4, 5];

    return {
      newSubscriber,
      newRuleName,
      newRuleMaxAssignedEmployees,
      selectedSubscriber,
      selectedRule,
      categoryName,
      subscriber,
      rules,
      maxAssignedEmployeesOptions,
      addSubscriber,
      addRule,
      createCategory,
      categories,
      deleteCategory,
    };
  },
});
</script>

<style scoped>
.background-card {

}
</style>
