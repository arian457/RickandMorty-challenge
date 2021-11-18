import { characterCountData, graphqlResponseObject } from "../interfaces";

const dataCharacterGenerator = (object: Array<graphqlResponseObject>, resource: string): characterCountData => {
  const nameArr: string[] = [];
  const originObj: characterCountData = {
    char: resource[0],
    count: 0,
    resource,
  };
  object.forEach((o: graphqlResponseObject) => o.data[resource].results.forEach((r: graphqlResponseObject) => nameArr.push(r.name)));

  nameArr.forEach((str: string) => originObj.count += str.split(resource[0]).length - 1));

  return originObj;
};




export default dataCharacterGenerator;
