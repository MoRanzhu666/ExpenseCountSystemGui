<template>
  <div v-if="isShow" class="common_form">
    <div style="overflow: auto; width: 100%; height: 100%">
      <el-form
        style="padding: 5px 50px"
        label-width="auto"
        :rules="rules"
        :model="submitFormData"
        ref="formRef"
      >
        <h3>{{ formTitle }}</h3>
        <el-form-item
          v-for="(item, index) in formData"
          v-show="item.lable !== 'id' && item.type !== 'hidden'"
          :key="index"
          :label="item.lable"
          :prop="index"
        >
          <common-selection
            v-if="item.type == 'selection'"
            :item="item"
            @update:item="(updatedItem) => (item = updatedItem)"
          />

          <el-input
            v-if="item.type != 'selection'"
            v-model="submitFormData[index]"
            :type="item.type"
            :precision="item.precision"
            @keydown.enter="handleAdd(submitFormData)"
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
      <el-button
        @click="
          formRef.validate((vaild) => {
            if (vaild){
              console.log('submit!', vaild, formData, submitFormData);
              // console.log('submit!',  handleAdd(processFormData(formData)));
            }
          })
        "
        type="primary"
        >提交</el-button
      >
      <el-button @click="() => $emit('closeForm')">取消</el-button>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import CommonSelection from "./CommonSelection.vue";

const props = defineProps({
  formData: Object,
  formTitle: Object,
  isShow: Object,
  handleAdd: Function,
});

const formRef = ref(null);

const submitFormData = computed(() => {
  const data = {};
  for (const key in props.formData) {
    data[key] = props.formData[key].value;
  }
  return data;
});
// const processFormData = (data) => {
//   const newFormData = {};
//   for (const key in data) {
//     newFormData[key] = data[key].value;
//   }
//   submitFormData.value = newFormData;
//   console.log("processFormData", submitFormData.value);
//   return newFormData;
// };

const rules = ref({});

onMounted(() => {
  console.log("props", props);

  for (let i in props.formData) {
    if (props.formData[i].required) {
      rules.value[i] = [
        {
          required: true,
          message: `${props.formData[i].lable}不能为空`,
          trigger: "blur",
        },
      ];
    }
  }
  console.log("rules", rules.value);
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
