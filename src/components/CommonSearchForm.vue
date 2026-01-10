<template>
  <div class="searchForm">
    <el-row :gutter="[10, 10]" class="search-row">
      <!-- 搜索输入框 -->
      <template v-for="(item, index) in searchInfo" :key="index">
        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="2" v-show="item.type=='text'">
          <el-input
            v-model="item.value"
            @blur="handleSearch(searchInfo)"
            @keydown.enter="handleSearch(searchInfo)"
            :placeholder="item.placeholder"
            clearable
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="2" v-show="item.type=='selection'">
          <common-selection
            @change="handleChange"
            v-model="item.value"
            :options="item.options"
            :option-placeholder="item.placeholder"
            clearable
          />
        </el-col>
      </template>


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
import { onMounted } from "vue";
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

  searchInfo: {
    type: Object,
    default: () => ({}),
  },
});

const handleChange = () => {
  props.handleSearch(props.searchInfo)
}

onMounted(() => {
  console.log("categoryOptions", props);
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
