import { Router } from 'express';
import characterCounterController from '../controllers/characters';

const router = Router();

router.get('/char', characterCounterController);

export default router;
