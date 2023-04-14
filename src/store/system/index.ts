import { proxy } from 'valtio'
import {getMenuApi, getUserInfoApi} from "../../api/user";
import {Menu} from "../../type/menu";
import useDeepClone from "../../hook/useDeepClone";
import useFormatTree from "../../hook/useFormatTree";
import {MenuProps} from "antd/es/menu";
import Login from "../../view/system/login";
import Layout from "../../view/system/layout";
import React from "react";
import {RouteConfig} from "../../router";
const view = import.meta.glob("../../view/**/**.tsx")
const _menuPrefix = "../../view/"

type MenuItem = Required<MenuProps>['items'][number];

interface SystemType {
  menu: any
  collapsed: boolean
  mode: "vertical" | "inline"
  theme: "dark" | "light"
  tags: Array<any>
  activeTag: string
  userInfo: any
  menuPer: any
  showMenu: MenuItem[],
  routers: any
}

const system: SystemType = proxy({
  menu: [],
  collapsed: false,
  mode: "inline",
  theme: "light",
  tags: [1, 2, 3, 4, 5, 6],
  activeTag: "1",
  userInfo: {},
  menuPer: {},
  showMenu: [],
  routers: []
})

const getMenu = async () => {
  await getUserInfoApi().then((res: any) => {
    if (res.code === 200) {
      system.userInfo = res.data
    }
  })
  const _router: Menu[] = []
  const menuList: Menu[] = []
  const parentList: Menu[] = []
  const menu: Menu[]  = []
  const m: Menu[] = []
  const pList: number[] = []
  let tempMenu: Menu[] = []
  return getMenuApi().then((res: any) => {
    if (res.code === 200) {
      tempMenu = res.data
      const getMenu = async () => {
        m.length = 0
        const getParentList = () => {
          const um = system.userInfo.menu
          for (let i = 0; i < (system.userInfo.menu || []).length; i++) {
            const _pm = tempMenu
            const index = _pm.findIndex((pm) => {
              return pm.id === um[i]
            })
            if (index >= 0) {
              if (Number.isInteger(_pm[index].parentId) && pList.indexOf(<number>_pm[index].parentId) < 0) {
                pList.push(<number>_pm[index].parentId)
                i = 0
              }
            }
          }
        }
        getParentList()
        for (const item of tempMenu || []) {
          // 用户权限中包含该菜单，公共组件，超级管理员可以看到该菜单
          if (
            (system.userInfo.menu || []).includes(item.id) ||
            item.common ||
            system.userInfo.level === 0 ||
            pList.includes(<number>item.id)
          ) {
            m.push(item)
          }
        }
        const reFormData = (data: any): void => {
          if (!data["component"] || data["component"] === "../layout/index") data["children"] = []
          data["component"] = view[`${_menuPrefix}${data["component"]}.tsx`] || data["component"]
          data["meta"] = {}
          data["key"] = data["path"]
          data["label"] = data["title"]
          data["element"] = data["component"]
          const showList = ["hidden", "title", "svgIcon", "elIcon"]
          for (const item of showList) if (data[item] !== undefined) data["meta"][item] = data[item]
        }

        menu.length = 0
        menuList.length = 0
        parentList.length = 0
        const mCopy: Menu[] = useDeepClone(m)
        const mCopy1: Menu[] = useDeepClone(m)
        for (const n of mCopy) {
          menuList.push(n)
          const option = []
          for (const item of n.permission) option.push({label: item, value: item})
          if (n.id) system.menuPer[n.id] = option
        }
        const menuRoute = useFormatTree(m, "id", "parentId", "children", reFormData, undefined)
        const rMenuRoute = useFormatTree(m, "id", "parentId", "children", reFormData, undefined)
        for (const item of menuRoute) menu.push(item)

        const reFormData1 = (data: any): void => {
          data["value"] = data["id"]
          data["key"] = data["id"]
        }
        const menuRoute1 = useFormatTree(mCopy1, "id", "parentId", "children", reFormData1, undefined)
        for (const item of menuRoute1) parentList.push(item)
        menu.sort((a: any, b: any) => {
          return a.seq - b.seq
        })
      }
      getMenu()
      system.menu.length = 0
      system.routers[1].children = [...useDeepClone(menu)]
      debugger
      system.menu = [...menu]
    }
  })
}
export { getMenu }
export default system
