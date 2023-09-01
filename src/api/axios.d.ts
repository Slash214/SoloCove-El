/**
 * @author 爱呵呵
 * @description 自定义axios的返回参数 预防ts 语法检查报警告
 */

import axios from 'axios';

declare module 'axios' {
	interface IAxios<D = null> {
		info: string
		extra: D
	}
	export interface AxiosResponse<T = any> extends IAxios<D> { }
}
