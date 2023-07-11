<template>
  <div class="card" style="position: relative">
    <Card>
      <template #title>
        Issue Calculator
        <Divider></Divider>
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
</style>
