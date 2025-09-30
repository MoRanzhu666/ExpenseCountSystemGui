<template>
  <div>
    <el-form>
        <el-form-item v-for="(item, index) in fromData" :key="index">{{ item }}</el-form-item>
    </el-form>
    <div>关闭</div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

const props =  defineProps({
    formData:Object
})


onMounted(()=>{
    console.log(props)
})
</script>

<style>

</style>