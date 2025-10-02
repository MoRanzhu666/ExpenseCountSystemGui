<template>
  <div v-show="isShow" class="common_form">
    <div style="overflow: auto; width: 100%; height: 100%">
      <el-form style="padding: 5px 50px" label-width="auto">
        <h3>{{ formTitle }}</h3>
        <el-form-item
          v-for="(item, index) in formData"
          v-show="item.lable !== 'id' && item.type !== 'hidden'"
          :key="index"
          :label="item.lable"
        >
          <el-select
            v-if="item.type == 'selection'"
            v-model="item.value"
            placeholder="请选择"
            filterable
            default-first-option
          >
            <el-option
              v-for="option in filteredOptions(item)"
              :key="option.value"
              :value="option.value"
              >{{ option.label }}</el-option
            >
          </el-select>
          <el-input
            v-if="item.type != 'selection'"
            v-model="item.value"
            :type="item.type"
            :precision="item.precision"
            @keydown.enter="handleAdd(processFormData(formData))"
          ></el-input>
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
    <div
      class="submit"
      style="display: flex; justify-content: right; padding-top: 10px"
    >
      <el-button @click="handleAdd(processFormData(formData))" type="primary"
        >提交</el-button
      >
      <el-button @click="() => $emit('closeForm')">取消</el-button>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";

const props = defineProps({
  formData: Object,
  formTitle: Object,
  isShow: Object,
  handleAdd: Function,
  handleUpdate: Function,
});

const processFormData = (data) => {
  const newFormData = {};
  for (const key in data) {
    newFormData[key] = data[key].value;
  }
  return newFormData;
};

const filteredOptions = (item) => {
  // 如果没有输入内容，返回全部选项
  if (!item.filterText) return item.options || [];

  // 按输入内容模糊匹配选项的label（不区分大小写）
  const filterText = item.filterText.toLowerCase();
  return (item.options || []).filter((option) =>
    option.label.toLowerCase().includes(filterText)
  );
};

onMounted(() => {
  console.log(props);
});
</script>

<style>
.common_form {
  padding: 30px 10px;
  padding-bottom: 50px;
  position: fixed;
  top: 50%;
  left: 50%;
  /* 关键：通过transform将元素自身向左上方移动50%，实现完全居中 */
  transform: translate(-50%, -50%);
  z-index: 1000;
  max-width: 20vw;
  max-height: 60vh;
  background-color: white;
  /* 可选：添加一点阴影增强层次感 */
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}
</style>
