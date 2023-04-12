import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios"
import { message } from "antd"
import {getLocal} from "./cache/useSession"
// @ts-ignore
import { get } from "lodash-es"

const [RETRY_COUNT, RETRY_DELAY] = [3, 3000]
const timeout = 10000
const errRetry = [`timeout of ${timeout}ms exceeded`]

/** 创建请求实例 */
function createService() {
  // 创建一个 Axios 实例
  const service = axios.create()
  // 请求拦截
  service.interceptors.request.use(
    (config) => config,
    // 发送失败
    (error) => Promise.reject(error)
  )
  // 响应拦截（可根据具体业务作出相应的调整）
  service.interceptors.response.use(
    (response) => {
      // apiData 是 API 返回的数据
      const apiData = response.data as any
      // 这个 Code 是和后端约定的业务 Code
      const code = apiData.code || response.status
      // 如果没有 Code, 代表这不是项目后端开发的 API
      if (code === undefined) {
        message.error("非本系统的接口")
        return Promise.reject(new Error("非本系统的接口"))
      } else {
        switch (code) {
          case 200:
            // code === 0 代表没有错误
            return apiData
          default:
            // 不是正确的 Code
            message.error(apiData.message || "Error")
            return Promise.reject(new Error("Error"))
        }
      }
    },
    (error) => {
      // Status 是 HTTP 状态码
      const status = get(error, "response.status")
      switch (status) {
        case 400:
          error.message = "请求错误"
          break
        case 401:
          // Token 过期时，直接退出登录并强制刷新页面（会重定向到登录页）
          // useUserStoreHook().logout()
          location.reload()
          break
        case 403:
          error.message = "拒绝访问"
          break
        case 404:
          error.message = "请求地址出错"
          break
        case 408:
          error.message = "请求超时"
          break
        case 500:
          error.message = "服务器内部错误"
          break
        case 501:
          error.message = "服务未实现"
          break
        case 502:
          error.message = "网关错误"
          break
        case 503:
          error.message = "服务不可用"
          break
        case 504:
          error.message = "网关超时"
          break
        case 505:
          error.message = "HTTP 版本不受支持"
          break
        default:
          break
      }
      message.error(error.message)

      const config = error.config
      // 全局的请求次数,请求的间隙
      if (config && RETRY_COUNT && errRetry.includes(error.message)) {
        // 设置用于跟踪重试计数的变量
        config.__retryCount = config.__retryCount || 0
        // 检查是否已经把重试的总数用完
        if (config.__retryCount >= RETRY_COUNT) {
          return Promise.reject({ msg: error.message })
        }
        // 增加重试计数
        config.__retryCount++
        // 创造新的Promise来处理指数后退
        const backoff = new Promise<void>((resolve) => {
          setTimeout(() => {
            resolve()
          }, RETRY_DELAY || 1)
        })
        // instance重试请求的Promise
        return backoff.then(() => {
          return service(config)
        })
      }

      return Promise.reject(error)
    }
  )
  return service
}

/** 创建请求方法 */
function createRequestFunction(service: AxiosInstance) {
  return function (config: AxiosRequestConfig) {
    const configDefault = {
      headers: {
        // 携带 Token
        Authorization: "token " + getLocal("token", false),
        "Content-Type": get(config, "headers.Content-Type", "application/json")
      },
      timeout: 600000,
      baseURL: import.meta.env.VITE_BASE_API,
      data: {}
    }
    const configOuter = Object.assign(configDefault, config)
    if (getLocal("token", false)) configOuter.headers.Authorization = "token " + getLocal("token", false)
    return service(configOuter)
  }
}

/** 用于网络请求的实例 */
export const service = createService()
/** 用于网络请求的方法 */
export const request = createRequestFunction(service)
