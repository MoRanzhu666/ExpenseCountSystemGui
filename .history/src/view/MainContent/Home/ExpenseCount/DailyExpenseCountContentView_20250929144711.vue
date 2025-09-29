<template>
  <div>daily</div>
</template>

<script setup>
import { dailyExpenseService } from "@/api/DailyExpense";
import { dataUtils } from "@/utils/dataUtils";
import { onMounted, ref } from "vue";

const tableData = ref();
const getTableData = ref();


const initData = async () => {
  const resp = await dailyExpenseService.getPage();  
  dataUtils.processRespData(tableData, resp, dataUtils.processMap.PAGE);
  console.log("resp", resp.data);
  console.log(tableData.value)
};

onMounted(async () => {
  await initData();
});
</script>

<style></style>
