// 引入依赖
import { createRouter, createWebHistory } from 'vue-router'
// 引入页面组件（支持懒加载）
const Home = () => import('@/view/Home.vue')
const About = () => import('@/view/About.vue')
const NotFound = () => import('@/view/404.vue')

// 路由规则
const routes = [
  {
    path: '/',          // 路径
    name: 'Home',       // 路由名称（可选）
    component: Home     // 对应组件
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    // 404页面（通配符路由，需放在最后）
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // HTML5 History模式（无#）
  routes // 注入路由规则
})

export default router