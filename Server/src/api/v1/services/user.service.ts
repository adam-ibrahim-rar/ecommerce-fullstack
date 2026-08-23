import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import * as userRepository from "../repositories/user.repository";

import type { UserQuery } from "../types/user.type";
import { AppError } from "../utils/app-error.util";
import bcrypt from "bcrypt";
import env from "../../../config/env";
import type {
  CreateUserInput,
  LoginUserInput,
  updateUserSchemaFromClient,
  GoogleAuthInput,
} from "../../../schemas/user.schema";

const googleClient = new OAuth2Client(env.GOOGLE_CLIENT_ID);

const generateUniqueUsername = async (base: string) => {
  const cleanBase = base.replace(/[^a-zA-Z0-9]/g, "").slice(0, 8) || "user";

  const existing = await userRepository.findByUsernamePrefix(cleanBase);
  const takenUsernames = new Set(existing.map((u) => u.username));

  if (!takenUsernames.has(cleanBase)) {
    return cleanBase;
  }

  let suffix = 1;
  while (takenUsernames.has(`${cleanBase}${suffix}`)) {
    suffix++;
  }

  return `${cleanBase}${suffix}`;
};

const issueTokenForUser = (userId: string) => {
  return jwt.sign(
    {
      userId,
    },
    env.JWT_SECRET!,
    {
      expiresIn: "7d",
    }
  );
};

export const googleAuthService = async (data: GoogleAuthInput) => {
  let payload;

  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: data.credential,
      audience: env.GOOGLE_CLIENT_ID,
    });

    payload = ticket.getPayload();
  } catch {
    throw new AppError("Invalid Google credential", 401);
  }

  if (!payload || !payload.email) {
    throw new AppError("Invalid Google credential", 401);
  }

  const googleId = payload.sub;
  const email = payload.email;

  let user = await userRepository.findByGoogleId(googleId);

  if (!user) {
    const existingByEmail = await userRepository.findByEmail(email);

    if (existingByEmail) {
      user = await userRepository.linkGoogleId(existingByEmail.id, googleId);
    } else {
      const username = await generateUniqueUsername(
        email.split("@")[0]
      );

      user = await userRepository.createFromGoogle({
        username,
        email,
        firstName: payload.given_name ?? "",
        lastName: payload.family_name ?? "",
        googleId,
      });
    }
  }

  const token = issueTokenForUser(user.id);

  return {
    user,
    token,
  };
};

export const createUserService = async (data: CreateUserInput) => {
  const existingUserByEmail = await userRepository.findByEmail(data.email);

  if (existingUserByEmail) {
    throw new AppError("Email already exists", 409);
  }

  const existingUserByUsername = await userRepository.findByUsername(
    data.username,
  );

  if (existingUserByUsername) {
    throw new AppError("Username already exists", 409);
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await userRepository.create({
    ...data,
    password: hashedPassword,
  });

  return user;
};

export const loginUserService = async (data: LoginUserInput) => {
  const user = await userRepository.findByEmailForLogin(data.email);

  if (!user) {
    throw new AppError("Email does not exists", 401);
  }

  if (!user.password) {
    throw new AppError(
      "This account was created with Google. Please log in with Google.",
      401
    );
  }

  const isPasswordValid = await bcrypt.compare(data.password, user.password);

  if (!isPasswordValid) {
    throw new AppError("Wrong password", 401);
  }

  const token = jwt.sign(
    {
      userId: user.id,
    },
    env.JWT_SECRET!,
    {
      expiresIn: "7d",
    },
  );

  const { password, ...userData } = user;

  return {
    user: userData,
    token,
  };
};
export const getUsersService = async (query: UserQuery) => {
  if (query.email) {
    const user = await userRepository.findByEmail(query.email);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return user;
  }

  if (query.username) {
    const user = await userRepository.findByUsername(query.username);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return user;
  }

  return userRepository.findAll();
};

export const getUserService = async (id: string) => {
  const user = await userRepository.findById(id);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};

export const updateUserService = async (
  id: string,
  data: updateUserSchemaFromClient
) => {
  const existingUser = await userRepository.findForUpdate(id);

  if (!existingUser) {
    throw new AppError("User not found", 404);
  }

  const {
    password,
    newPassword,
    ...rest
  } = data;

  const updateData = Object.fromEntries(
    Object.entries(rest).filter(
      ([, value]) => value !== undefined && value !== ""
    )
  );

  if (newPassword) {
    if (!password) {
      throw new AppError(
        "Current password is required",
        400
      );
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      throw new AppError(
        "Current password is incorrect",
        400
      );
    }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      10
    );

    return userRepository.update(id, {
      ...updateData,
      password: hashedPassword,
    });
  }

  // Normal update
  return userRepository.update(id, updateData);
};
export const deleteUserService = async (id: string) => {
  const existingUser = await userRepository.findById(id);

  if (!existingUser) {
    throw new AppError("User not found", 404);
  }

  await userRepository.remove(id);
};
