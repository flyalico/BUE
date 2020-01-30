import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import Home from '@/components/security/home'
import Private from '@/components/security/private'
import Login from '@/components/security/login'

Vue.use(Router)

const isAuthenticated = (to, from, next) => {
  if (store.getters.AUTH_isAuthenticated) {
    next()
    return
  }
  next('/login')
}

export default new Router({
  routes: [
    { path: '/', name: 'loginRoute', component: Login },
    { path: '/login', name: 'loginRoute', component: Login },
    { path: '/home', name: 'homeRoute', component: Home, beforeEnter: isAuthenticated },
    { path: '/private', name: 'privateRoute', component: Private, beforeEnter: isAuthenticated }
  ]
})
