import { Request, Response } from "express";

const calculationController = async (req: Request, res: Response) => {
  try {
    const calculationResult = '101'
    res.status(200).send(JSON.stringify(calculationResult));
  } catch (error: any) {
    res.status(400).send({ error: error.message });
  }
};

export {calculationController}