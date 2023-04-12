/** 获取用户详情 */
import {request} from "../utils/request";

/** 登录 */
export function loginApi(data: any) {
  return request({
    url: "/api/user/login",
    method: "post",
    data
  })
}

/** 获取用户详情 */
export function getUserInfoApi() {
  return request({
    url: "/api/user/info",
    method: "post"
  })
}

/** 获取菜单 */
export function getMenuApi() {
  return request({
    url: "/api/menu/getMenu",
    method: "post"
  })
}
