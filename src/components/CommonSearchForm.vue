<template>
  <div class="serarchForm">
    <el-button-group
      style="display: flex; justify-content: flex-start; padding-bottom: 5px"
    >
      <el-input style="width: 10vw" v-model="searchKey" @keydown.enter="handleSearch(searchKey)">请输入文本</el-input>
      <el-button type="primary" @click="handleSearch(searchKey)">查询</el-button>
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
});
const searchKey = ref("");
</script>

<style>

</style>