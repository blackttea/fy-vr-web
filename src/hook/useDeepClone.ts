//深拷贝数据
const useDeepClone = (data: any): any => {
  //string,number,bool,null,undefined,symbol
  //object,array,date
  const obj: any = {}
  const arr = []
  if (data && typeof data === "object") {
    //针对函数的拷贝
    if (typeof data === "function") {
      const tempFunc = data.bind(null)
      tempFunc.prototype = useDeepClone(data.prototype)
      return tempFunc
    }

    switch (Object.prototype.toString.call(data)) {
      case "[object String]":
        return data.toString()
      case "[object Number]":
        return Number(data.toString())
      case "[object Boolean]":
        return new Boolean(data.toString())
      case "[object Date]":
        return new Date(data.getTime())
      case "[object Array]":
        for (let i = 0; i < data.length; i++) {
          arr[i] = useDeepClone(data[i])
        }
        return arr

      //js自带对象或用户自定义类实例
      case "[object Object]":
        for (const key in data) {
          //会遍历原型链上的属性方法，可以用hasOwnProperty来控制 （obj.hasOwnProperty(prop)
          obj[key] = useDeepClone(data[key])
        }
        return obj
    }
  } else {
    //string,number,bool,null,undefined,symbol
    return data
  }
}

export default useDeepClone
