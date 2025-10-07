<template>
  <div style="color: #666; width: 100vw">
    <el-row :gutter="40">
      <el-col :span="22"> ECS费用统计系统</el-col>
      <el-col :span="2" style="display: flex; justify-content: right">
        <el-popconfirm
          class="box-item"
          title="退出登录"
          placement="bottom-start"
        >
          <template #reference>
            <span>
              {{ user.name }}
            </span>
          </template>
        </el-popconfirm>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { userService } from "@/api/User";
import { dataUtils } from "@/utils/dataUtils";
import { onMounted, ref } from "vue";

const user = ref({});

onMounted(async () => {
  const resp = await userService.getUser();
  dataUtils.processRespData(user, resp, dataUtils.processMap.NORMAL);
});
</script>

<style></style>
