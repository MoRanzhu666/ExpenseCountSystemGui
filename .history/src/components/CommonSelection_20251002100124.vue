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
import { onMounted, computed, ref } from "vue";

const props = defineProps({
  item: Object,
});

// 子组件内部维护筛选文本状态（避免修改props）
const filterText = ref("");

// 处理筛选输入（更新本地状态）
const handleFilter = (val) => {
  filterText.value = val;
};

// 计算属性：基于本地filterText筛选选项
const filteredOptions = computed(() => {
  // 1. 先获取原始选项，并过滤掉label为空值的选项
  const validOptions = (props.item.options || []).filter(opt => {
    // 判断label是否为有效非空值（排除null、undefined、空字符串）
    return opt?.label != null && opt.label !== '';
  });

  // 2. 如果没有筛选文本，直接返回过滤空值后的选项
  if (!filterText.value) return validOptions;

  // 3. 有筛选文本时，在有效选项中继续筛选
  const text = filterText.value.toLowerCase();
  return validOptions.filter(option => 
    option.label.toLowerCase().includes(text) || 
    option.value.toLowerCase().includes(text)
  );
});

// 处理v-model双向绑定（通过emit通知父组件修改）
const emit = defineEmits(["update:item"]);
const selectedValue = computed({
  get() {
    return props.item.value; // 从props获取当前值
  },
  set(newVal) {
    // 通知父组件更新value（不直接修改props）
    emit("update:item", { ...props.item, value: newVal });
  },
});

onMounted(() => {
  console.log("CommonSelection", props);
});
</script>

<style></style>
