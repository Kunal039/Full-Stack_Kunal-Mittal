import jwt from "jsonwebtoken";

const fallbackSecret = "jobhub-dev-secret";

export function signAuthToken(user) {
  return jwt.sign(
    {
      sub: user._id,
      email: user.email,
      name: user.name
    },
    process.env.JWT_SECRET || fallbackSecret,
    {
      expiresIn: "7d"
    }
  );
}
