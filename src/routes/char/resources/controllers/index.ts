import { NextFunction, Request, Response } from 'express';
import dataObjectGenerator from '../services/dataObjectGenerator';

import promiseConcats from '../services/promisesConcats';

// location : char l
// location : char e
// location : char c
const graphqlUrl = 'https://rickandmortyapi.com/graphql';

const characterCounterController = (req: Request, res: Response, next: NextFunction) => {
  try {
    const locations = promiseConcats('locations', graphqlUrl).then((values) => dataObjectGenerator(values, 'locations'));
    const characters = promiseConcats('characters', graphqlUrl).then((values) => dataObjectGenerator(values, 'characters'));
    const episodes = promiseConcats('episodes', graphqlUrl).then((values) => dataObjectGenerator(values, 'episodes'));
    Promise.all([locations, characters, episodes]).then((values) => res.json({
      exercise_name: 'Char counter',
      in_time: true,
      results: values,
    }));
  } catch (error) {
    next(error);
  }
};

export default characterCounterController;
