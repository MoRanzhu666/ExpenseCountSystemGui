<template>
  <div class="table-container">
    <div class="table-wrapper">
      <el-table
        ref="tableRef"
        :data="tableData"
        border
        :row-key="(row) => row.id"
        @selection-change="handleSelectionChangeDefault"
        @row-click="handleRowClickDefault"
        :style="'width: 100%; height: ' + tableHeight + ';'"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column
          v-for="item in tableHeaderList"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :min-width="getColumnWidth(item)"
          :align="item.align || 'center'"
          :formatter="item.formatter"
          :filters="item.filters"
          :filter-method="item.filterMethod"
          show-overflow-tooltip
        />
      </el-table>
    </div>
    
    <div class="pagination-container">
      <el-pagination
        v-model:current-page="localPageParams.current"
        v-model:page-size="localPageParams.size"
        :page-sizes="[10, 20, 50, 100, 200, 300, 400]"
        :disabled="disabled"
        :background="background"
        layout="total, sizes, prev, pager, next, jumper"
        :total="localPageParams.total"
        @size-change="(val) => $emit('update:size', val)"
        @current-change="(val) => $emit('update:current', val)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted, onUnmounted } from "vue";

const props = defineProps({
  tableData: { type: Array, default: () => [] },
  tableHeaderList: { type: Array, default: () => [] },
  pageParams: { type: Object, default: () => ({}) },
  disabled: Boolean,
  background: Boolean,
  handleSelectionChange: Function,
  handleRowClick: Function,
});

defineEmits(["update:size", "update:current"]);

const localPageParams = ref({ ...props.pageParams });
const tableRef = ref();
const windowWidth = ref(window.innerWidth);

// 响应式表格高度
const tableHeight = computed(() => {
  if (windowWidth.value < 768) return '80vh'; // 移动端减少高度
  return '90vh'; // 桌面端保持原高度
});

// 响应式列宽计算
const getColumnWidth = (column) => {
  const baseWidth = column.width || 120;
  
  if (windowWidth.value < 480) {
    return Math.max(55, baseWidth * 0.6); // 超小屏幕
  } else if (windowWidth.value < 768) {
    return Math.max(100, baseWidth * 0.8); // 小屏幕
  } else if (windowWidth.value < 992) {
    return Math.max(110, baseWidth * 0.9); // 中等屏幕
  }
  
  return baseWidth; // 大屏幕使用原宽度
};

// 监听窗口大小变化
const handleResize = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

watch(
  () => props.pageParams,
  (newVal) => {
    localPageParams.value = { ...newVal };
  },
  { deep: true }
);

// 处理选择事件
const handleSelectionChangeDefault = (rows) => {
  if (props.handleSelectionChange) {
    props.handleSelectionChange(rows);
  }
  console.log("默认选择：", rows);
};

// 处理行点击事件
const handleRowClickDefault = (row) => {
  if (props.handleRowClick) {
    props.handleRowClick(row);
  }
  console.log("默认点击行：", row);
  tableRef.value.clearSelection();
  tableRef.value.toggleRowSelection(row);
};
</script>

<style scoped>
.table-container {
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
}

.table-wrapper {
  flex: 1;
  overflow: hidden;
  margin-bottom: 16px;
}

.pagination-container {
  display: flex;
  justify-content: center;
  padding: 16px 0;
  background: #fff;
}

/* 响应式分页 */
@media (max-width: 768px) {
  .pagination-container {
    padding: 12px 0;
  }
  
  :deep(.el-pagination) {
    --el-pagination-button-width: 32px;
    --el-pagination-button-height: 32px;
    --el-pagination-font-size: 12px;
  }
  
  :deep(.el-pagination__jump) {
    margin-left: 8px;
  }
}

@media (max-width: 480px) {
  .pagination-container {
    padding: 8px 0;
  }
  
  :deep(.el-pagination) {
    --el-pagination-button-width: 28px;
    --el-pagination-button-height: 28px;
  }
  
  /* 在小屏幕上简化分页布局 */
  :deep(.el-pagination) .el-pagination__sizes,
  :deep(.el-pagination) .el-pagination__jump {
    display: none !important;
  }
}

/* 表格响应式样式 */
@media (max-width: 768px) {
  :deep(.el-table) {
    font-size: 12px;
  }
  
  :deep(.el-table th),
  :deep(.el-table td) {
    padding: 8px 4px;
  }
  
  :deep(.el-table .cell) {
    line-height: 1.2;
  }
}

@media (max-width: 480px) {
  :deep(.el-table) {
    font-size: 11px;
  }
  
  :deep(.el-table th),
  :deep(.el-table td) {
    padding: 6px 2px;
  }
}

/* 确保表格在移动端可以横向滚动 */
:deep(.el-table) {
  overflow-x: auto;
}

/* 选择列在移动端适当缩小 */
@media (max-width: 480px) {
  :deep(.el-table__header-wrapper .el-table-column--selection .cell) {
    padding: 0;
  }
}
</style>