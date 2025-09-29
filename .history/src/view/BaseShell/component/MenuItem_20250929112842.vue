<template>
  <el-sub-menu v-if="route.children && route.children.length" :index="route.path">
    <template #title>{{ route.meta?.title || route.name }}</template>
    <MenuItem
      v-for="child in route.children"
      :key="child.path"
      :route="child"
    />
  </el-sub-menu>

  <el-menu-item v-else :index="route.path">
    {{ route.meta?.title || route.name }}
  </el-menu-item>
</template>

<script setup>
const props =  defineProps({
  route: { type: Object, required: true },
});

console.log(props.route)

</script>
