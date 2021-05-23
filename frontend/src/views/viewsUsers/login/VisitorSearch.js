import React, { useState } from "react";

//Librería de componentes bootstrap
import { Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import {
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CButton,
  CRow,
  CFormText,
} from "@coreui/react";
import { getAllActivities } from "src/api/activity";
import VisitorCalendar from "../calendar/VisitorCalendar";
import AlertNoFound from "../calendar/AlertNoFound";

// Tell webpack that Button.js uses these styles
const optionDegrees = [
  { value: "601", label: "601" },
  { value: "602", label: "602" },
  { value: "603", label: "603" },
  { value: "701", label: "701" },
  { value: "702", label: "702" },
  { value: "703", label: "703" },
  { value: "801", label: "801" },
  { value: "802", label: "802" },
  { value: "803", label: "803" },
  { value: "901", label: "901" },
  { value: "902", label: "902" },
  { value: "903", label: "903" },
  { value: "1001", label: "1001" },
  { value: "1002", label: "1002" },
  { value: "1003", label: "1003" },
  { value: "1101", label: "1101" },
  { value: "1102", label: "1102" },
  { value: "1103", label: "1103" },
];
const VisitorSearch = () => {
  const history = useHistory();

  //Variables para validar campos vacíos
  const [validated, setValidated] = useState(false);
  const [workingDay, setWorkingDay] = useState(0);
  const [degrees, setDegrees] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);

    getAllActivities().then((response) => {
      if (response) {
        const data = response?.data.data;
        const filterByWorkingDayAndDegress = data.filter(
          (el) =>
            el.workingDay === workingDay &&
            el.grade.includes(degrees) &&
            el.visibilityActivity === "1" &&
            el.activityType !== "3"
        );
        if (filterByWorkingDayAndDegress.length > 0) {
          window.location.href = "/visitorCalendar";
          localStorage.setItem(
            "activities",
            JSON.stringify(filterByWorkingDayAndDegress)
          );
        } else {
          AlertNoFound();
        }
      }
    });
  };

  //Fin variables para validar campos vacíos
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        {/* ============================================================== */}
        {/*--- Consuultar calendario de actividades visitante ---*/}
        {/* ============================================================== */}
        <CRow className="justify-content-center">
          <CCol className="col-md-5" md="4">
            <CCard className="shadow p-4">
              <CCardBody>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <h4 style={{ color: "#162447" }}>
                    <center>
                      <b>¡Hola estudiante!</b>
                    </center>
                  </h4>
                  <font size="3" className="text-muted">
                    <center>Consulta tu calendario de actividades.</center>
                  </font>
                  <br />
                  <div className="form-row">
                    <div className="col-md-6 mb-3">
                      <label style={{ color: "#3c4b64" }}>
                        <b>Jornada</b>
                      </label>
                      <select
                        name="workingDay"
                        className="form-control"
                        required
                        value={workingDay}
                        onChange={(e) => setWorkingDay(e.target.value)}
                      >
                        <option value={0} disabled selected>
                          Seleccione
                        </option>
                        <option value="1">Mañana</option>
                        <option value="2">Tarde</option>
                        <option value="3">Noche</option>
                      </select>
                      <Form.Control.Feedback>¡Muy bien!</Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">
                        Por favor seleccionar el campo.
                      </Form.Control.Feedback>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label style={{ color: "#3c4b64" }}>
                        <b>Grado</b>
                      </label>
                      <select
                        name="degrees"
                        className="form-control"
                        required
                        value={degrees}
                        onChange={(e) => setDegrees(e.target.value)}
                      >
                        <option value={0} disabled selected>
                          Seleccione
                        </option>
                        {optionDegrees.map((el, i) => {
                          return <option value={el.value}>{el.label}</option>;
                        })}
                      </select>
                      <Form.Control.Feedback>¡Muy bien!</Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">
                        Por favor seleccionar el campo.
                      </Form.Control.Feedback>
                    </div>
                  </div>
                  <br />
                  <CRow>
                    <CCol xs="12">
                      <CButton
                        size="lg"
                        type="submit"
                        style={{ background: "#9a1f40", color: "white" }}
                        className="btn btn-danger"
                        block
                      >
                        <span className="text">
                          <center>
                            <b>Consultar</b>
                          </center>
                        </span>
                      </CButton>
                      <CFormText className="help-block">
                        <font size="2">
                          <a
                            onClick={() => history.push("/login")}
                            style={{ color: "#162447", cursor: "pointer" }}
                          >
                            ¿Tienes un usuario?
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
                <b>Consulta</b> las actividades que tengas asignadas en tu
                curso.
              </center>
            </font>
          </CCol>
        </CRow>
        {/* ============================================================== */}
        {/*--- Consuultar calendario de actividades visitante ---*/}
        {/* ============================================================== */}
      </CContainer>
    </div>
  );
};

export default VisitorSearch;
