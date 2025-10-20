<template>
  <el-container class="base-shell" style="height: 100vh;">
    <!-- Header -->
    <el-header
      :style="`height: ${headerHeight}; display:flex; align-items:center; justify-content:space-between; padding:0 20px; background:#f5f7fa;`"
    >
      <div class="flex items-center">
        <!-- 手机端菜单按钮 -->
        <el-button
          v-if="isMobile"
          icon="Menu"
          circle
          @click="toggleMenu"
          style="margin-right: 10px;"
        />
        <slot name="header">
          <header-view />
        </slot>
      </div>
    </el-header>

    <!-- Middle -->
    <el-container>
      <!-- 左侧菜单 -->
      <!-- 桌面端显示 -->
      <el-aside
        v-if="!isMobile"
        :width="leftWidth"
        style="padding:0; background:#ffffff; border-right:1px solid #ebeef5;"
      >
        <el-menu
          class="el-menu-vertical-demo"
          :default-active="activeMenu"
          router
        >
          <template v-for="route in routes" :key="route.path">
            <MenuItem :route="route" />
          </template>
        </el-menu>
      </el-aside>

      <!-- 手机端抽屉菜单 -->
      <el-drawer
        v-model="drawerVisible"
        direction="ltr"
        :with-header="false"
        size="200px"
      >
        <el-menu
          :default-active="activeMenu"
          router
          @select="drawerVisible = false"
        >
          <template v-for="route in routes" :key="route.path">
            <MenuItem :route="route" />
          </template>
        </el-menu>
      </el-drawer>

      <!-- 中间内容 -->
      <el-main style="padding:20px; background: #fff;">
        <router-view />
      </el-main>
    </el-container>

    <!-- Footer -->
    <el-footer
      :style="`height: ${footerHeight}; display:flex; align-items:center; padding:0 20px; background:#f5f7fa;`"
    >
      <slot name="footer">
        <footer-view />
      </slot>
    </el-footer>
  </el-container>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import MenuItem from "./component/MenuItem.vue";
import HeaderView from "../Header/HeaderView.vue";
import FooterView from "../Footer/FooterView.vue";

const props = defineProps({
  leftWidth: { type: [Number, String], default: "200px" },
  headerHeight: { type: [Number, String], default: "60px" },
  footerHeight: { type: [Number, String], default: "60px" },
  routes: { type: Array, default: () => [] },
});

const route = useRoute();
const activeMenu = computed(() => route.path);

// 响应式侧边栏
const drawerVisible = ref(false);
const isMobile = ref(false);

// 切换菜单
const toggleMenu = () => {
  drawerVisible.value = !drawerVisible.value;
};

// 监听窗口宽度变化
const checkMobile = () => {
  isMobile.value = window.innerWidth < 768;
};

onMounted(() => {
  checkMobile();
  window.addEventListener("resize", checkMobile);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkMobile);
});

// 动态高度和宽度计算
const leftWidth = computed(() =>
  typeof props.leftWidth === "number" ? `${props.leftWidth}px` : props.leftWidth
);
const headerHeight = computed(() =>
  typeof props.headerHeight === "number" ? `${props.headerHeight}px` : props.headerHeight
);
const footerHeight = computed(() =>
  typeof props.footerHeight === "number" ? `${props.footerHeight}px` : props.footerHeight
);
</script>

<style scoped>
@media (max-width: 768px) {
  .el-main {
    padding: 10px !important;
  }
}
</style>
