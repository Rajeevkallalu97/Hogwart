import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard_users from '../views/Dashboard_users.vue'
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Login.vue'
import { auth } from '../firebase/firebase'
import store from '../store/index'
import firebase from 'firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard_users',
    component: Dashboard_users,
    meta: {
      requiresAuth: true,
      requiresAdmin: false
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      requiresAuth: false,
      requiresAdmin: false
    }
  },

  {
    path: '/settings',
    name: 'settings',
    component: () =>
      import(/* webpackChunkName: "settings" */ '../views/Settings.vue'),
    meta: {
      requiresAuth: true,
      requiresAdmin: false
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// navigation guard to check for logged in users
// router.beforeEach((to, from, next) => {
//   const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
//   const requiresAdmin = to.matched.some(x => x.meta.requiresAdmin)

//   if (requiresAuth && !auth.currentUser) {
//     next('/login')
//   } else if (requiresAdmin && auth.currentUser) {
//     next('/settings')
//   } else {
//     next()
//   }
// })

//Updated Navigation Guard
router.beforeEach((to, from, next) => {
  firebase.auth().onAuthStateChanged(userAuth => {
    if (userAuth) {
      firebase
        .auth()
        .currentUser.getIdTokenResult()
        .then(function({ claims }) {
          if (!claims.admin) {
            if (to.path === '/dashboard')
              return next({
                path: '/'
              })
          }
        })
    } else {
      if (to.matched.some(record => record.meta.requiresAuth)) {
        next({
          path: '/login',
          query: {
            redirect: to.fullPath
          }
        })
      } else {
        next()
      }
    }
  })
  next()
})

export default router
