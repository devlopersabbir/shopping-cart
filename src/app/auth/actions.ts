"use server";

import { signUpSchema } from "@/validator/schema";
import { SignUpSchema } from "./sign-up/page";
import prisma from "@/lib/db";
import { genSalt, hash } from "bcrypt";

export async function signUpUser(inputs: SignUpSchema) {
  const { success } = signUpSchema.safeParse(inputs);
  if (!success) {
    throw new Error("Invalid inputs");
  }

  // cheak user already exists with reqest email
  const userExists = await prisma.user.findFirst({
    where: {
      email: inputs.email,
    },
  });
  if (userExists) {
    throw new Error("Email address already exists");
  }

  // hash password

  const saltRounds = 10;
  const salt = await genSalt(saltRounds);

  const passwordHash = await hash(inputs.password, salt);

  const newUser = await prisma.user.create({
    data: {
      name: inputs.name,
      email: inputs.email,
      password: passwordHash,
    },
  });

  return newUser;
}
