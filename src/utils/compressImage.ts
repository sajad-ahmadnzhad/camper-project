import sharp, { Sharp } from "sharp";
import path from "path";

export default async (file: Express.Multer.File): Promise<Buffer> => {
  const { buffer, originalname } = file;

  let image = sharp(buffer);
  const extname = path.extname(originalname);
  const squareSize = 512;

  if (extname == ".jpg" || extname == ".jpeg") {
    image = image.jpeg({ quality: 70 });
  } else if (extname == ".png") {
    image = image.png({ quality: 70, compressionLevel: 9 });
  }

  return image
    .resize(squareSize, squareSize, {
      fit: sharp.fit.cover,
      position: sharp.strategy.entropy,
    })
    .toBuffer();
};
