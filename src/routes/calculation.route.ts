import express from 'express';

import {calculationController} from '../controlles/calculation.controller.js';

const router = express.Router();

router.post('/', calculationController);

export default router;