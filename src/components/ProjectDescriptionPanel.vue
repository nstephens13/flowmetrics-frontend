
<template>
    <div class="card">
        <Card>
            <template #title> {{ projectName }} </template>
            <template #content>
              <h2>Open Tickets : {{ openTickets }}</h2>
              <h2>In progress : {{ inProgressTickets }}</h2>
              <h2>Closed Tickets : {{ closedTickets }}</h2>
            </template>
            <template #footer>
              <Button label="Jira" />
              <Button label="Confluence" severity="secondary" style="margin-left: 0.5em" />
            </template>
        </Card>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const date = ref();

defineProps<{
  projectName: string
  openTickets: string
  closedTickets: string
  inProgressTickets: string
}>();
</script>