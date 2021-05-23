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
  //Variables para validar campos vacíos
  const [validated, setValidated] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"))
    ? JSON.parse(localStorage.getItem("user"))
    : "";
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
  //Fin variables para validar campos vacíos

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
        <CCard className="shadow">
          <CCardHeader>
            <h4>Cambiar contraseña</h4>
          </CCardHeader>
          <CCardBody>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="col-md-4 mb-3">
                  <label style={{ color: "#3c4b64" }}>
                    <b>Contraseña actual</b>
                  </label>
                  <label style={{ color: "blue" }}>*</label>
                  <input
                    type="password"
                    id="contrasena"
                    name="contrasena"
                    className="form-control"
                    required
                  />
                  <Form.Control.Feedback>¡Muy bien!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Por favor introduce la contraseña actual.
                  </Form.Control.Feedback>
                </div>
                <div className="col-md-4 mb-3">
                  <label style={{ color: "#3c4b64" }}>
                    <b>Contraseña nueva</b>
                  </label>
                  <label style={{ color: "blue" }}>*</label>
                  <input
                    type="password"
                    id="contrasenaNueva"
                    name="contrasenaNueva"
                    className="form-control"
                    required
                  />
                  <Form.Control.Feedback>¡Muy bien!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Por favor introduce la contraseña nueva.
                  </Form.Control.Feedback>
                </div>
                <div className="col-md-4 mb-3">
                  <label style={{ color: "#3c4b64" }}>
                    <b>Confirmar contraseña</b>
                  </label>
                  <label style={{ color: "blue" }}>*</label>
                  <input
                    type="password"
                    id="contrasenaConfirmar"
                    name="contrasenaConfirmar"
                    className="form-control"
                    required
                  />
                  <Form.Control.Feedback>¡Muy bien!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Por favor confirma la contraseña.
                  </Form.Control.Feedback>
                </div>
              </div>
              <br />
              <div className="col-sm-12 pb-2 pb-lg-0 pr-0">
                <div style={{ float: "right" }}>
                  <div className="btn-group">
                    <Button
                      type="summit"
                      className="btn btn-danger"
                      onClick={() => AlertSave()}
                      style={{
                        background: "#9a1f40",
                        color: "white",
                        width: "160px",
                        margin: "3px",
                      }}
                    >
                      <b>Guardar</b>
                    </Button>
                    <Button
                      shape="pill"
                      variant=""
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.href =
                          "http://localhost:3000/#/calendar";
                      }}
                      className="btn btn-ghost-light"
                      style={{
                        color: "#9a1f40",
                        width: "160px",
                        margin: "3px",
                      }}
                    >
                      <b>Cancelar</b>
                    </Button>
                  </div>
                </div>
              </div>
            </Form>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default CreateUser;
