import { NextFunction, Request, Response } from 'express';
import arraysConcat from '../utils';
import { episodesLocationResults, graphqlResponseObject } from '../interfaces';
import { episodesData } from '../utils/dataFormatters';
import { episodesService } from '../services';

const episodesLocationsController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const taskStart: number = new Date().getTime();
    episodesService
      .getAllEpisodes(['name', 'episode', 'characters{\n  origin{name}\n  }\n'])
      .then((response: Array<graphqlResponseObject>) => response.map((page
        : graphqlResponseObject): episodesLocationResults[] => episodesData(page)))
      .then((formattedData) => {
        const responseTime: number = 0.5;
        const taskEnd: number = new Date().getTime();
        const diff: string = (taskStart - responseTime - taskEnd).toString();
        const seconds = diff.slice(1, 2);
        const miliseconds = diff.slice(2, 5);
        return res.json({
          exercise_name: 'Episode locations',
          time: `${seconds}s ${miliseconds}ms`,
          in_time: parseInt(diff, 16) < 3,
          results: arraysConcat(formattedData),
        });
      });
  } catch (error) {
    next(error);
  }
};
export default episodesLocationsController;
