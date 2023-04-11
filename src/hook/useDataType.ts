/**
 *
 * @param data 数据对象, 必填
 * @param type 数据对比类型(可选), 不填返回数据类型
 * return boolean | string
 */
const useDataType = (data: any, type = ""): string | boolean => {
  const t: string[] = Object.prototype.toString.call(data).split(" ")
  const t1: string[] = t[1].split("]")
  const t2: string = t1[0].toLowerCase()
  if (type) {
    return t2 === type
  } else {
    return t1[1].toLowerCase()
  }
}

export default useDataType
