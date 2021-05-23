import User from "../models/user";
import Role from "../models/role";
import jwt from "jsonwebtoken";
import config from "../config";

export const getUsers = async (req, res) => {
  const users = await User.find(); //arreglo de todos los datos
  res.json(users);
};

export const getUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
};

export const createUser = async (req, res) => {
  const {
    username,
    password,
    name,
    identificationType,
    identification,
    birthDate,
    email,
    telephone,
    address,
    role,
    status,
  } = req.body;

  const identificationExist = await User.findOne({
    identification: req.body.identification,
  });
  if (identificationExist)
    return res.status(400).json({
      message:
        "Este número de identificación ya está registrado, por favor ingrese otro",
    });

  //create a user obj
  const newUser = new User({
    username,
    password: await User.encryptPassword(password),
    name,
    identificationType,
    identification,
    birthDate,
    email,
    telephone,
    address,
    role,
    status,
  });

  //saving user obj in MongoDB
  await newUser.save();

  res.json({
    message: "usuario creado",
  });
  console.log(newUser);
};

export const updateUser = async (req, res) => {
  const {
    username,
    password,
    name,
    identification,
    birthDate,
    email,
    telephone,
    address,
    status,
    role,
  } = req.body;
  await User.findOneAndUpdate(
    { _id: req.params.id },
    {
      username,
      password,
      name,
      identification,
      birthDate,
      email,
      telephone,
      address,
      status,
      role,
    },
    { new: true }
  );
  res.json({ message: "Usuario actualizado" });
};

export const deleteUser = async (req, res) => {
  await User.findOneAndDelete({ _id: req.params.id });
  res.json({ message: "Usuario eliminado" });
};

export const changeStatus = (req, res) => {
  let userId = req.params.id;
  let status = req.body.status;

  User.findByIdAndUpdate(
    { _id: userId },
    { status },
    { new: true },
    function (err, user) {
      if (err) {
        res
          .status(500)
          .send({ message: "Error al cambiar estado del usuario" });
      } else {
        if (!user) {
          res
            .status(400)
            .send({ message: "No se ha podido cambiar el estado del usuario" });
        } else {
          res.status(200).send({
            data: user,
            message:
              user.status === false
                ? "EL usuario ha sido desactivado"
                : "El usuario ha sido activado",
          });
        }
      }
    }
  );
};
