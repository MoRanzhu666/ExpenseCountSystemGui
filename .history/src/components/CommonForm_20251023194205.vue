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
    width: 100vw;
    height: 100vh;
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