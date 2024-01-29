<template>
  <div class="card">
    <Card class="project-card">
      <template #title>
        <div
          class="flex flex-row align-content-center align-items-center justify-content-start mt-3"
        >
          Project Overview
          <Dropdown
            v-model="selectedProject"
            :options="projects"
            optionLabel="name"
            placeholder="Select a project"
            class="w-full md:w-20rem ml-4"
          />
        </div>
        <Divider class="p-divider p-divider-horizontal divider-position" />
      </template>
      <template #content>
        <div class="flex flex-wrap overflow-hidden" style="min-width: 100%">
          <div class="flex" style="width: 60%">
            <Card class="project-info-card" style="width: 100%">
              <template #title>
                <div class="ml-2" v-if="selectedProject.name">
                  {{ selectedProject.name }}
                  <Chip class="ml-2 pl-0 pr-3">
                    <span
                      class="bg-blue-600 text-white font-bold border-circle w-2rem h-2rem flex align-items-center justify-content-center"
                      >ID</span
                    >
                    <span class="ml-2 font-medium">{{ selectedProject.id }}</span>
                  </Chip>
                </div>
                <div v-else> Project </div>
              </template>
              <template #subtitle
                ><span class="ml-2">{{ selectedProject?.description }}</span></template
              >
              <template #content>
                <div class="flex flex-wrap" style="min-width: 100%">
                  <div class="flex m-2" style="min-width: 48%">
                    <KeyFactsCard
                      :project="selectedProject"
                      style="width: 100%; height: 100%"
                    ></KeyFactsCard>
                  </div>
                  <div class="flex m-2" style="min-width: 48%">
                    <AssigneeCard
                      :project="selectedProject"
                      style="width: 100%; height: 100%"
                    ></AssigneeCard>
                  </div>
                  <div class="flex m-2" style="min-width: 48%">
                    <IssuesCard
                      :project="selectedProject"
                      style="width: 100%; height: 100%"
                    ></IssuesCard>
                  </div>
                  <div class="flex m-2" style="min-width: 48%">
                    <StateRestingTimeCard
                      :project="selectedProject"
                      style="width: 100%; height: 100%"
                    ></StateRestingTimeCard>
                  </div>
                </div>
              </template>
            </Card>
          </div>
          <div class="flex" style="min-width: 40%">
            <BarDiagram :project="selectedProject"></BarDiagram>
          </div>
          <div class="flex-wrap w-full">
            <IssuesTable :project="selectedProject"></IssuesTable>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';
import type { ProjectIF } from '@/model/ProjectIF';
import type { IssueIF } from '@/model/Issue/IssueIF';
import projectStore from '@/store/projectStore';
import IssuesTable from '@/components/IssuesTable.vue';
import KeyFactsCard from '@/components/KeyFactsCard.vue';
import AssigneeCard from '@/components/AssigneeCard.vue';
import BarDiagram from '@/components/BarDiagram.vue';
import StateRestingTimeCard from './StateRestingTimeCard.vue';
import IssuesCard from './IssuesCard.vue';

// Create a reference for the projects array with mock data
const projects: Ref<ProjectIF[]> = ref(projectStore().getProjects);
// Create a reference for the selectedProject with initial data
const selectedProject: Ref<ProjectIF> = ref({
  id: 0,
  name: 'Project',
  description: 'This is the project',
  issues: [] as IssueIF[],
  slaSubscriber: null,
} as ProjectIF);
</script>

<style scoped>
.p-card {
  margin: 15px 0px 0 15px;
  box-shadow: none;
}
.project-card {
  margin: 15px 0px 0 15px;
}
:deep(.project-card > .p-card-body) {
  padding-bottom: 0;
}
:deep(.project-card > .p-card-body > .p-card-content) {
  padding: 0;
}
:deep(.project-info-card > .p-card-body) {
  padding: 0;
}
:deep(.visualisation-card > .p-card-body) {
  padding-top: 0;
  padding-bottom: 0;
}
:deep(.visualisation-card > .p-card-body > .p-card-content) {
  padding-bottom: 0;
}
:deep(.issues-card > .p-card-body) {
  padding-right: 0;
  padding-bottom: 0;
}
:deep(.assignee-card > .p-card-body) {
  padding-right: 0;
  padding-bottom: 0;
}
:deep(.key-facts-card > .p-card-body) {
  padding-right: 0;
  padding-bottom: 0;
}
:deep(.status-resting-time-card > .p-card-body) {
  padding-right: 0;
  padding-bottom: 0;
}
:deep(.issues-table-card > .p-card-body) {
  padding-top: 0;
}
:deep(.issues-table-card > .p-card-body > .p-card-content) {
  padding-top: 0;
}
.divider-position {
  width: 100%;
}
</style>
