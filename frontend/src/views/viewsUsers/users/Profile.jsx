//Librería de react
import React, { useState } from "react";

//Librería de componentes bootstrap
import { Button, Form } from "react-bootstrap";

//Importar componente alert
import AlertSave from "./AlertSave";

//Librería de componentes de la plantilla
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import moment from "moment";

const CreateUser = () => {
  //get localstorage data user
  const user = JSON.parse(localStorage.getItem("user"))
    ? JSON.parse(localStorage.getItem("user"))
    : "";

  const validateTypeId =
    user.identificationType === "1"
      ? "Cedula"
      : user.identificationType === "2"
      ? "Pasaporte"
      : "Tarjeta ID";

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
      </CCol>
    </CRow>
  );
};

export default CreateUser;
