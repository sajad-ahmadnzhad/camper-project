import multer from "multer";
import path from "path";
import httpErrors from "http-errors";

const memoryStorage = multer.memoryStorage();

const upload = multer({
  storage: memoryStorage,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter(req, file, cb) {
    const fileExtension = path.extname(file.originalname);
    let suffixes = [".png", ".jpg", ".jpeg"];

    if (suffixes.includes(fileExtension)) return cb(null, true);

    const message = `The extension of the submitted file is not valid. The extension of the submitted files must include: ${suffixes.join(
      " "
    )}`;
    (cb as any)(httpErrors.BadRequest(message));
  },
});

export default upload;
