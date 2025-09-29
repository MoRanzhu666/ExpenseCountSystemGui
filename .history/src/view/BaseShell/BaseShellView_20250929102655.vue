<template>
  <el-container class="h-screen flex flex-col overflow-hidden bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
    <!-- 顶部导航栏 -->
    <el-header 
      height="64px" 
      class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm z-30 transition-all duration-300"
    >
      <div class="flex items-center justify-between h-full px-4">
        <!-- 左侧：Logo和标题 -->
        <div class="flex items-center">
          <el-button 
            @click="toggleSidebar" 
            icon="Menu" 
            size="small" 
            circle 
            class="mr-3 md:hidden hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="打开侧边栏"
          />
          <div class="flex items-center">
            <el-icon class="text-primary text-xl mr-2">
              <Cube />
            </el-icon>
            <span class="font-bold text-lg hidden sm:inline-block">应用管理系统</span>
          </div>
        </div>
        
        <!-- 中间：面包屑导航 -->
        <el-breadcrumb class="hidden md:flex items-center flex-1 max-w-md mx-4">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>当前页面</el-breadcrumb-item>
        </el-breadcrumb>
        
        <!-- 右侧：操作区 -->
        <div class="flex items-center space-x-3">
          <!-- 搜索框 -->
          <el-input 
            v-model="searchQuery" 
            placeholder="搜索..." 
            size="small" 
            class="w-48 lg:w-64 hidden md:block"
            prefix-icon="Search"
          />
          
          <!-- 主题切换 -->
          <el-button 
            @click="toggleTheme"
            :icon="isDark ? 'Sunny' : 'Moon'" 
            size="small" 
            circle 
            class="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="切换主题"
          />
          
          <!-- 通知中心 -->
          <el-popover
            placement="bottom-end"
            width="300"
            trigger="click"
            :popper-class="'p-0'"
          >
            <template #trigger>
              <el-button 
                icon="Bell" 
                size="small" 
                circle 
                class="relative hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="通知"
              >
                <span class="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </el-button>
            </template>
            <div class="p-2">
              <div class="flex justify-between items-center mb-2">
                <h3 class="font-medium">通知中心</h3>
                <el-button size="mini" text>全部标为已读</el-button>
              </div>
              <div class="max-h-80 overflow-y-auto">
                <div class="p-2 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                  <p class="text-sm">有新的系统消息</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">10分钟前</p>
                </div>
                <div class="p-2 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                  <p class="text-sm">任务已完成</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">1小时前</p>
                </div>
              </div>
              <div class="text-center mt-2">
                <el-button size="mini" text>查看全部</el-button>
              </div>
            </div>
          </el-popover>
          
          <!-- 用户信息 -->
          <el-dropdown placement="bottom-end">
            <template #trigger>
              <div class="flex items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-1 rounded-md transition-colors">
                <el-avatar size="32" class="border-2 border-primary/20">
                  <img src="https://picsum.photos/id/1005/40/40" alt="用户头像" />
                </el-avatar>
                <div class="ml-2 hidden md:block">
                  <p class="text-sm font-medium">管理员</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">超级管理员</p>
                </div>
                <el-icon size="16" class="ml-1 hidden md:block">
                  <ChevronDown />
                </el-icon>
              </div>
            </template>
            <el-dropdown-menu>
              <el-dropdown-item icon="User">
                个人中心
              </el-dropdown-item>
              <el-dropdown-item icon="Setting">
                系统设置
              </el-dropdown-item>
              <el-dropdown-item icon="Help">
                帮助中心
              </el-dropdown-item>
              <el-dropdown-item divided icon="Logout">
                退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </el-header>

    <el-container class="flex-1 overflow-hidden">
      <!-- 侧边栏 -->
      <el-aside 
        :width="isCompact ? '64px' : '240px'" 
        class="bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out z-20"
        :class="{ 
          'translate-x-0': sidebarOpen || !isMobile, 
          '-translate-x-full': !sidebarOpen && isMobile,
          'shadow-md': sidebarOpen && isMobile
        }"
      >
        <!-- 侧边栏加载状态 -->
        <el-skeleton 
          v-if="sidebarLoading" 
          class="w-full h-full" 
          :loading="sidebarLoading"
        />
        
        <el-menu
          v-else
          default-active="1"
          class="h-full border-none"
          :collapse="isCompact"
          background-color="#ffffff"
          text-color="#606266"
          active-text-color="#409EFF"
          @select="handleMenuSelect"
          :collapse-transition="false"
        >
          <!-- 菜单项 -->
          <el-menu-item index="1">
            <el-icon><Home /></el-icon>
            <template #title>首页</template>
          </el-menu-item>
          
          <el-sub-menu index="2">
            <template #title>
              <el-icon><Setting /></el-icon>
              <span>系统管理</span>
            </template>
            <el-menu-item index="2-1">用户管理</el-menu-item>
            <el-menu-item index="2-2">角色管理</el-menu-item>
            <el-menu-item index="2-3">权限设置</el-menu-item>
          </el-sub-menu>
          
          <el-sub-menu index="3">
            <template #title>
              <el-icon><Database /></el-icon>
              <span>数据中心</span>
            </template>
            <el-menu-item index="3-1">数据列表</el-menu-item>
            <el-menu-item index="3-2">数据统计</el-menu-item>
            <el-menu-item index="3-3">数据备份</el-menu-item>
          </el-sub-menu>
          
          <el-menu-item index="4">
            <el-icon><BarChart /></el-icon>
            <template #title>报表分析</template>
          </el-menu-item>
          
          <el-menu-item index="5">
            <el-icon><Message /></el-icon>
            <template #title>消息中心</template>
          </el-menu-item>
          
          <el-menu-item index="6">
            <el-icon><Document /></el-icon>
            <template #title>文档中心</template>
          </el-menu-item>
        </el-menu>
        
        <!-- 侧边栏底部 -->
        <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2">
          <el-tooltip 
            :content="isCompact ? '展开菜单' : '收起菜单'" 
            placement="right"
          >
            <el-button 
              @click="toggleCompact" 
              :icon="isCompact ? 'DoubleRight' : 'DoubleLeft'" 
              size="small" 
              circle 
              class="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="切换菜单紧凑模式"
            />
          </el-tooltip>
          
          <el-tooltip 
            content="折叠侧边栏" 
            placement="right"
            v-if="!isMobile"
          >
            <el-button 
              @click="toggleSidebar" 
              icon="ArrowLeft" 
              size="small" 
              circle 
              class="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="折叠侧边栏"
            />
          </el-tooltip>
        </div>
      </el-aside>

      <!-- 主内容区 -->
      <el-main class="p-4 md:p-6 overflow-y-auto bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <!-- 页面加载状态 -->
        <el-skeleton 
          v-if="contentLoading" 
          class="w-full h-[calc(100vh-174px)]" 
          :loading="contentLoading"
        />
        
        <template v-else>
          <!-- 页面标题栏 -->
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div>
              <h1 class="text-2xl font-bold">主内容区域</h1>
              <p class="text-gray-500 dark:text-gray-400 mt-1">这是应用程序的主要内容展示区域</p>
            </div>
            <div class="flex space-x-2 mt-4 sm:mt-0">
              <el-button type="primary" icon="Plus">新增</el-button>
              <el-button type="default" icon="Download">导出</el-button>
              <el-button type="default" icon="Filter">筛选</el-button>
            </div>
          </div>
          
          <!-- 内容卡片 -->
          <el-card class="mb-6">
            <template #header>
              <div class="flex justify-between items-center">
                <h2 class="text-lg font-medium">数据统计</h2>
                <el-select v-model="timeRange" size="small" placeholder="选择时间范围">
                  <el-option label="今日" value="today"></el-option>
                  <el-option label="本周" value="week"></el-option>
                  <el-option label="本月" value="month"></el-option>
                  <el-option label="全年" value="year"></el-option>
                </el-select>
              </div>
            </template>
            <div class="p-4">
              <!-- 统计卡片 -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <el-card class="bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800">
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="text-sm text-gray-500 dark:text-gray-400">总用户数</p>
                      <p class="text-2xl font-bold mt-1">2,453</p>
                    </div>
                    <el-icon class="text-blue-500 text-2xl"><User /></el-icon>
                  </div>
                  <p class="text-xs text-green-500 mt-2"><i class="fa fa-arrow-up"></i> 12.5% 较上月</p>
                </el-card>
                
                <el-card class="bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-800">
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="text-sm text-gray-500 dark:text-gray-400">活跃用户</p>
                      <p class="text-2xl font-bold mt-1">1,892</p>
                    </div>
                    <el-icon class="text-green-500 text-2xl"><Activity /></el-icon>
                  </div>
                  <p class="text-xs text-green-500 mt-2"><i class="fa fa-arrow-up"></i> 8.2% 较上月</p>
                </el-card>
                
                <el-card class="bg-purple-50 dark:bg-purple-900/20 border-purple-100 dark:border-purple-800">
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="text-sm text-gray-500 dark:text-gray-400">数据总量</p>
                      <p class="text-2xl font-bold mt-1">128,456</p>
                    </div>
                    <el-icon class="text-purple-500 text-2xl"><Database /></el-icon>
                  </div>
                  <p class="text-xs text-green-500 mt-2"><i class="fa fa-arrow-up"></i> 23.1% 较上月</p>
                </el-card>
              </div>
            </div>
          </el-card>
          
          <!-- 表格示例 -->
          <el-card>
            <template #header>
              <h2 class="text-lg font-medium">数据列表</h2>
            </template>
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="date" label="日期" width="180"></el-table-column>
              <el-table-column prop="name" label="姓名" width="180"></el-table-column>
              <el-table-column prop="address" label="地址"></el-table-column>
              <el-table-column label="操作" width="180">
                <template #default>
                  <el-button size="small" text>查看</el-button>
                  <el-button size="small" text type="primary">编辑</el-button>
                  <el-button size="small" text type="danger">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </template>
      </el-main>
    </el-container>

    <!-- 底部栏 -->
    <el-footer 
      height="50px" 
      class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-2 transition-colors duration-300"
    >
      <div class="flex flex-col md:flex-row justify-between items-center px-4 h-full">
        <p class="text-sm text-gray-500 dark:text-gray-400">© 2023 应用管理系统. 保留所有权利.</p>
        <div class="flex space-x-4 mt-1 md:mt-0">
          <a href="#" class="text-sm text-gray-500 dark:text-gray-400 hover:text-primary transition-colors">关于我们</a>
          <a href="#" class="text-sm text-gray-500 dark:text-gray-400 hover:text-primary transition-colors">帮助中心</a>
          <a href="#" class="text-sm text-gray-500 dark:text-gray-400 hover:text-primary transition-colors">隐私政策</a>
        </div>
      </div>
    </el-footer>
    
    <!-- 移动端遮罩层 -->
    <div 
      v-if="sidebarOpen && isMobile" 
      class="fixed inset-0 bg-black/50 z-10 md:hidden"
      @click="toggleSidebar"
    ></div>
  </el-container>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted } from 'vue';
