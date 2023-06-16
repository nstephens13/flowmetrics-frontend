<template>
  <MenuBar></MenuBar>
  <body></body>
  <RouterView />
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
