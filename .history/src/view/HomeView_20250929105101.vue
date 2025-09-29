<template>
  <base-shell-view/>
</template>

<script setup>
import BaseShellView from './BaseShell/BaseShellView.vue';
import { useRouter } from "vue-router"

const router = useRouter()
const childrenRoutes = router.options.routes[0].children
console.log(childrenRoutes) // 就是路由配置数组

</script>

<style>

</style>