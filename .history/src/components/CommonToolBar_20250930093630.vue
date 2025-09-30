<template>
  <div class="common_tool_bar">
    <el-button-group>
        <el-button v-for="(item, index) in buttonList" :key="index">{{ item.name }}</el-button>
    </el-button-group>
  </div>
</template>

<script setup>
const props =  defineOptions({
    buttonList:Array
})
import { onMounted } from 'vue';




onMounted(()=>{
    console.log("toolbar", props)
})
</script>

<style>

</style>