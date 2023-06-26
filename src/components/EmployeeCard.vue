<template>
  <div class="card">
    <Card>
      <template #subtitle>
        <p>Employee ID : 3030</p>
        <p>Total Tickets : 100</p>
      </template>
      <template #title>
        Max Musterman
      </template>
      <template #content>
        <div class="flex-none flex flex-column">
          <div class="grid">
            <label for="Open" class="col-3">Open</label>
            <div class="col-9 md:col-9">
              <ProgressBar 
                :value="30"
              />
            </div>
          </div>
          <div class="grid">
            <label for="In Progress" class="col-3">In Progress</label>
            <div class="col-9 md:col-9">
              <ProgressBar 
                :value="45"
              />
            </div>
          </div>
          <div class="field grid">
            <label for="Closed" class="col-3">Closed</label>
            <div class="col-9 md:col-9">
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
