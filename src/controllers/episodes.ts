import { NextFunction, Request, Response } from 'express';
import arraysConcat from '../utils';
import { episodesLocationResults, graphqlResponseObject } from '../interfaces';
import { episodesData } from '../utils/dataFormatters';
import { episodesService } from '../services';

const episodesLocationsController = async (req: Request, res: Response, next: NextFunction) => {
  const start: number = new Date().getTime();
  try {
    episodesService
      .getAllEpisodes(['name', 'episode', 'characters{\n  origin{name}\n  }\n'])
      .then((response: Array<graphqlResponseObject>) => response.map((page
        : graphqlResponseObject): episodesLocationResults[] => episodesData(page)))
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
