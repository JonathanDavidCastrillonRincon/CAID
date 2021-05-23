//Librería de react
import React from "react";

//Librería del dataTable
import DataTable from "@bit/adeoy.utils.data-table";

//Librería de íconos
import { FaSearch, FaFilePdf, FaEdit, FaUpload } from "react-icons/fa";

//Importar modal subir evidencia
import ModalUpload from "./ModalUpload";

//Librería de componentes de la plantilla
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTooltip,
  CButton,
} from "@coreui/react";
import { getAllActivities } from "src/api/activity";
import moment from "moment";
import { useHistory } from "react-router-dom";

import jsPDF from "jspdf";
import "jspdf-autotable";

const EvidenceUpload = () => {
  const history = useHistory();
  const [activities, setActivities] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [dataByActivity, setDataByActivity] = React.useState("");

  React.useEffect(() => {
    getAllActivity();
  }, []);

  //Para obtener toda las actividades
  const getAllActivity = () => {
    getAllActivities().then((response) => {
      //se guarda para actualizar el estado local de activities
      const data = response.data.data;
      const filterDataByTypeActivity = data.filter(
        (el) => el.activityType === "1"
      );
      setActivities(filterDataByTypeActivity);
    });
  };
  const showCloseModal = (row) => {
    setShowModal(!showModal);
    setDataByActivity(row);
  };
  //Variables que definen los atributos del ecabezado de la tabla

  const columns = [
    {
      title: "Tipo de actividad",
      format: (row) => row.activityType === "1" && "Plan operativo ",
    },
    { title: "Nombre actividad", data: "title" },
    {
      title: "Fecha actividad",
      format: (row) =>
        `${moment(row.initialDate).format("DD/MM/YYYY")} -
        ${moment(row.finalDate).format("DD/MM/YYYY")}`,
    },
    {
      title: "Anéxos",
      format: (row) => (row.file?.filename ? "Si" : "No"),
    },
    {
      title: "Estado actividad",
      format: (row) =>
        row.status === "1" ? "Actividad incumplida" : "Actividad cumplida",
    },
    {
      title: "Evidencia",
      format: (row) => (
        <CTooltip content={`Ver evidencia`} placement="left">
          <CButton
            type="button"
            style={{ color: "black" }}
            className="btn btn-light"
            onClick={() =>
              history.push(`/evidenceUpload/evidenceSee/${row._id}`)
            }
          >
            <FaSearch />
          </CButton>
        </CTooltip>
      ),
    },
    {
      title: "Subir",
      format: (row) => (
        <CTooltip content={`Subir evidencia`} placement="left">
          <CButton
            type="button"
            style={{ color: "black" }}
            className="btn btn-light"
            onClick={() => showCloseModal(row)}
          >
            <FaUpload />
          </CButton>
        </CTooltip>
      ),
    },
  ];

  //Fin variables encabezado
  const modalComponent = (
    <ModalUpload
      show={showModal}
      onClose={showCloseModal}
      data={dataByActivity}
      allActivities={getAllActivity}
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
      "Reporte Evidencia de actividades - " +
      moment(new Date()).format("DD-MM-YYYY");
    const headers = [["Nombre", "Tipo de actividad", "Fecha", "Estado"]];

    const data = activities.map((el) => [
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
    doc.save("reporte_evidencias_actividades.pdf");
  };
  return (
    <>
      {modalComponent}
      <CRow className="justify-content-center">
        {/* ============================================================== */}
        {/*--- Componente de evidencia ---*/}
        {/* ============================================================== */}
        <CCol xs="12">
          <CCard className="shadow">
            <CCardHeader>
              <CRow>
                <div className="col-sm-8 pr-5">
                  <div className="form-row">
                    <div className="col-md-6 mb-3">
                      <h4>Subir evidencia de actividades</h4>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 pr-4">
                  <div style={{ float: "right" }}>
                    <CTooltip
                      content={`Reporte de Actividades`}
                      placement="top"
                    >
                      <CButton variant="outline" color="danger" onClick={print}>
                        <FaFilePdf /> Generar reporte
                      </CButton>
                    </CTooltip>
                  </div>
                </div>
              </CRow>
            </CCardHeader>
          </CCard>
        </CCol>
        <CCol xs="12">
          <CCard className="shadow">
            <CCardBody>
              <DataTable
                data={activities}
                columns={columns}
                hover={true}
                responsive={true}
              />
            </CCardBody>
          </CCard>
        </CCol>
        {/* ============================================================== */}
        {/*--- Fin Componente de evidencia ---*/}
        {/* ============================================================== */}
      </CRow>
    </>
  );
};

export default EvidenceUpload;
