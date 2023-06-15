<template>
  <MenuBar></MenuBar>
  <body>
    <div class="wrapper">
      <HelloWorld msg="You did it!" />
      <nav>
        <!--RouterLink to="/" style="font-family: Arial, sans-serif; font-size: 16px">Home
        </RouterLink>
        <RouterLink to="/about" style="font-family: Arial, sans-serif; font-size: 16px"
          >About</RouterLink>
        <RouterLink to="/employee-overview" style="font-family: Arial, sans-serif; font-size: 16px"
          >Employee Overview</RouterLink-->
      </nav>
    </div>
  </body>

  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import { defineComponent } from 'vue';
import MenuBar from './components/MenuBar.vue';
</script>

<script lang="ts">
export default defineComponent({
  name: 'HomeView',

  components: {
    MenuBar,
  },
});
</script>

<style scoped></style>
