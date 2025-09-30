<template>
  <div class="common_tool_bar">
    <el-button-group style="text-align: right;">
        <el-button v-for="(item, index) in buttonList" :key="index">{{ item.name }}</el-button>
    </el-button-group>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

const props =  defineProps({
    buttonList:Array
})


onMounted(()=>{
    console.log("toolbar", props)
})
</script>

<style>

</style>