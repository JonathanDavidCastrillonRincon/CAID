import Post from "../models/post";
import multer from "multer";
import path from "path";
import fs from "fs";

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/uploads/documents");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

let storageDisk = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/uploads/evidences");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

let upload = multer({ storage: storage }).single("file");
let uploadMultiple = multer({ storage: storageDisk }).array("evidence", 4);

export const getPosts = async (req, res) => {
  const posts = await Post.find(); //arreglo de todos los datos
  res.status(200).send({ data: posts });
};

export const getPost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.status(200).send({ data: post });
};

export const createPost = (req, res) => {
  upload(req, res, (err) => {
    if (err)
      return res.status(500).send({ message: "Error al crear la actividad" });
    const {
      title,
      activityType,
      description,
      initialDate,
      finalDate,
      responsible,
      participants,
      workingDay,
      grade,
      visibilityActivity,
      status,
      observation,
      creatorActivity,
      evidence,
    } = req.body;

    const fileDocument = req.file ? req.file : "null";

    const responsibleConvert = responsible.split(",");
    const participantsConvert = participants.split(",");
    const gradeConvert = grade.split(",");

    let newPost = {
      title,
      activityType,
      description,
      initialDate,
      finalDate,
      responsible: responsibleConvert,
      participants: participantsConvert,
      workingDay,
      grade: gradeConvert,
      visibilityActivity,
      file: fileDocument,
      status,
      observation,
      evidence,
      creatorActivity,
    };
    let post = new Post(newPost);

    post.save((err, post) => {
      if (err) {
        res.status(500).send({ message: "Error al crear la actividad" });
        console.log(err);
      } else {
        if (!post) {
          res.status(400).send({ message: "No se ha registrado la actividad" });
        } else {
          res
            .status(201)
            .send({ data: post, message: "La actividad ha sido creada" });
        }
      }
    });
  });
};

export const updatePost = async (req, res) => {
  const {
    title,
    activityType,
    description,
    initialDate,
    finalDate,
    responsible,
    participants,
    workingDay,
    grade,
    visibilityActivity,
    status,
    observation,
    evidence,
    creatorActivity,
  } = req.body;
  const updatePost = await Post.findByIdAndUpdate(
    { _id: req.params.id },
    {
      title,
      activityType,
      description,
      initialDate,
      finalDate,
      responsible,
      participants,
      workingDay,
      grade,
      visibilityActivity,
      status,
      observation,
      evidence,
      creatorActivity,
    },
    { new: true }
  );
  res
    .status(200)
    .send({ message: "La actividad ha sido actualizada", data: updatePost });
};

export const deletePost = async (req, res) => {
  await Post.findOneAndDelete({ _id: req.params.id });
  res.status(200).send({ message: "La actividad ha sido borrada" });
};

export const updateFile = (req, res) => {
  var postId = req.params.id;
  upload(req, res, (err) => {
    if (err) {
      res.status(500).send("Ha ocurrido un error al actualizar el archivo!");
    }
    Post.findByIdAndUpdate(
      postId,
      {
        file: req.file,
      },
      { new: true },
      (err, post) => {
        if (!post) {
          res.status(400).send({
            message: "No se ha podido cargar el archivo",
          });
        } else {
          res.status(200).send({
            data: post,
            message: "El archivo se actualizó",
          });
        }
      }
    );
  });
};

//Obtener file
export const getFile = (req, res) => {
  let file = req.params.file;

  const pathFile = `src/uploads/documents/${file}`;
  fs.access(pathFile, (err) => {
    if (err) res.status(500).send("Ha ocurrido un error");
    else {
      res.sendFile(path.resolve(pathFile));
    }
  });
};

export const uploadEvidence = (req, res) => {
  var postId = req.params.id;
  uploadMultiple(req, res, (err) => {
    if (err) {
      res.status(500).send("Ha ocurrido un error al actualizar el archivo!");
    }
    Post.findByIdAndUpdate(
      postId,
      {
        evidence: req.files,
      },
      { new: true },
      (err, post) => {
        if (!post) {
          res.status(400).send({
            message: "No se ha podido cargar el archivo",
          });
        } else {
          res.status(200).send({
            data: post,
            message: "Se han agregado las evidencias",
          });
        }
      }
    );
  });
};

//Obtener files evidence
export const getFileEvidence = (req, res) => {
  let files = req.params.files;

  const pathFile = `src/uploads/evidences/${files}`;
  fs.access(pathFile, (err) => {
    if (err) res.status(500).send("Ha ocurrido un error");
    else {
      res.sendFile(path.resolve(pathFile));
    }
  });
};
