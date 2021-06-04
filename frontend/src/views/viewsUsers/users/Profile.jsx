//Librería de react
import React, { useState } from "react";

//Librería de componentes de la plantilla
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import moment from "moment";
import { Button } from "react-bootstrap";
import { changePassword } from "src/api/user";

import Swal from "sweetalert2";
import { FaEye } from "react-icons/fa";

const Profile = () => {
  //get localstorage user user
  const user = JSON.parse(localStorage.getItem("user"))
    ? JSON.parse(localStorage.getItem("user"))
    : "";

  const [passwordNew, setPasswordNew] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [passwordShow, setPasswordShow] = useState(false);
  const [passwordShowConfirm, setPasswordShowConfirm] = useState(false);

  const toggleShowPassword = (action) => {
    if (action === 1) {
      setPasswordShow(passwordShow ? false : true);
    } else {
      setPasswordShowConfirm(passwordShowConfirm ? false : true);
    }
  };
  const validateTypeId =
    user.identificationType === "1"
      ? "Cedula"
      : user.identificationType === "2"
      ? "Pasaporte"
      : "Tarjeta ID";

  const actionChangePassword = () => {
    if (passwordNew !== passwordConfirm) {
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
        icon: "warning",
        title: `<span style="color:#FFFFFF">Las contraseñas no coinciden<span>`,
      });
    } else {
      changePassword(user._id, passwordConfirm).then((response) => {
        if (response) {
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
            title: `<span style="color:#FFFFFF">${response.data.message}<span>`,
          });
        }
      });
    }
  };

  return (
    <CRow>
      {/* ============================================================== */}
      {/*--- Componente de usuarios ---*/}
      {/* ============================================================== */}
      <CCol className="col-lg-12">
        <CCard className="shadow">
          <CCardHeader>
            <h4>Mi perfil - Datos personales</h4>
          </CCardHeader>
          <CCardBody>
            <div className="form-row">
              <div className="col-md-6 mb-3">
                <label style={{ color: "#3c4b64" }}>
                  <b>Tipo documento</b>
                </label>
                <input
                  type="text"
                  id="tipoIdentificacion"
                  name="tipoIdentificacion"
                  className="form-control"
                  disabled
                  value={validateTypeId}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label style={{ color: "#3c4b64" }}>
                  <b>Numero documento</b>
                </label>
                <input
                  type="text"
                  id="identificacion"
                  name="identificacion"
                  className="form-control"
                  disabled
                  value={user.identification}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="col-md-8 mb-3">
                <label style={{ color: "#3c4b64" }}>
                  <b>Nombre completo</b>
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  className="form-control"
                  disabled
                  value={user.name}
                />
              </div>
              <div className="col-md-4 mb-3">
                <label style={{ color: "#3c4b64" }}>
                  <b>Fecha nacimiento</b>
                </label>
                <input
                  type="date"
                  id="fechaNacimiento"
                  name="fechaNacimiento"
                  className="form-control"
                  disabled
                  value={moment(user.birthDate).format("DD/MM/YYYY")}
                />
              </div>
            </div>
          </CCardBody>
        </CCard>
        <CCard className="shadow">
          <CCardHeader>
            <h4>Datos de contácto</h4>
          </CCardHeader>
          <CCardBody>
            <div className="form-row">
              <div className="col-md-6 mb-3">
                <label style={{ color: "#3c4b64" }}>
                  <b>Correo electrónico</b>
                </label>
                <input
                  type="email"
                  id="correo"
                  name="correo"
                  className="form-control"
                  disabled
                  value={user.email}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label style={{ color: "#3c4b64" }}>
                  <b>Teléfono</b>
                </label>
                <input
                  type="text"
                  id="telefono"
                  name="telefono"
                  className="form-control"
                  disabled
                  value={user.telephone}
                />
              </div>
            </div>
          </CCardBody>
        </CCard>
        <CCard className="shadow">
          <CCardHeader>
            <h4>Cambiar contraseña</h4>
          </CCardHeader>
          <CCardBody>
            <div className="form-row">
              <div className="col-md-6 mb-3">
                <label style={{ color: "#3c4b64" }}>
                  <b>Contraseña</b>
                </label>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <input
                    type={passwordShow ? "text" : "password"}
                    name="password"
                    className="form-control"
                    onChange={(e) => setPasswordNew(e.target.value)}
                    value={passwordNew}
                  />
                  <div style={{ marginLeft: 3 }}>
                    <FaEye
                      onClick={() => toggleShowPassword(1)}
                      cursor="pointer"
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label style={{ color: "#3c4b64" }}>
                  <b>Confirmar contraseña</b>
                </label>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <input
                    type={passwordShowConfirm ? "text" : "password"}
                    name="passwordConfirm"
                    className="form-control"
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    value={passwordConfirm}
                  />
                  <div style={{ marginLeft: 3 }}>
                    <FaEye
                      onClick={() => toggleShowPassword(2)}
                      cursor="pointer"
                    />
                  </div>
                </div>
              </div>
              <Button onClick={actionChangePassword}>Cambiar contraseña</Button>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Profile;
