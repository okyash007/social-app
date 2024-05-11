import jwt from "jsonwebtoken";
import { apiError } from "./apiError.js";

export const verifyUser = (req, res, next) => {
  const token = req.cookies.acess_token;
  //   res.json(new apiResponse(200, `your token is ${token}`))
  if (!token) {
    return next(new apiError(400, "user is not authorized"));
  }
  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) return next(new apiError(400, "forbidden"));
    req.user = user;
    next();
  });
};
