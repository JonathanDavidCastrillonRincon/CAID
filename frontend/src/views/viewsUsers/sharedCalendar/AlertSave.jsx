//Librería para los alerts
import Swal from 'sweetalert2';

/* ============================================================== */
    /*--- Alert generar una observación ---*/
/* ============================================================== */
const AlertSave =()=> {
    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom',
        showCloseButton: true,
        background: '#2c2f33',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: 'success',
        title: '<span style="color:#FFFFFF">Observación guardada.<span>'
    })
}
/* ============================================================== */
    /*--- Fin Alert generar una observación ---*/
/* ============================================================== */

export default AlertSave;