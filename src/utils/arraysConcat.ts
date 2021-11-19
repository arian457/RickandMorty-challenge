const arraysConcat = (array:object[]):object[] => {
  const newArray:object[] = [];
  array.forEach((a:object[]) => newArray.push(...a));
  return newArray;
};

export default arraysConcat;
