import { NextFunction, Request, Response } from "express";

export default (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = error.status || error.statusCode || 500;
  const message = error.message || "Internal Server Error !!";
  res.status(statusCode).json({ message });
};
