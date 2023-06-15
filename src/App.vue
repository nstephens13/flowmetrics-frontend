<template>
  <MenuBar></MenuBar>
  <body>
    <div class="wrapper"></div>
  </body>

  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import MenuBar from './components/MenuBar.vue';

</script>

<script lang="ts"></script>

<style scoped>

</style>
