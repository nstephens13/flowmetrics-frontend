<template>
  <Card>
    <template #title>
      <div class="grid">
        <div class="col-12">
          <label class="col-12 gap-3">Employee Overview</label>
        </div>
      </div>
      <Divider />
    </template>
    <template #content>
      <DataView :value="employeeList" dataKey="employee.id" layout="grid">
        <template #header>
          <div class="card p-fluid">
            <MultiSelect 
              v-model="selectedEmployee"
              :options="employees"
              placeholder="Select employees"
              class="w-full md:w-14rem"
            />
          </div>
        </template>
        <template #grid="slotProps">
          <div class="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
            <div class="p-4 border-1 surface-border border-round shadow-5 hover:bg-gray-50 ">
              <EmployeeCard :employee="slotProps.data.employee" :issues="slotProps.data.issues" />
            </div>
          </div>
        </template>
      </DataView>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import EmployeeCard from '@/components/EmployeeCard.vue'


const workload = calculateWorkload(getMockData(3));
const employeeList = ref(Array.from(workload, ([employee, issues]) => ({ employee, issues})));
const employees = ref(employeeList.value.map(item => item.employee.firstName + " " + item.employee.lastName));

//should be new employee object without the issues field
const selectedEmployee: Ref<String> = ref("");
</script>

<script lang="ts">
import calculateWorkload from '@/services/workloadCalculator'
import getMockData from '@/assets/__mockdata__/mockDataComposer';
import type { Ref } from 'vue'
import InputText from 'primevue/inputtext';

</script>

<style scoped>
.p-card {
  margin: 15px;
  box-shadow: none;
}
</style>
