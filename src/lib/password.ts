import bcrypt from 'bcrypt';

export const validatePassword = async (password: string, hash: string) => {
  const isValid = await bcrypt.compare(password, hash);

  return isValid;
};

export const genHashedPassword = (
  password: string,
  saltRounds: number = 10
) => {
  const hashedPassword = bcrypt.hash(password, saltRounds);

  return hashedPassword;
};
