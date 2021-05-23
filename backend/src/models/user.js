import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
const roles = {
  values: ["admin", "teacher", "committee", "headofarea"],
  message: "{VALUE} no es un rol permitido",
};
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    }, //nombre de usuario para ingreso
    password: {
      type: String,
      required: true,
    }, //contrasena para ingreso
    name: {
      type: String,
      required: true,
      trim: true,
    }, //nombre de la persona
    identificationType: {
      type: String,
      required: true,
      trim: true,
    },
    identification: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    }, //numero de documento de persona
    birthDate: Date, //fecha de nacimiento
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    }, //correo electronico de la persona
    telephone: {
      type: String,
    }, //numero de telefono o celular de la persona
    address: String,
    status: Boolean,
    role: {
      type: [
        {
          type: String,
          enum: [roles],
        },
      ],
      default: ["teacher"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

userSchema.statics.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword);
};

export default model("User", userSchema);
