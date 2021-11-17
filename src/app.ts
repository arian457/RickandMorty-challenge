import express, { NextFunction, Response } from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import serverRoutes from './routes';

require('dotenv').config();

const server = express();

server.use(cors());
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res: Response, next: NextFunction): void => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use('/api/v1', serverRoutes);

server.use((err: any, res: Response): void => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).json(message);
});

export default server;
