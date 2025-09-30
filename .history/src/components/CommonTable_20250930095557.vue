<template>
  <div>
    <el-table
      ref="tableRef"
      :data="tableData"
      border
      :row-key="(row) => row.id"
      height="70vh"
      @selection-change="handleSelectionChange"
      @row-click="handleRowClick"
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
  tableData: Object,
  tableHeaderList: Array,
  pageParams: Object,
  disabled: Boolean,
  background: Boolean,
});

// 分页参数本地副本（常用于分页组件双向绑定）
const localPageParams = ref({ ...props.pageParams });

watch(
  () => props.pageParams,
  (newVal) => {
    localPageParams.value = { ...newVal }; // 同步分页参数
  },
  { deep: true }
);

const tableRef = ref()

const handleSelectionChange = (row) => {
  console.log(row);
};
const handleRowClick = (row)=>{
  console.log(row)
  tableRef.toggleRowSelection(row)
}

defineEmits(["update:size", "update:current"]);
</script>

<style></style>
