<template>
  <MenuBar></MenuBar>
  <body></body>
  <div class="content-wrapper">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import { defineComponent } from 'vue';
import MenuBar from '@/components/MenuBar.vue';
</script>

<script lang="ts">
export default defineComponent({
  name: 'HomeView',

  components: {
    MenuBar,
  },
});
</script>

<style scoped>
.content-wrapper {
  margin-top: 50px;
}
</style>
