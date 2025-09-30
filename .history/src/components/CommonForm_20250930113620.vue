<template>
  <div v-show="isShow" class="common_form">
    <div style="overflow: auto; width: 100%; height: 100%">
      <el-form style="padding: 5px 10px" label-width="auto">
        <el-form-item
          v-for="(item, index) in formData"
          :key="index"
          :label="item.lable"
        >
          <el-input v-model="item.value"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="close">
      <el-button
        size="small"
        @click="() => $emit('closeForm')"
        style="position: fixed; top: 0; right: 0; border: none"
      >
        <el-icon><Close /></el-icon>
      </el-button>
    </div>
    <div class="submit">
        <el-button @click="handleSubmit">提交</el-button>
        <el-button @click="() => $emit('closeForm')">取消</el-button>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";

const props = defineProps({
  formData: Object,
  isShow: Object,
});

onMounted(() => {
  console.log(props);
});
</script>

<style>
.common_form {
  padding: 30px 10px;
  position: fixed;
  top: 50%;
  left: 50%;
  /* 关键：通过transform将元素自身向左上方移动50%，实现完全居中 */
  transform: translate(-50%, -50%);
  z-index: 9999 !important;
  width: 20vw;
  height: 60vh;
  background-color: white;
  /* 可选：添加一点阴影增强层次感 */
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}
</style>
