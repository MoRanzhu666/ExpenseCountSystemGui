<template>
  <div class="serarchForm">
    <el-button-group
      style="display: flex; justify-content: flex-start; padding-bottom: 5px"
    >
      <el-input style="width: 10vw" v-model="searchKey" @keydown.enter="handleSearch(searchKey)">请输入文本</el-input>
      <el-selection v-show="categoryOptions.length > 0" v-model="searchCategory" placeholder="请选择分类" style="width: 10vw; margin-left: 10px">
        <el-option v-for="(item, index) in categoryOptions" :key="index" :label="item"></el-option>
      </el-selection>
      <el-button type="primary" @click="handleSearch({searchKey, searchCategory})">查询</el-button>
    </el-button-group>
  </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
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
</script>

<style>

</style>