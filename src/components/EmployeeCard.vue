<template>
  <div class="card">
    <Card>
      <template #title>
        <Avatar
          label="M"
          class="mr-2"
          size="large"
          style="background-color: #2196f3; color: #ffffff"
        ></Avatar>
        Max Musterman
      </template>
      <template #content>
        <div class="flex-none flex flex-column">
          <div class="field grid">
            <label for="firstname3" class="gap-2">Open</label>
            <div class="col-12 md:col-10">
              <ProgressBar :value="30"></ProgressBar>
            </div>
          </div>
          <div class="field grid">
            <label for="firstname3">In Progress</label>
            <div class="col-12 md:col-10">
              <ProgressBar :value="45"></ProgressBar>
            </div>
          </div>
          <div class="field grid">
            <label for="firstname3">Closed</label>
            <div class="col-12 md:col-10">
              <ProgressBar :value="25"></ProgressBar>
            </div>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script lang="ts">
import type Avatar from 'primevue/avatar'
</script>

<style scoped>
.p-card {
  margin: 15px;
  width: 500px;
}
.p-progressbar {
}
</style>
