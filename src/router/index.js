import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard_users from '../views/Dashboard_users.vue'
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Login.vue'
import Chat from '../views/Chat'
import firebase, { auth } from 'firebase'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

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
    path: '/chat',
    name: 'Chat',
    component: Chat,
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
// router.beforeResolve((to, from, next) => {
//   if (to.name) {
//     NProgress.start()
//   }
//   next()
// })

router.afterEach((to, from) => {
  NProgress.done()
})

//Updated Navigation Guard
router.beforeEach((to, from, next) => {
  if (to.name) {
    NProgress.start()
  }
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
      } else if (auth.currentUser && to.path == '/login') {
        next('/')
      } else {
        next()
      }
    }
  })
  next()
})
export default router
