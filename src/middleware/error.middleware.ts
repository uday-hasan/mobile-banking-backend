import { NextFunction, Request, Response } from "express";

const errorMiddleware = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = { ...err };
  console.log(error);
  res.json({ error: err.message, status: err.statusCode });
};

export default errorMiddleware;
