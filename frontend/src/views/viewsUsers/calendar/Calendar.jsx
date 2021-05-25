//Librería de react
import React, { useState } from "react";

//Librería de íconos
import {
  FaFilePdf,
  FaPlus,
  FaExclamationTriangle,
  FaCircle,
} from "react-icons/fa";

//Librería componente de calendario
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";

//Importar modal nueva actividad
import ModalActivity from "./ModalActivity";
import ModalDetailActivity from "./ModalDetail";

//Importar componente de timeLine
import TimeLine from "./TimeLine";

//Librería de componentes bootstrap
import { Tab, Tabs } from "react-bootstrap";

//Librería para formatear fechas
import moment from "moment";

//Librería componentes de la plantilla
import { CCard, CCardBody, CCol, CRow, CTooltip, CButton } from "@coreui/react";
import {
  getAllActivities,
  getByActivity,
  deleteActivity,
} from "src/api/activity";

import jsPDF from "jspdf";
import "jspdf-autotable";

export default function Calendar() {
  const [showModal, setShowModal] = useState(false);
  const [showModalDetail, setShowModalDetail] = useState(false);
  const [activities, setActivities] = useState([]);
  const [allActivities, setAllActivities] = useState([]);
  const [activity, setActivity] = useState({});

  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  //const isRoleTeacher = user.role.includes("teacher");
  const isRoleAdmin = user.role.includes("admin");
  const isRoleCommittee = user.role.includes("committee");
  const isRoleHeadofarea = user.role.includes("headofarea");
  //Accion para mostrar modal de crear actividad
  const showCloseModal = () => {
    setShowModal(!showModal);
    setActivity("");
  };

  //Para obtener toda las actividades
  const getAllActivity = () => {
    getAllActivities().then((response) => {
      //se guarda para actualizar el estado local de activities
      if (response) {
        const data = response?.data?.data;

        const dataFilter = data.filter((el) => {
          if (el.creatorActivity === user._id && el.status) {
            return el;
          } else if (el.visibilityActivity === "1" && el.activityType === "1") {
            return el;
          } else if (
            el.participants?.includes(user._id) &&
            el.visibilityActivity === "1" &&
            el.activityType === "1"
          ) {
            return el;
          }
        });
        setActivities(dataFilter);
        setAllActivities(data);
      }
    });
  };

  const clickByEvent = ({ event }) => {
    setShowModalDetail(true);

    getByActivity(event._def.publicId).then((response) => {
      //se guarda para actualizar el estado local de activity
      if (response) {
        setActivity(response?.data?.data);
      }
    });
  };
  const closeModal = () => {
    setShowModalDetail(false);
  };
  React.useEffect(() => {
    getAllActivity();
  }, []);

  const handleDeleteActivity = (id) => {
    deleteActivity(id).then((response) => {
      if (response) {
        getAllActivity();
        closeModal();
      }
    });
  };

  const handleEditActivity = (id) => {
    if (id) {
      closeModal();
      setShowModal(true);
      getByActivity(id).then((response) => {
        //se guarda para actualizar el estado local de activity
        if (response) {
          setActivity(response?.data?.data);
        }
      });
    }
  };

  const modal = (
    <ModalActivity
      show={showModal}
      onClose={showCloseModal}
      allActivities={getAllActivity}
      dataByActivity={activity}
    />
  );

  const modalDetail = (
    <ModalDetailActivity
      show={showModalDetail}
      data={activity}
      closeModal={closeModal}
      handleDeleteActivity={(t) => handleDeleteActivity(t)}
      handleEditActivity={(t) => handleEditActivity(t)}
    />
  );

  const print = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title =
      "Reporte de actividades - " + moment(new Date()).format("DD-MM-YYYY");
    const headers = [["Nombre", "Tipo de actividad", "Fecha", "Estado"]];

    const dataFilter = allActivities.filter((el) => el.activityType === "1");
    const data = dataFilter.map((el) => [
      el.title,
      el.activityType === "1"
        ? "Plan operativo"
        : el.activityType === "2"
        ? "Actvidad académica"
        : "Actividad personal",
      `${moment(el.initialDate).format("DD-MM-YYYY")}-${moment(
        el.finalDate
      ).format("DD-MM-YYYY")}`,
      el.status === "1" ? "Actividad Incumplida" : "Actividad Cumplida",
    ]);

    let content = {
      startY: 50,
      head: headers,
      body: data,
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("reporte_actividades.pdf");
  };
  const renderEventContent = (eventInfo) => {
    const isExistObservation = eventInfo.event.extendedProps.observation;
    return (
      <>
        &nbsp;
        {isExistObservation && (
          <span style={{ color: "#F7DC6F" }}>
            <FaCircle />-
          </span>
        )}
        <b style={{}}>{eventInfo.timeText}</b>
        &nbsp;
        <span style={{}}>{eventInfo.event.title}</span>
        &nbsp;
        {isExistObservation && (
          <span style={{ color: "#F7DC6F" }}>
            <FaExclamationTriangle />
          </span>
        )}
      </>
    );
  };
  return (
    <>
      {modal}
      {modalDetail}
      <CRow>
        <CCol xs="12">
          <CCard className="shadow py-3">
            <CCardBody>
              <Tabs
                defaultActiveKey="calendar"
                transition={false}
                id="noanim-tab-example"
              >
                {/* ============================================================== */}
                {/*--- Inicio componente de calendario ---*/}
                {/* ============================================================== */}
                <Tab eventKey="calendar" title="Calendario">
                  <CRow>
                    {/* ============================================================== */}
                    {/*--- Botones superiores del componente de calendario ---*/}
                    {/* ============================================================== */}
                    <div className="col-sm-12 pb-2 pb-lg-0 pr-4">
                      <br />
                      <div style={{ float: "right" }}>
                        <div className="btn-group">
                          {(isRoleAdmin === true ||
                            isRoleHeadofarea === true ||
                            isRoleCommittee === true) && (
                            <div>
                              <CTooltip
                                content={`Reporte de Actividades`}
                                placement="top"
                              >
                                <CButton
                                  variant="outline"
                                  color="danger"
                                  style={{ margin: "3px" }}
                                  onClick={print}
                                >
                                  <FaFilePdf /> Generar reporte
                                </CButton>
                              </CTooltip>
                            </div>
                          )}
                          <div>
                            <CTooltip
                              content={`Nueva Actividad`}
                              placement="top"
                            >
                              <CButton
                                className="btn btn-danger"
                                style={{
                                  background: "#9a1f40",
                                  color: "white",
                                  margin: "3px",
                                }}
                                onClick={showCloseModal}
                              >
                                <FaPlus /> Crear
                              </CButton>
                            </CTooltip>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CRow>
                  <div className="col-lg-12">
                    <div className="">
                      <br></br>
                      <FullCalendar
                        plugins={[
                          dayGridPlugin,
                          timeGridPlugin,
                          interactionPlugin,
                        ]}
                        events={activities.map((data) => ({
                          id: data._id,
                          title: data.title,
                          start: data.initialDate,
                          end: data.finalDate,
                          observation: data.observation,
                        }))}
                        headerToolbar={{
                          left: "prev,next today",
                          center: "title",
                          right: "dayGridMonth,timeGridWeek,timeGridDay",
                        }}
                        initialView="dayGridMonth"
                        locale="es"
                        editable={true}
                        selectable={false}
                        selectMirror={true}
                        dayMaxEvents={true}
                        eventClick={clickByEvent}
                        Updated
                        upstream
                        eventDrop={function ({ event }) {
                          console.log(event._instance.range);
                        }}
                        droppable={true}
                        Stashed
                        changes
                        eventContent={renderEventContent}
                      />
                    </div>
                  </div>
                </Tab>
                {/* ============================================================== */}
                {/*--- Fin componente de calendario ---*/}
                {/* ============================================================== */}

                {/* ============================================================== */}
                {/*--- Inicio componente de timLine ---*/}
                {/* ============================================================== */}
                <Tab
                  eventKey="timeLine"
                  title="Linea de tiempo"
                  style={{ background: "#ebedefd6" }}
                >
                  <TimeLine data={activities} />
                </Tab>
                {/* ============================================================== */}
                {/*--- Fin componente de timeLine ---*/}
                {/* ============================================================== */}
              </Tabs>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
}
