import { Schema, model } from "mongoose";

const messageSchema = new Schema(
  {
    to: {
      type: Schema.Types.ObjectId,
      ref: "User",
    }, //remisor del mensaje
    postedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    }, //emisor del mensaje
    title: String, //asunto del mensaje
    description: String, //descripcion o contenido del mensaje
    status: String, // Status 1 recibido - 2 enviado - 3 eliminado
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
export default model("Message", messageSchema);
