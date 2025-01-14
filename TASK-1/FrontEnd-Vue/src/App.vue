<template>
  <div>
    <Navbar />
    <div id="app" class="container mx-auto p-6">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navbar from './components/AppNavbar.vue';

export default {
  components: {
   Navbar,
  },
}
</script>
