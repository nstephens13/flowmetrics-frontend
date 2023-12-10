<template>
  <div class="menu-button">
    <div class="menu-icon">
      <span class="pi pi-chevron-right"></span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

<style scoped>
.menu-button {
  position: fixed;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 30px;
  height: 70px;
  padding: 5px;
  background-color: var(--flowMetricsBlue);
  display: flex;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
}

.menu-icon {
  font-size: 20px;
}

.menu-content {
  position: fixed;
  left: 0;
  top: 0;
  width: 200px; /* Adjust the width of the menu */
  height: 100%;
  background-color: #f0f0f0;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  display: none; /* Hide the menu content by default */
}
</style>
