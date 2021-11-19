import { Router } from 'express';
import charCounterController from '../controllers/char';

const router = Router();

router.get('/char', charCounterController);

export default router;
