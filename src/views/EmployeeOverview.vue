<template>
  <Card class="background-card">
    <!-- <template #title>
      <h1></h1>
    </template> -->

    <template #header>
      <h1>Employee Overview</h1>
      <span class="pi pi-user"></span>
    </template>

    <div class="card-content">
      <h1>Card content goes here.</h1>
    </div>

    <!-- <template #footer>
      <p></p>
    </template> -->
  </Card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Card from 'primevue/card'

export default defineComponent({
  name: 'EmployeeOverview',
  // Component options and logic
  components: {
    Card
  }
  // Other component and logic
})
</script>

<style>
.background-card {
  width: 1440px; /* Set the width to match the MacBook Air 13'' screen width */
  height: 900px; /* Set the height to match the MacBook Air 13'' screen height */
}
.card-content {
  padding: 20px; /* Adjust the padding as needed */
  color: #a72222; /* Adjust the text color for better visibility */
}
</style>
