import { S3, AWSError } from "aws-sdk";
import s3 from "../configs/s3";
import { PromiseResult } from "aws-sdk/lib/request";

export const uploadFile = (
  buffer: Buffer,
  path: string,
  mimetype: string = "application/octet-stream"
): Promise<S3.ManagedUpload.SendData> => {
  return s3
    .upload({
      Bucket: process.env.S3_BUCKET_NAME as string,
      Body: buffer,
      Key: path,
      ContentType: mimetype,
    })
    .promise();
};

export const deleteFile = (
  url: string
): Promise<PromiseResult<S3.DeleteObjectOutput, AWSError>> => {
  return s3
    .deleteObject({
      Bucket: process.env.S3_BUCKET_NAME as string,
      Key: extractKeyFromUrl(url),
    })
    .promise();
};

const extractKeyFromUrl = (url: string): string => {
  const urlParts = url.split("/");

  const key = urlParts.slice(3).join("/");

  return decodeURI(key);
};
