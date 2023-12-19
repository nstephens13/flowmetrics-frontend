<template>
  <div>
    <Card>
      <template #title>Zombie Tickets</template>
      <template #content>
        <DataTable
          paginator
          :rows="10"
          :rowsPerPageOptions="[10, 20, 50, 100]"
          :value="filteredIssues"
          showGridlines
        >
          <Column field="id" header="Issue ID"></Column>
          <Column field="name" header="Name"></Column>
          <Column field="assignedTo" header="Assigned to"></Column>
          <Column field="createdAt" header="Created on"></Column>
          <Column field="state" header="State"></Column>
          <Column field="statusChanges.length" header="Status Changes"></Column>
          <Column field="status" header="Status"></Column>
          <Column field="statusRestingTime" header="Resting time (Status)"></Column>
        </DataTable>
      </template>
    </Card>
    <Card>
      <template #content>
        <div>Minimal resting time in current status (days)</div>
        <div>Minimal number of status changes</div>
        <div>
          <Button>

          </Button>
          <Button>

          </Button>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import type { ProjectIF } from '@/model/ProjectIF';
import {Ref, ref} from "vue";
import type {IssueIF} from "@/model/Issue/IssueIF";
import useFilterConfigStore from "@/store/filterConfigStore";

defineProps({
  project: Object as () => ProjectIF,
});
const filteredIssues: Ref<[IssueIF]> = ref([]);
const maximumRestingTime: Ref<number> = ref(0);
const minimalStatusChanges: Ref<number> = ref(0);
const filterConfigStore = useFilterConfigStore();
filterConfigStore.setFilterConfig()
filteredIssues.value =
</script>
