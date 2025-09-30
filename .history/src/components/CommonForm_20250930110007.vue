<template>
  <div v-show="isShow" class="common_form">
    <el-form style="padding: 5px 10px;">
        <el-form-item v-for="(item, index) in formData" :key="index">{{ item }}</el-form-item>
    </el-form>
    <el-button @click="() => $emit('closeForm')">关闭</el-button>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

const props =  defineProps({
    formData:Object,
    isShow:Object
})


onMounted(()=>{
    console.log(props)
})
</script>

<style>
.common_form{
    position: fixed;
    top: 50%;
    left: 50%;
    /* 关键：通过transform将元素自身向左上方移动50%，实现完全居中 */
    transform: translate(-50%, -50%);
    z-index: 9999 !important;
    width: 40vw;
    height: 60vh;
    overflow: auto;
    background-color: white;
    /* 可选：添加一点阴影增强层次感 */
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}
</style>