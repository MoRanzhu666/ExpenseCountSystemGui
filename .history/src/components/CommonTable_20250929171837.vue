<template>
  <div>
    <el-table :data="tableData" border :row-key="(row) => row.id" height="70vh">
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
        v-model:current-page="pageParams.current"
        v-model:page-size="pageParams.page"
        :page-sizes="[10, 20, 50, 100, 200, 300, 400]"
        :size="pageParams.size"
        :disabled="disabled"
        :background="background"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageParams.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup>
defineProps({
  tableData: { type: Object },
  tableHeaderList: { type: Array },
  pageParams: { type: Object },
  handleSizeChange: { type: Object },
  handleCurrentChange: { type: Object },
});
</script>

<style></style>
