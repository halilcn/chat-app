import { createRouter, createWebHistory, RouteRecordRaw, NavigationGuard } from 'vue-router';

import authModule from '@/store/modules/auth';

const checkAuth = () => {
  return !!authModule.state.user;
};

const guest: NavigationGuard = (to, from, next) => {
  if (!checkAuth()) next();
  next({ name: 'Dashboard' });
};

const auth: NavigationGuard = (to, from, next) => {
  if (checkAuth()) next();
  next({ name: 'Login' });
};

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/user-actions/UserLogin.vue'),
    beforeEnter: guest
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/user-actions/UserRegister.vue'),
    beforeEnter: guest
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/user-actions/UserRegister.vue'),
    beforeEnter: auth,
    children: []
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
