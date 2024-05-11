import jwt from "jsonwebtoken";

export function createAcessToken(uid) {
  const token = jwt.sign({ id: uid }, process.env.JWT_SECRET);
  return token;
}
