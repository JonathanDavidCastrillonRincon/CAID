import User from "../models/user";
import jwt from "jsonwebtoken";
import config from "../config";

export const signIn = async (req, res) => {
  const userFound = await User.findOne({
    identification: req.body.identification,
  });
  if (!userFound)
    return res.status(400).json({ message: "Usuario NO encontrado" });

  const matchPassword = await User.comparePassword(
    req.body.password,
    userFound.password
  );

  if (!matchPassword)
    return res
      .status(401)
      .json({ token: null, message: "Contrasena invalida" });

  if (userFound.status === false)
    return res.status(400).json({
      message: "Su cuenta está inactiva, por favor contacte con soporte",
    });

  const token = jwt.sign({ id: userFound._id }, config.SECRET, {
    expiresIn: 86400,
  });

  res.json({ token, userFound });
};
