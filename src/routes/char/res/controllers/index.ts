import { Request, Response } from 'express';

import promiseConcats from '../services/promisesConcats';

// location : char l
// location : char e
// location : char c
const graphqlUrl = 'https://rickandmortyapi.com/graphql';

const characterCounterController = (req: Request, res: Response) => {
  const locations = promiseConcats('locations', graphqlUrl);
  const characters = promiseConcats('characters', graphqlUrl);
  const episodes = promiseConcats('episodes', graphqlUrl);
  Promise.all([locations, characters, episodes]).then((values) => res.json(values));
};

export default characterCounterController;
