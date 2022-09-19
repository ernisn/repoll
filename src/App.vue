<template>
  <router-view/>
</template>

<style>
body {
  margin: 0;
  padding: 0;
  background-color: black;

}
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: white;
}
#nav {
  padding: 25px;
  background-color: green;
  color: white;
}
#nav a {
  padding: 0.4em;
  font-weight: bold;
  background-color: white;
  color: white;
}
#nav a.router-link-exact-active {
  background-color: green;
  color: white;
  border-color: black;
  border-radius: 1px;
}

</style>
