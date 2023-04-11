import { proxy } from 'valtio'

interface SystemType {
  menu: Array<any>
  collapsed: boolean
  mode: "vertical" | "inline"
  theme: "dark" | "light"
}

const system: SystemType = proxy({
  menu: [],
  collapsed: false,
  mode: "vertical",
  theme: "light",
})

export default system
