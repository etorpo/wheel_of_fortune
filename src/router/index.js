/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
import { routes } from 'vue-router/auto-routes'
import {useAuthStore} from "@/stores/auth.js";
import Home from "@/pages/Home.vue";
import Login from "@/pages/login.vue";
import Clients from "@/pages/admin/Clients.vue";
import Sectors from "@/pages/admin/Sectors.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/admin/clients',
      name: 'clients',
      component: Clients,
    },
    {
      path: '/admin/sectors',
      name: 'sectors',
      component: Sectors,
    },
  ],
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (authStore.getAuthToken() && to.name === 'login') {
    next({ name: 'home' });
  }
  if (!authStore.getAuthToken() && to.name !== 'login') {
    next({ name: 'login' });
  } else {
    next();
  }
});

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
