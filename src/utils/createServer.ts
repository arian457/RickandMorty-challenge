import express, {
  Application, NextFunction, Request, Response,
} from 'express';

import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import serverRoutes from '../routes';

const createServer = (): Application => {
  const server = express();
  server.use(express.urlencoded({ extended: true, limit: '50mb' }));
  server.use(express.json({ limit: '50mb' }));
  server.use(cors());
  server.use(cookieParser());
  server.use(morgan('dev'));
  server.use((req: Request, res: Response, next: NextFunction): void => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');

    next();
  });

  server.use('/api/v1', serverRoutes);

  return server;
};

export default createServer;
