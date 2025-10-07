<template>
  <div
    style="
      display: flex;
      justify-content: center; /* 保持水平居中不变 */
      align-items: flex-start; /* 垂直方向靠顶部对齐，关键修改1 */
      height: 100vh;
      padding-top: 20vh; /* 顶部留20%视窗高度的间距，关键修改2 */
    "
  >
    <div>
      <h4 style="text-align: center">ECS费用统计登录</h4>
      <el-form
        style="border: 1px solid #eee; border-radius: 10px; padding: 60px"
        :model="formData"
        label-width="70px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input placeholder="请输入用户名" v-model="formData.username" style="width: 200px;" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input placeholder="请输入密码" type="password" v-model="formData.password" style="width: 200px;"  show-password clearable></el-input>
        </el-form-item>
        <div
          class="submitbutton"
          style="display: flex; justify-content: center"
        >
          <el-button type="primary" @click="submit">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { authService } from '@/api/Auth';
import router from '@/router';
import { dataUtils } from '@/utils/dataUtils';
import { ref } from 'vue';


const formData = ref({
  username: '',
  password: ''
});

const token = ref({})

const submit = async () => {
  console.log('提交的表单数据:', formData.value);
  const resp = await authService.login(formData.value)
  dataUtils.processRespData(token, resp, dataUtils.processMap.NORMAL)
  console.log("resp", resp, token.value);
  
  if(token.value){
    localStorage.setItem("token", token.value); 
     router.push(`/`);
  }

};
</script>

<style></style>
