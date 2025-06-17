const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "super-secret"; // move to .env

exports.register = async ({ name, email, password }) => {
  const existing = await db.User.findOne({ where: { email } });
  if (existing) throw new Error("Email already in use");

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await db.User.create({
    id: Date.now().toString(),
    name,
    email,
    password: hashedPassword,
  });

  return { message: "Registered successfully", user: { id: user.id, name: user.name, email: user.email } };
};

exports.login = async ({ email, password }) => {
  const user = await db.User.findOne({ where: { email } });
  if (!user) throw new Error("User not found");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid password");

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1d" });

  return { token, user: { id: user.id, name: user.name, email: user.email } };
};
