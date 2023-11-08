<template>
  <div class="card" style="position: relative">
    <Card>
      <template #title>
        <p>Issue Calculator</p>
        <Divider class="p-divider p-divider-horizontal divider-position" />
      </template>
      <template #content>
        <IssueCalculator></IssueCalculator>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import IssueCalculator from '@/components/IssueCalculator.vue';
</script>

<style scoped>
.p-card {
  margin: 15px;
  box-shadow: none;
}
.divider-position {
  width: 100%;
}
</style>
