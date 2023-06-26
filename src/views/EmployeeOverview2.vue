<template>
  <Card>
    <template #title>
      Employee Overview
      <Divider></Divider>
    </template>
    <template #content>
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
