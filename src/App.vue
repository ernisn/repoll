<template>
  <router-view/>
</template>

<style>
body {
  margin: 0;
  padding: 0;
  background-color: white;
}
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
#nav {
  padding: 25px;
}
#nav a {
  padding: 0.4em;
  font-weight: bold;
  color: blue;
}
#nav a.router-link-exact-active {
  background-color: green;
  color: white;
}
</style>
