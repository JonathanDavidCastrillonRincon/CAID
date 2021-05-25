//Librería de react
import React, { useState } from "react";

//Librería de íconos
import { FaAngleDown } from "react-icons/fa";

//Librería de componentes bootstrap
import { Form } from "react-bootstrap";

//Librería de galería
import Gallery from "react-grid-gallery";

//Librería de componentes de la plantilla
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CListGroupItem,
  CListGroup,
  CBadge,
  CCollapse,
  CButton,
} from "@coreui/react";
import { getByActivity, getFileEvidence } from "src/api/activity";
import { getAllUser } from "src/api/user";

const EvidenceSee = (props) => {
  //Variable para el Card collapse
  const [accordion, setAccordion] = useState(1);
  //FIn variable para el Card collapse

  const [dataByActivity, setDataByActivity] = useState(1);
  const [usersResponsable, setUsersResponsable] = useState([]);
  const [usersParticipants, setUsersParticipants] = useState([]);
  const [srcEvidence, setSrcEvidence] = useState([]);

  const idParamsActivity = props.match.params.id;

  React.useEffect(() => {
    getActivity();
    allUsers();
  }, [dataByActivity]);

  const getActivity = () => {
    getByActivity(idParamsActivity).then((response) => {
      if (response) {
        setDataByActivity(response.data.data);
        const evidence = response?.data?.data?.evidence;
        const dataEvidence = evidence?.map((el) => {
          return getFileEvidence(el.filename).then((response) => {
            let data = [];
            if (response) {
              return (data = {
                src: `${response?.config?.baseURL}${response?.config?.url}`,
                thumbnail: `${response?.config?.baseURL}${response?.config?.url}`,
                thumbnailWidth: 320,
                thumbnailHeight: 212,
              });
            } else {
              return [];
            }
          });
        });
        if (dataEvidence !== undefined) {
          Promise.all(dataEvidence).then((values) => {
            setSrcEvidence(values);
          });
        }
      }
    });
  };

  const allUsers = () => {
    let dataArray = [];
    getAllUser().then((response) => {
      //Respuesta de la api, se guarda en un constante
      if (response) {
        dataArray = response.data;
        //Data response de los responsable
        const dataResponsible = dataByActivity?.responsible;
        const dataParticipants = dataByActivity?.listAttendees;
        //Devuelve el array
        const responsableFilter = dataArray?.filter((el) =>
          dataResponsible?.includes(el._id)
        );
        setUsersResponsable(responsableFilter.map((el) => el.name));

        //For participants
        const participantsFilter = dataArray?.filter((el) =>
          dataParticipants?.includes(el._id)
        );
        setUsersParticipants(
          participantsFilter.map((el) => ({ label: el.name, value: el._id }))
        );
      }
    });
  };
  //Validar por texto by value jornada
  const validatJornada =
    dataByActivity?.workingDay === "1"
      ? "Mañana"
      : dataByActivity?.workingDay === "2"
      ? "Tarde"
      : "Noche";

  const validatStatus =
    dataByActivity?.status === "2" ? "Cumplida" : "Incumplida";

  return (
    <CRow>
      {/* ============================================================== */}
      {/*--- Componente de ver evidencia ---*/}
      {/* ============================================================== */}
      <CCol xs="12">
        <CCard className="shadow">
          <div id="accordion">
            <CButton
              block
              color="#3c4b64"
              className="text-left col-md-12"
              onClick={() => setAccordion(accordion === 0 ? null : 0)}
            >
              <h4 className="m-0 p-0">
                Información de la actividad <FaAngleDown />
              </h4>
              <hr />
            </CButton>
            <CCardBody>
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
                      value={dataByActivity.title}
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
                      value={dataByActivity.grade}
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
                      value={dataByActivity.description}
                    />
                  </div>
                </div>
              </CCollapse>
            </CCardBody>
          </div>
        </CCard>
      </CCol>
      <CCol xs="12">
        <CCard className="shadow">
          <CCardHeader>
            <h4>Evidencia de la actividad</h4>
          </CCardHeader>
          <CCardBody>
            <Form>
              <div className="form-row">
                <div className="col-md-12 mb-3">
                  <CListGroup>
                    <CListGroupItem className="justify-content-between">
                      <b>Lista de asistentes</b>{" "}
                      <CBadge className="mr-1" color="success">
                        {usersParticipants.length}
                      </CBadge>
                    </CListGroupItem>
                    {usersParticipants.map((el) => {
                      return (
                        <CListGroupItem className="justify-content-between">
                          {el.label}
                        </CListGroupItem>
                      );
                    })}
                  </CListGroup>
                </div>
              </div>
              <br />
              <div className="form-row">
                <div className="col-md-6 mb-3">
                  <label style={{ color: "#3c4b64" }}>
                    <b>Estado de la actividad</b>
                  </label>
                  <p>{validatStatus}</p>
                </div>
                <div className="col-md-6 mb-3">
                  <label style={{ color: "#3c4b64" }}>
                    <b>Observaciones</b>
                  </label>
                  <textarea
                    type="text"
                    id="observaciones"
                    name="observaciones"
                    className="form-control"
                    disabled
                    value={dataByActivity.observation}
                  />
                </div>
              </div>
            </Form>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs="12">
        <CCard className="shadow">
          <CCardHeader>
            <h4>Imágenes de evidencia</h4>
          </CCardHeader>
          <CCardBody>
            <Gallery images={srcEvidence} />
          </CCardBody>
          <br />
          <div className="col-sm-12 pb-2 pb-lg-0 pr-3">
            <div style={{ float: "right" }}>
              <div className="btn-group">
                <a
                  variant=""
                  className="btn btn-outline-light"
                  href="javascript:history.back()"
                  style={{ color: "#9a1f40", width: "160px", margin: "3px" }}
                >
                  <b>Regresar</b>
                </a>
              </div>
            </div>
          </div>
          <br />
        </CCard>
      </CCol>
      {/* ============================================================== */}
      {/*--- Fin Componente de ver evidencia ---*/}
      {/* ============================================================== */}
    </CRow>
  );
};

export default EvidenceSee;
