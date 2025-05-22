<template>
    <div class="flex h-screen bg-gray-100">
        <Sidebar :info="userInfo"></Sidebar>

        <!-- 主内容区域 -->
        <div class="flex-1 flex flex-col overflow-hidden">
            <Headers :avatarUrl="userInfo.avatar"></Headers>

            <!-- 主内容 -->
            <main class="flex-1 overflow-y-auto p-4 bg-gray-100">
                <div class="bg-white rounded-lg shadow p-6 min-h-[500px]">
                    <router-view></router-view>
                </div>
            </main>
        </div>
    </div>
</template>

<script setup>
import { Storage } from '@/utils/cache'

import Sidebar from './Sidebar.vue'
import Headers from './headers/index.vue'

const userInfo = Storage.getItem('userInfo')
</script>
