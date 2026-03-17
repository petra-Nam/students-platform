import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Login from '../pages/Auth/Login.vue';
import Register from '../pages/Auth/Register.vue';
import Dashboard from '../pages/Dashboard.vue';
import Community from '../pages/Community.vue';
import Universities from '../pages/Universities.vue';
import Scholarships from '../pages/Scholarships.vue';
import { useSessionStore } from '../store/session';

const routes = [
  { path: '/', component: Home },

  { path: '/login', component: Login, meta: { guestOnly: true } },
  { path: '/register', component: Register, meta: { guestOnly: true } },

  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/community', component: Community },
  { path: '/universities', component: Universities },
  { path: '/scholarships', component: Scholarships },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const session = useSessionStore();

  if (!session.isAuthenticated) {
    try {
      await session.restoreSession();
    } catch {}
  }

  if (to.meta.requiresAuth && !session.isAuthenticated) {
    return next('/login');
  }

  if (to.meta.guestOnly && session.isAuthenticated) {
    return next('/dashboard');
  }

  return next();
});
