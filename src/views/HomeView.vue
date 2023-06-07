<template>
  <ComponentDemo msg="Hello User" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

// Components
import ComponentDemo from '../components/ComponentDemo.vue'

export default defineComponent({
  name: 'HomeView',

  components: {
    ComponentDemo
  }
})
</script>
