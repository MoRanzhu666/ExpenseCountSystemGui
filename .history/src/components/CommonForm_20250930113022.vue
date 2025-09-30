<template>
  <div v-show="isShow" class="common_form">
    <!-- 表单标题栏 -->
    <div class="form-header">
      <h3 class="form-title">表单编辑</h3>
      <el-button 
        size="small" 
        @click="() => $emit('closeForm')" 
        class="close-btn"
        icon="Close"
      />
    </div>
    
    <!-- 表单内容区域 -->
    <el-form class="form-content" label-width="80px">
      <el-form-item 
        v-for="(item, index) in formData" 
        :key="index" 
        :label="item.label"  <!-- 修正了label的拼写错误 -->
        class="form-item"
      >
        <el-input v-model="item.value" class="form-input"></el-input>
      </el-form-item>
    </el-form>
    
    <!-- 表单底部按钮区 -->
    <div class="form-footer">
      <el-button @click="() => $emit('closeForm')">取消</el-button>
      <el-button type="primary" @click="() => $emit('submitForm')">提交</el-button>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { Close } from '@element-plus/icons-vue';  // 确保导入了Close图标

const props = defineProps({
  formData: {
    type: Array,  // 表单数据应该是数组类型（多个表单项）
    default: () => []
  },
  isShow: {
    type: Boolean,  // 显示状态应该是布尔值
    default: false
  }
});

onMounted(() => {
  console.log(props);
});
</script>

<style scoped>
.common_form {
  padding: 0;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  width: 90%;
  max-width: 600px;  /* 限制最大宽度，提升小屏幕体验 */
  max-height: 80vh;  /* 最大高度不超过视口80% */
  overflow: hidden;
  background-color: white;
  border-radius: 8px;  /* 圆角边框 */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);  /* 增强阴影效果 */
}

/* 标题栏样式 */
.form-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  border-bottom: 1px solid #eee;  /* 分隔线 */
  background-color: #f5f7fa;
  border-radius: 8px 8px 0 0;
}

.form-title {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

/* 关闭按钮样式 */
.close-btn {
  color: #909399;
  background: transparent;
  hover-background: #f5f5f5;
  border: none;
  padding: 4px;
  border-radius: 4px;
}

.close-btn:hover {
  color: #ff4d4f;
}

/* 表单内容区域 */
.form-content {
  padding: 20px;
  height: calc(100% - 130px);  /* 减去标题栏和底部按钮区高度 */
  overflow-y: auto;  /* 内容超出时可滚动 */
}

/* 表单项样式 */
.form-item {
  margin-bottom: 15px;  /* 增加表单项间距 */
}

/* 输入框样式 */
.form-input {
  width: 100%;  /* 输入框占满可用宽度 */
}

/* 底部按钮区 */
.form-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 15px 20px;
  border-top: 1px solid #eee;
  background-color: #f5f7fa;
  border-radius: 0 0 8px 8px;
}
</style>
