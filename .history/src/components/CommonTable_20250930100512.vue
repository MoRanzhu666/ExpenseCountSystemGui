<template>
  <div>
    <template>
  <div>
    <el-table
      ref="tableRef"
      :data="tableData"
      border
      :row-key="(row) => row.id"
      height="70vh"
      @selection-change="handleSelectionChange || handleSelectionChangeDefault"
      @row-click="handleRowClick || handleRowClickDefault"
    >
      <el-table-column
        type="selection"
        width="55"
        align="center"
      ></el-table-column>
      <el-table-column
        v-for="item in tableHeaderList"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :align="item.align"
        :formatter="item.formatter"
      >
      </el-table-column>
    </el-table>
    <div class="page-bar">
      <el-pagination
        v-model:current-page="localPageParams.current"
        v-model:page-size="localPageParams.page"
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
import { ref, watch } from "vue";

const props = defineProps({
  tableData: {
    type: Object, // 通常表格数据是Array，这里保持你的定义，若实际是数组可改为Array
    default: () => ({})
  },
  tableHeaderList: {
    type: Array,
    default: () => []
  },
  pageParams: {
    type: Object,
    default: () => ({
      current: 1,
      page: 10,
      total: 0
    })
  },
  disabled: {
    type: Boolean,
    default: false
  },
  background: {
    type: Boolean,
    default: false
  },
  handleSelectionChange: Function,
  handleRowClick: Function
});

// 分页参数本地副本
const localPageParams = ref({ ...props.pageParams });

// 监听分页参数变化并同步
watch(
  () => props.pageParams,
  (newVal) => {
    localPageParams.value = { ...newVal };
  },
  { deep: true }
);

const tableRef = ref(null);

// 默认选择变化处理
const handleSelectionChangeDefault = (selection) => {
  console.log("默认选中变化:", selection);
};

// 默认行点击处理
const handleRowClickDefault = (row) => {
  console.log("默认行点击:", row);
  if (tableRef.value) {
    tableRef.value.clearSelection();
    tableRef.value.toggleRowSelection(row);
  }
};



defineEmits(["update:size", "update:current"]);
</script>

<style></style>
