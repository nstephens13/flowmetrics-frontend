<template>
  <div class="card" style="position: relative">
    <Card>
      <template #title>
        Ticket Calculator
        <Divider></Divider>
      </template>
      <template #content>
        <TicketCalculator></TicketCalculator>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import TicketCalculator from '@/components/TicketCalculator.vue'
</script>
