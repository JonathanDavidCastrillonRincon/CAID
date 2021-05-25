import Message from "../models/message";

export const getMessages = async (req, res) => {
  const messages = await Message.find(); //arreglo de todos los datos
  res.json(messages);
};

export const getMessage = async (req, res) => {
  const message = await Message.findById(req.params.id);
  res.json(message);
};

export const createMessage = async (req, res) => {
  const { to, postedBy, title, description, status } = req.body;
  const newMessage = new Message({
    to,
    postedBy,
    title,
    description,
    status,
  });
  const saveMessage = await newMessage.save();
  console.log(saveMessage); //datos que envia el cliente
  res.json({ message: "Mensaje creado", data: saveMessage });
};

export const updateMessage = async (req, res) => {
  const { to, postedBy, title, description, status } = req.body;
  await Message.findOneAndUpdate(
    { _id: req.params.id },
    {
      to,
      postedBy,
      title,
      description,
      status,
    }
  );
  res.json({ message: "Mensaje actualizado" });
};

export const deleteMessage = async (req, res) => {
  await Message.findOneAndDelete(req.params.id);
  res.json({ message: "Mensaje eliminado" });
};
export const searchByTo = async (req, res) => {
  let query = req.params.query;

  const queryTo = await Message.find({ to: query }, {});
  res.status(200).send({ data: queryTo });
};

export const searchByPostedBy = async (req, res) => {
  let query = req.params.query;

  const queryPostedBy = await Message.find({ postedBy: query }, {});
  res.status(200).send({ data: queryPostedBy });
};

export const changeStatusToRemove = async (req, res) => {
  let messageId = req.params.id;
  let status = req.body.status;
  const changeStatus = await Message.findByIdAndUpdate(
    { _id: messageId },
    { status },
    { new: true }
  );
  res
    .status(200)
    .send({ data: changeStatus, message: "El mensaje ha sido eliminado" });
};
