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

import { recoverPassword } from "../../../api/user";
// Tell webpack that Button.js uses these styles
const RecoverPassword = () => {
  const history = useHistory();
  //Variables para validar campos vacíos
  const [validated, setValidated] = useState(false);

  const [email, setEmail] = useState("");
  //Fin variables para validar campos vacíos

  const handleRecoverPassword = (event) => {
    event.preventDefault();
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    recoverPassword(email).then((response) => {
      if (response) {
        setEmail('')
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
  };
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
                <Form
                  noValidate
                  validated={validated}
                  onSubmit={handleRecoverPassword}
                >
                  <h4 style={{ color: "#162447" }}>
                    <center>
                      <b>¡No te preocupes!</b>
                    </center>
                  </h4>
                  <font size="3" className="text-muted">
                    <center>Puedes recuperar tu contraseña.</center>
                  </font>
                  <br />
                  <div xs="12" className="mb-3">
                    <label style={{ color: "#3c4b64" }}>
                      <b>Correo electrónico</b>
                    </label>
                    <CInput
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      type="text"
                      autoComplete="email"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Por favor añade el correo electrónico asociado a la cuenta.
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
                            <b>Recuperar contraseña</b>
                          </center>
                        </span>
                      </CButton>
                      <CFormText className="help-block">
                        <font size="2">
                          <a
                            onClick={() => history.push("/login")}
                            style={{ color: "#162447", cursor: "pointer" }}
                          >
                            ¿Deseas regresar al login?
                          </a>
                        </font>
                      </CFormText>
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

export default RecoverPassword;
