// 引入依赖
import { createRouter, createWebHistory } from "vue-router";
// 引入页面组件（支持懒加载）

// 路由规则
const routes = [
  {
    path: "/", // 路径
    name: "HomeView", // 路由名称（可选）
    component: () => import("@/view/HomeView.vue"), // 对应组件
    children: [
      {
        path: "HomeIndexContentView",
        name: "HomeIndexContentView",
        component: () =>
          import("@/view/MainContent/Home/Index/IndexContentView.vue"),
        meta: {
          title: "首页",
        },
      },
      {
        path: "ExpenseCountContentView",
        name: "ExpenseCountContentView",
        component: () =>
          import(
            "@/view/MainContent/Home/ExpenseCount/ExpenseCountContentView.vue"
          ),
        meta: {
          title: "费用统计",
        },
      },
      {
        path: "SystemManager",
        name: "SystemManager",
        meta: { title: "系统管理" },
        component: () =>
          import(
            "@/view/MainContent/Home/SystemManager/SystemManagerContentView.vue"
          )
        
        children: [
          {
            path: "SystemCodeMaintenenceContentView",
            name: "SystemCodeMaintenenceContentView",
            component: () => import("@/view/MainContent/Home/SystemManager/SystemCodeMaintenenceContentView.vue"),
            meta: { title: "系统代码管理" },
          },
        ],
      },
    ],
  },
  {
    path: "/about",
    name: "AboutView",
    component: () => import("@/view/AboutView.vue"),
    children: [
      {
        path: "AboutIndexContentView",
        name: "AboutIndexContentView",
        component: () =>
          import("@/view/MainContent/About/IndexContentView.vue"),
        meta: {
          title: "关于我们",
        },
      },
    ],
  },
  {
    // 404页面（通配符路由，需放在最后）
    path: "/:pathMatch(.*)*",
    name: "NotFoundView",
    component: () => import("@/view/404View.vue"),
    children: [
      {
        path: "404IndexContentView",
        name: "404IndexContentView",
        component: () => import("@/view/MainContent/404/IndexContentView.vue"),
        meta: {
          title: "抱歉",
        },
      },
    ],
  },
];

// 创建路由实例
const router = createRouter({
  history: createWebHistory(process.env.BASEURL), // HTML5 History模式（无#）
  routes, // 注入路由规则
});

export default router;
