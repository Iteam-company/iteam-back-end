const bcrypt = require("bcrypt");

export const encrypt = async (value: string): Promise<string> => {
  const saltRounds = 10;
  const hashed = await bcrypt.hash(value, saltRounds);
  return hashed;
};

export const compare = async (
  plainPassword: string,
  hash: string
): Promise<boolean> => {
  const compareResult = await bcrypt.compare(plainPassword, hash);
  return compareResult;
};
