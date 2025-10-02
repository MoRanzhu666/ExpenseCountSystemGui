<template>
  <div class="common-selection">
    <el-select
      v-model="modelValue"
      placeholder="请选择"
      filterable
      :filter-method="handleFilter"
      default-first-option
      @change="selectChange && selectChange($event)"
    >
      <el-option
        v-for="option in filteredOptions"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </el-option>
    </el-select>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";

const props = defineProps({
  modelValue: [String, Number, Object], // 支持多种类型
  options: { type: Array, default: () => [] },
  selectChange: Function,
});

const emit = defineEmits(["update:modelValue"]);

const filterText = ref("");

const handleFilter = (val) => {
  filterText.value = val;
};

const filteredOptions = computed(() => {
  const validOptions = props.options.filter((opt) => opt?.label);
  if (!filterText.value) return validOptions;

  const text = filterText.value.toLowerCase();
  return validOptions.filter(
    (option) =>
      option.label.toLowerCase().includes(text) ||
      option.value.toLowerCase().includes(text)
  );
});

// 绑定 v-model
const modelValue = computed({
  get: () => {
    return props.options.find((item) => {
      if (item.value === props.modelValue) {
        return item.label;
      }
    });
  },
  set: (val) => emit("update:modelValue", val),
});

onMounted(() => {
  console.log("CommonSelection props", props);
});
</script>
