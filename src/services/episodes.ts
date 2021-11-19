import {
  graphqlResponseObject, episodesLocationData, resultsObject, characterObject,
} from '../interfaces';

const dataEpisodesGenerator = (object: graphqlResponseObject):episodesLocationData[] => {
  const episodesArray: episodesLocationData[] = [];
  const { results }:any = object.data.episodes;
  results.forEach((ep: resultsObject) => {
    const { name, episode, characters } = ep;
    const episodesObj: episodesLocationData = {};
    const originNames: string[] = [];
    characters.forEach((char: characterObject) => {
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
export default dataEpisodesGenerator;
