const dataObjectGenerator = (object: object[], resource: string) => {
  const nameArr: string[] = [];
  const originObj: any = {
    char: resource[0],
    count: 0,
    resource,
  };
    object.forEach((o: any) => o.data[resource].results.forEach((r: any) => nameArr.push(r.name)));
    nameArr.forEach((str: string) => originObj.count += str.split(resource[0]).length - 1));
  return originObj;
};

export default dataObjectGenerator;
