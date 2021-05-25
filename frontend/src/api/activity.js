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

export const getAllActivities = async () => {
  try {
    const response = await instance.get("/posts");
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const getByActivity = async (id) => {
  try {
    const response = await instance.get(`/posts/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getFile = async (nameFile) => {
  try {
    const response = await instance.get(`/posts/get-file/${nameFile}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getFileEvidence = async (nameFile) => {
  try {
    const response = await instance.get(`/posts/get-files/${nameFile}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const updateFile = async (formData, id) => {
  try {
    const response = await instance.post(`/posts/file-update/${id}`, formData);
    return response;
  } catch (error) {
    console.log(error);
    Toast.fire({
      icon: "info",
      title: `<span style="color:#FFFFFF">${error.response.data.message}<span>`,
    });
  }
};

export const uploadFiles = async (formData, id) => {
  try {
    const response = await instance.post(
      `/posts/upload-evidences/${id}`,
      formData
    );
    return response;
  } catch (error) {
    console.log(error);
    Toast.fire({
      icon: "info",
      title: `<span style="color:#FFFFFF">${error.response.data.message}<span>`,
    });
  }
};

export const createActivity = async (formData) => {
  try {
    const response = await instance.post("/posts", formData);
    return response;
  } catch (error) {
    console.log(error);
    Toast.fire({
      icon: "info",
      title: `<span style="color:#FFFFFF">${error.response.data.message}<span>`,
    });
  }
};
export const deleteActivity = async (id) => {
  try {
    const response = await instance.delete(`/posts/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateActivity = async (id, obj) => {
  try {
    const response = await instance.put(`/posts/${id}`, {
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
