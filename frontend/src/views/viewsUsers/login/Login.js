import React, { useState } from "react";

//Librería de componentes bootstrap
import { Form } from "react-bootstrap";

import { useHistory } from "react-router-dom";

import {
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CInput,
  CButton,
  CRow,
  CFormText,
} from "@coreui/react";

import { login } from "../../../api/login";

// Tell webpack that Button.js uses these styles
const Login = () => {
  const history = useHistory();
  //Variables para validar campos vacíos
  const [validated, setValidated] = useState(false);

  const [identification, setIdentification] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    login(identification, password).then((response) => {
      if (response?.status === 200) {
        localStorage.setItem("token", response.data.token);
        window.location.href = "/calendar";
        localStorage.setItem("user", JSON.stringify(response.data.userFound));
      }
    });
  };
  //Fin variables para validar campos vacíos

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          {/* ============================================================== */}
          {/*--- Formulario iniciar sesión ---*/}
          {/* ============================================================== */}
          <div className="col-6">
            <br />
            <br />
            <br />
            <br />
            <font size="7" style={{ color: "#162447" }}>
              <b>CAID</b>
            </font>
            <br />
            <font size="5">
              CAID te ayuda a gestionar y planificar todas las actividades en tú
              labor como docente.
            </font>
          </div>
          <CCol className="col-md-5" md="4">
            <CCard className="shadow p-4">
              <CCardBody>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <h4 style={{ color: "#162447" }}>
                    <center>
                      <b>¡Hola de nuevo!</b>
                    </center>
                  </h4>
                  <font size="3" className="text-muted">
                    <center>Inicia sesión con tu cuenta.</center>
                  </font>
                  <br />
                  <div xs="12" className="mb-3">
                    <label style={{ color: "#3c4b64" }}>
                      <b>Número de identificación</b>
                    </label>
                    <CInput
                      onChange={(e) => {
                        setIdentification(e.target.value);
                      }}
                      type="text"
                      autoComplete="username"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Por favor llenar el campo.
                    </Form.Control.Feedback>
                  </div>
                  <div xs="12" className="mb-3">
                    <label style={{ color: "#3c4b64" }}>
                      <b>Contraseña</b>
                    </label>
                    <CInput
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      type="password"
                      autoComplete="current-password"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Por favor llenar el campo.
                    </Form.Control.Feedback>
                    <CFormText className="help-block">
                      <font size="2">
                        <a
                          onClick={() => history.push("/restorePassword")}
                          style={{ color: "#162447" }}
                        >
                          ¿Olvidaste tu contraseña?
                        </a>
                      </font>
                    </CFormText>
                  </div>
                  <CRow>
                    <CCol xs="12">
                      <CButton
                        type="submit"
                        size="lg"
                        style={{ background: "#9a1f40", color: "white" }}
                        className="btn btn-danger"
                        block
                      >
                        <span className="text">
                          <center>
                            <b>Iniciar sesión</b>
                          </center>
                        </span>
                      </CButton>
                      <CFormText className="help-block">
                        <font size="2">
                          ¿Eres usuario visitante?{" "}
                          <a
                            onClick={() => history.push("/visitorSearch")}
                            style={{ color: "#162447", cursor: "pointer" }}
                          >
                            Acceder
                          </a>
                        </font>
                      </CFormText>
                    </CCol>
                  </CRow>
                </Form>
              </CCardBody>
            </CCard>
            <font size="3">
              <center>
                <b>Asigna</b> tus actividades personales al calendario.
              </center>
            </font>
          </CCol>
          {/* ============================================================== */}
          {/*--- Fin Formulario iniciar sesión ---*/}
          {/* ============================================================== */}
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
