import jwt from "jsonwebtoken";


export default (payload: object , secretKey: string) => {
  return jwt.sign(payload, secretKey, {
    expiresIn: "30d",
  });
};
