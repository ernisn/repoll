<template>
  <nav v-bind:class="{'hide': hideNav}">
    <slot>
    </slot>
  </nav>
</template>

<script>

import '../Assets/Main.css';

export default {
  name: 'ResponsiveNav',
  props: {
    hideNav: Boolean
  }
}
</script>

<style>
  /*
      see file '../assets/css/main.css';
    */
  </style>