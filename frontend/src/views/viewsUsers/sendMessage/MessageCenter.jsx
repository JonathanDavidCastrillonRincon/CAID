//Librería de react
import React from "react";

//Librería del dataTable
import DataTable from "@bit/adeoy.utils.data-table";

//Librería de íconos
import {
  FaTrash,
  FaInbox,
  FaTelegramPlane,
  FaSyncAlt,
  FaEye,
  FaPlus,
} from "react-icons/fa";

//Librería de componentes react-bootstrap
import { Tab, Row, Col, Nav } from "react-bootstrap";

//Importar componente AlertDelete
import AlertDelete from "./AlertDelete";

//Importar modal nuevo mensaje, ver mensaje
import ModalNewMessage from "./ModalNewMessage";
import ModalSeeMessage from "./ModalSeeMessage";

import {
  getMessageByTo,
  getMessageByPosted,
  changeStatusToRemove,
  getAllMessages,
} from "../../../api/message";
import { getAllUser } from "../../../api/user";
import moment from "moment";

//Librería de componentes de la plantilla
import {
  CCard,
  CCardHeader,
  CCardBody,
  CCol,
  CRow,
  CTooltip,
} from "@coreui/react";

const MessageCenter = () => {
  //Estados para guardar data del array mensajes
  const [dataMessagesSend, setDataMessagesSend] = React.useState([]);
  const [dataMessagesReceived, setDataMessagesReceived] = React.useState([]);
  const [dataMessagesRemove, setDataMessagesRemove] = React.useState([]);
  //Estado para guardar data del array usuarios
  const [users, setUsers] = React.useState([]);

  //Estado para mostrar u ocultar la modal
  const [showModal, setShowModal] = React.useState(false);
  const [showModalCreate, setShowModalCreate] = React.useState(false);
  //Estado para guardar la info del mensaje
  const [dataByMessage, setDataByMessage] = React.useState("");

  const userId = JSON.parse(localStorage.getItem("user"))
    ? JSON.parse(localStorage.getItem("user"))._id
    : "";

  //Cargar funciones para el render de datos
  React.useEffect(() => {
    getMessageTo();
    getAllUsers();
    getMessageRecived();
    getMessages();
    getMessageRemove();
  }, []);

  //action para mostrar el modal de ver mensaje
  const showCloseModal = (row) => {
    setShowModal(!showModal);
    setDataByMessage(row);
  };

  //action para mostrar el modal de ver mensaje
  const showCloseModalCreate = () => {
    setShowModalCreate(!showModalCreate);
  };

  //get a la api para todos los mensajes
  const getMessages = () => {
    //Se llama la funcion que hace conexion con la api
    getAllMessages().then((response) => {
      if (response) {
        //Se obtiene la respuesta y se guarda en la variable
        const arrayMessagesAllSend = response.data?.filter(
          (el) => el.status === "1" && el.postedBy === userId
        );
        const arrayMessagesAllRecived = response.data?.filter(
          (el) => el.status === "1" && el.to === userId
        );
        //Se Guarda en el estado el array que se obtiene
        setDataMessagesSend(arrayMessagesAllSend);
        setDataMessagesReceived(arrayMessagesAllRecived);
      }
    });
  };

  //Get data mensajes enviados por el usuario que lo envia
  const getMessageTo = () => {
    //Se llama la funcion que hace conexion con la api
    getMessageByTo(userId).then((response) => {
      if (response) {
        const arrayMessagesTo = response.data.data?.filter(
          (el) => el.status === "1"
        );
        //Se Guarda en el estado el array que se obtiene
        setDataMessagesReceived(arrayMessagesTo);
      }
    });
  };

  //Get data mensajes recibidos para el usuario
  const getMessageRecived = () => {
    //Se llama la funcion que hace conexion con la api
    getMessageByPosted(userId).then((response) => {
      if (response) {
        const arrayMessagesRecived = response.data.data?.filter(
          (el) => el.status === "1"
        );
        //Se Guarda en el estado el array que se obtiene
        setDataMessagesSend(arrayMessagesRecived);
      }
    });
  };
  //get a la api para mostrar los mensajes que han sido cambiado a estados eliminados
  const getMessageRemove = () => {
    //Se llama la funcion que hace conexion con la api
    getAllMessages().then((response) => {
      if (response) {
        const arrayMessagesRemove = response.data?.filter(
          (el) => el.status === "3" && el.postedBy === userId
        );
        //Se Guarda en el estado el array que se obtiene
        setDataMessagesRemove(arrayMessagesRemove);
      }
    });
  };

  //Data all de los usuarios
  const getAllUsers = () => {
    //Se llama la funcion que hace conexion con la api
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

  //Accion para cambiar estado de mensaje a remove
  const sendToRemove = (data) => {
    //Se llama la funcion que hace conexion con la api
    changeStatusToRemove(data._id, "3").then((response) => {
      if (response) {
        AlertDelete();
        getMessages();
        getMessageRemove();
      }
    });
  };
  //render tabla mensajes recibidos
  const columnsReceived = [
    {
      title: "",
      format: (row) => {
        return users.map((item) => {
          if (item._id === row.postedBy) {
            return `De: ${item.name}`;
          }
        });
      },
    },
    { title: "Asunto", data: "title" },
    {
      title: "Fecha enviado",
      format: (row) => moment(row.createdAt).format("DD/MM/YYYY  HH:mm:ss"),
    },
    {
      title: "",
      format: (row) => (
        <CTooltip content={`Abrir`} placement="left">
          <button
            type="button"
            style={{ color: "black" }}
            className="btn btn-light"
            onClick={() => showCloseModal(row)}
          >
            <FaEye />
          </button>
        </CTooltip>
      ),
    },
    {
      title: "",
      format: (row) => (
        <CTooltip content={`Eliminar`} placement="left">
          <button
            type="button"
            style={{ color: "black" }}
            className="btn btn-light"
            onClick={() => sendToRemove(row)}
          >
            <FaTrash />
          </button>
        </CTooltip>
      ),
    },
  ];

  //render tabla mensajes enviados
  const columnsSend = [
    {
      title: "",
      format: (row) => {
        return users.map((item) => {
          if (item._id === row.to) {
            return `Para: ${item.name}`;
          }
        });
      },
    },
    { title: "Asunto", data: "title" },
    {
      title: "Fecha enviado",
      format: (row) => moment(row.createdAt).format("DD/MM/YYYY  HH:mm:ss"),
    },
    {
      title: "",
      format: (row) => (
        <CTooltip content={`Abrir`} placement="left">
          <button
            type="button"
            style={{ color: "black" }}
            className="btn btn-light"
            onClick={() => showCloseModal(row)}
          >
            <FaEye />
          </button>
        </CTooltip>
      ),
    },
    {
      title: "",
      format: (row) => (
        <CTooltip content={`Eliminar`} placement="left">
          <button
            type="button"
            style={{ color: "black" }}
            className="btn btn-light"
            onClick={() => sendToRemove(row)}
          >
            <FaTrash />
          </button>
        </CTooltip>
      ),
    },
  ];
  //Fina atributos encabezado

  //Se guarda y se llama en esta variable el modal
  const modalComponent = (
    <ModalSeeMessage
      show={showModal}
      onClose={showCloseModal}
      data={dataByMessage}
      dataUser={users}
      getMessages={getMessages}
    />
  );
  const modalComponentCreate = (
    <ModalNewMessage
      show={showModalCreate}
      onClose={showCloseModalCreate}
      getMessages={getMessages}
    />
  );
  return (
    <>
      {modalComponent}
      {modalComponentCreate}
      <CRow>
        {/* ============================================================== */}
        {/*--- Componente centro de mensajes ---*/}
        {/* ============================================================== */}
        <CCol xs="12">
          <CCard className="shadow">
            <CCardHeader>
              <h4>Centro de mensajes</h4>
            </CCardHeader>
            <CCardBody>
              <Tab.Container defaultActiveKey="recibidos">
                <Row>
                  <Col sm={3}>
                    <div className="col-sm-8">
                      <button
                        type="button"
                        size="lg"
                        style={{ color: "black" }}
                        className="btn btn-outline-light"
                        onClick={showCloseModalCreate}
                      >
                        <FaPlus /> Nuevo mensaje
                      </button>
                      <ModalNewMessage />
                    </div>
                    <br />
                    <Nav variant="pills" className="flex-column">
                      <Nav.Item>
                        <Nav.Link eventKey="recibidos">
                          <FaInbox /> Recibidos
                        </Nav.Link>
                      </Nav.Item>

                      <Nav.Item>
                        <Nav.Link eventKey="enviados">
                          <FaTelegramPlane /> Enviados
                        </Nav.Link>
                      </Nav.Item>

                      <Nav.Item>
                        <Nav.Link eventKey="eliminados">
                          <FaTrash /> Eliminados
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                  <Col sm={9}>
                    <Tab.Content>
                      <Tab.Pane eventKey="recibidos">
                        <div className="form-row">
                          <div className="col-md-2 mb-3">
                            <h4>Recibidos</h4>
                          </div>
                          <div className="col-md-1 mb-3">
                            <CTooltip content={`Actualizar`} placement="bottom">
                              <button
                                type="button"
                                block
                                shape="pill"
                                style={{ color: "black" }}
                                className="btn btn-outline-light"
                                onClick={() => getAllMessages()}
                              >
                                <FaSyncAlt />
                              </button>
                            </CTooltip>
                          </div>
                        </div>
                        <br />
                        <DataTable
                          data={dataMessagesReceived}
                          columns={columnsReceived}
                          hover={true}
                          responsive={true}
                        />
                      </Tab.Pane>
                      <Tab.Pane eventKey="enviados">
                        <h4>Enviados</h4>
                        <br />
                        <DataTable
                          data={dataMessagesSend}
                          columns={columnsSend}
                          hover={true}
                          responsive={true}
                        />
                      </Tab.Pane>
                      <Tab.Pane eventKey="eliminados">
                        <>
                          <h4>Eliminados ({dataMessagesRemove.length})</h4>
                          {dataMessagesRemove.map((el) => {
                            return (
                              <div>
                                <span>Asunto: {el.title}</span>
                              </div>
                            );
                          })}
                          <br />
                        </>
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
            </CCardBody>
          </CCard>
        </CCol>
        {/* ============================================================== */}
        {/*--- Fin Componente centro de mensajes ---*/}
        {/* ============================================================== */}
      </CRow>
    </>
  );
};

export default MessageCenter;
