import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();
const { BCRYPT_SALT_FACTOR } = process.env;

export const encrypt = (password) =>
  bcrypt
    .hash(password, parseInt(BCRYPT_SALT_FACTOR, 10))
    .then((hash) => hash)
    .catch((err) => {
      throw Error(err.message || "Encryption failed");
    });

export const verifyHash = (
  hash,
  value,
  missMatchError = "Invalid credentials"
) =>
  new Promise((resolve, reject) => {
    bcrypt.compare(value, hash, (err, match) => {
      if (err) {
        reject(err);
      }
      if (!match) {
        reject(new Error(missMatchError));
      }
      resolve(true);
    });
  });
export const joiError = (err) => {
  const error = {};
  const { details } = err;
  details.forEach((element) => {
    const { message, path } = element;
    error[path[0]] = message.replace(/['"]+/g, "");
  });
  return error;
};

export const isEmpty = (value) =>
  [null, undefined].includes(value) ||
  ((value === typeof value) === "string" && !value.trim()) ||
  (typeof value === "object" && Object.keys(value).length === 0);
