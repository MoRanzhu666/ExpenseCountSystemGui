<template>
  <div class="serarchForm">
    <el-button-group
      style="display: flex; justify-content: flex-start; padding-bottom: 5px"
    >
      <el-input
        style="width: 10vw"
        v-model="searchKey"
        @keydown.enter="handleSearch(searchKey)"
        >请输入文本</el-input
      >
      <common-selection
        v-model="searchCategory"
        v-if="categoryOptions.length > 0"
        :options="processCategoryOptions(categoryOptions)"
        :option-placeholder="'类别'"
        style="width: 5vw;"
      />
      <el-button
        type="primary"
        @click="handleSearch({ searchKey, searchCategory })"
        >查询</el-button
      >
    </el-button-group>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import CommonSelection from "@/components/CommonSelection.vue";

const props = defineProps({
  handleSearch: {
    type: Function,
    required: true,
  },
  categoryOptions: {
    type: Array,
    default: () => [],
  },
});
const searchKey = ref("");
const searchCategory = ref("");

const processCategoryOptions = (options) => {
  return options.map((opt) => ({
    value: opt.code,
    label: opt.describe,
  }));
};

onMounted(() => {
  console.log("categoryOptions", props.categoryOptions);
});
</script>

<style></style>
