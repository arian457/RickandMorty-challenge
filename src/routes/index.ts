import { Router } from 'express';
import charRoutes from './char';
import episodesRoutes from './episodes';

const router = Router();

router.use([charRoutes, episodesRoutes]);

export default router;
