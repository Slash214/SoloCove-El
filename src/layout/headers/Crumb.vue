<template>
    <el-breadcrumb :separator-icon="'ArrowRight'">
        <el-breadcrumb-item :key="index"  v-for="(item, index) in Items">{{ item }}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { RouteLocationNormalizedLoaded, useRoute } from 'vue-router'
import { useRouter } from 'vue-router'

const { currentRoute } = useRouter()
const Items = ref<unknown[]>([])



// 监听当前的路由name变化
watch(
    () => currentRoute.value,
    (route: RouteLocationNormalizedLoaded) => {
		const list = route.matched.filter(item => item.name !== 'index')
		Items.value = list.map(item => item.meta.title)
    },
    { immediate: true }
)

</script>

<style scoped></style>
