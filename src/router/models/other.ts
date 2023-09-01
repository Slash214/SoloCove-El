/**
 * @author 爱呵呵
 * @description 其他页面模块
 */

import { RouteRecordRaw } from "vue-router";
import layout from '@/layout/index.vue'

const Other: Array<RouteRecordRaw> = [
	{
		path: '/test',
		component: layout,
		meta: { title: '其他', icon: 'Menu', activeMenu: true },
		redirect: '/test/index1',
		children: [
			{
				path: 'index1',
				name: 'index1',
				meta: { title: '测试', keepAlive: false },
				component: () => import('views/other/test.vue')
			},
			{
				path: 'index2',
				name: 'index2',
				meta: { title: '测试', keepAlive: false },
				component: () => import('views/other/test.vue')
			}
		]
	},
]

export default Other