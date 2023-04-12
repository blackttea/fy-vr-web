/**
 *
 * @param data 数组对象
 * @param id 数据唯一键
 * @param parentId 父节点id名字
 * @param childName 子节点名字
 * @param reForm 限制条件
 */
import useDataType from "./useDataType";


const useFormatTree = (data: any, id: string, parentId: string, childName: string, reForm: any, filter: any) => {
  const result: any = []
  const map: any = {}
  if (!Array.isArray(data)) {
    return []
  }
  data.forEach((item: any) => {
    map[item[id]] = item
  })
  data.forEach((item: any) => {
    const parent = map[item[parentId]]
    if (useDataType(reForm, "function")) reForm(item)
    if (parent) {
      if (!parent[childName]) parent[childName] = []
      parent[childName].push(item)
    } else {
      if (useDataType(filter, "function")) {
        if (filter(item)) result.push(item)
      } else result.push(item)
    }
  })
  return result
}

export default useFormatTree
