<template>
  <nav v-bind:class="{'hide': hideNav}">
    <slot>
    </slot>
  </nav>
</template>

<script>

export default {
  name: 'ResponsiveNav',
  props: {
      hideNav: Boolean
  }
}
</script>

<style scoped>
  nav {
    background-color: white;
    width:100%;
    height: 4em;
    display: grid;
    grid-template-columns: repeat(auto-fit, 10em);
    justify-content: center;
  }

  nav ::v-slotted(a) {
    text-transform: uppercase;
    font-size: 0.8rem;
    letter-spacing: 0.1em;
    text-decoration: none;
    color: white;
    display: grid;
    align-items: center;
    justify-content: center;
    background-color: green;
    border-radius: 1em;
    border: 2em;
  }

  nav ::v-slotted(a).is-active, nav ::v-slotted(a):hover {
    background: lightgreen;
    border-bottom: 2px solid black;
  }

@media screen and (max-width:50em) {
  nav {
    position: absolute;
    height:100vh;
    top: 3em;
    left: 0;
    width:12em;
    display: grid;
    grid-template-rows: repeat(auto-fit, 2em);
    transition: 0.5s;
  }

  nav ::v-slotted(a) {
    justify-content: left;
    padding-left: 1em;
  }

  nav ::v-slotted(a).is-active, nav ::v-slotted(a):hover {
    color: white;
    background: white;
    border-bottom: none;
  }

  .hide {
    left:-12em;
  }
}
</style>
