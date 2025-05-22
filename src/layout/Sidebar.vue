<template>
    <!-- 侧边栏 -->
    <div
        class="sidebar bg-gray-900 text-white transition-all duration-300 ease-in-out flex flex-col"
        :class="{ 'w-64': !collapsed, 'w-20': collapsed }"
    >
        <!-- 侧边栏头部 -->
        <div class="flex items-center justify-between h-16 px-4 border-b border-gray-800">
            <div class="flex items-center">
                <!-- Logo -->
                <img src="@/assets/svg/404.svg" alt="Logo" class="h-10 w-10" />
                <span v-if="!collapsed" class="ml-3 text-xl font-semibold transition-opacity duration-300"
                    >管理系统</span
                >
            </div>
            <button @click="toggleSidebar" class="p-1 rounded-md hover:bg-gray-800 focus:outline-none">
                <component :is="collapsed ? ChevronRightIcon : ChevronLeftIcon" class="h-6 w-6" />
            </button>
        </div>

        <!-- 侧边栏菜单 -->
        <div class="flex-1 overflow-y-auto py-4">
            <RecursiveMenu :menu-items="menuItems" :collapsed="collapsed" />
        </div>

        <!-- 侧边栏底部 -->
        <div class="p-4 border-t border-gray-800">
            <div class="flex items-center" :class="{ 'justify-center': collapsed }">
                <!-- 正确引入本地头像资源 -->
                <img :src="info.avatar" alt="User Avatar" class="h-10 w-10 rounded-full border-2 border-gray-700" />
                <div v-if="!collapsed" class="ml-3 transition-opacity duration-300">
                    <p class="text-sm font-medium">{{ info.name }}</p>
                    <p class="text-xs text-gray-400">{{ info.email }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'
import RecursiveMenu from './RecursiveMenu.vue'
import { useRouter } from 'vue-router'
import { CustomMenu, NewMenuItem } from '@/types/menu'
const router = useRouter()

defineProps({
    info: {
        type: Object,
        default: () => {},
    },
})

// 菜单数据
// const menuItems = ref<NewMenuItem[]>([])
// 侧边栏状态
const collapsed = ref(false)
const toggleSidebar = () => {
    collapsed.value = !collapsed.value
}

let idCounter = 0
function nextId() {
    return `menu-${++idCounter}`
}

/**
 * 将 router.options.routes 转成菜单数组
 * 1) 自动过滤掉只有一个子项的顶层「哑节点」
 * 2) 为每个菜单生成唯一 id
 * 3) 递归处理多级菜单
 */
function genMenuList(routes: CustomMenu[], basePath = ''): NewMenuItem[] {
    return routes
        .filter(r => !r.meta?.hidden)
        .sort((a, b) => (b.meta?.orderNo || 0) - (a.meta?.orderNo || 0))
        .map(r => {
            // 拼出当前完整路径
            const fullPath = basePath ? `${basePath.replace(/\/$/, '')}/${r.path.replace(/^\//, '')}` : r.path

            // 先递归生成子菜单
            const childItems = r.children ? genMenuList(r.children, fullPath) : []

            // 只有一个子菜单时，把它当作自己来用，children 清空
            if (childItems.length === 1) {
                const only = childItems[0]
                return {
                    id: nextId(),
                    title: (r.meta?.title as string) || only.title,
                    icon: (r.meta?.icon as string) || only.icon,
                    path: only.path, // 扁平化到子路由
                    children: [],
                }
            }

            // 多于一个子菜单或无子菜单时，正常生成
            return {
                id: nextId(),
                title: r.meta?.title as string,
                icon: r.meta?.icon as string,
                path: fullPath,
                children: childItems,
            }
        })
}

const menuItems = computed(() => {
    const list = router.options.routes.filter(e => !e.meta?.hidden) as any
    return genMenuList(list)
})
</script>
