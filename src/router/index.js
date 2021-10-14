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
    path:'/ont',
    name:"ont",
    component: () => import(/* webpackChunkName: "about" */ '../views/Ont.vue')
  },

  {
    path:'/eth',
    name:"eth",
    component: () => import(/* webpackChunkName: "about" */ '../views/Eth.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return routerPush.call(this, location).catch((error) => error);
}

export default router
