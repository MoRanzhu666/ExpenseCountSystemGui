<template>
  <common-search-form :searchKey="searchKey" :handleSearch="handleSearch"/>
  <common-table
    :table-data="tableData"
    :table-header-list="tableHeaderList"
    :page-params="pageParams"
    :handle-row-click="handleRowClick"
    :handle-selection-change="handleSelectionChange"
    @update:size="(val) => handleSizeChange(val)"
    @update:current="(val) => handleCurrentChange(val)"
  />
  
</template>

<script setup>
// import { userService } from "@/api/User";
import { dataUtils } from "@/utils/dataUtils";
import { onMounted, ref } from "vue";
import CommonTable from "@/components/CommonTable.vue";
import CommonSearchForm from "@/components/CommonSearchForm.vue";
import { monthlyExpenseServiece } from "@/api/expense/MonthExpense";


// 搜索条件
const handleSearch = (searchKey) => {
  console.log("searchKey", searchKey);
  getTableData(searchKey);
};


// 通用表格
const selectedRows = ref([]);
const handleRowClick = (row) => {
  selectedRows.value = [];
  selectedRows.value.push(row);
};
const handleSelectionChange = (rows) => {
  selectedRows.value = rows;
};
const tableData = ref([]);
const tableHeaderList = ref([
  {
    label: "序号",
    prop: "index", // 可自定义一个不存在的prop（仅用于标识）
    width: 80,
    align: "center",
    // 关键：通过formatter结合行索引生成序号（index从0开始，+1变为从1开始）
    formatter: (row, column, cellValue, index) => {
      return index + 1; // 序号从1开始递增
    },
  },
  // {
  //   label: "ID",
  //   prop: "id",
  //   width: 80,
  //   align: "center",
  // },

  {
    label: "年份",
    prop: "year",
    align: "center",
  },
  {
    label: "月份",
    prop: "month",
    align: "center",
  },
  {
    label: "月支出",
    prop: "monthlyTotal",
    align: "center",
    formatter: (row) => `¥${row.monthlyTotal?.toFixed(2)}`,
  },
  {
    label: "创建人",
    prop: "createByName",
    align: "center",
    width:120,
    type: "slot",
  },
  {
    label: "创建时间",
    prop: "createTime",
    align: "center",
    // 格式化时间显示（可根据需要自定义）
    formatter: (row) => {
      if (!row.createTime) return "";
      return new Date(row.createTime).toLocaleString();
    },
  },
  {
    label: "更新人",
    prop: "updateByName",
    width: 120,
    align: "center",
  },
  {
    label: "更新时间",
    prop: "updateTime",
    align: "center",
    formatter: (row) => {
      if (!row.updateTime) return "";
      return new Date(row.updateTime).toLocaleString();
    },
  },
]);
const pageParams = ref({
  current: 1,
  size: 20,
  total: 10,
  page: 10,
});
const getTableData = async (key) => {
  pageParams.value.key = key || "";
  const resp = await monthlyExpenseServiece.getPage(pageParams.value);
  dataUtils.processRespData(tableData, resp, dataUtils.processMap.PAGE);
  dataUtils.processRespPageParams(pageParams, resp);
  for (let i in tableData.value) {
    tableData.value[i].expenseReason = dataUtils.formatExpenseReasonMap(tableData.value[i].expenseReason, categoryOptions.value);
  }
};
const handleSizeChange = (size) => {
  pageParams.value.size = size;
  getTableData();
};
const handleCurrentChange = (current) => {
  pageParams.value.current = current;
  getTableData();
};

// const getUserInfo = async (id) => {
//   const user = (await userService.getById({ id })).data.data;
//   console.log("name", user?.name)
//   return user;
// };

const initData = async () => {
  await getCategoryOptions();
  await getTableData();
};

onMounted(async () => {
  await initData();
});
</script>

<style>
.page-bar {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
  padding-right: 16px;
}
</style>
