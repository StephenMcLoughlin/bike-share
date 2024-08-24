import bcrypt from "bcrypt";
const saltRounds = 10;

export const hash = (text: string) => bcrypt.hash(text, saltRounds);

export const compare = (enteredValue: string, storedValue: string) =>
  bcrypt.compare(enteredValue, storedValue);
