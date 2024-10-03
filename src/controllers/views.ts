import { NextFunction, Request, Response } from "express";
const asyncHandler = require("express-async-handler");
import { Op } from "sequelize";
import OwnerInfoModel from "../models/OwnerInfo";

import CamperModel from "./../models/Camper";
import pagination from "../utils/pagination";

//* panel
export const ownerInfos = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.locals.layout = "layouts/panel/main.ejs";
  res.render("pages/panel/ownerInfos.ejs", { page: "owner-infos" });
});

export const campersPanel = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { camper } = req.query;

  const paginatedCampers = camper
    ? await pagination(CamperModel, req.query, {
        name: { [Op.like]: `%${camper}%` },
      })
    : await pagination(CamperModel, req.query);

  const paginationItem = {
    currentPage: paginatedCampers.currentPage,
    totalPages: paginatedCampers.totalPages,
    totalItems: paginatedCampers.totalItems,
  };

  const parsedCampers = paginatedCampers.data.map((camper: any) => ({
    id: camper.dataValues.id,
    name: camper.dataValues.name,
    mainImage: camper.dataValues.mainImage,
    images: camper.dataValues.images,
    price: camper.dataValues.price,
    description: camper.dataValues.description,
  }));

  res.locals.layout = "layouts/panel/main.ejs";

  res.render("pages/panel/campers.ejs", {
    page: "campers",
    campers: parsedCampers,
    pagination: paginationItem,
    query: req.query || "",
  });
});

//* website
export const about = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const ownerInfo = await OwnerInfoModel.findOne();
  const paginatedCampers = await pagination(CamperModel, { limit: 4 });

  const parsedCampers = paginatedCampers.data.map((camper: any) => ({
    id: camper.dataValues.id,
    name: camper.dataValues.name,
    mainImage: camper.dataValues.mainImage,
    images: camper.dataValues.images,
    price: camper.dataValues.price,
    description: camper.dataValues.description,
  }));

  res.render("pages/website/about.ejs", {
    page: "",
    ownerInfo: ownerInfo?.dataValues,
    campers: parsedCampers,
    isLogin: !!(req as any).user,
  });
});
export const campers = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const ownerInfo = await OwnerInfoModel.findOne();
  const paginatedCampers = await pagination(CamperModel, { ...req.query, limit: 10 });

  const paginationItem = {
    currentPage: paginatedCampers.currentPage,
    totalPages: paginatedCampers.totalPages,
    totalItems: paginatedCampers.totalItems,
    isLogin: !!(req as any).user,
  };

  const parsedCampers = paginatedCampers.data.map((camper: any) => ({
    id: camper.dataValues.id,
    name: camper.dataValues.name,
    mainImage: camper.dataValues.mainImage,
    images: camper.dataValues.images,
    price: camper.dataValues.price,
    description: camper.dataValues.description,
  }));

  res.render("pages/website/campers.ejs", {
    page: "campers",
    ownerInfo: ownerInfo?.dataValues,
    campers: parsedCampers,
    pagination: paginationItem,
    query: req.query || "",
    isLogin: !!(req as any).user,
  });
});
export const camperInfo = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.query;
  const ownerInfo = await OwnerInfoModel.findOne();
  const camper = await CamperModel.findOne({ where: { id } });

  res.render("pages/website/camper-info.ejs", {
    page: "camper-info",
    ownerInfo: ownerInfo?.dataValues,
    camper,
    isLogin: !!(req as any).user,
  });
});

//* auth
export const login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.locals.layout = "layouts/auth/main.ejs";

  res.render("pages/auth/login.ejs", { page: "login" });
});
