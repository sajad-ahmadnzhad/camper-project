import { Request, Response } from "express";
import OwnerInfoModel from "../models/OwnerInfo";

export default async (req: Request, res: Response) => {
  const ownerInfo = await OwnerInfoModel.findOne();

  res.render("pages/website/404.ejs", {
    page: "not-found",
    ownerInfo: ownerInfo?.dataValues,
    isLogin: !!(req as any).user,
  });
  // res.status(404).json({ message: "Page not found !!" });
};
