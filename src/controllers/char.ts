import { NextFunction, Request, Response } from 'express';
import promiseConcats from '../utils/RequestUtils';
import { graphqlResponseObject, charCountResult } from '../interfaces';
import dataCharGenerator from '../services/char';

require('dotenv').config();

const { API_URL } = process.env;

const charCounterController = (req: Request, res: Response, next: NextFunction) => {
  const start = new Date().getTime();
  try {
    const locations = promiseConcats('locations', API_URL, 'name \n')
      .then((response: graphqlResponseObject[]): charCountResult => dataCharGenerator(response, 'locations'));
    const characters = promiseConcats('characters', API_URL, 'name \n')
      .then((response: graphqlResponseObject[]): charCountResult => dataCharGenerator(response, 'characters'));
    const episodes = promiseConcats('episodes', API_URL, 'name \n')
      .then((response: graphqlResponseObject[]): charCountResult => dataCharGenerator(response, 'episodes'));
    Promise.all([locations, characters, episodes]).then((values) => {
      const end = new Date().getTime();
      const diff: string = (start - end).toString();
      const seconds = diff.slice(1, 2);
      const miliseconds = diff.slice(2);

      return res.json({
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

export default charCounterController;
