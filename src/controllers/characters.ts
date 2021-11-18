import { NextFunction, Request, Response } from 'express';
import promiseConcats from '../utils/PromisesConcats';
import { graphqlResponseObject, characterCountData } from '../interfaces';
import dataObjectGenerator from '../services/characters';

const graphqlUrl = 'https://rickandmortyapi.com/graphql';

const characterCounterController = (req: Request, res: Response, next: NextFunction) => {
  const start: Date = new Date();
  try {
    const locations = promiseConcats('locations', graphqlUrl, 'name \n').then(
      (values: graphqlResponseObject): characterCountData => dataObjectGenerator(values, 'locations'));
    const characters = promiseConcats('characters', graphqlUrl, 'name \n').then(
      (values: graphqlResponseObject): characterCountData => dataObjectGenerator(values, 'characters'));
    const episodes = promiseConcats('episodes', graphqlUrl, 'name \n').then(
      (values: graphqlResponseObject): characterCountData => dataObjectGenerator(values, 'episodes'));
    Promise.all([locations, characters, episodes]).then((values) => {
      const end: Date = new Date();
      const diff: string = (start - end).toString();
      const seconds = diff.slice(1, 2);
      const miliseconds = diff.slice(2);

      res.json({
        exercise_name: 'Char counter',
        time: `${seconds}s ${miliseconds}ms`,
        in_time: parseInt(seconds, 16) < 3,
        results: values,
      });
    });
  } catch (error) {
    next(error);
  }
};

export default characterCounterController;
