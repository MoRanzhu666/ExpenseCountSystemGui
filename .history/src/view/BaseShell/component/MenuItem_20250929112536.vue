<template>
  <el-sub-menu v-if="route.children && route.children.length" :index="route.path">
    <template #title>{{ route.meta?.title || route.name }}</template>
    <MenuItem
      v-for="child in route.children"
      :key="child.path"
      :route="child"
    />
  </el-sub-menu>

  <el-menu-item v-else :index="getRouteIndex(route)">
    {{ route.meta?.title || route.name }}
  </el-menu-item>
</template>

<script setup>
defineProps({
  route: { type: Object, required: true },
});

const getRouteIndex = (route) => {
  if (!route.parent) {
    return route.path
  }
  
  // 确保路径拼接正确，避免重复的斜杠
  const parentPath = route.parent.path.endsWith('/') 
    ? route.parent.path.slice(0, -1) 
    : route.parent.path
  
  const currentPath = route.path.startsWith('/') 
    ? route.path.slice(1) 
    : route.path

  console.log('`${parentPath}/${currentPath}`', `${parentPath}/${currentPath}`)
  
  return `${parentPath}/${currentPath}`
}

</script>
