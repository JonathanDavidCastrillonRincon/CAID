//Librería de react
import React, { useState, useEffect } from "react";

//Librería del dataTable
import DataTable from "@bit/adeoy.utils.data-table";

//Librería de íconos
import { FaEdit, FaUserPlus, FaUserSlash } from "react-icons/fa";

//Librería de componentes bootstrap
import { Button } from "react-bootstrap";

//Importar modal desactivar usuario
import ModalUnactive from "./ModalUnactive";

//Librería de componentes de la plantilla
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTooltip,
  CBadge,
} from "@coreui/react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { getAllUser, changeStatus } from "src/api/user";

const Users = () => {
  const history = useHistory();

  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [dataByUser, setDataByUser] = useState("");

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = () => {
    getAllUser()
      .then((response) => {
        if (response) {
          setUsers(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const showCloseModal = (row) => {
    setShowModal(!showModal);
    setDataByUser(row);
  };

  const handleChangeStatus = () => {
    const data = dataByUser;
    const status = data.status === false ? true : false;
    changeStatus(data._id, status).then((res) => {
      setShowModal(false);
      getAllUsers();
    });
  };

  //Variables que definen los atributos del ecabezado de la tabla
  const columns = [
    { title: "Nombre", data: "name" },
    {
      title: "Tipo documento",
      format: (row) =>
        row.identificationType === "1"
          ? "Cedula"
          : row.identificationType === "2"
          ? "Pasaporte"
          : "Tarjeta id",
    },
    { title: "Identificación", data: "identification" },
    { title: "Correo electrónico", data: "email" },
    { title: "Teléfono", data: "telephone" },
    {
      title: "Fecha de nacimiento",
      format: (row) => moment(row.birthDate).format("DD-MM-YYYY"),
    },
    {
      title: "Rol",
      format: (row) =>
        row.role.map((item) => {
          const roleValidate =
            item === "admin"
              ? "Directivo"
              : item === "teacher"
              ? "Docente"
              : item === "headofarea"
              ? "Jefe de aŕea"
              : "Representate de comité";
          return <p>{roleValidate}</p>;
        }),
    },
    {
      title: "Estado",
      format: (row) => (
        <CBadge
          className="mr-1"
          color={row.status === true ? "success" : "secondary"}
        >
          {row.status === true ? "Activo" : "Inactivo"}
        </CBadge>
      ),
    },
    {
      title: "Editar",
      format: (row) => (
        <CTooltip content={`Editar`} placement="left">
          <button
            type="button"
            style={{ color: "black" }}
            className="btn btn-light"
            onClick={() => history.push(`/users/editUser/${row._id}`)}
          >
            <FaEdit />
          </button>
        </CTooltip>
      ),
    },
    {
      title: "Desactivar",
      format: (row) =>
        !row.role.includes("admin") ? (
          <CTooltip
            content={row.status === true ? "Desactivar" : "Activar"}
            placement="left"
          >
            <button
              type="button"
              style={{ color: "black" }}
              className="btn btn-light"
              onClick={() => showCloseModal(row)}
            >
              <FaUserSlash />
            </button>
          </CTooltip>
        ) : null,
    },
  ];

  //Fin variables encabezado
  const modalComponent = (
    <ModalUnactive
      show={showModal}
      onClose={showCloseModal}
      changeStatus={handleChangeStatus}
      activeUnactive={dataByUser.status}
    />
  );
  return (
    <>
      {modalComponent}
      <CRow>
        {/* ============================================================== */}
        {/*--- Componente de usuarios ---*/}
        {/* ============================================================== */}
        <CCol xs="12">
          <CCard className="shadow">
            <CCardHeader>
              <CRow>
                <div className="col-sm-8 pr-5">
                  <div className="form-row">
                    <div className="col-md-5 mb-3">
                      <h4>Usuarios</h4>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 pr-4">
                  <div style={{ float: "right" }}>
                    <CTooltip content={`Crear usuario`} placement="bottom">
                      <Button
                        className="btn btn-danger"
                        onClick={() => history.push("/users/createUser")}
                        style={{
                          background: "#9a1f40",
                          color: "white",
                          width: "160px",
                          margin: "3px",
                        }}
                      >
                        <FaUserPlus /> <b>Crear usuario</b>
                      </Button>
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
                data={users}
                columns={columns}
                hover={true}
                responsive={true}
              />
            </CCardBody>
          </CCard>
        </CCol>
        {/* ============================================================== */}
        {/*--- Fin Componente de usuarios ---*/}
        {/* ============================================================== */}
      </CRow>
    </>
  );
};

export default Users;
