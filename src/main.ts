import { createApp } from 'vue'
import ElementPlus from 'element-plus'

import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import './styles/tailwindcss.css'

import router from './router'
import App from './App.vue'
import { createPinia } from 'pinia'

const pinia = createPinia()
const app = createApp(App)


app.use(router)
	.use(pinia)
	.use(ElementPlus, { locale: zhCn })
	.mount('#app')
