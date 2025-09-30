<template>
  <div class="common_tool_bar">
    tollbar
    <el-button-group>
        <el-button v-for="(item, index) in buttonList" :key="index">{{ item.name }}</el-button>
    </el-button-group>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

defineOptions({
    buttonList:Array
})


onMounted(()=>{
    console.log("toolbar")
})
</script>

<style>

</style>