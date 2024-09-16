import { NextFunction, Request, Response } from "express";
import CamperModel from "./../models/Camper";
import httpStatus from "http-status";
import httpErrors from "http-errors";
import pagination from "../utils/pagination";
import { Op } from "sequelize";
import compressImage from "../utils/compressImage";
import { deleteFile, uploadFile } from "../utils/s3";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;
    const { camperMainImage, camperImages } =
      (req.files as {
        camperMainImage: Express.Multer.File[];
        camperImages: Express.Multer.File[];
      }) || {};

    if (!camperMainImage || !camperMainImage) {
      throw new httpErrors.BadRequest("ارسال عکس کمپر اجباری می باشد.");
    }

    //* Compress images
    const compressImagesBuffer = await Promise.all(
      camperImages.map(compressImage)
    );

    //* Compress main image
    const compressMainImageBuffer = await compressImage(camperMainImage[0]);

    //* Upload images to s3
    const imagesPromises = compressImagesBuffer.map((buffer, i) => {
      const path = `/campers/${Date.now()}--${camperImages[i].originalname}`;
      return uploadFile(buffer, path);
    });

    //* Get images location
    const imagesLocations = (await Promise.all(imagesPromises)).map(
      (image) => image?.Location
    );

    //* Upload main image to s3
    const path = `/campers/${Date.now()}--${camperMainImage[0].originalname}`;
    const mainImage = await uploadFile(compressMainImageBuffer, path);

    const newCamper = await CamperModel.create({
      ...body,
      images: imagesLocations,
      price: Number.parseInt(body.price),
      mainImage: mainImage.Location,
    });

    res.status(httpStatus.CREATED).json(newCamper);
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
    const paginatedCampers = await pagination(CamperModel, req.query);

    res.json(paginatedCampers);
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
    if (!Number(req.params.id)) {
      throw new httpErrors.BadRequest("آیدی کمپر اجباری و باید عدد باشد.");
    }

    const camper = await CamperModel.findOne({
      where: { id: req.params.id },
    });

    if (!camper) {
      throw new httpErrors.NotFound("کمپری با این آیدی پیدا نشد.");
    }

    await CamperModel.destroy({
      where: { id: req.params.id },
    });

    const camperImages = [
      ...camper.dataValues.images,
      camper.dataValues.mainImage,
    ];

    camperImages.forEach(deleteFile);

    res.json({ message: "کمپر مورد نظر با موفقیت حذف شد." });
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
    const { id } = req.params;
    const { camperMainImage, camperImages } =
      (req.files as {
        camperMainImage: Express.Multer.File[];
        camperImages: Express.Multer.File[];
      }) || {};

    if (!Number.parseInt(id)) {
      throw new httpErrors.BadRequest("آیدی کمپر اجباری و باید عدد باشد.");
    }

    const camper = await CamperModel.findOne({
      where: { id },
    });

    if (!camper) {
      throw new httpErrors.NotFound("کمپری با این آیدی پیدا نشد.");
    }

    const countImages = camper.dataValues.images.length + camperImages?.length;
    if (
      (camperImages && camper.dataValues.images.length >= 3) ||
      countImages > 3
    ) {
      throw new httpErrors.BadRequest(
        "تعداد عکس های آپلود شده به حد مجاز رسیده است."
      );
    }

    let mainImageLocation: null | string = null;

    if (camperMainImage) {
      await deleteFile(camper.dataValues.mainImage);

      const compressMainImageBuffer = await compressImage(camperMainImage[0]);
      const path = `/campers/${Date.now()}--${camperMainImage[0].originalname}`;
      const mainImage = await uploadFile(compressMainImageBuffer, path);
      mainImageLocation = mainImage.Location;
    }

    const imagesLocation: string[] = [];
    if (camperImages) {
      const compressImagesBuffer = await Promise.all(
        camperImages.map(compressImage)
      );

      //* Upload images to s3
      const imagesPromises = compressImagesBuffer.map((buffer, i) => {
        const path = `/campers/${Date.now()}--${camperImages[i].originalname}`;
        return uploadFile(buffer, path);
      });

      //* Push images in array
      (await Promise.all(imagesPromises)).forEach((image) => {
        imagesLocation.push(image.Location);
      });
    }

    await CamperModel.update(
      {
        ...body,
        mainImage: mainImageLocation || undefined,
        images: [...camper.dataValues.images, ...imagesLocation],
      },
      { where: { id } }
    );

    res.json({ message: "کمپر مورد نظر با موفقیت ویرایش شد." });
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
    if (!Number(req.params.id)) {
      throw new httpErrors.BadRequest("آیدی کمپر اجباری و باید عدد باشد.");
    }

    const camper = await CamperModel.findOne({
      where: { id: req.params.id },
    });

    if (!camper) {
      throw new httpErrors.NotFound("کمپری با این آیدی پیدا نشد.");
    }

    res.json(camper.dataValues);
  } catch (error) {
    next(error);
  }
};

export const search = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { camper } = req.query;

    const paginatedCampers = await pagination(CamperModel, req.query, {
      name: { [Op.like]: `%${camper}%` },
    });

    res.json(paginatedCampers);
  } catch (error) {
    next(error);
  }
};

export const newest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const count = Number.parseInt(req.query.count as string) || 10;

    const campers = await CamperModel.findAll({
      limit: count,
      order: [["createdAt", "DESC"]],
    });

    res.json(campers);
  } catch (error) {
    next(error);
  }
};

export const removeImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { image } = req.body;

    if (!image?.trim()) {
      throw new httpErrors.BadRequest("ارسال لینک عکس اجباری می باشد.");
    }

    if (!Number.parseInt(id)) {
      throw new httpErrors.BadRequest("آیدی کمپر اجباری می باشد.");
    }

    const camper = await CamperModel.findOne({ where: { id } });

    if (!camper) {
      throw new httpErrors.NotFound("کمپر پیدا نشد.");
    }

    if (!camper.dataValues.images.includes(image)) {
      throw new httpErrors.NotFound("عکس مورد نظر در سیستم یافت نشد.");
    }

    const images = camper.dataValues.images.filter(
      (img: string) => img !== image
    );

    await camper.update({ images });
    await deleteFile(image);

    res.json({ message: "عکس مورد نظر با موفقیت حذف شد." });
  } catch (error) {
    next(error);
  }
};
