import { NextFunction, Request, Response } from "express";
import SocialModel from "../models/Social";
import httpErrors from "http-errors";
import pagination from "../utils/pagination";

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
    const { platform } = req.body;

    const existingSocial = await SocialModel.findOne({
      where: { platform },
    });

    if (!existingSocial) {
      throw new httpErrors.Conflict("این شبکه اجتماعی از قبل وجود دارد.");
    }

    const updatedSocial = await SocialModel.update(
      {
        where: { id: existingSocial.dataValues.id },
      },
      req.body
    );

    res.json(updatedSocial);
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
    const socials = await pagination(SocialModel, req.query);
    res.json(socials);
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
    const { id } = req.params;

    if (!Number(id)) {
      throw new httpErrors.BadRequest("آیدی ارسال شده نامعبتر می باشد.");
    }

    const social = await SocialModel.findOne({ where: { id } });

    if (!social) {
      throw new httpErrors.NotFound("شبکه اجتماعی پیدا نشد.");
    }

    res.json(social.dataValues);
  } catch (error) {
    next(error);
  }
};

export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!Number(id)) {
      throw new httpErrors.BadRequest("آیدی ارسال شده نامعبتر می باشد.");
    }

    const social = await SocialModel.findOne({ where: { id } });

    if (!social) {
      throw new httpErrors.NotFound("شبکه اجتماعی پیدا نشد.");
    }

    await SocialModel.destroy({ where: { id } });

    res.json({ message: "شبکه اجتماعی با موفقیت حذف شد."});
  } catch (error) {
    next(error);
  }
};
