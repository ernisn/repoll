<template>
  <nav v-bind:class="{'hide': hideNav}">
    <slot>
    </slot>
  </nav>
</template>

<script>

import '../components/Assets/Main.css'; 

export default {
  name: 'ResponsiveNav',
  props: {
      hideNav: Boolean
  }
}
</script>

<style scoped>
  
</style>
