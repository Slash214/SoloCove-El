<template>
    <!-- 顶部导航栏 -->
    <header class="bg-white shadow-sm z-10">
        <div class="flex items-center justify-between h-16 px-6">
            <!-- 左侧 -->
            <div class="flex items-center">
                <button @click="toggleSidebar" class="p-2 rounded-md text-gray-500 hover:bg-gray-100 lg:hidden">
                    <Bars3Icon class="h-6 w-6" />
                </button>
                <div class="ml-4">
                    <h1 class="text-lg font-medium">{{ currentPage }}</h1>
                    <nav class="flex" aria-label="Breadcrumb">
                        <ol class="flex items-center space-x-1 text-sm text-gray-500">
                            <li>
                                <a href="#" class="hover:text-gray-700">首页</a>
                            </li>
                            <li class="flex items-center">
                                <ChevronRightIcon class="h-4 w-4 flex-shrink-0" />
                                <a href="#" class="ml-1 hover:text-gray-700">{{ currentPage }}</a>
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>

            <!-- 右侧 -->
            <div class="flex items-center space-x-4">
                <!-- 用户菜单 -->
                <div class="relative">
                    <button @click="userMenuOpen = !userMenuOpen" class="flex items-center text-sm focus:outline-none">
                        <img :src="avatarUrl" alt="User Avatar" class="h-8 w-8 rounded-full" />
                        <span class="ml-2 hidden md:block">管理员</span>
                        <ChevronDownIcon class="ml-1 h-4 w-4 hidden md:block" />
                    </button>

                    <!-- 下拉菜单 -->
                    <div
                        v-if="userMenuOpen"
                        class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1"
                    >
                        <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">个人资料</a>
                        <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">设置</a>
                        <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">退出登录</a>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import {
    ChevronRightIcon,
    Bars3Icon,
    BellIcon,
    Cog6ToothIcon,
    ChevronDownIcon,
    MagnifyingGlassIcon,
} from '@heroicons/vue/24/outline'
// 用户菜单状态

defineProps({
    avatarUrl: {
        type: String,
        default: '',
    },
})

const userMenuOpen = ref(false)
// 当前页面
const currentPage = ref('仪表盘')

// 侧边栏状态
const collapsed = ref(false)
const toggleSidebar = () => {
    collapsed.value = !collapsed.value
}
</script>

<style scoped lang="scss"></style>
