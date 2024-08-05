import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET; // Ambil secret key dari environment variable

export function generateToken(data) {
  const payload = data;
  const options = { expiresIn: "2h" }; // Token akan expired dalam 2 jam
  return jwt.sign(payload, secretKey, options);
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    return null; // Token tidak valid atau expired
  }
}
