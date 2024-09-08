import { User } from "@prisma/client";

import { prisma } from "../prisma";

export interface UpdateUserForm extends Omit<User, "id" | "createdAt"> {}

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });

    return user;
  } catch {
    return null;
  }
};

export const updateUser = async (userId: string, data: UpdateUserForm) => {
  try {
    const session = await prisma.user.update({
      where: {
        id: userId,
      },
      data,
    });
    return session;
  } catch (error) {
    return null;
  }
};

export const createUser = async (data: User) => {
  try {
    const session = await prisma.user.create({
      data,
    });
    return session;
  } catch (error) {
    return null;
  }
};
