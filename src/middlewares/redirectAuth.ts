import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import httpErrors from "http-errors";
import AdminModel from "../models/Admin";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { accessToken } = req.cookies;
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET_KEY as string;

    if (!accessTokenSecret) {
      throw new httpErrors.InternalServerError("کلید توکن تنظیم نشده است.");
    }

    if (!accessToken) {
      if (req.path !== "/login") {
        req.flash("errorMessage", "ابتدا باید وارد شوید.");
        return res.redirect("/login");
      } else {
        return next();
      }
    }

    let decodedToken: any;
    try {
      decodedToken = jwt.verify(accessToken, accessTokenSecret);
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        req.flash("errorMessage", "توکن منقضی شده است.");
        return res.redirect("/login");
      }
      if (error instanceof jwt.JsonWebTokenError) {
        req.flash("errorMessage", "توکن نامعتبر است.");
        return res.redirect("/login");
      }
      return next(new httpErrors.Unauthorized("خطای احراز هویت."));
    }

    const admin = await AdminModel.findOne({ where: { id: decodedToken.id } });
    if (!admin) {
      req.flash("errorMessage", "مدیری پیدا نشد.");
      return res.redirect("/login");
    }

    if (req.path === "/login") {
      return res.redirect("/panel");
    }

    next();
  } catch (error) {
    next(error);
  }
};
