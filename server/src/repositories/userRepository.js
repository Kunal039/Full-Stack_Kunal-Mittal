import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import User from "../models/User.js";

const memoryUsers = [];

function normalizeEmail(email) {
  return email.trim().toLowerCase();
}

function sanitizeUser(user) {
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    avatar: user.avatar || "",
    provider: user.provider
  };
}

export async function findUserByEmail(email) {
  const normalizedEmail = normalizeEmail(email);

  if (mongoose.connection.readyState === 1) {
    return User.findOne({ email: normalizedEmail });
  }

  return memoryUsers.find((user) => user.email === normalizedEmail) || null;
}

export async function createLocalUser({ name, email, password }) {
  const passwordHash = await bcrypt.hash(password, 10);

  if (mongoose.connection.readyState === 1) {
    return User.create({
      name,
      email: normalizeEmail(email),
      passwordHash,
      provider: "local"
    });
  }

  const user = {
    _id: `memory-user-${Date.now()}`,
    name,
    email: normalizeEmail(email),
    passwordHash,
    avatar: "",
    provider: "local"
  };

  memoryUsers.push(user);
  return user;
}

export async function validateUserPassword(user, password) {
  if (!user?.passwordHash) {
    return false;
  }

  return bcrypt.compare(password, user.passwordHash);
}

export { sanitizeUser };
