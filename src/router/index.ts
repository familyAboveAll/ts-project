import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Order',
    component: () => import(/* webpackChunkName: "page-game-app-category" */ '../views/order/index.vue'),
  }
]

const router = new VueRouter({
  routes
})

export default router
