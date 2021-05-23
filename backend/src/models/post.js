import { Schema, model } from "mongoose";

const postSchema = new Schema(
  {
    title: { type: String }, //titulo de la actividad
    activityType: { type: String }, //tipo de actividad,
    creatorActivity: { type: String }, // Creador de la actividad
    description: { type: String }, //descripcion de la publicacion
    initialDate: { type: Date }, //fecha y hora inicio
    finalDate: { type: Date }, //fecha y hora final
    responsible: [], //array de los responsables de la actividad,
    participants: [], //array de los participantes o destinatarios de la actividad,
    workingDay: { type: String },
    grade: [],
    visibilityActivity: { type: String },
    file: { type: Object },
    status: { type: String },
    observation: { type: String },
    evidence: [], //array de los evidencias de la actividad,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Post", postSchema);
