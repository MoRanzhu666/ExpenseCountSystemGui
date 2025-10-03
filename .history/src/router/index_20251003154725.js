// 引入依赖
import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
// 引入页面组件（支持懒加载）

// 路由规则
const routes = [
  {
    path: "/", // 路径
    name: "HomeView", // 路由名称（可选）
    component: () => import("@/view/HomeView.vue"), // 对应组件
    children: [
      {
        path: "/HomeIndexContentView",
        name: "HomeIndexContentView",
        component: () =>
          import("@/view/MainContent/Home/Index/IndexContentView.vue"),
        meta: {
          title: "首页",
        },
      },
      {
        path: "/ExpenseCount",
        name: "ExpenseCount",
        component: () =>
          import(
            "@/view/MainContent/Home/ExpenseCount/ExpenseCountContentView.vue"
          ),
        meta: {
          title: "费用统计",
        },
        children: [
          {
            path: "DailyExpenseCountContentView",
            name: "DailyExpenseCountContentView",
            component: () =>
              import(
                "@/view/MainContent/Home/ExpenseCount/DailyExpense/DailyExpenseCountContentView.vue"
              ),
            meta: { title: "日费用统计" },
          },
          {
            path: "MonthlyExpenseCountContentView",
            name: "MonthlyExpenseCountContentView",
            component: () =>
              import(
                "@/view/MainContent/Home/ExpenseCount/MonthlyExpense/MonthlyExpenseCountContentView.vue"
              ),
            meta: { title: "月费用统计" },
          },
          {
            path: "YearlyExpenseCountContentView",
            name: "YearlyExpenseCountContentView",
            component: () =>
              import(
                "@/view/MainContent/Home/ExpenseCount/YearlyExpense/YearlyExpenseCountContentView.vue"
              ),
            meta: { title: "年费用统计" },
          },
        ],
      },
      {
        path: "/SystemManager",
        name: "SystemManager",
        component: () =>
          import(
            "@/view/MainContent/Home/SystemManager/SystemManagerContentView.vue"
          ), // 里面要有 <router-view />
        meta: { title: "系统管理" },
        children: [
          {
            path: "SystemCodeMaintenenceContentView",
            name: "SystemCodeMaintenenceContentView",
            component: () =>
              import(
                "@/view/MainContent/Home/SystemManager/SystemCodeMaintenenceContentView.vue"
              ),
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
  history: createWebHashHistory(process.env.BASEURL), // HTML5 History模式（无#）
  routes, // 注入路由规则
});

export default router;
