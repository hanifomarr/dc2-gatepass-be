import { Prisma } from "../../../generated/prisma/client";
import { prisma } from "../../../lib/prisma";
import bcrypt from "bcrypt";
import { generateToken } from "../../../utils/jwt";

export const createUser = async (userBody: Prisma.UserCreateInput) => {
  // check if user exists
  const userExist = await prisma.user.findUnique({
    where: {
      email: userBody.email,
    },
  });

  if (userExist) throw new Error("User already exists");

  //if not exist, hash user password
  const hashedPassword = await bcrypt.hash(userBody.password, 10);

  // create user with prisma
  const user = await prisma.user.create({
    data: {
      ...userBody,
      password: hashedPassword,
    },
  });

  // create token
  const token = generateToken(user.id);

  // return user and token
  return {
    user,
    token,
  };
};

export const loginUserWithEmailAndPassword = async (
  email: string,
  password: string,
) => {
  // verify user with prisma
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) throw new Error("User not found");

  // compare password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) throw new Error("Invalid password");

  // generate token
  const token = generateToken(user.id);

  // return user and token
  return {
    user,
    token,
  };
};
