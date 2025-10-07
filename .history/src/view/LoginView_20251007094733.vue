<template>
  <div
    style="
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
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
          <el-input placeholder="请输入用户名" v-model="formData.username" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input placeholder="请输入密码" type="password" v-model="formData.password" style="width: 200px;"  show-password></el-input>
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
import { ref } from 'vue';


const formData = ref({
  username: '',
  password: ''
});

const submit = () => {
  console.log('提交的表单数据:', formData.value);
};
</script>

<style></style>
