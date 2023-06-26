<template>
  <Card>
    <template #title>
      <div class="grid">
        <div class="col-12">
          <label class="col-12 gap-3">Employee Overview</label>
          <Dropdown
            optionLabel="name"
            placeholder="Select a project"
            class="w-full md:w-14rem"
          />
          <Dropdown
            optionLabel="name"
            placeholder="Select a employee"
            class="w-full md:w-14rem"
          />
        </div>
      </div>
      <Divider/>
    </template>
    <template #content>
      <Divider/>
      <div class="grid">
        <div class="col-4"><EmployeeCard /></div>
        <div class="col-4"><EmployeeCard /></div>
        <div class="col-4"><EmployeeCard /></div>
        <div class="col-4"><EmployeeCard /></div>
        <div class="col-4"><EmployeeCard /></div>
        <div class="col-4"><EmployeeCard /></div>
      </div>
    </template>
  </Card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import EmployeeCard from '../components/EmployeeCard.vue'

export default defineComponent({
  name: 'EmployeeOverview2',
  components: {
    EmployeeCard
  }
})
</script>

<style scoped>
.p-card {
  margin: 15px;
  box-shadow: none;
}
</style>
