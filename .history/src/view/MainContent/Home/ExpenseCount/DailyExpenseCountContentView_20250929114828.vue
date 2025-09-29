<template>
  <div>daily</div>
</template>

<script setup>
import { dailyExpenseService } from "@/api/DailyExpense";
import { onMounted } from "vue";

const initData = async () => {
  const resp = await dailyExpenseService.getPage();
  console.log('resp', resp)
};

onMounted(async () => {
  await initData();
});
</script>

<style></style>
