// 引入依赖
import { createRouter, createWebHistory } from 'vue-router'
// 引入页面组件（支持懒加载）


// 路由规则
const routes = [
  {
    path: '/',          // 路径
    name: 'HomeView',       // 路由名称（可选）
    component: ()=> import("@/view/HomeView.vue"),   // 对应组件
    children: [
        {
        path: 'Home',
        name: 'CarList',
        component: () => import('@/views/powerList/tms_cargridview.vue'),
        meta: {
          title: '车辆信息',
          icon: 'home-2-line',
          activeMenu: '/#tms_cargridview',
          guard: {
            role: ['TMS:MENU:CENTRAL:CAR_LIST'],
          },
        },
      },
    ]
  },
  {
    path: '/about',
    name: 'AboutView',
    component:  ()=> import("@/view/AboutView.vue") ,
    children: []
  },
  {
    // 404页面（通配符路由，需放在最后）
    path: '/:pathMatch(.*)*',
    name: 'NotFoundView',
    component:  ()=> import("@/view/404View.vue") ,
    children: []
  }
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // HTML5 History模式（无#）
  routes // 注入路由规则
})

export default router