<template>
  <div>daily</div>
</template>

<script setup>
import { dailyExpenseService } from "@/api/DailyExpense";
import { dataUtils } from "@/utils/dataUtils";
import { onMounted, ref } from "vue";

const tableData = ref({
  id: "",
  createBy: "",
  createTime: "",
  updateBy: "",
  updateTime: "",
  year: "",
  month: "",
  day: "",
  singleExpense: "",
  expenseReason: "",
  expenseContent: "",
  dailyTotal: "",
});
const tableHeaderList = ref();
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
