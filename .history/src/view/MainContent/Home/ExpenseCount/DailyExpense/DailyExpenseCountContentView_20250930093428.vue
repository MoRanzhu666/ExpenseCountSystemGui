<template>
  <common-tool-bar
  :buttonList="buttonList"
  />
  <common-table
    :table-data="tableData"
    :table-header-list="tableHeaderList"
    :page-params="pageParams"
    @update:size="(val) => handleSizeChange(val)"
    @update:current="(val) => handleCurrentChange(val)"
  />
</template>

<script setup>
import { dailyExpenseService } from "@/api/DailyExpense";
// import { userService } from "@/api/User";
import { dataUtils } from "@/utils/dataUtils";
import { onMounted, ref } from "vue";
import CommonTable from "@/components/CommonTable.vue";
import CommonToolBar from "@/components/CommonToolBar.vue";

const buttonList = ref([
  {name:'新增'},
  {name:"修改"},
  {name:"删除"}
])

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
