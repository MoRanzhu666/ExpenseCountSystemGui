<template>
  <div class="common-selection">
    <el-select
      v-model="selectedValue" 
      placeholder="请选择"
      filterable
      :filter-method="handleFilter" 
      default-first-option
    >
      <el-option
        v-for="option in filteredOptions"
        :key="option.value"
        :value="option.value"
        >{{ option.label }}</el-option
      >
    </el-select>
  </div>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue';

const props = defineProps({
  item: Object,
});

// 子组件内部维护筛选文本状态（避免修改props）
const filterText = ref('');

// 处理筛选输入（更新本地状态）
const handleFilter = (val) => {
  filterText.value = val;
};

// 计算属性：基于本地filterText筛选选项
const filteredOptions = computed(() => {
  if (!filterText.value) return props.item.options || [];
  
  const text = filterText.value.toLowerCase();
  return (props.item.options || []).filter(option =>
    option.label.toLowerCase().includes(text)
  );
});

// 处理v-model双向绑定（通过emit通知父组件修改）
const emit = defineEmits(['update:item']);
const selectedValue = computed({
  get() {
    return props.item.value;  // 从props获取当前值
  },
  set(newVal) {
    // 通知父组件更新value（不直接修改props）
    emit('update:item', { ...props.item, value: newVal });
  }
});

onMounted(() => {
  console.log("CommonSelection", props);
});
</script>

<style></style>
    