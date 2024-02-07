<template>
  <div class="app">
    <ComponentFooter/>
    <NavBarComponent/>
    <router-view/>
  </div>
</template>

<script>
import NavBarComponent from './components/NavBarComponent.vue';
import ComponentFooter from './components/ComponentFooter.vue';

export default {
  components:{
    NavBarComponent,
    ComponentFooter,
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
