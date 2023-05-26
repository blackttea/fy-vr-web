const  useTreeToArray = (tree: any, result: any = []) => {
  for (const item of tree) {
    if (item.element) result.push(item);
    if (item.children) {
      useTreeToArray(item.children, result);
      Reflect.deleteProperty(item, "children");
    }
  }
  return result.sort((a: any, b: any) => a.id - b.id);
  //   return result;
}

export default useTreeToArray