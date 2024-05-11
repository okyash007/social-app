import bcryptjs from "bcryptjs";

export function hashPassword(password) {
  const hashedPassword = bcryptjs.hashSync(password, 10);
  return hashedPassword;
}

export function unhashPassword(password, encyptedPassword) {
  const unhashedPassword = bcryptjs.compareSync(password, encyptedPassword);
  return unhashedPassword;
}
