import { NextFunction, Request, Response } from "express";
import SocialModel from "../models/Social";
import httpErrors from "http-errors";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { platform } = req.body;

    const existingSocial = await SocialModel.findOne({ where: { platform } });

    if (existingSocial) {
      throw new httpErrors.Conflict("این شبکه اجتماعی از قبل وجود دارد.");
    }

    const newSocial = await SocialModel.create(req.body);

    res.json(newSocial);
  } catch (error) {
    next(error);
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (error) {
    next(error);
  }
};

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (error) {
    next(error);
  }
};

export const getOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (error) {
    next(error);
  }
};
