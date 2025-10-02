<template>
  <div class="common-selection">
    <el-select
      v-model="item.value"
      placeholder="请选择"
      filterable
      :filter-method="(val) => (item.filterText = val)"
      default-first-option
    >
      <el-option
        v-for="option in filteredOptions(item)"
        :key="option.value"
        :value="option.value"
        >{{ option.label }}</el-option
      >
    </el-select>
  </div>
</template>

<script setup>
defineProps({
  item: Object,
});

const filteredOptions = (item) => {
  if (!item.filterText) return item.options || [];

  const filterText = item.filterText;
  return (item.options || []).filter((option) =>
    option.label.toLowerCase().includes(filterText)
  );
};

onMounted(() => {
  console.log("CommonSelection", item);
});
</script>

<style></style>
