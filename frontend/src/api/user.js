import instance from "./instance";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "bottom",
  showCloseButton: true,
  background: "#2c2f33",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

//Obtener todos los usuarios
export const getAllUser = async () => {
  try {
    const response = await instance.get("/users");
    return response;
  } catch (error) {
    console.log(error);
  }
};
//Obtener el detail de un usuario
export const getByUser = async (id) => {
  try {
    const response = await instance.get(`/users/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};
//Cambiar el status de un usuario a activo o inactivo
export const changeStatus = async (id, status) => {
  try {
    const response = await instance.put(`/users/change-status/${id}`, {
      status: status,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
//Crear usuario
export const createUser = async (obj) => {
  try {
    const response = await instance.post("/users", {
      ...obj,
    });
    return response;
  } catch (error) {
    console.log(error);
    Toast.fire({
      icon: "info",
      title: `<span style="color:#FFFFFF">${error.response.data.message}<span>`,
    });
  }
};
//Actualizar usuario
export const updateUser = async (id, obj) => {
  try {
    const response = await instance.put(`/users/${id}`, {
      ...obj,
    });
    return response;
  } catch (error) {
    console.log(error);
    Toast.fire({
      icon: "info",
      title: `<span style="color:#FFFFFF">${error.response.data.message}<span>`,
    });
  }
};
