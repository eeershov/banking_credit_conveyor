import { Request, Response } from "express";

import { prescoring } from "../services/offers.service.js"

const offersController = async (req: Request, res: Response) => {
  try {
    const calculationResult = prescoring(req.body);
    res.status(200).send(calculationResult);
  } catch (error: any) {
    res.status(400).send({ error: error.message });
  }
};

export {offersController}