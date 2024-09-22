import { NextFunction, Request, Response } from "express";
const asyncHandler = require("express-async-handler");
import jwt from "jsonwebtoken";

import CamperModel from "./../models/Camper";
import pagination from "../utils/pagination";
import OwnerInfoModel from "../models/OwnerInfo";

export const ownerInfos = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  // const { accessToken } = req.cookies;
  // const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET_KEY as string;
  // let decodedToken: any;
  // decodedToken = jwt.verify(accessToken, accessTokenSecret);

  // console.log(decodedToken);
  // const ownerInfo = await OwnerInfoModel.findOne({ where: { id: decodedToken.id } });

  // console.log(ownerInfo);

  res.locals.layout = "layouts/panel/main.ejs";
  res.render("pages/panel/ownerInfos.ejs", { page: "owner-infos" });
});

export const campers = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const paginatedCampers = await pagination(CamperModel, req.query);

  const parsedCampers = paginatedCampers.data.map((camper: any) => ({
    id: camper.dataValues.id,
    name: camper.dataValues.name,
    mainImage: camper.dataValues.mainImage,
    images: camper.dataValues.images,
    price: camper.dataValues.price,
    description: camper.dataValues.description,
  }));

  res.locals.layout = "layouts/panel/main.ejs";

  res.render("pages/panel/campers.ejs", { page: "campers", campers: parsedCampers });
});

export const login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.locals.layout = "layouts/auth/main.ejs";

  res.render("pages/auth/login.ejs", { page: "login" });
});

export const about = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.render("pages/website/about.ejs", { page: "" });
});
export const blog = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.render("pages/website/blog.ejs", { page: "blog" });
});
export const contact = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.render("pages/website/contact.ejs", { page: "contact" });
});
export const resume = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.render("pages/website/resume.ejs", { page: "resume" });
});
export const works = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.render("pages/website/works.ejs", { page: "works" });
});
