<template>
  <div class="app">
    <ComponentFooter />
    <ComponentList />
    <router-view />
  </div>
</template>

<script>
import ComponentFooter from './components/ComponentFooter.vue';
import ComponentList from './components/ComponentList.vue';
export default {
  components: {
    ComponentFooter,
    ComponentList
  },

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
