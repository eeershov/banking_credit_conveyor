import express from 'express';

import { offersController } from '../controlles/offers.controller.js';

const router = express.Router();

router.post('/', offersController);

export default router;