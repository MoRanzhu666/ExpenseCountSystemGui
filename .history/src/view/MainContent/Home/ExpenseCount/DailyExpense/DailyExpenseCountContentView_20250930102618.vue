<template>
  <common-tool-bar :buttonList="buttonList" />
  <common-table
    :table-data="tableData"
    :table-header-list="tableHeaderList"
    :page-params="pageParams"
    :handle-row-click="handleRowClick"
    :handle-selection-change="handleSelectionChange"
    @update:size="(val) => handleSizeChange(val)"
    @update:current="(val) => handleCurrentChange(val)"
  />
  <common-form/>
</template>

<script setup>
import { dailyExpenseService } from "@/api/DailyExpense";
// import { userService } from "@/api/User";
import { dataUtils } from "@/utils/dataUtils";
import { onMounted, ref, watch } from "vue";
import CommonTable from "@/components/CommonTable.vue";
import CommonToolBar from "@/components/CommonToolBar.vue";
import CommonForm from "@/components/CommonForm.vue";

const handlerAdd = () => {
  console.log("add");
};
const handlerUpdate = () => {
  console.log("update");
};
const handlerDelete = () => {
  console.log("delete", selectedRows.value);
};
const disableUpdate = () => {
  buttonList.value.update.disabled = true;
};
const startUpdate = () => {
  buttonList.value.update.disabled = false;
};
const buttonList = ref({
  add: {
    name: "新增",
    title: "add",
    handler: handlerAdd,
    type: "primary",
    disabled: false,
    size:'default'
  },
  update: {
    name: "修改",
    title: "update",
    handler: handlerUpdate,
    type: "primary",
    disabled: false,
    size:'default'
  },
  delete: {
    name: "删除",
    title: "delete",
    handler: handlerDelete,
    type: "danger",
    disabled: false,
    size:'default'
  },
});

const selectedRows = ref([]);
watch(
  () => selectedRows.value,
  (newVal) => {
    if (newVal.length > 1) {
      disableUpdate();
    } else {
      startUpdate();
    }
  },
  {
    immediate: true,
    deep: true,
  }
);
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
    width: 80,
    align: "center",
  },
  {
    label: "月份",
    prop: "month",
    width: 80,
    align: "center",
  },
  {
    label: "日期",
    prop: "day",
    width: 80,
    align: "center",
  },
  {
    label: "单次支出",
    prop: "singleExpense",
    width: 120,
    align: "center",
    formatter: (row) => `¥${row.singleExpense?.toFixed(2)}`,
  },
  {
    label: "支出原因",
    prop: "expenseReason",
    width: 150,
    align: "center",
  },
  {
    label: "支出内容",
    prop: "expenseContent",
    width: 180,
    align: "center",
  },
  {
    label: "每日总计",
    prop: "dailyTotal",
    width: 120,
    align: "center",
    formatter: (row) => `¥${row.dailyTotal?.toFixed(2)}`,
  },
  {
    label: "创建人",
    prop: "createByName",
    width: 120,
    align: "center",
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
const getTableData = async () => {
  const resp = await dailyExpenseService.getPage(pageParams.value);
  dataUtils.processRespData(tableData, resp, dataUtils.processMap.PAGE);
  dataUtils.processRespPageParams(pageParams, resp);
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
