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
      >
        <el-form-item>
          <el-input placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <div
          class="submitbutton"
          style="display: flex; justify-content: center"
        >
          <el-button type="primary">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup></script>

<style></style>
