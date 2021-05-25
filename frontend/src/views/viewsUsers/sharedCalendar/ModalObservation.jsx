//Librería de react
import React, { useState } from "react";

//Librería de componentes bootstrap
import { Form } from "react-bootstrap";

//Importar componente alertSave
import AlertSave from "./AlertSave";

//Librería de componentes de la plantilla
import {
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CButton,
} from "@coreui/react";
import { updateActivity } from "src/api/activity";

const ModalObservation = ({ show, onClose, data }) => {
  //Variables para validar campos vacíos
  const [validated, setValidated] = useState(false);

  const [datos, setDatos] = useState({
    title: "",
    workingDay: "",
    grade: "",
    description: "",
    observation: "",
  });

  React.useEffect(() => {
    if (data) loadInfo(data);
  }, [data]);

  //Carga data de la actividad
  const loadInfo = (data) => {
    setDatos({
      title: data?.title,
      workingDay: data?.workingDay,
      grade: data?.grade,
      description: data?.description,
      observation: data?.observation,
    });
  };
  //Onchange para controlar input / select
  const handleInputChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  //submit data
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    const idActivity = data?._id;
    const obj = {
      title: datos.title,
      workingDay: datos.workingDay,
      grade: datos.grade,
      description: datos.description,
      observation: datos.observation,
      initialDate: data?.initialDate,
      finalDate: data?.finalDate,
      activityType: data?.activityType,
      creatorActivity: data?.creatorActivity,
      evidence: data?.evidence,
      participants: data?.participants,
      responsible: data?.responsible,
      status: data?.status,
      visibilityActivity: data?.visibilityActivity,
      file: data?.file,
    };
    //Funcion update to api
    updateActivity(idActivity, obj).then((response) => {
      if (response) {
        AlertSave();
        onClose();
      }
    });
  };

  //Validar por texto by value jornada
  const validatJornada =
    data?.workingDay === "1"
      ? "Mañana"
      : data?.workingDay === "2"
      ? "Tarde"
      : "Noche";

  return (
    <div>
      {/* ============================================================== */}
      {/*--- Modal crear una observación de las actividadades ---*/}
      {/* ============================================================== */}

      <CModal show={show} size="lg">
        <CModalHeader closeButton>
          <CModalTitle>Observación de actividad</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="col-md-12 mb-3">
                <label style={{ color: "#3c4b64" }}>
                  <b>Nombre de la actividad</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  disabled
                  value={datos.title}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="col-md-6 mb-3">
                <label style={{ color: "#3c4b64" }}>
                  <b>Jornada</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  disabled
                  value={validatJornada}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label style={{ color: "#3c4b64" }}>
                  <b>Grado</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  disabled
                  value={datos.grade}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="col-md-12 mb-3">
                <label style={{ color: "#3c4b64" }}>
                  <b>Descripción y objetivos</b>
                </label>
                <textarea
                  type="text"
                  id="descripción"
                  name="descripción"
                  className="form-control"
                  disabled
                  value={datos.description}
                />
              </div>
            </div>
            <hr />
            <div className="form-row">
              <div className="col-md-12 mb-3">
                <label style={{ color: "#3c4b64" }}>
                  <b>Observaciones</b>
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  name="observation"
                  value={datos.observation}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <br />
            <div className="col-sm-12 pb-2 pb-lg-0 pr-0">
              <div style={{ float: "right" }}>
                <div className="btn-group">
                  <CButton
                    type="submit"
                    className="btn btn-danger"
                    style={{
                      background: "#9a1f40",
                      color: "white",
                      width: "160px",
                      margin: "3px",
                    }}
                  >
                    <b>Guardar</b>
                  </CButton>
                  <CButton
                    variant=""
                    onClick={onClose}
                    className="btn btn-ghost-light"
                    style={{ color: "#9a1f40", width: "160px", margin: "3px" }}
                  >
                    <b>Cancelar</b>
                  </CButton>
                </div>
              </div>
            </div>
          </Form>
        </CModalBody>
      </CModal>
      {/* ============================================================== */}
      {/*--- Fin Modal crear una observación de las actividadades ---*/}
      {/* ============================================================== */}
    </div>
  );
};

export default ModalObservation;
