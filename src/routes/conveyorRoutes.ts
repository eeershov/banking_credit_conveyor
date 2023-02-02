import express from 'express';
const router = express.Router();

import offersRouter from './offers.route.js';
import calculationRouter from './calculation.route.js';


router.use("/offers", offersRouter);
router.use("/calculation", calculationRouter);

export default router;