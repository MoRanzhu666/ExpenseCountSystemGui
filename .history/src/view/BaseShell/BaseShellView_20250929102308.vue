<template>
  <el-container class="h-screen flex flex-col overflow-hidden">
    <!-- 上边栏 -->
    <el-header height="60px" class="bg-white border-b shadow-sm z-10">
      <div class="flex items-center justify-between h-full px-4">
        <!-- 左侧：Logo和标题 -->
        <div class="flex items-center">
          <el-button 
            @click="toggleSidebar" 
            icon="Menu" 
            size="small" 
            circle 
            class="mr-3 md:hidden"
            aria-label="打开侧边栏"
          />
          <div class="flex items-center">
            <el-icon class="text-primary text-xl mr-2">
              <Cube />
            </el-icon>
            <span class="font-bold text-lg">应用名称</span>
          </div>
        </div>
        
        <!-- 右侧：用户信息和操作 -->
        <div class="flex items-center space-x-3">
          <el-button 
            icon="Bell" 
            size="small" 
            circle 
            class="relative"
            aria-label="通知"
          >
            <span class="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </el-button>
          
          <el-dropdown placement="bottom-end">
            <template #trigger>
              <div class="flex items-center cursor-pointer">
                <el-avatar size="32">
                  <img src="https://picsum.photos/id/1005/40/40" alt="用户头像" />
                </el-avatar>
                <span class="ml-2 hidden md:inline-block">用户名</span>
                <el-icon size="16" class="ml-1">
                  <ChevronDown />
                </el-icon>
              </div>
            </template>
            <el-dropdown-menu>
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item>设置</el-dropdown-item>
              <el-dropdown-item divided>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </el-header>

    <el-container class="flex-1 overflow-hidden">
      <!-- 侧边栏 -->
      <el-aside 
        :width="isCompact ? '64px' : '220px'" 
        class="bg-white border-r transition-all duration-300"
        :class="{ 'translate-x-0': sidebarOpen || !isMobile, '-translate-x-full': !sidebarOpen && isMobile }"
      >
        <el-menu
          default-active="1"
          class="h-full border-none"
          :collapse="isCompact"
          background-color="#ffffff"
          text-color="#333333"
          active-text-color="#409EFF"
        >
          <el-menu-item index="1">
            <el-icon><Home /></el-icon>
            <template #title>首页</template>
          </el-menu-item>
          
          <el-sub-menu index="2">
            <template #title>
              <el-icon><Setting /></el-icon>
              <span>系统设置</span>
            </template>
            <el-menu-item index="2-1">基本设置</el-menu-item>
            <el-menu-item index="2-2">安全设置</el-menu-item>
            <el-menu-item index="2-3">权限管理</el-menu-item>
          </el-sub-menu>
          
          <el-menu-item index="3">
            <el-icon><BarChart /></el-icon>
            <template #title>数据统计</template>
          </el-menu-item>
          
          <el-menu-item index="4">
            <el-icon><User /></el-icon>
            <template #title>用户管理</template>
          </el-menu-item>
          
          <el-menu-item index="5">
            <el-icon><Document /></el-icon>
            <template #title>报表中心</template>
          </el-menu-item>
        </el-menu>
        
        <!-- 侧边栏底部：折叠按钮 -->
        <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <el-button 
            @click="toggleCompact" 
            icon="DoubleRight" 
            size="small" 
            circle 
            v-if="isCompact"
            aria-label="展开侧边栏"
          />
          <el-button 
            @click="toggleCompact" 
            icon="DoubleLeft" 
            size="small" 
            circle 
            v-else
            aria-label="折叠侧边栏"
          />
        </div>
      </el-aside>

      <!-- 主内容区 -->
      <el-main class="p-4 md:p-6 overflow-y-auto bg-gray-50">
        <el-card class="h-full">
          <template #header>
            <h1 class="text-xl font-bold">主内容区域</h1>
          </template>
          <div class="mt-4">
            <p>这是应用程序的主要内容区域，根据路由或组件动态加载内容。</p>
          </div>
        </el-card>
      </el-main>
    </el-container>

    <!-- 底部栏 -->
    <el-footer height="50px" class="bg-white border-t py-2">
      <div class="flex flex-col md:flex-row justify-between items-center px-4 h-full">
        <p class="text-sm text-gray-500">© 2023 应用名称. 保留所有权利.</p>
        <div class="flex space-x-4 mt-1 md:mt-0">
          <a href="#" class="text-sm text-gray-500 hover:text-primary transition-colors">关于我们</a>
          <a href="#" class="text-sm text-gray-500 hover:text-primary transition-colors">帮助中心</a>
          <a href="#" class="text-sm text-gray-500 hover:text-primary transition-colors">隐私政策</a>
        </div>
      </div>
    </el-footer>
  </el-container>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
// import { 
//   Menu, Bell, ChevronDown, Cube, Home, Setting, 
//   BarChart, User, Document, DoubleRight, DoubleLeft
// } from '@element-plus/icons-vue';

// 侧边栏状态管理
const sidebarOpen = ref(true);
const isCompact = ref(false);
const isMobile = ref(false);

// 检测屏幕尺寸，判断是否为移动设备
const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 768;
  // 在移动设备上默认折叠侧边栏
  if (isMobile.value) {
    sidebarOpen.value = false;
  } else {
    sidebarOpen.value = true;
  }
};

// 初始化时检测屏幕尺寸
onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
});

// 切换侧边栏显示/隐藏（主要用于移动设备）
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

// 切换侧边栏紧凑模式（展开/折叠）
const toggleCompact = () => {
  isCompact.value = !isCompact.value;
};

// 当屏幕尺寸变化时，更新侧边栏状态
watch(isMobile, (newVal) => {
  if (newVal) {
    isCompact.value = false; // 移动设备上不使用紧凑模式
  }
});
</script>

<style scoped>
/* 侧边栏动画效果 */
.el-aside {
  transition: width 0.3s, transform 0.3s;
  position: relative;
  z-index: 10;
}

/* 主内容区滚动条美化 */
.el-main::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.el-main::-webkit-scrollbar-track {
  background: transparent;
}

.el-main::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 3px;
}

.el-main::-webkit-scrollbar-thumb:hover {
  background-color: rgba(156, 163, 175, 0.8);
}

/* 卡片高度适应 */
.el-card {
  height: calc(100% - 20px);
  display: flex;
  flex-direction: column;
}
</style>
    