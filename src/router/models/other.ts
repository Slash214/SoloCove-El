/**
 * @author 爱呵呵
 * @description 其他测试的页面模块
 */

import { RouteRecordRaw } from "vue-router";
import layout from '@/layout/index.vue'

const Other: Array<RouteRecordRaw> = [
	{
		path: '/test',
		component: layout,
		meta: { title: '其他', icon: 'Discount', activeMenu: true },
		redirect: '/test/index1',
		children: [
			{
				path: 'index1',
				name: 'index1',
				meta: { title: '测试', keepAlive: false, icon: 'Bell' },
				component: () => import('views/other/test.vue')
			},
			{
				path: 'aboute',
				name: 'aboute',
				meta: { title: '关于', keepAlive: false, icon: 'Link' },
				component: () => import('views/other/aboute.vue')
			}
		]
	},
]

export default Other