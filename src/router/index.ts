import { createRouter, createWebHashHistory, Router, RouteRecordRaw } from 'vue-router'
import NProgress from '../utils/nprogress'
import Layout from '@/layout/index.vue'
import { Storage } from '../utils/cache'

import { System, Other, Elements } from './models'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		meta: { title: '首页', icon: 'Odometer', orderNo: 1 },
		component: Layout,
		redirect: '/index',
		children: [
			{
				path: 'index',
				component: () => import('views/main/index.vue'),
				meta: { title: '首页' },
			}
		]
	},
	...Other,
	...Elements,
	...System
]

const router: Router = createRouter({
	history: createWebHashHistory(import.meta.env.BASE_URL),
	routes
})

// 白名单
const whiteList = ['/login']

// 获取token
const token = Storage.getItem('token')
console.log('token', token)


router.beforeEach((to, __from, next) => {
	NProgress.start()
	document.title = (to.meta.title as string) || import.meta.env.BASE_URL
	if (token) {
		if (to.path === '/login') {
			next('/')
			return
		}
		next()
	} else if (whiteList.includes(to.path)) next()
	else next('/login')
})

router.afterEach((to, __from) => {
	NProgress.done()
})

export default router
