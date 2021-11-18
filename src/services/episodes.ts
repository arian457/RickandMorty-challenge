import { graphqlResponseObject, episodesLocationData } from '../interfaces';

const dataEpisodesGenerator = (object: Array<graphqlResponseObject>) => {
  const resultsArray: object[] = [];
  const { results } = object.data.episodes;
  results.forEach((ep) => {
    const { name, episode, characters } = ep;
    const originObj: episodesLocationData = {};
    const locationsNames: string[] = [];
    characters.forEach((char) => {
      const { name } = char.origin;
      if (!locationsNames.includes(name)) locationsNames.push(name);
    });
    originObj.name = name;
    originObj.episode = episode;
    originObj.locations = locationsNames;
    resultsArray.push(originObj);
  });
  return resultsArray;
};
export default dataEpisodesGenerator;
