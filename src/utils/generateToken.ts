import jwt from "jsonwebtoken";

export default (payload: object) => {
  const { ACCESS_TOKEN_SECRET_KRY } = process.env;
  return jwt.sign(payload, ACCESS_TOKEN_SECRET_KRY as string, {
    expiresIn: "30d",
  });
};
