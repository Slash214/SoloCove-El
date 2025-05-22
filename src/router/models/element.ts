/**
 * @author 爱呵呵
 * @description 组件路由模块
 */

import { RouteRecordRaw } from "vue-router";
import layout from '@/layout/index.vue'

const Elements: Array<RouteRecordRaw> = [
	{
		path: '/elements',
		component: layout,
		meta: { title: '组件', icon: 'Files', activeMenu: true, orderNo: 1 },
		redirect: '/elements/richtext',
		children: [
			{
				path: 'table',
				name: 'table',
				meta: { title: '表格', keepAlive: false, icon: 'Document' },
				component: () => import('views/element/table.vue')
			},
			{
				path: 'upload',
				name: 'upload',
				meta: { title: '上传', keepAlive: false, icon: 'Upload' },
				component: () => import('views/element/upload.vue')
			}
		]
	},
]

export default Elements