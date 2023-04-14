const useDfs = (root: any, fun: (data: any) => void) => {
  if(Array.isArray(root)) {
    for (let item of root) {
      if(fun) fun(item)
      if (item.children) {
        item.children.forEach((child: any) => {
          if(fun) fun(child)
          useDfs(child, fun)
        });
      }
    }
  }
}

export default useDfs
