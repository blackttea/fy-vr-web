/** 获取用户详情 */
import {request} from "../utils/request";

export function loginApi(data: any) {
  return request({
    url: "/api/user/login",
    method: "post",
    data
  })
}
