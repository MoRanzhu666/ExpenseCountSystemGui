<template>
  <div style="color: #666;width: 100vw;" >
    <el-row :gutter="40">
      <el-col :span="22"> ECS费用统计系统</el-col>
      <el-col :span="2" style="display: flex; justify-content: right;">用户名</el-col>
    </el-row>
  </div>
</template>

<script setup>
import { userService } from '@/api/User';
import { onMounted } from 'vue';


onMounted(async () => {
  const resp = await userService.getUser()
  console.log("user", resp);
});
</script>

<style></style>
