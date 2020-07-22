import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'Index',
    component: () => import(/* webpackChunkName: "page-game-app-category" */ '../views/index/index.vue')
  },
  {
    path: '/order-list',
    name: 'OrderList',
    component: () => import(/* webpackChunkName: "page-game-app-category" */ '../views/order-list/index.vue'),
  }
]

const router = new VueRouter({
  routes
})

export default router
