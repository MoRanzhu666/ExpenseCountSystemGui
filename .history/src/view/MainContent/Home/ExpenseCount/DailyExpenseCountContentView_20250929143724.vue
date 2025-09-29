<template>
  <div>daily</div>
</template>

<script setup>
import { dailyExpenseService } from "@/api/DailyExpense";
import { dataUtils } from "@/utils/dataUtils";
import { onMounted } from "vue";

const tableData = ref();

const initData = async () => {
  const resp = await dailyExpenseService.getPage();
  dataUtils.processRespData(tableData, resp, dataUtils.processMap.PAGE);
  console.log("resp", resp);
};

onMounted(async () => {
  await initData();
});
</script>

<style></style>
