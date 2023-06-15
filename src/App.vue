<template>
  <MenuBar></MenuBar>
  <body></body>

  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<script lang="ts">
import { defineComponent } from 'vue';
import MenuBar from '@/components/MenuBar.vue';

export default defineComponent({
  name: 'HomeView',

  components: {
    MenuBar,
  },
});
</script>
>>>>>>> development

<style scoped></style>
