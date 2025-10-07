<template>
  <div style="font-size: 12px; color: #333; ">
    合计:{{ selectedExpense.toFixed(2) }} 元
  </div>
</template>

<script setup>
defineProps({
    selectedExpense: {
        type: Number,
        default: 0
    }
})
</script>

<style>

</style>