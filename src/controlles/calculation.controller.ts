import { Request, Response } from "express";

import { scoring } from "../services/calculation.service.js";

const calculationController = async (req: Request, res: Response) => {
  try {
    const scoringResult = scoring(req.body);
    res.status(200).send(scoringResult);
  } catch (error: any) {
    res.status(400).send({ "error": error.message });
  }
};

export {calculationController};