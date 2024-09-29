import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import httpErrors from "http-errors";
import AdminModel from "../models/Admin";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { accessToken } = req.cookies;

    if (!accessToken) {
      throw httpErrors.Forbidden("این مسیر محافظت شده است لطفا برای دسترسی به این مسیر اول وارد شوید.");
    }
    const { ACCESS_TOKEN_SECRET_KEY } = process.env;
    const checkToken: any = jwt.verify(accessToken, ACCESS_TOKEN_SECRET_KEY as string);

    const admin = await AdminModel.findOne({
      where: { id: checkToken.id },
      attributes: ["id", "username", "createdAt", "updatedAt"],
    });

    if (!admin) {
      throw httpErrors.NotFound("مدیری پیدا نشد");
    }

    (req as any).user = admin.dataValues;

    next();
  } catch (error) {
    next(error);
  }
};
