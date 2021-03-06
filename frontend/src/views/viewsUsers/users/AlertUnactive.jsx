//Librería para los alerts
import Swal from "sweetalert2";

/* ============================================================== */
<<<<<<< HEAD
/*--- Alert eliminar un mensaje ---*/
=======
/*--- Alert desactivar usuario ---*/
>>>>>>> 250b59ffb65bb6d1fa606809eac70eedf2662833
/* ============================================================== */
const AlertUnactive = ({ message }) => {
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

  Toast.fire({
    icon: "success",
    title: `<span style="color:#FFFFFF">${message}<span>`,
  });
};
/* ============================================================== */
/*--- Fin Alert elimianr un mensaje ---*/
/* ============================================================== */

export default AlertUnactive;
