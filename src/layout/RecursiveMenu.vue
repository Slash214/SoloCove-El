<template>
    <ul class="space-y-1 px-2">
        <li v-for="item in menuItems" :key="item.id">
            <!-- 菜单项 -->
            <div
                @click="handleMenuClick(item)"
                class="menu-item flex items-center transition-colors duration-200 cursor-pointer"
                :class="{
                    'justify-center': collapsed && !hasChildren(item),
                    'bg-blue-700 text-white': isActive(item),
                }"
            >
                <!-- 图标 -->
                <component :is="getIcon(item.icon)" class="flex-shrink-0 h-6 w-6" />

                <!-- 标题 -->
                <span v-if="!collapsed" class="ml-3 flex-1">
                    {{ item.title }}
                </span>

                <!-- 有子项时显示箭头 -->
                <ChevronDownIcon
                    v-if="hasChildren(item)"
                    class="h-5 w-5 text-gray-400 transition-transform duration-200"
                    :class="{ 'transform rotate-180': isExpanded(item.id) }"
                />
            </div>

            <!-- 子菜单 -->
            <transition name="accordion">
                <ul v-if="isExpanded(item.id)" class="pl-8 space-y-1">
                    <!-- 递归调用 -->
                    <RecursiveMenu :menu-items="item.children" :collapsed="collapsed" />
                </ul>
            </transition>
        </li>
    </ul>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
    HomeIcon,
    UserGroupIcon,
    DocumentTextIcon,
    Cog6ToothIcon,
    ChartBarIcon,
    ChevronDownIcon,
} from '@heroicons/vue/24/outline'

import RecursiveMenu from './RecursiveMenu.vue'

interface MenuItem {
    id: number | string
    title: string
    path?: string
    icon: string
    children?: MenuItem[]
}

const props = defineProps<{
    menuItems: MenuItem[]
    collapsed: boolean
}>()

const router = useRouter()
const route = useRoute()

// 本组件实例下展开项集合
const expandedItems = ref(new Set<string | number>())

// 判断是否有子菜单
function hasChildren(item: MenuItem) {
    return Array.isArray(item.children) && item.children.length > 0
}

// 判断某 id 是否展开
function isExpanded(id: string | number) {
    return expandedItems.value.has(id)
}

// 点击项：有子菜单就 toggle，否则跳路由
function handleMenuClick(item: MenuItem) {
    if (hasChildren(item)) {
        if (isExpanded(item.id)) expandedItems.value.delete(item.id)
        else expandedItems.value.add(item.id)
    } else if (item.path) {
        router.push(item.path)
    }
}

// 路由激活状态
function isActive(item: MenuItem) {
    return item.path === route.path
}

// 图标映射
function getIcon(name: string) {
    const map: Record<string, any> = {
        HomeIcon,
        UserGroupIcon,
        DocumentTextIcon,
        Cog6ToothIcon,
        ChartBarIcon,
    }
    return map[name] || DocumentTextIcon
}
</script>

<style scoped lang="scss">
.menu-item {
    /* 基础样式 */
    display: flex;
    align-items: center;
    padding: 0.5rem 0.75rem; /* py-2 (0.5rem) 和 px-3 (0.75rem) */
    font-size: 0.875rem; /* text-sm */
    line-height: 1.25rem; /* 默认行高，配合 text-sm */
    font-weight: 500; /* font-medium */
    border-radius: 0.375rem; /* rounded-md */
    cursor: pointer;
    transition: background-color 200ms, color 200ms;
}
.accordion-enter-active,
.accordion-leave-active {
    transition: max-height 0.3s ease-in-out;
}
.accordion-enter-from,
.accordion-leave-to {
    max-height: 0;
    overflow: hidden;
}
.accordion-enter-to,
.accordion-leave-from {
    max-height: 1000px; /* 足够大 */
    overflow: hidden;
}
</style>
