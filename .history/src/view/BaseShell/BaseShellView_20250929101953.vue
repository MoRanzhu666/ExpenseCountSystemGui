<template>
  <div class="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    <!-- 上边栏 -->
    <header class="bg-white dark:bg-gray-800 shadow-sm z-30 transition-all duration-300">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between h-16">
          <!-- 左侧：Logo和标题 -->
          <div class="flex items-center">
            <button 
              @click="toggleSidebar" 
              class="p-2 mr-2 rounded-md md:hidden hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="打开侧边栏"
            >
              <i class="fa fa-bars"></i>
            </button>
            <div class="flex items-center">
              <i class="fa fa-cube text-blue-600 dark:text-blue-400 text-xl mr-2"></i>
              <span class="font-bold text-lg">应用名称</span>
            </div>
          </div>
          
          <!-- 右侧：用户信息和操作 -->
          <div class="flex items-center space-x-4">
            <button class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative" aria-label="通知">
              <i class="fa fa-bell"></i>
              <span class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div class="flex items-center space-x-2">
              <img src="https://picsum.photos/id/1005/40/40" alt="用户头像" class="w-8 h-8 rounded-full object-cover border-2 border-blue-500">
              <span class="hidden md:inline-block">用户名</span>
              <i class="fa fa-chevron-down text-xs"></i>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="flex flex-1 overflow-hidden">
      <!-- 侧边栏 -->
      <aside 
        :class="[
          'bg-white dark:bg-gray-800 shadow-md w-64 flex-shrink-0 transition-all duration-300 ease-in-out z-20',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0 md:w-20',
          isCompact ? 'w-20' : 'w-64 md:w-64'
        ]"
      >
        <div class="h-full flex flex-col">
          <!-- 侧边栏菜单 -->
          <nav class="flex-1 py-4 overflow-y-auto">
            <ul>
              <li class="mb-1">
                <a 
                  href="#" 
                  class="flex items-center px-4 py-3 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border-r-4 border-blue-600 dark:border-blue-400"
                >
                  <i class="fa fa-home text-lg w-6 text-center"></i>
                  <span :class="isCompact || !sidebarOpen ? 'hidden md:hidden lg:inline-block ml-3' : 'ml-3'">首页</span>
                </a>
              </li>
              <li class="mb-1">
                <a 
                  href="#" 
                  class="flex items-center px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <i class="fa fa-cog text-lg w-6 text-center"></i>
                  <span :class="isCompact || !sidebarOpen ? 'hidden md:hidden lg:inline-block ml-3' : 'ml-3'">设置</span>
                </a>
              </li>
              <li class="mb-1">
                <a 
                  href="#" 
                  class="flex items-center px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <i class="fa fa-bar-chart text-lg w-6 text-center"></i>
                  <span :class="isCompact || !sidebarOpen ? 'hidden md:hidden lg:inline-block ml-3' : 'ml-3'">统计</span>
                </a>
              </li>
              <li class="mb-1">
                <a 
                  href="#" 
                  class="flex items-center px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <i class="fa fa-users text-lg w-6 text-center"></i>
                  <span :class="isCompact || !sidebarOpen ? 'hidden md:hidden lg:inline-block ml-3' : 'ml-3'">用户管理</span>
                </a>
              </li>
              <li class="mb-1">
                <a 
                  href="#" 
                  class="flex items-center px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <i class="fa fa-file-text text-lg w-6 text-center"></i>
                  <span :class="isCompact || !sidebarOpen ? 'hidden md:hidden lg:inline-block ml-3' : 'ml-3'">报表</span>
                </a>
              </li>
            </ul>
          </nav>
          
          <!-- 侧边栏底部：折叠按钮 -->
          <div class="p-4 border-t border-gray-200 dark:border-gray-700">
            <button 
              @click="toggleCompact" 
              class="flex items-center justify-center w-full p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="折叠侧边栏"
            >
              <i :class="isCompact ? 'fa fa-angle-double-right' : 'fa fa-angle-double-left'"></i>
            </button>
          </div>
        </div>
      </aside>

      <!-- 主内容区 -->
      <main class="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-4 md:p-6 transition-all duration-300">
        <!-- 这里是动态内容区域 -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 min-h-[calc(100%-2rem)]">
          <h1 class="text-2xl font-bold mb-4">主内容区域</h1>
          <p>这是应用程序的主要内容区域，根据路由或组件动态加载内容。</p>
        </div>
      </main>
    </div>

    <!-- 底部栏 -->
    <footer class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-3 z-10">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <p class="text-sm text-gray-600 dark:text-gray-400">© 2023 应用名称. 保留所有权利.</p>
          <div class="flex space-x-4 mt-2 md:mt-0">
            <a href="#" class="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">关于我们</a>
            <a href="#" class="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">帮助中心</a>
            <a href="#" class="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">隐私政策</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 侧边栏状态管理
const sidebarOpen = ref(true);
const isCompact = ref(false);

// 切换侧边栏显示/隐藏（主要用于移动设备）
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

// 切换侧边栏紧凑模式（展开/折叠）
const toggleCompact = () => {
  isCompact.value = !isCompact.value;
};
</script>

<style scoped>
/* 滚动条美化 */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: rgba(156, 163, 175, 0.8);
}
</style>
    