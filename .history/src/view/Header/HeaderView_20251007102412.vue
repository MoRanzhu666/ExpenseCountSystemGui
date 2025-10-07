<template>
  <div style="color: #666; width: 100vw">
    <el-row :gutter="40">
      <el-col :span="22"> ECS费用统计系统</el-col>
      <el-col :span="2" style="display: flex; justify-content: flex-end">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link" style="cursor: pointer">
            {{ user.name }}
            <el-icon><ArrowDown /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="profile">个人中心</el-dropdown-item>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { userService } from "@/api/User";
import { dataUtils } from "@/utils/dataUtils";
import { ElMessage } from "element-plus";
import { onMounted, ref } from "vue";

const user = ref({});

const handleCommand = (command) => {
  if (command === 'logout') {
    ElMessage.success('已退出登录')
    // 这里可以加上清除token、跳转登录页等逻辑
    // localStorage.removeItem('token') 
    // router.push('/login')
  } else if (command === 'profile') {
    ElMessage.info('跳转到个人中心')
    // router.push('/profile')
  }
}

onMounted(async () => {
  const resp = await userService.getUser();
  dataUtils.processRespData(user, resp, dataUtils.processMap.NORMAL);
});
</script>

<style></style>
