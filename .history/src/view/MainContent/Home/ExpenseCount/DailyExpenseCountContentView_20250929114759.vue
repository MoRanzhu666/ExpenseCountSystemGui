<template>
  <div>daily</div>
</template>

<script setup>
import { dailyExpenseService } from "@/api/DailyExpense";
import { onMounted } from "vue";

const initData = () => {
  dailyExpenseService.getPage();
};

onMounted(async () => {
  await initData();
});
</script>

<style></style>
