import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard_users from '../views/Dashboard_users.vue'
import Dashboard from '../views/Dashboard.vue'
import { auth } from '../firebase/firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard_users',
    component: Dashboard_users,
    meta: {
      requiresAuth: true,
      admin: false
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true,
      admin: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/settings',
    name: 'settings',
    component: () =>
      import(/* webpackChunkName: "settings" */ '../views/Settings.vue'),
    meta: {
      requiresAuth: true,
      admin: false
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// navigation guard to check for logged in users
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)

  if (requiresAuth && !auth.currentUser) {
    next('/login')
  } else {
    next()
  }
})

export default router
