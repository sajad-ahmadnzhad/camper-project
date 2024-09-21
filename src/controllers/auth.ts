import { NextFunction, Request, Response } from "express";
import AdminModel from "../models/Admin";
import bcrypt from "bcrypt";
import httpErrors from "http-errors";
import generateToken from "../utils/generateToken";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;

    const existingAdmin = await AdminModel.findOne();

    if (existingAdmin && existingAdmin.dataValues.username == username) {
      const { password: adminPassword, id } = existingAdmin.dataValues;
      const comparePassword = await bcrypt.compare(password, adminPassword);
      if (!comparePassword) {
        throw new httpErrors.Unauthorized("اطلاعات وارد شده نادرست می باشد.");
      }
      const accessToken = generateToken({ id });
      res.cookie("accessToken", accessToken, { httpOnly: true, secure: true });
      return res.json({ message: "ورود موفقیت آمیز بود." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const registeredAdmin = await AdminModel.create({
      username,
      password: hashedPassword,
    });

    const accessToken = generateToken({ id: registeredAdmin.dataValues.id });
    res.cookie("accessToken", accessToken, { httpOnly: true, secure: true });
    res.json({ message: "ثبت نام موفقیت آمیز بود." });
  } catch (error) {
    next(error);
  }
};
