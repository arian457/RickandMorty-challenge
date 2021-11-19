import { charCountResult, graphqlResponseObject, resultsObject } from '../interfaces';

const dataCharGenerator = (object: Array<graphqlResponseObject>, resource: string)
  : charCountResult => {
  const nameArr: string[] = [];
  const charObject: charCountResult = {
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
    charObject.count += matches;
  });

  return charObject;
};

export default dataCharGenerator;
