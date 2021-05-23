//Librería para los alerts
import Swal from "sweetalert2";

/* ============================================================== */
/*--- Alert no found actividades ---*/
/* ============================================================== */
function AlertNoFound() {
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
    icon: "info",
    title: '<span style="color:#FFFFFF">No hay actividades programadas<span>',
  });
}
/* ============================================================== */
/*--- FIn Alert no found actividad ---*/
/* ============================================================== */
export default AlertNoFound;
