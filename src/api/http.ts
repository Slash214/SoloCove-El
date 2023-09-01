import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import { ElMessage } from 'element-plus'
import { Storage } from '@/utils/cache'

let baseURL = import.meta.env.VITE_BASE_URL

const service: AxiosInstance = axios.create({
	baseURL,
	timeout: 1000 * 60 * 30,
	headers: {
		'Content-Type': 'application/json',
	}
})

const token: string = Storage.getItem('token')
service.interceptors.request.use(
	(config: any) => {
		// TODO 在这里可以加上想要在请求发送前处理的逻辑
		// TODO 比如 loading 等 
		config.headers = {}
		if (token) config.headers['magic-token'] = token
		return config
	},
	(error: AxiosError) => {
		return Promise.reject(error)
	}
)

service.interceptors.response.use(
	(response: AxiosResponse) => {
		if (response.status === 200) {
			// 请求成功
			let { data, status, info } = response.data
			if (status === 503) {
				ElMessage.info(info)
				Storage.removeItem('token')
				setTimeout(() => {
					location.reload()
				}, 500);
				return
			}
			return response.data
		} 
		ElMessage.info(JSON.stringify(response.status))
	},
	(error: AxiosError) => {
		const { response } = error
		if (response) {
			ElMessage.error('服务器请求错误！工程师正在维修')
			return Promise.reject(response.data)
		}
		ElMessage.warning('网络连接异常,请稍后再试!')
		return Promise.reject(error)
	}
)

export default service