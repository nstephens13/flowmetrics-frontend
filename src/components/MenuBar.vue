<template>
  <Menubar>
    <template #start>
      <div class="container">
        <div>
          <Button
            id="sidebarButton"
            text
            icon="pi pi-bars"
            style="color: var(--primary-color-text)"
            aria-label="Submit"
            @click="visible = !visible"
          >
          </Button>
        </div>
        <SlideMenuButton @show-sidebar="showSidebar" />
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
import SlideMenuButton from './SlideMenuButton.vue';

const productName = 'FlowMetrics';
const visible = ref(false);

const showSidebar = () => {
  visible.value = true;
};
const hideSidebar = () => {
  visible.value = false;
};
const handleMouseMove = (event: MouseEvent) => {
  const mouseX = event.clientX;
  const thresholdToHide = 300;
  if (mouseX > thresholdToHide) {
    hideSidebar();
  }
};
onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove);
});

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', handleMouseMove);
});

// Items to be listed in Sidebar
const items = ref([
  {
    label: 'Project overview',
    icon: 'pi pi-fw pi-book',
    to: '/project-overview',
  },
  {
    label: 'Employee overview',
    icon: 'pi pi-fw pi-users',
    to: '/employee-overview',
  },
  {
    label: 'Create sla rules',
    icon: 'pi pi-fw pi-filter',
    to: '/create-sla-rules',
  },
  {
    label: 'Issue calculator',
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
  height: 70px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10000;
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
