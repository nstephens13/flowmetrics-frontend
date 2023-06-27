<template>
  <Card>
    <template #title>
      <div class="grid">
        <div class="col-12">
          <label class="col-12 gap-3">Employee Overview</label>
          <Dropdown optionLabel="name" placeholder="Select a project" class="w-full md:w-14rem" />
          <Dropdown optionLabel="name" placeholder="Select a employee" class="w-full md:w-14rem" />
        </div>
      </div>
      <Divider />
    </template>
    <template #content>
    <DataView :value="employeeList" dataKey="employee.id" layout="grid">
      <template #grid="slotProps">
                <div class="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
                    <div class="p-4 border-1 surface-border surface-card border-round">
                      <EmployeeCard :employee="slotProps.data.employee" :issues="slotProps.data.issues" />
                    </div>
                </div>
            </template>
    </DataView>
</template>
  </Card>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import EmployeeCard from '@/components/EmployeeCard.vue'

const products = ref();
const employeeList = ref();

onMounted(() => {
  employeeList.value = Array.from(calculateWorkload(getMockData(3)), ([employee, issues]) => ({ employee, issues}));
  console.debug(employeeList.value);
})


</script>

<script lang="ts">
import calculateWorkload from '@/services/workloadCalculator'
import getMockData from '@/assets/__mockdata__/mockDataComposer';


</script>

<style scoped>
.p-card {
  margin: 15px;
  box-shadow: none;
}
</style>
