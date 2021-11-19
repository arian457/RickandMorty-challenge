import { characterCountData, graphqlResponseObject, resultsObject } from '../interfaces';

const dataCharacterGenerator = (object: Array<graphqlResponseObject>, resource: string)
  : characterCountData => {
  const nameArr: string[] = [];
  const originObj: characterCountData = {
    char: resource[0],
    count: 0,
    resource,
  };
  object.forEach((o: graphqlResponseObject) => {
    o.data[resource].results.forEach((r: resultsObject) => nameArr.push(r.name));
  });

  nameArr.forEach((str: string) => {
    const regExp = new RegExp(resource[0], 'ig');
    const matches = (str.match(regExp) || []).length;
    originObj.count += matches;
  });

  return originObj;
};

export default dataCharacterGenerator;
