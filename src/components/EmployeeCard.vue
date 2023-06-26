<template>
  <div class="card">
    <Card>
      <template #subtitle>Employee ID : 3030</template>
      <template #title>
        Max Musterman
      </template>
      <template #content>
        <div class="flex-none flex flex-column">
          <div class="field grid">
            <label for="Open" class="gap-2">Open</label>
            <div class="col-12 md:col-10">
              <ProgressBar 
                :value="30"
              />
            </div>
          </div>
          <div class="field grid">
            <label for="In Progress">In Progress</label>
            <div class="col-12 md:col-10">
              <ProgressBar 
                :value="45"
              />
            </div>
          </div>
          <div class="field grid">
            <label for="Closed">Closed</label>
            <div class="col-12 md:col-10">
              <ProgressBar 
                :value="25"
              />
            </div>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script lang="ts">
</script>

<style scoped>
.p-card {
  margin: 15px;
  width: 500px;
}
.p-progressbar{
  
}
</style>
