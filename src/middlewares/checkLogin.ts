import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import AdminModel from "../models/Admin";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { accessToken } = req.cookies;

    if (!accessToken) return next();

    const { ACCESS_TOKEN_SECRET_KEY } = process.env;
    const checkToken: any = jwt.verify(accessToken, ACCESS_TOKEN_SECRET_KEY as string);

    const admin = await AdminModel.findOne({
      where: { id: checkToken.id },
      attributes: ["id", "username", "createdAt", "updatedAt"],
    });

    if (!admin) return next();

    //@ts-ignore
    req.user = admin.dataValues;

    next();
  } catch (error) {
    next(error);
  }
};
