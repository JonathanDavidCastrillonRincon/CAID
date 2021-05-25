//Librería de react
import React, { useState, useEffect } from "react";

//Librería de componentes bootstrap
import { Button, Form } from "react-bootstrap";

//Librería de componentes reactstrap
import { Alert } from "reactstrap";

//Importar componente alert
import AlertSave from "./AlertSave";

//Importar componente lista de roles
import RolList from "./RolList";

//Librería de componentes de la plantilla
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CSelect,
  CFormText,
} from "@coreui/react";

import { useHistory } from "react-router-dom";
import moment from "moment";
import { createUser, getByUser, updateUser } from "src/api/user";

const roles = [
  {
    name: "Directivo",
    value: "admin",
  },
  {
    name: "Jefe de área",
    value: "headofarea",
  },
  {
    name: "Represetante de comité",
    value: "committee",
  },
  {
    name: "Docente",
    value: "teacher",
  },
];

const CreateUser = (props) => {
  const history = useHistory();
  //Variables para validar campos vacíos
  const [validated, setValidated] = useState(false);
  const [visible, setVisible] = useState(true);
  const [enabledCheck, setEnabledCheck] = useState([]);

  //Declaracion de campos form post user
  const [datos, setDatos] = useState({
    role: ["teacher"],
    username: "",
    password: "",
    name: "",
    identificationType: "",
    identification: "",
    birthDate: "",
    email: "",
    telephone: "",
    address: "",
    status: true,
  });

  const idParamsUser = props.match.params.id;
  useEffect(() => {
    if (idParamsUser) {
      getUser();
    }
  }, []);

  //Get data by user
  const getUser = () => {
    getByUser(idParamsUser).then((response) => {
      if (response) {
        const data = response?.data;
        setEnabledCheck(data.role);
        setDatos({
          role: data.role,
          username: data.username,
          password: data.password,
          name: data.name,
          identificationType: data.identificationType,
          identification: data.identification,
          birthDate: moment(data.birthDate).format("YYYY-MM-DD"),
          email: data.email,
          telephone: data.telephone,
          address: data.address,
          status: data.status,
        });
      }
    });
  };
  //Onchange para controlar input / select
  const handleInputChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  //Fin variables para validar campos vacíos
  //Mostrar y cerrar alerta
  const onDismiss = () => setVisible(false);
  //Fin Mostrar y cerrar alerta
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    //function call post create user
    if (idParamsUser) {
      updateUser(idParamsUser, datos).then((response) => {
        if (response) {
          AlertSave();
          setTimeout(() => {
            history.push("/users");
          }, 2000);
        }
      });
    } else {
      createUser(datos).then((response) => {
        if (response) {
          AlertSave();
          setTimeout(() => {
            history.push("/users");
          }, 2000);
        }
      });
    }
  };
  //Función que selecciona todos los Swithces
  const selectAllSwitchs = (e) => {
    //Separate metodo split to array
    const arraySelectAll = e.target.value.split(",");
    //Remove keys duplicate
    const removeDuplicate = [...new Set(arraySelectAll)];

    //Se comprueba si todos estan seleccionados
    if (e.target.checked === true) {
      //Se agregan al array de roles
      enabledCheck.push(...removeDuplicate);
      setEnabledCheck(removeDuplicate);
    } else {
      setEnabledCheck([]);
    }
    const roleTeacher = ["teacher"];
    const validatedAll =
      e.target.checked === true ? [...new Set(enabledCheck)] : roleTeacher;

    setDatos({
      role: validatedAll,
      username: datos.username,
      password: datos.password,
      name: datos.name,
      identificationType: datos.identificationType,
      identification: datos.identification,
      birthDate: datos.birthDate,
      email: datos.email,
      telephone: datos.telephone,
      address: datos.address,
      status: true,
    });
  }; //FIn Función que selecciona todos los Swithces

  // Añadir evento para cada casilla check y lo mete en un array si se selecciona
  const handleChangeRole = (e) => {
    //Se guarda en una constante el valor del swicth
    const valueRole = e.target.value;
    //Se crea un array vacio
    let newArrayCheck = [];
    //Con esta sentencia se verifica y se niega  "!" con la finalidad de pasar a false y cuando el swicth compruebe que esta false
    //pueda cambiar a true y se añade al array de check de roles
    if (!enabledCheck.includes(valueRole)) {
      //Se añade al array
      enabledCheck.push(valueRole);
    } else {
      //Deseleccionar en los switch y se filtran, si el valor que recibo por valueRole es diferente al value que
      //pasa esta en el filter, con el operador !== se remueve del array
      newArrayCheck = enabledCheck.filter((value) => value !== valueRole);
      setEnabledCheck(newArrayCheck);
    }
    //Se valida si el switch esta en checked true, si es asi se envia enabledCheck que son los que estan seleccionados
    //Y agregado al array, sino, si está en false se envia newArrayCheck que son los que se deselecciona en el switch
    const validateArray =
      e.target.checked === true ? enabledCheck : newArrayCheck;

    const roleTeacher = ["teacher"];
    //setDatos es el estado donde se encuentra definido al inicio los campos
    setDatos({
      role: validateArray.length === 0 ? roleTeacher : validateArray,
      username: datos.username,
      password: datos.password,
      name: datos.name,
      identificationType: datos.identificationType,
      identification: datos.identification,
      birthDate: datos.birthDate,
      email: datos.email,
      telephone: datos.telephone,
      address: datos.address,
      status: true,
    });
  }; //FIn Seleccionar un check y crear un evento

  return (
    <CRow>
      {/* ============================================================== */}
      {/*--- Componente de usuarios ---*/}
      {/* ============================================================== */}
      <CCol className="col-lg-12">
        <Form
          noValidate
          validated={validated}
          onSubmit={(e) => handleSubmit(e)}
        >
          <CCard className="shadow">
            <CCardHeader>
              <h4>
                {idParamsUser ? "Editar" : "Crear"} usuario - Datos personales
              </h4>
            </CCardHeader>
            <CCardBody>
              <div className="form-row">
                <div className="col-md-6 mb-3">
                  <label style={{ color: "#3c4b64" }}>
                    <b>Tipo documento</b>
                  </label>
                  <label style={{ color: "blue" }}>*</label>
                  <CSelect
                    custom
                    name="identificationType"
                    className="form-control"
                    required
                    value={datos.identificationType}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled selected>
                      Por favor selecciona
                    </option>
                    <option value="1">Cédula</option>
                    <option value="2">Pasaporte</option>
                    <option value="3">Tarjeta id</option>
                  </CSelect>
                  <Form.Control.Feedback>¡Muy bien!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Por favor seleccionar un tipo de documento.
                  </Form.Control.Feedback>
                </div>
                <div className="col-md-6 mb-3">
                  <label style={{ color: "#3c4b64" }}>
                    <b>Numero documento</b>
                  </label>
                  <label style={{ color: "blue" }}>*</label>
                  <input
                    type="text"
                    name="identification"
                    className="form-control"
                    required
                    value={datos.identification}
                    onChange={handleInputChange}
                  />
                  <Form.Control.Feedback>¡Muy bien!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Por favor llenar el campo con el número de documento.
                  </Form.Control.Feedback>
                </div>
              </div>
              <div className="form-row">
                <div className="col-md-8 mb-3">
                  <label style={{ color: "#3c4b64" }}>
                    <b>Nombre completo</b>
                  </label>
                  <label style={{ color: "blue" }}>*</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    required
                    value={datos.name}
                    onChange={handleInputChange}
                  />
                  <Form.Control.Feedback>¡Muy bien!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Por favor llenar el campo con el nombre completo.
                  </Form.Control.Feedback>
                </div>
                <div className="col-md-4 mb-3">
                  <label style={{ color: "#3c4b64" }}>
                    <b>Fecha nacimiento</b>
                  </label>
                  <label style={{ color: "blue" }}>*</label>
                  <input
                    type="date"
                    name="birthDate"
                    className="form-control"
                    required
                    value={datos.birthDate}
                    onChange={handleInputChange}
                  />
                  <Form.Control.Feedback>¡Muy bien!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Por favor seleccionar la fecha de nacimiento.
                  </Form.Control.Feedback>
                </div>
              </div>
            </CCardBody>
          </CCard>
          <CCard className="shadow">
            <CCardHeader>
              <h4>Credenciales</h4>
            </CCardHeader>
            <CCardBody>
              <div className="form-row">
                <div className="col-md-6 mb-3">
                  <label style={{ color: "#3c4b64" }}>
                    <b>Usuario</b>
                    <label style={{ color: "blue" }}>*</label>
                    <CFormText className="help-block">
                      Usa el número de cédula
                    </CFormText>
                  </label>
                  <input
                    type="text"
                    name="username"
                    className="form-control"
                    required
                    value={datos.username}
                    onChange={handleInputChange}
                  />
                  <Form.Control.Feedback>¡Muy bien!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Por favor introduce el usuario.
                  </Form.Control.Feedback>
                </div>
                <div className="col-md-6 mb-3">
                  <label style={{ color: "#3c4b64" }}>
                    <b>Contraseña</b>
                    <label style={{ color: "blue" }}>*</label>
                    <CFormText className="help-block">
                      Usa el número de cédula
                    </CFormText>
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    required
                    value={datos.password}
                    onChange={handleInputChange}
                    disabled={idParamsUser ? "disabled" : ""}
                  />
                  <Form.Control.Feedback>¡Muy bien!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Por favor introduce la contraseña.
                  </Form.Control.Feedback>
                </div>
              </div>
            </CCardBody>
          </CCard>
          <CCard className="shadow">
            <CCardHeader>
              <h4>Datos de contácto</h4>
            </CCardHeader>
            <CCardBody>
              <div className="form-row">
                <div className="col-md-6 mb-3">
                  <label style={{ color: "#3c4b64" }}>
                    <b>Correo electrónico</b>
                  </label>
                  <label style={{ color: "blue" }}>*</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    required
                    value={datos.email}
                    onChange={handleInputChange}
                  />
                  <Form.Control.Feedback>¡Muy bien!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Por favor llenar el campo con el correo electrónico.
                  </Form.Control.Feedback>
                </div>
                <div className="col-md-6 mb-3">
                  <label style={{ color: "#3c4b64" }}>
                    <b>Teléfono</b>
                  </label>
                  <label style={{ color: "blue" }}>*</label>
                  <input
                    type="text"
                    name="telephone"
                    className="form-control"
                    required
                    value={datos.telephone}
                    onChange={handleInputChange}
                  />
                  <Form.Control.Feedback>¡Muy bien!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Por favor introduce un número de teléfono.
                  </Form.Control.Feedback>
                </div>
              </div>
            </CCardBody>
          </CCard>
          <CCard className="shadow">
            <CCardHeader>
              <h4>Asignación de roles</h4>
            </CCardHeader>
            <Alert color="warning" isOpen={visible} toggle={onDismiss}>
              Por favor seleccione un rol para el usuario, de no seleccionar un
              rol se le asignará el de docente por defecto.
            </Alert>
            <CCardBody>
              <div className="form-row">
                <div className="col-md-12 mb-3">
                  <RolList
                    actionSelectAll={selectAllSwitchs}
                    dataCompare={enabledCheck}
                    handleChangeSwitch={handleChangeRole}
                    list={roles}
                  />
                </div>
              </div>
              <br />
              <div className="col-sm-12 pb-2 pb-lg-0 pr-0">
                <div style={{ float: "right" }}>
                  <div className="btn-group">
                    <Button
                      type="summit"
                      className="btn btn-danger"
                      style={{
                        background: "#9a1f40",
                        color: "white",
                        width: "160px",
                        margin: "3px",
                      }}
                    >
                      <b>Guardar</b>
                    </Button>
                    <Button
                      shape="pill"
                      variant=""
                      onClick={() => history.push("/users")}
                      className="btn btn-ghost-light"
                      style={{
                        color: "#9a1f40",
                        width: "160px",
                        margin: "3px",
                      }}
                    >
                      <b>Cancelar</b>
                    </Button>
                  </div>
                </div>
              </div>
            </CCardBody>
          </CCard>
        </Form>
      </CCol>
    </CRow>
  );
};

export default CreateUser;
