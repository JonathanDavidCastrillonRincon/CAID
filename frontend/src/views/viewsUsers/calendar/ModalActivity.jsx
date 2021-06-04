//Librería de react
import React, { useState } from "react";
//Librería de íconos
import { FaAngleDown } from "react-icons/fa";

//Librería de componentes bootstrap
import { Form } from "react-bootstrap";

import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

//Librería de multiselect
import Select from "react-select";
import makeAnimated from "react-select/animated";

//Importar componente AlertSave
import AlertSave from "./AlertSave";
import { Modal } from "react-bootstrap";

import { CButton, CRow, CCollapse } from "@coreui/react";
import { getAllUser } from "src/api/user";
import {
  createActivity,
  getFile,
  updateActivity,
  updateFile,
} from "src/api/activity";

import moment from "moment";

const roles = [
  {
    label: "Directivo",
    value: "admin",
  },
  {
    label: "Jefe de área",
    value: "headofarea",
  },
  {
    label: "Represetante de comité",
    value: "committee",
  },
  {
    label: "Docente",
    value: "teacher",
  },
];

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
export default function ModalActivity(props) {
  //Props recibidas
  const { show, onClose, allActivities, dataByActivity } = props;

  const [validated, setValidated] = useState(false);

  //estado campo usersResponsable y usersParticipants son para los select de tipo responsible y participantes para mostrar la lista
  const [usersResponsable, setUsersResponsable] = useState([]);
  const [usersParticipants, setUsersParticipants] = useState([]);
  //estado campo valueRol y valueRolParticipants son para los select de tipo responsible y participantes
  const [valueRol, setValueRole] = useState("0");
  const [valueRolParticipants, setValueRoleParticipants] = useState("0");

  //Fecha de inicio
  const [initialDate, setInitial] = useState(new Date());
  //Fecha de final
  const [finalDate, setFinal] = useState(new Date());

  //Responsables array
  const [responsible, setResponsable] = useState([]);
  //participants array
  const [participants, setParticipants] = useState([]);
  //grados array
  const [grade, setGrade] = useState([]);

  //Document
  const [fileDocument, setFileDocument] = useState("");
  const [downloadFile, setDownloadFile] = useState("");

  //Role del usuario logueado obtenido del localstorage
  const userRole = JSON.parse(localStorage.getItem("user"))
    ? JSON.parse(localStorage.getItem("user")).role
    : "";

  const userId = JSON.parse(localStorage.getItem("user"))
    ? JSON.parse(localStorage.getItem("user"))._id
    : "";

  const validateTypeActivityByRole = userRole.includes("admin");

  const [datos, setDatos] = useState({
    title: "",
    workingDay: "",
    activityType: validateTypeActivityByRole === true ? "1" : "2",
    description: "",
    status: "1",
    visibilityActivity: "1",
  });

  React.useEffect(() => {
    dataByActivity ? loadInfoActivity(dataByActivity) : loadDefault();
  }, [dataByActivity]);

  //Carga la vacio en los inputs y select
  const loadDefault = () => {
    setDatos({
      title: "",
      workingDay: "",
      activityType: validateTypeActivityByRole === true ? "1" : "2",
      description: "",
      status: "1",
      visibilityActivity: "1",
    });
    setInitial(new Date());
    setFinal(new Date());
    setResponsable([]);
    setParticipants([]);
    setGrade([]);
  };

  //Carga la info en los inputs y select de la actividad
  const loadInfoActivity = (dataByActivity) => {
    setDatos({
      title: dataByActivity?.title,
      workingDay: dataByActivity?.workingDay,
      activityType: dataByActivity?.activityType,
      description: dataByActivity?.description,
      status: dataByActivity?.status,
      visibilityActivity: dataByActivity?.visibilityActivity,
    });

    setInitial(moment(dataByActivity?.initialDate).format("MM/DD/YYYY HH:mm"));
    setFinal(moment(dataByActivity?.finalDate).format("MM/DD/YYYY HH:mm"));

    const file = dataByActivity?.file?.filename;
    if (file) {
      getFile(file).then((response) => {
        setDownloadFile(`${response?.config?.baseURL}${response?.config?.url}`);
      });
    }
    //Se recorre el array que se obtiene para mostrar value en el select
    const gradeFilter = dataByActivity?.grade?.map((el) => ({
      label: el,
      value: el,
    }));
    setGrade(gradeFilter);

    let data = [];
    getAllUser().then((response) => {
      //Respuesta de la api, se guarda en un constante
      if (response) {
        data = response.data;
        //Data response de los responsable
        const dataResponsible = dataByActivity?.responsible;
        const dataParticipants = dataByActivity?.participants;
        //Se filtra y con el includes se verifica si existe un id que coincida, si hay uno o varios true
        //Devuelve el array
        const responsableFilter = data?.filter((el) =>
          dataResponsible?.includes(el._id)
        );
        setResponsable(
          responsableFilter.map((el) => ({ label: el.name, value: el._id }))
        );
        //For participants
        const participantsFilter = data?.filter((el) =>
          dataParticipants?.includes(el._id)
        );
        setParticipants(
          participantsFilter.map((el) => ({ label: el.name, value: el._id }))
        );
      }
    });
  };

  //Funcion para enviar data
  const onSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    let formData = new FormData();

    formData.append("title", datos.title);
    formData.append("activityType", datos.activityType);
    formData.append("initialDate", initialDate);
    formData.append("finalDate", finalDate);
    formData.append(
      "responsible",
      responsible.map((el) => el.value)
    );
    formData.append(
      "participants",
      participants.map((el) => el.value)
    );
    formData.append("workingDay", datos.workingDay);
    formData.append(
      "grade",
      grade.map((el) => el.value)
    );
    formData.append("description", datos.description);
    formData.append("visibilityActivity", datos.visibilityActivity);
    formData.append("file", fileDocument);
    formData.append("status", datos.status);
    formData.append("observation", "");
    formData.append("evidence", "");
    formData.append("creatorActivity", userId);

    const obj = {
      ...datos,
      grade: grade.map((el) => el.value),
      participants: participants.map((el) => el.value),
      responsible: responsible.map((el) => el.value),
      initialDate,
      finalDate,
      creatorActivity: userId,
    };

    //Funcion para enviar data a la api
    const idActivity = dataByActivity?._id;
    if (datos.title !== "") {
      if (dataByActivity) {
        updateActivity(idActivity, obj).then((response) => {
          if (response) {
            onClose();
            AlertSave();
            allActivities();
          }
        });
        handleUpdateFile();
      } else {
        createActivity(formData).then((response) => {
          if (response) {
            onClose();
            AlertSave();
            allActivities();
            setInitial(new Date());
            setFinal(new Date());
            setResponsable([]);
            setParticipants([]);
            setGrade([]);
            setDownloadFile("");
            setFileDocument("");
            setDatos({
              title: "",
              workingDay: "",
              activityType: "",
              description: "",
              status: "1",
              visibilityActivity: "",
            });
          }
        });
      }
    }
  };

  const handleUpdateFile = () => {
    let formData = new FormData();
    const idActivity = dataByActivity?._id;
    formData.append("file", fileDocument);

    updateFile(formData, idActivity).then((response) => {
      if (response) {
        allActivities();
        setFileDocument("");
      }
    });
  };

  //Accion para que se muestre los usuarios por role
  const filterByRole = (e, action) => {
    let value = e.target.value;
    if (action === 1) {
      setValueRole(value);
      getAllUser().then((response) => {
        //Respuesta de la api, se guarda en un constante
        const data = response.data;
        //Se filtra la data obtenida de la respuesta para que devuelva el array si el rol coincide con el value que se obtiene
        //desde el select labor - rol
        const dataFilter = data.filter((user) => user.role.includes(value));
        //Se guarda en el estado de user filter para poder mostrar la lista en el select responsible
        setUsersResponsable(dataFilter);
      });
    } else {
      setValueRoleParticipants(value);
      getAllUser().then((response) => {
        //Respuesta de la api, se guarda en un constante
        const data = response.data;
        //Se filtra la data obtenida de la respuesta para que devuelva el array si el rol coincide con el value que se obtiene
        //desde el select labor - rol
        const dataFilter = data.filter((user) => user.role.includes(value));
        //Se guarda en el estado de user filter para poder mostrar la lista en el select participantes
        setUsersParticipants(dataFilter);
      });
    }
  };
  //Onchange para controlar input / select
  const handleInputChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  //Onchange file
  const handleChangeFile = (e) => {
    setFileDocument(e.target.files[0]);
  };
  //Animación multiselect
  const animatedComponents = makeAnimated();
  //fin

  //Variable para el Card collapse
  const [accordion, setAccordion] = useState(1);
  //FIn variable para el Card collapse

  return (
    <CRow>
      {/* ============================================================== */}
      {/*--- Modal crear nueva actividad ---*/}
      {/* ============================================================== */}
      <Modal show={show} onHide={onClose} size={"lg"}>
        <Modal.Header closeButton>
          <Modal.Title>
            {dataByActivity ? "Editar" : "Nueva"} actividad
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <Form noValidate validated={validated} onSubmit={(e) => onSubmit(e)}>
            <div className="form-row">
              <div className="col-md-6 mb-3">
                <label style={{ color: "#3c4b64" }}>
                  <b>Tipo de actividad</b>
                </label>
                <select
                  className="form-control"
                  value={datos.activityType}
                  name="activityType"
                  onChange={handleInputChange}
                  required
                  disabled={dataByActivity && "disabled"}
                >
                  {validateTypeActivityByRole === true && (
                    <option value={"1"}>Plan operativo</option>
                  )}

                  <option value={"2"}>Actividad académica</option>
                  <option value={"3"}>Actividad Personal</option>
                </select>
                <Form.Control.Feedback>¡Muy bien!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Por favor seleccione el tipo de actividad.
                </Form.Control.Feedback>
              </div>
              <div className="col-md-6 mb-3">
                <label style={{ color: "#3c4b64" }}>
                  <b>Nombre de la actividad</b>
                </label>
                <input
                  value={datos.title}
                  name="title"
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
                <Form.Control.Feedback>¡Muy bien!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Por favor llenar el campo con el nombre de la actividad.
                </Form.Control.Feedback>
              </div>
            </div>
            <div className="form-row">
              <div className="col-md-6 mb-3">
                <label style={{ color: "#3c4b64" }}>
                  <b>Fecha inicio</b>
                </label>
                <Datetime
                  value={initialDate}
                  dateFormat="DD/MM/YYYY"
                  onChange={(date) => setInitial(date)}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label style={{ color: "#3c4b64" }}>
                  <b>Fecha final</b>
                </label>
                <Datetime
                  value={finalDate}
                  dateFormat="DD/MM/YYYY"
                  onChange={(date) => setFinal(date)}
                />
              </div>
            </div>
            {datos.activityType === "1" && (
              <>
                <div className="form-row">
                  <div className="col-md-6 mb-3">
                    <label style={{ color: "#3c4b64" }}>
                      <b>Tipo de responsable</b>
                    </label>
                    <select
                      className="form-control"
                      onChange={(e) => filterByRole(e, 1)}
                      className="form-control"
                      value={valueRol}
                    >
                      <option value="0">Seleccionar</option>
                      {roles.map((role, i) => {
                        return (
                          <option key={i} value={role.value}>
                            {role.label}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label style={{ color: "#3c4b64" }}>
                      <b>Responsables</b>
                    </label>
                    <Select
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      value={responsible}
                      onChange={(value) => setResponsable(value)}
                      isMulti
                      options={usersResponsable.map((data) => ({
                        label: data.name,
                        value: data._id,
                      }))}
                      placeholder="Seleccione los responsables"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="col-md-6 mb-3">
                    <label style={{ color: "#3c4b64" }}>
                      <b>Tipo de participantes</b>
                    </label>
                    <select
                      className="form-control"
                      onChange={(e) => filterByRole(e, 2)}
                      className="form-control"
                      value={valueRolParticipants}
                    >
                      <option value="0" disabled>
                        Seleccionar
                      </option>
                      {roles.map((role, i) => {
                        return (
                          <option key={i} value={role.value}>
                            {role.label}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label style={{ color: "#3c4b64" }}>
                      <b>Participantes</b>
                    </label>
                    <Select
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      value={participants}
                      onChange={(value) => setParticipants(value)}
                      isMulti
                      options={usersParticipants.map((data) => ({
                        label: data.name,
                        value: data._id,
                      }))}
                      placeholder="Seleccione los participantes"
                    />
                  </div>
                </div>
              </>
            )}
            {datos.activityType !== "3" && (
              <>
                {" "}
                <div className="form-row">
                  <div className="col-md-6 mb-3">
                    <label style={{ color: "#3c4b64" }}>
                      <b>Jornada</b>
                    </label>
                    <select
                      name="workingDay"
                      className="form-control"
                      value={datos.workingDay}
                      onChange={handleInputChange}
                    >
                      <option value="" disabled>
                        Seleccionar el tipo
                      </option>
                      <option value="1">Mañana</option>
                      <option value="2">Tarde</option>
                      <option value="3">Noche</option>
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label style={{ color: "#3c4b64" }}>
                      <b>Grados</b>
                    </label>
                    <Select
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      isMulti
                      options={optionDegrees}
                      value={grade}
                      onChange={(value) => setGrade(value)}
                      placeholder="Seleccione los grados"
                    />
                  </div>
                </div>
              </>
            )}

            <hr />
            <div id="accordion">
              <CButton
                block
                color="#3c4b64"
                className="text-left col-md-12"
                onClick={() => setAccordion(accordion === 0 ? null : 0)}
              >
                <h6 className="m-0 p-0">
                  Datos adicionales <FaAngleDown />
                </h6>
              </CButton>
              <br />
              <CCollapse show={accordion === 0}>
                <div className="form-row">
                  <div className="col-md-12 mb-3">
                    <label style={{ color: "#3c4b64" }}>
                      <b>Descripción y objetivos</b>
                    </label>
                    <textarea
                      type="text"
                      name="description"
                      className="form-control"
                      value={datos.description}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="col-md-6 mb-3">
                    <label style={{ color: "#3c4b64" }}>
                      <b>Importar documento</b>
                    </label>
                    <input
                      type="file"
                      name="fileDocument"
                      className="form-control"
                      onChange={handleChangeFile}
                    />
                    <br />

                    {dataByActivity?._id && (
                      <>
                        {dataByActivity?.file !== null &&
                          dataByActivity?.file !== "null" && (
                            <a href={downloadFile} download target="_blank">
                              Descargar archivo
                            </a>
                          )}
                      </>
                    )}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label style={{ color: "#3c4b64" }}>
                      <b>Visibilidad de actividad</b>
                    </label>
                    <select
                      name="visibilityActivity"
                      className="form-control"
                      value={datos.visibilityActivity}
                      onChange={handleInputChange}
                    >
                      <option value="1">Público</option>
                      <option value="2">Privado</option>
                    </select>
                  </div>
                </div>
              </CCollapse>
              <hr />
            </div>
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
        </Modal.Body>
      </Modal>

      {/* ============================================================== */}
      {/*--- Fin Modal crear nueva actividad ---*/}
      {/* ============================================================== */}
    </CRow>
  );
}
