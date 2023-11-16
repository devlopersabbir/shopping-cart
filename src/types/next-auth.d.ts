import { type Role } from "@prisma/client";
import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

type UserId = number;

declare module "next-auth" {
  interface User {
    id: UserId;
    role: Role;
  }

  interface Session extends DefaultSession {
    user?: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: UserId;
    role: Role;
  }
}
