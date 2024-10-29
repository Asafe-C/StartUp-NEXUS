<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

nav {
  background-color: #20104b;
  height: 10vh;
  text-align: center;
}

nav a {
  font-weight: 600;
  color: #e7e7e7;
  text-decoration: none;
}
nav a:hover {
  color: #dbdbdb;
  text-decoration: none;
}

/* nav a.router-link-exact-active {
  color: #dbdbdb;
} */
</style>