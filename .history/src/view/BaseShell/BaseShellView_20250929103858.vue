<template>
  <el-container class="base-shell" :style="`height: 100vh;`">
    <!-- Header -->
    <el-header :style="`height: ${headerHeight}; display:flex; align-items:center; padding:0 20px; background:#f5f7fa;`">
      <slot name="header">
        <div class="default-header">Header</div>
      </slot>
    </el-header>

    <!-- Middle: left aside + center main + right aside -->
    <el-container>
      <el-aside :width="leftWidth" :style="`padding:20px; background:#ffffff; border-right:1px solid #ebeef5;`">
        <slot name="left">Left Sidebar</slot>
      </el-aside>

      <el-main :style="`padding:20px; background: #fff;`">
        <div class="center-wrapper" :style="`height: calc(100vh - ${topAndBottomHeight}); display:flex; align-items:center; justify-content:center;`">
          <slot>
            Center Content
          </slot>
        </div>
      </el-main>

      <el-aside :width="rightWidth" :style="`padding:20px; background:#ffffff; border-left:1px solid #ebeef5;`">
        <slot name="right">Right Sidebar</slot>
      </el-aside>
    </el-container>

    <!-- Footer -->
    <el-footer :style="`height: ${footerHeight}; display:flex; align-items:center; padding:0 20px; background:#f5f7fa;`">
      <slot name="footer">Footer</slot>
    </el-footer>
  </el-container>
</template>

<script setup>
import { computed } from 'vue'

defineOptions({
    name:"tess"
})

const props = defineProps({
  leftWidth: { type: [Number, String], default: '200px' },
  rightWidth: { type: [Number, String], default: '200px' },
  headerHeight: { type: [Number, String], default: '60px' },
  footerHeight: { type: [Number, String], default: '60px' }
})

// ensure units
const leftWidth = computed(() => typeof props.leftWidth === 'number' ? `${props.leftWidth}px` : props.leftWidth)
const rightWidth = computed(() => typeof props.rightWidth === 'number' ? `${props.rightWidth}px` : props.rightWidth)
const headerHeight = computed(() => typeof props.headerHeight === 'number' ? `${props.headerHeight}px` : props.headerHeight)
const footerHeight = computed(() => typeof props.footerHeight === 'number' ? `${props.footerHeight}px` : props.footerHeight)

// expose to template
const topAndBottomHeight = computed(() => {
  // used to calculate center height: header + footer + some extra container spacing (80px safe fallback)
  // here we simply sum header and footer heights
  const h = headerHeight.value
  const f = footerHeight.value
  return `calc(${h} + ${f})`
})
</script>

<style scoped>
.base-shell {
  background: #f0f2f5;
}
.default-header {
  font-weight: 600;
}
.center-wrapper {
  width: 100%;
}
</style>
