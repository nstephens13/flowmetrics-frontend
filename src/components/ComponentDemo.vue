<template>
  <h1>{{ msg }}</h1>
  <div class="card flex justify-content-center">
    <Button label="Submit"></Button>
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
