
<template>
        <Menubar :model="items" label="FM" class="mr-2" size="large">
            <template #start >
                <h2 id="productName">FlowMetrics</h2>
            </template>
            <template #end>
                <Button rounded text icon="pi pi-ellipsis-v" style="color: var(--primary-color-text)" aria-label="Submit"></Button>
            </template>
        </Menubar>
</template>

<script setup lang="ts">
import { ref } from "vue";

const items = ref([
    {
        label: 'Project Overview',
        icon: 'pi pi-fw pi-file',
        to: '/about'
    },
    {
        label: 'Employee Overview',
        icon: 'pi pi-fw pi-pencil',
        to: '/'
    },
    {
        label: 'New Rule',
        icon: 'pi pi-fw pi-user',
    }
]);
</script>

<style scoped>
.p-menubar{
     background-color:#2196f3; 
     color: #ffffff;
     border: 0;
     border-radius: 0%;
}

#productName{
    margin: 1rem;
}

#options{ 
     color: #ffffff;
     border: 0;
     border-radius: 50%;
}
</style>