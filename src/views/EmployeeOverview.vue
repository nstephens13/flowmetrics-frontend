<template>
  <Card class="background-card">
    <div class="card-content">
      <h1>This is the employee overview page</h1>
      <span class="pi pi-user"></span>
    </div>
  </Card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EmployeeOverview'
  // Component options and logic
})
</script>

<style>
.background-card {
  width: 1440px; /* Set the width to match the MacBook Air 13'' screen width */
  height: 900px; /* Set the height to match the MacBook Air 13'' screen height */
}
.card-content {
  padding: 500px; /* Adjust the padding as needed */
  color: #000000; /* Adjust the text color for better visibility */
}
</style>
