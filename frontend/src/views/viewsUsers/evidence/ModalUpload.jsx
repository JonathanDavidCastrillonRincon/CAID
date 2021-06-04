//Librería de react
import React, { useState } from "react";

//React select
import Select from "react-select";

//Librería de íconos
import { FaUpload, FaAngleDown } from "react-icons/fa";

//Librería de componentes bootstrap
import { Form } from "react-bootstrap";

//Importar componente alert
import AlertSave from "./AlertSave";

//Importar componente lista de asistentes
import AssistantList from "./AssistantList";

//Librería de componentes de la plantilla
import {
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CTooltip,
  CSwitch,
  CFormText,
  CCollapse,
  CButton,
} from "@coreui/react";
import { getAllUser } from "src/api/user";
import { updateActivity, uploadFiles } from "src/api/activity";

const ModalUpload = ({ show, onClose, data, allActivities }) => {
  //Variable para el Card collapse
  const [accordion, setAccordion] = useState(1);
  //FIn variable para el Card collapse
  const [usersResponsable, setUsersResponsable] = useState([]);
  const [usersParticipants, setUsersParticipants] = useState([]);
  const [validated, setValidated] = useState(false);
  const [status, setStatus] = useState("");
  const [filesImages, setFilesImages] = useState("");

  //participants array
  const [participants, setParticipants] = useState([]);

  //Campos form
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
    setStatus(data?.status === "2" ? true : false);
    let dataArray = [];

    getAllUser().then((response) => {
      //Respuesta de la api, se guarda en un constante
      if (response) {
        dataArray = response.data;
        //Data response de los responsable
        const dataResponsible = data?.responsible;
        const dataParticipants = data?.participants;
        const dataListAttendees = data?.listAttendees;
        //Devuelve el array
        const responsableFilter = dataArray?.filter((el) =>
          dataResponsible?.includes(el._id)
        );
        setUsersResponsable(responsableFilter.map((el) => el.name));

        //For participants
        const participantsFilter = dataArray?.filter((el) =>
          dataParticipants?.includes(el._id)
        );
        setUsersParticipants(participantsFilter);

        //For listAttendees
        const listAttendeesFilter = dataArray?.filter((el) =>
          dataListAttendees?.includes(el._id)
        );
        setParticipants(
          listAttendeesFilter.map((el) => ({ label: el.name, value: el._id }))
        );
      }
    });
  };
  const handleChangeFile = (e) => {
    setFilesImages(e.target.files);
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
      responsible: data?.responsible,
      participants: data?.participants,
      activityType: data?.activityType,
      creatorActivity: data?.creatorActivity,
      listAttendees: participants.map((el) => el.value),
      evidence: data?.evidence,
      status: status === true ? "2" : "1",
    };

    //se llama la funcion para guardar img
    handleUpdateFile();
    // Funcion update to api
    updateActivity(idActivity, obj).then((response) => {
      if (response) {
        AlertSave();
        onClose();
        allActivities();
      }
    });
  };
  const handleUpdateFile = () => {
    let formData = new FormData();
    const idActivity = data?._id;

    for (const key of Object.keys(filesImages)) {
      formData.append("evidence", filesImages[key]);
    }
    uploadFiles(formData, idActivity).then((response) => {
      if (response) {
        allActivities();
        setFilesImages([]);
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
    <>
      <div>
        {/* ============================================================== */}
        {/*--- Modal subir evidencia ---*/}
        {/* ============================================================== */}

        <CModal show={show} size="lg">
          <CModalHeader closeButton>
            <CModalTitle>
              Subir evidencia de cumplimiento de actividad
            </CModalTitle>
          </CModalHeader>
          <CModalBody>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <div id="accordion">
                <CButton
                  block
                  color="#3c4b64"
                  className="text-left col-md-12"
                  onClick={() => setAccordion(accordion === 0 ? null : 0)}
                >
                  <h5 className="m-0 p-0">
                    Información de la actividad <FaAngleDown />
                  </h5>
                </CButton>
                <br />
                <CCollapse show={accordion === 0}>
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
                    <div className="col-md-12 mb-3">
                      <label style={{ color: "#3c4b64" }}>
                        <b>Responsable</b>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        disabled
                        value={usersResponsable}
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
                </CCollapse>
              </div>
              <br />
              <div className="form-row">
                <div className="col-md-12 mb-3">
                  <Select
                    closeMenuOnSelect={false}
                    value={participants}
                    onChange={(value) => setParticipants(value)}
                    isMulti
                    options={usersParticipants.map((data) => ({
                      label: data.name,
                      value: data._id,
                    }))}
                    placeholder="Seleccione los asistentes"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="col-md-6 mb-3">
                  <label style={{ color: "#3c4b64" }}>
                    <b>Validar cumplimiento de la actividad</b>
                    <CFormText className="help-block">
                      <i>
                        Selecione si desea validar el cumplimiento de la
                        actividad.
                      </i>
                    </CFormText>
                  </label>
                  <br />
                  <CSwitch
                    className={"mx-1"}
                    variant={"3d"}
                    color={"success"}
                    labelOn={"Si"}
                    labelOff={"No"}
                    value={status}
                    name="status"
                    checked={status}
                    onChange={(e) => setStatus(e.target.checked)}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label style={{ color: "#3c4b64" }}>
                    <b>Añadir evidencia</b>
                  </label>
                  <input
                    type="file"
                    accept="image/png, .jpeg, .jpg, image/gif"
                    multiple
                    onChange={handleChangeFile}
                    style={{ marginBottom: 8 }}
                  />
                  <span style={{ color: "#3c4b64", fontSize: "12px" }}>
                    Subir máximo 10 archivos
                  </span>
                </div>
              </div>
              <div className="form-row">
                <div className="col-md-12 mb-3">
                  <label style={{ color: "#3c4b64" }}>
                    <b>Observaciones de la actividad</b>
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    value={datos.observation}
                    onChange={handleInputChange}
                    name="observation"
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
                      style={{
                        color: "#9a1f40",
                        width: "160px",
                        margin: "3px",
                      }}
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
        {/*--- Fin Modal subir evidencia ---*/}
        {/* ============================================================== */}
      </div>
    </>
  );
};

export default ModalUpload;
