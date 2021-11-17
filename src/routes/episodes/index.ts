import { Router } from 'express';

const router = Router();

router.get('/episodes', (req, res) => res.json('epi'));

export default router;
