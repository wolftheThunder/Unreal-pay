<template>
  <nav class="bg-[#142562] text-white p-[18px]">
    <div class="flex justify-between items-center font-mono">
    
      <div class="text-2xl font-semibold font-rethink">
        <router-link to="/" class="hover:text-black p-2 rounded">Reminders</router-link> </div>

      <div class="lg:hidden flex items-center">
        <button @click="toggleMenu" class="text-white">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>

      <div class="hidden lg:flex text-xl ">
        <router-link to="/todos" class="hover:text-[#6589FF] p-2 rounded">ToDo</router-link>
        <router-link to="/meetings" class="hover:text-[#6589FF] p-2 rounded">Meetings</router-link>
        <router-link to="/loans" class="hover:text-[#6589FF] p-2 rounded">Loans</router-link>
        <router-link to="/completed-tasks" class="hover:text-[#6589FF] p-2 rounded">Completed</router-link>
      </div>
    </div>
    <div v-if="menuOpen" class="lg:hidden mt-2 space-y-4">
      <router-link to="/todos" class="block p-2 text-white hover:bg-blue-700 rounded">ToDo List</router-link>
      <router-link to="/meetings" class="block p-2 text-white hover:bg-blue-700 rounded">Meetings</router-link>
      <router-link to="/loans" class="block p-2 text-white hover:bg-blue-700 rounded">Loans</router-link>
      <router-link to="/completed-tasks" class="block p-2 text-white hover:bg-blue-700 rounded">Completed Tasks</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'AppNavbar',
  data() {
    return {
      menuOpen: false,  
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;  
    },
  },
}
</script>

<style scoped>
</style>
