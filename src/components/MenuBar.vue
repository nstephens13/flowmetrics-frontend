<script setup lang="ts">

import { ref } from 'vue';
const visible = ref();
const items = ref([
  {
    label: 'Project Overview',
    icon: 'pi pi-fw pi-book',
    to: '/about',
  },
  {
    label: 'Employee Overview',
    icon: 'pi pi-fw pi-users',
    to: '/',
  },
  {
    label: 'Create Rules',
    icon: 'pi pi-fw pi-filter',
  },
]);

</script>

<template>
        <Menubar>
            <template #start >
                <div class="container">
                    <div>
                        <Button text icon="pi pi-bars" style="color: var(--primary-color-text)" aria-label="Submit" @click="visible = true"></Button>
                    </div>
                    <div>
                        <h2 id="productName">FlowMetrics</h2>
                    </div>
                </div>
                    <Sidebar v-model:visible="visible"> 
                            <Menu :model="items"></Menu>  
                    </Sidebar>
            </template>
            <!--
                Options Button
            <template #end>
                <Button rounded text icon="pi pi-ellipsis-v" style="color: var(--primary-color-text)" aria-label="Submit"></Button>
            </template>
            -->
        </Menubar>
</template>

<style scoped>
.p-menubar{
     background-color:#2196f3;
     color: #ffffff;
     border: 0;
     border-radius: 0%;
}
.p-menu{
    border: 0;
    border-radius: 0%;
}
#productName{
    margin: 0.3rem 0.5rem 0rem;
}
.container {
    display: flex;
}

</style>
