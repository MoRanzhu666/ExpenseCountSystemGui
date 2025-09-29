<template>
  <el-sub-menu
    v-if="route.children && route.children.length"
    :index="route.parent ? `${route.parent.path}/${route.path}` : route.path"
  >
    <template #title>{{ route.meta?.title || route.name }} {{ route.parent }}</template>
    <MenuItem
      v-for="child in route.children"
      :key="child.path"
      :route="child"
    />
  </el-sub-menu>

  <el-menu-item
    v-else
    :index="route.parent ? `${route.parent.path}/${route.path}` : route.path"
  >
    {{ route.meta?.title || route.name }}
  </el-menu-item>
</template>

<script setup>
defineProps({
  route: { type: Object, required: true },
});
</script>
