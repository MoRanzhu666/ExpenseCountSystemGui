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
  const validOptions = (props.item.options || []).filter((opt) => {
    return opt?.label != null && opt.label !== "";
  });

  if (!filterText.value) return validOptions;

  const text = filterText.value.toLowerCase();
  return validOptions.filter(
    (option) =>
      option.label.toLowerCase().includes(text) ||
      option.value.toLowerCase().includes(text)
  );
});

const emit = defineEmits(["update:item"]);
const selectedValue = computed({
  get() {
    return props.item.value; // 从props获取当前值
  },
  set(newVal) {
    emit("update:item", { ...props.item, value: newVal });
  },
});

onMounted(() => {
  console.log("CommonSelection", props);
});
</script>

<style></style>
