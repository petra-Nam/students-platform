import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Login from '../pages/Auth/Login.vue';
import Register from '../pages/Auth/Register.vue';
import Dashboard from '../pages/Dashboard.vue';
import { useAuthStore } from '../store/auth.ts';

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/dashboard', component: Dashboard },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
