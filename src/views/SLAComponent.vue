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
            <h3>Add SLA Deadline</h3>
            <InputText v-model="newRule" placeholder="Enter rule name" />
            <Button @click="addRule" label="Add" />
        </div>

        <div>
            <h3>Create SLA Category</h3>
            <Dropdown
                v-model="selectedSubscriber"
                :options="subscribers"
                optionLabel="name"
                placeholder="Select subscriber"
            />
            <Dropdown
                v-model="selectedRule"
                :options="rules"
                optionLabel="name"
                placeholder="Select rule"
            />
            <Button @click="createCategory" label="Create" />
        </div>

        <div>
            <h3>SLA Categories</h3>
            <DataTable :value="categories">
                <Column field="subscriber.name" header="Subscriber" />
                <Column field="rule.name" header="Rule" />
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
    const newRule = ref('');
    const selectedSubscriber = ref(null);
    const selectedRule = ref(null);

    slaStore.initializeCategories();

    // Get categories, deadlines, and rules from the store
    const subscriber = computed(() => slaStore.subscriber);
    const rules = computed(() => slaStore.rules);
    const categories = computed(() => slaStore.slaCategories);

    // Add a new category to the store
    const addSubscriber = () => {
      const category: SLASubscriber = { id: null, name: newSubscriber.value.trim(), description: null };
      slaStore.addSubscriber(category);
      newSubscriber.value = '';
    };

    // Add a new deadline to the store
    const addRule = () => {
      const deadline: SLARule = {
        id: null, name: newRule.value.trim(), durationInDays: null, expirationDate: null, maxAssignedEmployees: null,
      };
      slaStore.addRule(deadline);
      newRule.value = '';
    };

    // Create a new SLA rule using selected category and deadline
    const createCategory = () => {
      if (selectedSubscriber.value && selectedRule.value) {
        const category: SLACategory = {
          subscriber: selectedSubscriber.value,
          rule: selectedRule.value,
        };
        slaStore.addSLACategory(category);
        selectedSubscriber.value = null;
        selectedRule.value = null;
      }
    };

    return {
      newSubscriber,
      newRule,
      selectedSubscriber,
      selectedRule,
      subscribers: subscriber,
      rules,
      addSubscriber,
      addRule,
      createCategory,
      categories,
    };
  },
});
</script>

<style scoped>
.background-card {

}
</style>
