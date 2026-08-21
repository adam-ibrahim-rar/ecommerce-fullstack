  import prisma from "../../../config/prisma";
import type { Prisma } from "../../../generated/prisma/client";
import type { CreateUserInput, UpdateUserInput } from "../../../schemas/user.schema";



  const userSelect = {
    id: true,
    username: true,
    firstName: true,
    lastName: true,
    email: true,
    role: true,
    createdAt: true,
    updatedAt: true,
  };

  export const findAll = async () => {
    return prisma.user.findMany({
      select: userSelect,
    });
  };

  export const findByEmail = async (email: string) => {
    return prisma.user.findUnique({
      where: {
        email,
      },
      select: userSelect,
    });
  };

  export const findByUsername = async (username: string) => {
    return prisma.user.findUnique({
      where: {
        username,
      },
      select: userSelect,
    });
  };

  export const findByEmailForLogin = async (email: string) => {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  };

  export const create = async (data: CreateUserInput) => {
    return prisma.user.create({
      data,
      select: userSelect,
    });
  };

  export const findById = async (id: string) => {
    return prisma.user.findUnique({
      where: {
        id,
      },
      select: userSelect,
    });
  };

  export const findForUpdate = async (id: string) => {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  };

  export const update = async (
    id: string,
    data: Prisma.UserUpdateInput,
  ) => {
    return prisma.user.update({
      where: {
        id,
      },
      data,
      select: userSelect,
    });
  };

  export const remove = async (id: string) => {
    return prisma.user.delete({
      where: {
        id,
      },
    });
  };