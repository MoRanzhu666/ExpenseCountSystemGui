<template>
  <div v-show="isShow">
    <el-form>
        <el-form-item v-for="(item, index) in fromData" :key="index">{{ item }}</el-form-item>
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

</style>