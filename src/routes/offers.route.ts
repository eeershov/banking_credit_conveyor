import express from 'express';

const router = express.Router();

router.post('/', (req,res)=>res.send('123'))

export default router;