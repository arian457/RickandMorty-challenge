import { Router } from 'express';
import episodesLocationsController from '../controllers/episodes';

const router = Router();

router.get('/episodes', episodesLocationsController);

export default router;
