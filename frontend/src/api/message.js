import instance from "./instance";

//Obtener todos los mensajes
export const getAllMessages = async () => {
  try {
    const response = await instance.get("/messages");
    return response;
  } catch (error) {
    console.log(error);
  }
};
//Obtener todos los mensajes enviados por el usuario
export const getMessageByTo = async (id) => {
  try {
    const response = await instance.get(`/messages/to/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

//Obtener todos los mensajes recibido para el usuario
export const getMessageByPosted = async (id) => {
  try {
    const response = await instance.get(`/messages/postedBy/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

//Cambiar estado a bandeja eliminado
export const changeStatusToRemove = async (id, status) => {
  try {
    const response = await instance.put(`/messages/change-status/${id}`, {
      status: status,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

//Crear mensaje
export const createMessage = async (obj) => {
  try {
    const response = await instance.post("/messages", {
      ...obj,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
