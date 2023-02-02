import express from 'express';

import {calculationController} from '../controlles/calculationController.js';

const router = express.Router();

router.post('/', calculationController)

export default router;