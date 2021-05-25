//Librería para los alerts
import Swal from "sweetalert2";

/* ============================================================== */
/*--- Alert crear una actividad ---*/
/* ============================================================== */
function AlertSave() {
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
    title: '<span style="color:#FFFFFF">Actividad guardada.<span>',
  });
}
/* ============================================================== */
/*--- FIn Alert crear una actividad ---*/
/* ============================================================== */
export default AlertSave;
