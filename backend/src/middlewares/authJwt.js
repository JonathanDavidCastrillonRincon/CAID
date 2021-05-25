import jwt from "jsonwebtoken";
import config from "../config";
import User from "../models/user";

export const verifyToken = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res
      .status(403)
      .send({ message: "La petición no tiene la cabecera de autenticación" });
  }
  let token = req.headers.authorization.split(" ")[1];
  if (!token) return res.status(403).json({ message: "Sin token para acceso" });
  try {
    const decoded = jwt.verify(token, config.SECRET);
    req.userId = decoded.id;

    const user = await User.findById(req.userId, { password: 0 });
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });

    next();
  } catch (error) {
    return res.status(401).json({ message: "Sin autorizacion" });
  }
};

export const checkDuplicateUsernameorEmail = async (req, res, next) => {
  const user = await User.findOne({ username: req.body.username });
  if (user) return res.status(400).json({ message: "El usuario ya existe" });

  const email = await User.findOne({ email: req.body.email });
  if (email) return res.status(400).json({ message: "El email ya existe" });

  next();
};
