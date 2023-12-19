<template>
  <div class="menu-button" @mouseenter="showSidebar">
    <div class="menu-icon">
      <span class="pi pi-chevron-right"></span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  methods: {
    showSidebar() {
      this.$emit('show-sidebar');
    },
  },
});
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
  justify-content: center;
  align-items: center;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
}

.menu-icon {
  font-size: 20px;
}
</style>
