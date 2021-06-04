import React, { useState } from "react";

//Librería de componentes bootstrap
import { Form } from "react-bootstrap";

import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

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
import { newPassword } from "src/api/user";

// Tell webpack that Button.js uses these styles
const Reset = (props) => {
  const history = useHistory();
  //Variables para validar campos vacíos
  const [validated, setValidated] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const token = props.match.params.token;

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    newPassword(password, confirmPassword, token).then((response) => {
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
        setTimeout(() => {
          history.push("/login");
        }, 300);
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
                    <center>Añade tu nueva contraseña</center>
                  </font>
                  <br />
                  <div xs="12" className="mb-3">
                    <label style={{ color: "#3c4b64" }}>
                      <b>Nueva contraseña</b>
                    </label>
                    <CInput
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      type="password"
                      autoComplete="password"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Por favor llenar el campo.
                    </Form.Control.Feedback>
                  </div>
                  <div xs="12" className="mb-3">
                    <label style={{ color: "#3c4b64" }}>
                      <b>Confirmar contraseña</b>
                    </label>
                    <CInput
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                      }}
                      type="password"
                      autoComplete="confirmPassword"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Por favor llenar el campo.
                    </Form.Control.Feedback>
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
                            <b>Cambiar</b>
                          </center>
                        </span>
                      </CButton>
                    </CCol>
                  </CRow>
                </Form>
              </CCardBody>
            </CCard>
          </CCol>
          {/* ============================================================== */}
          {/*--- Fin Formulario iniciar sesión ---*/}
          {/* ============================================================== */}
        </CRow>
      </CContainer>
    </div>
  );
};

export default Reset;
