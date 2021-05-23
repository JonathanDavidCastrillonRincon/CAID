import instance from "./instance";

import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "bottom",
  showCloseButton: true,
  background: "#2c2f33",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export const login = async (identification, password) => {
  try {
    const response = await instance.post("/auth/signin", {
      identification,
      password,
    });
    return response;
  } catch (error) {
    Toast.fire({
      icon: "info",
      title: `<span style="color:#FFFFFF">${error.response.data.message}<span>`,
    });
  }
};
