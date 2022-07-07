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
    background-color: darkgray;
    width:100%;
    height: 4em;
    display: grid;
    grid-template-columns: repeat(auto-fit, 10em);
  }

  nav ::v-slotted(a) {
    text-transform: uppercase;
    font-size: 0.8rem;
    letter-spacing: 0.1em;
    text-decoration: none;
    color: gray;
    display: grid;
    align-items: center;
    justify-content: center;
  }

  nav ::v-slotted(a).is-active, nav ::v-slotted(a):hover {
    background: #dadada;
    border-bottom: 3px solid black;
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
    background: #3f3f3f;
    border-bottom: none;
  }

  .hide {
    left:-12em;
  }
}
</style>
