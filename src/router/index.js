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
    path: '/ont',
    component: resolve => require(['@/views/Ont'], resolve), // 父路由的公共部分
    children: [
      {
        path: '', // 进入父路由时，右侧内容区首先显示的内容
        name: 'Invoke',
        component: resolve => require(['../components/ont/Invoke.vue'], resolve)
      },
      {
        path: 'InvokeWasm',// 其他子路由，这里注意，不要加 '/'，否则会匹配根路由
        name: 'InvokeWasm',
        component: resolve => require(['../components/ont/InvokeWasm.vue'], resolve)
      }
    ]
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
