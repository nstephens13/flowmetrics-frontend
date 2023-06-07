<template>
  <h1>{{ msg }}</h1>
  <div class="card flex justify-content-center">
    <Button class="p-button-sm" label="Submit"></Button>
    <Calendar v-model="date"></Calendar>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const date = ref()

defineProps<{
  msg: string
}>()
</script>
