<template>
  <Menubar>
    <template #start>
      <div class="container">
        <div>
          <Button
            id="sidebarButton"
            aria-label="Submit"
            icon="pi pi-bars"
            style="color: var(--primary-color-text)"
            text
            @click="visible = !visible"
          >
          </Button>
        </div>
        <div>
          <h2 id="productName">{{ productName }}</h2>
        </div>
      </div>
      <Sidebar v-model:visible="visible">
        <Menu id="sidebarMenu" :model="items"></Menu>
      </Sidebar>
    </template>
    <template #end>
      <div class="p-inputgroup flex-1">
        <InputText id="tokenInput" v-model="tokenInputValue" placeholder="Jira Token" />
        <Button label="Enter" severity="secondary" @click="saveToken" />
      </div>
    </template>
  </Menubar>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { Ref } from 'vue';
import useTokenStore from '@/store/tokenStore';
import initProjectStore from '@/store/mockdata/initProjectStore';
import initFilterConfigStore from '@/store/mockdata/initFilterConfigStore';
import initSLAStore from '@/store/mockdata/initSLAStore';

const productName = 'FlowMetrics';
const visible = ref();
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

const tokenStore = useTokenStore();
const tokenInputValue: Ref<string> = ref('');

function saveToken() {
  tokenStore.setToken(tokenInputValue.value);

  initProjectStore();
  initFilterConfigStore();
  initSLAStore();
}
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
