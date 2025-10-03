<template>
  <div class="serarchForm">
    <el-button-group
      style="display: flex; justify-content: flex-start; padding-bottom: 5px"
    >
      <el-input style="width: 10vw" v-model="searchKey">请输入文本</el-input>
      <el-button type="primary" @click="handleSearch">查询</el-button>
    </el-button-group>
  </div>
</template>

<script setup>
defineProps({
    handleSearch: {
        type: Function,
        required: true,
    },
    searchKey: {
        type: String,
        required: true,
    },
});
</script>

<style>

</style>