//Librería de react
import React, { useState } from "react";

//Librería de íconos

//Librería de componentes react-bootstrap
import { Form } from "react-bootstrap";

//Importar componente AlertSend
import AlertSend from "./AlertSend";

//Librería de componentes de la plantilla
import {
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CRow,
  CButton,
} from "@coreui/react";
import { getAllUser } from "src/api/user";
import { createMessage } from "src/api/message";

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

const ModalNewMessage = (props) => {
  const { show, onClose, getMessages } = props;

  //Estado para validar campos vacios
  const [validated, setValidated] = useState(false);
  //Estado para array de usuarios filtrados
  const [usersFilter, setUsersFilter] = useState([]);
  //Estado para el select de la labor
  const [valueRole, setValueRole] = useState("0");
  //Estados campos para formulario
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [to, setTo] = useState(null);

  //Id del usuario logueado obtenido del localstorage
  const userId = JSON.parse(localStorage.getItem("user"))
    ? JSON.parse(localStorage.getItem("user"))._id
    : "";

  //Accion para enviar data a api
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);

    //Objeto para enviar a la api y crear mensaje
    const obj = {
      to,
      title,
      description,
      status: "1",
      postedBy: userId,
    };

    if (title !== null || description !== null) {
      //Funcion para enviar data a la api
      createMessage(obj).then((response) => {
        if (response) {
          AlertSend();
          onClose();
          getMessages();
          setDescription("");
          setTo("");
          setTitle("");
          setValueRole("0");
        }
      });
    }
  };

  //Funcion para filtar por rol para que se muestre la lista de destinario
  const filterRole = (e) => {
    const value = e.target.value;
    setValueRole(value);
    getAllUser().then((response) => {
      //Respuesta de la api, se guarda en un constante
      const data = response.data;
      //Se filtra la data obtenida de la respuesta para que devuelva el array si el rol coincide con el value que se obtiene
      //desde el select labor - rol
      const dataFilter = data.filter((user) => user.role.includes(value));
      //Se guarda en el estado de user filter para poder mostrar la lista en el select destinatario
      setUsersFilter(dataFilter);
      //Se recorre la data filtrada segun el rol y se muestra el primer registro para que se cargue en el select del
      //destinatario
      const toFirst = dataFilter.map((el) => {
        return el._id;
      });
      setTo(toFirst[0]);
    });
  };

  return (
    <CRow>
      {/* ============================================================== */}
      {/*--- Modal nuevo mensaje ---*/}
      {/* ============================================================== */}

      <CModal show={show} size="lg">
        <CModalHeader closeButton>
          <CModalTitle>Nuevo Mensaje</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <Form
            noValidate
            validated={validated}
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="form-row">
              <div className="col-md-12 mb-3">
                <label style={{ color: "#3c4b64" }}>
                  <b>Labor:</b>
                </label>
                <select
                  onChange={(e) => filterRole(e)}
                  className="form-control"
                  value={valueRole}
                  placeholder={"Seleccione labor"}
                  required
                >
                  <option value="0" disabled>
                    Seleccionar labor
                  </option>

                  {roles.map((el) => {
                    return (
                      <option value={el.value} key={el.value}>
                        {el.label}
                      </option>
                    );
                  })}
                </select>
                <Form.Control.Feedback>¡Muy bien!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Por favor seleccione la labor.
                </Form.Control.Feedback>
              </div>
            </div>
            <div className="form-row">
              <div className="col-md-12 mb-3">
                <label style={{ color: "#3c4b64" }}>
                  <b>Para:</b>
                </label>
                <select
                  className="form-control"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  required
                >
                  {usersFilter.map((el) => {
                    return (
                      <option value={el._id} key={el._id}>
                        {el.name}
                      </option>
                    );
                  })}
                </select>
                <Form.Control.Feedback>¡Muy bien!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Por favor seleccione el destinatario.
                </Form.Control.Feedback>
              </div>
            </div>
            <div className="form-row">
              <div className="col-md-12 mb-3">
                <label style={{ color: "#3c4b64" }}>
                  <b>Asunto:</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={title}
                  required
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Form.Control.Feedback>¡Muy bien!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Por favor introduce el asunto.
                </Form.Control.Feedback>
              </div>
            </div>
            <div className="form-row">
              <div className="col-md-12 mb-3">
                <label style={{ color: "#3c4b64" }}>
                  <b>Mensaje:</b>
                </label>
                <textarea
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="form-control"
                  required
                />
                <Form.Control.Feedback>¡Muy bien!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Por favor introduce el mensaje.
                </Form.Control.Feedback>
              </div>
            </div>
            <br />
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
        </CModalBody>
      </CModal>
      {/* ============================================================== */}
      {/*--- Fin Modal nuevo mensaje ---*/}
      {/* ============================================================== */}
    </CRow>
  );
};

export default ModalNewMessage;
