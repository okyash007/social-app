export function removePassword(user) {
  const { password: pass, ...rest } = user;
  return rest;
}
