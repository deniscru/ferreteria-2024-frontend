<template>
  <div class="home">
    <ViewProdList />
  </div>
</template>

<script>
// @ is an alias to /src
import ViewProdList from './producto/ViewProdList.vue';

export default {
  name: 'HomeView',
  components: {
    ViewProdList
  }
}
</script>
