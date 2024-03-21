import jwt, { Secret } from "jsonwebtoken";
require("dotenv").config();

interface IActivationToken {
  token: string;
  ActivationCode: string;
}

//create Activation Token
export const createActivationToken = (id: string): IActivationToken => {
  //Generate random 4 digit number
  const ActivationCode = Math.floor(1000 + Math.random() * 9000).toString();

  const token = jwt.sign(
    {
      id,
      ActivationCode,
    },
    process.env.ACTIVATION_SECRET as Secret,
    {
      expiresIn: process.env.JWT_ACTIVATION_EXPIRES,
    }
  );

  return { token, ActivationCode };
};
