//Librería de react
import React from "react";

//Librería del dataTable
import DataTable from "@bit/adeoy.utils.data-table";

//Librería de multiselect
import Select from "react-select";

//Librería de íconos
import { FaEdit } from "react-icons/fa";

//Librería de componentes bootstrap
import { Button } from "react-bootstrap";

//Importar modal generar observación
import ModalObservation from "./ModalObservation";

//Librería de componentes de la plantilla
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CTooltip,
  CFormText,
} from "@coreui/react";
import { getAllActivities } from "src/api/activity";
import moment from "moment";
import { getAllUser } from "src/api/user";

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
const SharedCalendar = () => {
  const [activities, setActivities] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [dataByActivity, setDataByActivity] = React.useState("");
  const [valueStamento, setValueStamento] = React.useState("");
  const [valueRole, setValueRole] = React.useState("");
  const [users, setUsers] = React.useState([]);

  const userId = JSON.parse(localStorage.getItem("user"))
    ? JSON.parse(localStorage.getItem("user"))._id
    : "";

  const clearFilter = () => {
    setValueStamento("");
    setValueRole("");
    setActivities([]);
  };
  const showCloseModal = (row) => {
    setShowModal(!showModal);
    setDataByActivity(row);
  };
  //Accion para que se muestre los usuarios por role
  const filterByRole = (value) => {
    let valueSelect = value.value;
    setValueRole(value);
    getAllUser().then((response) => {
      //Respuesta de la api, se guarda en un constante
      const data = response.data;
      //Se filtra la data obtenida de la respuesta para que devuelva el array si el rol coincide con el value que se obtiene
      //desde el select labor - rol
      const dataFilter = data.filter(
        (user) => user.role.includes(valueSelect) && user._id !== userId
      );
      //Se guarda en el estado de user filter para poder mostrar la lista en el select responsible
      setUsers(dataFilter);
      setValueStamento("");
    });
  };
  //Fin

  const handleFilterStamento = (value) => {
    setValueStamento(value);
    let valueSelect = value.value;
    getAllActivities().then((response) => {
      //se guarda para actualizar el estado local de activities
      const data = response.data.data;
      const filterDataActivityByUser = data.filter(
        (el) =>
          el.creatorActivity === valueSelect &&
          el.activityType !== "1" &&
          el.visibilityActivity !== "2"
      );
      setActivities(filterDataActivityByUser);
    });
  };
  //Variables que definen los atributos del ecabezado de la tabla
  const columns = [
    {
      title: "Tipo de actividad",
      format: (row) =>
        row.activityType === "1"
          ? "Plan operativo "
          : row.activityType === "2"
          ? "Actividad académica"
          : "Actividad personal",
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
      format: (row) => (row.file.filename ? "Si" : "No"),
    },
    {
      title: "Acciones",
      format: (row) => (
        <CTooltip content={`Generar Observación`} placement="left">
          <CButton
            type="button"
            style={{ color: "black" }}
            className="btn btn-light"
            onClick={() => showCloseModal(row)}
          >
            <FaEdit />
          </CButton>
        </CTooltip>
      ),
    },
  ];
  //Fin variables encabezado
  const modalComponent = (
    <ModalObservation
      show={showModal}
      onClose={showCloseModal}
      data={dataByActivity}
    />
  );
  return (
    <>
      {modalComponent}
      <CRow>
        {/* ============================================================== */}
        {/*--- Componente de calendarios compartidos ---*/}
        {/* ============================================================== */}
        <CCol xs="12">
          <CCard className="shadow">
            <CCardHeader>
              <h4>Actividades públicas</h4>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <div className="col-sm-9 pb-2 pb-lg-0 pr-0">
                  <div className="form-row">
                    <div className="col-md-5">
                      <label style={{ color: "#3c4b64" }}>
                        <b>Rol</b>
                      </label>
                      <Select
                        options={roles}
                        placeholder="Seleccionar el rol"
                        onChange={filterByRole}
                        value={valueRole}
                        className="form-control-warning"
                      />
                      <CFormText className="help-block">
                        Por favor selecciona un rol de usuario
                      </CFormText>
                    </div>
                    <div className="col-md-5">
                      <label style={{ color: "#3c4b64" }}>
                        <b>Seleccionar estamento</b>
                      </label>
                      <Select
                        value={valueStamento}
                        onChange={handleFilterStamento}
                        options={users.map((data) => ({
                          label: data.name,
                          value: data._id,
                        }))}
                        placeholder="Seleccione estamento"
                      />
                      <CFormText className="help-block">
                        Por favor selecciona un stamento
                      </CFormText>
                    </div>
                    <div
                      className="col-md-2"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <Button onClick={clearFilter}>Limpiar filtro</Button>
                    </div>
                  </div>
                </div>
              </CRow>
            </CCardBody>
          </CCard>
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
        {/*--- Fin Componente de calendarios compartidos ---*/}
        {/* ============================================================== */}
      </CRow>
    </>
  );
};

export default SharedCalendar;
