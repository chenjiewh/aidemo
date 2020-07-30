import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/new',
    name: 'new',
    component: () => import(/* webpackChunkName: "about" */ '../views/new.vue')
  },
  {
    path: '/compare',
    name: 'compare',
    component: () => import(/* webpackChunkName: "about" */ '../views/compare.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import(/* webpackChunkName: "about" */ '../views/search.vue')
  },
  {
    path: '/delete',
    name: 'delete',
    component: () => import(/* webpackChunkName: "about" */ '../views/delete.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
