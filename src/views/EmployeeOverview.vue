<template>
  <Card class="background-card">
    <template #title>Employee Overview</template>

    <template #content>
      <div class="icon-container">
        <div class="icon-background"></div>
        <span class="pi pi-user user-size"></span>
      </div>
    </template>
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
  height: 700px;
}
.card-title {
  font-size: 20px;
}
.icon-container {
  position: relative;
  top: 20px;
  left: 30px;
}
.icon-background {
  position: absolute;
  width: 100px;
  height: 100px;
  background-color: rgba(128, 128, 128, 0.5); /* RGB values and opacity */
  border-radius: 10%; /* Change roundness of edges */
}
.user-size {
  font-size: 70px;
  color: white;
  position: absolute;
  transform: translate(21%, 20%); /* Center icon in icon-background */
}
</style>
