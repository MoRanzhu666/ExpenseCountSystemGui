<template>
  <div class="searchForm">
    <el-row :gutter="[10, 10]" class="search-row">
      <!-- 搜索输入框 -->
      <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="2">
        <el-input
          v-model="searchInfo.searchKey"
          @keydown.enter="handleSearch(searchInfo)"
          placeholder="请输入文本"
          clearable
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
      </el-col>

      <!-- 类别选择 -->
      <el-col :xs="12" :sm="6" :md="5" :lg="2" :xl="2" v-if="customConditon">
        <common-selection
          v-if="customConditon.yearList.length > 0"
          v-model="searchInfo.searchYear"
          :options="customConditon.yearList"
          :option-placeholder="'年份'"
          clearable
        />
      </el-col>
      <el-col :xs="12" :sm="6" :md="5" :lg="2" :xl="2" v-if="customConditon"
        ><common-selection
          v-if="customConditon.monthList.length > 0"
          v-model="searchInfo.searchMonth"
          :options="customConditon.monthList"
          :option-placeholder="'月份'"
          clea
          rable
      /></el-col>
      <el-col :xs="12" :sm="6" :md="5" :lg="2" :xl="2" v-if="customConditon">
        <common-selection
          v-if="customConditon.categoryOptions.length > 0"
          v-model="searchInfo.searchCategory"
          :options="processCategoryOptions(customConditon.categoryOptions)"
          :option-placeholder="'类别'"
          clearable
      /></el-col>

      <!-- 查询按钮 -->
      <el-col :xs="12" :sm="6" :md="4" :lg="3" :xl="3">
        <el-button
          type="primary"
          @click="handleSearch(searchInfo)"
          style="width: 100%"
        >
          查询
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import CommonSelection from "@/components/CommonSelection.vue";

const props = defineProps({
  handleSearch: {
    type: Function,
    required: true,
  },
  customConditon: {
    type: Object,
  },
  // categoryOptions: {
  //   type: Array,
  //   default: () => [],
  // },
});

const searchInfo = ref({
  searchKey: "",
});

const processCategoryOptions = (options) => {
  return options.map((opt) => ({
    value: opt.code,
    label: opt.describe,
  }));
};

onMounted(() => {
  console.log("categoryOptions", props.categoryOptions);
});
</script>

<style scoped>
.searchForm {
  width: 100%;
  padding: 10px 0;
}

.search-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

/* 小屏幕下的调整 */
@media (max-width: 768px) {
  .searchForm {
    padding: 8px 0;
  }

  :deep(.el-col) {
    margin-bottom: 8px;
  }
}

/* 超小屏幕下的特殊处理 */
@media (max-width: 480px) {
  .searchForm {
    padding: 5px 0;
  }

  :deep(.el-input) {
    font-size: 14px;
  }

  :deep(.el-button) {
    font-size: 14px;
    padding: 8px 12px;
  }
}
</style>
