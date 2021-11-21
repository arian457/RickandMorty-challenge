import {
  charactersName,
  charCountResult, charObject, episodesLocationResults, episodesReqData, graphqlResponseObject,
  resultsObject,
} from '../interfaces';

export const charData = (object: Array<graphqlResponseObject>, resource: string)
: charCountResult => {
  const nameArr: string[] = [];
  const charCount: charCountResult = {
    char: resource[0],
    count: 0,
    resource,
  };
  object.forEach((o: graphqlResponseObject) => {
    o.data[resource].results.forEach((r: charactersName) => nameArr.push(r.name));
  });

  nameArr.forEach((str: string) => {
    const regExp = new RegExp(resource[0], 'ig');
    const matches = (str.match(regExp) || []).length;
    charCount.count += matches;
  });

  return charCount;
};

export const episodesData = (object: graphqlResponseObject): episodesLocationResults[] => {
  const episodesArray: episodesLocationResults[] = [];
  const { results }: resultsObject = object.data.episodes;
  results.forEach((ep: episodesReqData) => {
    const { name, episode, characters } = ep;
    const episodesObj: episodesLocationResults = {};
    const originNames: string[] = [];
    characters.forEach((char: charObject) => {
      const originName = char.origin.name;
      if (!originNames.includes(originName)) originNames.push(originName);
    });
    episodesObj.name = name;
    episodesObj.episode = episode;
    episodesObj.locations = originNames;
    episodesArray.push(episodesObj);
  });
  return episodesArray;
};
