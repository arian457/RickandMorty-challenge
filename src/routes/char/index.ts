import { Router } from 'express';
import characterCounterController from './resources/controllers/index';

const router = Router();

router.get('/char', characterCounterController);

export default router;
