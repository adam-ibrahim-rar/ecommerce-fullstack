import prisma from "../../../config/prisma";
import type {
  CreateUserInput,
  UpdateUserInput,
} from "../types/user.type";

export const findAll = async () => {
  return prisma.user.findMany();
};

export const findByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export const findByUsername = async (username: string) => {
  return prisma.user.findUnique({
    where: {
      username,
    },
  });
};

export const create = async (data: CreateUserInput) => {
  return prisma.user.create({
    data,
    select: {
      id: true,
      username: true,
      firstName: true,
      lastName: true,
      email: true,
    },
  });
};

export const findById = async (id: string) => {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
};

export const update = async (
  id: string,
  data: UpdateUserInput
) => {
  return prisma.user.update({
    where: {
      id,
    },
    data,
  });
};

export const remove = async (id: string) => {
  return prisma.user.delete({
    where: {
      id,
    },
  });
};