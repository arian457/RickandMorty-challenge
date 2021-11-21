import { NextFunction, Request, Response } from 'express';
import { graphqlResponseObject, charCountResult } from '../interfaces';
import { locationsService, episodesService, charactersService } from '../services';
import { charData } from '../utils/dataFormatters';

const charCounterController = (req: Request, res: Response, next: NextFunction) => {
  const start = new Date().getTime();
  try {
    const locations = locationsService
      .getAllLocations(['name'])
      .then((response: graphqlResponseObject[]): charCountResult => charData(response, 'locations'));
    const characters = charactersService
      .getAllCharacters(['name'])
      .then((response: graphqlResponseObject[]): charCountResult => charData(response, 'characters'));
    const episodes = episodesService
      .getAllEpisodes(['name'])
      .then((response: graphqlResponseObject[]): charCountResult => charData(response, 'episodes'));
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
