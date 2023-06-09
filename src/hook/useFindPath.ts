import useDeepClone from "./useDeepClone";

const useFindPath = (data: any, curKey: any) => {
  const params = {
    id: 'id',
    children: 'children'
  }
  /** 存放搜索到的树节点到顶部节点的路径节点 */
  let result: any[] = []
  /**
   * 路径节点追踪
   * @param {*} curKey 树节点标识的值
   * @param {array} path 存放搜索到的树节点到顶部节点的路径节点
   * @param {*} data 树
   * @returns undefined
   */
  let traverse = (curKey: any, path: any, data: any) => {
    // 树为空时，不执行函数
    if (data.length === 0) {
      return
    }

    // 遍历存放树的数组
    for (let item of data) {
      // 遍历的数组元素存入path参数数组中
      path.push(item)
      // 如果目的节点的id值等于当前遍历元素的节点id值
      if (item[params.id] === curKey) {
        // 把获取到的节点路径数组path赋值到result数组
        result = JSON.parse(JSON.stringify(path))
        return
      }

      // 当前元素的children是数组
      const children = Array.isArray(item[params.children]) ? item[params.children] : []
      // 递归遍历子数组内容
      traverse(curKey, path, children)
      // 利用回溯思想，当没有在当前叶树找到目的节点，依次删除存入到的path数组路径
      path.pop()
    }
  }
  traverse(curKey, [], data)
  // 返回找到的树节点路径
  return result
}

export default useFindPath