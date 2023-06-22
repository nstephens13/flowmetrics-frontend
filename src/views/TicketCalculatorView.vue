<template>
  <div class="card" style="position: relative">
    <Card>
      <template #title>
        Ticket Calculator
        <Divider></Divider>
      </template>
      <template #content>
        <TicketCalculatorTopPanel />
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import TicketCalculatorTopPanel from '@/components/TicketCalculatorTopPanel.vue';
</script>
