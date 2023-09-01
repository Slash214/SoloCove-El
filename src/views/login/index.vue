<template>
    <div class="container">
        <div class="login-card">
            <div class="left">
                <img src="@/assets/images/login.png" alt="" />
            </div>
            <div class="right">
                <p class="title">欢迎登陆<span class="s-desc">Solo前端框架</span></p>
                <p class="sutitle">用户名</p>
                <input
                    type="text"
                    maxlength="20"
                    v-model="userinfo.username"
                    class="login-input"
                    placeholder="请输入用户账号"
                />
                <p class="sutitle">密码</p>
                <input
                    type="password"
                    maxlength="20"
                    v-model="userinfo.password"
                    class="login-input"
                    placeholder="请输入登陆密码"
                />
                <button type="submit" @click="onSubmit" class="login-button">确认</button>
            </div>
        </div>
        <p class="copyright">© 属于爱呵呵 个人开发者 技术支持</p>
    </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { Storage } from '@/utils/cache'

const userinfo = reactive({
    username: '',
    password: '',
})
const count = ref(1)
const enterPressed = ref(false)

const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && !enterPressed.value) {
        count.value++
        if (count.value > 5) {
            enterPressed.value = true
        }
        onSubmit()
    }
}

onMounted(() => {
    window.addEventListener('keydown', handleKeyPress)
})

onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeyPress)
})

const onSubmit = () => {
    if (!userinfo.username || !userinfo.password) {
        ElMessage.error('登陆账号密码不能为空')
        return
    }

    let params = {
        username: '爱呵呵',
        level: 'admin',
        avatar: 'https://i.gtimg.cn/club/item/face/img/2/16022_100.gif',
    }
    Storage.setItem('userinfo', params)
    Storage.setItem('token', '$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')

    location.reload()
}
</script>

<style scoped lang="scss">
.container {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    @include flex(center, center);
    height: 100vh;
    position: relative;
    background: linear-gradient(135deg, #f2e9e4, #eadfe8, #f2e9e4, #eadfe8);
    .login-card {
        background-color: #fff;
        max-height: 500px;
        max-width: 900px;
        border-radius: 60px 5px 60px 5px;
        display: flex;
        overflow: hidden;
        .left {
            padding: 20px;
            width: 50%;
            background-color: #fff;
            img {
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
        }
        .right {
            padding: 60px 40px;
            background-color: #eff7ff;
            width: 50%;
            .title {
                font-size: 28px;
                color: #333;
                padding-bottom: 40px;
            }
            .s-desc {
                font-size: 14px;
                color: #999;
                padding-left: 5px;
            }
            /* 调整副标题文本颜色 */
            .sutitle {
                font-size: 16px;
                color: #6e6775;
                padding-bottom: 10px;
            }
            .login-input {
                box-sizing: border-box;
                width: 100%;
                padding: 10px;
                margin-bottom: 40px;
                border: 1px solid #ccc;
                border-radius: 5px;
            }
            .login-input:focus {
                border-color: #007bff; /* 更改边框颜色 */
                box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); /* 添加阴影效果 */
                outline: none; /* 去掉默认的外部轮廓线 */
            }

            .login-button {
                width: 100%;
                background-color: #ff6b6b;
                color: #fff;
                padding: 12px 24px;
                border: none;
                border-radius: 20px;
                cursor: pointer;
                font-size: 18px;
            }

            .login-button:hover {
                background-color: #0056b3;
            }
        }
    }
    .copyright {
        position: absolute;
        left: 50%;
        bottom: 20px;
        transform: translate(-50%, -50%);
        color: #333;
        font-size: 14px;
    }
}
</style>
