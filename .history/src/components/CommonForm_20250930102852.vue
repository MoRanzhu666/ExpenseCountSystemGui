<template>
  <div>
    <el-form>
        <el-form-item v-for="(item, index) in fromData" :key="index">{{ item }}</el-form-item>
    </el-form>
    <div>关闭</div>
  </div>
</template>

<script setup>

defineProps({
    fromData:Object
})

</script>

<style>

</style>