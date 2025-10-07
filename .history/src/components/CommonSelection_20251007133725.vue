<template>
  <div class="common-selection">
    <el-select
      v-model="modelValue"
      :placeholder="optionPlaceholder"
      filterable
      :filter-method="handleFilter"
      default-first-option
      @change="handleChange"
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
  optionPlaceholder: { type: String, default: "请选择" },
  selectChange: Function,
});

const emit = defineEmits(["update:modelValue", "update:rules"]);

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

const handleChange = (val) => {
  if (props.selectChange) {
    props.selectChange(val);
  }
  emit("update:modelValue", val);
  emit("update:rules");
};

onMounted(() => {
  console.log("CommonSelection props", props);
});
</script>
