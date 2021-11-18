import { NextFunction, Request, Response } from 'express';
import dataEpisodesGenerator from '../services/episodes';
import promiseConcats from '../utils/PromisesConcats';

const graphqlUrl = 'https://rickandmortyapi.com/graphql';

const episodesLocationsController = async (req: Request, res: Response, next: NextFunction) => {
  const start: Date = new Date();
  try {
    promiseConcats('episodes', graphqlUrl, 'name \n episode  \n characters{\n  origin{name}\n  }\n')
      .then((values) => values.map((r) => dataEpisodesGenerator(r)))
      .then((data) => {
        const end: Date = new Date();
        const diff: string = (start - end).toString();
        const seconds = diff.slice(1, 2);
        const miliseconds = diff.slice(2);
        res.json({
          exercise_name: 'Episode locations',
          time: `${seconds}s ${miliseconds}ms`,
          in_time: parseInt(seconds, 16) < 3,
          results: data,
        });
      });
  } catch (error) {
    next(error);
  }
};
export default episodesLocationsController;
