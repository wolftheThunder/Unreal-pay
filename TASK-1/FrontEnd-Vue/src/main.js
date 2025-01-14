import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Navbar from './components/AppNavbar.vue';

import './assets/css/tailwind.css';
const app = createApp(App);
app.component('AppNavbar', Navbar);
app.use(router);
app.mount('#app');
