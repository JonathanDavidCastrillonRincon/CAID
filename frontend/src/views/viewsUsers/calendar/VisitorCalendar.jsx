//Librería de react
import React, { useState } from "react";

//Librería componente de calendario
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
//import { INITIAL_EVENTS, createEventId } from './event-utils'
import { useHistory } from "react-router-dom";

//Librería de iconos
import { FaReply } from "react-icons/fa";

//Librería componentes de la plantilla
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
} from "@coreui/react";
import { getByActivity } from "src/api/activity";

import ModalDetailActivity from "../calendar/ModalDetail";

function VisitorCalendar() {
  const history = useHistory();
  const [activities, setActivities] = useState([]);
  const [activity, setActivity] = useState({});
  const [showModalDetail, setShowModalDetail] = useState(false);

  const activitiesLocalStorage = localStorage.getItem("activities")
    ? JSON.parse(localStorage.getItem("activities"))
    : [];

  const backVisor = () => {
    history.push("/visitorSearch");
    localStorage.removeItem("activities");
  };
  React.useEffect(() => {
    setActivities(activitiesLocalStorage);
  }, []);

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
  const modalDetail = (
    <ModalDetailActivity
      show={showModalDetail}
      data={activity}
      closeModal={closeModal}
      handleDeleteActivity={""}
      handleEditActivity={""}
    />
  );

  return (
    <>
      {modalDetail}
      <CRow className="justify-content-center">
        <CCol className="col-lg-10">
          <br />
          <CCard className="shadow">
            <CCardHeader>
              <CRow>
                <div className="col-sm-8 pr-5">
                  <div className="form-row">
                    <div className="col-md-5 mb-3">
                      <h4>Cronograma de actividades</h4>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 pr-4">
                  <div style={{ float: "right" }}>
                    <CButton
                      variant=""
                      onClick={backVisor}
                      style={{ color: "#9a1f40", width: "160px" }}
                      className="btn btn-outline-light"
                    >
                      <FaReply /> Regresar
                    </CButton>
                  </div>
                </div>
              </CRow>
            </CCardHeader>
          </CCard>
        </CCol>
        <CCol className="col-lg-10">
          <CCard className="shadow">
            <CCardBody>
              {/* ============================================================== */}
              {/*--- Componente de calendario visitante ---*/}
              {/* ============================================================== */}
              <div className="col-lg-12">
                <div className="">
                  <br></br>
                  <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    headerToolbar={{
                      left: "prev,next today",
                      center: "title",
                      right: "dayGridMonth,timeGridWeek,timeGridDay",
                    }}
                    events={activities.map((data) => ({
                      id: data._id,
                      title: data.title,
                      start: data.initialDate,
                      end: data.finalDate,
                    }))}
                    eventClick={clickByEvent}
                    initialView="dayGridMonth"
                    locale="es"
                    editable={true}
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                  />
                </div>
              </div>
              {/* ============================================================== */}
              {/*--- Fin componente de calendario visitante ---*/}
              {/* ============================================================== */}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
}

export default VisitorCalendar;
