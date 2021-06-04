import User from "../models/user";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import async from "async";
import mailer from "../utils/mailer";

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
};

export const updateUser = async (req, res) => {
  const {
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
      password: await User.encryptPassword(password),
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

export const changePassword = async (req, res) => {
  const { password } = req.body;
  await User.findOneAndUpdate(
    { _id: req.params.id },
    {
      password: await User.encryptPassword(password),
    },
    { new: true }
  );
  res.json({ message: "La contraseña ha sido cambiada" });
};

//reset password
export const resetPassword = (req, res) => {
  async.waterfall(
    [
      function (done) {
        User.findOne({
          email: req.body.email,
        }).exec(function (err, user) {
          if (user) {
            done(err, user);
          } else {
            done("Este correo electrónico no existe.");
          }
        });
      },
      function (user, done) {
        // create the random token
        crypto.randomBytes(20, function (err, buffer) {
          let token = buffer.toString("hex");
          done(err, user, token);
        });
      },
      function (user, token, done) {
        User.findByIdAndUpdate(
          { _id: user._id },
          {
            reset_password_token: token,
            reset_password_expires: Date.now() + 600000,
          },
          { upsert: true, new: true }
        ).exec(function (err, new_user) {
          done(err, token, new_user);
        });
      },
      function (token, user, done) {
        mailer({
          to: user.email,
          subject: "Recuperar contraseña",
          html: `<p>Se ha realizado una solicitud para cambiar la contraseña de su cuenta </p>
         <h5>Haga clic en este <a href="http://localhost:3000/reset/${token}">link</a> para restablecer su contraseña</h5>
         <p> O copia y pega el siguiente link:</p>
         <h5>"http://localhost:3000/reset/${token}"</h5>
         <h5>El link solo es válido por 10 minutos</h5>
         <h5>Si no fue el remitente de esa solicitud, simplemente puede ignorar el mensaje</h5>`,
        });
        res.status(200).send({
          message:
            "Por favor verifique su correo electrónico para recuperar la contraseña",
        });
      },
    ],
    function (err) {
      return res.status(400).json({ message: err });
    }
  );
};

//new password
export const newPassword = (req, res) => {
  User.findOne({
    reset_password_token: req.params.token,
    reset_password_expires: {
      $gt: Date.now(),
    },
  }).exec(function (err, user) {
    if (!err && user) {
      if (req.body.newPassword === req.body.verifyPassword) {
        user.password = bcrypt.hashSync(req.body.newPassword, 10);
        user.reset_password_token = undefined;
        user.reset_password_expires = undefined;
        user.save(function (err) {
          if (err) {
            return res.status(422).send({
              message: err,
            });
          } else {
            mailer({
              to: user.email,
              subject: "Confirmación de restablecimiento de contraseña",
              html: `<p>${user.name}  Usted ha cambiado su contraseña a: ${req.body.newPassword} </p>`,
            });
            res.status(200).send({
              message: "Su contraseña ha sido cambiada exitosamente",
            });
          }
        });
      } else {
        return res.status(400).send({
          message: "Las contraseñas no coinciden",
        });
      }
    } else {
      return res.status(400).send({
        message:
          "El token de restablecimiento de contraseña no es válido o ha caducado.",
      });
    }
  });
};
