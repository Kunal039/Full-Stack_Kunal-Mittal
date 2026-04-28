import {
  createLocalUser,
  findUserByEmail,
  sanitizeUser,
  validateUserPassword
} from "../repositories/userRepository.js";
import { signAuthToken } from "../utils/token.js";

function sendAuthResponse(res, user, statusCode = 200) {
  const safeUser = sanitizeUser(user);
  const token = signAuthToken(safeUser);

  return res.status(statusCode).json({
    message: "Authentication successful",
    token,
    user: safeUser
  });
}

export async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email, and password are required"
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long"
      });
    }

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      return res.status(409).json({
        message: "An account with this email already exists"
      });
    }

    const user = await createLocalUser({ name, email, password });
    return sendAuthResponse(res, user, 201);
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const validPassword = await validateUserPassword(user, password);

    if (!validPassword) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    return sendAuthResponse(res, user);
  } catch (error) {
    next(error);
  }
}
