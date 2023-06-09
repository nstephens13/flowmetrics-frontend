<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { defineComponent } from 'vue';
import MenuBar from './components/MenuBar.vue';

</script>

<template>
  <MenuBar></MenuBar>
  <body>
    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </body>

  <RouterView />
</template>

<script lang="ts">
export default defineComponent({
  name: 'HomeView',

  components: {
    MenuBar,
  },
});
</script>

<style scoped>

</style>
