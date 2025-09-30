<template>
  <div>
    <el-table
      ref="tableRef"
      :data="tableData"
      border
      :row-key="(row) => row.id"
      height="70vh"
      @selection-change="handleSelectionChangeDefault"
      @row-click="handleRowClickDefault"
    >
      <el-table-column
        type="selection"
        width="55"
        align="center"
      />
      <el-table-column
        v-for="item in tableHeaderList"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :align="item.align"
        :formatter="item.formatter"
      />
    </el-table>

    <div class="page-bar">
      <el-pagination
        v-model:current-page="localPageParams.current"
        v-model:page-size="localPageParams.page"
        :page-sizes="[10, 20, 50, 100, 200, 300, 400]"
        :size="localPageParams.size"
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
  tableData: { type: Array, default: () => [] },
  tableHeaderList: { type: Array, default: () => [] },
  pageParams: { type: Object, default: () => ({}) },
  disabled: Boolean,
  background: Boolean,
  handleSelectionChange: Function, // 外部传入的函数
  handleRowClick: Function          // 外部传入的函数
});

 defineEmits(["update:size", "update:current"]);

const localPageParams = ref({ ...props.pageParams });

watch(
  () => props.pageParams,
  (newVal) => {
    localPageParams.value = { ...newVal };
  },
  { deep: true }
);

const tableRef = ref();

// 处理选择事件
const handleSelectionChangeDefault = (rows) => {
  if (props.handleSelectionChange) {
    props.handleSelectionChange(rows,); // 调用外部函数
  } else {
    console.log("默认选择：", rows);
  }
};

// 处理行点击事件
const handleRowClickDefault = (row) => {
  if (props.handleRowClick) {
    props.handleRowClick(row); // 调用外部函数
  } 
    console.log("默认点击行：", row);
    tableRef.value.clearSelection();
    tableRef.value.toggleRowSelection(row);
  
};

</script>

<style></style>
