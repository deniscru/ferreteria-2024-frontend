<template>
  <div class="app">
    <ComponentFooter />
    <NavBarComponent />
    <router-view />
  </div>
</template>

<script>
import ComponentFooter from './components/ComponentFooter.vue';
import NavBarComponent from './components/NavBarComponent.vue'
export default {
  components: {
    ComponentFooter,
    NavBarComponent
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
</style>
