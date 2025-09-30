<template>
  <div class="common_tool_bar">
    <el-button-group>
      <el-button
        v-for="(item, index) in buttonList"
        :key="index"
        @click="item.handler"
        :type="item.type"
        :disabled="item.disabled"
        :size="item.size"
        >{{ item.name }} </el-button
      >
    </el-button-group>
  </div>
</template>

<script setup>
import { onMounted } from "vue";

const props = defineProps({
  buttonList: Array,
});

onMounted(() => {
  console.log("toolbar", props);
});
</script>

<style>
.common_tool_bar {
  display: flex;
  justify-content: left;
  padding: 5px 0;
}
</style>
