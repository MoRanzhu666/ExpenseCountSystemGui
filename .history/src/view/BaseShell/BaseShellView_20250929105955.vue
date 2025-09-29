<template>
  <el-container class="base-shell" style="height: 100vh;">
    <!-- Header -->
    <el-header :style="`height: ${headerHeight}; display:flex; align-items:center; padding:0 20px; background:#f5f7fa;`">
      <slot name="header">
        <div class="default-header">Header</div>
      </slot>
    </el-header>

    <!-- Middle -->
    <el-container>
      <!-- 左侧菜单 -->
      <el-aside :width="leftWidth" style="padding:0; background:#ffffff; border-right:1px solid #ebeef5;">
        <el-menu
          class="el-menu-vertical-demo"
          :default-active="activeMenu"
          router
        >
          <template v-for="route in routes" :key="route.path">
            <MenuItem  :route="route" />
          </template>
        </el-menu>
      </el-aside>

      <!-- 中间内容 -->
      <el-main style="padding:20px; background: #fff;">
        <router-view />
      </el-main>

    </el-container>

    <!-- Footer -->
    <el-footer :style="`height: ${footerHeight}; display:flex; align-items:center; padding:0 20px; background:#f5f7fa;`">
      <slot name="footer">Footer</slot>
    </el-footer>
  </el-container>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import MenuItem from "./component/MenuItem.vue"; // 递归菜单组件

const props = defineProps({
  leftWidth: { type: [Number, String], default: "200px" },
  headerHeight: { type: [Number, String], default: "60px" },
  footerHeight: { type: [Number, String], default: "60px" },
  routes: { type: Array, default: () => [] }, // 路由配置数组
});

const route = useRoute();
const activeMenu = computed(() => route.path);

// 高度计算
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
