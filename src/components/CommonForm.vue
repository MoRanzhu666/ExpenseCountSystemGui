<template>
  <div v-if="isShow" class="common_form_wrapper">
    <div class="common_form_overlay" @click="$emit('closeForm')"></div>
    <div class="common_form">
      <div class="form_header">
        <h3>{{ formTitle }}</h3>
        <el-button
          class="close_btn"
          size="small"
          @click="$emit('closeForm')"
          circle
          plain
        >
          <el-icon><Close /></el-icon>
        </el-button>
      </div>
      
      <div class="form_content">
        <el-form
          :rules="rules"
          :model="submitFormData"
          ref="formRef"
          label-position="top"
        >
          <el-form-item
            v-for="(item, index) in formData"
            v-show="item.lable !== 'id' && item.type !== 'hidden'"
            :key="index"
            :label="item.lable"
            :prop="index"
          >
            <common-selection
              v-if="item.type == 'selection'"
              :model-value="submitFormData[index]"
              :options="item.options"
              :selectChange="item.event?.selectChange"
              @update:rules="generateRules"
              @update:modelValue="(val) => (submitFormData[index] = val)"
            />

            <el-input
              v-else
              v-model="submitFormData[index]"
              :type="item.type"
              :precision="item.precision"
              :placeholder="`请输入${item.lable}`"
              @keydown.enter="handleSubmit"
            />
          </el-form-item>
        </el-form>
      </div>
      
      <div class="form_actions">
        <el-button @click="$emit('closeForm')">取消</el-button>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from "vue";
import CommonSelection from "./CommonSelection.vue";

const props = defineProps({
  formData: Object,
  formTitle: String,
  isShow: Boolean,
  handleAdd: Function,
});

const emit = defineEmits(['closeForm']);

const formRef = ref(null);
const submitFormData = ref({});
const rules = ref({});

// 初始化表单数据
const initializeFormData = () => {
  const initData = {};
  for (const key in props.formData) {
    initData[key] = props.formData[key].value;
  }
  submitFormData.value = initData;
};

// 生成验证规则
const generateRules = () => {
  const newRules = {};
  for (let key in props.formData) {
    const field = props.formData[key];
    if (field.required) {
      newRules[key] = [
        {
          required: true,
          message: `${field.lable}不能为空`,
          trigger: field.type === 'selection' ? 'change' : 'blur',
        },
      ];
    }
  }
  rules.value = newRules;
};

// 提交处理
const handleSubmit = async () => {
  if (!formRef.value) return;
  
  try {
    const valid = await formRef.value.validate();
    if (valid) {
      console.log('表单验证通过', submitFormData.value);
      props.handleAdd?.(submitFormData.value);
    }
  } catch (error) {
    console.log('表单验证失败', error);
  }
};

// 监听显示状态，显示时重置表单
watch(() => props.isShow, (newVal) => {
  if (newVal) {
    nextTick(() => {
      initializeFormData();
      generateRules();
    });
  }
});

// 监听表单数据变化
watch(
  () => props.formData,
  () => {
    initializeFormData();
    generateRules();
  },
  { deep: true, immediate: true }
);

// 键盘事件监听
const handleKeydown = (event) => {
  if (event.key === 'Escape') {
    emit('closeForm');
  }
};

onMounted(() => {
  document.addEventListener('keydown', handleKeydown);
  console.log(props.formData);
});

// 清理事件监听
import { onUnmounted } from 'vue';
onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown);
});
</script>

<style scoped>
/* 遮罩层 */
.common_form_wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.common_form_overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

/* 表单容器 */
.common_form {
  position: relative;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  max-height: 90vh;
  width: 90vw;
  max-width: 600px;
  overflow: hidden;
}

/* 响应式断点 */
@media (max-width: 768px) {
  .common_form {
    width: 95vw;
    max-width: none;
    margin: 20px;
    max-height: 85vh;
  }
}

@media (max-width: 480px) {
  .common_form {
    width: 80vw;
    height: 60vh;
    max-height: 100vh;
    border-radius: 0;
    margin: 0;
  }
}

/* 表单头部 */
.form_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px 0;
  border-bottom: 1px solid #f0f0f0;
  flex-shrink: 0;
}

.form_header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #303133;
}

.close_btn {
  border: none;
  background: transparent;
}

/* 表单内容区域 */
.form_content {
  flex: 1;
  overflow-y: auto;
  padding: 20px 24px;
}

:deep(.el-form) {
  width: 100%;
}

:deep(.el-form-item__label) {
  font-weight: 500;
  margin-bottom: 4px;
}

:deep(.el-input),
:deep(.el-select) {
  width: 100%;
}

/* 移动端表单优化 */
@media (max-width: 768px) {
  .form_content {
    padding: 16px 20px;
  }
  
  .form_header {
    padding: 16px 20px 0;
  }
  
  :deep(.el-form-item__label) {
    font-size: 14px;
  }
}

/* 表单操作区域 */
.form_actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid #f0f0f0;
  background-color: #fafafa;
  flex-shrink: 0;
}

@media (max-width: 480px) {
  .form_actions {
    padding: 12px 16px;
  }
  
  .form_actions .el-button {
    flex: 1;
  }
}

/* 滚动条样式 */
.form_content::-webkit-scrollbar {
  width: 6px;
}

.form_content::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.form_content::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.form_content::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>