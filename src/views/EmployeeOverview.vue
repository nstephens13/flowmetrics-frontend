<template>
  <Card class="background-card">
    <template #title>Employee Overview</template>

    <template #content>
      <div class="icon-container">
        <div class="icon-background">
          <span class="pi pi-user user-size"></span>
        </div>
      </div>

      <div class="user-name-container">
        <div class="user-name-background">
          <div class="user-name">John Doe</div>
        </div>
      </div>

      <div class="statistics-container">
        <div class="open"></div>
        <div class="in-progress"></div>
        <div class="closed"></div>
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
/* Card Component */
.background-card {
  width: 1440px; /* Set the width to match the MacBook Air 13'' screen width */
  height: 700px;
}
.card-title {
  font-size: 20px;
}

/* Employee icon and background */
.icon-container {
  position: relative;
  top: 20px;
  left: 30px;
}
.icon-background {
  position: absolute;
  width: 100px;
  height: 100px;
  background-color: rgba(128, 128, 128, 0.7); /* RGB values and opacity */
  border-radius: 5%; /* Change roundness of edges */
  display: flex;
  align-items: center;
  justify-content: center;
}
.user-size {
  font-size: 70px;
  color: white;
}
/* User name and background */
.user-name-container {
  position: relative;
  top: 130px;
  left: 30px;
}
.user-name-background {
  position: absolute;
  width: 100px;
  height: 20px;
  background-color: rgba(45, 108, 193, 0.9);
  border-radius: 5%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.user-name {
  font-size: 13px;
  color: white;
  position: absolute;
}

/* Statistics */
.statistics-container {
  position: relative;
  bottom: -40px;
  left: 150px;
  display: flex;
  align-items: flex-end; /* Allign items to the bottom */
}

.open {
  width: 20px;
  height: 80px;
  background-color: grey;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
}

.in-progress {
  width: 20px;
  height: 80px;
  background-color: grey;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
}

.closed {
  width: 20px;
  height: 80px;
  background-color: grey;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
}
</style>
