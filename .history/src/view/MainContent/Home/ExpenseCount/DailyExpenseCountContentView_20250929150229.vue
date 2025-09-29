<template>
  <div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      :row-key="(row) => row.id"
    >
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
  </div>
</template>

<script setup>
import { dailyExpenseService } from "@/api/DailyExpense";
import { dataUtils } from "@/utils/dataUtils";
import { onMounted, ref } from "vue";

const tableData = ref([]);

const tableHeaderList = ref([
  {
    label: "ID",
    prop: "id",
    width: 80,
    align: "center",
  },

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
    align: "right",
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
    align: "right",
    formatter: (row) => `¥${row.dailyTotal?.toFixed(2)}`,
  },
  {
    label: "创建人",
    prop: "createBy",
    width: 120,
    align: "center",
  },
  {
    label: "创建时间",
    prop: "createTime",
    width: 200,
    align: "center",
    // 格式化时间显示（可根据需要自定义）
    formatter: (row) => {
      if (!row.createTime) return "";
      return new Date(row.createTime).toLocaleString();
    },
  },
  {
    label: "更新人",
    prop: "updateBy",
    width: 120,
    align: "center",
  },
  {
    label: "更新时间",
    prop: "updateTime",
    width: 200,
    align: "center",
    formatter: (row) => {
      if (!row.updateTime) return "";
      return new Date(row.updateTime).toLocaleString();
    },
  },
]);

const getTableData = async () => {
  const resp = await dailyExpenseService.getPage();
  dataUtils.processRespData(tableData, resp, dataUtils.processMap.PAGE);
  console.log("resp", resp.data);
  console.log(tableData.value);
};

const initData = async () => {
  await getTableData();
};

onMounted(async () => {
  await initData();
});
</script>

<style></style>
