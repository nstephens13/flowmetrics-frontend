<template>
    <Card class="background-card">
        <template #title>SLA Management View</template>
        <template #content>
        <div>
            <h3>Add SLA Category</h3>
            <InputText v-model="newCategory" placeholder="Enter category name" />
            <Button @click="addCategory" label="Add" />
        </div>

        <div>
            <h3>Add SLA Deadline</h3>
            <InputText v-model="newDeadline" placeholder="Enter deadline name" />
            <Button @click="addDeadline" label="Add" />
        </div>

        <div>
            <h3>Create SLA Rule</h3>
            <Dropdown
                v-model="selectedCategory"
                :options="categories"
                optionLabel="name"
                placeholder="Select category"
            />
            <Dropdown
                v-model="selectedDeadline"
                :options="deadlines"
                optionLabel="name"
                placeholder="Select deadline"
            />
            <Button @click="createRule" label="Create" />
        </div>

        <div>
            <h3>SLA Rules</h3>
            <DataTable :value="slaRules">
                <Column field="category.name" header="Category" />
                <Column field="deadline.name" header="Deadline" />
            </DataTable>
        </div>
        </template>
    </Card>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import Card from 'primevue/card';
import useSLAStore from '../store/store';
import type { SLACategory } from '@/model/SLACategory';
import type { SLADeadline } from '@/model/SLADeadline';
import type { SLARule } from '@/model/SLARule';

export default defineComponent({
  name: 'SLAComponent',

  components: {
    Card,
  },

  setup() {
    const slaStore = useSLAStore();

    const newCategory = ref('');
    const newDeadline = ref('');
    const selectedCategory = ref(null);
    const selectedDeadline = ref(null);

    slaStore.initializeRules();

    // Get categories, deadlines, and rules from the store
    const categories = computed(() => slaStore.categories);
    const deadlines = computed(() => slaStore.deadlines);
    const slaRules = computed(() => slaStore.slaRules);

    // Add a new category to the store
    const addCategory = () => {
      const category: SLACategory = { id: null, name: newCategory.value, description: null };
      slaStore.addCategory(category);
      newCategory.value = '';
    };

    // Add a new deadline to the store
    const addDeadline = () => {
      const deadline: SLADeadline = {
        id: null, name: newCategory.value, durationInDays: null, expirationDate: null,
      };
      slaStore.addDeadline(deadline);
      newDeadline.value = '';
    };

    // Create a new SLA rule using selected category and deadline
    const createRule = () => {
      if (selectedCategory.value && selectedDeadline.value) {
        const rule: SLARule = {
          category: selectedCategory.value,
          deadline: selectedDeadline.value,
        };
        slaStore.addSLARule(rule);
        selectedCategory.value = null;
        selectedDeadline.value = null;
      }
    };

    return {
      newCategory,
      newDeadline,
      selectedCategory,
      selectedDeadline,
      categories,
      deadlines,
      addCategory,
      addDeadline,
      createRule,
      slaRules,
    };
  },
});
</script>

<style scoped>
.background-card {

}
</style>
