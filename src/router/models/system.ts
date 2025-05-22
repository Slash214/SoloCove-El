/**
 * @author 爱呵呵
 * @description 系统目录路由 404，403，登陆...
 */

import { RouteRecordRaw } from "vue-router";

const System: Array<RouteRecordRaw> = [
	{
		path: '/login',
		name: 'login',
		meta: { title: '后台登陆', hidden: true },
		component: () => import('views/login/index.vue')
	},
	{
		path: '/404',
		name: '404',
		meta: { title: '404', icon: 'WarningFilled', hidden: true },
		component: () => import("views/system/404.vue")
	},
	{
		path: '/:pathMatch(.*)',
		redirect: '/404',
		meta: { hidden: true }
	}
]

export default System