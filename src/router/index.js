/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
import {useAuthStore} from "@/stores/auth.js";
import Home from "@/pages/Home.vue";
import Login from "@/pages/Login.vue";
import Sectors from "@/pages/admin/Sectors.vue";
import Players from "@/pages/admin/Players.vue";
import Register from "@/pages/Register.vue";
import SectorId from "@/pages/admin/SectorId.vue";

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
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/admin/clients',
      name: 'clients',
      component: Players,
    },
    {
      path: '/admin/sectors',
      name: 'sectors',
      component: Sectors,
    },
    {
      path: '/admin/sectors/:id',
      name: 'sectorItem',
      component: SectorId,
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
  if (!authStore.getAuthToken() && to.name !== 'login' && to.name !== 'register') {
    next({ name: 'login' });
  } else {
    next();
  }
});

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
