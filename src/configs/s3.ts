import AWS from "aws-sdk";

const { S3_SECRET_KEY, S3_ACCESS_KEY, S3_ENDPOINT } = process.env;

export default new AWS.S3({
  region: "default",
  credentials: {
    accessKeyId: S3_ACCESS_KEY as string,
    secretAccessKey: S3_SECRET_KEY as string,
  },
  endpoint: S3_ENDPOINT as string,
});
