<template>
    <div
        class="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50"
    >
        <div
            class="login-container relative overflow-hidden bg-white rounded-xl shadow-2xl w-full max-w-md p-8 md:p-10"
        >
            <!-- 装饰元素 -->
            <div
                class="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-amber-300 to-orange-400 rounded-full opacity-20 blur-xl"
            ></div>
            <div
                class="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-tr from-yellow-300 to-amber-400 rounded-full opacity-20 blur-xl"
            ></div>

            <!-- 登录表单 -->
            <div class="relative z-10 p-5">
                <div class="text-center mb-8">
                    <h1 class="text-3xl font-bold text-gray-800 mb-2">欢迎回来</h1>
                    <p class="text-gray-500">请登录您的账户继续</p>
                </div>

                <form @submit.prevent="handleLogin" class="space-y-6">
                    <!-- 用户名输入 -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">用户名</label>
                        <div class="relative">
                            <el-input
                                v-model="loginForm.username"
                                placeholder="请输入用户名"
                                class="login-input"
                                :class="{ '!border-red-500 !ring-red-500': errors.username }"
                            >
                                <template #prefix>
                                    <UserIcon class="w-5 h-5 text-gray-400" />
                                </template>
                            </el-input>
                        </div>
                        <p v-if="errors.username" class="mt-1 text-sm text-red-500">{{ errors.username }}</p>
                    </div>

                    <!-- 密码输入 -->
                    <div>
                        <div class="flex items-center justify-between mb-1">
                            <label class="block text-sm font-medium text-gray-700">密码</label>
                            <a href="#" class="text-sm text-amber-600 hover:text-amber-500 transition-colors"
                                >忘记密码?</a
                            >
                        </div>
                        <div class="relative">
                            <el-input
                                v-model="loginForm.password"
                                :type="showPassword ? 'text' : 'password'"
                                placeholder="请输入密码"
                                class="login-input"
                                :class="{ '!border-red-500 !ring-red-500': errors.password }"
                            >
                                <template #prefix>
                                    <LockClosedIcon class="h-5 w-5 text-gray-400" />
                                </template>
                            </el-input>
                            <div
                                class="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                @click="showPassword = !showPassword"
                            >
                                <EyeIcon v-if="showPassword" class="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                <EyeSlashIcon v-else class="h-5 w-5 text-gray-400 hover:text-gray-600" />
                            </div>
                        </div>
                        <p v-if="errors.password" class="mt-1 text-sm text-red-500">{{ errors.password }}</p>
                    </div>

                    <!-- 记住我 -->
                    <div class="flex items-center">
                        <el-checkbox v-model="loginForm.remember" class="text-sm text-gray-700"> 记住我 </el-checkbox>
                    </div>

                    <!-- 登录按钮 -->
                    <div>
                        <button
                            type="submit"
                            class="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all duration-300"
                            :class="{ 'opacity-70 cursor-not-allowed': loading }"
                            :disabled="loading"
                        >
                            <ArrowPathIcon v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
                            {{ loading ? '登录中...' : '登 录' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { UserIcon, LockClosedIcon, EyeIcon, EyeSlashIcon, ArrowPathIcon } from '@heroicons/vue/24/outline'
import { Storage } from '@/utils/cache'
import { UserInfo } from '@/mock/user'

// 登录表单数据
const loginForm = reactive({
    username: '',
    password: '',
    remember: false,
})

// 表单错误信息
const errors = reactive({
    username: '',
    password: '',
})

// 控制密码显示/隐藏
const showPassword = ref(false)

// 加载状态
const loading = ref(false)

// 登录处理
const handleLogin = () => {
    // 重置错误信息
    errors.username = ''
    errors.password = ''

    // 表单验证
    let isValid = true

    if (!loginForm.username) {
        errors.username = '请输入用户名'
        isValid = false
    }

    if (!loginForm.password) {
        errors.password = '请输入密码'
        isValid = false
    } else if (loginForm.password.length < 6) {
        errors.password = '密码长度不能少于6位'
        isValid = false
    }

    if (isValid) {
        loading.value = true

        // 模拟登录请求
        setTimeout(() => {
            loading.value = false
            // 这里可以添加实际的登录逻辑
            console.log('登录信息:', loginForm)

            Storage.setItem('userInfo', UserInfo)
            Storage.setItem('token', '$$$$$$$$$$$$$')
            location.reload()
            // 登录成功后的操作
            // router.push('/dashboard')
        }, 1500)
    }
}
</script>

<style scoped>
.login-input :deep(.el-input__wrapper) {
    box-shadow: none !important;
    padding: 0.5rem 0.75rem; /* py-2 px-3 */
    border: 1px solid #d1d5db; /* gray-300 */
    border-radius: 0.375rem; /* rounded-md */
    transition: border-color 0.3s, box-shadow 0.3s;
    /* 焦点态 */
    &:focus-within {
        outline: none;
        box-shadow: 0 0 0 2px rgba(245, 158, 11, 0.5); /* amber-500 */
        border-color: #f59e0b;
    }
}

.social-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 0.5rem 1rem; /* py-2 px-4 */
    border: 1px solid #e5e7eb; /* gray-200 */
    border-radius: 0.375rem; /* rounded-md */
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05); /* shadow-sm */
    font-size: 0.875rem; /* text-sm */
    font-weight: 500; /* font-medium */
    color: #4b5563; /* gray-700 */
    transition: background-color 0.2s;

    &:hover {
        background-color: #f3f4f6; /* gray-100 */
    }
}

/* 添加动画效果 */
.login-container {
    animation: fadeIn 0.6s ease-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
