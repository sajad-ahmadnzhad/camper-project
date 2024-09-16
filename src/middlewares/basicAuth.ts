import { NextFunction, Request, Response } from "express";
import expressBasicAuth from "express-basic-auth";

export default (req: Request, res: Response, next: NextFunction) => {
  const { BASIC_AUTH_USERNAME, BASIC_AUTH_PASSWORD } = process.env;

  return expressBasicAuth({
    challenge: true,
    users: { [BASIC_AUTH_USERNAME as string]: `${BASIC_AUTH_PASSWORD}` },
  })(req, res, next);
};
