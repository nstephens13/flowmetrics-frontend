<template>
  <Menubar>
    <template #start>
      <div class="container">
        <div>
          <h2 id="productName">{{ productName }}</h2>
        </div>
      </div>
      <Sidebar v-model:visible="visible">
        <Menu :model="items" id="sidebarMenu"></Menu>
      </Sidebar>
    </template>
  </Menubar>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

const productName = 'FlowMetrics';
const visible = ref(false);
const showSidebar = () => {
  visible.value = true;
};

const hideSidebar = () => {
  visible.value = false;
};

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove);
});

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', handleMouseMove);
});

const handleMouseMove = (event) => {
  const mouseX = event.clientX;
  const threshold = 50; // Adjust the threshold as needed

  if (mouseX <= threshold) {
    showSidebar();
  } else {
    hideSidebar();
  }
};
// Items to be listed in Sidebar
const items = ref([
  {
    label: 'Project Overview',
    icon: 'pi pi-fw pi-book',
    to: '/project-overview',
  },
  {
    label: 'Employee Overview',
    icon: 'pi pi-fw pi-users',
    to: '/employee-overview',
  },
  {
    label: 'Create SLA Rules',
    icon: 'pi pi-fw pi-filter',
    to: '/sla-management',
  },
  {
    label: 'Issue Calculator',
    icon: 'pi pi-fw pi-ticket',
    to: '/issue-calculator',
  },
]);
</script>

<style scoped>
.p-menubar {
  background-color: var(--flowMetricsBlue);
  color: #ffffff;
  border: 0;
  border-radius: 0;
}

#productName {
  margin: 0.3rem 0.5rem 0;
}
.container {
  display: flex;
}
</style>

<style>
#sidebarMenu {
  border: 0;
  border-radius: 0;
  width: 100%;
}
</style>
