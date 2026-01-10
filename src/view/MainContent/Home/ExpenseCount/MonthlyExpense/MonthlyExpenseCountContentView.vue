<template>
  <common-search-form
    :searchKey="searchKey"
    :handleSearch="handleSearch"
    :search-info="searchInfo"
  />
  <common-table
    :table-data="tableData"
    :table-header-list="tableHeaderList"
    :page-params="pageParams"
    :handle-row-click="handleRowClick"
    :handle-selection-change="handleSelectionChange"
    @update:size="(val) => handleSizeChange(val)"
    @update:current="(val) => handleCurrentChange(val)"
  />
  <selected-expense-comp :selectedExpense="selectedExpense" />
</template>

<script setup>
// import { userService } from "@/api/User";
import { dataUtils } from "@/utils/dataUtils";
import { onMounted, ref, watch } from "vue";
import CommonTable from "@/components/CommonTable.vue";
import CommonSearchForm from "@/components/CommonSearchForm.vue";
import SelectedExpenseComp from "@/components/expense/SelectedExpenseComp.vue";
import { monthlyExpenseServiece } from "@/api/expense/MonthlyExpense";

// 搜索条件
const handleSearch = (searchInfo) => {
  console.log("searchInfo", searchInfo);
  let data = {};
  for (let i in searchInfo) {
    data[i] = searchInfo[i].value ? searchInfo[i].value : "";
  }
  getTableData(data);
};
const searchInfo = ref({
  year: {
    title: "年份",
    placeholder: "请选择年份",
    type: "selection",
    value: "",
    options: [],
  },
});
const generateYearListAndMonthList = () => {
  for (let index = 2026; index > 2000; index--) {
    searchInfo.value.year.options.push({ label: index, value: index });
  }
};

// 通用表格
const selectedRows = ref([]);
const selectedExpense = ref(0);
watch(selectedRows, (newVal) => {
  let total = 0;
  for (let i in newVal) {
    total += newVal[i].monthlyTotal || 0;
  }
  selectedExpense.value = total;
  console.log("selectedRows", newVal);
});
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
    prop: "index",
    width: 80,
    align: "center",
    formatter: (row, column, cellValue, index) => {
      return index + 1;
    },
  },
  // {
  //   label: "ID",
  //   prop: "id",
  //   width: 100,
  //   align: "center",
  // },
  {
    label: "年份",
    prop: "year",
    width: 100,
    align: "center",
  },
  {
    label: "月份",
    prop: "month",
    width: 100,
    align: "center",
  },
  {
    label: "月支出总额",
    prop: "monthlyTotal",
    width: 120,
    align: "center",
    formatter: (row) => `¥${row.monthlyTotal?.toFixed(2) || "0.00"}`,
  },
  {
    label: "平均支出",
    prop: "averageExpenses",
    width: 120,
    align: "center",
    formatter: (row) => `¥${row.averageExpenses?.toFixed(2) || "0.00"}`,
  },
  {
    label: "支出笔数",
    prop: "countExpenses",
    width: 100,
    align: "center",
  },
  {
    label: "最高支出",
    prop: "maxExpenses",
    width: 120,
    align: "center",
    formatter: (row) => `¥${row.maxExpenses?.toFixed(2) || "0.00"}`,
  },
  {
    label: "次高支出",
    prop: "secondMaxExpenses",
    width: 120,
    align: "center",
    formatter: (row) => `¥${row.secondMaxExpenses?.toFixed(2) || "0.00"}`,
  },
  {
    label: "最低支出",
    prop: "minExpenses",
    width: 120,
    align: "center",
    formatter: (row) => `¥${row.minExpenses?.toFixed(2) || "0.00"}`,
  },
  {
    label: "次低支出",
    prop: "secondMinExpenses",
    width: 120,
    align: "center",
    formatter: (row) => `¥${row.secondMinExpenses?.toFixed(2) || "0.00"}`,
  },
  // {
  //   label: "创建人ID",
  //   prop: "createBy",
  //   width: 100,
  //   align: "center",
  // },
  {
    label: "创建人",
    prop: "createByName",
    width: 120,
    align: "center",
  },
  {
    label: "创建时间",
    prop: "createTime",
    width: 180,
    align: "center",
    formatter: (row) => {
      if (!row.createTime) return "";
      return new Date(row.createTime).toLocaleString();
    },
  },
  // {
  //   label: "更新人ID",
  //   prop: "updateBy",
  //   width: 100,
  //   align: "center",
  // },
  {
    label: "更新人",
    prop: "updateByName",
    width: 120,
    align: "center",
  },
  {
    label: "更新时间",
    prop: "updateTime",
    width: 180,
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
const getTableData = async (searchInfo) => {
  for (let i in searchInfo) {
    pageParams.value[i] = searchInfo[i];
  }
  const resp = await monthlyExpenseServiece.getPage(pageParams.value);
  dataUtils.processRespData(tableData, resp, dataUtils.processMap.PAGE);
  dataUtils.processRespPageParams(pageParams, resp);
  // for (let i in tableData.value) {
  //   tableData.value[i].expenseReason = dataUtils.formatExpenseReasonMap(
  //     tableData.value[i].expenseReason
  //   );
  // }
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
  await getTableData();
  generateYearListAndMonthList();
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
