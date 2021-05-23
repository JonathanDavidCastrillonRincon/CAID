//Librería de react
import React, { useState } from "react";

//Librería de íconos
import { FaTrash, FaReply } from "react-icons/fa";

//Librería de componentes react-bootstrap
import { Button, Form } from "react-bootstrap";

//Importar componente AlertSave, AlertDelete
import AlertSend from "./AlertSend";

//Librería de componentes de la plantilla
import {
  CCardBody,
  CButton,
  CTooltip,
  CCollapse,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";

import moment from "moment";
import { createMessage } from "../../../api/message";

const ModalSeeMessage = (props) => {
  const { show, onClose, data, dataUser, getMessages } = props;

  const [title, setTitle] = React.useState(null);
  const [description, setDescription] = React.useState(null);

  //Variables para abrir desplegar el formulario de respuesta
  const [collapse, setCollapse] = useState(false);
  const toggle = (e) => {
    setCollapse(!collapse);
    e.preventDefault();
  };

  //Se filtra el id del array user y se compara con el id del remitente para retorna el nombre
  const userTo = dataUser?.map((item) => {
    if (item._id === data?.postedBy) {
      return item.name;
    }
  });
  //Se filtra el id del array user y se compara con el id del receptor para retorna el nombre
  const userRecived = dataUser?.map((item) => {
    if (item._id === data?.to) {
      return item.name;
    }
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    //function call post create message
    const obj = {
      to: data.postedBy,
      title,
      description,
      status: data.status,
      postedBy: data.to,
    };
    createMessage(obj).then((response) => {
      if (response) {
        AlertSend();
        onClose();
        getMessages();
      }
    });
  };
  return (
    <div>
      {/* ============================================================== */}
      {/*--- Modal ver mensaje ---*/}
      {/* ============================================================== */}

      <CModal show={show} size="lg">
        <CModalHeader closeButton>
          <CModalTitle>
            <div>
              <small className="text-uppercase text-muted">Asunto</small>
              <h4 className="modal-title">{data?.title}</h4>
            </div>
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div className="row">
            <div className="col-sm-8">
              <small className="text-uppercase text-muted">Remitente</small>
              <h4 style={{ color: "#162447" }}>{userTo}</h4>
            </div>
            <div className="col-sm-4">
              <small className="text-uppercase text-muted">Enviado</small>
              <h6>{moment(data?.createdAt).format("DD/MM/YYYY  HH:mm:ss")}</h6>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-sm-12">
              <p>Hola {userRecived},</p>
              <br />
              <p>{data?.description}</p>
              <br />
              Gracias,
              <h5>
                <b>{userRecived}</b>
              </h5>
            </div>
          </div>
          <hr />
          <br />
          <CCollapse show={collapse}>
            <CCardBody className="shadow py-1">
              <Form onSubmit={(e) => handleSubmit(e)}>
                <div className="form-row">
                  <div className="col-md-12 mb-3">
                    <label style={{ color: "#3c4b64" }}>
                      <b>Para:</b>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={userTo}
                      disabled
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="col-md-12 mb-3">
                    <label style={{ color: "#3c4b64" }}>
                      <b>Asunto:</b>
                    </label>
                    <input
                      type="text"
                      id="asuntoRespuesta"
                      name="asuntoRespuesta"
                      className="form-control"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="col-md-12 mb-3">
                    <label style={{ color: "#3c4b64" }}>
                      <b>Mensaje:</b>
                    </label>
                    <textarea
                      type="text"
                      id="mensajeRespuesta"
                      name="mensajeRespuesta"
                      className="form-control"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="col-sm-12 pb-2 pb-lg-0 pr-0">
                    <div style={{ float: "right" }}>
                      <div className="btn-group">
                        <CButton
                          type="summit"
                          className="btn btn-danger"
                          style={{
                            background: "#9a1f40",
                            color: "white",
                            width: "160px",
                            margin: "3px",
                          }}
                        >
                          <b>Enviar</b>
                        </CButton>
                        <CTooltip content={`Descartar`} placement="bottom">
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
                            <FaTrash />
                          </CButton>
                        </CTooltip>
                      </div>
                    </div>
                  </div>
                </div>
                <br />
              </Form>
            </CCardBody>
          </CCollapse>
          <br />
          <br />
          <div className="col-sm-12 pb-2 pb-lg-0 pr-0">
            <div style={{ float: "right" }}>
              <div className="btn-group">
                <Button
                  block
                  shape="pill"
                  variant=""
                  onClick={toggle}
                  className="btn btn-outline-light"
                  style={{ color: "#767676" }}
                >
                  <FaReply /> Responder
                </Button>
              </div>
            </div>
          </div>
        </CModalBody>
      </CModal>
      {/* ============================================================== */}
      {/*--- Fin Modal ver mensaje ---*/}
      {/* ============================================================== */}
    </div>
  );
};

export default ModalSeeMessage;
