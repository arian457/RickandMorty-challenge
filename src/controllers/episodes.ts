import { NextFunction, Request, Response } from 'express';
import arraysConcat from '../utils/arraysConcat';
import dataEpisodesGenerator from '../services/episodes';
import promiseConcats from '../utils/RequestUtils';
import { episodesLocationData, graphqlResponseObject } from '../interfaces';

require('dotenv').config();

const { API_URL } = process.env;

const episodesLocationsController = async (req: Request, res: Response, next: NextFunction) => {
  const start: number = new Date().getTime();
  try {
    promiseConcats('episodes', API_URL, 'name \n episode  \n characters{\n  origin{name}\n  }\n')
      .then((response: Array<graphqlResponseObject>) => response.map((page
        : graphqlResponseObject): episodesLocationData[] => dataEpisodesGenerator(page)))
      .then((formattedData) => {
        const end: number = new Date().getTime();
        const diff: string = (start - end).toString();
        const seconds = diff.slice(1, 2);
        const miliseconds = diff.slice(2);
        return res.json({
          exercise_name: 'Episode locations',
          time: `${seconds}s ${miliseconds}ms`,
          in_time: parseInt(seconds, 16) < 3,
          results: arraysConcat(formattedData),
        });
      });
  } catch (error) {
    next(error);
  }
};
export default episodesLocationsController;
