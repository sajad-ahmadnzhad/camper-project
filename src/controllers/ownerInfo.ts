import { NextFunction, Request, Response } from "express";
import OwnerInfoModel from "../models/OwnerInfo";
import httpErrors from "http-errors";
import { deleteFile, uploadFile } from "../utils/s3";
import httpStatus from "http-status";

export const getOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ownerInfo = await OwnerInfoModel.findOne();

    res.json(ownerInfo);
  } catch (error) {
    next(error);
  }
};

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;

    const ownerInfo = await OwnerInfoModel.findOne();

    if (ownerInfo) {
      throw new httpErrors.BadRequest("اطلاعات مالک از قبل ساخته شده است.");
    }

    const { avatar, cover } = req.files as {
      avatar: Express.Multer.File[];
      cover: Express.Multer.File[];
    };

    let avatarLocation: null | string = null;
    if (avatar) {
      const path = `/avatar/${Date.now()}--${avatar[0].originalname}`;
      const uploadedAvatar = await uploadFile(avatar[0].buffer, path);
      avatarLocation = uploadedAvatar.Location;
    }

    let coverLocation: null | string = null;
    if (cover) {
      const path = `/cover/${Date.now()}--${cover[0].originalname}`;
      const uploadedCover = await uploadFile(cover[0].buffer, path);
      coverLocation = uploadedCover.Location;
    }

    const newOwnerInfo = await OwnerInfoModel.create({
      ...body,
      avatarURL: avatarLocation || undefined,
      mainCover: coverLocation || undefined,
      socialLinks: body.socialLinks || [],
    });

    res.status(httpStatus.CREATED).json(newOwnerInfo);
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
    const { body } = req;

    const ownerInfo = await OwnerInfoModel.findOne();

    if (!ownerInfo) {
      throw new httpErrors.BadRequest("اطلاعات مالک هنوز ساخته نشده است.");
    }

    const { avatar, cover } = req.files as {
      avatar: Express.Multer.File[];
      cover: Express.Multer.File[];
    };

    let avatarLocation: null | string = null;
    if (avatar) {
      const path = `/avatar/${Date.now()}--${avatar[0].originalname}`;
      const uploadedAvatar = await uploadFile(avatar[0].buffer, path);
      avatarLocation = uploadedAvatar.Location;
      await deleteFile(ownerInfo.dataValues.avatarURL);
    }

    let coverLocation: null | string = null;
    if (cover) {
      const path = `/cover/${Date.now()}--${cover[0].originalname}`;
      const uploadedCover = await uploadFile(cover[0].buffer, path);
      coverLocation = uploadedCover.Location;
      await deleteFile(ownerInfo.dataValues.mainCover);
    }

    await OwnerInfoModel.update(
      {
        ...body,
        avatarURL: avatarLocation || undefined,
        mainCover: coverLocation || undefined,
        socialLinks: body.socialLinks || undefined,
      },
      { where: { id: ownerInfo.dataValues.id } }
    );

    res.json({ message: "اطلاعات مالک با موفقیت بروزرسانی شد." });
  } catch (error) {
    next(error);
  }
};
