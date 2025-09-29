<template>
  <base-shell-view :routes="routes"/>
</template>

<script setup>
import { ref } from 'vue';
import BaseShellView from './BaseShell/BaseShellView.vue';
import { useRouter } from "vue-router"

const router = useRouter()
const routes = ref( router.options.routes[0].children)
console.log(routes.value) // 就是路由配置数组

</script>

<style>

</style>