import { 
  Menu, Bell, ChevronDown, Cube, Home, Setting, 
  BarChart, User, Document, DoubleRight, DoubleLeft,
  ArrowLeft, Search, Sunny, Moon, Logout, Help,
  Plus, Download, Filter, Database, Message, Activity
} from '@element-plus/icons-vue';
import { useDark, useToggle } from '@vueuse/core';

// 主题切换功能
const isDark = useDark();
const toggleTheme = useToggle(isDark);

// 状态管理
const sidebarOpen = ref(true);
const isCompact = ref(false);
const isMobile = ref(false);
const searchQuery = ref('');
const timeRange = ref('week');
const sidebarLoading = ref(true);
const contentLoading = ref(true);

// 表格示例数据
const tableData = ref([
  {
    date: '2023-05-01',
    name: '张三',
    address: '北京市朝阳区'
  },
  {
    date: '2023-05-02',
    name: '李四',
    address: '上海市浦东新区'
  },
  {
    date: '2023-05-03',
    name: '王五',
    address: '广州市天河区'
  }
]);

// 检测屏幕尺寸，响应式处理
const checkScreenSize = () => {
  const newIsMobile = window.innerWidth < 768;
  isMobile.value = newIsMobile;
  
  // 在移动设备上默认折叠侧边栏
  if (newIsMobile) {
    sidebarOpen.value = false;
    isCompact.value = false;
  } else {
    sidebarOpen.value = true;
  }
};

// 模拟加载状态
const simulateLoading = () => {
  setTimeout(() => {
    sidebarLoading.value = false;
  }, 500);
  
  setTimeout(() => {
    contentLoading.value = false;
  }, 800);
};

// 菜单选择处理
const handleMenuSelect = (index) => {
  console.log('选中菜单:', index);
  // 这里可以添加路由跳转逻辑
  if (isMobile.value) {
    sidebarOpen.value = false;
  }
};

// 生命周期钩子
onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
  simulateLoading();
});

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize);
});

// 监听屏幕尺寸变化
watch(isMobile, (newVal) => {
  if (newVal) {
    isCompact.value = false; // 移动设备上不使用紧凑模式
  }
});

// 侧边栏控制方法
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

const toggleCompact = () => {
  isCompact.value = !isCompact.value;
};
</script>

<style scoped>
/* 侧边栏动画效果 */
.el-aside {
  transition: width 0.3s, transform 0.3s;
  position: relative;
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

/* 骨架屏样式 */
:deep(.el-skeleton) {
  width: 100%;
  height: 100%;
}

/* 移动端遮罩层动画 */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
    